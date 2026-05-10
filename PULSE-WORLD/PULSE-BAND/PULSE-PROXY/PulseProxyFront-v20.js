// ============================================================================
//  PulseProxyFront-v20-ImmortalPlus-ADVANTAGE-FIRST.js
//  Advantage-First Proxy Front • Dual-Band Hybrid • Full Organism Fusion
//  v20-ImmortalPlus: CoreMemory-integrated, immortal route memory, dualband overlays,
//                    route warmth + chunk/cache/prewarm hints, deterministic surfaces,
//                    organism-fused advantage (binary + symbolic + tri-env + telemetry).
//  Connects Proxy → BinaryField (non-executable descriptor) OR Proxy → Symbolic Router
// ============================================================================
//
//  ROLE (v20-ImmortalPlus-ADVANTAGE-FIRST):
//  ----------------------------------------
//  • Advantage-first route planner at the proxy front.
//  • Treats binary as a DATA SURFACE ONLY (non-executable).
//  • Symbolic routing is a first-class, dual-band, organism-aware surface.
//  • Chooses binary vs symbolic based on fused advantage (binary + symbolic + organism).
//  • Uses earned route memory (previousRouteMemory + CoreMemory) deterministically.
//  • Emits band + dnaTag + A‑B‑A surfaces so CNS/Brain can classify routes.
//  • Emits routeWarmth + chunk/cache/prewarm hints for Mesh/Router/SDN prewarm.
//  • Immortal route memory via PulseCoreMemory (organ-local + global).
//  • DualBand overlay snapshot + organism overlays (circulatory, telemetry, adrenal, tri-env).
//
//  SAFETY CONTRACT (v20-ImmortalPlus):
//  -----------------------------------
//  • Single import: PulseCoreMemory (immortal, in-process only).
//  • No randomness.
//  • No timestamps in decision logic (only symbolic meta if needed).
//  • Pure deterministic logic.
//  • Zero mutation outside instance (except CoreMemory writes).
//  • Binary is NEVER executed, only described (phenotype/surface fields).
//  • No network, no IO, no async, no AI.
// ============================================================================
import {
  OrganismIdentity,
  buildPulseOrganismMap as buildOrganismMap
} from "../PULSE-X/PulseWorldOrganismMap-v24.js";
const Identity = OrganismIdentity(import.meta.url);

// 2 — EXPORT GENOME METADATA
// export const PulseMeshMeta = Identity.OrganMeta;
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
// export const PULSE_EARN_IMMUNE_CONTEXT = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

// v20-ImmortalPlus: CoreMemory integration (unchanged import surface)
import { PulseCoreMemory } from "../PULSE-CORE/PulseCoreMemory-v24.js";

// ============================================================================
//  INTERNAL HELPERS — deterministic, pure
// ============================================================================

const CORE_MEMORY_NAMESPACE = "PulseProxyFrontRoute-v20-ImmortalPlus";

function computeHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `h${h}`;
}

function buildRouteKey({ pattern, pageId, sourceId }) {
  const safePattern = String(pattern || "");
  const safePageId = String(pageId || "NO_PAGE");
  const safeSourceId = String(sourceId || "NO_SOURCE");
  return computeHash(`ROUTEKEY::${safePattern}::${safePageId}::${safeSourceId}`);
}

function buildBinaryField(bits) {
  const len = Array.isArray(bits) ? bits.length : 0;
  const ones = Array.isArray(bits)
    ? bits.reduce((acc, b) => (b === 1 ? acc + 1 : acc), 0)
    : 0;
  const zeros = len - ones;
  const density = len === 0 ? 0 : ones / len;
  const surface = len + ones * 3 + zeros;

  return Object.freeze({
    length: len,
    ones,
    zeros,
    density,
    surface,
    binaryPhenotypeSignature: `front-binary-pheno-${surface % 99991}`,
    binarySurfaceSignature: `front-binary-surface-${(surface * 7) % 99991}`,
    parity: surface % 2 === 0 ? 0 : 1,
    shiftDepth: Math.max(0, Math.floor(Math.log2(surface || 1)))
  });
}

