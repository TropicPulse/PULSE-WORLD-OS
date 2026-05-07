// ============================================================================
// FILE: /PULSE-UI/_EVOLUTION/PulseEvolutionaryBinary-v20.js
// PULSE OS — v20-IMMORTAL-EVOLUTIONARY
// BINARY EVOLUTION ORGAN — SYMBOLIC↔BINARY ENVELOPE + ADVANTAGE + ARTERIES
// ============================================================================
//
// ROLE (v20-IMMORTAL-EVOLUTIONARY):
//   THE BINARY ARTERY ORGAN — deterministic symbolic↔binary envelope builder.
//   • Encodes symbolic payloads into binary bitstreams + compressed chunks.
//   • Wraps them in a schema-versioned envelope with advantage + artery hints.
//   • Decodes compressed chunks back into symbolic payloads (pure, deterministic).
//   • Exposes advantage snapshot for Brain / Router / PageEvo.
//
// CONTRACT:
//   • PURE ORGAN — no network, no timers, no eval, no dynamic imports.
//   • Binary is non-executable; metadata-only representation.
//   • Deterministic encode/decode + envelope construction.
//   • Route + lineage + artery hints are read-only, never mutated.
//
// SAFETY:
//   • v20 upgrade is EVOLUTIONARY + STRUCTURAL — richer envelope + advantage.
//   • All behavior is deterministic and organism-safe.
// ============================================================================

const g =
  typeof globalThis !== "undefined"
    ? globalThis
    : typeof global !== "undefined"
    ? global
    : typeof window !== "undefined"
    ? window
    : {};

const db =
  (g && g.db) ||
  (typeof global !== "undefined" && global.db) ||
  (typeof globalThis !== "undefined" && globalThis.db) ||
  (typeof window !== "undefined" && window.db) ||
  null;

// ---------------------------------------------------------------------------
// BINARY ROLE — v20 IMMORTAL EVOLUTIONARY
// ---------------------------------------------------------------------------
export const BinaryRole = {
  type: "Organ",
  subsystem: "UI",
  layer: "BinaryEvo",
  version: "20.0-Immortal-Evolutionary",
  identity: "PulseEvolutionaryBinary-v20",

  evo: {
    driftProof: true,
    deterministic: true,

    dualBand: true,
    symbolicAware: true,
    binaryAware: true,
    binaryNonExecutable: true,

    envelopeSchemaAware: true,
    advantageView: true,
    arteryAware: true,
    routeAware: true,
    lineageAware: true,

    unifiedAdvantageField: true,
    futureEvolutionReady: true,

    // v20 upgrades
    v20EnvelopeSchema: true,
    v20AdvantageEntropy: true,
    v20ArteryHints: true,
    v20BrainAligned: true,
    v20PageEvoAligned: true
  }
};

const MAX_JSON_LENGTH = 64 * 1024; // guard against runaway payloads (pure check only)
const ENVELOPE_SCHEMA_VERSION = "v4";

// ---------------------------------------------------------------------------
// SYMBOLIC ↔ BINARY
// ---------------------------------------------------------------------------
function encodeSymbolicToBinary(obj) {
  const json = JSON.stringify(obj || {});
  const safeJson =
    json.length > MAX_JSON_LENGTH ? json.slice(0, MAX_JSON_LENGTH) : json;

  const bits = [];
  for (let i = 0; i < safeJson.length; i++) {
    const code = safeJson.charCodeAt(i);
    for (let b = 7; b >= 0; b--) {
      bits.push((code >> b) & 1);
    }
  }
  return bits;
}

