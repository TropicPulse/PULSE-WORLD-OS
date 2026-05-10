// ============================================================================
//  PULSE OS v20‑IMMORTAL‑PRESENCE‑ADVANTAGE — PROXY OUTER AGENT
//  “THE OUTER AGENT / EXTERNAL NEGOTIATOR / EXPERIENCE AMBASSADOR / ADVANTAGE ENGINE”
//  External Interface • Job Courier • Device Ambassador • Experience Surface
//  PURE NEGOTIATION. NO MARKETPLACE LOGIC. NO OS STATE MUTATION.
//  DUAL‑MODE: Binary Core (pure descriptors) + Symbolic Wrapper (fetch + logs)
//  v20‑IMMORTAL: Advantage‑aware, band/field/presence/experience surfaces,
//  PNS repair/purifier‑aware (symbolic only), drift‑proof, organism‑aware,
//  chunk/cache/prewarm‑aware, speed‑aware, world‑lens‑aware (metadata only).
// ============================================================================
import {
  OrganismIdentity,
  buildPulseOrganismMap as buildOrganismMap
} from "../PULSE-X/PulseWorldOrganismMap-v24.js";
const Identity = OrganismIdentity(import.meta.url);

// 2 — EXPORT GENOME METADATA
// export const PulseMeshMeta = Identity.OrganMeta;
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
// export const PULSE_EARN_IMMUNE_CONTEXT = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

// ============================================================================
//  GLOBAL WIRING — Safe, boundary‑first, no hard global dependency
// ============================================================================
const G =
  typeof globalThis !== "undefined"
    ? globalThis
    : typeof global !== "undefined"
    ? global
    : typeof window !== "undefined"
    ? window
    : {};

// Safe fallbacks — boundary organ, but never break if wiring incomplete
const log   = G.log   || console.log;
const error = G.error || console.error;

const fetchFn =
  (typeof G.fetch === "function" && G.fetch) ||
  null;

// Optional nervous‑system helpers (symbolic only, never required)
const PNSRepair   = G.PulsePNSRepair   || null;
const PNSPurifier = G.PulsePNSPurifier || null;

// Optional world‑lens / limbic / tri‑heart (metadata only)
const WorldLens = G.PulseWorldLens || null;
const TriHeart  = G.PulseTriHeart  || null;


// ============================================================================
//  IMMORTAL EXPERIENCE METABLOCK — v20 OUTER AGENT EXPERIENCE SURFACE
// ============================================================================
export const PulseProxyOuterAgentExperienceMeta = Object.freeze({
  layer: "PulseProxyOuterAgent",
  role: "EXTERNAL_NEGOTIATOR_EXPERIENCE_SURFACE",
  version: "v20-Immortal-Presence-Advantage",
  identity: "PulseProxyOuterAgent-v20-Immortal-Experience",
  purpose:
    "Expose external negotiation as a safe, inspectable experience surface " +
    "for CNS/PNS, healers, and evolution organs.",
  evo: Object.freeze({
    organismAware: true,
    meshAware: true,
    expansionAware: true,
    serverAware: true,
    routerAware: true,
    worldCoreAware: true,
    dualBandAware: true,
    advantageCascadeAware: true,
    unifiedAdvantageField: true,
    pulseEfficiencyAware: true,
    experienceSurfaceEmitter: true,
    negotiationTraceEmitter: true,
    healingSignalEmitter: true,
    pnsRepairAware: true,
    pnsPurifierAware: true,

    // v20 overlays
    speedAware: true,
    speedFieldAware: true,
    chunkAware: true,
    cacheAware: true,
    prewarmAware: true,
    chunkCachePrewarmAware: true,
    gpuBufferAware: true,
    worldLensAware: true,
    limbicAware: true,
    triHeartAware: true,

    deterministic: true,
    driftProof: true,
    zeroRandomness: true,
    zeroDateNowInMath: true,
    zeroExternalMutation: true,
    zeroRouting: true,
    zeroMarketplaceLogic: true,
    zeroBusinessLogic: true,
    zeroGPU: true
  })
});

