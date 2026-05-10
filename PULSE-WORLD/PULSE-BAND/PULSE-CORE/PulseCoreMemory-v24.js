// ============================================================================
//  PulseCoreMemory-v24.js — v24‑IMMORTAL‑HYBRID‑SPINE
//  ORGANISM‑WIDE BINARY MEMORY SPINE (DUAL‑BAND) + SEMANTIC MEMORY ENGINE
//  “LOAD RARELY, SERVE CONSTANTLY, FLUSH INTENTIONALLY, HEAL WHILE SPINNING”
//  “PLUS: TIMELINE + GRAPH + PERSONA + TONE (v24 SEMANTIC OVERLAY)”
// ============================================================================

import { OrganismIdentity } from "../PULSE-X/PulseWorldOrganismMap-v24.js";

const Identity = OrganismIdentity(import.meta.url);

// ============================================================================
//  META BLOCK — v24 IMMORTAL (from genome)
// ============================================================================
export const PulseCoreMemoryMeta = Identity.OrganMeta;

// ============================================================================
//  SURFACE / ORGANISM LAYER EXPORTS — v24 IMMORTAL
// ============================================================================
export const pulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;

export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

// ============================================================================
//  Adapters — forward‑only, no barrels
// ============================================================================
import { createPulseCoreBrain }      from "./PulseCoreFrontalCortex-v20.js";
import { createPulseGPUOrchestrator }      from "./PulseCoreGpuMemoryAdapter-v20.js";
import { createPulseAIMemoryAdapter }      from "./PulseCoreAIMemoryAdapter-v20.js";
import { createPulseEarnMemoryAdapter }    from "./PulseCoreEarnMemoryAdapter-v20.js";
import { createPulseMeshMemoryAdapter }    from "./PulseCoreMeshMemoryAdapter-v20.js";
import { createPulseProxyMemoryAdapter }   from "./PulseCoreProxyMemoryAdapter-v20.js";
import { createPulseRouterMemoryAdapter }  from "./PulseCoreRouterMemoryAdapter-v20.js";
import { createPulseSendMemoryAdapter }    from "./PulseCoreSendMemoryAdapter-v20.js";
import { PulseCoreLayersOrgan }            from "./PulseCoreLayers-v20.js";
import PulseCoreSpeech from "./PulseCoreSpeech-v24.js";

const coreSpeech = PulseCoreSpeech.create({
  dnaTag: "core-speech",
  role: PulseCoreSpeech.CoreSpeechRole
});

// ============================================================================
//  SIMPLE BINARY HELPERS
// ============================================================================
function encodeToBinary(obj) {
  const json = JSON.stringify(obj || {});
  const bits = [];
  for (let i = 0; i < json.length; i++) {
    const code = json.charCodeAt(i);
    for (let b = 7; b >= 0; b--) bits.push((code >> b) & 1);
  }
  return bits;
}

function decodeFromBinary(bits) {
  if (!Array.isArray(bits) || bits.length % 8 !== 0) return null;
  let json = "";
  for (let i = 0; i < bits.length; i += 8) {
    let code = 0;
    for (let b = 0; b < 8; b++) code = (code << 1) | (bits[i + b] & 1);
    json += String.fromCharCode(code);
  }
  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
}

// ============================================================================
//  STORAGE KEYS + BANDS (v24 — compatible with v20)
// ============================================================================
const CORE_KEY_PRIMARY   = "pulse-core-memory-v20-primary";
const CORE_KEY_SECONDARY = "pulse-core-memory-v20-secondary";
const META_KEY_PRIMARY   = "pulse-core-memory-meta-v20-primary";
const META_KEY_SECONDARY = "pulse-core-memory-meta-v20-secondary";

// TTL + size guard
const ROUTE_TTL_MS         = 7 * 24 * 60 * 60 * 1000; // 7 days
const MAX_SERIALIZED_BYTES = 512 * 1024;              // 512 KB per band

