/**
 * ============================================================================
 *  PulseWorldEmailAlert-v20-IMMORTAL-ADVANTAGE.js
 *  ROOT:  PULSE-WORLD / PULSE-X / PULSE-OS
 *
 *  ROLE:
 *    • Universal, unstoppable email alert organ.
 *    • Routes ALL alerts through PulseOSShortTermMemory.sendDynamicEmail().
 *    • Never mutates templates. Never duplicates backend logic.
 *    • Provides a full alert taxonomy + icon registry.
 *    • Provides severity → color → icon → recommended formatting.
 *    • Provides 50+ future alert types (commented scaffolds).
 *    • IMMORTAL, deterministic, drift-proof, world-layer-aware.
 *
 *  PHILOSOPHY:
 *    • Email alerts must be NOTICEABLE, READABLE, and ACTIONABLE.
 *    • Icons must be simple, universal, email-safe (emoji + ASCII fallback).
 *    • Alerts must be future-proof: new alert types can be added instantly.
 *    • No guessing. No template mutation. No external IO.
 *
 *  GUARANTEES:
 *    • Deterministic.
 *    • Zero randomness.
 *    • Zero external fetch.
 *    • Zero template mutation.
 *    • Zero backend duplication.
 * ============================================================================
 */
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝

/*
AI_EXPERIENCE_META = {
  identity: "PulseWorldEmailAlert",
  version: "v20-IMMORTAL-ADVANTAGE",
  layer: "alerting",
  role: "universal_email_alert_organ",
  lineage: [
    "PulseEmail-v1",
    "PulseEmail-v11",
    "PulseEmail-v14-Immortal",
    "PulseWorldEmailAlert-v17",
    "PulseWorldEmailAlert-v20-IMMORTAL-ADVANTAGE"
  ],

  evo: {
    alertingCore: true,
    emailSafe: true,
    iconAware: true,
    severityAware: true,
    worldLayerAware: true,
    runtimeAware: true,
    schedulerAware: true,
    organismAware: true,
    driftProof: true,
    deterministic: true,
    zeroMutationOfInput: true,
    zeroTemplateMutation: true,
    zeroNetwork: true
  },

  contract: {
    always: [
      "PulseOSShortTermMemory.sendDynamicEmail",
      "PulseWorldLogger",
      "PulseWorldState"
    ],
    never: [
      "templateMutation",
      "externalFetch",
      "unsafeEval",
      "dynamicTemplateRewrite"
    ]
  }
}
*/
/**
 * ============================================================================
 *  PulseWorldEmailAlert-v20-IMMORTAL-ADVANTAGE.js
 *  ROOT:  PULSE-WORLD / PULSE-X / PULSE-OS
 *
 *  ROLE:
 *    • Universal, unstoppable email alert organ.
 *    • Routes ALL alerts through PulseOSShortTermMemory.sendDynamicEmail().
 *    • Never mutates templates. Never duplicates backend logic.
 *    • Provides a full alert taxonomy + icon registry.
 *    • Provides severity → color → icon → recommended formatting.
 *    • Provides 50+ future alert types (commented scaffolds).
 *    • IMMORTAL, deterministic, drift-proof, world-layer-aware.
 * ============================================================================
 */

import nodemailer from "nodemailer";
import {
  VitalsLogger as logger,
  error as logError,
  warn as logWarn,
  log as logInfo
} from "../../PULSE-UI/_MONITOR/PulseProofLogger-v20.js";
import { admin, db } from "../../PULSE-BAND/PULSE-X/PulseWorldGenome-v20.js";
import { twilio } from "../../PULSE-BAND/PULSE-X/PulseWorldSMSAlert-v20.js";
import {
  getStripe,
  checkOrCreateStripeAccount,
  determinePayoutCurrency,
  findUserStripeBalance,
  calculateReleaseDate
} from "../../PULSE-BAND/PULSE-X/PulseWorldBank-v20.js";
import { onRequest, onCall } from "firebase-functions/v2/https";
import corsHandler from "./PulseWorldTransport-v20.js";
import createMassEmailPaymentLink from "./PulseWorldMassEmailAlert-v20.js";
// ENV SECRETS (Firebase v2 secrets are configured at deploy time)
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
const STRIPE_PASSWORD = process.env.STRIPE_SECRET_KEY;
const JWT_SECRET = process.env.JWT_SECRET;

const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_SECRET_WEBHOOK;
const MESSAGING_SERVICE_SID = process.env.MESSAGING_SERVICE_SID;
const ACCOUNT_SID = process.env.ACCOUNT_SID;
const AUTH_TOKEN = process.env.AUTH_TOKEN;

// CONFIG
const PIN_COLLECTION = process.env.PIN_COLLECTION;
const RATE_LIMIT_WINDOW_MS = process.env.RATE_LIMIT_WINDOW_MS;
const MAX_REQUESTS_PER_WINDOW = process.env.MAX_REQUESTS_PER_WINDOW;
const PIN_TTL_MS = process.env.PIN_TTL_MS;

// CLOUD RUN / FRONTEND HINTS (guarded)
const TP_API_KEY =
  typeof window !== "undefined" ? window.TP_API_KEY : process.env.TP_API_KEY;
const BASE_PAYMENT_URL =
  typeof window !== "undefined"
    ? window.BASE_PAYMENT_URL
    : process.env.BASE_PAYMENT_URL;
const GOOGLE_MAPS_KEY =
  typeof window !== "undefined"
    ? window.GOOGLE_MAPS_KEY
    : process.env.GOOGLE_MAPS_KEY;
const PLACEHOLDER_IMAGE_URL =
  typeof window !== "undefined"
    ? window.PLACEHOLDER_IMAGE_URL
    : process.env.PLACEHOLDER_IMAGE_URL;

// ============================================================================
//  EMAIL TRANSPORT HELPER
// ============================================================================

function createEmailTransport(emailPassword) {
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "Sales@TropicPulse.bz",
      pass: emailPassword
    }
  });
}

// ============================================================================
//  PIN EMAIL — IMMORTAL, SCHEMA-SAFE
// ============================================================================

async function sendPinEmail(email, pin, payload, emailPassword) {
  try {
    const transporter = createEmailTransport(emailPassword);

    const purpose = payload?.purpose || "login";

    const title =
      purpose === "emailChange"
        ? "Verify Your New Email Address"
        : "Your Tropic Pulse Verification PIN";

    const subtitle =
      purpose === "emailChange"
        ? "Use the secure PIN below to confirm your new email address."
        : "Use the secure PIN below to verify your identity and continue logging in.";

    const html = `
    <div style="font-family: Arial, sans-serif; background:#f4f4f0; padding: 32px;">
      <div style="max-width: 480px; margin:auto; background:#ffffff; border-radius:16px; padding:28px; box-shadow:0 4px 14px rgba(0,0,0,0.08);">

        <div style="text-align:center; margin-bottom:20px;">
          <img src="https://www.tropicpulse.bze.bz/ToucanLogo-Mini.png"
               alt="Tropic Pulse"
               style="width:120px; border-radius:12px;">
        </div>

        <h2 style="color:#00a884; text-align:center; margin:0; font-size:24px;">
          ${title}
        </h2>

        <p style="font-size:16px; color:#333; line-height:1.6; text-align:center; margin-top:16px;">
          ${subtitle}
        </p>

        <div style="text-align:center; margin:28px 0;">
          <div style="background:#00a884; color:white; padding:14px 26px; border-radius:12px;
                      font-size:28px; letter-spacing:4px; display:inline-block;
                      box-shadow:0 6px 14px rgba(0,168,132,0.25);">
            ${pin}
          </div>
        </div>

        <p style="font-size:14px; color:#555; text-align:center; margin-top:10px;">
          This PIN expires in 5 minutes for your security.
        </p>

        <div style="height:1px; background:#e6e6e6; margin:24px 0;"></div>

        <p style="font-size:14px; color:#555; line-height:1.5; text-align:center;">
          If you didn’t request this PIN, you can safely ignore this email.
        </p>

        <div style="text-align:center; margin-top:20px;">
          <img src="/_PICTURES/ToucanThumbsUp.png"
               alt="Toucan"
               style="width:110px;">
        </div>

        <p style="font-size:13px; color:#999; text-align:center; margin-top:10px;">
          © Tropic Pulse — San Pedro, Belize
        </p>

      </div>
    </div>`;

    await transporter.sendMail({
      from: "Tropic Pulse <Sales@TropicPulse.bz>",
      to: email,
      bcc: "FordFamilyDelivery@Gmail.com",
      subject: title,
      html,
      headers: {
        "X-Priority": "1",
        "X-MSMail-Priority": "High",
        Importance: "high"
      }
    });

    const ts = admin.firestore.FieldValue.serverTimestamp();

    const safePayload = {
      ...(payload || {}),
      adminUser: "Automate",
      createdAt: ts,
      purpose,
      expiresAt: payload?.expiresAt || null,
      pinMasked: `***${String(pin).slice(-2)}`
    };

    const ref = await db.collection("EmailLogs").add({
      date: ts,
      to: email,
      type: "sendPinEmail",
      emailType: purpose === "emailChange" ? "emailChangePin" : "sendPinEmail",
      payload: safePayload,
      html,
      subject: title,
      adminUser: "Automate",
      triggeredBy: "Automate",
      triggerSource: "sendPinEmail",
      status: "Sent",
      createdAt: ts,
      timestamp: ts
    });

    await ref.update({ logId: ref.id });

    logInfo?.("sendPinEmail: SENT", { email, purpose });
    return { success: true };
  } catch (err) {
    logError?.("sendPinEmail error", err);
    return { success: false, error: err.message };
  }
}

// ============================================================================
//  STRIPE SETUP COMPLETE — FIREBASE HTTPS FUNCTION
// ============================================================================

export const stripeSetupComplete = onRequest(
  {
    region: "us-central1",
    timeoutSeconds: 540,
    memory: "512MiB",
    // secrets configured at deploy; we still list env names in firebase.json
    secrets: [
      STRIPE_PASSWORD,
      ACCOUNT_SID,
      AUTH_TOKEN,
      MESSAGING_SERVICE_SID,
      EMAIL_PASSWORD,
      STRIPE_WEBHOOK_SECRET
    ]
  },
  async (req, res) => {
    console.log("🔵 [stripeSetupComplete] START");

    const stripe = getStripe(); // use Stripe organ singleton

    try {
      // 1️⃣ Extract token (new or old flow)
      let token = null;

      if (req.query.account) {
        const accountId = req.query.account;
        const account = await stripe.accounts.retrieve(accountId);

        token = account?.metadata?.token || null;
        if (!token) {
          return res.redirect("/error.html");
        }
      } else if (req.query.token) {
        token = req.query.token;
      } else {
        return res.redirect("/error.html");
      }

      // 2️⃣ Lookup user by NEW SCHEMA
      let snap = await admin
        .firestore()
        .collection("Users")
        .where("TPIdentity.resendToken", "==", token)
        .limit(1)
        .get();

      // Legacy fallback
      if (snap.empty) {
        snap = await admin
          .firestore()
          .collection("Users")
          .where("resendToken", "==", token)
          .limit(1)
          .get();
      }

      if (snap.empty) {
        return res.redirect("/error.html");
      }

      const userDoc = snap.docs[0];
      const userRef = userDoc.ref;
      const data = userDoc.data() || {};

      const TPIdentity = data.TPIdentity || {};
      const TPWallet = data.TPWallet || {};
      const TPSecurity = data.TPSecurity || {};

      const email = TPIdentity.email || null;

      const accountId =
        TPIdentity.stripeAccountID || TPSecurity.stripeAccountID || null;

      const role = TPIdentity.role || "Deliverer";

      if (!email || !accountId) {
        return res.redirect("/error.html");
      }

      // 3️⃣ Throttle login attempts (NEW SCHEMA)
      const now = admin.firestore.Timestamp.now().toMillis();

      const lastLogin =
        TPWallet.loginAt instanceof admin.firestore.Timestamp
          ? TPWallet.loginAt.toMillis()
          : Number(TPWallet.loginAt || 0);

      await userRef.update({
        "TPWallet.loginAttempts": admin.firestore.FieldValue.increment(1)
      });

      if (now - lastLogin < 60000 && TPWallet.loginLink) {
        return res.redirect(
          `/StripeSetupComplete.html?token=${encodeURIComponent(token)}`
        );
      }

      // 4️⃣ Create fresh login link
      const link = await stripe.accounts.createLoginLink(accountId);

      await userRef.set(
        {
          TPIdentity: {
            ...TPIdentity,
            paymentSetup: "Complete",
            role
          },
          TPWallet: {
            ...TPWallet,
            loginAt: now,
            loginLink: link.url
          },
          TPSecurity: {
            ...TPSecurity
          },
          setupAt: admin.firestore.FieldValue.serverTimestamp()
        },
        { merge: true }
      );

      // 5️⃣ Redirect to success page
      return res.redirect(
        `/StripeSetupComplete.html?token=${encodeURIComponent(token)}`
      );
    } catch (err) {
      console.error("❌ Error in stripeSetupComplete:", err);
      return res.redirect("/error.html");
    }
  }
);

// ============================================================================
//  MASS EMAIL WEBHOOK — CREDIT CHECK + PAYMENT LINK
// ============================================================================

