// ============================================================================
//  PulseAIChunker v20.0-IMMORTAL-UNIVERSAL
//  32-LANE DUALBAND CHUNKER — BINARY + SYMBOLIC + WORLD, ORGANISM-GRADE
//  Universal Chunk Organ for PulseOS v18+ (Chunker + World + Identity Aware)
// ============================================================================

import { OrganismIdentity } from "../PULSE-X/PulseWorldOrganismMap-v24.js";

const Identity = OrganismIdentity(import.meta.url);

// or: const Identity = OrganismIdentity["pulse-ai/ai-v24.0-IMMORTAL"] if that's the key you chose

// ============================================================================
//  META BLOCK — v24.0 IMMORTAL (ORGANISM KERNEL)
//  (now backed by the Organism Map instead of hardcoded here)
// ============================================================================
export const PulseAIChunkerMeta = Identity.OrganMeta;

// ============================================================================
//  SURFACE / ORGANISM LAYER EXPORTS — v24.0 IMMORTAL
//  (for Understanding / CNS / Portal alignment)
// ============================================================================

// Required 3 for every “surface” in the organism graph
export const pulseRole = Identity.pulseRole;

export const surfaceMeta = Identity.surfaceMeta;

export const pulseLoreContext = Identity.pulseLoreContext;

// Optional: richer experience meta for AI / tooling
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;

// Optional: export meta for tooling / dev panels
export const EXPORT_META = Identity.EXPORT_META;


// ============================================================================
//  INTERNAL HELPERS
// ============================================================================

function _now() {
  return Date.now();
}

function _toUint8Array(input) {
  if (input instanceof Uint8Array) return input;
  if (input instanceof ArrayBuffer) return new Uint8Array(input);
  if (Array.isArray(input)) return new Uint8Array(input);
  throw new TypeError("Unsupported binary input type for PulseAIChunker.");
}

function _safeJSONStringify(value) {
  try {
    return JSON.stringify(value);
  } catch {
    return JSON.stringify({ error: "unserializable", type: typeof value });
  }
}

function _safeJSONParse(str) {
  try {
    return JSON.parse(str);
  } catch {
    return null;
  }
}

function _safeString(input) {
  if (typeof input === "string") return input;
  if (input == null) return "";
  return String(input);
}

// Simple deterministic hash (non-crypto, pure compute)
function _hashString(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 1000000007;
  }
  return `h${h}`;
}

// Build a deterministic session id for a payload + identity + profile
function _buildSessionId({ uid, band, worldBand, backendKind, chunkProfile, payloadHash }) {
  const seed = JSON.stringify({
    uid: uid || null,
    band: band || "dual",
    worldBand: worldBand || "backend",
    backendKind: backendKind || "generic",
    chunkProfile: chunkProfile || "default",
    payloadHash: payloadHash || null
  });
  return _hashString(seed);
}

// ============================================================================
//  CLASS — 32-LANE DUALBAND UNIVERSAL CHUNKER (ELITE v20)
// ============================================================================

export class PulseAIChunker {
  constructor(config = {}) {
    this.config = Object.freeze({
      id: config.id || PulseAIChunkerMeta.id,
      defaultChunkSize: config.defaultChunkSize || 4096,
      maxChunkSize: config.maxChunkSize || 65536,
      lanes: PulseAIChunkerMeta.lanes,
      trace: !!config.trace,
      defaultProfile: config.defaultProfile || "backend-default"
    });

    // Lane stats: purely structural metrics, no content
    this.laneStats = new Array(this.config.lanes).fill(null).map((_, lane) =>
      Object.seal({
        lane,
        chunks: 0,
        bytes: 0,
        lastTs: null
      })
    );

    // Prewarmed patterns (label -> pattern)
    this.patterns = new Map();

    // Prewarmed profiles (profileId -> profileConfig)
    this.profiles = new Map();

    // Profile stats (profileId -> stats)
    this.profileStats = new Map();
  }

  // --------------------------------------------------------------------------
  //  META
  // --------------------------------------------------------------------------
  getMeta() {
    return PulseAIChunkerMeta;
  }