// ============================================================================
//  LAYER CONSTANTS + CONTEXT (v20‑IMMORTAL‑PRESENCE‑ADVANTAGE)
// ============================================================================
const AGENT_LAYER_ID   = "PROXY-OUTER-AGENT";
const AGENT_LAYER_NAME = "THE OUTER AGENT";
const AGENT_LAYER_ROLE = "External Interface + Job Courier + Experience Surface";

export const PROXY_OUTER_AGENT_CONTEXT = {
  layer: PulseRole.layer,
  role: PulseRole.identity,
  version: PulseRole.version,
  purpose: "External interface + job courier + credit sync + experience surface",
  evo: PulseRole.evo
};

export const PulseProxyOuterAgentMeta = Object.freeze({
  layer: "PulseProxyOuterAgent",
  role: "EXTERNAL_NEGOTIATOR_BOUNDARY_ORGAN",
  version: "v20-Immortal-Presence-Advantage",
  identity: "PulseProxyOuterAgent-v20-Immortal-Presence-Advantage",

  guarantees: Object.freeze({
    deterministic: true,
    driftProof: true,
    multiInstanceReady: true,

    // Outer Agent laws
    boundaryOrgan: true,
    externalNegotiator: true,
    jobCourier: true,
    deviceAmbassador: true,
    marketplaceBoundary: true,
    backendPreferred: true,
    binaryFirst: true,
    dualModeEvolution: true,
    unifiedAdvantageField: true,
    pulseEfficiencyAware: true,
    experienceSurfaceEmitter: true,
    negotiationTraceEmitter: true,
    healingSignalEmitter: true,

    // v20 overlays
    speedAware: true,
    speedFieldAware: true,
    chunkAware: true,
    cacheAware: true,
    prewarmAware: true,
    chunkCachePrewarmAware: true,
    gpuBufferAware: true,

    // Execution prohibitions (network allowed, but bounded)
    zeroIQ: true,
    zeroRouting: true,
    zeroCompute: true,
    zeroMarketplaceLogic: true,
    zeroOSStateMutation: true,
    zeroRandomness: true,
    zeroDateNow: true,             // timestamps allowed only in diagnostics, not math
    zeroTimers: true,
    zeroAsync: false,              // async allowed for fetch
    zeroNetworkMutation: true,
    zeroExternalMutation: true,
    zeroDynamicImports: true,
    zeroEval: true,
    zeroWindow: true,
    zeroDOM: true,
    zeroGPU: true,

    // Awareness
    binaryAware: true,
    symbolicAware: true,
    bandAware: true,
    waveFieldAware: true,
    binaryFieldAware: true,
    presenceAware: true,
    presenceFieldAware: true,
    experienceAware: true,
    advantageAware: true,

    // Environment
    worldLensAware: true
  }),

  contract: Object.freeze({
    input: [
      "NegotiationPayload",
      "BinaryDescriptor",
      "SymbolicPayload",
      "DualBandContext",
      "PresenceContext",
      "ExperienceContext",
      "AdvantageContext",
      "SpeedContext",
      "ChunkContext"
    ],
    output: [
      "OuterAgentNegotiationResult",
      "OuterAgentBandSignature",
      "OuterAgentBinaryField",
      "OuterAgentWaveField",
      "OuterAgentPresenceField",
      "OuterAgentAdvantageField",
      "OuterAgentSpeedField",
      "OuterAgentChunkHints",
      "OuterAgentExperienceField",
      "OuterAgentDiagnostics",
      "OuterAgentHealingState"
    ]
  }),

  lineage: Object.freeze({
    root: "PulseProxy-v11",
    parent: "PulseProxy-v20-Immortal",
    ancestry: [
      "PulseProxyOuterAgent-v7",
      "PulseProxyOuterAgent-v8",
      "PulseProxyOuterAgent-v9",
      "PulseProxyOuterAgent-v10",
      "PulseProxyOuterAgent-v11",
      "PulseProxyOuterAgent-v11-Evo",
      "PulseProxyOuterAgent-v11-Evo-Prime",
      "PulseProxyOuterAgent-v12.3-Evo-Presence",
      "PulseProxyOuterAgent-v16.3-Immortal-Presence"
    ]
  }),

  bands: Object.freeze({
    supported: ["binary", "symbolic", "dual"],
    default: "binary",
    behavior: "outer-agent-negotiator"
  }),

  architecture: Object.freeze({
    pattern: "A-B-A",
    baseline: "binary descriptor → negotiation → symbolic fallback",
    adaptive:
      "dual-band overlays + boundary-safe negotiation + presence + advantage " +
      "+ speed + chunk/cache/prewarm + experience surfaces + PNS repair/purifier awareness",
    return: "deterministic negotiation surfaces + signatures + healing signals"
  })
});


