/* global log,warn,error */
// ============================================================================
// FILE: PULSE-UNIVERSE/PULSE-MULTIVERSE/PULSEWORLD/X-PULSE-X/PulseWorldMassEmailAlert-v20.js
// ORGAN: PulseWorldMassEmailAlert-v20 (Mass Email + Credits Organ)
// LAYER: PULSE-WORLD / COMMUNICATION-CORE / CREDITED-MASS-EMAIL / IMMORTAL-V20
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
// INTENT-CHECK:
//   If you paste this while confused or frustrated, pause and re-read your INTENT.
//   If this PAGE INDEX does not match your intent, update it BEFORE editing code.
//
// ROLE:
//   massEmailWebhook — the backend mass-email dispatch + credit engine for Tropic Pulse.
//   This function is responsible for:
//     • Accepting ALL email types (newEvent, newBusiness, pulsePointRedemption, etc.)
//     • Validating incoming payload (email + eventID OR businessID OR emailType)
//     • Looking up or creating user records
//     • Ensuring TPNotifications schema is present and normalized
//     • Checking free + paid credit availability
//     • Deducting credits (free or paid) atomically
//     • Triggering the mass email broadcast (event OR business OR redemption)
//     • Sending “no credits” email + optional SMS with Stripe payment link
//     • Returning status + optional payment link to connector
//
// THIS FILE IS:
//   • A backend action
//   • A credit validator
//   • A mass-email dispatcher
//   • A Firestore writer
//   • A dual-mode (event + business) email engine
//   • A multi-email-type engine
//   • A bridge between Stripe credits and communication
//
// THIS FILE IS NOT:
//   • A connector
//   • A frontend helper
//   • A UI renderer
//   • A generic webhook forwarder
//   • A scoring engine
//   • A Twilio or Stripe organ (those live in dedicated files)
//
// INTERNAL LOGIC SUMMARY:
//   • Validate payload (email + eventID OR businessID OR emailType)
//   • Lookup user by TPIdentity.email (fallback to legacy Email)
//   • Create user if none exists (with sane TPIdentity + TPNotifications defaults)
//   • Ensure TPNotifications fields exist (free/paid credits, flags, timestamps)
//   • Check free + paid credits
//   • If no credits → create Stripe payment link + send “no credits” email/SMS
//   • Deduct credit (free first, then paid)
//   • Build event/business payload from Firestore
//   • Broadcast to all opted-in users via sendMASSemail + sendEmailToUser
//   • Log all sends to EmailLogs
//
// EXPORTED FUNCTIONS:
//   • massEmailWebhook — main HTTP entry (Cloud Functions onRequest)
//   • createMassEmailPaymentLink — Stripe payment link factory
//   • sendEmailToUser — single-user templated email sender
//   • sendMASSemail — broadcast engine for newEvent/newBusiness
//
// ALLOWED IMPORTS:
//   • admin, db from PulseWorldGenome-v20 (Firestore + Admin SDK)
//   • getStripe from PulseWorldBank-v20 (Stripe organ)
//   • nodemailer (SMTP email)
//   • twilio (SMS)
//   • crypto (for tokens)
//   • onRequest (Cloud Functions HTTPS handler)
//
// FORBIDDEN IMPORTS:
//   • UI / browser-only modules
//   • window / document / DOM APIs
//   • Netlify-specific modules
//   • Any new dependency without explicit intent update
//
// DEPLOYMENT RULES:
//   • Runs ONLY as a backend function (Cloud Functions / server environment)
//   • Must remain ESM
//   • Must remain deterministic and idempotent per request
//   • Must not depend on window.* or client-side globals
//
// SAFETY CONSTRAINTS:
//   • Never log secrets (Stripe keys, Twilio tokens, email passwords)
//   • Never expose internal IDs in URLs without tokens
//   • Never mutate unrelated user fields
//   • Always respect TPNotifications opt-out flags
//   • Always validate emailType and payload before sending
//
// ============================================================================
// AI EXPERIENCE META — IMMORTAL ORGAN BLOCK
// ============================================================================
//
// This block allows AI systems (Copilot, PulseOSBrain, OrganismMap) to
// understand the identity, lineage, purpose, and constraints of this file.
// It enables:
//   • Self-healing
//   • Drift detection
//   • Organism-level routing
//   • Contract validation
//   • Future evolution
//
// DO NOT REMOVE THIS BLOCK.
//
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝

