// ============================================================================
// FILE: /PulseOS/PULSE-TOOLS/PulseBinaryWaveScanner-v16.js
// PULSE OS — v16‑IMMORTAL
// PURE BINARY WAVE ORGAN — ZERO DRIFT, MULTI-SPIN, GPU-AWARE, PRESENCE/HARMONICS
// ============================================================================
// ROLE (v16‑IMMORTAL):
//   - Convert binary pulses → deterministic waveforms.
//   - Drive contrast, depth, “see-through”, edge emphasis for all layers.
//   - Zero randomness, zero timestamps, zero mutation.
//   - Multi-spin aware (3-phase, 6-phase, 12-phase sets).
//   - Dual-band aware: presence/harmonics bias depth/contrast deterministically.
//   - GPU-aware: symbolic heat/warp-stress influences reflection curves.
//   - Artery-aware: exposes wave load/pressure + window-safe buckets.
//   - Advantage View: emits ALL wave modes + symbolic hints in one packet.
//   - Pairs with BinaryPulse‑v16‑IMMORTAL + LoopScanner‑v16‑IMMORTAL.
// ============================================================================
import {
  OrganismIdentity,
  buildPulseOrganismMap as PulseOrganismMap,
  buildPulseOrganismMap as buildOrganismMap
} from "./PULSE-WORLD-MAP.js";
const Identity = OrganismIdentity(import.meta.url);

// 2 — EXPORT GENOME METADATA
export const PulseBinaryWaveScannerMeta = Identity.OrganMeta;
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
// export const WBC_CONTEXT = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

// ============================================================================
// ARTERY — wave load + pressure + mode distribution + divergence
// ============================================================================
function createWaveArtery() {
  return {
    waves: 0,
    lastMode: null,
    lastAmplitude: 0,
    lastDepth: 0,
    lastReflection: 0,
    lastPresence: 0,
    lastHarmonicBias: 0,
    modeCounts: {
      standard: 0,
      deep: 0,
      multi: 0,
      edge: 0,
      flat: 0,
      "ultra-multi": 0
    },
    // simple divergence proxy: how often we jump between “calm” and “aggressive” modes
    divergenceScore: 0,
    lastAggressive: null,

    _updateMode(mode, amplitude) {
      if (this.modeCounts[mode] != null) this.modeCounts[mode]++;

      const aggressive =
        mode === "edge" ||
        mode === "ultra-multi" ||
        (mode === "multi" && amplitude >= 0.6);

      if (this.lastAggressive != null && aggressive !== this.lastAggressive) {
        this.divergenceScore += 0.02;
      }
      this.lastAggressive = aggressive;
      this.divergenceScore = Math.min(1, this.divergenceScore);
    },

    snapshot() {
      const load = Math.min(1, this.waves / 8192);
      const pressure = Math.min(1, this.lastAmplitude);

      const calmModes =
        (this.modeCounts.standard || 0) +
        (this.modeCounts.flat || 0) +
        (this.modeCounts.deep || 0);
      const aggressiveModes =
        (this.modeCounts.edge || 0) +
        (this.modeCounts.multi || 0) +
        (this.modeCounts["ultra-multi"] || 0);
      const totalModes = calmModes + aggressiveModes || 1;

      const calmRatio = calmModes / totalModes;
      const aggressiveRatio = aggressiveModes / totalModes;

      const harmonicLoad = clamp01(
        0.5 * aggressiveRatio +
        0.3 * pressure +
        0.2 * this.divergenceScore
      );

      return Object.freeze({
        waves: this.waves,
        lastMode: this.lastMode,
        lastAmplitude: this.lastAmplitude,
        lastDepth: this.lastDepth,
        lastReflection: this.lastReflection,
        lastPresence: this.lastPresence,
        lastHarmonicBias: this.lastHarmonicBias,

        load,
        loadBucket:
          load >= 0.9 ? "saturated" :
          load >= 0.7 ? "high" :
          load >= 0.4 ? "medium" :
          load > 0    ? "low" :
                        "idle",

        pressure,
        pressureBucket:
          pressure >= 0.9 ? "overload" :
          pressure >= 0.7 ? "high" :
          pressure >= 0.4 ? "medium" :
          pressure > 0    ? "low" :
                            "none",

        modeCounts: { ...this.modeCounts },
        calmRatio,
        aggressiveRatio,
        divergenceScore: this.divergenceScore,
        harmonicLoad,
        harmonicLoadBucket:
          harmonicLoad >= 0.85 ? "critical" :
          harmonicLoad >= 0.65 ? "high" :
          harmonicLoad >= 0.35 ? "medium" :
          harmonicLoad > 0     ? "low" :
                                 "none"
      });
    }
  };
}

