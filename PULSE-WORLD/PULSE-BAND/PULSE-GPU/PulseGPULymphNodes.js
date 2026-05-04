/* global */
// ============================================================================
//  PULSE GPU LYMPH NODES v16-Ascendant — THE LYMPH NODE NETWORK HEALER
//  Systemic GPU Immune Layer (Deterministic, Pure Logic, Drift‑Proof, Fail‑Open)
// ============================================================================
//
// IDENTITY — THE LYMPH NODE NETWORK HEALER (v16-Ascendant):
//  ---------------------------------------------
//  • The immune filtration system of the GPU subsystem.
//  • Validates every signal flowing through the GPU body.
//  • Filters out invalid advisor results, plans, decisions, notifications.
//  • Regenerates missing components (immune response).
//  • Ensures the entire GPU organism stays drift‑free and healthy.
//  • Distributed, systemic, always-on — the GPU’s internal defense grid.
//  • Dual‑mode + binary‑aware: biological + system‑level immune advantage.
//  • PulseSend‑v16‑Ascendant‑ready: immune validation before compute routing.
//  • Earn‑v4‑Presence‑ready.
//
// SAFETY CONTRACT (v16-Ascendant):
//  ---------------------------
//  • No randomness
//  • No timestamps
//  • No environment access
//  • No GPU calls
//  • No DOM
//  • Fail-open: invalid inputs → repaired or ignored, never crash
//  • Self-repair-ready: all outputs include metadata
//  • Deterministic: same inputs → same healing result
// ============================================================================
/*
AI_EXPERIENCE_META = {
  identity: "PulseGPULymphNodes",
  version: "v16-Ascendant",
  layer: "gpu_guardian",
  role: "gpu_lymph_nodes",
  lineage: "PulseGPU-v16",

  evo: {
    gpuHealer: true,
    gpuCleanup: true,
    gpuAnomalyBuffer: true,

    deterministic: true,
    driftProof: true,
    pureCompute: true,

    zeroNetwork: true,
    zeroFilesystem: true,
    zeroMutationOfInput: true
  },

  contract: {
    always: [
      "PulseGPUGuardianCortex",
      "PulseGPUDriveCenter"
    ],
    never: [
      "safeRoute",
      "fetchViaCNS",
      "legacyLymphNodes"
    ]
  }
}
*/

import { PulseGPUSettingsRestorer } from "./PulseGPUCognitiveLayer.js";
import { PulseGPUUXBridge } from "./PulseGPUCognitiveIntelligence.js";
import { PulseGPUPerformanceAdvisor } from "./PulseGPUDriveCenter.js";
import { PulseGPUGuardianCortex as PulseGPUAutoOptimize } from "./PulseGPUGuardianCortex.js";

const GPU_HEALER_CONTEXT = {
  layer: "PulseGPUHealer",
  role: "LYMPH_NODE_NETWORK",
  purpose: "Systemic GPU immune filter + drift purifier",
  context:
    "Validates advisor results, restore plans, auto-opt decisions, notifications, and advantage snapshots",
  target: "full-gpu+binary",
  version: "16-Ascendant",
  selfRepairable: true,

  // v16+ advantage epoch identity
  advantageEpochId: "gpu-v16-ascendant",
  systemAgeBand: "immortal",
  lineage: "PulseGPU-v16-Ascendant",

  evo: {
    // metabolic / stability field
    metabolicBoost: 1.6,
    neuralReflexBoost: 1.7,
    stabilityBoost: 1.8,

    // organism / topology
    multiInstanceReady: true,
    deterministicNeuron: true,
    parallelSafe: true,
    fanOutScaling: 1.5,
    clusterCoherence: true,
    zeroDriftCloning: true,
    reflexPropagation: 1.4,

    // dual-mode + cognition
    dualModeEvolution: true,
    organismClusterBoost: 1.5,
    cognitiveComputeLink: true,
    unifiedAdvantageField: true,

    // awareness fields
    binaryAware: true,
    dualModeAware: true,
    gpuDispatchAware: true,
    gpuMemoryAware: true,
    gpuAdvantageAware: true,
    immuneFieldAware: true,
    geneticMemoryAware: true,
    snapshotAware: true,
    cacheAware: true,
    prewarmAware: true,

    // v16 contracts
    pulseSend16Ready: true,
    routingContract: "PulseSend-v16-Ascendant",
    gpuOrganContract: "PulseGPU-v16-Ascendant",
    binaryGpuOrganContract: "PulseBinaryGPU-v16-Ascendant",
    earnCompatibility: "Earn-v4-Presence",

    // legacy (conceptual only)
    legacyRoutingContract: "PulseSend-v12.3",
    legacyGPUOrganContract: "PulseGPU-v12.3-Evo",
    legacyBinaryGpuOrganContract: "PulseBinaryGPU-v12.3-Evo",
    legacyEarnCompatibility: "Earn-v3"
  }
};

