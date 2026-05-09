// ============================================================================
// FILE: /organs/gpu/PulseGPUGuardianCortex.js
// [pulse:gpu] PULSE_GPU_GUARDIAN_CORTEX v24-Immortal++  // blue-gold
// GPU Permission Cortex • Deterministic Policy Engine • Zero Imports
// ============================================================================
//
// IDENTITY — THE GPU GUARDIAN CORTEX (v24-Immortal++):
//  ----------------------------------------------------------
//  • The decision-making cortex of the GPU subsystem.
//  • Determines when GPU actions may auto-apply vs require confirmation.
//  • Pure logic: deterministic, stateless, zero-entropy, zero randomness.
//  • Reads advisor severity + user preferences + plan type + GPU context.
//  • Produces a final decision object (mode + reason + plan).
//  • PulseSend‑v14‑Immortal‑ready: decisions can be routed by the compute router.
//  • Binary-aware, symbolic-aware, dispatch-aware, memory-aware.
//  • Computer-intelligence-aware: can align with Earn/computation modes (metadata only).
//
// SAFETY CONTRACT (v24-Immortal++):
//  • No imports (DI only).
//  • No async.
//  • No randomness.
//  • No timestamps.
//  • No GPU calls.
//  • No routing.
//  • No mutation outside instance.
//  • Deterministic: same inputs → same decision.
// ============================================================================
/*
AI_EXPERIENCE_META = {
  identity: "PulseGPUGuardianCortex",
  version: "v24-Immortal++",
  layer: "gpu_guardian",
  role: "gpu_guardian_cortex",
  lineage:
    "PulseGPU-v14 → PulseGPU-v16-Immortal → PulseGPU-Earn-v24-Immortal++",

  evo: {
    gpuGuardian: true,
    gpuSafety: true,
    gpuPolicyEnforcer: true,

    gpuComputerIntelligence: true,
    computerIntelligence: true,
    earnComputerIntelligenceAware: true,

    gpuEarnGuardian: true,
    gpuEarnBudgetAware: true,
    gpuEarnProfileAware: true,
    gameAware: true,
    presenceAware: true,

    deterministic: true,
    driftProof: true,
    pureCompute: true,

    zeroNetwork: true,
    zeroFilesystem: true,
    zeroMutationOfInput: true,

    parallelSafe: true,
    statelessCore: true,
    zeroEntropy: true
  },

  contract: {
    always: [
      "PulseGPUDriveCenter",
      "PulseGPUCommandments",
      "PulseGPUSettingsRestorer",
      "PulseGPUGeneticMemory",
      "PulseGPUEarnProfile"
    ],
    never: [
      "safeRoute",
      "fetchViaCNS",
      "legacyGuardianCortex",
      "legacyEarnProfile"
    ]
  }
}
*/

// ============================================================================
//  Utility: build decision — Guardian lineage + nervous-system metadata
// ============================================================================

function buildDecision({
  mode,
  reason,
  plan,
  gpuContext,
  earnProfile,
  earnOverride,
  presence,
  gameActive
}) {
  return {
    mode,
    reason,
    plan: plan || null,
    gpuContext: gpuContext || null,
    earnProfile: earnProfile || null,
    // earnOverride is a *hint* to Earn governor:
    //   { mode: "pause" | "throttle" | "allow", maxUtilizationPercent? }
    earnOverride: earnOverride || null,
    presence: presence || null,
    gameActive: !!gameActive,
    meta: {
      layer: "PulseGPUGuardianCortex",
      version: "24-Immortal++",
      target: "full-gpu+binary+spine+earn",

      // Evolutionary metadata (no logic impact)
      lineage: "guardian-core-v24",
      multiInstanceReady: true,
      deterministicPolicy: true,
      parallelSafe: true,
      statelessCore: true,
      zeroEntropy: true,
      driftResistance: "max",
      mutationRisk: "none",

      // Nervous-system hints (purely descriptive)
      neuralRole: "policy-cortex",
      subsystem: "gpu-healing+earn-governor",
      instanceBehavior: "predictable",
      decisionSurface:
        "severity × preference × plan × gpuContext × earnProfile × presence × gameActive",

      // Unified advantage + PulseSend identity
      unifiedAdvantageField: true,
      pulseSend24Ready: true,
      pulseSend16Ready: true,
      pulseSend14Ready: true,

      // v24-Immortal++ awareness
      presenceAware: true,
      dnaAware: true,
      versionAware: true,
      instanceAware: true,

      binaryAware: true,
      symbolicAware: true,
      gpuDispatchAware: true,
      gpuMemoryAware: true,
      gpuAdvantageAware: true,

      // Computer-intelligence / Earn awareness (metadata only)
      gpuComputerIntelligence: true,
      computerIntelligence: true,
      earnComputerIntelligenceAware: true,
      gpuEarnGuardian: true,
      gpuEarnBudgetAware: true,
      gpuEarnProfileAware: true,
      gameAware: true,

      // PulseSend / Earn contracts (conceptual only)
      routingContract: "PulseSend-v24-Immortal++",
      gpuOrganContract: "PulseGPU-v24-Immortal++",
      binaryGpuOrganContract: "PulseBinaryGPU-v24-Immortal++",
      earnCompatibility: "Earn-v24-GPU",

      // Legacy compatibility
      legacyRoutingContract: "PulseSend-v14-Immortal",
      legacyGPUOrganContract: "PulseGPU-v14-Immortal",
      legacyBinaryGPUOrganContract: "PulseBinaryGPU-v14-Immortal",
      legacyEarnCompatibility: "Earn-v4-Immortal"
    }
  };
}