// ============================================================================
//  DIAGNOSTICS + IMMORTAL HEALING STATE — v20 OUTER AGENT
// ============================================================================
const AGENT_DIAGNOSTICS_ENABLED =
  (typeof G.PULSE_AGENT_DIAGNOSTICS === "boolean" && G.PULSE_AGENT_DIAGNOSTICS === true) ||
  (typeof G.PULSE_DIAGNOSTICS === "boolean" && G.PULSE_DIAGNOSTICS === true) ||
  false;

function safeNowMs() {
  // allowed only for diagnostics / healing state, never for decision math
  return Date.now();
}

function computeHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 99991;
  }
  return `h${h}`;
}

function buildBand(mode) {
  if (mode === "binary") return "binary";
  if (mode === "symbolic") return "symbolic";
  return "dual";
}

function buildBandSignature(band, stage) {
  return computeHash(`OUTER_AGENT_BAND::${band}::${stage || "UNKNOWN"}`);
}

function buildBinaryField(descriptor) {
  const url = descriptor?.url || "";
  const len = url.length;
  const density = len === 0 ? 0 : Math.min(1, len / 4096);
  const surface = len + Math.floor(density * 2000);

  return {
    urlLength: len,
    density,
    surface,
    binaryPhenotypeSignature: `outer-binary-pheno-${surface % 99991}`,
    binarySurfaceSignature: `outer-binary-surface-${(surface * 11) % 99991}`,
    parity: surface % 2,
    shiftDepth: Math.max(0, Math.floor(Math.log2(surface || 1)))
  };
}

function buildWaveField(stage, method) {
  const key = `${stage || "UNKNOWN"}::${method || "GET"}`;
  const amplitude = 6 + (key.length % 10);
  const wavelength = amplitude + 8;
  const phase = (amplitude * 5) % 32;

  return {
    amplitude,
    wavelength,
    phase,
    band: "outer-agent",
    mode: "symbolic-wave",
    waveSignature: computeHash(`OUTER_AGENT_WAVE::${key}::${amplitude}`)
  };
}

function buildPresenceField(presenceContext) {
  const mode = presenceContext?.mode || "auto";
  const online = presenceContext?.online !== false;
  const focus =
    mode === "local"
      ? "local-focus"
      : mode === "online"
      ? "network-focus"
      : "auto-focus";

  const state = online ? "present" : "degraded";

  return {
    focus,
    state,
    presenceSignature: computeHash(
      `OUTER_AGENT_PRESENCE::${mode}::${online ? "1" : "0"}`
    )
  };
}

function buildSpeedField({ binaryField, waveField, presenceField }) {
  const density = binaryField?.density || 0;
  const amplitude = waveField?.amplitude || 0;
  const online = presenceField?.state === "present";

  const baseSpeed = density === 0 ? 0.2 : Math.min(1, density * 1.5);
  const waveFactor = amplitude > 0 ? Math.min(1, amplitude / 32) : 0.3;
  const presenceBoost = online ? 0.2 : -0.1;

  let speedScore = baseSpeed * 0.6 + waveFactor * 0.3 + presenceBoost;
  if (speedScore < 0) speedScore = 0;
  if (speedScore > 1) speedScore = 1;

  let speedBand = "steady";
  if (speedScore < 0.25) speedBand = "slow";
  else if (speedScore < 0.6) speedBand = "steady";
  else speedBand = "quickened";

  return {
    speedScore,
    speedBand,
    speedSignature: computeHash(
      `OUTER_AGENT_SPEED::${speedScore}::${speedBand}`
    )
  };
}

