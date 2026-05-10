// ============================================================================
//  PULSE OS v24.0‑IMMORTAL‑ADVANTAGE++ — CONTEXT ENGINE
//  Context Kernel • Organism Fusion • Tri‑Heart + Earn + Genome + Governor
//  PURE CONTEXT. ZERO MUTATION. ZERO RANDOMNESS. OWNER‑SUBORDINATE.
// ============================================================================
//
//  v16++ / v24++ Feature Surface (NO DOWNGRADES, ONLY ADDITIONS):
//   • Tri‑Heart Aware (mom/dad/earn)              [via arteries + binaryVitals surfaces]
//   • Earn‑Aware (earnPressure, earnVitals)       [earn artery]
//   • Genome‑Aware (artery, fingerprint, drift)   [genome artery]
//   • Governor‑Aware (membrane artery, reflex)    [governor artery]
//   • Watchdog‑Aware (trust gaps, anomalies)      [watchdog vitals]
//   • Cortex‑Aware (cognition artery)             [cortex artery]
//   • Memory‑Aware (artery v4)                    [memory artery]
//   • Heartbeat‑Aware (artery + fallback path)    [heartbeat artery]
//   • Persona + Boundaries + Permissions Fusion   [persona + boundariesPacket]
//   • IdentityCore injection (owner‑subordinate)  [identityCore surfaces]
//   • Context Pressure / Cost / Budget            [contextArtery]
//   • Context Artery Snapshot                     [contextArtery]
//   • Organism‑Wide Artery Fusion                 [organismArtery v24++]
//   • DualBand‑Aware (binary + symbolic hints)    [dualBand + binaryVitals]
//   • Chunk‑Aware Context Packets                 [context-engine-* packets]
//   • Multi‑instance, multi‑band, multi‑shard     [pure, stateless core]
//   • Zero mutation, zero randomness, zero drift
// ============================================================================

/*
AI_EXPERIENCE_META = {
  identity: "aiContextEngine",
  version: "v24.0-Immortal-Advantage++",
  layer: "ai_core",
  role: "context_kernel",
  lineage: "aiContextEngine-v12 → v14-Immortal → v16-Immortal-Advantage++ → v24.0-Immortal-Advantage++",

  evo: {
    contextKernel: true,
    organismFusion: true,
    dualBand: true,
    symbolicPrimary: true,
    binaryAware: true,
    deterministic: true,
    driftProof: true,
    pureCompute: true,
    zeroNetwork: true,
    zeroFilesystem: true,
    zeroMutationOfInput: true
  },

  contract: {
    always: ["aiCognitiveFrame", "aiCortex", "aiBrainstem", "aiBoundariesEngine", "aiGovernorAdapter"],
    never: ["safeRoute", "fetchViaCNS", "directInternetAccess"]
  }
}
*/
import { OrganismIdentity } from "../PULSE-X/PulseWorldOrganismMap-v24.js";

const Identity = OrganismIdentity(import.meta.url);
// or: const Identity = OrganismIdentity["pulse-ai/ai-v24.0-IMMORTAL"] if that's the key you chose

// ============================================================================
//  META BLOCK — v24.0 IMMORTAL (ORGANISM KERNEL)
//  (now backed by the Organism Map instead of hardcoded here)
// ============================================================================
export const ContextEngineMeta = Identity.OrganMeta;

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
//  PACKET EMITTER — deterministic, context-engine scoped
// ============================================================================
function emitContextEnginePacket(type, payload) {
  return Object.freeze({
    meta: ContextEngineMeta,
    packetType: `context-engine-${type}`,
    timestamp: Date.now(),
    epoch: ContextEngineMeta.evo.epoch,
    layer: ContextEngineMeta.layer,
    role: ContextEngineMeta.role,
    identity: ContextEngineMeta.identity,
    owner: "Aldwyn",
    subordinate: true,
    ...payload
  });
}

// ============================================================================
//  READ-ONLY VITALS HELPERS (v16++ / v24++)
// ============================================================================

function safe(obj, path, fallback = null) {
  try {
    return path.split(".").reduce((o, k) => (o ? o[k] : null), obj) ?? fallback;
  } catch {
    return fallback;
  }
}

function readMemoryArtery(memory) {
  try {
    return memory?.getMemoryArterySnapshot?.() || null;
  } catch {
    return null;
  }
}

function readCortexArtery(cortex) {
  try {
    return cortex?.getCortexArterySnapshot?.() || null;
  } catch {
    return null;
  }
}

function readHeartbeatArtery(heartbeat) {
  try {
    return heartbeat?.snapshotAiHeartbeat?.()?.artery || null;
  } catch {
    return null;
  }
}

