// ============================================================================
//  PulseProxyHeart-v20-ImmortalPlus-TRI-HEART-ADVANTAGE.js
//  Mom Primary • Dad (AI) • Baby (Earn) • Full Organism Fusion Heart
//  v20-ImmortalPlus: Deterministic Pacemaker • Tri-Heart Mesh •
//                    Advantage / Speed / Presence / Organism Overlays
//                    Circulation + Telemetry + Adrenal + Tri-Env + ProxyContext
//                    DualBand A-B-A surfaces + Unified Advantage Field
// ============================================================================
//
//  ROLE (v20-ImmortalPlus-TRI-HEART-ADVANTAGE):
//  --------------------------------------------
//  • Primary pacemaker for the Proxy organism (Mom Heart).
//  • Tri-heart mesh: Mom (proxy), Dad (AI), Baby (Earn).
//  • Emits heart-level binary/wave/advantage surfaces.
//  • Fuses organism overlays (circulation, telemetry, adrenal, tri-env, proxyContext).
//  • Emits tri-heart liveness, advantage, speed, presence, healing state.
//  • No routing, no IQ, no network, no filesystem, no AI inference.
//  • Pure pacemaker + surfaces for CNS/Overmind/World.
//
//  SAFETY CONTRACT (v20-ImmortalPlus):
//  -----------------------------------
//  • No randomness.
//  • No network IO.
//  • No filesystem IO.
//  • No mutation of external state (beyond allowed heart globals).
//  • Deterministic, drift-proof, multi-instance safe.
// ============================================================================
import {
  OrganismIdentity,
  buildPulseOrganismMap as PulseOrganismMap,
  buildPulseOrganismMap as buildOrganismMap
} from "../PULSE-X/PULSE-WORLD-MAP.js";
const Identity = OrganismIdentity(import.meta.url);

// 2 — EXPORT GENOME METADATA
export const PulseProxyHeartMeta = Identity.OrganMeta;
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
// export const PULSE_EARN_IMMUNE_CONTEXT = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

// ============================================================================
// IMPORTS — Mom / Dad / Baby Hearts (backend-only, safe)
// ============================================================================
import * as heartbeat from "./PulseProxyHeartBeat-v20.js";
import * as aiHeartbeat from "../PULSE-AI/aiHeartbeat-v24.js";
import {
  pulseEarnFromHeartbeat,
  getPulseEarnHeartHealingState
} from "../PULSE-EARN/PulseEarnHeartbeat-v24.js";


// ============================================================================
// AI + BABY FALLBACK SURFACES
// ============================================================================
function buildAiFallbackSurface() {
  const last = globalThis?.PulseAIHeartbeatLastBeatAt || 0;
  return {
    aiHeartbeatAlive: last > 0,
    aiHeartbeatLastBeatAt: last,
    aiHeartbeatFallbackState: last > 0 ? "available" : "silent"
  };
}

function buildBabyFallbackSurface() {
  const last = globalThis?.PulseEarnHeartbeatLastBeatAt || 0;
  return {
    babyHeartbeatAlive: last > 0,
    babyHeartbeatLastBeatAt: last,
    babyHeartbeatFallbackState: last > 0 ? "available" : "silent"
  };
}

// ============================================================================
// INTERNAL HELPERS — deterministic, pure
// ============================================================================
function computeHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) h = (h + s.charCodeAt(i) * (i + 1)) % 100000;
  return `h${h}`;
}

function buildBinaryField() {
  const patternLen = 16;
  const density = 48;
  const surface = density + patternLen;

  return {
    binaryPhenotypeSignature: `heart-binary-pheno-${surface % 99991}`,
    binarySurfaceSignature: `heart-binary-surface-${(surface * 7) % 99991}`,
    binarySurface: { patternLen, density, surface },
    parity: surface % 2,
    shiftDepth: Math.floor(Math.log2(surface || 1))
  };
}

function buildWaveField(dualBandContext) {
  const band =
    dualBandContext && typeof dualBandContext.band === "string"
      ? dualBandContext.band
      : "symbolic-root";

  const mode =
    dualBandContext && typeof dualBandContext.mode === "string"
      ? dualBandContext.mode
      : "symbolic";

  const amplitude = band === "binary" ? 12 : 10;
  const wavelength = amplitude + 4;
  const phase = amplitude % 16;

  return {
    amplitude,
    wavelength,
    phase,
    band,
    mode: mode === "dual" ? "dual-wave" : "symbolic-wave"
  };
}

