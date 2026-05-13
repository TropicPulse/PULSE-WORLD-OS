// Gate:
// const advantageOrgan = pulseTouchAdvantageCortex();
// const advantageView = advantageOrgan.compute(
//   { page: touchState.page, advantageHints, metrics },
//   predictorView,
//   oracleView
// );

// ============================================================================
//  PULSE OS — INNER‑PLUS ORGAN
//  FILE: PULSE-TOUCH-ADVANTAGE-v27++.js
//  ORGAN: pulseTouchAdvantageCortex (v27++ IMMORTAL)
// ============================================================================

export const AI_EXPERIENCE_META_PulseTouchAdvantage = {
  id: "pulsetouch.advantage",
  kind: "inner_plus",
  version: "v27++-IMMORTAL",
  role: "advantage_cortex",
  surfaces: {
    band: [
      "advantage",
      "hydration",
      "animation",
      "chunk",
      "routing",
      "prewarm",
      "memory",
      "signal",
      "presence",
      "genome",
      "module"
    ],
    wave: ["quiet", "adaptive"],
    presence: ["advantage_state", "routing_state", "memory_state"],
    speed: "sync"
  }
};

export const ORGAN_META_PulseTouchAdvantage = {
  id: "organ.pulsetouch.advantage",
  organism: "PulseTouch",
  layer: "inner_plus.advantage",
  tier: "IMMORTAL",
  evoFlags: {
    deterministic: true,
    driftProof: true,
    asyncSafe: true,
    zeroPII: true,
    zeroTracking: true,
    hydrationAware: true,
    animationAware: true,
    chunkAware: true,
    presenceAware: true,
    analyticsAware: true,
    routingAware: true,
    memoryAware: true,
    prewarmAware: true,
    signalAware: true,
    genomeAware: true,

    // v27++
    moduleAware: true,
    pulseImportAware: true,
    pulseExportAware: true,
    subimportAware: true,
    tierAware: true
  }
};

export const ORGAN_CONTRACT_PulseTouchAdvantage = {
  inputs: {
    analytics: "Object: { page, metrics, advantageHints } from PulseTouchAnalytics",
    predictor: "PulseTouchPredictor prediction (optional)",
    oracle: "PulsePresenceOracle evaluation (optional)"
  },
  outputs: {
    hydrationBias: "none | minimal | safe | full",
    animationBias: "none | reduced | smooth",
    chunkBias: "safe | aggressive",
    advantageScore: "0–1 numeric score",
    nextPage: "predicted next page",
    nextAssets: "string[] assets to preload",
    routeConfidence: "0–1 numeric confidence",
    history: "string[] of visited pages (local, capped)",
    snapshot: "optional page snapshot for current page",
    chunkPlan: "chunk plan for current + next page",
    prewarmPlan: "prewarm plan (assets + chunks)",
    signalHints: "PulseSignal hints",
    genomeHints: "PulseGenome hints",
    modulePlan: "module‑aware plan (biases + stability)"
  },
  guarantees: {
    deterministic: true,
    noNetwork: true,
    noSideEffects: true
  }
};

export const IMMORTAL_OVERLAYS_PulseTouchAdvantage = {
  drift: { allowed: false },
  pressure: { expectedLoad: "medium" },
  stability: { semantics: "stable" },
  load: { maxComponents: 1 }
};

// ============================================================================
// INTERNAL STATE — LOCAL ROUTE + PAGE MEMORY (IMMORTAL++ SAFE)
// ============================================================================
const MAX_HISTORY = 64;

function createAdvantageState() {
  return {
    history: [],
    pages: {}
  };
}

// ============================================================================
// CHUNK PROFILES — v25++ (kept IMMORTAL)
// ============================================================================
const CHUNK_PROFILES = {
  index: {
    safe: ["hero", "nav", "aboveFold"],
    aggressive: ["hero", "nav", "aboveFold", "belowFold", "secondary"]
  },
  dashboard: {
    safe: ["summary", "nav", "aboveFold"],
    aggressive: ["summary", "nav", "aboveFold", "charts", "activity"]
  },
  scanner: {
    safe: ["scannerShell", "nav"],
    aggressive: ["scannerShell", "nav", "results", "history"]
  },
  rewards: {
    safe: ["rewardsShell", "nav"],
    aggressive: ["rewardsShell", "nav", "cards", "history"]
  },
  profile: {
    safe: ["profileShell", "nav"],
    aggressive: ["profileShell", "nav", "settings", "history"]
  }
};

