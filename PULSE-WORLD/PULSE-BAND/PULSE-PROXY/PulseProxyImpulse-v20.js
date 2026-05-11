// ============================================================================
// FILE: PulseOSImpulseEngine-v20-Immortal-CHUNK.js
// PULSE OS — v20‑IMMORTAL‑CHUNK
// “THE IMPULSE ENGINE / NEURAL IMPULSE LIFECYCLE ORGAN — 20++”
// CoreMemory‑Integrated • Deterministic • Immortal Lineage • Chunk + Presence
// Band/Wave/Binary/Presence Fields • Speed‑Aware + Pressure/Stability/World‑Lens Dynamics
// ============================================================================
/* 
@PULSE_20_IMMORTAL_REQUIRE_FULL_STACK
This organ requires FULL 20++ IMMORTAL STACK on every upgrade:
- AI_EXPERIENCE_META + IMPULSE_CONTEXT + IMPULSE_META
- Full organ metadata + evo flags + lineage
- Full contract (input/output/consumers) — backward compatible, lineage‑safe
- Full experience surfaces: band / wave / binary / presence / speed / advantage / experience
- Full IMMORTAL++ overlays: drift / pressure / stability / load / healing / diagnostics
- Full chunk/cache/prewarm overlays + presence views + return surfaces
- Full world‑lens / limbic / tri‑heart / organism‑pressure / organism‑stability awareness
- Strategy maps for all lineage variants (legacy → v9.3 → v10 → v12.3 → v15 → v16 → v20++)
Always EXTEND, never REMOVE, existing surfaces and contracts.
*/
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
export const IMPULSE_CONTEXT = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

// ============================================================================
// CORE MEMORY — IMMORTAL IMPULSE MEMORY
// ============================================================================
import { PulseCoreMemory } from "../PULSE-CORE/PulseCoreMemory-v24.js";
import { createPulseV3 } from "../PULSE-SEND/PulseSendV3UnifiedOrganism-v16.js";
import { createPulseV2 } from "../PULSE-SEND/PulseSendV2EvolutionEngine-v16.js";
import { createLegacyPulse } from "../PULSE-SEND/PulseSendLegacyPulse-v16.js";
import { computeSpeedPolicy } from "../PULSE-PROXY/PulseProxyImpulseSpeed-v20.js";

const CORE_MEMORY_NAMESPACE = "PulseImpulse-v20-Immortal-CHUNK";
const coreMemory = new PulseCoreMemory();


// ============================================================================
// SHARED HELPERS (IMMORTAL, NO Date.now)
// ============================================================================
let IMPULSE_CYCLE = 0;
let TICK_COUNTER = 0;

function nextTick() {
  TICK_COUNTER += 1;
  return TICK_COUNTER;
}

function computeHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `h${h}`;
}

function buildLineage(parentLineage, pattern) {
  const base = Array.isArray(parentLineage) ? parentLineage.slice() : [];
  base.push(pattern || "UNKNOWN_PATTERN");
  return base;
}

function computeShapeSignature(pattern, lineage) {
  const p = String(pattern || "");
  const l = Array.isArray(lineage) ? lineage.join("|") : "";
  let h = 0;
  const s = `${p}::${p.length}::${l}`;
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `shape-${h}`;
}

function computeEvolutionStage(pattern, lineage) {
  const depth = Array.isArray(lineage) ? lineage.length : 0;
  if (depth === 0) return "seed";
  if (depth < 3)  return "early";
  if (depth < 6)  return "mature";
  return "stable";
}

function buildImpulseBand(urgency, hops) {
  const u = typeof urgency === "number" ? urgency : 0;
  const h = typeof hops === "number" ? hops : 0;
  if (u < 0.2 && h < 3) return "symbolic";
  if (u < 0.6 && h < 6) return "transition";
  return "binary";
}

function buildImpulseBandSignature(band) {
  return computeHash(`IMPULSE_BAND::${band}`);
}

function buildBinaryField(hops) {
  const patternLen = 12 + (hops || 0);
  const density = patternLen + 24;
  const surface = density + patternLen;
  return {
    binaryPhenotypeSignature: `impulse-binary-pheno-${surface % 99991}`,
    binarySurfaceSignature: `impulse-binary-surface-${(surface * 7) % 99991}`,
    binarySurface: { patternLen, density, surface },
    parity: surface % 2 === 0 ? 0 : 1,
    shiftDepth: Math.max(0, Math.floor(Math.log2(surface || 1)))
  };
}

