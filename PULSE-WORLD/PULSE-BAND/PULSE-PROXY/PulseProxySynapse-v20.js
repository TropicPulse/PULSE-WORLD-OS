// ============================================================================
//  FILE: PULSE-BAND/PULSE-PROXY/PulseProxySynapse-v20.js
//  PULSE OS v20‑IMMORTAL+++ — PULSEPROXY SYNAPSE
//  Neural Signal Routing Organ • Binary Core + Symbolic Wrapper
//  Dual‑Band + Presence + Advantage + Tiny‑Sync + World‑Lens Hints
//  SAFETY:
//    • Binary core: no window, no fetch, no JSON, no timestamps, no globals.
//    • Symbolic wrapper: browser‑aware, diagnostics, tiny‑sync, storage, overlays.
//    • No randomness in binary. No autonomous routing. No business logic.
//    • IMMORTAL+++ synapse: band/wave/binary/presence/advantage fields at symbolic layer.
// ============================================================================

/*
AI_EXPERIENCE_META = {
  identity: "PulseNetSynapse",
  version: "v20-ImmortalPlusPlus-SYNAPSE",
  layer: "synapse",
  role: "neural_signal_routing_organ",

  lineage: {
    root: "PulseNet-v11",
    parent: "PulseNetSynapse-v12.3-Evo-Presence",
    organismIntegration: "PulseOS-v20-ImmortalPlusPlus",
    spinalIntegration: "PulseOSSpinalCord-v20-ImmortalPlusPlus",
    meshIntegration: "PulseMesh-v20-ImmortalPlus",
    routerIntegration: "PulseRouter-v20-ImmortalPlus",
    worldIntegration: "PulseWorld-v21-Immortal"
  },

  evo: {
    // Core synapse identity
    deterministic: true,
    driftProof: true,
    synapticIntegrity: true,
    deterministicImpulseFlow: true,

    dualModeEvolution: true,
    binaryFirst: true,
    offlineFirst: true,
    tinySyncReady: true,

    multiInstanceReady: true,
    unifiedAdvantageField: true,
    pulseEfficiencyAware: true,
    clusterCoherence: true,
    zeroDriftCloning: true,
    reflexPropagation: true,
    organismClusterBoost: true,
    cognitiveComputeLink: true,
    futureEvolutionReady: true,

    // Presence + band + advantage overlays (symbolic only)
    bandAware: true,
    waveFieldAware: true,
    binaryFieldAware: true,
    presenceAware: true,
    presenceFieldAware: true,
    dualBandAware: true,
    symbolicAware: true,
    binaryAware: true,
    advantageAware: true,
    advantageCascadeAware: true,
    worldLensAware: true,

    // Performance overlays
    prewarmAware: true,
    cacheAware: true,
    chunkAware: true,
    routeWarmthAware: true,

    // IMMORTAL+++ guarantees (binary core)
    zeroRandomnessInBinary: true,
    zeroJSONInBinary: true,
    zeroWindowInBinary: true,
    zeroFetchInBinary: true,
    zeroTimestampsInBinary: true,
    zeroDateNowInBinary: true,
    zeroTimersInBinary: true,
    zeroAsyncLoopsInBinary: true,
    zeroRoutingIntelligence: true,
    zeroBusinessLogic: true,
    zeroMarketplaceLogic: true,
    zeroGPUExecution: true,
    zeroDOMInBinary: true
  },

  contract: {
    input: [
      "BinaryImpulse",
      "SymbolicImpulse",
      "SynapseContext",
      "DualBandContext",
      "AdvantageContext"
    ],
    output: [
      "SynapseImpulseFlow",
      "SynapseBandSignature",
      "SynapseBinaryField",
      "SynapseWaveField",
      "SynapsePresenceField",
      "SynapseAdvantageField",
      "SynapseDualBandOverlay",
      "SynapseDiagnostics",
      "SynapseHealingState"
    ],
    consumers: [
      "PulseNet",
      "PulseOSSpinalCord",
      "PulseMesh",
      "PulseRouter",
      "PulseWorldCore",
      "PulseGPUCortex"
    ]
  }
};
*/


// ============================================================================
//  UNIVERSAL GLOBAL RESOLVER — symbolic layer only
//  (Binary core never touches this; it is passed data only.)
// ============================================================================
const G = typeof globalThis !== "undefined"
  ? globalThis
  : typeof window !== "undefined"
  ? window
  : typeof global !== "undefined"
  ? global
  : {};