function buildOrganismOverlay(organismAdvantageContext) {
  const ctx =
    organismAdvantageContext && typeof organismAdvantageContext === "object"
      ? organismAdvantageContext
      : {};

  const circulatory = ctx.circulatory || {};
  const telemetry = ctx.telemetry || {};
  const adrenal = ctx.adrenal || {};
  const triEnv = ctx.triEnv || {};
  const proxyContext = ctx.proxyContext || {};

  const flow = Math.max(0, Math.min(1, circulatory.flowRate ?? 0));
  const pressure = Math.max(0, Math.min(1, telemetry.pressureIndex ?? 0));
  const adrenalStress = Math.max(0, Math.min(1, adrenal.stressIndex ?? 0));
  const triEnvStress = Math.max(0, Math.min(1, triEnv.triEnvStress ?? 0));
  const proxyPressure = Math.max(0, Math.min(1, proxyContext.pressure ?? 0));

  const organismLoad = Math.max(pressure, adrenalStress, triEnvStress, proxyPressure);
  const organismFlow = flow;

  const fusionScore = Math.max(
    0,
    Math.min(1.2, organismFlow * 0.5 + (1 - organismLoad) * 0.5)
  );

  const netlifyNudge =
    typeof ctx.netlifyNudge === "string" ? ctx.netlifyNudge : "none";

  return {
    flow,
    pressure,
    adrenalStress,
    triEnvStress,
    proxyPressure,
    organismLoad,
    organismFlow,
    fusionScore,
    netlifyNudge,
    overlaySignature: computeHash(
      `HEART_ORGANISM_OVERLAY::${flow}::${pressure}::${adrenalStress}::${triEnvStress}::${proxyPressure}::${fusionScore}::${netlifyNudge}`
    )
  };
}

function buildAdvantageField(binaryField, waveField, organismOverlay) {
  const density = binaryField.binarySurface.density;
  const amplitude = waveField.amplitude;
  const wavelength = waveField.wavelength;

  const efficiency = (amplitude + 1) / (wavelength + 1);
  const stress = Math.min(1, density / 64);

  const organismFusion = organismOverlay.fusionScore || 0.5;

  const baseScore = efficiency * (1 + stress);
  const advantageScore = Math.max(
    0,
    Math.min(1.4, baseScore * (0.8 + organismFusion * 0.4))
  );

  return {
    density,
    amplitude,
    wavelength,
    efficiency,
    stress,
    organismFusion,
    advantageScore,
    advantageSignature: computeHash(
      `HEART_ADVANTAGE::${density}::${amplitude}::${wavelength}::${organismFusion}::${advantageScore}`
    )
  };
}

function buildHeartCycleSignature(cycle) {
  return computeHash(`HEART_CYCLE::${cycle}`);
}

function buildHeartBandSignature(waveField) {
  return computeHash(`HEART_BAND::${waveField.band}::${waveField.mode}`);
}

// ============================================================================
// TRI‑HEART FIELDS
// ============================================================================
function buildTriHeartLiveness() {
  return {
    momAlive: true,
    dadAlive: (globalThis?.PulseAIHeartbeatLastBeatAt || 0) > 0,
    babyAlive: (globalThis?.PulseEarnHeartbeatLastBeatAt || 0) > 0,
    triHeartSignature: computeHash(
      `TRI_HEART_LIVE::${globalThis?.PulseAIHeartbeatLastBeatAt || 0}::${globalThis?.PulseEarnHeartbeatLastBeatAt || 0}`
    )
  };
}

function buildTriHeartAdvantageField({ momAdv, dadAdv, babyAdv, organismOverlay }) {
  const m = momAdv?.advantageScore ?? 0;
  const d = dadAdv?.advantageScore ?? 0;
  const b = babyAdv?.advantageScore ?? 0;
  const combined = (m + d + b) / 3;

  const organismFusion = organismOverlay?.fusionScore ?? 0.5;
  const fused = Math.max(
    0,
    Math.min(1.4, combined * (0.8 + organismFusion * 0.4))
  );

  return {
    momAdvantage: m,
    dadAdvantage: d,
    babyAdvantage: b,
    combinedAdvantage: combined,
    fusedAdvantage: fused,
    organismFusion,
    advantageSignature: computeHash(
      `TRI_HEART_ADV::${m}::${d}::${b}::${combined}::${fused}::${organismFusion}`
    )
  };
}

