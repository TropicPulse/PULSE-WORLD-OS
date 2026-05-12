// ============================================================================
//  PULSE OS v24++‑IMMORTAL‑ADVANTAGE — DIAGNOSTICS ORGAN
//  Drift Tracker • Mismatch Ledger • Slowdown Sensor • Dualband Pressure Aware
//  PURE OBSERVATION. ZERO RANDOMNESS. ZERO MUTATION. OWNER‑SUBORDINATE.
// ============================================================================

import { OrganismIdentity } from "../PULSE-X/PULSE-WORLD-MAP.js
";

const Identity = OrganismIdentity(import.meta.url);

// ============================================================================
//  META BLOCK — v24++ IMMORTAL (ORGANISM KERNEL)
// ============================================================================
export const DiagnosticsMeta = Identity.OrganMeta;

// ============================================================================
//  SURFACE / ORGANISM LAYER EXPORTS — v24++ IMMORTAL
// ============================================================================
export const pulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

// ============================================================================
//  PRESSURE HELPERS — dualband‑aware
// ============================================================================
function extractBinaryPressure(binaryVitals = {}) {
  if (binaryVitals?.layered?.organism?.pressure != null)
    return binaryVitals.layered.organism.pressure;
  if (binaryVitals?.binary?.pressure != null)
    return binaryVitals.binary.pressure;
  if (typeof binaryVitals.pressure === "number")
    return binaryVitals.pressure;
  return 0;
}

function bucketPressure(v) {
  if (v >= 0.9) return "overload";
  if (v >= 0.7) return "high";
  if (v >= 0.4) return "medium";
  if (v > 0) return "low";
  return "none";
}

// ============================================================================
//  PACKET EMITTER — deterministic, diagnostics‑scoped
// ============================================================================
function emitDiagnosticsPacket(type, payload = {}) {
  return Object.freeze({
    meta: DiagnosticsMeta,
    packetType: `diagnostics-${type}`,
    timestamp: Date.now(),
    epoch: DiagnosticsMeta.evo.epoch,
    layer: DiagnosticsMeta.layer,
    role: DiagnosticsMeta.role,
    identity: DiagnosticsMeta.identity,
    owner: "Aldwyn",
    subordinate: true,
    ...payload
  });
}

// ============================================================================
//  PREWARM ENGINE — v24++ IMMORTAL‑ADVANTAGE
// ============================================================================
export function prewarmDiagnosticsOrgan() {
  try {
    const warmState = createDiagnosticsState();

    const api = createDiagnosticsAPI();
    api.flagMismatch("prewarm", "expected", "actual");
    api.flagMissingField("missingField");
    api.flagSlowdown("prewarm");
    api.flagDrift("prewarm drift");

    const warmContext = { trace: [] };
    attachDiagnosticsOrgan(warmContext);

    warmContext.flagMismatch("key", "expected", "actual");
    warmContext.flagMissingField("missing");
    warmContext.flagSlowdown("prewarm");
    warmContext.flagDrift("prewarm drift");

    return emitDiagnosticsPacket("prewarm", {
      message: "Diagnostics organ prewarmed and observation pathways aligned.",
      warmStateTimestamp: warmState.timestamp
    });
  } catch (err) {
    return emitDiagnosticsPacket("prewarm-error", {
      error: String(err),
      message: "Diagnostics organ prewarm failed."
    });
  }
}

// ============================================================================
//  FACTORY — Create Diagnostics State (v24++)
// ============================================================================
export function createDiagnosticsState() {
  return {
    mismatches: [],
    missingFields: [],
    slowdownCauses: [],
    driftEvents: [],
    driftDetected: false,
    timestamp: Date.now()
  };
}

// ============================================================================
//  ATTACH HELPERS — Bind Diagnostics to a Context (v24++)
// ============================================================================
export function attachDiagnosticsOrgan(context) {
  if (!context) return context;

  const diagnostics = createDiagnosticsState();
  context.diagnostics = diagnostics;

  context.flagMismatch = (key, expected, actual) => {
    diagnostics.mismatches.push({ key, expected, actual });
    context.trace?.push?.(`Mismatch: ${key} expected ${expected}, got ${actual}`);
  };

  context.flagMissingField = (key) => {
    diagnostics.missingFields.push({ key });
    context.trace?.push?.(`Missing field: ${key}`);
  };

  context.flagSlowdown = (reason) => {
    diagnostics.slowdownCauses.push({ reason });
    context.trace?.push?.(`Slowdown cause: ${reason}`);
  };

  context.flagDrift = (description) => {
    diagnostics.driftDetected = true;
    diagnostics.driftEvents.push({ description });
    context.trace?.push?.(`Drift detected: ${description}`);
  };

  return context;
}

// ============================================================================
//  STANDALONE DIAGNOSTICS API — No Context Mutation (v24++)
// ============================================================================
export function createDiagnosticsAPI() {
  const diagnostics = createDiagnosticsState();

  function flagMismatch(key, expected, actual) {
    diagnostics.mismatches.push({ key, expected, actual });
  }

  function flagMissingField(key) {
    diagnostics.missingFields.push({ key });
  }

  function flagSlowdown(reason) {
    diagnostics.slowdownCauses.push({ reason });
  }

  function flagDrift(description) {
    diagnostics.driftDetected = true;
    diagnostics.driftEvents.push({ description });
  }

  return Object.freeze({
    meta: DiagnosticsMeta,
    diagnostics,
    flagMismatch,
    flagMissingField,
    flagSlowdown,
    flagDrift
  });
}

// ============================================================================
//  DIAGNOSTICS ARTERY — symbolic‑only, deterministic (v24++)
// ============================================================================
export function diagnosticsArtery(diagnostics, binaryVitals = {}) {
  const binaryPressure = extractBinaryPressure(binaryVitals);

  const mismatchCount = diagnostics.mismatches.length;
  const missingCount = diagnostics.missingFields.length;
  const slowdownCount = diagnostics.slowdownCauses.length;
  const drift = diagnostics.driftDetected;

  const localPressure =
    (mismatchCount ? 0.25 : 0) +
    (missingCount ? 0.2 : 0) +
    (slowdownCount ? 0.25 : 0) +
    (drift ? 0.4 : 0);

  const pressure = Math.max(
    0,
    Math.min(1, 0.6 * localPressure + 0.4 * binaryPressure)
  );

  return emitDiagnosticsPacket("artery", {
    organism: {
      pressure,
      pressureBucket: bucketPressure(pressure)
    },
    diagnostics: {
      mismatches: mismatchCount,
      missingFields: missingCount,
      slowdown: slowdownCount,
      drift
    }
  });
}

// ============================================================================
//  BOOT PREWARM + DUAL‑MODE EXPORTS
// ============================================================================
prewarmDiagnosticsOrgan();

if (typeof module !== "undefined") {
  module.exports = {
    DiagnosticsMeta,
    createDiagnosticsState,
    attachDiagnosticsOrgan,
    createDiagnosticsAPI,
    diagnosticsArtery,
    prewarmDiagnosticsOrgan
  };
}