const admin = (G.firebaseAdmin && G.firebaseAdmin) || G.admin || null;
const db    =
  (G.db && G.db) ||
  (admin && admin.firestore && admin.firestore()) ||
  null;

const log   = (G.log && G.log) || console.log;
const error = (G.error && G.error) || console.error;


// ============================================================================
//  ORGAN IDENTITY — v20‑IMMORTAL+++ Synapse
// ============================================================================
export const PulseRole = {
  type: "Organ",
  subsystem: "PulseNet",
  layer: "Synapse",
  version: "20-ImmortalPlusPlus-Synapse",
  identity: "PulseNetSynapse-v20-ImmortalPlusPlus",

  evo: {
    driftProof: true,
    deterministic: true,
    synapticIntegrity: true,
    deterministicImpulseFlow: true,

    dualModeEvolution: true,
    binaryFirst: true,
    offlineFirst: true,
    tinySyncReady: true,

    multiInstanceReady: true,
    unifiedAdvantageField: true,
    pulseEfficiencyAware: true,
    clusterCoherence: true,
    zeroDriftCloning: true,
    reflexPropagation: 1.0,
    organismClusterBoost: 1.0,
    cognitiveComputeLink: true,
    futureEvolutionReady: true,

    // presence + advantage overlays (symbolic only)
    bandAware: true,
    waveFieldAware: true,
    binaryFieldAware: true,
    presenceAware: true,
    presenceFieldAware: true,
    dualBandAware: true,
    symbolicAware: true,
    binaryAware: true,
    advantageAware: true,
    advantageCascadeAware: true,
    worldLensAware: true,

    // meta-only hints for higher layers (no logic here)
    prewarmAware: true,
    cacheAware: true,
    chunkAware: true,
    routeWarmthAware: true
  }
};

const PULSENET_CONTEXT = {
  layer: PulseRole.layer,
  role: PulseRole.identity,
  purpose: "Neural signal routing + tiny offline-first connectivity organ",
  context: "Processes nervous-system signals + performs tiny sync pulses",
  target: "full-os",
  version: PulseRole.version,
  selfRepairable: true,
  evo: PulseRole.evo
};

export const PulseNetSynapseMeta = Object.freeze({
  layer: "PulseNetSynapse",
  role: "NEURAL_SIGNAL_ROUTING_ORGAN",
  version: "v20-ImmortalPlusPlus-BINARY-MAX-ABA-Presence",
  identity: "PulseNetSynapse-v20-ImmortalPlusPlus-BINARY-MAX-ABA-Presence",

  guarantees: Object.freeze({
    deterministic: true,
    driftProof: true,
    multiInstanceReady: true,
    parallelSafe: true,

    // Synapse laws
    synapticIntegrity: true,
    deterministicImpulseFlow: true,
    binaryFirst: true,
    dualModeEvolution: true,
    offlineFirst: true,
    tinySyncReady: true,
    unifiedAdvantageField: true,
    pulseEfficiencyAware: true,
    clusterCoherence: true,
    zeroDriftCloning: true,
    reflexPropagation: true,
    organismClusterBoost: true,
    cognitiveComputeLink: true,

    // Execution prohibitions (binary core)
    zeroRandomness: true,
    zeroJSONInBinary: true,
    zeroWindowInBinary: true,
    zeroFetchInBinary: true,
    zeroTimestamps: true,
    zeroDateNow: true,
    zeroTimers: true,
    zeroAsyncLoops: true,
    zeroNetworkMutation: true,
    zeroExternalMutation: true,
    zeroDynamicImports: true,
    zeroEval: true,
    zeroRoutingIntelligence: true,
    zeroBusinessLogic: true,
    zeroMarketplaceLogic: true,
    zeroGPUExecution: true,
    zeroDOM: true,

    // Awareness
    binaryAware: true,
    symbolicAware: true,
    bandAware: true,
    waveFieldAware: true,
    binaryFieldAware: true,
    dualBandAware: true,
    presenceAware: true,
    presenceFieldAware: true,
    advantageAware: true,

    // Environment
    worldLensAware: true
  }),

  contract: Object.freeze({
    input: [
      "BinaryImpulse",
      "SymbolicImpulse",
      "SynapseContext",
      "DualBandContext",
      "AdvantageContext"
    ],
    output: [
      "SynapseImpulseFlow",
      "SynapseBandSignature",
      "SynapseBinaryField",
      "SynapseWaveField",
      "SynapsePresenceField",
      "SynapseAdvantageField",
      "SynapseDualBandOverlay",
      "SynapseDiagnostics",
      "SynapseHealingState"
    ]
  }),

  lineage: Object.freeze({
    root: "PulseNet-v11",
    parent: "PulseNet-v20-ImmortalPlusPlus",
    ancestry: [
      "PulseNetSynapse-v7",
      "PulseNetSynapse-v8",
      "PulseNetSynapse-v9",
      "PulseNetSynapse-v9.3",
      "PulseNetSynapse-v10",
      "PulseNetSynapse-v11",
      "PulseNetSynapse-v11-Evo",
      "PulseNetSynapse-v11-Evo-Prime",
      "PulseNetSynapse-v12.3-Evo-Presence"
    ]
  }),

  bands: Object.freeze({
    supported: ["binary", "symbolic", "dual"],
    default: "binary",
    behavior: "synapse-routing"
  }),

  architecture: Object.freeze({
    pattern: "A-B-A",
    baseline: "binary impulse → symbolic wrapper → unified neural flow",
    adaptive: "tiny-sync + offline-first overlays + presence + advantage + dual-band overlays",
    return: "deterministic synapse surfaces + signatures"
  })
});