// ============================================================================
// HEALING REPORT BUILDER
// ============================================================================
function buildHealingReport({
  status,
  actions,
  advisorResult,
  restorePlan,
  autoDecision,
  notifications,
  gpuContext,
  advantageSnapshot,
  cacheState,
  prewarmState
}) {
  return {
    status,
    actions: Array.isArray(actions) ? actions.slice() : [],
    advisorResult: advisorResult || null,
    restorePlan: restorePlan || null,
    autoDecision: autoDecision || null,
    notifications: Array.isArray(notifications) ? notifications.slice() : [],
    gpuContext: gpuContext || null,

    // v16+ advantage surfaces
    advantageSnapshot: advantageSnapshot || null,   // { epochId, scoreDelta, pressureVector, ... }
    cacheState: cacheState || null,                 // { advisorCacheHit, planCacheHit, notifCacheHit }
    prewarmState: prewarmState || null,             // { prewarmedSignals, prewarmedPlans, ... }

    meta: {
      ...GPU_HEALER_CONTEXT
    }
  };
}

// ============================================================================
// HEALING REPORT VALIDATION
// ============================================================================
function validateHealingReport(report) {
  if (!report || typeof report !== "object") return false;
  if (!report.meta || report.meta.layer !== "PulseGPUHealer") return false;
  if (typeof report.status !== "string") return false;
  if (!Array.isArray(report.actions)) return false;
  return true;
}

// ============================================================================
// INTERNAL HELPERS — Immune Filters
// ============================================================================
function isAdvisorResultValid(result) {
  return !!result && typeof result === "object" && Array.isArray(result.advice);
}

function isAutoDecisionValid(decision) {
  return (
    !!decision &&
    typeof decision === "object" &&
    typeof decision.mode === "string" &&
    typeof decision.reason === "string"
  );
}

function validatePlan(plan) {
  if (!plan || typeof plan !== "object") return false;
  if (typeof plan.action !== "string") return false;
  return true;
}

function validateNotification(notification) {
  if (!notification || typeof notification !== "object") return false;
  if (typeof notification.kind !== "string") return false;
  return true;
}

function filterValidNotifications(notifications) {
  if (!Array.isArray(notifications)) return [];
  return notifications.filter((n) => validateNotification(n));
}

// ============================================================================
//  PULSE GPU HEALER v16-Ascendant — THE LYMPH NODE NETWORK
// ============================================================================
class PulseGPUHealer {
  constructor(options = {}) {
    this.advisor =
      options.advisor ||
      new PulseGPUPerformanceAdvisor(options.settingsMemory);
    this.restorer =
      options.restorer || new PulseGPUSettingsRestorer();
    this.autoOptimize =
      options.autoOptimize ||
      new PulseGPUAutoOptimize(options.userPreferences);
    this.uxBridge =
      options.uxBridge || new PulseGPUUXBridge();

    // v16+ deterministic in-memory caches
    this.advisorCache = new Map();
    this.planCache = new Map();
    this.notificationCache = new Map();
  }

  static meta = {
    ...GPU_HEALER_CONTEXT
  };

  // deterministic cache key builder
  buildCacheKey({ gameProfile, hardwareProfile, tierProfile, settings, metrics, gpuContext }) {
    const safe = (v) => (v == null ? null : v);
    return JSON.stringify({
      gameProfile: safe(gameProfile),
      hardwareProfile: safe(hardwareProfile),
      tierProfile: safe(tierProfile),
      settings: safe(settings),
      metrics: safe(metrics),
      gpuContext: safe(gpuContext)
    });
  }

