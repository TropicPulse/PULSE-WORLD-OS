/*
===============================================================================
FILE: /PULSE-UI/PulseRouteMemory-v24.js
LAYER: REFLEX MEMORY ORGAN • v24-IMMORTAL++
===============================================================================
*/

import PulseUIErrors from "../_MONITOR/PULSE-PROOF-ERRORS.js";

// ============================================================================
//  IMMORTAL++: NO DIRECT BRIDGE IMPORTS — ALWAYS USE GLOBAL BRIDGE
// ============================================================================

const G =
  (typeof window !== "undefined" && window) ||
  (typeof globalThis !== "undefined" && globalThis) ||
  (typeof self !== "undefined" && self) ||
  (typeof global !== "undefined" && global) ||
  {};
const g = G;
// ============================================================================
// UNIVERSAL TIMESTAMP (Shadow or Admin)
// ============================================================================

const Timestamp =
  (G.firebaseAdmin && G.firebaseAdmin.firestore && G.firebaseAdmin.firestore.Timestamp) ||
  (G.Timestamp && G.Timestamp) ||
  null;

// ============================================================================
// UNIVERSAL ADMIN (Shadow or Admin)
// ============================================================================

const admin =
  (G.firebaseAdmin && G.firebaseAdmin) ||
  (G.admin && G.admin) ||
  null;

// ============================================================================
// UNIVERSAL DB (Shadow DB ALWAYS wins)
// ============================================================================
const db =
  (G.db && G.db) ||                 // Shadow DB (v25++)
  (admin && admin.firestore && admin.firestore()) || // Admin fallback
  null;

// ============================================================================
// UNIVERSAL LOGGING
// ============================================================================

const dblog =
  (G.log && G.log) ||
  console.log;

const dberror =
  (G.error && G.error) ||
  console.error;
  
const fetchFn =
  (G.fetchfn && typeof G.fetchfn === "function" && G.fetchfn) ||   // Shadow fetch alias
  (G.fetch && typeof G.fetch === "function" && G.fetch) ||         // Global broadcasted Shadow.fetch
  null;

// ============================================================================
//  IMMORTAL++ BRIDGE RESOLUTION — NEVER IMPORT, NEVER TDZ
// ============================================================================

function getBridge() {
  try {
    return g.PulseProofBridge || null;
  } catch {
    return null;
  }
}

function getCoreMemory() {
  const b = getBridge();
  return b?.coreMemory || null;
}

function getDiagnosticsBus() {
  const b = getBridge();
  return b?.diagnosticsBus || null;
}

function getEvidenceBus() {
  const b = getBridge();
  return b?.evidenceBus || null;
}

// ============================================================================
//  v24 IMMORTAL++ METADATA
// ============================================================================

const ROUTE_MEMORY_SCHEMA_VERSION = "24.0";

export const RouteMemoryRole = {
  type: "Organ",
  subsystem: "UI",
  layer: "RouteMemory",
  version: "24.0-IMMORTAL++",
  identity: "PulseRouteMemory-v24",

  evo: {
    driftProof: true,
    deterministic: true,
    reflexMemory: true,
    degradationAware: true,
    binaryShadowAware: true,
    routeTraceAware: true,
    coreMemoryAware: true,
    routeAware: true,
    lineageAware: true,
    unifiedAdvantageField: true,
    tierAware: true,
    channelAware: true,
    futureEvolutionReady: true,

    dualBand: true,
    binaryAware: true,
    symbolicAware: true,

    // IMMORTAL OFFLINE SURFACE
    offlineFirst: true,
    localStoreMirrored: true,
    replayAware: true,

    // v24 IMMORTAL ENVELOPE
    schemaVersioned: true,
    envelopeAware: true,
    integrityAware: true,
    bulkFlushAware: true,
    evidenceAware: true,
    diagnosticsAware: true,
    portalAware: true,
    touchAware: true,
    uiFlowAware: true,
    errorSpineAware: true,
    overmindAware: true,
    governorAware: true,
    timeAxisAware: true,
    sessionAware: true,
    multiMindAware: true
  }
};