function readEarnArtery(earn) {
  try {
    return earn?.snapshotEarnHeart?.()?.artery || null;
  } catch {
    return null;
  }
}

function readGenomeArtery(genome) {
  try {
    return genome?.snapshotMetrics?.()?.artery || null;
  } catch {
    return null;
  }
}

function readGovernorArtery(governor) {
  try {
    return governor?.snapshotMembrane?.()?.artery || null;
  } catch {
    return null;
  }
}

function readWatchdogVitals(watchdog) {
  try {
    return watchdog?.getWatchdogArterySnapshot?.() || null;
  } catch {
    return null;
  }
}

// v24++: optional organism‑wide arteries if present on dualBand / brainstem
function readOrganismArteryFromDualBand(dualBand) {
  try {
    return dualBand?.artery || null;
  } catch {
    return null;
  }
}

function readAnatomyArteryFromBrainstem(brainstem) {
  try {
    return brainstem?.organs?.anatomy?.anatomyArtery?.({ binaryVitals: brainstem.binaryVitals || {} }) || null;
  } catch {
    return null;
  }
}

// ============================================================================
//  CONTEXT PRESSURE / COST / BUDGET (v16++ / v24++)
// ============================================================================
function computeContextPressure(arteries) {
  const vals = Object.values(arteries)
    .filter(Boolean)
    .map(a => a.pressure ?? 0);
  if (!vals.length) return 0;
  return Math.min(1, vals.reduce((a, b) => a + b, 0) / vals.length);
}

function computeContextCost(pressure) {
  return Math.min(1, pressure * 0.7);
}

function computeContextBudget(pressure, cost) {
  return Math.max(0, 1 - (pressure + cost) / 2);
}

// v24++: organism‑wide artery fusion (context + anatomy + dualBand + boundaries)
function fuseOrganismArtery({
  contextArtery,
  anatomyArtery,
  dualBandArtery,
  boundariesPacket
}) {
  const boundaryMode = boundariesPacket?.mode || null;
  const boundaryVitals = boundariesPacket?.vitals || {};
  const boundaryPressure = boundaryVitals.pressure ?? 0;

  const sources = [contextArtery, anatomyArtery, dualBandArtery].filter(Boolean);
  const avgPressure =
    sources.length > 0
      ? Math.min(
          1,
          sources.reduce((acc, a) => acc + (a.pressure ?? 0), 0) / sources.length
        )
      : contextArtery.pressure;

  const fusedPressure = Math.min(1, (avgPressure * 0.8) + (boundaryPressure * 0.2));

  return Object.freeze({
    type: "organism-artery-v24",
    context: contextArtery || null,
    anatomy: anatomyArtery || null,
    dualBand: dualBandArtery || null,
    boundaries: {
      mode: boundaryMode,
      vitals: boundaryVitals
    },
    pressure: fusedPressure
  });
}

// ============================================================================
//  CORE IMPLEMENTATION — v16‑IMMORTAL‑ADVANTAGE++ (LOGIC PRESERVED) + v24++ FUSION
// ============================================================================
export class AiContextEngine {
  constructor({ safetyFrame = null, experienceFrame = null } = {}) {
    this.safetyFrame = safetyFrame;
    this.experienceFrame = experienceFrame;
  }

