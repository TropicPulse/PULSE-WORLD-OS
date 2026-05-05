// ============================================================================
//  PULSE ROUTER EVOLUTIONARY INSTINCTS v16‑IMMORTAL‑CORE‑DUALSTACK
//  Adaptive Routing Identity • Genetic Route Memory • Best‑Path Preservation
//  Symbolic + Binary + Presence + CacheChunk + Cosmos Ancestry • Deterministic • Drift‑Proof
//  FULL ORGAN — Context, Helpers, Hashing, Scoring, Advantage, Store, Wrapper, Exports
// ============================================================================
//
//  ROLE:
//    • Stores evolutionary routing memory (success/failure/degrade).
//    • Symbolic + Binary + Presence + CacheChunk + Cosmos dual‑stack ancestry.
//    • Deterministic scoring + regression detection + advantage field.
//    • Loop‑Theory‑Aware.
//    • Pure memory organ — NO routing, NO compute, NO mutation outside instance.
//
// ============================================================================

/*
AI_EXPERIENCE_META = {
  identity: "PulseRouterEvolutionaryInstincts",
  version: "v16.0-IMMORTAL-INSTINCTS",
  layer: "frontend",
  role: "router_evolutionary_memory",
  lineage: "PulseOS-v16-IMMORTAL",

  evo: {
    instinctCore: true,
    deterministic: true,
    dualBand: true,
    presenceAware: true,
    chunkAligned: true,
    safeRouteFree: true,
    reflexMemory: true,
    ancestryAware: true,
    cosmosAware: true,
    cacheChunkAware: true,
    prewarmAware: true,
    advantageFieldAware: true,
    intelDualHashAware: true,
    triHashAware: true,
    driftProof: true,
    snapshotReady: true
  },

  contract: {
    always: [
      "PulseRouter",
      "PulseBinaryRouter",
      "PulseRouterEvolutionaryDesign",
      "PulseRouterEvolutionaryThought",
      "PulseRouterCommandments"
    ],
    never: [
      "legacyRouterInstincts",
      "legacyRouter",
      "safeRoute",
      "fetchViaCNS"
    ]
  }
}
*/


// ------------------------------------------------------------
// v16‑IMMORTAL CONTEXT METADATA — Router Evolution Identity
// ------------------------------------------------------------
const ROUTER_EVOLUTION_CONTEXT_V16 = {
  layer: "PulseRouterEvolutionaryInstincts",
  role: "ROUTER_EVOLUTION_CORE",
  purpose: "Adaptive routing identity + genetic memory for symbolic + binary routes",
  context:
    "Stores best-known routes, lineage, stability, regression, binary + presence + cache + cosmos ancestry",
  target: "dual-stack-router",
  version: "16.0-IMMORTAL",
  selfRepairable: true,

  evo: {
    advantageCascadeAware: true,
    pulseEfficiencyAware: true,
    driftProof: true,
    multiInstanceReady: true,
    unifiedAdvantageField: true,
    pulseSend11Ready: true,

    routingContract: "PulseSend-v11",
    routerOrganContract: "PulseRouter-v11",
    earnCompatibility: "Earn-v3",

    binaryAware: true,
    presenceAware: true,
    cacheChunkAware: true,
    prewarmAware: true,
    cosmosAware: true
  },

  loopTheory: {
    routingCompletion: true,
    allowLoopfieldPropulsion: true,
    pulseComputeContinuity: true,
    errorRouteAround: true
  }
};


// ------------------------------------------------------------
// COSMOS HELPERS — v16 IMMORTAL
// ------------------------------------------------------------
function normalizeCosmos(cosmos = {}) {
  return {
    universeId: cosmos.universeId || "u:default",
    timelineId: cosmos.timelineId || "t:main",
    branchId: cosmos.branchId || "b:root",
    worldId: cosmos.worldId || "w:primary",
    shardId: cosmos.shardId || "s:0"
  };
}

function cosmosSignature(cosmos) {
  const raw = `${cosmos.universeId}|${cosmos.timelineId}|${cosmos.branchId}|${cosmos.worldId}|${cosmos.shardId}`;
  let h = 0;
  for (let i = 0; i < raw.length; i++) {
    h = (h * 31 + raw.charCodeAt(i)) >>> 0;
  }
  return `cx16-${h.toString(16)}`;
}