function getChunkProfileForPage(page, chunkBias) {
  const key = page || "index";
  const profile = CHUNK_PROFILES[key] || CHUNK_PROFILES.index;
  return chunkBias === "aggressive" ? profile.aggressive : profile.safe;
}

// ============================================================================
// ROUTING LOGIC — v27++ (uses Predictor when available)
// ============================================================================
function computeRouting(state, analytics, predictor) {
  const currentPage = analytics?.page || "index";

  // 1) Predictor‑driven nextPage if present
  const predictorNext = predictor?.prediction?.nextPage || null;
  let nextPage = predictorNext || currentPage;

  // 2) Fallback deterministic route graph (IMMORTAL)
  if (!predictorNext) {
    const routes = ["index", "dashboard", "scanner", "rewards", "profile"];
    const idx = routes.indexOf(currentPage);
    nextPage = idx >= 0 && idx < routes.length - 1 ? routes[idx + 1] : currentPage;
  }

  const nextAssets = [
    `./${nextPage}.html`,
    `./_PICTURES/${nextPage}-bg.png`,
    `./_PICTURES/${nextPage}-icon.png`
  ];

  const routeConfidence =
    predictor?.confidence != null
      ? predictor.confidence
      : state.history.length > 1
      ? 0.9
      : 0.7;

  return { nextPage, nextAssets, routeConfidence };
}

// ============================================================================
// CHUNK PLAN + PREWARM PLAN — v25++
// ============================================================================
function computeChunkPlan(page, nextPage, chunkBias) {
  const currentPageChunks = getChunkProfileForPage(page, chunkBias);
  const nextPageChunks = getChunkProfileForPage(nextPage, chunkBias);

  return {
    currentPageChunks,
    nextPageChunks
  };
}

function computePrewarmPlan(nextAssets, nextPageChunks) {
  return {
    assets: nextAssets.slice(),
    chunks: nextPageChunks.slice()
  };
}

// ============================================================================
// SIGNAL + GENOME HINTS — v25++
// ============================================================================
function getSignalHints() {
  try {
    return {
      pulse: localStorage.getItem("PulseSignal_v27"),
      proof: localStorage.getItem("PulseProofSignal_v27"),
      port: localStorage.getItem("PulseSignalPort_v27")
    };
  } catch {
    return {};
  }
}

function getGenomeHints() {
  try {
    if (window.PulseGenome) {
      return window.PulseGenome.snapshot?.() || {};
    }
  } catch {}
  return {};
}

// ============================================================================
// MODULE PLAN — v27++
// ============================================================================
function computeModulePlan(analytics, predictor, oracle) {
  const moduleBiasFromAnalytics = analytics?.advantageHints?.moduleBias || "unknown";
  const moduleBiasFromOracle = oracle?.oracleHints?.moduleBias || "unknown";

  const stabilityScore =
    predictor?.modulePrediction?.stabilityScore ??
    analytics?.metrics?.module?.stabilityScore ??
    null;

  const hasMissingSubimports =
    predictor?.modulePrediction?.hasMissingSubimports ??
    analytics?.metrics?.module?.hasMissingSubimports ??
    null;

  const hasWrongTierExports =
    predictor?.modulePrediction?.hasWrongTierExports ??
    analytics?.metrics?.module?.hasWrongTierExports ??
    null;

  const hasGlobalExposureRisk =
    predictor?.modulePrediction?.hasGlobalExposureRisk ??
    analytics?.metrics?.module?.hasGlobalExposureRisk ??
    null;

  const hasChunkProfileAnomaly =
    predictor?.modulePrediction?.hasChunkProfileAnomaly ??
    analytics?.metrics?.module?.hasChunkProfileAnomaly ??
    null;

  // Final moduleBias resolution (deterministic)
  const moduleBias =
    moduleBiasFromOracle !== "unknown"
      ? moduleBiasFromOracle
      : moduleBiasFromAnalytics;

  return {
    moduleBias,
    stabilityScore,
    hasMissingSubimports,
    hasWrongTierExports,
    hasGlobalExposureRisk,
    hasChunkProfileAnomaly
  };
}

