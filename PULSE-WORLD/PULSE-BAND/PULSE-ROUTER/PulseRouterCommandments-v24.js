// ============================================================================
// FILE: PulseRouterCommandments-v24.js
// PULSE ROUTER COMMANDMENTS — v24 IMMORTAL INTEL++ DUALHASH
// ----------------------------------------------------------------------------
// ROLE:
//   • Deterministic storage + retrieval of routing commandments keyed by
//     full route surface (routeId/tier/context/pattern/lineage/page/cosmos/binary).
//   • Cosmos / pattern / lineage / page / binary aware.
//   • DualHash INTEL route keys (intel + classic + combined) for diagnostics.
//   • Pure metadata organ: no routing, no IO, no randomness.
// ----------------------------------------------------------------------------
// SAFETY CONTRACT (IMMORTAL v24‑INTEL):
//   • No randomness, no timestamps, no async, no network, no filesystem.
//   • Deterministic‑field: identical input → identical output.
//   • Zero eval, zero dynamic imports, zero user code.
//   • No mutation of caller payloads; only internal store state.
// ============================================================================
import {
  OrganismIdentity,
  buildPulseOrganismMap as PulseOrganismMap,
  buildPulseOrganismMap as buildOrganismMap
} from "./PULSE-WORLD-MAP.js";
const Identity = OrganismIdentity(import.meta.url);

// 2 — EXPORT GENOME METADATA
// export const PulseMeshMeta = Identity.OrganMeta;
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
// export const WBC_CONTEXT = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

// ============================================================================
// HASH / INTEL HELPERS — v24 IMMORTAL INTEL
// ============================================================================
function computeHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `h${h}`;
}

function computeHashIntelligence(payload) {
  const base = JSON.stringify(payload || "");
  let h = 0;
  for (let i = 0; i < base.length; i++) {
    const c = base.charCodeAt(i);
    h = (h * 131 + c * (i + 7)) % 1000000007;
  }
  return `HINTEL_${h}`;
}

function buildDualHashSignature(label, intelPayload, classicString) {
  const intelBase = {
    label,
    intel: intelPayload || {},
    classic: classicString || ""
  };
  const intelHash = computeHashIntelligence(intelBase);
  const classicHash = computeHash(`${label}::${classicString || ""}`);
  const combined = computeHash(`${intelHash}::${classicHash}`);
  return {
    intel: intelHash,
    classic: classicHash,
    combined
  };
}

// ============================================================================
// COSMOS + ROUTE SURFACE HELPERS
// ============================================================================
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
  return `cx24-${h.toString(16)}`;
}

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

// ============================================================================
// BINARY SURFACE EXTRACTION
// ============================================================================
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

// ============================================================================
// ROUTE KEY — v24 DualHash INTEL
// ============================================================================
function computeDualHashRouteKey(rawShape) {
  const raw = JSON.stringify(rawShape);

  const intelPayload = {
    kind: "routerCommandmentsRouteKey",
    version: "v24-IMMORTAL-INTEL++-DualHash",
    shape: rawShape
  };

  const classicString = raw;
  const dual = buildDualHashSignature(
    "PULSE_ROUTER_COMMANDMENTS_ROUTE_KEY_v24",
    intelPayload,
    classicString
  );

  return {
    primary: dual.intel,
    secondary: dual.classic,
    combined: dual.combined
  };
}

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

// ============================================================================
// COMMANDMENTS NORMALIZATION
// ============================================================================
function normalizeCommandments(cmd = {}) {
  const out = {};
  for (const k of Object.keys(cmd)) {
    const v = cmd[k];
    if (v === undefined) continue;
    out[k] = v;
  }
  return out;
}

