// ============================================================================
//  PulseRouterCommandmentsStore-v16-IMMORTAL-DualHash
//  Deterministic Commandment Memory for PulseRouter-v16 / BinaryRouter-v16
// ============================================================================
//
//  ROLE:
//    - Stores symbolic routing commandments across universes/timelines/branches.
//    - Deterministic ancestry signatures (pattern, lineage, page, cosmos).
//    - DualHash route keys for drift-proof lookup.
//    - Binary-surface extraction for dual-stack routing (symbolic + binary).
//    - Zero randomness, zero mutation, drift-proof.
//    - Reversible serialization.
// ============================================================================

/*
AI_EXPERIENCE_META = {
  identity: "PulseRouterCommandments",
  version: "v16-IMMORTAL-DualHash",
  layer: "frontend",
  role: "router_law",
  lineage: "PulseOS-v16",

  evo: {
    lawCore: true,
    deterministic: true,
    dualBand: true,
    presenceAware: true,
    chunkAligned: true,
    safeRouteFree: true,
    dualHashReady: true,
    binarySurfaceReady: true
  },

  contract: {
    always: [
      "PulseRouter",
      "PulseBinaryRouter",
      "PulseRouterEarn"
    ],
    never: [
      "legacyRouterLaw",
      "legacyRouter",
      "safeRoute",
      "fetchViaCNS"
    ]
  }
}
*/


// ------------------------------------------------------------
// COSMOS HELPERS
// ------------------------------------------------------------
function normalizeCosmos(cosmos = {}) {
  return {
    universeId: cosmos.universeId || "u:default",
    timelineId: cosmos.timelineId || "t:main",
    branchId: cosmos.branchId || "b:root"
  };
}

function cosmosSignature(cosmos) {
  const raw = `${cosmos.universeId}|${cosmos.timelineId}|${cosmos.branchId}`;
  let h = 0;
  for (let i = 0; i < raw.length; i++) {
    h = (h * 31 + raw.charCodeAt(i)) >>> 0;
  }
  return `cx${h.toString(16)}`;
}


// ------------------------------------------------------------
// HASH / DUALHASH HELPERS
// ------------------------------------------------------------
function hash131(raw) {
  let h = 0;
  const s = String(raw);
  for (let i = 0; i < s.length; i++) {
    h = (h * 131 + s.charCodeAt(i)) >>> 0;
  }
  return h >>> 0;
}

function hash257(raw) {
  let h = 1;
  const s = String(raw);
  for (let i = 0; i < s.length; i++) {
    h = (h * 257 + s.charCodeAt(i)) >>> 0;
  }
  return h >>> 0;
}

function computeDualHashRouteKey(rawShape) {
  const raw = JSON.stringify(rawShape);
  const h1 = hash131(raw);
  const h2 = hash257(raw);
  const combined = hash131(`${h1.toString(16)}::${h2.toString(16)}`);
  return {
    primary: `rk16-p${h1.toString(16)}`,
    secondary: `rk16-s${h2.toString(16)}`,
    combined: `rk16-c${combined.toString(16)}`
  };
}


// ------------------------------------------------------------
// ANCESTRY HELPERS
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
  const shape = {
    pattern: pattern || "",
    patternAncestry: buildPatternAncestry(pattern || ""),
    lineageSignature: buildLineageSignature(lineage || []),
    pageId: pageId || "NO_PAGE",
    cosmosSignature: cosmosSignature(cosmos)
  };

  const raw = JSON.stringify(shape);
  let hash = 0;
  for (let i = 0; i < raw.length; i++) {
    hash = (hash << 5) - hash + raw.charCodeAt(i);
    hash |= 0;
  }
  return (hash >>> 0).toString(16);
}


// ------------------------------------------------------------
// BINARY SURFACE (dual-stack)
// ------------------------------------------------------------
function extractBinarySurface(payload) {
  if (!payload || typeof payload !== "object") return {};
  const out = {};
  for (const k of Object.keys(payload)) {
    const v = payload[k];
    if (Array.isArray(v) && v.every(b => b === 0 || b === 1)) {
      out[k] = v.slice();
    }
  }
  return out;
}


// ------------------------------------------------------------
// ROUTE KEY (v16 IMMORTAL DualHash)
// ------------------------------------------------------------
function buildRouteKey({
  routeId,
  tierId,
  context,
  pattern,
  lineage,
  pageId,
  payload,
  cosmos
}) {
  const safePattern = typeof pattern === "string" ? pattern : "";
  const safeLineage = Array.isArray(lineage) ? lineage.slice() : [];
  const safePageId = pageId || "NO_PAGE";
  const cx = normalizeCosmos(cosmos || {});

  const shape = {
    routeId: String(routeId || "unknown-route"),
    tierId: String(tierId || "default"),
    context: context || {},
    pattern: safePattern,
    lineage: safeLineage,
    pageId: safePageId,
    cosmos: cx,
    binary: extractBinarySurface(payload)
  };

  const dualHash = computeDualHashRouteKey(shape);
  return {
    key: dualHash.combined,
    dualHash,
    shape
  };
}


// ------------------------------------------------------------
// NORMALIZATION (unchanged semantics, v16-stable)
// ------------------------------------------------------------
function normalizeCommandments(cmd = {}) {
  const out = {};
  for (const k of Object.keys(cmd)) {
    const v = cmd[k];
    if (v === undefined) continue;
    out[k] = v;
  }
  return out;
}