// ------------------------------------------------------------
// Utility: stable JSON stringify
// ------------------------------------------------------------
function stableStringify(value) {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return "[" + value.map(stableStringify).join(",") + "]";
  const keys = Object.keys(value).sort();
  return "{" + keys.map(k => JSON.stringify(k) + ":" + stableStringify(value[k])).join(",") + "}";
}


// ------------------------------------------------------------
// Utility: deterministic hash (32‑bit hex)
// ------------------------------------------------------------
function simpleHash32(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return (hash >>> 0) >>> 0;
}

function simpleHash(str) {
  return simpleHash32(str).toString(16);
}


// ------------------------------------------------------------
// IntelDualHash + TriHash — v16 Route Fingerprints
// ------------------------------------------------------------
function intelDualHash(shape) {
  const raw = stableStringify(shape || {});
  const mid = Math.floor(raw.length / 2);

  const left = raw.slice(0, mid);
  const right = raw.slice(mid);

  const h1 = simpleHash32(left);
  const h2 = simpleHash32(right);

  const hi = (BigInt(h1) << 32n) | BigInt(h2);
  const lo = BigInt(simpleHash32(raw));

  const combined = (hi ^ (lo << 1n)) & ((1n << 96n) - 1n);

  const hiHex = hi.toString(16);
  const loHex = combined.toString(16);

  return {
    primary: `idh16-${hiHex}`,
    secondary: `idh16s-${loHex}`,
    hi,
    lo
  };
}

function triHash(shape) {
  const raw = stableStringify(shape || {});
  const len = raw.length || 1;
  const third = Math.floor(len / 3);

  const a = raw.slice(0, third);
  const b = raw.slice(third, 2 * third);
  const c = raw.slice(2 * third);

  const hA = simpleHash32(a);
  const hB = simpleHash32(b);
  const hC = simpleHash32(c);

  const hi = (BigInt(hA) << 32n) | BigInt(hB);
  const mid = BigInt(hC);
  const lo = BigInt(simpleHash32(raw));

  const combined = (hi ^ (mid << 16n) ^ (lo << 1n)) & ((1n << 112n) - 1n);

  return {
    triPrimary: `th16-${combined.toString(16)}`,
    hi,
    mid,
    lo
  };
}


// ------------------------------------------------------------
// Symbolic ancestry helpers
// ------------------------------------------------------------
function buildPatternAncestry(pattern) {
  if (!pattern || typeof pattern !== "string") return [];
  return pattern.split("/").filter(Boolean);
}

function buildLineageSignature(lineage) {
  if (!Array.isArray(lineage) || lineage.length === 0) return "NO_LINEAGE";
  return lineage.join(">");
}

function buildPageAncestrySignature({ pattern, lineage, pageId, cosmos }) {
  const safePattern = typeof pattern === "string" ? pattern : "";
  const safeLineage = Array.isArray(lineage) ? lineage : [];
  const safePageId = pageId || "NO_PAGE";

  const shape = {
    pattern: safePattern,
    patternAncestry: buildPatternAncestry(safePattern),
    lineageSignature: buildLineageSignature(safeLineage),
    pageId: safePageId,
    cosmosSignature: cosmosSignature(cosmos)
  };

  return simpleHash(stableStringify(shape));
}


// ------------------------------------------------------------
// Binary ancestry helpers (optional)
// ------------------------------------------------------------
function extractBinarySurface(payload = {}) {
  const binaryPattern  = payload.binaryPattern || null;
  const binaryMode     = payload.binaryMode || null;
  const binaryPayload  = payload.binaryPayload || null;
  const binaryHints    = payload.binaryHints || null;
  const binaryStrength = typeof payload.binaryStrength === "number"
    ? payload.binaryStrength
    : null;

  const hasBinary =
    !!binaryPattern ||
    !!binaryMode ||
    !!binaryPayload ||
    !!binaryHints ||
    binaryStrength !== null;

  return {
    hasBinary,
    binaryPattern,
    binaryMode,
    binaryPayload,
    binaryHints,
    binaryStrength
  };
}


