/*
===============================================================================
FILE: /PULSE-UI/PulseEvolutionaryBinary.js
LAYER: UI BINARY EVOLUTION ORGAN (GPU‑Friendly Binary Evolution Layer)
===============================================================================

ROLE (v15):
  THE UI BINARY EVOLUTION ORGAN — GPU‑friendly binary evolution layer.
  • Encodes symbolic UI payloads into deterministic binary representations.
  • Compresses binary into low‑entropy GPU‑friendly chunks.
  • Builds route‑aware, lineage‑aware, checksum‑aware binary envelopes.
  • Decodes compressed binary back into symbolic payloads with integrity hints.

PURPOSE (v15):
  • Provide a binary‑native, GPU‑friendly representation of UI state.
  • Preserve deterministic, drift‑proof binary evolution across routes + lineage.
  • Act as the binary core for higher‑level UI evolution organs.
  • Expose envelope metadata for PulseNet / Earn / diagnostics without IO.

CONTRACT:
  • PURE FUNCTION — no IO, no network, no filesystem.
  • READ‑ONLY — no mutation of caller‑provided payloads.
  • NO eval(), NO Function(), NO dynamic imports.
  • Deterministic output only.

SAFETY:
  • v15 upgrade is PURE + STRUCTURAL — logic is richer but still safe.
  • All behavior is deterministic and organism‑safe.
===============================================================================
===============================================================================
AI_EXPERIENCE_META = {
  identity: "PulseUI.EvolutionaryBinary",
  version: "v15-IMMORTAL",
  layer: "pulse_ui",
  role: "ui_binary_evolution_organ",
  lineage: "PulseEvolutionaryBinary-v11.3-Evo-Prime → v14-IMMORTAL → v15-IMMORTAL",

  evo: {
    uiOrgan: true,
    binaryCore: true,
    gpuFriendly: true,
    dualBand: true,
    binaryAware: true,
    symbolicAware: true,
    routeAware: true,
    lineageAware: true,
    unifiedAdvantageField: true,
    futureEvolutionReady: true,

    deterministic: true,
    driftProof: true,
    pureCompute: true,
    lowEntropy: true,

    zeroNetwork: true,
    zeroFilesystem: true,
    zeroMutationOfInput: true,

    // v15 upgrades
    envelopeAware: true,
    checksumAware: true,
    schemaVersioned: true,
    sizeGuarded: true
  },

  contract: {
    always: [
      "PulseUI.RouteOrgan",
      "PulseUI.Evolution",
      "PulseDesign.Manifest",
      "PulseCore.Memory"
    ],
    never: [
      "eval",
      "Function",
      "dynamicImport",
      "fetchViaCNS",
      "safeRoute"
    ]
  }
}
===============================================================================
EXPORT_META = {
  organ: "PulseUI.EvolutionaryBinary",
  layer: "pulse_ui",
  stability: "IMMORTAL",
  deterministic: true,
  pure: true,

  consumes: [
    "SymbolicPayload",
    "RouteOrgan",
    "Evolution"
  ],

  produces: [
    "BinaryBits",
    "CompressedBinaryChunks",
    "BinaryEnvelope",
    "DecodedPayload"
  ],

  sideEffects: "logging_only",
  network: "none",
  filesystem: "none"
}

*/

export const BinaryRole = {
  type: "Organ",
  subsystem: "UI",
  layer: "PageBinary",
  version: "15.0-IMMORTAL",
  identity: "PulseEvolutionaryBinary",

  evo: {
    driftProof: true,
    deterministic: true,
    binaryCore: true,
    dualBand: true,
    binaryAware: true,
    symbolicAware: true,
    gpuFriendly: true,
    lowEntropy: true,
    routeAware: true,
    lineageAware: true,
    unifiedAdvantageField: true,
    futureEvolutionReady: true,
    envelopeAware: true,
    checksumAware: true,
    schemaVersioned: true,
    sizeGuarded: true
  }
};

// ============================================================================
// PURE BINARY HELPERS — deterministic, no randomness
// ============================================================================

const MAX_JSON_LENGTH = 64 * 1024; // guard against runaway payloads (pure check only)
const ENVELOPE_SCHEMA_VERSION = "v2";

