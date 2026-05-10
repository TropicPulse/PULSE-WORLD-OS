/* global log,warn */
// ============================================================================
// FILE: PULSE-GPU/PulseGPUCognitiveIntelligence.js
// PULSE GPU COGNITIVE INTELLIGENCE v24-IMMORTAL++
// “CORTEX → WISDOM → UXBRIDGE → CHUNKER” — FULL COGNITIVE FRAME PIPELINE
// PURE LOGIC • PURE DETERMINISM • ZERO SIDE EFFECTS
// SYMBOLIC + BINARY AWARE • DISPATCH-AWARE • MEMORY-AWARE • PRESENCE-AWARE
// INTELLIGENT-COMPUTE-AWARE • CHUNK-AWARE • EARN-AWARE • IMMORTAL++
// ============================================================================
import {
  OrganismIdentity,
  buildPulseOrganismMap as buildOrganismMap
} from "../PULSE-X/PulseWorldOrganismMap-v24.js";
const Identity = OrganismIdentity(import.meta.url);
export const PulseGPUChunkerMeta = Identity.OrganMeta;
export const pulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
// export const PULSE_EARN_IMMUNE_CONTEXT = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;
import * as PulseGPUBrain                from "./PulseGPUBrain-v24.js";
import * as PulseGPUWisdomCortex        from "./PulseGPUWIsdomCortex-v24.js";
import * as PulseGPUAstralMuscleSystem  from "./PulseGPUAstralMuscleSystem-v24.js";
import * as PulseGPUAstralNervousSystem from "./PulseGPUAstralNervousSystem-v24.js";
import * as PulseGPUSpine               from "./PulseGPUSpine-v24.js";
import * as PulseGPUGeneticMemory       from "./PulseGPUGeneticMemory-v24.js";
import * as PulseGPUGuardianCortex      from "./PulseGPUGuardianCortex-v24.js";
import * as PulseGPULymphNodes          from "./PulseGPULymphNodes-v24.js";
import * as PulseGPUSurvivalInstincts   from "./PulseGPUSurvivalInstincts-v24.js";
import * as PulseGPUChunkPlannerModule  from "./PulseGPUChunkPlanner-v24.js"; // awareness only

// ============================================================================
// SHARED EVO + CONTRACTS (v24-IMMORTAL++)
// ============================================================================

const PULSE_GPU_COGNITION_VERSION = "24.0-IMMORTAL++";

const COGNITIVE_EVO = {
  // Core cognition
  gpuCompute: true,
  tensorEngine: true,
  parallelSafe: true,
  cognitiveSimulation: true,
  reasoningSimulation: true,
  patternFusion: true,

  // Awareness
  symbolicSafe: true,
  binarySafe: true,
  dualBandAware: true,
  gpuDispatchAware: true,
  gpuMemoryAware: true,
  gpuAdvantageAware: true,
  presenceAware: true,
  dnaAware: true,
  versionAware: true,
  instanceAware: true,

  // Mesh / organ linkage
  meshLinked: true,
  astralMeshLinked: true,
  guardianLinked: true,
  healerLinked: true,
  muscleLinked: true,
  nervousSystemLinked: true,
  wisdomLinked: true,
  survivalLinked: true,
  brainLinked: true,
  spineLinked: true,
  geneticMemoryLinked: true,

  // Chunk / layout awareness
  chunkAware: true,
  chunkPlannerAware: true,
  gpuChunkPlanAware: true,

  // Immortal + Earn
  deterministic: true,
  driftProof: true,
  pureCompute: true,
  zeroMutationOfInput: true,
  zeroNetwork: true,
  zeroFilesystem: true,
  immortalReady: true,
  immortalSurface: true,
  earnAware: true,
  earnCompatibility: "Earn-v4-Presence",

  // Contracts
  routingContract: "PulseSend-v24-IMMORTAL++",
  gpuOrganContract: "PulseGPU-v24-IMMORTAL++",
  binaryGpuOrganContract: "PulseBinaryGPU-v24-IMMORTAL++",
  workgroupLawVersion: 24
};

