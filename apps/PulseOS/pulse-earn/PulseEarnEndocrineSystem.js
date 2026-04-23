// ============================================================================
// FILE: tropic-pulse-functions/apps/pulse-earn/PulseEarnEndocrineSystem-v11-Evo.js
// LAYER: THE ENDOCRINE SYSTEM (v11-Evo)
// (Performance Intelligence + Reputation Hormones + Trust Regulation)
// ============================================================================
//
// ROLE (v11-Evo):
//   THE ENDOCRINE SYSTEM — Pulse‑Earn’s long-term performance regulator.
//   • Tracks marketplace reliability and profitability (hormone sensing).
//   • Computes normalized performance signals (signal transduction).
//   • Applies weighted scoring to determine trust (hormonal modulation).
//   • Blends historical + recent performance (EMA).
//   • Maintains in‑memory reputation for long-term intelligence.
//   • Emits v11‑Evo hormonal signatures.
//
// CONTRACT (v11-Evo):
//   • PURE INTELLIGENCE ENGINE — no AI layers, no translation, no memory model.
//   • READ-ONLY except deterministic reputation updates.
//   • NO eval(), NO Function(), NO dynamic imports.
//   • NO executing user code.
//   • NO filesystem, NO timestamps.
//   • Deterministic scoring only.
// ============================================================================


// ============================================================================
// Constants — Endocrine Baselines
// ============================================================================
const DEFAULT_REPUTATION = 0.5;

// In-memory endocrine hormone store
let reputation = new Map();


// ============================================================================
// Healing Metadata — Endocrine Activity Log (v11-Evo)
// ============================================================================
const endocrineHealing = {
  lastMarketplaceId: null,
  lastReputationBefore: null,
  lastReputationAfter: null,
  lastSignals: null,
  lastLoadError: null,
  lastSaveError: null,
  cycleCount: 0,

  lastHormoneSignature: null,
  lastSignalSignature: null,
  lastReputationSignature: null,
  lastEndocrineCycleSignature: null
};


// ============================================================================
// Deterministic Hash Helper — v11-Evo
// ============================================================================
function computeHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `h${h}`;
}


// ============================================================================
// Signature Builders — v11-Evo
// ============================================================================
function buildHormoneSignature(id, cycle) {
  return computeHash(`ENDO::${id}::${cycle}`);
}

function buildSignalSignature(signals) {
  return computeHash(`SIG::${JSON.stringify(signals)}`);
}

function buildReputationSignature(id, rep) {
  return computeHash(`REP::${id}::${rep}`);
}

function buildEndocrineCycleSignature(cycle) {
  return computeHash(`ENDO_CYCLE::${cycle}`);
}


// ============================================================================
// Load reputation — Endocrine Memory Recall (v11-Evo: in-memory only)
// ============================================================================
export function loadPulseEarnReputation() {
  reputation = reputation || new Map();
  endocrineHealing.lastLoadError = null;
}


// ============================================================================
// Save reputation — Endocrine Persistence (v11-Evo: no-op)
// ============================================================================
function savePulseEarnReputation() {
  endocrineHealing.lastSaveError = null;
}


// ============================================================================
// Get current reputation — Hormone Level Lookup
// ============================================================================
export function getPulseEarnReputation(id) {
  return Number(reputation.get(id)) || DEFAULT_REPUTATION;
}


// ============================================================================
// Update reputation — Endocrine Regulation Cycle (v11-Evo)
// ============================================================================
export function updatePulseEarnReputation(id, signals) {
  endocrineHealing.cycleCount++;
  endocrineHealing.lastMarketplaceId = id;
  endocrineHealing.lastSignals = { ...signals };

  const current = getPulseEarnReputation(id);
  endocrineHealing.lastReputationBefore = current;

  endocrineHealing.lastSignalSignature = buildSignalSignature(signals);

  // Hormonal weighting coefficients (v11-Evo: unchanged)
  const weights = {
    latency: 0.15,
    apiSuccess: 0.2,
    jobQuality: 0.25,
    profitability: 0.25,
    jobSuccess: 0.15
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
  endocrineHealing.lastReputationAfter = clamped;

  endocrineHealing.lastHormoneSignature = buildHormoneSignature(
    id,
    endocrineHealing.cycleCount
  );

  endocrineHealing.lastReputationSignature = buildReputationSignature(
    id,
    clamped
  );

  endocrineHealing.lastEndocrineCycleSignature = buildEndocrineCycleSignature(
    endocrineHealing.cycleCount
  );

  savePulseEarnReputation();

  return clamped;
}


// ============================================================================
// Normalization Helpers — Endocrine Signal Processing
// ============================================================================
function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

export function computePulseEarnReputationSignals({
  latencyMs,
  apiErrors,
  jobsReturned,
  profitableJobs,
  jobSuccessRate,
  avgProfitPerJob
}) {
  return {
    latency: latencyMs != null ? normalizeLatency(latencyMs) : 0.5,
    apiSuccess: apiErrors != null ? normalizeApiErrors(apiErrors) : 0.5,
    jobQuality: jobsReturned != null ? normalizeJobQuality(jobsReturned) : 0.5,
    profitability:
      avgProfitPerJob != null ? normalizeProfit(avgProfitPerJob) : 0.5,
    jobSuccess: jobSuccessRate != null ? clamp(jobSuccessRate, 0, 1) : 0.5
  };
}


// ============================================================================
// Normalizers — Endocrine Signal Processing
// ============================================================================
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


// ============================================================================
// Export Healing Metadata — Endocrine Report (v11-Evo)
// ============================================================================
export function getPulseEarnReputationHealingState() {
  return { ...endocrineHealing };
}


// ============================================================================
// v11-Evo COMPAT ALIASES — for Nervous System imports
// ============================================================================
export function updateMarketplaceReputation(id, signals) {
  return updatePulseEarnReputation(id, signals);
}

export function computeReputationSignals(args) {
  return computePulseEarnReputationSignals(args);
}