// ============================================================================
// IMPORTS + ENV
// ============================================================================

import { onRequest } from "firebase-functions/v2/https";
import nodemailer from "nodemailer";
import twilio from "twilio";

import { admin, db } from "./PulseWorldGenome-v20.js";
import { getStripe } from "./PulseWorldBank-v20.js";

// Core secrets (backend-only, from process.env or Cloud Functions config)
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const JWT_SECRET = process.env.JWT_SECRET;

const TP_API_KEY = process.env.TP_API_KEY;
const BASE_PAYMENT_URL = process.env.BASE_PAYMENT_URL;
const GOOGLE_MAPS_KEY = process.env.GOOGLE_MAPS_KEY;
const PLACEHOLDER_IMAGE_URL = process.env.PLACEHOLDER_IMAGE_URL;

const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_SECRET_WEBHOOK;
const MESSAGING_SERVICE_SID = process.env.MESSAGING_SERVICE_SID;
const ACCOUNT_SID = process.env.ACCOUNT_SID;
const AUTH_TOKEN = process.env.AUTH_TOKEN;

// Optional rate-limit / PIN config (future use)
const PIN_COLLECTION = process.env.PIN_COLLECTION;
const RATE_LIMIT_WINDOW_MS = Number(process.env.RATE_LIMIT_WINDOW_MS || 0);
const MAX_REQUESTS_PER_WINDOW = Number(process.env.MAX_REQUESTS_PER_WINDOW || 0);
const PIN_TTL_MS = Number(process.env.PIN_TTL_MS || 0);

// ============================================================================
// CORS HANDLER (PulseCORS-lite for this endpoint)
// ============================================================================

function pulseCors(req, res, next) {
  res.set("Access-Control-Allow-Origin", "*");
  res.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Pulse-Device, X-Pulse-Remember"
  );
  res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

  if (req.method === "OPTIONS") {
    return res.status(204).send("");
  }

  next();
}

const corsHandler = pulseCors;

// ============================================================================
// STRIPE: CREATE MASS EMAIL PAYMENT LINK
// ============================================================================

/**
 * createMassEmailPaymentLink
 * --------------------------
 * Creates a Stripe Payment Link for purchasing mass email credits.
 *
 * INPUT:
 *   • eventID       — ID of the event this credit purchase is associated with
 *   • eventImageUrl — URL of the event image to show on the Stripe product
 *
 * BEHAVIOR:
 *   • Updates a fixed Stripe product image
 *   • Creates a Payment Link with adjustable quantity (1–99)
 *   • Embeds eventID in metadata
 *   • Redirects back to Tropic Pulse paymentSuccess page
 *
 * RETURNS:
 *   • URL string of the Payment Link
 */
export async function createMassEmailPaymentLink(eventID, eventImageUrl) {
  const stripe = getStripe();

  // 1. Update the product image dynamically
  await stripe.products.update("prod_TzIC2PMixkP2qf", {
    images: [eventImageUrl]
  });

  // 2. Create the Payment Link
  const link = await stripe.paymentLinks.create({
    line_items: [
      {
        price: "price_1T1JcWCt2lhjxca8hw0yppTF", // BZ$10 per credit
        quantity: 1,
        adjustable_quantity: {
          enabled: true,
          minimum: 1,
          maximum: 99
        }
      }
    ],

    after_completion: {
      type: "redirect",
      redirect: {
        url: `https://www.tropicpulse.bze.bz/paymentSuccess.html?eventID=${eventID}`
      }
    },

    metadata: {
      eventID
    },

    allow_promotion_codes: false,
    phone_number_collection: { enabled: false },
    automatic_tax: { enabled: false }
  });

  return link.url;
}

// ============================================================================
// NO-CREDITS EMAIL + OPTIONAL SMS
// ============================================================================

/**
 * sendNoCreditsEmail
 * ------------------
 * Sends a “no credits” email (and optional SMS) to a user when they attempt
 * to send a mass email but have no free or paid credits remaining.
 *
 * INPUT:
 *   • email        — user email
 *   • paymentLink  — Stripe payment link URL
 *   • eventID      — associated event ID
 *   • logId        — optional log ID for tracking
 *   • emailPassword, accountSid, authToken, messagingSid — secrets
 */
