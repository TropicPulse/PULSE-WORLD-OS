// ============================================================================
// TEST SCRIPT — Vast.ai Adapter Test (v16‑IMMORTAL‑INTEL A‑B‑A Deterministic)
// Pulse‑Earn v16‑IMMORTAL‑INTEL
// ============================================================================
/*
AI_EXPERIENCE_META = {
  identity: "PulseEarnMktAuctioneerTest",
  version: "v16-IMMORTAL-INTEL",
  layer: "earn_market_test",
  role: "auctioneer_validation_harness",
  lineage: "PulseEarnMktAuctioneerTest-v11 → v14-Immortal → v16-IMMORTAL-INTEL",

  evo: {
    testHarness: true,
    deterministicReplay: true,
    auctioneerValidation: true,
    dualBand: true,
    symbolicPrimary: true,
    binaryAware: true,

    deterministic: true,
    deterministicField: true,
    driftProof: true,
    pureCompute: true,
    zeroNetwork: true,
    zeroFilesystem: true,
    zeroMutationOfInput: true,

    intelSignatureAware: true,
    dualHashAware: true,
    structureAware: true,
    contextAware: true
  },

  contract: {
    always: [
      "PulseEarnMktAuctioneer",
      "PulseEarnMktBroker",
      "PulseEarnMktConsulate"
    ],
    never: [
      "safeRoute",
      "fetchViaCNS"
    ]
  }
}
*/

import {
  PulseEarnMktAuctioneer,
  getPulseEarnMktAuctioneerHealingState
} from "./PulseEarnMktAuctioneer-v16-IMMORTAL-INTEL.js";

// Optional deterministic global presence hints
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
  console.log(" PULSE‑EARN VAST.AI ADAPTER — TEST RUN (v16‑IMMORTAL‑INTEL)");
  console.log("==============================================\n");

  // ---------------------------------------------------------
  // 1. PING TEST (presence‑aware, dual‑hash, A‑B‑A)
  // ---------------------------------------------------------
  console.log("🔹 Testing ping()...");
  const ping = PulseEarnMktAuctioneer.ping(globalHints);
  console.log("Ping result:", ping);
  console.log("Cycle Index:", ping.cycleIndex);
  console.log("Presence Tier:", ping.auctioneerPresenceProfile.presenceTier);
  console.log("Band:", ping.band);
  console.log("Signature (INTEL):", ping.signatureIntel);
  console.log("Signature (Classic):", ping.signatureClassic);
  console.log("Binary Profile:", ping.binaryProfile);
  console.log("Wave Profile:", ping.waveProfile, "\n");

  // ---------------------------------------------------------
  // 2. FETCH JOBS TEST (presence‑aware, dual‑hash, A‑B‑A)
  // ---------------------------------------------------------
  console.log("🔹 Testing fetchJobs()...");
  const fetch = PulseEarnMktAuctioneer.fetchJobs(globalHints);
  const jobs = fetch.jobs || [];

  console.log(`Fetched ${jobs.length} jobs`);
  console.log("Cycle Index:", fetch.cycleIndex);
  console.log("Presence Tier:", fetch.auctioneerPresenceProfile?.presenceTier);
  console.log("Band:", fetch.band);
  console.log("Signature (INTEL):", fetch.signatureIntel);
  console.log("Signature (Classic):", fetch.signatureClassic);
  console.log("Binary Profile:", fetch.binaryProfile);
  console.log("Wave Profile:", fetch.waveProfile, "\n");

  if (jobs.length > 0) {
    console.log("Sample job:", jobs[0], "\n");
  }

  // ---------------------------------------------------------
  // 3. NORMALIZATION CHECK (presence‑aware, dual‑hash)
  // ---------------------------------------------------------
  if (jobs.length > 0) {
    console.log("🔹 Testing normalizeJob()...");
    const normalized = PulseEarnMktAuctioneer.normalizeJob(jobs[0], globalHints);
    console.log("Normalized job:", normalized);
    console.log("Presence Tier:", normalized?.presenceTier);
    console.log("Advantage Field:", normalized?.advantageField);
    console.log("Hints Field:", normalized?.hintsField, "\n");
  }

  // ---------------------------------------------------------
  // 4. SUBMIT RESULT TEST (presence‑aware, deterministic, dual‑hash)
  // ---------------------------------------------------------
  if (jobs.length > 0) {
    console.log("🔹 Testing submitResult()...");
    const submit = PulseEarnMktAuctioneer.submitResult(
      jobs[0],
      { ok: true },
      globalHints
    );
    console.log("Submit result:", submit);
    console.log("Cycle Index:", submit.cycleIndex);
    console.log("Presence Tier:", submit.auctioneerPresenceProfile.presenceTier);
    console.log("Band:", submit.band);
    console.log("Signature (INTEL):", submit.signatureIntel);
    console.log("Signature (Classic):", submit.signatureClassic);
    console.log("Binary Profile:", submit.binaryProfile);
    console.log("Wave Profile:", submit.waveProfile, "\n");
  }

  // ---------------------------------------------------------
  // 5. HEALING STATE (v16‑IMMORTAL‑INTEL signatures)
// ---------------------------------------------------------
  console.log("🔹 Healing State:");
  console.log(getPulseEarnMktAuctioneerHealingState());

  console.log("\n==============================================");
  console.log(" TEST COMPLETE (v16‑IMMORTAL‑INTEL)");
  console.log("==============================================");
}

run();