function buildWaveField(pattern) {
  const p = String(pattern || "");
  const plen = p.length || 1;
  const amplitude = 10 + (plen % 8);
  const wavelength = amplitude + 4;
  const phase = amplitude % 16;

  let band = "symbolic-root";
  if (p.includes("router")) band = "router";
  else if (p.includes("mesh")) band = "mesh";
  else if (p.includes("send")) band = "send";
  else if (p.includes("proxy")) band = "proxy";

  return {
    amplitude,
    wavelength,
    phase,
    band,
    mode: "symbolic-wave",
    waveSignature: computeHash(
      `IMPULSE_WAVE::${p}::${amplitude}::${wavelength}::${phase}::${band}`
    )
  };
}

function buildPresenceField(intent, pageName) {
  const i = String(intent || "UNKNOWN_INTENT");
  const p = String(pageName || "UNKNOWN_PAGE");
  const key = `${i}::${p}`;
  const signature = computeHash(`PRESENCE_FIELD::${key}`);

  const focus =
    i.includes("focus") || p.includes("focus")
      ? "focused"
      : i.includes("background") || p.includes("background")
      ? "background"
      : "neutral";

  return {
    intent,
    pageName,
    focus,
    presenceSignature: signature
  };
}

function buildImpulseCycleSignature(cycle) {
  return computeHash(`IMPULSE_CYCLE::${cycle}`);
}

// ============================================================================
// SPEED / ADVANTAGE / EXPERIENCE / PRESSURE / STABILITY / WORLD-LENS FIELDS
// ============================================================================
function buildImpulseSpeedField({ hops, urgency, factor }) {
  const h = Math.max(0, hops || 0);
  const u = Math.max(0, Math.min(1, urgency || 0));
  const f = factor > 0 ? factor : 1;

  const hopPenalty = 1 / (1 + h);
  const speedScore = Math.min(1, u * 0.6 + hopPenalty * 0.3 + (1 / f) * 0.1);

  let speedBand = "steady";
  if (speedScore < 0.25) speedBand = "slow";
  else if (speedScore < 0.6) speedBand = "steady";
  else speedBand = "quickened";

  return {
    hops: h,
    urgency: u,
    factor: f,
    speedScore,
    speedBand,
    speedSignature: computeHash(
      `IMPULSE_SPEED::${h}::${u}::${f}::${speedScore}::${speedBand}`
    )
  };
}

function buildImpulseAdvantageField({ energy, factor, hops }) {
  const e = energy > 0 ? energy : 0;
  const f = factor > 0 ? factor : 1;
  const h = Math.max(0, hops || 0);

  const efficiency = e / (1 + h);
  const stability = 1 / (1 + Math.abs(1 - f));
  const advantageScore = Math.min(1, (efficiency * 0.6 + stability * 0.4));

  return {
    energy: e,
    factor: f,
    hops: h,
    efficiency,
    stability,
    advantageScore,
    advantageSignature: computeHash(
      `IMPULSE_ADVANTAGE::${e}::${f}::${h}::${efficiency}::${stability}::${advantageScore}`
    )
  };
}

function buildImpulseExperienceField({ hops, band, speedBand }) {
  const h = Math.max(0, hops || 0);
  const b = band || "unknown";
  const s = speedBand || "steady";

  let load = "light";
  if (h === 0) load = "idle";
  else if (h < 4) load = "light";
  else if (h < 12) load = "moderate";
  else load = "heavy";

  return {
    hops: h,
    band: b,
    speedBand: s,
    load,
    experienceSignature: computeHash(
      `IMPULSE_EXPERIENCE::${h}::${b}::${s}::${load}`
    )
  };
}

// v20++: organism pressure/stability overlays derived from existing fields
function buildImpulsePressureField({ hops, urgency, load }) {
  const h = Math.max(0, hops || 0);
  const u = Math.max(0, Math.min(1, urgency || 0));
  const loadFactor =
    load === "heavy" ? 1 :
    load === "moderate" ? 0.7 :
    load === "light" ? 0.4 :
    0.1;

  const pressureScore = Math.min(1, u * 0.5 + (h / (h + 4)) * 0.3 + loadFactor * 0.2);

  return {
    hops: h,
    urgency: u,
    load,
    pressureScore,
    pressureBand:
      pressureScore < 0.25 ? "low" :
      pressureScore < 0.6  ? "medium" :
                             "high",
    pressureSignature: computeHash(
      `IMPULSE_PRESSURE::${h}::${u}::${load}::${pressureScore}`
    )
  };
}

