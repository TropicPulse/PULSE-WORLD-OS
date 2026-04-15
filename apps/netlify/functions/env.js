// FILE: tropic-pulse-functions/netlify/lib/env.js
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
//   Centralized environment variable loader for Tropic Pulse.
//   Provides access to both secrets (private) and public configuration
//   values used across Netlify functions. This file is LOGIC‑ONLY —
//   it must NOT contain Netlify handlers. Safe to import anywhere.
//
// DEPLOYMENT:
//   PRIMARY HOST: Netlify (all backend execution runs here)
//   BACKUP HOSTS: Cloudflare + Firebase Hosting (static/CDN only)
//   Firebase Functions = deprecated — do NOT add new Firebase Functions code
//
// ENVIRONMENT RULES:
//   - All secrets MUST be stored in Netlify Environment Variables
//   - All public config values MUST be stored as non‑secret env vars
//   - No hard‑coded secrets allowed
//   - No default fallbacks for secrets (must fail loudly if missing)
//
// SYNTAX RULES:
//   ESM JavaScript ONLY — no TypeScript, no CommonJS, no require()
//   ALWAYS use named exports (`export const ...`)
//   NEVER use default exports
//
// IMPORT RULES:
//   Only import modules that ALREADY exist in the repo
//   This module must remain dependency‑free (no imports allowed)
//   Do NOT assume new files or dependencies unless Aldwyn explicitly approves
//
// STRUCTURE:
//   Lives in /netlify/lib (shared logic folder)
//   This file is a pure environment loader — no initialization, no handlers
//
// DEPENDENCY RULES:
//   Must remain deterministic and side‑effect‑free
//   Must NOT mutate environment variables
//   Must NOT introduce runtime logic beyond simple exports
//
// SAFETY NOTES:
//   Secrets must NEVER be logged
//   Public env vars are safe for frontend consumption
//   VAULT_PATCH_TWILIGHT is a static metadata object — do not modify

// 🔐 Secrets (formerly defineSecret)
export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
export const JWT_SECRET = process.env.JWT_SECRET;

export const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_SECRET_WEBHOOK;
export const MESSAGING_SERVICE_SID = process.env.MESSAGING_SERVICE_SID;
export const ACCOUNT_SID = process.env.ACCOUNT_SID;
export const AUTH_TOKEN = process.env.AUTH_TOKEN;

// 🌐 Cloud Run / Public env vars
export const TP_API_KEY = process.env.TP_API_KEY;
export const BASE_PAYMENT_URL = process.env.BASE_PAYMENT_URL;
export const GOOGLE_MAPS_KEY = process.env.GOOGLE_MAPS_KEY;
export const PLACEHOLDER_IMAGE_URL = process.env.PLACEHOLDER_IMAGE_URL;

// 🛡️ Vault Patch (unchanged)
export const VAULT_PATCH_TWILIGHT = {
  signature: "Twilight",
  invoked: "2026-04-07T04:00:00-07:00",
  version: 2,
  type: "security-data-integrity",
  glyph: "🌒",
  description: "The first protective veil cast by the Vault Spirit during a 4 AM development session.",
  note: "Named 'Twilight' because it was created in the quiet hours before dawn."
};