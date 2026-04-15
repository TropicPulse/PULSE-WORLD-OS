// FILE: tropic-pulse-functions/netlify/functions/root-redirect.js
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
//   Netlify HTTP endpoint that receives userID + eventID and redirects
//   to the real Stripe Payment Link with those parameters appended.
//   This file IS a Netlify handler — routing is allowed here.
//   Logic must remain minimal; heavy logic belongs in shared modules.
//
// DEPLOYMENT:
//   PRIMARY HOST: Netlify (all backend execution runs here)
//   BACKUP HOSTS: Cloudflare + Firebase Hosting (static/CDN only)
//   Firebase Functions = deprecated — do NOT add new Firebase Functions code
//
// SYNTAX RULES:
//   ESM JavaScript ONLY — no TypeScript, no CommonJS, no require()
//   ALWAYS use named exports (`export function handler`)
//   NEVER use default exports
//
// IMPORT RULES:
//   This file should avoid imports unless absolutely required
//   (redirect endpoints must stay lightweight and fast).
//
// STRUCTURE:
//   Lives in /netlify/functions (flat) unless Aldwyn creates subfolders
//   This file is a pure redirect endpoint — no shared logic, no utilities
//
// DEPENDENCY RULES:
//   Must remain deterministic and side‑effect‑free
//   Must NOT call external APIs — only constructs redirect URLs
//
// SAFETY NOTES:
//   Validate required query parameters (userID, eventID)
//   Never expose secrets or internal URLs in responses
//   Keep redirect URLs explicit and intentional

export async function handler(event, context) {
  try {
    const params = event.queryStringParameters || {};
    const userID = params.userID;
    const eventID = params.eventID;

    if (!userID) {
      return { statusCode: 400, body: "Missing userID" };
    }
    if (!eventID) {
      return { statusCode: 400, body: "Missing eventID" };
    }

    const realUrl =
      `https://pay.tropicpulse.bz/b/00w4gy1ZP0Si7UpcgIfIs01` +
      `?userID=${encodeURIComponent(userID)}` +
      `&eventID=${encodeURIComponent(eventID)}`;

    return {
      statusCode: 302,
      headers: { Location: realUrl },
      body: ""
    };

  } catch (err) {
    console.error("Payment redirect error:", err.message);
    return {
      statusCode: 500,
      body: "Payment redirect failed"
    };
  }
}