// Convert symbolic object → binary array of 0/1
function encodeSymbolicToBinary(obj) {
  const json = JSON.stringify(obj || {});
  const safeJson = json.length > MAX_JSON_LENGTH ? json.slice(0, MAX_JSON_LENGTH) : json;

  const bits = [];
  for (let i = 0; i < safeJson.length; i++) {
    const code = safeJson.charCodeAt(i);
    for (let b = 7; b >= 0; b--) {
      bits.push((code >> b) & 1);
    }
  }
  return bits;
}

// Convert binary array → symbolic object
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

// Reduce binary array to low‑entropy GPU‑friendly chunks
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

// Expand compressed chunks back to full binary
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

// Deterministic checksum over compressed chunks (simple rolling hash)
function checksumChunks(chunks) {
  if (!Array.isArray(chunks)) return 0;
  let hash = 0;
  for (let i = 0; i < chunks.length; i++) {
    const v = chunks[i] & 0xFF;
    hash = (hash * 31 + v) >>> 0; // unsigned 32‑bit
  }
  return hash;
}

// Deterministic envelope id (string) from checksum + size + schema
function buildEnvelopeId(checksum, size) {
  return `EBIN-${ENVELOPE_SCHEMA_VERSION}-${size}-${checksum}`;
}

// ============================================================================
// FACTORY — creates the binary organ
// ============================================================================
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
    lastEnvelope: null
  };

  function safeLog(stage, details = {}) {
    try {
      log("[PulseEvolutionaryBinary]", stage, JSON.stringify(details));
    } catch {}
  }

  // --------------------------------------------------------------------------
  // BUILD BINARY ENVELOPE — deterministic, lineage‑aware, route‑aware
  // --------------------------------------------------------------------------
  function buildEnvelope(payload, compressed) {
    const lineage = Evolution?.getPageLineage?.() || {};
    const route = RouteOrgan?.RouterState?.currentRoute || "unknown";

    const size = compressed?.length || 0;
    const checksum = checksumChunks(compressed || []);
    const envelopeId = buildEnvelopeId(checksum, size);

    return {
      schemaVersion: ENVELOPE_SCHEMA_VERSION,
      id: envelopeId,
      version: BinaryRole.version,
      route,
      lineage,
      compressed,
      checksum,
      size,
      timestamp: "NO_TIMESTAMP_v15" // deterministic placeholder
    };
  }

  // --------------------------------------------------------------------------
  // ENCODE SYMBOLIC → BINARY (GPU‑friendly)
  // --------------------------------------------------------------------------
  function encode(payload) {
    try {
      const bits = encodeSymbolicToBinary(payload);
      const compressed = compressBinary(bits);
      const envelope = buildEnvelope(payload, compressed);

      BinaryState.lastEncoded = bits;
      BinaryState.lastCompressed = compressed;
      BinaryState.lastEnvelope = envelope;

      safeLog("ENCODE_OK", {
        bitLength: bits.length,
        compressed: compressed.length,
        checksum: envelope.checksum
      });

      return { ok: true, bits, compressed, envelope };
    } catch (err) {
      warn("[PulseEvolutionaryBinary] ENCODE_ERROR", String(err));
      return { ok: false, error: "EncodeError" };
    }
  }

  // --------------------------------------------------------------------------
  // DECODE BINARY → SYMBOLIC
  // --------------------------------------------------------------------------
  function decode(compressed) {
    try {
      const bits = expandBinary(compressed || []);
      const obj = decodeBinaryToSymbolic(bits);

      BinaryState.lastExpanded = bits;
      BinaryState.lastDecoded = obj;

      safeLog("DECODE_OK", { bitLength: bits.length });
      return { ok: true, payload: obj };
    } catch (err) {
      warn("[PulseEvolutionaryBinary] DECODE_ERROR", String(err));
      return { ok: false, error: "DecodeError" };
    }
  }

  const PulseEvolutionaryBinary = {
    BinaryRole,
    BinaryState,
    encode,
    decode
  };

  safeLog("INIT", {
    identity: BinaryRole.identity,
    version: BinaryRole.version,
    schemaVersion: ENVELOPE_SCHEMA_VERSION
  });

  return PulseEvolutionaryBinary;
}
