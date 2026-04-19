// ============================================================================
// FILE: tropic-pulse-functions/apps/pulse-earn/MarketplaceReputation.js
// LAYER: THE ENDOCRINE SYSTEM
// (Performance Intelligence + Reputation Hormones + Trust Regulation)
// ============================================================================
//
// ROLE (v7.1+):
//   THE ENDOCRINE SYSTEM — Pulse‑Earn’s long-term performance regulator.
//   • Tracks marketplace reliability and profitability (hormone sensing).
//   • Computes normalized performance signals (signal transduction).
//   • Applies weighted scoring to determine trust (hormonal modulation).
//   • Blends historical + recent performance (half-life / EMA).
//   • Persists reputation for long-term intelligence (endocrine memory).
//
// WHY “ENDOCRINE SYSTEM”?:
//   • It regulates long-term behavior across the entire organism.
//   • It adjusts trust levels like hormones adjust organ sensitivity.
//   • It blends past + present signals like hormonal half-lives.
//   • It influences routing decisions (Traffic Officer / Brainstem).
//   • It maintains persistent intelligence across Earn sessions.
//
// PURPOSE (v7.1+):
//   • Provide deterministic, drift-proof trust scoring.
//   • Maintain persistent marketplace reputation (hormonal memory).
//   • Supply the Brainstem (Orchestrator) with trust hormones.
//   • Preserve endocrine lineage + signal weighting (conceptual only).
//
// CONTRACT (unchanged):
//   • PURE INTELLIGENCE ENGINE — no AI layers, no translation, no memory model.
//   • READ-ONLY except for deterministic reputation updates.
//   • NO eval(), NO Function(), NO dynamic imports.
//   • NO executing user code.
//   • Deterministic scoring only.
//
// SAFETY (unchanged):
//   • v7.1+ upgrade is COMMENTAL ONLY — NO LOGIC CHANGES.
//   • All behavior remains identical to pre‑v7.1 Reputation Engine.
// ============================================================================

import fs from "fs";
import path from "path";

// ---------------------------------------------------------------------------
// Constants — Endocrine Baselines
// ---------------------------------------------------------------------------
const DEFAULT_REPUTATION = 0.5;
const REPUTATION_FILE = path.resolve(
  "pulse-earn/data/marketplace-reputation.json"
);

// In-memory endocrine hormone store
let reputation = new Map();

// ---------------------------------------------------------------------------
// Healing Metadata — Endocrine Activity Log
// ---------------------------------------------------------------------------
const healingState = {
  lastMarketplaceId: null,
  lastReputationBefore: null,
  lastReputationAfter: null,
  lastSignals: null,
  lastLoadError: null,
  lastSaveError: null,
  cycleCount: 0, // hormonal cycles completed
};

// ---------------------------------------------------------------------------
// Load reputation from disk — Endocrine Memory Recall
// ---------------------------------------------------------------------------
export function loadMarketplaceReputation() {
  try {
    if (!fs.existsSync(REPUTATION_FILE)) {
      reputation = new Map();
      return;
    }

    const raw = fs.readFileSync(REPUTATION_FILE, "utf8");
    const json = JSON.parse(raw);

    reputation = new Map(Object.entries(json));
    healingState.lastLoadError = null;
  } catch (err) {
    console.error("Failed to load marketplace reputation:", err);
    healingState.lastLoadError = err.message;
    reputation = new Map();
  }
}

// ---------------------------------------------------------------------------
// Save reputation to disk — Endocrine Persistence
// ---------------------------------------------------------------------------
function saveMarketplaceReputation() {
  try {
    const obj = Object.fromEntries(reputation);
    fs.mkdirSync(path.dirname(REPUTATION_FILE), { recursive: true });
    fs.writeFileSync(REPUTATION_FILE, JSON.stringify(obj, null, 2));
    healingState.lastSaveError = null;
  } catch (err) {
    console.error("Failed to save marketplace reputation:", err);
    healingState.lastSaveError = err.message;
  }
}

// ---------------------------------------------------------------------------
// Get current reputation — Hormone Level Lookup
// ---------------------------------------------------------------------------
export function getMarketplaceReputation(id) {
  return Number(reputation.get(id)) || DEFAULT_REPUTATION;
}

// ---------------------------------------------------------------------------
// Update reputation — Endocrine Regulation Cycle
// ---------------------------------------------------------------------------
export function updateMarketplaceReputation(id, signals) {
  healingState.cycleCount++;
  healingState.lastMarketplaceId = id;
  healingState.lastSignals = { ...signals };

  const current = getMarketplaceReputation(id);
  healingState.lastReputationBefore = current;

  // Hormonal weighting coefficients
  const weights = {
    latency: 0.15,
    apiSuccess: 0.2,
    jobQuality: 0.25,
    profitability: 0.25,
    jobSuccess: 0.15,
  };

  // Hormonal signal transduction
  const score =
    (signals.latency ?? 0) * weights.latency +
    (signals.apiSuccess ?? 0) * weights.apiSuccess +
    (signals.jobQuality ?? 0) * weights.jobQuality +
    (signals.profitability ?? 0) * weights.profitability +
    (signals.jobSuccess ?? 0) * weights.jobSuccess;

  // EMA = hormonal half-life blending
  const updated = current * 0.7 + score * 0.3;
  const clamped = clamp(updated, 0, 1);

  reputation.set(id, clamped);
  healingState.lastReputationAfter = clamped;

  saveMarketplaceReputation();

  return clamped;
}

// ---------------------------------------------------------------------------
// Normalization Helpers — Hormonal Calibration
// ---------------------------------------------------------------------------
function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

export function computeReputationSignals({
  latencyMs,
  apiErrors,
  jobsReturned,
  profitableJobs,
  jobSuccessRate,
  avgProfitPerJob,
}) {
  return {
    latency: latencyMs != null ? normalizeLatency(latencyMs) : 0.5,
    apiSuccess: apiErrors != null ? normalizeApiErrors(apiErrors) : 0.5,
    jobQuality: jobsReturned != null ? normalizeJobQuality(jobsReturned) : 0.5,
    profitability:
      avgProfitPerJob != null ? normalizeProfit(avgProfitPerJob) : 0.5,
    jobSuccess: jobSuccessRate != null ? clamp(jobSuccessRate, 0, 1) : 0.5,
  };
}

// ---------------------------------------------------------------------------
// Normalizers — Endocrine Signal Processing
// ---------------------------------------------------------------------------
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

// ---------------------------------------------------------------------------
// Export Healing Metadata — Endocrine Report
// ---------------------------------------------------------------------------
export function getMarketplaceReputationHealingState() {
  return { ...healingState };
}
