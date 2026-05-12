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
PULSE-WORLD-MAP.js
import {
  OrganismIdentity,
  buildPulseOrganismMap as PulseOrganismMap
} from "./PULSE-WORLD-MAP.js";
const Identity = OrganismIdentity(import.meta.url);

// 2 — EXPORT GENOME METADATA
// export const PulseBinaryWaveScannerMeta = Identity.OrganMeta;
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
// export const WBC_CONTEXT = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;
import { onRequest, onCall } from "firebase-functions/v2/https";

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

// --- Helpers -----------------------------------------------------
// Simple helpers – adapt to your existing Pulse Points structure
// --- Helpers -----------------------------------------------------
export async function grantPulsePoints(uid, amount, type, label, otherid, referralCode, orderID) {
  const userRef = db.collection("Users").doc(uid);

  let before = 0;
  let after = 0;
  let newStreak = 0;
  let TPWallet = {};
  let TPLoyalty = {};
  const nowTS = admin.firestore.Timestamp.now();

  await db.runTransaction(async (tx) => {
    const snap = await tx.get(userRef);
    const user = snap.exists ? snap.data() : {};

    TPWallet = user.TPWallet || {};
    TPLoyalty = user.TPLoyalty || {};

    before = Number(TPWallet.pointsBalance) || 0;
    const lifetime = Number(TPWallet.lifetimePoints) || 0;
    const streak = Number(TPLoyalty.streakCount) || 0;

    after = before + amount;
    newStreak = streak + 1;

    tx.set(
      userRef,
      {
        TPWallet: {
          pointsBalance: after,
          lifetimePoints: lifetime + amount,
          lastEarnedDate: nowTS
        },
        TPLoyalty: {
          ...TPLoyalty,
          streakCount: newStreak,
          updated: nowTS
        }
      },
      { merge: true }
    );
  });

  const settings = await db.collection("Settings").doc("global").get().then(s => s.data());

  const entry = {
    amount,
    type,
    label,
    newUserUID: otherid || null,
    referralCode: referralCode || null,
    orderID: orderID || null,
    reason: "activity",
    pulsepointsBefore: before,
    pulsepointsAfter: after,
    streakCount: newStreak,
    ts: nowTS
  };

  entry.pointsSnapshot = buildSnapshotForNonOrderEntry(entry, { TPWallet, TPLoyalty }, settings);

  await addHistory(uid, entry);
}

export function buildSnapshotForNonOrderEntry(entry, loyalty = {}, settings = {}) {
  const { seasonalActive, seasonalName, seasonalMultiplier } =
    getSeasonFromSettings(settings);

  return {
    type: entry.type || "activity",
    label: entry.label || "",
    amount: entry.amount || 0,

    tierMultiplier: loyalty.tierMultiplier ?? 1,
    streakMultiplier: loyalty.streakMultiplier ?? 1,
    seasonalMultiplier,
    maxTotalMultiplier: settings.maxTotalMultiplier,

    seasonalActive,
    seasonalName,

    basePoints: entry.amount || 0,
    tierBonusPoints: 0,
    streakBonusPoints: 0,
    seasonalBonusPoints: 0,
    fastDeliveryBonus: 0,
    delayPenalty: 0,
    totalPointsEarned: entry.amount || 0,

    ts: entry.ts || admin.firestore.FieldValue.serverTimestamp(),
    createdAt: entry.createdAt || admin.firestore.FieldValue.serverTimestamp(),

    calculationVersion: settings.calculationVersion ?? 1
  };
}
export async function redeemSomePulsePoints(uid, amount, type, label, otherid, referralCode, orderID) {
  const userRef = db.collection("Users").doc(uid);

  let before = 0;
  let after = 0;
  let TPLoyalty = {};
  let TPWallet = {};
  const nowTS = admin.firestore.Timestamp.now();

  await db.runTransaction(async (tx) => {
    const snap = await tx.get(userRef);
    const user = snap.exists ? snap.data() : {};

    TPLoyalty = user.TPLoyalty || {};
    TPWallet = user.TPWallet || {};

    before = Number(TPWallet.pointsBalance) || 0;
    after = before - amount;

    const updatedLoyalty = {
      ...TPLoyalty,
      streakCount: 0,
      updated: nowTS
    };

    tx.set(
      userRef,
      {
        TPWallet: {
          ...TPWallet,
          pointsBalance: after
        },
        TPLoyalty: updatedLoyalty
      },
      { merge: true }
    );
  });

  const settings = await db.collection("Settings").doc("global").get().then(s => s.data());
  const { seasonalActive, seasonalName, seasonalMultiplier } = getSeasonFromSettings(settings);

  const entry = {
    amount: -amount,
    type,
    label,
    newUserUID: otherid || null,
    referralCode: referralCode || null,
    orderID: orderID || null,
    reason: "redeem",
    pulsepointsBefore: before,
    pulsepointsAfter: after,
    streakCount: 0,
    ts: nowTS,
    pointsSnapshot: {
      seasonalName,
      seasonalMultiplier,
      seasonalActive,
      tierName: TPLoyalty.tier || "",
      tierMultiplier: TPLoyalty.tierMultiplier || 1,
      streakCount: 0,
      streakMultiplier: TPLoyalty.streakMultiplier || 1,
      calculationVersion: TPLoyalty.calculationVersion || 1,
      pointsBefore: before,
      pointsAfter: after
    }
  };

  await addHistory(uid, entry);
}

