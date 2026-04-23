// ============================================================================
//  PulseMesh-v11-Evo
//  Deterministic Pathway Engine • Pulse-Agnostic • Evolution-Aware
//  v11: Pathway Surface + Mode Surface + Diagnostics + Signatures + Legacy Map
// ============================================================================

export const PulseRole = {
  type: "Mesh",
  subsystem: "PulseMesh",
  layer: "PathwayEngine",
  version: "11.0",
  identity: "PulseMesh-v11-Evo",

  evo: {
    driftProof: true,
    patternAware: true,
    lineageAware: true,
    modeAware: true,
    identityAware: true,
    advantageAware: true,
    deterministicPathways: true,
    futureEvolutionReady: true,

    unifiedAdvantageField: true,
    pulseMesh11Ready: true,

    pathwaySurfaceReady: true,
    diagnosticsReady: true,
    signatureReady: true,
    legacyBridgeCapable: true
  },

  pulseContract: "Pulse-v1/v2/v3",
  routerContract: "PulseRouter-v11",
  sendContract: "PulseSend-v11"
};


// ---------------------------------------------------------------------------
// INTERNAL: Deterministic hash helper
// ---------------------------------------------------------------------------
function computeHash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h + str.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `h${h}`;
}


// ---------------------------------------------------------------------------
// INTERNAL: Pathway profiles (deterministic, static)
// ---------------------------------------------------------------------------
const BASE_PATHWAYS = {
  GPU: {
    style: "direct-burst",
    hops: ["Kernel", "GPUCluster", "GPUWorker"],
    reliability: 0.98
  },
  Earn: {
    style: "credit-chain",
    hops: ["Kernel", "EarnCore", "Ledger"],
    reliability: 0.97
  },
  OS: {
    style: "system-bridge",
    hops: ["Kernel", "OSBridge"],
    reliability: 0.99
  },
  Mesh: {
    style: "intra-mesh",
    hops: ["MeshHub"],
    reliability: 0.995
  },
  DEFAULT: {
    style: "neutral",
    hops: ["Kernel"],
    reliability: 0.96
  }
};


// ---------------------------------------------------------------------------
// INTERNAL: Legacy target mapping (9.2 / 10.4 → v11 keys)
// ---------------------------------------------------------------------------
function normalizeTargetOrgan(targetOrgan) {
  const key = (targetOrgan || "").toString().toLowerCase();

  // add any legacy names you actually used in 9.2 / 10.4
  if (key === "gpu" || key === "gpumesh" || key === "gpupath") return "GPU";
  if (key === "earn" || key === "earnengine" || key === "marketplace") return "Earn";
  if (key === "os" || key === "system" || key === "kernelbridge") return "OS";
  if (key === "mesh" || key === "pulsemesh") return "Mesh";

  // unknown / legacy → DEFAULT
  return "DEFAULT";
}


// ---------------------------------------------------------------------------
// INTERNAL: Mode bias
// ---------------------------------------------------------------------------
function computeModeBias(mode) {
  if (mode === "stress") return "low-latency";
  if (mode === "drain") return "low-energy";
  if (mode === "recovery") return "high-reliability";
  return "neutral";
}


// ---------------------------------------------------------------------------
// INTERNAL: Build pathway surface
// ---------------------------------------------------------------------------
function buildPathwaySurface(targetOrgan, mode, pulse) {
  const organKey = normalizeTargetOrgan(targetOrgan);
  const base = BASE_PATHWAYS[organKey] || BASE_PATHWAYS.DEFAULT;

  const modeBias = computeModeBias(mode);
  const lineageDepth = Array.isArray(pulse?.lineage) ? pulse.lineage.length : 0;
  const pattern = pulse?.pattern || "UNKNOWN_PATTERN";
  const pulseType = pulse?.pulseType || pulse?.PulseRole?.identity || "UNKNOWN_PULSE_TYPE";

  const raw = JSON.stringify({
    organKey,
    mode,
    modeBias,
    lineageDepth,
    pattern,
    pulseType
  });

  return {
    meshRole: PulseRole,
    targetOrgan: organKey,
    style: base.style,
    hops: base.hops.slice(),
    reliability: base.reliability,
    mode,
    modeBias,

    diagnostics: {
      pattern,
      lineageDepth,
      pulseType,
      patternHash: computeHash(pattern),
      lineageHash: computeHash(String(lineageDepth)),
      modeHash: computeHash(mode),
      organHash: computeHash(organKey)
    },

    pathwaySignature: computeHash(raw),
    organSignature: computeHash(organKey),
    meshSignature: computeHash(base.style)
  };
}


// ---------------------------------------------------------------------------
// PUBLIC API — PulseMesh (v11)
// ---------------------------------------------------------------------------
export const PulseMesh = {
  PulseRole,

  pathwayFor(targetOrgan, mode = "normal", pulse = null) {
    return buildPathwaySurface(targetOrgan, mode, pulse);
  },

  diagnostics() {
    return {
      PulseRole,
      basePathways: BASE_PATHWAYS,
      pathwayCount: Object.keys(BASE_PATHWAYS).length,
      pathwayKeys: Object.keys(BASE_PATHWAYS)
    };
  }
};
