/* global */
// ============================================================================
//  PULSE GPU LYMPH NODES v24-Immortal++ — THE LYMPH NODE NETWORK HEALER
//  Systemic GPU Immune Layer (Deterministic, Pure Logic, Drift‑Proof, Fail‑Open)
// ============================================================================
//
// IDENTITY — THE LYMPH NODE NETWORK HEALER (v24-Immortal++):
//  ---------------------------------------------
//  • The immune filtration system of the GPU subsystem.
//  • Validates every signal flowing through the GPU body.
//  • Filters out invalid advisor results, plans, decisions, notifications.
//  • Regenerates missing components (immune response).
//  • Ensures the entire GPU organism stays drift‑free and healthy.
//  • Distributed, systemic, always-on — the GPU’s internal defense grid.
//  • Dual‑mode + binary‑aware: biological + system‑level immune advantage.
//  • PulseSend‑v24‑Ascendant‑ready: immune validation before compute routing.
//  • Earn‑v24‑GPU‑ready — aware of GPU Earn governor + profiles.
// ============================================================================
import {
  OrganismIdentity,
  buildPulseOrganismMap as PulseOrganismMap,
  buildPulseOrganismMap as buildOrganismMap
} from "../PULSE-X/PULSE-WORLD-MAP.js";
const Identity = OrganismIdentity(import.meta.url);