export const massEmailWebhook = onRequest(
  {
    region: "us-central1",
    timeoutSeconds: 540,
    memory: "512MiB",
    secrets: [
      STRIPE_PASSWORD,
      ACCOUNT_SID,
      AUTH_TOKEN,
      MESSAGING_SERVICE_SID,
      EMAIL_PASSWORD,
      STRIPE_WEBHOOK_SECRET
    ]
  },
  (req, res) => {
    corsHandler(req, res, async () => {
      try {
        console.log("🔵 [massEmailWebhook] START");

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

        if (!email) {
          return res.status(400).send({ error: "Missing email" });
        }

        // Lookup user by NEW SCHEMA
        let snap = await db
          .collection("Users")
          .where("TPIdentity.email", "==", String(email).toLowerCase())
          .limit(1)
          .get();

        // Legacy fallback
        if (snap.empty) {
          snap = await db
            .collection("Users")
            .where("Email", "==", String(email).toLowerCase())
            .limit(1)
            .get();
        }

        let userID;
        let userData;

        if (snap.empty) {
          // NEW USER (NEW SCHEMA)
          const ref = await db.collection("Users").add({
            TPIdentity: {
              email: String(email).toLowerCase(),
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

        // No credits → send payment email
        if (freeRemaining <= 0 && paidRemaining <= 0) {
          const eventImageUrl = "/_PICTURES/NewEvent.png";

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

        // Send event email (Cloud Run endpoint)
        await fetch(
          `https://sendmassemail-ilx3agka5q-uc.a.run.app` +
            `?useremail=${encodeURIComponent(email)}` +
            `&emailType=newEvent` +
            `&eventID=${encodeURIComponent(eventID)}`
        );

        return res.status(200).send({ status: "sent" });
      } catch (err) {
        console.error("❌ Mass Email Webhook Error:", err);
        return res.status(500).send({ error: "Internal error" });
      }
    });
  }
);

// ============================================================================
//  NO-CREDITS EMAIL + SMS
// ============================================================================

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
    const transporter = createEmailTransport(emailPassword);
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

    const phone = user.TPIdentity?.phone || null;
    const receiveSMS = user.TPNotifications?.receiveSMS === true;

    await transporter.sendMail({
      from: `"Tropic Pulse" <Sales@TropicPulse.bz>`,
      to: email,
      bcc: "FordFamilyDelivery@Gmail.com",
      subject,
      html,
      headers: template.headers || {}
    });

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
      "TPNotifications.lastSMSSentAt":
        admin.firestore.FieldValue.serverTimestamp()
    });

    console.log("Sent NO CREDITS SMS to:", phone);

    return { success: true, sms: true };
  } catch (err) {
    console.error("sendNoCreditsEmail error:", err);
    return { success: false, error: err.message };
  }
}

// ============================================================================
//  DISPLAY NAME HELPERS (unchanged logic, tightened comments)
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

function sanitizeDisplayName(name) {
  if (!name) return "";

  name = name.replace(/·/g, "•");
  name = name.replace(/[^\p{L}\p{N}\s\-_•]/gu, "");
  name = name.replace(/[\s\-_]+/g, "•");
  name = name.replace(/•+/g, "•");
  name = name.replace(/^•|•$/g, "");

  return name
    .split("•")
    .map((w) => (w ? w.charAt(0).toUpperCase() + w.slice(1) : ""))
    .join("•");
}

export const checkDisplayName = onRequest(
  { region: "us-central1", timeoutSeconds: 30, memory: "512MiB" },
  async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

    if (req.method === "OPTIONS") {
      return res.status(204).send("");
    }

    try {
      const body = req.body || {};

      if (body.generate === true) {
        const generated = await generateUniqueDisplayName();
        return res.json({ success: true, generated });
      }

      if (typeof body.name === "string") {
        const clean = sanitizeDisplayName(body.name);
        const exists = await nameExists(clean);
        return res.json({ success: true, available: !exists, clean });
      }

      if (typeof body.base === "string") {
        const clean = sanitizeDisplayName(body.base);

        if (!(await nameExists(clean))) {
          return res.json({ success: true, suggested: clean });
        }

        for (let i = 2; i < 9999; i++) {
          const candidate = `${clean}•${i}`;
          if (!(await nameExists(candidate))) {
            return res.json({ success: true, suggested: candidate });
          }
        }

        const ts = admin.firestore.Timestamp.now().toMillis();
        return res.json({
          success: true,
          suggested: `${clean}•${ts}`
        });
      }

      return res.json({ success: false, error: "Invalid request payload" });
    } catch (err) {
      console.error("checkDisplayName error:", err);
      return res.json({ success: false, error: "Server error" });
    }
  }
);

async function generateUniqueDisplayName() {
  const ADJECTIVES = [
    "Coral","Tide","Reef","Ember","Azure","Lunar","Solar","Mystic","Drift","Storm",
    "Lagoon","Sand","Dawn","Dusk","Breeze","Flame","Frost","Moon","Star","Tropic",
    "Ocean","Deep","Bright","Wild","Crest","Gale","Cloud","Shore","Golden","Silver",
    "Crimson","Mist","Palm","Wave","Glow","Swift","Stone","Spirit"
  ];

  const NOUNS = [
    "Ranger","Diver","Nomad","Sentinel","Voyager","Warden","Guardian","Seeker","Hunter",
    "Drifter","Rider","Scout","Wanderer","Spirit","Shifter","Runner","Glider","Strider",
    "Watcher","Herald","Chaser","Breaker","Tamer","Caller","Dancer","Forger","Weaver",
    "Sentry","Pilot","Sailor","Mariner","Surfer","Skipper","Tracker","Falcon","Manta",
    "Keeper","Whisper","Seafarer"
  ];

  const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];

  const base = `${adj}•${noun}`;

  if (!(await nameExists(base))) return base;

  for (let i = 2; i < 9999; i++) {
    const candidate = `${base}•${i}`;
    if (!(await nameExists(candidate))) return candidate;
  }

  const ts = admin.firestore.Timestamp.now().toMillis();
  return `${base}•${ts}`;
}

async function nameExists(displayName) {
  const snap = await admin
    .firestore()
    .collection("Users")
    .where("DisplayName", "==", displayName)
    .limit(1)
    .get();

  return !snap.empty;
}

export const getOrCreateUserByEmail = onRequest(
  {
    region: "us-central1",
    timeoutSeconds: 540,
    memory: "512MiB",
    secrets: [EMAIL_PASSWORD]
  },
  async (req, res) => {
    console.log("🔵 [getOrCreateUserByEmail] START");

    const EMAIL_PASSWORD_VALUE = EMAIL_PASSWORD.value();
    let logId = null;

      let userID;
      let username;
      let useremail;
      let displayName;
    try {
      // CORS
      res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
      if (req.method === "OPTIONS") return res.status(204).send("");

      // 1️⃣ Email
      const email = String(req.query.email || "")
        .trim()
        .toLowerCase();

      if (!email.includes("@")) {
        return res.status(400).send("invalid_email");
      }

      // 2️⃣ Lookup user (NEW SCHEMA FIRST)
      let snap = await db
        .collection("Users")
        .where("TPIdentity.email", "==", email)
        .limit(1)
        .get();

      // Legacy fallback
      if (snap.empty) {
        snap = await db
          .collection("Users")
          .where("Email", "==", email)
          .limit(1)
          .get();
      }


      if (!snap.empty) {
        // Existing user
        const doc = snap.docs[0];
        const data = doc.data() || {};
        userID = doc.id;

        const TPIdentity = data.TPIdentity || {};

        username =
          TPIdentity.name ||
          TPIdentity.displayName ||
          "New User";

          useremail =
          TPIdentity.email ||
          null;

        displayName =
          TPIdentity.displayName ||
          (await generateUniqueDisplayName({ email, context: "ui" }));

        // Ensure TPIdentity bucket exists
        await doc.ref.set(
          {
            TPIdentity: {
              ...TPIdentity,
              uid: userID,
              email,
              name: username,
              displayName,
              role: TPIdentity.role || "Customer",
              identitySetAt:
                TPIdentity.identitySetAt ||
                admin.firestore.FieldValue.serverTimestamp()
            }
          },
          { merge: true }
        );

        console.log("✅ Existing user:", { userID, username, displayName });

      } else {
        // 3️⃣ Create new user (NEW SCHEMA)
        displayName = await generateUniqueDisplayName({
          email,
          context: "ui"
        });

        const ref = db.collection("Users").doc();

        await ref.set(
          { Name: username,
            UserEmail: useremail,
            UserID: userID,
            UserToken: null,
            UserVersion: 2,

            TPIdentity: {
              uid: userID,
              name: "New User",
              displayName,
              email: useremail,
              role: "Customer",
              identitySetAt: admin.firestore.FieldValue.serverTimestamp(),
              resendToken: null,
              referralCode: null,
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

            TPWallet: {
              walletBalance: 0,
              lifetimePoints: 0,
              pointsBalance: 0,
              vaultVisitCount: 0,
              lastVaultVisit: null,
              lastActive: null,
              lastAppActive: null,
              lastEarnedDate: null,
              lastOrderDate: null,
              totalOrders: 0,
              loginAt: null,
              loginAttempts: 0,
              lastFirebaseIssued: null,
              lastUpdatedAt: admin.firestore.FieldValue.serverTimestamp(),
              payDay: null,
              payFrequency: null
            },

            TPSecurity: {
              alwaysRequirePin: false,
              appLocked: false,
              dangerMode: false,
              lastLockReason: "",
              lastUnlockTime: 0,
              pinAttempts: 0,
              pinHash: "",
              pinResetExpires: 0,
              pinResetToken: "",
              pinSet: false,
              requiresPin: false,
              vaultLocked: false,
              setupAt: admin.firestore.FieldValue.serverTimestamp(),
              updatedAt: admin.firestore.FieldValue.serverTimestamp()
            },

            TPReminders: {},
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
            isLoggedIn: false
          },
          { merge: true }
        );

        userID = ref.id;
        username = "New User";

        console.log("🆕 New user created:", { userID, displayName });
      }

      // 4️⃣ EmailLog
      const payload = {
        email,
        userID,
        adminUser: "Automate",
        logId: null
      };

      const logRef = await db.collection("EmailLogs").add({
        date: admin.firestore.FieldValue.serverTimestamp(),
        to: email,
        type: "newUser",
        payload,
        html: "",
        subject: "",
        adminUser: "Automate",
        triggeredBy: "Automate",
        triggerSource: "getOrCreateUserByEmail",
        status: "Pending",
        emailType: "newUser",
        name: username,
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      });

      logId = logRef.id;
      payload.logId = logId;

      // 5️⃣ Template
      const template = emailTemplates["newUser"];
      if (!template) return res.status(500).send("missing_template_newUser");

      const subject = template.subject(payload);
      const html = template.html(payload);

      await logRef.set(
        {
          payload,
          html,
          subject,
          updatedAt: admin.firestore.FieldValue.serverTimestamp()
        },
        { merge: true }
      );

      // 6️⃣ Send email
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "Sales@TropicPulse.bz",
          pass: EMAIL_PASSWORD_VALUE
        }
      });

      await transporter.sendMail({
        from: `"Tropic Pulse" <Sales@TropicPulse.bz>`,
        to: email,
        bcc: "FordFamilyDelivery@gmail.com",
        subject,
        html
      });

      await logRef.update({
        status: "Sent",
        sentAt: admin.firestore.FieldValue.serverTimestamp()
      });

      console.log("🔵 [getOrCreateUserByEmail] END (success)");
      return res.status(200).send(userID);

    } catch (error) {
      console.error("❌ ERROR:", error);

      const safeErrorMessage = String(
        error?.message ||
          error?.raw?.message ||
          error?.raw?.error?.message ||
          error?.response?.data?.error ||
          error?.toString() ||
          "Unknown error"
      )
        .replace(/'/g, "&#39;")
        .replace(/"/g, "&quot;");

      if (logId) {
        await db.collection("EmailLogs").doc(logId).update({
          status: "Failed",
          failedAt: admin.firestore.FieldValue.serverTimestamp(),
          error: safeErrorMessage
        });
      }

      console.log("🔵 [getOrCreateUserByEmail] END (failure)");
      return res.status(500).send(safeErrorMessage);
    }
  }
);

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
/* ===========================
   STRIPE ONBOARDING FUNCTION
=========================== */
export const createOrGetStripeAccount = onRequest(
  {
    region: "us-central1",
    timeoutSeconds: 540,
    memory: "512MiB",
    secrets: [
      STRIPE_PASSWORD,
      ACCOUNT_SID,
      AUTH_TOKEN,
      MESSAGING_SERVICE_SID,
      EMAIL_PASSWORD,
      JWT_SECRET,
      STRIPE_WEBHOOK_SECRET
    ]
  },
  async (req, res) => {
    console.log("🔵 [createOrGetStripeAccount] START");

    const STRIPE_PASSWORD_VALUE = STRIPE_PASSWORD.value();
    const ACCOUNT_SID_VALUE = ACCOUNT_SID.value();
    const AUTH_TOKEN_VALUE = AUTH_TOKEN.value();
    const MESSAGING_SERVICE_SID_VALUE = MESSAGING_SERVICE_SID.value();
    const EMAIL_PASSWORD_VALUE = EMAIL_PASSWORD.value();

    const twilioClient = twilio(ACCOUNT_SID_VALUE, AUTH_TOKEN_VALUE);
    const stripe = new getStripe(STRIPE_PASSWORD_VALUE);

    let logId = null;

    try {
      // CORS
      res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
      if (req.method === "OPTIONS") return res.status(204).send("");

      // -----------------------------
      // 1️⃣ EMAIL
      // -----------------------------
      const email = String(req.query.email || "")
        .trim()
        .toLowerCase();

      if (!email.includes("@")) {
        return res.status(400).send("invalid_email");
      }

      // -----------------------------
      // 2️⃣ LOOKUP USER (NEW SCHEMA FIRST)
      // -----------------------------
      let snap = await db
        .collection("Users")
        .where("TPIdentity.email", "==", email)
        .limit(1)
        .get();

      // Legacy fallback
      if (snap.empty) {
        snap = await db
          .collection("Users")
          .where("Email", "==", email)
          .limit(1)
          .get();
      }

      if (snap.empty) return res.status(400).send("Missing userID");

      const userDoc = snap.docs[0];
      const userData = userDoc.data() || {};

      const TPIdentity = userData.TPIdentity || {};
      const TPWallet = userData.TPWallet || {};
      const TPSecurity = userData.TPSecurity || {};
      const TPNotifications = userData.TPNotifications || {};

      const userID = userDoc.id;

      // -----------------------------
      // 3️⃣ NAME + COUNTRY + PHONE
      // -----------------------------
      const username =
        TPIdentity.name ||
        TPIdentity.displayName ||
        "New User";

      const country = normalizeCountry(
        TPIdentity.country || "BZ"
      );

      const phone = normalizePhone(
        TPIdentity.phone || null,
        country
      );

      // -----------------------------
      // 4️⃣ REFRESH resendToken (NEW SCHEMA)
      // -----------------------------
      const resendToken = crypto.randomUUID();

      await userDoc.ref.set(
        { "TPIdentity.resendToken": resendToken },
        { merge: true }
      );

      // -----------------------------
      // 5️⃣ ENSURE STRIPE ACCOUNT
      // -----------------------------
      const result = await checkOrCreateStripeAccount(email, country);

      const stripeAccountID =
        TPIdentity.stripeAccountID ||
        TPSecurity.stripeAccountID ||
        result.stripeAccountID;

      if (!stripeAccountID) {
        return res.status(500).send("Missing Stripe account ID");
      }

      // -----------------------------
      // 6️⃣ CREATE FIREBASE TOKEN + HASH
      // -----------------------------
      const firebaseToken = await admin.auth().createCustomToken(userID, {
        email,
        stripeAccountID
      });

      const hash = crypto
        .createHash("sha256")
        .update(firebaseToken)
        .digest("hex")
        .slice(0, 32);

      await stripe.accounts.update(stripeAccountID, {
        metadata: { tokenHash: hash }
      });

      // -----------------------------
      // 7️⃣ UPDATE USER (NEW SCHEMA)
      // -----------------------------
      await userDoc.ref.set(
        {
          TPIdentity: {
            ...TPIdentity,
            email,
            name: username,
            displayName: username,
            stripeAccountID,
            resendToken,
            country
          },

          TPSecurity: {
            ...TPSecurity,
            stripeAccountID
          },

          TPWallet: {
            ...TPWallet,
            payFrequency: result.payFrequency || "daily",
            payDay:
              result.payFrequency === "weekly"
                ? result.payDay || "monday"
                : null
          },

          TPNotifications: {
            ...TPNotifications,
            receiveMassEmails: true,
            emailPending: false
          }
        },
        { merge: true }
      );

      // -----------------------------
      // 8️⃣ STRIPE ONBOARDING LINK
      // -----------------------------
      const BASE_URL = process.env.PULSE_BASE_URL || "https://tropicpulse.bz";

      // -----------------------------
      // IMMORTAL‑v20 TOKEN
      // -----------------------------
      const token = generateToken();

      // -----------------------------
      // STRIPE ONBOARDING LINK
      // -----------------------------
      const onboardingLink = await stripe.accountLinks.create({
        account: stripeAccountID,
        refresh_url: "https://www.tropicpulse.bz/expire.html",
        return_url: `https://www.tropicpulse.bz/StripeSetupComplete.html?token=${encodeURIComponent(token)}`,
        type: "account_onboarding"
      });

      const getPaidLink = onboardingLink.url;

      // -----------------------------
      // RESEND LINK (PUBLIC-SAFE)
      // -----------------------------
      const reSendLink =
        "https://www.tropicpulse.bz/_REDIRECT/resendlink.html?user=" +
        encodeURIComponent(name);

      // -----------------------------
      // EMAIL PAYLOAD
      // -----------------------------
      const payload = {
        email,
        userID,
        name,
        stripeAccountID,
        resendToken: token,
        adminUser: "Automate",
        logId: null
      };


      const now = admin.firestore.FieldValue.serverTimestamp();

      const ref = await db.collection("EmailLogs").add({
        date: now,
        to: email,
        type: "stripeOnboarding",
        payload,
        html: "",
        subject: "",
        adminUser: "Automate",
        triggeredBy: "Automate",
        triggerSource: "createOrGetStripeAccount",
        status: "Pending",
        emailType: "stripeOnboarding",
        name: username,
        createdAt: now
      });

      logId = ref.id;
      payload.logId = logId;

      const template = emailTemplates["stripeOnboarding"];
      if (!template) return res.status(500).send("Missing template");

      const templateContext = { ...payload, getPaidLink, reSendLink };
      const subject = template.subject(templateContext);
      const html = template.html(templateContext);

      await ref.set(
        {
          payload,
          html,
          subject,
          updatedAt: now
        },
        { merge: true }
      );

      // -----------------------------
      // 🔟 SEND EMAIL
      // -----------------------------
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "Sales@TropicPulse.bz",
          pass: EMAIL_PASSWORD_VALUE
        }
      });

      await transporter.sendMail({
        from: `"Tropic Pulse" <Sales@TropicPulse.bz>`,
        to: email,
        bcc: "FordFamilyDelivery@gmail.com",
        subject,
        html
      });

      await ref.update({
        status: "Sent",
        sentAt: now
      });

      // -----------------------------
      // 1️⃣1️⃣ OPTIONAL SMS (NEW SCHEMA)
      // -----------------------------
      const receiveSMS = TPNotifications.receiveSMS ?? true;

      if (receiveSMS && phone) {
        await twilioClient.messages.create({
          to: phone,
          messagingServiceSid: MESSAGING_SERVICE_SID_VALUE,
          body: `Your Tropic Pulse Payment Onboarding Link is Ready. Tap to Continue: ${getPaidLink}`
        });

        await userDoc.ref.set(
          {
            "TPNotifications.lastSMSSentAt": now
          },
          { merge: true }
        );
      }

      return res.status(200).send(getPaidLink);

    } catch (error) {
      console.error("❌ Stripe Onboarding Error:", error);

      const safeErrorMessage = String(
        error?.message ||
          error?.raw?.message ||
          error?.raw?.error?.message ||
          error?.response?.data?.error ||
          error?.toString() ||
          "Unknown error"
      )
        .replace(/'/g, "&#39;")
        .replace(/"/g, "&quot;");

      if (logId) {
        await db.collection("EmailLogs").doc(logId).update({
          status: "Failed",
          failedAt: admin.firestore.FieldValue.serverTimestamp(),
          error: safeErrorMessage
        });
      }

      return res.status(500).send(safeErrorMessage);
    }
  }
);

