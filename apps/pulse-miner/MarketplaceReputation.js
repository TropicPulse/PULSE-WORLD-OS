// FILE: tropic-pulse-functions/apps/pulse-miner/MarketplaceReputation.js
//
// INTENT-CHECK: If you paste this while confused or frustrated, gently re-read your INTENT; if I am unsure of intent, I will ask you for the full INTENT paragraph.
// 📘 PAGE INDEX — Source of Truth for This File
//
// This PAGE INDEX defines the identity, purpose, boundaries, and allowed
// behavior of this file. It is the compressed representation of the entire
// page. Keep this updated as logic evolves.
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
//   MarketplaceReputation — persistent reliability scoring for all marketplaces.
//   This module tracks:
//     • Latency
//     • API reliability
//     • Job quality
//     • Job profitability
//     • Job completion success
//     • Error rate
//     • Historical performance
//
//   Reputation is stored on disk so it survives restarts.
//
//   REAL‑WORLD CONTEXT (for future Aldwyn):
//     • This file does NOT interact with any marketplace APIs directly.
//     • This file does NOT know about tokens, payouts, or financial systems.
//       Even if a marketplace uses a token (AKT*, RNDR*, SPHERON*),
//       reputation scoring is purely operational — we do NOT do crypto.
//     • This file only receives normalized signals from MarketplaceConnector.
//
//   This file IS:
//     • A persistent reputation engine
//     • A weighted scoring model
//     • A disk-backed memory store
//     • A reliability tracker for compute marketplaces
//
//   This file IS NOT:
//     • A scheduler
//     • A job selector
//     • A compute engine
//     • A marketplace adapter
//     • A blockchain client
//     • A wallet or token handler
//
// DEPLOYMENT:
//   Lives in /apps/pulse-miner as part of the Pulse Miner subsystem.
//   Must run in Node.js (uses fs + path).
//   Must remain synchronous for reliability (startup-critical).
//
// SYNTAX RULES:
//   ESM JavaScript ONLY — no TypeScript, no CommonJS, no require().
//   Named exports ONLY — no default exports.
//
// IMPORT RULES:
//   Allowed:
//     • fs (Node.js)
//     • path (Node.js)
//
//   Forbidden:
//     • Any browser-only APIs
//     • Any marketplace adapters
//     • Any compute logic
//
// INTERNAL LOGIC SUMMARY:
//   • loadMarketplaceReputation():
//       - Reads JSON file from disk
//       - Loads into in-memory Map
//
//   • saveMarketplaceReputation():
//       - Writes Map → JSON file
//       - Ensures directory exists
//
//   • getMarketplaceReputation(id):
//       - Returns stored reputation or default baseline
//
//   • updateMarketplaceReputation(id, signals):
//       - Applies weighted scoring model
//       - Blends old + new using EMA smoothing
//       - Clamps score to 0–1
//       - Saves to disk
//
//   • computeReputationSignals():
//       - Converts raw metrics → normalized 0–1 signals
//       - Uses helper normalizers for latency, errors, quality, profit
//
// SAFETY NOTES:
//   • Must NEVER throw unhandled errors
//   • Must ALWAYS clamp values to 0–1
//   • Must ALWAYS persist after updates
//   • Must remain deterministic
//
// ------------------------------------------------------
// Marketplace Reputation Engine (Persistent)
// ------------------------------------------------------

import fs from "fs";
import path from "path";

const DEFAULT_REPUTATION = 0.5; // neutral baseline
const REPUTATION_FILE = path.resolve("pulse-miner/data/marketplace-reputation.json");

// In-memory reputation store
let reputation = new Map();

// ------------------------------------------------------
// Load reputation from disk
// ------------------------------------------------------
export function loadMarketplaceReputation() {
  try {
    if (!fs.existsSync(REPUTATION_FILE)) {
      reputation = new Map();
      return;
    }

    const raw = fs.readFileSync(REPUTATION_FILE, "utf8");
    const json = JSON.parse(raw);

    reputation = new Map(Object.entries(json));
  } catch (err) {
    console.error("Failed to load marketplace reputation:", err);
    reputation = new Map();
  }
}

// ------------------------------------------------------
// Save reputation to disk
// ------------------------------------------------------
function saveMarketplaceReputation() {
  try {
    const obj = Object.fromEntries(reputation);
    fs.mkdirSync(path.dirname(REPUTATION_FILE), { recursive: true });
    fs.writeFileSync(REPUTATION_FILE, JSON.stringify(obj, null, 2));
  } catch (err) {
    console.error("Failed to save marketplace reputation:", err);
  }
}

// ------------------------------------------------------
// Get current reputation for a marketplace
// ------------------------------------------------------
export function getMarketplaceReputation(id) {
  return Number(reputation.get(id)) || DEFAULT_REPUTATION;
}

// ------------------------------------------------------
// Update reputation based on signals
// ------------------------------------------------------
export function updateMarketplaceReputation(id, signals) {
  const current = getMarketplaceReputation(id);

  // Weighted scoring model
  const weights = {
    latency: 0.15,
    apiSuccess: 0.20,
    jobQuality: 0.25,
    profitability: 0.25,
    jobSuccess: 0.15
  };

  const score =
    (signals.latency ?? 0) * weights.latency +
    (signals.apiSuccess ?? 0) * weights.apiSuccess +
    (signals.jobQuality ?? 0) * weights.jobQuality +
    (signals.profitability ?? 0) * weights.profitability +
    (signals.jobSuccess ?? 0) * weights.jobSuccess;

  // Blend old + new (EMA smoothing)
  const updated = current * 0.7 + score * 0.3;

  reputation.set(id, clamp(updated, 0, 1));

  // Persist immediately
  saveMarketplaceReputation();

  return reputation.get(id);
}

// ------------------------------------------------------
// Normalize values into 0–1 range
// ------------------------------------------------------
function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

// ------------------------------------------------------
// Convert raw metrics into normalized signals
// ------------------------------------------------------
export function computeReputationSignals({
  latencyMs,
  apiErrors,
  jobsReturned,
  profitableJobs,
  jobSuccessRate,
  avgProfitPerJob
}) {
  return {
    latency: latencyMs ? normalizeLatency(latencyMs) : 0.5,
    apiSuccess: apiErrors != null ? normalizeApiErrors(apiErrors) : 0.5,
    jobQuality: jobsReturned != null ? normalizeJobQuality(jobsReturned) : 0.5,
    profitability: avgProfitPerJob != null ? normalizeProfit(avgProfitPerJob) : 0.5,
    jobSuccess: jobSuccessRate != null ? jobSuccessRate : 0.5
  };
}

// ------------------------------------------------------
// Normalizers
// ------------------------------------------------------
function normalizeLatency(ms) {
  if (ms < 200) return 1;
  if (ms < 500) return 0.8;
  if (ms < 1000) return 0.6;
  if (ms < 1500) return 0.4;
  return 0.2;
}

function normalizeApiErrors(errors) {
  if (errors === 0) return 1;
  if (errors <= 2) return 0.8;
  if (errors <= 5) return 0.5;
  return 0.2;
}

function normalizeJobQuality(count) {
  if (count > 20) return 1;
  if (count > 10) return 0.8;
  if (count > 5) return 0.6;
  return 0.3;
}

function normalizeProfit(p) {
  if (p > 5) return 1;
  if (p > 2) return 0.8;
  if (p > 1) return 0.6;
  return 0.3;
}