function buildBinaryWaveField(pattern) {
  const safePattern = String(pattern || "");
  const plen = safePattern.length;

  const amplitude = Math.max(4, plen % 16);
  const wavelength = amplitude + 6;
  const phase = (plen * 3) % 32;

  let band = "root";
  if (safePattern.includes("router")) band = "router";
  else if (safePattern.includes("mesh")) band = "mesh";
  else if (safePattern.includes("send")) band = "send";
  else if (safePattern.includes("proxy")) band = "proxy";

  return Object.freeze({
    pattern: safePattern,
    amplitude,
    wavelength,
    phase,
    band,
    mode: "binary-wave",
    waveSignature: computeHash(
      `BINARY_WAVE::${safePattern}::${amplitude}::${wavelength}::${phase}::${band}`
    )
  });
}

function buildSymbolicWaveField(pattern) {
  const safePattern = String(pattern || "");
  const plen = safePattern.length;

  const amplitude = Math.max(3, (plen % 12) + 2);
  const wavelength = amplitude + 5;
  const phase = (plen * 5) % 24;

  let band = "symbolic-root";
  if (safePattern.includes("world")) band = "world";
  else if (safePattern.includes("page")) band = "page";
  else if (safePattern.includes("user")) band = "user";
  else if (safePattern.includes("session")) band = "session";

  return Object.freeze({
    pattern: safePattern,
    amplitude,
    wavelength,
    phase,
    band,
    mode: "symbolic-wave",
    waveSignature: computeHash(
      `SYMBOLIC_WAVE::${safePattern}::${amplitude}::${wavelength}::${phase}::${band}`
    )
  });
}

function buildFrontCycleSignature(cycle) {
  return computeHash(`FRONT_CYCLE::${cycle}`);
}

function buildBandSignature(band, routeKey) {
  return computeHash(`FRONT_BAND::${band}::${routeKey}`);
}

function isPureBinary(bits) {
  if (!Array.isArray(bits)) return false;
  for (let i = 0; i < bits.length; i++) {
    if (bits[i] !== 0 && bits[i] !== 1) return false;
  }
  return true;
}

// ---------------------------------------------------------------------------
//  ADVANTAGE FIELDS — Binary, Symbolic, Organism Fusion
// ---------------------------------------------------------------------------

function buildBinaryAdvantageField(binaryField, binaryWaveField, band) {
  const density = binaryField.density || 0;
  const amplitude = binaryWaveField.amplitude || 0;
  const wavelength = binaryWaveField.wavelength || 0;

  const efficiency = density === 0 ? 0 : (amplitude + 1) / (wavelength + 1);
  const stress = Math.min(1, density * 2);
  const rawScore = efficiency * (1 + stress);
  const advantageScore = Math.max(0, Math.min(1.2, rawScore)); // clamp slightly above 1 for internal

  return Object.freeze({
    type: "binary",
    band,
    density,
    amplitude,
    wavelength,
    efficiency,
    stress,
    advantageScore,
    advantageSignature: computeHash(
      `BINARY_ADVANTAGE::${band}::${density}::${amplitude}::${wavelength}::${advantageScore}`
    )
  });
}

function buildSymbolicAdvantageField(symbolicWaveField, binaryShadowField, dualBandOverlay) {
  const amp = symbolicWaveField.amplitude || 0;
  const wl = symbolicWaveField.wavelength || 1;
  const symEnergy = amp / wl;

  const shadowDensity = binaryShadowField.density || 0;
  const shadowLen = binaryShadowField.length || 0;
  const shadowEnergy = shadowDensity * (shadowLen > 0 ? 1 : 0.5);

  const band = dualBandOverlay.band || "unknown";
  const mode = dualBandOverlay.mode || "unknown";
  const presence = dualBandOverlay.presence || "unknown";

  let bandBias = 1.0;
  if (band === "binary") bandBias += 0.05;
  if (band === "symbolic") bandBias += 0.05;
  if (mode === "dual") bandBias += 0.1;
  if (presence === "strong") bandBias += 0.1;

  const rawScore = (symEnergy * 0.6 + shadowEnergy * 0.4) * bandBias;
  const advantageScore = Math.max(0, Math.min(1.2, rawScore));

  return Object.freeze({
    type: "symbolic",
    band,
    mode,
    presence,
    symEnergy,
    shadowDensity,
    shadowLen,
    bandBias,
    advantageScore,
    advantageSignature: computeHash(
      `SYMBOLIC_ADVANTAGE::${band}::${mode}::${presence}::${symEnergy}::${shadowDensity}::${advantageScore}`
    )
  });
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
  const triEnvStress = Math.max(
    0,
    Math.min(1, triEnv.triEnvStress ?? 0)
  );
  const proxyPressure = Math.max(
    0,
    Math.min(1, proxyContext.pressure ?? 0)
  );

  const organismLoad = Math.max(pressure, adrenalStress, triEnvStress, proxyPressure);
  const organismFlow = flow;

  const fusionScore = Math.max(
    0,
    Math.min(
      1.2,
      organismFlow * 0.5 + (1 - organismLoad) * 0.5
    )
  );

  return Object.freeze({
    flow,
    pressure,
    adrenalStress,
    triEnvStress,
    proxyPressure,
    organismLoad,
    organismFlow,
    fusionScore,
    overlaySignature: computeHash(
      `ORGANISM_OVERLAY::${flow}::${pressure}::${adrenalStress}::${triEnvStress}::${proxyPressure}::${fusionScore}`
    )
  });
}

