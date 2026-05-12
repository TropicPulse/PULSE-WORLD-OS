/* global log, warn, error */
// ============================================================================
// FILE: PULSE-WORLD/PULSE-BAND/PULSE-X/PulseWorldSystemAlert-v20.js
// ORGAN: PulseWorldSystemAlert-v20 (System Failure Alert Organ)
// LAYER: PULSE-WORLD / SYSTEM-MONITORING / IMMORTAL-V20
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
// PAGE INDEX — SOURCE OF TRUTH FOR THIS FILE
// ============================================================================
//
// WHAT THIS FILE **IS**
// ----------------------
// • A backend **system failure alert endpoint**
// • A **system‑level monitoring organ** for PulseWorld subsystems (Earn, Vault, Bank, etc.)
// • A **Netlify/Cloud backend HTTP handler**
// • A **structured failure‑intake endpoint**
// • A **safe, deterministic, zero‑leak logging surface**
//
// WHAT THIS FILE **IS NOT**
// -------------------------
// • Not a UI helper
// • Not a frontend endpoint
// • Not a business logic engine
// • Not a compute engine
// • Not a router for other systems
// • Not allowed to expose internal stack traces
//
// RESPONSIBILITIES
// ----------------
// • Accept POST requests from any PulseWorld subsystem (EarnEngine, Vault, Bank, SMS, etc.)
// • Validate payload shape (at least a `source` or `reason` field)
// • Redact sensitive fields before logging
// • Log failure to server logs (safe redaction)
// • Optionally: forward to DB logging module
// • Optionally: forward to email/SMS/Slack alert modules
// • Return deterministic JSON response
//
// INTERNAL LOGIC SUMMARY
// ----------------------
// • Validate HTTP method
// • Parse JSON body
// • Redact sensitive fields
// • Log failure (safe)
// • Return { success: true, received: true }
// • On error → return structured JSON error (no stack trace)
//
// ALLOWED IMPORTS
// ---------------
// • admin, db from PulseWorldGenome-v20
// • Shared logging modules (PulseProofLogger, PulseWorldEmailAlert, etc.)
// • Shared system logging modules (if created later)
//
// FORBIDDEN IMPORTS
// -----------------
// • window.*, document.*, DOM APIs
// • UI modules
// • Any new dependency without INTENT update
//
// DEPLOYMENT RULES
// ----------------
// • Runs ONLY on backend (Netlify or Cloud Run)
// • Must remain ESM
// • Must remain deterministic
// • Must not leak secrets
//
// SAFETY CONSTRAINTS
// ------------------
// • Never expose stack traces
// • Never expose internal system state
// • Never throw — always return structured JSON
// • Payloads may contain sensitive failure data — handle carefully
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

import { onRequest, onCall } from "firebase-functions/v2/https";

// ============================================================================
// IMPORTS
// ============================================================================

import { admin, db } from "./PulseWorldGenome-v20.js";
// Future optional imports:
// import { sendSystemFailureEmail } from "./PulseWorldEmailAlert-v20.js";
// import { logSystemFailureToDB } from "./PulseWorldDBLogger-v20.js";

// ============================================================================
// HELPER: redact sensitive fields
// ============================================================================

function redactPayload(payload) {
  if (!payload || typeof payload !== "object") return {};

  const clone = { ...payload };

  const sensitive = [
    "jwt",
    "token",
    "auth",
    "secret",
    "headers",
    "stack",
    "password",
    "apiKey",
    "stripeSecret",
    "twilioAuthToken"
  ];

  for (const key of sensitive) {
    if (clone[key] !== undefined) {
      clone[key] = "[REDACTED]";
    }
  }

  return clone;
}

// ============================================================================
// MAIN HANDLER — System Failure Intake
// ============================================================================
//
// This endpoint receives failure alerts from ANY PulseWorld subsystem:
//   • EarnEngine
//   • PulseWorldBank (Stripe)
//   • Vault / Loyalty
//   • SMS / Email organs
//   • Future subsystems
//
// It must remain:
//   • deterministic
//   • safe
//   • non‑throwing
//   • JSON‑returning
//
// ============================================================================