  // ----------------------------------------------------
  // healSessionFlow — IMMUNE RESPONSE CYCLE (v16-Ascendant)
  // ----------------------------------------------------
  healSessionFlow({
    advisorResult,
    restorePlan,
    autoDecision,
    notifications,
    context = {}
  }) {
    const actions = [];

    const {
      gameProfile,
      hardwareProfile,
      tierProfile,
      settings,
      metrics,
      userPreferences,
      gpuContext,          // binary/symbolic/pressure/dispatch hints
      advantageSnapshot,   // optional: upstream advantage snapshot
      prewarmState         // optional: upstream prewarm info
    } = context;

    const cacheKey = this.buildCacheKey({
      gameProfile,
      hardwareProfile,
      tierProfile,
      settings,
      metrics,
      gpuContext
    });

    let cacheState = {
      advisorCacheHit: false,
      planCacheHit: false,
      notifCacheHit: false
    };

    // 1) FILTER + REGENERATE ADVISOR RESULT (with v16 cache)
    let healedAdvisor = advisorResult;

    if (!isAdvisorResultValid(healedAdvisor)) {
      const cachedAdvisor = this.advisorCache.get(cacheKey);
      if (cachedAdvisor && isAdvisorResultValid(cachedAdvisor)) {
        healedAdvisor = cachedAdvisor;
        cacheState.advisorCacheHit = true;
        actions.push({
          type: "advisor-cache-hit",
          description: "Advisor result restored from v16 immune cache.",
          ...GPU_HEALER_CONTEXT
        });
      } else {
        healedAdvisor = this.advisor.analyzeCurrentSession({
          gameProfile,
          hardwareProfile,
          tierProfile,
          settings,
          metrics,
          gpuContext
        });

        this.advisorCache.set(cacheKey, healedAdvisor);
        actions.push({
          type: "recomputed-advisor-result",
          description:
            "Advisor result invalid; immune system regenerated it.",
          ...GPU_HEALER_CONTEXT
        });
      }
    }

    // 2) FILTER + REGENERATE RESTORE PLAN (with v16 cache)
    let healedPlan = restorePlan;

    if (!healedPlan || !validatePlan(healedPlan)) {
      const cachedPlan = this.planCache.get(cacheKey);
      if (cachedPlan && validatePlan(cachedPlan)) {
        healedPlan = cachedPlan;
        cacheState.planCacheHit = true;
        actions.push({
          type: "restore-plan-cache-hit",
          description: "Restore plan restored from v16 immune cache.",
          ...GPU_HEALER_CONTEXT
        });
      } else {
        healedPlan = this.restorer.buildRestorePlan(healedAdvisor.advice, {
          gameProfile,
          hardwareProfile,
          tierProfile,
          gpuContext
        });

        this.planCache.set(cacheKey, healedPlan);
        actions.push({
          type: "recomputed-restore-plan",
          description:
            "Restore plan invalid; immune system rebuilt it.",
          ...GPU_HEALER_CONTEXT
        });
      }
    }

    // 3) FILTER + REGENERATE AUTO-OPT DECISION
    let healedDecision = autoDecision;

    const mergedPrefs = { ...(userPreferences || {}) };

    if (!isAutoDecisionValid(healedDecision)) {
      healedDecision = this.autoOptimize.decide(healedPlan, {
        adviceList: healedAdvisor.advice,
        userPreferences: mergedPrefs,
        gpuContext
      });

      actions.push({
        type: "recomputed-auto-decision",
        description:
          "Auto-opt decision invalid; immune system recalculated it.",
        ...GPU_HEALER_CONTEXT
      });
    }

    // 4) FILTER + REGENERATE NOTIFICATIONS (with v16 cache)
    let healedNotifications = filterValidNotifications(notifications);

    const needAdvisorNotifs =
      healedAdvisor &&
      Array.isArray(healedAdvisor.advice) &&
      healedAdvisor.advice.length > 0;

    const needPlanNotif =
      healedPlan && healedPlan.action && healedPlan.action !== "noop";

    if (healedNotifications.length === 0 && (needAdvisorNotifs || needPlanNotif)) {
      const cachedNotifs = this.notificationCache.get(cacheKey);
      if (cachedNotifs && Array.isArray(cachedNotifs) && cachedNotifs.length > 0) {
        healedNotifications = filterValidNotifications(cachedNotifs);
        cacheState.notifCacheHit = true;
        actions.push({
          type: "notification-cache-hit",
          description: "Notifications restored from v16 immune cache.",
          ...GPU_HEALER_CONTEXT
        });
      } else {
        const advisorNotifs = this.uxBridge.fromAdvisorResult(healedAdvisor, {
          gpuContext
        });
        const planNotif = this.uxBridge.fromRestorePlan(healedPlan, {
          gpuContext
        });

        healedNotifications = advisorNotifs.slice();
        if (planNotif) healedNotifications.push(planNotif);

        healedNotifications = filterValidNotifications(healedNotifications);

        this.notificationCache.set(cacheKey, healedNotifications);

        actions.push({
          type: "regenerated-notifications",
          description:
            "Notifications invalid; immune system regenerated them.",
          ...GPU_HEALER_CONTEXT
        });
      }
    }

    // 5) IMMUNE STATUS
    const status = actions.length === 0 ? "healthy" : "repaired";

    return buildHealingReport({
      status,
      actions,
      advisorResult: healedAdvisor,
      restorePlan: healedPlan,
      autoDecision: healedDecision,
      notifications: healedNotifications,
      gpuContext,
      advantageSnapshot: advantageSnapshot || null,
      cacheState,
      prewarmState: prewarmState || null
    });
  }
}

// ============================================================================
// EXPORTS
// ============================================================================
export {
  PulseGPUHealer,
  buildHealingReport,
  validateHealingReport
};