function fuseAdvantage(binaryAdv, symbolicAdv, organismOverlay) {
  const bScore = binaryAdv.advantageScore || 0;
  const sScore = symbolicAdv.advantageScore || 0;
  const oScore = organismOverlay.fusionScore || 0.5;

  const binaryWeight = 0.5 + (oScore - 0.5) * 0.2;
  const symbolicWeight = 1 - binaryWeight;

  const fusedBinary = bScore * binaryWeight;
  const fusedSymbolic = sScore * symbolicWeight;

  const totalScore = fusedBinary + fusedSymbolic;
  const chosenMode = totalScore <= 0 ? "symbolic" : (fusedBinary >= fusedSymbolic ? "binary" : "symbolic");

  return Object.freeze({
    chosenMode,
    fusedBinary,
    fusedSymbolic,
    organismFusion: oScore,
    totalScore,
    advantageSignature: computeHash(
      `FUSED_ADVANTAGE::${chosenMode}::${fusedBinary}::${fusedSymbolic}::${oScore}::${totalScore}`
    )
  });
}

// ---------------------------------------------------------------------------
//  ROUTE WARMTH + CHUNK/CACHE/PREWARM HINTS — deterministic overlays
// ---------------------------------------------------------------------------

function buildRouteWarmth({ binaryField, usedMemory }) {
  const len = binaryField.length || 0;
  const density = binaryField.density || 0;

  let warmth = "cold";
  if (usedMemory && len > 0) {
    warmth = density > 0.5 ? "hot" : "warm";
  } else if (len > 0) {
    warmth = density > 0.5 ? "warm" : "cool";
  }

  return Object.freeze({
    routeWarmth: warmth,
    length: len,
    density,
    usedMemory: !!usedMemory
  });
}

function buildChunkCacheHints({ binaryField, routeWarmth }) {
  const len = binaryField.length || 0;
  const density = binaryField.density || 0;

  const multiChunk = len > 1024;
  const heavyDensity = density > 0.7;

  const chunkHint =
    multiChunk ? "multi-chunk" :
    len > 0 ? "single-chunk" :
    "none";

  const cacheHint =
    heavyDensity ? "route-cache-heavy" :
    len > 0 ? "route-cache-light" :
    "none";

  const prewarmHint =
    routeWarmth === "cold" || routeWarmth === "cool"
      ? "prewarm-preferred"
      : "prewarm-optional";

  return Object.freeze({
    chunkHint,
    cacheHint,
    prewarmHint
  });
}

// ---------------------------------------------------------------------------
//  DUALBAND OVERLAY SNAPSHOT — symbolic-only view of DualBandContext
// ---------------------------------------------------------------------------

function buildDualBandOverlay(dualBandContext) {
  const ctx =
    dualBandContext && typeof dualBandContext === "object"
      ? dualBandContext
      : {};

  const band = typeof ctx.band === "string" ? ctx.band : "unknown";
  const mode = typeof ctx.mode === "string" ? ctx.mode : "unknown";
  const presence = typeof ctx.presence === "string" ? ctx.presence : "unknown";

  return Object.freeze({
    band,
    mode,
    presence,
    overlaySignature: computeHash(
      `DUALBAND::${band}::${mode}::${presence}`
    )
  });
}

// ============================================================================
//  CORE MEMORY INTEGRATION — immortal route memory (deterministic keys)
// ============================================================================