function buildImpulseStabilityField({ advantageField, experienceField }) {
  const baseStability = advantageField?.stability ?? 0.5;
  const load = experienceField?.load || "light";

  const loadPenalty =
    load === "heavy" ? 0.3 :
    load === "moderate" ? 0.15 :
    load === "light" ? 0.05 :
    0;

  const stabilityScore = Math.max(0, Math.min(1, baseStability * (1 - loadPenalty)));

  return {
    baseStability,
    load,
    stabilityScore,
    stabilityBand:
      stabilityScore < 0.25 ? "fragile" :
      stabilityScore < 0.6  ? "balanced" :
                              "stable",
    stabilitySignature: computeHash(
      `IMPULSE_STABILITY::${baseStability}::${load}::${stabilityScore}`
    )
  };
}

function buildImpulseWorldLensField(impulse) {
  const hops = Array.isArray(impulse.path) ? impulse.path : [];
  const totalHops = hops.length;

  const byLayer = {};
  const byPage = {};
  const byBand = {};

  for (const hop of hops) {
    const layerId = hop.id || hop.layerId || "UNKNOWN_LAYER";
    const page = hop.page || "UNKNOWN_PAGE";
    const band = hop.band || "unknown";

    byLayer[layerId] = (byLayer[layerId] || 0) + 1;
    byPage[page] = (byPage[page] || 0) + 1;
    byBand[band] = (byBand[band] || 0) + 1;
  }

  return {
    ...IMPULSE_CONTEXT,
    kind: "ImpulseWorldLensField",
    totalHops,
    byLayer,
    byPage,
    byBand,
    band: impulse.pulse?.meta?.band || "unknown",
    page: impulse.page?.name || "UNKNOWN_PAGE",
    worldLensSignature: computeHash(
      `IMPULSE_WORLD_LENS::${totalHops}::${Object.keys(byLayer).length}::${Object.keys(byPage).length}`
    )
  };
}

function impulseLog(event, data) {
  if (typeof window === "undefined") return;
  if (!window.PULSE_IMPULSE_DIAGNOSTICS) return;
  if (typeof console?.log !== "function") return;
  console.log("[ImpulseEngine-v20-Immortal]", event, { ...data, ctx: IMPULSE_CONTEXT });
}

// ============================================================================
// CHUNK + PRESENCE HELPERS — v20 IMMORTAL IMPULSE VIEWS
// ============================================================================
function stableStringify(value) {
  if (value === null || typeof value !== "object") {
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) {
    return "[" + value.map(stableStringify).join(",") + "]";
  }
  const keys = Object.keys(value).sort();
  const parts = keys.map(k => JSON.stringify(k) + ":" + stableStringify(value[k]));
  return "{" + parts.join(",") + "}";
}

function buildImpulseSignature(impulse) {
  return stableStringify({
    intent: impulse.intent,
    page: impulse.page?.name || "UNKNOWN_PAGE",
    pattern: impulse.pulse?.pattern || "UNKNOWN_PATTERN",
    lineage: impulse.pulse?.lineage || [],
    hops: impulse.path?.length || 0
  });
}

function buildImpulseChunk(hops, index, totalChunks) {
  return {
    ...IMPULSE_CONTEXT,
    kind: "ImpulseChunk",
    chunkIndex: index,
    chunkCount: totalChunks,
    hopCount: hops.length,
    hops
  };
}

function buildImpulseChunksFromImpulse(impulse, { maxChunkSize = 64 } = {}) {
  const hops = Array.isArray(impulse.path) ? impulse.path : [];
  if (!hops.length) return [];

  const size = Math.max(1, maxChunkSize | 0);
  const totalChunks = Math.ceil(hops.length / size);
  const chunks = [];

  for (let i = 0; i < totalChunks; i++) {
    const start = i * size;
    const end = start + size;
    const slice = hops.slice(start, end);
    chunks.push(buildImpulseChunk(slice, i, totalChunks));
  }

  return chunks;
}