// ============================================================================
//  v24 SEMANTIC MEMORY LAYER (NEW)
// ============================================================================
export class PulseCoreSemanticMemory_v24 {
  constructor() {
    this._tier = "balanced";

    this._items = [];
    this._timeline = [];
    this._recent = [];

    this._graph = {
      timeline: [],
      graph: {},
      entities: {},
      topics: {},
      persona: {},
      tone: {},
      relationship: {}
    };
  }

  setTier(tier) {
    if (["light", "balanced", "deep"].includes(tier)) {
      this._tier = tier;
    }
  }
  tier() { return this._tier; }

  addItem(item) {
    this._items.push(item);
    this._recent.push({
      type: "memory",
      value: item,
      timestamp: Date.now()
    });
  }
  items() { return [...this._items]; }

  addTimeline(evt) {
    this._timeline.push(evt);
    this._recent.push(evt);
  }
  timeline() { return [...this._timeline]; }

  recent() {
    const r = [...this._recent];
    this._recent = [];
    return r;
  }

  setGraph(snapshot) { this._graph = snapshot; }
  graph() { return this._graph; }

  setPersona(p) {
    this._graph.persona = p.persona || p;
    this._graph.tone = p.tone || {};
    this._graph.relationship = p.relationship || {};
  }
  persona() { return this._graph.persona || {}; }

  setTone(t) { this._graph.tone = t; }
  tone() { return this._graph.tone || {}; }

  setRelationship(r) { this._graph.relationship = r; }
  relationship() { return this._graph.relationship || {}; }
}

// ============================================================================
//  v24 MEMORY ENGINE (NEW)
// ============================================================================
export class PulseCoreMemoryEngine_v24 {
  constructor({ semantic }) {
    this.semantic = semantic;

    this.snapshot = {
      timeline: [],
      graph: {},
      entities: {},
      topics: {},
      persona: {},
      tone: {},
      relationship: {}
    };
  }

  fullScan(feeds = {}) {
    const { speech = [], presence = {}, daemon = {} } = feeds;

    const items = this.semantic.items() || [];
    const timeline = [
      ...speech.map(m => ({ type: "speech", ...m })),
      ...items.map(v => ({
        type: "memory",
        value: v,
        timestamp: Date.now()
      }))
    ].sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));

    const graph = {};
    for (const evt of timeline) {
      if (!graph[evt.type]) graph[evt.type] = [];
      graph[evt.type].push(evt);
    }

    const entities = this.extractEntities(timeline);
    const topics = this.extractTopics(timeline);

    const persona = this.computePersona({ speech, presence, topics });
    const tone = this.computeTone({ speech, presence });
    const relationship = this.computeRelationship({ speech, daemon });

    this.snapshot = { timeline, graph, entities, topics, persona, tone, relationship };

    this.semantic.setGraph(this.snapshot);
    this.semantic.setPersona({ persona, tone, relationship });

    return this.snapshot;
  }

  incremental(feeds = {}) {
    const { speech = [], presence = {}, daemon = {} } = feeds;

    const recent = this.semantic.recent();
    if (!recent.length) return this.snapshot;

    this.snapshot.timeline.push(...recent);

    for (const evt of recent) {
      if (!this.snapshot.graph[evt.type]) this.snapshot.graph[evt.type] = [];
      this.snapshot.graph[evt.type].push(evt);
    }

    this.snapshot.entities = this.extractEntities(this.snapshot.timeline);
    this.snapshot.topics = this.extractTopics(this.snapshot.timeline);

    this.snapshot.persona = this.computePersona({
      speech,
      presence,
      topics: this.snapshot.topics
    });

    this.snapshot.tone = this.computeTone({ speech, presence });
    this.snapshot.relationship = this.computeRelationship({ speech, daemon });

    this.semantic.setGraph(this.snapshot);
    this.semantic.setPersona({
      persona: this.snapshot.persona,
      tone: this.snapshot.tone,
      relationship: this.snapshot.relationship
    });

    return this.snapshot;
  }

  extractEntities(timeline) {
    const e = {};
    for (const evt of timeline) {
      if (evt.type === "speech" && evt.text) {
        for (const w of evt.text.split(/\s+/)) {
          if (w.length > 3) e[w] = (e[w] || 0) + 1;
        }
      }
    }
    return e;
  }

  extractTopics(timeline) {
    const t = {};
    for (const evt of timeline) {
      if (evt.type === "speech" && evt.text) {
        const s = evt.text.toLowerCase();
        if (s.includes("world")) t.world = (t.world || 0) + 1;
        if (s.includes("task")) t.tasks = (t.tasks || 0) + 1;
        if (s.includes("memory")) t.memory = (t.memory || 0) + 1;
        if (s.includes("presence")) t.presence = (t.presence || 0) + 1;
      }
    }
    return t;
  }

  computePersona({ speech, presence, topics }) {
    return {
      warmth: presence.tone === "warm" ? 1 : 0.6,
      focus: presence.activity === "focused" ? 1 : 0.6,
      expressiveness: presence.expression || "medium",
      curiosity: (topics.world || 0) + (topics.tasks || 0) > 5 ? "high" : "medium",
      depth: speech.length > 20 ? "deep" : "light"
    };
  }

  computeTone({ speech, presence }) {
    const last = speech[speech.length - 1];
    return {
      baseline: presence.tone || "neutral",
      lastUserTone: last?.tone || "neutral",
      lastMessage: last?.text || ""
    };
  }

  computeRelationship({ speech, daemon }) {
    return {
      continuity: speech.length,
      palContinuance: daemon?.palSummary?.avgPalContinuance || 0,
      trust: speech.length > 30 ? "high" : "growing"
    };
  }
}

