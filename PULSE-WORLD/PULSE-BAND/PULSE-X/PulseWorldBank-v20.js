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
// • getStripe() — returns the singleton Stripe client
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
// • Runs ONLY on Netlify backend
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
 *
 * BEHAVIOR:
 *   • Reads STRIPE_SECRET_KEY from process.env
 *   • Validates presence
 *   • Creates Stripe client with pinned API version
 *   • Caches instance for future calls
 *
 * RETURNS:
 *   • Stripe client (singleton)
 *
 * THROWS:
 *   • Error if STRIPE_SECRET_KEY is missing
 *
 * NOTES:
 *   • This function is pure and deterministic
 *   • Safe to call from any Netlify function
 *   • Never logs or exposes secrets
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
// FOOTER — LEARNING NOTES FOR ALDWYN
// ============================================================================
//
// ⭐ STRIPE MASTER NOTES ⭐
// ------------------------
// • Stripe is NOT a bank — it is a programmable financial layer
// • Every object in Stripe is immutable — updates create new versions
// • Stripe Connect = multi‑party payments (marketplaces)
// • Stripe Accounts = your vendors / creators / sellers
// • Stripe Customers = your end‑users
// • Stripe PaymentIntents = the core payment flow
// • Stripe SetupIntents = save cards without charging
// • Stripe Webhooks = the truth source (NEVER trust frontend)
// • Stripe Balance = your money in Stripe
// • Stripe Payouts = money leaving Stripe to bank accounts
// • Stripe Transfers = money moving between connected accounts
//
// ⭐ PULSE‑WORLD‑BANK RULES ⭐
// ---------------------------
// • All money movement must go through this organ
// • All Stripe calls must use getStripe()
// • All payment logic must live in PULSE-WORLD-BANK functions
// • Never call Stripe directly from UI
// • Never expose secret keys
//
// ⭐ IMMORTAL ORGANISM NOTES ⭐
// ----------------------------
// • This file is a “financial organ” in the Pulse organism
// • It must remain deterministic
// • It must remain drift‑proof
// • It must remain stable across versions
// • It is safe to evolve — but only with explicit intent
//
// ============================================================================
// END OF stripe.js
// ============================================================================



// ============================================================================
// FILE: tropic-pulse-functions/PULSE-WORLD/netlify/functions/stripe-webhook.js
// ORGAN: PulseWorldBank-v20 (Stripe Webhook CNS)
// LAYER: PULSE-WORLD / FINANCIAL-CORE / WEBHOOK-INTAKE
// ============================================================================
//
// ROLE:
//   Netlify Stripe webhook endpoint that processes Stripe events.
//   Handles three major flows:
//     1. Vendor onboarding (account.created / account.updated)
//     2. Reserve system updates (payment_intent.succeeded)
//     3. Mass email credit purchases (checkout.session.completed)
//
//   This file IS a Netlify handler.
//   This file SHOULD remain narrow and stable.
//   All heavy logic should be delegated to helpers/organs.
//
// WHAT THIS FILE IS:
//   • A Stripe webhook processor
//   • A Firestore mutation layer for vendor + wallet updates
//   • A critical endpoint that must remain correct and deterministic
//
// WHAT THIS FILE IS NOT:
//   • Not a UI endpoint
//   • Not a general API router
//   • Not a scoring engine
//   • Not allowed to contain random new flows
//
// SAFETY NOTES:
//   • Must ALWAYS verify Stripe signatures using rawBody
//   • Never expose Stripe secrets in logs
//   • Never mutate unrelated user fields
//   • Never assume metadata exists — validate defensively
//
// ============================================================================

/* global log,warn,error */


const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

/**
 * Netlify handler: Stripe webhook
 * -------------------------------
 * Expects:
 *   • POST
 *   • rawBody available (Netlify config: body parsing disabled)
 *   • "stripe-signature" header present
 */