function buildImpulsePresenceView(impulse) {
  const hops = Array.isArray(impulse.path) ? impulse.path : [];
  const totalHops = hops.length;

  const byLayer = {};
  const byBand = {};
  const byPage = {};
  const byDegradation = {};

  for (const hop of hops) {
    const layerId = hop.id || hop.layerId || "UNKNOWN_LAYER";
    const band = hop.band || "unknown";
    const page = hop.page || "UNKNOWN_PAGE";
    const tier = hop.degradationTier || "unknown";

    byLayer[layerId] = (byLayer[layerId] || 0) + 1;
    byBand[band] = (byBand[band] || 0) + 1;
    byPage[page] = (byPage[page] || 0) + 1;
    byDegradation[tier] = (byDegradation[tier] || 0) + 1;
  }

  return {
    ...IMPULSE_CONTEXT,
    kind: "ImpulsePresenceView",
    totalHops,
    byLayer,
    byBand,
    byPage,
    byDegradation,
    impulseSignature: buildImpulseSignature(impulse),
    band: impulse.pulse?.meta?.band || "unknown",
    presenceField: impulse.pulse?.meta?.presenceField || null
  };
}

function buildImpulsePrewarmSnapshot(impulse, { maxChunkSize = 64 } = {}) {
  const chunks = buildImpulseChunksFromImpulse(impulse, { maxChunkSize });
  const presence = buildImpulsePresenceView(impulse);
  const worldLens = buildImpulseWorldLensField(impulse);

  return {
    ...IMPULSE_CONTEXT,
    kind: "ImpulsePrewarmSnapshot",
    version: "v20-Immortal-CHUNK-Presence",
    tickId: impulse.tickId,
    intent: impulse.intent,
    page: impulse.page?.name || "UNKNOWN_PAGE",
    pulsePattern: impulse.pulse?.pattern || "UNKNOWN_PATTERN",
    totalHops: impulse.path?.length || 0,
    totalChunks: chunks.length,
    chunks,
    presence,
    worldLens
  };
}

// ============================================================================
// CORE MEMORY HELPERS — IMMORTAL IMPULSE STORAGE
// ============================================================================
function persistImpulseSnapshot(label, impulse) {
  const chunks = buildImpulseChunksFromImpulse(impulse, { maxChunkSize: 64 });
  const presence = buildImpulsePresenceView(impulse);
  const worldLens = buildImpulseWorldLensField(impulse);

  const snap = {
    tickId:   impulse.tickId,
    intent:   impulse.intent,
    version:  impulse.version,
    page:     { ...impulse.page },
    repairSeed: { ...impulse.repairSeed },
    identityHealth: impulse.identityHealth,
    pathway: { ...impulse.pathway, hops: [...impulse.pathway.hops] },
    hops:    impulse.path.length,
    pulse:   { ...impulse.pulse },
    meta:    { ...IMPULSE_CONTEXT },
    label,

    impulseSignature: buildImpulseSignature(impulse),
    chunks,
    presenceView: presence,
    worldLens
  };

  try {
    coreMemory.write(CORE_MEMORY_NAMESPACE, snap.tickId, snap);
  } catch {
    // fail-open
  }

  return snap;
}

function persistReturnSurface(label, impulse, snap) {
  const key = `return::${impulse.tickId}`;
  const payload = {
    label,
    tickId: impulse.tickId,
    jobId: impulse.pulse?.jobId || null,
    pattern: impulse.pulse?.pattern || "UNKNOWN_PATTERN",
    band: impulse.pulse?.meta?.band || "unknown",
    speedPolicy: impulse.meta.speedPolicy || null,
    presenceField: impulse.pulse?.meta?.presenceField || null,
    snapshotTickId: snap?.tickId || null,
    impulseSignature: snap?.impulseSignature || null
  };

  try {
    coreMemory.write(CORE_MEMORY_NAMESPACE, key, payload);
  } catch {
    // fail-open
  }

  return payload;
}

// ============================================================================
// LEGACY SURFACES (stubs – unchanged, still fallbacks)
// ============================================================================
export const ImpulseLegacy = {
  create(intent, payload = {}) { /* v9.3 as-is */ },
  computeUrgency(layerState) { /* as-is */ },
  factorImpulse(impulse) { /* as-is */ },
  annotate(impulse, layerIdentity, layerState, delta) { /* as-is */ },
  snapshot(impulse) { /* as-is */ },
  markPathwayStable(impulse, learnedRouteId) { /* as-is */ },
  returnToPulseBand(impulse) { /* as-is */ }
};

