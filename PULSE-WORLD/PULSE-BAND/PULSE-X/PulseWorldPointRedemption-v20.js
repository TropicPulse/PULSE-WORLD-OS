/* global log,warn,error */
// ============================================================================
// FILE: PULSE-WORLD/PULSE-BAND/PULSE-X/PulseWorldPointRedemption-v20.js
// ORGAN: PulseWorldPointRedemption-v20 (Pulse Points Redemption Organ)
// LAYER: PULSE-WORLD / LOYALTY-CORE / IMMORTAL-V20
// ============================================================================
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝
//
// ============================================================================
// PAGE INDEX — SOURCE OF TRUTH FOR THIS BACKEND FUNCTION
// ============================================================================
//
// WHAT THIS FILE **IS**
// ----------------------
// • The Pulse‑World **Pulse Points Redemption Organ** (v20 IMMORTAL)
// • A backend loyalty redemption engine (redeemPulsePoints)
// • A secure Firestore writer for TPLoyalty + TPWallet
// • A lineage‑validated redemption handler (TPIdentity.resendToken)
// • A history logger into PulseHistory
// • A redemption email trigger (via external email endpoint)
//
// WHAT THIS FILE **IS NOT**
// -------------------------
// • Not a connector
// • Not a frontend helper
// • Not a UI renderer
// • Not a generic webhook forwarder
// • Not a compute engine
// • Not allowed to run in the browser
//
// RESPONSIBILITIES
// ----------------
// • Validate lineage token (TPIdentity.resendToken)
// • Validate redemption rules (min 500, increments of 500)
// • Validate user point balance (TPLoyalty.pointsBalance)
// • Load seasonal settings (TPSettings/global)
// • Update TPLoyalty + TPWallet atomically
// • Log PulseHistory entry with full snapshot
// • Trigger redemption confirmation email
// • Return updated balance to caller
//
// REAL‑WORLD CONTEXT
// ------------------
// • Runs ONLY on backend (Firebase Functions / Cloud Run style onRequest)
// • Does NOT touch DOM or window
// • Handles protected fields + lineage validation
// • Must remain deterministic and secure
//
// INTERNAL LOGIC SUMMARY
// ----------------------
// • CORS preflight + headers
// • Extract Bearer token + uid + pointsToRedeem
// • Validate user + token match
// • Validate redemption amount rules
// • Load seasonal settings + compute snapshot
// • Update TPLoyalty + TPWallet
// • Append PulseHistory entry
// • Fire redemption email
// • Return { success, pulsepoints }
//
// DEPLOYMENT
// ----------
// • Lives in PULSE-WORLD/PULSE-BAND/PULSE-X as a backend organ
// • Executes in Node.js (Firebase Functions / Cloud backend)
// • Must remain ESM, deterministic, and side‑effect‑free (beyond DB writes)
//
// SAFETY CONSTRAINTS
// ------------------
// • Never trust client‑side balances — TPLoyalty is source of truth
// • Never expose internal stack traces in responses
// • Never mutate unrelated user fields
// • Always validate token + uid before any write
// • Always enforce min 500 and increments of 500
//
// ============================================================================
// AI EXPERIENCE META — IMMORTAL ORGAN BLOCK
// ============================================================================
//
// This block allows AI systems (Copilot, PulseOSBrain, OrganismMap) to
// understand the identity, lineage, purpose, and constraints of this file.
// It enables:
//   • Self‑healing
//   • Drift detection
//   • Organism‑level routing
//   • Contract validation
//   • Future evolution
//
// DO NOT REMOVE THIS BLOCK.
//

export const AI_EXPERIENCE_META = {
  identity: "PulseWorldPointRedemption.PointsOrgan",
  version: "v20-Immortal",
  layer: "pulse_world_loyalty",
  role: "points_redemption_engine",
  lineage: [
    "PointRedemption-v12",
    "PointRedemption-v14-Immortal",
    "PointRedemption-v16-Immortal-Evo",
    "PulseWorldPointRedemption-v20-Immortal"
  ],

  evo: {
    driftProof: true,
    deterministic: true,
    zeroState: true,
    zeroTiming: true,
    binaryAware: true,
    dualBand: true,
    presenceAware: true,
    futureEvolutionReady: true
  },

  contracts: {
    organ: "PulseWorldPointRedemption-v20",
    mesh: "PulseMesh-v20",
    send: "PulseSend-v20",
    history: "PulseHistory-v20",
    loyalty: "TPLoyalty-v20"
  },

  safety: {
    neverLogSecrets: true,
    neverExposeTokens: true,
    neverUseWindow: true,
    neverUseDynamicImport: true,
    enforceRedemptionRules: true
  }
};