  getLaneStats() {
    return this.laneStats.map((s) => ({ ...s }));
  }

  getPatterns() {
    const out = {};
    for (const [k, v] of this.patterns.entries()) {
      out[k] = v;
    }
    return out;
  }

  getProfiles() {
    const out = {};
    for (const [k, v] of this.profiles.entries()) {
      out[k] = v;
    }
    return out;
  }

  getProfileStats() {
    const out = {};
    for (const [k, v] of this.profileStats.entries()) {
      out[k] = { ...v };
    }
    return out;
  }

  // --------------------------------------------------------------------------
  //  PREWARM PATTERN (label-based)
  // --------------------------------------------------------------------------
  prewarmPattern(label, pattern = {}) {
    if (!label) return;
    const stored = Object.freeze({
      label,
      ts: _now(),
      pattern: {
        defaultChunkSize:
          pattern.defaultChunkSize || this.config.defaultChunkSize,
        maxChunkSize: pattern.maxChunkSize || this.config.maxChunkSize,
        lanes: pattern.lanes || this.config.lanes,
        band: pattern.band || "dual",
        profile: pattern.profile || this.config.defaultProfile,
        presenceBand: pattern.presenceBand || "symbolic",
        worldBand: pattern.worldBand || "backend",
        backendKind: pattern.backendKind || "generic",
        chunkProfile: pattern.chunkProfile || pattern.profile || this.config.defaultProfile
      }
    });
    this.patterns.set(label, stored);
    return stored;
  }

  // --------------------------------------------------------------------------
  //  PREWARM PROFILE (backend/world-aware profiles)
  //  - profileId: e.g. "backend-plan", "backend-logs", "world-social", "world-state"
// --------------------------------------------------------------------------
  prewarmProfile(profileId, profile = {}) {
    if (!profileId) return;
    const stored = Object.freeze({
      profileId,
      ts: _now(),
      config: {
        defaultChunkSize:
          profile.defaultChunkSize || this.config.defaultChunkSize,
        maxChunkSize: profile.maxChunkSize || this.config.maxChunkSize,
        lanes: profile.lanes || this.config.lanes,
        band: profile.band || "dual",
        presenceBand: profile.presenceBand || "symbolic",
        worldBand: profile.worldBand || "backend", // backend | world | identity | evidence
        backendKind: profile.backendKind || "generic", // plan | state | logs | frames | world
        chunkProfile: profile.chunkProfile || profileId
      }
    });
    this.profiles.set(profileId, stored);

    if (!this.profileStats.has(profileId)) {
      this.profileStats.set(
        profileId,
        Object.seal({
          profileId,
          chunks: 0,
          bytes: 0,
          lastTs: null
        })
      );
    }

    return stored;
  }

  // --------------------------------------------------------------------------
  //  INTERNAL: PROFILE RESOLUTION
  // --------------------------------------------------------------------------
  _resolveProfile(options = {}) {
    const label = options.label || null;
    const profileId = options.profile || this.config.defaultProfile;

    const pattern = label ? this.patterns.get(label) : null;
    const profile = this.profiles.get(profileId);

    const base = {
      defaultChunkSize: this.config.defaultChunkSize,
      maxChunkSize: this.config.maxChunkSize,
      lanes: this.config.lanes,
      band: options.band || "dual",
      presenceBand: options.presenceBand || "symbolic",
      worldBand: options.worldBand || "backend",
      backendKind: options.backendKind || "generic",
      chunkProfile: profileId
    };

    const fromPattern = pattern?.pattern || {};
    const fromProfile = profile?.config || {};

    return {
      defaultChunkSize:
        options.defaultChunkSize ||
        fromPattern.defaultChunkSize ||
        fromProfile.defaultChunkSize ||
        base.defaultChunkSize,
      maxChunkSize:
        options.maxChunkSize ||
        fromPattern.maxChunkSize ||
        fromProfile.maxChunkSize ||
        base.maxChunkSize,
      lanes:
        options.lanes ||
        fromPattern.lanes ||
        fromProfile.lanes ||
        base.lanes,
      band:
        options.band ||
        fromPattern.band ||
        fromProfile.band ||
        base.band,
      presenceBand:
        options.presenceBand ||
        fromPattern.presenceBand ||
        fromProfile.presenceBand ||
        base.presenceBand,
      worldBand:
        options.worldBand ||
        fromPattern.worldBand ||
        fromProfile.worldBand ||
        base.worldBand,
      backendKind:
        options.backendKind ||
        fromPattern.backendKind ||
        fromProfile.backendKind ||
        base.backendKind,
      chunkProfile:
        options.chunkProfile ||
        fromPattern.chunkProfile ||
        fromProfile.chunkProfile ||
        base.chunkProfile,
      label,
      profileId
    };
  }

