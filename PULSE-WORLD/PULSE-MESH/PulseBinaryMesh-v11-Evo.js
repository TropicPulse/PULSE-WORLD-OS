// ============================================================================
// FILE: BinaryMesh-v13-EVO-PRIME.js
// BINARY MESH — v13-EVO-PRIME
// “PURE BINARY CONNECTIVE TISSUE / BINARY-FIRST / SYMBOLIC FALLBACK”
// ============================================================================
//
// ROLE:
//   • Primary binary connective tissue between binary organs.
//   • Zero symbolic data in the binary path (0/1 arrays only).
//   • Deterministic, drift-proof, mutation-safe.
//   • Presence-aware + dual-band.
//   • Falls back to symbolic PulseMesh when binary contract is violated.
//
// CONTRACT (v13):
//   • INPUT (data path):
//       - bits: number[] (0 or 1 only)
//   • INPUT (control path):
//       - from: string
//       - options: { band?, presenceTag?, trace? }
//   • OUTPUT:
//       - bits (unchanged) OR symbolic fallback result
//
// SAFETY:
//   • No randomness, no timing, no env access.
//   • No dynamic imports, no eval.
// ============================================================================

export const BinaryMeshMeta = Object.freeze({
  layer: "BinaryNervousSystem",
  role: "PURE_BINARY_MESH",
  version: "v13-EVO-PRIME",
  identity: "BinaryMesh-v13-EVO-PRIME",
  guarantees: Object.freeze({
    pureBinaryPath: true,
    zeroSymbolicInDataPath: true,
    deterministic: true,
    driftProof: true,
    mutationSafe: true,
    presenceAware: true,
    bandAware: true,
    noRandomness: true,
    noTiming: true,
    noEnvAccess: true
  }),
  contract: Object.freeze({
    inputDataPath: ["bits"],
    inputControlPath: ["from", "band", "presenceTag", "trace"],
    outputDataPath: ["bits"],
    outputFallback: ["fallbackResult"]
  })
});

// ============================================================================
// INTERNAL HELPERS
// ============================================================================
function isPureBinary(bits, maxBitsLength) {
  if (!Array.isArray(bits)) return false;
  const len = bits.length;
  if (len === 0 || len > maxBitsLength) return false;
  for (let i = 0; i < len; i++) {
    const b = bits[i];
    if (b !== 0 && b !== 1) return false;
  }
  return true;
}

// ============================================================================
// BINARY MESH FACTORY — v13-EVO-PRIME
// ============================================================================
export function createBinaryMesh({
  symbolicMesh,           // PulseMesh-v13 (symbolic fallback)
  trace = false,
  maxBitsLength = 64,
  defaultBand = "binary",
  defaultPresenceTag = "BinaryMesh-v13"
} = {}) {

  const links = Object.create(null);

  // -------------------------------------------------------------------------
  // LINK REGISTRATION (symbolic-only)
  // -------------------------------------------------------------------------
  function link(from, to) {
    links[from] = to;
  }

  // -------------------------------------------------------------------------
  // SYMBOLIC FALLBACK (binary → symbolic)
  // -------------------------------------------------------------------------
  function fallback(reason, from, bits, {
    band = defaultBand,
    presenceTag = defaultPresenceTag
  } = {}) {

    if (!symbolicMesh) {
      throw new Error(
        `BinaryMesh fallback (${reason}) from:${from} but no symbolicMesh provided`
      );
    }

    if (trace && typeof console !== "undefined") {
      console.warn(
        `[BinaryMesh v13] FALLBACK (${reason}) from:${from} band:${band} presence:${presenceTag}`,
        bits
      );
    }

    // Convert bits → symbolic packet
    const packet = {
      type: "binaryFallback",
      reason,
      from,
      bits,
      band,
      presenceTag
    };

    // Symbolic mesh handles the fallback
    return symbolicMesh.transmit(from, packet, {
      band: "symbolic",
      presenceTag: "PulseMesh-v13"
    });
  }

  // -------------------------------------------------------------------------
  // PURE BINARY TRANSMISSION (binary-first)
  // -------------------------------------------------------------------------
  function transmit(from, bits, {
    band = defaultBand,
    presenceTag = defaultPresenceTag
  } = {}) {

    const to = links[from];

    if (!to) {
      return fallback("missing-link", from, bits, { band, presenceTag });
    }

    if (!isPureBinary(bits, maxBitsLength)) {
      return fallback("non-binary-input", from, bits, { band, presenceTag });
    }

    if (trace && typeof console !== "undefined") {
      console.log(
        `[BinaryMesh v13] ${from} → ${to} band:${band} presence:${presenceTag}`,
        bits
      );
    }

    // Pure binary path — never mutate bits
    return bits;
  }

  // -------------------------------------------------------------------------
  // PUBLIC API
  // -------------------------------------------------------------------------
  return Object.freeze({
    meta: BinaryMeshMeta,
    link,
    transmit,
    fallback
  });
}

export default {
  BinaryMeshMeta,
  createBinaryMesh
};