// ------------------------------------------------------------
// Presence / multi‑presence helpers
// ------------------------------------------------------------
function extractPresenceSurface(payload = {}) {
  const instanceId      = payload.instanceId || null;
  const presenceId      = payload.presenceId || null;
  const presenceRole    = payload.presenceRole || null;
  const presenceGroupId = payload.presenceGroupId || null;
  const regionId        = payload.regionId || null;
  const hostName        = payload.hostName || null;

  const hasPresence =
    !!instanceId ||
    !!presenceId ||
    !!presenceRole ||
    !!presenceGroupId ||
    !!regionId ||
    !!hostName;

  return {
    hasPresence,
    instanceId,
    presenceId,
    presenceRole,
    presenceGroupId,
    regionId,
    hostName
  };
}


// ------------------------------------------------------------
// CacheChunk / prewarm helpers
// ------------------------------------------------------------
function extractCacheChunkSurface(payload = {}) {
  const cacheChunkId   = payload.cacheChunkId || null;
  const cacheTier      = payload.cacheTier || null;
  const prewarmKey     = payload.prewarmKey || null;
  const prewarmHint    = payload.prewarmHint || null;
  const cacheStrategy  = payload.cacheStrategy || null;
  const advantageField = payload.advantageField || null;

  const hasCacheChunk =
    !!cacheChunkId ||
    !!cacheTier ||
    !!prewarmKey ||
    !!prewarmHint ||
    !!cacheStrategy ||
    advantageField !== null;

  return {
    hasCacheChunk,
    cacheChunkId,
    cacheTier,
    prewarmKey,
    prewarmHint,
    cacheStrategy,
    advantageField
  };
}


// ------------------------------------------------------------
// Route hash — Genetic Route Fingerprint (Symbolic + Binary + Presence + Cache + Cosmos)
// ------------------------------------------------------------
function computeRouteHash(routeShape, payload = {}, cosmos = {}) {
  const binary   = extractBinarySurface(payload);
  const presence = extractPresenceSurface(payload);
  const cache    = extractCacheChunkSurface(payload);
  const cx       = normalizeCosmos(cosmos);

  const base = {
    routeShape,
    binary,
    presence,
    cache,
    cosmos: cx
  };

  return simpleHash(stableStringify(base));
}

function computeRouteDualHash(routeShape, payload = {}, cosmos = {}) {
  const binary   = extractBinarySurface(payload);
  const presence = extractPresenceSurface(payload);
  const cache    = extractCacheChunkSurface(payload);
  const cx       = normalizeCosmos(cosmos);

  const base = {
    routeShape,
    binary,
    presence,
    cache,
    cosmos: cx
  };

  return intelDualHash(base);
}

function computeRouteTriHash(routeShape, payload = {}, cosmos = {}) {
  const binary   = extractBinarySurface(payload);
  const presence = extractPresenceSurface(payload);
  const cache    = extractCacheChunkSurface(payload);
  const cx       = normalizeCosmos(cosmos);

  const base = {
    routeShape,
    binary,
    presence,
    cache,
    cosmos: cx
  };

  return triHash(base);
}


// ------------------------------------------------------------
// Route scoring — Evolutionary Fitness Score
// ------------------------------------------------------------
function clamp(value, min, max) {
  if (typeof value !== "number" || Number.isNaN(value)) return min;
  return Math.max(min, Math.min(max, value));
}

function scoreRoute(routeStats = {}) {
  const {
    successCount = 0,
    failureCount = 0,
    degradationEvents = 0
  } = routeStats;

  const s = clamp(successCount, 0, 100000);
  const f = clamp(failureCount, 0, 100000);
  const d = clamp(degradationEvents, 0, 100000);

  return clamp(s * 1.0 - f * 0.8 - d * 0.5, 0, 100000);
}


// ------------------------------------------------------------
// Regression detection — Evolutionary Delta
// ------------------------------------------------------------
function detectRegression(currentStats, baselineStats) {
  const currentScore = scoreRoute(currentStats);
  const baselineScore = scoreRoute(baselineStats);
  if (baselineScore === 0) return 0;
  return ((currentScore - baselineScore) / baselineScore) * 100;
}