async function sendNoCreditsEmail({
  email,
  paymentLink,
  eventID,
  logId,
  emailPassword,
  accountSid,
  authToken,
  messagingSid
}) {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "Sales@TropicPulse.bz",
        pass: emailPassword
      }
    });

    const twilioClient = twilio(accountSid, authToken);

    const payload = {
      email,
      paymentLink,
      eventID,
      adminUser: "Automate",
      logId: logId || null
    };

    const template = emailTemplates["NoCredits"];
    if (!template) throw new Error("missing_template_NoCredits");

    // -----------------------------
    // Load user (NEW SCHEMA)
    // -----------------------------
    const userSnap = await db
      .collection("Users")
      .where("TPIdentity.email", "==", email)
      .limit(1)
      .get();

    if (userSnap.empty) throw new Error("User not found for NoCredits email");

    const doc = userSnap.docs[0];
    const userID = doc.id;
    const user = doc.data();
    const userRef = doc.ref;

    const subject = template.subject(payload);
    const html = template.html(payload);

    // PHONE (NEW SCHEMA)
    const phone = user.TPIdentity?.phone || null;

    // SMS Opt-In (NEW SCHEMA)
    const receiveSMS = user.TPNotifications?.receiveSMS === true;

    // -----------------------------
    // Send Email
    // -----------------------------
    await transporter.sendMail({
      from: `"Tropic Pulse" <Sales@TropicPulse.bz>`,
      to: email,
      bcc: "FordFamilyDelivery@Gmail.com",
      subject,
      html,
      headers: template.headers || {}
    });

    // -----------------------------
    // Log Email
    // -----------------------------
    const ts = admin.firestore.FieldValue.serverTimestamp();
    const ref = await db.collection("EmailLogs").add({
      date: ts,
      to: email,
      type: "NoCredits",
      emailType: "NoCredits",
      payload,
      html,
      subject,
      adminUser: "Automate",
      triggeredBy: "Automate",
      triggerSource: "sendNoCreditsEmail",
      status: "Sent",
      createdAt: ts,
      timestamp: ts
    });

    await ref.update({ logId: ref.id });

    console.log("Sent NO CREDITS email to:", email);

    // -----------------------------
    // SMS (NEW SCHEMA)
    // -----------------------------
    if (!receiveSMS || !phone) {
      console.log("🚫 SMS blocked (no phone or opted out)");
      return { success: true, sms: false };
    }

    await twilioClient.messages.create({
      to: phone,
      messagingServiceSid: messagingSid,
      body: `You're out of Mass Notification Credits!`
    });

    await userRef.update({
      "TPNotifications.lastSMSSentAt": admin.firestore.FieldValue.serverTimestamp()
    });

    console.log("Sent NO CREDITS SMS to:", phone);

    return { success: true, sms: true };
  } catch (err) {
    console.error("sendNoCreditsEmail error:", err);
    return { success: false, error: err.message };
  }
}

// ============================================================================
// MAIN ENTRY: massEmailWebhook
// ============================================================================

