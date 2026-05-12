// ============================================================================
// TEST SCRIPT — Vast.ai Adapter Test (v24‑IMMORTAL++ A‑B‑A‑GPU Deterministic)
// Pulse‑Earn v24‑IMMORTAL++
// ============================================================================

PULSE-WORLD-MAP.js
import {
  OrganismIdentity,
  buildPulseOrganismMap as PulseOrganismMap
} from "./PULSE-WORLD-MAP.js";
const Identity = OrganismIdentity(import.meta.url);

// 2 — EXPORT GENOME METADATA
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

import {
  PulseEarnMktAuctioneer,
  getPulseEarnMktAuctioneerHealingState
} from "./PulseEarnMktAuctioneer-v24.js";

// Deterministic local device profile (GPU + bandwidth + stability)
const deviceProfile = {
  gpuScore: 900,          // strong GPU
  bandwidthMbps: 200,     // high network bandwidth
  stabilityScore: 0.97    // very stable node
};

// Optional deterministic global presence hints (A‑B‑A mesh/castle/region)
const globalHints = {
  presenceContext: {
    bandPresence: "symbolic",
    routerPresence: "stable",
    devicePresence: "local"
  },
  meshSignals: {
    meshStrength: 12,
    meshPressureIndex: 18
  },
  castleSignals: {
    castlePresence: "regional",
    castleId: "castle-mesa-01",
    loadLevel: 22
  },
  regionContext: {
    regionTag: "us-west-mesa",
    regionId: "mesa-01"
  },
  advantageContext: {
    score: 4,
    band: "symbolic",
    tier: 2
  },
  fallbackBandLevel: 1,
  chunkHints: { prechunk: true },
  cacheHints: { level: 2 },
  prewarmHints: { enabled: true },
  coldStartHints: { avoid: true }
};

function run() {
  console.log("==============================================");
  console.log(" PULSE‑EARN VAST.AI ADAPTER — TEST RUN (v24‑IMMORTAL++)");
  console.log("==============================================\n");

  // ---------------------------------------------------------
  // 1. PING TEST (v24 IMMORTAL++ — presence + advantage + chunk + A‑B‑A)
  // ---------------------------------------------------------
  console.log("🔹 Testing ping()...");
  const ping = PulseEarnMktAuctioneer.ping(deviceProfile, globalHints);
  console.log("Ping result:", ping);
  console.log("Cycle Index:", ping.cycleIndex);
  console.log("Presence Tier:", ping.presenceField?.presenceTier);
  console.log("Band:", ping.band || ping._abaBand || "symbolic");
  console.log("Signature (INTEL):", ping.signatureIntel);
  console.log("Signature (Classic):", ping.signatureClassic);
  console.log("Binary Field:", ping.binaryField);
  console.log("Wave Field:", ping.waveField);
  console.log("Advantage Field:", ping.advantageField);
  console.log("Chunk Plan:", ping.chunkPlan, "\n");

  // ---------------------------------------------------------
  // 2. FETCH JOBS TEST (v24 IMMORTAL++ — presence + advantage + chunk + A‑B‑A)
  // ---------------------------------------------------------
  console.log("🔹 Testing fetchJobs()...");
  const fetch = PulseEarnMktAuctioneer.fetchJobs(deviceProfile, globalHints);
  const jobs = fetch.jobs || [];

  console.log(`Fetched ${jobs.length} jobs`);
  console.log("Cycle Index:", fetch.cycleIndex);
  console.log("Presence Tier:", fetch.presenceField?.presenceTier);
  console.log("Band:", fetch.band || fetch._abaBand || "symbolic");
  console.log("Signature (INTEL):", fetch.signatureIntel);
  console.log("Signature (Classic):", fetch.signatureClassic);
  console.log("Binary Field:", fetch.binaryField);
  console.log("Wave Field:", fetch.waveField);
  console.log("Advantage Field:", fetch.advantageField);
  console.log("Chunk Plan:", fetch.chunkPlan, "\n");

  if (jobs.length > 0) {
    console.log("Sample job:", jobs[0], "\n");
  }

  // ---------------------------------------------------------
  // 3. NORMALIZATION CHECK (v24 IMMORTAL++ — dual‑hash + A‑B‑A + GPU fields)
  // ---------------------------------------------------------
  if (jobs.length > 0) {
    console.log("🔹 Testing normalizeJob()...");
    const normalized = PulseEarnMktAuctioneer.normalizeJob(
      jobs[0],
      deviceProfile,
      globalHints
    );
    console.log("Normalized job:", normalized);
    console.log("Presence Tier:", normalized?.presenceField?.presenceTier);
    console.log("Advantage Field:", normalized?.advantageField);
    console.log("Chunk Plan:", normalized?.chunkPlan);
    console.log("A‑B‑A Band:", normalized?._abaBand);
    console.log("A‑B‑A Binary Density:", normalized?._abaBinaryDensity);
    console.log("A‑B‑A Wave Amplitude:", normalized?._abaWaveAmplitude, "\n");
  }

  // ---------------------------------------------------------
  // 4. SUBMIT RESULT TEST (v24 IMMORTAL++ — deterministic + dual‑hash)
  // ---------------------------------------------------------
  if (jobs.length > 0) {
    console.log("🔹 Testing submitResult()...");
    const submit = PulseEarnMktAuctioneer.submitResult(
      jobs[0],
      { ok: true },
      deviceProfile,
      globalHints
    );
    console.log("Submit result:", submit);
    console.log("Cycle Index:", submit.cycleIndex);
    console.log("Presence Tier:", submit.presenceField?.presenceTier);
    console.log("Band:", submit.band || submit._abaBand || "symbolic");
    console.log("Signature (INTEL):", submit.signatureIntel);
    console.log("Signature (Classic):", submit.signatureClassic);
    console.log("Binary Field:", submit.binaryField);
    console.log("Wave Field:", submit.waveField);
    console.log("Advantage Field:", submit.advantageField);
    console.log("Chunk Plan:", submit.chunkPlan, "\n");
  }

  // ---------------------------------------------------------
  // 5. HEALING STATE (v24‑IMMORTAL++ dual‑hash surfaces)
  // ---------------------------------------------------------
  console.log("🔹 Healing State:");
  console.log(getPulseEarnMktAuctioneerHealingState());

  console.log("\n==============================================");
  console.log(" TEST COMPLETE (v24‑IMMORTAL++)");
  console.log("==============================================");
}

run();
