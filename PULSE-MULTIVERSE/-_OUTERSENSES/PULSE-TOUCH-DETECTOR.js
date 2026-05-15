// ============================================================================
//  PULSE OS — OUTER SENSE ORGAN (v27++ IMMORTAL SKIN)
//  FILE: _OUTERSENSES/PULSE-TOUCH-DETECTOR-v27++.js
//  ORGAN: PulseTouchDetector
//  ROLE: Pure SKIN + Cookie Reader + IMMORTAL Router
//  NOTE: v27++ — Detector stays PURE. No module/import/export logic here.
//        But it exposes a soft surface for Predictor/Warmup to attach
//        pulseModuleRisk if they want.
// ============================================================================

// (Route history block unchanged — still IMMORTAL)
(function PulseTouchRouteHistory() {
  const DB_NAME = "PulseDB_v25";
  const STORE = "route_history";

  function openDB() {
    return new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, 1);
      req.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(STORE)) {
          db.createObjectStore(STORE, { keyPath: "id", autoIncrement: true });
        }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  async function getLastRoute(db) {
    return new Promise((resolve) => {
      const tx = db.transaction(STORE, "readonly");
      const store = tx.objectStore(STORE);
      const req = store.openCursor(null, "prev");
      req.onsuccess = (e) => {
        const cursor = e.target.result;
        resolve(cursor ? cursor.value.route : null);
      };
      req.onerror = () => resolve(null);
    });
  }

  async function addRoute(db, route) {
    return new Promise((resolve) => {
      const tx = db.transaction(STORE, "readwrite");
      const store = tx.objectStore(STORE);
      store.add({ route, ts: Date.now() });
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => resolve(false);
    });
  }

  async function trimHistory(db) {
    return new Promise((resolve) => {
      const tx = db.transaction(STORE, "readwrite");
      const store = tx.objectStore(STORE);
      const req = store.getAllKeys();
      req.onsuccess = () => {
        const keys = req.result;
        const excess = keys.length - 100;
        if (excess > 0) {
          for (let i = 0; i < excess; i++) store.delete(keys[i]);
        }
        resolve(true);
      };
      req.onerror = () => resolve(false);
    });
  }

  (async () => {
    try {
      const db = await openDB();
      const current = window.location.pathname;
      const last = await getLastRoute(db);

      if (current !== last) {
        await addRoute(db, current);
        await trimHistory(db);
      }

      window.__PULSE__ = window.__PULSE__ || {};
      window.__PULSE__.continuity = localStorage.getItem("pulse_continuity") || null;
      window.__PULSE__.routeHistoryIndexedDB = true;

    } catch (err) {
      console.warn("[PulseTouchDetector] IndexedDB route history failed:", err);
    }
  })();
})();

export const IMMORTAL_OVERLAYS_PulseTouchDetector = {
  drift: {
    allowed: false,
    notes: "Cookie parsing + schema semantics must remain stable."
  },
  pressure: {
    expectedLoad: "high",
    notes: "Runs on every edge request; must stay cheap."
  },
  stability: {
    uiLayout: "none",
    semantics: "stable",
    notes: "Only additive evolution allowed; existing fields must not change meaning."
  },
  load: {
    maxComponents: 1,
    notes: "Single skinState object per request."
  },
  chunking: {
    prewarm: [],
    cacheKey: "pulsetouch.detector.skinstate.v25"
  },
  worldLens: {
    awareOfWorlds: false
  },
  limbic: {
    band: "clinical_safety"
  },
  triHeart: {
    cognitive: "normalize_touch_state",
    emotional: "never_guess",
    behavioral: "feed_downstream_organs"
  },
  impulseSpeed: {
    primaryAction: "detect_pulse_touch",
    latencyTargetMs: 1
  },
  healingSurfaces: {
    enabled: false
  }
};
// ============================================================================
//  META / CONTRACT / OVERLAYS — v27++
// ============================================================================

export const AI_EXPERIENCE_META_PulseTouchDetector = {
  id: "pulsetouch.detector",
  kind: "edge_skin",
  version: "v27++-IMMORTAL",
  role: "Pulse‑Touch skin signal reader",
  surfaces: {
    band: ["touch", "edge", "skin", "fastlane", "advantage", "routing"],
    wave: ["clinical", "precise", "sensory"],
    binary: ["cookie_present", "cookie_missing"],
    presence: ["touch_state", "region_hint", "mode_hint"],
    advantage: [
      "safe_defaults",
      "schema_stable",
      "fastlane_hints",
      "continuous_pulse_hints",
      "hydration_tier_hints",
      "animation_tier_hints",
      "chunk_profile_hints",
      "presence_intensity_hints",

      // v27++ — soft surface for Predictor/Warmup
      "module_risk_hint"
    ],
    speed: "instant_compute"
  }
};