  _bumpProfileStats(profileId, bytes, ts) {
    if (!profileId) return;
    const stats =
      this.profileStats.get(profileId) ||
      Object.seal({
        profileId,
        chunks: 0,
        bytes: 0,
        lastTs: null
      });
    stats.chunks += 1;
    stats.bytes += bytes;
    stats.lastTs = ts;
    this.profileStats.set(profileId, stats);
  }

  // --------------------------------------------------------------------------
  //  LANE ASSIGNMENT (ROUND-ROBIN, DETERMINISTIC PER INSTANCE)
// --------------------------------------------------------------------------
  _assignLane(counterRef, lanes) {
    const lane = counterRef.value % lanes;
    counterRef.value += 1;
    return lane;
  }

  // --------------------------------------------------------------------------
  //  BINARY CHUNKING (backend/world-safe)
//  - options: { band, label, profile, presenceBand, worldBand, backendKind, chunkProfile, uid, lineage, route, organism }
// --------------------------------------------------------------------------
  chunkBinary(buffer, options = {}) {
    const ts = _now();
    const profile = this._resolveProfile({
      ...options,
      band: options.band || "binary"
    });

    const bytes = _toUint8Array(buffer);
    const totalLength = bytes.length;

    const chunkSize = Math.min(
      Math.max(profile.defaultChunkSize, 1),
      profile.maxChunkSize
    );

    const payloadHash = _hashString(bytes.toString());
    const sessionId = _buildSessionId({
      uid: options.uid,
      band: profile.band,
      worldBand: profile.worldBand,
      backendKind: profile.backendKind,
      chunkProfile: profile.chunkProfile,
      payloadHash
    });

    const chunks = [];
    const laneCounter = { value: 0 };

    for (let offset = 0; offset < totalLength; offset += chunkSize) {
      const lane = this._assignLane(laneCounter, profile.lanes);
      const end = Math.min(offset + chunkSize, totalLength);
      const slice = bytes.subarray(offset, end);

      const chunk = Object.freeze({
        meta: {
          chunkerId: this.config.id,
          ts,
          band: profile.band,
          type: "binary",
          lane,
          index: chunks.length,
          total: null, // filled after loop
          label: profile.label,
          profile: profile.profileId,
          size: slice.length,
          presenceBand: profile.presenceBand,
          worldBand: profile.worldBand,
          backendKind: profile.backendKind,
          chunkProfile: profile.chunkProfile,
          sessionId,
          payloadHash,
          uid: options.uid || null,
          lineage: options.lineage || null,
          route: options.route || null,
          organism: options.organism || null
        },
        payload: slice
      });

      chunks.push(chunk);

      const stat = this.laneStats[lane];
      stat.chunks += 1;
      stat.bytes += slice.length;
      stat.lastTs = ts;

      this._bumpProfileStats(profile.profileId, slice.length, ts);
    }

    for (const c of chunks) {
      c.meta.total = chunks.length;
    }

    if (this.config.trace) {
      console.log("[PulseAIChunker v20] chunkBinary", {
        label: profile.label,
        profile: profile.profileId,
        band: profile.band,
        worldBand: profile.worldBand,
        backendKind: profile.backendKind,
        totalLength,
        chunkSize,
        chunks: chunks.length
      });
    }

    return Object.freeze(chunks);
  }

