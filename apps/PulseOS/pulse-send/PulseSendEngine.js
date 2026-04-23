// ============================================================================
//  PulseSendMover-v11-Evo.js
//  Movement Organ • Pulse‑Agnostic • Deterministic Transport Muscle
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
// ⭐ PulseRole — identifies this as the PulseSend Mover Organ (v11-Evo)
// ============================================================================
export const PulseRole = {
  type: "Messenger",
  subsystem: "PulseSend",
  layer: "Mover",
  version: "11.0",
  identity: "PulseSendMover-v11-Evo",

  evo: {
    driftProof: true,
    moverReady: true,
    patternAware: true,
    lineageAware: true,
    modeAware: true,
    identityAware: true,
    multiOrganReady: true,
    deterministicImpulseFlow: true,
    futureEvolutionReady: true,

    unifiedAdvantageField: true,
    pulseSend11Ready: true,

    diagnosticsReady: true,
    signatureReady: true,
    movementSurfaceReady: true
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

function buildMovementDiagnostics({ pulse, targetOrgan, pathway, mode }) {
  const pattern = pulse?.pattern || "NO_PATTERN";
  const lineageDepth = Array.isArray(pulse?.lineage) ? pulse.lineage.length : 0;
  const pulseType = pulse?.pulseType || pulse?.PulseRole?.identity || "UNKNOWN_PULSE_TYPE";

  return {
    pattern,
    lineageDepth,
    pulseType,
    targetOrgan: targetOrgan || "NO_ORGAN",
    pathway: pathway || "NO_PATHWAY",
    mode,

    patternHash: computeHash(pattern),
    lineageHash: computeHash(String(lineageDepth)),
    pulseTypeHash: computeHash(pulseType),
    organHash: computeHash(String(targetOrgan)),
    pathwayHash: computeHash(JSON.stringify(pathway || {}))
  };
}


// ============================================================================
//  FACTORY — Create the Mover Organ (v11-Evo)
// ============================================================================
export function createPulseSendMover({ pulseMesh, log }) {
  return {
    PulseRole,

    move({ pulse, targetOrgan, pathway, mode = "normal" }) {

      const diagnostics = buildMovementDiagnostics({
        pulse,
        targetOrgan,
        pathway,
        mode
      });

      const advantageField = pulse?.advantageField || null;

      // ⭐ v11 logging surface
      log && log("[PulseSendMover-v11-Evo] Movement fired", {
        jobId: pulse.jobId,
        diagnostics,
        advantageField
      });

      // ⭐ v11 movement signature
      const movementSignature = computeHash(
        diagnostics.pattern +
        "::" +
        diagnostics.targetOrgan +
        "::" +
        diagnostics.mode
      );

      // ⭐ Return deterministic movement packet
      return {
        packet: {
          pulse,
          targetOrgan,
          pathway,
          mode,
          movementSignature,
          diagnostics
        }
      };
    }
  };
}


// ============================================================================
//  ORGAN EXPORT — ⭐ PulseSendMover (v11-Evo)
// ============================================================================
export const PulseSendMover = {
  PulseRole,

  move({ pulse, targetOrgan, pathway, mode }) {
    const pulseType = pulse?.pulseType || pulse?.PulseRole?.identity || "UNKNOWN_PULSE_TYPE";
    const pattern = pulse?.pattern || "NO_PATTERN";
    const lineageDepth = Array.isArray(pulse?.lineage) ? pulse.lineage.length : 0;
    const organLabel = targetOrgan || "NO_ORGAN";
    const pathwayLabel = pathway || "NO_PATHWAY";
    const modeLabel = mode || "NO_MODE";
    const advantageField = pulse?.advantageField || null;

    throw new Error(
      `[PulseSendMover-v11-Evo] move() called before initialization.\n` +
      `• pulseType: ${pulseType}\n` +
      `• pattern: ${pattern}\n` +
      `• lineageDepth: ${lineageDepth}\n` +
      `• targetOrgan: ${organLabel}\n` +
      `• pathway: ${pathwayLabel}\n` +
      `• mode: ${modeLabel}\n` +
      `• advantageField: ${JSON.stringify(advantageField)}\n` +
      `Use createPulseSendMover(...) to wire dependencies.`
    );
  }
};