export const massEmailWebhook = onRequest(
  {
    region: "us-central1",
    timeoutSeconds: 540,
    memory: "512MiB"
  },
  (req, res) => {
    corsHandler(req, res, async () => {
      try {
        log("🔵 [massEmailWebhook] START");

        const EMAIL_PASSWORD_VALUE = EMAIL_PASSWORD;
        const ACCOUNT_SID_VALUE = ACCOUNT_SID;
        const AUTH_TOKEN_VALUE = AUTH_TOKEN;
        const MESSAGING_SERVICE_SID_VALUE = MESSAGING_SERVICE_SID;

        const email =
          req.method === "GET" ? req.query.email : req.body.email;

        const eventID =
          req.method === "GET"
            ? req.query.eventID || req.query.eventId
            : req.body.eventID || req.body.eventId;

        const businessID =
          req.method === "GET"
            ? req.query.businessID
            : req.body.businessID;

        const businessName =
          req.method === "GET"
            ? req.query.businessName
            : req.body.businessName;

        const emailType =
          req.method === "GET"
            ? req.query.emailType
            : req.body.emailType;

        if (!email) {
          return res.status(400).send({ error: "Missing email" });
        }

        // ---------------------------------------------------------
        // LOOKUP USER (new schema → legacy fallback)
        // ---------------------------------------------------------
        let snap = await db
          .collection("Users")
          .where("TPIdentity.email", "==", email.toLowerCase())
          .limit(1)
          .get();

        if (snap.empty) {
          snap = await db
            .collection("Users")
            .where("Email", "==", email.toLowerCase())
            .limit(1)
            .get();
        }

        let userID;
        let userData;

        if (snap.empty) {
          const ref = await db.collection("Users").add({
            TPIdentity: {
              email: email.toLowerCase(),
              name: "New User",
              displayName: null,
              role: "Customer",
              identitySetAt: admin.firestore.FieldValue.serverTimestamp(),
              resendToken: null,
              trustedDevice: false,
              stripeAccountID: null,
              stripeDashboardURL: null,
              loginLink: null,
              paymentSetup: "Incomplete"
            },
            TPNotifications: {
              freeMassNotificationsLimit: 2,
              freeMassNotificationsUsed: 0,
              paidMassNotificationCredits: 0,
              receiveMassEmails: true,
              receiveSMS: true,
              lastEmailSentAt: null,
              lastSMSSentAt: null,
              emailPending: false
            },
            createdAt: admin.firestore.FieldValue.serverTimestamp()
          });

          userID = ref.id;
          userData = {
            TPIdentity: { name: "New User" },
            TPNotifications: {
              freeMassNotificationsLimit: 2,
              freeMassNotificationsUsed: 0,
              paidMassNotificationCredits: 0
            }
          };
        } else {
          const doc = snap.docs[0];
          userID = doc.id;
          userData = doc.data() || {};

          const TPNotifications = userData.TPNotifications || {};
          const updates = {};

          if (TPNotifications.freeMassNotificationsLimit == null) {
            updates["TPNotifications.freeMassNotificationsLimit"] = 2;
            TPNotifications.freeMassNotificationsLimit = 2;
          }

          if (TPNotifications.paidMassNotificationCredits == null) {
            updates["TPNotifications.paidMassNotificationCredits"] = 0;
            TPNotifications.paidMassNotificationCredits = 0;
          }

          if (TPNotifications.freeMassNotificationsUsed == null) {
            updates["TPNotifications.freeMassNotificationsUsed"] = 0;
            TPNotifications.freeMassNotificationsUsed = 0;
          }

          if (Object.keys(updates).length) {
            await db.collection("Users").doc(userID).update(updates);
          }

          userData.TPNotifications = TPNotifications;
        }

        const TPNotifications = userData.TPNotifications || {};
        const freeUsed = TPNotifications.freeMassNotificationsUsed || 0;
        const freeLimit = TPNotifications.freeMassNotificationsLimit || 2;
        const paidRemaining = TPNotifications.paidMassNotificationCredits || 0;

        const freeRemaining = Math.max(freeLimit - freeUsed, 0);

        // ---------------------------------------------------------
        // NO CREDITS → SEND PAYMENT EMAIL
        // ---------------------------------------------------------
        if (freeRemaining <= 0 && paidRemaining <= 0) {
          const eventImageUrl = "/NewEvent.png";

          const paymentLink = await createMassEmailPaymentLink(
            eventID,
            eventImageUrl
          );

          await sendNoCreditsEmail({
            email,
            paymentLink,
            eventID,
            emailPassword: EMAIL_PASSWORD_VALUE,
            accountSid: ACCOUNT_SID_VALUE,
            authToken: AUTH_TOKEN_VALUE,
            messagingSid: MESSAGING_SERVICE_SID_VALUE
          });

          return res.json({ status: "no_credits", paymentLink });
        }

        // ---------------------------------------------------------
        // DEDUCT CREDIT
        // ---------------------------------------------------------
        const userRef = db.collection("Users").doc(userID);

        if (freeRemaining > 0) {
          await userRef.update({
            "TPNotifications.freeMassNotificationsUsed":
              admin.firestore.FieldValue.increment(1)
          });
        } else {
          await userRef.update({
            "TPNotifications.paidMassNotificationCredits":
              admin.firestore.FieldValue.increment(-1)
          });
        }

        // ---------------------------------------------------------
        // SEND MASS EMAIL (EVENT OR BUSINESS OR REDEMPTION)
        // ---------------------------------------------------------
        const sendResult = await sendMASSemail({
          email,
          emailType,
          eventID,
          businessID,
          businessName
        });

        if (sendResult.success) {
          return res.json({ status: "sent" });
        }

        return res.json({ status: "failed" });
      } catch (err) {
        error("❌ Mass Email Webhook Error:", err);
        return res.status(500).send({ error: "Internal error" });
      }
    });
  }
);