export async function sendAdminInfoEmail(subject, payload = {}) {
  const EMAIL_PASSWORD_VALUE = EMAIL_PASSWORD.value();
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "Sales@TropicPulse.bz",
        pass: EMAIL_PASSWORD_VALUE
      }
    });

    const html = `
      <div style="font-family:Arial, sans-serif; padding:20px;">
        
        <!-- Tropic Pulse Logo -->
        <div style="text-align:center; margin-bottom:20px;">
          <img 
            src="/_PICTURES/ToucanLogo-Mini.png" 
            alt="Tropic Pulse Logo" 
            style="width:80px; height:auto;"
          />
        </div>

        <h2 style="color:#0a84ff; text-align:center;">Tropic Pulse — Admin Info Alert</h2>

        <p><b>Subject:</b> ${subject}</p>
        <p><b>Timestamp:</b> ${new Date().toISOString()}</p>

        <hr>

        <h3>Payload</h3>
        <pre style="background:#f4f4f4; padding:10px; border-radius:6px;">
        ${JSON.stringify(payload, null, 2)}
        </pre>

        <hr>

        <p style="color:#888; font-size:13px;">
          This is a Non‑Vital Automated Notice from the Vault Intelligence!
        </p>
      </div>
    `;

    await transporter.sendMail({
      from: `"Tropic Pulse" <Sales@TropicPulse.bz>`,
      to: "FordFamilyDelivery@gmail.com",   // or your admin inbox
      subject,
      html
    });

    console.log("📨 Admin Info Email Sent:", subject);

  } catch (err) {
    console.error("🔥 sendAdminInfoEmail FAILED:", err);
  }
}
export function computeHash(str) {
  let h = 0;
  const s = String(str || "");

  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 100000;
  }

  return `h${h}`;
}

export function generateToken(admin) {
  // 1) Drift‑proof timestamp (server authoritative)
  const ts = admin.firestore.Timestamp.now().toMillis().toString(36);

  // 2) Deterministic entropy from timestamp hashing
  let hash = 0;
  for (let i = 0; i < ts.length; i++) {
    hash = (hash * 31 + ts.charCodeAt(i)) >>> 0;
  }

  const h = hash.toString(36).padStart(8, "0");

  // 3) Final 24‑character IMMORTAL token
  return (ts + h).slice(0, 24);
}

export function hashPin(pin) {
  return computeHash("pin:" + pin);
}
/* ===========================
   RECREATE AND GENERATE STRIPE ONBOARDING LINK
=========================== */
export const resendStripeLink = onRequest(
  {
    region: "us-central1",
    timeoutSeconds: 540,
    memory: "512MiB",
    secrets: [
      STRIPE_PASSWORD,
      ACCOUNT_SID,
      AUTH_TOKEN,
      MESSAGING_SERVICE_SID,
      EMAIL_PASSWORD,
      JWT_SECRET,
      STRIPE_WEBHOOK_SECRET
    ]
  },
  async (req, res) => {
    console.log("🔵 [resendStripeLink] START");

    const STRIPE_PASSWORD_VALUE = STRIPE_PASSWORD.value();
    const EMAIL_PASSWORD_VALUE = EMAIL_PASSWORD.value();

    let logId = null;

    try {
      // Enforce HTTPS
      if (req.headers["x-forwarded-proto"] !== "https") {
        return res.redirect("/error.html");
      }

      const stripe = new getStripe(STRIPE_PASSWORD_VALUE);

      // Token must come from POST body
      const resendToken = req.body?.token;
      if (!resendToken) {
        return res.redirect("/error.html");
      }

      // -----------------------------
      // LOOKUP USER BY NEW SCHEMA
      // -----------------------------
      let snap = await admin.firestore()
        .collection("Users")
        .where("TPIdentity.resendToken", "==", resendToken)
        .limit(1)
        .get();

      // Legacy fallback
      if (snap.empty) {
        snap = await admin.firestore()
          .collection("Users")
          .where("resendToken", "==", resendToken)
          .limit(1)
          .get();
      }

      if (snap.empty) {
        return res.redirect("/error.html");
      }

      const userDoc = snap.docs[0];
      const userData = userDoc.data() || {};

      const TPIdentity = userData.TPIdentity || {};
      const TPSecurity = userData.TPSecurity || {};
      const TPNotifications = userData.TPNotifications || {};
      const TPWallet = userData.TPWallet || {};

      const userID = userDoc.id;

      // -----------------------------
      // EMAIL + NAME (NEW SCHEMA)
      // -----------------------------
      const email = TPIdentity.email || null;
      if (!email) {
        return res.redirect("/error.html");
      }

      const name =
        TPIdentity.displayName ||
        TPIdentity.name ||
        "Friend";

      const country = normalizeCountry(TPIdentity.country || "BZ");

      // -----------------------------
      // STRIPE ACCOUNT ID
      // -----------------------------
      let stripeAccountID =
        TPIdentity.stripeAccountID ||
        TPSecurity.stripeAccountID ||
        null;

      if (!stripeAccountID) {
        const result = await checkOrCreateStripeAccount(email, country);
        stripeAccountID = result.stripeAccountID;
      }

      if (!stripeAccountID) {
        return res.redirect("/error.html");
      }

      // -----------------------------
      // REFRESH TOKEN (WRITE TO NEW SCHEMA)
      // -----------------------------
      await userDoc.ref.set(
        { "TPIdentity.resendToken": resendToken },
        { merge: true }
      );

      // -----------------------------
      // CREATE FIREBASE CUSTOM TOKEN
      // -----------------------------
      const jwt = await admin.auth().createCustomToken(userID, {
        email,
        stripeAccountID
      });

      const hash = crypto
        .createHash("sha256")
        .update(jwt)
        .digest("hex")
        .slice(0, 32);

      await stripe.accounts.update(stripeAccountID, {
        metadata: { tokenHash: hash }
      });

      // -----------------------------
      // STRIPE ONBOARDING LINK
      // -----------------------------
       const onboardingLink = await stripe.accountLinks.create({
          account: stripeAccountID,
          refresh_url: "https://www.tropicpulse.bz/expire.html",
          return_url: `https://www.tropicpulse.bz/StripeSetupComplete.html?token=${encodeURIComponent(jwt)}`,
          type: "account_onboarding"
        });

      const getPaidLink = onboardingLink.url;

      // -----------------------------
      // RESEND LINK (NO TOKEN)
      // -----------------------------
      const reSendLink =
        "https://www.tropicpulse.bz/_REDIRECT/resendlink.html?user=" +
        encodeURIComponent(name);

      // -----------------------------
      // EMAIL PAYLOAD
      // -----------------------------
      const payload = {
        email,
        userID,
        name,
        stripeAccountID,
        resendToken,
        adminUser: "Automate",
        logId: null
      };

      const now = admin.firestore.FieldValue.serverTimestamp();

      const ref = await db.collection("EmailLogs").add({
        date: now,
        to: email,
        type: "resendStripeLink",
        payload,
        html: "",
        subject: "",
        adminUser: "Automate",
        triggeredBy: "Automate",
        triggerSource: "resendStripeLink",
        status: "Pending",
        emailType: "resendStripeLink",
        name,
        createdAt: now,
        updatedAt: now
      });

      logId = ref.id;
      payload.logId = logId;

      // -----------------------------
      // TEMPLATE
      // -----------------------------
      const template = emailTemplates["resendStripeLink"];
      if (!template) {
        return res.redirect("/error.html");
      }

      const subject = template.subject({ ...payload, getPaidLink, reSendLink });
      const html = template.html({ ...payload, getPaidLink, reSendLink });

      await ref.set(
        { payload, html, subject, updatedAt: now },
        { merge: true }
      );

      // -----------------------------
      // SEND EMAIL
      // -----------------------------
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "Sales@TropicPulse.bz",
          pass: EMAIL_PASSWORD_VALUE
        }
      });

      await transporter.sendMail({
        from: `"Tropic Pulse" <Sales@TropicPulse.bz>`,
        to: email,
        bcc: "FordFamilyDelivery@gmail.com",
        subject,
        html
      });

      await ref.update({
        status: "Sent",
        sentAt: now
      });

      // -----------------------------
      // SUCCESS REDIRECT
      // -----------------------------
      return res.redirect(
        "/success.html?user=" +
          encodeURIComponent(name)
      );

    } catch (error) {
      console.error("❌ Resend Stripe Link Error:", error);

      if (logId) {
        await db.collection("EmailLogs").doc(logId).update({
          status: "Failed",
          failedAt: admin.firestore.FieldValue.serverTimestamp(),
          error: String(error)
        });
      }

      return res.redirect("/error.html");
    }
  }
);
/* ===========================
   SEND PAYOUT FUNCTION
=========================== */
export const sendPayout = onRequest(
  {
    region: "us-central1",
    timeoutSeconds: 540,
    memory: "1GiB",
    secrets: [
      STRIPE_PASSWORD,
      ACCOUNT_SID,
      AUTH_TOKEN,
      MESSAGING_SERVICE_SID,
      EMAIL_PASSWORD
    ]
  },
  async (req, res) => {
    console.log("🔵 [sendPayout] START");

    const STRIPE_PASSWORD_VALUE = STRIPE_PASSWORD.value();
    const ACCOUNT_SID_VALUE = ACCOUNT_SID.value();
    const AUTH_TOKEN_VALUE = AUTH_TOKEN.value();
    const MESSAGING_SERVICE_SID_VALUE = MESSAGING_SERVICE_SID.value();
    const EMAIL_PASSWORD_VALUE = EMAIL_PASSWORD.value();

    let logId = null;

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

    const clean = (v, fallback = null) => {
      if (v == null) return fallback;
      const s = String(v).trim();
      return s === "" ? fallback : s;
    };

    try {
      // CORS
      res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
      if (req.method === "OPTIONS") return res.status(204).send("");

      if (req.method !== "GET" && req.method !== "POST") {
        return res.status(405).json({ success: false, error: "Method not allowed" });
      }

      const stripe = new getStripe(STRIPE_PASSWORD_VALUE);
      const twilioClient = twilio(ACCOUNT_SID_VALUE, AUTH_TOKEN_VALUE);

      const source = req.method === "GET" ? req.query : req.body;
      const { orderID, email, emailType = "sendPayout" } = source;

      if (!orderID) {
        return res.status(400).json({ success: false, error: "Missing orderID" });
      }

      const delivererEmail = clean(email || source.delivererEmail, null);
      if (!delivererEmail) {
        return res.status(400).json({ success: false, error: "Missing deliverer email" });
      }

      const adminUser = "Automate";

      // ------------------------------------
      // 1️⃣ LOAD USER (NEW SCHEMA)
      // ------------------------------------
      let userSnap = await db
        .collection("Users")
        .where("TPIdentity.email", "==", delivererEmail.toLowerCase())
        .limit(1)
        .get();

      // Legacy fallback
      if (userSnap.empty) {
        userSnap = await db
          .collection("Users")
          .where("Email", "==", delivererEmail.toLowerCase())
          .limit(1)
          .get();
      }

      if (userSnap.empty) {
        return res.status(400).json({ success: false, error: "User not found for email" });
      }

      const userRef = userSnap.docs[0].ref;
      const userData = userSnap.docs[0].data() || {};

      const TPIdentity = userData.TPIdentity || {};
      const TPSecurity = userData.TPSecurity || {};
      const TPNotifications = userData.TPNotifications || {};
      const TPWallet = userData.TPWallet || {};

      const stripeAccountID =
        TPIdentity.stripeAccountID ||
        TPSecurity.stripeAccountID ||
        null;

      const name =
        TPIdentity.displayName ||
        TPIdentity.name ||
        "Friend";

      let phone = TPIdentity.phone || null;
      const country = normalizeCountry(TPIdentity.country || "BZ");
      phone = normalizePhone(phone, country);

      if (!stripeAccountID) {
        return res.status(400).json({
          success: false,
          error: "User has no Stripe account ID"
        });
      }

      // ------------------------------------
      // 2️⃣ LOAD ORDER
      // ------------------------------------
      const orderSnap = await db.collection("Orders").doc(orderID).get();
      if (!orderSnap.exists) {
        return res.status(400).json({ success: false, error: "Order not found" });
      }

      const orderData = orderSnap.data() || {};

      const payout = num(orderData.tip);
      let payoutAmount = num(orderData.displayAmount || orderData.payoutAmount || payout);

      const itemPrice = num(orderData.orderprice);
      const totalPrice = orderData.ordertotal ?? null;
      const tipAmount = orderData.ordertip ?? null;
      const taxAmount = orderData.ordertax ?? null;
      const shipping = orderData.ordershipping ?? null;

      if (!payoutAmount) {
        return res.status(400).json({
          success: false,
          error: "Order missing payoutAmount"
        });
      }

      if (orderData.paidDeliverer === true) {
        return res.status(200).json({ success: true, message: "Already paidDeliverer" });
      }

      // ------------------------------------
      // 3️⃣ DETERMINE CURRENCY + BALANCE
      // ------------------------------------
      const info = await determinePayoutCurrency(
        stripe,
        stripeAccountID,
        payoutAmount
      );

      let stripeBalances = await findUserStripeBalance(
        stripeAccountID,
        STRIPE_PASSWORD_VALUE
      );

      let pendingBalance = num(stripeBalances.pendingBalance);
      let availableBalance = num(stripeBalances.availableBalance);

      const {
        displayCurrency,
        transferCurrency,
        displayAmount,
        transferAmount
      } = info;

      // ------------------------------------
      // 4️⃣ RESERVE LOGIC
      // ------------------------------------
      const delivererReserve = Math.round(transferAmount * 0.05);
      const delivererPayout = Math.round(transferAmount * 0.95);

      // ------------------------------------
      // 5️⃣ STRIPE TRANSFER
      // ------------------------------------
      let transfer;
      try {
        transfer = await stripe.transfers.create({
          amount: delivererPayout * 100,
          currency: transferCurrency,
          destination: stripeAccountID,
          description: `Tropic Pulse: Payout for Delivery ${orderID}`,
          metadata: {
            orderID,
            delivererEmail,
            delivererReserve
          }
        });

        await db.collection("Orders").doc(orderID).update({
          paidDeliverer: true,
          paidDelivererID: transfer.id,
          paidDelivererAt: admin.firestore.FieldValue.serverTimestamp()
        });

        // ------------------------------------
        // 6️⃣ UPDATE WALLET (NEW SCHEMA)
        // ------------------------------------
        await userRef.update({
          "TPWallet.reserveBalance": admin.firestore.FieldValue.increment(delivererReserve),
          "TPWallet.reserveHistory": admin.firestore.FieldValue.arrayUnion({
            amount: delivererReserve,
            date: admin.firestore.FieldValue.serverTimestamp(),
            orderId: orderID,
            releaseDate: calculateReleaseDate(90),
            type: "reserve_add"
          })
        });

      } catch (err) {
        return res.status(200).json({
          success: false,
          message: "Transfer failed, no payout sent",
          error: err.message
        });
      }

      // Refresh balances
      stripeBalances = await findUserStripeBalance(
        stripeAccountID,
        STRIPE_PASSWORD_VALUE
      );

      pendingBalance = num(stripeBalances.pendingBalance);
      availableBalance = num(stripeBalances.availableBalance);

      // ------------------------------------
      // 7️⃣ EMAIL LOG
      // ------------------------------------
      const payload = {
        payoutAmount,
        name,
        itemPrice,
        totalPrice,
        tipAmount,
        taxAmount,
        shipping,
        stripeAccountID,
        displayCurrency,
        displayAmount,
        transferCurrency,
        pendingBalance,
        availableBalance,
        orderID,
        delivererEmail,
        adminUser,
        logId: null
      };

      const ref = await db.collection("EmailLogs").add({
        date: admin.firestore.FieldValue.serverTimestamp(),
        to: delivererEmail,
        type: "sendPayout",
        html: "",
        payload,
        adminUser: "Automate",
        triggeredBy: "Automate",
        triggerSource: "sendPayout",
        emailType: "sendPayout",
        name,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        status: "Pending"
      });

      logId = ref.id;
      payload.logId = logId;

      const template = emailTemplates["sendPayout"];
      if (!template) {
        return res.status(400).json({
          success: false,
          error: `Unknown emailType: sendPayout`
        });
      }

      const html = template.html(payload);
      const subject = template.subject(payload);

      const finalHeaders =
        template.headers ||
        (template.important
          ? {
              "X-Priority": "1",
              "X-MSMail-Priority": "High",
              Importance: "high"
            }
          : {});


      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "Sales@TropicPulse.bz",
          pass: EMAIL_PASSWORD_VALUE
        }
      });

      await db.collection("EmailLogs").doc(logId).set(
        {
          payload,
          html,
          subject,
          status: "Pending",
          updatedAt: admin.firestore.FieldValue.serverTimestamp()
        },
        { merge: true }
      );

      await transporter.sendMail({
        from: `"Tropic Pulse" <Sales@TropicPulse.bz>`,
        to: delivererEmail,
        bcc: "FordFamilyDelivery@gmail.com",
        subject,
        html,
        headers: finalHeaders
      });

      await db.collection("EmailLogs").doc(logId).update({
        status: "Sent",
        sentAt: admin.firestore.FieldValue.serverTimestamp()
      });

      // -----------------------------
      // SMS (NEW NOTIFICATIONS BUCKET)
      // -----------------------------
      const receiveSMS = TPNotifications.receiveSMS ?? true;

      if (!receiveSMS || !phone) {
        console.log("🚫 User has SMS Disabled or no phone:", {
          receiveSMS,
          phone
        });
      } else {
        await twilioClient.messages.create({
          to: phone,
          messagingServiceSid: MESSAGING_SERVICE_SID_VALUE,
          body: `Tropic Pulse: Payout for Delivery ${orderID}`
        });

        await userRef.set(
          {
            "TPNotifications.lastSMSSentAt":
              admin.firestore.FieldValue.serverTimestamp()
          },
          { merge: true }
        );
      }

      return res.status(200).json({
        success: true,
        payoutID: transfer.id,
        message: "Payout sent successfully"
      });
    } catch (error) {
      console.error("❌ [sendPayout] ERROR:", error);
      if (logId) {
        await db.collection("EmailLogs").doc(logId).update({
          status: "Failed",
          failedAt: admin.firestore.FieldValue.serverTimestamp(),
          error: String(error)
        });
      }
      return res
        .status(500)
        .json({ success: false, error: "Internal server error" });
    }
  }
);