// ============================================================================
//  Severity ranking helper — Guardian’s Risk Map
// ============================================================================
const SEVERITY_RANK = {
  low: 1,
  medium: 2,
  high: 3,
  critical: 4
};

function getHighestSeverity(adviceList = []) {
  let highest = null;

  adviceList.forEach((a) => {
    if (!a || typeof a !== "object") return;
    const rank = SEVERITY_RANK[a.severity] || 0;
    if (!highest || rank > (SEVERITY_RANK[highest.severity] || 0)) {
      highest = a;
    }
  });

  return highest;
}

// ============================================================================
//  Earn override helper — GPU Earn Policy Hints (v24-Immortal++)
// ============================================================================

function computeEarnOverride({
  severity,
  prefs,
  earnProfile,
  gameActive
}) {
  const tier = earnProfile?.tier || "off";
  const currentMax = earnProfile?.maxUtilizationPercent ?? 0;

  // If Earn is already off, no override needed.
  if (tier === "off" || currentMax <= 0) {
    return null;
  }

  const allowPause = !!prefs.allowGuardianPauseEarnOnSevereRegression;
  const allowThrottle = !!prefs.allowGuardianThrottleEarnOnRegression;
  const allowGamePause = !!prefs.allowGuardianPauseEarnWhenGameActive;

  // Game-active guard: strongest rule first.
  if (gameActive && allowGamePause) {
    return {
      mode: "pause",
      reason: "game_active_guardian_policy"
    };
  }

  // Severity-based regression guard.
  if (severity === "high" || severity === "critical") {
    if (allowPause) {
      return {
        mode: "pause",
        reason: "severe_regression_guardian_policy"
      };
    }
    if (allowThrottle) {
      return {
        mode: "throttle",
        maxUtilizationPercent: Math.min(currentMax, 8),
        reason: "severe_regression_throttle"
      };
    }
  }

  if (severity === "medium" && allowThrottle) {
    return {
      mode: "throttle",
      maxUtilizationPercent: Math.min(currentMax, 12),
      reason: "medium_regression_throttle"
    };
  }

  return null;
}

// ============================================================================
//  PulseGPUGuardianCortex v24-Immortal++ — GPU Permission Cortex
// ============================================================================
class PulseGPUGuardianCortex {
  constructor(userPreferences, instanceId) {
    this.userPreferences = userPreferences || {};
    this.instanceId = instanceId || "guardian-instance";
  }

  // ----------------------------------------------------
  // Main entry point:
  //   decide(plan, context) → decision
  //   context may include:
  //     • adviceList
  //     • userPreferences
  //     • gpuContext (binary/symbolic/dispatch/memory hints)
  //     • earnProfile (from PulseGPUEarnProfile-v24)
  //     • presence ("active" | "idle" | "background" | ...)
  //     • gameActive (boolean)
  // ----------------------------------------------------
  decide(plan, context = {}) {
    const gpuContext = context.gpuContext || null;
    const earnProfile = context.earnProfile || null;
    const presence = context.presence || null;
    const gameActive = !!context.gameActive;

    if (!plan || typeof plan !== "object") {
      return buildDecision({
        mode: "ignore",
        reason: "No plan provided.",
        plan: null,
        gpuContext,
        earnProfile,
        presence,
        gameActive
      });
    }

    const mergedPrefs = {
      ...this.userPreferences,
      ...(context.userPreferences || {})
    };

    const adviceList = Array.isArray(context.adviceList)
      ? context.adviceList
      : [];

    const topAdvice = getHighestSeverity(adviceList);

    // No advisor context
    if (!topAdvice) {
      if (plan.action === "noop") {
        return buildDecision({
          mode: "ignore",
          reason: "No action required.",
          plan: null,
          gpuContext,
          earnProfile,
          presence,
          gameActive
        });
      }

      return buildDecision({
        mode: "require-confirmation",
        reason: "No advisor context; confirmation required.",
        plan,
        gpuContext,
        earnProfile,
        presence,
        gameActive
      });
    }

    const severity = topAdvice.severity || "low";

    // Dispatch to specific handlers
    if (plan.action === "restore") {
      return this.decideForRestore(
        plan,
        severity,
        mergedPrefs,
        gpuContext,
        earnProfile,
        presence,
        gameActive
      );
    }

    if (plan.action === "apply-optimal") {
      return this.decideForApplyOptimal(
        plan,
        severity,
        mergedPrefs,
        gpuContext,
        earnProfile,
        presence,
        gameActive
      );
    }

    if (plan.action === "upgrade-tier") {
      return this.decideForTierUpgrade(
        plan,
        severity,
        mergedPrefs,
        gpuContext,
        earnProfile,
        presence,
        gameActive
      );
    }

    if (plan.action === "noop") {
      return buildDecision({
        mode: "ignore",
        reason: "No action required.",
        plan: null,
        gpuContext,
        earnProfile,
        presence,
        gameActive
      });
    }

    // Future computer-intelligence / Earn-aligned actions fall back to confirmation
    return buildDecision({
      mode: "require-confirmation",
      reason: "Unknown plan action; confirmation required.",
      plan,
      gpuContext,
      earnProfile,
      presence,
      gameActive
    });
  }