// ------------------------------------------------------------
// STORE — v16 IMMORTAL DualHash
// ------------------------------------------------------------
class PulseRouterCommandmentsStore {
  constructor() {
    this.entries = new Map();
    this.meta = { version: "16-IMMORTAL-DualHash" };
  }

  clear() {
    this.entries.clear();
  }

  setCommandments({
    routeId,
    tierId,
    context,
    commandments,
    pattern,
    lineage,
    pageId,
    payload,
    cosmos
  }) {
    const cx = normalizeCosmos(cosmos || {});
    const safePattern = typeof pattern === "string" ? pattern : "";
    const safeLineage = Array.isArray(lineage) ? lineage.slice() : [];
    const safePageId = pageId || "NO_PAGE";

    const binary = extractBinarySurface(payload);

    const patternAncestry = buildPatternAncestry(safePattern);
    const lineageSignature = buildLineageSignature(safeLineage);
    const pageAncestrySignature = buildPageAncestrySignature({
      pattern: safePattern,
      lineage: safeLineage,
      pageId: safePageId,
      cosmos: cx
    });

    const { key, dualHash } = buildRouteKey({
      routeId,
      tierId,
      context,
      pattern: safePattern,
      lineage: safeLineage,
      pageId: safePageId,
      payload,
      cosmos: cx
    });

    const normalized = normalizeCommandments(commandments);

    const entry = {
      key,
      dualHash,
      routeId: String(routeId || "unknown-route"),
      tierId: String(tierId || "default"),
      context: context || {},
      cosmos: cx,

      pattern: safePattern,
      patternAncestry,
      lineage: safeLineage,
      lineageSignature,
      pageId: safePageId,
      pageAncestrySignature,

      binary,
      commandments: normalized,
      meta: { version: "16-IMMORTAL-DualHash" }
    };

    this.entries.set(key, entry);
    return entry;
  }

  getCommandments({
    routeId,
    tierId,
    context,
    pattern,
    lineage,
    pageId,
    payload,
    cosmos
  }) {
    const cx = normalizeCosmos(cosmos || {});
    const safePattern = typeof pattern === "string" ? pattern : "";
    const safeLineage = Array.isArray(lineage) ? lineage.slice() : [];
    const safePageId = pageId || "NO_PAGE";

    const { key, dualHash } = buildRouteKey({
      routeId,
      tierId,
      context,
      pattern: safePattern,
      lineage: safeLineage,
      pageId: safePageId,
      payload,
      cosmos: cx
    });

    const entry = this.entries.get(key);
    if (entry) return entry;

    return {
      key,
      dualHash,
      routeId: String(routeId || "unknown-route"),
      tierId: String(tierId || "default"),
      context: context || {},
      cosmos: cx,

      pattern: safePattern,
      patternAncestry: buildPatternAncestry(safePattern),
      lineage: safeLineage,
      lineageSignature: buildLineageSignature(safeLineage),
      pageId: safePageId,
      pageAncestrySignature: buildPageAncestrySignature({
        pattern: safePattern,
        lineage: safeLineage,
        pageId: safePageId,
        cosmos: cx
      }),

      binary: extractBinarySurface(payload),
      commandments: normalizeCommandments({}),
      meta: { version: "16-IMMORTAL-DualHash" }
    };
  }

  getSnapshot() {
    const out = {};
    for (const [key, entry] of this.entries.entries()) {
      out[key] = {
        routeId: entry.routeId,
        tierId: entry.tierId,
        cosmos: { ...entry.cosmos },

        pattern: entry.pattern,
        patternAncestry: entry.patternAncestry.slice(),
        lineage: entry.lineage.slice(),
        lineageSignature: entry.lineageSignature,
        pageId: entry.pageId,
        pageAncestrySignature: entry.pageAncestrySignature,

        binary: { ...entry.binary },
        commandments: { ...entry.commandments },
        dualHash: { ...entry.dualHash }
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

      const patternAncestry =
        Array.isArray(entry.patternAncestry)
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

      const reconstructedShape = {
        routeId: entry.routeId || "unknown-route",
        tierId: entry.tierId || "default",
        context: entry.context || {},
        pattern: safePattern,
        lineage: safeLineage,
        pageId: safePageId,
        cosmos: cx,
        binary: entry.binary || {}
      };

      const dualHash =
        entry.dualHash && entry.dualHash.combined
          ? entry.dualHash
          : computeDualHashRouteKey(reconstructedShape);

      const safeEntry = {
        key: entry.key,
        dualHash,
        routeId: entry.routeId || "unknown-route",
        tierId: entry.tierId || "default",
        context: entry.context || {},
        cosmos: cx,

        pattern: safePattern,
        patternAncestry,
        lineage: safeLineage,
        lineageSignature,
        pageId: safePageId,
        pageAncestrySignature,

        binary: entry.binary || {},
        commandments: normalizeCommandments(entry.commandments || {}),
        meta: { version: "16-IMMORTAL-DualHash" }
      };

      this.entries.set(safeEntry.key, safeEntry);
    });
  }
}


// ------------------------------------------------------------
// PUBLIC API WRAPPER
// ------------------------------------------------------------
class PulseRouterCommandments {
  constructor() {
    this.store = new PulseRouterCommandmentsStore();
    this.meta = { version: "16-IMMORTAL-DualHash" };
  }

  setCommandments(payload) {
    return this.store.setCommandments(payload);
  }

  getCommandments(payload) {
    return this.store.getCommandments(payload);
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
  PulseRouterCommandments,
  buildRouteKey,
  normalizeCommandments
};