// ============================================================================
// IMPORTS
// ============================================================================

import { admin, db } from "./PulseWorldGenome-v20.js";
// Stripe + Twilio + EmailAlert are not used directly here yet, but remain
// available for future evolution of redemption flows.
// import { getStripe } from "./PulseWorldBank-v20.js";
// import { handler as EmailAlertHandler } from "./PulseWorldEmailAlert-v20.js";
// import { getTwilioClient as twilio } from "./PulseWorldSMSAlert-v20.js";

const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
const STRIPE_PASSWORD = process.env.STRIPE_SECRET_KEY;
const JWT_SECRET = process.env.JWT_SECRET;

// ============================================================================
// HELPER: Seasonal Settings Resolver
// ============================================================================

function getSeasonFromSettings(settings) {
  const today = new Date();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const mmdd = `${mm}-${dd}`;

  const periods = settings?.seasonalPeriods || {};

  const isInRange = (date, start, end) => {
    // Normal range
    if (start <= end) return date >= start && date <= end;
    // Wrap-around (e.g., Dec 15 → Jan 10)
    return date >= start || date <= end;
  };

  for (const key in periods) {
    const s = periods[key];
    if (!s?.start || !s?.end) continue;

    if (isInRange(mmdd, s.start, s.end)) {
      return {
        seasonalActive: true,
        seasonalName: s.name || "",
        seasonalMultiplier: Number(s.multiplier) || 1
      };
    }
  }

  return {
    seasonalActive: false,
    seasonalName: "",
    seasonalMultiplier: 1
  };
}

// ============================================================================
// MAIN ORGAN: redeemPulsePoints — Backend Pulse Points Redemption Engine
// ============================================================================
//
// NOTE:
//   This is implemented as an onRequest HTTP function (Firebase/Cloud style).
//   It is the **only** place where Pulse Points redemption rules are enforced.
//
// ============================================================================