export const LegacyPulse = {
  create(intent, payload = {}) { /* v10 LegacyPulse */ }
  // ... other methods if you had them
};

// ============================================================================
// CORE v20-Immortal BINARY (base for all 20+ pulses)
// ============================================================================
function makeDeterministicTickId(seed = "") {
  const tick = nextTick();
  return `${tick}-${seed}`;
}

function createBinaryImpulseCore(intent, payload = {}, nowIgnored, patternOverride) {
  IMPULSE_CYCLE++;

  const pageIdentity = payload?.pageIdentity || {};
  const tickId       = makeDeterministicTickId(payload.jobId || "");
  const jobId        = payload.jobId || tickId;
  const pattern      = patternOverride || payload.pattern || intent || "UNKNOWN_PATTERN";
  const priority     = payload.priority || "normal";
  const returnTo     = payload.returnTo || null;
  const parentLineage = payload.parentLineage || null;

  const lineage        = buildLineage(parentLineage, pattern);
  const shapeSignature = computeShapeSignature(pattern, lineage);
  const evolutionStage = computeEvolutionStage(pattern, lineage);

  const presenceField = buildPresenceField(intent, pageIdentity.page);
  const band          = buildImpulseBand(0, 0);
  const bandSignature = buildImpulseBandSignature(band);
  const binaryField   = buildBinaryField(0);
  const waveField     = buildWaveField(pattern);
  const impulseCycleSignature = buildImpulseCycleSignature(IMPULSE_CYCLE);

  const impulse = {
    tickId,
    intent,
    payload,
    version: "v20-Immortal-binary",

    path: [],
    pathway: {
      hops: [],
      stable: false,
      learnedRouteId: null
    },

    energy: 1,
    factor: 1,
    urgency: 0,

    page: {
      name:        pageIdentity.page        || "UNKNOWN_PAGE",
      vars:        pageIdentity.vars        || {},
      repairHooks: pageIdentity.repairHooks || {}
    },

    repairSeed: {
      pageName: pageIdentity.page || "UNKNOWN_PAGE",
      focus:    payload?.repairFocus || null
    },

    identityHealth: pageIdentity.page ? "Stable" : "Missing",

    offline: true,
    externalDependencies: [],
    speedPolicy: null,

    pulse: {
      jobId,
      pattern,
      payload,
      priority,
      returnTo,
      lineage,
      meta: {
        shapeSignature,
        evolutionStage,
        band,
        bandSignature,
        impulseCycle: IMPULSE_CYCLE,
        impulseCycleSignature,
        binaryField,
        waveField,
        presenceField
      }
    },

    meta: { ...IMPULSE_CONTEXT }
  };

  persistImpulseSnapshot("create", impulse);
  return impulse;
}

function computeUrgencyBinary(layerState) {
  let u = 0;
  if (layerState?.health === "Weak")     u += 0.3;
  if (layerState?.health === "Critical") u += 0.6;
  if (layerState?.latency > 150)         u += 0.2;
  if (layerState?.stability < 50)        u += 0.3;
  return Math.min(1, u);
}

function annotateBinaryCore(impulse, layerIdentity, layerState, delta, nowIgnored) {
  impulse.urgency = computeUrgencyBinary(layerState);

  const hopIndex = impulse.path.length;
  const band     = buildImpulseBand(impulse.urgency, hopIndex + 1);
  const bandSignature = buildImpulseBandSignature(band);
  const binaryField   = buildBinaryField(hopIndex + 1);
  const waveField     = buildWaveField(impulse.pulse.pattern);
  const presenceField = buildPresenceField(impulse.intent, impulse.page.name);

  const hop = {
    ...layerIdentity,
    state: layerState,
    delta,
    urgency: impulse.urgency,
    timestamp: hopIndex + 1, // deterministic

    page:           impulse.page.name,
    repairSeed:     impulse.repairSeed,
    identityHealth: impulse.identityHealth,
    speedPolicy: null,

    band,
    bandSignature,
    binaryField,
    waveField,
    presenceField,

    offline: true,
    meta: { ...IMPULSE_CONTEXT }
  };

  impulse.path.push(hop);
  if (layerIdentity?.id) impulse.pathway.hops.push(layerIdentity.id);

  impulse.pulse.meta.band = band;
  impulse.pulse.meta.bandSignature = bandSignature;
  impulse.pulse.meta.binaryField = binaryField;
  impulse.pulse.meta.waveField = waveField;
  impulse.pulse.meta.presenceField = presenceField;

  persistImpulseSnapshot("annotate", impulse);
  return impulse;
}