// ============================================================================
// COGNITIVE FRAME — FULL GPU THOUGHT
// ============================================================================
//
// Flows: Brain → Cognitive Cortex → Wisdom → UXBridge (+ Chunker awareness)
// ============================================================================

class CognitiveFrame {
  constructor({
    cognition = {},
    interpretation = {},
    narrative = {},
    tier = {},
    performance = {},
    dispatch = {},
    advantage = {},
    presence = {},
    shapeSignature = {},
    patternSignature = {},
    symbolic = {},
    binary = {},
    recommendedActions = [],
    chunkContext = null,
    dnaTag = "default-dna",
    instanceId = "",
    version = PULSE_GPU_COGNITION_VERSION,
    earnMode = false
  } = {}) {
    this.cognition = cognition;
    this.interpretation = interpretation;
    this.narrative = narrative;
    this.tier = tier;
    this.performance = performance;
    this.dispatch = dispatch;
    this.advantage = advantage;
    this.presence = presence;
    this.shapeSignature = shapeSignature;
    this.patternSignature = patternSignature;
    this.symbolic = symbolic;
    this.binary = binary;
    this.recommendedActions = Array.isArray(recommendedActions)
      ? recommendedActions
      : [];
    this.chunkContext = chunkContext;

    this.meta = {
      layer: "PulseGPUCognitiveIntelligence",
      version,
      target: "full-gpu",
      dnaTag,
      instanceId,
      earnMode,
      evo: COGNITIVE_EVO
    };
  }
}

// ============================================================================
// COMPUTER INTELLIGENCE HOOK (Earn-aware, v24)
// ============================================================================

function computeComputerIntelligence(cognitiveFrame, { earnMode = false } = {}) {
  if (!cognitiveFrame || typeof cognitiveFrame !== "object") {
    return null;
  }

  const base =
    cognitiveFrame instanceof CognitiveFrame
      ? cognitiveFrame
      : new CognitiveFrame(cognitiveFrame);

  const ci = {
    identity: "PulseGPUComputerIntelligenceFrame",
    version: PULSE_GPU_COGNITION_VERSION,
    layer: "gpu_computer_intelligence",
    earnMode: !!earnMode,
    dnaTag: base.meta?.dnaTag,
    instanceId: base.meta?.instanceId,

    cognition: base.cognition,
    interpretation: base.interpretation,
    narrative: base.narrative,
    tier: base.tier,
    performance: base.performance,
    dispatch: base.dispatch,
    advantage: base.advantage,
    presence: base.presence,
    shapeSignature: base.shapeSignature,
    patternSignature: base.patternSignature,
    symbolic: base.symbolic,
    binary: base.binary,
    recommendedActions: base.recommendedActions,
    chunkContext: base.chunkContext,

    evo: {
      ...COGNITIVE_EVO,
      computerIntelligence: true,
      earnAware: true
    },

    contracts: {
      routingContract: "PulseSend-v24-IMMORTAL++",
      gpuOrganContract: "PulseGPU-v24-IMMORTAL++",
      binaryGpuOrganContract: "PulseBinaryGPU-v24-IMMORTAL++",
      earnCompatibility: "Earn-v4-Presence"
    }
  };

  return ci;
}

// ============================================================================
// INTERNAL: CHUNK CONTEXT DERIVATION (pure, planner-aware, no direct calls)
// ============================================================================