// ============================================================================
// FACTORY — ADVANTAGE + ROUTING + MEMORY + CHUNK + PREWARM + MODULE
// ============================================================================
export function pulseTouchAdvantageCortex() {
  const state = createAdvantageState();

  function recordPageVisit(page) {
    if (!page) return;
    state.history.push(page);
    if (state.history.length > MAX_HISTORY) state.history.shift();
  }

  function storePageSnapshot(page, data) {
    if (!page) return;
    state.pages[page] = { data, ts: Date.now() };
  }

  function getPageSnapshot(page) {
    return state.pages[page] || null;
  }

  // analyticsInput: { page, metrics, advantageHints }
  function compute(analyticsInput, predictor = null, oracle = null) {
    const page = analyticsInput?.page || "index";
    const metrics = analyticsInput?.metrics || {};
    const advantageHints = analyticsInput?.advantageHints || {};

    // 1) Route memory
    recordPageVisit(page);

    // 2) Base biases from Analytics
    let hydrationBias = advantageHints.hydrationBias || "safe";
    let animationBias = advantageHints.animationBias || "smooth";
    let chunkBias = advantageHints.chunkBias || "safe";

    // 3) Predictor influence
    if (predictor?.prediction?.nextMode === "fast") {
      chunkBias = "aggressive";
    }

    // 4) Oracle influence
    if (oracle?.presenceIntensity === "high") {
      hydrationBias = "full";
    } else if (oracle?.presenceIntensity === "low") {
      hydrationBias = "minimal";
    }

    if (oracle?.stability === "unstable") {
      animationBias = "reduced";
    }

    // 5) Module influence (v27++)
    const modulePlan = computeModulePlan(
      { metrics, advantageHints },
      predictor,
      oracle
    );

    if (modulePlan.moduleBias === "critical" || modulePlan.moduleBias === "unstable") {
      // When modules are unstable, bias toward safety
      chunkBias = "safe";
      hydrationBias = hydrationBias === "full" ? "safe" : hydrationBias;
      animationBias = "reduced";
    }

    // 6) Advantage score
    const hydrationScore =
      hydrationBias === "full" ? 0.4 :
      hydrationBias === "safe" ? 0.3 :
      hydrationBias === "minimal" ? 0.2 : 0.1;

    const animationScore =
      animationBias === "smooth" ? 0.3 :
      animationBias === "reduced" ? 0.2 : 0.1;

    const chunkScore =
      chunkBias === "aggressive" ? 0.3 : 0.2;

    const advantageScoreRaw = hydrationScore + animationScore + chunkScore;
    const advantageScore = Math.min(1, Math.max(0, advantageScoreRaw));

    // 7) Routing
    const routing = computeRouting(state, { page }, predictor);

    // 8) Chunk plan
    const chunkPlan = computeChunkPlan(page, routing.nextPage, chunkBias);

    // 9) Prewarm plan
    const prewarmPlan = computePrewarmPlan(
      routing.nextAssets,
      chunkPlan.nextPageChunks
    );

    // 10) Signal + Genome hints
    const signalHints = getSignalHints();
    const genomeHints = getGenomeHints();

    // 11) Snapshot
    const snapshot = getPageSnapshot(page);

    return {
      hydrationBias,
      animationBias,
      chunkBias,
      advantageScore,
      nextPage: routing.nextPage,
      nextAssets: routing.nextAssets,
      routeConfidence: routing.routeConfidence,
      history: state.history.slice(),
      snapshot,
      chunkPlan,
      prewarmPlan,
      signalHints,
      genomeHints,
      modulePlan
    };
  }

  return {
    meta: ORGAN_META_PulseTouchAdvantage,
    contract: ORGAN_CONTRACT_PulseTouchAdvantage,
    overlays: IMMORTAL_OVERLAYS_PulseTouchAdvantage,
    compute,
    snapshot: storePageSnapshot
  };
}
