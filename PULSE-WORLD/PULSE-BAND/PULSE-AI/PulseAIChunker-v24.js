// ============================================================================
//  PulseAIChunker v24-IMMORTAL++
//  32-lane dual-band universal chunker (binary + symbolic + world)
//  Organism-grade, profile-aware, artery-ready, drift-proof
// ============================================================================

import { OrganismIdentity } from "../PULSE-X/PULSE-WORLD-MAP.js
";

const Identity = OrganismIdentity(import.meta.url);

// ---------------------------------------------------------------------------
//  META / SURFACE EXPORTS
// ---------------------------------------------------------------------------

export const PulseAIChunkerMeta = Identity.OrganMeta;

export const pulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;

export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
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
  throw new TypeError("PulseAIChunker: unsupported binary input.");
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

// non-crypto, deterministic hash
function _hashString(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 1000000007;
  }
  return `h${h}`;
}

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

function _clamp01(v) {
  const n = typeof v === "number" ? v : 0;
  if (n <= 0) return 0;
  if (n >= 1) return 1;
  return n;
}

function _bucketLevel(v) {
  if (v >= 0.9) return "elite";
  if (v >= 0.75) return "high";
  if (v >= 0.5) return "medium";
  if (v >= 0.25) return "low";
  return "critical";
}

// ============================================================================
//  GLOBAL ARTERY SNAPSHOT (READ-ONLY VIEW)
// ============================================================================

const _globalChunkerRegistry = new Map();

function _registryKey(id) {
  return id || "default";
}

export function getGlobalChunkerArteries() {
  const out = {};
  for (const [k, v] of _globalChunkerRegistry.entries()) {
    out[k] = v;
  }
  return out;
}

// ============================================================================
//  PulseAIChunker v24++
// ============================================================================

export class PulseAIChunker {
  constructor(config = {}) {
    const lanes = PulseAIChunkerMeta.lanes || 32;

    this.config = Object.freeze({
      id: config.id || PulseAIChunkerMeta.id || "PulseAIChunker",
      defaultChunkSize: config.defaultChunkSize || 4096,
      maxChunkSize: config.maxChunkSize || 65536,
      lanes,
      trace: !!config.trace,
      defaultProfile: config.defaultProfile || "backend-default"
    });

    this.laneStats = new Array(this.config.lanes).fill(null).map((_, lane) =>
      Object.seal({
        lane,
        chunks: 0,
        bytes: 0,
        lastTs: null
      })
    );

    this.patterns = new Map();
    this.profiles = new Map();
    this.profileStats = new Map();

    this._totalChunks = 0;
    this._totalBytes = 0;
    this._windowStart = _now();
    this._windowChunks = 0;
    this._windowBytes = 0;
    this._windowMs = config.windowMs && config.windowMs > 0 ? config.windowMs : 60000;

    this._laneCounter = { value: 0 };

    this._registerGlobal();
  }

  _registerGlobal() {
    const key = _registryKey(this.config.id);
    _globalChunkerRegistry.set(key, this._computeArtery());
  }

  _rollWindow(now) {
    if (now - this._windowStart >= this._windowMs) {
      this._windowStart = now;
      this._windowChunks = 0;
      this._windowBytes = 0;
    }
  }

  _computeArtery() {
    const now = _now();
    this._rollWindow(now);

    const elapsedMs = Math.max(1, now - this._windowStart);
    const chunksPerSec = (this._windowChunks / elapsedMs) * 1000;
    const bytesPerSec = (this._windowBytes / elapsedMs) * 1000;

    const throughput = _clamp01(chunksPerSec / 1024);
    const pressure = _clamp01(bytesPerSec / (64 * 1024 * 1024)); // 64MB/s symbolic ceiling
    const cost = _clamp01(pressure * (1 - throughput));
    const budget = _clamp01(throughput - cost);

    const artery = Object.freeze({
      id: this.config.id,
      timestamp: now,
      windowMs: this._windowMs,
      windowChunks: this._windowChunks,
      windowBytes: this._windowBytes,
      totalChunks: this._totalChunks,
      totalBytes: this._totalBytes,
      chunksPerSec,
      bytesPerSec,
      throughput,
      pressure,
      cost,
      budget,
      throughputBucket: _bucketLevel(throughput),
      pressureBucket: _bucketLevel(pressure),
      costBucket: _bucketLevel(cost),
      budgetBucket: _bucketLevel(budget)
    });

    const key = _registryKey(this.config.id);
    _globalChunkerRegistry.set(key, artery);

    return artery;
  }

  getChunkerArtery() {
    return this._computeArtery();
  }

  // ---------------------------------------------------------------------------
  //  META / INTROSPECTION
  // ---------------------------------------------------------------------------

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