// ============================================================================
// 20+ PULSE VARIANTS (upgraded from 16, same names, immortal core)
// ============================================================================
export const PulseShifterEvolutionaryPulse = {
  create(intent, payload = {}) {
    const impulse = createBinaryImpulseCore(
      intent,
      payload,
      null,
      "PulseShifterEvolutionaryPulse"
    );
    impulse.version = "v20-Immortal-PulseShifterEvolutionary";
    impulseLog("PULSE_SHIFTER_CREATE", {
      tickId: impulse.tickId,
      intent,
      pattern: impulse.pulse.pattern,
      band: impulse.pulse.meta.band
    });
    return impulse;
  },
  annotate(impulse, layerIdentity, layerState, delta) {
    const updated = annotateBinaryCore(impulse, layerIdentity, layerState, delta, null);
    impulseLog("PULSE_SHIFTER_ANNOTATE", {
      tickId: updated.tickId,
      layer: layerIdentity.id,
      band: updated.pulse.meta.band
    });
    return updated;
  }
};

export const PulseBinaryShifterEvolutionaryPulse = {
  create(intent, payload = {}) {
    const impulse = createBinaryImpulseCore(
      intent,
      payload,
      null,
      "PulseBinaryShifterEvolutionaryPulse"
    );
    impulse.version = "v20-Immortal-PulseBinaryShifterEvolutionary";
    impulse.offline = true;
    impulseLog("PULSE_BINARY_SHIFTER_CREATE", {
      tickId: impulse.tickId,
      intent,
      pattern: impulse.pulse.pattern,
      band: impulse.pulse.meta.band
    });
    return impulse;
  },
  annotate(impulse, layerIdentity, layerState, delta) {
    const updated = annotateBinaryCore(impulse, layerIdentity, layerState, delta, null);
    impulseLog("PULSE_BINARY_SHIFTER_ANNOTATE", {
      tickId: updated.tickId,
      layer: layerIdentity.id,
      band: updated.pulse.meta.band
    });
    return updated;
  }
};

// ============================================================================
// PRIMARY 20-Immortal IMPULSE (default Impulse) + SPEED / PRESSURE / STABILITY
// ============================================================================
export const ImpulseBinary = {
  create: (intent, payload = {}) =>
    createBinaryImpulseCore(intent, payload, null, null),
  computeUrgency: computeUrgencyBinary,
  annotate: (impulse, layerIdentity, layerState, delta) =>
    annotateBinaryCore(impulse, layerIdentity, layerState, delta, null)
};