function deriveChunkContextFromDispatchHistory(gpuDispatchHistory = []) {
  const count = Array.isArray(gpuDispatchHistory)
    ? gpuDispatchHistory.length
    : 0;

  if (count === 0) {
    return {
      chunkProfile: "default",
      plannerStrategy: "balanced",
      plannerChunks: null,
      rechunkRecommended: false
    };
  }

  const last = gpuDispatchHistory[count - 1];

  const pattern = last?.pattern || "gpu-default";
  const advantageScore =
    typeof last?.meta?.advantageScore === "number"
      ? last.meta.advantageScore
      : 0;

  let chunkProfile = "default";
  if (pattern.includes("gpu")) chunkProfile = "gpu";
  if (pattern.includes("rich")) chunkProfile = "rich";

  let plannerStrategy = "balanced";
  if (advantageScore > 0.2) plannerStrategy = "aggressive_gpu";
  else if (advantageScore < -0.2) plannerStrategy = "safe_minimal";

  const rechunkRecommended =
    advantageScore < -0.2 || advantageScore > 0.4;

  return {
    chunkProfile,
    plannerStrategy,
    plannerChunks: null, // symbolic only; real chunks come from PulseGPUChunkPlanner
    rechunkRecommended
  };
}

// ============================================================================
// COGNITIVE CORTEX — RAW COGNITION LAYER (v24)
// ============================================================================

class PulseGPUCognitiveCortex {
  static meta = {
    layer: "PulseGPUCognitiveCortex",
    version: PULSE_GPU_COGNITION_VERSION,
    target: "full-gpu",
    evo: COGNITIVE_EVO
  };

  static buildCognitiveFrame({
    intelligentCompute,
    gpuDispatchHistory = [],
    gpuAdvantageMap = null,
    presenceContext = null,
    gameProfile = null,
    tierProfile = null,
    hardwareProfile = null,
    dnaTag = "default-dna",
    instanceId = "",
    earnMode = false
  } = {}) {
    const dispatchCount = Array.isArray(gpuDispatchHistory)
      ? gpuDispatchHistory.length
      : 0;

    const lastDispatch =
      dispatchCount > 0 ? gpuDispatchHistory[dispatchCount - 1] : null;

    const shapeSignature = {
      pattern: lastDispatch?.pattern || "gpu-default",
      mode: lastDispatch?.mode || "normal",
      modeKind: lastDispatch?.modeKind || "symbolic",
      binaryMode: !!lastDispatch?.binaryMode,
      dualMode: !!lastDispatch?.dualMode
    };

    const advantage = {
      hasAdvantageMap: !!gpuAdvantageMap,
      lastAdvantageScore:
        typeof lastDispatch?.meta?.advantageScore === "number"
          ? lastDispatch.meta.advantageScore
          : 0,
      dispatchHistoryCount: dispatchCount
    };

    const presence = {
      context: presenceContext || null,
      dnaTag,
      instanceId,
      intelligentCompute
    };

    const cognition = {
      gameProfile,
      tierProfile,
      hardwareProfile,
      dispatchSummary: {
        dispatchHistoryCount: dispatchCount,
        lastPattern: shapeSignature.pattern,
        lastMode: shapeSignature.mode,
        lastModeKind: shapeSignature.modeKind
      },
      advantageSummary: advantage
    };

    const performance = {
      baselineScore: null,
      currentScore: null,
      deltaPercent: null
    };

    const tier = {
      currentTier: tierProfile?.tierId || null,
      tierHistory: tierProfile?.history || []
    };

    const dispatch = {
      history: gpuDispatchHistory,
      lastDispatch
    };

    const patternSignature = {
      pattern: shapeSignature.pattern,
      lineage: gameProfile?.lineage || null
    };

    const symbolic = {
      modeKind: shapeSignature.modeKind,
      symbolicPreferred: shapeSignature.modeKind === "symbolic"
    };

    const binary = {
      binaryMode: shapeSignature.binaryMode,
      dualMode: shapeSignature.dualMode
    };

    const narrative = {
      summary: "Cognitive frame initialized (raw cognition layer, v24-IMMORTAL++).",
      details: {
        hasAdvantageMap: advantage.hasAdvantageMap,
        dispatchHistoryCount: advantage.dispatchHistoryCount
      }
    };

    const chunkContext = deriveChunkContextFromDispatchHistory(
      gpuDispatchHistory
    );

    const recommendedActions = [];
    if (chunkContext.rechunkRecommended) {
      recommendedActions.push({
        type: "rechunk-needed",
        severity: "medium",
        hint: "re-evaluate-gpu-chunk-layout",
        chunkProfile: chunkContext.chunkProfile,
        plannerStrategy: chunkContext.plannerStrategy
      });
    }

    const frame = new CognitiveFrame({
      cognition,
      interpretation: {},
      narrative,
      tier,
      performance,
      dispatch,
      advantage,
      presence,
      shapeSignature,
      patternSignature,
      symbolic,
      binary,
      recommendedActions,
      chunkContext,
      dnaTag,
      instanceId,
      version: PULSE_GPU_COGNITION_VERSION,
      earnMode
    });

    log(
      "gpu",
      "[Cognition] PulseGPUCognitiveCortex.buildCognitiveFrame v24-IMMORTAL++",
      "color:#9C27B0;",
      {
        dispatchHistoryCount: dispatchCount,
        hasAdvantageMap: advantage.hasAdvantageMap,
        dnaTag,
        instanceId,
        earnMode,
        chunkProfile: chunkContext.chunkProfile,
        plannerStrategy: chunkContext.plannerStrategy,
        rechunkRecommended: chunkContext.rechunkRecommended
      }
    );

    return frame;
  }
}

