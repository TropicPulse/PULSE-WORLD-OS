// ============================================================================
//  EvolutionaryThought.js — v10.1
//  PulseRouter v10.1 • Pattern Brainstem • Degradation + Route DNA Router
// ============================================================================
//
//  WHAT THIS ORGAN IS:
//  --------------------
//  • The routing brainstem for Pulse organisms.
//  • Chooses target organs based on pattern + lineage + degradation.
//  • Remembers successful routes (reflex arcs).
//  • Remembers degraded routes and bypasses (avoidance arcs).
//  • Builds and maintains "route DNA" for each pattern/lineage/page.
//  • Deterministic, pattern‑native, lineage‑aware, degradation‑aware.
//
//  WHAT THIS ORGAN IS NOT:
//  ------------------------
//  • Not a transport organ (PulseSend handles movement).
//  • Not a mesh/wiring organ (PulseMesh handles pathways).
//  • Not a compute engine.
//  • Not a network client.
//  • Not a GPU/Earn/OS organ.
//  • Not an IQ/import organ.
//
//  SAFETY CONTRACT (v10.1):
//  ------------------------
//  • No imports.
//  • No network.
//  • No randomness.
//  • No timestamps.
//  • Pure deterministic string/shape logic.
//  • Internal memory only (no external mutation).
//  • Degradation-aware, but always routes forward.
//  • Route DNA is internal only, never mutates external state.
// ============================================================================

// ⭐ PulseRole — identifies this as the PulseRouter v10.1 Organ
export const PulseRole = {
  type: "Router",
  subsystem: "PulseRouter",
  layer: "Brainstem",
  version: "10.1",
  identity: "PulseRouter-v10.1",

  evo: {
    driftProof: true,
    patternAware: true,
    lineageAware: true,
    reflexReady: true,
    memoryReady: true,
    deterministicImpulseFlow: true,
    unifiedAdvantageField: true,
    pulseRouter10Ready: true,
    degradationAware: true,
    routeAroundReady: true,
    routeDNAReady: true,
    futureEvolutionReady: true
  },

  // Contract alignment for OS‑v10
  pulseContract: "Pulse-v3",
  sendContract: "PulseSend-v3",
  meshContract: "PulseMesh-v3",
  gpuOrganContract: "PulseGPU-v10",
  earnCompatibility: "PulseEarn-v10"
};


// ============================================================================
//  INTERNAL HELPERS — tiny, deterministic, pure
// ============================================================================

// ⭐ Build a routing key from pattern + lineage depth (+ optional pageId)
function buildRouteKey(pulse) {
  const pattern = pulse.pattern || "";
  const depth = Array.isArray(pulse.lineage) ? pulse.lineage.length : 0;
  const pageId = pulse.pageId || "NO_PAGE";
  return `${pattern}::d${depth}::p${pageId}`;
}

// ⭐ Build a simple pattern ancestry (e.g., "gpu/insights/detail" → ["gpu","insights","detail"])
function buildPatternAncestry(pattern) {
  if (!pattern || typeof pattern !== "string") return [];
  return pattern.split("/").filter(Boolean);
}

// ⭐ Build a lineage signature (compressed representation of lineage array)
function buildLineageSignature(lineage) {
  if (!Array.isArray(lineage) || lineage.length === 0) return "NO_LINEAGE";
  return lineage.join(">");
}

// ⭐ Very small, deterministic organ hint from pattern
function inferOrganHint(pattern) {
  const p = (pattern || "").toLowerCase();

  if (p.includes("gpu")) return "GPU";
  if (p.includes("earn")) return "Earn";
  if (p.includes("os")) return "OS";
  if (p.includes("mesh")) return "Mesh";

  // Fallback: OS as safe default
  return "OS";
}

// ⭐ Default routing decision when no memory exists
function defaultRoute(pulse) {
  return inferOrganHint(pulse.pattern);
}

// ⭐ Degradation tier classification
//    • microDegrade     → 0.95–1.0
//    • softDegrade      → 0.85–0.95
//    • midDegrade       → 0.50–0.85
//    • hardDegrade      → 0.15–0.50
//    • criticalDegrade  → 0.00–0.15
function classifyDegradationTier(healthScore) {
  const h = typeof healthScore === "number" ? healthScore : 1.0;

  if (h >= 0.95) return "microDegrade";
  if (h >= 0.85) return "softDegrade";
  if (h >= 0.50) return "midDegrade";
  if (h >= 0.15) return "hardDegrade";
  return "criticalDegrade";
}