// ------------------------------------------------------------
// Degradation tier helper
// ------------------------------------------------------------
function classifyDegradationTier(healthScore) {
  const h = typeof healthScore === "number" ? healthScore : 1.0;
  if (h >= 0.95) return "microDegrade";
  if (h >= 0.85) return "softDegrade";
  if (h >= 0.50) return "midDegrade";
  if (h >= 0.15) return "hardDegrade";
  return "criticalDegrade";
}


// ------------------------------------------------------------
// Advantage field — unified instinct advantage v4
// ------------------------------------------------------------
function clamp01(v) {
  if (typeof v !== "number" || Number.isNaN(v)) return 0;
  if (v < 0) return 0;
  if (v > 1) return 1;
  return v;
}

function computeInstinctAdvantageField({
  healthScore,
  routeScore,
  regressionDelta,
  binarySurface,
  presenceSurface,
  cacheSurface,
  cosmos
}) {
  const h = typeof healthScore === "number" ? clamp01(healthScore) : 1.0;
  const rs = typeof routeScore === "number"
    ? clamp01(routeScore / 100000)
    : 0.5;

  const reg = typeof regressionDelta === "number"
    ? clamp01(1 - Math.max(-100, Math.min(100, regressionDelta)) / 200)
    : 0.8;

  const b = binarySurface && binarySurface.hasBinary ? 0.8 : 0.5;
  const p = presenceSurface && presenceSurface.hasPresence ? 0.8 : 0.5;
  const c = cacheSurface && cacheSurface.hasCacheChunk ? 0.8 : 0.5;

  const cx = normalizeCosmos(cosmos || {});
  const cosmosStability = cx.universeId === "u:default" ? 0.9 : 0.8;

  const base = h * 0.35 + rs * 0.25 + reg * 0.2 + cosmosStability * 0.2;
  const envBoost = (b + p + c) / 3;

  const adv = base * 0.75 + envBoost * 0.25;
  return clamp01(adv);
}


// ------------------------------------------------------------
// Memory entry model — Evolutionary Route Record (DualStack + Presence + Cache + Cosmos)
// ------------------------------------------------------------
class PulseRouterEvolutionaryStore {
  constructor() {
    this.entries = new Map();
    this.meta = { ...ROUTER_EVOLUTION_CONTEXT_V16 };
  }

  clear() {
    this.entries.clear();
  }