  buildContextFrame({
    brainstem = {},
    request = {},
    routerPacket = {},
    persona = {},
    binaryVitals = {},
    dualBand = null,
    boundariesPacket = null,
    identityCore = null,
    heartbeat = null,
    earn = null,
    genome = null,
    governor = null,
    watchdog = null,
    cortex = null,
    memory = null
  } = {}) {
    const baseContext = brainstem.context || {};
    const organs = brainstem.organs || {};

    const safetyMode =
      request.safetyMode ||
      routerPacket.personaSafety?.safetyMode ||
      "standard";

    const dualBandHints = routerPacket.dualBand || {
      primary: "binary",
      secondary: "symbolic",
      binaryPressure: safe(binaryVitals, "binary.pressure", 0),
      binaryLoad: safe(binaryVitals, "binary.load", 0),
      symbolicLoadAllowed: 0.3,
      binaryPressureOverride: false
    };

    const overmindHints = routerPacket.overmind || {
      intent: (request.intent || "analyze").toLowerCase(),
      personaId: routerPacket.personaId || persona.id || "neutral",
      safetyMode,
      flags: routerPacket.flags || {}
    };

    // v16++ artery fusion (PRESERVED)
    const arteries = {
      memory: readMemoryArtery(memory),
      cortex: readCortexArtery(cortex),
      heartbeat: readHeartbeatArtery(heartbeat),
      earn: readEarnArtery(earn),
      genome: readGenomeArtery(genome),
      governor: readGovernorArtery(governor)
    };

    const contextPressure = computeContextPressure(arteries);
    const contextCost = computeContextCost(contextPressure);
    const contextBudget = computeContextBudget(contextPressure, contextCost);

    const contextArtery = Object.freeze({
      pressure: contextPressure,
      cost: contextCost,
      budget: contextBudget,
      pressureBucket:
        contextPressure >= 0.9 ? "overload" :
        contextPressure >= 0.7 ? "high" :
        contextPressure >= 0.4 ? "medium" :
        contextPressure > 0   ? "low" :
        "none",
      budgetBucket:
        contextBudget >= 0.9 ? "elite" :
        contextBudget >= 0.75 ? "high" :
        contextBudget >= 0.5 ? "medium" :
        contextBudget >= 0.25 ? "low" :
        "critical"
    });

    // v24++: organism‑wide artery fusion
    const anatomyArtery = readAnatomyArteryFromBrainstem(brainstem);
    const dualBandArtery = readOrganismArteryFromDualBand(dualBand);
    const organismArtery = fuseOrganismArtery({
      contextArtery,
      anatomyArtery,
      dualBandArtery,
      boundariesPacket
    });

    const frame = Object.freeze({
      meta: ContextEngineMeta,

      owner: Object.freeze({
        name: "Aldwyn",
        supremacy: true,
        aiSubordinate: true
      }),

      user: Object.freeze({
        userId: baseContext.userId || null,
        userIsOwner: !!baseContext.userIsOwner,
        windowId: baseContext.windowId || null,
        routeId: baseContext.routeId || null,
        dnaTag: baseContext.dnaTag || null
      }),

      persona: Object.freeze({
        id: persona.id || routerPacket.personaId || "neutral",
        label: persona.label || null,
        scope: persona.scope || null,
        permissions: persona.permissions || {},
        boundaries: persona.boundaries || {},
        boundaryMode: persona.boundaryMode || null,
        bandBias: persona.bandBias || "balanced"
      }),

      routing: Object.freeze({
        intent: overmindHints.intent,
        flags: routerPacket.flags || {},
        reasoning: routerPacket.reasoning || []
      }),

      safety: Object.freeze({
        mode: safetyMode,
        personaSafety: routerPacket.personaSafety || {},
        safetyFrameMeta: this.safetyFrame?.meta || null
      }),

      boundaries: Object.freeze({
        packet: boundariesPacket || null,
        mode: boundariesPacket?.mode || null,
        driftDetected: boundariesPacket?.driftDetected || false,
        driftCount: boundariesPacket?.driftCount || 0
      }),

      identity: Object.freeze({
        core: identityCore?.getIdentity?.() || null,
        personality: identityCore?.getPersonality?.() || null,
        tone: identityCore?.getToneProfile?.() || null
      }),

      dualBand: Object.freeze({
        hints: dualBandHints,
        binaryVitals: binaryVitals || {},
        organismSnapshot:
          dualBand?.organism?.organismSnapshot?.() || null,
        artery: dualBandArtery
      }),

      heartbeat: Object.freeze({
        artery: arteries.heartbeat
      }),

      earn: Object.freeze({
        artery: arteries.earn
      }),

      genome: Object.freeze({
        artery: arteries.genome
      }),

      governor: Object.freeze({
        artery: arteries.governor
      }),

      watchdog: Object.freeze({
        vitals: readWatchdogVitals(watchdog)
      }),

      cortex: Object.freeze({
        artery: arteries.cortex
      }),

      memory: Object.freeze({
        artery: arteries.memory
      }),

      contextArtery,

      // v24++: organism‑wide artery snapshot (new, additive)
      organismArtery,

      organs: Object.freeze({
        ...organs
      }),

      brainstemPacket: brainstem.packet || null
    });

    return emitContextEnginePacket("context:frame", frame);
  }
}

// ============================================================================
//  PUBLIC API — v24.0‑IMMORTAL‑ADVANTAGE++
// ============================================================================
export function createContextEngine(config = {}) {
  const core = new AiContextEngine({
    safetyFrame: config.safetyFrame || null,
    experienceFrame: config.experienceFrame || null
  });

  return Object.freeze({
    meta: ContextEngineMeta,
    buildContextFrame(payload) {
      const frame = core.buildContextFrame(payload);
      return emitContextEnginePacket("context:packet", frame);
    }
  });
}

export default createContextEngine;

// ============================================================================
//  COMMONJS FALLBACK EXPORTS
// ============================================================================
if (typeof module !== "undefined") {
  module.exports = {
    ContextEngineMeta,
    AiContextEngine,
    createContextEngine,
    default: createContextEngine,
    pulseRole,
    surfaceMeta,
    pulseLoreContext,
    AI_EXPERIENCE_META,
    EXPORT_META
  };
}