function decodeBinaryToSymbolic(bits) {
  if (!Array.isArray(bits) || bits.length % 8 !== 0) return null;

  let json = "";
  for (let i = 0; i < bits.length; i += 8) {
    let code = 0;
    for (let b = 0; b < 8; b++) {
      code = (code << 1) | (bits[i + b] & 1);
    }
    json += String.fromCharCode(code);
  }

  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// BINARY COMPRESSION (4-bit packing)
// ---------------------------------------------------------------------------
function compressBinary(bits) {
  const out = [];
  for (let i = 0; i < bits.length; i += 4) {
    const chunk =
      ((bits[i] || 0) << 3) |
      ((bits[i + 1] || 0) << 2) |
      ((bits[i + 2] || 0) << 1) |
      (bits[i + 3] || 0);
    out.push(chunk & 0xF);
  }
  return out;
}

function expandBinary(chunks) {
  const bits = [];
  if (!Array.isArray(chunks)) return bits;

  for (let i = 0; i < chunks.length; i++) {
    const c = chunks[i] & 0xF;
    bits.push((c >> 3) & 1);
    bits.push((c >> 2) & 1);
    bits.push((c >> 1) & 1);
    bits.push(c & 1);
  }
  return bits;
}

// ---------------------------------------------------------------------------
// CHECKSUM + ENVELOPE ID
// ---------------------------------------------------------------------------
function checksumChunks(chunks) {
  if (!Array.isArray(chunks)) return 0;
  let hash = 0;
  for (let i = 0; i < chunks.length; i++) {
    const v = chunks[i] & 0xFF;
    hash = (hash * 31 + v) >>> 0;
  }
  return hash;
}

function buildEnvelopeId(checksum, size, routeHash) {
  return `EBIN-${ENVELOPE_SCHEMA_VERSION}-${size}-${checksum}-${routeHash}`;
}

function hashString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) >>> 0;
  }
  return h >>> 0;
}

function normalizeBand(b) {
  const x = String(b || "symbolic").toLowerCase();
  return x === "binary" ? "binary" : "symbolic";
}

function clamp01(v) {
  const n = Number(v);
  if (!Number.isFinite(n)) return 0;
  if (n < 0) return 0;
  if (n > 1) return 1;
  return n;
}

// ---------------------------------------------------------------------------
// ADVANTAGE VIEW + ARTERY HINTS — v20
// ---------------------------------------------------------------------------
function computeAdvantageView({ bits, compressed, route, lineage }) {
  const bitLength = bits.length;
  const chunkLength = compressed.length;

  const density = bitLength ? chunkLength / bitLength : 0;
  const entropyHint =
    density > 0 ? clamp01(1 - Math.abs(0.5 - density) * 2) : 0;

  const routeStr =
    typeof route === "string" ? route : JSON.stringify(route || {});
  const lineageStr = JSON.stringify(lineage || {});

  const routeHash = hashString(routeStr);
  const lineageHash = hashString(lineageStr);

  const sizeTier =
    bitLength > 256 * 1024 ? "colossal" :
    bitLength > 48 * 1024  ? "huge" :
    bitLength > 24 * 1024  ? "large" :
    bitLength > 8 * 1024   ? "medium" :
    bitLength > 0          ? "small" :
                             "empty";

  return {
    bitLength,
    chunkLength,
    density,
    entropyHint,
    sizeTier,
    routeHash,
    lineageHash
  };
}

function deriveArteryHints(RouteOrgan) {
  const arteries = RouteOrgan?.Arteries || RouteOrgan?.arteries || null;
  if (!arteries || typeof arteries !== "object") {
    return {
      hasArteries: false,
      arteryCount: 0,
      dominant: null
    };
  }

  const keys = Object.keys(arteries);
  const count = keys.length;
  if (!count) {
    return {
      hasArteries: false,
      arteryCount: 0,
      dominant: null
    };
  }

  let dominant = keys[0];
  let maxWeight = 0;
  for (const k of keys) {
    const v = arteries[k];
    const w = typeof v === "number" ? v : v?.weight ?? 0;
    if (w > maxWeight) {
      maxWeight = w;
      dominant = k;
    }
  }

  return {
    hasArteries: true,
    arteryCount: count,
    dominant
  };
}

// ---------------------------------------------------------------------------
//– ENVELOPE BUILDER — v20
// ---------------------------------------------------------------------------
function buildEnvelope(payload, compressed, { Evolution, RouteOrgan }) {
  const lineage = Evolution?.getPageLineage?.() || {};
  const route = RouteOrgan?.RouterState?.currentRoute || "unknown";

  const size = compressed?.length || 0;
  const checksum = checksumChunks(compressed || []);

  const bits = expandBinary(compressed || []);
  const advantage = computeAdvantageView({
    bits,
    compressed: compressed || [],
    route,
    lineage
  });

  const routeStr =
    typeof route === "string" ? route : JSON.stringify(route || {});
  const routeHash = advantage.routeHash || hashString(routeStr);

  const envelopeId = buildEnvelopeId(checksum, size, routeHash);
  const arteryHints = deriveArteryHints(RouteOrgan);

  const integrity = {
    checksum,
    size,
    schemaVersion: ENVELOPE_SCHEMA_VERSION,
    sizeGuard: size >= 0 && size <= MAX_JSON_LENGTH * 2,
    checksumNonZero: checksum !== 0
  };

  return {
    schemaVersion: ENVELOPE_SCHEMA_VERSION,
    id: envelopeId,
    version: BinaryRole.version,
    route,
    lineage,
    band: normalizeBand(payload?.__band),
    compressed,
    checksum,
    size,
    arteryHints,
    advantage,
    integrity,
    timestamp: "NO_TIMESTAMP_v20"
  };
}

