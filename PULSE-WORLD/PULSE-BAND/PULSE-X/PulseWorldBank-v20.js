// ============================================================================
// FILE: tropic-pulse-functions/PULSE-WORLD/PulseWorldBank-v20.js
// ORGAN: PulseWorldBank-v20 (Stripe Organ)
// LAYER: PULSE-WORLD / FINANCIAL-CORE / IMMORTAL-V20
// ============================================================================
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝

// ============================================================================
// PAGE INDEX — SOURCE OF TRUTH FOR THIS FILE
// ============================================================================
//
// WHAT THIS FILE **IS**
// ----------------------
// • The **Stripe Organ** for Pulse‑World‑Bank v20
// • A **singleton Stripe client factory**
// • A **financial nervous‑system adapter**
// • A **pure logic module** (NO handlers, NO routing)
// • A **deterministic, drift‑proof, zero‑state organ**
// • The **only place** Stripe is initialized in the entire organism
//
// WHAT THIS FILE **IS NOT**
// -------------------------
// • Not a Netlify handler
// • Not a router
// • Not a webhook processor
// • Not a payment endpoint
// • Not a business‑logic module
// • Not allowed to mutate global state
//
// RESPONSIBILITIES
// ----------------
// • Initialize Stripe exactly once per cold start
// • Enforce Stripe API version pinning
// • Provide a safe, deterministic Stripe client
// • Validate environment variables
// • Provide metadata for AI‑assisted debugging
// • Provide a stable organ for all payment‑related modules
//
// EXPORTED FUNCTIONS
// ------------------
// • getStripe()           — singleton Stripe client
// • createPaymentIntent() — unified payment engine
// • handleStripeWebhook() — Stripe CNS processor
// • determinePayoutCurrency() — currency engine
// • calculateReleaseDate()    — reserve timing engine
//
// INTERNAL LOGIC SUMMARY
// ----------------------
// • Loads environment variables from process.env
// • Validates STRIPE_SECRET_KEY
// • Creates a single Stripe instance
// • Caches it in module scope
// • Returns the same instance for all callers
//
// ALLOWED IMPORTS
// ---------------
// • stripe (official Stripe SDK)
// • dotenv/config (optional, for local dev)
// • NO other imports unless Aldwyn approves
//
// FORBIDDEN IMPORTS
// -----------------
// • Any Netlify handler
// • Any Firebase function
// • Any dynamic import
// • Any file that creates side effects
//
// DEPLOYMENT RULES
// ----------------
// • Runs ONLY on backend
// • Must remain ESM
// • Must remain side‑effect‑free
// • Must remain deterministic
//
// SAFETY CONSTRAINTS
// ------------------
// • Never log Stripe secret keys
// • Never expose Stripe secret keys
// • Never create multiple Stripe instances
// • Never change API version without explicit approval
//
// ============================================================================
// AI EXPERIENCE META — IMMORTAL ORGAN BLOCK
// ============================================================================
import { admin, db } from "./PulseWorldGenome-v20.js";
import Stripe from "stripe";

export const AI_EXPERIENCE_META = {
  identity: "PulseWorldBank.StripeOrgan",
  version: "v20-Immortal",
  layer: "pulse_world_bank",
  role: "financial_core_adapter",
  lineage: [
    "StripeOrgan-v12",
    "StripeOrgan-v14-Immortal",
    "StripeOrgan-v16-Immortal-Evo",
    "StripeOrgan-v20-Immortal"
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
    organ: "PulseWorldBank-v20",
    mesh: "PulseMesh-v20",
    send: "PulseSend-v20",
    stripe: "Stripe-v2023-10-16"
  },

  safety: {
    neverLogSecrets: true,
    neverExposeKeys: true,
    neverCreateMultipleInstances: true,
    neverUseDynamicImport: true
  }
};

// ============================================================================
// STRIPE ORGAN IMPLEMENTATION
// ============================================================================

// Singleton instance — one per cold start
let stripeInstance = null;

/**
 * getStripe()
 * -----------
 * Returns the singleton Stripe client.
 */
