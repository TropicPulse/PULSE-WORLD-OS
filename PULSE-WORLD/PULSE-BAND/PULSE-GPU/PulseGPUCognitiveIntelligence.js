/* global log,warn */
// ============================================================================
// FILE: PULSE-GPU/PulseGPUCognitiveIntelligence.js
// PULSE GPU COGNITIVE INTELLIGENCE v16-Immortal
// “CORTEX → WISDOM → UXBRIDGE” — FULL COGNITIVE FRAME PIPELINE
// PURE LOGIC • PURE DETERMINISM • ZERO SIDE EFFECTS
// SYMBOLIC + BINARY AWARE • DISPATCH-AWARE • MEMORY-AWARE • PRESENCE-AWARE
// INTELLIGENT-COMPUTE-AWARE • EARN-AWARE • IMMORTAL-READY
// ============================================================================

import * as PulseGPUBrain              from "./PulseGPUBrain.js";
import * as PulseGPUWisdomCortex       from "./PulseGPUWisdomCortex.js";
import * as PulseGPUAstralMuscleSystem from "./PulseGPUAstralMuscleSystem.js";
import * as PulseGPUAstralNervousSystem from "./PulseGPUAstralNervousSystem.js";
import * as PulseGPUSpine              from "./PulseGPUSpine.js";
import * as PulseGPUGeneticMemory      from "./PulseGPUGeneticMemory.js";
import * as PulseGPUGuardianCortex     from "./PulseGPUGuardianCortex.js";
import * as PulseGPULymphNodes         from "./PulseGPULymphNodes.js";
import * as PulseGPUSurvivalInstincts  from "./PulseGPUSurvivalInstincts.js";

/*
AI_EXPERIENCE_META = {
  identity: "PulseGPUCognitiveIntelligence",
  version: "v16-Immortal",
  layer: "gpu_cognition",
  role: "gpu_cognitive_intelligence_cortex",
  lineage: "PulseGPU-v16-Immortal",

  evo: {
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

    // Mesh linkage
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
    routingContract: "PulseSend-v16",
    gpuOrganContract: "PulseGPU-v16-Immortal",
    binaryGpuOrganContract: "PulseBinaryGPU-v16-Immortal",
    workgroupLawVersion: 16
  },

  contract: {
    always: [
      "PulseGPUBrain",
      "PulseGPUWisdomCortex",
      "PulseGPUAstralMuscleSystem",
      "PulseGPUAstralNervousSystem",
      "PulseGPUSpine",
      "PulseGPUGeneticMemory",
      "PulseGPUGuardianCortex",
      "PulseGPULymphNodes",
      "PulseGPUSurvivalInstincts"
    ],
    never: [
      "PulseOSCortex",
      "safeRoute",
      "fetchViaCNS",
      "legacyGPUCognitiveIntelligence"
    ]
  }
}
*/

// ============================================================================
// SHARED EVO + CONTRACTS
// ============================================================================

const PULSE_GPU_COGNITION_VERSION = "16.0-Immortal";

const COGNITIVE_EVO = {
  gpuCompute: true,
  tensorEngine: true,
  parallelSafe: true,

  cognitiveSimulation: true,
  reasoningSimulation: true,
  patternFusion: true,

  symbolicSafe: true,
  binarySafe: true,
  dualBandAware: true,
  gpuDispatchAware: true,
  gpuMemoryAware: true,
  gpuAdvantageAware: true,

  presenceAware: true,
  dnaAware: true,
  versionAware: true,

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

  routingContract: "PulseSend-v16",
  gpuOrganContract: "PulseGPU-v16-Immortal",
  binaryGpuOrganContract: "PulseBinaryGPU-v16-Immortal",
  workgroupLawVersion: 16
};

// ============================================================================
// COGNITIVE FRAME — FULL GPU THOUGHT (D)
// ============================================================================
//
// A cognitive frame is the full “GPU thought” object that flows:
//   Brain → Cognitive Cortex → Wisdom Cortex → UXBridge → UX
//
// It is deterministic, pure, and fully presence/advantage/dispatch aware.
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
// COMPUTER INTELLIGENCE HOOK (Earn-aware)
// ============================================================================
//
// This is the “new computer intelligence function” — a pure, deterministic
// mapper from CognitiveFrame → ComputerIntelligenceFrame, explicitly
// Earn-aware but still zero side effects.
// ============================================================================

function computeComputerIntelligence(cognitiveFrame, { earnMode = false } = {}) {
  if (!cognitiveFrame || typeof cognitiveFrame !== "object") {
    return null;
  }

  const base = cognitiveFrame instanceof CognitiveFrame
    ? cognitiveFrame
    : new CognitiveFrame(cognitiveFrame);

  const ci = {
    identity: "PulseGPUComputerIntelligenceFrame",
    version: "16.0-Immortal",
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

    evo: {
      ...COGNITIVE_EVO,
      computerIntelligence: true,
      earnAware: true
    },

    contracts: {
      routingContract: "PulseSend-v16",
      gpuOrganContract: "PulseGPU-v16-Immortal",
      binaryGpuOrganContract: "PulseBinaryGPU-v16-Immortal",
      earnCompatibility: "Earn-v4-Presence"
    }
  };

  return ci;
}