// ⭐ Map degradation tier to routing mode
//    • direct       → ideal route
//    • microBypass  → minor degradation, same organ
//    • softBypass   → moderate degradation, same organ
//    • midBypass    → heavier degradation, same organ
//    • hardBypass   → severe degradation, same organ
//    • routeAround  → route around this segment (fallback to OS)
function mapTierToMode(tier) {
  if (tier === "microDegrade") return "direct";
  if (tier === "softDegrade") return "microBypass";
  if (tier === "midDegrade") return "softBypass";
  if (tier === "hardDegrade") return "midBypass";
  return "routeAround"; // criticalDegrade
}


// ============================================================================
//  FACTORY — Create PulseRouter v10.1
// ============================================================================
//
//  Behavior:
//    • route(pulse) → returns targetOrgan (string)
//         pulse may include:
//           - pattern
//           - lineage
//           - pageId
//           - degraded (boolean)
//           - healthScore (0.0–1.0)
//           - nextPageCandidates (array of pageIds) [optional, for higher layers]
//           - previousPageId [optional]
//           - routeTrace [optional, for DNA annotation]
//    • remember(pulse, targetOrgan, outcome?, healthScore?) → stores reflex memory
//    • exportRouteDNA(routeKey) → returns route DNA snapshot
//
//  Memory model:
//    • internal map: routeKey → {
//          idealOrgan,        // best known organ for this pattern/lineage/page
//          currentOrgan,      // organ used under current degradation
//          successCount,
//          failureCount,
//          degraded,
//          healthScore,       // last observed healthScore
//          tier,              // degradation tier
//          mode,              // routing mode
//          patternAncestry,   // ["gpu","insights","detail"]
//          lineageSignature,  // "page>membrane>router"
//          degradationHistory,// array of { tier, mode, healthScore, outcome }
//          bypassHistory,     // array of { pageId, mode }
//          stabilityScore,    // 0.0–1.0, higher = more stable
//          healingScore       // 0.0–1.0, higher = more healed
//      }
//    • no randomness, no timestamps
// ============================================================================

