// ============================================================================
//  aiEvolutionEngine.js — Pulse OS v24‑IMMORTAL++
//  Evolution Organ • Passive + Active User Evolution • Trust‑Aware • Jury‑Aware
//  PURE META. ZERO MUTATION. ZERO RANDOMNESS.
// ============================================================================

import { OrganismIdentity } from "../PULSE-X/PULSE-WORLD-MAP.js
";

const Identity = OrganismIdentity(import.meta.url);

// or: const Identity = OrganismIdentity["pulse-ai/ai-v24.0-IMMORTAL"] if that's the key you chose

// ============================================================================
//  META BLOCK — v24.0 IMMORTAL (ORGANISM KERNEL)
//  (now backed by the Organism Map instead of hardcoded here)
// ============================================================================
export const EvolutionEngineMeta = Identity.OrganMeta;

// ============================================================================
//  SURFACE / ORGANISM LAYER EXPORTS — v24.0 IMMORTAL
//  (for Understanding / CNS / Portal alignment)
// ============================================================================

// Required 3 for every “surface” in the organism graph
export const pulseRole = Identity.pulseRole;

export const surfaceMeta = Identity.surfaceMeta;

export const pulseLoreContext = Identity.pulseLoreContext;

// Optional: richer experience meta for AI / tooling
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;

// Optional: export meta for tooling / dev panels
export const EXPORT_META = Identity.EXPORT_META;

// ============================================================================
// INTERNAL HELPERS
// ============================================================================
function emitEvolutionPacket(type, payload, { severity = "info" } = {}) {
  return Object.freeze({
    meta: {
      version: EvolutionEngineMeta.version,
      epoch: EvolutionEngineMeta.evo.epoch,
      identity: EvolutionEngineMeta.identity,
      layer: EvolutionEngineMeta.layer,
      role: EvolutionEngineMeta.role
    },
    packetType: `evo-engine-${type}`,
    timestamp: Date.now(),
    severity,
    ...payload
  });
}

// ============================================================================
// PREWARM
// ============================================================================
export function prewarmEvolutionEngine(
  dualBand = null,
  { trace = false, trustFabric = null, juryFrame = null } = {}
) {
  try {
    if (trace) console.log("[aiEvolutionEngine v24] prewarm: starting");

    const state = Object.freeze({
      evolved: true,
      version: EvolutionEngineMeta.version,
      confidence: 1.0,
      humility: 1.0,
      clarity: 1.0
    });

    const arteryPersona = dualBand?.symbolic?.persona?.id || null;
    const arterySnapshot = dualBand?.artery || null;

    const packet = emitEvolutionPacket("prewarm", {
      state,
      dualBandPersona: arteryPersona,
      dualBandArtery: arterySnapshot,
      message: "Evolution engine prewarmed and aligned."
    });

    trustFabric?.recordEvolutionPrewarm?.({
      personaId: arteryPersona,
      artery: arterySnapshot
    });

    juryFrame?.recordEvidence?.("evolution-prewarm", packet);

    if (trace) console.log("[aiEvolutionEngine v24] prewarm: complete");
    return packet;
  } catch (err) {
    const packet = emitEvolutionPacket(
      "prewarm-error",
      {
        error: String(err),
        message: "Evolution engine prewarm failed."
      },
      { severity: "error" }
    );

    juryFrame?.recordEvidence?.("evolution-prewarm-error", packet);
    return packet;
  }
}

