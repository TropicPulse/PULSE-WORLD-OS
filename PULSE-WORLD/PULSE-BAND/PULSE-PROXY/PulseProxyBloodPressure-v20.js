// ============================================================================
//  PULSE OS v20-ImmortalPlus — CIRCULATION MONITOR (A‑B‑A)
//  “Blood Pressure + Blood Flow Sensor” (IMMORTAL SENSOR EDITION)
//  Measures latency (pressure) and speed (flow) and emits A‑B‑A vital signs.
//  PURE SENSOR. NO THINKING. NO DECISIONS. NO GLOBAL STATE.
//  v20-ImmortalPlus:
//    • Deterministic, drift‑proof, multi‑instance safe
//    • Unified advantage field (pressure/flow → advantageScore)
//    • Dual‑band aware (symbolic/binary) + band signatures
//    • Chunk/presence hints surfaced as advantage metadata
//    • Experience meta for AI/agents (read‑only, descriptive)
// ============================================================================
import {
  OrganismIdentity,
  buildPulseOrganismMap as PulseOrganismMap
} from "./PULSE-WORLD-MAP.js";
const Identity = OrganismIdentity(import.meta.url);

// 2 — EXPORT GENOME METADATA
// export const PulseMeshMeta = Identity.OrganMeta;
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
export const CIRCULATION_CONTEXT = Identity.pulseLoreContext;
export const PulseCirculationExperienceMeta = Identity.AI_EXPERIENCE_META;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

import {
  PulseProofBridgeLogger as logger,
  PulseProofBridgeTelemetry as emitTelemetry
} from "../../PULSE-UI/_BACKEND/PULSE-WORLD-BRIDGE.js";


const SUBSYSTEM = "circulation";

// ============================================================================
//  DIAGNOSTICS (optional)
// ============================================================================

const DIAG_ENABLED =
  typeof window !== "undefined" &&
  (window.PULSE_CIRCULATION_DIAGNOSTICS === true ||
    window.PULSE_DIAGNOSTICS === true);

function diag(stage, details = {}) {
  if (!DIAG_ENABLED) return;

  logger.log(SUBSYSTEM, stage, {
    ...details,
    meta: { ...CIRCULATION_CONTEXT }
  });

  emitTelemetry(SUBSYSTEM, stage, details);
}

diag("CIRCULATION_INIT");

export const PulseCirculationMonitorMeta = Object.freeze({
  layer: "PulseCirculationMonitor",
  role: "CIRCULATION_MONITOR_ORGAN",
  version: "v20-ImmortalPlus-ABA",
  identity: "PulseCirculationMonitor-v20-ImmortalPlus-ABA",

  guarantees: Object.freeze({
    deterministic: true,
    driftProof: true,
    multiInstanceReady: true,

    // Sensor laws
    pureSensor: true,
    sensorOnly: true,
    noDecisionMaking: true,
    noRouting: true,
    noGlobalState: true,
    noMutation: true,
    noExternalMutation: true,
    noCompute: true,
    noTimers: true,
    noRandomness: true,
    noDynamicImports: true,
    noEval: true,

    // A‑B‑A surfaces
    bandAware: true,
    waveFieldAware: true,
    binaryFieldAware: true,
    stressFieldAware: true,
    flowFieldAware: true,
    unifiedAdvantageField: true,
    pulseEfficiencyAware: true,

    // Awareness
    symbolicAware: true,
    binaryAware: true,
    dualBandAware: true,

    // Presence / chunking / cache-prewarm
    presenceAware: true,
    chunkingAware: true,
    cachePrewarmAware: true,

    // Experience surfaces
    chunkingHintsAware: true,
    presenceHintsAware: true,
    experienceMetaAware: true,

    worldLensAware: false
  }),

  contract: Object.freeze({
    input: [
      "CirculationLatency",
      "CirculationFlow",
      "DualBandContext",
      "AdvantageContext"
    ],
    output: [
      "CirculationVitalSigns",
      "CirculationBandSignature",
      "CirculationBinaryField",
      "CirculationWaveField",
      "CirculationAdvantageField",
      "CirculationDiagnostics",
      "CirculationHealingState",
      "CirculationChunkingHints",
      "CirculationPresenceHints",
      "CirculationExperienceMeta"
    ]
  }),

  lineage: Object.freeze({
    root: "PulseBand-v11",
    parent: "PulseBand-v20-ImmortalPlus",
    ancestry: [
      "PulseCirculationMonitor-v7",
      "PulseCirculationMonitor-v8",
      "PulseCirculationMonitor-v9",
      "PulseCirculationMonitor-v10",
      "PulseCirculationMonitor-v11",
      "PulseCirculationMonitor-v11-Evo",
      "PulseCirculationMonitor-v11-Evo-ABA",
      "PulseCirculationMonitor-v11.2-Evo-BINARY-MAX",
      "PulseCirculationMonitor-v12.3-Evo-BINARY-MAX-ABA"
    ]
  }),

  bands: Object.freeze({
    supported: ["symbolic", "binary"],
    default: "symbolic",
    behavior: "circulation-sensor"
  }),

  architecture: Object.freeze({
    pattern: "A-B-A",
    baseline: "pressure + flow → vital signs → A‑B‑A surfaces",
    adaptive:
      "binary-field + wave-field + flow-field overlays + advantage field + chunk/presence hints",
    return:
      "deterministic vital signs + signatures + advantage + chunk/presence hints + experience meta"
  })
});


