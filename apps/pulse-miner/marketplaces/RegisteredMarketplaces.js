// FILE: tropic-pulse-functions/apps/pulse-miner/marketplaces/RegisteredMarketplaces.js
//
// INTENT-CHECK: If you paste this while confused or frustrated, gently re-read your INTENT; if I am unsure of intent, I will ask you for the full INTENT paragraph.
// 📘 PAGE INDEX — Source of Truth for This File
//
// This PAGE INDEX defines the identity, purpose, boundaries, and allowed
// behavior of this file. It is the compressed representation of the entire
// page. Keep this updated as adapters or miner logic evolve.
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
//   Marketplace Registry for Pulse Miner — this file provides a clean,
//   minimal export of all marketplace adapters used by the miner runtime.
//   Unlike index.js, this file does NOT perform startup initialization
//   (no reputation loading, no side effects).
//
//   REAL‑WORLD CONTEXT (for future Aldwyn):
//     • Each adapter represents a real compute marketplace:
//         - Vast: centralized compute marketplace (no token)
//         - Akash: decentralized compute marketplace using AKT* for settlement
//         - Render: GPU rendering marketplace (RNDR token exists, NOT used here)
//         - Spheron: decentralized hosting/compute platform (SPO token exists, NOT used here)
//         - FluidStack: centralized compute marketplace (no token)
//     • Tropic Pulse does NOT interact with any tokens — adapters only read job metadata.
//     • This registry is used by MarketplaceOrchestrator, MinerEngine,
//       and any module that needs a clean list of marketplaces.
//
//   This file IS:
//     • A pure registry of marketplace adapters
//     • A dependency for miner-side orchestration
//     • A deterministic, side-effect-free module
//
//   This file IS NOT:
//     • A bootstrap file (no startup logic)
//     • A reputation loader
//     • A scheduler
//     • A compute engine
//     • A backend service
//     • A financial or token handler
//
// DEPLOYMENT:
//   Lives in /apps/pulse-miner/marketplaces as part of the Pulse Miner subsystem.
//   Must run in any JS environment with fetch() available.
//   Must remain ESM-only and side-effect-free.
//
// SYNTAX RULES:
//   ESM JavaScript ONLY — no TypeScript, no CommonJS, no require().
//   Named exports ONLY — no default exports.
//
// IMPORT RULES:
//   Allowed:
//     • Marketplace adapters in this folder
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
//   • Contains NO startup logic and NO side effects
//
// SAFETY NOTES:
//   • Must NEVER mutate adapter objects
//   • Must NEVER import backend or server-side modules
//   • Must remain deterministic
//
// ------------------------------------------------------
// Marketplace Registry (Side‑Effect‑Free)
// ------------------------------------------------------

import VastAdapter from "./VastAdapter.js";
import AkashAdapter from "./AkashAdapter.js";
import RenderAdapter from "./RenderAdapter.js";
import SpheronAdapter from "./SpheronAdapter.js";
import FluidStackAdapter from "./FluidStackAdapter.js";

export const marketplaces = [
  VastAdapter,
  AkashAdapter,
  RenderAdapter,
  SpheronAdapter,
  FluidStackAdapter
];