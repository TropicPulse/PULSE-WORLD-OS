// FILE: tropic-pulse-functions/apps/pulse-miner/marketplaces/index.js
//
// INTENT-CHECK: If you paste this while confused or frustrated, gently re-read your INTENT; if I am unsure of intent, I will ask you for the full INTENT paragraph.
// 📘 PAGE INDEX — Source of Truth for This File
//
// This PAGE INDEX defines the identity, purpose, boundaries, and allowed
// behavior of this file. It is the compressed representation of the entire
// page. Keep this updated as adapters, marketplace logic, and miner behavior evolve.
//
// If AI becomes uncertain or drifts, request: "Rules Design (Trust/Data)"
//
// CONTENTS TO MAINTAIN:
//   • What this file IS
//   • What this file IS NOT
//   • Its responsibilities
//   • Its exported values
//   • Its internal logic summary
//   • Allowed imports
//   • Forbidden imports
//   • Deployment rules
//   • Safety constraints
//
// ROLE:
//   Marketplace Registry + Startup Bootstrap for Pulse Miner.
//   This file aggregates all miner‑side marketplace adapters into a single
//   export array and initializes marketplace reputation on miner startup.
//
//   REAL‑WORLD CONTEXT (for future Aldwyn):
//     • Each adapter represents a real compute marketplace:
//         - Vast: centralized compute marketplace (no token)
//         - Akash: decentralized compute marketplace using AKT* for settlement
//         - Render: GPU rendering marketplace (RNDR token exists, but NOT used here)
//         - Spheron: decentralized hosting/compute platform (SPO token exists, NOT used here)
//         - FluidStack: centralized compute marketplace (no token)
//     • Tropic Pulse does NOT interact with any tokens — adapters only read job metadata.
//     • This registry simply exposes adapters to the miner runtime.
//
//   This file IS:
//     • The central registry of all miner‑side marketplace adapters
//     • A clean list used by MarketplaceOrchestrator + MinerEngine
//     • The startup trigger for marketplace reputation loading
//
//   This file IS NOT:
//     • A marketplace adapter
//     • A job scheduler
//     • A compute engine
//     • A backend service
//     • A financial or token handler
//
// DEPLOYMENT:
//   Lives in /apps/pulse-miner/marketplaces as part of the Pulse Miner subsystem.
//   Must run in any JS environment with fetch() available.
//   Must remain ESM-only and side-effect-free except for startup initialization.
//
// SYNTAX RULES:
//   ESM JavaScript ONLY — no TypeScript, no CommonJS, no require().
//   Named exports ONLY — no default exports.
//
// IMPORT RULES:
//   Allowed:
//     • Marketplace adapters in this folder
//     • loadMarketplaceReputation() from MarketplaceReputation.js
//
//   Forbidden:
//     • Node.js APIs
//     • Firebase, Stripe, Twilio, or any backend modules
//     • DOM manipulation
//     • Any environment-specific dependencies
//
// INTERNAL LOGIC SUMMARY:
//   • Imports all marketplace adapters
//   • Exports them as a single array: marketplaces[]
//   • Calls loadMarketplaceReputation() once on miner startup
//
// SAFETY NOTES:
//   • Must NEVER mutate adapter objects
//   • Must NEVER import backend or server-side modules
//   • Must remain deterministic on startup
//
// ------------------------------------------------------
// Marketplace Registry + Reputation Bootstrap
// ------------------------------------------------------

import VastAdapter from "./VastAdapter.js";
import AkashAdapter from "./AkashAdapter.js";
import RenderAdapter from "./RenderAdapter.js";
import SpheronAdapter from "./SpheronAdapter.js";
import FluidStackAdapter from "./FluidStackAdapter.js";
import { loadMarketplaceReputation } from "./MarketplaceReputation.js";

export const marketplaces = [
  VastAdapter,
  AkashAdapter,
  RenderAdapter,
  SpheronAdapter,
  FluidStackAdapter
];

// Load reputation on miner startup
loadMarketplaceReputation();