// ============================================================================
//  PULSE OS — OUTER SENSE ORGAN (UPGRADED v25++ IMMORTAL ROUTER)
//  FILE: _OUTERSENSES/PULSE-TOUCH-DETECTOR-v25++.js
//  ORGAN: PulseTouchDetector (v25++ IMMORTAL)
//  ROLE: Edge SKIN + Cookie Reader + IMMORTAL ROUTER
// ============================================================================
// ============================================================================
// PulseTouchDetector — Route History (IndexedDB v25++)
// ============================================================================

(function PulseTouchRouteHistory() {

  const DB_NAME = "PulseDB_v25";
  const STORE = "route_history";

  // Open or create IndexedDB
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

  // Read last route
  async function getLastRoute(db) {
    return new Promise((resolve) => {
      const tx = db.transaction(STORE, "readonly");
      const store = tx.objectStore(STORE);

      const req = store.openCursor(null, "prev"); // last entry
      req.onsuccess = (e) => {
        const cursor = e.target.result;
        resolve(cursor ? cursor.value.route : null);
      };
      req.onerror = () => resolve(null);
    });
  }

  // Add new route
  async function addRoute(db, route) {
    return new Promise((resolve) => {
      const tx = db.transaction(STORE, "readwrite");
      const store = tx.objectStore(STORE);
      store.add({ route, ts: Date.now() });
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => resolve(false);
    });
  }

  // Trim to last 100 entries
  async function trimHistory(db) {
    return new Promise((resolve) => {
      const tx = db.transaction(STORE, "readwrite");
      const store = tx.objectStore(STORE);

      const req = store.getAllKeys();
      req.onsuccess = () => {
        const keys = req.result;
        const excess = keys.length - 100;
        if (excess > 0) {
          for (let i = 0; i < excess; i++) {
            store.delete(keys[i]);
          }
        }
        resolve(true);
      };
      req.onerror = () => resolve(false);
    });
  }

  // MAIN EXECUTION
  (async () => {
    try {
      const db = await openDB();
      const current = window.location.pathname;
      const last = await getLastRoute(db);

      // CSS-style merge
      if (current !== last) {
        await addRoute(db, current);
        await trimHistory(db);
      }

      // Expose to Pulse
      window.__PULSE__ = window.__PULSE__ || {};
      window.__PULSE__.continuity = localStorage.getItem("pulse_continuity") || null;
      window.__PULSE__.routeHistoryIndexedDB = true;

    } catch (err) {
      console.warn("[PulseTouchDetector] IndexedDB route history failed:", err);
    }
  })();

})();

export const AI_EXPERIENCE_META_PulseTouchDetector = {
  id: "pulsetouch.detector",
  kind: "edge_skin",
  version: "v25++-IMMORTAL",
  role: "Pulse‑Touch skin signal reader + IMMORTAL router",
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
      "presence_intensity_hints"
    ],
    speed: "instant_compute"
  },
  routes: {
    warmup: "pulsetouch.warmup",
    security: "pulsetouch.security",
    gate: "pulsetouch.gate",
    advantage: "pulsetouch.advantage"
  },
  consumers: [
    "PulseTouchWarmup",
    "PulseTouchSecurity",
    "PulseTouchGate",
    "PulseTouchAdvantageCortex",
    "PulseTouchPreflight",
    "PulseTouchChunkEngine",
    "PulseTouchAnalytics"
  ],
  invariants: {
    networkCalls: "none",
    sideEffects: "none",
    determinism: "strict",
    mutation: "forbidden_at_runtime"
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
    temporalHintAware: true
  },
  lineage: {
    family: "pulsetouch_skin",
    generation: 6,
    osVersion: "v25++",
    history: [
      "Pulse‑Touch v1 (Skin Hint)",
      "Pulse‑Touch v2 (Pre‑Pulse)",
      "Pulse‑Touch v3 (IMMORTAL Sensory Organ)",
      "Pulse‑Touch v14 (Immortal Advantage Skin)",
      "Pulse‑Touch v17 (Continuous FastLane Skin)",
      "Pulse‑Touch v24 (IMMORTAL++ Edge Skin)",
      "Pulse‑Touch v25++ (IMMORTAL Advantage Skin + Tiers)"
    ]
  }
};