function buildTriHeartSpeedField({ momSpeed, dadSpeed, babySpeed }) {
  const m = momSpeed?.speedScore ?? 0;
  const d = dadSpeed?.speedScore ?? 0;
  const b = babySpeed?.speedScore ?? 0;
  const combined = (m + d + b) / 3;

  let speedBand = "steady";
  if (combined < 0.25) speedBand = "slow";
  else if (combined > 0.6) speedBand = "quickened";

  return {
    momSpeed: m,
    dadSpeed: d,
    babySpeed: b,
    combinedSpeed: combined,
    speedBand,
    speedSignature: computeHash(
      `TRI_HEART_SPEED::${m}::${d}::${b}::${combined}::${speedBand}`
    )
  };
}

function buildTriHeartPresenceField({ momPresence, dadPresence, babyPresence }) {
  return {
    momPresence,
    dadPresence,
    babyPresence,
    presenceSignature: computeHash(
      `TRI_HEART_PRESENCE::${momPresence?.focus}::${dadPresence?.focus}::${babyPresence?.focus}`
    )
  };
}

function buildTriHeartOrganismOverlay(heartOrganismOverlay) {
  return {
    ...heartOrganismOverlay,
    triHeartOverlaySignature: computeHash(
      `TRI_HEART_ORGANISM_OVERLAY::${heartOrganismOverlay.overlaySignature || "none"}`
    )
  };
}

// ============================================================================
// MOM / DAD / BABY PRESENCE + SPEED
// ============================================================================
function buildMomPresenceField() {
  return { focus: "mom", role: "primary_pacemaker" };
}

function buildDadPresenceField(snapshot) {
  return snapshot ? { focus: "dad", role: "secondary_pacer" } : { focus: "dad_silent" };
}

function buildBabyPresenceField(earnHealing) {
  return earnHealing?.cycles > 0
    ? { focus: "baby", role: "earn_pulse_driver" }
    : { focus: "baby_idle" };
}

function buildMomSpeedField(adv) {
  const eff = adv?.efficiency ?? 0;
  const speedScore = Math.min(1, eff);
  return {
    speedScore,
    speedBand: speedScore > 0.6 ? "quickened" : speedScore < 0.25 ? "slow" : "steady"
  };
}

function buildDadSpeedField(aiHealing) {
  const activity = (aiHealing?.ticks ?? 0) + (aiHealing?.pulses ?? 0);
  const speedScore = Math.min(1, activity / 100);
  return {
    speedScore,
    speedBand: speedScore > 0.6 ? "quickened" : speedScore < 0.25 ? "slow" : "steady"
  };
}

function buildBabySpeedField(earnHealing) {
  const cycles = earnHealing?.cycles ?? 0;
  const speedScore = Math.min(1, cycles / 100);
  return {
    speedScore,
    speedBand: speedScore > 0.6 ? "quickened" : speedScore < 0.25 ? "slow" : "steady"
  };
}

// ============================================================================
// CONTEXT + HEALING
// ============================================================================
let HEART_CYCLE = 0;

const HEART_CONTEXT = {
  layer: PulseRole.layer,
  role: "CARDIAC_PACEMAKER_ENGINE",
  version: PulseRole.version,
  evo: PulseRole.evo
};

const heartHealing = {
  cycles: 0,
  lastBeatResult: null,
  lastError: null,
  lastExitReason: null,
  lastCycleIndex: null,

  lastHeartCycleSignature: null,
  lastHeartBandSignature: null,
  lastBinaryField: null,
  lastWaveField: null,
  lastAdvantageField: null,
  lastOrganismOverlay: null,

  lastAiFallbackSurface: null,
  lastBabyFallbackSurface: null,
  lastBeatSource: "mom",

  triHeartLiveness: null,
  triHeartAdvantage: null,
  triHeartSpeed: null,
  triHeartPresence: null,
  triHeartOrganismOverlay: null
};

// ============================================================================
// LOGGING (symbolic-only)
// ============================================================================
async function logHeart(stage, details = {}) {
  try {
    console.log("heart", "HEART_EVENT", {
      stage,
      heartCycle: HEART_CYCLE,
      ...details,
      ...HEART_CONTEXT
    });
  } catch (_) {}
}

