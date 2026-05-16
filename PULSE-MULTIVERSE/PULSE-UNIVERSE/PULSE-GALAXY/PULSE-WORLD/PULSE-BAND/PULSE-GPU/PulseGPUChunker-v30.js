// ============================================================================
//  PulseGPUChunker v30.0-IMMORTAL-INTEL-OMEGA
//  32-LANE GPU CHUNKER — BINARY + SYMBOLIC + GPU-ORGANISM GRADE
//  GPU Chunk Organ for PulseGPU v24+/v30+ (steps, traces, pressure, warm-path, CI)
//  v30++: Binary-Index Surfaces + Dual-Hash INTEL + Session Surfaces
// ============================================================================
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝


// ============================================================================
//  META — v30 IMMORTAL-INTEL-OMEGA
// ============================================================================

export const PulseGPUChunkerMeta = Object.freeze({
  id: "PulseGPUChunker-v30-IMMORTAL-INTEL-OMEGA",
  version: "30.0-IMMORTAL-INTEL-OMEGA",
  lanes: 32,
  epoch: "PulseGPU-Organism",
  role: "GPU-Chunker",
  intel: {
    binaryIndexSurface: true,
    sessionSurface: true,
    dualHashIntel: true,
    gpuModeAware: true,
    gpuTierAware: true,
    gpuStreamAware: true,
    chunkProfileAware: true
  },
  safety: {
    deterministic: true,
    noNetwork: true,
    noFilesystem: true,
    noGPUCalls: true,
    noRandomness: true
  }
});

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
  throw new TypeError("Unsupported binary input type for PulseGPUChunker.");
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

// INTEL hash — structure-aware, deterministic
function _hashIntel(payload) {
  const base = JSON.stringify(payload || "");
  let h = 0;
  for (let i = 0; i < base.length; i++) {
    const c = base.charCodeAt(i);
    h = (h * 131 + c * (i + 7)) % 1000000007;
  }
  return `HINTEL_${h}`;
}

function _buildDualHash(label, intelPayload, classicString) {
  const intelBase = {
    label,
    intel: intelPayload || {},
    classic: classicString || ""
  };
  const intel = _hashIntel(intelBase);
  const classic = _hashString(`${label}::${classicString || ""}`);
  return { intel, classic };
}

// Build a deterministic GPU session id for a payload + gpu context + profile
function _buildGPUSessionId({
  gpuContextHash,
  gpuMode,
  gpuStream,
  gpuTier,
  chunkProfile,
  payloadHash
}) {
  const seed = JSON.stringify({
    gpuContextHash: gpuContextHash || null,
    gpuMode: gpuMode || "mixed",
    gpuStream: gpuStream || "continuous", // continuous | burst | single
    gpuTier: gpuTier || "default", // default | warm | hot | critical
    chunkProfile: chunkProfile || "gpu-default",
    payloadHash: payloadHash || null
  });
  return _hashString(seed);
}

// v30++: binary index surface per chunk
function _buildBinaryIndexSurface({
  sessionId,
  index,
  total,
  lane,
  band,
  type,
  size
}) {
  const classic = `BINIDX::${sessionId || "NO_SESSION"}::i:${index}::t:${total}::lane:${lane}::band:${band}::type:${type}::size:${size}`;
  const intelPayload = {
    sessionId: sessionId || null,
    index,
    total,
    lane,
    band,
    type,
    size
  };
  return _buildDualHash("PULSE_GPU_CHUNK_BINARY_INDEX_V30", intelPayload, classic);
}

// v30++: session surface (per chunk stream)
function _buildSessionSurface({
  sessionId,
  payloadHash,
  gpuMode,
  gpuStream,
  gpuTier,
  chunkProfile
}) {
  const classic = `SESSION::${sessionId || "NO_SESSION"}::ph:${payloadHash || "NO_PAYLOAD"}::mode:${gpuMode}::stream:${gpuStream}::tier:${gpuTier}::profile:${chunkProfile}`;
  const intelPayload = {
    sessionId: sessionId || null,
    payloadHash: payloadHash || null,
    gpuMode,
    gpuStream,
    gpuTier,
    chunkProfile
  };
  return _buildDualHash("PULSE_GPU_CHUNK_SESSION_V30", intelPayload, classic);
}