  // ---------------------------------------------------------------------------
  //  PREWARM PATTERNS
  // ---------------------------------------------------------------------------

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
        chunkProfile:
          pattern.chunkProfile ||
          pattern.profile ||
          this.config.defaultProfile
      }
    });
    this.patterns.set(label, stored);
    return stored;
  }

  // ---------------------------------------------------------------------------
  //  PREWARM PROFILES
  // ---------------------------------------------------------------------------

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
        worldBand: profile.worldBand || "backend",
        backendKind: profile.backendKind || "generic",
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
        options.defaultChunkSize ??
        fromPattern.defaultChunkSize ??
        fromProfile.defaultChunkSize ??
        base.defaultChunkSize,
      maxChunkSize:
        options.maxChunkSize ??
        fromPattern.maxChunkSize ??
        fromProfile.maxChunkSize ??
        base.maxChunkSize,
      lanes:
        options.lanes ??
        fromPattern.lanes ??
        fromProfile.lanes ??
        base.lanes,
      band:
        options.band ??
        fromPattern.band ??
        fromProfile.band ??
        base.band,
      presenceBand:
        options.presenceBand ??
        fromPattern.presenceBand ??
        fromProfile.presenceBand ??
        base.presenceBand,
      worldBand:
        options.worldBand ??
        fromPattern.worldBand ??
        fromProfile.worldBand ??
        base.worldBand,
      backendKind:
        options.backendKind ??
        fromPattern.backendKind ??
        fromProfile.backendKind ??
        base.backendKind,
      chunkProfile:
        options.chunkProfile ??
        fromPattern.chunkProfile ??
        fromProfile.chunkProfile ??
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

  _assignLane(lanes) {
    const lane = this._laneCounter.value % lanes;
    this._laneCounter.value += 1;
    return lane;
  }

  // ---------------------------------------------------------------------------
  //  BINARY CHUNKING
  // ---------------------------------------------------------------------------

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

    for (let offset = 0; offset < totalLength; offset += chunkSize) {
      const lane = this._assignLane(profile.lanes);
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
          total: null,
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

      this._totalChunks += 1;
      this._totalBytes += slice.length;
      this._windowChunks += 1;
      this._windowBytes += slice.length;
    }

    for (const c of chunks) {
      c.meta.total = chunks.length;
    }

    if (this.config.trace) {
      console.log("[PulseAIChunker v24] chunkBinary", {
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

    this._computeArtery();

    return Object.freeze(chunks);
  }

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

  // ---------------------------------------------------------------------------
  //  JSON / SYMBOLIC CHUNKING
  // ---------------------------------------------------------------------------

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
      console.log("[PulseAIChunker v24] chunkJSON", {
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

  reassembleJSON(chunks = []) {
    const binary = this.reassembleBinary(chunks);
    const decoder = new TextDecoder();
    const json = decoder.decode(binary);
    return _safeJSONParse(json);
  }

  // ---------------------------------------------------------------------------
  //  TEXT CHUNKING
  // ---------------------------------------------------------------------------

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

  // ---------------------------------------------------------------------------
  //  LINE-ORIENTED TEXT CHUNKING
  // ---------------------------------------------------------------------------

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
    let currentLines = 0;

    const flush = () => {
      if (buffer.length === 0) return;
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

      const lane = this._assignLane(profile.lanes);

      const chunk = Object.freeze({
        meta: {
          chunkerId: this.config.id,
          ts,
          band: profile.band,
          type: "text_lines",
          lane,
          index: chunks.length,
          total: null,
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

      const stat = this.laneStats[lane];
      stat.chunks += 1;
      stat.bytes += bytes.length;
      stat.lastTs = ts;

      this._bumpProfileStats(profile.profileId, bytes.length, ts);

      this._totalChunks += 1;
      this._totalBytes += bytes.length;
      this._windowChunks += 1;
      this._windowBytes += bytes.length;

      buffer = [];
      currentLines = 0;
    };

    for (const line of lines) {
      buffer.push(line);
      currentLines += 1;
      if (currentLines >= maxLines) {
        flush();
      }
    }

    flush();

    for (const c of chunks) {
      c.meta.total = chunks.length;
    }

    if (this.config.trace) {
      console.log("[PulseAIChunker v24] chunkLines", {
        label: profile.label,
        profile: profile.profileId,
        band: profile.band,
        worldBand: profile.worldBand,
        backendKind: profile.backendKind,
        lines: lines.length,
        chunks: chunks.length
      });
    }

    this._computeArtery();

    return Object.freeze(chunks);
  }

  reassembleLines(chunks = []) {
    const text = this.reassembleText(chunks);
    return text.split(/\r?\n/);
  }

  // ---------------------------------------------------------------------------
  //  SEMANTIC HELPERS (BACKEND / WORLD / EVIDENCE)
// ---------------------------------------------------------------------------

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

  chunkWorldSnapshot(snapshot, options = {}) {
    return this.chunkJSON(snapshot, {
      ...options,
      backendKind: "world",
      worldBand: options.worldBand || "world",
      profile: options.profile || "world-state"
    });
  }

  chunkEvidence(evidence, options = {}) {
    return this.chunkJSON(evidence, {
      ...options,
      backendKind: "evidence",
      worldBand: options.worldBand || "world",
      profile: options.profile || "world-evidence"
    });
  }

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
//  FACTORY + DEFAULT SINGLETON
// ============================================================================

export function createPulseAIChunker(config = {}) {
  const core = new PulseAIChunker(config);

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
    getChunkerArtery: () => core.getChunkerArtery(),

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

export const pulseAIChunker = createPulseAIChunker({
  id: "PulseAIChunker-Default-v24",
  defaultChunkSize: 4096,
  maxChunkSize: 65536,
  trace: false,
  defaultProfile: "backend-default"
});
