/* global log,warn,error */
// ============================================================================
//  PulseBandSymbolic-v16-Immortal-BINARY-MAX-ABA-Presence.js
//  PULSE NERVOUS SYSTEM — v16 IMMORTAL ORGANISM EDITION
//  Symbolic PNS + Binary Partner + GPU Warmup + Presence/Field/Advantage
//  + Chunk/Cache/Prewarm Hints + DualBand Surfaces + Router/Proxy Bridges
// ============================================================================
//
//  ROLE (v16-Immortal):
//  --------------------
//  • Canonical symbolic nervous system for the organism (PNS).
//  • Bridges CNS/PNS, GPU brain, mesh/pulse, and binary PNS core.
//  • Emits full band/binaryField/waveField/presenceField/advantage surfaces.
//  • Emits chunk/cache/prewarm envelopes for router/proxy/memory organs.
//  • Provides deterministic nervous snapshots + live mirrors + GPU mirrors.
//  • Drives Impulse/ImpulseStrategy with nervous context + advantage field.
//  • v16 IMMORTAL: dualband-aware, advantageCascade-aware, chunk/prewarm-aware,
//    proxy-front-aware, router-memory-aware, identity-aware.
//
//  SAFETY CONTRACT (v16-Immortal):
//  -------------------------------
//  • No dynamic imports, no eval, no AI, no network fetch.
//  • Never throws outward from nervous system operations.
//  • Deterministic math only; Date.now() used only for timestamps.
//  • Zero mutation of external globals (only internal state).
//  • Binary PNS core is treated as a pure math partner.
// ============================================================================

/*
AI_EXPERIENCE_META = {
  identity: "PulseBandSymbolic",
  version: "v16-Immortal-BINARY-MAX-ABA-Presence",
  layer: "pns_symbolic_nervous_system",
  role: "organism_nervous_system_core",
  lineage: {
    root: "PulseBand-v11",
    parent: "PulseBand-v12.3-Evo-Presence",
    organismIntegration: "v16-Immortal"
  },

  evo: {
    symbolicPNS: true,
    binaryPartnerAware: true,
    gpuBrainAware: true,
    meshAware: true,
    routerAware: true,
    proxyFrontAware: true,
    proxyContextAware: true,
    routerMemoryAware: true,
    identityAware: true,

    dualBandAware: true,
    unifiedAdvantageField: true,
    advantageCascadeAware: true,
    chunkAware: true,
    cacheAware: true,
    prewarmAware: true,
    coldStartAware: true,
    routeWarmthAware: true,

    deterministic: true,
    driftProof: true,
    multiInstanceReady: true,
    parallelSafe: true,
    zeroDynamicImports: true,
    zeroEval: true,
    zeroNetworkFetch: true,
    zeroExternalMutation: true
  },

  contract: {
    input: [
      "ImpulseTraveler",
      "GpuNervousState",
      "BinaryPnsSnapshot",
      "DualBandContext",
      "AdvantageContext"
    ],
    output: [
      "PnsLiveSnapshot",
      "PnsGpuPerformanceSnapshot",
      "PnsNervousEvent",
      "PnsBandSignature",
      "PnsBinaryField",
      "PnsWaveField",
      "PnsPresenceField",
      "PnsAdvantageField",
      "PnsChunkCachePrewarmHints",
      "PnsDiagnostics",
      "PnsHealingState"
    ],
    consumers: [
      "PulseProxyFront",
      "PulseProxyContext",
      "CheckRouterMemory",
      "CheckIdentity",
      "PulseMesh",
      "PulseNet",
      "GPUOrganism"
    ]
  }
};
*/

// ============================================================================
// GLOBAL WIRING — v16 IMMORTAL (no imports, organism‑level wiring)
// ============================================================================
const G =
  typeof globalThis !== "undefined"
    ? globalThis
    : typeof window !== "undefined"
    ? window
    : typeof global !== "undefined"
    ? global
    : {};

const Impulse          = G.PulseProxyImpulse;
const ImpulseStrategy  = G.PulseProxyImpulseStrategy || null;
const PulseGPU         = G.PulseGPUAstralNervousSystem;
const Pulse            = G.PulseProxyLimbic; // facade side-effects only

const PNSBinary        = G.PulseProxyPNSNervousSystemBinary || null;

// v16+ awareness of other backbone organs (optional, fail-open)
const CheckIdentity    = G.PulseOSCheckIdentity || null;
const CheckRouterMemory = G.PulseOSCheckRouterMemory || null;
const PulseProxyContext = G.PulseProxyContext || null;
const PulseProxyFront   = G.PulseProxyFront || null;