export const redeemPulsePoints = onRequest(
  {
    region: "us-central1",
    secrets: [JWT_SECRET],
    timeoutSeconds: 540,
    memory: "512MiB"
  },
  async (req, res) => {
    // ---------------------------------------------------------
    // CORS
    // ---------------------------------------------------------
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

    if (req.method === "OPTIONS") return res.status(204).send("");

    try {
      // -------------------------------------------------------
      // LINEAGE VALIDATION (TPIdentity.resendToken)
      // -------------------------------------------------------
      const authHeader = req.headers.authorization || "";
      const token = authHeader.replace("Bearer ", "").trim();
      const { uid, pointsToRedeem } = req.body || {};

      if (!token || !uid) {
        return res.status(403).json({
          success: false,
          error: "Missing uid or token"
        });
      }

      const userRef = db.collection("Users").doc(uid);
      const userSnap = await userRef.get();

      if (!userSnap.exists) {
        return res.status(404).json({
          success: false,
          error: "User not found"
        });
      }

      const user = userSnap.data() || {};
      const TPIdentity = user.TPIdentity || {};
      const TPLoyalty = user.TPLoyalty || {};
      const TPWallet = user.TPWallet || {};

      const storedToken = TPIdentity.resendToken || null;
      if (!storedToken || storedToken !== token) {
        return res.status(403).json({
          success: false,
          error: "Token mismatch"
        });
      }

      // -------------------------------------------------------
      // VALIDATION (TPLoyalty as source of truth)
      // -------------------------------------------------------
      const currentPoints = Number(TPLoyalty.pointsBalance) || 0;
      const redeemAmount = Number(pointsToRedeem) || 0;

      if (redeemAmount < 500 || redeemAmount % 500 !== 0) {
        return res.status(400).json({
          success: false,
          message: "Minimum redemption is 500 points, in increments of 500."
        });
      }

      if (currentPoints < redeemAmount) {
        return res.status(400).json({
          success: false,
          message: "Not enough points!"
        });
      }

      const newPoints = currentPoints - redeemAmount;
      const currentLifetime = Number(TPLoyalty.lifetimePoints) || 0;

      // -------------------------------------------------------
      // LOAD SETTINGS (SEASONAL)
      // -------------------------------------------------------
      const settingsSnap = await db.collection("TPSettings").doc("global").get();
      const settings = settingsSnap.data() || {};

      const {
        seasonalActive,
        seasonalName,
        seasonalMultiplier
      } = getSeasonFromSettings(settings);

      // -------------------------------------------------------
      // UPDATE TPLoyalty + TPWallet
      // -------------------------------------------------------
      await userRef.update({
        "TPLoyalty.pointsBalance": newPoints,
        "TPLoyalty.lifetimePoints": currentLifetime,
        "TPLoyalty.streakCount": 0,
        "TPLoyalty.updated": admin.firestore.FieldValue.serverTimestamp(),

        "TPWallet.pointsBalance": newPoints,
        "TPWallet.lifetimePoints": currentLifetime,
        "TPWallet.lastEarnedDate": TPWallet.lastEarnedDate || null
      });

      // -------------------------------------------------------
      // HISTORY SNAPSHOT
      // -------------------------------------------------------
      const snapshot = {
        seasonalName: TPLoyalty.seasonalName ?? seasonalName,
        seasonalMultiplier: TPLoyalty.seasonalMultiplier ?? seasonalMultiplier,
        seasonalActive: TPLoyalty.seasonalActive ?? seasonalActive,

        tier: TPLoyalty.tier || null,
        tierKey: TPLoyalty.tierKey || null,
        tierMultiplier: TPLoyalty.tierMultiplier || 1,

        streakCount: TPLoyalty.streakCount || 0,
        streakMultiplier: TPLoyalty.streakMultiplier || 1,
        streakExpires: TPLoyalty.streakExpires || null,

        calculationVersion: TPLoyalty.calculationVersion || 1,

        pointsBefore: currentPoints,
        pointsAfter: newPoints
      };

      // -------------------------------------------------------
      // LOG HISTORY ENTRY
      // -------------------------------------------------------
      await db
        .collection("PulseHistory")
        .doc(uid)
        .collection("entries")
        .add({
          type: "redeem",
          label: "Points Redeemed",
          amount: -redeemAmount,

          ts: admin.firestore.FieldValue.serverTimestamp(),
          createdAt: admin.firestore.FieldValue.serverTimestamp(),

          orderID: null,
          streakCount: 0,

          pulsepointsBefore: currentPoints,
          pulsepointsAfter: newPoints,

          seasonalName: snapshot.seasonalName,
          seasonalActive: snapshot.seasonalActive,

          calculationVersion: snapshot.calculationVersion,
          totalPointsEarned: -redeemAmount,

          pointsSnapshot: snapshot
        });

      // -------------------------------------------------------
      // SEND USER EMAIL (EXTERNAL MASS EMAIL ENGINE)
      // -------------------------------------------------------
      const userEmail = TPIdentity.email || null;
      const userName =
        TPIdentity.name ||
        TPIdentity.displayName ||
        "";

      if (userEmail) {
        const emailURL =
          "https://sendmassemail-ilx3agka5q-uc.a.run.app" +
          `?useremail=${encodeURIComponent(userEmail)}` +
          `&emailType=pulsePointRedemption` +
          `&points=${encodeURIComponent(redeemAmount)}` +
          `&name=${encodeURIComponent(userName)}` +
          `&uid=${encodeURIComponent(uid)}`;

        await fetch(emailURL);
      }

      // -------------------------------------------------------
      // SUCCESS
      // -------------------------------------------------------
      return res.json({
        success: true,
        pulsepoints: newPoints
      });

    } catch (err) {
      error("redeemPulsePoints error:", err);
      return res.json({
        success: false,
        error: "Server error: " + err.message
      });
    }
  }
);

// ============================================================================
// FOOTER — LOYALTY BRAIN NOTES FOR ALDWYN
// ============================================================================
//
// ⭐ PULSE POINTS RULES ⭐
// -----------------------
// • Source of truth = TPLoyalty.pointsBalance (never trust client)
// • Minimum redemption = 500 points
// • Redemptions must be in increments of 500
// • Seasonal multipliers live in TPSettings/global.seasonalPeriods
//
// ⭐ EVOLUTION IDEAS ⭐
// --------------------
// • Add tier‑based bonuses on redemption
// • Add Stripe credit / coupon generation on redemption
// • Add SMS confirmation via PulseWorldSMSAlert‑v20
// • Add fraud‑detection hooks (sudden large redemptions)
//
// ⭐ ORGANISM NOTES ⭐
// -------------------
// • This organ is the **loyalty valve** — all redemptions must pass here.
// • Keep rules explicit and comments accurate.
// • If comments and code ever disagree, update the code to match the comments.
//
// ============================================================================