// ============================================================================
//  FACTORY
// ============================================================================
export function createPulseCoreMemory({
  primaryStorage   = window.localStorage,
  secondaryStorage = window.sessionStorage,
  log              = console.log,
  warn             = console.warn,
  dnaTag           = "default-dna"
} = {}) {
  const Cache = {
    loaded: false,
    lastLoadEpoch: 0,
    data: Object.create(null),

    hotLoop: Object.create(null),

    routeMeta: Object.create(null)
  };

  const Meta = {
    lastFlushEpoch: 0,
    lastLoadEpoch: 0,
    version: PulseCoreMemoryMeta.version,
    lastBandUsed: "primary",
    fallbackUsed: false,
    dnaTag
  };

  function safeLog(stage, details = {}) {
    try {
      log("[PulseCoreMemory-v24]", stage, JSON.stringify(details));
    } catch {}
  }

  function readBand(storage, coreKey, metaKey) {
    try {
      const raw = storage.getItem(coreKey);
      const metaRaw = storage.getItem(metaKey);
      const meta = metaRaw ? JSON.parse(metaRaw) : null;
      if (!raw) return { ok: true, data: null, meta };
      const bits = JSON.parse(raw);
      const decoded = decodeFromBinary(bits) || {};
      return { ok: true, data: decoded, meta };
    } catch (err) {
      warn("[PulseCoreMemory-v24] READ_BAND_ERROR", String(err));
      return { ok: false, data: null, meta: null };
    }
  }

  function writeBand(storage, coreKey, metaKey, data, meta) {
    try {
      const bits = encodeToBinary(data);
      const serialized = JSON.stringify(bits);
      if (serialized.length > MAX_SERIALIZED_BYTES) {
        warn("[PulseCoreMemory-v24] WRITE_BAND_SKIPPED_SIZE_LIMIT", serialized.length);
        return false;
      }
      storage.setItem(coreKey, serialized);
      storage.setItem(metaKey, JSON.stringify(meta));
      return true;
    } catch (err) {
      warn("[PulseCoreMemory-v24] WRITE_BAND_ERROR", String(err));
      return false;
    }
  }

  function isVersionCompatible(meta) {
    if (!meta || !meta.version) return false;
    return meta.version === PulseCoreMemoryMeta.version;
  }

  function isDnaCompatible(meta) {
    if (!meta || !meta.dnaTag) return false;
    return meta.dnaTag === dnaTag;
  }

  function healBandsFrom(sourceData, sourceMeta) {
    const primaryOk = writeBand(
      primaryStorage,
      CORE_KEY_PRIMARY,
      META_KEY_PRIMARY,
      sourceData,
      sourceMeta
    );
    const secondaryOk = writeBand(
      secondaryStorage,
      CORE_KEY_SECONDARY,
      META_KEY_SECONDARY,
      sourceData,
      sourceMeta
    );

    Meta.lastBandUsed = primaryOk ? "primary" : secondaryOk ? "secondary" : Meta.lastBandUsed;
    Meta.fallbackUsed = !primaryOk && secondaryOk;

    safeLog("HEAL_BANDS", { primaryOk, secondaryOk });
  }

  function pruneExpiredRoutes() {
    const now = Date.now();
    const meta = Cache.routeMeta;
    let removed = 0;

    for (const routeId in meta) {
      const info = meta[routeId];
      if (!info) continue;

      if (info.lastTouched && now - info.lastTouched > ROUTE_TTL_MS) {
        delete Cache.data[routeId];
        delete Cache.routeMeta[routeId];
        removed++;
        continue;
      }

      if (info.dnaTag && info.dnaTag !== dnaTag) {
        delete Cache.data[routeId];
        delete Cache.routeMeta[routeId];
        removed++;
      }
    }

    if (removed > 0) {
      safeLog("PRUNE_EXPIRED_ROUTES", { removed });
    }
  }

  function touchRouteMeta(routeId) {
    const now = Date.now();
    if (!Cache.routeMeta[routeId]) {
      Cache.routeMeta[routeId] = { lastTouched: now, dnaTag };
    } else {
      Cache.routeMeta[routeId].lastTouched = now;
      Cache.routeMeta[routeId].dnaTag = dnaTag;
    }
  }

  function shouldReloadNow() {
    const now = Date.now();
    const ONE_DAY = 24 * 60 * 60 * 1000;
    return !Cache.loaded || now - Cache.lastLoadEpoch > ONE_DAY;
  }

  function bulkLoad() {
    const primary = readBand(primaryStorage, CORE_KEY_PRIMARY, META_KEY_PRIMARY);

    if (primary.ok && primary.data && isVersionCompatible(primary.meta) && isDnaCompatible(primary.meta)) {
      Cache.data      = primary.data.data || Object.create(null);
      Cache.routeMeta = primary.data.routeMeta || Object.create(null);
      Cache.loaded    = true;
      Cache.lastLoadEpoch = Date.now();
      Meta.lastLoadEpoch  = Cache.lastLoadEpoch;
      Meta.lastBandUsed   = "primary";
      Meta.fallbackUsed   = false;

      if (primary.meta) Object.assign(Meta, primary.meta);

      pruneExpiredRoutes();

      safeLog("BULK_LOAD_PRIMARY_OK", {
        routes: Object.keys(Cache.data || {}).length
      });
      return;
    }

    const secondary = readBand(
      secondaryStorage,
      CORE_KEY_SECONDARY,
      META_KEY_SECONDARY
    );

    if (secondary.ok && secondary.data && isVersionCompatible(secondary.meta) && isDnaCompatible(secondary.meta)) {
      Cache.data      = secondary.data.data || Object.create(null);
      Cache.routeMeta = secondary.data.routeMeta || Object.create(null);
      Cache.loaded    = true;
      Cache.lastLoadEpoch = Date.now();
      Meta.lastLoadEpoch  = Cache.lastLoadEpoch;
      Meta.lastBandUsed   = "secondary";
      Meta.fallbackUsed   = true;

      if (secondary.meta) Object.assign(Meta, secondary.meta);

      healBandsFrom({ data: Cache.data, routeMeta: Cache.routeMeta }, Meta);

      pruneExpiredRoutes();

      safeLog("BULK_LOAD_SECONDARY_OK", {
        routes: Object.keys(Cache.data || {}).length
      });
      return;
    }

    Cache.loaded        = true;
    Cache.lastLoadEpoch = Date.now();
    Cache.data          = Object.create(null);
    Cache.routeMeta     = Object.create(null);

    Meta.lastLoadEpoch = Cache.lastLoadEpoch;
    Meta.lastBandUsed  = "primary";
    Meta.fallbackUsed  = false;
    Meta.version       = PulseCoreMemoryMeta.version;
    Meta.dnaTag        = dnaTag;

    safeLog("BULK_LOAD_EMPTY_OR_RESET");
  }

  function prewarm() {
    if (shouldReloadNow()) bulkLoad();
  }

  function bulkFlush() {
    try {
      Meta.lastFlushEpoch = Date.now();

      const payload = {
        data: Cache.data,
        routeMeta: Cache.routeMeta
      };

      const primaryOk = writeBand(
        primaryStorage,
        CORE_KEY_PRIMARY,
        META_KEY_PRIMARY,
        payload,
        Meta
      );

      const secondaryOk = writeBand(
        secondaryStorage,
        CORE_KEY_SECONDARY,
        META_KEY_SECONDARY,
        payload,
        Meta
      );

      Meta.lastBandUsed = primaryOk ? "primary" : secondaryOk ? "secondary" : Meta.lastBandUsed;
      Meta.fallbackUsed = !primaryOk && secondaryOk;

      safeLog("BULK_FLUSH_OK", {
        routes: Object.keys(Cache.data || {}).length,
        primaryOk,
        secondaryOk
      });
    } catch (err) {
      warn("[PulseCoreMemory-v24] BULK_FLUSH_ERROR", String(err));
    }
  }

  // -------------------------------------------------------------------------
  //  ROUTE‑AWARE ACCESSORS + LOOP THEORY
  // -------------------------------------------------------------------------
  function ensureRoute(routeId = "global") {
    if (!Cache.data[routeId]) Cache.data[routeId] = {};
    if (!Cache.routeMeta[routeId]) {
      Cache.routeMeta[routeId] = { lastTouched: Date.now(), dnaTag };
    }
    return Cache.data[routeId];
  }

  function markHot(routeId, key) {
    const id = `${routeId}:${key}`;
    const current = Cache.hotLoop[id] || 0;
    const next = current + 1;
    Cache.hotLoop[id] = next;
    return next;
  }

  function get(routeId, key) {
    prewarm();
    const bucket = ensureRoute(routeId);
    const value = bucket[key];

    if (value !== undefined) {
      markHot(routeId, key);
      touchRouteMeta(routeId);
    }

    return value;
  }

  function set(routeId, key, value) {
    prewarm();
    const bucket = ensureRoute(routeId);
    bucket[key] = value;
    markHot(routeId, key);
    touchRouteMeta(routeId);
  }

  function getRouteSnapshot(routeId) {
    prewarm();
    touchRouteMeta(routeId);
    return { ...(Cache.data[routeId] || {}) };
  }

  function setRouteSnapshot(routeId, snapshot) {
    prewarm();
    Cache.data[routeId] = { ...(snapshot || {}) };
    touchRouteMeta(routeId);
  }

  function clearRoute(routeId) {
    prewarm();
    delete Cache.data[routeId];
    delete Cache.routeMeta[routeId];
  }

  function clearAll() {
    Cache.data      = Object.create(null);
    Cache.hotLoop   = Object.create(null);
    Cache.routeMeta = Object.create(null);
    bulkFlush();
  }

  function getHotKeys(minHits = 3) {
    const result = [];
    for (const id in Cache.hotLoop) {
      if (Cache.hotLoop[id] >= minHits) result.push({ id, hits: Cache.hotLoop[id] });
    }
    return result;
  }

  function coolDown(routeId, key) {
    const id = `${routeId}:${key}`;
    delete Cache.hotLoop[id];
  }

  // ========================================================================
  //  v24 SEMANTIC + MEMORY ENGINE — BRAIN‑READY
  // ========================================================================
  const semanticMemory_v24 = new PulseCoreSemanticMemory_v24();
  const memoryEngine_v24 = new PulseCoreMemoryEngine_v24({
    semantic: semanticMemory_v24
  });

  function fullSemanticScan(feeds = {}) {
    return memoryEngine_v24.fullScan(feeds);
  }

  function incrementalSemanticScan(feeds = {}) {
    return memoryEngine_v24.incremental(feeds);
  }

  function exportSemanticSnapshotBinary() {
    return memoryEngine_v24.toBinarySnapshot();
  }

  function importSemanticSnapshotBinary(bits) {
    return memoryEngine_v24.fromBinarySnapshot(bits);
  }

  // ========================================================================
  //  PULSE CORE MEMORY — v24 IMMORTAL++
  // ========================================================================
  const PulseCoreMemory = {
    meta: PulseCoreMemoryMeta,
    pulseRole,
    surfaceMeta,
    pulseLoreContext,
    AI_EXPERIENCE_META,
    EXPORT_META,

    Meta,
    Cache,

    // Core operations
    prewarm,
    bulkLoad,
    bulkFlush,

    get,
    set,
    getRouteSnapshot,
    setRouteSnapshot,
    clearRoute,
    clearAll,

    // Loop theory
    getHotKeys,
    coolDown,

    // Layer attachment (PulseCoreLayersOrgan v20 → v24 compatible)
    layers: PulseCoreLayersOrgan,

    // v24 semantic + engine (for brain down the line)
    semanticMemory_v24,
    memoryEngine_v24,
    fullSemanticScan,
    incrementalSemanticScan,
    exportSemanticSnapshotBinary,
    importSemanticSnapshotBinary
  };

  return PulseCoreMemory;
}

