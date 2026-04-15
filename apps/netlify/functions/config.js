// FILE: tropic-pulse-functions/netlify/lib/config.js
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
//   Centralized configuration constants for rate‑limiting, PIN TTL,
//   and shared system‑wide numeric settings.
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
//   This file is a pure configuration module — no initialization, no handlers
//
// DEPENDENCY RULES:
//   Must remain deterministic and side‑effect‑free
//   Constants must remain stable — changes ripple across authentication,
//   rate‑limiting, PIN logic, and security modules
//
// SAFETY NOTES:
//   PIN_TTL_MS is derived from MAX_REQUESTS_PER_WINDOW × RATE_LIMIT_WINDOW_MS
//   Do NOT introduce secrets or environment variables here
//   This module must remain safe for universal import
export const PIN_COLLECTION = "Users";
export const RATE_LIMIT_WINDOW_MS = 60 * 1000;
export const MAX_REQUESTS_PER_WINDOW = 5;
export const PIN_TTL_MS = MAX_REQUESTS_PER_WINDOW * RATE_LIMIT_WINDOW_MS;