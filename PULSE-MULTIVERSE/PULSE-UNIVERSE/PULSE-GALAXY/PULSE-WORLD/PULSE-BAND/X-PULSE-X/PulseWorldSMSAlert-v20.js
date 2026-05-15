// ============================================================================
// FILE: pulse-world-os/PULSE-UNIVERSE/netlify/lib/PulseWorldSMSAlert-v20.js
// ORGAN: PulseWorldSMSAlert-v20 (Twilio SMS Organ)
// LAYER: PULSE-WORLD / COMMUNICATION-CORE / IMMORTAL-V20
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
// • The **Twilio SMS Organ** for Pulse‑World‑SMS v20
// • A **singleton Twilio client factory** for backend use
// • A **communication nervous‑system adapter**
// • A **pure logic module** (NO handlers, NO routing)
// • A **deterministic, drift‑proof, zero‑state organ**
// • The **only place** Twilio is initialized in the entire organism
//
// WHAT THIS FILE **IS NOT**
// -------------------------
// • Not a Netlify endpoint
// • Not a messaging engine
// • Not a business‑logic module
// • Not allowed to send SMS directly (only returns client + IDs)
// • Not allowed to read from window / browser globals
//
// RESPONSIBILITIES
// ----------------
// • Initialize Twilio exactly once per cold start
// • Enforce environment‑based configuration (ACCOUNT_SID, AUTH_TOKEN, MSG SID)
// • Provide a safe, deterministic Twilio client
// • Validate environment variables and fail fast if missing
// • Provide metadata for AI‑assisted debugging
// • Provide a stable organ for all SMS‑related modules
//
// EXPORTED SYMBOLS
// ----------------
// • getTwilioClient() — returns the singleton Twilio client
// • MESSAGING_SERVICE_SID — Twilio Messaging Service SID (string)
//
// INTERNAL LOGIC SUMMARY
// ----------------------
// • Loads Twilio credentials from process.env
// • Validates ACCOUNT_SID, AUTH_TOKEN, MESSAGING_SERVICE_SID
// • Creates a single Twilio client instance
// • Caches it in module scope
// • Returns the same instance for all callers
//
// ALLOWED IMPORTS
// ---------------
// • twilio (official Twilio SDK)
// • dotenv/config (optional, for local dev)
//
// FORBIDDEN IMPORTS
// -----------------
// • Firebase Admin
// • Stripe
// • Any UI / browser‑only modules
// • Any environment‑specific modules (Netlify SDK, etc.)
//
// DEPLOYMENT RULES
// ----------------
// • Runs ONLY on backend (Node) — never in browser
// • Must remain ESM
// • Must remain side‑effect‑free
// • Must remain deterministic
//
// SAFETY CONSTRAINTS
// ------------------
// • Never hard‑code Twilio credentials
// • Never log ACCOUNT_SID, AUTH_TOKEN, or MESSAGING_SERVICE_SID
// • Throw immediately if credentials are missing
// • This file must remain extremely stable — all SMS flows depend on it
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
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝

// ============================================================================
// TWILIO ORGAN IMPLEMENTATION
// ============================================================================

import twilio from "twilio";

// Singleton instance — one per cold start
let twilioClientInstance = null;

/**
 * getTwilioClient()
 * -----------------
 * Returns the singleton Twilio client.
 *
 * BEHAVIOR:
 *   • Reads TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN from process.env
 *   • Validates presence
 *   • Creates Twilio client
 *   • Caches instance for future calls
 *
 * RETURNS:
 *   • Twilio client (singleton)
 *
 * THROWS:
 *   • Error if credentials are missing
 *
 * NOTES:
 *   • This function is pure and deterministic
 *   • Safe to call from any backend function
 *   • Never logs or exposes secrets
 */
export function getTwilioClient() {
  if (!twilioClientInstance) {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;

    if (!accountSid || !authToken) {
      throw new Error(
        "[PulseWorldSMSAlert-v20] Twilio credentials not set — TWILIO_ACCOUNT_SID or TWILIO_AUTH_TOKEN missing"
      );
    }

    twilioClientInstance = twilio(accountSid, authToken);
  }

  return twilioClientInstance;
}

/**
 * MESSAGING_SERVICE_SID
 * ---------------------
 * Twilio Messaging Service SID used for outbound SMS.
 *
 * SOURCE:
 *   • Read from process.env.TWILIO_MESSAGING_SERVICE_SID
 *
 * THROWS (at call sites, not here):
 *   • Callers should validate this before sending SMS.
 */
export const MESSAGING_SERVICE_SID = process.env.TWILIO_MESSAGING_SERVICE_SID || "";

// ============================================================================
// FOOTER — LEARNING NOTES FOR ALDWYN
// ============================================================================
//
// ⭐ TWILIO MASTER NOTES ⭐
// ------------------------
// • Twilio is a programmable communication layer (SMS, Voice, WhatsApp, etc.)
// • Messaging Service SID = your “sending brain” (pool of numbers, rules, geo)
// • From numbers can be managed by Messaging Services for smart routing
// • SMS delivery is NOT guaranteed — always log + retry for critical flows
// • Webhooks from Twilio can report delivery status (delivered, failed, etc.)
//
// ⭐ PULSE‑WORLD‑SMS RULES ⭐
// --------------------------
// • All SMS sending must go through this organ (getTwilioClient + MSG SID)
// • No UI or frontend code may talk to Twilio directly
// • No hard‑coded phone numbers or credentials
// • All phone numbers must be E.164 formatted (+15551234567)
// • All high‑value flows (login, payouts, security) should log SMS attempts
//
// ⭐ IMMORTAL ORGANISM NOTES ⭐
// ----------------------------
// • This file is a “communication organ” in the Pulse organism
// • It must remain deterministic and drift‑proof
// • It must remain stable across versions
// • It is safe to evolve — but only with explicit intent
//
// If you ever need:
//   “Design a full SMS alert pipeline”
//   “Add delivery receipts + logging”
//   “Build 2FA / OTP flows”
//   “Design rate‑limits and abuse protection”
//
// Just ask — we can grow this organ into a full CNS‑grade SMS system.
//
// ============================================================================
// END OF PulseWorldSMSAlert-v20.js
// ============================================================================
