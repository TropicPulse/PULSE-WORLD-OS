// ============================================================================
//  PulseNodeEvolution-v16.js
//  IMMORTAL-tier, shifter-first, sectional fallback evolution layer
//  - Sits ABOVE all nodes (NodeAdmin, Intellect, Reproduction, Mesh, Earn, etc.)
//  - Does NOT rewrite existing organs
//  - Upgrades pulses, manages shifter pools, and applies sectional fallback
// ============================================================================

/**
 * CONFIG CONTRACT (host system must provide):
 *
 * const evolutionLayer = createPulseNodeEvolutionV16({
 *   // Shifter pulse factories / evolvers
 *   createShifterPulse: (pulseCtx) => ShifterPulseObject,
 *   evolveShifterPulse: (shifterPulse, ctx) => ShifterPulseObject,
 *
 *   // Legacy / sectional handlers (per subsystem)
 *   handlers: {
 *     admin: {
 *       legacyUpgrade: (pulse, ctx) => upgradedPulse,
 *       supportsShifter: (ctx) => boolean
 *     },
 *     intellect: {
 *       legacyUpgrade: (pulse, ctx) => upgradedPulse,
 *       supportsShifter: (ctx) => boolean
 *     },
 *     reproduction: {
 *       legacyUpgrade: (pulse, ctx) => upgradedPulse,
 *       supportsShifter: (ctx) => boolean
 *     },
 *     mesh: { ... },
 *     earn: { ... },
 *     presence: { ... },
 *     worker: { ... },
 *     generic: {
 *       legacyUpgrade: (pulse, ctx) => upgradedPulse,
 *       supportsShifter: (ctx) => boolean
 *     }
 *   },
 *
 *   // Optional: capability / environment probes
 *   envCapabilities: {
 *     supportsShifterGlobally: () => boolean,
 *     supportsBinary: () => boolean,
 *     supportsPresence: () => boolean
 *   },
 *
 *   // Optional: logging / diagnostics
 *   log: (...args) => void
 * });
 *
 * Then use:
 *   const upgraded = evolutionLayer.evolveNodePulse({
 *     nodeType: "admin" | "intellect" | "reproduction" | "mesh" | "earn" | "presence" | "worker" | "generic",
 *     pulse,
 *     context
 *   });
 */

// ============================================================================
//  Utility: shallow clone
// ============================================================================
function clone(obj) {
  return obj && typeof obj === "object"
    ? JSON.parse(JSON.stringify(obj))
    : obj;
}

// ============================================================================
//  Shifter Pool (Party) — shared across all nodes
//  - Maintains a small pool of prewarmed shifter pulses
//  - Used as compute satellites for factoring/intelligence
// ============================================================================
function createShifterPool({
  createShifterPulse,
  evolveShifterPulse,
  poolSize = 5,
  log = () => {}
}) {
  const pool = [];

  function initPool(baseCtx = {}) {
    if (!createShifterPulse) return;
    for (let i = pool.length; i < poolSize; i++) {
      try {
        const shifter = createShifterPulse({
          pattern: "POOL::INIT",
          payload: {},
          mode: "normal",
          bandMode: "symbolic",
          ...baseCtx
        });
        if (shifter) pool.push(shifter);
      } catch (err) {
        log("[ShifterPool] init error:", err);
        break;
      }
    }
  }

  function refreshPool(ctx = {}) {
    if (!evolveShifterPulse || pool.length === 0) return;
    for (let i = 0; i < pool.length; i++) {
      try {
        pool[i] = evolveShifterPulse(pool[i], {
          routerHint: "POOL::REFRESH",
          meshHint: null,
          organHint: null,
          ...ctx
        });
      } catch (err) {
        log("[ShifterPool] refresh error:", err);
      }
    }
  }

  function getSatellites(count = 3) {
    if (pool.length === 0) return [];
    return pool.slice(0, Math.min(count, pool.length));
  }

  return {
    initPool,
    refreshPool,
    getSatellites
  };
}

// ============================================================================
//  Sectional Fallback Logic
//  - Shifter-first per section
//  - Sectional capability checks
//  - Legacy fallback per section
//  - Connectors on both sides (pre / post)
// ============================================================================