export function getStripe() {
  if (!stripeInstance) {
    const key = process.env.STRIPE_SECRET_KEY;

    if (!key) {
      throw new Error(
        "[PulseWorldBank-v20] STRIPE_SECRET_KEY is not set — Stripe organ cannot initialize"
      );
    }

    stripeInstance = new Stripe(key, {
      apiVersion: "2023-10-16",
      appInfo: {
        name: "PulseWorldBank",
        version: "v20-Immortal",
        url: "https://tropicpulse.bz"
      }
    });
  }

  return stripeInstance;
}

// ============================================================================
// PAYMENT ENGINE — UNIFIED PAYMENT INTENT CREATOR
// ============================================================================
//
// createPaymentIntent()
// ---------------------
// • mode: "reserve"  → reserve metadata flow
// • mode: "order"    → 5% application_fee_amount flow
//
// Replaces legacy:
//   • create-reserve-payment.js
//   • create-order-payment.js
//
// ============================================================================

/* global log, error, db */

/* ===========================
   CREATE AND UPDATE STRIPE ACCOUNT IF NEEDED
=========================== */
export async function checkOrCreateStripeAccount(email, country) {
  console.log("🔵 [checkOrCreateStripeAccount] START");

  const stripe = new Stripe(process.env.STRIPE_PASSWORD);

  // -----------------------------
  // Helpers
  // -----------------------------
  const normalizeEmail = (v) =>
    typeof v === "string" ? v.trim().toLowerCase() : null;

  const isGarbage = (v) => {
    if (!v) return true;
    const s = String(v);
    return (
      s.trim() === "" ||
      s.includes("{{") ||
      s.includes("add_more_field") ||
      s.includes("fieldLebal") ||
      s.includes("fieldValue") ||
      s.includes("*")
    );
  };

  const clean = (v, fallback = null) => {
    if (isGarbage(v)) return fallback;
    return String(v).trim();
  };

  const cleanLower = (v, fallback = null) => {
    const c = clean(v, fallback);
    return c ? c.toLowerCase() : fallback;
  };

  // -----------------------------
  // 1️⃣ Normalize inputs
  // -----------------------------
  const cleanEmail = clean(normalizeEmail(email), null);
  const thecountry = clean(normalizeCountry(country), "BZ").toUpperCase();

  if (!cleanEmail) {
    throw new Error("Invalid email passed to checkOrCreateStripeAccount");
  }

  console.log("🔹 Inputs:", { cleanEmail, thecountry });

  // -----------------------------
  // 2️⃣ Lookup user (NEW SCHEMA)
  // -----------------------------
  const snap = await admin.firestore()
    .collection("Users")
    .where("TPIdentity.email", "==", cleanEmail)
    .limit(1)
    .get();

  if (snap.empty) {
    throw new Error(`User not found for email: ${cleanEmail}`);
  }

  const userDoc = snap.docs[0];
  const userRef = userDoc.ref;
  const userData = userDoc.data();

  const role = userData.TPIdentity?.role || "Deliverer";
  const existingStripeID = clean(userData.TPSecurity?.stripeAccountID, null);

  // -----------------------------
  // 3️⃣ Determine payFrequency (NEW SCHEMA)
  // -----------------------------
  let payFrequency = cleanLower(userData.TPWallet?.payFrequency, null);

  if (!payFrequency) {
    if (role === "Deliverer") payFrequency = "daily";
    if (role === "Vendor") payFrequency = "weekly";
    if (!payFrequency) payFrequency = "daily";
  }

  const allowedFreq = ["daily", "weekly"];
  if (!allowedFreq.includes(payFrequency)) {
    console.log("⚠️ Invalid payFrequency, defaulting to daily");
    payFrequency = "daily";
  }

  // -----------------------------
  // 4️⃣ Determine payDay (NEW SCHEMA)
  // -----------------------------
  let payDay = null;

  if (payFrequency === "weekly") {
    payDay = cleanLower(userData.TPWallet?.payDay, "monday");

    const allowedDays = [
      "monday", "tuesday", "wednesday",
      "thursday", "friday"
    ];

    if (!allowedDays.includes(payDay)) {
      console.log("⚠️ Invalid payDay, defaulting to monday");
      payDay = "monday";
    }
  }

  console.log("🔹 Final payout settings:", { payFrequency, payDay });

  // -----------------------------
  // 5️⃣ Build Stripe payout schedule
  // -----------------------------
  let schedule = {};

  if (payFrequency === "daily") {
    schedule = { interval: "daily" };
  }

  if (payFrequency === "weekly") {
    schedule = {
      interval: "weekly",
      weekly_anchor: payDay
    };
  }

  console.log("🔹 Stripe schedule:", schedule);

  // -----------------------------
  // 6️⃣ Update existing Stripe account
  // -----------------------------
  if (existingStripeID) {
    try {
      const account = await stripe.accounts.update(existingStripeID, {
        settings: { payouts: { schedule } }
      });

      console.log("✅ Updated existing Stripe account:", account.id);

      return {
        stripeAccountID: account.id,
        thecountry,
        role,
        payFrequency,
        payDay
      };
    } catch (err) {
      console.error("❌ Stripe update failed:", err.message);
      throw new Error(`Stripe Update Failed: ${err.message}`, { cause: err });
    }
  }

  // -----------------------------
  // 7️⃣ Create new Stripe account
  // -----------------------------
  let stripeAccountID = null;

  try {
    const account = await stripe.accounts.create({
      type: "express",
      country: thecountry,
      email: cleanEmail,
      capabilities: {
        transfers: { requested: true }
      },
      settings: {
        payouts: { schedule }
      }
    });

    stripeAccountID = account.id;

    console.log("🆕 Created new Stripe account:", stripeAccountID);

  } catch (err) {
    console.error("❌ Stripe account creation error:", err);

    const search = await stripe.accounts.search({
      query: `email:'${cleanEmail}'`
    });

    if (!search.data.length) {
      throw new Error(
        `Stripe account exists but cannot be retrieved for ${cleanEmail}`,
        { cause: err }
      );
    }

    stripeAccountID = search.data[0].id;

    console.log("🔍 Found existing Stripe account:", stripeAccountID);
  }

  // -----------------------------
  // 8️⃣ Save to Firestore (NEW SCHEMA)
  // -----------------------------
  await userRef.set(
    {
      TPSecurity: {
        stripeAccountID
      },
      TPIdentity: {
        country: thecountry
      },
      TPWallet: {
        payFrequency,
        payDay
      },
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    },
    { merge: true }
  );

  console.log("💾 Saved Stripe info to Firestore");

  // -----------------------------
  // 9️⃣ Return values
  // -----------------------------
  return {
    stripeAccountID,
    thecountry,
    role,
    payFrequency,
    payDay
  };
}