// ============================================================================
// COGNITIVE CORTEX — RAW COGNITION LAYER
// ============================================================================
//
// Input: Brain’s intelligentCompute snapshot + GPU evidence
// Output: CognitiveFrame (with cognition/dispatch/advantage/presence filled)
// ============================================================================

class PulseGPUCognitiveCortex {
  static meta = {
    layer: "PulseGPUCognitiveCortex",
    version: "16.0-Immortal",
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

    const lastDispatch = dispatchCount > 0
      ? gpuDispatchHistory[dispatchCount - 1]
      : null;

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
      summary: "Cognitive frame initialized (raw cognition layer).",
      details: {
        hasAdvantageMap: advantage.hasAdvantageMap,
        dispatchHistoryCount: advantage.dispatchHistoryCount
      }
    };

    const recommendedActions = [];

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
      dnaTag,
      instanceId,
      version: PULSE_GPU_COGNITION_VERSION,
      earnMode
    });

    log(
      "gpu",
      "[Cognition] PulseGPUCognitiveCortex.buildCognitiveFrame v16-Immortal",
      "color:#9C27B0;",
      {
        dispatchHistoryCount: dispatchCount,
        hasAdvantageMap: advantage.hasAdvantageMap,
        dnaTag,
        instanceId,
        earnMode
      }
    );

    return frame;
  }
}

// ============================================================================
// WISDOM CORTEX — INTERPRETATION LAYER
// ============================================================================
//
// Input: CognitiveFrame
// Output: CognitiveFrame (with interpretation/narrative/tier/performance enriched)
// ============================================================================

class PulseGPUWisdomBridge {
  static meta = {
    layer: "PulseGPUWisdomBridge",
    version: "16.0-Immortal",
    target: "full-gpu",
    evo: COGNITIVE_EVO
  };

  static interpret(frame) {
    if (!frame || typeof frame !== "object") return null;

    const base = frame instanceof CognitiveFrame
      ? frame
      : new CognitiveFrame(frame);

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
      dualMode: !!base.binary?.dualMode
    };

    const narrative = {
      summary: `GPU experience is ${performanceLabel}.`,
      details: {
        advantageScore,
        dispatchHistoryCount: dispatchCount,
        symbolicPreferred: interpretation.symbolicPreferred,
        binaryMode: interpretation.binaryMode,
        dualMode: interpretation.dualMode
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
      dnaTag: base.meta?.dnaTag,
      instanceId: base.meta?.instanceId,
      version: base.meta?.version,
      earnMode: base.meta?.earnMode
    });

    log(
      "gpu",
      "[Wisdom] PulseGPUWisdomBridge.interpret v16-Immortal",
      "color:#3F51B5;",
      {
        performanceLabel,
        advantageScore,
        dispatchHistoryCount: dispatchCount
      }
    );

    return enriched;
  }
}

// ============================================================================
// UX BRIDGE — NOTIFICATION LAYER (v16-Immortal)
// ============================================================================
//
// Input: CognitiveFrame (enriched by Wisdom)
// Output: Notifications (UX-safe, deterministic, self-repairable)
// ============================================================================

function buildNotification({
  kind,
  severity,
  title,
  message,
  actions,
  meta
}) {
  const notif = {
    kind: kind || "performance",
    severity: severity || "low",
    title: title || "",
    message: message || "",
    meta: {
      layer: "PulseGPUUXBridge",
      version: "16.0-Immortal",
      target: "full-gpu",
      selfRepairable: true,

      evo: {
        advantageCascadeAware: true,
        pulseEfficiencyAware: true,
        driftProof: true,
        multiInstanceReady: true,
        unifiedAdvantageField: true,
        pulseSend16Ready: true,

        presenceAware: true,
        dnaAware: true,
        versionAware: true,
        instanceAware: true,

        binaryAware: true,
        symbolicAware: true,
        gpuDispatchAware: true,
        gpuMemoryAware: true,
        gpuAdvantageAware: true,

        routingContract: "PulseSend-v16",
        gpuOrganContract: "PulseGPU-v16-Immortal",
        binaryGpuOrganContract: "PulseBinaryGPU-v16-Immortal",
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
    version: "16.0-Immortal",
    target: "full-gpu",
    selfRepairable: true,
    evo: {
      ...COGNITIVE_EVO,
      advantageCascadeAware: true,
      pulseEfficiencyAware: true,
      unifiedAdvantageField: true,
      pulseSend16Ready: true
    }
  };

  // CognitiveFrame → notifications
  fromCognitiveFrame(frame) {
    if (!frame || typeof frame !== "object") return [];

    const base = frame instanceof CognitiveFrame
      ? frame
      : new CognitiveFrame(frame);

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
      patternSignature: base.patternSignature
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
            routingContract: "PulseSend-v16",
            gpuOrganContract: "PulseGPU-v16-Immortal",
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
            routingContract: "PulseSend-v16",
            gpuOrganContract: "PulseGPU-v16-Immortal",
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
            routingContract: "PulseSend-v16",
            gpuOrganContract: "PulseGPU-v16-Immortal",
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
              routingContract: "PulseSend-v16",
              gpuOrganContract: "PulseGPU-v16-Immortal",
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
              routingContract: "PulseSend-v16",
              gpuOrganContract: "PulseGPU-v16-Immortal",
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