export const Impulse = {
  create(intent, payload = {}) {
    const impulse = ImpulseBinary.create(intent, payload);
    impulse.version = "v20-Immortal";
    impulseLog("IMPULSE_CREATE", {
      tickId: impulse.tickId,
      intent,
      page: impulse.page.name,
      identityHealth: impulse.identityHealth,
      pulsePattern: impulse.pulse.pattern,
      pulseShape: impulse.pulse.meta.shapeSignature,
      band: impulse.pulse.meta.band,
      presenceField: impulse.pulse.meta.presenceField
    });
    return impulse;
  },

  computeUrgency(layerState) {
    return ImpulseBinary.computeUrgency(layerState);
  },

  factorImpulse(impulse, speedProfile = { mode: "auto" }) {
    const mode = speedProfile?.mode || "auto";

    let factorDecay = 0.5;
    if (mode === "quicken") factorDecay = 0.35;
    else if (mode === "extend") factorDecay = 0.65;

    impulse.factor *= factorDecay;
    impulse.energy *= impulse.factor;

    if (impulse.urgency > 0) {
      impulse.energy += impulse.urgency * 0.1;
    }

    const speedField = buildImpulseSpeedField({
      hops: impulse.path.length,
      urgency: impulse.urgency,
      factor: impulse.factor
    });

    const advantageField = buildImpulseAdvantageField({
      energy: impulse.energy,
      factor: impulse.factor,
      hops: impulse.path.length
    });

    const experienceField = buildImpulseExperienceField({
      hops: impulse.path.length,
      band: impulse.pulse.meta.band,
      speedBand: speedField.speedBand
    });

    const pressureField = buildImpulsePressureField({
      hops: impulse.path.length,
      urgency: impulse.urgency,
      load: experienceField.load
    });

    const stabilityField = buildImpulseStabilityField({
      advantageField,
      experienceField
    });

    const worldLensField = buildImpulseWorldLensField(impulse);

    const speedPolicy = computeSpeedPolicy({
      impulseSpeed: speedField,
      innerSpeed: impulse.meta.innerAgentSpeedField || null,
      outerSpeed: impulse.meta.outerAgentSpeedField || null,
      proxySpeed: impulse.meta.proxySpineSpeedField || null,
      advantage: advantageField,
      experience: experienceField,
      healing: impulse.meta.healingState || null,
      pressure: pressureField,
      stability: stabilityField
    });

    impulse.meta.speedField = speedField;
    impulse.meta.advantageField = advantageField;
    impulse.meta.experienceField = experienceField;
    impulse.meta.pressureField = pressureField;
    impulse.meta.stabilityField = stabilityField;
    impulse.meta.worldLensField = worldLensField;
    impulse.meta.speedPolicy = speedPolicy;

    persistImpulseSnapshot("factor", impulse);
    return impulse;
  },

  annotate(impulse, layerIdentity, layerState, delta) {
    const updated = ImpulseBinary.annotate(
      impulse,
      layerIdentity,
      layerState,
      delta
    );

    const speedField = buildImpulseSpeedField({
      hops: updated.path.length,
      urgency: updated.urgency,
      factor: updated.factor
    });
    const advantageField = buildImpulseAdvantageField({
      energy: updated.energy,
      factor: updated.factor,
      hops: updated.path.length
    });
    const experienceField = buildImpulseExperienceField({
      hops: updated.path.length,
      band: updated.pulse.meta.band,
      speedBand: speedField.speedBand
    });
    const pressureField = buildImpulsePressureField({
      hops: updated.path.length,
      urgency: updated.urgency,
      load: experienceField.load
    });
    const stabilityField = buildImpulseStabilityField({
      advantageField,
      experienceField
    });
    const worldLensField = buildImpulseWorldLensField(updated);

    const speedPolicy = computeSpeedPolicy({
      impulseSpeed: speedField,
      innerSpeed: updated.meta.innerAgentSpeedField || null,
      outerSpeed: updated.meta.outerAgentSpeedField || null,
      proxySpeed: updated.meta.proxySpineSpeedField || null,
      advantage: advantageField,
      experience: experienceField,
      healing: updated.meta.healingState || null,
      pressure: pressureField,
      stability: stabilityField
    });

    updated.meta.speedPolicy = speedPolicy;
    updated.meta.speedField = speedField;
    updated.meta.advantageField = advantageField;
    updated.meta.experienceField = experienceField;
    updated.meta.pressureField = pressureField;
    updated.meta.stabilityField = stabilityField;
    updated.meta.worldLensField = worldLensField;

    impulseLog("IMPULSE_ANNOTATE", {
      tickId: updated.tickId,
      layer: layerIdentity.id,
      page: updated.page.name,
      urgency: updated.urgency,
      hopIndex: updated.path.length - 1,
      totalHops: updated.path.length,
      band: updated.pulse.meta.band,
      presenceField: updated.pulse.meta.presenceField,
      speedField,
      advantageField,
      experienceField,
      pressureField,
      stabilityField
    });
    return updated;
  },

  snapshot(impulse) {
    const snap = persistImpulseSnapshot("snapshot", impulse);
    impulseLog("IMPULSE_SNAPSHOT", {
      tickId: snap.tickId,
      hops:   snap.hops,
      pulsePattern: snap.pulse.pattern,
      speedPolicy: impulse.meta.speedPolicy || null,
      band: snap.pulse.meta.band
    });
    return snap;
  },

  markPathwayStable(impulse, learnedRouteId) {
    impulse.pathway.stable = true;
    impulse.pathway.learnedRouteId = learnedRouteId || null;
    impulseLog("IMPULSE_PATHWAY_STABLE", {
      tickId: impulse.tickId,
      learnedRouteId,
      hops: impulse.pathway.hops.length,
      band: impulse.pulse.meta.band
    });
    persistImpulseSnapshot("pathway-stable", impulse);
    return impulse;
  },

  returnToPulseBand(impulse) {
    impulse.signature = "1001101010101010101";
    const snap = this.snapshot(impulse);
    impulseLog("IMPULSE_RETURN", {
      tickId: impulse.tickId,
      hops: impulse.path.length,
      page: impulse.page.name,
      identityHealth: impulse.identityHealth,
      pulsePattern: impulse.pulse.pattern,
      band: impulse.pulse.meta.band,
      presenceField: impulse.pulse.meta.presenceField
    });

    persistReturnSurface("return", impulse, snap);

    if (typeof window !== "undefined" && window.PulseBand?.receiveImpulseReturn) {
      window.PulseBand.receiveImpulseReturn(impulse, snap);
    }
    if (typeof window !== "undefined" && window.NerveMap?.ingestImpulse) {
      window.NerveMap.ingestImpulse(snap);
    }
    if (typeof window !== "undefined" && window.PathwayMemory?.recordImpulse) {
      window.PathwayMemory.recordImpulse(snap);
    }
  },

  // v20+ chunk/presence/speed/pressure/stability/world-lens surfaces
  chunks(impulse, { maxChunkSize = 64 } = {}) {
    return buildImpulseChunksFromImpulse(impulse, { maxChunkSize });
  },

  prewarmSnapshot(impulse, { maxChunkSize = 64 } = {}) {
    return buildImpulsePrewarmSnapshot(impulse, { maxChunkSize });
  },

  presenceView(impulse) {
    return buildImpulsePresenceView(impulse);
  },

  speedField(impulse) {
    return buildImpulseSpeedField({
      hops: impulse.path.length,
      urgency: impulse.urgency,
      factor: impulse.factor
    });
  },

  advantageField(impulse) {
    return buildImpulseAdvantageField({
      energy: impulse.energy,
      factor: impulse.factor,
      hops: impulse.path.length
    });
  },

  experienceField(impulse) {
    const speedField = this.speedField(impulse);
    return buildImpulseExperienceField({
      hops: impulse.path.length,
      band: impulse.pulse.meta.band,
      speedBand: speedField.speedBand
    });
  },

  pressureField(impulse) {
    const experienceField = this.experienceField(impulse);
    return buildImpulsePressureField({
      hops: impulse.path.length,
      urgency: impulse.urgency,
      load: experienceField.load
    });
  },

  stabilityField(impulse) {
    const advantageField = this.advantageField(impulse);
    const experienceField = this.experienceField(impulse);
    return buildImpulseStabilityField({
      advantageField,
      experienceField
    });
  },

  worldLensField(impulse) {
    return buildImpulseWorldLensField(impulse);
  },

  speedPolicy(impulse) {
    return impulse.meta.speedPolicy || null;
  }
};

