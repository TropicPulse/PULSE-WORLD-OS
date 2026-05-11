// ============================================================================
// FILE: /PulseOS/PULSE-TOOLS/PulseBinaryLoopScanner-v16.js
// PULSE OS — v16-IMMORTAL
// MAIN LOOP ORGAN — PURE BINARY, DUAL-BAND, ARTERY-AWARE, ZERO-DRIFT
// ============================================================================
// ROLE (v16-IMMORTAL):
//   - Convert binary pulses → deterministic loop indices (all layers).
//   - Drive sweep lines for ALL PulseOS layers (body/home/town/node/etc).
//   - Provide multiple loop “personalities” (standard/deep/multi/edge/flat).
//   - Multi-spin aware: phase offsets alter loop paths without randomness.
//   - Dual-band aware: optional presence/harmonics can bias paths, still deterministic.
//   - Artery-aware: exposes loop load/pressure + window-safe buckets.
//   - Advantage view: can emit multi-mode indices + symbolic hints in one shot.
//   - Zero randomness, zero timestamps, zero mutation of inputs.
//   - Pairs with BinaryPulse‑v16‑IMMORTAL + BinaryWaveScanner‑v16‑IMMORTAL.
// ---------------------------------------------------------------------------
// LOOP MODES (v16-IMMORTAL, API-COMPATIBLE):
//   • nextIndex       → standard loop index (fast, responsive, dual-band aware)
//   • nextIndexDeep   → slower, deeper, stable sweep (MRI-like)
//   • nextIndexMulti  → 3-phase multi-spin loop indices
//   • nextIndexEdge   → edge-biased sweep (outline emphasis)
//   • nextIndexFlat   → low-variance, stable sweep (calming mode)
// ---------------------------------------------------------------------------
// NOTE:
//   - Signature kept v11-compatible. Extra influence comes via optional params:
//       nextIndex(bits, max, spinPhase = 0, presence = 0, harmonicBias = 0)
//       nextIndexDeep(bits, max, spinPhase = 0, presence = 0, harmonicBias = 0)
//       nextIndexMulti(bits, max, presence = 0, harmonicBias = 0)
//       nextIndexEdge(bits, max, spinPhase = 0, presence = 0, harmonicBias = 0)
//       nextIndexFlat(bits, max, presence = 0, harmonicBias = 0)
//   - Callers that ignore presence/harmonicBias get pure v11 behavior.
//   - v16 adds: artery snapshots, window buckets, advantage view, dual-band prewarm.
// ============================================================================
import {
  OrganismIdentity,
  buildPulseOrganismMap as buildOrganismMap
} from "../PULSE-X/PulseWorldOrganismMap-v24.js";
const Identity = OrganismIdentity(import.meta.url);

// 2 — EXPORT GENOME METADATA
export const BinaryLoopScannerMeta = Identity.OrganMeta;
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
// export const WBC_CONTEXT = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

// ============================================================================
// PACKET EMITTER — deterministic, loop-scoped
// ============================================================================

function emitLoopPacket(type, payload, { severity = "info" } = {}) {
  return Object.freeze({
    meta: BinaryLoopScannerMeta,
    packetType: `loop-${type}`,
    epoch: BinaryLoopScannerMeta.evo.epoch,
    severity,
    ...payload
  });
}

// ============================================================================
// PREWARM — v16-IMMORTAL dual-band warmup (no GPU load, pure symbolic)
// ============================================================================

export function prewarmBinaryLoopScanner(dualBand = null, { trace = false } = {}) {
  const presence =
    dualBand?.symbolic?.presence?.level ??
    dualBand?.symbolic?.presenceLevel ??
    0;

  const harmonicBias =
    dualBand?.symbolic?.harmonics?.bias ??
    dualBand?.symbolic?.harmonicBias ??
    0;

  const mode =
    dualBand?.symbolic?.loop?.mode ||
    "standard";

  const packet = emitLoopPacket("prewarm", {
    message: "Binary loop scanner prewarmed and dual-band overlays aligned.",
    presence,
    harmonicBias,
    mode
  });

  if (trace) {
     
    console.log("[BinaryLoopScanner-v16] prewarm", packet);
  }

  return packet;
}

// ============================================================================
// MAIN ORGAN IMPLEMENTATION — v16-IMMORTAL
// ============================================================================