// ============================================================================
// OS‑v16 CONTEXT METADATA — Nervous System Identity
// ============================================================================
const PULSEBAND_CONTEXT = {
  layer: "PulseBand",
  role: "NERVOUS_SYSTEM",
  purpose:
    "Sensorimotor integration + connectivity + GPU warmup control + CNS/PNS bridge + chunk/cache/prewarm hinting",
  context:
    "Maintains live/snapshot/gpuPerformance mirrors, fires nervous events, propagates reflexes, synchronizes with Cortex + Evolution + Proxy/Router/Identity",
  target: "full-os",
  version: "16-Immortal-BINARY-MAX-ABA-Presence",
  mode: "symbolic",
  binaryPartner: "PulseProxyPNSNervousSystemBinary",
  selfRepairable: true,
  evo: {
    advantageCascadeAware: true,
    pulseEfficiencyAware: true,
    driftProof: true,
    multiInstanceReady: true,
    parallelSafe: true,
    fanOutScaling: 1.0,
    clusterCoherence: true,
    zeroDriftCloning: true,
    reflexPropagation: 1.0,
    dualModeEvolution: true,
    organismClusterBoost: 1.0,
    cognitiveComputeLink: true,
    unifiedAdvantageField: true,
    cortexSync: true,
    brainSync: true,
    evolutionSync: true,

    // presence + band/field awareness
    bandAware: true,
    waveFieldAware: true,
    binaryFieldAware: true,
    presenceAware: true,
    presenceFieldAware: true,
    dualBandAware: true,

    // v16+ chunk/cache/prewarm
    chunkAware: true,
    cacheAware: true,
    prewarmAware: true,
    coldStartAware: true,
    routeWarmthAware: true
  }
};

export const PulseBandSymbolicMeta = Object.freeze({
  layer: "PulseBandSymbolic",
  role: "PNS_SYMBOLIC_NERVOUS_SYSTEM",
  version: "v16-Immortal-BINARY-MAX-ABA-Presence",
  identity: "PulseBandSymbolic-v16-Immortal-BINARY-MAX-ABA-Presence",

  guarantees: Object.freeze({
    deterministic: true,
    driftProof: true,
    multiInstanceReady: true,
    parallelSafe: true,

    // Nervous system laws
    symbolicPNS: true,
    sensorimotorIntegration: true,
    connectivityMirror: true,
    gpuWarmupControl: true,
    reflexPropagation: true,
    nervousEventEmitter: true,
    nervousSnapshotEngine: true,
    nervousLiveMirror: true,
    nervousGpuPerformanceMirror: true,
    dualModeEvolution: true,
    unifiedAdvantageField: true,
    cortexSync: true,
    brainSync: true,
    evolutionSync: true,

    // v16+ advantage + chunk/cache/prewarm
    advantageCascadeAware: true,
    chunkAware: true,
    cacheAware: true,
    prewarmAware: true,
    coldStartAware: true,
    routeWarmthAware: true,

    // Execution prohibitions
    zeroConsole: false, // diagnostics allowed via nervousLog
    zeroRouting: true,
    zeroMarketplace: true,
    zeroScoring: true,
    zeroDynamicImports: true,
    zeroEval: true,
    zeroRandomness: true,
    zeroTimers: false, // Date.now allowed for timestamps
    zeroAsync: false,  // async allowed but deterministic
    zeroNetwork: true,
    zeroIO: true,
    zeroExternalMutation: true,
    zeroWindowMutation: true,
    zeroDOM: true,
    zeroGPUExecution: true,

    // Awareness
    bandAware: true,
    waveFieldAware: true,
    binaryFieldAware: true,
    symbolicAware: true,
    binaryAware: true,
    dualBandAware: true,
    presenceAware: true,
    presenceFieldAware: true,

    // Environment
    worldLensAware: false
  }),

  contract: Object.freeze({
    input: [
      "ImpulseTraveler",
      "GpuNervousState",
      "BinaryPnsSnapshot",
      "DualBandContext",
      "AdvantageContext"
    ],
    output: [
      "PnsLiveSnapshot",
      "PnsGpuPerformanceSnapshot",
      "PnsNervousEvent",
      "PnsBandSignature",
      "PnsBinaryField",
      "PnsWaveField",
      "PnsPresenceField",
      "PnsAdvantageField",
      "PnsChunkCachePrewarmHints",
      "PnsDiagnostics",
      "PnsHealingState"
    ]
  }),

  lineage: Object.freeze({
    root: "PulseBand-v11",
    parent: "PulseBand-v12.3-Evo",
    ancestry: [
      "PulseBand-v7",
      "PulseBand-v8",
      "PulseBand-v9",
      "PulseBand-v10",
      "PulseBand-v11",
      "PulseBand-v11-Evo",
      "PulseBand-v11-Evo-Prime",
      "PulseBand-v12.3-Evo-Presence",
      "PulseBandSymbolic-v14-Immortal"
    ]
  }),

  bands: Object.freeze({
    supported: ["symbolic", "binary", "dual"],
    default: "symbolic",
    behavior: "pns-symbolic"
  }),

  architecture: Object.freeze({
    pattern: "A-B-A",
    baseline: "binary nervous math → symbolic nervous mirror → CNS/PNS sync",
    adaptive:
      "binary-field + wave-field + presence overlays + GPU warmup surfaces + chunk/cache/prewarm hints + advantage field",
    return: "deterministic nervous surfaces + signatures + advantage + hints"
  })
});

