// ======================================================
// MarketplaceReputation.js
// Weighted reputation scoring for marketplaces
// + Persistence to disk
// ======================================================
//
// Each marketplace gets a dynamic score based on:
//   • Latency
//   • API reliability
//   • Job quality
//   • Job profitability
//   • Job completion success
//   • Error rate
//   • Historical performance
//
// Reputation is saved to disk so it survives restarts.
// ======================================================

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