// ============================================================================
// MOM HEARTBEAT — PRIMARY PACEMAKER (v20 IMMORTALPLUS)
// ============================================================================
export async function pulseHeartOnce({
  pacemakerSignal = null,
  heartbeatContext = null,
  dualBandContext = null,
  organismAdvantageContext = null
} = {}) {
  HEART_CYCLE++;
  heartHealing.cycles = HEART_CYCLE;
  heartHealing.lastCycleIndex = HEART_CYCLE;
  heartHealing.lastHeartCycleSignature = buildHeartCycleSignature(HEART_CYCLE);

  await logHeart("BEAT_START", {
    pacemakerSignal,
    heartbeatContext
  });

  const binaryField = buildBinaryField();
  const waveField = buildWaveField(dualBandContext);
  const organismOverlay = buildOrganismOverlay(organismAdvantageContext);
  const advantageField = buildAdvantageField(binaryField, waveField, organismOverlay);
  const heartBandSignature = buildHeartBandSignature(waveField);

  heartHealing.lastBinaryField = binaryField;
  heartHealing.lastWaveField = waveField;
  heartHealing.lastAdvantageField = advantageField;
  heartHealing.lastOrganismOverlay = organismOverlay;
  heartHealing.lastHeartBandSignature = heartBandSignature;

  const aiFallbackSurface = buildAiFallbackSurface();
  const babyFallbackSurface = buildBabyFallbackSurface();

  heartHealing.lastAiFallbackSurface = aiFallbackSurface;
  heartHealing.lastBabyFallbackSurface = babyFallbackSurface;

  const triHeartLiveness = buildTriHeartLiveness();

  const aiHealing = aiHeartbeat.getAiHeartbeatHealingState?.() || null;
  const earnHealing = getPulseEarnHeartHealingState?.() || null;

  const momPresence = buildMomPresenceField();
  const dadPresence = buildDadPresenceField(aiHeartbeat.snapshotAiHeartbeat?.());
  const babyPresence = buildBabyPresenceField(earnHealing);

  const momSpeed = buildMomSpeedField(advantageField);
  const dadSpeed = buildDadSpeedField(aiHealing);
  const babySpeed = buildBabySpeedField(earnHealing);

  const triHeartAdvantage = buildTriHeartAdvantageField({
    momAdv: advantageField,
    dadAdv: globalThis?.PulseAIAdvantageField || {},
    babyAdv: globalThis?.PulseEarnAdvantageField || {},
    organismOverlay
  });

  const triHeartSpeed = buildTriHeartSpeedField({
    momSpeed,
    dadSpeed,
    babySpeed
  });

  const triHeartPresence = buildTriHeartPresenceField({
    momPresence,
    dadPresence,
    babyPresence
  });

  const triHeartOrganismOverlay = buildTriHeartOrganismOverlay(organismOverlay);

  heartHealing.triHeartLiveness = triHeartLiveness;
  heartHealing.triHeartAdvantage = triHeartAdvantage;
  heartHealing.triHeartSpeed = triHeartSpeed;
  heartHealing.triHeartPresence = triHeartPresence;
  heartHealing.triHeartOrganismOverlay = triHeartOrganismOverlay;

  let beatResult = null;
  let beatSource = "mom";

  try {
    // MOM PRIMARY BEAT
    beatResult = await heartbeat.beat(pacemakerSignal, heartbeatContext);
    heartHealing.lastBeatResult = beatResult;
    heartHealing.lastError = null;
    heartHealing.lastExitReason = "ok";
    heartHealing.lastBeatSource = "mom";

    aiHeartbeat.pulseAiHeartbeat?.("mom-pulse");
    pulseEarnFromHeartbeat?.("mom-heart", {}, {});

    await logHeart("BEAT_COMPLETE", { beatSource: "mom" });

    return {
      ok: true,
      beat: beatResult,
      beatSource,
      heartCycle: HEART_CYCLE,
      heartCycleSignature: heartHealing.lastHeartCycleSignature,
      heartBandSignature,
      binaryField,
      waveField,
      advantageField,
      organismOverlay,
      aiFallbackSurface,
      babyFallbackSurface,
      triHeartLiveness,
      triHeartAdvantage,
      triHeartSpeed,
      triHeartPresence,
      triHeartOrganismOverlay,
      ...HEART_CONTEXT
    };
  } catch (err) {
    const msg = String(err);

    // MOM DOWN → DAD FALLBACK
    if (aiFallbackSurface.aiHeartbeatAlive && aiHeartbeat.snapshotAiHeartbeat) {
      try {
        const dadSnapshot = aiHeartbeat.snapshotAiHeartbeat();
        beatResult = dadSnapshot;
        beatSource = "dad";

        heartHealing.lastBeatResult = beatResult;
        heartHealing.lastExitReason = "ok_fallback_dad";
        heartHealing.lastBeatSource = "dad";

        await logHeart("BEAT_FALLBACK_DAD", { error: msg });

        return {
          ok: true,
          beat: beatResult,
          beatSource,
          heartCycle: HEART_CYCLE,
          heartCycleSignature: heartHealing.lastHeartCycleSignature,
          heartBandSignature,
          binaryField,
          waveField,
          advantageField,
          organismOverlay,
          aiFallbackSurface,
          babyFallbackSurface,
          triHeartLiveness,
          triHeartAdvantage,
          triHeartSpeed,
          triHeartPresence,
          triHeartOrganismOverlay,
          ...HEART_CONTEXT
        };
      } catch (_) {}
    }

    // MOM DOWN, DAD DOWN → BABY FALLBACK
    if (babyFallbackSurface.babyHeartbeatAlive) {
      try {
        const earnBeat = pulseEarnFromHeartbeat?.("mom-fallback", {}, {}) || null;
        beatResult = earnBeat;
        beatSource = "baby";

        heartHealing.lastBeatResult = beatResult;
        heartHealing.lastExitReason = "ok_fallback_baby";
        heartHealing.lastBeatSource = "baby";

        await logHeart("BEAT_FALLBACK_BABY", { error: msg });

        return {
          ok: true,
          beat: beatResult,
          beatSource,
          heartCycle: HEART_CYCLE,
          heartCycleSignature: heartHealing.lastHeartCycleSignature,
          heartBandSignature,
          binaryField,
          waveField,
          advantageField,
          organismOverlay,
          aiFallbackSurface,
          babyFallbackSurface,
          triHeartLiveness,
          triHeartAdvantage,
          triHeartSpeed,
          triHeartPresence,
          triHeartOrganismOverlay,
          ...HEART_CONTEXT
        };
      } catch (_) {}
    }

    // MOM DOWN, DAD DOWN, BABY DOWN → HARD FAIL
    heartHealing.lastError = { message: msg, stage: "triheart_failure" };
    heartHealing.lastExitReason = "fatal_error";
    heartHealing.lastBeatSource = "none";

    await logHeart("FATAL_ERROR", { message: msg });

    return {
      ok: false,
      error: msg,
      beatSource: "none",
      heartCycle: HEART_CYCLE,
      heartCycleSignature: heartHealing.lastHeartCycleSignature,
      heartBandSignature,
      binaryField,
      waveField,
      advantageField,
      organismOverlay,
      aiFallbackSurface,
      babyFallbackSurface,
      triHeartLiveness,
      triHeartAdvantage,
      triHeartSpeed,
      triHeartPresence,
      triHeartOrganismOverlay,
      ...HEART_CONTEXT
    };
  }
}