async function addHistory(uid, entry) {
  const historyRef = db
    .collection("PulseHistory")
    .doc(uid)
    .collection("entries")
    .doc();

  await historyRef.set({
    ...entry,
    createdAt: entry.createdAt || admin.firestore.Timestamp.now()
  });
}

export const handleReferral = onCall(
  {
    region: "us-central1",
    timeoutSeconds: 30,
    memory: "256MiB"
  },
  async (req, res) => {

    const data = req.data || {};
    const context = req.auth;

    const referralCode = data.referralCode;
    const newUserUID = context && context.uid;

    if (!newUserUID) {
      throw new Error("Unauthenticated.");
    }

    if (!referralCode) {
      throw new Error("Missing referralCode.");
    }

    // -----------------------------
    // 1. Look up referrer (NEW SCHEMA)
    // -----------------------------
    const refSnap = await db
      .collection("Users")
      .where("TPIdentity.referralCode", "==", referralCode)
      .limit(1)
      .get();

    if (refSnap.empty) {
      throw new Error("Invalid referral code.");
    }

    const referrerDoc = refSnap.docs[0];
    const referrerUID = referrerDoc.id;

    // -----------------------------
    // 2. Prevent self-referral
    // -----------------------------
    if (referrerUID === newUserUID) {
      throw new Error("Cannot refer yourself.");
    }

    // -----------------------------
    // 3. Prevent double-referral
    // -----------------------------
    const existingRef = await db
      .collection("Referrals")
      .where("newUserUID", "==", newUserUID)
      .limit(1)
      .get();

    if (!existingRef.empty) {
      throw new Error("User already referred.");
    }

    // -----------------------------
    // 4. Create referral record
    // -----------------------------
    const referralRef = db.collection("Referrals").doc();
    const referralPayload = {
      id: referralRef.id,
      referrerUID,
      newUserUID,
      referralCode,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      reason: "referral_redemption",
      actor: "user",
      source: "handleReferral"
    };

    await referralRef.set(referralPayload);

    // -----------------------------
    // 5. Reward referrer + new user
    // -----------------------------
    await grantPulsePoints(
      referrerUID,
      50,
      "earn",
      "referral_referrer",
      newUserUID,
      referralCode
    );

    await grantPulsePoints(
      newUserUID,
      25,
      "earn",
      "referral_new_user",
      referrerUID,
      referralCode
    );

    // -----------------------------
    // 6. Log to CHANGES
    // -----------------------------
    await db.collection("CHANGES").add({
      type: "referral",
      referralCode,
      referrerUID,
      newUserUID,
      metadata: referralPayload,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    // -----------------------------
    // 7. IdentityHistory snapshots
    // -----------------------------
    await db
      .collection("IdentityHistory")
      .doc(newUserUID)
      .collection("snapshots")
      .add({
        snapshotType: "referralApplied",
        referralCode,
        referrerUID,
        newUserUID,
        metadata: referralPayload,
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      });

    await db
      .collection("IdentityHistory")
      .doc(referrerUID)
      .collection("snapshots")
      .add({
        snapshotType: "referralEarned",
        referralCode,
        referrerUID,
        newUserUID,
        metadata: referralPayload,
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      });

    return {
      success: true,
      referrerUID,
      newUserUID,
      referralCode
    };
  }
);

async function loadHistory(uid) {
  // -----------------------------
  // 1. Load last 50 history entries
  // -----------------------------
  const histSnap = await admin
    .firestore()
    .collection("PulseHistory")
    .doc(uid)
    .collection("entries")
    .orderBy("ts", "desc")
    .limit(50)
    .get();

  const docs = histSnap.docs;

  // -----------------------------
  // 2. Load global settings once
  // -----------------------------
  const settingsSnap = await db.collection("Settings").doc("global").get();
  const settings = settingsSnap.data() || {};

  // Seasonal logic once
  const { seasonalActive, seasonalName, seasonalMultiplier } =
    getSeasonFromSettings(settings);

  // -----------------------------
  // 3. Timestamp normalizer
  // -----------------------------
  const normalizeTS = (ts) => {
    if (!ts) return null;

    if (typeof ts.toMillis === "function") return ts.toMillis();
    if (ts instanceof Date) return isNaN(ts.getTime()) ? null : ts.getTime();

    if (typeof ts === "object" && typeof ts._seconds === "number") {
      return ts._seconds * 1000 + Math.floor((ts._nanoseconds || 0) / 1e6);
    }

    const d = new Date(ts);
    return isNaN(d.getTime()) ? null : d.getTime();
  };

  // -----------------------------
  // 4. Process each entry in parallel
  // -----------------------------
  const orderFetches = docs.map(async (doc) => {
    const item = { id: doc.id, ...doc.data() };

    // Normalize timestamps
    item.ts = normalizeTS(item.ts);
    item.createdAt = normalizeTS(item.createdAt);

    // -----------------------------
    // If tied to an order → hydrate
    // -----------------------------
    if (item.orderID) {
      const orderSnap = await admin
        .firestore()
        .collection("Orders")
        .doc(String(item.orderID))
        .get();

      if (orderSnap.exists) {
        const order = orderSnap.data();

        item.orderLength = order.orderLength ?? null;
        item.orderedAt = normalizeTS(order.orderedAt);
        item.deliveredAt = normalizeTS(order.deliveredAt);

        item.pointsSnapshot = order.pointsSnapshot ?? null;

        item.itemName = order.itemName ?? null;
        item.orderprice = order.orderprice ?? null;
        item.ordertax = order.ordertax ?? null;
        item.ordertip = order.ordertip ?? null;
        item.ordershipping = order.ordershipping ?? null;
        item.ordertotal = order.ordertotal ?? null;
        item.payoutAmount = order.payoutAmount ?? null;
      }
    }

    // -----------------------------
    // 5. Generate snapshot if missing
    // -----------------------------
    if (!item.pointsSnapshot) {
      item.pointsSnapshot = {
        type: item.type,
        label: item.label,
        amount: item.amount,
        basePoints: item.amount,
        tierMultiplier: 1,
        streakMultiplier: 1,
        seasonalMultiplier,
        tierBonusPoints: 0,
        streakBonusPoints: 0,
        seasonalBonusPoints: 0,
        fastDeliveryBonus: 0,
        delayPenalty: 0,
        totalPointsEarned: item.amount,
        seasonalActive,
        seasonalName,
        calculationVersion: 1,
        ts: item.ts,
        createdAt: item.createdAt
      };
    }

    return item;
  });

  // -----------------------------
  // 6. Resolve all parallel fetches
  // -----------------------------
  const history = await Promise.all(orderFetches);

  return history;
}
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