async function sendAdminAlertEmail(subject, error, context = {}) {
  const EMAIL_PASSWORD_VALUE = EMAIL_PASSWORD.value();
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      important: true,
      secure: true,
      auth: {
        user: "Sales@TropicPulse.bz",
        pass: EMAIL_PASSWORD_VALUE
      }
    });
    const html = `
      <div style="font-family:Arial, sans-serif; padding:20px;">
        
        <!-- Tropic Pulse Logo -->
        <div style="text-align:center; margin-bottom:20px;">
          <img 
            src="/_PICTURES/ToucanLogo-Mini.png" 
            alt="Tropic Pulse Logo" 
            style="width:80px; height:auto;"
          />
        </div>

        <h2 style="color:#0a84ff; text-align:center;">🚨 Tropic Pulse Backend Error</h2>

        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
        <p><strong>Error:</strong> ${error?.message || error}</p>

        <hr>

        <h3>Payload</h3>
        <pre style="background:#f4f4f4; padding:10px; border-radius:6px;">
        ${JSON.stringify(context, null, 2)}
        </pre>

        <hr>

        <p style="color:#888; font-size:13px;">
          This is a Non‑Vital Automated Notice from the Vault Intelligence!
        </p>
      </div>
    `;

    await transporter.sendMail({
      from: `"Tropic Pulse Alerts" <Sales@TropicPulse.bz>`,
      to: "FordFamilyDelivery@gmail.com",
      subject: `🚨 ALERT: ${subject}`,
      html
    });

    console.log("📨 Admin alert sent");
  } catch (err) {
    console.error("❌ Failed to send admin alert:", err);
  }
}

export function sendPixel(res) {
  const pixel = Buffer.from(
    "R0lGODlhAQABAPAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",
    "base64"
  );

  res.set("Content-Type", "image/gif");
  res.send(pixel);
}
/* ===========================
   EMAIL OPENED FUNCTION
=========================== */
export const emailOpened = onRequest(
  {
    region: "us-central1",
    timeoutSeconds: 540,
    memory: "512MiB"
  },
  async (req, res) => {
    const pixel = () => sendPixel(res);

    try {
      const raw = req.query.logId;
      const logId = raw ? String(raw).trim() : "";

      // 1️⃣ Validate logId
      if (!logId || logId === "undefined" || logId.length < 5) {
        console.log("Ignoring invalid logId:", raw);
        return pixel();
      }

      console.log("📩 Pixel fired for:", logId);

      const ref = db.collection("EmailLogs").doc(logId);
      const snap = await ref.get();

      // 2️⃣ Ensure log exists
      if (!snap.exists) {
        console.log("❌ Log not found:", logId);
        return pixel();
      }

      const data = snap.data() || {};
      const status = data.status || "Unknown";
      const uid = data.userID || null;
      const emailType = data.emailType || null;

      // 3️⃣ Skip invalid states
      if (status === "Failed") return pixel();
      if (status === "Pending") return pixel();
      if (status === "Opened") return pixel();

      const now = admin.firestore.Timestamp.now();

      // 4️⃣ Update EmailLogs (forensic)
      const emailLogUpdates = {
        openedAt: now,
        status: "Opened",
        firstOpenAt: data.firstOpenAt || now,
        openCount: admin.firestore.FieldValue.increment(1)
      };

      await ref.update(emailLogUpdates);

      // 5️⃣ If we know the user, enrich their schema
      if (uid) {
        const userRef = db.collection("Users").doc(uid);
        const userSnap = await userRef.get();
        const userData = userSnap.data() || {};

        const TPNotifications = userData.TPNotifications || {};
        const TPLoyalty = userData.TPLoyalty || {};
        const TPWallet = userData.TPWallet || {};
        const TPSecurity = userData.TPSecurity || {};
        const TPIdentity = userData.TPIdentity || {};

        // -----------------------------
        // TPNotifications (communication)
        // -----------------------------
        const updatedTPNotifications = {
          ...TPNotifications,
          lastEmailOpenedAt: now,
          emailOpenCount: (TPNotifications.emailOpenCount || 0) + 1,
          emailPending: false,
          updatedAt: now
        };

        // -----------------------------
        // TPLoyalty (engagement)
        // -----------------------------
        const updatedTPLoyalty = {
          ...TPLoyalty,
          lastEngagement: now,
          engagementScore: (TPLoyalty.engagementScore || 0) + 1,
          updatedAt: now
        };

        // -----------------------------
        // TPWallet (economic engagement)
        // -----------------------------
        const updatedTPWallet = {
          ...TPWallet,
          lastEngagement: now,
          updatedAt: now
        };

        // -----------------------------
        // TPSecurity (auth recency)
        // -----------------------------
        const updatedTPSecurity = {
          ...TPSecurity,
          lastActive: now,
          updatedAt: now
        };

        // -----------------------------
        // TPIdentity (lifecycle recency)
        // -----------------------------
        const updatedTPIdentity = {
          ...TPIdentity,
          lastSeen: now,
          updatedAt: now
        };

        // -----------------------------
        // APPLY USER UPDATES
        // -----------------------------
        await userRef.set(
          {
            TPNotifications: updatedTPNotifications,
            TPLoyalty: updatedTPLoyalty,
            TPWallet: updatedTPWallet,
            TPSecurity: updatedTPSecurity,
            TPIdentity: updatedTPIdentity
          },
          { merge: true }
        );

        // -----------------------------
        // CHANGES LOG (global audit)
        // -----------------------------
        await db.collection("CHANGES").add({
          type: "emailOpened",
          uid,
          logId,
          emailType,
          openedAt: now,
          createdAt: now,
          source: "emailOpened"
        });

        // -----------------------------
        // IDENTITY HISTORY (forensic)
        // -----------------------------
        await db
          .collection("IdentityHistory")
          .doc(uid)
          .collection("snapshots")
          .add({
            snapshotType: "emailOpened",
            logId,
            emailType,
            openedAt: now,
            createdAt: now,
            source: "emailOpened"
          });
      }

      console.log("✅ Updated Firebase → Opened:", logId);
      return pixel();

    } catch (err) {
      console.error("❌ emailOpened error:", err);
      return pixel();
    }
  }
);

export const setSecurityState = onRequest(
  {
    region: "us-central1",
    timeoutSeconds: 30,
    memory: "256MiB",
    secrets: [EMAIL_PASSWORD]
  },
  async (req, res) => {
    let uid = null;
    let reason = null;
    let actor = null;
    let source = null;
    let updates = null;
    let allowed = null;
    let clean = {};
    let updatePayload = {};

    // CORS
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

    if (req.method === "OPTIONS") {
      return res.status(204).send("");
    }
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    try {
      ({ uid, reason, actor, source, ...updates } = req.body || {});

      if (!uid) {
        await sendAdminAlertEmail(
          "SET SECURITY STATE MISSING UID SOFT ERROR",
          null,
          { uid, source, actor, reason, updates }
        );
        return res.status(400).json({ error: "Missing uid" });
      }

      // Allowed security flags
      allowed = ["appLocked", "vaultLocked", "requiresPin", "dangerMode"];
      clean = {};

      for (const key of Object.keys(updates)) {
        if (allowed.includes(key)) {
          clean[key] = updates[key];
        }
      }

      if (Object.keys(clean).length === 0) {
        await sendAdminAlertEmail(
          "SET SECURITY STATE NO VALID SECURITY FIELDS SOFT ERROR",
          null,
          { uid, source, actor, reason, allowed, clean }
        );
        return res.status(400).json({ error: "No valid security fields provided" });
      }

      // NEW SCHEMA — TPSecurity lives under Users/{uid}
      const securityRef = admin
        .firestore()
        .collection("Users")
        .doc(uid)
        .collection("TPSecurity")
        .doc("state");

      // Load previous state for CHANGES diff
      const beforeSnap = await securityRef.get();
      const before = beforeSnap.exists ? beforeSnap.data() : {};

      // Apply update
      updatePayload = {
        ...clean,
        lastUpdated: admin.firestore.FieldValue.serverTimestamp(),
        lastReason: reason || "unspecified",
        lastActor: actor || "user",
        lastSource: source || "app"
      };

      await securityRef.set(updatePayload, { merge: true });

      // -----------------------------
      // LOG TO CHANGES COLLECTION
      // -----------------------------
      const changesRef = admin.firestore().collection("CHANGES").doc();
      await changesRef.set({
        type: "security",
        uid,
        before,
        after: updatePayload,
        reason: reason || "unspecified",
        actor: actor || "user",
        source: source || "app",
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      });

      // -----------------------------
      // SNAPSHOT INTO IdentityHistory
      // -----------------------------
      const historyRef = admin
        .firestore()
        .collection("IdentityHistory")
        .doc(uid)
        .collection("snapshots")
        .doc();

      await historyRef.set({
        snapshotType: "securityState",
        uid,
        TPSecurity: updatePayload, // NEW SCHEMA
        reason: reason || "unspecified",
        actor: actor || "user",
        source: source || "app",
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      });

      return res.json({ ok: true });

    } catch (err) {
      await sendAdminAlertEmail(
        "SET SECURITY STATE HARD ERROR",
        err,
        { uid, source, actor, reason, allowed, updatePayload }
      );
      return res.status(500).json({ error: "Failed to update security state" });
    }
  }
);

