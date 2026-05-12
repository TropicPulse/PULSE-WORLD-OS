// ============================================================================
//  PULSE OS v24++‑IMMORTAL‑ADVANTAGE — DIAGNOSTICS WRITE ORGAN
//  Safe Logger • Identity‑Stripped • Deterministic Write Surface
//  PURE LOGGING. ZERO IDENTITY. ZERO MUTATION. OWNER‑SUBORDINATE.
// ============================================================================

import {
  OrganismIdentity,
  buildPulseOrganismMap as PulseOrganismMap,
  buildPulseOrganismMap as buildOrganismMap
} from "../PULSE-X/PULSE-WORLD-MAP.js";

const Identity = OrganismIdentity(import.meta.url);

// ============================================================================
//  META BLOCK — v24++ IMMORTAL (ORGANISM KERNEL)
// ============================================================================
export const DiagnosticsWriteMeta = Identity.OrganMeta;

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
//  PACKET EMITTER — deterministic, diagnostics-write scoped
// ============================================================================
function emitDiagnosticsWritePacket(type, payload = {}) {
  return Object.freeze({
    meta: DiagnosticsWriteMeta,
    packetType: `diagnostics-write-${type}`,
    timestamp: Date.now(),
    epoch: DiagnosticsWriteMeta.evo.epoch,
    layer: DiagnosticsWriteMeta.layer,
    role: DiagnosticsWriteMeta.role,
    identity: DiagnosticsWriteMeta.identity,
    owner: "Aldwyn",
    subordinate: true,
    ...payload
  });
}

// ============================================================================
//  PREWARM ENGINE — v24++ IMMORTAL‑ADVANTAGE
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
//  IDENTITY STRIPPER v24++ — hardened, drift‑proof
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

  // v24++ additions
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
//  DIAGNOSTICS WRITE ORGAN — v24++ IMMORTAL‑ADVANTAGE
// ============================================================================
export function createDiagnosticsWriteOrgan({ context, backend }) {

  // --------------------------------------------------------------------------
  // WRITE LOG ENTRY — deterministic, identity‑safe, packetized
  // --------------------------------------------------------------------------
  async function writeRun({ result, binaryVitals = {} }) {
    try {
      const timestamp = Date.now();
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
  // PUBLIC ORGAN SURFACE — v24++ IMMORTAL‑ADVANTAGE
  // --------------------------------------------------------------------------
  return Object.freeze({
    meta: DiagnosticsWriteMeta,

    log(message) {
      context?.logStep?.(`aiDiagnosticsWrite: ${message}`);
    },

    writeRun,
    diagnosticsWriteArtery
  });
}

// ============================================================================
//  DUAL‑MODE EXPORTS
// ============================================================================
if (typeof module !== "undefined") {
  module.exports = {
    DiagnosticsWriteMeta,
    createDiagnosticsWriteOrgan,
    prewarmDiagnosticsWriteOrgan
  };
}