function createSectionalFallback({
  handlers,
  envCapabilities,
  createShifterPulse,
  evolveShifterPulse,
  shifterPool,
  log
}) {
  const caps = envCapabilities || {};
  const supportsShifterGlobally =
    caps.supportsShifterGlobally || (() => true);

  function getSectionHandler(nodeType) {
    return handlers[nodeType] || handlers.generic || {};
  }

  function sectionSupportsShifter(nodeType, ctx) {
    if (!supportsShifterGlobally()) return false;
    const h = getSectionHandler(nodeType);
    if (typeof h.supportsShifter === "function") {
      try {
        return !!h.supportsShifter(ctx);
      } catch (err) {
        log("[SectionalFallback] supportsShifter error:", nodeType, err);
        return false;
      }
    }
    return true; // default: yes
  }

  // Connector: pre-section (before shifter/legacy)
  function preSectionConnector({ nodeType, pulse, context }) {
    // This is where you can normalize, tag, or wrap pulses before evolution.
    // Keep it minimal and deterministic.
    const nextPulse = clone(pulse);
    nextPulse.meta = nextPulse.meta || {};
    nextPulse.meta.nodeType = nodeType;
    nextPulse.meta.evolutionLayer = "PulseNodeEvolution-v16";
    return nextPulse;
  }

  // Connector: post-section (after shifter/legacy)
  function postSectionConnector({ nodeType, pulse, context, sectionMeta }) {
    const nextPulse = clone(pulse);
    nextPulse.meta = nextPulse.meta || {};
    nextPulse.meta.sectionMeta = {
      ...(nextPulse.meta.sectionMeta || {}),
      [nodeType]: sectionMeta
    };
    return nextPulse;
  }

  // Shifter-first attempt for a section
  function tryShifterFirst({ nodeType, pulse, context }) {
    if (!createShifterPulse || !evolveShifterPulse) return null;
    if (!sectionSupportsShifter(nodeType, context)) return null;

    try {
      // Use satellites as “pets” to precompute intelligence if desired
      const satellites = shifterPool.getSatellites(3);
      let satelliteIntel = [];

      for (const sat of satellites) {
        try {
          const evolvedSat = evolveShifterPulse(sat, {
            routerHint: `NODE::${nodeType}`,
            meshHint: null,
            organHint: null,
            ...context
          });
          satelliteIntel.push({
            advantageField: evolvedSat.advantageField,
            healthScore: evolvedSat.healthScore,
            pulseCompute: evolvedSat.pulseCompute,
            pulseIntelligence: evolvedSat.pulseIntelligence,
            immortalMeta: evolvedSat.immortalMeta
          });
        } catch (err) {
          log("[SectionalFallback] satellite evolve error:", nodeType, err);
        }
      }

      // Create a shifter pulse specifically for this node/pulse
      const shifter = createShifterPulse({
        jobId: pulse.jobId || null,
        pattern: pulse.pattern || "UNKNOWN_PATTERN",
        payload: pulse.payload || {},
        priority: pulse.priority || "normal",
        returnTo: pulse.returnTo || null,
        parentLineage: pulse.lineage || null,
        mode: pulse.mode || "normal",
        pageId: pulse.pageId || "NO_PAGE",
        bandMode: pulse.bandMode || "symbolic",
        presenceBandState: pulse.presenceBandState || null,
        harmonicDrift: pulse.harmonicDrift || null,
        coherenceScore: pulse.coherenceScore || null,
        satellitesIntel: satelliteIntel
      });

      if (!shifter) return null;

      // Shifter is already a fully evolved IMMORTAL pulse organism
      return {
        pulse: shifter,
        meta: {
          mode: "shifter",
          nodeType,
          usedSatellites: satelliteIntel.length
        }
      };
    } catch (err) {
      log("[SectionalFallback] shifter-first error:", nodeType, err);
      return null;
    }
  }

  // Legacy fallback for a section
  function tryLegacySection({ nodeType, pulse, context }) {
    const h = getSectionHandler(nodeType);
    if (typeof h.legacyUpgrade !== "function") {
      // No legacy handler — return original pulse
      return {
        pulse,
        meta: {
          mode: "legacy-pass-through",
          nodeType
        }
      };
    }

    try {
      const upgraded = h.legacyUpgrade(pulse, context) || pulse;
      return {
        pulse: upgraded,
        meta: {
          mode: "legacy",
          nodeType
        }
      };
    } catch (err) {
      log("[SectionalFallback] legacy error:", nodeType, err);
      return {
        pulse,
        meta: {
          mode: "legacy-error-pass-through",
          nodeType,
          error: String(err)
        }
      };
    }
  }

  // Public: evolve a pulse for a given nodeType with sectional fallback
  function evolveNodePulse({ nodeType, pulse, context = {} }) {
    const pre = preSectionConnector({ nodeType, pulse, context });

    // 1) Try shifter-first for this section
    const shifterResult = tryShifterFirst({
      nodeType,
      pulse: pre,
      context
    });

    let chosen;
    if (shifterResult && shifterResult.pulse) {
      chosen = shifterResult;
    } else {
      // 2) Sectional legacy fallback
      const legacyResult = tryLegacySection({
        nodeType,
        pulse: pre,
        context
      });
      chosen = legacyResult;
    }

    // 3) Post-section connector
    const post = postSectionConnector({
      nodeType,
      pulse: chosen.pulse,
      context,
      sectionMeta: chosen.meta
    });

    return post;
  }

  return {
    evolveNodePulse,
    preSectionConnector,
    postSectionConnector
  };
}

