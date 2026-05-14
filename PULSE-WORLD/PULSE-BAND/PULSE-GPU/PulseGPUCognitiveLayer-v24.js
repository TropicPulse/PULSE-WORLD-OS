/* global log,warn */
// ============================================================================
// FILE: tropic-pulse-functions/PULSE-WORLD/PULSE-GPU/PulseGPUSettingsRestorer-v24.js
// PULSE GPU SETTINGS RESTORER v24-Immortal++
// “COGNITIVE RECOGNITION LAYER / RESTORATION PLANNER / CHUNK-AWARE”
// ============================================================================
//
// PERSONALITY + ROLE (v24-Immortal++):
//   PulseGPUSettingsRestorer is the **COGNITIVE RECOGNITION LAYER**.
//   It is the **RESTORATION PLANNER** — the subsystem that reads advice
//   and recognizes what concrete action should be taken.
//
//   • Consumes advisor insights (Drive Center) + memory entries (Evolution Core)
//   • Can also consume GPU dispatch/memory hints (Brain/Spine/History)
//   • Can consume GPU chunk / session surfaces (GPU chunker / GPU chunk planner)
//   • Recognizes whether to restore, apply optimal, upgrade tier, noop, or rechunk
//   • Produces deterministic restoration plans for the Healer + Orchestrator
//   • PulseSend‑v24‑ready: plans can be routed by the compute router
//   • Earn‑v24‑Presence‑ready
//   • Binary-aware, symbolic-aware, dispatch-aware, memory-aware, presence-aware
//   • Chunk-aware, chunkProfile-aware, chunkSession-aware
//   • CognitiveFrame-aware: can emit GPU “thought frames” for each plan
//   • ComputerIntelligence-aware: can emit CI frames for Earn mode
// ============================================================================
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝
export const PulseGPUChunkerMeta = Identity.OrganMeta;
export const pulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
export const RESTORER_CONTEXT = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;
import {
  CognitiveFrame,
  computeComputerIntelligence
} from "./PulseGPUCognitiveIntelligence-v24.js";

// ============================================================================
// CognitiveFrame builder for advice → plan (v24-Immortal++, chunk-aware)
// ============================================================================
function buildCognitiveFrameForAdvice(
  advice,
  gpuContext,
  {
    dnaTag = "default-dna",
    instanceId = "",
    version = "24.0-Immortal++",
    earnMode = false,
    chunkContext = null
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
    if (type === "rechunk-needed") return "Chunk layout misaligned; GPU chunk strategy update recommended.";
    return "Advice received for GPU configuration.";
  })();

  const cognition = {
    adviceType: type,
    severity,
    deltaPercent,
    gameProfile,
    hardwareProfile,
    tierProfile,
    gpuContext,
    chunkContext
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
      gpuShapeSignature: advice.gpuShapeSignature,
      chunkProfile: advice.chunkProfile || chunkContext?.chunkProfile || null,
      chunkSessionId: chunkContext?.sessionId || null
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

// ============================================================================
/** Restoration plan builder (v24-Immortal++ + OS metadata + cognition + chunks) */
// ============================================================================
function buildPlan({
  action,
  reason,
  targetSettings = null,
  baselineSettings = null,
  extra = null,
  gpuContext = null,
  chunkContext = null,
  dnaTag = "default-dna",
  instanceId = "",
  version = "24.0-Immortal++",
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
    chunkContext: chunkContext || null,
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

// ============================================================================
// Plan validation (for healing layer)
// ============================================================================
function validatePlan(plan) {
  if (!plan || typeof plan !== "object") return false;
  if (typeof plan.action !== "string") return false;
  if (typeof plan.reason !== "string") return false;
  if (!plan.meta || plan.meta.layer !== "PulseGPUSettingsRestorer") return false;
  return true;
}

// ============================================================================
// PulseGPUSettingsRestorer v24-Immortal++ — Cognitive Recognition Layer
// Chunk-aware, GPU-memory-aware, dispatch-aware
// ============================================================================
class PulseGPUSettingsRestorer {
  constructor() {}

  static meta = { ...RESTORER_CONTEXT };

  // ----------------------------------------------------
  // Main entry point:
  //   Takes an array of advice objects → returns a plan.
  //   Optionally includes GPU context + presence identity + earnMode + chunkContext.
  // ----------------------------------------------------
  buildRestorePlan(
    adviceList = [],
    gpuContext = null,
    {
      dnaTag = "default-dna",
      instanceId = "",
      version = "24.0-Immortal++",
      earnMode = false,
      chunkContext = null // { chunkProfile, sessionId, laneStats, profileStats, plannerStrategy, plannerChunks }
    } = {}
  ) {
    if (!Array.isArray(adviceList) || adviceList.length === 0) {
      return buildPlan({
        action: "noop",
        reason: "No advice available.",
        gpuContext,
        chunkContext,
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
        chunkContext,
        dnaTag,
        instanceId,
        version,
        earnMode
      });
    }

    const top = sorted[0];

    // Build CognitiveFrame + ComputerIntelligence for the chosen advice
    const gpuCtx = this._buildGpuContextFromAdvice(top, gpuContext, chunkContext);
    const cognitiveFrame = buildCognitiveFrameForAdvice(top, gpuCtx, {
      dnaTag,
      instanceId,
      version,
      earnMode,
      chunkContext
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
      earnMode,
      chunkContext
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

      case "rechunk-needed":
        return this.buildRestorePlanForRechunk(top, gpuCtx, presence);

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
  // Rechunk-needed → ask GPU chunk planner / chunker to re-layout
  //   (pure plan: no direct calls, just a deterministic instruction)
  // ----------------------------------------------------
  buildRestorePlanForRechunk(advice, gpuContext, presence = {}) {
    const chunkProfile =
      advice.chunkProfile ||
      presence.chunkContext?.chunkProfile ||
      "gpu-default";

    const plannerStrategy =
      presence.chunkContext?.plannerStrategy || "balanced";

    const plannerChunks =
      presence.chunkContext?.plannerChunks || null;

    return buildPlan({
      action: "rechunk",
      reason:
        "Chunk layout misaligned with observed GPU advantage; rechunking recommended.",
      targetSettings: null,
      baselineSettings: null,
      extra: {
        deltaPercent: advice.deltaPercent,
        gpuPattern: advice.gpuPattern,
        gpuShapeSignature: advice.gpuShapeSignature,
        chunkProfile,
        plannerStrategy,
        plannerChunks,
        repairHint:
          advice.extra?.repairHint ||
          "invoke-gpu-chunk-planner-v24"
      },
      gpuContext,
      chunkContext: presence.chunkContext || {
        chunkProfile,
        plannerStrategy,
        plannerChunks
      },
      ...presence
    });
  }

  // ----------------------------------------------------
  // Internal: build GPU context snapshot from advice + external gpuContext
  //           (v24, chunk-aware)
// ----------------------------------------------------
  _buildGpuContextFromAdvice(advice, gpuContext, chunkContext) {
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
          : base.advantageScore || 0,
      chunkProfile:
        advice.chunkProfile ||
        chunkContext?.chunkProfile ||
        base.chunkProfile ||
        null,
      chunkSessionId:
        chunkContext?.sessionId || base.chunkSessionId || null
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
