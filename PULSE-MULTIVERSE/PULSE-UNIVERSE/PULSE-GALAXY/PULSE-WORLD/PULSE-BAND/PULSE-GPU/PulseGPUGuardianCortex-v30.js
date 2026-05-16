// ============================================================================
// FILE: /organs/gpu/PulseGPUGuardianCortex-v30.js
// [pulse:gpu] PULSE_GPU_GUARDIAN_CORTEX v30-Immortal-Omega++  // blue-gold-aurora
// GPU Permission Cortex • Deterministic Policy Engine • WarmPath+Genetic+Chunk-Aware
// ============================================================================
//
// IDENTITY — THE GPU GUARDIAN CORTEX (v30-Immortal-Omega++):
//  ----------------------------------------------------------
//  • The decision-making cortex of the GPU subsystem.
//  • Determines when GPU / WarmPath / Chunk / Genetic actions may auto-apply vs require confirmation.
//  • Pure logic: deterministic, stateless core, zero-entropy, zero randomness.
//  • Reads advisor severity + user preferences + plan type + GPU context + Earn + WarmPath + Genetic hints.
//  • Produces a final decision object (mode + reason + plan + earnOverride + warmPathOverride).
//  • PulseSend‑v30‑Immortal‑ready: decisions can be routed by the compute router.
//  • Binary-aware, symbolic-aware, dispatch-aware, memory-aware, chunk-aware, warm-path-aware.
//  • Computer-intelligence-aware, GeneticMemory-aware, Earn-governor-aware (metadata only).
//
// SAFETY CONTRACT (v30-Immortal-Omega++):
//  • No imports (DI only).
//  • No async.
//  • No randomness.
//  • No timestamps.
//  • No GPU calls.
//  • No routing.
//  • No mutation outside instance.
//  • Deterministic: same inputs → same decision.
// ============================================================================
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝


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
  gameActive,
  warmPathContext,
  warmPathOverride,
  geneticContext
}) {
  return {
    mode,
    reason,
    plan: plan || null,

    // GPU / Earn / Presence context
    gpuContext: gpuContext || null,
    earnProfile: earnProfile || null,
    presence: presence || null,
    gameActive: !!gameActive,

    // Earn governor hint:
    //   { mode: "pause" | "throttle" | "allow", maxUtilizationPercent? }
    earnOverride: earnOverride || null,

    // Warm-path / cache / chunking context + override hints
    warmPathContext: warmPathContext || null,
    //   { mode: "boost" | "guard" | "freeze" | "none", cacheTier?, prewarmBudgetCap? }
    warmPathOverride: warmPathOverride || null,

    // Genetic memory / lineage context (metadata only)
    geneticContext: geneticContext || null,

    meta: {
      layer: "PulseGPUGuardianCortex",
      version: "30-Immortal-Omega++",
      target: "full-gpu+binary+spine+earn+warm-path+genetic+chunk",

      // Evolutionary metadata (no logic impact)
      lineage: "guardian-core-v30",
      multiInstanceReady: true,
      deterministicPolicy: true,
      parallelSafe: true,
      statelessCore: true,
      zeroEntropy: true,
      driftResistance: "max",
      mutationRisk: "none",

      // Nervous-system hints (purely descriptive)
      neuralRole: "policy-cortex",
      subsystem: "gpu-healing+earn-governor+warm-path+genetic",
      instanceBehavior: "predictable",
      decisionSurface:
        "severity × preference × plan × gpuContext × earnProfile × presence × gameActive × warmPath × genetic",

      // Unified advantage + PulseSend identity
      unifiedAdvantageField: true,
      pulseSend30Ready: true,
      pulseSend24Ready: true,
      pulseSend16Ready: true,
      pulseSend14Ready: true,

      // Awareness flags (metadata only)
      presenceAware: true,
      dnaAware: true,
      versionAware: true,
      instanceAware: true,

      binaryAware: true,
      symbolicAware: true,
      gpuDispatchAware: true,
      gpuMemoryAware: true,
      gpuAdvantageAware: true,
      gpuChunkerAware: true,
      gpuWarmPathAware: true,
      gpuGeneticMemoryAware: true,

      // Computer-intelligence / Earn awareness (metadata only)
      gpuComputerIntelligence: true,
      computerIntelligence: true,
      earnComputerIntelligenceAware: true,
      gpuEarnGuardian: true,
      gpuEarnBudgetAware: true,
      gpuEarnProfileAware: true,
      gameAware: true,

      // PulseSend / Earn contracts (conceptual only)
      routingContract: "PulseSend-v30-Immortal++",
      gpuOrganContract: "PulseGPU-v30-Immortal++",
      binaryGpuOrganContract: "PulseBinaryGPU-v30-Immortal++",
      earnCompatibility: "Earn-v30-GPU",

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
//  Earn override helper — GPU Earn Policy Hints (v30-Immortal-Omega++)
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
  const allowGameThrottle = !!prefs.allowGuardianThrottleEarnWhenGameActive;

  // Game-active guard: strongest rule first.
  if (gameActive && allowGamePause) {
    return {
      mode: "pause",
      reason: "game_active_guardian_policy"
    };
  }

  if (gameActive && allowGameThrottle) {
    return {
      mode: "throttle",
      maxUtilizationPercent: Math.min(currentMax, 8),
      reason: "game_active_guardian_throttle"
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
//  Warm-path override helper — GPU Warm Path / Cache Policy (v30)
// ============================================================================

function computeWarmPathOverride({
  severity,
  prefs,
  warmPathContext,
  gameActive
}) {
  const cacheTier = warmPathContext?.cacheTier || "none";
  const fanoutProfile = warmPathContext?.fanoutProfile || "balanced";

  const allowBoost = !!prefs.allowGuardianBoostWarmPathOnTrustedLowRisk;
  const allowGuard = !!prefs.allowGuardianGuardWarmPathOnRegression;
  const allowFreezeOnCritical = !!prefs.allowGuardianFreezeWarmPathOnCritical;
  const allowGameGuard = !!prefs.allowGuardianGuardWarmPathWhenGameActive;

  // If no warm-path context, no override.
  if (cacheTier === "none") {
    return null;
  }

  // Game-active guard: avoid over-aggressive warm-path while game is latency-critical.
  if (gameActive && allowGameGuard) {
    return {
      mode: "guard",
      reason: "game_active_warm_path_guard",
      cacheTierCap: cacheTier,
      fanoutProfileCap: fanoutProfile === "aggressive" ? "balanced" : fanoutProfile
    };
  }

  // Critical regressions: optionally freeze warm-path to avoid amplifying instability.
  if ((severity === "critical" || severity === "high") && allowFreezeOnCritical) {
    return {
      mode: "freeze",
      reason: "critical_regression_warm_path_freeze",
      cacheTierCap: "light",
      fanoutProfileCap: "conservative"
    };
  }

  // Medium/high regressions: guard warm-path if allowed.
  if ((severity === "medium" || severity === "high") && allowGuard) {
    return {
      mode: "guard",
      reason: "regression_warm_path_guard",
      cacheTierCap: cacheTier === "strong" ? "medium" : cacheTier,
      fanoutProfileCap: fanoutProfile === "aggressive" ? "balanced" : fanoutProfile
    };
  }

  // Low severity + trusted prefs: optional boost.
  if (severity === "low" && allowBoost) {
    return {
      mode: "boost",
      reason: "low_severity_warm_path_boost",
      cacheTierFloor: cacheTier,
      fanoutProfileFloor: fanoutProfile
    };
  }

  return null;
}

// ============================================================================
//  PulseGPUGuardianCortex v30-Immortal-Omega++ — GPU Permission Cortex
// ============================================================================

class PulseGPUGuardianCortex {
  constructor(userPreferences, instanceId) {
    this.userPreferences = userPreferences || {};
    this.instanceId = instanceId || "guardian-instance-v30";
  }

  // ----------------------------------------------------
  // Main entry point:
  //   decide(plan, context) → decision
  //
  //   plan.action may include:
  //     • "restore"        — regression healer
  //     • "apply-optimal"  — optimal settings
  //     • "upgrade-tier"   — tier ascent
  //     • "warm-path-tune" — warm-path / cache tuning
  //     • "noop"           — no-op
  //
  //   context may include:
  //     • adviceList
  //     • userPreferences
  //     • gpuContext (binary/symbolic/dispatch/memory hints)
  //     • earnProfile (from PulseGPUEarnProfile-v24/v30)
  //     • presence ("active" | "idle" | "background" | ...)
  //     • gameActive (boolean)
  //     • warmPathContext (from PulseGPUWarmPathCache)
//     • geneticContext (from PulseGPUGeneticMemory)
// ----------------------------------------------------
  decide(plan, context = {}) {
    const gpuContext = context.gpuContext || null;
    const earnProfile = context.earnProfile || null;
    const presence = context.presence || null;
    const gameActive = !!context.gameActive;
    const warmPathContext = context.warmPathContext || null;
    const geneticContext = context.geneticContext || null;

    if (!plan || typeof plan !== "object") {
      return buildDecision({
        mode: "ignore",
        reason: "No plan provided.",
        plan: null,
        gpuContext,
        earnProfile,
        presence,
        gameActive,
        warmPathContext,
        warmPathOverride: null,
        geneticContext
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
          gameActive,
          warmPathContext,
          warmPathOverride: null,
          geneticContext
        });
      }

      return buildDecision({
        mode: "require-confirmation",
        reason: "No advisor context; confirmation required.",
        plan,
        gpuContext,
        earnProfile,
        presence,
        gameActive,
        warmPathContext,
        warmPathOverride: null,
        geneticContext
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
        gameActive,
        warmPathContext,
        geneticContext
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
        gameActive,
        warmPathContext,
        geneticContext
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
        gameActive,
        warmPathContext,
        geneticContext
      );
    }

    if (plan.action === "warm-path-tune") {
      return this.decideForWarmPathTune(
        plan,
        severity,
        mergedPrefs,
        gpuContext,
        earnProfile,
        presence,
        gameActive,
        warmPathContext,
        geneticContext
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
        gameActive,
        warmPathContext,
        warmPathOverride: null,
        geneticContext
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
      gameActive,
      warmPathContext,
      warmPathOverride: null,
      geneticContext
    });
  }

  // ----------------------------------------------------
  // Restore plan policy — Regression Healer (v30-Immortal-Omega++)
  // ----------------------------------------------------
  decideForRestore(
    plan,
    severity,
    prefs,
    gpuContext,
    earnProfile,
    presence,
    gameActive,
    warmPathContext,
    geneticContext
  ) {
    const allowLow = !!prefs.allowAutoFixLowRegressions;
    const allowMedium = !!prefs.allowAutoFixMediumRegressions;
    const allowHigh = !!prefs.allowAutoFixHighRegressions;
    const allowCritical = !!prefs.allowAutoFixCriticalRegressions;

    // v30: binary regressions get extra caution, especially under high/critical.
    const binaryPenalty =
      gpuContext?.binaryModeObserved && severity !== "low";

    function decision(auto, reason, earnOverride, warmPathOverride) {
      return buildDecision({
        mode: auto ? "auto-apply" : "require-confirmation",
        reason,
        plan,
        gpuContext,
        earnProfile,
        earnOverride,
        presence,
        gameActive,
        warmPathContext,
        warmPathOverride,
        geneticContext
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

    const warmPathOverride = computeWarmPathOverride({
      severity,
      prefs,
      warmPathContext,
      gameActive
    });

    return decision(auto, reason, earnOverride, warmPathOverride);
  }

  // ----------------------------------------------------
  // Apply-optimal plan policy — Optimization Reflex (v30-Immortal-Omega++)
  // ----------------------------------------------------
  decideForApplyOptimal(
    plan,
    severity,
    prefs,
    gpuContext,
    earnProfile,
    presence,
    gameActive,
    warmPathContext,
    geneticContext
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

    const warmPathOverride = computeWarmPathOverride({
      severity,
      prefs,
      warmPathContext,
      gameActive
    });

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
      gameActive,
      warmPathContext,
      warmPathOverride,
      geneticContext
    });
  }

  // ----------------------------------------------------
  // Tier upgrade plan policy — Tier Ascent Logic (v30-Immortal-Omega++)
  // ----------------------------------------------------
  decideForTierUpgrade(
    plan,
    severity,
    prefs,
    gpuContext,
    earnProfile,
    presence,
    gameActive,
    warmPathContext,
    geneticContext
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

    const warmPathOverride = computeWarmPathOverride({
      severity,
      prefs,
      warmPathContext,
      gameActive
    });

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
      gameActive,
      warmPathContext,
      warmPathOverride,
      geneticContext
    });
  }

  // ----------------------------------------------------
  // Warm-path tuning plan policy — Warm Path Tuner (v30-Immortal-Omega++)
  // ----------------------------------------------------
  decideForWarmPathTune(
    plan,
    severity,
    prefs,
    gpuContext,
    earnProfile,
    presence,
    gameActive,
    warmPathContext,
    geneticContext
  ) {
    const allowAutoWarmPath = !!prefs.allowAutoWarmPathTuning;

    const warmPathOverride = computeWarmPathOverride({
      severity,
      prefs,
      warmPathContext,
      gameActive
    });

    return buildDecision({
      mode: allowAutoWarmPath ? "auto-apply" : "require-confirmation",
      reason: allowAutoWarmPath
        ? "Auto-apply enabled for warm-path tuning."
        : "Warm-path tuning available; confirmation required.",
      plan,
      gpuContext,
      earnProfile,
      earnOverride: null,
      presence,
      gameActive,
      warmPathContext,
      warmPathOverride,
      geneticContext
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