export async function handler(event, context) {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    if (!STRIPE_WEBHOOK_SECRET) {
      error("[StripeWebhook] STRIPE_WEBHOOK_SECRET is not set");
      return {
        statusCode: 500,
        body: JSON.stringify({ success: false, error: "Webhook not configured" })
      };
    }

    const stripe = getStripe();

    // Stripe requires rawBody for signature verification
    const rawBody = event.body && event.isBase64Encoded
      ? Buffer.from(event.body, "base64").toString("utf8")
      : event.body || "";

    const signature =
      event.headers["stripe-signature"] ||
      event.headers["Stripe-Signature"] ||
      event.headers["stripe-signature".toLowerCase()];

    if (!signature) {
      error("[StripeWebhook] Missing stripe-signature header");
      return {
        statusCode: 400,
        body: JSON.stringify({
          success: false,
          error: "Missing stripe-signature header"
        })
      };
    }

    let stripeEvent;
    try {
      stripeEvent = stripe.webhooks.constructEvent(
        rawBody,
        signature,
        STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      error("[StripeWebhook] Signature verification failed:", err.message);
      return {
        statusCode: 400,
        body: JSON.stringify({
          success: false,
          error: "Webhook signature verification failed"
        })
      };
    }

    const eventObj = stripeEvent;

    // ---------------------------------------------------------
    // 1. VENDOR ONBOARDING
    // ---------------------------------------------------------
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

          log(`[StripeWebhook] Vendor updated: ${email} → weekly payouts`);
        }
      }
    }

    // ---------------------------------------------------------
    // 2. RESERVE SYSTEM
    // ---------------------------------------------------------
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

        log(
          `[StripeWebhook] Reserve added: Vendor ${vendorId} +${reserveAmount} cents`
        );
      } else {
        warn(
          "[StripeWebhook] payment_intent.succeeded missing vendorId or reserveAmount"
        );
      }
    }

    // ---------------------------------------------------------
    // 3. MASS EMAIL CREDITS
    // ---------------------------------------------------------
    if (eventObj.type === "checkout.session.completed") {
      const session = eventObj.data.object;

      const eventID = session.metadata?.eventID;
      if (!eventID) {
        error("[StripeWebhook] checkout.session.completed missing eventID");
        return {
          statusCode: 400,
          body: JSON.stringify({ error: "Missing eventID" })
        };
      }

      const eventRef = db.collection("Events").doc(eventID);
      const eventSnap = await eventRef.get();

      if (!eventSnap.exists) {
        error("[StripeWebhook] Event not found:", eventID);
        return {
          statusCode: 404,
          body: JSON.stringify({ error: "Event not found" })
        };
      }

      const eventData = eventSnap.data();
      const useremail = eventData.email;

      const snap = await db
        .collection("Users")
        .where("UserEmail", "==", useremail)
        .limit(1)
        .get();

      if (snap.empty) {
        return {
          statusCode: 404,
          body: JSON.stringify({ success: false, error: "Invalid user" })
        };
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

      log(
        `[StripeWebhook] Added ${quantity} credits to user ${userID} for event ${eventID}`
      );
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, received: true })
    };
  } catch (err) {
    error("[StripeWebhook] error:", err.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false })
    };
  }
}

// ============================================================================
// END OF stripe-webhook.js
// ============================================================================



// ============================================================================
// FILE: tropic-pulse-functions/PULSE-WORLD/netlify/functions/create-reserve-payment.js
// ORGAN: PulseWorldBank-v20 (Reserve Payment Creator)
// LAYER: PULSE-WORLD / FINANCIAL-CORE / PAYMENTS
// ============================================================================
//
// ROLE:
//   Creates a PaymentIntent that:
//     • Charges a customer
//     • Sends funds to a vendor’s connected account
//     • Allocates a reserveAmount in metadata for later use by webhook
//
// EXPECTS (JSON body):
//   • amount (integer, cents)
//   • vendorId (string)
//   • stripeAccountID (string)
//   • reserveAmount (integer, cents)
//   • currency (string, default "usd")
//   • description (string, optional)
//   • metadata (object, optional)
//
// SAFETY:
//   • Validates required fields
//   • Ensures amount/reserveAmount are integers
//   • Ensures metadata is stringified
//
// ============================================================================

/* global log,error */

export async function handler(event, context) {
  log?.("🔵 [/create-reserve-payment] START");

  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    const body = JSON.parse(event.body || "{}");
    const stripe = getStripeReserve();

    const {
      amount,
      vendorId,
      stripeAccountID,
      reserveAmount,
      currency = "usd",
      description,
      metadata = {}
    } = body;

    // -----------------------------
    // VALIDATION
    // -----------------------------
    if (!amount || !vendorId || !stripeAccountID) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          success: false,
          error: "Missing required fields: amount, vendorId, stripeAccountID"
        })
      };
    }

    if (!Number.isInteger(amount)) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          success: false,
          error: "amount must be an integer in cents"
        })
      };
    }

    if (!Number.isInteger(reserveAmount)) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          success: false,
          error: "reserveAmount must be an integer in cents"
        })
      };
    }

    // -----------------------------
    // METADATA (STRING-ONLY)
    // -----------------------------
    const fullMetadata = {
      vendorId: String(vendorId),
      reserveAmount: String(reserveAmount || 0),
      ...Object.fromEntries(
        Object.entries(metadata).map(([k, v]) => [k, String(v)])
      )
    };

    // -----------------------------
    // CREATE PAYMENT INTENT
    // -----------------------------
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      description: description ? String(description).trim() : "",
      metadata: fullMetadata,
      transfer_data: {
        destination: stripeAccountID
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id
      })
    };
  } catch (err) {
    error?.("Create-reserve-payment error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: err.message })
    };
  }
}