// ============================================================================
//  BACKEND API SURFACE — v24 IMMORTAL++
//  Now brain‑ready, semantic‑aware, and binary‑snapshot capable.
// ============================================================================
export const PulseCoreMemoryAPI = {
  meta: PulseCoreMemoryMeta,

  // Create a full v24 memory instance (semantic + engine + storage)
  create: createPulseCoreMemory,

  // --------------------------------------------------------------------------
  //  BASIC ACCESSORS (v20 compatible, v24 enhanced)
  // --------------------------------------------------------------------------
  read(key, routeId = "global") {
    const inst = createPulseCoreMemory();
    return inst.get(routeId, key);
  },

  write(key, value, routeId = "global") {
    const inst = createPulseCoreMemory();
    inst.set(routeId, key, value);
    return true;
  },

  start(ts = Date.now()) {
    return { startedAt: ts };
  },

  snapshot(routeId = "global") {
    const inst = createPulseCoreMemory();
    return inst.getRouteSnapshot(routeId);
  },

  clearRoute(routeId) {
    const inst = createPulseCoreMemory();
    inst.clearRoute(routeId);
    return true;
  },

  clearAll() {
    const inst = createPulseCoreMemory();
    inst.clearAll();
    return true;
  },

  // --------------------------------------------------------------------------
  //  v24 SEMANTIC MEMORY + ENGINE (BRAIN‑READY)
  // --------------------------------------------------------------------------

  // Full semantic scan (speech + presence + daemon)
  fullSemanticScan(feeds = {}) {
    const inst = createPulseCoreMemory();
    return inst.fullSemanticScan(feeds);
  },

  // Incremental semantic scan (recent only)
  incrementalSemanticScan(feeds = {}) {
    const inst = createPulseCoreMemory();
    return inst.incrementalSemanticScan(feeds);
  },

  // Export semantic snapshot as binary (for brain persistence)
  exportSemanticSnapshotBinary() {
    const inst = createPulseCoreMemory();
    return inst.exportSemanticSnapshotBinary();
  },

  // Import semantic snapshot from binary (brain restore)
  importSemanticSnapshotBinary(bits) {
    const inst = createPulseCoreMemory();
    return inst.importSemanticSnapshotBinary(bits);
  },

  // --------------------------------------------------------------------------
  //  DIRECT ACCESS TO v24 SEMANTIC + ENGINE INSTANCES
  //  (For brain modules that want to attach directly)
  // --------------------------------------------------------------------------
  createSemanticMemory() {
    return new PulseCoreSemanticMemory_v24();
  },

  createMemoryEngine(semantic) {
    return new PulseCoreMemoryEngine_v24({ semantic });
  }
};

export default PulseCoreMemoryAPI;