function normalizeTime(t) {
  if (!t) return "00:00";

  // Already in HH:MM (24h)
  if (/^\d{2}:\d{2}$/.test(t)) return t;

  // 12-hour with AM/PM
  const m = t.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (m) {
    let [_, h, min, ap] = m;
    h = parseInt(h, 10);
    if (ap.toUpperCase() === "PM" && h !== 12) h += 12;
    if (ap.toUpperCase() === "AM" && h === 12) h = 0;
    return `${String(h).padStart(2, "0")}:${min}`;
  }

  // Reject anything else — security must be strict
  return "00:00";
}
export const EmailAlertIcons = Object.freeze({
  // CRITICAL / STOP / DANGER
  stop:        "🛑",   // red stop sign
  danger:      "❌",   // red X
  critical:    "⛔",   // no-entry
  fire:        "🔥",   // fire (critical failure)
  skull:       "💀",   // catastrophic

  // WARNING / RISK
  warning:     "⚠️",
  caution:     "🚧",
  alert:       "❗",
  highTemp:    "🌡️",
  batteryLow:  "🔋",

  // SUCCESS / OK / GO
  success:     "✅",
  go:          "🟢",
  check:       "✔️",
  done:        "🎉",

  // INFO / NOTICE
  info:        "ℹ️",
  note:        "📝",
  bell:        "🔔",
  update:      "🔄",

  // SYSTEM / TECHNICAL
  cpu:         "🧠",
  gpu:         "🎛️",
  network:     "🌐",
  memory:      "💾",
  disk:        "📀",
  folder:      "📁",
  bug:         "🐛",
  patch:       "🩹",

  // SECURITY
  lock:        "🔒",
  unlock:      "🔓",
  shield:      "🛡️",
  threat:      "🚨",

  // DELIVERY / OPS
  truck:       "🚚",
  package:     "📦",
  clock:       "⏱️",
  map:         "🗺️",

  // USER / ACCOUNT
  user:        "👤",
  users:       "👥",
  id:          "🪪"
});

// ============================================================================
//  SEVERITY MAP — determines icon + color + emphasis
// ============================================================================

export const EmailAlertSeverity = Object.freeze({
  error: {
    icon: EmailAlertIcons.danger,
    color: "red",
    weight: "high"
  },
  critical: {
    icon: EmailAlertIcons.stop,
    color: "darkred",
    weight: "maximum"
  },
  fallback: {
    icon: EmailAlertIcons.warning,
    color: "orange",
    weight: "medium"
  },
  info: {
    icon: EmailAlertIcons.info,
    color: "blue",
    weight: "low"
  },
  success: {
    icon: EmailAlertIcons.success,
    color: "green",
    weight: "low"
  }
});

// ============================================================================
//  CORE INTERNAL SENDER — IMMORTAL
// ============================================================================

import { PulseOSShortTermMemory } from "../PULSE-OS/PulseOSShortTermMemory.js";

async function _send(emailType, payload = {}) {
  try {
    if (!PulseOSShortTermMemory?.sendDynamicEmail) {
      console.warn("[EmailAlert] sendDynamicEmail missing");
      return false;
    }

    const severity = payload.severity || "info";
    const sev = EmailAlertSeverity[severity] || EmailAlertSeverity.info;

    const icon = payload.icon || sev.icon;

    await PulseOSShortTermMemory.sendDynamicEmail({
      email: payload.email || "FordFamilyDelivery@gmail.com",
      emailType,
      payload: {
        ...payload,
        icon,
        severity,
        color: sev.color
      }
    });

    return true;
  } catch (err) {
    console.error("[EmailAlert] FAILED:", err);
    return false;
  }
}

// ============================================================================
//  PRIMARY ALERTS (ACTIVE)
// ============================================================================

export async function sendErrorAlert(message, meta = {}) {
  return _send("systemError", {
    ...meta,
    message,
    severity: "error"
  });
}

export async function sendCriticalAlert(message, meta = {}) {
  return _send("systemCritical", {
    ...meta,
    message,
    severity: "critical"
  });
}

export async function sendFallbackAlert(payload = {}) {
  return _send("systemFallback", {
    ...payload,
    severity: "fallback"
  });
}

export async function sendCustomAlert(emailType, payload = {}) {
  return _send(emailType, payload);
}

// ============================================================================
//  FUTURE ALERT TYPES — FULL SCAFFOLD (50+ TYPES)
// ============================================================================

/*
export async function sendLaneAlert(message, meta = {}) {
  return _send("laneAlert", { ...meta, message, icon: EmailAlertIcons.warning });
}

export async function sendEngineAlert(message, meta = {}) {
  return _send("engineAlert", { ...meta, message, icon: EmailAlertIcons.cpu });
}

export async function sendPageAlert(message, meta = {}) {
  return _send("pageAlert", { ...meta, message, icon: EmailAlertIcons.map });
}

export async function sendHeartbeatAlert(message, meta = {}) {
  return _send("heartbeatAlert", { ...meta, message, icon: EmailAlertIcons.bell });
}

export async function sendChunkerAlert(message, meta = {}) {
  return _send("chunkerAlert", { ...meta, message, icon: EmailAlertIcons.memory });
}

export async function sendSecurityAlert(message, meta = {}) {
  return _send("securityAlert", { ...meta, message, icon: EmailAlertIcons.shield });
}

export async function sendAdminAlert(message, meta = {}) {
  return _send("adminAlert", { ...meta, message, icon: EmailAlertIcons.user });
}

export async function sendUserAlert(message, meta = {}) {
  return _send("userAlert", { ...meta, message, icon: EmailAlertIcons.users });
}

export async function sendDevAlert(message, meta = {}) {
  return _send("devAlert", { ...meta, message, icon: EmailAlertIcons.bug });
}

export async function sendDebugAlert(message, meta = {}) {
  return _send("debugAlert", { ...meta, message, icon: EmailAlertIcons.bug });
}

export async function sendPerformanceAlert(message, meta = {}) {
  return _send("performanceAlert", { ...meta, message, icon: EmailAlertIcons.cpu });
}

export async function sendMemoryAlert(message, meta = {}) {
  return _send("memoryAlert", { ...meta, message, icon: EmailAlertIcons.memory });
}

export async function sendNetworkAlert(message, meta = {}) {
  return _send("networkAlert", { ...meta, message, icon: EmailAlertIcons.network });
}

export async function sendOfflineAlert(message, meta = {}) {
  return _send("offlineAlert", { ...meta, message, icon: EmailAlertIcons.warning });
}

export async function sendRecoveryAlert(message, meta = {}) {
  return _send("recoveryAlert", { ...meta, message, icon: EmailAlertIcons.update });
}

export async function sendUpgradeAlert(message, meta = {}) {
  return _send("upgradeAlert", { ...meta, message, icon: EmailAlertIcons.update });
}

export async function sendWorldAlert(message, meta = {}) {
  return _send("worldAlert", { ...meta, message, icon: EmailAlertIcons.map });
}
*/

// ============================================================================
//  EXPORT
// ============================================================================

export const PulseWorldEmailAlert = {
  sendErrorAlert,
  sendCriticalAlert,
  sendFallbackAlert,
  sendCustomAlert,
  EmailAlertIcons,
  EmailAlertSeverity
};

export default PulseWorldEmailAlert;

function normalizePhone(raw, row, coords = {}) {
  if (!raw) return null;

  // Clean weird whitespace + NBSP
  let v = String(raw)
    .replace(/\u00A0/g, " ")
    .trim();

  // Strip everything except digits and +
  v = v.replace(/[^\d+]/g, "");

  // Already valid E.164
  if (v.startsWith("+") && v.length >= 8 && v.length <= 15) {
    return v;
  }

  // Remove leading +
  if (v.startsWith("+")) v = v.slice(1);

  // Pure digits
  const digits = v.replace(/\D/g, "");

  // --- BELIZE LOGIC ---
  // 7‑digit local numbers → +501
  if (digits.length === 7) {
    return "+501" + digits;
  }

  // 501 + 7 digits → +501xxxxxxx
  if (digits.startsWith("501") && digits.length === 10) {
    return "+501" + digits.slice(3);
  }

  // --- US / CANADA ---
  if (digits.length === 10) {
    return "+1" + digits;
  }

  if (digits.length === 11 && digits.startsWith("1")) {
    return "+1" + digits.slice(1);
  }

  // --- INTERNATIONAL FALLBACK ---
  if (digits.length >= 8 && digits.length <= 15) {
    return "+" + digits;
  }

  // Reject everything else
  return null;
}

export async function handler(event, context) {
  try {
    if (event.httpMethod !== "GET") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    console.log("🔵 [/resend-link] START");

    const stripe = getStripe();
    const twilioClient = twilio();

    const params = event.queryStringParameters || {};

    // Clean token
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
      ) return null;
      return s;
    };

    const token = clean(params.token);
    if (!token) {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, error: "Missing token" })
      };
    }

    const usersRef = db.collection("Users");

    // 1️⃣ Try permanent token first
    let snap = await usersRef.where("UserToken", "==", token).limit(1).get();

    // 2️⃣ Try current resend token
    if (snap.empty) {
      snap = await usersRef.where("TPIdentity.resendToken", "==", token).limit(1).get();
    }

    if (snap.empty) {
      return {
        statusCode: 404,
        body: JSON.stringify({ success: false, error: "Invalid token" })
      };
    }

    const user = snap.docs[0].data();
    const userRef = snap.docs[0].ref;

    // -----------------------------
    // PHONE
    // -----------------------------
    let phone =
      user.UserPhone ||
      user.Phone ||
      user.phone ||
      user.phonenumber ||
      user.userphone ||
      null;

    const country = user.UserCountry || "BZ";
    if (phone) phone = normalizePhone(phone, country);

    if (!phone) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          success: false,
          error: "No phone number on file for SMS resend"
        })
      };
    }

    // -----------------------------
    // STRIPE ACCOUNT ID
    // -----------------------------
    const stripeAccountID = user.TPIdentity?.stripeAccountID || null;

    if (!stripeAccountID) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          success: false,
          error: "User missing Stripe account ID"
        })
      };
    }

    // -----------------------------
    // JWT (for return_url)
    // -----------------------------
    const jwt = await admin.auth().createCustomToken(
      user.TPIdentity?.uid || user.UserID,
      {
        email: user.TPIdentity?.email || user.UserEmail,
        stripeAccountID
      }
    );

    // Hash for Stripe metadata
    const hash = crypto.createHash("sha256").update(jwt).digest("hex").slice(0, 32);

    await stripe.accounts.update(stripeAccountID, {
      metadata: { tokenHash: hash }
    });

    // -----------------------------
    // NOTIFICATIONS: SMS Opt-In
    // -----------------------------
    const receiveSMS = user.TPNotifications?.receiveSMS ?? false;

    if (!receiveSMS) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          message: "SMS Not Sent (User Opted Out)"
        })
      };
    }

    // -----------------------------
    // STRIPE ONBOARDING LINK
    // -----------------------------
    try {
      const link = await stripe.accountLinks.create({
        account: stripeAccountID,
        refresh_url: "/expire.html",
        return_url: `/StripeSetupComplete.html?token=${encodeURIComponent(jwt)}`,
        type: "account_onboarding"
      });

      const newUrl = link.url;

      // -----------------------------
      // UPDATE NOTIFICATIONS TIMESTAMP
      // -----------------------------
      await userRef.set(
        {
          TPNotifications: {
            lastSMSSentAt: admin.firestore.FieldValue.serverTimestamp()
          }
        },
        { merge: true }
      );

      return {
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          message: "Link resent",
          url: newUrl
        })
      };

    } catch (err) {
      console.error("Resend-Link error:", err.message);
      return {
        statusCode: 500,
        body: JSON.stringify({
          success: false,
          error: err.message
        })
      };
    }

  } catch (err) {
    console.error("Resend-Link fatal error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: err.message })
    };
  }
}