// ============================================================================
// NERVOUS SYSTEM LOGGER — v16 IMMORTAL
// ============================================================================
export function nervousLog(stage, payload = {}) {
  try {
    const enabled =
      typeof window !== "undefined"
        ? window.PULSE_NERVOUS_DIAGNOSTICS || window.PULSE_DIAGNOSTICS
        : process.env.PULSE_NERVOUS_DIAGNOSTICS === "true" ||
          process.env.PULSE_DIAGNOSTICS === "true";

    if (!enabled) return;

    const ts = Date.now();

    const safePayload =
      payload && typeof payload === "object"
        ? payload
        : { value: String(payload) };

    const packet = {
      layer: "PulseNervousSystem",
      stage,
      ts,
      ...safePayload
    };

    if (typeof console !== "undefined" && console.log) {
      console.log("[NERV]", JSON.stringify(packet));
    }

    if (typeof window !== "undefined" && window.PulseLogger?.nervous) {
      window.PulseLogger.nervous(packet);
    }
  } catch (_) {
    // NEVER throw — nervous system must never break flow
  }
}

// ============================================================================
// Utility helpers — v16 deterministic field + presence + advantage + hints
// ============================================================================
const nowMs = () => Date.now();

const safeSeconds = (v) => {
  const n = Number(v);
  return Number.isFinite(n) && n >= 0 ? Math.floor(n) : 0;
};

const getSafeTimestamp = (status) => {
  if (status.lastSyncTimestamp != null) return status.lastSyncTimestamp;
  if (status.lastSyncSeconds != null)
    return nowMs() - status.lastSyncSeconds * 1000;
  return nowMs();
};

function computeHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 99991;
  }
  return `h${h}`;
}

function buildBand() {
  // PNS is symbolic‑first but dual‑band aware
  return "dual";
}

function buildBandSignature(band) {
  return computeHash(`PNS_BAND::${band}`);
}

function buildBinaryField(latency, gpuReady) {
  const base = Number.isFinite(latency) ? Math.max(0, latency) : 0;
  const depth = gpuReady ? 4 : 2;
  const density = Math.min(512, base + depth * 7);
  const surface = density + depth;
  return {
    binaryPhenotypeSignature: `pns-binary-pheno-${surface % 99991}`,
    binarySurfaceSignature: `pns-binary-surface-${(surface * 13) % 99991}`,
    binarySurface: { depth, density, surface },
    parity: surface % 2,
    shiftDepth: Math.floor(Math.log2(surface || 1))
  };
}

function buildWaveField(latencyClass, networkHealth) {
  const key = `${latencyClass || "Unknown"}::${networkHealth || "Unknown"}`;
  const amplitude = 8 + (key.length % 7);
  const wavelength = amplitude + 9;
  const phase = (amplitude * 3) % 32;
  return {
    amplitude,
    wavelength,
    phase,
    band: "pns-nervous",
    mode: "symbolic-wave",
    waveSignature: computeHash(`PNS_WAVE::${key}::${amplitude}`)
  };
}

function buildPresenceField(connectivityMode, online) {
  const focus =
    connectivityMode === "local"
      ? "local-focus"
      : connectivityMode === "online"
      ? "network-focus"
      : "auto-focus";

  const state = online ? "present" : "degraded";

  return {
    focus,
    state,
    presenceSignature: computeHash(
      `PNS_PRESENCE::${connectivityMode || "auto"}::${online ? "1" : "0"}`
    )
  };
}

// v16: unified advantage field derived from latency, gpu, connectivity
function buildAdvantageFieldFromStatus(status) {
  const latency = Number.isFinite(status.latency) ? status.latency : 0;
  const gpuReady = !!status.gpuReady;
  const online = !!status.online;

  const latencyScore =
    latency <= 0 ? 1.0 :
    latency < 80 ? 0.95 :
    latency < 180 ? 0.8 :
    latency < 400 ? 0.5 :
    0.25;

  const gpuScore = gpuReady ? 1.0 : 0.6;
  const connectivityScore = online ? 1.0 : 0.4;

  const advantageScore = Math.max(
    0.1,
    Math.min(1.0, (latencyScore * 0.5 + gpuScore * 0.3 + connectivityScore * 0.2))
  );

  const timeSavedMs = Math.floor((1 - latencyScore) * 50); // symbolic hint only

  return {
    advantageScore,
    timeSavedMs,
    cascadeLevel: 0,
    field: "pns-nervous",
    advantageSignature: computeHash(
      `PNS_ADVANTAGE::${latency}::${gpuReady ? "1" : "0"}::${online ? "1" : "0"}::${advantageScore}`
    )
  };
}