// ============================================================================
//  BINARY CORE — v20 IMMORTAL+++
//  Pure, deterministic, no window, no fetch, no JSON, no timestamps.
// ============================================================================

function normalizeSignalBinary(rawValue, opts) {
  const cfg = opts || {};
  const min = typeof cfg.min === "number" ? cfg.min : 0;
  const max = typeof cfg.max === "number" ? cfg.max : 100;
  const clamp = cfg.clamp !== false;

  if (rawValue == null || Number.isNaN(rawValue)) return 0;

  let v = Number(rawValue);
  const span = max - min || 1;
  let score = (v - min) / span;

  if (clamp) {
    if (score < 0) score = 0;
    if (score > 1) score = 1;
  }

  return score;
}

function computeSlopeBinary(prevValue, nextValue, opts) {
  const cfg = opts || {};
  const epsilon = typeof cfg.epsilon === "number" ? cfg.epsilon : 1e-6;

  if (prevValue == null || nextValue == null) return 0;

  const a = Number(prevValue);
  const b = Number(nextValue);

  const delta = b - a;
  if (Math.abs(delta) < epsilon) return 0;

  return delta;
}

function classifyRouteHealthBinary(signalScore, signalSlope) {
  const score = Number(signalScore ?? 0);
  const slope = Number(signalSlope ?? 0);

  if (score >= 0.8 && slope >= 0)      return "healthy";
  if (score >= 0.5 && slope >= -0.1)   return "stable";
  if (score >= 0.3 && slope >= -0.3)   return "degrading";
  if (score < 0.3 && slope < -0.1)     return "critical";

  return "unknown";
}

function buildPulseUpdateBinary(input) {
  const rawSignal      = input && "rawSignal" in input ? input.rawSignal : null;
  const previousSignal = input && "previousSignal" in input ? input.previousSignal : null;
  const meta           = (input && input.meta) || {};

  const signalScore = normalizeSignalBinary(rawSignal, meta.normalize || {});
  const signalSlope = computeSlopeBinary(previousSignal, rawSignal, meta.slope || {});
  const routeHealth = classifyRouteHealthBinary(signalScore, signalSlope);

  return {
    layerId: "SYNAPSE-LAYER",
    layerName: "THE SYNAPSE",
    layerRole: "Neural Signal Routing Layer",

    rawSignal: rawSignal ?? null,
    previousSignal: previousSignal ?? null,

    signalScore,
    signalSlope,
    routeHealth,

    meta: { ...meta }
  };
}

function processPulseSignalBinary(rawSignal, previousSignal, meta) {
  return buildPulseUpdateBinary({ rawSignal, previousSignal, meta: meta || {} });
}

function buildPulseNetSnapshotBinary(rawSignal, previousSignal, meta) {
  const update = buildPulseUpdateBinary({ rawSignal, previousSignal, meta: meta || {} });

  return {
    version: "20-binary",
    layerId: update.layerId,
    layerName: update.layerName,
    layerRole: update.layerRole,

    signal: {
      raw: update.rawSignal,
      previous: update.previousSignal,
      score: update.signalScore,
      slope: update.signalSlope,
      routeHealth: update.routeHealth
    },

    meta: { ...update.meta }
  };
}

