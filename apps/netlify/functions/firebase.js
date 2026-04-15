// FILE: tropic-pulse-functions/netlify/lib/firebase.js
//
// INTENT-CHECK: If you paste this while confused or frustrated, gently re-read your INTENT; 
// if I am unsure of intent, I will ask you for the full INTENT paragraph.
//
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
// ROLE:
//   Centralized Firebase Admin initializer for Tropic Pulse.
//   Provides shared Firestore (`db`) and Storage (`storage`) instances.
//   Ensures Firebase Admin initializes exactly once per Netlify cold start.
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
//   ALWAYS use named exports (`export const`, `export { admin }`)
//   NEVER use default exports
//
// IMPORT RULES:
//   Only import modules that ALREADY exist in the repo
//   Firebase Admin SDK usage is allowed (confirmed by Aldwyn)
//   Do NOT assume new files or dependencies unless explicitly approved
//
// STRUCTURE:
//   Lives in /netlify/lib (shared logic folder)
//   This file is a pure initialization module — no routing, no handlers
//
// DEPENDENCY RULES:
//   Must remain deterministic and side‑effect‑free
//   Must NOT reinitialize Firebase Admin on every import
//   Must NOT mutate Firestore or Storage instances
//
// SAFETY NOTES:
//   Never log credentials or sensitive Firebase configuration
//   This module is foundational — changes affect all Firestore/Storage usage

import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp();
}

export const db = admin.firestore();
export const storage = admin.storage().bucket();
export { admin };