export async function handler(event, context) {
  try {
    // ---------------------------------------------------------
    // METHOD VALIDATION
    // ---------------------------------------------------------
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: "Method Not Allowed"
      };
    }

    // ---------------------------------------------------------
    // PARSE PAYLOAD
    // ---------------------------------------------------------
    let payload = {};
    try {
      payload = JSON.parse(event.body || "{}");
    } catch {
      payload = { parseError: true };
    }

    const safePayload = redactPayload(payload);

    const source = safePayload.source || "unknown";
    const reason = safePayload.reason || safePayload.message || "unspecified";

    // ---------------------------------------------------------
    // LOG FAILURE (safe)
// ---------------------------------------------------------
    error("⚠️ SYSTEM FAILURE DETECTED:", {
      source,
      reason,
      payload: safePayload
    });

    // ---------------------------------------------------------
    // OPTIONAL: DB LOGGING (future)
// ---------------------------------------------------------
    // await logSystemFailureToDB({ source, reason, payload: safePayload });

    // ---------------------------------------------------------
    // OPTIONAL: EMAIL/SMS/SLACK ALERTS (future)
// ---------------------------------------------------------
    // await sendSystemFailureEmail({ source, reason, payload: safePayload });

    // ---------------------------------------------------------
    // RESPONSE
    // ---------------------------------------------------------
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        received: true
      })
    };

  } catch (err) {
    // ---------------------------------------------------------
    // SAFE ERROR RESPONSE
    // ---------------------------------------------------------
    error("SystemAlert handler error:", err?.message || "unknown");

    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: "Internal Server Error"
      })
    };
  }
}

// ============================================================================
// LAYER CONSTANTS + DIAGNOSTICS
// ============================================================================

const LAYER_ID = "IMMUNE-LAYER";
const LAYER_NAME = "IMMUNE SENTINEL";
const LAYER_ROLE = "FORENSIC ANTIGEN CAPTURE";

const REPORTER_DIAGNOSTICS_ENABLED =
  process.env.PULSE_REPORTER_DIAGNOSTICS === "true" ||
  process.env.PULSE_DIAGNOSTICS === "true";

const logReporter = (stage, details = {}) => {
  if (!REPORTER_DIAGNOSTICS_ENABLED) return;

  log(
    JSON.stringify({
      pulseLayer: LAYER_ID,
      pulseName: LAYER_NAME,
      pulseRole: LAYER_ROLE,
      stage,
      ...details
    })
  );
};

// ============================================================================
// BACKEND ENTRY POINT — “IMMUNE SENTINEL CAPTURE”
// ============================================================================
//
// This is a **secondary** entry point for suspicious client reports
// (e.g., reportDanger from frontend). It writes to CHANGES + IdentityHistory.
//
// ============================================================================

export const reportSuspiciousClient = onRequest(
  { cors: true, maxInstances: 10 },
  async (req, res) => {
    logReporter("INTAKE_START", {
      hasBody: !!req?.body,
      ipHeader: req.headers["x-forwarded-for"]
    });

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
        logReporter("MISSING_REASON", {});
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

      logReporter("FORENSIC_PAYLOAD_BUILT", {
        uid,
        reason,
        hasIdentitySnapshot: !!identitySnapshot,
        hasTokenSnapshot: !!tokenSnapshot
      });

      await db.collection("CHANGES").add({
        type: "suspiciousClient",
        ...payload
      });

      logReporter("GLOBAL_LOG_WRITTEN", { uid });

      if (uid) {
        await db
          .collection("IdentityHistory")
          .doc(uid)
          .collection("danger")
          .add(payload);

        logReporter("USER_LOG_WRITTEN", { uid });
      }

      logReporter("INTAKE_COMPLETE", { uid });

      return res.json({ success: true });

    } catch (err) {
      error("reportSuspiciousClient error", err);

      logReporter("FATAL_ERROR", {
        message: err?.message || "Unknown error"
      });

      return res.status(500).json({
        success: false,
        error: "Internal error"
      });
    }
  }
);