function coreMemoryRecordRoute(routeMemory) {
  if (!routeMemory || !routeMemory.routeKey) return;

  const summary = {
    routeKey: routeMemory.routeKey,
    decision: routeMemory.decision,
    band: routeMemory.band,
    bandSignature: routeMemory.bandSignature,
    binaryAdvantageField: routeMemory.binaryAdvantageField,
    symbolicAdvantageField: routeMemory.symbolicAdvantageField,
    chosenAdvantageField: routeMemory.chosenAdvantageField,
    routeWarmth: routeMemory.routeWarmth,
    chunkCacheHints: routeMemory.chunkCacheHints,
    dualBandOverlay: routeMemory.dualBandOverlay,
    organismOverlay: routeMemory.organismOverlay,
    dnaTag: routeMemory.dnaTag,
    frontCycle: routeMemory.frontCycle,
    frontCycleSignature: routeMemory.frontCycleSignature
  };

  try {
    if (PulseCoreMemory && typeof PulseCoreMemory.record === "function") {
      PulseCoreMemory.record(
        CORE_MEMORY_NAMESPACE,
        routeMemory.routeKey,
        summary
      );
    }
  } catch {
    // Fail-open: never throw, never break proxy front.
  }
}

function coreMemoryRecallRoute(routeKey) {
  if (!routeKey) return null;
  try {
    if (PulseCoreMemory && typeof PulseCoreMemory.recall === "function") {
      const stored = PulseCoreMemory.recall(CORE_MEMORY_NAMESPACE, routeKey);
      if (stored && typeof stored === "object") {
        return {
          routeKey: stored.routeKey || routeKey,
          decision: stored.decision || { mode: "binary" },
          band: stored.band || "binary",
          bandSignature: stored.bandSignature || null,
          binaryAdvantageField: stored.binaryAdvantageField || null,
          symbolicAdvantageField: stored.symbolicAdvantageField || null,
          chosenAdvantageField: stored.chosenAdvantageField || null,
          routeWarmth: stored.routeWarmth || null,
          chunkCacheHints: stored.chunkCacheHints || null,
          dualBandOverlay: stored.dualBandOverlay || null,
          organismOverlay: stored.organismOverlay || null,
          frontCycle: stored.frontCycle || 0,
          frontCycleSignature: stored.frontCycleSignature || null,
          dnaTag: stored.dnaTag || null
        };
      }
    }
  } catch {
    // Fail-open: ignore CoreMemory failures.
  }
  return null;
}

// ============================================================================
//  ROUTE PLANNER — advantage-first, dual-band hybrid, deterministic (A‑B‑A)
// ============================================================================

let frontCycle = 0;

export function planProxyRoute({
  bits,
  pattern,
  pageId,
  sourceId,
  previousRouteMemory,
  dualBandContext,
  organismAdvantageContext
}) {
  frontCycle++;

  const routeKey = buildRouteKey({ pattern, pageId, sourceId });
  const binaryField = buildBinaryField(bits);
  const binaryWaveField = buildBinaryWaveField(pattern);
  const symbolicWaveField = buildSymbolicWaveField(pattern);
  const frontCycleSignature = buildFrontCycleSignature(frontCycle);

  const pureBinary = isPureBinary(bits);

  let usedMemory = false;
  let decision = { mode: "binary" };

  let effectiveMemory = previousRouteMemory;
  if (!effectiveMemory || effectiveMemory.routeKey !== routeKey) {
    const recalled = coreMemoryRecallRoute(routeKey);
    if (recalled && recalled.routeKey === routeKey && recalled.decision) {
      effectiveMemory = recalled;
    }
  }

  if (effectiveMemory && effectiveMemory.routeKey === routeKey) {
    usedMemory = true;
    decision = effectiveMemory.decision;
  }

  const dualBandOverlay = buildDualBandOverlay(dualBandContext);
  const organismOverlay = buildOrganismOverlay(organismAdvantageContext);

  const binaryAdvantageField = buildBinaryAdvantageField(
    binaryField,
    binaryWaveField,
    "binary"
  );

  const binaryShadowField = binaryField; // simple shadow: same field used as projection
  const symbolicAdvantageField = buildSymbolicAdvantageField(
    symbolicWaveField,
    binaryShadowField,
    dualBandOverlay
  );

  const fusedAdvantage = fuseAdvantage(
    binaryAdvantageField,
    symbolicAdvantageField,
    organismOverlay
  );

  let chosenMode = fusedAdvantage.chosenMode;

  if (!pureBinary && chosenMode === "binary") {
    chosenMode = "symbolic";
  }

  if (!effectiveMemory || effectiveMemory.routeKey !== routeKey) {
    decision = { mode: chosenMode };
  }

  const band =
    decision.mode === "binary"
      ? "binary"
      : decision.mode === "symbolic"
      ? "symbolic"
      : "dual";

  const bandSignature = buildBandSignature(band, routeKey);

  const routeWarmth = buildRouteWarmth({ binaryField, usedMemory });
  const chunkCacheHints = buildChunkCacheHints({
    binaryField,
    routeWarmth: routeWarmth.routeWarmth
  });

  const dnaTag =
    decision.mode === "binary"
      ? "PROXY_FRONT_BINARY"
      : "PROXY_FRONT_SYMBOLIC";

  const routeMemory = {
    routeKey,
    decision,
    band,
    bandSignature,
    binaryAdvantageField,
    symbolicAdvantageField,
    chosenAdvantageField: fusedAdvantage,
    routeWarmth,
    chunkCacheHints,
    dualBandOverlay,
    organismOverlay,
    frontCycle,
    frontCycleSignature,
    dnaTag
  };

  coreMemoryRecordRoute(routeMemory);

  return {
    routeKey,
    decision,
    routeMemory,
    usedMemory,
    binaryField,
    binaryWaveField,
    symbolicWaveField,
    band,
    bandSignature,
    frontCycleSignature,
    binaryAdvantageField,
    symbolicAdvantageField,
    chosenAdvantageField: fusedAdvantage,
    routeWarmth,
    chunkCacheHints,
    dualBandOverlay,
    organismOverlay
  };
}