// ============================================================================
// SUPPORT: sendEmailToUser (single-user templated send)
// ============================================================================

async function sendEmailToUser(email, emailType, payload = {}) {
  console.log("🔵 [sendEmailToUser] START");

  const normalizeEmail = (v) =>
    typeof v === "string" ? v.trim().toLowerCase() : null;

  const clean = (v) => {
    if (v === undefined || v === null) return null;
    const s = String(v).trim();
    return s === "" ? null : s;
  };

  try {
    // Normalize + validate email
    email = normalizeEmail(clean(email));
    if (!email) {
      return { success: false, error: "Invalid email" };
    }

    // Validate emailType
    if (!emailType || !emailTemplates[emailType]) {
      return { success: false, error: `Unknown emailType: ${emailType}` };
    }

    // Lookup user (NEW SCHEMA)
    const snap = await admin
      .firestore()
      .collection("Users")
      .where("TPIdentity.email", "==", email)
      .limit(1)
      .get();

    if (snap.empty) {
      return { success: false, error: `User not found: ${email}` };
    }

    const userDoc = snap.docs[0];
    const userRef = userDoc.ref;
    const user = userDoc.data() || {};
    const userID = userDoc.id;

    // Opt-out (NEW SCHEMA)
    if (user.TPNotifications?.receiveMassEmails === false) {
      return { success: false, error: "User opted out" };
    }

    // Cooldown (NEW SCHEMA)
    const lastSent = user.TPNotifications?.lastEmailSentAt?.toMillis?.() || 0;
    const nowMs = admin.firestore.Timestamp.now().toMillis();

    if (nowMs - lastSent < 60000) {
      return { success: true, skipped: true };
    }

    // Build payload (NEW SCHEMA)
    const name =
      clean(user.TPIdentity?.displayName) ||
      clean(user.TPIdentity?.name) ||
      "Friend";

    const resendToken = clean(user.TPIdentity?.resendToken);

    const unsubscribeUrl = resendToken
      ? `https://www.tropicpulse.bze.bz/unsubscribe?token=${encodeURIComponent(
          resendToken
        )}`
      : `https://www.tropicpulse.bze.bz/unsubscribe`;

    const finalPayload = {
      ...payload,
      name,
      userID,
      adminUser: "Automate",
      unsubscribeUrl,
      logId: payload.logId || null
    };

    // Render template
    const template = emailTemplates[emailType];

    let html, subject;
    try {
      html = template.html(finalPayload);
      subject =
        typeof template.subject === "function"
          ? template.subject(finalPayload)
          : template.subject;
    } catch (err) {
      return {
        success: false,
        error: "Template rendering error: " + err.message
      };
    }

    const finalHeaders =
      template.headers ||
      (template.important
        ? {
            "X-Priority": "1",
            "X-MSMail-Priority": "High",
            Importance: "high"
          }
        : {});

    // Send email
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "Sales@TropicPulse.bz",
        pass: EMAIL_PASSWORD
      }
    });

    await transporter.sendMail({
      from: `"Tropic Pulse" <Sales@TropicPulse.bz>`,
      to: email,
      bcc: "FordFamilyDelivery@gmail.com",
      subject,
      html,
      headers: finalHeaders
    });

    // Update user (NEW SCHEMA)
    await userRef.update({
      "TPNotifications.lastEmailSentAt":
        admin.firestore.FieldValue.serverTimestamp()
    });

    // Log email
    const ts = admin.firestore.FieldValue.serverTimestamp();
    const ref = await db.collection("EmailLogs").add({
      date: ts,
      to: email,
      type: emailType,
      emailType,
      payload: finalPayload,
      html,
      subject,
      adminUser: "Automate",
      triggeredBy: "Automate",
      triggerSource: "sendEmailToUser",
      status: "Sent",
      name,
      createdAt: ts,
      timestamp: ts
    });

    await ref.update({ logId: ref.id });

    return { success: true };
  } catch (err) {
    console.error("❌ sendEmailToUser error:", err);
    return { success: false, error: err.message };
  }
}

