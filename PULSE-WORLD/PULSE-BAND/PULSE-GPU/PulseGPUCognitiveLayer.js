/* global log,warn */
// ============================================================================
// FILE: tropic-pulse-functions/PULSE-WORLD/PULSE-GPU/PulseGPUSettingsRestorer.js
// PULSE GPU SETTINGS RESTORER v16-Immortal
// “COGNITIVE RECOGNITION LAYER / RESTORATION PLANNER”
// ============================================================================
//
// PERSONALITY + ROLE (v16-Immortal):
//   PulseGPUSettingsRestorer is the **COGNITIVE RECOGNITION LAYER**.
//   It is the **RESTORATION PLANNER** — the subsystem that reads advice
//   and recognizes what concrete action should be taken.
//
//   • Consumes advisor insights (Drive Center) + memory entries (Evolution Core)
//   • Can also consume GPU dispatch/memory hints (Brain/Spine/History)
//   • Recognizes whether to restore, apply optimal, upgrade tier, or noop
//   • Produces deterministic restoration plans for the Healer + Orchestrator
//   • PulseSend‑v16‑ready: plans can be routed by the compute router
//   • Earn‑v4‑Presence‑ready
//   • Binary-aware, symbolic-aware, dispatch-aware, memory-aware, presence-aware
//   • CognitiveFrame-aware: can emit GPU “thought frames” for each plan
//   • ComputerIntelligence-aware: can emit CI frames for Earn mode
// ============================================================================
/*
AI_EXPERIENCE_META = {
  identity: "PulseGPUCognitiveLayer",
  version: "v16-Immortal",
  layer: "gpu_cognition",
  role: "gpu_cognitive_layer",
  lineage: "PulseGPU-v16-Immortal",

  evo: {
    gpuCognition: true,
    gpuAnalysis: true,
    gpuPreflight: true,

    deterministic: true,
    driftProof: true,
    pureCompute: true,

    zeroNetwork: true,
    zeroFilesystem: true,
    zeroMutationOfInput: true,

    symbolicPrimary: true,
    binaryAware: true,
    dualBand: true,

    presenceAware: true,
    dnaAware: true,
    versionAware: true,
    instanceAware: true,

    brainLinked: true,
    wisdomLinked: true,
    geneticMemoryLinked: true,

    immortalReady: true,
    immortalSurface: true,
    earnAware: true,
    earnCompatibility: "Earn-v4-Presence",

    routingContract: "PulseSend-v16",
    gpuOrganContract: "PulseGPU-v16-Immortal",
    binaryGpuOrganContract: "PulseBinaryGPU-v16-Immortal",
    workgroupLawVersion: 16
  },

  contract: {
    always: [
      "PulseGPUBrain",
      "PulseGPUDrive",
      "PulseGPUCognitiveIntelligence"
    ],
    never: [
      "safeRoute",
      "fetchViaCNS",
      "legacyGPUCognition"
    ]
  }
}
*/

import {
  CognitiveFrame,
  computeComputerIntelligence
} from "./PulseGPUCognitiveIntelligence.js";

// ------------------------------------------------------------
// OS‑v16-Immortal CONTEXT METADATA
// ------------------------------------------------------------
const RESTORER_CONTEXT = {
  layer: "PulseGPUSettingsRestorer",
  role: "GPU_SETTINGS_RESTORER",
  purpose: "Deterministic planner for GPU settings restoration",
  context:
    "Consumes advisor insights + memory entries + GPU hints to produce restoration plans",
  target: "full-gpu",
  version: "16.0-Immortal",
  selfRepairable: true,

  evo: {
    advantageCascadeAware: true,
    pulseEfficiencyAware: true,
    driftProof: true,
    multiInstanceReady: true,
    unifiedAdvantageField: true,
    pulseSend16Ready: true,

    // Presence Evolution
    presenceAware: true,
    dnaAware: true,
    versionAware: true,
    instanceAware: true,

    // GPU awareness
    binaryAware: true,
    symbolicAware: true,
    gpuDispatchAware: true,
    gpuMemoryAware: true,
    gpuAdvantageAware: true,

    // Contracts
    routingContract: "PulseSend-v16",
    gpuOrganContract: "PulseGPU-v16-Immortal",
    binaryGpuOrganContract: "PulseBinaryGPU-v16-Immortal",
    earnCompatibility: "Earn-v4-Presence"
  }
};