// ============================================================================
// VISUALIZATION HELPERS — symbolic “heatmap” for waves
// ============================================================================
function stableHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `wv${h}`;
}

function bandColorFromAmplitude(amplitude) {
  const a = clamp01(amplitude);
  if (a > 0.85) return "rgb(255, 40, 40)";   // intense red
  if (a > 0.65) return "rgb(255, 120, 40)";  // orange
  if (a > 0.45) return "rgb(255, 210, 60)";  // yellow
  if (a > 0.25) return "rgb(120, 230, 120)"; // green
  if (a > 0.10) return "rgb(80, 200, 255)";  // cyan
  return "rgb(40, 80, 160)";                 // deep blue
}

function haloColorFromDepth(depth) {
  const d = clamp01(depth);
  const alpha = 0.2 + d * 0.6;
  if (d > 0.7) return `rgba(255, 255, 255, ${alpha.toFixed(2)})`; // bright halo
  if (d > 0.4) return `rgba(200, 240, 255, ${alpha.toFixed(2)})`;
  return `rgba(120, 160, 220, ${alpha.toFixed(2)})`;
}

function staticNoiseLevelFromMode(mode, reflection, harmonicBias) {
  const r = clamp01(reflection);
  const h = clamp01(harmonicBias);
  let base =
    (mode === "edge" || mode === "ultra-multi")
      ? 0.4 + r * 0.4 + h * 0.2
      : (mode === "multi")
        ? 0.25 + r * 0.3 + h * 0.2
        : 0.05 + r * 0.2 + h * 0.1;
  return clamp01(base);
}

function shimmerPhaseFromPhase(phase) {
  // map [0, 2π] to [0, 1]
  const norm = (phase % (Math.PI * 2)) / (Math.PI * 2);
  return clamp01(norm);
}

function modeGlyph(mode) {
  switch (mode) {
    case "standard":     return "≋";
    case "deep":         return "≋↓";
    case "multi":        return "≋≋≋";
    case "edge":         return "≋|";
    case "flat":         return "≋─";
    case "ultra-multi":  return "≋✶";
    default:             return "≋?";
  }
}

function buildVisualProfile({ mode, amplitude, depth, reflection, phase, presence, harmonicBias }) {
  const bandColor = bandColorFromAmplitude(amplitude);
  const haloColor = haloColorFromDepth(depth);
  const staticNoiseLevel = staticNoiseLevelFromMode(mode, reflection, harmonicBias);
  const shimmerPhase = shimmerPhaseFromPhase(phase);
  const isShifterPulse =
    staticNoiseLevel >= 0.55 ||
    (mode === "edge" || mode === "ultra-multi");

  const presenceBand = presence >= 0.66 ? "high" :
                       presence >= 0.33 ? "medium" :
                                          "low";

  return Object.freeze({
    bandColor,
    haloColor,
    staticNoiseLevel,          // how “staticy” the wave should look
    shimmerPhase,              // phase for UI shimmer animations
    isShifterPulse,            // true → render as “weird staticy” shifter
    presenceBand,
    glyph: modeGlyph(mode),
    visualSignature: stableHash(
      `VISUAL::${mode}::${amplitude.toFixed(4)}::${depth.toFixed(4)}::${reflection.toFixed(4)}::${presence.toFixed(4)}::${harmonicBias.toFixed(4)}`
    )
  });
}