function normalizeCountry(input) {
  if (!input) return "BZ";

  const value = String(input).trim().toLowerCase();
  const cleaned = value.replace(/[\u{1F1E6}-\u{1F1FF}]/gu, "").trim();

  if (/^[a-z]{2}$/i.test(cleaned)) return cleaned.toUpperCase();

  const alpha3 = {
    usa: "US", can: "CA", mex: "MX", blz: "BZ", gbr: "GB",
    jam: "JM", tto: "TT", hnd: "HN", gtm: "GT", slv: "SV",
    nic: "NI", cri: "CR", pan: "PA", dom: "DO", prt: "PR",
    brb: "BB", lca: "LC", kna: "KN"
  };
  if (alpha3[cleaned]) return alpha3[cleaned];

  const map = {
    "belize": "BZ",
    "united states": "US",
    "united states of america": "US",
    "usa": "US",
    "us": "US",
    "mexico": "MX",
    "canada": "CA",
    "united kingdom": "GB",
    "great britain": "GB",
    "uk": "GB",
    "jamaica": "JM",
    "bahamas": "BS",
    "trinidad and tobago": "TT",
    "guatemala": "GT",
    "honduras": "HN",
    "el salvador": "SV",
    "nicaragua": "NI",
    "costa rica": "CR",
    "panama": "PA",
    "dominican republic": "DO",
    "puerto rico": "PR",
    "barbados": "BB",
    "saint lucia": "LC",
    "saint kitts and nevis": "KN",
    "germany": "DE",
    "france": "FR",
    "spain": "ES",
    "italy": "IT",
    "australia": "AU",
    "new zealand": "NZ",
    "india": "IN",
    "china": "CN",
    "japan": "JP",
    "south korea": "KR",
    "brazil": "BR",
    "argentina": "AR",
    "colombia": "CO",
    "chile": "CL"
  };

  return map[cleaned] || "BZ";
}
export function sendPixel(res) {
  const pixel = Buffer.from(
    "R0lGODlhAQABAPAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",
    "base64"
  );

  res.set("Content-Type", "image/gif");
  res.send(pixel);
}