function buildChunkHints({ binaryField, speedField }) {
  const density = binaryField?.density || 0;
  const speedBand = speedField?.speedBand || "steady";

  const hints = [];

  if (density > 0.5) {
    hints.push("prewarm_large_payload_cache");
  } else if (density > 0.1) {
    hints.push("prewarm_medium_payload_cache");
  }

  if (speedBand === "quickened") {
    hints.push("prioritize_low_latency_paths");
  } else if (speedBand === "slow") {
    hints.push("defer_non_critical_routes");
  }

  if (hints.length === 0) {
    hints.push("no_special_prewarm");
  }

  return {
    hints,
    chunkSignature: computeHash(
      `OUTER_AGENT_CHUNK::${density}::${speedBand}::${hints.join("|")}`
    )
  };
}

function buildAdvantageField(binaryField, waveField, band, speedField) {
  const density = binaryField?.density || 0;
  const amplitude = waveField?.amplitude || 0;
  const wavelength = waveField?.wavelength || 0;
  const speedScore = speedField?.speedScore || 0;

  const efficiency = density === 0 ? 0 : (amplitude + 1) / (wavelength + 1);
  const stress = Math.min(1, density * 2);
  const advantageScore = efficiency * (1 + stress) * (0.7 + speedScore * 0.3);

  return {
    band,
    density,
    amplitude,
    wavelength,
    efficiency,
    stress,
    speedScore,
    advantageScore,
    advantageSignature: computeHash(
      `OUTER_AGENT_ADVANTAGE::${band}::${density}::${amplitude}::${wavelength}::${advantageScore}`
    )
  };
}

function buildExperienceField({ stage, deviceId, ok, errorMessage, worldLensContext }) {
  const ts = safeNowMs();
  const quality =
    ok === true ? "smooth" : ok === false ? "rough" : "unknown";

  const worldLensBand = worldLensContext?.band || "unknown";
  const worldLensLoad = worldLensContext?.load || "normal";

  return {
    stage: stage || "UNKNOWN",
    deviceId: deviceId || null,
    quality,
    errorMessage: errorMessage || null,
    worldLensBand,
    worldLensLoad,
    tickSignature: computeHash(
      `OUTER_AGENT_EXPERIENCE::${stage || "UNKNOWN"}::${quality}::${deviceId || "NO_DEVICE"}::${worldLensBand}::${worldLensLoad}`
    ),
    ts
  };
}

const outerAgentHealingState = {
  ...PROXY_OUTER_AGENT_CONTEXT,
  lastStage: null,
  lastError: null,
  lastOk: null,
  lastBand: null,
  lastAdvantageScore: null,
  lastSpeedScore: null,
  lastExperienceQuality: null,
  lastExperienceTick: null,
  lastChunkHints: null,
  cycleCount: 0
};

function agentLog(stage, details = {}) {
  if (!AGENT_DIAGNOSTICS_ENABLED) return;

  try {
    log(
      "outer-agent",
      JSON.stringify({
        pulseLayer: AGENT_LAYER_ID,
        pulseName: AGENT_LAYER_NAME,
        pulseRole: AGENT_LAYER_ROLE,
        stage,
        ...details,
        meta: { ...PROXY_OUTER_AGENT_CONTEXT }
      })
    );
  } catch {}
}

