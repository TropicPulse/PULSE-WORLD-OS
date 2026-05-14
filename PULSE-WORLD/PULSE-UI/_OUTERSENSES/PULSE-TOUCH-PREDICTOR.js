// ============================================================================
//  PULSE OS — OUTER SENSE ORGAN
//  FILE: _OUTERSENSES/PULSE-TOUCH-PREDICTOR-v27++.js
//  ORGAN: PulseTouchPredictor (v27++ IMMORTAL)
//  ROLE: Temporal + Structural + Module Health Prediction / FastLane Pre‑Sense
// ============================================================================
import { PulseSignalPort } from "../../PULSE-BAND/PULSE-FINALITY/PULSE-FINALITY-PORT.js";

export const AI_EXPERIENCE_META_PulseTouchPredictor = {
  id: "pulsetouch.predictor",
  kind: "outer_sense",
  version: "v27++-IMMORTAL",
  role: "temporal_structural_module_predictor",
  surfaces: {
    band: ["prediction", "fastlane", "temporal", "structural", "routing", "module"],
    wave: ["quiet", "background", "deterministic"],
    presence: ["prediction_state"],
    speed: "sync"
  }
};

export const ORGAN_META_PulseTouchPredictor = {
  id: "organ.pulsetouch.predictor",
  organism: "PulseTouch",
  layer: "outer_sense.temporal",
  tier: "IMMORTAL",
  evoFlags: {
    deterministic: true,
    driftProof: true,
    asyncSafe: true,
    zeroPII: true,
    zeroTracking: true,
    fastLaneAware: true,
    temporalHintAware: true,
    structuralAware: true,
    routeGraphAware: true,
    chunkPlanAware: true,
    warmupAware: true,
    portalAware: true,
    presenceAware: true,
    regionAware: true,

    // v27++
    moduleAware: true,
    pulseImportAware: true,
    pulseExportAware: true,
    subimportAware: true,
    tierAware: true
  }
};

export const ORGAN_CONTRACT_PulseTouchPredictor = {
  inputs: {
    pulseTouch: "Pulse‑Touch skinState",
    history: "Optional prior pulse events",
    analytics: "PulseTouchAnalytics metrics",
    advantage: "Advantage Cortex view",
    organismMap: "PulseOrganismMap route graph (optional)"
  },
  outputs: {
    prediction: "Predicted next page / mode / presence / pulseStream",
    confidence: "0–1 numeric confidence",
    structural: "Structural route prediction details",

    // v27++
    modulePrediction: "Module health + import/export/subimport stability prediction"
  },
  guarantees: {
    deterministic: true,
    noNetwork: true,
    noSideEffects: true
  }
};

export const IMMORTAL_OVERLAYS_PulseTouchPredictor = {
  drift: { allowed: false },
  pressure: { expectedLoad: "low" },
  stability: { semantics: "stable" },
  load: { maxComponents: 1 }
};

// ============================================================================
// HELPERS — v27++
// ============================================================================

function extractPageRoutesFromDOM() {
  if (typeof document === "undefined") return [];

  const routes = new Set();

  document
    .querySelectorAll("a[href], button[data-route], [data-route]")
    .forEach((el) => {
      const href = el.getAttribute("href") || el.getAttribute("data-route");

      if (!href) return;

      // ignore external
      if (href.startsWith("http")) return;
      if (href.startsWith("mailto:")) return;
      if (href.startsWith("tel:")) return;

      // normalize
      const clean = href.replace("./", "").replace("/", "").replace(".html", "");
      if (clean) routes.add(clean);
    });

  return [...routes];
}

function pickStructuralRoute(domRoutes, organismMap, currentPage) {
  if (!domRoutes.length) return null;

  // If organismMap exists, filter to valid next nodes
  if (organismMap?.routes?.[currentPage]) {
    const validNext = organismMap.routes[currentPage];
    const intersection = domRoutes.filter((r) => validNext.includes(r));
    if (intersection.length === 1) return intersection[0];
    if (intersection.length > 1) return intersection[0]; // deterministic pick
  }

  // fallback: deterministic pick
  return domRoutes[0];
}

