// ============================================================================
//  PULSE OS v12.3‑EVO+ — CLINICIAN ORGAN
//  Diagnostic Interpreter • Triage Specialist • System Health Auditor
//  PURE OBSERVATION. ZERO MEDICAL ADVICE. ZERO MUTATION.
// ============================================================================
import { OrganismIdentity } from "../PULSE-X/PulseWorldOrganismMap-v21.js";

const Identity = OrganismIdentity(import.meta.url);

// or: const Identity = OrganismIdentity["pulse-ai/ai-v24.0-IMMORTAL"] if that's the key you chose

// ============================================================================
//  META BLOCK — v24.0 IMMORTAL (ORGANISM KERNEL)
//  (now backed by the Organism Map instead of hardcoded here)
// ============================================================================
export const ClinicianMeta = Identity.OrganMeta;

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
// HELPERS — PRESSURE + BUCKETS
// ============================================================================
function extractBinaryPressure(binaryVitals = {}) {
  if (binaryVitals?.layered?.organism?.pressure != null)
    return binaryVitals.layered.organism.pressure;
  if (binaryVitals?.binary?.pressure != null)
    return binaryVitals.binary.pressure;
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
//  CLINICIAN ORGAN IMPLEMENTATION (v12.3‑EVO+)
// ============================================================================
export function createClinicianOrgan(context = {}) {
  const diagnostics = context.diagnostics || {};
  const trace = Array.isArray(context.trace) ? [...context.trace] : [];

  function prewarm() {
    return true;
  }

  // --------------------------------------------------------------------------
  // SUMMARY BUILDER v3
  // --------------------------------------------------------------------------
  function buildSummary(binaryVitals = {}) {
    const binaryPressure = extractBinaryPressure(binaryVitals);

    const summary = {
      mismatches: diagnostics.mismatches?.length || 0,
      missingFields: diagnostics.missingFields?.length || 0,
      slowdown: diagnostics.slowdownCauses?.length || 0,
      drift: diagnostics.driftDetected === true
    };

    if (binaryPressure >= 0.7) {
      summary.simplified = true;
    }

    return Object.freeze(summary);
  }

  // --------------------------------------------------------------------------
  // SAFE CONTEXT BUILDER
  // --------------------------------------------------------------------------
  function buildSafeContext() {
    return Object.freeze({
      personaId: context.personaId,
      userIsOwner: context.userIsOwner === true,
      permissions: context.permissions || null,
      boundaries: context.boundaries || null
    });
  }

  // --------------------------------------------------------------------------
  // FLAG BUILDER
  // --------------------------------------------------------------------------
  function buildFlags() {
    return Object.freeze([
      ...(diagnostics.mismatches?.length ? [{ type: "mismatch" }] : []),
      ...(diagnostics.missingFields?.length ? [{ type: "missing" }] : []),
      ...(diagnostics.slowdownCauses?.length ? [{ type: "slowdown" }] : []),
      ...(diagnostics.driftDetected ? [{ type: "drift" }] : [])
    ]);
  }

  // --------------------------------------------------------------------------
  // PACKET EMITTER v3
  // --------------------------------------------------------------------------
  function buildPacket(binaryVitals = {}) {
    const payload = {
      type: "clinician-snapshot",
      timestamp: Date.now(),
      summary: buildSummary(binaryVitals),
      flags: buildFlags()
    };

    const json = JSON.stringify(payload);

    const bits = context.encoder?.encode
      ? context.encoder.encode(json)
      : null;

    return Object.freeze({
      ...payload,
      bits,
      bitLength: bits ? bits.length : 0
    });
  }

  // --------------------------------------------------------------------------
  // CLINICIAN ARTERY v3 — symbolic-only, deterministic
  // --------------------------------------------------------------------------
  function clinicianArtery({ binaryVitals = {} } = {}) {
    const binaryPressure = extractBinaryPressure(binaryVitals);

    const mismatchCount = diagnostics.mismatches?.length || 0;
    const missingCount = diagnostics.missingFields?.length || 0;
    const slowdownCount = diagnostics.slowdownCauses?.length || 0;
    const drift = diagnostics.driftDetected === true;

    const localPressure =
      (mismatchCount ? 0.3 : 0) +
      (missingCount ? 0.2 : 0) +
      (slowdownCount ? 0.3 : 0) +
      (drift ? 0.4 : 0);

    const pressure = Math.max(
      0,
      Math.min(1, 0.6 * localPressure + 0.4 * binaryPressure)
    );

    return {
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
    };
  }

  // --------------------------------------------------------------------------
  // PUBLIC CLINICIAN API (v12.3‑EVO+)
  // --------------------------------------------------------------------------
  return Object.freeze({
    meta: ClinicianMeta,
    prewarm,

    log(message) {
      context?.logStep?.(`aiClinician: ${message}`);
    },

    buildModel(binaryVitals = {}) {
      return Object.freeze({
        summary: buildSummary(binaryVitals),
        safeContext: buildSafeContext(),
        trace,
        flags: buildFlags(),
        meta: ClinicianMeta
      });
    },

    emitPacket(binaryVitals = {}) {
      return buildPacket(binaryVitals);
    },

    clinicianArtery
  });
}


export default createClinicianOrgan;

if (typeof module !== "undefined") {
  module.exports = {
    ClinicianMeta,
    createClinicianOrgan,
    default: createClinicianOrgan
  };
}