// ============================================================================
// END OF create-reserve-payment.js
// ============================================================================



// ============================================================================
// FILE: tropic-pulse-functions/PULSE-WORLD/netlify/functions/create-order-payment.js
// ORGAN: PulseWorldBank-v20 (Order Payment Creator)
// LAYER: PULSE-WORLD / FINANCIAL-CORE / PAYMENTS
// ============================================================================
//
// ROLE:
//   Creates a PaymentIntent for an order flow that:
//     • Charges a customer
//     • Sends funds to a vendor’s connected account
//     • Applies a 5% reserve via application_fee_amount
//
// EXPECTS (JSON body):
//   • amount (number or string, dollars or encoded)
//   • vendorId (string)
//   • customerId (string)
//   • paymentMethodId (string)
//
// BEHAVIOR:
//   • Cleans and normalizes inputs
//   • Looks up vendor in Firestore
//   • Determines payout currency via determinePayoutCurrency()
//   • Attaches payment method to customer
//   • Creates PaymentIntent with transfer_data + application_fee_amount
//
// ============================================================================

/* global log,error */

export async function handler(event, context) {
  log?.("🔵 [/create-order-payment] START");

  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    const body = JSON.parse(event.body || "{}");
    const stripe = getStripeOrder();

    // -----------------------------
    // CLEANERS
    // -----------------------------
    const clean = (v) => {
      if (!v) return null;
      const s = String(v).trim();
      if (
        s === "" ||
        s.includes("{{") ||
        s.includes("add_more_field") ||
        s.includes("fieldLebal") ||
        s.includes("fieldValue") ||
        s.includes("*")
      )
        return null;
      return s;
    };

    const num = (v) => {
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

    // -----------------------------
    // INPUTS
    // -----------------------------
    const amount = Math.round(num(body.amount) * 100);
    const vendorId = clean(body.vendorId);
    const customerId = clean(body.customerId);
    const paymentMethodId = clean(body.paymentMethodId);

    if (!amount || !vendorId || !customerId || !paymentMethodId) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          success: false,
          error: "Missing required fields"
        })
      };
    }

    // -----------------------------
    // VENDOR LOOKUP
    // -----------------------------
    const vendorSnap = await db.collection("Users").doc(vendorId).get();
    if (!vendorSnap.exists) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          success: false,
          error: "Vendor not found"
        })
      };
    }

    const { stripeAccountID } = vendorSnap.data();
    if (!stripeAccountID) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          success: false,
          error: "Vendor missing Stripe account"
        })
      };
    }

    // -----------------------------
    // DETERMINE CURRENCY
    // -----------------------------
    const info = await determinePayoutCurrency(stripe, stripeAccountID, amount);

    // 5% reserve
    const reserveAmount = Math.round(amount * 0.05);

    // -----------------------------
    // ATTACH PAYMENT METHOD
    // -----------------------------
    await stripe.paymentMethods.attach(paymentMethodId, { customer: customerId });

    // -----------------------------
    // CREATE PAYMENT INTENT
    // -----------------------------
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: info.transferCurrency,
      customer: customerId,
      payment_method: paymentMethodId,
      confirm: true,
      application_fee_amount: reserveAmount,
      transfer_data: {
        destination: stripeAccountID
      },
      metadata: {
        vendorId,
        reserveAmount
      }
    });

    log?.("[create-order-payment] PaymentIntent created:", paymentIntent.id);

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id
      })
    };
  } catch (err) {
    error?.("[create-order-payment] Error creating PaymentIntent:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: "Error creating payment"
      })
    };
  }
}

// ============================================================================
// END OF create-order-payment.js
// ============================================================================