// ---------------------------------------------------------------------------
// ERROR NORMALIZATION
// ---------------------------------------------------------------------------

function safeNormalizeError(err, origin) {
  try {
    const packet = PulseUIErrors.normalizeError(err, origin);
    PulseUIErrors.broadcast(packet);
  } catch {}
}

// ---------------------------------------------------------------------------
// DETERMINISTIC HASH (dnaTag / key)
// ---------------------------------------------------------------------------

function rmHashString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) >>> 0;
  }
  return h >>> 0;
}

function buildDnaTag(message, frames, routeTrace) {
  try {
    const base = JSON.stringify({
      message: message || "",
      topFrame: (frames && frames[0]) || null,
      routeTrace: routeTrace || null
    });
    const h = rmHashString(base);
    return "RM24_DNA_" + h.toString(16).padStart(8, "0");
  } catch {
    return "RM24_DNA_UNKNOWN";
  }
}

// ---------------------------------------------------------------------------
// LOCALSTORAGE MIRROR (v24)
// ---------------------------------------------------------------------------

const ROUTE_MEMORY_LS_KEY = "PulseUI.RouteMemory.v24.buffer";
const ROUTE_MEMORY_LS_MAX_ENTRIES = 4000;

function hasLocalStorage() {
  try {
    if (typeof window === "undefined" || !window.localStorage) return false;
    const testKey = "__pulse_route_memory_test__";
    window.localStorage.setItem(testKey, "1");
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

function loadRouteMemoryBuffer() {
  if (!hasLocalStorage()) return [];
  try {
    const raw = window.localStorage.getItem(ROUTE_MEMORY_LS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function mirrorRouteMemoryToCoreMemory(buffer) {
  const Core = getCoreMemory();
  if (!Core || typeof Core.setRouteSnapshot !== "function") return;
  try {
    const envelope = {
      schemaVersion: ROUTE_MEMORY_SCHEMA_VERSION,
      version: RouteMemoryRole.version,
      routeId: "routeMemory",
      buffer,
      timestamp: Date.now()
    };
    Core.setRouteSnapshot("routeMemory", envelope);
  } catch {
    // best-effort only
  }
}

function saveRouteMemoryBuffer(buffer) {
  if (!hasLocalStorage()) return;
  try {
    const trimmed =
      buffer.length > ROUTE_MEMORY_LS_MAX_ENTRIES
        ? buffer.slice(buffer.length - ROUTE_MEMORY_LS_MAX_ENTRIES)
        : buffer;
    window.localStorage.setItem(ROUTE_MEMORY_LS_KEY, JSON.stringify(trimmed));
    mirrorRouteMemoryToCoreMemory(trimmed);
  } catch {
    // never throw
  }
}

function appendRouteMemoryEntry(kind, key, envelopeSnapshot) {
  const record = {
    ts: Date.now(),
    schemaVersion: ROUTE_MEMORY_SCHEMA_VERSION,
    kind,
    key,
    envelope: envelopeSnapshot
  };

  const buffer = loadRouteMemoryBuffer();
  buffer.push(record);
  saveRouteMemoryBuffer(buffer);

  // Diagnostics bus mirror
  try {
    const diag = getDiagnosticsBus();
    diag?.emit?.("RouteMemory.record", record);
  } catch {}

  // Evidence bus mirror (low-entropy route memory intel)
  try {
    const evidence = getEvidenceBus();
    evidence?.emit?.("RouteMemory.trace", {
      kind,
      key,
      ts: record.ts,
      schemaVersion: ROUTE_MEMORY_SCHEMA_VERSION
    });
  } catch {}
}

export const PulseRouteMemoryStore = {
  getAll() {
    return loadRouteMemoryBuffer();
  },
  clear() {
    saveRouteMemoryBuffer([]);
    try {
      const Core = getCoreMemory();
      Core?.setRouteSnapshot?.("routeMemory", {
        schemaVersion: ROUTE_MEMORY_SCHEMA_VERSION,
        version: RouteMemoryRole.version,
        routeId: "routeMemory",
        buffer: [],
        cleared: true,
        timestamp: Date.now()
      });
    } catch {}
  },
  tail(n = 200) {
    const buf = loadRouteMemoryBuffer();
    if (n <= 0) return [];
    return buf.slice(Math.max(0, buf.length - n));
  }
};

// ---------------------------------------------------------------------------
// FACTORY — v24 IMMORTAL REFLEX ROUTE MEMORY
// ---------------------------------------------------------------------------

export function createPulseRouteMemory({
  bucketId = "skinreflex-route-memory",
  log = console.log,
  warn = console.warn
} = {}) {
  const Core = getCoreMemory();

  const RouteMemoryState = {
    bucketId,
    lastKey: null,
    lastEntry: null,
    lastEnvelope: null,
    lastTier: null,
    lastChannel: "ui",
    lastError: null,
    eventSeq: 0
  };

  const DegradationTiers = Object.freeze({
    microDegrade: "microDegrade",
    softDegrade: "softDegrade",
    midDegrade: "midDegrade",
    hardDegrade: "hardDegrade",
    criticalDegrade: "criticalDegrade"
  });

  function nextSeq() {
    RouteMemoryState.eventSeq += 1;
    return RouteMemoryState.eventSeq;
  }

  function safeLog(stage, details = {}) {
  try {
    const seq = RouteMemoryState.eventSeq;
    const tier = details.tier || RouteMemoryState.lastTier || "microDegrade";

    // Monitor color palette
    const colors = {
      microDegrade: "#00FF9C",   // neon green
      softDegrade:  "#FFE066",   // soft yellow
      midDegrade:   "#00E5FF",   // cyan
      hardDegrade:  "#FF4FFB",   // magenta
      criticalDegrade: "#FF3B3B" // red
    };

    const color = colors[tier] || "#E8F8FF";

    console.log(
      `%c[RouteMemory v24] %c${stage} %c(seq:${seq})`,
      "color:#5C6BC0; font-weight:bold; font-family:monospace;",
      `color:${color}; font-weight:bold; font-family:monospace;`,
      "color:#E8F8FF; font-family:monospace;"
    );

    // Pretty-print details (optional)
    if (Object.keys(details).length > 0) {
      console.log(
        "%c↳ details:",
        "color:#5C6BC0; font-family:monospace; font-weight:bold;"
      );
      console.log(
        "%c" + JSON.stringify(details, null, 2),
        "color:#5C6BC0; font-family:monospace;"
      );
    }
  } catch {}
}


  function makeKey(message, frames) {
    try {
      const top = (frames && frames[0]) || "NO_FRAME";
      return message + "::" + top;
    } catch (err) {
      safeNormalizeError(err, "routememory.makeKey");
      return message + "::NO_FRAME";
    }
  }

  function classifyTier(healthScore) {
    try {
      const h = typeof healthScore === "number" ? healthScore : 1.0;

      if (h >= 0.95) return DegradationTiers.microDegrade;
      if (h >= 0.85) return DegradationTiers.softDegrade;
      if (h >= 0.50) return DegradationTiers.midDegrade;
      if (h >= 0.15) return DegradationTiers.hardDegrade;
      return DegradationTiers.criticalDegrade;
    } catch (err) {
      safeNormalizeError(err, "routememory.classifyTier");
      return DegradationTiers.microDegrade;
    }
  }

  function buildEnvelope(key, entry, channel = "ui") {
    return {
      schemaVersion: ROUTE_MEMORY_SCHEMA_VERSION,
      role: RouteMemoryRole.identity,
      version: RouteMemoryRole.version,
      bucketId,
      key,
      channel,
      tier: entry.tier,
      degraded: entry.degraded,
      healthScore: entry.healthScore,
      dnaTag: entry.dnaTag,
      entry,
      timestamp: Date.now()
    };
  }

  function unwrapEnvelope(raw) {
    if (!raw) return { envelope: null, entry: null };
    if (raw && typeof raw === "object" && raw.schemaVersion) {
      return { envelope: raw, entry: raw.entry || null };
    }
    return {
      envelope: null,
      entry: raw
    };
  }

  function writeBucket(key, envelope) {
    if (!Core) return;
    try {
      if (typeof Core.getBucket === "function" && typeof Core.setBucket === "function") {
        const bucket = Core.getBucket(bucketId) || {};
        bucket[key] = envelope;
        Core.setBucket(bucketId, bucket);
      }
      if (typeof Core.setRouteSnapshot === "function") {
        Core.setRouteSnapshot(`routeMemory:${bucketId}:${key}`, envelope);
      }
    } catch (err) {
      RouteMemoryState.lastError = String(err);
      safeNormalizeError(err, "routememory.corePersist");
    }
  }

  function readBucket(key) {
    if (!Core) return null;
    try {
      if (typeof Core.getBucket === "function") {
        const bucket = Core.getBucket(bucketId) || {};
        return bucket[key] || null;
      }
      if (typeof Core.getRouteSnapshot === "function") {
        return Core.getRouteSnapshot(`routeMemory:${bucketId}:${key}`) || null;
      }
      return null;
    } catch (err) {
      RouteMemoryState.lastError = String(err);
      safeNormalizeError(err, "routememory.coreRead");
      return null;
    }
  }

  function remember(message, frames, routeTrace, overrides = {}) {
    nextSeq();
    try {
      const key = makeKey(message, frames);
      const baseHealth = overrides.healthScore ?? 1.0;
      const tier = classifyTier(baseHealth);

      const dnaTag =
        overrides.binaryAware === true
          ? "RM24_BINARY_SHADOW"
          : buildDnaTag(message, frames, routeTrace);

      const entry = {
        seq: RouteMemoryState.eventSeq,
        message,
        frames,
        routeTrace,
        degraded: !!overrides.degraded,
        healthScore: baseHealth,
        tier,
        dnaTag,
        ...overrides
      };

      const channel = overrides.channel || "ui";
      const envelope = buildEnvelope(key, entry, channel);

      RouteMemoryState.lastKey = key;
      RouteMemoryState.lastEntry = entry;
      RouteMemoryState.lastEnvelope = envelope;
      RouteMemoryState.lastTier = tier;
      RouteMemoryState.lastChannel = channel;
      RouteMemoryState.lastError = null;

      writeBucket(key, envelope);
      appendRouteMemoryEntry("remember", key, envelope);

      safeLog("ROUTE_MEMORY_SAVED", {
        key,
        frames: Array.isArray(frames) ? frames.length : 0,
        degraded: entry.degraded,
        healthScore: entry.healthScore,
        tier: entry.tier,
        dnaTag: entry.dnaTag,
        channel
      });

      try {
        const diag = getDiagnosticsBus();
        diag?.emit?.("RouteMemory.remember", {
          key,
          tier,
          degraded: entry.degraded,
          channel,
          dnaTag
        });
      } catch {}
      try {
        const evidence = getEvidenceBus();
        evidence?.emit?.("RouteMemory.envelope", {
          key,
          tier,
          degraded: entry.degraded,
          dnaTag,
          bucketId,
          timestamp: envelope.timestamp
        });
      } catch {}

      return envelope;
    } catch (err) {
      RouteMemoryState.lastError = String(err);
      safeNormalizeError(err, "routememory.remember");
      safeLog("ROUTE_MEMORY_REMEMBER_ERROR", { error: String(err) });
      return null;
    }
  }

  function markDegraded(
    message,
    frames,
    healthScore = 0.85,
    binaryAware = false,
    channel = "ui"
  ) {
    nextSeq();
    try {
      const key = makeKey(message, frames);
      const raw = readBucket(key);
      if (!raw) return;

      const { envelope: existingEnvelope, entry: existingEntry } = unwrapEnvelope(raw);
      if (!existingEntry) return;

      const entry = {
        ...existingEntry,
        degraded: true,
        healthScore,
        tier: classifyTier(healthScore),
        dnaTag: binaryAware
          ? "RM24_BINARY_SHADOW_DEGRADED"
          : "RM24_SURFACE_DEGRADED"
      };

      const newEnvelope = buildEnvelope(key, entry, channel);

      writeBucket(key, newEnvelope);

      RouteMemoryState.lastKey = key;
      RouteMemoryState.lastEntry = entry;
      RouteMemoryState.lastEnvelope = newEnvelope;
      RouteMemoryState.lastTier = entry.tier;
      RouteMemoryState.lastChannel = channel;

      appendRouteMemoryEntry("markDegraded", key, newEnvelope);

      safeLog("ROUTE_MEMORY_DEGRADED", {
        key,
        healthScore,
        tier: entry.tier,
        dnaTag: entry.dnaTag,
        channel
      });

      try {
        const diag = getDiagnosticsBus();
        diag?.emit?.("RouteMemory.markDegraded", {
          key,
          tier: entry.tier,
          channel,
          dnaTag: entry.dnaTag
        });
      } catch {}
    } catch (err) {
      RouteMemoryState.lastError = String(err);
      safeNormalizeError(err, "routememory.markDegraded");
      safeLog("ROUTE_MEMORY_DEGRADED_ERROR", { error: String(err) });
    }
  }

  function recall(message, frames) {
    nextSeq();
    try {
      const key = makeKey(message, frames);
      const raw = readBucket(key);
      if (!raw) return null;

      const { envelope, entry } = unwrapEnvelope(raw);
      if (!entry) return null;

      const effectiveEnvelope = envelope || buildEnvelope(key, entry);

      RouteMemoryState.lastKey = key;
      RouteMemoryState.lastEntry = entry;
      RouteMemoryState.lastEnvelope = effectiveEnvelope;
      RouteMemoryState.lastTier = entry.tier;
      RouteMemoryState.lastChannel =
        (effectiveEnvelope && effectiveEnvelope.channel) ||
        RouteMemoryState.lastChannel ||
        "ui";

      safeLog("ROUTE_MEMORY_HIT", {
        key,
        frames: Array.isArray(entry.frames) ? entry.frames.length : 0,
        degraded: entry.degraded,
        healthScore: entry.healthScore,
        tier: entry.tier,
        dnaTag: entry.dnaTag,
        channel: RouteMemoryState.lastChannel
      });

      appendRouteMemoryEntry("recall", key, effectiveEnvelope);

      try {
        const diag = getDiagnosticsBus();
        diag?.emit?.("RouteMemory.recall", {
          key,
          tier: entry.tier,
          degraded: entry.degraded
        });
      } catch {}

      return entry.routeTrace;
    } catch (err) {
      RouteMemoryState.lastError = String(err);
      safeNormalizeError(err, "routememory.recall");
      safeLog("ROUTE_MEMORY_RECALL_ERROR", { error: String(err) });
      return null;
    }
  }

  function getEntry(message, frames) {
    nextSeq();
    try {
      const key = makeKey(message, frames);
      const raw = readBucket(key);
      if (!raw) return null;

      const { envelope, entry } = unwrapEnvelope(raw);
      const effectiveEnvelope = envelope || buildEnvelope(key, entry || {});

      const out = {
        key,
        envelope: effectiveEnvelope,
        entry: entry || null
      };

      appendRouteMemoryEntry("getEntry", key, effectiveEnvelope);

      try {
        const diag = getDiagnosticsBus();
        diag?.emit?.("RouteMemory.getEntry", {
          key,
          hasEntry: !!entry
        });
      } catch {}

      return out;
    } catch (err) {
      RouteMemoryState.lastError = String(err);
      safeNormalizeError(err, "routememory.getEntry");
      safeLog("ROUTE_MEMORY_GETENTRY_ERROR", { error: String(err) });
      return null;
    }
  }

  function flushBucket() {
    nextSeq();
    try {
      const Core = getCoreMemory();
      if (Core) {
        if (typeof Core.setBucket === "function") {
          Core.setBucket(bucketId, {});
        }
        if (typeof Core.setRouteSnapshot === "function") {
          Core.setRouteSnapshot(`routeMemory:${bucketId}:__FLUSH__`, {
            schemaVersion: ROUTE_MEMORY_SCHEMA_VERSION,
            version: RouteMemoryRole.version,
            bucketId,
            cleared: true,
            timestamp: Date.now()
          });
        }
      }

      appendRouteMemoryEntry("flushBucket", bucketId, {
        schemaVersion: ROUTE_MEMORY_SCHEMA_VERSION,
        bucketId,
        cleared: true
      });

      safeLog("ROUTE_MEMORY_FLUSH_OK", { bucketId });

      try {
        const diag = getDiagnosticsBus();
        diag?.emit?.("RouteMemory.flushBucket", { bucketId });
      } catch {}
      try {
        const evidence = getEvidenceBus();
        evidence?.emit?.("RouteMemory.flushBucket", {
          bucketId,
          timestamp: Date.now()
        });
      } catch {}

      return { ok: true };
    } catch (err) {
      RouteMemoryState.lastError = String(err);
      safeNormalizeError(err, "routememory.flushBucket");
      safeLog("ROUTE_MEMORY_FLUSH_ERROR", { bucketId, error: String(err) });
      return { ok: false, error: "FlushError" };
    }
  }

  function snapshot() {
    nextSeq();
    const snap = {
      schemaVersion: ROUTE_MEMORY_SCHEMA_VERSION,
      bucketId,
      lastKey: RouteMemoryState.lastKey,
      lastTier: RouteMemoryState.lastTier,
      lastChannel: RouteMemoryState.lastChannel,
      lastError: RouteMemoryState.lastError,
      hasEnvelope: !!RouteMemoryState.lastEnvelope
    };

    appendRouteMemoryEntry("snapshot", RouteMemoryState.lastKey, snap);
    safeLog("SNAPSHOT", snap);

    try {
      const diag = getDiagnosticsBus();
      diag?.emit?.("RouteMemory.snapshot", snap);
    } catch {}

    return snap;
  }

  const PulseRouteMemory = {
    RouteMemoryRole,
    RouteMemoryState,
    DegradationTiers,
    remember,
    markDegraded,
    recall,
    getEntry,
    flushBucket,
    snapshot,
    core: getCoreMemory(),
    store: PulseRouteMemoryStore
  };

  safeLog("INIT", {
    bucketId,
    version: RouteMemoryRole.version
  });

  return PulseRouteMemory;
}

export default createPulseRouteMemory;

// ============================================================================
// GLOBAL EXPOSURE
// ============================================================================

try {
  if (typeof window !== "undefined") {
    window.PulseRouteMemory = createPulseRouteMemory;
    window.PulseRouteMemoryStore = PulseRouteMemoryStore;
  }
  if (typeof globalThis !== "undefined") {
    window.PulseRouteMemory = createPulseRouteMemory;
    window.PulseRouteMemoryStore = PulseRouteMemoryStore;
  }
  if (typeof global !== "undefined") {
    window.PulseRouteMemory = createPulseRouteMemory;
    window.PulseRouteMemoryStore = PulseRouteMemoryStore;
  }
  if (typeof g !== "undefined") {
    g.PulseRouteMemory = createPulseRouteMemory;
    g.PulseRouteMemoryStore = PulseRouteMemoryStore;
  }
} catch {}
