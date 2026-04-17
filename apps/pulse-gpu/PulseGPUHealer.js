// ============================================================================
// FILE: tropic-pulse-functions/apps/pulse-gpu/PulseGPUHealer.js
// LAYER: GPU-SUBSYSTEM (PURE LOGIC / SELF-HEALING COORDINATOR)
//
// PulseGPUHealer v6.2 — Deterministic GPU Self-Healing Layer
// NO AI. NO COMPUTE. NO MARKETPLACE. PURE HEALING COORDINATION.
// ============================================================================

// ------------------------------------------------------------
// ⭐ HUMAN‑READABLE CONTEXT MAP (OS‑v5 Standard)
// ------------------------------------------------------------
const GPU_HEALER_CONTEXT = {
  layer: "PulseGPUHealer",
  role: "GPU_HEALER",
  purpose: "Deterministic GPU self-healing coordinator",
  context:
    "Validates advisor results, restore plans, auto-opt decisions, and notifications"
};

// ------------------------------------------------------------
// IMPORTS
// ------------------------------------------------------------

import { PulseGPUPerformanceAdvisor } from "./PulseGPUPerformanceAdvisor.js";
import {
  PulseGPUSettingsRestorer,
  validatePlan
} from "./PulseGPUSettingsRestorer.js";
import { PulseGPUAutoOptimize } from "./PulseGPUAutoOptimize.js";
import {
  PulseGPUUXBridge,
  validateNotification
} from "./PulseGPUUXBridge.js";

// ------------------------------------------------------------
// Healing report builder (now includes OS‑v5 metadata)
// ------------------------------------------------------------

function buildHealingReport({
  status,
  actions,
  advisorResult,
  restorePlan,
  autoDecision,
  notifications
}) {
  return {
    status,
    actions: Array.isArray(actions) ? actions.slice() : [],
    advisorResult: advisorResult || null,
    restorePlan: restorePlan || null,
    autoDecision: autoDecision || null,
    notifications: Array.isArray(notifications) ? notifications.slice() : [],
    meta: {
      ...GPU_HEALER_CONTEXT,
      version: 2,
      target: "full-gpu",
      selfRepairable: true
    }
  };
}

// ------------------------------------------------------------
// Healing report validation (unchanged, but now aware of metadata)
// ------------------------------------------------------------

function validateHealingReport(report) {
  if (!report || typeof report !== "object") return false;
  if (!report.meta || report.meta.layer !== "PulseGPUHealer") return false;
  if (typeof report.status !== "string") return false;
  if (!Array.isArray(report.actions)) return false;
  return true;
}

// ------------------------------------------------------------
// Internal helpers
// ------------------------------------------------------------

function isAdvisorResultValid(result) {
  if (!result || typeof result !== "object") return false;
  if (!Array.isArray(result.advice)) return false;
  return true;
}

function isAutoDecisionValid(decision) {
  if (!decision || typeof decision !== "object") return false;
  if (typeof decision.mode !== "string") return false;
  if (typeof decision.reason !== "string") return false;
  return true;
}

function filterValidNotifications(notifications) {
  if (!Array.isArray(notifications)) return [];
  return notifications.filter((n) => validateNotification(n));
}

// ------------------------------------------------------------
// PulseGPUHealer (now includes static OS‑v5 metadata)
// ------------------------------------------------------------

class PulseGPUHealer {
  constructor(options = {}) {
    this.advisor =
      options.advisor || new PulseGPUPerformanceAdvisor(options.settingsMemory);
    this.restorer =
      options.restorer || new PulseGPUSettingsRestorer();
    this.autoOptimize =
      options.autoOptimize || new PulseGPUAutoOptimize(options.userPreferences);
    this.uxBridge =
      options.uxBridge || new PulseGPUUXBridge();
  }

  // Static metadata for discovery
  static meta = {
    ...GPU_HEALER_CONTEXT,
    version: 2,
    target: "full-gpu",
    selfRepairable: true
  };

  // ----------------------------------------------------
  // healSessionFlow (unchanged logic, now with metadata)
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
      userPreferences
    } = context;

    // --------------------------------------------------
    // 1) Heal advisorResult
    // --------------------------------------------------
    let healedAdvisor = advisorResult;

    if (!isAdvisorResultValid(healedAdvisor)) {
      healedAdvisor = this.advisor.analyzeCurrentSession({
        gameProfile,
        hardwareProfile,
        tierProfile,
        settings,
        metrics
      });

      actions.push({
        type: "recomputed-advisor-result",
        description:
          "Advisor result was invalid or missing; recomputed from context.",
        ...GPU_HEALER_CONTEXT
      });
    }

    // --------------------------------------------------
    // 2) Heal restorePlan
    // --------------------------------------------------
    let healedPlan = restorePlan;

    if (!healedPlan || !validatePlan(healedPlan)) {
      healedPlan = this.restorer.buildRestorePlan(healedAdvisor.advice);

      actions.push({
        type: "recomputed-restore-plan",
        description:
          "Restore plan was invalid or missing; recomputed from advisor advice.",
        ...GPU_HEALER_CONTEXT
      });
    }

    // --------------------------------------------------
    // 3) Heal autoDecision
    // --------------------------------------------------
    let healedDecision = autoDecision;

    const mergedPrefs = {
      ...(userPreferences || {})
    };

    if (!isAutoDecisionValid(healedDecision)) {
      healedDecision = this.autoOptimize.decide(healedPlan, {
        adviceList: healedAdvisor.advice,
        userPreferences: mergedPrefs
      });

      actions.push({
        type: "recomputed-auto-decision",
        description:
          "Auto-opt decision was invalid or missing; recomputed from plan and advice.",
        ...GPU_HEALER_CONTEXT
      });
    }

    // --------------------------------------------------
    // 4) Heal notifications
    // --------------------------------------------------
    let healedNotifications = filterValidNotifications(notifications);

    const needAdvisorNotifs =
      healedAdvisor && Array.isArray(healedAdvisor.advice) && healedAdvisor.advice.length > 0;
    const needPlanNotif = healedPlan && healedPlan.action && healedPlan.action !== "noop";

    if (healedNotifications.length === 0 && (needAdvisorNotifs || needPlanNotif)) {
      const advisorNotifs = this.uxBridge.fromAdvisorResult(healedAdvisor);
      const planNotif = this.uxBridge.fromRestorePlan(healedPlan);

      healedNotifications = advisorNotifs.slice();
      if (planNotif) {
        healedNotifications.push(planNotif);
      }

      healedNotifications = filterValidNotifications(healedNotifications);

      actions.push({
        type: "regenerated-notifications",
        description:
          "Notifications were missing or invalid; regenerated from advisor and plan.",
        ...GPU_HEALER_CONTEXT
      });
    }

    // --------------------------------------------------
    // 5) Determine overall status
    // --------------------------------------------------
    const status = actions.length === 0 ? "healthy" : "repaired";

    return buildHealingReport({
      status,
      actions,
      advisorResult: healedAdvisor,
      restorePlan: healedPlan,
      autoDecision: healedDecision,
      notifications: healedNotifications
    });
  }
}

// ------------------------------------------------------
// EXPORTS
// ------------------------------------------------------

export {
  PulseGPUHealer,
  buildHealingReport,
  validateHealingReport
};