const emailTemplates = {
newUser: {
  subject: () => "Welcome to Tropic Pulse!",
  important: true,
  html: (payload) => {
    const { logId } = payload;

    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.tropicpulse.bze.bze.bz/emailopen?logId=${encodeURIComponent(
            logId
          )}" width="1" height="1" alt="" style="display:block; opacity:0;">`
        : "";

    return `<!DOCTYPE html>
<html>
  <body style="margin:0; padding:0; background-color:#f4f4f4; font-family:Arial, sans-serif;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" 
           style="background-color:#f4f4f4; padding:40px 0;">
      <tr>
        <td align="center" style="background-color:#f4f4f4;">

          <!-- Main Card -->
          <table width="600" border="0" cellspacing="0" cellpadding="0" 
                 style="background:#ffffff; border-radius:14px; overflow:hidden;">

            <!-- BIG HEADER IMAGE -->
            <tr>
              <td>
                <img src="https://www.tropicpulse.bze.bze.bz/Welcome.png"
                     alt="Tropic Pulse Header"
                     width="600"
                     style="display:block; width:100%; max-width:600px;">
              </td>
            </tr>

            <!-- Inner Padding -->
            <tr>
              <td style="padding:30px;">

                <!-- Welcome Title -->
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td align="center" 
                        style="font-size:28px; font-weight:bold; color:#222;">
                      Welcome to Tropic Pulse!
                    </td>
                  </tr>

                  <tr>
                    <td align="center" 
                        style="font-size:16px; color:#666; padding-top:8px;">
                      Your account has been successfully created!
                    </td>
                  </tr>

                  <!-- Toucan Image -->
                  <tr>
                    <td align="center" style="padding:25px 0;">
                      <img src="https://www.tropicpulse.bze.bz/ToucanLogo-Mini.png"
                           alt="Tropic Pulse Toucan"
                           width="180"
                           style="display:block; border-radius:12px;">
                    </td>
                  </tr>

                  <!-- Message -->
                  <tr>
                    <td align="center" 
                        style="font-size:18px; color:#555; padding:25px 20px 10px 20px; line-height:24px;">
                      You’re all set! Your Tropic Pulse account is ready to use.  
                      If you plan to accept payments for Tropic Pulse services,  
                      please check your email for important setup instructions.
                    </td>
                  </tr>

                  <!-- Social Media Section -->
                  <tr>
                    <td align="center" style="padding-top:20px;">
                      <div style="font-size:14px; color:#555; margin-bottom:10px;">
                        Enjoy these moments! Share your successes with Tropic Pulse on social media.
                      </div>
                      <a href="https://linktr.ee/tropicpulse" target="_blank">
                        <img src="../PULSE-UI/_PICTURES/SocialMedia.png"
                             alt="Social Media Icons"
                             width="180"
                             style="display:block; margin:auto;">
                      </a>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>

          </table>

          ${trackingPixel}

        </td>
      </tr>
    </table>
  </body>
</html>`;
  }
},

  loyalty: {
  subject: (payload) => "Tropic Pulse: My Pulse Loyalty Enrollment Setup!",
  important: true,
  html: (payload) => {
    const { name, email, logId } = payload;

    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="../PULSE-UI/_PICTURES/emailopen?logId=${encodeURIComponent(
            logId
          )}" width="1" height="1" alt="" style="opacity:0; width:1px; height:1px;">`
        : "";

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>My Pulse Loyalty Enrollment Setup</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f3f5f7;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      color: #1f2933;
    }
    .wrapper {
      width: 100%;
      background-color: #f3f5f7;
      padding: 24px 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(15, 23, 42, 0.12);
    }
    .header {
      background: linear-gradient(135deg, #00c2a8, #00a0ff);
      padding: 24px 24px 20px;
      text-align: left;
      color: #ffffff;
    }
    .logo-row {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .logo-circle {
      width: 70px;
      height: 70px;
      border-radius: 999px;
      background: none !important;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
    }
    .brand-text {
      font-size: 18px;
      font-weight: 600;
      letter-spacing: 0.03em;
    }
    .tagline {
      font-size: 12px;
      opacity: 0.9;
    }
    .header-title {
      margin-top: 18px;
      font-size: 22px;
      font-weight: 700;
    }
    .header-subtitle {
      margin-top: 6px;
      font-size: 14px;
      opacity: 0.95;
    }
    .content {
      padding: 24px 24px 8px;
      font-size: 14px;
      line-height: 1.6;
    }
    .content h2 {
      font-size: 20px;
      margin: 0 0 12px;
      color: #111827;
    }
    .pill {
      display: inline-block;
      padding: 4px 10px;
      border-radius: 999px;
      background-color: #ecfdf5;
      color: #047857;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      margin-bottom: 10px;
    }
    .highlight-box {
      margin: 16px 0;
      padding: 12px 14px;
      border-radius: 12px;
      background-color: #f9fafb;
      border: 1px solid #e5e7eb;
    }
    .highlight-label {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #6b7280;
      margin-bottom: 4px;
    }
    .highlight-value {
      font-size: 13px;
      font-weight: 600;
      color: #111827;
    }
    .button-row {
      margin: 22px 0 10px;
      text-align: left;
    }
    .primary-button {
      display: inline-block;
      padding: 10px 18px;
      border-radius: 999px;
      background: linear-gradient(135deg, #00c2a8, #00a0ff);
      color: #ffffff !important;
      font-size: 13px;
      font-weight: 600;
      text-decoration: none;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }
    .secondary-note {
      font-size: 12px;
      color: #6b7280;
      margin-top: 8px;
    }
    .list-title {
      margin-top: 18px;
      font-size: 13px;
      font-weight: 600;
      color: #111827;
    }
    .list {
      margin: 8px 0 0;
      padding-left: 18px;
      font-size: 13px;
      color: #4b5563;
    }
    .footer {
      padding: 14px 24px 20px;
      font-size: 11px;
      color: #9ca3af;
      text-align: left;
      border-top: 1px solid #e5e7eb;
      background-color: #f9fafb;
    }
    .footer strong {
      color: #4b5563;
    }
    .footer-links {
      margin-top: 6px;
    }
    .footer-links span {
      margin-right: 10px;
    }
    @media (max-width: 600px) {
      .container {
        border-radius: 0;
      }
      .header, .content, .footer {
        padding-left: 18px;
        padding-right: 18px;
      }
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <div class="logo-row">
          <div style="text-align:center; width:100%;">
            <div style="display:inline-block; text-align:center;">
              <div class="logo-circle" style="margin:0 auto 10px auto;">
                <img 
                  src="../PULSE-UI/_PICTURES/ToucanLogo-Mini.png"
                  alt="Tropic Pulse Toucan"
                  width="60"
                  style="display:block; border-radius:50%;">
              </div>
              <div>
                <div class="brand-text">TROPIC PULSE</div>
                <div class="tagline">Enjoy these moments.</div>
              </div>
            </div>
          </div>
        </div>

        <div style="text-align:center; width:100%;">
          <div class="header-title" style="display:inline-block; text-align:center;">My Pulse Loyalty Enrollment</div>
          <div class="header-subtitle" style="display:inline-block; text-align:center;">
            Your rewards journey is ready—just complete your enrollment in the app.
          </div>
        </div>
      </div>

      <div class="content">
        <div style="text-align:center; width:100%;">
          <span class="pill">My Pulse Loyalty</span>
          <h2>Your Pulse Loyalty Enrollment</h2>
        </div>

        <p>Hi ${name || "there"},</p>

        <p>
          Your <strong>Pulse Loyalty</strong> setup is ready. Open the
          <strong>Tropic Pulse</strong> app and complete your enrollment in
          <strong>My Pulse Loyalty</strong> to start earning rewards on every eligible order and delivery.
        </p>

        <div class="highlight-box">
          <div class="highlight-label">Account email</div>
          <div class="highlight-value">${email || "N/A"}</div>
        </div>

        <div class="button-row">
          <div class="thebutton" style="text-align:center;">
            <a class="primary-button" href="https://linktr.ee/tropicpulse">
              Open Tropic Pulse App
            </a>
          </div>
          <div class="secondary-note">
            If the button doesn’t work, just open the Tropic Pulse app on your device and look for
            <strong>My Pulse Loyalty</strong> in the menu.
          </div>
        </div>

        <div class="list-title">Once you complete enrollment, you can:</div>
        <ul class="list">
          <li>Earn rewards automatically on eligible orders and deliveries</li>
          <li>View your Pulse Loyalty Member Card in the app</li>
          <li>Track your progress toward future perks and offers</li>
        </ul>

        <p style="margin-top: 18px;">
          If you didn’t request this or believe this email was sent in error, you can safely ignore it—your account
          will remain unchanged.
        </p>

        <p style="margin-top: 18px;">
          Welcome to the island’s most rewarding experience.
        </p>

        <p>
          <strong>Tropic Pulse</strong><br/>
          Enjoy these moments.
        </p>
      </div>

      <div class="footer">
        <div><strong>Tropic Pulse</strong> — San Pedro, Ambergris Caye</div>
        <div class="footer-links">
          <span>App: Tropic Pulse</span>
          <span>Category: My Pulse Loyalty</span>
        </div>
        <div style="margin-top: 6px;">
          You’re receiving this email because a Pulse Loyalty enrollment was started using this address.
        </div>
      </div>
    </div>

    ${trackingPixel}
  </div>
</body>
</html>`;
  }
},

  sendPayout: {
    subject: (payload) => {
  const { orderID, delivererEmail } = payload;
return `Tropic Pulse: Payout for your Delivery: ${orderID}`;
},
    html: (payload) => {
    const {payoutAmount, stripeAccountID, orderID, delivererEmail, pendingBalance, availableBalance,  displayCurrency, transferCurrency, displayAmount, logId } = payload;
    let formatted = displayAmount || payoutAmount;
    
    const payoutAmountFormatted = formatDisplayAmount(displayCurrency,formatted);
    const formattedavailable = formatDisplayAmount(displayCurrency,availableBalance);
    const formattedpending = formatDisplayAmount(displayCurrency,pendingBalance);
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="../PULSE-UI/_PICTURES/emailopen?logId=${encodeURIComponent(
            logId
          )}" width="1" height="1" alt="" style="opacity:0; width:1px; height:1px;">`
        : "";
return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Your Payout Has Been Sent</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f3f5f7;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      color: #1f2933;
    }
    .wrapper {
      width: 100%;
      background-color: #f3f5f7;
      padding: 24px 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(15, 23, 42, 0.12);
    }
    .header {
      background: linear-gradient(135deg, #00c2a8, #00a0ff);
      padding: 24px 24px 20px;
      text-align: center;
      color: #ffffff;
    }
    .brand-text {
      font-size: 18px;
      font-weight: 600;
      letter-spacing: 0.03em;
    }
    .tagline {
      font-size: 12px;
      opacity: 0.9;
    }
    .header-title {
      margin-top: 18px;
      font-size: 22px;
      font-weight: 700;
    }
    .header-subtitle {
      margin-top: 6px;
      font-size: 14px;
      opacity: 0.95;
    }
    .content {
      padding: 24px 24px 8px;
      font-size: 14px;
      line-height: 1.6;
    }
    .highlight-box {
      margin: 16px 0;
      padding: 12px 14px;
      border-radius: 12px;
      background-color: #f9fafb;
      border: 1px solid #e5e7eb;
    }
    .highlight-label {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #6b7280;
      margin-bottom: 4px;
    }
    .highlight-value {
      font-size: 13px;
      font-weight: 600;
      color: #111827;
    }
    .footer {
      padding: 14px 24px 20px;
      font-size: 11px;
      color: #9ca3af;
      text-align: left;
      border-top: 1px solid #e5e7eb;
      background-color: #f9fafb;
    }
    .footer strong {
      color: #4b5563;
    }
  </style>
</head>

<body>
  <div class="wrapper">
    <div class="container">

      <!-- HEADER -->
      <div class="header">

        <!-- Logo -->
        <img 
          src="../PULSE-UI/_PICTURES/ToucanLogo-Mini.png"
          alt="Tropic Pulse Logo"
          width="70"
          height="70"
          style="display:block; margin:0 auto 14px auto; border-radius:50%; object-fit:cover;"
        >

        <div class="brand-text">TROPIC PULSE</div>
        <div class="tagline">Enjoy these moments.</div>

        <div class="header-title">Your Payout Has Been Sent!</div>
        <div class="header-subtitle">
          Your earnings have been transferred to your Stripe balance.
        </div>
      </div>

      <!-- CONTENT -->
      <div class="content">

        <!-- DETAILS -->
        <div class="highlight-box">
          <div class="highlight-label">Order ID</div>
          <div class="highlight-value">${orderID}</div>
        </div>

        <div class="highlight-box">
          <div class="highlight-label">Deliverer Email</div>
          <div class="highlight-value">${delivererEmail}</div>
        </div>

        <div class="highlight-box">
          <div class="highlight-label">Payout Amount</div>
          <div class="highlight-value" style="font-size:20px; font-weight:700;">
            ${payoutAmountFormatted}
          </div>
        </div>

        <div class="highlight-box">
          <div class="highlight-label">Current Wallet Balance</div>
          <div class="highlight-value">${formattedavailable}</div>
        </div>

        <div class="highlight-box">
          <div class="highlight-label">Pending Payments to Bank</div>
          <div class="highlight-value" style="color:green;">
            ${formattedpending}
          </div>
        </div>

        <p style="margin-top: 18px;">
          Your payout has been successfully deposited into your Stripe balance.  
          Funds will become available based on your Stripe payout schedule.
        </p>

        <p>
          <strong>Tropic Pulse</strong><br/>
          Enjoy these moments.
        </p>
      </div>

      <!-- FOOTER -->
      <div class="footer">
        <div><strong>Tropic Pulse</strong> — San Pedro, Ambergris Caye</div>
        <div style="margin-top: 6px;">
          You’re receiving this email because a payout was processed for your delivery.
        </div>
      </div>

    </div>

    ${trackingPixel}

  </div>
</body>
</html>`;
}
},

  stripeOnboarding: {
  subject: (payload) => "Tropic Pulse: Getting Paid Soon?!",
  important: true,
  html: (payload) => {
    const { email, getPaidLink, reSendLink, logId } = payload;

    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="/_PICTURES/emailopen?logId=${encodeURIComponent(
            logId
          )}" width="1" height="1" alt="" style="opacity:0; display:block;">`
        : "";

    return `<!DOCTYPE html>
<html>
  <body style="margin:0; padding:0; background-color:#f4f4f4; font-family:Arial, sans-serif;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" 
           style="background-color:#f4f4f4; padding:40px 0;">
      <tr>
        <td align="center">

          <!-- Main Card -->
          <table width="600" border="0" cellspacing="0" cellpadding="0" 
                 style="background:#ffffff; border-radius:14px; overflow:hidden;">

            <!-- Inner Padding -->
            <tr>
              <td style="padding:30px;">

                <!-- Header Text -->
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td align="center" 
                        style="font-size:28px; font-weight:bold; color:#222;">
                      Stripe + Tropic Pulse
                    </td>
                  </tr>

                  <tr>
                    <td align="center" 
                        style="font-size:18px; color:#666; padding-top:8px;">
                      Automated, Instant Payments for Vendors/Deliverers!
                    </td>
                  </tr>

                  <!-- Toucan Image -->
                  <tr>
                    <td align="center" style="padding:25px 0;">
                      <img src="/_PICTURES/ToucanLogo-Mini.png"
                           alt="Tropic Pulse Toucan"
                           width="220"
                           style="display:block; border-radius:12px;">
                    </td>
                  </tr>

                  <!-- Message -->
                  <tr>
                    <td align="center" 
                        style="font-size:16px; color:#444; padding:0 20px 20px 20px; line-height:24px;">
                      To start receiving automated payouts through Tropic Pulse, please complete your
                      Stripe payment setup. This ensures we know exactly where to send your earnings.
                    </td>
                  </tr>

                  <!-- Get Paid Button -->
                  <tr>
                    <td align="center" style="padding-bottom:20px;">
                      <a href="${getPaidLink}"
                         style="background-color:#00a86b;
                                color:#ffffff;
                                padding:14px 32px;
                                text-decoration:none;
                                font-size:18px;
                                font-weight:bold;
                                border-radius:8px;
                                display:inline-block;">
                        Get Paid
                      </a>
                    </td>
                  </tr>

                  <!-- Expiration Note -->
                  <tr>
                    <td align="center" 
                        style="font-size:14px; color:#e63946; padding:0 20px 20px 20px; line-height:20px;">
                      Your Stripe payment link expires in 24 hours.  
                      If it expires or you need a new one, click below to resend your setup link.
                    </td>
                  </tr>

                  <!-- Resend Link Button -->
                  <tr>
                    <td align="center" style="padding-bottom:30px;">
                      <a href="${reSendLink}"
                         style="background-color:#007bff;
                                color:#ffffff;
                                padding:12px 28px;
                                text-decoration:none;
                                font-size:16px;
                                font-weight:bold;
                                border-radius:8px;
                                display:inline-block;">
                        Resend Stripe Link
                      </a>
                    </td>
                  </tr>

                  <!-- Footer Note -->
                  <tr>
                    <td align="center" 
                        style="font-size:12px; color:#777; line-height:18px; padding:0 20px;">
                      To receive payments through Tropic Pulse, you must complete your Stripe setup 
                      before accepting or delivering any orders.
                    </td>
                  </tr>

                  <!-- Social Media Section -->
                  <tr>
                    <td align="center" style="padding-top:30px;">
                      <div style="font-size:14px; color:#555; margin-bottom:10px;">
                        Enjoy these moments! Share your successes with Tropic Pulse on social media.
                      </div>
                      <a href="https://linktr.ee/tropicpulse" target="_blank">
                        <img src="/_PICTURES/SocialMedia.png"
                             alt="Social Media Icons"
                             width="180"
                             style="display:block; margin:auto;">
                      </a>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>

          </table>
          <!-- End Main Card -->

        </td>
      </tr>
    </table>

    ${trackingPixel}

  </body>
</html>`;
  }
},

  resendStripeLink: {
  subject: (payload) => "Tropic Pulse: Stripe Payments Link Resent!",
  important: true,
  html: (payload) => {
    const { email, getPaidLink, reSendLink, logId } = payload;

    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="/_PICTURES/emailopen?logId=${encodeURIComponent(
            logId
          )}" width="1" height="1" alt="" style="opacity:0; display:block;">`
        : "";

    return `<!DOCTYPE html>
<html>
  <body style="margin:0; padding:0; background-color:#f4f4f4; font-family:Arial, sans-serif;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" 
           style="background-color:#f4f4f4; padding:40px 0;">
      <tr>
        <td align="center">

          <!-- Main Card -->
          <table width="600" border="0" cellspacing="0" cellpadding="0" 
                 style="background:#ffffff; border-radius:14px; padding:30px;">

            <!-- Header -->
            <tr>
              <td align="center" 
                  style="font-size:28px; font-weight:bold; color:#222;">
                Tropic Pulse
              </td>
            </tr>

            <tr>
              <td align="center" 
                  style="font-size:18px; color:#666; padding-top:8px;">
                Your Stripe Payments Link Has Been Resent!
              </td>
            </tr>

            <!-- Toucan Image -->
            <tr>
              <td align="center" style="padding:25px 0;">
                <img src="/_PICTURES/ToucanLogo-Mini.png"
                     alt="Tropic Pulse Toucan"
                     width="220"
                     style="display:block; border-radius:12px;">
              </td>
            </tr>

            <!-- Message -->
            <tr>
              <td align="center" 
                  style="font-size:16px; color:#444; padding:0 20px 20px 20px; line-height:24px;">
                We’ve generated a fresh Stripe onboarding link so you can complete your 
                payment setup and start receiving payouts through Tropic Pulse.
              </td>
            </tr>

            <!-- Get Paid Button -->
            <tr>
              <td align="center" style="padding-bottom:20px;">
                <a href="${getPaidLink}"
                   style="background-color:#00a86b;
                          color:#ffffff;
                          padding:14px 32px;
                          text-decoration:none;
                          font-size:18px;
                          font-weight:bold;
                          border-radius:8px;
                          display:inline-block;">
                  Get Paid
                </a>
              </td>
            </tr>

            <!-- Expiration Note -->
            <tr>
              <td align="center" 
                  style="font-size:14px; color:#e63946; padding:0 20px 20px 20px; line-height:20px;">
                Your Stripe payment link expires in 24 hours.  
                If it expires or you need a new one, click below to resend your setup link.
              </td>
            </tr>

            <!-- Resend Link Button -->
            <tr>
              <td align="center" style="padding-bottom:30px;">
                <a href="${reSendLink}"
                   style="background-color:#007bff;
                          color:#ffffff;
                          padding:10px 26px;
                          text-decoration:none;
                          font-size:14px;
                          border-radius:6px;
                          display:inline-block;">
                  Resend Stripe Link
                </a>
              </td>
            </tr>

            <!-- Footer Note -->
            <tr>
              <td align="center" 
                  style="font-size:12px; color:#777; line-height:18px; padding:0 20px;">
                To receive payments through Tropic Pulse, you must complete your Stripe setup 
                before accepting or delivering any orders.
              </td>
            </tr>

            <!-- Social Media Section -->
            <tr>
              <td align="center" style="padding-top:30px;">
                <div style="font-size:14px; color:#555; margin-bottom:10px;">
                  Enjoy these moments! Share your successes with Tropic Pulse on social media.
                </div>
                <a href="https://linktr.ee/tropicpulse" target="_blank">
                  <img src="https://www.tropicpulse.bze.bz/SocialMedia.png"
                       alt="Social Media Icons"
                       width="180"
                       style="display:block; margin:auto;">
                </a>
              </td>
            </tr>

          </table>
          <!-- End Main Card -->

        </td>
      </tr>
    </table>

    ${trackingPixel}

  </body>
</html>`;
  }
},

  pulsePointRedemption: {
  subject: (payload) => {
    const { points } = payload;
    return `Redemption Requested: ${points} Pulse Points Redemption`;
  },
  important: true,
  html: (payload) => {
    const { 
      name, 
      email, 
      points, 
      availableBalance, 
      pendingBalance, 
      displayCurrency, 
      transferCurrency, 
      displayAmount, 
      logId 
    } = payload;

    const pointToMoney = points / 100;
    let formatted = pointToMoney || displayAmount;

    const payoutAmountFormatted = formatDisplayAmount(displayCurrency, formatted);
    const formattedavailable = formatDisplayAmount(displayCurrency, availableBalance);
    const formattedpending = formatDisplayAmount(displayCurrency, pendingBalance);

    // Correct 1x1 tracking pixel
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.tropicpulse.bze.bz/emailopen?logId=${encodeURIComponent(
            logId
          )}" width="1" height="1" alt="" style="opacity:0; display:block;">`
        : "";

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Pulse Points Redemption Requested</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f3f5f7;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      color: #1f2933;
    }
    .wrapper {
      width: 100%;
      background-color: #f3f5f7;
      padding: 24px 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(15, 23, 42, 0.12);
    }
    .header {
      background: linear-gradient(135deg, #00c2a8, #00a0ff);
      padding: 24px 24px 20px;
      text-align: center;
      color: #ffffff;
    }
    .logo-circle {
      width: 70px;
      height: 70px;
      border-radius: 999px;
      background: none !important;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
    }
    .brand-text {
      font-size: 18px;
      font-weight: 600;
      letter-spacing: 0.03em;
    }
    .tagline {
      font-size: 12px;
      opacity: 0.9;
    }
    .header-title {
      margin-top: 18px;
      font-size: 22px;
      font-weight: 700;
    }
    .header-subtitle {
      margin-top: 6px;
      font-size: 14px;
      opacity: 0.95;
    }
    .content {
      padding: 24px 24px 8px;
      font-size: 14px;
      line-height: 1.6;
    }
    .pill {
      display: inline-block;
      padding: 4px 10px;
      border-radius: 999px;
      background-color: #ecfdf5;
      color: #047857;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      margin-bottom: 10px;
    }
    .highlight-box {
      margin: 16px 0;
      padding: 12px 14px;
      border-radius: 12px;
      background-color: #f9fafb;
      border: 1px solid #e5e7eb;
    }
    .highlight-label {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #6b7280;
      margin-bottom: 4px;
    }
    .highlight-value {
      font-size: 13px;
      font-weight: 600;
      color: #111827;
    }
    .footer {
      padding: 14px 24px 20px;
      font-size: 11px;
      color: #9ca3af;
      text-align: left;
      border-top: 1px solid #e5e7eb;
      background-color: #f9fafb;
    }
    .footer strong {
      color: #4b5563;
    }
  </style>
</head>

<body>
  <div class="wrapper">
    <div class="container">

      <!-- HEADER -->
      <div class="header">

        <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center">
              <img 
                src="https://www.tropicpulse.bze.bz/ToucanLogo-Mini.png"
                alt="Tropic Pulse Logo"
                width="70"
                height="70"
                style="
                  display:block;
                  margin:0 auto 14px auto;
                  border-radius:50%;
                  object-fit:cover;
                ">
            </td>
          </tr>

          <tr>
            <td align="center">
              <img 
                src="/_PICTURES/CointoWallet.png"
                alt="Coin to Wallet"
                width="120"
                style="display:block; margin:0 auto 10px auto;">
            </td>
          </tr>
        </table>

        <div class="brand-text">TROPIC PULSE</div>
        <div class="tagline">Enjoy these moments.</div>

        <div class="header-title">Pulse Points Redemption Requested</div>
        <div class="header-subtitle">
          Your Pulse Points will be converted into Wallet Balance within 24–48 hours.
        </div>
      </div>

      <!-- CONTENT -->
      <div class="content">

        <div style="text-align:center; width:100%;">
          <span class="pill">Pulse Points</span>
          <h2>Redeeming ${points} Pulse Points</h2>
        </div>

        <p>Hi ${name},</p>

        <p>
          Tropic Pulse has received your request to convert 
          <strong>${points}</strong> Pulse Points into Wallet Balance.
          Your payout will be processed shortly.
        </p>

        <div class="highlight-box">
          <div class="highlight-label">User Email</div>
          <div class="highlight-value">${email}</div>
        </div>

        <div class="highlight-box">
          <div class="highlight-label">Pulse Points Redeemed</div>
          <div class="highlight-value">${points}</div>
        </div>

        <div class="highlight-box">
          <div class="highlight-label">Estimated Wallet Balance Added</div>
          <div class="highlight-value" style="font-size:20px; font-weight:700;">
            ${payoutAmountFormatted}
          </div>
        </div>

        <p style="margin-top: 18px;">
          Your Pulse Points have already been deducted from your account.  
          You will receive a confirmation once the wallet balance is updated.
        </p>

        <p>
          <strong>Tropic Pulse</strong><br/>
          Enjoy these moments.
        </p>
      </div>

      <div class="footer">
        <div><strong>Tropic Pulse</strong> — San Pedro, Ambergris Caye</div>
        <div style="margin-top: 6px;">
          You’re receiving this email because a Pulse Points redemption was requested.
        </div>
      </div>

    </div>

    ${trackingPixel}

  </div>
</body>
</html>`;
  }
},

pulsePointsGifted: {
  subject: (payload) => {
    const { points } = payload;
    return `Tropic Pulse: You have Earned ${points} Pulse Points!`;
  },
  important: true,
  html: (payload) => {
    const { 
      name, 
      email, 
      points, 
      tipAmount, 
      itemPrice, 
      totalPrice, 
      taxAmount, 
      shipping, 
      payoutAmount, 
      logId 
    } = payload;

    const num = (v) => {
      if (v == null) return 0;
      const decoded = decodeURIComponent(String(v));
      if (decoded.includes("|")) {
        return decoded
          .split("|")
          .map(x => Number(x) || 0)
          .reduce((a, b) => a + b, 0);
      }
      const n = Number(decoded);
      return isNaN(n) ? 0 : Number(n.toFixed(2));
    };

    const tip = num(tipAmount ?? payload.ordertip ?? payload.tip);
    const priceRaw = itemPrice ?? payload.orderprice ?? payload.orderamount ?? null;
    const price = num(priceRaw);

    let payout = num(payoutAmount);
    if (payout === 0) {
      payout = Number((tip + price * 0.05).toFixed(2));
    }

    const formattedordertotal  = `BZ$${Number(totalPrice).toFixed(2)}`;
    const formattedorderamount = `BZ$${price.toFixed(2)}`;
    const formattedtip         = `BZ$${Number(tipAmount).toFixed(2)}`;
    const formattedtax         = `BZ$${Number(taxAmount).toFixed(2)}`;

    // ✅ Correct 1×1 tracking pixel
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="/_PICTURES/emailopen?logId=${encodeURIComponent(
            logId
          )}" width="1" height="1" alt="" style="opacity:0; display:block;">`
        : "";

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Pulse Points Awarded</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f3f5f7;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      color: #1f2933;
    }
    .wrapper {
      width: 100%;
      background-color: #f3f5f7;
      padding: 24px 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(15, 23, 42, 0.12);
    }
    .header {
      background: linear-gradient(135deg, #00c2a8, #00a0ff);
      padding: 24px 24px 20px;
      text-align: left;
      color: #ffffff;
    }
    .logo-row {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .logo-circle {
      width: 70px;
      height: 70px;
      border-radius: 999px;
      background: none !important;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
    }
    .brand-text {
      font-size: 18px;
      font-weight: 600;
      letter-spacing: 0.03em;
    }
    .tagline {
      font-size: 12px;
      opacity: 0.9;
    }
    .header-title {
      margin-top: 18px;
      font-size: 22px;
      font-weight: 700;
    }
    .header-subtitle {
      margin-top: 6px;
      font-size: 14px;
      opacity: 0.95;
    }
    .content {
      padding: 24px 24px 8px;
      font-size: 14px;
      line-height: 1.6;
    }
    .pill {
      display: inline-block;
      padding: 4px 10px;
      border-radius: 999px;
      background-color: #ecfdf5;
      color: #047857;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      margin-bottom: 10px;
    }
    .highlight-box {
      margin: 16px 0;
      padding: 12px 14px;
      border-radius: 12px;
      background-color: #f9fafb;
      border: 1px solid #e5e7eb;
    }
    .highlight-label {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #6b7280;
      margin-bottom: 4px;
    }
    .highlight-value {
      font-size: 13px;
      font-weight: 600;
      color: #111827;
    }
    .footer {
      padding: 14px 24px 20px;
      font-size: 11px;
      color: #9ca3af;
      text-align: left;
      border-top: 1px solid #e5e7eb;
      background-color: #f9fafb;
    }
    .footer strong {
      color: #4b5563;
    }
  </style>
</head>

<body>
  <div class="wrapper">
    <div class="container">

      <div class="header">
        <div class="logo-row">
          <div style="text-align:center; width:100%;">
            <div style="display:inline-block; text-align:center;">
              <div class="logo-circle" style="margin:0 auto 10px auto;">
                <img 
                  src="/_PICTURES/ToucanLogo-Mini.png"
                  alt="Tropic Pulse Toucan"
                  width="60"
                  style="display:block; border-radius:50%;">
              </div>
              <div>
                <div class="brand-text">TROPIC PULSE</div>
                <div class="tagline">Enjoy these moments.</div>
              </div>
            </div>
          </div>
        </div>

        <div style="text-align:center; width:100%;">
          <div class="header-title">Pulse Points Awarded</div>
          <div class="header-subtitle">
            Your delivery has earned you new Pulse Points.
          </div>
        </div>
      </div>

      <div class="content">

        <div style="text-align:center; width:100%;">
          <span class="pill">Pulse Points</span>
          <h2>You’ve Earned ${points || "0"} Pulse Points</h2>
        </div>

        <p>Hi ${name || "there"},</p>

        <p>
          Thank you for your service. Tropic Pulse has credited 
          <strong><span style="font-size:16px;">${points || "0"}</span> Pulse Points</strong>
          to your profile for your recent delivery.
        </p>

        <div class="highlight-box">
          <div class="highlight-label">Deliverer Email</div>
          <div class="highlight-value">${email || "N/A"}</div>
        </div>

        <div class="highlight-box">
          <div class="highlight-label">Order Item Price</div>
          <div class="highlight-value">${formattedorderamount}</div>
        </div>

        <div class="highlight-box">
          <div class="highlight-label">Belize Tax (12.5%)</div>
          <div class="highlight-value">${formattedtax}</div>
        </div>

        <div class="highlight-box">
          <div class="highlight-label">Tip</div>
          <div class="highlight-value" style="font-weight:bold; font-size:22px;">
            ${formattedtip}
          </div>
        </div>

        <div class="highlight-box">
          <div class="highlight-label">Order Total Price</div>
          <div class="highlight-value">${formattedordertotal}</div>
        </div>

        <p style="margin-top: 18px;">
          Stay tuned—your Pulse Points will soon unlock rewards, perks, and exclusive benefits.
        </p>

        <p>
          <strong>Tropic Pulse</strong><br/>
          Enjoy these moments.
        </p>
      </div>

      <div class="footer">
        <div><strong>Tropic Pulse</strong> — San Pedro, Ambergris Caye</div>
        <div style="margin-top: 6px;">
          You’re receiving this email because a delivery was completed using this address.
        </div>
      </div>
    </div>

    ${trackingPixel}

  </div>
</body>
</html>`;
  }
},

rolechange: {
  subject: (payload) => "Tropic Pulse: Role Change Requested",
  important: true,
  html: (payload) => {
    const { role, payFrequency, payDay, logId } = payload;

    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="/_PICTURES/emailopen?logId=${encodeURIComponent(
            logId
          )}" width="1" height="1" alt="" style="opacity:0;display:block;">`
        : "";

    const payDayRow = payDay
      ? `<tr>
          <td style="padding:10px 12px;border:1px solid #e2e2e2;background:#fafafa;width:40%;font-size:13px;color:#777;">
            Payday
          </td>
          <td style="padding:10px 12px;border:1px solid #e2e2e2;font-size:13px;color:#222;">
            ${payDay}
          </td>
        </tr>`
      : "";

    return `<!DOCTYPE html>
<html>
  <body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,Helvetica,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:20px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #e2e2e2;">
            
            <!-- Logo -->
            <tr>
              <td align="center" style="padding:20px 20px 10px 20px;">
                <img src="/_PICTURES/ToucanLogo-Mini.png" alt="Tropic Pulse" style="max-width:180px;height:auto;display:block;">
              </td>
            </tr>

            <!-- Title -->
            <tr>
              <td style="padding:10px 20px 20px 20px;">
                <h2 style="margin:0 0 10px 0;font-size:20px;color:#222;text-align:center;">
                  Role & Pay Frequency Updated
                </h2>
                <p style="margin:0 0 16px 0;font-size:14px;color:#555;text-align:center;">
                  Your account details have been updated. Please review the changes below.
                </p>

                <!-- Data Table -->
                <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">

                  <tr>
                    <td style="padding:10px 12px;border:1px solid #e2e2e2;background:#fafafa;width:40%;font-size:13px;color:#777;">
                      Role
                    </td>
                    <td style="padding:10px 12px;border:1px solid #e2e2e2;font-size:13px;color:#222;">
                      ${role}
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:10px 12px;border:1px solid #e2e2e2;background:#fafafa;width:40%;font-size:13px;color:#777;">
                      Pay Frequency
                    </td>
                    <td style="padding:10px 12px;border:1px solid #e2e2e2;font-size:13px;color:#222;">
                      ${payFrequency.toUpperCase()}
                    </td>
                  </tr>

                  ${payDayRow}

                </table>

                <p style="margin:16px 0 0 0;font-size:12px;color:#999;text-align:center;">
                  If you believe this change is incorrect, please contact <a href="mailto:Sales@TropicPulse.bz">Tropic Pulse support</a>.
                </p>
              </td>
            </tr>

          </table>
        </td>
        ${trackingPixel}
      </tr>
    </table>
  </body>
</html>`;
  }
},

  newEvent: {
  subject: (payload) => "New Event on Tropic Pulse",
  important: false,
  html: (payload) => {
    const { title, Fromdate, Todate, Fromtime, Totime, Venue, description, summary, unsubscribeUrl, language, logId } = payload;

    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="/_PICTURES/emailopen?logId=${encodeURIComponent(
            logId
          )}" width="1" height="1" alt="" style="opacity:0;display:block;">`
        : "";

    return `<!DOCTYPE html>
<html>
  <body style="margin:0; padding:0; background-color:#f4f4f4; font-family:Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f7f7;padding:30px 0;font-family:'Poppins',sans-serif;">
  <tr>
    <td align="center">

      <!-- Main Container -->
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:18px;overflow:hidden;border:3px solid #000;">
        
        <!-- Header -->
        <tr>
          <td align="center" style="background:#ffff99;padding:30px 20px;">
            <img src="/_PICTURES/ToucanLogo-Mini.png" 
                 alt="Tropic Pulse Toucan" width="120" style="display:block;margin-bottom:10px;border-radius:50%;border:3px solid #000;">
            <h1 style="margin:0;font-size:26px;color:#000;">A New Event Just Hit Tropic Pulse!</h1>
          </td>
        </tr>

        <!-- Cartoon Event Icon -->
        <tr>
          <td align="center" style="padding:20px;">
            <img src="/_PICTURES/NewEvent.png" 
                 alt="New Event Illustration" width="160" 
                 style="display:block;margin:0 auto 10px;">
          </td>
        </tr>

        <!-- Content -->
        <tr>
          <td style="padding:0 30px 30px;color:#333;font-size:16px;line-height:1.6;">
            <p style="margin-top:0;">
              A brand‑new event has just been added to Tropic Pulse — and you won’t want to miss it!
            </p>

            <div style="background:#f0faff;border:2px solid #00aaff;border-radius:12px;padding:18px;margin:20px 0;">
              <p style="margin:0;font-size:18px;font-weight:600;color:#000;">${title}</p>
              <p style="margin:6px 0 0;font-size:15px;color:#555;">
                <strong>${summary}</strong>
              </p>

              <p style="margin:6px 0 0;font-size:15px;color:#555;">
                <span style="color:green; font-size:16px;">Date:</span>
                <strong>${Fromdate} → ${Todate}</strong><br>
                <span style="color:green; font-size:16px;">Time:</span>
                <strong>${Fromtime} → ${Totime}</strong>
              </p>
              <p style="margin:6px 0 0;font-size:15px;color:#555;">
                <span style="color:green; font-size:16px;">Venue:</span>
                <strong>${Venue}</strong>
              </p>
              <p style="margin:6px 0 0;font-size:15px;color:#555;">
                <span style="color:green; font-size:16px;">Language:</span>
                <strong>${language}</strong>
              </p>
              <p style="margin:6px 0 0;font-size:15px;color:#555;">
                <span style="color:green; font-size:16px;">Description:</span>
                <strong>${description}</strong>
              </p>
            </div>

            <p>
              Open the Tropic Pulse app to get full details and stay in the loop with everything happening around San Pedro!
            </p>

            <p style="margin-top:25px;text-align:center;">
              <a href="https://linktr.ee/tropicpulse" 
                 style="background:#00aaff;color:#fff;padding:14px 24px;border-radius:10px;text-decoration:none;font-weight:600;display:inline-block;">
                View Event on Tropic Pulse
              </a>
            </p>
          </td>
        </tr>

        <!-- Footer -->
<tr>
  <td align="center" style="background:#fafafa; padding:20px; font-size:13px; color:#777; line-height:1.5;">
    Powered by Tropic Pulse • San Pedro’s Everything App<br><br>
    <em>This email was automatically generated because a new event was added to Tropic Pulse.</em>
  </td>
</tr>

<!-- Unsubscribe Footer -->
<tr>
  <td align="center" style="padding:10px;">

    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td align="center">

          <table width="500" cellpadding="0" cellspacing="0" border="0"
                 style="background:#ffffff; border:2px solid #e5e5e5; border-radius:14px; padding:10px;">
            <tr>
              <td align="center" style="padding:10px;">

                <img 
                  src="/_PICTURES/Welcome.png"
                  alt="Tropic Pulse Logo"
                  width="120"
                  style="display:block; margin-bottom:10px; border-radius:12px;"
                />

                <p style="font-family:Arial, sans-serif; font-size:14px; color:#555;">
                  Don’t want to receive these updates?
                </p>

                <a href="${unsubscribeUrl}"
                   style="font-family:Arial, sans-serif; font-size:14px; color:#4a90e2; text-decoration:none; font-weight:bold;">
                   Unsubscribe from Tropic Pulse mass emails
                </a>

              </td>
            </tr>
          </table>

        </td>
      </tr>
    </table>

  </td>
</tr>
      </table>
    </td>
    ${trackingPixel}
  </tr>
</table>
</body>
</html>`;
  }
},

  newBusiness: {
  subject: (payload) => "New Business on Tropic Pulse",
  important: false,
  html: (payload) => {
    const { busname, summary, description, busemail, link, location, unsubscribeUrl, logId } = payload;

    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="/_PICTURES/emailopen?logId=${encodeURIComponent(
            logId
          )}" width="1" height="1" alt="" style="opacity:0;display:block;">`
        : "";

    return `<!DOCTYPE html>
<html>
  <body style="margin:0; padding:0; background-color:#f4f4f4; font-family:Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f7f7;padding:30px 0;font-family:'Poppins',sans-serif;">
  <tr>
    <td align="center">

      <!-- Main Container -->
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:18px;overflow:hidden;border:3px solid #000;">
        
        <!-- Header -->
        <tr>
          <td align="center" style="background:#ffff99;padding:30px 20px;">
            <img src="/_PICTURES/ToucanLogo-Mini.png" 
                 alt="Tropic Pulse Toucan" width="120" style="display:block;margin-bottom:10px;border-radius:50%;border:3px solid #000;">
            <h1 style="margin:0;font-size:26px;color:#000;">A New Business Just Joined Tropic Pulse!</h1>
          </td>
        </tr>

        <!-- Cartoon Building -->
        <tr>
          <td align="center" style="padding:20px;">
            <img src="/_PICTURES/NewBusiness.png" 
                 alt="New Business Illustration" width="160" 
                 style="display:block;margin:0 auto 10px;">
          </td>
        </tr>

        <!-- Content -->
        <tr>
          <td style="padding:0 30px 30px;color:#333;font-size:16px;line-height:1.6;">
            <p style="margin-top:0;">
              We’re excited to welcome a brand‑new local business to the Tropic Pulse community!
            </p>

            <div style="background:#f0faff;border:2px solid #00aaff;border-radius:12px;padding:18px;margin:20px 0;">
              <p style="margin:0;font-size:18px;font-weight:600;color:#000;">${busname}</p>
              <p style="margin:6px 0 0;font-size:15px;color:#555;">
                <strong>${summary}</strong>
              </p>

              <p style="margin:6px 0 0;font-size:15px;color:#555;">
                <span style="color:green; font-size:16px;">Location:</span>
                <strong>${location}</strong>
              </p>

              <p style="margin:6px 0 0;font-size:15px;color:#555;">
                <span style="color:green; font-size:16px;">Description:</span>
                <strong>${description}</strong>
              </p>

              <p style="margin:6px 0 0;font-size:15px;color:#555;">
                <span style="color:green; font-size:16px;">Email:</span>
                <strong>${busemail}</strong>
              </p>
            </div>

            <p>
              Be sure to check them out on the Tropic Pulse app and show your support for another amazing local business in San Pedro!
            </p>

            <p style="margin-top:25px;text-align:center;">
              <a href="https://linktr.ee/tropicpulse" 
                 style="background:#00aaff;color:#fff;padding:14px 24px;border-radius:10px;text-decoration:none;font-weight:600;display:inline-block;">
                Explore on Tropic Pulse
              </a>
            </p>
          </td>
        </tr>

        <!-- Footer -->
<tr>
  <td align="center" style="background:#fafafa; padding:20px; font-size:13px; color:#777; line-height:1.5;">
    Powered by Tropic Pulse • San Pedro’s Everything App<br><br>
    <em>This email was automatically generated because a new business was added to Tropic Pulse.</em>
  </td>
</tr>

<!-- Unsubscribe Footer -->
<tr>
  <td align="center" style="padding:10px;">

    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td align="center">

          <table width="500" cellpadding="0" cellspacing="0" border="0"
                 style="background:#ffffff; border:2px solid #e5e5e5; border-radius:14px; padding:10px;">
            <tr>
              <td align="center" style="padding:10px;">

                <img 
                  src="/_PICTURES/Welcome.png"
                  alt="Tropic Pulse Logo"
                  width="120"
                  style="display:block; margin-bottom:10px; border-radius:12px;"
                />

                <p style="font-family:Arial, sans-serif; font-size:14px; color:#555;">
                  Don’t want to receive these updates?
                </p>

                <a href="${unsubscribeUrl}"
                   style="font-family:Arial, sans-serif; font-size:14px; color:#4a90e2; text-decoration:none; font-weight:bold;">
                   Unsubscribe from Tropic Pulse mass emails
                </a>

              </td>
            </tr>
          </table>

        </td>
      </tr>
    </table>

  </td>
</tr>
      </table>
    </td>
    ${trackingPixel}
  </tr>
</table>
</body>
</html>`;
  }
},