// ============================================================================
// WISDOM CORTEX — INTERPRETATION LAYER (v24)
// ============================================================================

class PulseGPUWisdomBridge {
  static meta = {
    layer: "PulseGPUWisdomBridge",
    version: PULSE_GPU_COGNITION_VERSION,
    target: "full-gpu",
    evo: COGNITIVE_EVO
  };

  static interpret(frame) {
    if (!frame || typeof frame !== "object") return null;

    const base =
      frame instanceof CognitiveFrame ? frame : new CognitiveFrame(frame);

    const dispatchCount =
      base.dispatch?.dispatchHistoryCount ||
      (Array.isArray(base.dispatch?.history)
        ? base.dispatch.history.length
        : 0);

    const advantageScore = base.advantage?.lastAdvantageScore || 0;

    let performanceLabel = "unknown";
    if (typeof advantageScore === "number") {
      if (advantageScore > 0.1) performanceLabel = "improved";
      else if (advantageScore < -0.1) performanceLabel = "regressed";
      else performanceLabel = "stable";
    }

    const interpretation = {
      performanceLabel,
      hasHistory: dispatchCount > 0,
      hasAdvantageMap: !!base.advantage?.hasAdvantageMap,
      symbolicPreferred: !!base.symbolic?.symbolicPreferred,
      binaryMode: !!base.binary?.binaryMode,
      dualMode: !!base.binary?.dualMode,
      chunkAware: !!base.chunkContext,
      rechunkRecommended: !!base.chunkContext?.rechunkRecommended
    };

    const narrative = {
      summary: `GPU experience is ${performanceLabel}.`,
      details: {
        advantageScore,
        dispatchHistoryCount: dispatchCount,
        symbolicPreferred: interpretation.symbolicPreferred,
        binaryMode: interpretation.binaryMode,
        dualMode: interpretation.dualMode,
        chunkProfile: base.chunkContext?.chunkProfile || "default",
        plannerStrategy: base.chunkContext?.plannerStrategy || "balanced",
        rechunkRecommended: interpretation.rechunkRecommended
      }
    };

    const tier = {
      ...base.tier,
      tierHint:
        performanceLabel === "improved"
          ? "consider-promoting-current-to-baseline"
          : performanceLabel === "regressed"
          ? "consider-restoring-baseline"
          : "monitor"
    };

    const performance = {
      ...base.performance,
      advantageScore,
      label: performanceLabel
    };

    const recommendedActions = [...(base.recommendedActions || [])];

    if (performanceLabel === "regressed") {
      recommendedActions.push({
        type: "restore-baseline",
        severity: "high",
        hint: "restore-baseline-settings"
      });
    } else if (performanceLabel === "improved") {
      recommendedActions.push({
        type: "promote-current",
        severity: "medium",
        hint: "promote-current-to-baseline"
      });
    }

    if (interpretation.rechunkRecommended) {
      recommendedActions.push({
        type: "rechunk-needed",
        severity: "medium",
        hint: "re-evaluate-gpu-chunk-layout",
        chunkProfile: base.chunkContext?.chunkProfile || "default",
        plannerStrategy: base.chunkContext?.plannerStrategy || "balanced"
      });
    }

    const enriched = new CognitiveFrame({
      cognition: base.cognition,
      interpretation,
      narrative,
      tier,
      performance,
      dispatch: base.dispatch,
      advantage: base.advantage,
      presence: base.presence,
      shapeSignature: base.shapeSignature,
      patternSignature: base.patternSignature,
      symbolic: base.symbolic,
      binary: base.binary,
      recommendedActions,
      chunkContext: base.chunkContext,
      dnaTag: base.meta?.dnaTag,
      instanceId: base.meta?.instanceId,
      version: base.meta?.version,
      earnMode: base.meta?.earnMode
    });

    log(
      "gpu",
      "[Wisdom] PulseGPUWisdomBridge.interpret v24-IMMORTAL++",
      "color:#3F51B5;",
      {
        performanceLabel,
        advantageScore,
        dispatchHistoryCount: dispatchCount,
        rechunkRecommended: interpretation.rechunkRecommended
      }
    );

    return enriched;
  }
}