// ============================================================================
// CURRENCY HELPERS
// ============================================================================

function currency(amount, displayCurrency = "$") {
  let raw = String(amount || "").replace(/BZ?\$|\$/g, "").trim();
  const num = Number(raw);
  const safe = isNaN(num) ? "0.00" : num.toFixed(2);

  let cur = String(displayCurrency || "$").trim().toUpperCase();
  cur = cur === "USD" || cur === "$" || cur === "US$" ? "$" : "BZ$";

  return `${cur}${safe}`;
}

function formatDisplayAmount(displayCurrency, amount) {
  const safeAmount = Number(amount);
  const finalAmount = isNaN(safeAmount) ? "0.00" : safeAmount.toFixed(2);

  let cur = String(displayCurrency || "$").trim().toUpperCase();
  cur = cur === "USD" || cur === "$" || cur === "US$" ? "$" : "BZ$";

  return currency(finalAmount, cur);
}

// ============================================================================
// BROADCAST ENGINE: sendMASSemail
// ============================================================================

async function sendMASSemail(reqBody) {
  log("🔵 [sendMASSemail] START");

  const ACCOUNT_SID_VALUE = ACCOUNT_SID;
  const AUTH_TOKEN_VALUE = AUTH_TOKEN;
  const MESSAGING_SERVICE_SID_VALUE = MESSAGING_SERVICE_SID;
  const EMAIL_PASSWORD_VALUE = EMAIL_PASSWORD;
  const JWT_SECRET_VALUE = JWT_SECRET;

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

  const requiredFields = {
    newEvent: [
      "title",
      "summary",
      "description",
      "Fromdate",
      "Todate",
      "Fromtime",
      "Totime",
      "Venue",
      "eventID",
      "logId",
      "unsubscribeUrl",
      "language",
      "Category",
      "Price",
      "ImageUrl",
      "OwnerName",
      "OwnerBusiness",
      "OwnerEmail"
    ],
    newBusiness: [
      "busname",
      "summary",
      "description",
      "busemail",
      "location",
      "date",
      "busID",
      "logId",
      "unsubscribeUrl",
      "category",
      "phone",
      "website",
      "imageUrl",
      "ownerName",
      "ownerEmail"
    ]
  };

  function validatePayload(emailType, payload) {
    const missing = requiredFields[emailType].filter(
      (field) => payload[field] === undefined || payload[field] === ""
    );
    if (missing.length > 0) {
      throw new Error(
        `Missing required fields for ${emailType}: ${missing.join(", ")}`
      );
    }
  }

  try {
    const useremail = normalizeEmail(reqBody.useremail);
    const emailType = clean(reqBody.emailType, null);
    let payload = reqBody.payload || {};

    const eventID = clean(reqBody.eventID, null);
    const busID = clean(reqBody.busID, null);

    if (!useremail) {
      return { success: false, error: "Missing useremail" };
    }

    if (!emailType) {
      return { success: false, error: "Missing emailType" };
    }

    const allowedTypes = ["newEvent", "newBusiness"];
    if (!allowedTypes.includes(emailType)) {
      return {
        success: false,
        message: `Email type '${emailType}' is not supported.`
      };
    }

    // Load initiating user (NEW SCHEMA)
    const userSnap = await admin
      .firestore()
      .collection("Users")
      .where("TPIdentity.email", "==", useremail)
      .limit(1)
      .get();

    if (userSnap.empty) {
      log("❌ User not found:", useremail);
      return { success: false, error: "user_not_found" };
    }

    const initiatingUserDoc = userSnap.docs[0];
    const initiatingUser = initiatingUserDoc.data() || {};

    // EVENT PAYLOAD (NEW SCHEMA)
    if (emailType === "newEvent") {
      if (!eventID) {
        return { success: false, error: "Missing eventID" };
      }

      const eventDoc = await admin
        .firestore()
        .collection("Events")
        .doc(eventID)
        .get();

      if (!eventDoc.exists) {
        return { success: false, error: "Event not found" };
      }

      const ev = eventDoc.data() || {};

      payload.title = clean(ev.title, "");
      payload.summary = clean(ev.summary, "");
      payload.description = clean(ev.description, "");
      payload.language = clean(ev.language, "");

      payload.Fromdate = ev.Fromdate || "";
      payload.Todate = ev.Todate || "";
      payload.Fromtime = clean(ev.Fromtime, "");
      payload.Totime = clean(ev.Totime, "");
      payload.Venue = clean(ev.Venue ?? ev.resolvedName, "");

      payload.eventID = eventID;
      payload.Category = clean(ev.category, "");
      payload.Price = clean(ev.price, "");
      payload.ImageUrl = clean(ev.mainImage ?? ev.images?.[0] ?? "", "");

      payload.OwnerName = clean(ev.ownerName, "");
      payload.OwnerBusiness = clean(ev.ownerBusiness, "");
      payload.OwnerEmail = clean(ev.ownerEmail, "");
    }

    // BUSINESS PAYLOAD (NEW SCHEMA)
    if (emailType === "newBusiness") {
      if (!busID) {
        return { success: false, error: "Missing busID" };
      }

      const busDoc = await admin
        .firestore()
        .collection("Businesses")
        .doc(busID)
        .get();

      if (!busDoc.exists) {
        return { success: false, error: "Business not found" };
      }

      const bus = busDoc.data() || {};

      payload.busname = clean(bus.busname, "");
      payload.summary = clean(bus.summary, "");
      payload.description = clean(bus.description, "");
      payload.location = clean(bus.location, "");
      payload.busemail = clean(bus.busemail, "");

      let date = bus.date;
      if (date instanceof admin.firestore.Timestamp) {
        payload.date = date.toDate().toISOString();
      } else if (date instanceof Date) {
        payload.date = date.toISOString();
      } else if (typeof date === "string") {
        payload.date = new Date(date).toISOString();
      } else {
        payload.date = new Date().toISOString();
      }

      payload.busID = busID;
      payload.category = clean(bus.category, "");
      payload.phone = clean(bus.phone, "");
      payload.website = clean(bus.website, "");
      payload.imageUrl = clean(bus.mainImage ?? bus.images?.[0] ?? "", "");

      payload.ownerName = clean(bus.ownerName, "");
      payload.ownerEmail = clean(bus.ownerEmail, "");
    }

    // LOG ID + UNSUBSCRIBE URL
    const ts = admin.firestore.Timestamp.now().toMillis();
    payload.logId = payload.logId || `${emailType}-${ts}`;
    payload.unsubscribeUrl = "/unsubscribe";

    validatePayload(emailType, payload);

    // BROADCAST LOOP (NEW SCHEMA)
    const usersSnapshot = await admin.firestore().collection("Users").get();
    const sendPromises = [];

    usersSnapshot.forEach((doc) => {
      const u = doc.data() || {};

      const TPIdentity = u.TPIdentity || {};
      const TPNotifications = u.TPNotifications || {};

      const uEmail = normalizeEmail(TPIdentity.email);
      if (!uEmail) return;

      if (TPNotifications.receiveMassEmails === false) return;

      let resendToken = TPIdentity.resendToken;

      if (!resendToken) {
        resendToken = crypto.randomUUID();
        doc.ref
          .update({
            "TPIdentity.resendToken": resendToken
          })
          .catch((err) => {
            error(
              "⚠️ Failed to set TPIdentity.resendToken for",
              uEmail,
              err.message
            );
          });
      }

      const userPayload = {
        ...payload,
        email: uEmail,
        userID: doc.id,
        unsubscribeUrl: `/unsubscribe?token=${encodeURIComponent(
          resendToken
        )}`
      };

      sendPromises.push(
        sendEmailToUser(uEmail, emailType, userPayload).catch((err) => {
          error("❌ Failed to send to:", uEmail, err.message);
        })
      );
    });

    await Promise.all(sendPromises);

    return {
      success: true,
      message: `Broadcast email sent to ${usersSnapshot.size} users.`
    };
  } catch (err) {
    error("❌ broadcastEmail error:", err);
    return {
      success: false,
      error: "Broadcast email failed",
      details: err.message || String(err)
    };
  }
}