export const ORGAN_META_PulseTouchDetector = {
  id: "organ.pulsetouch.detector",
  organism: "PulseTouch",
  layer: "edge.skin",
  tier: "IMMORTAL",
  evoFlags: {
    deterministic: true,
    driftProof: true,
    safeDefaults: true,
    schemaStable: true,
    presenceAware: true,
    regionAware: true,
    trustAware: true,
    identityHintAware: true,
    dualBandAware: true,
    chunkProfileAware: true,
    pageHintAware: true,
    warmupAware: true,
    prePulseAware: true,
    preflightAware: true,
    hydrationTierAware: true,
    animationTierAware: true,
    advantageRouting: true,
    regionClusterAware: true,
    modeAware: true,
    presenceIntensityAware: true,
    cookieVersionAware: true,
    cookieIntegrityAware: true,
    cookieEvolutionAware: true,
    pulseStreamAware: true,
    fastLaneAware: true,
    temporalHintAware: true,

    // v27++ — Detector does NOT detect module issues,
    // but it ALLOWS module_risk to be attached by Predictor/Warmup.
    moduleRiskAware: true
  }
};

export const ORGAN_CONTRACT_PulseTouchDetector = {
  inputs: { event: "edge request event with headers" },
  outputs: {
    skinState: "normalized pulse_touch state object (v27++ schema)"
  },
  guarantees: {
    deterministic: true,
    noNetwork: true,
    noSideEffects: true,
    zeroPII: true,
    zeroTracking: true,
    zeroGuessing: true,
    zeroAssumptions: true
  }
};

// ============================================================================
// HELPERS — unchanged (IMMORTAL)
// ============================================================================

function safeNumber(str, fallback = null) {
  const n = Number(str);
  return Number.isFinite(n) ? n : fallback;
}

function parseCookieHeader(cookieHeader) {
  if (!cookieHeader || typeof cookieHeader !== "string") return null;
  const raw = cookieHeader.split("; ").find((c) => c.startsWith("pulse_touch="));
  if (!raw) return null;

  const value = raw.replace("pulse_touch=", "");
  const parts = value.split("|");

  const parsed = {};
  for (const part of parts) {
    const [k, v] = part.split("=");
    if (k) parsed[k] = v;
  }
  return parsed;
}

function derivePresenceIntensity(presence) {
  switch (presence) {
    case "high":
    case "engaged": return "high";
    case "low":
    case "idle": return "low";
    default: return "medium";
  }
}

function deriveRegionCluster(region) {
  switch (region) {
    case "us":
    case "us-east":
    case "us-west": return "clusterA";
    case "eu":
    case "eu-west":
    case "eu-central": return "clusterB";
    case "apac":
    case "asia": return "clusterC";
    default: return "clusterUnknown";
  }
}

function deriveHydrationTier(h) {
  return h === "minimal" || h === "low" ? "minimal" :
         h === "full" ? "full" : "safe";
}

function deriveAnimationTier(a) {
  return a === "none" || a === "reduced" ? "reduced" : "smooth";
}

function deriveMode(m) {
  return m === "fast" || m === "turbo" ? "fast" : "safe";
}

function deriveTrustLevel(t) {
  return t === "2" ? "trusted" :
         t === "1" ? "suspicious" : "unknown";
}

function deriveCookieIntegrity(parsed) {
  const required = ["region", "mode", "presence", "page"];
  const missing = required.filter((k) => !parsed[k]);
  return missing.length === 0 ? "intact" :
         missing.length <= 2 ? "partial" : "unknown";
}

// ============================================================================
// COOKIE DETECTION — v27++ IMMORTAL
// ============================================================================

// ============================================================================
// COOKIE DETECTION — v27++ IMMORTAL (UPGRADED MODULE RISK SURFACE)
// ============================================================================

export function detectPulseTouch(event) {
  const headers = event?.headers || {};
  const cookieHeader =
    headers.cookie ||
    headers.Cookie ||
    headers.COOKIE ||
    "";

  const parsed = parseCookieHeader(cookieHeader);
  if (!parsed) return defaultPulseTouchState();

  const version = parsed.v || parsed.version || "0";
  const presence = parsed.presence || "unknown";
  const pulseStream = parsed.pulseStream || "continuous";
  const fastLane = parsed.fastLane || "enabled";
  const mode = deriveMode(parsed.mode || "fast");
  const region = parsed.region || "unknown";

  const hydration = parsed.hydration || "auto";
  const animation = parsed.animation || "auto";

  const presenceIntensity = derivePresenceIntensity(presence);
  const regionCluster = deriveRegionCluster(region);
  const hydrationTier = deriveHydrationTier(hydration);
  const animationTier = deriveAnimationTier(animation);
  const trustLevel = deriveTrustLevel(parsed.trusted || "0");
  const integrity = parsed.integrity || deriveCookieIntegrity(parsed);

  const originTs = safeNumber(parsed.originTs, null);
  const lastPulseTs = safeNumber(parsed.lastPulseTs, null);

  // v27++ — module risk can be hinted via cookie, then refined by Warmup/Security/Predictor
  const pulseModuleRisk = deriveInitialModuleRiskFromCookie(parsed);

  return {
    region,
    trusted: parsed.trusted || "0",
    trustLevel,
    mode,
    presence,
    presenceIntensity,
    identity: parsed.identity || "anon",
    v: version,

    page: parsed.page || "index",
    chunkProfile: parsed.chunkProfile || "default",
    integrity,
    band: parsed.band || "dual",
    pulse: parsed.pulse || "early",
    evo: parsed.evo || "IMMORTAL",
    warmup: parsed.warmup || "auto",
    hydration,
    hydrationTier,
    animation,
    animationTier,

    pulseStream,
    fastLane,
    pulseOrigin: parsed.pulseOrigin || "edge",

    originTs,
    lastPulseTs,

    regionCluster,

    // v27++ soft surface — now structured, not null
    pulseModuleRisk
  };
}