  recordRoute({
    routeShape,
    routeStats,
    healthScore,
    pattern,
    lineage,
    pageId,
    payload,
    cosmos
  }) {
    const cx = normalizeCosmos(cosmos || {});
    const routeHash = computeRouteHash(routeShape, payload || {}, cx);
    const routeDualHash = computeRouteDualHash(routeShape, payload || {}, cx);
    const routeTriHash = computeRouteTriHash(routeShape, payload || {}, cx);
    const score = scoreRoute(routeStats);

    const existing = this.entries.get(routeHash);

    const safePattern = typeof pattern === "string" ? pattern : "";
    const safeLineage = Array.isArray(lineage) ? lineage.slice() : [];
    const safePageId = pageId || "NO_PAGE";
    const safeHealth = typeof healthScore === "number" ? healthScore : 1.0;
    const tier = classifyDegradationTier(safeHealth);

    const patternAncestry = buildPatternAncestry(safePattern);
    const lineageSignature = buildLineageSignature(safeLineage);
    const pageAncestrySignature = buildPageAncestrySignature({
      pattern: safePattern,
      lineage: safeLineage,
      pageId: safePageId,
      cosmos: cx
    });

    const binary   = extractBinarySurface(payload || {});
    const presence = extractPresenceSurface(payload || {});
    const cache    = extractCacheChunkSurface(payload || {});

    const loopTheory = {
      routingCompletion: true,
      allowLoopfieldPropulsion: true,
      pulseComputeContinuity: true,
      errorRouteAround: true
    };

    const baselineStats = existing ? existing.bestStats || {} : routeStats || {};
    const regressionDelta = detectRegression(routeStats || {}, baselineStats);

    const advantageField = computeInstinctAdvantageField({
      healthScore: safeHealth,
      routeScore: score,
      regressionDelta,
      binarySurface: binary,
      presenceSurface: presence,
      cacheSurface: cache,
      cosmos: cx
    });

    const baseEntry = {
      key: routeHash,
      routeShape: routeShape || {},
      bestStats: routeStats || {},
      bestScore: score,

      pattern: safePattern,
      patternAncestry,
      lineage: safeLineage,
      lineageSignature,
      pageId: safePageId,
      pageAncestrySignature,

      binary,
      presence,
      cache,

      cosmos: cx,
      cosmosSignature: cosmosSignature(cx),

      healthScore: safeHealth,
      tier,
      advantageField,
      routeDualHash,
      routeTriHash,

      loopTheory,
      meta: { ...ROUTER_EVOLUTION_CONTEXT_V16 }
    };

    if (!existing || score > existing.bestScore) {
      this.entries.set(routeHash, baseEntry);
    } else {
      const merged = {
        ...existing,

        routeShape: routeShape || existing.routeShape,
        bestStats: routeStats || existing.bestStats,
        bestScore: score > existing.bestScore ? score : existing.bestScore,

        pattern: safePattern || existing.pattern,
        patternAncestry: patternAncestry.length
          ? patternAncestry
          : existing.patternAncestry,

        lineage: safeLineage.length ? safeLineage : existing.lineage,
        lineageSignature: lineageSignature || existing.lineageSignature,

        pageId: safePageId || existing.pageId,
        pageAncestrySignature:
          pageAncestrySignature || existing.pageAncestrySignature,

        binary,
        presence,
        cache,

        cosmos: cx,
        cosmosSignature: cosmosSignature(cx),

        healthScore: safeHealth,
        tier,
        advantageField,
        routeDualHash,
        routeTriHash,

        loopTheory
      };

      this.entries.set(routeHash, merged);
    }

    return this.entries.get(routeHash);
  }

  getBestRoute(routeShape, payload = {}, cosmos = {}) {
    const cx = normalizeCosmos(cosmos || {});
    const routeHash = computeRouteHash(routeShape, payload || {}, cx);
    return this.entries.get(routeHash) || null;
  }

  getSnapshot() {
    const out = {};
    for (const [key, entry] of this.entries.entries()) {
      out[key] = {
        key: entry.key,
        routeShape: entry.routeShape,
        bestScore: entry.bestScore,
        bestStats: entry.bestStats,

        pattern: entry.pattern,
        patternAncestry: entry.patternAncestry.slice(),
        lineage: entry.lineage.slice(),
        lineageSignature: entry.lineageSignature,
        pageId: entry.pageId,
        pageAncestrySignature: entry.pageAncestrySignature,

        binary: { ...entry.binary },
        presence: { ...entry.presence },
        cache: { ...entry.cache },

        cosmos: { ...entry.cosmos },
        cosmosSignature: entry.cosmosSignature,

        healthScore: entry.healthScore,
        tier: entry.tier,
        advantageField: entry.advantageField,
        routeDualHash: entry.routeDualHash,
        routeTriHash: entry.routeTriHash,

        loopTheory: { ...entry.loopTheory }
      };
    }
    return out;
  }

  serialize() {
    return JSON.stringify([...this.entries.values()]);
  }