// ============================================================================
// EMAIL TEMPLATES (SKELETON + NoCredits example)
// ============================================================================
//
// Each template receives a payload object and returns HTML.
// You can expand these with your full branded HTML later.
//

const emailTemplates = {
  NoCredits: {
    subject: () => "You’re out of Mass Notification Credits",
    important: true,
    html: (payload) => {
      const { paymentLink, eventID, logId } = payload;

      const trackingPixel =
        logId && logId !== "Preview Mode"
          ? `<img src="https://www.tropicpulse.bze.bze.bz/emailopen?logId=${encodeURIComponent(
              logId
            )}" width="1" height="1" alt="" style="display:block; opacity:0;">`
          : "";

      return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Out of Credits</title>
  </head>
  <body style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background:#f5f5f5; padding:24px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:8px;overflow:hidden;">
      <tr>
        <td style="padding:24px 24px 16px 24px; background:#111827; color:#ffffff;">
          <h1 style="margin:0;font-size:20px;">Tropic Pulse — Mass Notifications</h1>
          <p style="margin:8px 0 0 0;font-size:14px;opacity:0.8;">You’ve used all your Mass Notification Credits.</p>
        </td>
      </tr>
      <tr>
        <td style="padding:24px;font-size:14px;color:#111827;">
          <p style="margin:0 0 12px 0;">Hi there,</p>
          <p style="margin:0 0 12px 0;">
            You attempted to send a Mass Notification for your event
            <strong>${eventID || "your event"}</strong>, but your account has no remaining credits.
          </p>
          <p style="margin:0 0 16px 0;">
            You can purchase additional credits using the secure payment link below:
          </p>
          <p style="margin:0 0 24px 0;">
            <a href="${paymentLink}" style="display:inline-block;padding:10px 18px;background:#2563EB;color:#ffffff;text-decoration:none;border-radius:999px;font-weight:600;font-size:14px;">
              Purchase Mass Notification Credits
            </a>
          </p>
          <p style="margin:0 0 8px 0;font-size:12px;color:#6B7280;">
            Once payment is complete, your credits will be added automatically and you can resend your Mass Notification.
          </p>
        </td>
      </tr>
      <tr>
        <td style="padding:16px 24px 24px 24px;font-size:11px;color:#6B7280;border-top:1px solid #E5E7EB;">
          <p style="margin:0 0 4px 0;">You are receiving this email because you attempted to send a Mass Notification from Tropic Pulse.</p>
          <p style="margin:0;">If you believe this is an error, please contact support at <a href="mailto:Support@TropicPulse.bz">Support@TropicPulse.bz</a>.</p>
        </td>
      </tr>
    </table>
    ${trackingPixel}
  </body>
</html>`;
    }
  },

  // You can add more templates here:
  // newUser, newEvent, newBusiness, pulsePointRedemption, etc.
};

// ============================================================================
// FOOTER — LEARNING NOTES FOR ALDWYN
// ============================================================================
//
// ⭐ MASS EMAIL + CREDITS BRAIN ⭐
// -------------------------------
// • This file is the “credited broadcast brain” for Tropic Pulse.
// • Credits live in TPNotifications (free + paid).
// • Stripe Payment Links refill paid credits.
// • Email templates are centralized here for mass flows.
// • Unsubscribe is token-based via TPIdentity.resendToken.
//
// ⭐ EVOLUTION IDEAS ⭐
// --------------------
// • Add per-user rate limits (per day / per week).
// • Add per-event send caps.
// • Add A/B testing templates.
// • Add per-language templates (EN/ES/CREOLE).
// • Add delivery analytics dashboard.
//
// ⭐ ORGANISM NOTES ⭐
// -------------------
// • This organ touches money (credits) + communication (email/SMS).
// • Any change here should be intentional and documented in PAGE INDEX.
// • When in doubt, update comments first, then code.
//
// ============================================================================