function updateHealingState({ stage, ok, band, advantageField, speedField, chunkHints, experienceField, errorMessage }) {
  outerAgentHealingState.lastStage = stage || outerAgentHealingState.lastStage;
  outerAgentHealingState.lastOk = typeof ok === "boolean" ? ok : outerAgentHealingState.lastOk;
  outerAgentHealingState.lastBand = band || outerAgentHealingState.lastBand;
  outerAgentHealingState.lastAdvantageScore =
    typeof advantageField?.advantageScore === "number"
      ? advantageField.advantageScore
      : outerAgentHealingState.lastAdvantageScore;
  outerAgentHealingState.lastSpeedScore =
    typeof speedField?.speedScore === "number"
      ? speedField.speedScore
      : outerAgentHealingState.lastSpeedScore;
  outerAgentHealingState.lastExperienceQuality =
    experienceField?.quality || outerAgentHealingState.lastExperienceQuality;
  outerAgentHealingState.lastExperienceTick =
    experienceField?.ts || outerAgentHealingState.lastExperienceTick;
  outerAgentHealingState.lastError =
    errorMessage || outerAgentHealingState.lastError;
  outerAgentHealingState.lastChunkHints =
    chunkHints?.hints || outerAgentHealingState.lastChunkHints;
  outerAgentHealingState.cycleCount += 1;

  // Optional symbolic healing hooks (never required, never fatal)
  try {
    if (PNSRepair && typeof PNSRepair.signal === "function") {
      PNSRepair.signal("OuterAgent", {
        stage,
        ok,
        band,
        advantageScore: advantageField?.advantageScore || 0,
        speedScore: speedField?.speedScore || 0,
        experienceQuality: experienceField?.quality || "unknown"
      });
    }
  } catch {}

  try {
    if (PNSPurifier && typeof PNSPurifier.signal === "function") {
      PNSPurifier.signal("OuterAgent", {
        stage,
        ok,
        errorMessage: errorMessage || null
      });
    }
  } catch {}

  try {
    if (TriHeart && typeof TriHeart.signal === "function") {
      TriHeart.signal("OuterAgent", {
        stage,
        ok,
        band,
        advantageScore: advantageField?.advantageScore || 0,
        speedScore: speedField?.speedScore || 0
      });
    }
  } catch {}
}

function getWorldLensContext() {
  try {
    if (!WorldLens || typeof WorldLens.snapshot !== "function") {
      return { band: "unknown", load: "normal" };
    }
    const snap = WorldLens.snapshot();
    return {
      band: snap?.band || "unknown",
      load: snap?.load || "normal"
    };
  } catch {
    return { band: "unknown", load: "normal" };
  }
}

export function getOuterAgentHealingState() {
  return { ...outerAgentHealingState };
}

agentLog("AGENT_INIT_V20_IMMORTAL_PRESENCE_ADVANTAGE");


// ============================================================================
//  BINARY CORE — Pure, deterministic descriptor builder
// ============================================================================

function buildBaseUrlBinary(envBaseUrl) {
  if (typeof envBaseUrl === "string" && envBaseUrl) return envBaseUrl;
  if (typeof G.PULSE_PROXY_BASE_URL === "string" && G.PULSE_PROXY_BASE_URL) {
    return G.PULSE_PROXY_BASE_URL;
  }
  // still compatible with remote or local proxy; caller controls baseUrl
  return "https://www.tropicpulse.bz/proxy";
}

function buildRegisterDescriptorBinary(deviceId, gpuInfo, baseUrl) {
  const url = String(baseUrl) + "/registerDevice";
  const body = {
    deviceId: deviceId ?? null,
    gpuInfo: gpuInfo ?? null
  };

  return {
    stage: "REGISTER",
    url,
    options: {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    }
  };
}

function buildRequestJobDescriptorBinary(deviceId, baseUrl) {
  const encodedId = encodeURIComponent(String(deviceId ?? ""));
  const url = String(baseUrl) + "/getJob?deviceId=" + encodedId;

  return {
    stage: "REQUEST_JOB",
    url,
    options: {}
  };
}