// ============================================================================
// UX BRIDGE — NOTIFICATION LAYER (v24)
// ============================================================================

function buildNotification({ kind, severity, title, message, actions, meta }) {
  const notif = {
    kind: kind || "performance",
    severity: severity || "low",
    title: title || "",
    message: message || "",
    meta: {
      layer: "PulseGPUUXBridge",
      version: PULSE_GPU_COGNITION_VERSION,
      target: "full-gpu",
      selfRepairable: true,

      evo: {
        advantageCascadeAware: true,
        pulseEfficiencyAware: true,
        driftProof: true,
        multiInstanceReady: true,
        unifiedAdvantageField: true,
        pulseSend24Ready: true,

        presenceAware: true,
        dnaAware: true,
        versionAware: true,
        instanceAware: true,

        binaryAware: true,
        symbolicAware: true,
        gpuDispatchAware: true,
        gpuMemoryAware: true,
        gpuAdvantageAware: true,
        chunkAware: true,
        chunkPlannerAware: true,

        routingContract: "PulseSend-v24-IMMORTAL++",
        gpuOrganContract: "PulseGPU-v24-IMMORTAL++",
        binaryGpuOrganContract: "PulseBinaryGPU-v24-IMMORTAL++",
        earnCompatibility: "Earn-v4-Presence"
      },

      ...(meta || {})
    }
  };

  if (Array.isArray(actions) && actions.length > 0) {
    notif.actions = actions;
  }

  return notif;
}

function validateNotification(n) {
  if (!n || typeof n !== "object") return false;
  if (typeof n.kind !== "string") return false;
  if (typeof n.severity !== "string") return false;
  if (!n.meta || n.meta.layer !== "PulseGPUUXBridge") return false;
  return true;
}

class PulseGPUUXBridge {
  constructor() {}

  static meta = {
    layer: "PulseGPUUXBridge",
    version: PULSE_GPU_COGNITION_VERSION,
    target: "full-gpu",
    selfRepairable: true,
    evo: {
      ...COGNITIVE_EVO,
      advantageCascadeAware: true,
      pulseEfficiencyAware: true,
      unifiedAdvantageField: true,
      pulseSend24Ready: true
    }
  };