// ============================================================================
//  Factory: createPulseNodeEvolutionV16
//  - Returns an object with evolveNodePulse()
//  - Intended to be used by ALL nodes (admin, intellect, reproduction, etc.)
// ============================================================================

export function createPulseNodeEvolutionV16(config) {
  const {
    createShifterPulse,
    evolveShifterPulse,
    handlers = {},
    envCapabilities = {},
    log = () => {},
    shifterPoolSize = 5
  } = config || {};

  // Global shifter pool shared across all nodes
  const shifterPool = createShifterPool({
    createShifterPulse,
    evolveShifterPulse,
    poolSize: shifterPoolSize,
    log
  });

  // Initialize pool once at startup
  shifterPool.initPool();

  // Sectional fallback engine
  const sectional = createSectionalFallback({
    handlers,
    envCapabilities,
    createShifterPulse,
    evolveShifterPulse,
    shifterPool,
    log
  });

  // Public API
  return {
    /**
     * Evolve a pulse for a given nodeType with shifter-first + sectional fallback.
     *
     * nodeType: "admin" | "intellect" | "reproduction" | "mesh" | "earn" | "presence" | "worker" | "generic"
     * pulse:    existing pulse object
     * context:  node-specific context (routerHint, meshHint, organHint, env, etc.)
     */
    evolveNodePulse({ nodeType, pulse, context = {} }) {
      return sectional.evolveNodePulse({ nodeType, pulse, context });
    },

    /**
     * Optional: allow host to manually refresh the shifter pool
     * (e.g., on tick, on page change, on presence shift).
     */
    refreshShifterPool(ctx = {}) {
      shifterPool.refreshPool(ctx);
    }
  };
}

// ============================================================================
//  Example minimal handler wiring (host-side, not part of the layer itself)
// ============================================================================
//
// import { createSymPulseV2, evolvePulseV2 } from "./SymPulseV2.js";
// import { createPulseNodeEvolutionV16 } from "./PulseNodeEvolution-v16.js";
//
// const evolutionLayer = createPulseNodeEvolutionV16({
//   createShifterPulse: createSymPulseV2,
//   evolveShifterPulse: evolvePulseV2,
//   handlers: {
//     admin: {
//       legacyUpgrade: (pulse, ctx) => pulse, // plug NodeAdmin legacy logic here
//       supportsShifter: (ctx) => true
//     },
//     intellect: {
//       legacyUpgrade: (pulse, ctx) => pulse, // plug NodeAdmin-Intellect legacy logic
//       supportsShifter: (ctx) => true
//     },
//     reproduction: {
//       legacyUpgrade: (pulse, ctx) => pulse, // plug Reproduction legacy logic
//       supportsShifter: (ctx) => true
//     },
//     generic: {
//       legacyUpgrade: (pulse, ctx) => pulse,
//       supportsShifter: (ctx) => true
//     }
//   },
//   envCapabilities: {
//     supportsShifterGlobally: () => true
//   },
//   log: (...args) => console.log("[PulseNodeEvolution-v16]", ...args)
// });
//
// // Usage inside any node:
// const upgradedPulse = evolutionLayer.evolveNodePulse({
//   nodeType: "admin",
//   pulse,
//   context: { routerHint: "ADMIN", meshHint: null, organHint: null }
// });
//
// ============================================================================
//  End of PulseNodeEvolution-v16.js
// ============================================================================
