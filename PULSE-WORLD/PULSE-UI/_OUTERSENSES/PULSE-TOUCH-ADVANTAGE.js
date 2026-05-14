// ============================================================================
//  PULSE OS — INNER‑PLUS ORGAN
//  FILE: PULSE-TOUCH-ADVANTAGE-v27++-BINARY-INTEL.js
//  ORGAN: pulseTouchAdvantageCortex (v27++ IMMORTAL, Binary‑Aware, Storage‑Aware)
// ============================================================================

import { PulseTouchStorage } from "./PULSE-TOUCH-STORAGE.js";

export const AI_EXPERIENCE_META_PulseTouchAdvantage = {
  id: "pulsetouch.advantage",
  kind: "inner_plus",
  version: "v27++-IMMORTAL-BINARY-INTEL",
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
      "module",
      "binary",
      "storage"
    ],
    wave: ["quiet", "adaptive"],
    presence: ["advantage_state", "routing_state", "memory_state", "binary_state"],
    speed: "sync"
  },
  evo: {
    binaryAware: true,
    pulseBinaryAware: true,
    storageAware: true
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
    tierAware: true,

    // v27++ BINARY
    binaryAware: true,
    pulseBinaryAware: true,

    // v27++ STORAGE
    storageAware: true,
    indexedDBAware: true
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
    binaryBias: "cold | normal | hot | critical",
    advantageScore: "0–1 numeric score",
    nextPage: "predicted next page",
    nextAssets: "string[] assets to preload",
    routeConfidence: "0–1 numeric confidence",
    history: "string[] of visited pages (local, capped)",
    snapshot: "optional page snapshot for current page",
    chunkPlan: "chunk plan for current + next page",
    prewarmPlan: "prewarm plan (assets + chunks)",
    binaryPlan: "binary lanes + assets to keep hot/prewarm",
    signalHints: "PulseSignal hints",
    genomeHints: "PulseGenome hints",
    modulePlan: "module‑aware plan (biases + stability)",

    // v27++ STORAGE
    storageFrameKey: "binary key used for last advantage frame (optional)"
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
// BINARY LANES / PROFILES — v27++ BINARY‑AWARE
// ============================================================================

const BINARY_PROFILES = {
  index: {
    cold: [],
    normal: ["index-shell.bin"],
    hot: ["index-shell.bin", "index-hero.bin"],
    critical: ["index-shell.bin", "index-hero.bin", "index-aboveFold.bin"]
  },
  dashboard: {
    cold: [],
    normal: ["dashboard-shell.bin"],
    hot: ["dashboard-shell.bin", "dashboard-summary.bin"],
    critical: ["dashboard-shell.bin", "dashboard-summary.bin", "dashboard-charts.bin"]
  },
  scanner: {
    cold: [],
    normal: ["scanner-shell.bin"],
    hot: ["scanner-shell.bin", "scanner-engine.bin"],
    critical: ["scanner-shell.bin", "scanner-engine.bin", "scanner-history.bin"]
  },
  rewards: {
    cold: [],
    normal: ["rewards-shell.bin"],
    hot: ["rewards-shell.bin", "rewards-cards.bin"],
    critical: ["rewards-shell.bin", "rewards-cards.bin", "rewards-history.bin"]
  },
  profile: {
    cold: [],
    normal: ["profile-shell.bin"],
    hot: ["profile-shell.bin", "profile-settings.bin"],
    critical: ["profile-shell.bin", "profile-settings.bin", "profile-history.bin"]
  }
};

function getBinaryProfileForPage(page, binaryBias) {
  const key = page || "index";
  const profile = BINARY_PROFILES[key] || BINARY_PROFILES.index;
  const lane = binaryBias || "normal";
  return profile[lane] || profile.normal;
}

// ============================================================================
// ROUTING LOGIC — v27++ (uses Predictor when available)
// ============================================================================

function computeRouting(state, analytics, predictor) {
  const currentPage = analytics?.page || "index";

  const predictorNext = predictor?.prediction?.nextPage || null;
  let nextPage = predictorNext || currentPage;

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
// BINARY PLAN — v27++ BINARY‑AWARE
// ============================================================================

function computeBinaryBias(metrics = {}, advantageHints = {}, oracle = null) {
  const hintBias = advantageHints.binaryBias;
  if (
    hintBias === "cold" ||
    hintBias === "normal" ||
    hintBias === "hot" ||
    hintBias === "critical"
  ) {
    return hintBias;
  }

  const m = metrics.binary || {};
  const load = typeof m.load === "number" ? m.load : null;
  const errorRate = typeof m.errorRate === "number" ? m.errorRate : null;

  if (oracle?.binaryRiskView?.riskBand === "high") return "critical";
  if (oracle?.binaryRiskView?.riskBand === "medium") return "hot";

  if (errorRate != null && errorRate > 0.2) return "cold";
  if (load == null) return "normal";
  if (load >= 0.9) return "critical";
  if (load >= 0.6) return "hot";
  if (load >= 0.3) return "normal";
  return "cold";
}

function computeBinaryPlan(page, nextPage, binaryBias) {
  const currentPageBinary = getBinaryProfileForPage(page, binaryBias);
  const nextPageBinary = getBinaryProfileForPage(nextPage, binaryBias);

  return {
    binaryBias,
    currentPageBinary,
    nextPageBinary
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
// STORAGE INTEGRATION — PULSE‑TOUCH STORAGE (BINARY INDEXEDDB)
// ============================================================================

function encodeAdvantageFrameKey(page, ts) {
  const keyStr = `adv:${page || "index"}:${ts}`;
  return new TextEncoder().encode(keyStr);
}

function encodeAdvantageFrameValue(frame) {
  const {
    page,
    advantageScore,
    hydrationBias,
    animationBias,
    chunkBias,
    binaryBias,
    nextPage,
    routeConfidence,
    modulePlan
  } = frame;

  const valueStr = [
    page || "index",
    advantageScore.toFixed(3),
    hydrationBias,
    animationBias,
    chunkBias,
    binaryBias,
    nextPage || "index",
    routeConfidence.toFixed(3),
    modulePlan?.moduleBias || "unknown"
  ].join("|");

  return new TextEncoder().encode(valueStr);
}

function writeAdvantageFrameToStorage(page, frame) {
  try {
    const storageOrgan = PulseTouchStorage?.();
    if (!storageOrgan || typeof storageOrgan.put !== "function") return;

    const ts = Date.now();
    const key = encodeAdvantageFrameKey(page, ts);
    const value = encodeAdvantageFrameValue({ page, ...frame });

    // Fire‑and‑forget to keep compute() sync by contract
    void (async () => {
      try {
        await storageOrgan.put("analytics", key, value);
      } catch {
        // silent by contract
      }
    })();

    return key;
  } catch {
    return null;
  }
}

// ============================================================================
// FACTORY — ADVANTAGE + ROUTING + MEMORY + CHUNK + PREWARM + MODULE + BINARY
//           + BINARY INDEXEDDB STORAGE (IMMORTAL)
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

    recordPageVisit(page);

    let hydrationBias = advantageHints.hydrationBias || "safe";
    let animationBias = advantageHints.animationBias || "smooth";
    let chunkBias = advantageHints.chunkBias || "safe";

    if (predictor?.prediction?.nextMode === "fast") {
      chunkBias = "aggressive";
    }

    if (oracle?.presenceIntensity === "high") {
      hydrationBias = "full";
    } else if (oracle?.presenceIntensity === "low") {
      hydrationBias = "minimal";
    }

    if (oracle?.stability === "unstable") {
      animationBias = "reduced";
    }

    const modulePlan = computeModulePlan(
      { metrics, advantageHints },
      predictor,
      oracle
    );

    if (modulePlan.moduleBias === "critical" || modulePlan.moduleBias === "unstable") {
      chunkBias = "safe";
      hydrationBias = hydrationBias === "full" ? "safe" : hydrationBias;
      animationBias = "reduced";
    }

    const binaryBias = computeBinaryBias(metrics, advantageHints, oracle);

    const hydrationScore =
      hydrationBias === "full"
        ? 0.4
        : hydrationBias === "safe"
        ? 0.3
        : hydrationBias === "minimal"
        ? 0.2
        : 0.1;

    const animationScore =
      animationBias === "smooth"
        ? 0.3
        : animationBias === "reduced"
        ? 0.2
        : 0.1;

    const chunkScore = chunkBias === "aggressive" ? 0.3 : 0.2;

    const binaryScore =
      binaryBias === "critical"
        ? 0.3
        : binaryBias === "hot"
        ? 0.25
        : binaryBias === "normal"
        ? 0.2
        : 0.1;

    const advantageScoreRaw =
      hydrationScore + animationScore + chunkScore + binaryScore;
    const advantageScore = Math.min(1, Math.max(0, advantageScoreRaw));

    const routing = computeRouting(state, { page }, predictor);

    const chunkPlan = computeChunkPlan(page, routing.nextPage, chunkBias);

    const prewarmPlan = computePrewarmPlan(
      routing.nextAssets,
      chunkPlan.nextPageChunks
    );

    const binaryPlan = computeBinaryPlan(page, routing.nextPage, binaryBias);

    const signalHints = getSignalHints();
    const genomeHints = getGenomeHints();

    const snapshot = getPageSnapshot(page);

    const frame = {
      hydrationBias,
      animationBias,
      chunkBias,
      binaryBias,
      advantageScore,
      nextPage: routing.nextPage,
      routeConfidence: routing.routeConfidence,
      modulePlan
    };

    const storageFrameKey = writeAdvantageFrameToStorage(page, frame);

    return {
      hydrationBias,
      animationBias,
      chunkBias,
      binaryBias,
      advantageScore,
      nextPage: routing.nextPage,
      nextAssets: routing.nextAssets,
      routeConfidence: routing.routeConfidence,
      history: state.history.slice(),
      snapshot,
      chunkPlan,
      prewarmPlan,
      binaryPlan,
      signalHints,
      genomeHints,
      modulePlan,
      storageFrameKey
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