export function createBinaryLoopScanner({ trace = false } = {}) {
  // -------------------------------------------------------------------------
  // ARTERY — loop load/pressure metrics (window-safe)
  // -------------------------------------------------------------------------
  const artery = {
    loops: 0,
    lastMode: null,
    lastIndex: null,
    lastIndices: null,
    lastBits: 0,
    snapshot: () => Object.freeze(_snapshotArtery())
  };

  function _bucketLoad(v) {
    if (v >= 0.9) return "saturated";
    if (v >= 0.7) return "high";
    if (v >= 0.4) return "medium";
    if (v > 0)   return "low";
    return "idle";
  }

  function _bucketPressure(v) {
    if (v >= 0.9) return "overload";
    if (v >= 0.7) return "high";
    if (v >= 0.4) return "medium";
    if (v > 0)   return "low";
    return "none";
  }

  function _snapshotArtery() {
    const { loops, lastBits } = artery;
    const load = Math.min(1, loops / 4096);
    const pressure = Math.min(1, lastBits / 4096);

    return {
      loops,
      lastMode: artery.lastMode,
      lastIndex: artery.lastIndex,
      lastIndices: artery.lastIndices,
      lastBits,
      load,
      loadBucket: _bucketLoad(load),
      pressure,
      pressureBucket: _bucketPressure(pressure)
    };
  }

  function _updateArtery({ mode, bitsLength, index = null, indices = null }) {
    artery.loops++;
    artery.lastMode = mode;
    artery.lastBits = bitsLength;
    artery.lastIndex = index;
    artery.lastIndices = indices;
  }

  // -------------------------------------------------------------------------
  // SAFETY: PURE BINARY ONLY
  // -------------------------------------------------------------------------
  function isPureBinary(bits) {
    if (!Array.isArray(bits)) return false;
    for (let i = 0; i < bits.length; i++) {
      if (bits[i] !== 0 && bits[i] !== 1) return false;
    }
    return true;
  }

  // -------------------------------------------------------------------------
  // CORE: BINARY → NUMBER (DETERMINISTIC)
  // -------------------------------------------------------------------------
  function bitsToNumber(bits) {
    let n = 0;
    for (let i = 0; i < bits.length; i++) {
      n = (n << 1) | bits[i];
    }
    return n >>> 0;
  }

  // -------------------------------------------------------------------------
  // DUAL-BAND BIAS (PRESENCE + HARMONICS) — PURE, DETERMINISTIC
  // -------------------------------------------------------------------------
  function dualBandOffset(max, presence = 0, harmonicBias = 0) {
    const p = clamp(presence, 0, 1);
    const h = clamp(harmonicBias, 0, 1);

    // small, bounded offset: at most ~10% of max
    const combined = (p * 0.6 + h * 0.4); // 0..1
    const offset = Math.floor(combined * max * 0.1);

    return offset;
  }

  function _windowBucket(index, max) {
    if (max <= 0) return "none";
    const r = index / max;
    if (r < 0.15) return "head";
    if (r < 0.35) return "front";
    if (r < 0.65) return "center";
    if (r < 0.85) return "back";
    return "tail";
  }

  // ========================================================================
  // MODE 1 — STANDARD LOOP INDEX (FAST, RESPONSIVE, DUAL-BAND AWARE)
  // ========================================================================
  function nextIndex(bits, max, spinPhase = 0, presence = 0, harmonicBias = 0) {
    if (!isPureBinary(bits)) {
      throw new Error("[BinaryLoopScanner‑16] non-binary bits passed to nextIndex");
    }
    if (!Number.isFinite(max) || max <= 0) {
      throw new Error("[BinaryLoopScanner‑16] invalid max passed to nextIndex");
    }

    const base = bitsToNumber(bits);
    const raw = base % max;

    const spin = ((raw + (spinPhase | 0)) % max + max) % max;
    const offset = dualBandOffset(max, presence, harmonicBias);

    const index = ((spin + offset) % max + max) % max;

    _updateArtery({
      mode: "standard",
      bitsLength: bits.length,
      index
    });

    if (trace) {
       
      console.log("[BinaryLoopScanner‑16] STANDARD", {
        base,
        raw,
        spin,
        offset,
        index,
        windowBucket: _windowBucket(index, max)
      });
    }

    return index;
  }

  // ========================================================================
  // MODE 2 — DEEP LOOP INDEX (SLOW, MRI-LIKE, DEPTH-WEIGHTED)
// ========================================================================
  function nextIndexDeep(bits, max, spinPhase = 0, presence = 0, harmonicBias = 0) {
    if (!isPureBinary(bits)) {
      throw new Error("[BinaryLoopScanner‑16] non-binary bits passed to nextIndexDeep");
    }
    if (!Number.isFinite(max) || max <= 0) {
      throw new Error("[BinaryLoopScanner‑16] invalid max passed to nextIndexDeep");
    }

    const base = bitsToNumber(bits);
    const folded = (base ^ (base >>> 1)) >>> 0; // Gray-code style fold
    const raw = folded % max;

    const depthBias = Math.floor((bits.length % 17) * 0.07 * max); // stable, bit-length based
    const spin = ((raw + depthBias + (spinPhase | 0)) % max + max) % max;
    const offset = dualBandOffset(max, presence * 0.7, harmonicBias * 1.1);

    const index = ((spin + offset) % max + max) % max;

    _updateArtery({
      mode: "deep",
      bitsLength: bits.length,
      index
    });

    if (trace) {
       
      console.log("[BinaryLoopScanner‑16] DEEP", {
        base,
        folded,
        raw,
        depthBias,
        spin,
        offset,
        index,
        windowBucket: _windowBucket(index, max)
      });
    }

    return index;
  }

  // ========================================================================
  // MODE 3 — MULTI LOOP (3-PHASE MULTI-SPIN INDICES)
// ========================================================================
  function nextIndexMulti(bits, max, presence = 0, harmonicBias = 0) {
    if (!isPureBinary(bits)) {
      throw new Error("[BinaryLoopScanner‑16] non-binary bits passed to nextIndexMulti");
    }
    if (!Number.isFinite(max) || max <= 0) {
      throw new Error("[BinaryLoopScanner‑16] invalid max passed to nextIndexMulti");
    }

    const base = bitsToNumber(bits);
    const raw = base % max;

    const offset = dualBandOffset(max, presence, harmonicBias);
    const phaseStep = Math.max(1, Math.floor(max / 3));

    const indices = [0, 1, 2].map((i) => {
      const phase = i * phaseStep;
      const idx = ((raw + phase + offset) % max + max) % max;
      return idx;
    });

    _updateArtery({
      mode: "multi",
      bitsLength: bits.length,
      indices
    });

    if (trace) {
       
      console.log("[BinaryLoopScanner‑16] MULTI", {
        base,
        raw,
        offset,
        indices,
        windows: indices.map((i) => _windowBucket(i, max))
      });
    }

    return indices;
  }

  // ========================================================================
  // MODE 4 — EDGE LOOP (OUTLINE-EMPHASIS, EDGE-BIASED)
// ========================================================================
  function nextIndexEdge(bits, max, spinPhase = 0, presence = 0, harmonicBias = 0) {
    if (!isPureBinary(bits)) {
      throw new Error("[BinaryLoopScanner‑16] non-binary bits passed to nextIndexEdge");
    }
    if (!Number.isFinite(max) || max <= 0) {
      throw new Error("[BinaryLoopScanner‑16] invalid max passed to nextIndexEdge");
    }

    const base = bitsToNumber(bits);
    const raw = base % max;

    const edgePull = clamp((presence * 0.5 + harmonicBias * 0.5), 0, 1);
    const towardHead = (base & 1) === 0; // stable parity-based choice

    const edgeOffset = Math.floor(edgePull * (max * 0.25));
    const edgeBase = towardHead ? (raw - edgeOffset) : (raw + edgeOffset);

    const spin = ((edgeBase + (spinPhase | 0)) % max + max) % max;
    const offset = dualBandOffset(max, presence * 0.8, harmonicBias * 0.8);

    const index = ((spin + offset) % max + max) % max;

    _updateArtery({
      mode: "edge",
      bitsLength: bits.length,
      index
    });

    if (trace) {
       
      console.log("[BinaryLoopScanner‑16] EDGE", {
        base,
        raw,
        edgePull,
        towardHead,
        edgeOffset,
        edgeBase,
        spin,
        offset,
        index,
        windowBucket: _windowBucket(index, max)
      });
    }

    return index;
  }

  // ========================================================================
  // MODE 5 — FLAT LOOP (LOW-VARIANCE, CENTER-BIASED)
// ========================================================================
  function nextIndexFlat(bits, max, presence = 0, harmonicBias = 0) {
    if (!isPureBinary(bits)) {
      throw new Error("[BinaryLoopScanner‑16] non-binary bits passed to nextIndexFlat");
    }
    if (!Number.isFinite(max) || max <= 0) {
      throw new Error("[BinaryLoopScanner‑16] invalid max passed to nextIndexFlat");
    }

    const base = bitsToNumber(bits);
    const raw = base % max;

    const center = Math.floor(max / 2);
    const spread = Math.max(1, Math.floor(max * 0.15));

    const calmFactor = 1 - clamp((presence * 0.4 + harmonicBias * 0.6), 0, 1);
    const localOffset = Math.floor(((raw / max) - 0.5) * spread * calmFactor * 2);

    const index = ((center + localOffset) % max + max) % max;

    _updateArtery({
      mode: "flat",
      bitsLength: bits.length,
      index
    });

    if (trace) {
       
      console.log("[BinaryLoopScanner‑16] FLAT", {
        base,
        raw,
        center,
        spread,
        calmFactor,
        localOffset,
        index,
        windowBucket: _windowBucket(index, max)
      });
    }

    return index;
  }

  // ========================================================================
  // ADVANTAGE VIEW — ALL MODES + SYMBOLIC HINTS
  // ========================================================================
  function nextAdvantageView({
    bits,
    max,
    spinPhase = 0,
    presence = 0,
    harmonicBias = 0
  }) {
    if (!isPureBinary(bits)) {
      throw new Error("[BinaryLoopScanner‑16] non-binary bits passed to nextAdvantageView");
    }
    if (!Number.isFinite(max) || max <= 0) {
      throw new Error("[BinaryLoopScanner‑16] invalid max passed to nextAdvantageView");
    }

    const standard = nextIndex(bits, max, spinPhase, presence, harmonicBias);
    const deep = nextIndexDeep(bits, max, spinPhase, presence, harmonicBias);
    const multi = nextIndexMulti(bits, max, presence, harmonicBias);
    const edge = nextIndexEdge(bits, max, spinPhase, presence, harmonicBias);
    const flat = nextIndexFlat(bits, max, presence, harmonicBias);

    const coverageSpan = (() => {
      const all = [standard, deep, edge, flat, ...multi];
      const min = Math.min(...all);
      const maxIdx = Math.max(...all);
      return max > 0 ? (maxIdx - min) / max : 0;
    })();

    const edgeFocus = (() => {
      const nearHead = edge < max * 0.15;
      const nearTail = edge > max * 0.85;
      return nearHead || nearTail ? 1 : 0;
    })();

    const calmness = (() => {
      const center = Math.floor(max / 2);
      const dist = Math.abs(flat - center) / (max || 1);
      return clamp(1 - dist * 2, 0, 1);
    })();

    const multiSpread = (() => {
      if (!multi || multi.length === 0) return 0;
      const min = Math.min(...multi);
      const maxIdx = Math.max(...multi);
      return max > 0 ? (maxIdx - min) / max : 0;
    })();

    const dualBandInfluence = clamp(presence * 0.6 + harmonicBias * 0.4, 0, 1);

    return Object.freeze({
      meta: BinaryLoopScannerMeta,
      modes: {
        standard,
        deep,
        multi,
        edge,
        flat
      },
      windows: {
        standard: _windowBucket(standard, max),
        deep: _windowBucket(deep, max),
        edge: _windowBucket(edge, max),
        flat: _windowBucket(flat, max),
        multi: multi.map((i) => _windowBucket(i, max))
      },
      hints: {
        coverageSpan,
        edgeFocus,
        calmness,
        multiSpread,
        dualBandInfluence
      },
      artery: artery.snapshot()
    });
  }

  // ========================================================================
  // EXPORT
  // ========================================================================
  return {
    meta: BinaryLoopScannerMeta,

    // core modes
    nextIndex,
    nextIndexDeep,
    nextIndexMulti,
    nextIndexEdge,
    nextIndexFlat,

    // advantage surface
    nextAdvantageView,

    // artery snapshot
    snapshotArtery: () => artery.snapshot()
  };
}

// ============================================================================
// UTIL
// ============================================================================
function clamp(v, min, max) {
  return v < min ? min : v > max ? max : v;
}