export const pulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
// export const PULSE_EARN_IMMUNE_CONTEXT = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;
export const GPU_HEALER_CONTEXT = Identity.pulseLoreContext;
import { PulseGPUSettingsRestorer } from "./PulseGPUCognitiveLayer-v24.js";
import { PulseGPUUXBridge } from "./PulseGPUCognitiveIntelligence-v24.js";
import { PulseGPUPerformanceAdvisor } from "./PulseGPUDriveCenter-v24.js";
import {
  PulseGPUGuardianCortex as PulseGPUAutoOptimize
} from "./PulseGPUGuardianCortex-v24.js";


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
  prewarmState,
  earnProfile,
  presence,
  gameActive
}) {
  return {
    status,
    actions: Array.isArray(actions) ? actions.slice() : [],
    advisorResult: advisorResult || null,
    restorePlan: restorePlan || null,
    autoDecision: autoDecision || null,
    notifications: Array.isArray(notifications) ? notifications.slice() : [],
    gpuContext: gpuContext || null,

    // v24+ advantage + earn surfaces
    advantageSnapshot: advantageSnapshot || null, // { epochId, scoreDelta, pressureVector, ... }
    cacheState: cacheState || null, // { advisorCacheHit, planCacheHit, notifCacheHit }
    prewarmState: prewarmState || null, // { prewarmedSignals, prewarmedPlans, ... }
    earnProfile: earnProfile || null, // current GPU Earn profile (if any)
    presence: presence || null, // "active" | "idle" | "background" | ...
    gameActive: !!gameActive,

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
//  PULSE GPU HEALER v24-Immortal++ — THE LYMPH NODE NETWORK
// ============================================================================
class PulseGPUHealer {
  constructor(options = {}) {
    this.advisor =
      options.advisor ||
      new PulseGPUPerformanceAdvisor(options.settingsMemory);
    this.restorer = options.restorer || new PulseGPUSettingsRestorer();
    this.autoOptimize =
      options.autoOptimize ||
      new PulseGPUAutoOptimize(options.userPreferences);
    this.uxBridge = options.uxBridge || new PulseGPUUXBridge();

    // v24+ deterministic in-memory caches
    this.advisorCache = new Map();
    this.planCache = new Map();
    this.notificationCache = new Map();
  }

  static meta = {
    ...GPU_HEALER_CONTEXT
  };

  // deterministic cache key builder
  buildCacheKey({
    gameProfile,
    hardwareProfile,
    tierProfile,
    settings,
    metrics,
    gpuContext,
    presence,
    gameActive
  }) {
    const safe = (v) => (v == null ? null : v);
    return JSON.stringify({
      gameProfile: safe(gameProfile),
      hardwareProfile: safe(hardwareProfile),
      tierProfile: safe(tierProfile),
      settings: safe(settings),
      metrics: safe(metrics),
      gpuContext: safe(gpuContext),
      presence: safe(presence),
      gameActive: !!gameActive
    });
  }

  // ----------------------------------------------------
  // healSessionFlow — IMMUNE RESPONSE CYCLE (v24-Immortal++)
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
      gpuContext, // binary/symbolic/pressure/dispatch hints
      advantageSnapshot, // optional: upstream advantage snapshot
      prewarmState, // optional: upstream prewarm info
      earnProfile, // optional: current GPU Earn profile
      presence, // "active" | "idle" | "background" | ...
      gameActive // boolean
    } = context;

    const cacheKey = this.buildCacheKey({
      gameProfile,
      hardwareProfile,
      tierProfile,
      settings,
      metrics,
      gpuContext,
      presence,
      gameActive
    });

    let cacheState = {
      advisorCacheHit: false,
      planCacheHit: false,
      notifCacheHit: false
    };

    // 1) FILTER + REGENERATE ADVISOR RESULT (with v24 cache)
    let healedAdvisor = advisorResult;

    if (!isAdvisorResultValid(healedAdvisor)) {
      const cachedAdvisor = this.advisorCache.get(cacheKey);
      if (cachedAdvisor && isAdvisorResultValid(cachedAdvisor)) {
        healedAdvisor = cachedAdvisor;
        cacheState.advisorCacheHit = true;
        actions.push({
          type: "advisor-cache-hit",
          description: "Advisor result restored from v24 immune cache.",
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

    // 2) FILTER + REGENERATE RESTORE PLAN (with v24 cache)
    let healedPlan = restorePlan;

    if (!healedPlan || !validatePlan(healedPlan)) {
      const cachedPlan = this.planCache.get(cacheKey);
      if (cachedPlan && validatePlan(cachedPlan)) {
        healedPlan = cachedPlan;
        cacheState.planCacheHit = true;
        actions.push({
          type: "restore-plan-cache-hit",
          description: "Restore plan restored from v24 immune cache.",
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

    // 3) FILTER + REGENERATE AUTO-OPT DECISION (Earn-aware, presence-aware)
    let healedDecision = autoDecision;

    const mergedPrefs = { ...(userPreferences || {}) };

    if (!isAutoDecisionValid(healedDecision)) {
      healedDecision = this.autoOptimize.decide(healedPlan, {
        adviceList: healedAdvisor.advice,
        userPreferences: mergedPrefs,
        gpuContext,
        earnProfile: earnProfile || null,
        presence: presence || null,
        gameActive: !!gameActive
      });

      actions.push({
        type: "recomputed-auto-decision",
        description:
          "Auto-opt decision invalid; immune system recalculated it.",
        ...GPU_HEALER_CONTEXT
      });
    }

    // 4) FILTER + REGENERATE NOTIFICATIONS (with v24 cache)
    let healedNotifications = filterValidNotifications(notifications);

    const needAdvisorNotifs =
      healedAdvisor &&
      Array.isArray(healedAdvisor.advice) &&
      healedAdvisor.advice.length > 0;

    const needPlanNotif =
      healedPlan && healedPlan.action && healedPlan.action !== "noop";

    if (
      healedNotifications.length === 0 &&
      (needAdvisorNotifs || needPlanNotif)
    ) {
      const cachedNotifs = this.notificationCache.get(cacheKey);
      if (cachedNotifs && Array.isArray(cachedNotifs) && cachedNotifs.length > 0) {
        healedNotifications = filterValidNotifications(cachedNotifs);
        cacheState.notifCacheHit = true;
        actions.push({
          type: "notification-cache-hit",
          description: "Notifications restored from v24 immune cache.",
          ...GPU_HEALER_CONTEXT
        });
      } else {
        const advisorNotifs = this.uxBridge.fromAdvisorResult(healedAdvisor, {
          gpuContext,
          earnProfile: earnProfile || null,
          presence: presence || null,
          gameActive: !!gameActive
        });
        const planNotif = this.uxBridge.fromRestorePlan(healedPlan, {
          gpuContext,
          earnProfile: earnProfile || null,
          presence: presence || null,
          gameActive: !!gameActive
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
      prewarmState: prewarmState || null,
      earnProfile: earnProfile || null,
      presence: presence || null,
      gameActive: !!gameActive
    });
  }
}

// ============================================================================
// EXPORTS
// ============================================================================
export { PulseGPUHealer, buildHealingReport, validateHealingReport };
