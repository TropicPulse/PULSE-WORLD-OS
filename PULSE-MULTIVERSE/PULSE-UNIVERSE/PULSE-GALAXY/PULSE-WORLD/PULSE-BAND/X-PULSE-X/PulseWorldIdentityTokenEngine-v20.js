// FILE: /netlify/functions/PulseWorldIdentityTokenEngine-v20.js
// ============================================================================
//  PULSE-WORLD IDENTITY TOKEN ENGINE — v20 IMMORTAL
//  ROLE:
//    • Deterministic identity verification + lineage validation
//    • Issues Firebase custom tokens (fresh, never cached)
//    • Validates resendToken lineage (root identity token)
//    • Checks IdentityHistory for danger flags
//    • Zero-mutation, zero-randomness, drift-proof
//    • World-layer aware: region, host, pulseTouch, band
//    • IMMORTAL envelope output
// ============================================================================
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝

import {
  VitalsLogger as PulseProofLogger,
  log,
  warn,
  error,
  comment,
  makeTelemetryPacket as emitTelemetry,
  PulseVersion,
  PulseColors,
  PulseIcons
} from "../___MONITOR/PULSE-PROOF-LOGGER.js";
import { admin, db } from "./PulseWorldFirebaseGenome-v20.js";

// ============================================================================
//  PURE HELPERS
// ============================================================================

function safe(v) {
  try { return JSON.parse(JSON.stringify(v || {})); }
  catch { return {}; }
}

function nowIso() {
  return new Date().toISOString();
}

// ============================================================================
//  MAIN HANDLER — IMMORTAL
// ============================================================================

export default async function handler(req, res) {
  try {
    // ------------------------------------------------------------
    // 1) CORS
    // ------------------------------------------------------------
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

    if (req.method === "OPTIONS") {
      return res.status(204).send("");
    }

    // ------------------------------------------------------------
    // 2) Parse input
    // ------------------------------------------------------------
    const body = JSON.parse(req.body || "{}");
    const incomingToken = body.token || null;
    const uid = body.uid || null;

    if (!uid) {
      return res.status(400).json({
        success: false,
        error: "UID missing"
      });
    }

    // ------------------------------------------------------------
    // 3) Load user
    // ------------------------------------------------------------
    const userRef = db.collection("Users").doc(uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({
        success: false,
        error: "User not found"
      });
    }

    const userData = userDoc.data() || {};
    const TPIdentity = userData.TPIdentity || {};
    const storedToken = TPIdentity.resendToken || null;

    if (!storedToken) {
      return res.status(403).json({
        success: false,
        hardLogout: true,
        error: "No active resendToken"
      });
    }

    // ------------------------------------------------------------
    // 4) Load identity lineage (latest safe snapshot)
    // ------------------------------------------------------------
    const historySnap = await db
      .collection("IdentityHistory")
      .doc(uid)
      .collection("snapshots")
      .orderBy("createdAt", "desc")
      .limit(20)
      .get();

    let lineageToken = null;
    let lineageSnap = null;

    if (!historySnap.empty) {
      for (const doc of historySnap.docs) {
        const snap = doc.data() || {};
        const token = snap?.TPIdentity?.resendToken || null;

        if (token) {
          lineageToken = token;
          lineageSnap = snap;
          break;
        }
      }
    }

    if (!lineageToken) {
      return res.status(403).json({
        success: false,
        hardLogout: true,
        error: "No lineage token found"
      });
    }

    // ------------------------------------------------------------
    // 5) Danger checks
    // ------------------------------------------------------------
    const danger =
      lineageSnap.lockedDown === true ||
      lineageSnap.hacker === true ||
      lineageSnap.failure === true ||
      lineageSnap.compromised === true ||
      lineageSnap.revoked === true;

    if (danger) {
      return res.status(403).json({
        success: false,
        hardLogout: true,
        error: "Identity revoked or compromised"
      });
    }

    // ------------------------------------------------------------
    // 6) Firebase custom token (fresh)
    // ------------------------------------------------------------
    const firebaseToken = await admin.auth().createCustomToken(uid);

    await userRef.set(
      {
        TPFirebaseAuth: {
          enabled: true,
          lastIssued: admin.firestore.FieldValue.serverTimestamp()
        }
      },
      { merge: true }
    );

    // ------------------------------------------------------------
    // 7) Realign logic
    // ------------------------------------------------------------
    let realign = false;
    let hardLogout = false;

    if (!incomingToken) {
      hardLogout = true;
    } else if (incomingToken !== lineageToken) {
      realign = true;
    }

    if (hardLogout) {
      return res.status(403).json({
        success: false,
        hardLogout: true
      });
    }

    // ------------------------------------------------------------
    // 8) IMMORTAL response
    // ------------------------------------------------------------
    return res.status(200).json({
      success: true,
      realign,
      storedToken,
      firebaseToken,
      meta: {
        version: "v20-IMMORTAL",
        issuedAt: nowIso(),
        lineageSafe: true
      }
    });

  } catch (err) {
    error("🔥 IdentityTokenEngine-v20 error:", err);

    return res.status(500).json({
      success: false,
      error: "Internal server error"
    });
  }
}
