// ============================================================================
// FILE: tropic-pulse-functions/apps/pulse-ai/aiTourist.js
// LAYER: TOURIST ORGAN (Public + User‑Scoped Data Pantry)
// ============================================================================
//
// ROLE:
//   • Provide SAFE, READ‑ONLY access to tourist + user‑scoped data.
//   • Respect owner‑only, user‑only, and tourist‑safe boundaries.
//   • Never expose UID, resendToken, or identity anchors in AI output.
//   • Act as the “data pantry” for Tour Guide AI.
//
// CONTRACT:
//   • READ‑ONLY — no writes, no deletes, no updates.
//   • NO eval(), NO Function(), NO dynamic imports.
//   • NO executing user code.
//   • Deterministic, scoped data access only.
// ============================================================================

import { Personas } from "./persona.js";

export function createTouristAPI(db) {
  // --------------------------------------------------------------------------
  // ACCESS MAP — Who can see what?
  // --------------------------------------------------------------------------
  const ACCESS = {
    // PUBLIC / TOURIST‑SAFE
    businesses:        { scope: "tourist" },
    events:            { scope: "tourist" },
    categoryIconCache: { scope: "tourist" },
    duplicateImages:   { scope: "tourist" },
    menuSources:       { scope: "tourist" },
    pendingBusinesses: { scope: "tourist" },
    pendingMenus:      { scope: "tourist" },
    pulseHistory:      { scope: "tourist" },
    environment:       { scope: "tourist" },
    power:             { scope: "tourist" },
    powerData:         { scope: "tourist" },
    powerHistory:      { scope: "tourist" },
    powerSettings:     { scope: "tourist" },

    // USER‑SCOPED
    orders:            { scope: "user" },
    referrals:         { scope: "user" },
    referralClicks:    { scope: "user" },
    vaultHistory:      { scope: "user" },
    timerLogsUserTried:{ scope: "user" },
    timerLogsUserSaved:{ scope: "user" },

    // OWNER‑ONLY (you only)
    functionErrors:    { scope: "owner" },
    identityHistory:   { scope: "owner" },
    securityViolations:{ scope: "owner" },
    settings:          { scope: "owner" },
    timerLogsSystem:   { scope: "owner" },
    emailLogs:         { scope: "owner" }
  };

  // --------------------------------------------------------------------------
  // HELPERS
  // --------------------------------------------------------------------------
  function stripIdentity(record) {
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

  async function fetchCollection(context, key, options = {}) {
    const { userId, userIsOwner } = context;
    const access = ACCESS[key];

    if (!access) {
      context.logStep(`aiTourist: unknown collection "${key}".`);
      return [];
    }

    // OWNER‑ONLY
    if (access.scope === "owner") {
      if (!userIsOwner) {
        context.logStep(`aiTourist: owner‑only "${key}" blocked for non‑owner.`);
        return [];
      }
      const rows = await db.getCollection(key, options);
      return rows.map(stripIdentity);
    }

    // USER‑SCOPED
    if (access.scope === "user") {
      if (!userId) {
        context.logStep(`aiTourist: user‑scoped "${key}" requested without userId.`);
        return [];
      }
      const rows = await db.getCollection(key, {
        ...options,
        where: { userId }
      });
      return rows.map(stripIdentity);
    }

    // TOURIST‑SAFE
    const rows = await db.getCollection(key, options);
    return rows.map(stripIdentity);
  }

  // --------------------------------------------------------------------------
  // PUBLIC API — High‑Level Helpers for Tour Guide AI
  // --------------------------------------------------------------------------
  return {
    // Tourist‑facing overview
    async getTouristOverview(context) {
      const [
        businesses,
        events,
        environment,
        power,
        pulseHistory
      ] = await Promise.all([
        fetchCollection(context, "businesses"),
        fetchCollection(context, "events"),
        fetchCollection(context, "environment"),
        fetchCollection(context, "power"),
        fetchCollection(context, "pulseHistory")
      ]);

      return { businesses, events, environment, power, pulseHistory };
    },

    // Business + menus + pending menus + duplicate images
    async getBusinessBundle(context, businessId) {
      const [
        businesses,
        menus,
        pendingMenus,
        duplicateImages
      ] = await Promise.all([
        fetchCollection(context, "businesses", { where: { id: businessId } }),
        fetchCollection(context, "menuSources", { where: { businessId } }),
        fetchCollection(context, "pendingMenus", { where: { businessId } }),
        fetchCollection(context, "duplicateImages", { where: { businessId } })
      ]);

      return {
        business: businesses[0] || null,
        menus,
        pendingMenus,
        duplicateImages
      };
    },

    // User referrals
    async getUserReferrals(context) {
      const [referrals, referralClicks] = await Promise.all([
        fetchCollection(context, "referrals"),
        fetchCollection(context, "referralClicks")
      ]);

      return { referrals, referralClicks };
    },

    // User orders
    async getUserOrders(context) {
      const orders = await fetchCollection(context, "orders");
      return { orders };
    },

    // User vault history
    async getUserVaultHistory(context) {
      const vaultHistory = await fetchCollection(context, "vaultHistory");
      return { vaultHistory };
    },

    // User timer logs (their own attempts/saves)
    async getUserTimerLogs(context) {
      const [tried, saved] = await Promise.all([
        fetchCollection(context, "timerLogsUserTried"),
        fetchCollection(context, "timerLogsUserSaved")
      ]);

      return {
        tried,
        saved
      };
    },

    // Owner‑only “attention needed” bundle
    async getOwnerAttentionBundle(context) {
      const [
        pendingBusinesses,
        pendingMenus,
        functionErrors,
        identityHistory,
        securityViolations,
        emailLogs
      ] = await Promise.all([
        fetchCollection(context, "pendingBusinesses"),
        fetchCollection(context, "pendingMenus"),
        fetchCollection(context, "functionErrors"),
        fetchCollection(context, "identityHistory"),
        fetchCollection(context, "securityViolations"),
        fetchCollection(context, "emailLogs")
      ]);

      return {
        pendingBusinesses,
        pendingMenus,
        functionErrors,
        identityHistory,
        securityViolations,
        emailLogs
      };
    }
  };
}