// ============================================================================
// DIAGNOSTICS — v20 IMMORTALPLUS TRI-HEART
// ============================================================================
export function getPulseProxyHeartHealingState() {
  return { ...heartHealing };
}

export function getPulseProxyHeartDiagnostics() {
  return {
    cycles: heartHealing.cycles,
    lastCycleIndex: heartHealing.lastCycleIndex,
    lastExitReason: heartHealing.lastExitReason,

    lastBeatResult: heartHealing.lastBeatResult,
    lastBeatSource: heartHealing.lastBeatSource,
    lastError: heartHealing.lastError,

    lastHeartCycleSignature: heartHealing.lastHeartCycleSignature,
    lastHeartBandSignature: heartHealing.lastHeartBandSignature,
    lastBinaryField: heartHealing.lastBinaryField,
    lastWaveField: heartHealing.lastWaveField,
    lastAdvantageField: heartHealing.lastAdvantageField,
    lastOrganismOverlay: heartHealing.lastOrganismOverlay,

    lastAiFallbackSurface: heartHealing.lastAiFallbackSurface,
    lastBabyFallbackSurface: heartHealing.lastBabyFallbackSurface,

    triHeartLiveness: heartHealing.triHeartLiveness,
    triHeartAdvantage: heartHealing.triHeartAdvantage,
    triHeartSpeed: heartHealing.triHeartSpeed,
    triHeartPresence: heartHealing.triHeartPresence,
    triHeartOrganismOverlay: heartHealing.triHeartOrganismOverlay
  };
}

// ============================================================================
// EXPORTS — v20 IMMORTALPLUS TRI-HEART
// ============================================================================
export default {
  pulseHeartOnce,
  getPulseProxyHeartHealingState,
  getPulseProxyHeartDiagnostics,
  PulseProxyHeartMeta,
  PulseRole
};

// ============================================================================
// END OF FILE — PulseProxyHeart-v20-ImmortalPlus-TRI-HEART-ADVANTAGE
// Deterministic Mom Pacemaker • Tri-Heart Mesh • Full Organism Fusion
// ============================================================================