// Module health prediction from warmup cache / skinState
function predictModuleHealth(pulseTouch) {
  const page = pulseTouch?.page || "index";

  let source = "none";
  let hasMissingSubimports = false;
  let hasWrongTierExports = false;
  let hasGlobalExposureRisk = false;
  let hasChunkProfileAnomaly = false;
  let stabilityScore = 1.0; // 1 = fully stable, 0 = very unstable

  // 1) Prefer explicit hint on skinState (if Security or Warmup wrote it)
  const explicit = pulseTouch?.pulseModuleRisk;
  if (explicit && typeof explicit === "object") {
    hasMissingSubimports = !!explicit.hasMissingSubimports;
    hasWrongTierExports = !!explicit.hasWrongTierExports;
    hasGlobalExposureRisk = !!explicit.hasGlobalExposureRisk;
    hasChunkProfileAnomaly = !!explicit.hasChunkProfileAnomaly;
    source = "skinState";

    const penalty =
      (hasMissingSubimports ? 0.3 : 0) +
      (hasWrongTierExports ? 0.3 : 0) +
      (hasGlobalExposureRisk ? 0.2 : 0) +
      (hasChunkProfileAnomaly ? 0.2 : 0);

    stabilityScore = Math.max(0, 1 - penalty);
    return {
      page,
      source,
      hasMissingSubimports,
      hasWrongTierExports,
      hasGlobalExposureRisk,
      hasChunkProfileAnomaly,
      stabilityScore
    };
  }

  // 2) Look into PulseImportWarmupCache (if Warmup ran)
  try {
    if (typeof window !== "undefined" && window.PulseImportWarmupCache) {
      const entry = window.PulseImportWarmupCache[page];
      if (entry && typeof entry === "object") {
        const missingCount = Array.isArray(entry.subimportValidation?.missing)
          ? entry.subimportValidation.missing.length
          : 0;

        const wrongTierExportsCount = Array.isArray(entry.exportsMeta)
          ? entry.exportsMeta.filter(
              (e) => e.tier === "global" || e.tier === "system"
            ).length
          : 0;

        hasMissingSubimports = missingCount > 0;
        hasWrongTierExports = wrongTierExportsCount > 0;
        hasGlobalExposureRisk = hasWrongTierExports;
        hasChunkProfileAnomaly = false; // reserved for future chunkProfile checks
        source = "warmup_cache";

        const penalty =
          (hasMissingSubimports ? 0.3 : 0) +
          (hasWrongTierExports ? 0.3 : 0) +
          (hasGlobalExposureRisk ? 0.2 : 0);

        stabilityScore = Math.max(0, 1 - penalty);

        return {
          page,
          source,
          hasMissingSubimports,
          hasWrongTierExports,
          hasGlobalExposureRisk,
          hasChunkProfileAnomaly,
          stabilityScore
        };
      }
    }
  } catch {
    // silent
  }

  // 3) Default: assume stable if we know nothing
  return {
    page,
    source,
    hasMissingSubimports,
    hasWrongTierExports,
    hasGlobalExposureRisk,
    hasChunkProfileAnomaly,
    stabilityScore
  };
}

// ============================================================================
// FACTORY — v27++ IMMORTAL
// ============================================================================

export function PulseTouchPredictor() {
  function predict({
    pulseTouch,
    history = [],
    analytics = {},
    advantage = {},
    organismMap = null
  }) {
    const mode = pulseTouch?.mode || "safe";
    const presence = pulseTouch?.presence || "unknown";
    const pulseStream = pulseTouch?.pulseStream || "single";
    const currentPage = pulseTouch?.page || "index";

    // 1) Temporal prediction (old behavior)
    const temporalPrediction = {
      nextMode: mode,
      nextPresence: presence,
      nextPulseStream: pulseStream
    };

    // 2) Structural prediction
    const domRoutes = extractPageRoutesFromDOM();
    const structuralNext = pickStructuralRoute(domRoutes, organismMap, currentPage);

    // 3) Advantage Cortex nextPage (if available)
    const cortexNext = advantage?.nextPage || null;

    // 4) Portal warmup nextPage (if available)
    const portalNext = analytics?.metrics?.portalWarm || null;

    // 5) Final deterministic nextPage
    const nextPage = structuralNext || cortexNext || portalNext || currentPage;

    // 6) Module health prediction (the “detector” you wanted)
    const modulePrediction = predictModuleHealth(pulseTouch);

    // 7) Confidence scoring
    let confidence = 0.5;
    if (structuralNext) confidence = 0.95;
    else if (cortexNext) confidence = 0.85;
    else if (history.length > 0) confidence = 0.7;

    // Slightly reduce confidence if module looks unstable
    if (modulePrediction.stabilityScore < 0.7) {
      confidence = Math.max(0.3, confidence - 0.15);
    }

    return {
      prediction: {
        nextPage,
        nextMode: temporalPrediction.nextMode,
        nextPresence: temporalPrediction.nextPresence,
        nextPulseStream: temporalPrediction.nextPulseStream
      },
      structural: {
        domRoutes,
        structuralNext,
        cortexNext,
        portalNext
      },
      modulePrediction,
      confidence
    };
  }

  return {
    meta: ORGAN_META_PulseTouchPredictor,
    contract: ORGAN_CONTRACT_PulseTouchPredictor,
    overlays: IMMORTAL_OVERLAYS_PulseTouchPredictor,
    predict
  };
}