// ============================================================================
//  PROXY FRONT — orchestrates advantage-first routing with dual-band hybrid
// ============================================================================

export function proxyFrontRoute({
  bits,
  pattern,
  pageId = "NO_PAGE",
  sourceId = "NO_SOURCE",
  previousRouteMemory = null,
  dualBandContext = null,
  organismAdvantageContext = null,

  fieldIngest,     // function(bits) → packet (non-executable binary descriptor)
  legacyCreate     // function(params) → proxyObject
}) {
  const plan = planProxyRoute({
    bits,
    pattern,
    pageId,
    sourceId,
    previousRouteMemory,
    dualBandContext,
    organismAdvantageContext
  });

  if (plan.decision.mode === "binary") {
    const packet = fieldIngest(bits);

    return {
      mode: "binary",
      band: "binary",
      dnaTag: "PROXY_FRONT_BINARY",
      routeKey: plan.routeKey,
      packet,
      binaryField: plan.binaryField,
      binaryWaveField: plan.binaryWaveField,
      symbolicWaveField: plan.symbolicWaveField,
      bandSignature: plan.bandSignature,
      frontCycleSignature: plan.frontCycleSignature,
      binaryAdvantageField: plan.binaryAdvantageField,
      symbolicAdvantageField: plan.symbolicAdvantageField,
      chosenAdvantageField: plan.chosenAdvantageField,
      routeWarmth: plan.routeWarmth,
      chunkCacheHints: plan.chunkCacheHints,
      dualBandOverlay: plan.dualBandOverlay,
      organismOverlay: plan.organismOverlay,
      routeMemory: plan.routeMemory,
      usedMemory: plan.usedMemory
    };
  }

  const proxy = legacyCreate({
    jobId: "NO_JOB",
    pattern,
    payload: {},
    priority: "normal",
    returnTo: null,
    parentLineage: null,
    pageId
  });

  return {
    mode: "symbolic",
    band: "symbolic",
    dnaTag: "PROXY_FRONT_SYMBOLIC",
    routeKey: plan.routeKey,
    proxy,
    binaryField: plan.binaryField,
    binaryWaveField: plan.binaryWaveField,
    symbolicWaveField: plan.symbolicWaveField,
    bandSignature: plan.bandSignature,
    frontCycleSignature: plan.frontCycleSignature,
    binaryAdvantageField: plan.binaryAdvantageField,
    symbolicAdvantageField: plan.symbolicAdvantageField,
    chosenAdvantageField: plan.chosenAdvantageField,
    routeWarmth: plan.routeWarmth,
    chunkCacheHints: plan.chunkCacheHints,
    dualBandOverlay: plan.dualBandOverlay,
    organismOverlay: plan.organismOverlay,
    routeMemory: plan.routeMemory,
    usedMemory: plan.usedMemory
  };
}
