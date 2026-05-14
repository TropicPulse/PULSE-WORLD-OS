// ============================================================================
//  PULSE OS v30‑IMMORTAL++ — CONTEXT ENGINE
//  PURE CONTEXT. ZERO MUTATION. ZERO RANDOMNESS. TOUCH‑SCOPED META.
// ============================================================================

// ============================================================================
//  PACKET EMITTER — v30 IMMORTAL++ (PulseTouch‑scoped, binary band)
// ============================================================================
function emitContextEnginePacket(type, payload) {
  const touch =
    (typeof window !== "undefined" && window.__PULSE_TOUCH__) || {};

  return Object.freeze({
    meta: {
      id: "pulse-touch-context-frame",
      version: touch.version || "v0",
      epoch: touch.epoch || 0,          // IMMORTAL++: no Date.now()
      layer: "context-frame",
      role: "context-organ",
      band: "binary"
    },
    packetType: `context-engine-${type}`,
    timestamp: 0,                       // IMMORTAL++: no wall-clock
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
    return brainstem?.organs?.anatomy?.anatomyArtery?.({
      binaryVitals: brainstem.binaryVitals || {}
    }) || null;
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
  const basePressure = contextArtery?.pressure ?? 0;

  const avgPressure =
    sources.length > 0
      ? Math.min(
          1,
          sources.reduce((acc, a) => acc + (a.pressure ?? 0), 0) / sources.length
        )
      : basePressure;

  const fusedPressure = Math.min(
    1,
    avgPressure * 0.8 + boundaryPressure * 0.2
  );

  return Object.freeze({
    type: "organism-artery-v30",
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
//  CORE IMPLEMENTATION — v16 LOGIC + v24 FUSION + v30 TOUCH META
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
      // v30: no hardcoded owner identity, no supremacy flags
      owner: Object.freeze({
        name: null,
        supremacy: false,
        aiSubordinate: false
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

      // v24++: organism‑wide artery snapshot (additive)
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
//  PUBLIC API — v30‑IMMORTAL++
// ============================================================================
export function createContextEngine(config = {}) {
  const core = new AiContextEngine({
    safetyFrame: config.safetyFrame || null,
    experienceFrame: config.experienceFrame || null
  });

  return Object.freeze({
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
    AiContextEngine,
    createContextEngine,
    default: createContextEngine
  };
}