  // --------------------------------------------------------------------------
  //  BINARY REASSEMBLY
  // --------------------------------------------------------------------------
  reassembleBinary(chunks = []) {
    if (!Array.isArray(chunks) || chunks.length === 0) {
      return new Uint8Array(0);
    }

    const sorted = [...chunks].sort(
      (a, b) => (a.meta?.index ?? 0) - (b.meta?.index ?? 0)
    );

    const totalBytes = sorted.reduce(
      (sum, c) => sum + (c.payload?.length ?? 0),
      0
    );

    const out = new Uint8Array(totalBytes);
    let offset = 0;

    for (const c of sorted) {
      const slice = c.payload || new Uint8Array(0);
      out.set(slice, offset);
      offset += slice.length;
    }

    return out;
  }

  // --------------------------------------------------------------------------
  //  JSON / SYMBOLIC CHUNKING (STRINGIFIED)
//  - options: { band, label, profile, presenceBand, worldBand, backendKind, chunkProfile, uid, lineage, route, organism }
// --------------------------------------------------------------------------
  chunkJSON(value, options = {}) {
    const profile = this._resolveProfile({
      ...options,
      band: options.band || "symbolic"
    });

    const json = _safeJSONStringify(value);
    const encoder = new TextEncoder();
    const bytes = encoder.encode(json);

    const binaryChunks = this.chunkBinary(bytes, {
      band: profile.band,
      label: profile.label,
      profile: profile.profileId,
      presenceBand: profile.presenceBand,
      worldBand: profile.worldBand,
      backendKind: profile.backendKind,
      chunkProfile: profile.chunkProfile,
      uid: options.uid,
      lineage: options.lineage,
      route: options.route,
      organism: options.organism
    });

    const jsonChunks = binaryChunks.map((c) =>
      Object.freeze({
        meta: {
          ...c.meta,
          type: "json"
        },
        payload: c.payload
      })
    );

    if (this.config.trace) {
      console.log("[PulseAIChunker v20] chunkJSON", {
        label: profile.label,
        profile: profile.profileId,
        band: profile.band,
        worldBand: profile.worldBand,
        backendKind: profile.backendKind,
        length: json.length,
        chunks: jsonChunks.length
      });
    }

    return Object.freeze(jsonChunks);
  }

  // --------------------------------------------------------------------------
  //  JSON / SYMBOLIC REASSEMBLY
  // --------------------------------------------------------------------------
  reassembleJSON(chunks = []) {
    const binary = this.reassembleBinary(chunks);
    const decoder = new TextDecoder();
    const json = decoder.decode(binary);
    return _safeJSONParse(json);
  }

  // --------------------------------------------------------------------------
  //  TEXT CHUNKING (backend logs / traces / plans)
//  - line-safe, UTF-8, profile-aware
  // --------------------------------------------------------------------------
  chunkText(text, options = {}) {
    const profile = this._resolveProfile({
      ...options,
      band: options.band || "symbolic",
      backendKind: options.backendKind || "logs"
    });

    const s = _safeString(text);
    const encoder = new TextEncoder();
    const bytes = encoder.encode(s);

    return this.chunkBinary(bytes, {
      band: profile.band,
      label: profile.label,
      profile: profile.profileId,
      presenceBand: profile.presenceBand,
      worldBand: profile.worldBand,
      backendKind: profile.backendKind,
      chunkProfile: profile.chunkProfile,
      uid: options.uid,
      lineage: options.lineage,
      route: options.route,
      organism: options.organism
    }).map((c) =>
      Object.freeze({
        meta: {
          ...c.meta,
          type: "text"
        },
        payload: c.payload
      })
    );
  }

  reassembleText(chunks = []) {
    const binary = this.reassembleBinary(chunks);
    const decoder = new TextDecoder();
    return decoder.decode(binary);
  }