function buildSubmitResultDescriptorBinary(deviceId, jobId, result, baseUrl) {
  const url = String(baseUrl) + "/submitJob";
  const body = {
    deviceId: deviceId ?? null,
    jobId: jobId ?? null,
    result
  };

  return {
    stage: "SUBMIT_RESULT",
    url,
    options: {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    }
  };
}

function buildSyncCreditsDescriptorBinary(deviceId, baseUrl) {
  const encodedId = encodeURIComponent(String(deviceId ?? ""));
  const url = String(baseUrl) + "/syncCredits?deviceId=" + encodedId;

  return {
    stage: "SYNC_CREDITS",
    url,
    options: {}
  };
}

export const PulseProxyOuterAgentBinary = {
  buildBaseUrl: buildBaseUrlBinary,
  buildRegisterDescriptor: buildRegisterDescriptorBinary,
  buildRequestJobDescriptor: buildRequestJobDescriptorBinary,
  buildSubmitResultDescriptor: buildSubmitResultDescriptorBinary,
  buildSyncCreditsDescriptor: buildSyncCreditsDescriptorBinary,
  meta: { ...PROXY_OUTER_AGENT_CONTEXT, mode: "binary-core" }
};


// ============================================================================
//  SYMBOLIC WRAPPER — Uses binary descriptors + fetchFn + diagnostics
//  v20: wraps every negotiation in band/field/presence/advantage/speed/chunk/experience
// ============================================================================

async function doFetchSymbolic(descriptor, { presenceContext, deviceId } = {}) {
  const { url, options, stage } = descriptor;

  const band = buildBand("binary");
  const bandSignature = buildBandSignature(band, stage);
  const binaryField = buildBinaryField(descriptor);
  const waveField = buildWaveField(stage, options?.method || "GET");
  const presenceField = buildPresenceField(presenceContext);
  const speedField = buildSpeedField({ binaryField, waveField, presenceField });
  const chunkHints = buildChunkHints({ binaryField, speedField });
  const advantageField = buildAdvantageField(binaryField, waveField, band, speedField);
  const worldLensContext = getWorldLensContext();

  if (!fetchFn) {
    const msg = "fetch not available in this runtime";
    const experienceField = buildExperienceField({
      stage,
      deviceId,
      ok: false,
      errorMessage: msg,
      worldLensContext
    });

    updateHealingState({
      stage,
      ok: false,
      band,
      advantageField,
      speedField,
      chunkHints,
      experienceField,
      errorMessage: msg
    });

    agentLog(stage + "_NO_FETCH", {
      url,
      error: msg,
      band,
      bandSignature,
      binaryField,
      waveField,
      presenceField,
      speedField,
      chunkHints,
      advantageField,
      experienceField
    });

    return {
      error: true,
      message: msg,
      band,
      bandSignature,
      binaryField,
      waveField,
      presenceField,
      speedField,
      chunkHints,
      advantageField,
      experienceField
    };
  }

  try {
    const res = await fetchFn(url, options || {});
    let json = null;

    try {
      json = await res.json();
    } catch {
      json = { ok: res.ok, status: res.status };
    }

    const ok = !json?.error && res.ok;
    const experienceField = buildExperienceField({
      stage,
      deviceId,
      ok,
      errorMessage: json?.error ? String(json.error) : null,
      worldLensContext
    });

    updateHealingState({
      stage,
      ok,
      band,
      advantageField,
      speedField,
      chunkHints,
      experienceField,
      errorMessage: json?.error ? String(json.error) : null
    });

    agentLog(
      ok ? stage + "_SUCCESS" : stage + "_FAIL",
      {
        url,
        response: json,
        band,
        bandSignature,
        binaryField,
        waveField,
        presenceField,
        speedField,
        chunkHints,
        advantageField,
        experienceField
      }
    );

    return {
      ...json,
      band,
      bandSignature,
      binaryField,
      waveField,
      presenceField,
      speedField,
      chunkHints,
      advantageField,
      experienceField
    };
  } catch (err) {
    const msg = String(err?.message || err);
    error("PulseProxyOuterAgent.fetch failed:", msg);

    const worldLensContext2 = getWorldLensContext();
    const experienceField = buildExperienceField({
      stage,
      deviceId,
      ok: false,
      errorMessage: msg,
      worldLensContext: worldLensContext2
    });

    updateHealingState({
      stage,
      ok: false,
      band,
      advantageField,
      speedField,
      chunkHints,
      experienceField,
      errorMessage: msg
    });

    agentLog(stage + "_FETCH_ERROR", {
      url,
      error: msg,
      band,
      bandSignature,
      binaryField,
      waveField,
      presenceField,
      speedField,
      chunkHints,
      advantageField,
      experienceField
    });

    return {
      error: true,
      message: msg,
      band,
      bandSignature,
      binaryField,
      waveField,
      presenceField,
      speedField,
      chunkHints,
      advantageField,
      experienceField
    };
  }
}


