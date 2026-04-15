// FILE: tropic-pulse-functions/netlify/lib/scoring.js
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
//   Thin export layer that exposes the scoring engine entrypoint
//   (runUserScoring) to Netlify functions and backend logic.
//
//   This file is NOT a scoring engine.
//   This file contains NO business logic.
//   This file simply re‑exports scoring logic from the pulse‑proxy layer.
//
// DEPLOYMENT:
//   Lives in /netlify/lib as a shared logic module.
//   Must remain side‑effect‑free and deterministic.
//   Must remain ESM‑only.
//
// SYNTAX RULES:
//   ESM JavaScript ONLY — no TypeScript, no CommonJS, no require().
//   Named exports ONLY — no default exports.
//
// IMPORT RULES:
//   Allowed:
//     • runUserScoring from ../pulse-proxy/PulseUserScoring.js
//
//   Forbidden:
//     • Firebase Admin
//     • Stripe
//     • Twilio
//     • Any environment‑specific modules
//
// SAFETY NOTES:
//   • This file must remain extremely stable.
//   • Changing this file affects all scoring‑triggering endpoints.
//   • Do not add logic here — keep this a pure re‑export layer.

import { runUserScoring } from "../pulse-proxy/PulseUserScoring.js";
export { runUserScoring };