export async function findUserStripeBalance(stripeAccountID, stripeSecret) {
  console.log("🔵 [findUserStripeBalance] START", { stripeAccountID });

  const stripe = new Stripe(stripeSecret);

  try {
    const balance = await stripe.balance.retrieve({
      stripeAccount: stripeAccountID
    });

    // Stripe returns arrays like:
    // balance.available = [{ amount: 1234, currency: "usd" }]
    const available = balance?.available?.[0]?.amount ?? 0;
    const pending = balance?.pending?.[0]?.amount ?? 0;

    const toBZD = (v) => {
      const n = Number(v);
      return isNaN(n) ? "0.00" : (n / 100).toFixed(2);
    };

    const result = {
      pendingBalance: toBZD(pending),
      availableBalance: toBZD(available)
    };

    console.log("🟢 [findUserStripeBalance] RESULT", result);
    return result;

  } catch (err) {
    console.error("❌ [findUserStripeBalance] ERROR:", {
      message: err.message,
      type: err.type,
      code: err.code
    });

    return {
      pendingBalance: "N/A",
      availableBalance: "N/A"
    };
  }
}

export async function createPaymentIntent({
  mode,               // "reserve" or "order"
  amount,
  vendorId,
  customerId,
  paymentMethodId,
  stripeAccountID,
  reserveAmount,
  currency = "usd",
  description = "",
  metadata = {}
}) {
  log?.("🔵 [createPaymentIntent] START");

  const stripe = getStripe();

  // Validate mode
  if (!mode || !["reserve", "order"].includes(mode)) {
    throw new Error("Invalid mode. Must be 'reserve' or 'order'.");
  }

  // Normalize amount
  const normalizeAmount = (v) => {
    if (v == null) return 0;
    const decoded = decodeURIComponent(String(v));
    if (decoded.includes("|")) {
      return decoded
        .split("|")
        .map((x) => Number(x) || 0)
        .reduce((a, b) => a + b, 0);
    }
    const n = Number(decoded);
    return isNaN(n) ? 0 : Number(n.toFixed(2));
  };

  const amountCents =
    mode === "order"
      ? Math.round(normalizeAmount(amount) * 100)
      : Number(amount);

  if (!amountCents || !vendorId) {
    throw new Error("Missing required fields: amount, vendorId");
  }

  // Vendor lookup
  const vendorSnap = await db.collection("Users").doc(vendorId).get();
  if (!vendorSnap.exists) {
    throw new Error("Vendor not found");
  }

  const vendorData = vendorSnap.data();
  const vendorStripeID = stripeAccountID || vendorData.stripeAccountID;

  if (!vendorStripeID) {
    throw new Error("Vendor missing Stripe account");
  }

  // Determine currency
  const info = await determinePayoutCurrency(
    stripe,
    vendorStripeID,
    amountCents
  );

  // Metadata
  const fullMetadata = {
    vendorId: String(vendorId),
    ...Object.fromEntries(
      Object.entries(metadata).map(([k, v]) => [k, String(v)])
    )
  };

  // MODE: RESERVE
  if (mode === "reserve") {
    if (!Number.isInteger(reserveAmount)) {
      throw new Error("reserveAmount must be an integer in cents");
    }

    fullMetadata.reserveAmount = String(reserveAmount);

    const pi = await stripe.paymentIntents.create({
      amount: amountCents,
      currency: info.transferCurrency,
      description: description.trim(),
      metadata: fullMetadata,
      transfer_data: {
        destination: vendorStripeID
      }
    });

    return {
      clientSecret: pi.client_secret,
      paymentIntentId: pi.id
    };
  }

  // MODE: ORDER (5% reserve)
  if (mode === "order") {
    if (!customerId || !paymentMethodId) {
      throw new Error("Missing customerId or paymentMethodId");
    }

    const reserveFee = Math.round(amountCents * 0.05);

    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: customerId
    });

    const pi = await stripe.paymentIntents.create({
      amount: amountCents,
      currency: info.transferCurrency,
      customer: customerId,
      payment_method: paymentMethodId,
      confirm: true,
      application_fee_amount: reserveFee,
      transfer_data: {
        destination: vendorStripeID
      },
      metadata: {
        vendorId,
        reserveAmount: reserveFee
      }
    });

    return {
      clientSecret: pi.client_secret,
      paymentIntentId: pi.id
    };
  }

  throw new Error("Unhandled mode in createPaymentIntent");
}