export const IMPULSE_META = { ...IMPULSE_CONTEXT };

// ============================================================================
// DETERMINISTIC STRATEGY — ALL IMPULSE-LINEAGE PULSES IN CORRECT ORDER
// ============================================================================
export const ImpulseStrategy = {
  create({ intent, payload = {}, version = "auto" }) {

    if (version === "auto") {
      return Impulse.create(intent, payload);   // v20-Immortal (PRIMARY)
    }

    switch (version) {
      case "v20":
      case "immortal":
      case "full":
        return Impulse.create(intent, payload);

      case "v16":
        return Impulse.create(intent, { ...payload, versionHint: "v16" });

      case "PulseShifterEvolutionaryPulse":
      case "shifter":
        return PulseShifterEvolutionaryPulse.create(intent, payload);

      case "PulseBinaryShifterEvolutionaryPulse":
      case "binary-shifter":
        return PulseBinaryShifterEvolutionaryPulse.create(intent, payload);

      case "v15":
        return Impulse.create(intent, { ...payload, versionHint: "v15" });

      case "v12.3":
      case "presence":
        return Impulse.create(intent, { ...payload, versionHint: "v12.3" });

      case "legacy-pulse":
      case "v10":
        return LegacyPulse.create(intent, payload);

      case "v9.3":
      case "legacy":
        return ImpulseLegacy.create(intent, payload);

      default:
        return Impulse.create(intent, payload);
    }
  }
};

export const ImpulseSpeedPolicy = computeSpeedPolicy;