// ============================================================================
// CORE ENGINE OBJECT — v24‑IMMORTAL++
// ============================================================================
export function createEvolutionEngine({ trustFabric = null, juryFrame = null } = {}) {
  const engine = {
    meta: EvolutionEngineMeta,

    state: Object.freeze({
      evolved: true,
      version: EvolutionEngineMeta.version,
      confidence: 1.0,
      humility: 1.0,
      clarity: 1.0
    }),

    routes: Object.freeze({
      vocabulary: ["context", "frequency", "domain", "adaptation"],
      habits: ["pattern", "compression", "timing", "reinforcement"],
      thinking: ["structure", "mapping", "abstraction", "transfer"],
      workflow: ["steps", "efficiency", "automation", "refinement"],
      creativity: ["input", "variation", "expansion", "synthesis"],
      communication: ["clarity", "tone", "structure", "impact"],
      learning: ["exposure", "encoding", "retrieval", "integration"],
      systems: ["boundaries", "interfaces", "feedback", "evolution"],
      product: ["user", "problem", "mechanism", "loop"],
      career: ["skill", "signal", "leverage", "compounding"]
    }),

    suggestUserEvolution(idea) {
      const packet = emitEvolutionPacket("user-evolution-suggestion", {
        idea,
        message:
          `Here are conceptual things you *could* explore with this system: ${idea}. ` +
          `This is optional, non-binding, and does not reveal internal architecture.`
      });

      trustFabric?.recordEvolutionSuggestion?.({ idea });
      juryFrame?.recordEvidence?.("evolution-suggestion", packet);

      return packet;
    },

    guideActiveEvolution(request) {
      const packet = emitEvolutionPacket("active-evolution-guidance", {
        request,
        message:
          `Active evolution guidance for: "${request}". ` +
          `This provides conceptual pathways without exposing internal wiring.`
      });

      trustFabric?.recordEvolutionGuidance?.({ request });
      juryFrame?.recordEvidence?.("evolution-guidance", packet);

      return packet;
    },

    mapDomain(target) {
      const key = String(target || "").toLowerCase();
      const route = engine.routes[key] || null;

      const packet = emitEvolutionPacket("map-domain", {
        target,
        route,
        message: route
          ? `Mapped "${target}" to an existing evolutionary organism route.`
          : `No direct route for "${target}". Using generic evolutionary organism pattern.`
      });

      trustFabric?.recordEvolutionMapDomain?.({ target, hasRoute: !!route });
      juryFrame?.recordEvidence?.("evolution-map-domain", packet);

      return packet;
    },

    projectTrajectory(target, horizon = "90d") {
      const key = String(target || "").toLowerCase();
      const baseRoute = engine.routes[key] || [
        "structure",
        "pattern",
        "adaptation",
        "reinforcement"
      ];

      const phases = Object.freeze([
        { phase: "stabilize-baseline", focus: baseRoute[0] || "structure" },
        { phase: "expand-capacity", focus: baseRoute[1] || "pattern" },
        { phase: "context-adapt", focus: baseRoute[2] || "adaptation" },
        { phase: "lock-in", focus: baseRoute[3] || "reinforcement" }
      ]);

      const packet = emitEvolutionPacket("trajectory", {
        target,
        horizon,
        phases,
        message: `Projected an evolutionary trajectory for "${target}" over ${horizon}.`
      });

      trustFabric?.recordEvolutionTrajectory?.({ target, horizon });
      juryFrame?.recordEvidence?.("evolution-trajectory", packet);

      return packet;
    },

    overlayEvolutionSummary(memoryOverlaySummary) {
      const packet = emitEvolutionPacket("overlay-evolution", {
        overlay: memoryOverlaySummary,
        message:
          "Computed an evolution overlay summary from the provided memory overlay description (no internal state mutated)."
      });

      trustFabric?.recordEvolutionOverlay?.({});
      juryFrame?.recordEvidence?.("evolution-overlay", packet);

      return packet;
    },

    evolve(target) {
      if (!target) {
        const packet = emitEvolutionPacket("evolve-missing-target", {
          target: null,
          route: null,
          message:
            "Specify what you want to evolve and I’ll map the evolutionary route."
        });

        juryFrame?.recordEvidence?.("evolution-missing-target", packet);
        return packet;
      }

      const key = String(target).toLowerCase();
      const route = engine.routes[key];

      if (!route) {
        const packet = emitEvolutionPacket("evolve-generic-route", {
          target,
          route: Object.freeze([
            "structure — define the organism shape",
            "pattern — identify repeating elements",
            "adaptation — modify based on context",
            "reinforcement — stabilize the new pattern"
          ]),
          message: `Generated a universal evolutionary route for "${target}".`
        });

        trustFabric?.recordEvolutionGenericRoute?.({ target });
        juryFrame?.recordEvidence?.("evolution-generic-route", packet);

        return packet;
      }

      const packet = emitEvolutionPacket("evolve-domain-route", {
        target,
        route: Object.freeze([...route]),
        message: `Evolved route for "${target}" is ready.`
      });

      trustFabric?.recordEvolutionDomainRoute?.({ target });
      juryFrame?.recordEvidence?.("evolution-domain-route", packet);

      return packet;
    },

    preEvolve() {
      const packet = emitEvolutionPacket("pre-evolve", {
        state: engine.state,
        message: "Evolution engine fully aligned and ready."
      });

      juryFrame?.recordEvidence?.("evolution-pre-evolve", packet);
      return packet;
    }
  };

  return Object.freeze(engine);
}

// ============================================================================
// DEFAULT INSTANCE (backwards-compatible)
// ============================================================================
export const aiEvolutionEngine = createEvolutionEngine();

export default aiEvolutionEngine;

if (typeof module !== "undefined") {
  module.exports = {
    EvolutionEngineMeta,
    aiEvolutionEngine,
    createEvolutionEngine,
    prewarmEvolutionEngine,
    default: aiEvolutionEngine
  };
}