export const PulseNetBinary = {
  normalizeSignal: normalizeSignalBinary,
  computeSlope: computeSlopeBinary,
  classifyRouteHealth: classifyRouteHealthBinary,
  buildPulseUpdate: buildPulseUpdateBinary,
  processPulseSignal: processPulseSignalBinary,
  buildPulseNetSnapshot: buildPulseNetSnapshotBinary,
  meta: { ...PULSENET_CONTEXT, mode: "binary-core" }
};


// ============================================================================
//  SYMBOLIC WRAPPER — v20 IMMORTAL+++
//  Browser / diagnostics / tiny-sync / presence + advantage + dual-band overlays
// ============================================================================

const PULSE_LAYER_ID   = "SYNAPSE-LAYER";
const PULSE_LAYER_NAME = "THE SYNAPSE";
const PULSE_LAYER_ROLE = "Neural Signal Routing Layer";

const PULSE_DIAGNOSTICS_ENABLED =
  typeof window !== "undefined" &&
  (window.PULSE_PULSE_DIAGNOSTICS === true ||
   window.PULSE_DIAGNOSTICS === true);

const SynapseHealingState = {
  lastPulseUpdateTs: null,
  lastRouteHealth: "unknown",
  lastSignalScore: 0,
  lastSignalSlope: 0,
  lastBandSignature: null,
  lastBinaryField: null,
  lastWaveField: null,
  lastPresenceField: null,
  lastAdvantageField: null,
  lastDualBandOverlay: null
};

function computeHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `h${h}`;
}

const pulseLog = (stage, details = {}) => {
  if (!PULSE_DIAGNOSTICS_ENABLED) return;

  try {
    log(
      JSON.stringify({
        pulseLayer: PULSE_LAYER_ID,
        pulseName: PULSE_LAYER_NAME,
        pulseRole: PULSE_LAYER_ROLE,
        stage,
        ...details,
        meta: { ...PULSENET_CONTEXT }
      })
    );
  } catch {}
};

pulseLog("SYNAPSE_INIT", {});


// ---------------------------------------------------------------------------
// Symbolic wrappers around binary helpers
// ---------------------------------------------------------------------------
function normalizeSignal(rawValue, opts = {}) {
  return PulseNetBinary.normalizeSignal(rawValue, opts);
}

function computeSlope(prevValue, nextValue, opts = {}) {
  return PulseNetBinary.computeSlope(prevValue, nextValue, opts);
}

function classifyRouteHealth(signalScore, signalSlope) {
  return PulseNetBinary.classifyRouteHealth(signalScore, signalSlope);
}

// Presence / band / wave / binary / advantage / dual-band field builders
function buildBandSignature(update) {
  return `synapse-dual-band-v20:${update.routeHealth || "unknown"}`;
}

function buildWaveField(update) {
  return {
    layer: PULSE_LAYER_ID,
    slope: update.signalSlope,
    routeHealth: update.routeHealth,
    waveSignature: computeHash(
      `SYNAPSE_WAVE::${update.signalSlope}::${update.routeHealth}`
    )
  };
}

function buildBinaryField(update) {
  return {
    score: update.signalScore,
    raw: update.rawSignal,
    previous: update.previousSignal,
    binarySignature: computeHash(
      `SYNAPSE_BINARY::${update.signalScore}::${update.rawSignal}::${update.previousSignal}`
    )
  };
}

function buildPresenceField(update) {
  return {
    layer: PULSE_LAYER_ID,
    role: PULSE_LAYER_ROLE,
    routeHealth: update.routeHealth,
    tsKind: "iso8601",
    presenceSignature: computeHash(
      `SYNAPSE_PRESENCE::${update.routeHealth}`
    )
  };
}

function buildAdvantageField(update, advantageContext) {
  const baseScore = update.signalScore ?? 0;
  const slope = update.signalSlope ?? 0;
  const ctxAdv = advantageContext && typeof advantageContext === "object"
    ? advantageContext.advantageScore ?? 0
    : 0;

  const stability = 1 - Math.min(1, Math.abs(slope));
  const combined = Math.max(0, Math.min(1, (baseScore * 0.6) + (stability * 0.3) + (ctxAdv * 0.1)));

  return {
    baseScore,
    slope,
    contextAdvantage: ctxAdv,
    synapseAdvantageScore: combined,
    advantageSignature: computeHash(
      `SYNAPSE_ADVANTAGE::${baseScore}::${slope}::${ctxAdv}::${combined}`
    )
  };
}

