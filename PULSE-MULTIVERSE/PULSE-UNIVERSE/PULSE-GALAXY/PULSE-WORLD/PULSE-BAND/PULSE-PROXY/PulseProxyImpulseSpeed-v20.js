// ============================================================================
// FILE: /PULSE-PROXY/PulseProxyImpulseSpeed-v20.js
// PULSE OS v20‑IMMORTALPLUS+++ — IMPULSE SPEED GOVERNOR
// “ADVANTAGE‑AWARE SPEED POLICY ENGINE / DRIFT‑ENVELOPE GOVERNOR / BURST SAFETY”
// Pure Backend Organ • Deterministic • Drift‑Proof • Zero Network • Zero IO
// ============================================================================
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝

// 2 — EXPORT GENOME METADATA
// export const PulseMeshMeta = Identity.OrganMeta;
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
// export const PULSE_EARN_IMMUNE_CONTEXT = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

// ============================================================================
// INTERNAL HELPERS
// ============================================================================
function computeHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 99991;
  }
  return `h${h}`;
}

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

function safeNorm(v, max = 1) {
  const n = Number(v || 0);
  if (!isFinite(n) || max <= 0) return 0;
  return clamp(n / max, 0, 1);
}

function buildSpeedPressureField({ impulse, inner, outer, proxy, world }) {
  const i = safeNorm(impulse, 1);
  const n = safeNorm(inner, 1);
  const o = safeNorm(outer, 1);
  const p = safeNorm(proxy, 1);
  const w = safeNorm(world, 1);

  const count = [i, n, o, p, w].filter(v => v > 0).length || 1;
  const avg = (i + n + o + p + w) / count;

  let band = "low";
  if (avg >= 0.75) band = "extreme";
  else if (avg >= 0.5) band = "high";
  else if (avg >= 0.25) band = "medium";

  return {
    pressureScore: avg,
    pressureBand: band,
    pressureSignature: computeHash(
      `SPEED_PRESSURE::${avg}::${band}::${i}::${n}::${o}::${p}::${w}`
    )
  };
}

function buildChunkCachePrewarmField({ pressureBand, load, drift }) {
  const loadLevel = load || "normal";
  const d = Number(drift || 0);

  let chunkHint = "single-chunk";
  let cacheHint = "cache-light";
  let prewarmHint = "prewarm-optional";
  let routeWarmth = "cool";

  if (pressureBand === "medium") {
    chunkHint = "multi-chunk";
    cacheHint = "cache-medium";
    routeWarmth = "warm";
  } else if (pressureBand === "high" || pressureBand === "extreme") {
    chunkHint = "multi-chunk-heavy";
    cacheHint = "cache-heavy";
    routeWarmth = "hot";
    prewarmHint = "prewarm-preferred";
  }

  if (loadLevel === "heavy" || d > 0.6) {
    cacheHint = "cache-heavy";
    prewarmHint = "prewarm-required";
  }

  return {
    chunkHint,
    cacheHint,
    prewarmHint,
    routeWarmth,
    chunkCachePrewarmSignature: computeHash(
      `SPEED_CHUNK_CACHE_PREWARM::${chunkHint}::${cacheHint}::${prewarmHint}::${routeWarmth}::${loadLevel}::${d}`
    )
  };
}

function buildDualBandOverlay(dualBandContext) {
  const ctx =
    dualBandContext && typeof dualBandContext === "object"
      ? dualBandContext
      : {};

  const band = typeof ctx.band === "string" ? ctx.band : "unknown";
  const mode = typeof ctx.mode === "string" ? ctx.mode : "unknown";
  const presence = typeof ctx.presence === "string" ? ctx.presence : "unknown";

  return {
    band,
    mode,
    presence,
    overlaySignature: computeHash(
      `SPEED_DUALBAND::${band}::${mode}::${presence}`
    )
  };
}

function buildAdvantageField(advantage) {
  const a = advantage?.advantageScore ?? 0;
  return {
    advantageScore: clamp(a, 0, 1),
    advantageSignature: computeHash(`SPEED_ADVANTAGE::${a}`)
  };
}

function buildPresenceField(presence) {
  const tier = presence?.tier ?? "normal";
  const score = presence?.score ?? 0;
  return {
    tier,
    score: clamp(score, 0, 1),
    presenceSignature: computeHash(`SPEED_PRESENCE::${tier}::${score}`)
  };
}

// ============================================================================
// IMMORTAL HEALING STATE (GLOBAL SNAPSHOT)
// ============================================================================
let _speedSeq = 0;

let _speedHealingState = Object.freeze({
  seq: 0,
  lastSpeedBand: "normal",
  lastEnvelope: "safe",
  lastMultiplier: 1,
  lastPressureField: null,
  lastChunkCachePrewarmField: null,
  lastDualBandOverlay: null,
  lastAdvantageField: null,
  lastPresenceField: null,
  lastLoad: "normal",
  lastDrift: 0
});