// ============================================================================
// HEALING METADATA — Commandments Health Log (v24 IMMORTAL INTEL++)
// ============================================================================
const commandmentsHealing = {
  cycleCount: 0,

  lastSetRouteKey: null,
  lastSetTierId: null,
  lastSetRouteId: null,

  lastGetRouteKey: null,
  lastGetHit: false,

  lastSnapshotSize: 0,

  lastSetSignatureIntel: null,
  lastSetSignatureClassic: null,

  lastSnapshotSignatureIntel: null,
  lastSnapshotSignatureClassic: null
};

export function getPulseRouterCommandmentsHealingState() {
  return { ...commandmentsHealing };
}

// ============================================================================
// COMMANDMENTS STORE — v24 IMMORTAL INTEL++
// ============================================================================
class PulseRouterCommandmentsStore {
  constructor() {
    this.entries = new Map();
    this.meta = { version: "24-IMMORTAL-INTEL++-DualHash" };
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
      meta: { version: "24-IMMORTAL-INTEL++-DualHash" }
    };

    this.entries.set(key, entry);

    // healing
    commandmentsHealing.cycleCount++;
    commandmentsHealing.lastSetRouteKey = key;
    commandmentsHealing.lastSetRouteId = entry.routeId;
    commandmentsHealing.lastSetTierId = entry.tierId;

    const intelPayload = {
      kind: "routerCommandmentsSet",
      version: "v24-IMMORTAL-INTEL++-DualHash",
      routeId: entry.routeId,
      tierId: entry.tierId,
      pattern: entry.pattern,
      lineageDepth: entry.lineage.length
    };

    const classicString =
      `SET:${entry.routeId}` +
      `::TIER:${entry.tierId}` +
      `::PAT:${entry.pattern}` +
      `::LIN:${entry.lineage.length}` +
      `::KEY:${key}`;

    const sig = buildDualHashSignature(
      "PULSE_ROUTER_COMMANDMENTS_SET_v24",
      intelPayload,
      classicString
    );

    commandmentsHealing.lastSetSignatureIntel = sig.intel;
    commandmentsHealing.lastSetSignatureClassic = sig.classic;

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

    commandmentsHealing.cycleCount++;
    commandmentsHealing.lastGetRouteKey = key;
    commandmentsHealing.lastGetHit = !!entry;

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
      meta: { version: "24-IMMORTAL-INTEL++-DualHash" }
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

    const size = Object.keys(out).length;
    commandmentsHealing.cycleCount++;
    commandmentsHealing.lastSnapshotSize = size;

    const intelPayload = {
      kind: "routerCommandmentsSnapshot",
      version: "v24-IMMORTAL-INTEL++-DualHash",
      size
    };

    const classicString =
      `SNAPSHOT::SIZE:${size}` +
      `::RAW:${computeHash(JSON.stringify(out || {}))}`;

    const sig = buildDualHashSignature(
      "PULSE_ROUTER_COMMANDMENTS_SNAPSHOT_v24",
      intelPayload,
      classicString
    );

    commandmentsHealing.lastSnapshotSignatureIntel = sig.intel;
    commandmentsHealing.lastSnapshotSignatureClassic = sig.classic;

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
        meta: { version: "24-IMMORTAL-INTEL++-DualHash" }
      };

      this.entries.set(safeEntry.key, safeEntry);
    });
  }
}

// ============================================================================
// PUBLIC WRAPPER — PulseRouterCommandments v24
// ============================================================================
class PulseRouterCommandments {
  constructor() {
    this.store = new PulseRouterCommandmentsStore();
    this.meta = {
      version: "v24-IMMORTAL-INTEL++-DualHash",
      identity: "PulseRouterCommandments-v24-IMMORTAL-INTEL++-DualHash",
      layer: "routing",
      role: "router_commandments_spine"
    };
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

  getMeta() {
    return { ...this.meta };
  }

  getHealingState() {
    return getPulseRouterCommandmentsHealingState();
  }
}

// ============================================================================
// EXPORTS
// ============================================================================
export {
  PulseRouterCommandments,
  PulseRouterCommandmentsStore,
  buildRouteKey,
  normalizeCommandments
};
