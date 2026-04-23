// ============================================================================
//  PulseSendImpulse-v11-Evo.js
//  Nerve‑Spark • Pulse‑Agnostic Trigger Organ • Fires the Movement
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
// ⭐ PulseRole — identifies this as the PulseSend Impulse Organ (v11-Evo)
// ============================================================================
export const PulseRole = {
  type: "Messenger",
  subsystem: "PulseSend",
  layer: "Impulse",
  version: "11.0",
  identity: "PulseSendImpulse-v11-Evo",

  evo: {
    driftProof: true,
    reflexReady: true,
    sparkReady: true,
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
    impulseSurfaceReady: true
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

function buildImpulseDiagnostics({ pulse, targetOrgan, pathway, mode }) {
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
//  FACTORY — Create the Impulse Organ (v11-Evo)
// ============================================================================
export function createPulseSendImpulse({ mover, log }) {
  return {
    PulseRole,

    fire({ pulse, targetOrgan, pathway, mode = "normal" }) {

      const diagnostics = buildImpulseDiagnostics({
        pulse,
        targetOrgan,
        pathway,
        mode
      });

      const advantageField = pulse?.advantageField || null;

      // ⭐ v11 logging surface
      log && log("[PulseSendImpulse-v11-Evo] Spark fired", {
        jobId: pulse.jobId,
        diagnostics,
        advantageField
      });

      // ⭐ v11 signatures
      const impulseSignature = computeHash(
        diagnostics.pattern +
        "::" +
        diagnostics.lineageDepth +
        "::" +
        diagnostics.targetOrgan +
        "::" +
        diagnostics.mode
      );

      // ⭐ Trigger the mover (pure spark)
      const movement = mover.move({
        pulse,
        targetOrgan,
        pathway,
        mode
      });

      return {
        impulseSignature,
        diagnostics,
        movement
      };
    }
  };
}
