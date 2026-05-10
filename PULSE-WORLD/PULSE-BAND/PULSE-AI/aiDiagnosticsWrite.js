// ============================================================================
//  PULSE OS v12.3‑Presence — DIAGNOSTICS WRITE ORGAN
//  Safe Logger • Identity‑Stripped • Deterministic Write Surface
//  PURE LOGGING. ZERO IDENTITY. ZERO MUTATION.
// ============================================================================

/*
AI_EXPERIENCE_META = {
  identity: "aiDiagnosticsWrite",
  version: "v14-Immortal",
  layer: "ai_tools",
  role: "diagnostics_write_engine",
  lineage: "aiDiagnosticsWrite-v10 → v12 → v14-Immortal",

  evo: {
    diagnosticsWrite: true,
    symbolicPrimary: true,
    binaryAware: true,
    dualBand: true,
    deterministic: true,
    driftProof: true,
    pureCompute: true,
    zeroNetwork: true,
    zeroFilesystem: true,
    zeroMutationOfInput: true
  },

  contract: {
    always: ["aiDiagnostics", "aiDebug", "aiBrainstem"],
    never: ["safeRoute", "fetchViaCNS"]
  }
}
*/
import { OrganismIdentity } from "../PULSE-X/PulseWorldOrganismMap-v21.js";

const Identity = OrganismIdentity(import.meta.url);

// or: const Identity = OrganismIdentity["pulse-ai/ai-v24.0-IMMORTAL"] if that's the key you chose

// ============================================================================
//  META BLOCK — v24.0 IMMORTAL (ORGANISM KERNEL)
//  (now backed by the Organism Map instead of hardcoded here)
// ============================================================================
export const DiagnosticsWriteMeta = Identity.OrganMeta;

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
    ...payload
  });
}

// ============================================================================
//  DIAGNOSTICS WRITE PREWARM ENGINE — v12.3‑Presence
// ============================================================================
export function prewarmDiagnosticsWriteOrgan() {
  try {
    const warmBackend = {
      async write(path, payload) {
        return true;
      }
    };

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
//  PUBLIC API — Create Diagnostics Write Organ (v12.3‑Presence)
// ============================================================================
export function createDiagnosticsWriteOrgan({ context, backend }) {

  // --------------------------------------------------------------------------
  // IDENTITY STRIPPER — deterministic, presence-safe
  // --------------------------------------------------------------------------
  function stripIdentity(obj) {
    if (!obj || typeof obj !== "object") return obj;

    const clone = { ...obj };

    delete clone.userId;
    delete clone.uid;
    delete clone.resendToken;
    delete clone.identityRoot;
    delete clone.sessionRoot;
    delete clone.deviceFingerprint;

    return clone;
  }

  // --------------------------------------------------------------------------
  // WRITE LOG ENTRY — deterministic, identity-safe
  // --------------------------------------------------------------------------
  async function writeRun({ result }) {
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

      return emitDiagnosticsWritePacket("write", {
        ok: true,
        id: docId,
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
  // PUBLIC ORGAN SURFACE
  // --------------------------------------------------------------------------
  return Object.freeze({
    meta: DiagnosticsWriteMeta,

    log(message) {
      context?.logStep?.(`aiDiagnosticsWrite: ${message}`);
    },

    writeRun
  });
}

// ============================================================================
//  DUAL‑MODE EXPORTS (ESM + CommonJS)
// ============================================================================
if (typeof module !== "undefined") {
  module.exports = {
    DiagnosticsWriteMeta,
    createDiagnosticsWriteOrgan,
    prewarmDiagnosticsWriteOrgan
  };
}
