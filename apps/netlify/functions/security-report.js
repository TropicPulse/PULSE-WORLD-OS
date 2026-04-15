// FILE: tropic-pulse-functions/functions/security-report.js
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
//   Legacy Firebase HTTPS endpoint that logs suspicious or malicious client
//   activity. Captures forensic metadata including:
//     • reason for report
//     • identity + token snapshots
//     • device + browser fingerprint
//     • client + server timestamps
//     • IP address
//     • referrer + URL context
//
//   Writes logs to:
//     • CHANGES collection (global security log)
//     • IdentityHistory/{uid}/danger (per‑user security log)
//
//   This file IS a Firebase handler (legacy).
//   This file SHOULD NOT be expanded — all new security endpoints must be
//   implemented in Netlify.
//
// WHAT THIS FILE IS NOT:
//   • Not a Netlify function
//   • Not a scoring engine
//   • Not a business logic module
//   • Not allowed to mutate user identity documents
//
// DEPLOYMENT:
//   Runs ONLY on Firebase Functions (legacy).
//   Must remain stable until fully migrated to Netlify.
//   No new Firebase Functions should be added.
//
// SYNTAX RULES:
//   ESM JavaScript ONLY — no TypeScript, no CommonJS, no require().
//   Named exports ONLY — no default exports.
//
// IMPORT RULES:
//   Allowed:
//     • onRequest from firebase-functions/v2/https
//     • Firebase Admin SDK
//
//   Forbidden:
//     • Stripe
//     • Twilio
//     • Netlify‑specific modules
//     • Any new dependencies not explicitly approved
//
// SAFETY NOTES:
//   • Never mutate user identity documents.
//   • Never expose forensic metadata to clients.
//   • Always validate "reason" field.
//   • IP extraction must remain defensive.
//   • This endpoint is security‑critical — changes ripple across the
//     entire identity + fraud detection system.

import { onRequest } from "firebase-functions/v2/https";
import admin from "firebase-admin";

if (!admin.apps.length) admin.initializeApp();
const db = admin.firestore();

export const reportSuspiciousClient = onRequest(
  { cors: true, maxInstances: 10 },
  async (req, res) => {
    try {
      const {
        reason,
        identitySnapshot,
        tokenSnapshot,
        userAgent,
        ts,
        language,
        platform,
        deviceMemory,
        hardwareConcurrency,
        screenWidth,
        screenHeight,
        referrer,
        url
      } = req.body || {};

      if (!reason) {
        return res.status(400).json({
          success: false,
          error: "Missing reason"
        });
      }

      const ip =
        req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
        req.ip ||
        "unknown";

      const uid =
        identitySnapshot && identitySnapshot.uid
          ? identitySnapshot.uid
          : null;

      const payload = {
        reason,
        uid,
        identitySnapshot: identitySnapshot || null,
        tokenSnapshot: tokenSnapshot || null,
        userAgent: userAgent || null,
        clientTimestamp: ts || null,
        serverTimestamp: admin.firestore.FieldValue.serverTimestamp(),
        language: language || null,
        platform: platform || null,
        deviceMemory: deviceMemory || null,
        hardwareConcurrency: hardwareConcurrency || null,
        screenWidth: screenWidth || null,
        screenHeight: screenHeight || null,
        referrer: referrer || null,
        url: url || null,
        ip,
        source: "reportDanger",
        actor: "client"
      };

      await db.collection("CHANGES").add({
        type: "suspiciousClient",
        ...payload
      });

      if (uid) {
        await db
          .collection("IdentityHistory")
          .doc(uid)
          .collection("danger")
          .add(payload);
      }

      return res.json({ success: true });

    } catch (err) {
      console.error("reportSuspiciousClient error", err);
      return res.status(500).json({
        success: false,
        error: "Internal error"
      });
    }
  }
);