// ------------------------------------------------------------
// CognitiveFrame builder for advice → plan
// ------------------------------------------------------------
function buildCognitiveFrameForAdvice(
  advice,
  gpuContext,
  {
    dnaTag = "default-dna",
    instanceId = "",
    version = "16.0-Immortal",
    earnMode = false
  } = {}
) {
  if (!advice || typeof advice !== "object") return null;

  const {
    type,
    severity,
    deltaPercent,
    gameProfile,
    hardwareProfile,
    tierProfile
  } = advice;

  const narrativeSummary = (() => {
    if (type === "regression") return "Performance regression detected; restoration recommended.";
    if (type === "suboptimal") return "Suboptimal configuration detected; optimal settings available.";
    if (type === "tier-upgrade-opportunity") return "Tier upgrade opportunity detected.";
    if (type === "improvement") return "Performance improvement detected; no restoration required.";
    return "Advice received for GPU configuration.";
  })();

  const cognition = {
    adviceType: type,
    severity,
    deltaPercent,
    gameProfile,
    hardwareProfile,
    tierProfile,
    gpuContext
  };

  const performance = {
    baselineScore: advice.extra?.baselineMetrics?.score ?? null,
    currentScore: advice.extra?.currentMetrics?.score ?? null,
    deltaPercent: deltaPercent ?? null,
    label:
      typeof deltaPercent === "number"
        ? deltaPercent > 0
          ? "better"
          : "worse"
        : "unknown"
  };

  const narrative = {
    summary: narrativeSummary,
    details: {
      type,
      severity,
      deltaPercent,
      gpuPattern: advice.gpuPattern,
      gpuShapeSignature: advice.gpuShapeSignature
    }
  };

  const frame = new CognitiveFrame({
    cognition,
    interpretation: {},
    narrative,
    tier: {
      currentTier: tierProfile?.tierId || null,
      tierHistory: tierProfile?.history || []
    },
    performance,
    dispatch: {
      gpuPattern: advice.gpuPattern || null,
      gpuShapeSignature: advice.gpuShapeSignature || null
    },
    advantage: {
      advantageScore: advice.advantageScore ?? null
    },
    presence: {
      context: null,
      dnaTag,
      instanceId,
      intelligentCompute: null,
      version
    },
    shapeSignature: {},
    patternSignature: {},
    symbolic: {},
    binary: {},
    recommendedActions: [],
    dnaTag,
    instanceId,
    earnMode
  });

  return frame;
}

// ------------------------------------------------------------
// Restoration plan builder (v16-Immortal + OS metadata + cognition)
// ------------------------------------------------------------
function buildPlan({
  action,
  reason,
  targetSettings = null,
  baselineSettings = null,
  extra = null,
  gpuContext = null,
  dnaTag = "default-dna",
  instanceId = "",
  version = "16.0-Immortal",
  cognitiveFrame = null,
  computerIntelligence = null,
  earnMode = false
}) {
  return {
    action,
    reason,
    targetSettings,
    baselineSettings,
    extra,
    gpuContext: gpuContext || null,
    meta: {
      ...RESTORER_CONTEXT,
      dnaTag,
      instanceId,
      version,
      earnMode,
      cognitiveFrame: cognitiveFrame || null,
      computerIntelligence: computerIntelligence || null
    }
  };
}

// ------------------------------------------------------------
// Plan validation (for healing layer)
// ------------------------------------------------------------
function validatePlan(plan) {
  if (!plan || typeof plan !== "object") return false;
  if (typeof plan.action !== "string") return false;
  if (typeof plan.reason !== "string") return false;
  if (!plan.meta || plan.meta.layer !== "PulseGPUSettingsRestorer") return false;
  return true;
}

// ------------------------------------------------------------
// PulseGPUSettingsRestorer v16-Immortal — Cognitive Recognition Layer
// ------------------------------------------------------------
class PulseGPUSettingsRestorer {
  constructor() {}

  static meta = { ...RESTORER_CONTEXT };

  // ----------------------------------------------------
  // Main entry point:
  //   Takes an array of advice objects → returns a plan.
  //   Optionally includes GPU context + presence identity + earnMode.
// ----------------------------------------------------
  buildRestorePlan(
    adviceList = [],
    gpuContext = null,
    {
      dnaTag = "default-dna",
      instanceId = "",
      version = "16.0-Immortal",
      earnMode = false
    } = {}
  ) {
    if (!Array.isArray(adviceList) || adviceList.length === 0) {
      return buildPlan({
        action: "noop",
        reason: "No advice available.",
        gpuContext,
        dnaTag,
        instanceId,
        version,
        earnMode
      });
    }

    const severityRank = { low: 1, medium: 2, high: 3, critical: 4 };

    const sorted = adviceList
      .filter((a) => a && typeof a === "object")
      .slice()
      .sort((a, b) => {
        const sa = severityRank[a.severity] || 0;
        const sb = severityRank[b.severity] || 0;
        return sb - sa;
      });

    if (sorted.length === 0) {
      return buildPlan({
        action: "noop",
        reason: "No valid advice available.",
        gpuContext,
        dnaTag,
        instanceId,
        version,
        earnMode
      });
    }

    const top = sorted[0];

    // Build CognitiveFrame + ComputerIntelligence for the chosen advice
    const gpuCtx = this._buildGpuContextFromAdvice(top, gpuContext);
    const cognitiveFrame = buildCognitiveFrameForAdvice(top, gpuCtx, {
      dnaTag,
      instanceId,
      version,
      earnMode
    });
    const computerIntelligence = computeComputerIntelligence(cognitiveFrame, {
      earnMode
    });

    const presence = {
      dnaTag,
      instanceId,
      version,
      cognitiveFrame,
      computerIntelligence,
      earnMode
    };

    switch (top.type) {
      case "regression":
        return this.buildRestorePlanForRegression(top, gpuCtx, presence);

      case "suboptimal":
        return this.buildRestorePlanForSuboptimal(top, gpuCtx, presence);

      case "tier-upgrade-opportunity":
        return this.buildRestorePlanForTierUpgrade(top, gpuCtx, presence);

      case "improvement":
        return this.buildRestorePlanForImprovement(top, gpuCtx, presence);

      default:
        return buildPlan({
          action: "noop",
          reason: "Advice type not recognized.",
          gpuContext: gpuCtx,
          ...presence
        });
    }
  }

