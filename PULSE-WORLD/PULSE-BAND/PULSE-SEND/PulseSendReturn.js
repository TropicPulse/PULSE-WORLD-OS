// ============================================================================
//  PulseSendReturn-v16-Immortal-ORGANISM.js
//  Return Arc • Pulse‑Agnostic Bounce‑Back Organ • Handles returnTo Logic
//  v16-Immortal-ORGANISM:
//    • Binary-aware + Movement-aware + DualStack-aware Return Surface
//    • DualHash surfaces (primary + secondary)
//    • Return Intelligence (IMMORTAL-safe, logic-only)
//    • Ancestry + Advantage echo preserved
// ============================================================================

/*
AI_EXPERIENCE_META = {
  identity: "PulseSendReturn",
  version: "v16-Immortal-ORGANISM",
  layer: "frontend",
  role: "send_return",
  lineage: "PulseOS-v12 → v14.4-Immortal → v16-Immortal-ORGANISM",

  evo: {
    deterministic: true,
    presenceAware: true,
    chunkAligned: true,
    safeRouteFree: true,
    dualHashSurfaces: true,
    returnIntelligence: true
  },

  contract: {
    always: [
      "PulseSendImpulse",
      "PulseSendSystem"
    ],
    never: [
      "legacyReturn",
      "safeRoute",
      "fetchViaCNS"
    ]
  }
}
*/

export const PulseRole = {
  type: "Messenger",
  subsystem: "PulseSend",
  layer: "Return",
  version: "16-Immortal-ORGANISM",
  identity: "PulseSendReturn-v16-Immortal-ORGANISM",

  evo: {
    driftProof: true,
    returnArcReady: true,
    patternAware: true,
    lineageAware: true,
    modeAware: true,
    multiOrganReady: true,
    deterministicImpulseFlow: true,
    futureEvolutionReady: true,

    unifiedAdvantageField: true,
    pulseSend11Ready: true,

    diagnosticsReady: true,
    signatureReady: true,
    returnSurfaceReady: true,

    // Binary-aware return surface:
    binaryAwareReturnReady: true,
    binaryFrontEndReady: true,
    dualStackReady: true,

    // Movement/packet aware
    movementPacketAware: true,

    // v16:
    dualHashSurfaces: true,
    returnIntelligenceReady: true
  },

  routingContract: "PulseRouter-v14",
  meshContract: "PulseMesh-v14",
  pulseContract: "Pulse-v1/v2/v3",
  gpuOrganContract: "PulseGPU-v14",
  earnCompatibility: "PulseEarn-v14"
};


// ============================================================================
//  INTERNAL HELPERS — deterministic, tiny, pure
// ============================================================================

function computeHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `h${h}`;
}

function computeHashAlt(str) {
  let h = 1;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h * 131 + s.charCodeAt(i) * (i + 7)) % 262139;
  }
  return `h2_${h}`;
}

function computeDualHash(value) {
  const s = typeof value === "string" ? value : JSON.stringify(value || {});
  return {
    primary: computeHash(s),
    secondary: computeHashAlt(s)
  };
}

function extractBinarySurfaceFromPulse(pulse) {
  const payload = pulse?.payload || {};

  const binaryPattern  = payload.binaryPattern || null;
  const binaryMode     = payload.binaryMode || null;
  const binaryPayload  = payload.binaryPayload || null;
  const binaryHints    = payload.binaryHints || null;
  const binaryStrength = typeof payload.binaryStrength === "number"
    ? payload.binaryStrength
    : null;

  const hasBinary =
    !!binaryPattern ||
    !!binaryMode ||
    !!binaryPayload ||
    !!binaryHints ||
    binaryStrength !== null;

  const routerHint = payload.routerHint ?? (binaryHints && binaryHints.routerHint) ?? null;
  const meshHint   = payload.meshHint   ?? (binaryHints && binaryHints.meshHint)   ?? null;
  const organHint  = payload.organHint  ?? (binaryHints && binaryHints.organHint)  ?? null;

  return {
    hasBinary,
    binaryPattern,
    binaryMode,
    binaryPayload,
    binaryHints,
    binaryStrength,
    routerHint,
    meshHint,
    organHint
  };
}