// ============================================================================
// ORGAN FACTORY
// ============================================================================
export function createBinaryWaveScanner({ trace = false } = {}) {
  let t = 0; // deterministic tick
  const artery = createWaveArtery();

  // -------------------------------------------------------------------------
  // SAFETY: PURE BINARY ONLY
  // -------------------------------------------------------------------------
  function isPureBinary(bits) {
    if (!Array.isArray(bits)) return false;
    for (let i = 0; i < bits.length; i++)
      if (bits[i] !== 0 && bits[i] !== 1) return false;
    return true;
  }

  // -------------------------------------------------------------------------
  // CORE METRICS
  // -------------------------------------------------------------------------
  function amplitudeFromBits(bits) {
    let ones = 0;
    for (let i = 0; i < bits.length; i++) ones += bits[i];
    return bits.length ? ones / bits.length : 0;
  }

  function nextPhase(step = 1) {
    t += step;
    return (t % 720) * (Math.PI / 180); // double resolution
  }

  function dualBandScale(presence = 0, harmonicBias = 0) {
    const p = clamp01(presence);
    const h = clamp01(harmonicBias);
    return 0.75 + (p * 0.15 + h * 0.35);
  }

  function gpuScale(gpuStats) {
    if (!gpuStats) return 1;
    const heat = clamp01(
      0.5 * (gpuStats.utilization ?? 0) +
      0.3 * (gpuStats.memoryPressure ?? 0) +
      0.2 * ((gpuStats.temperature ?? 0) / 100)
    );
    const warp = clamp01(gpuStats.warpDivergence ?? 0);
    return 1 + heat * 0.2 + warp * 0.1;
  }

  function buildWave(mode, amplitude, phase, depthScale, reflectScale, presence, harmonicBias, gpuStats) {
    const band = dualBandScale(presence, harmonicBias);
    const gpu = gpuScale(gpuStats);

    const depth = amplitude * depthScale * band * gpu * Math.abs(Math.sin(phase * 0.5));
    const reflection = reflectScale * band * gpu * Math.abs(Math.cos(phase * 0.75));

    artery.lastAmplitude = amplitude;
    artery.lastDepth = depth;
    artery.lastReflection = reflection;
    artery.lastPresence = presence;
    artery.lastHarmonicBias = harmonicBias;
    artery._updateMode(mode, amplitude);

    const visual = buildVisualProfile({
      mode,
      amplitude,
      depth,
      reflection,
      phase,
      presence,
      harmonicBias
    });

    return Object.freeze({
      mode,
      phase,
      amplitude,
      depth,
      reflection,
      band,
      gpu,
      visual
    });
  }

  // ========================================================================
  // MODE 1 — STANDARD WAVE
  // ========================================================================
  function nextWave(bits, presence = 0, harmonicBias = 0, gpuStats = null) {
    if (!isPureBinary(bits)) throw new Error("non-binary bits");

    const amp = amplitudeFromBits(bits);
    const phase = nextPhase(1);

    const wave = buildWave("standard", amp, phase, 1.0, 1.0, presence, harmonicBias, gpuStats);

    artery.waves++;
    artery.lastMode = "standard";

    if (trace) console.log("[WaveScanner‑16] STANDARD:", wave);
    return wave;
  }

  // ========================================================================
  // MODE 2 — DEEP WAVE
  // ========================================================================
  function nextWaveDeep(bits, presence = 0, harmonicBias = 0, gpuStats = null) {
    if (!isPureBinary(bits)) throw new Error("non-binary bits");

    const amp = amplitudeFromBits(bits);
    const phase = nextPhase(0.25);

    const wave = buildWave("deep", amp, phase, 1.6, 0.9, presence, harmonicBias, gpuStats);

    artery.waves++;
    artery.lastMode = "deep";

    if (trace) console.log("[WaveScanner‑16] DEEP:", wave);
    return wave;
  }

  // ========================================================================
  // MODE 3 — MULTI WAVE (3-PHASE)
  // ========================================================================
  function nextWaveMulti(bits, presence = 0, harmonicBias = 0, gpuStats = null) {
    if (!isPureBinary(bits)) throw new Error("non-binary bits");

    const amp = amplitudeFromBits(bits);
    const basePhase = nextPhase(1);

    const waves = [0, 1, 2].map(i => {
      const phase = basePhase + (Math.PI * 2 * i) / 3;
      return buildWave("multi", amp, phase, 1.0, 1.0, presence, harmonicBias, gpuStats);
    });

    artery.waves++;
    artery.lastMode = "multi";

    if (trace) console.log("[WaveScanner‑16] MULTI:", waves);
    return waves;
  }

  // ========================================================================
  // MODE 4 — EDGE WAVE (sharper, more “staticy”)
  // ========================================================================
  function nextWaveEdge(bits, presence = 0, harmonicBias = 0, gpuStats = null) {
    if (!isPureBinary(bits)) throw new Error("non-binary bits");

    const amp = amplitudeFromBits(bits);
    const phase = nextPhase(1);

    const wave = buildWave("edge", amp, phase, 1.2, 1.4, presence, harmonicBias, gpuStats);

    artery.waves++;
    artery.lastMode = "edge";

    if (trace) console.log("[WaveScanner‑16] EDGE:", wave);
    return wave;
  }

  // ========================================================================
  // MODE 5 — FLAT WAVE (calm baseline)
// ========================================================================
  function nextWaveFlat(bits, presence = 0, harmonicBias = 0, gpuStats = null) {
    if (!isPureBinary(bits)) throw new Error("non-binary bits");

    const amp = amplitudeFromBits(bits);
    const phase = nextPhase(0.1);

    const wave = buildWave("flat", amp, phase, 0.25, 0.5, presence, harmonicBias, gpuStats);

    artery.waves++;
    artery.lastMode = "flat";

    if (trace) console.log("[WaveScanner‑16] FLAT:", wave);
    return wave;
  }

  // ========================================================================
  // MODE 6 — ULTRA MULTI (12-PHASE, heavy shifter-style)
// ========================================================================
  function nextWaveUltraMulti(bits, presence = 0, harmonicBias = 0, gpuStats = null) {
    if (!isPureBinary(bits)) throw new Error("non-binary bits");

    const amp = amplitudeFromBits(bits);
    const basePhase = nextPhase(1);

    const waves = Array.from({ length: 12 }, (_, i) => {
      const phase = basePhase + (Math.PI * 2 * i) / 12;
      return buildWave("ultra-multi", amp, phase, 1.0, 1.0, presence, harmonicBias, gpuStats);
    });

    artery.waves++;
    artery.lastMode = "ultra-multi";

    if (trace) console.log("[WaveScanner‑16] ULTRA MULTI:", waves);
    return waves;
  }

  // ========================================================================
  // ADVANTAGE VIEW — ALL MODES + SYMBOLIC + VISUAL HINTS
  // ========================================================================
  function nextAdvantageView({
    bits,
    presence = 0,
    harmonicBias = 0,
    gpuStats = null
  }) {
    const standard = nextWave(bits, presence, harmonicBias, gpuStats);
    const deep = nextWaveDeep(bits, presence, harmonicBias, gpuStats);
    const multi = nextWaveMulti(bits, presence, harmonicBias, gpuStats);
    const edge = nextWaveEdge(bits, presence, harmonicBias, gpuStats);
    const flat = nextWaveFlat(bits, presence, harmonicBias, gpuStats);
    const ultra = nextWaveUltraMulti(bits, presence, harmonicBias, gpuStats);

    const dualBandInfluence = clamp01(presence * 0.6 + harmonicBias * 0.4);
    const gpuInfluence = gpuScale(gpuStats) - 1;

    const allWaves = [
      standard,
      deep,
      ...multi,
      edge,
      flat,
      ...ultra
    ];

    const maxStatic = allWaves.reduce(
      (m, w) => Math.max(m, w.visual.staticNoiseLevel),
      0
    );
    const shifterDensity = allWaves.filter(w => w.visual.isShifterPulse).length / allWaves.length || 0;

    const arterySnapshot = artery.snapshot();

    return Object.freeze({
      meta: PulseBinaryWaveScannerMeta,
      modes: { standard, deep, multi, edge, flat, ultra },
      hints: {
        clarity: clamp01(standard.depth * 0.5 + deep.depth * 0.5),
        edgeFocus: clamp01(edge.reflection),
        calmness: clamp01(flat.depth * 0.5),
        dualBandInfluence,
        gpuInfluence,
        maxStaticNoiseLevel: maxStatic,
        shifterDensity,
        visualizationProfileSignature: stableHash(
          `ADV_VIEW::${dualBandInfluence.toFixed(4)}::${gpuInfluence.toFixed(4)}::${maxStatic.toFixed(4)}::${shifterDensity.toFixed(4)}`
        )
      },
      artery: arterySnapshot,
      visualization: {
        // high-level guidance for renderers
        recommendedPalette:
          arterySnapshot.harmonicLoadBucket === "critical" ? "storm" :
          arterySnapshot.harmonicLoadBucket === "high"     ? "flare" :
          arterySnapshot.harmonicLoadBucket === "medium"   ? "flow" :
          "calm",
        shifterIntensityBucket:
          shifterDensity >= 0.7 ? "extreme" :
          shifterDensity >= 0.4 ? "high" :
          shifterDensity >= 0.2 ? "medium" :
          shifterDensity > 0    ? "low" :
                                  "none"
      }
    });
  }

  // ========================================================================
  // EXPORT
  // ========================================================================
  return {
    meta: PulseBinaryWaveScannerMeta,

    nextWave,
    nextWaveDeep,
    nextWaveMulti,
    nextWaveEdge,
    nextWaveFlat,
    nextWaveUltraMulti,

    nextAdvantageView,

    snapshotArtery: () => artery.snapshot()
  };
}

// ============================================================================
// UTIL
// ============================================================================
function clamp01(v) {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}