// ============================================================================
// v20‑IMMORTALPLUS+++ SPEED GOVERNOR — CORE LOGIC
// ============================================================================
export function computeSpeedPolicy({
  impulseSpeed = null,
  innerSpeed = null,
  outerSpeed = null,
  proxySpeed = null,
  worldSpeed = null,

  advantage = null,
  presence = null,
  experience = null,
  healing = null,
  dualBandContext = null
} = {}) {
  // Extract safe numeric values
  const i = impulseSpeed?.speedScore ?? 0;
  const n = innerSpeed?.speedScore ?? 0;
  const o = outerSpeed?.speedScore ?? 0;
  const p = proxySpeed?.speedScore ?? 0;
  const w = worldSpeed?.speedScore ?? 0;

  const a = advantage?.advantageScore ?? 0;
  const presenceTier = presence?.tier ?? "normal";
  const presenceScore = presence?.score ?? 0;

  const load = experience?.load ?? "normal";
  const drift = healing?.drift ?? 0;

  // --------------------------------------------------------------------------
  // v20: Multi‑vector speed cascade fusion
  // --------------------------------------------------------------------------
  const cascadeCount = [i, n, o, p, w].filter(v => v > 0).length || 1;
  const combinedSpeed = (i + n + o + p + w) / cascadeCount;

  // --------------------------------------------------------------------------
  // Base multiplier from combined speed
  // --------------------------------------------------------------------------
  let multiplier = 1 + combinedSpeed * 200; // up to ~200×

  // --------------------------------------------------------------------------
  // v20: Advantage cascade shaping
  // --------------------------------------------------------------------------
  if (a > 0.70) multiplier *= 1.40;   // +40%
  if (a > 0.85) multiplier *= 1.25;   // +25%
  if (a > 0.95) multiplier *= 1.15;   // +15%

  // --------------------------------------------------------------------------
  // v20: Presence tier shaping
  // --------------------------------------------------------------------------
  if (presenceTier === "low") multiplier *= 0.85;
  if (presenceTier === "critical") multiplier *= 0.60;

  // --------------------------------------------------------------------------
  // Load penalties
  // --------------------------------------------------------------------------
  if (load === "moderate") multiplier *= 0.70;
  if (load === "heavy") multiplier *= 0.40;

  // --------------------------------------------------------------------------
  // Drift penalties (IMMORTAL safety)
  // --------------------------------------------------------------------------
  if (drift > 0.30) multiplier *= 0.60;
  if (drift > 0.60) multiplier *= 0.30;
  if (drift > 0.80) multiplier *= 0.10;

  // --------------------------------------------------------------------------
  // IMMORTAL envelope clamp
  // --------------------------------------------------------------------------
  const safeMultiplier = clamp(multiplier, 1, 1000);

  // --------------------------------------------------------------------------
  // Speed band classification
  // --------------------------------------------------------------------------
  let speedBand = "normal";
  if (safeMultiplier < 20) speedBand = "elevated";
  else if (safeMultiplier < 100) speedBand = "high";
  else if (safeMultiplier < 300) speedBand = "very-high";
  else speedBand = "burst";

  // --------------------------------------------------------------------------
  // Envelope classification (IMMORTAL safety)
  // --------------------------------------------------------------------------
  let envelope = "safe";

  if (load === "heavy" || drift > 0.60) envelope = "restricted";
  if (drift > 0.80) envelope = "unsafe";

  // --------------------------------------------------------------------------
  // Derived fields: pressure, chunk/cache/prewarm, dualband, advantage, presence
  // --------------------------------------------------------------------------
  const pressureField = buildSpeedPressureField({
    impulse: i,
    inner: n,
    outer: o,
    proxy: p,
    world: w
  });

  const chunkCachePrewarmField = buildChunkCachePrewarmField({
    pressureBand: pressureField.pressureBand,
    load,
    drift
  });

  const dualBandOverlay = buildDualBandOverlay(dualBandContext);
  const advantageField = buildAdvantageField(advantage);
  const presenceField = buildPresenceField({ tier: presenceTier, score: presenceScore });

  // --------------------------------------------------------------------------
  // Diagnostics
  // --------------------------------------------------------------------------
  const diagnostics = {
    impulseSpeed: i,
    innerSpeed: n,
    outerSpeed: o,
    proxySpeed: p,
    worldSpeed: w,

    advantage: a,
    presenceTier,
    presenceScore,
    load,
    drift,

    combinedSpeed,
    rawMultiplier: multiplier,
    pressureField,
    chunkCachePrewarmField,
    dualBandOverlay
  };

  // --------------------------------------------------------------------------
  // Healing state (IMMORTAL snapshot)
// --------------------------------------------------------------------------
  _speedSeq += 1;
  _speedHealingState = Object.freeze({
    seq: _speedSeq,
    lastSpeedBand: speedBand,
    lastEnvelope: envelope,
    lastMultiplier: safeMultiplier,
    lastPressureField: pressureField,
    lastChunkCachePrewarmField: chunkCachePrewarmField,
    lastDualBandOverlay: dualBandOverlay,
    lastAdvantageField: advantageField,
    lastPresenceField: presenceField,
    lastLoad: load,
    lastDrift: drift
  });

  // --------------------------------------------------------------------------
  // Final IMMORTAL policy
  // --------------------------------------------------------------------------
  return {
    allowed: envelope !== "unsafe",
    speedMultiplier: safeMultiplier,
    speedBand,
    envelope,
    pressureField,
    chunkCachePrewarmField,
    dualBandOverlay,
    advantageField,
    presenceField,
    diagnostics,
    healingState: _speedHealingState,
    signature: computeHash(
      `SPEED_POLICY::${safeMultiplier}::${speedBand}::${envelope}::${presenceTier}::${a}::${pressureField.pressureBand}`
    )
  };
}

// ============================================================================
// READ API — IMMORTAL SNAPSHOTS
// ============================================================================
export function getSpeedHealingState() {
  return _speedHealingState;
}

export function getSpeedSnapshot() {
  const s = _speedHealingState;
  return {
    seq: s.seq,
    speedBand: s.lastSpeedBand,
    envelope: s.lastEnvelope,
    multiplier: s.lastMultiplier,
    pressureField: s.lastPressureField,
    chunkCachePrewarmField: s.lastChunkCachePrewarmField,
    dualBandOverlay: s.lastDualBandOverlay,
    advantageField: s.lastAdvantageField,
    presenceField: s.lastPresenceField,
    load: s.lastLoad,
    drift: s.lastDrift
  };
}