  // ----------------------------------------------------
  // Restore plan policy — Regression Healer (v24-Immortal++)
  // ----------------------------------------------------
  decideForRestore(
    plan,
    severity,
    prefs,
    gpuContext,
    earnProfile,
    presence,
    gameActive
  ) {
    const allowLow = !!prefs.allowAutoFixLowRegressions;
    const allowMedium = !!prefs.allowAutoFixMediumRegressions;
    const allowHigh = !!prefs.allowAutoFixHighRegressions;
    const allowCritical = !!prefs.allowAutoFixCriticalRegressions;

    // v24-Immortal++: binary regressions get extra caution
    const binaryPenalty =
      gpuContext?.binaryModeObserved && severity !== "low";

    function decision(auto, reason, earnOverride) {
      return buildDecision({
        mode: auto ? "auto-apply" : "require-confirmation",
        reason,
        plan,
        gpuContext,
        earnProfile,
        earnOverride,
        presence,
        gameActive
      });
    }

    let auto = false;
    let reason = "";

    if (severity === "low") {
      auto = allowLow;
      reason = auto
        ? "Auto-fix enabled for low severity regressions."
        : "Low severity regression; confirmation required.";
    } else if (severity === "medium") {
      auto = allowMedium && !binaryPenalty;
      reason = auto
        ? "Auto-fix enabled for medium severity regressions."
        : "Medium severity regression; confirmation required.";
    } else if (severity === "high") {
      auto = allowHigh && !binaryPenalty;
      reason = auto
        ? "Auto-fix enabled for high severity regressions."
        : "High severity regression; confirmation required.";
    } else {
      auto = allowCritical && !binaryPenalty;
      reason = auto
        ? "Auto-fix enabled for critical regressions."
        : "Critical regression; confirmation required.";
    }

    const earnOverride = computeEarnOverride({
      severity,
      prefs,
      earnProfile,
      gameActive
    });

    return decision(auto, reason, earnOverride);
  }

  // ----------------------------------------------------
  // Apply-optimal plan policy — Optimization Reflex (v24-Immortal++)
  // ----------------------------------------------------
  decideForApplyOptimal(
    plan,
    severity,
    prefs,
    gpuContext,
    earnProfile,
    presence,
    gameActive
  ) {
    const allowAuto = !!prefs.allowAutoApplyOptimalSettings;

    // For apply-optimal, Earn override is gentler:
    // we generally *allow* Earn, but may throttle if game is active.
    let earnOverride = null;
    if (gameActive && prefs.allowGuardianThrottleEarnWhenGameActive) {
      const currentMax = earnProfile?.maxUtilizationPercent ?? 0;
      if (currentMax > 0) {
        earnOverride = {
          mode: "throttle",
          maxUtilizationPercent: Math.min(currentMax, 8),
          reason: "game_active_optimal_throttle"
        };
      }
    }

    return buildDecision({
      mode: allowAuto ? "auto-apply" : "require-confirmation",
      reason: allowAuto
        ? "Auto-apply enabled for optimal settings."
        : "Optimal settings available; confirmation required.",
      plan,
      gpuContext,
      earnProfile,
      earnOverride,
      presence,
      gameActive
    });
  }

  // ----------------------------------------------------
  // Tier upgrade plan policy — Tier Ascent Logic (v24-Immortal++)
  // ----------------------------------------------------
  decideForTierUpgrade(
    plan,
    severity,
    prefs,
    gpuContext,
    earnProfile,
    presence,
    gameActive
  ) {
    const allowAutoTier = !!prefs.allowAutoTierChanges;

    // Tier upgrades are performance-positive; we usually *relax* Earn clamps,
    // but still respect game-active guard if requested.
    let earnOverride = null;

    if (gameActive && prefs.allowGuardianPauseEarnWhenGameActiveOnTierUpgrade) {
      earnOverride = {
        mode: "pause",
        reason: "game_active_tier_upgrade_guard"
      };
    }

    return buildDecision({
      mode: allowAutoTier ? "auto-apply" : "require-confirmation",
      reason: allowAutoTier
        ? "Auto-apply enabled for tier changes."
        : "Tier upgrade opportunity; confirmation required.",
      plan,
      gpuContext,
      earnProfile,
      earnOverride,
      presence,
      gameActive
    });
  }
}

// ============================================================================
//  EXPORTS
// ============================================================================
export {
  PulseGPUGuardianCortex,
  buildDecision
};