export function defaultPulseTouchState() {
  const region = "unknown";
  const presence = "unknown";
  const mode = "fast";

  const presenceIntensity = derivePresenceIntensity(presence);
  const regionCluster = deriveRegionCluster(region);
  const hydration = "auto";
  const animation = "auto";

  return {
    region,
    trusted: "0",
    trustLevel: "unknown",
    mode,
    presence,
    presenceIntensity,
    identity: "anon",
    v: "0",

    page: "index",
    chunkProfile: "default",
    integrity: "unknown",
    band: "dual",
    pulse: "early",
    evo: "IMMORTAL",
    warmup: "auto",
    hydration,
    hydrationTier: deriveHydrationTier(hydration),
    animation,
    animationTier: deriveAnimationTier(animation),

    pulseStream: "continuous",
    fastLane: "enabled",
    pulseOrigin: "edge",
    originTs: null,
    lastPulseTs: null,

    regionCluster,

    // v27++ soft surface — safe default, no risk
    pulseModuleRisk: {
      hasMissingSubimports: false,
      hasWrongTierExports: false,
      hasGlobalExposureRisk: false,
      hasChunkProfileAnomaly: false,
      score: 0,
      source: "none"
    }
  };
}

// ============================================================================
// v27++ MODULE RISK DERIVATION FROM COOKIE (SOFT CONTRACT)
// ============================================================================
//
// This is intentionally conservative and optional: if the cookie never
// encodes these fields, we stay at "no risk" and let Warmup/Security
// populate richer hints later.
//
function deriveInitialModuleRiskFromCookie(parsed) {
  if (!parsed || typeof parsed !== "object") {
    return {
      hasMissingSubimports: false,
      hasWrongTierExports: false,
      hasGlobalExposureRisk: false,
      hasChunkProfileAnomaly: false,
      score: 0,
      source: "none"
    };
  }

  // Soft cookie hints (all optional, future‑proof)
  const hasMissingSubimports = parsed.moduleMissingSubimports === "1";
  const hasWrongTierExports = parsed.moduleWrongTierExports === "1";
  const hasGlobalExposureRisk = parsed.moduleGlobalExposureRisk === "1" || hasWrongTierExports;
  const hasChunkProfileAnomaly = parsed.moduleChunkProfileAnomaly === "1";

  let score = 0;
  if (hasMissingSubimports) score += 10;
  if (hasWrongTierExports) score += 10;
  if (hasGlobalExposureRisk) score += 5;
  if (hasChunkProfileAnomaly) score += 5;

  return {
    hasMissingSubimports,
    hasWrongTierExports,
    hasGlobalExposureRisk,
    hasChunkProfileAnomaly,
    score,
    source: score > 0 ? "cookie_hint" : "none"
  };
}


// ============================================================================
// IMMORTAL ROUTER CALLBACKS — unchanged
// ============================================================================

export function PulseTouchDetector() {
  return {
    meta: ORGAN_META_PulseTouchDetector,
    contract: ORGAN_CONTRACT_PulseTouchDetector,
    overlays: IMMORTAL_OVERLAYS_PulseTouchDetector,
    detect: detectPulseTouch,
    defaultState: defaultPulseTouchState,

    onMapReady(evt) {
      try { localStorage.setItem("PulseOrganismMap_v25", JSON.stringify(evt.map)); } catch {}
      window.__PULSE_TOUCH__?.onDetectorUpdate?.({
        type: evt.type || "map_ready",
        map: evt.map,
        page: evt.page,
        prefix: evt.prefix
      });
    },

    onChunksReady(evt) {
      try { localStorage.setItem("PulseChunks_v25", JSON.stringify(evt.chunks)); } catch {}
      window.__PULSE_TOUCH__?.onDetectorUpdate?.({
        type: evt.type || "chunks_ready",
        chunks: evt.chunks
      });
    },

    onNormalizerReady(evt) {
      try { localStorage.setItem("PulseNormalizer_v25", JSON.stringify(evt.normalizer)); } catch {}
      window.__PULSE_TOUCH__?.onDetectorUpdate?.({
        type: evt.type || "normalizer_ready",
        normalizer: evt.normalizer
      });
    }
  };
}