// ============================================================================
//  RETURN INTELLIGENCE (IMMORTAL-safe, logic-only)
// ============================================================================
function computeReturnIntelligence({
  binarySurface,
  hasReturnTarget,
  hasMovementSignature,
  lineageDepth
}) {
  const binaryWeight = binarySurface.hasBinary ? 0.4 : 0.1;
  const returnWeight = hasReturnTarget ? 0.4 : 0.0;
  const movementWeight = hasMovementSignature ? 0.2 : 0.0;
  const lineageWeight = lineageDepth > 0 ? Math.min(lineageDepth / 10, 0.2) : 0;

  const solvednessScore = Math.max(
    0,
    Math.min(
      binaryWeight + returnWeight + movementWeight + lineageWeight,
      1
    )
  );

  const computeTier =
    solvednessScore >= 0.9 ? "nearSolution" :
    solvednessScore >= 0.7 ? "highValue"    :
    solvednessScore >= 0.4 ? "normal"       :
    solvednessScore >= 0.2 ? "lowPriority"  :
    "avoidCompute";

  const readinessScore = Math.max(
    0,
    Math.min(
      solvednessScore * 0.7 +
      (hasReturnTarget ? 0.1 : 0) +
      (binarySurface.hasBinary ? 0.1 : 0),
      1
    )
  );

  return {
    solvednessScore,
    computeTier,
    readinessScore,
    hasReturnTarget,
    hasBinary: binarySurface.hasBinary,
    hasMovementSignature
  };
}


// ============================================================================
//  DIAGNOSTICS — v16 dual-hash + intelligence
// ============================================================================
function buildReturnDiagnostics({
  pulse,
  movementPacket,
  returnTo,
  targetOrgan,
  pathway,
  mode
}) {
  const pattern = pulse?.pattern || "NO_PATTERN";
  const lineageDepth = Array.isArray(pulse?.lineage) ? pulse.lineage.length : 0;
  const pulseType = pulse?.pulseType || pulse?.PulseRole?.identity || "UNKNOWN_PULSE_TYPE";

  const binarySurface = extractBinarySurfaceFromPulse(pulse);

  const movementSignature = movementPacket?.movementSignature || null;
  const movementDiagnostics = movementPacket?.diagnostics || null;

  const patternDual = computeDualHash(pattern);
  const lineageDual = computeDualHash(String(lineageDepth));
  const pulseTypeDual = computeDualHash(pulseType);
  const returnTargetDual = computeDualHash(String(returnTo));
  const organDual = computeDualHash(String(targetOrgan));
  const pathwayDual = computeDualHash(JSON.stringify(pathway || {}));

  const binaryPatternHashDual = binarySurface.binaryPattern
    ? computeDualHash(binarySurface.binaryPattern)
    : null;
  const binaryModeHashDual = binarySurface.binaryMode
    ? computeDualHash(binarySurface.binaryMode)
    : null;
  const binaryRouterHintHashDual = binarySurface.routerHint
    ? computeDualHash(binarySurface.routerHint)
    : null;
  const binaryMeshHintHashDual = binarySurface.meshHint
    ? computeDualHash(binarySurface.meshHint)
    : null;
  const binaryOrganHintHashDual = binarySurface.organHint
    ? computeDualHash(binarySurface.organHint)
    : null;

  const intelligence = computeReturnIntelligence({
    binarySurface,
    hasReturnTarget: !!returnTo,
    hasMovementSignature: !!movementSignature,
    lineageDepth
  });

  const intelligenceDual = computeDualHash(JSON.stringify(intelligence));

  return {
    // Core symbolic surface
    pattern,
    lineageDepth,
    pulseType,
    returnTo: returnTo || "NO_RETURN_TARGET",
    targetOrgan: targetOrgan || "NO_ORGAN",
    pathway: pathway || "NO_PATHWAY",
    mode,

    // Binary surface (optional, non-breaking)
    binary: binarySurface,

    // Movement packet surface
    movementSignature,
    movementDiagnostics,

    // Intelligence
    returnIntelligence: intelligence,
    returnIntelligenceSignature: intelligenceDual.primary,
    returnIntelligenceSignatureDual: intelligenceDual,

    // Hashes (dual)
    patternHash: patternDual.primary,
    patternHashDual: patternDual,
    lineageHash: lineageDual.primary,
    lineageHashDual: lineageDual,
    pulseTypeHash: pulseTypeDual.primary,
    pulseTypeHashDual: pulseTypeDual,
    returnTargetHash: returnTargetDual.primary,
    returnTargetHashDual: returnTargetDual,
    organHash: organDual.primary,
    organHashDual: organDual,
    pathwayHash: pathwayDual.primary,
    pathwayHashDual: pathwayDual,

    // Binary hashes (dual)
    binaryPatternHash: binaryPatternHashDual ? binaryPatternHashDual.primary : null,
    binaryPatternHashDual,
    binaryModeHash: binaryModeHashDual ? binaryModeHashDual.primary : null,
    binaryModeHashDual,
    binaryRouterHintHash: binaryRouterHintHashDual ? binaryRouterHintHashDual.primary : null,
    binaryRouterHintHashDual,
    binaryMeshHintHash: binaryMeshHintHashDual ? binaryMeshHintHashDual.primary : null,
    binaryMeshHintHashDual,
    binaryOrganHintHash: binaryOrganHintHashDual ? binaryOrganHintHashDual.primary : null,
    binaryOrganHintHashDual
  };
}