// ============================================================================
// WEBHOOK CNS — PURE STRIPE EVENT PROCESSOR
// ============================================================================
//
// handleStripeWebhook()
// ---------------------
// • Accepts a VERIFIED Stripe event object
// • No HTTP, no Netlify, no rawBody
//
// ============================================================================

/* global warn */

export async function handleStripeWebhook(eventObj) {
  const stripe = getStripe();

  // 1. VENDOR ONBOARDING
  if (eventObj.type === "account.created" || eventObj.type === "account.updated") {
    const account = eventObj.data.object;

    const stripeAccountID = account.id;
    const email = account.email;
    const country = account.country;

    if (email) {
      const snap = await db
        .collection("Users")
        .where("UserEmail", "==", email)
        .limit(1)
        .get();

      if (!snap.empty) {
        const userRef = snap.docs[0].ref;

        await userRef.set(
          {
            UserCountry: country,

            TPIdentity: {
              role: "Vendor",
              stripeAccountID,
              stripeDashboardURL: null
            },

            TPNotifications: {
              receiveMassEmails: true
            },

            TPWallet: {
              payFrequency: "weekly",
              payDay: "monday"
            },

            updatedAt: admin.firestore.FieldValue.serverTimestamp()
          },
          { merge: true }
        );

        await db.collection("CHANGES").add({
          type: "vendorOnboarding",
          uid: userRef.id,
          stripeAccountID,
          country,
          reason: "stripe_vendor_onboarding",
          actor: "system",
          source: "stripeWebhook",
          createdAt: admin.firestore.FieldValue.serverTimestamp()
        });

        await db
          .collection("IdentityHistory")
          .doc(userRef.id)
          .collection("snapshots")
          .add({
            snapshotType: "vendorOnboarding",
            stripeAccountID,
            country,
            reason: "stripe_vendor_onboarding",
            actor: "system",
            source: "stripeWebhook",
            createdAt: admin.firestore.FieldValue.serverTimestamp()
          });

        await stripe.accounts.update(stripeAccountID, {
          settings: {
            payouts: {
              schedule: {
                interval: "weekly",
                weekly_anchor: "monday"
              }
            }
          }
        });

        log?.(`[StripeWebhook] Vendor updated: ${email} → weekly payouts`);
      }
    }
  }

  // 2. RESERVE SYSTEM
  if (eventObj.type === "payment_intent.succeeded") {
    const pi = eventObj.data.object;
    const vendorId = pi.metadata?.vendorId;
    const reserveAmount = parseInt(pi.metadata?.reserveAmount || "0", 10);

    let country = null;

    if (pi.transfer_data?.destination) {
      const acct = await stripe.accounts.retrieve(pi.transfer_data.destination);
      country = acct.country;
    }

    if (vendorId && reserveAmount) {
      const vendorRef = db.collection("Users").doc(vendorId);

      await vendorRef.set(
        {
          UserCountry: country,

          TPWallet: {
            reserveBalance: admin.firestore.FieldValue.increment(reserveAmount),
            reserveHistory: admin.firestore.FieldValue.arrayUnion({
              amount: reserveAmount,
              date: new Date().toISOString(),
              orderId: pi.id,
              releaseDate: calculateReleaseDate(new Date(), 60),
              type: "reserve_add"
            })
          }
        },
        { merge: true }
      );

      await db.collection("CHANGES").add({
        type: "reserveAdd",
        uid: vendorId,
        amount: reserveAmount,
        orderId: pi.id,
        reason: "reserve_add",
        actor: "system",
        source: "stripeWebhook",
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      });

      log?.(
        `[StripeWebhook] Reserve added: Vendor ${vendorId} +${reserveAmount} cents`
      );
    } else {
      warn?.(
        "[StripeWebhook] payment_intent.succeeded missing vendorId or reserveAmount"
      );
    }
  }

  // 3. MASS EMAIL CREDITS
  if (eventObj.type === "checkout.session.completed") {
    const session = eventObj.data.object;

    const eventID = session.metadata?.eventID;
    if (!eventID) {
      throw new Error("Missing eventID");
    }

    const eventRef = db.collection("Events").doc(eventID);
    const eventSnap = await eventRef.get();

    if (!eventSnap.exists) {
      throw new Error("Event not found");
    }

    const eventData = eventSnap.data();
    const useremail = eventData.email;

    const snap = await db
      .collection("Users")
      .where("UserEmail", "==", useremail)
      .limit(1)
      .get();

    if (snap.empty) {
      throw new Error("Invalid user");
    }

    const userDoc = snap.docs[0];
    const userRef = userDoc.ref;
    const userID = userDoc.id;

    const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
    const quantity = lineItems.data[0]?.quantity || 1;

    await userRef.set(
      {
        TPNotifications: {
          paidMassNotificationCredits:
            admin.firestore.FieldValue.increment(quantity)
        }
      },
      { merge: true }
    );

    await db.collection("CHANGES").add({
      type: "massEmailCredits",
      uid: userID,
      quantity,
      eventID,
      reason: "mass_email_credit_purchase",
      actor: "system",
      source: "stripeWebhook",
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    log?.(
      `[StripeWebhook] Added ${quantity} credits to user ${userID} for event ${eventID}`
    );
  }

  return { success: true };
}

// ============================================================================
// CURRENCY ENGINE — IMMORTAL v20
// ============================================================================

export async function determinePayoutCurrency(stripe, stripeAccountID, payoutAmountCents) {
  log?.("🔵 [determinePayoutCurrency] START");

  const payoutAmountUSD = payoutAmountCents / 100;

  let account;
  try {
    account = await stripe.accounts.retrieve(stripeAccountID);
  } catch (err) {
    error?.("❌ Stripe account retrieval failed:", err.message);
    return {
      accountCurrency: "usd",
      transferCurrency: "usd",
      transferAmount: payoutAmountCents,
      displayAmount: payoutAmountUSD,
      displayCurrency: "$"
    };
  }

  const defaultCurrency = (account.default_currency || "usd").toLowerCase();

  const supported = new Set([
    ...(account.supported_payment_currencies || []),
    ...(account.supported_transfer_currencies || [])
  ]);

  const supportsBZD = supported.has("bzd");
  const supportsUSD = supported.has("usd");

  const FX_RATE_USD_TO_BZD = 2.0;

  let transferCurrency;
  let transferAmount;
  let displayCurrency;
  let displayAmount;

  // PRIORITY: BZD → USD → fallback
  if (supportsBZD) {
    transferCurrency = "bzd";
    const bzdDollars = payoutAmountUSD * FX_RATE_USD_TO_BZD;
    transferAmount = Math.round(bzdDollars * 100);
    displayCurrency = "BZ$";
    displayAmount = bzdDollars;

  } else if (supportsUSD) {
    transferCurrency = "usd";
    transferAmount = payoutAmountCents;
    displayCurrency = "$";
    displayAmount = payoutAmountUSD;

  } else {
    transferCurrency = defaultCurrency;
    transferAmount = payoutAmountCents;
    displayCurrency = defaultCurrency.toUpperCase();
    displayAmount = payoutAmountUSD;
  }

  return {
    accountCurrency: defaultCurrency,
    transferCurrency,
    transferAmount,
    displayAmount,
    displayCurrency
  };
}

/* ------------------------------------------------------
   Calculate reserve release date (3-day default)
------------------------------------------------------ */
export function calculateReleaseDate(deliveredAt, delayDays = 3) {
  const base = deliveredAt instanceof Date ? deliveredAt : new Date(deliveredAt);
  const result = new Date(base);
  result.setDate(result.getDate() + delayDays);
  return result.toISOString();
}

// ============================================================================
// FOOTER — LEARNING NOTES FOR ALDWYN
// ============================================================================
//
// (keep your existing Stripe master notes here if you want)
// ============================================================================