export function createPulseRouter({ log } = {}) {
  const memory = {}; // routeKey → route DNA entry

  function ensureEntry(pulse, healthScore) {
    const key = buildRouteKey(pulse);
    let entry = memory[key];

    const patternAncestry = buildPatternAncestry(pulse.pattern);
    const lineageSignature = buildLineageSignature(pulse.lineage);
    const h = typeof healthScore === "number" ? healthScore : 1.0;
    const tier = classifyDegradationTier(h);
    const mode = mapTierToMode(tier);

    if (!entry) {
      const idealOrgan = defaultRoute(pulse);
      let currentOrgan = idealOrgan;

      if (mode === "routeAround") {
        currentOrgan = "OS";
      }

      entry = {
        idealOrgan,
        currentOrgan,
        successCount: 0,
        failureCount: 0,
        degraded: mode !== "direct",
        healthScore: h,
        tier,
        mode,
        patternAncestry,
        lineageSignature,
        degradationHistory: [],
        bypassHistory: [],
        stabilityScore: 0.5,
        healingScore: h
      };

      memory[key] = entry;
    } else {
      entry.patternAncestry = patternAncestry;
      entry.lineageSignature = lineageSignature;
      entry.healthScore = h;
      entry.tier = tier;
      entry.mode = mapTierToMode(tier);
      entry.degraded = entry.mode !== "direct";
    }

    return { key, entry };
  }

  function updateRoutingMode(entry) {
    if (entry.mode === "direct") {
      entry.currentOrgan = entry.idealOrgan;
    } else if (
      entry.mode === "microBypass" ||
      entry.mode === "softBypass" ||
      entry.mode === "midBypass" ||
      entry.mode === "hardBypass"
    ) {
      entry.currentOrgan = entry.currentOrgan || entry.idealOrgan;
    } else {
      entry.currentOrgan = "OS";
    }
  }

  function adjustStabilityAndHealing(entry, outcome) {
    if (outcome === "success") {
      entry.stabilityScore = Math.min(1.0, entry.stabilityScore + 0.05);
      entry.healingScore = Math.min(1.0, entry.healingScore + 0.1);
    } else if (outcome === "failure") {
      entry.stabilityScore = Math.max(0.0, entry.stabilityScore - 0.1);
      entry.healingScore = Math.max(0.0, entry.healingScore - 0.1);
    }

    if (entry.healingScore >= 0.99) {
      entry.mode = "direct";
      entry.tier = "microDegrade";
      entry.degraded = false;
      entry.currentOrgan = entry.idealOrgan;
      entry.bypassHistory = [];
    }
  }

  function route(pulse) {
    const incomingHealth =
      typeof pulse.healthScore === "number" ? pulse.healthScore : 1.0;
    const incomingDegraded = !!pulse.degraded;

    const { key, entry } = ensureEntry(pulse, incomingHealth);

    entry.degraded = incomingDegraded || entry.mode !== "direct";

    updateRoutingMode(entry);

    if (entry.mode !== "direct" && pulse.pageId) {
      entry.bypassHistory.push({
        pageId: pulse.pageId,
        mode: entry.mode
      });
    }

    const targetOrgan = entry.currentOrgan;

    log &&
      log("[PulseRouter-v10.1] Routing pulse", {
        jobId: pulse.jobId,
        pattern: pulse.pattern,
        pageId: pulse.pageId || "NO_PAGE",
        lineageDepth: Array.isArray(pulse.lineage) ? pulse.lineage.length : 0,
        routeKey: key,
        targetOrgan,
        mode: entry.mode,
        tier: entry.tier,
        degraded: entry.degraded,
        healthScore: entry.healthScore,
        stabilityScore: entry.stabilityScore,
        healingScore: entry.healingScore
      });

    return targetOrgan;
  }

  function remember(pulse, targetOrgan, outcome = "success", healthScore) {
    const { key, entry } = ensureEntry(pulse, healthScore);

    if (outcome === "success") {
      entry.successCount += 1;

      if (typeof healthScore === "number") {
        entry.healthScore = healthScore;
        entry.tier = classifyDegradationTier(healthScore);
        entry.mode = mapTierToMode(entry.tier);
        entry.degraded = entry.mode !== "direct";

        if (entry.mode === "direct") {
          entry.idealOrgan = targetOrgan;
          entry.currentOrgan = targetOrgan;
        } else if (
          entry.mode === "microBypass" ||
          entry.mode === "softBypass" ||
          entry.mode === "midBypass" ||
          entry.mode === "hardBypass"
        ) {
          entry.currentOrgan = targetOrgan;
        } else {
          entry.currentOrgan = "OS";
        }
      } else {
        entry.idealOrgan = targetOrgan;
        entry.currentOrgan = targetOrgan;
      }
    } else if (outcome === "failure") {
      entry.failureCount += 1;

      if (entry.failureCount > entry.successCount && targetOrgan !== "OS") {
        entry.degraded = true;
        entry.mode = "routeAround";
        entry.tier = "criticalDegrade";
        entry.currentOrgan = "OS";
      }
    }

    entry.degradationHistory.push({
      tier: entry.tier,
      mode: entry.mode,
      healthScore: entry.healthScore,
      outcome
    });

    adjustStabilityAndHealing(entry, outcome);

    memory[key] = entry;

    log &&
      log("[PulseRouter-v10.1] Remembering route", {
        jobId: pulse.jobId,
        pattern: pulse.pattern,
        pageId: pulse.pageId || "NO_PAGE",
        routeKey: key,
        idealOrgan: entry.idealOrgan,
        currentOrgan: entry.currentOrgan,
        mode: entry.mode,
        tier: entry.tier,
        degraded: entry.degraded,
        healthScore: entry.healthScore,
        stabilityScore: entry.stabilityScore,
        healingScore: entry.healingScore,
        successCount: entry.successCount,
        failureCount: entry.failureCount,
        outcome
      });

    return entry;
  }

  function exportRouteDNA(routeKey) {
    const entry = memory[routeKey];
    if (!entry) return null;

    return {
      idealOrgan: entry.idealOrgan,
      currentOrgan: entry.currentOrgan,
      patternAncestry: entry.patternAncestry,
      lineageSignature: entry.lineageSignature,
      degradationHistory: entry.degradationHistory.slice(),
      bypassHistory: entry.bypassHistory.slice(),
      stabilityScore: entry.stabilityScore,
      healingScore: entry.healingScore,
      tier: entry.tier,
      mode: entry.mode,
      degraded: entry.degraded,
      healthScore: entry.healthScore
    };
  }

  return {
    PulseRole,
    route,
    remember,
    exportRouteDNA
  };
}


// ============================================================================
//  ORGAN EXPORT — ⭐ PulseRouter (v10.1)
//  Provides BOTH:
//    • createPulseRouter() factory
//    • Unified organ object (PulseRouter) for Kernel/Understanding
// ============================================================================
export const PulseRouter = {
  PulseRole,

  route(...args) {
    throw new Error(
      "[PulseRouter-v10.1] PulseRouter.route() was called before initialization. " +
        "Use createPulseRouter(...) to wire dependencies."
    );
  },

  remember(...args) {
    throw new Error(
      "[PulseRouter-v10.1] PulseRouter.remember() was called before initialization. " +
        "Use createPulseRouter(...) to wire dependencies."
    );
  },

  exportRouteDNA(...args) {
    throw new Error(
      "[PulseRouter-v10.1] PulseRouter.exportRouteDNA() was called before initialization. " +
        "Use createPulseRouter(...) to wire dependencies."
    );
  }
};
