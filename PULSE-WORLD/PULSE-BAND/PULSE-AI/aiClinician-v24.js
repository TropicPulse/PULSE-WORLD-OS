// ============================================================================
//  PULSE OS v27‑IMMORTAL++ — CLINICIAN ORGAN
//  Diagnostic Interpreter • Triage Specialist • System Health Auditor
//  PURE OBSERVATION. ZERO MEDICAL ADVICE. ZERO MUTATION.
//  v27: CoreMemory‑ready, Touch‑aligned, map‑free.
// ============================================================================


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
//  v27 CORE MEMORY ARTIFACT HELPERS (protocol‑only, zero DB)
//  Shapes are compatible with PulseOSMemory.buildSnapshot / buildDriftSignature
// ============================================================================
function buildMemorySnapshot({ subsystem = "Clinician", diagnostics, binaryVitals }) {
  const touch = (typeof window !== "undefined" && window.__PULSE_TOUCH__) || {};

  return {
    meta: {
      id: "pulse-touch-clinician",
      version: touch.version || "v0",
      epoch: touch.epoch || Date.now(),
      layer: "clinician",
      role: "diagnostic-interpreter"
    },
    kind: "snapshot",
    subsystem,
    payload: {
      diagnostics,
      binaryVitals
    }
  };
}

function buildMemoryDriftSignature({ subsystem = "Clinician", diagnostics, binaryVitals }) {
  const touch = (typeof window !== "undefined" && window.__PULSE_TOUCH__) || {};

  const pressure = extractBinaryPressure(binaryVitals);
  const drift =
    diagnostics?.driftDetected === true ||
    pressure >= 0.9 ||
    (diagnostics?.mismatches?.length || 0) > 0;

  return {
    meta: {
      id: "pulse-touch-clinician",
      version: touch.version || "v0",
      epoch: touch.epoch || Date.now(),
      layer: "clinician",
      role: "diagnostic-interpreter"
    },
    kind: "driftSignature",
    subsystem,
    type: drift ? "clinician_drift_detected" : "clinician_stable",
    severity: drift ? (pressure >= 0.9 ? "critical" : "warning") : "info",
    details: {
      mismatches: diagnostics?.mismatches?.length || 0,
      missingFields: diagnostics?.missingFields?.length || 0,
      slowdown: diagnostics?.slowdownCauses?.length || 0,
      driftFlag: diagnostics?.driftDetected === true,
      pressure
    },
    relatedSnapshotId: null
  };
}

// ============================================================================
//  CLINICIAN ORGAN IMPLEMENTATION (v27‑IMMORTAL++, CoreMemory‑ready)
// ============================================================================
export function createClinicianOrgan(context = {}) {
  const diagnostics = context.diagnostics || {};
  const trace = Array.isArray(context.trace) ? [...context.trace] : [];

  const subsystemName = context.subsystemName || "Clinician";
  const routeId = context.routeId || "clinician";

  const touch = (typeof window !== "undefined" && window.__PULSE_TOUCH__) || {};

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
      boundaries: context.boundaries || null,
      routeId,
      subsystem: subsystemName
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
  // PACKET EMITTER v3 — also emits CoreMemory‑ready artifacts
  // --------------------------------------------------------------------------
  function buildPacket(binaryVitals = {}) {
    const summary = buildSummary(binaryVitals);
    const flags = buildFlags();

    const payload = {
      type: "clinician-snapshot",
      timestamp: Date.now(),
      summary,
      flags
    };

    const json = JSON.stringify(payload);

    const bits = context.encoder?.encode
      ? context.encoder.encode(json)
      : null;

    const memoryArtifacts = {
      snapshot: buildMemorySnapshot({
        subsystem: subsystemName,
        diagnostics,
        binaryVitals
      }),
      driftSignature: buildMemoryDriftSignature({
        subsystem: subsystemName,
        diagnostics,
        binaryVitals
      })
    };

    return Object.freeze({
      ...payload,
      bits,
      bitLength: bits ? bits.length : 0,
      memoryArtifacts
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
      },
      memoryArtifacts: {
        snapshot: buildMemorySnapshot({
          subsystem: subsystemName,
          diagnostics,
          binaryVitals
        }),
        driftSignature: buildMemoryDriftSignature({
          subsystem: subsystemName,
          diagnostics,
          binaryVitals
        })
      }
    };
  }

  // --------------------------------------------------------------------------
  // PUBLIC CLINICIAN API (v27‑IMMORTAL++, CoreMemory‑ready)
  // --------------------------------------------------------------------------
  const clinicianMeta = {
    id: "pulse-touch-clinician",
    version: touch.version || "v0",
    epoch: touch.epoch || Date.now(),
    layer: "clinician",
    role: "diagnostic-interpreter"
  };

  return Object.freeze({
    meta: clinicianMeta,
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
        meta: clinicianMeta,
        memoryArtifacts: {
          snapshot: buildMemorySnapshot({
            subsystem: subsystemName,
            diagnostics,
            binaryVitals
          }),
          driftSignature: buildMemoryDriftSignature({
            subsystem: subsystemName,
            diagnostics,
            binaryVitals
          })
        }
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
    createClinicianOrgan,
    default: createClinicianOrgan
  };
}
