// ============================================================================
// FILE: tropic-pulse-functions/PULSE-WORLD/PulseWorldBank-v20.js
// ORGAN: PulseWorldBank-v20 (Stripe Organ)
// LAYER: PULSE-WORLD / FINANCIAL-CORE / IMMORTAL-V20
// ============================================================================
//
// WHAT THIS FILE **IS**
// ----------------------
// • The **Stripe Organ** for Pulse‑World‑Bank v20
// • A **singleton Stripe client factory** (IMMORTAL, drift‑proof)
// • A **financial nervous‑system adapter**
// • A **pure logic module** (NO handlers, NO routing)
// • A **deterministic, zero‑state organ**
// • The **only place** Stripe is initialized in the entire organism
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
// SAFETY CONSTRAINTS
// ------------------
// • Never log Stripe secret keys
// • Never expose Stripe secret keys
// • Never create multiple Stripe instances
// • Never change API version without explicit approval
// ============================================================================
import {
  OrganismIdentity,
  buildPulseOrganismMap as PulseOrganismMap,
  buildPulseOrganismMap as buildOrganismMap
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
import { admin, db } from "./PulseWorldGenome-v20.js";
import Stripe from "stripe";


// ============================================================================
// STRIPE SINGLETON — IMMORTAL INITIALIZER
// ============================================================================

let stripeInstance = null;

/**
 * initializeStripe(optionalKey)
 * -----------------------------
 * Internal initializer that guarantees:
 *  • Exactly one Stripe instance per cold start.
 *  • Optional override key (first call wins).
 */
function initializeStripe(optionalKey) {
  if (stripeInstance) return stripeInstance;

  const envKey = process.env.STRIPE_SECRET_KEY;
  const key = optionalKey || envKey;

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

  return stripeInstance;
}

/**
 * getStripe()
 * -----------
 * Public accessor for the singleton Stripe client.
 * External modules should always call this instead of `new Stripe(...)`.
 */
export function getStripe() {
  return initializeStripe();
}

// ============================================================================
// LOGGING HELPERS — CONSISTENT, SAFE, PREFIXED
// ============================================================================

function logInfo(...args) {
  // No secrets, no keys, just tagged info.
  console.log("[PulseWorldBank]", ...args);
}

function logWarn(...args) {
  console.warn("[PulseWorldBank][WARN]", ...args);
}

function logError(...args) {
  console.error("[PulseWorldBank][ERROR]", ...args);
}

// ============================================================================
// ACCOUNT ENGINE — CREATE / UPDATE CONNECTED ACCOUNTS
// ============================================================================

/**
 * checkOrCreateStripeAccount(email, country)
 * -----------------------------------------
 * • Normalizes email + country.
 * • Looks up user in Firestore (NEW SCHEMA).
 * • Ensures payout schedule (daily/weekly + weekday).
 * • Updates existing Stripe account OR creates a new one.
 * • Persists Stripe account ID + payout config back to Firestore.
 */
export async function checkOrCreateStripeAccount(email, country) {
  logInfo("checkOrCreateStripeAccount: START");

  const stripe = initializeStripe(); // singleton, no extra instances

  // -----------------------------
  // Helpers (pure, reusable)
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

  logInfo("checkOrCreateStripeAccount: inputs", { cleanEmail, thecountry });

  // -----------------------------
  // 2️⃣ Lookup user (NEW SCHEMA)
  // -----------------------------
  const snap = await admin
    .firestore()
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
    logWarn("Invalid payFrequency, defaulting to daily");
    payFrequency = "daily";
  }

  // -----------------------------
  // 4️⃣ Determine payDay (NEW SCHEMA)
  // -----------------------------
  let payDay = null;

  if (payFrequency === "weekly") {
    payDay = cleanLower(userData.TPWallet?.payDay, "monday");

    const allowedDays = [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday"
    ];

    if (!allowedDays.includes(payDay)) {
      logWarn("Invalid payDay, defaulting to monday");
      payDay = "monday";
    }
  }

  logInfo("checkOrCreateStripeAccount: payout settings", {
    payFrequency,
    payDay
  });

  // -----------------------------
  // 5️⃣ Build Stripe payout schedule
  // -----------------------------
  let schedule = {};

  if (payFrequency === "daily") {
    schedule = { interval: "daily" };
  } else if (payFrequency === "weekly") {
    schedule = {
      interval: "weekly",
      weekly_anchor: payDay
    };
  }

  logInfo("checkOrCreateStripeAccount: Stripe schedule", schedule);

  // -----------------------------
  // 6️⃣ Update existing Stripe account
  // -----------------------------
  if (existingStripeID) {
    try {
      const account = await stripe.accounts.update(existingStripeID, {
        settings: { payouts: { schedule } }
      });

      logInfo("Updated existing Stripe account", { accountId: account.id });

      return {
        stripeAccountID: account.id,
        thecountry,
        role,
        payFrequency,
        payDay
      };
    } catch (err) {
      logError("Stripe update failed", err.message);
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
    logInfo("Created new Stripe account", { accountId: stripeAccountID });
  } catch (err) {
    logError("Stripe account creation error", err);

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
    logInfo("Found existing Stripe account via search", {
      accountId: stripeAccountID
    });
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

  logInfo("Saved Stripe info to Firestore", { stripeAccountID });

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

// ============================================================================
// COUNTRY NORMALIZATION — IMMORTAL HELPER
// ============================================================================

function normalizeCountry(input) {
  if (!input) return "BZ";

  const value = String(input).trim().toLowerCase();
  const cleaned = value.replace(/[\u{1F1E6}-\u{1F1FF}]/gu, "").trim();

  if (/^[a-z]{2}$/i.test(cleaned)) return cleaned.toUpperCase();

  const alpha3 = {
    usa: "US",
    can: "CA",
    mex: "MX",
    blz: "BZ",
    gbr: "GB",
    jam: "JM",
    tto: "TT",
    hnd: "HN",
    gtm: "GT",
    slv: "SV",
    nic: "NI",
    cri: "CR",
    pan: "PA",
    dom: "DO",
    prt: "PR",
    brb: "BB",
    lca: "LC",
    kna: "KN"
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

// ============================================================================
// PIXEL HELPER — 1x1 GIF
// ============================================================================

export function sendPixel(res) {
  const pixel = Buffer.from(
    "R0lGODlhAQABAPAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",
    "base64"
  );

  res.set("Content-Type", "image/gif");
  res.send(pixel);
}

// ============================================================================
// BALANCE LOOKUP — CONNECTED ACCOUNT BALANCE
// ============================================================================

/**
 * findUserStripeBalance(stripeAccountID, stripeSecret?)
 * ----------------------------------------------------
 * • Reads balance for a connected account.
 * • Uses the singleton Stripe client.
 * • Optional `stripeSecret` can seed the singleton on first call.
 */
export async function findUserStripeBalance(stripeAccountID, stripeSecret) {
  logInfo("findUserStripeBalance: START", { stripeAccountID });

  const stripe = initializeStripe(stripeSecret);

  try {
    const balance = await stripe.balance.retrieve({
      stripeAccount: stripeAccountID
    });

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

    logInfo("findUserStripeBalance: RESULT", result);
    return result;
  } catch (err) {
    logError("findUserStripeBalance: ERROR", {
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

// ============================================================================
// PAYMENT ENGINE — UNIFIED PAYMENT INTENT CREATOR
// ============================================================================

/**
 * createPaymentIntent(options)
 * ----------------------------
 * • mode: "reserve"  → reserve metadata flow
 * • mode: "order"    → 5% application_fee_amount flow
 *
 * Replaces legacy:
 *   • create-reserve-payment.js
 *   • create-order-payment.js
 */
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
  logInfo("createPaymentIntent: START", { mode, vendorId });

  const stripe = getStripe();

  if (!mode || !["reserve", "order"].includes(mode)) {
    throw new Error("Invalid mode. Must be 'reserve' or 'order'.");
  }

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

/**
 * handleStripeWebhook(eventObj)
 * -----------------------------
 * • Accepts a VERIFIED Stripe event object.
 * • No HTTP, no Netlify, no rawBody.
 * • Updates Firestore for onboarding, reserves, and mass email credits.
 */
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

        logInfo("[StripeWebhook] Vendor updated to weekly payouts", { email });
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

      logInfo("[StripeWebhook] Reserve added", {
        vendorId,
        reserveAmount
      });
    } else {
      logWarn(
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

    logInfo("[StripeWebhook] Mass email credits added", {
      userID,
      quantity,
      eventID
    });
  }

  return { success: true };
}

// ============================================================================
// CURRENCY ENGINE — IMMORTAL v20
// ============================================================================

/**
 * determinePayoutCurrency(stripe, stripeAccountID, payoutAmountCents)
 * ------------------------------------------------------------------
 * • Chooses best transfer currency (BZD if supported, else USD, else default).
 * • Returns both transfer + display amounts.
 */
export async function determinePayoutCurrency(
  stripe,
  stripeAccountID,
  payoutAmountCents
) {
  logInfo("determinePayoutCurrency: START", { stripeAccountID });

  const payoutAmountUSD = payoutAmountCents / 100;

  let account;
  try {
    account = await stripe.accounts.retrieve(stripeAccountID);
  } catch (err) {
    logError("Stripe account retrieval failed", err.message);
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

/**
 * calculateReleaseDate(deliveredAt, delayDays = 3)
 * -----------------------------------------------
 * • Adds `delayDays` to a base date and returns ISO string.
 */
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