  // --------------------------------------------------------------------------
  //  LINE-ORIENTED CHUNKING (backend logs)
//  - preserves line boundaries as much as possible
  // --------------------------------------------------------------------------
  chunkLines(text, options = {}) {
    const profile = this._resolveProfile({
      ...options,
      band: options.band || "symbolic",
      backendKind: options.backendKind || "logs"
    });

    const s = _safeString(text);
    const lines = s.split(/\r?\n/);
    const maxLines = options.maxLines || 256;

    const chunks = [];
    const ts = _now();
    const laneCounter = { value: 0 };

    let buffer = [];
    let currentSize = 0;

    const self = this;

    function flushChunk(chunker, lane, index, totalPlaceholder) {
      const joined = buffer.join("\n");
      const encoder = new TextEncoder();
      const bytes = encoder.encode(joined);

      const payloadHash = _hashString(bytes.toString());
      const sessionId = _buildSessionId({
        uid: options.uid,
        band: profile.band,
        worldBand: profile.worldBand,
        backendKind: profile.backendKind,
        chunkProfile: profile.chunkProfile,
        payloadHash
      });

      const chunk = Object.freeze({
        meta: {
          chunkerId: chunker.config.id,
          ts,
          band: profile.band,
          type: "text_lines",
          lane,
          index,
          total: totalPlaceholder,
          label: profile.label,
          profile: profile.profileId,
          size: bytes.length,
          presenceBand: profile.presenceBand,
          worldBand: profile.worldBand,
          backendKind: profile.backendKind,
          chunkProfile: profile.chunkProfile,
          sessionId,
          payloadHash,
          uid: options.uid || null,
          lineage: options.lineage || null,
          route: options.route || null,
          organism: options.organism || null
        },
        payload: bytes
      });

      chunks.push(chunk);

      const stat = chunker.laneStats[lane];
      stat.chunks += 1;
      stat.bytes += bytes.length;
      stat.lastTs = ts;

      chunker._bumpProfileStats(profile.profileId, bytes.length, ts);
    }

    for (const line of lines) {
      buffer.push(line);
      currentSize += 1;

      if (currentSize >= maxLines) {
        const lane = self._assignLane(laneCounter, profile.lanes);
        flushChunk(self, lane, chunks.length, null);
        buffer = [];
        currentSize = 0;
      }
    }

    if (buffer.length > 0) {
      const lane = self._assignLane(laneCounter, profile.lanes);
      flushChunk(self, lane, chunks.length, null);
    }

    for (const c of chunks) {
      c.meta.total = chunks.length;
    }

    if (this.config.trace) {
      console.log("[PulseAIChunker v20] chunkLines", {
        label: profile.label,
        profile: profile.profileId,
        band: profile.band,
        worldBand: profile.worldBand,
        backendKind: profile.backendKind,
        lines: lines.length,
        chunks: chunks.length
      });
    }

    return Object.freeze(chunks);
  }

  reassembleLines(chunks = []) {
    const text = this.reassembleText(chunks);
    return text.split(/\r?\n/);
  }

  // --------------------------------------------------------------------------
  //  BACKEND PLAN / STATE HELPERS (semantic wrappers)
//  - purely structural wrappers around JSON chunking
  // --------------------------------------------------------------------------
  chunkBackendPlan(plan, options = {}) {
    return this.chunkJSON(plan, {
      ...options,
      backendKind: "plan",
      profile: options.profile || "backend-plan"
    });
  }

  chunkBackendState(state, options = {}) {
    return this.chunkJSON(state, {
      ...options,
      backendKind: "state",
      profile: options.profile || "backend-state"
    });
  }

  chunkBackendLogs(text, options = {}) {
    return this.chunkLines(text, {
      ...options,
      backendKind: "logs",
      profile: options.profile || "backend-logs"
    });
  }

  // --------------------------------------------------------------------------
  //  WORLD / IDENTITY / EVIDENCE HELPERS — PulseWorld-aligned
  // --------------------------------------------------------------------------
  // snapshot: PulseWorldSocialGraph snapshot or world state
  chunkWorldSnapshot(snapshot, options = {}) {
    return this.chunkJSON(snapshot, {
      ...options,
      backendKind: "world",
      worldBand: options.worldBand || "world",
      profile: options.profile || "world-state"
    });
  }

  // evidence: trust / reputation / logs / identity evidence bundle
  chunkEvidence(evidence, options = {}) {
    return this.chunkJSON(evidence, {
      ...options,
      backendKind: "evidence",
      worldBand: options.worldBand || "world",
      profile: options.profile || "world-evidence"
    });
  }

