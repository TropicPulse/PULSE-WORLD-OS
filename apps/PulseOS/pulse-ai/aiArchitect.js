// ============================================================================
// FILE: tropic-pulse-functions/apps/pulse-ai/aiArchitect.js
// LAYER: ARCHITECT ORGAN (System + Identity + Architecture Insight)
// ============================================================================
//
// ROLE:
//   • Provide YOU (owner) deep visibility into system logs, identity evolution,
//     security violations, drift, schema issues, unused imports, orphaned routes,
//     dead components, and all design‑time diagnostics.
//   • Integrates with aiEvolution for organism‑wide analysis.
//   • Never exposes UID, resendToken, or identity anchors.
//   • Pure read‑only introspection.
//
// CONTRACT:
//   • READ‑ONLY — no writes, no deletes, no updates.
//   • NO eval(), NO Function(), NO dynamic imports.
//   • Deterministic analysis only.
// ============================================================================

import { Personas } from "./persona.js";

export function createArchitectAPI(db, evolutionAPI) {

  // --------------------------------------------------------------------------
  // HELPERS
  // --------------------------------------------------------------------------
  function assertOwnerArchitect(context) {
    if (!context.userIsOwner || context.personaId !== Personas.ARCHITECT) {
      context.logStep("aiArchitect: access denied (not owner+architect).");
      return false;
    }
    return true;
  }

  function stripIdentityAnchors(record) {
    if (!record || typeof record !== "object") return record;
    const clone = { ...record };
    delete clone.uid;
    delete clone.userId;
    delete clone.resendToken;
    delete clone.identityRoot;
    delete clone.sessionRoot;
    delete clone.deviceFingerprint;
    return clone;
  }

  async function fetchOwnerCollection(context, collection, options = {}) {
    if (!assertOwnerArchitect(context)) return [];
    const rows = await db.getCollection(collection, options);
    return rows.map(stripIdentityAnchors);
  }

  // --------------------------------------------------------------------------
  // PUBLIC API — Owner‑Only System / Identity / Evolution Insight
  // --------------------------------------------------------------------------
  return {

    // ----------------------------------------------------------------------
    // IDENTITY + SECURITY
    // ----------------------------------------------------------------------
    async getIdentityHistory(context, options = {}) {
      return fetchOwnerCollection(context, "identityHistory", options);
    },

    async getSecurityViolations(context, options = {}) {
      return fetchOwnerCollection(context, "securityViolations", options);
    },

    // ----------------------------------------------------------------------
    // SYSTEM LOGS (DESIGN‑TIME)
    // ----------------------------------------------------------------------
    async getFunctionErrors(context, options = {}) {
      return fetchOwnerCollection(context, "functionErrors", options);
    },

    async getEmailLogs(context, options = {}) {
      return fetchOwnerCollection(context, "emailLogs", options);
    },

    async getChangeLogs(context, options = {}) {
      return fetchOwnerCollection(context, "CHANGES", options);
    },

    async getCacheControl(context, options = {}) {
      return fetchOwnerCollection(context, "CACHE_CONTROL", options);
    },

    // ----------------------------------------------------------------------
    // SYSTEM SETTINGS
    // ----------------------------------------------------------------------
    async getSystemSettings(context, options = {}) {
      return fetchOwnerCollection(context, "settings", options);
    },

    // ----------------------------------------------------------------------
    // ENVIRONMENT + POWER (OWNER VIEW)
    // ----------------------------------------------------------------------
    async getEnvironmentInternal(context, options = {}) {
      return fetchOwnerCollection(context, "environment", options);
    },

    async getPowerInternal(context, options = {}) {
      return fetchOwnerCollection(context, "power", options);
    },

    async getPowerHistoryInternal(context, options = {}) {
      return fetchOwnerCollection(context, "powerHistory", options);
    },

    async getPulseHistoryInternal(context, options = {}) {
      return fetchOwnerCollection(context, "pulseHistory", options);
    },

    // ----------------------------------------------------------------------
    // EVOLUTIONARY ANALYSIS (via aiEvolution)
    // ----------------------------------------------------------------------
    async getOrganismOverview(context) {
      if (!assertOwnerArchitect(context)) return null;
      return evolutionAPI.getOrganismOverview(context);
    },

    async analyzeFile(context, filePath) {
      if (!assertOwnerArchitect(context)) return null;
      return evolutionAPI.analyzeFile(context, filePath);
    },

    async analyzeRoute(context, routeId) {
      if (!assertOwnerArchitect(context)) return null;
      return evolutionAPI.analyzeRoute(context, routeId);
    },

    async analyzeSchema(context, schemaName) {
      if (!assertOwnerArchitect(context)) return null;
      return evolutionAPI.analyzeSchema(context, schemaName);
    }
  };
}