// ---------------------------------------------------------------------------
// FACTORY — PULSE EVOLUTIONARY BINARY v20
// ---------------------------------------------------------------------------
export function createPulseEvolutionaryBinary({
  Evolution,
  RouteOrgan,
  log = console.log,
  warn = console.warn
} = {}) {
  const BinaryState = {
    lastEncoded: null,
    lastDecoded: null,
    lastCompressed: null,
    lastExpanded: null,
    lastEnvelope: null,
    lastAdvantage: null
  };

  function safeLog(stage, details = {}) {
    try {
      log(
        "[PulseEvolutionaryBinary-v20]",
        stage,
        JSON.stringify({
          schemaVersion: ENVELOPE_SCHEMA_VERSION,
          identity: BinaryRole.identity,
          version: BinaryRole.version,
          ...details
        })
      );
    } catch {
      // never throw
    }
  }

  function encode(payload) {
    try {
      const bits = encodeSymbolicToBinary(payload);
      const compressed = compressBinary(bits);
      const envelope = buildEnvelope(payload, compressed, {
        Evolution,
        RouteOrgan
      });

      BinaryState.lastEncoded = bits;
      BinaryState.lastCompressed = compressed;
      BinaryState.lastEnvelope = envelope;
      BinaryState.lastAdvantage = envelope.advantage;

      safeLog("ENCODE_OK", {
        bitLength: bits.length,
        compressedLength: compressed.length,
        checksum: envelope.checksum,
        sizeTier: envelope.advantage.sizeTier
      });

      return {
        ok: true,
        bits,
        compressed,
        envelope,
        advantage: envelope.advantage
      };
    } catch (err) {
      const msg = String(err);
      warn("[PulseEvolutionaryBinary-v20] ENCODE_ERROR", msg);
      safeLog("ENCODE_ERROR", { error: msg });
      return { ok: false, error: "EncodeError" };
    }
  }

  function decode(compressed) {
    try {
      const bits = expandBinary(compressed || []);
      const obj = decodeBinaryToSymbolic(bits);

      BinaryState.lastExpanded = bits;
      BinaryState.lastDecoded = obj;

      safeLog("DECODE_OK", { bitLength: bits.length });
      return { ok: true, payload: obj };
    } catch (err) {
      const msg = String(err);
      warn("[PulseEvolutionaryBinary-v20] DECODE_ERROR", msg);
      safeLog("DECODE_ERROR", { error: msg });
      return { ok: false, error: "DecodeError" };
    }
  }

  const PulseEvolutionaryBinary = {
    BinaryRole,
    BinaryState,
    encode,
    decode,
    getAdvantageSnapshot() {
      return BinaryState.lastAdvantage || null;
    }
  };

  safeLog("INIT", {
    schemaVersion: ENVELOPE_SCHEMA_VERSION
  });

  return PulseEvolutionaryBinary;
}

// ---------------------------------------------------------------------------
// GLOBAL REGISTRATION (WINDOW-SAFE, IMMORTAL)
// ---------------------------------------------------------------------------
try {
  if (typeof window !== "undefined") {
    window.PulseEvolutionaryBinary = createPulseEvolutionaryBinary;
  }
  if (typeof globalThis !== "undefined") {
    globalThis.PulseEvolutionaryBinary = createPulseEvolutionaryBinary;
  }
  if (typeof global !== "undefined") {
    global.PulseEvolutionaryBinary = createPulseEvolutionaryBinary;
  }
  if (typeof g !== "undefined") {
    g.PulseEvolutionaryBinary = createPulseEvolutionaryBinary;
  }
} catch {
  // never throw
}
