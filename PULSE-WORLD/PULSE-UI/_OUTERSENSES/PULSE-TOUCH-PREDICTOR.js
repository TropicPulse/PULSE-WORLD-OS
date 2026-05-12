// ============================================================================
//  PULSE OS — OUTER SENSE ORGAN
//  FILE: _OUTERSENSES/PULSE-TOUCH-PREDICTOR-v25++.js
//  ORGAN: PulseTouchPredictor (v25++ IMMORTAL)
//  ROLE: Temporal + Structural Prediction / FastLane Pre‑Sense / Route Graph
// ============================================================================

export const AI_EXPERIENCE_META_PulseTouchPredictor = {
  id: "pulsetouch.predictor",
  kind: "outer_sense",
  version: "v25++-IMMORTAL",
  role: "temporal_structural_predictor",
  surfaces: {
    band: ["prediction", "fastlane", "temporal", "structural", "routing"],
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
    regionAware: true
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
    structural: "Structural route prediction details"
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
// HELPERS — v25++
// ============================================================================

function extractPageRoutesFromDOM() {
  if (typeof document === "undefined") return [];

  const routes = new Set();

  document.querySelectorAll("a[href], button[data-route], [data-route]").forEach((el) => {
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

// ============================================================================
// FACTORY — v25++ IMMORTAL
// ============================================================================

export function PulseTouchPredictor() {
  function predict({ pulseTouch, history = [], analytics = {}, advantage = {}, organismMap = null }) {
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

    // 2) Structural prediction (NEW)
    const domRoutes = extractPageRoutesFromDOM();
    const structuralNext = pickStructuralRoute(domRoutes, organismMap, currentPage);

    // 3) Advantage Cortex nextPage (if available)
    const cortexNext = advantage?.nextPage || null;

    // 4) Portal warmup nextPage (if available)
    const portalNext = analytics?.metrics?.portalWarm || null;

    // 5) Final deterministic nextPage
    const nextPage =
      structuralNext ||
      cortexNext ||
      portalNext ||
      currentPage;

    // 6) Confidence scoring
    let confidence = 0.5;
    if (structuralNext) confidence = 0.95;
    else if (cortexNext) confidence = 0.85;
    else if (history.length > 0) confidence = 0.7;

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