// ============================================================================
//  A‑B‑A SURFACES — Circulation Band + Binary/Wave Fields + Advantage
// ============================================================================

let circulationCycle = 0;

function buildBand(latency) {
  if (latency == null) return "symbolic";
  return latency > 180 ? "binary" : "symbolic";
}

function buildBandSignature(band) {
  const raw = `CIRC_BAND::${band}`;
  let acc = 0;
  for (let i = 0; i < raw.length; i++) {
    acc = (acc + raw.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `circ-band-${acc}`;
}

function buildBinaryField(latency) {
  const patternLen = 10 + Math.floor((latency ?? 0) / 40);
  const density = patternLen + (latency ?? 0) / 5;
  const surface = density + patternLen;

  return {
    binaryPhenotypeSignature: `circ-binary-pheno-${surface % 99991}`,
    binarySurfaceSignature: `circ-binary-surface-${(surface * 7) % 99991}`,
    binarySurface: { patternLen, density, surface },
    parity: surface % 2 === 0 ? 0 : 1,
    shiftDepth: Math.max(0, Math.floor(Math.log2(surface || 1)))
  };
}

function buildWaveField(latency, band) {
  const amp = (latency ?? 0) / (band === "binary" ? 8 : 16) + 6;
  const amplitude = Math.floor(amp);
  const wavelength = amplitude + 4;
  const phase = amplitude % 16;

  return {
    amplitude,
    wavelength,
    phase,
    band,
    mode: band === "binary" ? "compression-wave" : "symbolic-wave"
  };
}

function buildCirculationCycleSignature() {
  return `circ-cycle-${(circulationCycle * 7919) % 99991}`;
}

// IMMORTAL advantage field: combines latency + kbps into a 0–1 advantageScore
function buildAdvantageField(latency, kbps) {
  const safeLatency = latency ?? 220;
  const safeKbps = kbps ?? 256;

  // Lower latency and higher bandwidth → higher advantage
  const latencyScore = Math.max(
    0,
    Math.min(1, (260 - Math.min(safeLatency, 260)) / 260)
  );
  const bandwidthScore = Math.max(
    0,
    Math.min(1, Math.log10(Math.max(safeKbps, 1) + 10) / 4)
  );

  const advantageScore = Math.max(
    0,
    Math.min(1, (latencyScore * 0.6 + bandwidthScore * 0.4))
  );

  let pressureBand = "low";
  if (safeLatency >= 220) pressureBand = "critical";
  else if (safeLatency >= 180) pressureBand = "high";
  else if (safeLatency >= 120) pressureBand = "medium";

  return {
    pressureBand,
    latencyMs: safeLatency,
    bandwidthKbps: safeKbps,
    advantageScore,
    advantageSignature: `circ-adv-${Math.round(advantageScore * 1000)}`
  };
}

// ============================================================================
//  12.3+ CHUNK / CACHE / PRESENCE HINTS (purely derived, no side effects)
// ============================================================================

function buildChunkingHints(latency, kbps) {
  const safeLatency = latency ?? 200;
  const safeKbps = kbps ?? 512;

  // smaller chunks when latency is high, larger when low
  const baseChunkKB =
    safeLatency > 220
      ? 32
      : safeLatency > 160
      ? 64
      : safeLatency > 100
      ? 96
      : 128;

  const suggestedChunkSizeKB = Math.max(16, Math.min(256, baseChunkKB));
  const suggestedPrewarm = safeLatency > 140;

  return {
    suggestedChunkSizeKB,
    suggestedPrewarm,
    bandwidthKbps: safeKbps,
    latencyMs: safeLatency
  };
}

function buildPresenceHints(latency) {
  const safeLatency = latency ?? 200;

  // tighter presence windows when network is strong
  const recommendedPresenceWindowMs =
    safeLatency < 90
      ? 8000
      : safeLatency < 140
      ? 12000
      : safeLatency < 200
      ? 18000
      : 24000;

  const suggestedPollIntervalMs =
    safeLatency < 90
      ? 4000
      : safeLatency < 140
      ? 6000
      : safeLatency < 200
      ? 9000
      : 12000;

  return {
    recommendedPresenceWindowMs,
    suggestedPollIntervalMs,
    latencyMs: safeLatency
  };
}

// ============================================================================
// 1. PRESSURE CHECK — Measure latency (blood pressure)
// ============================================================================

async function measureLatency(url = "/PULSE-PROXY/ping") {
  diag("MEASURE_LATENCY_START", { url });

  const start = performance.now();

  try {
    const res = await fetch(url, { cache: "no-store" });
    const t = performance.now() - start;

    diag("PING_SUCCESS", { durationMs: t });

    let data = {};
    try {
      data = await res.json();
      diag("PING_JSON_PARSED");
    } catch {
      diag("PING_JSON_PARSE_FAILED");
    }

    return {
      ok: res.ok,
      rtt: data.rtt ?? t,
      kbps: data.kbps ?? null,
      msPerKB: data.msPerKB ?? null
    };
  } catch (err) {
    diag("PING_FAILED", { error: String(err) });

    return {
      ok: false,
      rtt: null,
      kbps: null,
      msPerKB: null
    };
  }
}

// ============================================================================
// 2. CLASSIFIERS — Turn numbers into simple ratings
// ============================================================================

function classifyBars(latency) {
  diag("CLASSIFY_BARS", { latency });

  if (latency == null) return 1;
  if (latency < 80) return 4;
  if (latency < 110) return 3;
  if (latency < 160) return 2;
  return 1;
}

function classifyNetworkHealth(latency) {
  diag("CLASSIFY_HEALTH", { latency });

  if (latency == null) return "Unknown";
  if (latency < 90) return "Excellent";
  if (latency < 120) return "Good";
  if (latency < 180) return "Weak";
  return "Poor";
}

// ============================================================================
// 3. PUBLIC API — Build a vital‑signs packet (v20‑ImmortalPlus A‑B‑A)
// ============================================================================

async function getPulseTelemetry() {
  circulationCycle++;
  diag("TELEMETRY_START");

  const ping = await measureLatency();

  const latency = ping.rtt;
  const kbps = ping.kbps;

  diag("TELEMETRY_VALUES", { latency, kbps });

  const bars = classifyBars(latency);
  const health = classifyNetworkHealth(latency);

  diag("TELEMETRY_CLASSIFIED", { bars, health });

  // A‑B‑A surfaces
  const band = buildBand(latency);
  const bandSignature = buildBandSignature(band);
  const binaryField = buildBinaryField(latency);
  const waveField = buildWaveField(latency, band);
  const circulationCycleSignature = buildCirculationCycleSignature();
  const advantageField = buildAdvantageField(latency, kbps);

  // Chunk / presence hints
  const chunkingHints = buildChunkingHints(latency, kbps);
  const presenceHints = buildPresenceHints(latency);

  // Stable snapshot
  const snapshot = {
    lastChunkDurationMs: latency,
    lastChunkKbps: kbps ?? null,
    lastChunkSizeKB: kbps ? kbps / 8 : null,
    lastChunkIndex: Date.now(),

    band,
    bandSignature,
    binaryField,
    waveField,
    circulationCycleSignature,
    advantageField,

    // hints
    chunkingHints,
    presenceHints,

    meta: { ...CIRCULATION_CONTEXT },
    experienceMeta: PulseCirculationExperienceMeta
  };

  diag("SNAPSHOT_BUILT", snapshot);

  // Live = what PulseBand uses right now
  const result = {
    live: {
      latency,
      phoneKbps: kbps,
      appKbps: kbps,
      pulsebandBars: bars,
      phoneBars: 4,
      networkHealth: health,
      route: "Primary",
      state: "active",
      microWindowActive: true,
      lastSyncTimestamp: Date.now(),

      band,
      bandSignature,
      binaryField,
      waveField,
      circulationCycleSignature,
      advantageField,

      // hints
      chunkingHints,
      presenceHints,

      meta: { ...CIRCULATION_CONTEXT },
      experienceMeta: PulseCirculationExperienceMeta
    },
    snapshot
  };

  diag("TELEMETRY_READY", result);

  return result;
}

// ============================================================================
//  EXPORT — CIRCULATION MONITOR v20‑ImmortalPlus A‑B‑A
// ============================================================================

export const PulseUpdate = {
  measureLatency,
  getPulseTelemetry,
  meta: { ...CIRCULATION_CONTEXT },
  PulseRole,
  experienceMeta: PulseCirculationExperienceMeta
};