  // events: ordered timeline of events (identity, presence, jobs, etc.)
  chunkTimeline(events, options = {}) {
    return this.chunkJSON(events, {
      ...options,
      backendKind: "timeline",
      worldBand: options.worldBand || "world",
      profile: options.profile || "world-timeline"
    });
  }
}

// ============================================================================
//  FACTORY
// ============================================================================

export function createPulseAIChunker(config = {}) {
  const core = new PulseAIChunker(config);

  // Canonical backend profiles
  core.prewarmProfile("backend-default", {
    backendKind: "generic",
    chunkProfile: "backend-default",
    presenceBand: "symbolic",
    worldBand: "backend"
  });

  core.prewarmProfile("backend-plan", {
    backendKind: "plan",
    chunkProfile: "backend-plan",
    presenceBand: "symbolic",
    worldBand: "backend"
  });

  core.prewarmProfile("backend-state", {
    backendKind: "state",
    chunkProfile: "backend-state",
    presenceBand: "symbolic",
    worldBand: "backend"
  });

  core.prewarmProfile("backend-logs", {
    backendKind: "logs",
    chunkProfile: "backend-logs",
    presenceBand: "symbolic",
    worldBand: "backend"
  });

  // World / social / evidence profiles (PulseWorld-aligned)
  core.prewarmProfile("world-state", {
    backendKind: "world",
    chunkProfile: "world-state",
    presenceBand: "symbolic",
    worldBand: "world"
  });

  core.prewarmProfile("world-social", {
    backendKind: "world",
    chunkProfile: "world-social",
    presenceBand: "symbolic",
    worldBand: "world"
  });

  core.prewarmProfile("world-evidence", {
    backendKind: "evidence",
    chunkProfile: "world-evidence",
    presenceBand: "symbolic",
    worldBand: "world"
  });

  core.prewarmProfile("world-timeline", {
    backendKind: "timeline",
    chunkProfile: "world-timeline",
    presenceBand: "symbolic",
    worldBand: "world"
  });

  return Object.freeze({
    meta: PulseAIChunkerMeta,
    getMeta: () => core.getMeta(),
    getLaneStats: () => core.getLaneStats(),
    getPatterns: () => core.getPatterns(),
    getProfiles: () => core.getProfiles(),
    getProfileStats: () => core.getProfileStats(),

    prewarmPattern: (label, pattern) => core.prewarmPattern(label, pattern),
    prewarmProfile: (profileId, profile) =>
      core.prewarmProfile(profileId, profile),

    chunkBinary: (buffer, options) => core.chunkBinary(buffer, options),
    reassembleBinary: (chunks) => core.reassembleBinary(chunks),

    chunkJSON: (value, options) => core.chunkJSON(value, options),
    reassembleJSON: (chunks) => core.reassembleJSON(chunks),

    chunkText: (text, options) => core.chunkText(text, options),
    reassembleText: (chunks) => core.reassembleText(chunks),

    chunkLines: (text, options) => core.chunkLines(text, options),
    reassembleLines: (chunks) => core.reassembleLines(chunks),

    chunkBackendPlan: (plan, options) => core.chunkBackendPlan(plan, options),
    chunkBackendState: (state, options) =>
      core.chunkBackendState(state, options),
    chunkBackendLogs: (text, options) => core.chunkBackendLogs(text, options),

    chunkWorldSnapshot: (snapshot, options) =>
      core.chunkWorldSnapshot(snapshot, options),
    chunkEvidence: (evidence, options) =>
      core.chunkEvidence(evidence, options),
    chunkTimeline: (events, options) =>
      core.chunkTimeline(events, options)
  });
}

// ============================================================================
//  DEFAULT SINGLETON (ELITE UNIVERSAL PROFILE)
// ============================================================================

export const pulseAIChunker = createPulseAIChunker({
  id: "PulseAIChunker-Default-v20",
  defaultChunkSize: 4096,
  maxChunkSize: 65536,
  trace: false,
  defaultProfile: "backend-default"
});
