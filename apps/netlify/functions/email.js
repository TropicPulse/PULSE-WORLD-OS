// FILE: tropic-pulse-functions/netlify/functions/email.js
//
// INTENT-CHECK: If you paste this while confused or frustrated, gently re-read your INTENT; if I am unsure of intent, I will ask you for the full INTENT paragraph.
// 📘 PAGE INDEX — Source of Truth for This File
//
// This PAGE INDEX defines the identity, purpose, boundaries, and allowed
// behavior of this file. It is the compressed representation of the entire
// page. Keep this updated as functions, responsibilities, and logic evolve.
//
// If AI becomes uncertain or drifts, request: "Rules Design (Trust/Data)"
//
// CONTENTS TO MAINTAIN:
//   • What this file IS
//   • What this file IS NOT
//   • Its responsibilities
//   • Its exported functions
//   • Its internal logic summary
//   • Allowed imports
//   • Forbidden imports
//   • Deployment rules
//   • Safety constraints
//
// The PAGE INDEX + SUB‑COMMENTS allow full reconstruction of the file
// without needing to paste the entire codebase. Keep summaries accurate.
// The comments are the source of truth — if code and comments disagree,
// the comments win.
//
// ROLE:
//   Core email engine for Tropic Pulse.
//   Provides two major capabilities:
//     1. sendEmailToUser — template‑based transactional emails
//     2. sendPinEmail — verification PIN emails
//   This file is LOGIC‑ONLY — it must NOT contain Netlify handlers.
//   Safe to import from any Netlify function or logic module.
//
// DEPLOYMENT:
//   PRIMARY HOST: Netlify (all backend execution runs here)
//   BACKUP HOSTS: Cloudflare + Firebase Hosting (static/CDN only)
//   Firebase Functions = deprecated — do NOT add new Firebase Functions code
//
// SYNTAX RULES:
//   ESM JavaScript ONLY — no TypeScript, no CommonJS, no require()
//   ALWAYS use named exports (`export const` or `export function`)
//   NEVER use default exports
//
// IMPORT RULES:
//   Only import modules that ALREADY exist in the repo
//   email-templates.js MUST be created and must export `emailTemplates`
//   config.js MUST export `db` and `EMAIL_PASSWORD`
//   Do NOT assume new files or dependencies unless Aldwyn explicitly approves
//
// STRUCTURE:
//   Lives in /netlify/functions (flat) unless Aldwyn creates subfolders
//   This file is a pure logic module — no handlers, no routing
//
// DEPENDENCY RULES:
//   This file may be imported by ANY Netlify function or logic module
//   Must remain deterministic and side‑effect‑free
//   Nodemailer usage is approved for SMTP email sending
//
// SAFETY NOTES:
//   No external API calls except SMTP (explicitly approved)
//   Email logs MUST be written to Firestore EmailLogs collection
//   Respect user opt‑out and cooldown rules
//   This module is critical — changes ripple across the entire system

import admin from "firebase-admin";
import nodemailer from "nodemailer";
import { emailTemplates } from "./email-templates.js";   // you will create this file
import { db, EMAIL_PASSWORD } from "./config.js";        // your existing config exports

/* ----------------------------------------------------
   EMAIL: sendEmailToUser (template-based)
---------------------------------------------------- */
export async function sendEmailToUser(email, emailType, payload = {}) {
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

    // Opt-out
    if (user.TPNotifications?.receiveMassEmails === false) {
      return { success: false, error: "User opted out" };
    }

    // Cooldown
    const lastSent = user.TPNotifications?.lastEmailSentAt?.toMillis?.() || 0;
    const nowMs = admin.firestore.Timestamp.now().toMillis();

    if (nowMs - lastSent < 60000) {
      return { success: true, skipped: true };
    }

    // Build payload
    const name =
      clean(user.TPIdentity?.displayName) ||
      clean(user.TPIdentity?.name) ||
      "Friend";

    const resendToken = clean(user.TPIdentity?.resendToken);

    const unsubscribeUrl = resendToken
      ? `https://tropicpulse.bz/unsubscribe?token=${encodeURIComponent(resendToken)}`
      : `https://tropicpulse.bz/unsubscribe`;

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
        pass: EMAIL_PASSWORD.value()
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

    // Update user
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

/* ----------------------------------------------------
   EMAIL: sendPinEmail (PIN verification)
---------------------------------------------------- */
export async function sendPinEmail(email, pin, payload, emailPassword) {
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
          <img src="https://tropicpulse.bz/ToucanLogo-Mini.png?v8"
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
          <img src="https://tropicpulse.bz/ToucanThumbsUp.png?v8"
               alt="Toucan"
               style="width:110px;">
        </div>

        <p style="font-size:13px; color:#999; text-align:center; margin-top:10px;">
          © Tropic Pulse — San Pedro, Belize
        </p>

      </div>
    </div>`;

    // Send email
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

    // Log email
    const ts = admin.firestore.FieldValue.serverTimestamp();

    payload.adminUser = "Automate";
    payload.createdAt = ts;
    payload.purpose = purpose;
    payload.expiresAt = payload.expiresAt || null;
    payload.pinMasked = `***${pin.slice(-2)}`;

    const ref = await db.collection("EmailLogs").add({
      date: ts,
      to: email,
      type: "sendPinEmail",
      emailType: purpose === "emailChange" ? "emailChangePin" : "sendPinEmail",
      payload,
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

    return { success: true };

  } catch (err) {
    console.error("sendPinEmail error:", err);
    return { success: false, error: err.message };
  }
}