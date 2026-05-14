// ============================================================================
//  PULSE OS v30‑IMMORTAL++ — DIAGNOSTICS WRITE ORGAN
//  Safe Logger • Identity‑Stripped • Deterministic Write Surface
//  PURE LOGGING. ZERO IDENTITY. ZERO MUTATION. ZERO WALL‑CLOCK.
// ============================================================================


// ============================================================================
//  PRESSURE HELPERS — dualband‑aware (v30)
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
//  PACKET EMITTER — deterministic, diagnostics-write scoped (v30 IMMORTAL++)
// ============================================================================
function emitDiagnosticsWritePacket(type, payload = {}) {
  return Object.freeze({
    packetType: `diagnostics-write-${type}`,
    timestamp: 0,              // IMMORTAL++: no wall‑clock
    layer: "diagnostics-write-organ",
    role: "diagnostics-write",
    band: "binary",
    ...payload
  });
}


// ============================================================================
//  PREWARM ENGINE — v30 IMMORTAL++
// ============================================================================
export function prewarmDiagnosticsWriteOrgan() {
  try {
    const warmBackend = { async write() { return true; } };

    const warmContext = {
      personaId: "prewarm",
      userIsOwner: false,
      diagnostics: { test: "value" },
      trace: ["prewarm"],
      routing: { route: "prewarm" },
      scribeReport: { scribe: "prewarm" },
      clinicianReport: { clinician: "prewarm" }
    };

    const warmOrgan = createDiagnosticsWriteOrgan({
      context: warmContext,
      backend: warmBackend
    });

    warmOrgan.writeRun({
      result: {
        userId: "123",
        uid: "abc",
        resendToken: "xyz",
        identityRoot: "root",
        sessionRoot: "session",
        deviceFingerprint: "fp",
        data: "prewarm"
      }
    });

    warmOrgan.log("prewarm");

    return emitDiagnosticsWritePacket("prewarm", {
      message: "Diagnostics Write organ prewarmed and logging pathways aligned."
    });
  } catch (err) {
    return emitDiagnosticsWritePacket("prewarm-error", {
      error: String(err),
      message: "Diagnostics Write organ prewarm failed."
    });
  }
}


// ============================================================================
//  IDENTITY STRIPPER — hardened, drift‑proof (v30 IMMORTAL++)
// ============================================================================
function stripIdentity(obj) {
  if (!obj || typeof obj !== "object") return obj;

  const clone = { ...obj };

  delete clone.userId;
  delete clone.uid;
  delete clone.resendToken;
  delete clone.identityRoot;
  delete clone.sessionRoot;
  delete clone.deviceFingerprint;

  // v24++ additions retained
  delete clone.email;
  delete clone.phone;
  delete clone.ip;
  delete clone.session;
  delete clone.token;
  delete clone.auth;
  delete clone.browserFingerprint;

  return clone;
}


// ============================================================================
//  DIAGNOSTICS WRITE ORGAN — v30 IMMORTAL++
// ============================================================================
export function createDiagnosticsWriteOrgan({ context, backend }) {

  // --------------------------------------------------------------------------
  // WRITE LOG ENTRY — deterministic, identity‑safe, packetized
  // --------------------------------------------------------------------------
  async function writeRun({ result, binaryVitals = {} }) {
    try {
      const timestamp = 0; // IMMORTAL++: no Date.now
      const docId = `${context.personaId || "unknown"}-${timestamp}`;

      const safePayload = {
        personaId: context.personaId,
        userIsOwner: context.userIsOwner || false,
        timestamp,

        result: stripIdentity(result),
        diagnostics: stripIdentity(context.diagnostics),
        trace: Array.isArray(context.trace) ? [...context.trace] : [],
        routing: stripIdentity(context.routing),

        scribeReport: stripIdentity(context.scribeReport),
        clinicianReport: stripIdentity(context.clinicianReport)
      };

      await backend.write(`AI_LOGS/${docId}`, safePayload);

      const pressure = extractBinaryPressure(binaryVitals);

      return emitDiagnosticsWritePacket("write", {
        ok: true,
        id: docId,
        pressure,
        pressureBucket: bucketPressure(pressure),
        message: "Diagnostics written safely (identity stripped)."
      });
    } catch (err) {
      return emitDiagnosticsWritePacket("write-error", {
        ok: false,
        error: String(err),
        message: "Diagnostics write failed."
      });
    }
  }

  // --------------------------------------------------------------------------
  //  DIAGNOSTICS WRITE ARTERY — symbolic-only, deterministic
  // --------------------------------------------------------------------------
  function diagnosticsWriteArtery({ binaryVitals = {} } = {}) {
    const pressure = extractBinaryPressure(binaryVitals);

    return emitDiagnosticsWritePacket("artery", {
      organism: {
        pressure,
        pressureBucket: bucketPressure(pressure)
      }
    });
  }

  // --------------------------------------------------------------------------
  // PUBLIC ORGAN SURFACE — v30 IMMORTAL++
  // --------------------------------------------------------------------------
  return Object.freeze({
    log(message) {
      context?.logStep?.(`aiDiagnosticsWrite: ${message}`);
    },

    writeRun,
    diagnosticsWriteArtery
  });
}


// ============================================================================
//  DUAL‑MODE EXPORTS — v30 IMMORTAL++
// ============================================================================
if (typeof module !== "undefined") {
  module.exports = {
    createDiagnosticsWriteOrgan,
    prewarmDiagnosticsWriteOrgan
  };
}
