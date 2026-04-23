// ============================================================================
//  PulseSendAdapter-v11-Evo.js
//  Pattern‑Shape Adapter • Pulse‑Agnostic Translator • Pre‑Delivery Adapter
//  v11: Diagnostics + Signatures + Pattern Surface + Lineage Surface
// ============================================================================
//
//  SAFETY CONTRACT (v11-Evo):
//  --------------------------
//  • No imports.
//  • No network.
//  • No compute.
//  • Zero randomness.
//  • Zero timestamps.
//  • Zero mutation outside instance.
// ============================================================================


// ============================================================================
// ⭐ PulseRole — identifies this as the PulseSend Adapter Organ (v11-Evo)
// ============================================================================
export const PulseRole = {
  type: "Messenger",
  subsystem: "PulseSend",
  layer: "Adapter",
  version: "11.0",
  identity: "PulseSendAdapter-v11-Evo",

  evo: {
    driftProof: true,
    shapeShiftReady: true,
    multiOrganReady: true,
    patternAware: true,
    lineageAware: true,
    modeAware: true,
    identityAware: true,
    selfTranslationReady: true,
    deterministicImpulseFlow: true,
    futureEvolutionReady: true,

    unifiedAdvantageField: true,
    pulseSend11Ready: true,

    diagnosticsReady: true,
    signatureReady: true,
    adapterSurfaceReady: true
  },

  routingContract: "PulseRouter-v11",
  meshContract: "PulseMesh-v11",
  pulseContract: "Pulse-v1/v2/v3",
  gpuOrganContract: "PulseGPU-v11",
  earnCompatibility: "PulseEarn-v11"
};


// ============================================================================
//  INTERNAL HELPERS — deterministic, tiny, pure
// ============================================================================
function computeHash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h + str.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `h${h}`;
}

function buildAdapterDiagnostics({ pulse, targetOrgan, mode }) {
  const pattern = pulse?.pattern || "NO_PATTERN";
  const lineageDepth = Array.isArray(pulse?.lineage) ? pulse.lineage.length : 0;
  const pulseType = pulse?.pulseType || pulse?.PulseRole?.identity || "UNKNOWN_PULSE_TYPE";

  return {
    pattern,
    lineageDepth,
    pulseType,
    targetOrgan: targetOrgan || "NO_ORGAN",
    mode,

    patternHash: computeHash(pattern),
    lineageHash: computeHash(String(lineageDepth)),
    pulseTypeHash: computeHash(pulseType),
    organHash: computeHash(String(targetOrgan)),
    modeHash: computeHash(mode)
  };
}


// ============================================================================
//  ADAPTER RULES — how each organ wants to receive a Pulse organism
// ============================================================================
const ORGAN_ADAPTERS = {
  GPU: (pulse, targetOrgan, mode) => ({
    target: targetOrgan,
    jobId: pulse.jobId,
    pattern: pulse.pattern,
    payload: pulse.payload,
    priority: pulse.priority,
    lineage: pulse.lineage,
    mode,
    pulseType: pulse.pulseType,
    advantageField: pulse.advantageField,
    gpuReady: true
  }),

  Earn: (pulse, targetOrgan, mode) => ({
    target: targetOrgan,
    jobId: pulse.jobId,
    pattern: pulse.pattern,
    payload: pulse.payload,
    priority: pulse.priority,
    lineage: pulse.lineage,
    mode,
    pulseType: pulse.pulseType,
    advantageField: pulse.advantageField,
    earnReady: true
  }),

  OS: (pulse, targetOrgan, mode) => ({
    target: targetOrgan,
    jobId: pulse.jobId,
    pattern: pulse.pattern,
    payload: pulse.payload,
    priority: pulse.priority,
    lineage: pulse.lineage,
    mode,
    pulseType: pulse.pulseType,
    advantageField: pulse.advantageField,
    osReady: true
  }),

  Mesh: (pulse, targetOrgan, mode) => ({
    target: targetOrgan,
    jobId: pulse.jobId,
    pattern: pulse.pattern,
    payload: pulse.payload,
    priority: pulse.priority,
    lineage: pulse.lineage,
    mode,
    pulseType: pulse.pulseType,
    advantageField: pulse.advantageField,
    meshReady: true
  })
};


// ============================================================================
//  FACTORY — Create an Adapter for ANY Pulse organism (v1/v2/v3)
// ============================================================================
export function adaptPulseSendPacket(pulse, targetOrgan, mode = "normal") {
  const pulseType = pulse?.pulseType || pulse?.PulseRole?.identity || "UNKNOWN_PULSE_TYPE";
  const advantageField = pulse?.advantageField || null;

  const diagnostics = buildAdapterDiagnostics({
    pulse,
    targetOrgan,
    mode
  });

  const adapterSignature = computeHash(
    diagnostics.pattern +
    "::" +
    diagnostics.targetOrgan +
    "::" +
    diagnostics.mode
  );

  const adapter = ORGAN_ADAPTERS[targetOrgan];

  if (typeof adapter === "function") {
    return {
      ...adapter(
        { ...pulse, pulseType, advantageField },
        targetOrgan,
        mode
      ),
      adapterSignature,
      diagnostics
    };
  }

  // ⭐ fallback: neutral shape
  return {
    target: targetOrgan,
    jobId: pulse.jobId,
    pattern: pulse.pattern,
    payload: pulse.payload,
    priority: pulse.priority,
    lineage: pulse.lineage,
    mode,
    pulseType,
    advantageField,
    neutral: true,
    adapterSignature,
    diagnostics
  };
}