// ============================================================================
//  FACTORY — Return Organ (v16-Immortal-ORGANISM)
// ============================================================================
export function createPulseSendReturn({ impulse, pulseRouter, pulseMesh, log }) {
  return {
    PulseRole,

    // movementOrPulse is usually movement.packet from Impulse/Mover,
    // but we stay backward-compatible with a raw pulse.
    handle(movementOrPulse, modeOverride = "normal") {
      const movementPacket = movementOrPulse && movementOrPulse.packet
        ? movementOrPulse.packet
        : movementOrPulse;

      const packet = movementPacket || {};
      const pulse = packet.pulse || movementOrPulse || {};

      const {
        returnTo,
        pattern = "UNKNOWN_PATTERN",
        lineage = []
      } = pulse;

      const lineageDepth = Array.isArray(lineage) ? lineage.length : 0;
      const pulseType = pulse.PulseRole?.identity || "UNKNOWN_PULSE_TYPE";
      const mode = modeOverride || packet.mode || pulse.mode || "normal";

      // ⭐ No return target → end of chain
      if (!returnTo) {
        const diagnostics = buildReturnDiagnostics({
          pulse,
          movementPacket: packet,
          returnTo: null,
          targetOrgan: null,
          pathway: null,
          mode
        });

        log && log("[PulseSendReturn-v16-Immortal-ORGANISM] No returnTo target — chain complete", {
          jobId: pulse.jobId,
          diagnostics
        });

        return {
          completed: true,
          returned: false,
          diagnostics,
          pulse,
          movementIn: packet
        };
      }

      // ⭐ Return target exists → route the return pulse
      log && log("[PulseSendReturn-v16-Immortal-ORGANISM] Returning pulse", {
        jobId: pulse.jobId,
        pattern,
        returnTo,
        lineageDepth,
        mode,
        pulseType
      });

      // ⭐ Step 1 — determine return target via Router
      const targetOrgan = pulseRouter.route({
        ...pulse,
        targetHint: returnTo,
        mode
      });

      // ⭐ Step 2 — determine pathway via Mesh
      const pathway = pulseMesh.pathwayFor(targetOrgan, mode);

      const diagnostics = buildReturnDiagnostics({
        pulse,
        movementPacket: packet,
        returnTo,
        targetOrgan,
        pathway,
        mode
      });

      // ⭐ v16 return signature (dual-hash, binary + hints + movement aware)
      const signatureShape = {
        pattern: diagnostics.pattern,
        returnTo: diagnostics.returnTo,
        targetOrgan: diagnostics.targetOrgan,
        mode: diagnostics.mode,
        binaryPattern: diagnostics.binary.binaryPattern || "NO_BINARY_PATTERN",
        routerHint: diagnostics.binary.routerHint || "NO_ROUTER_HINT",
        meshHint: diagnostics.binary.meshHint || "NO_MESH_HINT",
        organHint: diagnostics.binary.organHint || "NO_ORGAN_HINT",
        movementSignature: diagnostics.movementSignature || "NO_MOVEMENT_SIGNATURE"
      };

      const returnSignatureDual = computeDualHash(JSON.stringify(signatureShape));

      // ⭐ Step 3 — fire impulse back (prevent infinite loops)
      const backMovement = impulse.fire({
        pulse: {
          ...pulse,
          returnTo: null, // prevent infinite loops
          mode
        },
        targetOrgan,
        pathway,
        mode
      });

      return {
        completed: true,
        returned: true,
        returnSignature: returnSignatureDual.primary,
        returnSignatureDual,
        diagnostics,
        movement: backMovement,
        movementIn: packet
      };
    }
  };
}