function buildDualBandOverlay(dualBandContext) {
  const ctx =
    dualBandContext && typeof dualBandContext === "object"
      ? dualBandContext
      : {};

  const band = typeof ctx.band === "string" ? ctx.band : "unknown";
  const mode = typeof ctx.mode === "string" ? ctx.mode : "unknown";
  const presence = typeof ctx.presence === "string" ? ctx.presence : "unknown";

  return {
    band,
    mode,
    presence,
    overlaySignature: computeHash(
      `SYNAPSE_DUALBAND::${band}::${mode}::${presence}`
    )
  };
}

function buildPulseUpdate({ rawSignal, previousSignal, meta = {}, dualBandContext = null, advantageContext = null } = {}) {
  const enrichedMeta = {
    ...meta,
    context: PULSENET_CONTEXT
  };

  const update = PulseNetBinary.buildPulseUpdate({
    rawSignal,
    previousSignal,
    meta: enrichedMeta
  });

  const ts = new Date().toISOString();

  const bandSignature   = buildBandSignature(update);
  const waveField       = buildWaveField(update);
  const binaryField     = buildBinaryField(update);
  const presenceField   = buildPresenceField(update);
  const advantageField  = buildAdvantageField(update, advantageContext);
  const dualBandOverlay = buildDualBandOverlay(dualBandContext);

  const withTs = {
    ...update,
    ts,
    bandSignature,
    waveField,
    binaryField,
    presenceField,
    advantageField,
    dualBandOverlay
  };

  SynapseHealingState.lastPulseUpdateTs = ts;
  SynapseHealingState.lastRouteHealth   = withTs.routeHealth;
  SynapseHealingState.lastSignalScore   = withTs.signalScore;
  SynapseHealingState.lastSignalSlope   = withTs.signalSlope;
  SynapseHealingState.lastBandSignature = bandSignature;
  SynapseHealingState.lastBinaryField   = binaryField;
  SynapseHealingState.lastWaveField     = waveField;
  SynapseHealingState.lastPresenceField = presenceField;
  SynapseHealingState.lastAdvantageField = advantageField;
  SynapseHealingState.lastDualBandOverlay = dualBandOverlay;

  pulseLog("SYNAPSE_PULSE_UPDATE", {
    routeHealth: withTs.routeHealth,
    signalScore: withTs.signalScore,
    signalSlope: withTs.signalSlope,
    bandSignature: withTs.bandSignature
  });

  return withTs;
}

function processPulseSignal(rawSignal, previousSignal, meta = {}, dualBandContext = null, advantageContext = null) {
  pulseLog("SYNAPSE_PROCESS_START", {
    rawSignal,
    previousSignal,
    meta
  });

  const update = buildPulseUpdate({ rawSignal, previousSignal, meta, dualBandContext, advantageContext });

  pulseLog("SYNAPSE_PROCESS_DONE", {
    routeHealth: update.routeHealth,
    signalScore: update.signalScore,
    signalSlope: update.signalSlope,
    bandSignature: update.bandSignature
  });

  return update;
}

function buildPulseNetSnapshot(rawSignal, previousSignal, meta = {}, dualBandContext = null, advantageContext = null) {
  const update = buildPulseUpdate({ rawSignal, previousSignal, meta, dualBandContext, advantageContext });

  return {
    version: "20",
    layerId: PULSE_LAYER_ID,
    layerName: PULSE_LAYER_NAME,
    layerRole: PULSE_LAYER_ROLE,
    ts: update.ts,

    signal: {
      raw: update.rawSignal,
      previous: update.previousSignal,
      score: update.signalScore,
      slope: update.signalSlope,
      routeHealth: update.routeHealth
    },

    bandSignature: update.bandSignature,
    waveField: update.waveField,
    binaryField: update.binaryField,
    presenceField: update.presenceField,
    advantageField: update.advantageField,
    dualBandOverlay: update.dualBandOverlay,

    meta: update.meta
  };
}


// ============================================================================
//  PULSE-ONCE CONNECTIVITY ORGAN — symbolic only (tiny-sync, unchanged behavior)
// ============================================================================

const PulseNetState = {
  lastPulseTs: null,
  lastPulseOk: false,
  lastError: null,
  minPulseIntervalMs: 5 * 60 * 1000
};

