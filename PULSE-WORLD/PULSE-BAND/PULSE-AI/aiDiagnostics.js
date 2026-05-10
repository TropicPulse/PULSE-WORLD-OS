// ============================================================================
//  PULSE OS v12.3‑Presence — DIAGNOSTICS ORGAN
//  Diagnostics Organ • Drift Tracker • Mismatch Ledger • Slowdown Sensor
//  PURE OBSERVATION. ZERO RANDOMNESS. ZERO MUTATION.
// ============================================================================

import { OrganismIdentity } from "../PULSE-X/PulseWorldOrganismMap-v21.js";

const Identity = OrganismIdentity(import.meta.url);

// or: const Identity = OrganismIdentity["pulse-ai/ai-v24.0-IMMORTAL"] if that's the key you chose

// ============================================================================
//  META BLOCK — v24.0 IMMORTAL (ORGANISM KERNEL)
//  (now backed by the Organism Map instead of hardcoded here)
// ============================================================================
export const DiagnosticsMeta = Identity.OrganMeta;

// ============================================================================
//  SURFACE / ORGANISM LAYER EXPORTS — v24.0 IMMORTAL
//  (for Understanding / CNS / Portal alignment)
// ============================================================================

// Required 3 for every “surface” in the organism graph
export const pulseRole = Identity.pulseRole;

export const surfaceMeta = Identity.surfaceMeta;

export const pulseLoreContext = Identity.pulseLoreContext;

// Optional: richer experience meta for AI / tooling
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;

// Optional: export meta for tooling / dev panels
export const EXPORT_META = Identity.EXPORT_META;

// ============================================================================
//  PACKET EMITTER — deterministic, diagnostics-scoped
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
    ...payload
  });
}

// ============================================================================
//  DIAGNOSTICS PREWARM ENGINE — v12.3‑Presence
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
    console.error("[Diagnostics Prewarm] Failed:", err);
    return emitDiagnosticsPacket("prewarm-error", {
      error: String(err),
      message: "Diagnostics organ prewarm failed."
    });
  }
}

// ============================================================================
//  FACTORY — Create Diagnostics State
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
//  ATTACH HELPERS — Bind Diagnostics to a Context
// ============================================================================
export function attachDiagnosticsOrgan(context) {
  if (!context) return context;

  const diagnostics = createDiagnosticsState();
  context.diagnostics = diagnostics;

  context.flagMismatch = (key, expected, actual) => {
    diagnostics.mismatches.push({ key, expected, actual });
    context.trace?.push?.(
      `Mismatch: ${key} expected ${expected}, got ${actual}`
    );
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
//  STANDALONE DIAGNOSTICS API — No Context Mutation
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
//  BOOT PREWARM + DUAL‑MODE EXPORTS
// ============================================================================
prewarmDiagnosticsOrgan();

if (typeof module !== "undefined") {
  module.exports = {
    DiagnosticsMeta,
    createDiagnosticsState,
    attachDiagnosticsOrgan,
    createDiagnosticsAPI,
    prewarmDiagnosticsOrgan
  };
}
