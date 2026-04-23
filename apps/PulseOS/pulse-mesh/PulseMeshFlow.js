// ============================================================================
// [pulse:mesh] COMMUNITY_FLOW_LAYER v10.4  // rainbow
// Full-Spectrum Coordination • Deterministic Lifecycle Sequencer
// Metadata-Only • Zero Recursion • Zero Routing • SDN-Aligned
// ============================================================================
//
// IDENTITY — THE FLOW ORGAN (v10.4):
// ----------------------------------
// • Pure lifecycle sequencer for impulses.
// • Coordinates Skin → Reflex → Cortex → Tendons → Organs → Immune
//               → Memory → Hormones → Aura → Router → SendSystem.
// • No recursion, no timestamps, no rate limiting.
// • No routing logic — Router v10.4 handles all routing.
// • No movement logic — SendSystem v10.4 handles all movement.
// • No mesh routing — Mesh v10.4 is deterministic pathway engine.
// • Metadata-only shaping + sequencing.
// • SDN-aware: receives impulses from SDN, returns shaped impulses.
//
// SAFETY CONTRACT (v10.4):
// • No payload access.
// • No compute.
// • No recursion.
// • No timestamps.
// • No routing override.
// • No mutation outside metadata.
// • Deterministic-field, unified-advantage-field, drift-proof.
// ============================================================================

export function createPulseMeshFlow({
  applyPulseSkin,
  createCommunityReflex,
  applyPulseCortex,
  applyTendons,
  applyPulseOrgans,
  applyPulseImmune,
  applyPulseMemory,
  applyPulseHormones,
  applyPulseAura,
  PulseHaloCounters,
  Router,          // NEW v10.4 — Router handles routing
  SendSystem,      // NEW v10.4 — SendSystem handles movement
  log,
  warn,
  error
}) {

  // ---------------------------------------------------------------------------
  // META — v10.4 identity
  // ---------------------------------------------------------------------------
  const meta = {
    layer: "PulseFlow",
    role: "FLOW_ORCHESTRATOR",
    version: "10.4",
    target: "full-mesh",
    selfRepairable: true,
    evo: {
      dualMode: true,
      localAware: true,
      internetAware: true,

      advantageCascadeAware: true,
      pulseEfficiencyAware: true,
      driftProof: true,
      multiInstanceReady: true,

      unifiedAdvantageField: true,
      deterministicField: true,
      futureEvolutionReady: true,

      signalFactoringAware: true,
      meshPressureAware: true,
      auraPressureAware: true
    }
  };

  // ---------------------------------------------------------------------------
  // FLOW ENGINE (v10.4)
  // ---------------------------------------------------------------------------
  function PulseFlow() {
    const reflex = createCommunityReflex();

    return {
      meta,

      // -----------------------------------------------------------------------
      // FLOW_RUN (v10.4)
      // -----------------------------------------------------------------------
      async run(impulse, entryNodeId, context = {}) {
        impulse.flags = impulse.flags || {};
        impulse.flags.flow_meta = meta;
        impulse.flags.flow_started = true;

        PulseHaloCounters?.impulseStarted?.();

        try {
          // 1. SKIN ENTRY
          applyPulseSkin(impulse, "entry");

          // 2. REFLEX
          const reflexDecision = reflex(impulse, {
            trustLevel: context.trustLevel,
            load: context.load
          });

          impulse.flags[`flow_reflex_${reflexDecision ? "pass" : "drop"}`] = true;

          if (reflexDecision === 0) {
            PulseHaloCounters?.reflexDropped?.();
            return finalize(impulse);
          }

          // 3. CORTEX
          applyPulseCortex(impulse, context);

          // 4. TENDONS
          applyTendons(impulse);

          // 5. ORGANS
          applyPulseOrgans(impulse);

          // 6. IMMUNE
          const immuneBefore = impulse.flags.immune_quarantined;
          applyPulseImmune(impulse);
          if (impulse.flags.immune_quarantined && !immuneBefore) {
            PulseHaloCounters?.immuneQuarantined?.();
          }

          // 7. MEMORY
          const memoryBefore = impulse.flags.memory_written;
          applyPulseMemory(impulse);
          if (impulse.flags.memory_written && !memoryBefore) {
            PulseHaloCounters?.memoryWrite?.();
          }

          // 8. HORMONES
          const hormoneBefore = impulse.flags.hormone_event;
          applyPulseHormones(impulse);
          if (impulse.flags.hormone_event && !hormoneBefore) {
            if (impulse.flags.hormone_event === "boost") {
              PulseHaloCounters?.hormoneBoost?.();
            } else if (impulse.flags.hormone_event === "damp") {
              PulseHaloCounters?.hormoneDamp?.();
            }
          }

          // 9. AURA
          const auraBeforeLoop = impulse.flags.aura_in_loop;
          const auraBeforeTension = impulse.flags.aura_system_under_tension;

          applyPulseAura(impulse);

          if (impulse.flags.aura_in_loop && !auraBeforeLoop) {
            PulseHaloCounters?.auraLooped?.();
          }
          if (impulse.flags.aura_system_under_tension && !auraBeforeTension) {
            PulseHaloCounters?.auraTensionTagged?.();
          }

          // 10. ROUTER v10.4 — deterministic routing
          const routed = await Router.route("pulse", {
            impulse,
            entryNodeId,
            sdnContext: context.sdnContext
          });

          // 11. SEND SYSTEM v10.4 — deterministic movement
          const moved = await SendSystem.move(routed);

          // 12. SKIN EXIT
          applyPulseSkin(moved, "exit");

          return finalize(moved);

        } catch (err) {
          warn?.("[PulseFlow v10.4] Flow error:", err);
          impulse.flags.flow_error = String(err);
          return finalize(impulse);
        }
      }
    };
  }

  // ---------------------------------------------------------------------------
  // FINALIZER
  // ---------------------------------------------------------------------------
  function finalize(impulse) {
    impulse.flags = impulse.flags || {};
    impulse.flags.flow_completed = true;

    PulseHaloCounters?.impulseCompleted?.();

    return impulse;
  }

  // ---------------------------------------------------------------------------
  // PUBLIC INTERFACE
  // ---------------------------------------------------------------------------
  return {
    create: PulseFlow
  };
}