async function multiGatewayReachout() {
  pulseLog("PULSE_REACHOUT_START", {});

  try {
    if (typeof navigator !== "undefined" && navigator.connection?.type === "satellite") {
      pulseLog("PULSE_REACHOUT_SATELLITE_TRY", {});
      const ok = await trySatellitePing();
      if (ok) return true;
    }
  } catch (e) {
    pulseLog("PULSE_REACHOUT_SATELLITE_ERR", { error: String(e) });
  }

  pulseLog("PULSE_REACHOUT_WIFI_PLACEHOLDER", {
    note: "WiFi scanning/joining requires native/OS integration."
  });

  try {
    const ok = await tryLastKnownGateway();
    if (ok) return true;
  } catch (e) {
    pulseLog("PULSE_REACHOUT_LAST_GATEWAY_ERR", { error: String(e) });
  }

  pulseLog("PULSE_REACHOUT_NO_PATH", {});
  return false;
}

async function trySatellitePing() {
  try {
    const res = await fetch("https://example-satellite-check.com/ping", {
      method: "GET",
      cache: "no-store"
    });
    return res.ok;
  } catch {
    return false;
  }
}

async function tryLastKnownGateway() {
  try {
    const res = await fetch("/pulse-gateway-ping", {
      method: "GET",
      cache: "no-store"
    });
    return res.ok;
  } catch {
    return false;
  }
}

async function pulseOnce(deviceId) {
  pulseLog("PULSE_ONCE_CALLED", { deviceId });

  const now = Date.now();
  if (
    PulseNetState.lastPulseTs &&
    now - PulseNetState.lastPulseTs < PulseNetState.minPulseIntervalMs
  ) {
    pulseLog("PULSE_ONCE_SKIPPED_MIN_INTERVAL", {
      lastPulseTs: PulseNetState.lastPulseTs,
      now,
      minPulseIntervalMs: PulseNetState.minPulseIntervalMs
    });
    return { skipped: true, reason: "min-interval" };
  }

  try {
    const pathOk = await multiGatewayReachout();
    if (!pathOk) {
      PulseNetState.lastPulseTs = now;
      PulseNetState.lastPulseOk = false;
      PulseNetState.lastError = "no-path";

      pulseLog("PULSE_ONCE_NO_PATH", {});
      return { ok: false, reason: "no-path" };
    }

    pulseLog("PULSE_ONCE_TINY_SYNC_START", {});

    const res = await fetch("/pulse-sync", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
      body: JSON.stringify({ deviceId })
    });

    if (!res.ok) {
      throw new Error("non_ok_status_" + res.status);
    }

    const payload = await res.json();

    try {
      if (typeof localStorage !== "undefined") {
        if (payload.identity) {
          localStorage.setItem("tp_identity_v20", JSON.stringify(payload.identity));
        }
        if (payload.config) {
          localStorage.setItem("tp_earn_config_v20", JSON.stringify(payload.config));
        }
        if (payload.jobs) {
          localStorage.setItem("tp_jobs_seed_v20", JSON.stringify(payload.jobs));
        }
      }
    } catch (storageErr) {
      pulseLog("PULSE_ONCE_STORAGE_ERR", { error: String(storageErr) });
    }

    PulseNetState.lastPulseTs = now;
    PulseNetState.lastPulseOk = true;
    PulseNetState.lastError = null;

    pulseLog("PULSE_ONCE_TINY_SYNC_DONE", {
      bytes: JSON.stringify(payload).length,
      hasJobs: Array.isArray(payload.jobs) && payload.jobs.length > 0
    });

    return { ok: true, payload };

  } catch (err) {
    PulseNetState.lastPulseTs = Date.now();
    PulseNetState.lastPulseOk = false;
    PulseNetState.lastError = err?.message || "unknown";

    pulseLog("PULSE_ONCE_ERR", { error: String(err) });
    return { ok: false, error: err?.message || "unknown" };
  }
}

function getPulseNetState() {
  return { ...PulseNetState };
}


// ============================================================================
//  EXPORTED SYNAPSE API — v20‑IMMORTAL+++
// ============================================================================
export const PulseNet = {
  // identity
  PULSE_LAYER_ID,
  PULSE_LAYER_NAME,
  PULSE_LAYER_ROLE,

  // diagnostics
  PULSE_DIAGNOSTICS_ENABLED,
  pulseLog,

  // binary-compatible helpers (symbolic wrappers)
  normalizeSignal,
  computeSlope,
  classifyRouteHealth,

  buildPulseUpdate,
  processPulseSignal,
  buildPulseNetSnapshot,

  // connectivity
  pulseOnce,
  getPulseNetState,

  // healing / overlays
  getSynapseHealingState() {
    return { ...SynapseHealingState };
  },

  // meta
  meta: { ...PULSENET_CONTEXT },

  // expose binary core for other organs (GPU, Cortex, Mesh)
  binary: PulseNetBinary
};