export const ORGAN_CONTRACT_PulseTouchDetector = {
  inputs: {
    event: "edge request event with headers"
  },
  outputs: {
    skinState: "normalized pulse_touch state object (v25++ schema)"
  },
  consumers: [
    "PulseTouchWarmup",
    "PulseTouchSecurity",
    "PulseTouchGate",
    "PulseTouchAdvantageCortex",
    "PulseTouchPreflight",
    "PulseTouchChunkEngine",
    "PulseTouchAnalytics"
  ],
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
// HELPERS — v25++
// ============================================================================

function safeNumber(str, fallback = null) {
  if (str == null) return fallback;
  const n = Number(str);
  return Number.isFinite(n) ? n : fallback;
}

function parseCookieHeader(cookieHeader) {
  if (!cookieHeader || typeof cookieHeader !== "string") return null;
  const raw = cookieHeader
    .split("; ")
    .find((c) => c.startsWith("pulse_touch="));
  if (!raw) return null;

  const value = raw.replace("pulse_touch=", "");
  const parts = value.split("|");

  const parsed = {};
  for (const part of parts) {
    const [k, v] = part.split("=");
    if (!k) continue;
    parsed[k] = v;
  }
  return parsed;
}

function derivePresenceIntensity(presence) {
  switch (presence) {
    case "high":
    case "engaged":
      return "high";
    case "low":
    case "idle":
      return "low";
    default:
      return "medium";
  }
}

function deriveRegionCluster(region) {
  switch (region) {
    case "us":
    case "us-east":
    case "us-west":
      return "clusterA";
    case "eu":
    case "eu-west":
    case "eu-central":
      return "clusterB";
    case "apac":
    case "asia":
      return "clusterC";
    default:
      return "clusterUnknown";
  }
}

function deriveHydrationTier(hydration) {
  switch (hydration) {
    case "minimal":
    case "low":
      return "minimal";
    case "full":
      return "full";
    default:
      return "safe";
  }
}

function deriveAnimationTier(animation) {
  switch (animation) {
    case "none":
    case "reduced":
      return "reduced";
    default:
      return "smooth";
  }
}

function deriveMode(mode) {
  switch (mode) {
    case "fast":
    case "turbo":
      return "fast";
    case "safe":
    case "normal":
      return "safe";
    default:
      return "safe";
  }
}

function deriveTrustLevel(trusted) {
  if (trusted === "2") return "trusted";
  if (trusted === "1") return "suspicious";
  return "unknown";
}

function deriveCookieIntegrity(parsed) {
  const required = ["region", "mode", "presence", "page"];
  const missing = required.filter((k) => !parsed[k]);
  if (missing.length === 0) return "intact";
  if (missing.length <= 2) return "partial";
  return "unknown";
}

// ============================================================================
// COOKIE DETECTION — v25++ IMMORTAL
// ============================================================================

export function detectPulseTouch(event) {
  const headers = event?.headers || {};
  const cookieHeader =
    headers.cookie ||
    headers.Cookie ||
    headers.COOKIE ||
    "";

  const parsed = parseCookieHeader(cookieHeader);
  if (!parsed) {
    return defaultPulseTouchState();
  }

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

    regionCluster
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

    regionCluster
  };
}

// ============================================================================
// IMMORTAL ROUTER — NEW v25++
// ============================================================================

export function PulseTouchDetector() {
  return {
    meta: ORGAN_META_PulseTouchDetector,
    contract: ORGAN_CONTRACT_PulseTouchDetector,
    overlays: IMMORTAL_OVERLAYS_PulseTouchDetector,
    detect: detectPulseTouch,
    defaultState: defaultPulseTouchState,

    // ============================================================
    // NEW IMMORTAL ROUTER CALLBACKS
    // ============================================================

    onMapReady(evt) {
      try {
        localStorage.setItem("PulseOrganismMap_v25", JSON.stringify(evt.map));
      } catch {}

      window.__PULSE_TOUCH__?.onDetectorUpdate?.({
        type: evt.type || "map_ready",
        map: evt.map,
        page: evt.page,
        prefix: evt.prefix
      });

      console.log("[Detector] Map → localStorage → Touch");
    },

    onChunksReady(evt) {
      try {
        localStorage.setItem("PulseChunks_v25", JSON.stringify(evt.chunks));
      } catch {}

      window.__PULSE_TOUCH__?.onDetectorUpdate?.({
        type: evt.type || "chunks_ready",
        chunks: evt.chunks
      });

      console.log("[Detector] Chunks → localStorage → Touch");
    },

    onNormalizerReady(evt) {
      try {
        localStorage.setItem("PulseNormalizer_v25", JSON.stringify(evt.normalizer));
      } catch {}

      window.__PULSE_TOUCH__?.onDetectorUpdate?.({
        type: evt.type || "normalizer_ready",
        normalizer: evt.normalizer
      });

      console.log("[Detector] Normalizer → localStorage → Touch");
    }
  };
}