  deserialize(jsonString) {
    this.entries.clear();
    if (!jsonString) return;

    let arr;
    try {
      arr = JSON.parse(jsonString);
    } catch {
      return;
    }

    if (!Array.isArray(arr)) return;

    arr.forEach((entry) => {
      if (!entry || typeof entry !== "object" || !entry.key) return;

      const cx = normalizeCosmos(entry.cosmos || {});
      const safePattern = typeof entry.pattern === "string" ? entry.pattern : "";
      const safeLineage = Array.isArray(entry.lineage)
        ? entry.lineage.slice()
        : [];
      const safePageId = entry.pageId || "NO_PAGE";

      const patternAncestry = Array.isArray(entry.patternAncestry)
        ? entry.patternAncestry.slice()
        : buildPatternAncestry(safePattern);

      const lineageSignature =
        typeof entry.lineageSignature === "string"
          ? entry.lineageSignature
          : buildLineageSignature(safeLineage);

      const pageAncestrySignature =
        typeof entry.pageAncestrySignature === "string"
          ? entry.pageAncestrySignature
          : buildPageAncestrySignature({
              pattern: safePattern,
              lineage: safeLineage,
              pageId: safePageId,
              cosmos: cx
            });

      const binary =
        entry.binary && typeof entry.binary === "object"
          ? entry.binary
          : extractBinarySurface({});

      const presence =
        entry.presence && typeof entry.presence === "object"
          ? entry.presence
          : extractPresenceSurface({});

      const cache =
        entry.cache && typeof entry.cache === "object"
          ? entry.cache
          : extractCacheChunkSurface({});

      const healthScore =
        typeof entry.healthScore === "number" ? entry.healthScore : 1.0;

      const bestStats = entry.bestStats || {};
      const bestScore =
        typeof entry.bestScore === "number" ? entry.bestScore : 0;

      const regressionDelta = 0;

      const advantageField =
        typeof entry.advantageField === "number"
          ? clamp01(entry.advantageField)
          : computeInstinctAdvantageField({
              healthScore,
              routeScore: bestScore,
              regressionDelta,
              binarySurface: binary,
              presenceSurface: presence,
              cacheSurface: cache,
              cosmos: cx
            });

      const routeDualHash =
        entry.routeDualHash ||
        computeRouteDualHash(entry.routeShape || {}, entry.payload || {}, cx);

      const routeTriHash =
        entry.routeTriHash ||
        computeRouteTriHash(entry.routeShape || {}, entry.payload || {}, cx);

      const safeEntry = {
        key: entry.key,
        routeShape: entry.routeShape || {},
        bestStats,
        bestScore,

        pattern: safePattern,
        patternAncestry,
        lineage: safeLineage,
        lineageSignature,
        pageId: safePageId,
        pageAncestrySignature,

        binary,
        presence,
        cache,

        cosmos: cx,
        cosmosSignature: cosmosSignature(cx),

        healthScore,
        tier: classifyDegradationTier(healthScore),
        advantageField,
        routeDualHash,
        routeTriHash,

        loopTheory: {
          routingCompletion: true,
          allowLoopfieldPropulsion: true,
          pulseComputeContinuity: true,
          errorRouteAround: true
        },

        meta: { ...ROUTER_EVOLUTION_CONTEXT_V16 }
      };

      this.entries.set(safeEntry.key, safeEntry);
    });
  }
}


// ------------------------------------------------------------
// Public API wrapper — Evolution Core Surface v16 IMMORTAL
// ------------------------------------------------------------
class PulseRouterEvolutionaryInstincts {
  constructor() {
    this.store = new PulseRouterEvolutionaryStore();
    this.meta = { ...ROUTER_EVOLUTION_CONTEXT_V16 };
  }

  recordRoute(route) {
    return this.store.recordRoute(route);
  }

  getBestRoute(routeShape, payload, cosmos) {
    return this.store.getBestRoute(routeShape, payload, cosmos);
  }

  detectRegression(currentStats, baselineStats) {
    return detectRegression(currentStats, baselineStats);
  }

  scoreRoute(stats) {
    return scoreRoute(stats);
  }

  getSnapshot() {
    return this.store.getSnapshot();
  }

  serialize() {
    return this.store.serialize();
  }

  deserialize(jsonString) {
    this.store.deserialize(jsonString);
  }

  clear() {
    this.store.clear();
  }
}


// ------------------------------------------------------------
// EXPORTS
// ------------------------------------------------------------
export {
  // Core organ
  PulseRouterEvolutionaryInstincts,
  PulseRouterEvolutionaryStore,

  // Hash / scoring / advantage
  computeRouteHash,
  computeRouteDualHash,
  computeRouteTriHash,
  scoreRoute,
  detectRegression,
  classifyDegradationTier,
  computeInstinctAdvantageField,

  // Ancestry / surfaces / cosmos
  buildPatternAncestry,
  buildLineageSignature,
  buildPageAncestrySignature,
  extractBinarySurface,
  extractPresenceSurface,
  extractCacheChunkSurface,
  normalizeCosmos,
  cosmosSignature,

  // Hash helpers
  intelDualHash,
  triHash
};