export async function determinePayoutCurrency(stripe, stripeAccountID, payoutAmountCents) {
  log("🔵 [determinePayoutCurrency] START");

  const payoutAmountUSD = payoutAmountCents / 100;

  let account;
  try {
    account = await stripe.accounts.retrieve(stripeAccountID);
  } catch (err) {
    error("❌ Stripe account retrieval failed:", err.message);
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
export function calculateReleaseDate(deliveredAt, delayDays = 3, admin) {
  try {
    if (!deliveredAt) return null;

    let date;

    if (typeof deliveredAt.toDate === "function") {
      date = deliveredAt.toDate();
    } else {
      date = new Date(deliveredAt);
    }

    if (isNaN(date.getTime())) return null;

    date.setDate(date.getDate() + delayDays);

    return admin.firestore.Timestamp.fromDate(date);
  } catch (err) {
    log("❌ calculateReleaseDate error:", err.message);
    return null;
  }
}

/* ------------------------------------------------------
   Calculate platform reserve (default 5%)
------------------------------------------------------ */
export function calculatePlatformReserve(amountCents, reservePercent = 5) {
  const reserve = Math.round((amountCents * reservePercent) / 100);
  return {
    reserveCents: reserve,
    reservePercent
  };
}

/* ------------------------------------------------------
   Calculate vendor payout after reserve
------------------------------------------------------ */
export function calculateVendorPayout(amountCents, reservePercent = 5) {
  const { reserveCents } = calculatePlatformReserve(amountCents, reservePercent);
  const vendorCents = amountCents - reserveCents;

  return {
    vendorCents,
    reserveCents
  };
}

/* ------------------------------------------------------
   Calculate full payout summary (vendor + reserve + currency)
------------------------------------------------------ */
export async function buildPayoutSummary({
  stripe,
  stripeAccountID,
  amountCents,
  reservePercent = 5
}) {
  const { vendorCents, reserveCents } = calculateVendorPayout(amountCents, reservePercent);

  const currencyInfo = await determinePayoutCurrency(
    stripe,
    stripeAccountID,
    vendorCents
  );

  return {
    vendorCents,
    reserveCents,
    ...currencyInfo
  };
}


export function currency(amount, displayCurrency = "$") {
  let raw = String(amount || "").replace(/BZ?\$|\$/g, "").trim();
  const num = Number(raw);
  const safe = isNaN(num) ? "0.00" : num.toFixed(2);

  let cur = String(displayCurrency || "$").trim().toUpperCase();
  cur = cur === "USD" || cur === "$" || cur === "US$" ? "$" : "BZ$";

  return `${cur}${safe}`;
}

export function formatDisplayAmount(displayCurrency, amount) {
  const safeAmount = Number(amount);
  const finalAmount = isNaN(safeAmount) ? "0.00" : safeAmount.toFixed(2);

  let cur = String(displayCurrency || "$").trim().toUpperCase();
  cur = cur === "USD" || cur === "$" || cur === "US$" ? "$" : "BZ$";

  return currency(finalAmount, cur);
}

/* global log,warn,error */
// ============================================================================
// FILE: tropic-pulse-functions/PULSE-WORLD/netlify/functions/root-redirect.js
// PULSE REDIRECT — VERSION 6.3
// “THE CROSSING GUARD / SAFE‑PASSAGE REDIRECT LAYER”
// ============================================================================
//
// PAGE INDEX (v6.3 Source of Truth)
// ---------------------------------
// ROLE:
//   root-redirect.js is the **CROSSING GUARD** of the backend.
//   It stands at the public edge of the system and ensures safe passage
//   from the app → to Stripe → and back.
//
//   • Validates minimal required parameters (userID, eventID)
//   • Prevents unsafe or malformed crossings
//   • Redirects users safely to the correct Stripe Payment Link
//   • Keeps logic minimal, predictable, and deterministic
//
// WHAT THIS FILE *IS*:
//   • A Netlify HTTP redirect endpoint
//   • A safe-passage layer for payment flows
//   • A deterministic, zero-side-effect redirector
//
// WHAT THIS FILE *IS NOT*:
//   • NOT a router
//   • NOT a backend logic module
//   • NOT a GPU or OS subsystem
//   • NOT a business logic handler
//
// SAFETY CONTRACT (v6.3):
//   • Validate required query parameters
//   • Never expose secrets
//   • Never call external APIs
//   • Keep redirect URLs explicit and intentional
//   • Keep logic minimal and deterministic
//
// STRUCTURE RULES:
//   • No imports allowed unless absolutely required
//   • No mutation of request or response objects
//   • No additional logic beyond validation + redirect
//
// VERSION TAG:
//   version: 6.3
//
// ============================================================================
// ⭐ v6.3 COMMENT LOG
// ---------------------------------------------------------------------------
// • Added full v6.3 PAGE INDEX
// • Added metaphor layer (CROSSING GUARD / SAFE‑PASSAGE REDIRECT LAYER)
// • Added safety contract + structure rules
// • Added v6.3 context map
// • No logic changes
// • No renames
// • No behavior drift
// ============================================================================

export async function handler(event, context) {
  try {
    const params = event.queryStringParameters || {};
    const userID = params.userID;
    const eventID = params.eventID;

    if (!userID) {
      return { statusCode: 400, body: "Missing userID" };
    }
    if (!eventID) {
      return { statusCode: 400, body: "Missing eventID" };
    }

    const realUrl =
      `https://pay.tropicpulse.bz/b/00w4gy1ZP0Si7UpcgIfIs01` +
      `?userID=${encodeURIComponent(userID)}` +
      `&eventID=${encodeURIComponent(eventID)}`;

    return {
      statusCode: 302,
      headers: { Location: realUrl },
      body: ""
    };

  } catch (err) {
    error("Payment redirect error:", err.message);
    return {
      statusCode: 500,
      body: "Payment redirect failed"
    };
  }
}