// ============================================================================
//  OUTER AGENT CLASS — External Negotiator / Experience Surface
//  (instance fields are boundary‑local, no global mutation)
// ============================================================================
export class PulseProxyOuterAgent {
  constructor({ deviceId, gpuInfo, baseUrl, presenceContext } = {}) {
    this.deviceId        = deviceId ?? null;
    this.gpuInfo         = gpuInfo || null;
    this.baseUrl         = buildBaseUrlBinary(baseUrl);
    this.presenceContext = presenceContext || null;

    agentLog("AGENT_CONSTRUCTED_V20_IMMORTAL", {
      deviceId: this.deviceId,
      gpuInfo: this.gpuInfo,
      baseUrl: this.baseUrl
    });

    if (!fetchFn) {
      agentLog("FETCH_MISSING", {
        warning: "No fetch available in runtime — outer agent is inert."
      });
    }
  }

  // REGISTER DEVICE — Introduce identity outward
  async register() {
    const descriptor = buildRegisterDescriptorBinary(
      this.deviceId,
      this.gpuInfo,
      this.baseUrl
    );

    agentLog(descriptor.stage + "_START", {
      deviceId: this.deviceId
    });

    const json = await doFetchSymbolic(descriptor, {
      presenceContext: this.presenceContext,
      deviceId: this.deviceId
    });

    return json;
  }

  // REQUEST JOB — Ask the outside world for work
  async requestJob() {
    const descriptor = buildRequestJobDescriptorBinary(
      this.deviceId,
      this.baseUrl
    );

    agentLog(descriptor.stage + "_START", {
      deviceId: this.deviceId
    });

    const json = await doFetchSymbolic(descriptor, {
      presenceContext: this.presenceContext,
      deviceId: this.deviceId
    });

    return json;
  }

  // SUBMIT RESULT — Hand completed work back outward
  async submitResult(jobId, result) {
    const descriptor = buildSubmitResultDescriptorBinary(
      this.deviceId,
      jobId,
      result,
      this.baseUrl
    );

    agentLog(descriptor.stage + "_START", {
      deviceId: this.deviceId,
      jobId
    });

    const json = await doFetchSymbolic(descriptor, {
      presenceContext: this.presenceContext,
      deviceId: this.deviceId
    });

    return json;
  }

  // SYNC CREDITS — Exchange tokens with the outside world
  async syncCredits() {
    const descriptor = buildSyncCreditsDescriptorBinary(
      this.deviceId,
      this.baseUrl
    );

    agentLog(descriptor.stage + "_START", {
      deviceId: this.deviceId
    });

    const json = await doFetchSymbolic(descriptor, {
      presenceContext: this.presenceContext,
      deviceId: this.deviceId
    });

    return json;
  }
}


// ============================================================================
//  EXPORTED META — SAFE FOR INTROSPECTION
// ============================================================================
export const PULSE_PROXY_OUTER_AGENT_META = {
  ...PROXY_OUTER_AGENT_CONTEXT,
  experience: { ...PulseProxyOuterAgentExperienceMeta }
};