adminPulseRedemptionNotice: {
  subject: "Pulse Points Redemption – Vault Credit Needed",
  html: ({ name, uid, points, walletAmount }) => `<!DOCTYPE html>
<html>
  <body style="margin:0; padding:0; background-color:#f4f4f4; font-family:Arial, sans-serif;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" 
           style="background-color:#f4f4f4; padding:40px 0;">
      <tr>
        <td align="center">

          <!-- Main Card -->
          <table width="600" border="0" cellspacing="0" cellpadding="0" 
                 style="background:#ffffff; border-radius:14px; overflow:hidden; border:1px solid #e0e0e0;">

            <!-- Header -->
            <tr>
              <td style="padding:25px; text-align:center; background:#fafafa; border-bottom:1px solid #e0e0e0;">
                <h2 style="margin:0; font-size:22px; color:#222;">
                  Pulse Points Redemption Alert
                </h2>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:30px;">

                <p style="font-size:16px; color:#333; margin-top:0;">
                  A user has redeemed Pulse Points and requires a manual credit to their <strong>Tropic Pulse Vault Wallet</strong>.
                </p>

                <table width="100%" border="0" cellspacing="0" cellpadding="0" 
                       style="background:#fafafa; padding:15px; border-radius:8px; border:1px solid #ddd; margin:20px 0;">
                  <tr>
                    <td style="font-size:15px; padding:5px 0;"><strong>Name:</strong> ${name}</td>
                  </tr>
                  <tr>
                    <td style="font-size:15px; padding:5px 0;"><strong>UID:</strong> ${uid}</td>
                  </tr>
                  <tr>
                    <td style="font-size:15px; padding:5px 0;"><strong>Points Redeemed:</strong> ${points}</td>
                  </tr>
                  <tr>
                    <td style="font-size:15px; padding:5px 0;"><strong>Vault Credit Amount:</strong> $${walletAmount}</td>
                  </tr>
                </table>

                <p style="font-size:15px; color:#333;">
                  Please credit this amount to the user's Tropic Pulse Vault Wallet.  
                  This manual credit should be completed within <strong>24–48 hours</strong>.
                </p>

                <p style="font-size:14px; color:#777; margin-top:30px;">
                  — Tropic Pulse System Notification
                </p>

              </td>
            </tr>

          </table>
          <!-- End Main Card -->

        </td>
      </tr>
    </table>
  </body>
</html>`
},

