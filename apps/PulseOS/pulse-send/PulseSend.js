// ============================================================================
//  PulseSend.js — v10.4 + SDN‑Aware
//  Pulse‑Agnostic Transport Organ • Evolution‑Aware • Mode‑Aware
// ============================================================================
//
//  NEW BEHAVIOR (v10.4‑Evo + SDN):
//  -------------------------------
//  • Try Pulse v3 (unified organism).
//  • If v3 creation fails → try Pulse v2 (evolution engine).
//  • If v2 creation fails → try Pulse v1 (stable fallback).
//  • Always succeed.
//  • Emits non‑blocking nervous‑system impulses into PulseSDN (if provided).
// ============================================================================


// ============================================================================
// ⭐ PulseRole — identifies this as the PulseSend Organ Wrapper (v10.4)
// ============================================================================
export const PulseRole = {
  type: "Messenger",
  subsystem: "PulseSend",
  layer: "TransportSystem",
  version: "10.4",
  identity: "PulseSend-v10.4",

  evo: {
    driftProof: true,
    unifiedOrganReady: true,
    multiOrganReady: true,
    shapeShiftAware: true,
    reflexChainReady: true,
    patternAware: true,
    lineageAware: true,
    memoryAware: true,
    modeAware: true,
    deterministicImpulseFlow: true,
    futureEvolutionReady: true,

    unifiedAdvantageField: true,
    pulseSend10Ready: true
  },

  routingContract: "PulseRouter-v10.4",
  meshContract: "PulseMesh-v10.4",
  pulseContract: "Pulse-v1/v2/v3",
  gpuOrganContract: "PulseGPU-v10",
  earnCompatibility: "PulseEarn-v10"
};


// ============================================================================
//  FACTORY — Build the Full PulseSend v10.4 Organism (SDN‑aware)
// ============================================================================
export function createPulseSend({
  createPulseV3,         // Pulse v3 creator
  createPulseV2,         // Pulse v2 creator
  createPulseV1,         // Pulse v1 creator
  pulseRouter,
  pulseMesh,
  createPulseSendMover,
  createPulseSendImpulse,
  createPulseSendReturn,
  log,
  sdn                    // ⭐ OPTIONAL: PulseSDN instance (active nervous system)
}) {
  // ⭐ Build sub‑organs
  const mover = createPulseSendMover({ pulseMesh, log });
  const impulse = createPulseSendImpulse({ mover, log });
  const returnArc = createPulseSendReturn({ impulse, pulseRouter, pulseMesh, log });

  // small helper to emit SDN impulses safely
  function emitSDN(source, payload) {
    if (!sdn || typeof sdn.emitImpulse !== "function") return;
    try {
      sdn.emitImpulse(source, payload);
    } catch (e) {
      // SDN must never break transport; ignore errors
      log && log("[PulseSend-v10.4] SDN emit failed (non‑fatal)", { source, error: e });
    }
  }

  // ========================================================================
  //  PUBLIC API — send()
  // ========================================================================
  function send({
    jobId,
    pattern,
    payload = {},
    priority = "normal",
    returnTo = null,
    mode = "normal"
  }) {

    let pulse = null;
    let pulseType = null;

    emitSDN("send:begin", {
      jobId,
      pattern,
      priority,
      returnTo,
      mode
    });

    // ================================================================
    // ⭐ Tier 1 — Try Pulse v3 (Unified Organism)
    // ================================================================
    try {
      pulse = createPulseV3({
        jobId, pattern, payload, priority, returnTo, mode
      });
      pulseType = "Pulse-v3";
    } catch (errV3) {
      log && log("[PulseSend-v10.4] Pulse v3 failed, falling back to v2", { errV3 });
      emitSDN("send:pulse-fallback", {
        jobId,
        pattern,
        from: "v3",
        to: "v2",
        error: String(errV3 && errV3.message || "unknown")
      });
    }

    // ================================================================
    // ⭐ Tier 2 — Try Pulse v2 (Evolution Engine)
    // ================================================================
    if (!pulse) {
      try {
        pulse = createPulseV2({
          jobId, pattern, payload, priority, returnTo, mode
        });
        pulseType = "Pulse-v2";
      } catch (errV2) {
        log && log("[PulseSend-v10.4] Pulse v2 failed, falling back to v1", { errV2 });
        emitSDN("send:pulse-fallback", {
          jobId,
          pattern,
          from: "v2",
          to: "v1",
          error: String(errV2 && errV2.message || "unknown")
        });
      }
    }

    // ================================================================
    // ⭐ Tier 3 — Fallback to Pulse v1 (Stable Organism)
    // ================================================================
    if (!pulse) {
      pulse = createPulseV1({
        jobId, pattern, payload, priority, returnTo, mode
      });
      pulseType = "Pulse-v1";
      log && log("[PulseSend-v10.4] Using Pulse v1 fallback", { jobId, pattern });
      emitSDN("send:pulse-fallback", {
        jobId,
        pattern,
        from: "none",
        to: "v1",
        error: "v3/v2 creation failed"
      });
    }

    emitSDN("send:pulse-created", {
      jobId,
      pattern,
      mode,
      pulseType
    });

    // ================================================================
    // ⭐ Continue normal transport chain
    // ================================================================

    // Step 2 — route
    const targetOrgan = pulseRouter.route(pulse);

    // Step 3 — pathway
    const pathway = pulseMesh.pathwayFor(targetOrgan, mode);

    emitSDN("send:routed", {
      jobId,
      pattern,
      targetOrgan,
      pathway,
      mode,
      pulseType
    });

    log && log("[PulseSend-v10.4] Routing pulse", {
      jobId,
      pattern,
      targetOrgan,
      pathway,
      mode,
      pulseType
    });

    // Step 4 — movement
    const movement = impulse.fire({
      pulse,
      targetOrgan,
      pathway,
      mode
    });

    emitSDN("send:movement", {
      jobId,
      pattern,
      targetOrgan,
      pathway,
      mode,
      pulseType,
      movementMeta: {
        hasPacket: !!movement && !!movement.packet
      }
    });

    // Step 5 — return arc
    const result = returnArc.handle(movement.packet, mode);

    emitSDN("send:return", {
      jobId,
      pattern,
      mode,
      pulseType,
      resultMeta: {
        ok: result && result.ok !== false
      }
    });

    // Step 6 — memory
    pulseRouter.remember(
      pulse,
      targetOrgan,
      "success",
      pulse.healthScore || 1
    );

    emitSDN("send:complete", {
      jobId,
      pattern,
      targetOrgan,
      mode,
      pulseType
    });

    return {
      PulseRole,
      movement,
      result,
      mode,
      pulseType
    };
  }

  return {
    PulseRole,
    send
  };
}


// ============================================================================
//  ORGAN EXPORT — ⭐ PulseSend (v10.4)
// ============================================================================
export const PulseSend = {
  PulseRole,

  send(...args) {
    throw new Error(
      "[PulseSend-v10.4] PulseSend.send() was called before initialization. " +
      "Use createPulseSend(...) to wire dependencies."
    );
  }
};
