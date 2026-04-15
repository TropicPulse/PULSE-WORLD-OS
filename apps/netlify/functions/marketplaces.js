// FILE: tropic-pulse-functions/netlify/lib/marketplaces.js
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
//   Central registry of miner‑side marketplace adapters.
//   Imports marketplaceA, marketplaceB, marketplaceC from the
//   /pulse-miner/marketplaces directory and exposes them as a unified
//   `marketplaces` array consumed by:
//     • MarketplaceConnector
//     • MarketplaceOrchestrator
//     • MinerRuntime
//     • MinerEngine
//
//   This file is LOGIC‑ONLY — it must NOT contain Netlify handlers.
//   Safe to import from any Netlify function or miner logic module.
//
// DEPLOYMENT:
//   PRIMARY HOST: Netlify (all backend execution runs here)
//   BACKUP HOSTS: Cloudflare + Firebase Hosting (static/CDN only)
//   Firebase Functions = deprecated — do NOT add new Firebase Functions code
//
// SYNTAX RULES:
//   ESM JavaScript ONLY — no TypeScript, no CommonJS, no require()
//   ALWAYS use named exports (`export const marketplaces`)
//   NEVER use default exports
//
// IMPORT RULES:
//   Only import modules that ALREADY exist in the repo
//   Marketplace adapters MUST live in /pulse-miner/marketplaces/
//   Do NOT assume new adapters unless Aldwyn explicitly approves
//
// STRUCTURE:
//   Lives in /netlify/lib (shared logic folder)
//   This file is a pure registry — no initialization, no handlers
//
// DEPENDENCY RULES:
//   Must remain deterministic and side‑effect‑free
//   Must NOT mutate adapter objects
//   Must NOT introduce runtime logic
//
// SAFETY NOTES:
//   This registry is foundational — changes ripple across the miner engine
//   Adapter order must remain stable unless explicitly changed
import { marketplaceA } from "../pulse-miner/marketplaces/marketplaceA.js";
import { marketplaceB } from "../pulse-miner/marketplaces/marketplaceB.js";
import { marketplaceC } from "../pulse-miner/marketplaces/marketplaceC.js";

export const marketplaces = [marketplaceA, marketplaceB, marketplaceC];