// ============================================================================
//  CLASS — 32-LANE GPU CHUNKER (v30 IMMORTAL-INTEL-OMEGA)
// ============================================================================

export class PulseGPUChunker {
  constructor(config = {}) {
    this.config = Object.freeze({
      id: config.id || PulseGPUChunkerMeta.id,
      defaultChunkSize: config.defaultChunkSize || 4096,
      maxChunkSize: config.maxChunkSize || 65536,
      lanes: PulseGPUChunkerMeta.lanes,
      trace: !!config.trace,
      defaultProfile: config.defaultProfile || "gpu-default"
    });

    this.laneStats = new Array(this.config.lanes).fill(null).map((_, lane) =>
      Object.seal({
        lane,
        chunks: 0,
        bytes: 0,
        lastTs: null
      })
    );

    this.patterns = new Map();     // label -> pattern
    this.profiles = new Map();     // profileId -> profileConfig
    this.profileStats = new Map(); // profileId -> stats
  }

  // --------------------------------------------------------------------------
  //  META
  // --------------------------------------------------------------------------
  getMeta() {
    return PulseGPUChunkerMeta;
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
  //  PREWARM PATTERN (label-based, GPU-aware, v30 intel surfaces)
// --------------------------------------------------------------------------
  prewarmPattern(label, pattern = {}) {
    if (!label) return;
    const ts = _now();
    const basePattern = {
      defaultChunkSize:
        pattern.defaultChunkSize || this.config.defaultChunkSize,
      maxChunkSize: pattern.maxChunkSize || this.config.maxChunkSize,
      lanes: pattern.lanes || this.config.lanes,
      band: pattern.band || "dual", // binary | symbolic | dual
      profile: pattern.profile || this.config.defaultProfile,
      gpuMode: pattern.gpuMode || "mixed", // binary | symbolic | dual
      gpuStream: pattern.gpuStream || "continuous",
      gpuTier: pattern.gpuTier || "default",
      chunkProfile:
        pattern.chunkProfile || pattern.profile || this.config.defaultProfile
    };

    const intelSig = _buildDualHash(
      "PULSE_GPU_CHUNK_PATTERN_V30",
      {
        label,
        ts,
        pattern: basePattern
      },
      `PATTERN::${label}::profile:${basePattern.profile}::band:${basePattern.band}::mode:${basePattern.gpuMode}::stream:${basePattern.gpuStream}::tier:${basePattern.gpuTier}`
    );

    const stored = Object.freeze({
      label,
      ts,
      pattern: basePattern,
      intelSignature: intelSig.intel,
      classicSignature: intelSig.classic
    });

    this.patterns.set(label, stored);
    return stored;
  }

  // --------------------------------------------------------------------------
  //  PREWARM PROFILE (GPU profiles, v30 intel surfaces)
// --------------------------------------------------------------------------
  prewarmProfile(profileId, profile = {}) {
    if (!profileId) return;
    const ts = _now();
    const baseConfig = {
      defaultChunkSize:
        profile.defaultChunkSize || this.config.defaultChunkSize,
      maxChunkSize: profile.maxChunkSize || this.config.maxChunkSize,
      lanes: profile.lanes || this.config.lanes,
      band: profile.band || "dual",
      gpuMode: profile.gpuMode || "mixed",
      gpuStream: profile.gpuStream || "continuous",
      gpuTier: profile.gpuTier || "default",
      chunkProfile: profile.chunkProfile || profileId
    };

    const intelSig = _buildDualHash(
      "PULSE_GPU_CHUNK_PROFILE_V30",
      {
        profileId,
        ts,
        config: baseConfig
      },
      `PROFILE::${profileId}::band:${baseConfig.band}::mode:${baseConfig.gpuMode}::stream:${baseConfig.gpuStream}::tier:${baseConfig.gpuTier}`
    );

    const stored = Object.freeze({
      profileId,
      ts,
      config: baseConfig,
      intelSignature: intelSig.intel,
      classicSignature: intelSig.classic
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
      gpuMode: options.gpuMode || "mixed",
      gpuStream: options.gpuStream || "continuous",
      gpuTier: options.gpuTier || "default",
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
      gpuMode:
        options.gpuMode ||
        fromPattern.gpuMode ||
        fromProfile.gpuMode ||
        base.gpuMode,
      gpuStream:
        options.gpuStream ||
        fromPattern.gpuStream ||
        fromProfile.gpuStream ||
        base.gpuStream,
      gpuTier:
        options.gpuTier ||
        fromPattern.gpuTier ||
        fromProfile.gpuTier ||
        base.gpuTier,
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
  //  BINARY CHUNKING (GPU-safe, v30 binary index surfaces)
//  - options: { band, label, profile, gpuMode, gpuStream, gpuTier, chunkProfile, gpuContextHash }
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
    const sessionId = _buildGPUSessionId({
      gpuContextHash: options.gpuContextHash,
      gpuMode: profile.gpuMode,
      gpuStream: profile.gpuStream,
      gpuTier: profile.gpuTier,
      chunkProfile: profile.chunkProfile,
      payloadHash
    });

    const sessionSurface = _buildSessionSurface({
      sessionId,
      payloadHash,
      gpuMode: profile.gpuMode,
      gpuStream: profile.gpuStream,
      gpuTier: profile.gpuTier,
      chunkProfile: profile.chunkProfile
    });

    const chunks = [];
    const laneCounter = { value: 0 };

    for (let offset = 0; offset < totalLength; offset += chunkSize) {
      const lane = this._assignLane(laneCounter, profile.lanes);
      const end = Math.min(offset + chunkSize, totalLength);
      const slice = bytes.subarray(offset, end);

      const index = chunks.length;
      const size = slice.length;

      const binIndexSurface = _buildBinaryIndexSurface({
        sessionId,
        index,
        total: null, // filled after loop
        lane,
        band: profile.band,
        type: "binary",
        size
      });

      const chunk = Object.freeze({
        meta: {
          chunkerId: this.config.id,
          ts,
          band: profile.band,
          type: "binary",
          lane,
          index,
          total: null,
          label: profile.label,
          profile: profile.profileId,
          size,
          gpuMode: profile.gpuMode,
          gpuStream: profile.gpuStream,
          gpuTier: profile.gpuTier,
          chunkProfile: profile.chunkProfile,
          sessionId,
          payloadHash,
          gpuContextHash: options.gpuContextHash || null,
          // v30++ intel surfaces
          binaryIndexClassic: binIndexSurface.classic,
          binaryIndexIntel: binIndexSurface.intel,
          sessionClassic: sessionSurface.classic,
          sessionIntel: sessionSurface.intel
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

    const totalChunks = chunks.length;
    for (const c of chunks) {
      c.meta.total = totalChunks;
      // rebuild binary index classic/intel with total included
      const updatedSurface = _buildBinaryIndexSurface({
        sessionId: c.meta.sessionId,
        index: c.meta.index,
        total: totalChunks,
        lane: c.meta.lane,
        band: c.meta.band,
        type: c.meta.type,
        size: c.meta.size
      });
      c.meta.binaryIndexClassic = updatedSurface.classic;
      c.meta.binaryIndexIntel = updatedSurface.intel;
    }

    if (this.config.trace) {
      console.log("[PulseGPUChunker v30] chunkBinary", {
        label: profile.label,
        profile: profile.profileId,
        band: profile.band,
        gpuMode: profile.gpuMode,
        gpuStream: profile.gpuStream,
        gpuTier: profile.gpuTier,
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
  //  JSON / SYMBOLIC CHUNKING (GPU symbolic payloads)
//  - options: { band, label, profile, gpuMode, gpuStream, gpuTier, chunkProfile, gpuContextHash }
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
      gpuMode: profile.gpuMode,
      gpuStream: profile.gpuStream,
      gpuTier: profile.gpuTier,
      chunkProfile: profile.chunkProfile,
      gpuContextHash: options.gpuContextHash
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
      console.log("[PulseGPUChunker v30] chunkJSON", {
        label: profile.label,
        profile: profile.profileId,
        band: profile.band,
        gpuMode: profile.gpuMode,
        gpuStream: profile.gpuStream,
        gpuTier: profile.gpuTier,
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
  //  TEXT CHUNKING (GPU traces / logs)
// --------------------------------------------------------------------------
  chunkText(text, options = {}) {
    const profile = this._resolveProfile({
      ...options,
      band: options.band || "symbolic"
    });

    const s = _safeString(text);
    const encoder = new TextEncoder();
    const bytes = encoder.encode(s);

    return this.chunkBinary(bytes, {
      band: profile.band,
      label: profile.label,
      profile: profile.profileId,
      gpuMode: profile.gpuMode,
      gpuStream: profile.gpuStream,
      gpuTier: profile.gpuTier,
      chunkProfile: profile.chunkProfile,
      gpuContextHash: options.gpuContextHash
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
  //  LINE-ORIENTED CHUNKING (GPU logs/traces)
// --------------------------------------------------------------------------
  chunkLines(text, options = {}) {
    const profile = this._resolveProfile({
      ...options,
      band: options.band || "symbolic"
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
      const sessionId = _buildGPUSessionId({
        gpuContextHash: options.gpuContextHash,
        gpuMode: profile.gpuMode,
        gpuStream: profile.gpuStream,
        gpuTier: profile.gpuTier,
        chunkProfile: profile.chunkProfile,
        payloadHash
      });

      const sessionSurface = _buildSessionSurface({
        sessionId,
        payloadHash,
        gpuMode: profile.gpuMode,
        gpuStream: profile.gpuStream,
        gpuTier: profile.gpuTier,
        chunkProfile: profile.chunkProfile
      });

      const size = bytes.length;

      const binIndexSurface = _buildBinaryIndexSurface({
        sessionId,
        index,
        total: totalPlaceholder,
        lane,
        band: profile.band,
        type: "text_lines",
        size
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
          size,
          gpuMode: profile.gpuMode,
          gpuStream: profile.gpuStream,
          gpuTier: profile.gpuTier,
          chunkProfile: profile.chunkProfile,
          sessionId,
          payloadHash,
          gpuContextHash: options.gpuContextHash || null,
          binaryIndexClassic: binIndexSurface.classic,
          binaryIndexIntel: binIndexSurface.intel,
          sessionClassic: sessionSurface.classic,
          sessionIntel: sessionSurface.intel
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

    const totalChunks = chunks.length;
    for (const c of chunks) {
      c.meta.total = totalChunks;
      const updatedSurface = _buildBinaryIndexSurface({
        sessionId: c.meta.sessionId,
        index: c.meta.index,
        total: totalChunks,
        lane: c.meta.lane,
        band: c.meta.band,
        type: c.meta.type,
        size: c.meta.size
      });
      c.meta.binaryIndexClassic = updatedSurface.classic;
      c.meta.binaryIndexIntel = updatedSurface.intel;
    }

    if (this.config.trace) {
      console.log("[PulseGPUChunker v30] chunkLines", {
        label: profile.label,
        profile: profile.profileId,
        band: profile.band,
        gpuMode: profile.gpuMode,
        gpuStream: profile.gpuStream,
        gpuTier: profile.gpuTier,
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
  //  GPU HELPERS — semantic wrappers around JSON chunking
  // --------------------------------------------------------------------------

  // GPU step (single step record)
  chunkGPUStep(step, options = {}) {
    return this.chunkJSON(step, {
      ...options,
      profile: options.profile || "gpu-step",
      band: options.band || "symbolic",
      gpuMode: options.gpuMode || "mixed"
    });
  }

  // GPU session trace (array of steps / frames)
  chunkGPUTace(trace, options = {}) {
    return this.chunkJSON(trace, {
      ...options,
      profile: options.profile || "gpu-trace",
      band: options.band || "symbolic",
      gpuMode: options.gpuMode || "mixed"
    });
  }

  // GPU pressure snapshot
  chunkGPUPressure(pressureSnapshot, options = {}) {
    return this.chunkJSON(pressureSnapshot, {
      ...options,
      profile: options.profile || "gpu-pressure",
      band: options.band || "symbolic",
      gpuMode: options.gpuMode || "mixed"
    });
  }

  // GPU warm-path hints
  chunkGPUWarmPath(warmPathHints, options = {}) {
    return this.chunkJSON(warmPathHints, {
      ...options,
      profile: options.profile || "gpu-warm-path",
      band: options.band || "symbolic",
      gpuMode: options.gpuMode || "mixed"
    });
  }

  // GPU dispatch frame (symbolic/binary routing info)
  chunkGPUDispatch(dispatchFrame, options = {}) {
    return this.chunkJSON(dispatchFrame, {
      ...options,
      profile: options.profile || "gpu-dispatch",
      band: options.band || "dual",
      gpuMode: options.gpuMode || "mixed"
    });
  }

  // GPU CI frame
  chunkGPUCI(ciFrame, options = {}) {
    return this.chunkJSON(ciFrame, {
      ...options,
      profile: options.profile || "gpu-ci",
      band: options.band || "symbolic",
      gpuMode: options.gpuMode || "mixed"
    });
  }

  // GPU genetic memory pattern
  chunkGPUGeneticPattern(pattern, options = {}) {
    return this.chunkJSON(pattern, {
      ...options,
      profile: options.profile || "gpu-genetic",
      band: options.band || "symbolic",
      gpuMode: options.gpuMode || "mixed"
    });
  }

  // GPU insight frame (Wisdom Cortex output)
  chunkGPUInsight(insight, options = {}) {
    return this.chunkJSON(insight, {
      ...options,
      profile: options.profile || "gpu-insight",
      band: options.band || "symbolic",
      gpuMode: options.gpuMode || "mixed"
    });
  }
}

// ============================================================================
//  FACTORY
// ============================================================================

export function createPulseGPUChunker(config = {}) {
  const core = new PulseGPUChunker(config);

  // Canonical GPU profiles (v30 keeps v24 semantics, adds intel surfaces)
  core.prewarmProfile("gpu-default", {
    gpuMode: "mixed",
    gpuStream: "continuous",
    gpuTier: "default",
    chunkProfile: "gpu-default"
  });

  core.prewarmProfile("gpu-step", {
    gpuMode: "symbolic",
    gpuStream: "continuous",
    gpuTier: "default",
    chunkProfile: "gpu-step"
  });

  core.prewarmProfile("gpu-trace", {
    gpuMode: "symbolic",
    gpuStream: "continuous",
    gpuTier: "default",
    chunkProfile: "gpu-trace"
  });

  core.prewarmProfile("gpu-pressure", {
    gpuMode: "symbolic",
    gpuStream: "burst",
    gpuTier: "hot",
    chunkProfile: "gpu-pressure"
  });

  core.prewarmProfile("gpu-warm-path", {
    gpuMode: "symbolic",
    gpuStream: "continuous",
    gpuTier: "warm",
    chunkProfile: "gpu-warm-path"
  });

  core.prewarmProfile("gpu-dispatch", {
    gpuMode: "mixed",
    gpuStream: "burst",
    gpuTier: "default",
    chunkProfile: "gpu-dispatch"
  });

  core.prewarmProfile("gpu-ci", {
    gpuMode: "symbolic",
    gpuStream: "burst",
    gpuTier: "hot",
    chunkProfile: "gpu-ci"
  });

  core.prewarmProfile("gpu-genetic", {
    gpuMode: "symbolic",
    gpuStream: "single",
    gpuTier: "default",
    chunkProfile: "gpu-genetic"
  });

  core.prewarmProfile("gpu-insight", {
    gpuMode: "symbolic",
    gpuStream: "burst",
    gpuTier: "default",
    chunkProfile: "gpu-insight"
  });

  return Object.freeze({
    meta: PulseGPUChunkerMeta,
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

    chunkGPUStep: (step, options) => core.chunkGPUStep(step, options),
    chunkGPUTace: (trace, options) => core.chunkGPUTace(trace, options),
    chunkGPUPressure: (pressure, options) =>
      core.chunkGPUPressure(pressure, options),
    chunkGPUWarmPath: (warmPath, options) =>
      core.chunkGPUWarmPath(warmPath, options),
    chunkGPUDispatch: (frame, options) =>
      core.chunkGPUDispatch(frame, options),
    chunkGPUCI: (ciFrame, options) => core.chunkGPUCI(ciFrame, options),
    chunkGPUGeneticPattern: (pattern, options) =>
      core.chunkGPUGeneticPattern(pattern, options),
    chunkGPUInsight: (insight, options) =>
      core.chunkGPUInsight(insight, options)
  });
}

// ============================================================================
//  DEFAULT SINGLETON (GPU-DEFAULT PROFILE, v30)
// ============================================================================

export const pulseGPUChunker = createPulseGPUChunker({
  id: "PulseGPUChunker-Default-v30-IMMORTAL-INTEL-OMEGA",
  defaultChunkSize: 4096,
  maxChunkSize: 65536,
  trace: false,
  defaultProfile: "gpu-default"
});
