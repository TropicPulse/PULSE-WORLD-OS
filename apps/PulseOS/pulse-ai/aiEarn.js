// ============================================================================
// FILE: tropic-pulse-functions/apps/pulse-ai/aiEarn.js
// LAYER: EARN ORGAN (Economics + Rewards + Flow Awareness)
// ============================================================================
//
// ROLE:
//   • Provide AI with a SAFE, READ‑ONLY view into PulseEarn economic data.
//   • User: orders, referrals, referralClicks, vaultHistory, pulseHistory.
//   • Owner: system‑level earning patterns, anomalies, lineage, evolution logs.
//   • Integrates with aiEvolution for drift + schema + lineage analysis.
//   • Never exposes UID, resendToken, or identity anchors.
//   • Never mutates anything.
//
// CONTRACT:
//   • READ‑ONLY.
//   • ZERO MUTATION.
//   • ZERO RANDOMNESS.
//   • DETERMINISTIC ANALYSIS ONLY.
// ============================================================================

export function createEarnAPI(db, evolutionAPI) {

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

  async function fetchUserScoped(context, collection, options = {}) {
    const { userId } = context;
    if (!userId) {
      context.logStep(`aiEarn: user‑scoped "${collection}" requested without userId.`);
      return [];
    }
    const rows = await db.getCollection(collection, {
      ...options,
      where: { userId }
    });
    return rows.map(stripIdentity);
  }

  async function fetchOwnerScoped(context, collection, options = {}) {
    if (!context.userIsOwner) {
      context.logStep(`aiEarn: owner‑only "${collection}" blocked for non‑owner.`);
      return [];
    }
    const rows = await db.getCollection(collection, options);
    return rows.map(stripIdentity);
  }

  // --------------------------------------------------------------------------
  // PUBLIC API — User‑Facing Earn Insight
  // --------------------------------------------------------------------------
  return {

    // USER: “How am I earning?”
    async getUserEarnOverview(context) {
      const [
        orders,
        referrals,
        referralClicks,
        vaultHistory,
        pulseHistory
      ] = await Promise.all([
        fetchUserScoped(context, "orders"),
        fetchUserScoped(context, "referrals"),
        fetchUserScoped(context, "referralClicks"),
        fetchUserScoped(context, "vaultHistory"),
        fetchUserScoped(context, "pulseHistory")
      ]);

      return {
        orders,
        referrals,
        referralClicks,
        vaultHistory,
        pulseHistory
      };
    },

    // USER: “Show me my referrals only.”
    async getUserReferrals(context) {
      const [referrals, referralClicks] = await Promise.all([
        fetchUserScoped(context, "referrals"),
        fetchUserScoped(context, "referralClicks")
      ]);

      return { referrals, referralClicks };
    },

    // USER: “Show me my orders.”
    async getUserOrders(context) {
      const orders = await fetchUserScoped(context, "orders");
      return { orders };
    },

    // USER: “Show me my vault history related to earn.”
    async getUserVaultHistory(context) {
      const vaultHistory = await fetchUserScoped(context, "vaultHistory");
      return { vaultHistory };
    },

    // USER: “Show me my pulse history (earn events).”
    async getUserPulseHistory(context) {
      const pulseHistory = await fetchUserScoped(context, "pulseHistory");
      return { pulseHistory };
    },

    // ----------------------------------------------------------------------
    // OWNER‑ONLY — System‑Level Earn Insight
    // ----------------------------------------------------------------------
    async getSystemEarnOverview(context) {
      const [
        orders,
        referrals,
        referralClicks,
        pulseHistory
      ] = await Promise.all([
        fetchOwnerScoped(context, "orders"),
        fetchOwnerScoped(context, "referrals"),
        fetchOwnerScoped(context, "referralClicks"),
        fetchOwnerScoped(context, "pulseHistory")
      ]);

      return {
        orders,
        referrals,
        referralClicks,
        pulseHistory
      };
    },

    // OWNER: “Show me system‑level anomalies.”
    async getSystemEarnAnomalies(context) {
      const [
        orders,
        referrals,
        referralClicks,
        pulseHistory
      ] = await Promise.all([
        fetchOwnerScoped(context, "orders"),
        fetchOwnerScoped(context, "referrals"),
        fetchOwnerScoped(context, "referralClicks"),
        fetchOwnerScoped(context, "pulseHistory")
      ]);

      return {
        ordersSample: orders.slice(0, 100),
        referralsSample: referrals.slice(0, 100),
        referralClicksSample: referralClicks.slice(0, 100),
        pulseHistorySample: pulseHistory.slice(0, 100)
      };
    },

    // ----------------------------------------------------------------------
    // OWNER‑ONLY — Evolutionary + Lineage + Schema Analysis
    // ----------------------------------------------------------------------
    async getEarnEvolutionOverview(context) {
      if (!context.userIsOwner) return null;
      return evolutionAPI.getOrganismOverview(context);
    },

    async analyzeEarnSchema(context) {
      if (!context.userIsOwner) return null;
      return evolutionAPI.analyzeSchema(context, "pulseEarn");
    },

    async analyzeEarnFiles(context) {
      if (!context.userIsOwner) return null;
      return evolutionAPI.analyzeFile(context, "PulseEarn.js");
    },

    async analyzeEarnRoutes(context) {
      if (!context.userIsOwner) return null;
      return evolutionAPI.analyzeRoute(context, "earn");
    }
  };
}