  // ----------------------------------------------------
  // Regression → restore baseline settings
  // ----------------------------------------------------
  buildRestorePlanForRegression(advice, gpuContext, presence = {}) {
    return buildPlan({
      action: "restore",
      reason: "Performance regressed compared to best-known configuration.",
      targetSettings: advice.baselineSettings || null,
      baselineSettings: advice.baselineSettings || null,
      extra: {
        deltaPercent: advice.deltaPercent,
        baselineMetrics: advice.extra?.baselineMetrics,
        repairHint:
          advice.extra?.repairHint || "restore-baseline-settings"
      },
      gpuContext,
      ...presence
    });
  }

  // ----------------------------------------------------
  // Suboptimal → apply optimal baseline settings
  // ----------------------------------------------------
  buildRestorePlanForSuboptimal(advice, gpuContext, presence = {}) {
    return buildPlan({
      action: "apply-optimal",
      reason: "Current settings are below best-known performance.",
      targetSettings: advice.baselineSettings || null,
      baselineSettings: advice.baselineSettings || null,
      extra: {
        deltaPercent: advice.deltaPercent,
        baselineMetrics: advice.extra?.baselineMetrics,
        repairHint:
          advice.extra?.repairHint || "suggest-baseline-settings"
      },
      gpuContext,
      ...presence
    });
  }

  // ----------------------------------------------------
  // Tier upgrade opportunity → apply new-tier optimal settings
  // ----------------------------------------------------
  buildRestorePlanForTierUpgrade(advice, gpuContext, presence = {}) {
    return buildPlan({
      action: "upgrade-tier",
      reason:
        "A higher tier configuration has historically delivered better performance.",
      targetSettings: advice.baselineSettings || null,
      baselineSettings: advice.baselineSettings || null,
      extra: {
        deltaPercent: advice.deltaPercent,
        oldTierProfile: advice.extra?.oldTierProfile,
        newTierProfile: advice.extra?.newTierProfile,
        newTierMetrics: advice.extra?.newTierMetrics,
        repairHint: advice.extra?.repairHint || "upgrade-tier"
      },
      gpuContext,
      ...presence
    });
  }

  // ----------------------------------------------------
  // Improvement → no action needed
  // ----------------------------------------------------
  buildRestorePlanForImprovement(advice, gpuContext, presence = {}) {
    return buildPlan({
      action: "noop",
      reason: "Performance improved; no restoration needed.",
      targetSettings: null,
      baselineSettings: advice.baselineSettings || null,
      extra: {
        deltaPercent: advice.deltaPercent,
        repairHint:
          advice.extra?.repairHint || "promote-current-to-baseline"
      },
      gpuContext,
      ...presence
    });
  }

  // ----------------------------------------------------
  // Internal: build GPU context snapshot from advice + external gpuContext
  // ----------------------------------------------------
  _buildGpuContextFromAdvice(advice, gpuContext) {
    const base =
      gpuContext && typeof gpuContext === "object" ? { ...gpuContext } : {};

    return {
      ...base,
      gpuPattern: advice.gpuPattern || base.gpuPattern || null,
      gpuShapeSignature:
        advice.gpuShapeSignature || base.gpuShapeSignature || null,
      binaryModeObserved:
        typeof advice.binaryModeObserved === "boolean"
          ? advice.binaryModeObserved
          : base.binaryModeObserved || false,
      symbolicModeObserved:
        typeof advice.symbolicModeObserved === "boolean"
          ? advice.symbolicModeObserved
          : base.symbolicModeObserved || false,
      advantageScore:
        typeof advice.advantageScore === "number"
          ? advice.advantageScore
          : base.advantageScore || 0
    };
  }
}

// ------------------------------------------------------------
// EXPORTS
// ------------------------------------------------------------
export {
  PulseGPUSettingsRestorer,
  buildPlan,
  validatePlan
};