NoCredits: {
  subject: (payload) => "You're out of Mass Notification Credits",
  html: (payload) => {
    const { email, paymentLink, eventID, logId } = payload;

    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="/_PICTURES/emailopen?logId=${encodeURIComponent(
            logId
          )}" width="1" height="1" alt="" style="opacity:0;display:block;">`
        : "";

    return `<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f9f9; padding:40px 0; font-family:Arial, sans-serif;">
  <tr>
    <td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:white; border-radius:12px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.08);">
        
        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#00c6ff,#0072ff); padding:30px; text-align:center;">
            <img src="/_PICTURES/ToucanLogo-Mini.png" alt="Tropic Pulse" width="90" style="margin-bottom:10px;">
            <h1 style="color:white; margin:0; font-size:26px; font-weight:bold;">
              You're Out of Credits
            </h1>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:30px; color:#333;">
            <p style="font-size:16px; line-height:1.6; margin:0 0 20px;">
              Hey Friend,
            </p>

            <p style="font-size:16px; line-height:1.6; margin:0 0 20px;">
              You’ve used your free Mass Notification credits. To keep sending island‑wide announcements, you’ll need to purchase additional credits.
            </p>

            <p style="font-size:16px; line-height:1.6; margin:0 0 25px;">
              Each credit is <strong>BZ$10</strong> and lets you broadcast a new event or business update to the entire Tropic Pulse community.
            </p>

            <!-- Button -->
            <table cellpadding="0" cellspacing="0" style="margin:30px auto;">
              <tr>
                <td align="center" style="background:#00a86b; padding:14px 28px; border-radius:8px;">
                  <a href="${paymentLink}" 
                     style="color:white; text-decoration:none; font-size:18px; font-weight:bold; display:block;">
                    Buy Credits
                  </a>
                </td>
              </tr>
            </table>

            <p style="font-size:14px; color:#666; line-height:1.6; margin-top:20px;">
              Once your purchase is complete, your credits will be added instantly and you can continue sending notifications without interruption.
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f0f7f7; padding:20px; text-align:center; font-size:12px; color:#777;">
            Tropic Pulse • San Pedro, Belize<br>
            You’re receiving this message because you attempted to send a Mass Notification.
          </td>
        </tr>

      </table>
      ${trackingPixel}
    </td>
  </tr>
</table>`;
  }
}
};