  // CognitiveFrame → notifications
  fromCognitiveFrame(frame) {
    if (!frame || typeof frame !== "object") return [];

    const base =
      frame instanceof CognitiveFrame ? frame : new CognitiveFrame(frame);

    const notifications = [];

    const perfLabel = base.performance?.label || "unknown";
    const advantageScore = base.performance?.advantageScore ?? 0;
    const gameId = base.cognition?.gameProfile?.gameId || "this game";

    const gpuMeta = {
      cognitiveFrameVersion: base.meta?.version,
      performanceLabel: perfLabel,
      advantageScore,
      dnaTag: base.meta?.dnaTag,
      instanceId: base.meta?.instanceId,
      earnMode: base.meta?.earnMode,
      shapeSignature: base.shapeSignature,
      patternSignature: base.patternSignature,
      chunkProfile: base.chunkContext?.chunkProfile || "default",
      plannerStrategy: base.chunkContext?.plannerStrategy || "balanced",
      rechunkRecommended: !!base.chunkContext?.rechunkRecommended
    };

    // Performance narrative
    if (perfLabel === "regressed") {
      notifications.push(
        buildNotification({
          kind: "performance",
          severity: "high",
          title: "Performance drop detected",
          message: `Performance for ${gameId} appears worse than your stable baseline.`,
          actions: [
            {
              label: "Restore best settings",
              actionType: "request-restore-best-settings",
              payload: {
                gameProfile: base.cognition?.gameProfile,
                hardwareProfile: base.cognition?.hardwareProfile,
                tierProfile: base.cognition?.tierProfile
              }
            }
          ],
          meta: {
            repairHint: "restore-baseline-settings",
            routingContract: "PulseSend-v24-IMMORTAL++",
            gpuOrganContract: "PulseGPU-v24-IMMORTAL++",
            ...gpuMeta
          }
        })
      );
    } else if (perfLabel === "improved") {
      notifications.push(
        buildNotification({
          kind: "performance",
          severity: "medium",
          title: "Performance improved",
          message: `Performance for ${gameId} appears better than your previous baseline.`,
          actions: [
            {
              label: "Promote current settings",
              actionType: "request-promote-current-settings",
              payload: {
                gameProfile: base.cognition?.gameProfile,
                hardwareProfile: base.cognition?.hardwareProfile,
                tierProfile: base.cognition?.tierProfile
              }
            }
          ],
          meta: {
            repairHint: "promote-current-to-baseline",
            routingContract: "PulseSend-v24-IMMORTAL++",
            gpuOrganContract: "PulseGPU-v24-IMMORTAL++",
            ...gpuMeta
          }
        })
      );
    }

    // Tier hint
    const tierHint = base.tier?.tierHint;
    if (tierHint === "consider-restoring-baseline") {
      notifications.push(
        buildNotification({
          kind: "settings",
          severity: "medium",
          title: "Better settings available",
          message: `Your current configuration for ${gameId} may be below your best-known settings.`,
          actions: [
            {
              label: "Apply optimal settings",
              actionType: "request-apply-optimal-settings",
              payload: {
                gameProfile: base.cognition?.gameProfile,
                hardwareProfile: base.cognition?.hardwareProfile,
                tierProfile: base.cognition?.tierProfile
              }
            }
          ],
          meta: {
            repairHint: "suggest-baseline-settings",
            routingContract: "PulseSend-v24-IMMORTAL++",
            gpuOrganContract: "PulseGPU-v24-IMMORTAL++",
            ...gpuMeta
          }
        })
      );
    }

    // Chunk / rechunk hint
    if (base.chunkContext?.rechunkRecommended) {
      notifications.push(
        buildNotification({
          kind: "chunk-layout",
          severity: "medium",
          title: "GPU chunk layout can be improved",
          message:
            "Observed GPU advantage suggests your GPU chunk layout could be re-optimized.",
          actions: [
            {
              label: "Re-evaluate GPU chunks",
              actionType: "request-gpu-rechunk",
              payload: {
                chunkProfile: base.chunkContext.chunkProfile,
                plannerStrategy: base.chunkContext.plannerStrategy
              }
            }
          ],
          meta: {
            repairHint: "re-evaluate-gpu-chunk-layout",
            routingContract: "PulseSend-v24-IMMORTAL++",
            gpuOrganContract: "PulseGPU-v24-IMMORTAL++",
            chunkPlannerAware: true,
            chunkPlannerId:
              PulseGPUChunkPlannerModule
                ?.AI_EXPERIENCE_META_PulseGPUChunkPlanner?.id ||
              "pulsegpu.chunk_planner",
            ...gpuMeta
          }
        })
      );
    }

    // Recommended actions → notifications
    (base.recommendedActions || []).forEach((act) => {
      if (!act || typeof act !== "object") return;

      if (act.type === "restore-baseline") {
        notifications.push(
          buildNotification({
            kind: "settings",
            severity: act.severity || "high",
            title: "Restore best-known settings",
            message:
              "Performance appears regressed; restoring your best-known configuration is recommended.",
            actions: [
              {
                label: "Restore now",
                actionType: "apply-settings",
                payload: {
                  mode: "restore",
                  targetSettings: act.targetSettings || null
                }
              }
            ],
            meta: {
              repairHint: act.hint || "restore-baseline-settings",
              routingContract: "PulseSend-v24-IMMORTAL++",
              gpuOrganContract: "PulseGPU-v24-IMMORTAL++",
              ...gpuMeta
            }
          })
        );
      }

      if (act.type === "promote-current") {
        notifications.push(
          buildNotification({
            kind: "settings",
            severity: act.severity || "medium",
            title: "Promote current settings",
            message:
              "Current configuration appears better than your previous baseline.",
            actions: [
              {
                label: "Promote now",
                actionType: "apply-settings",
                payload: {
                  mode: "optimal",
                  targetSettings: act.targetSettings || null
                }
              }
            ],
            meta: {
              repairHint: act.hint || "promote-current-to-baseline",
              routingContract: "PulseSend-v24-IMMORTAL++",
              gpuOrganContract: "PulseGPU-v24-IMMORTAL++",
              ...gpuMeta
            }
          })
        );
      }

      if (act.type === "rechunk-needed") {
        notifications.push(
          buildNotification({
            kind: "chunk-layout",
            severity: act.severity || "medium",
            title: "GPU chunk layout misaligned",
            message:
              "Chunk layout appears misaligned with observed GPU advantage; a new GPU chunk plan is recommended.",
            actions: [
              {
                label: "Request new chunk plan",
                actionType: "request-gpu-rechunk",
                payload: {
                  chunkProfile:
                    act.chunkProfile || base.chunkContext?.chunkProfile,
                  plannerStrategy:
                    act.plannerStrategy ||
                    base.chunkContext?.plannerStrategy ||
                    "balanced"
                }
              }
            ],
            meta: {
              repairHint: act.hint || "re-evaluate-gpu-chunk-layout",
              routingContract: "PulseSend-v24-IMMORTAL++",
              gpuOrganContract: "PulseGPU-v24-IMMORTAL++",
              chunkPlannerAware: true,
              chunkPlannerId:
                PulseGPUChunkPlannerModule
                  ?.AI_EXPERIENCE_META_PulseGPUChunkPlanner?.id ||
                "pulsegpu.chunk_planner",
              ...gpuMeta
            }
          })
        );
      }
    });

    return notifications.filter(validateNotification);
  }
}

// ============================================================================
// EXPORTS
// ============================================================================

export {
  // Core types
  CognitiveFrame,
  computeComputerIntelligence,

  // Layers
  PulseGPUCognitiveCortex,
  PulseGPUWisdomBridge,
  PulseGPUUXBridge,

  // UX helpers
  buildNotification,
  validateNotification
};