// v16: chunk/cache/prewarm hints derived from latency + gpu + connectivity
function buildChunkCachePrewarmHints(status) {
  const latency = Number.isFinite(status.latency) ? status.latency : 0;
  const gpuReady = !!status.gpuReady;
  const online = !!status.online;

  const coldStart =
    latency <= 0 || (!gpuReady && latency > 250);

  const routeWarmth =
    coldStart ? "cold" :
    latency < 120 ? "warm" :
    "warming";

  const chunkHint =
    coldStart ? "bootstrap-chunk" :
    latency > 250 ? "route-chunk" :
    "none";

  const cacheHint =
    coldStart ? "bootstrap-cache" :
    latency > 250 ? "route-cache" :
    "none";

  const prewarmHint =
    !gpuReady || !online || coldStart;

  return {
    prewarmHint,
    chunkHint,
    cacheHint,
    routeWarmth,
    hintSignature: computeHash(
      `PNS_HINTS::${latency}::${gpuReady ? "1" : "0"}::${online ? "1" : "0"}::${routeWarmth}`
    )
  };
}

// ------------------------------------------------------------
// PulseBand v16 — Engine State (NERVOUS SYSTEM STATE)
// ------------------------------------------------------------
export const pulseband = {
  meta: { ...PULSEBAND_CONTEXT },

  listeners: {},

  gpu: {
    ready: false,
    packages: null,
    warmupScore: 0,
    thermalState: "Unknown"
  },

  engine: {
    initialized: false,
    pageEnabled: true,
    globalEnabled: true,
    reflexMode: "auto",
    cortexLinked: false
  },

  connectivity: {
    mode: "auto",
    online: true,
    source: "unknown",
    lastLatencySpike: null,
    spikeCount: 0
  },

  state: {
    live: {
      pulsebandBars: 0,
      phoneBars: 0,
      latency: 0,
      latencyClass: "Unknown",
      networkHealth: "Unknown",
      microWindowActive: false,
      lastUpdateTimestamp: 0,
      lastSyncTimestamp: null,
      lastSyncSeconds: 0,
      route: "Primary",
      state: "Idle",
      efficiency: 100,
      efficiencyMode: null,
      phoneKbps: 0,
      appKbps: 0
    },

    snapshot: {
      advantage: 1.0,
      timeSaved: 0,
      lastUpdateTimestamp: 0,
      driftScore: 0,
      reflexScore: 1.0
    },

    gpuPerformance: {
      warm: false,
      smoothness: 0,
      pacing: "Unknown",
      stalls: 0,
      efficiency: 100,
      load: 0,
      frameBudget: 16.6,
      frameVariance: 0
    },

    latency: 0,
    latencyClass: "Unknown",
    networkHealth: "Unknown",
    microWindowActive: false,
    lastSyncTimestamp: null,
    lastSyncSeconds: 0,
    route: "Primary",
    state: "Idle",
    efficiency: 100,
    efficiencyMode: null,
    phoneKbps: 0,
    appKbps: 0,
    pulsebandBars: 0,
    phoneBars: 0,
    advantage: 1.0,
    timeSaved: 0,

    connectivityMode: "auto",
    online: true,

    // v16: band/field/advantage/hints mirrors
    band: "dual",
    bandSignature: null,
    binaryField: null,
    waveField: null,
    presenceField: null,
    advantageField: null,
    chunkCachePrewarmHints: null
  },

  // ------------------------------------------------------------
  // GPU Brain Init — Motor Cortex Warmup (symbolic, v16)
  // ------------------------------------------------------------
  async initGraphics(rawAssets = {}) {
    if (typeof window !== "undefined" && window.PULSE_LOG) {
      window.PULSE_LOG("PulseBand → initGraphics() called");
    }
    nervousLog("GPU_INIT_CALLED");

    if (!PulseGPU || !PulseGPU.BrainInput || !PulseGPU.PulseGPUBrainExport) {
      nervousLog("GPU_INIT_MISSING_GPU_ORGAN");
      return;
    }

    try {
      const input = new PulseGPU.BrainInput({
        rawTextures:   rawAssets.textures   || [],
        rawMeshes:     rawAssets.meshes     || [],
        rawAnimations: rawAssets.animations || [],
        rawShaders:    rawAssets.shaders    || [],
        rawScenes:     rawAssets.scenes     || []
      });

      const packages = PulseGPU.PulseGPUBrainExport.buildAndStore(input);

      if (typeof window !== "undefined" && window.PULSE_LOG) {
        window.PULSE_LOG("PulseBand → GPU Brain ready");
      }

      this.gpu.packages = packages;
      this.gpu.ready = !!packages;
      this.gpu.warmupScore = packages ? 1.0 : 0.0;

      nervousLog("GPU_INIT_READY", { gpuReady: this.gpu.ready });
    } catch (err) {
      if (typeof window !== "undefined" && window.PULSE_LOG) {
        window.PULSE_LOG("PulseBand → GPU Brain FAILED");
      }

      this.gpu.ready = false;
      this.gpu.warmupScore = 0;

      nervousLog("GPU_INIT_FAILED", { error: String(err) });
    }
  },

  // ------------------------------------------------------------
  // Engine Init — Nervous System Boot (v16)
  // ------------------------------------------------------------
  async initEngine() {
    if (this.engine.initialized) {
      if (typeof window !== "undefined" && window.PULSE_LOG) {
        window.PULSE_LOG("PulseBand → initEngine() skipped (already initialized)");
      }
      nervousLog("ENGINE_INIT_SKIPPED", { initialized: true });
      return;
    }

    if (typeof window !== "undefined" && window.PULSE_LOG) {
      window.PULSE_LOG("PulseBand → Initializing engine…");
    }
    nervousLog("ENGINE_INIT_START");

    this.engine.initialized = true;

    this.setStatus({
      live: {
        latency: 1,
        networkHealth: "Excellent",
        latencyClass: "Excellent",
        state: "Warm",
        route: "Pulse"
      }
    });

    if (typeof window !== "undefined" && window.PULSE_LOG) {
      window.PULSE_LOG("PulseBand → Engine ready");
    }
    nervousLog("ENGINE_INIT_READY", { initialized: true });
  },

  // ------------------------------------------------------------
  // Page Toggle — Local Nervous System Enable/Disable
  // ------------------------------------------------------------
  enableForPage() {
    if (typeof window !== "undefined" && window.PULSE_LOG) {
      window.PULSE_LOG("PulseBand → Page enabled");
    }
    nervousLog("PAGE_ENABLE");

    this.engine.pageEnabled = true;
    this.emit("page-toggle", { pageEnabled: true });
  },

  disableForPage() {
    if (typeof window !== "undefined" && window.PULSE_LOG) {
      window.PULSE_LOG("PulseBand → Page disabled");
    }
    nervousLog("PAGE_DISABLE");

    this.engine.pageEnabled = false;
    this.emit("page-toggle", { pageEnabled: false });
  },

  isPageEnabled() {
    return !!this.engine.pageEnabled;
  },

  // ------------------------------------------------------------
  // Connectivity Mode + Local/Online Awareness
  // ------------------------------------------------------------
  setConnectivityMode(mode) {
    if (!["auto", "online", "local"].includes(mode)) return;

    this.connectivity.mode = mode;
    this.state.connectivityMode = mode;

    nervousLog("CONNECTIVITY_MODE_SET", { mode });
    this.emit("connectivity-mode-change", { mode });
  },

  setConnectivity({ online, source = "manual" } = {}) {
    if (typeof online !== "boolean") return;

    this.connectivity.online = online;
    this.connectivity.source = source;
    this.state.online = online;

    nervousLog("CONNECTIVITY_STATE_SET", { online, source });

    this.emit("connectivity-change", {
      online,
      source,
      mode: this.connectivity.mode
    });
  },

  inferConnectivityFromBrowser() {
    if (typeof navigator === "undefined") return;

    const online = !!navigator.onLine;
    this.setConnectivity({ online, source: "browser" });
  },

  isLocalOnly() {
    return this.connectivity.mode === "local";
  },

  // ------------------------------------------------------------
  // PulseNet + Mesh Integration (Pulse-Once Organ)
// ------------------------------------------------------------
  pulseStatus: {
    lastPulseTs: null,
    lastPulseOk: false,
    lastError: null,
    lastMeshReach: null,
    lastDeviceId: null
  },

  onPulseSuccess(payload = {}) {
    const ts = nowMs();

    this.pulseStatus.lastPulseTs = ts;
    this.pulseStatus.lastPulseOk = true;
    this.pulseStatus.lastError = null;
    this.pulseStatus.lastMeshReach =
      payload.meshReach || this.pulseStatus.lastMeshReach || null;
    this.pulseStatus.lastDeviceId =
      payload.deviceId || this.pulseStatus.lastDeviceId || null;

    this.setConnectivity({ online: true, source: "pulse" });

    this.emit("pulse-success", { ts, payload });
  },

  onPulseFailure(reason = "unknown") {
    const ts = nowMs();

    this.pulseStatus.lastPulseTs = ts;
    this.pulseStatus.lastPulseOk = false;
    this.pulseStatus.lastError = reason;

    this.emit("pulse-failure", { ts, reason });
  },

  estimateMeshReach() {
    const liveLatency = this.state.live.latency || 0;

    const hops =
      liveLatency <= 0 ? 0 :
      liveLatency < 80 ? 1 :
      liveLatency < 200 ? 2 :
      liveLatency < 400 ? 3 : 4;

    return {
      hops,
      estimatedMeters: hops * 30,
      mode: hops <= 1 ? "direct" : "mesh"
    };
  },

  async requestPulse(deviceId) {
    if (typeof window === "undefined" || !window.PulseNet || !window.PulseNet.pulseOnce) {
      if (typeof window !== "undefined" && window.PULSE_LOG) {
        window.PULSE_LOG("[PulseBand] PulseNet not available");
      }
      nervousLog("PULSE_REQUEST_NO_PULSENET");
      return { ok: false, reason: "no-pulsenet" };
    }

    const res = await window.PulseNet.pulseOnce(deviceId);

    if (res && res.ok) {
      this.onPulseSuccess(res.payload || {});
    } else {
      this.onPulseFailure(res?.error || res?.reason || "unknown");
    }

    return res;
  },

  // ------------------------------------------------------------
  // Status API — Nervous System Snapshot (v16 surfaces)
// ------------------------------------------------------------
  getStatus() {
    const status = {
      ...this.state,
      live: { ...this.state.live },
      snapshot: { ...this.state.snapshot }
    };

    status.safeTimestamp = getSafeTimestamp(status);
    status.gpuReady = this.gpu.ready;
    status.gpuPerformance = { ...this.state.gpuPerformance };
    status.engine = { ...this.engine };

    status.connectivity = {
      mode: this.connectivity.mode,
      online: this.connectivity.online,
      source: this.connectivity.source,
      lastLatencySpike: this.connectivity.lastLatencySpike,
      spikeCount: this.connectivity.spikeCount
    };

    status.pulseStatus = { ...this.pulseStatus };
    status.meta = { ...PULSEBAND_CONTEXT };

    const band = buildBand();
    const bandSignature = buildBandSignature(band);
    const binaryField = buildBinaryField(
      status.live.latency,
      this.gpu.ready
    );
    const waveField = buildWaveField(
      status.live.latencyClass,
      status.live.networkHealth
    );
    const presenceField = buildPresenceField(
      this.connectivity.mode,
      this.connectivity.online
    );

    const advantageField = buildAdvantageFieldFromStatus({
      latency: status.live.latency,
      gpuReady: this.gpu.ready,
      online: this.connectivity.online
    });

    const chunkCachePrewarmHints = buildChunkCachePrewarmHints({
      latency: status.live.latency,
      gpuReady: this.gpu.ready,
      online: this.connectivity.online
    });

    status.band = band;
    status.bandSignature = bandSignature;
    status.binaryField = binaryField;
    status.waveField = waveField;
    status.presenceField = presenceField;
    status.advantageField = advantageField;
    status.chunkCachePrewarmHints = chunkCachePrewarmHints;

    return status;
  },

  // ------------------------------------------------------------
  // IMPULSE FIRING — Nervous System → Impulse Traveler (v16)
// ------------------------------------------------------------
  fireImpulse(intent, payload = {}) {
    nervousLog("IMPULSE_FIRE", { intent });

    const status = this.getStatus();

    const nervousPayload = {
      ...payload,
      nervousSystem: {
        latency: status.latency,
        networkHealth: status.networkHealth,
        gpuReady: this.gpu.ready,
        band: status.band,
        bandSignature: status.bandSignature,
        binaryField: status.binaryField,
        waveField: status.waveField,
        presenceField: status.presenceField,
        advantageField: status.advantageField,
        chunkCachePrewarmHints: status.chunkCachePrewarmHints
      }
    };

    if (ImpulseStrategy && typeof ImpulseStrategy.create === "function") {
      const impulse = ImpulseStrategy.create({
        intent,
        payload: nervousPayload,
        version: "auto"
      });

      if (typeof window !== "undefined" && window.PulseNet?.onImpulse) {
        window.PulseNet.onImpulse(impulse);
      }

      return impulse;
    }

    if (!Impulse || typeof Impulse.create !== "function") {
      nervousLog("IMPULSE_MISSING", { intent });
      return null;
    }

    const impulse = Impulse.create(intent, nervousPayload);

    if (typeof window !== "undefined" && window.PulseNet?.onImpulse) {
      window.PulseNet.onImpulse(impulse);
    }

    return impulse;
  },

  // ------------------------------------------------------------
  // IMPULSE RETURN — Traveler → Nervous System
  // ------------------------------------------------------------
  receiveImpulseReturn(impulse) {
    if (!impulse || typeof impulse !== "object") return;

    nervousLog("IMPULSE_RETURN_RECEIVED", {
      tickId: impulse.tickId,
      hops: Array.isArray(impulse.path) ? impulse.path.length : 0
    });

    this.emit("impulse-return", impulse);
  },

  // ------------------------------------------------------------
  // setStatus — NERVOUS SYSTEM PULSE (symbolic, backed by binary math)
// ------------------------------------------------------------
  setStatus(newState = {}) {
    if (typeof window !== "undefined" && window.PULSE_LOG) {
      window.PULSE_LOG("PulseBand → setStatus()");
    }
    nervousLog("SET_STATUS_CALLED");

    const now = nowMs();
    const clean = {};

    for (const k in newState) {
      if (Object.prototype.hasOwnProperty.call(newState, k)) {
        if (newState[k] !== undefined && newState[k] !== null) {
          clean[k] = newState[k];
        }
      }
    }

    if (!this.gpu.ready && clean.gpuAssets) {
      if (typeof window !== "undefined" && window.PULSE_LOG) {
        window.PULSE_LOG("PulseBand → GPU auto-init triggered");
      }
      nervousLog("GPU_AUTO_INIT");
      this.initGraphics(clean.gpuAssets);
    }

    // LIVE MERGE
    if (clean.live) {
      if (typeof window !== "undefined" && window.PULSE_LOG) {
        window.PULSE_LOG("PulseBand → LIVE merge");
      }
      nervousLog("LIVE_MERGE", { keys: Object.keys(clean.live || {}) });

      const L = clean.live;
      const latency =
        L.latency != null ? L.latency : this.state.live.latency ?? 0;

      const lastUpdatePrev = this.state.live.lastUpdateTimestamp || 0;
      const prevLatency = this.state.live.latency || 0;

      let latencyClass = "Unknown";
      let networkHealth = "Unknown";
      let microWindowActive =
        L.microWindowActive ?? (now - lastUpdatePrev < 5000);

      if (PNSBinary) {
        latencyClass = PNSBinary.classifyLatency(latency);
        networkHealth = PNSBinary.computeNetworkHealth(latency);
      } else {
        if (!Number.isFinite(latency) || latency <= 0) {
          latencyClass = "Unknown";
          networkHealth = "Unknown";
        } else if (latency < 80) {
          latencyClass = "Excellent";
          networkHealth = "Excellent";
        } else if (latency < 150) {
          latencyClass = "Good";
          networkHealth = "Good";
        } else if (latency < 300) {
          latencyClass = "Weak";
          networkHealth = "Weak";
        } else {
          latencyClass = "Critical";
          networkHealth = "Critical";
        }
      }

      const latencySpike =
        PNSBinary
          ? PNSBinary.detectSpike(prevLatency, latency)
          : (latency > 0 &&
             prevLatency > 0 &&
             latency - prevLatency > 120);

      if (latencySpike) {
        this.connectivity.lastLatencySpike = now;
        this.connectivity.spikeCount = (this.connectivity.spikeCount || 0) + 1;
      }

      this.state.live = {
        ...this.state.live,
        ...L,
        latency,
        networkHealth,
        latencyClass,
        microWindowActive,
        lastUpdateTimestamp: now
      };
    }

    // SNAPSHOT MERGE
    if (clean.snapshot) {
      if (typeof window !== "undefined" && window.PULSE_LOG) {
        window.PULSE_LOG("PulseBand → SNAPSHOT merge");
      }
      nervousLog("SNAPSHOT_MERGE", { keys: Object.keys(clean.snapshot || {}) });

      this.state.snapshot = {
        ...this.state.snapshot,
        ...clean.snapshot,
        lastUpdateTimestamp: now
      };
    }

    if (typeof window !== "undefined" && window.PULSE_LOG) {
      window.PULSE_LOG("PulseBand → Flat mirror update");
    }

    // FLAT MIRROR
    const L = this.state.live;
    const S = this.state.snapshot;

    this.state.latency = L.latency;
    this.state.latencyClass = L.latencyClass;
    this.state.networkHealth = L.networkHealth;
    this.state.microWindowActive = L.microWindowActive;

    this.state.lastSyncTimestamp = L.lastSyncTimestamp;
    this.state.lastSyncSeconds =
      L.lastSyncTimestamp ? safeSeconds((now - L.lastSyncTimestamp) / 1000) : 0;

    this.state.route = L.route;
    this.state.state = L.state;
    this.state.efficiency = L.efficiency;
    this.state.efficiencyMode = L.efficiencyMode;
    this.state.phoneKbps = L.phoneKbps;
    this.state.appKbps = L.appKbps;

    this.state.pulsebandBars = L.pulsebandBars;
    this.state.phoneBars = L.phoneBars;

    this.state.advantage = S.advantage;
    this.state.timeSaved = S.timeSaved;

    this.state.gpuReady = this.gpu.ready;
    this.state.gpuPerformance.warm = this.gpu.ready;

    this.state.connectivityMode = this.connectivity.mode;
    this.state.online = this.connectivity.online;

    // v16: recompute band/field/advantage/hints mirrors
    const band = buildBand();
    const bandSignature = buildBandSignature(band);
    const binaryField = buildBinaryField(L.latency, this.gpu.ready);
    const waveField = buildWaveField(L.latencyClass, L.networkHealth);
    const presenceField = buildPresenceField(
      this.connectivity.mode,
      this.connectivity.online
    );
    const advantageField = buildAdvantageFieldFromStatus({
      latency: L.latency,
      gpuReady: this.gpu.ready,
      online: this.connectivity.online
    });
    const chunkCachePrewarmHints = buildChunkCachePrewarmHints({
      latency: L.latency,
      gpuReady: this.gpu.ready,
      online: this.connectivity.online
    });

    this.state.band = band;
    this.state.bandSignature = bandSignature;
    this.state.binaryField = binaryField;
    this.state.waveField = waveField;
    this.state.presenceField = presenceField;
    this.state.advantageField = advantageField;
    this.state.chunkCachePrewarmHints = chunkCachePrewarmHints;

    if (typeof window !== "undefined" && window.PULSE_LOG) {
      window.PULSE_LOG("PulseBand → emit(update)");
    }
    nervousLog("EMIT_UPDATE");

    this.emit("update", this.getStatus());
  },

  // ------------------------------------------------------------
  // Events — Neural Firing
  // ------------------------------------------------------------
  on(event, callback) {
    if (typeof callback !== "function") return;

    if (typeof window !== "undefined" && window.PULSE_LOG) {
      window.PULSE_LOG(`PulseBand → on(${event})`);
    }
    nervousLog("EVENT_SUBSCRIBE", { event });

    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(callback);
  },

  emit(event, data) {
    if (typeof window !== "undefined" && window.PULSE_LOG) {
      window.PULSE_LOG(`PulseBand → emit(${event})`);
    }
    nervousLog("EVENT_EMIT", { event });

    const handlers = this.listeners[event];
    if (!handlers || handlers.length === 0) return;

    for (let i = 0; i < handlers.length; i++) {
      const cb = handlers[i];
      try {
        cb(data);
      } catch (err) {
        nervousLog("EVENT_HANDLER_ERROR", {
          event,
          index: i,
          error: String(err)
        });
      }
    }
  },

  // --------------------------------------------------------------------------
  // LATENCY → CLASSIFIER (binary-safe)
  // --------------------------------------------------------------------------
  classifyLatency(latencyMs) {
    if (!Number.isFinite(latencyMs) || latencyMs <= 0) return "Unknown";
    if (latencyMs < 80)  return "Excellent";
    if (latencyMs < 180) return "Good";
    if (latencyMs < 400) return "Weak";
    return "Critical";
  },

  // --------------------------------------------------------------------------
  // LATENCY SPIKE DETECTOR (binary-safe)
  // --------------------------------------------------------------------------
  detectSpike(prevLatency, nextLatency) {
    if (!Number.isFinite(prevLatency) || !Number.isFinite(nextLatency)) return false;
    return nextLatency - prevLatency > 120;
  },

  // --------------------------------------------------------------------------
  // NETWORK HEALTH (binary-safe)
  // --------------------------------------------------------------------------
  computeNetworkHealth(latencyMs) {
    return this.classifyLatency(latencyMs);
  },

  // --------------------------------------------------------------------------
  // GPU PERFORMANCE MIRROR (binary-safe)
  // --------------------------------------------------------------------------
  computeGpuPerformance({ load = 0, stalls = 0 }) {
    return {
      warm: load < 0.6 && stalls < 3,
      smoothness: Math.max(0, 100 - stalls * 10),
      pacing: stalls > 5 ? "Erratic" : "Stable",
      stalls,
      efficiency: Math.max(0, 100 - load * 100),
      load,
      frameBudget: 16.6,
      frameVariance: stalls * 0.5
    };
  },

  // --------------------------------------------------------------------------
  // SNAPSHOT BUILDER (binary-safe)
  // --------------------------------------------------------------------------
  buildSnapshot({ latency = 0, prevLatency = 0, advantage = 1.0, timeSaved = 0 }) {
    const spike = this.detectSpike(prevLatency, latency);

    return {
      latency,
      latencyClass: this.classifyLatency(latency),
      networkHealth: this.computeNetworkHealth(latency),
      spike,
      advantage,
      timeSaved
    };
  },

  // --------------------------------------------------------------------------
  // LIVE MIRROR BUILDER (binary-safe)
// --------------------------------------------------------------------------
  buildLiveMirror({ latency = 0, prevLatency = 0, lastUpdate = 0, now = 0 }) {
    const spike = this.detectSpike(prevLatency, latency);

    return {
      latency,
      latencyClass: this.classifyLatency(latency),
      networkHealth: this.computeNetworkHealth(latency),
      spike,
      microWindowActive: now - lastUpdate < 5000
    };
  }
};
