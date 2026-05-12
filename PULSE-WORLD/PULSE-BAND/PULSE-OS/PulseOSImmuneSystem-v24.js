// ============================================================================
//  GLOBAL HEALER — PULSE OS v24-IMMORTAL-Presence-MESH++
//  C-LAYER (TOP-LEVEL IMMUNE SYSTEM)
//  Deterministic, Drift-Aware, OS-Level Healing Coordinator (v24++)
//  PURE HEALING. NO AI. NO COMPUTE. NO MARKETPLACE. NO TIMERS.
// ============================================================================
//
//  THIS ORGAN HAS ZERO RUNTIME SIDE EFFECTS.
//  All dependencies are external workers (DB, time, network, schedulers).
//  This organ ONLY builds immune artifacts from mesh + presence drift events.
//  IMMORTAL: no Date.now, no randomness, no timers, no network, no DOM.
// ============================================================================

import {
  OrganismIdentity,
  buildPulseOrganismMap as buildOrganismMap
} from "../PULSE-X/PULSE-WORLD-MAP.js
";

const Identity = OrganismIdentity(import.meta.url);

// 2 — EXPORT GENOME METADATA (v24++)
export const GLOBAL_HEALER_CONTEXT_V24 = Identity.OrganMeta;
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

// ============================================================================
// PURE BUILDERS — NO TIME, NO DB, NO SIDE EFFECTS
// ============================================================================

function buildGlobalHealerLog(base) {
  return {
    ...GLOBAL_HEALER_CONTEXT_V24,
    kind: "GlobalHealerLog",
    ...base
    // Worker attaches timestamp, ids, storage, routing, etc.
  };
}

function buildDriftSignature(subsystem, base) {
  return {
    ...GLOBAL_HEALER_CONTEXT_V24,
    kind: "DriftSignature",
    subsystem,
    type: base.type || "unknown",
    severity: base.severity || "info",
    details: base.details || null
    // Worker attaches timestamp, ids, etc.
  };
}

function buildFunctionLogHint(base) {
  return {
    ...GLOBAL_HEALER_CONTEXT_V24,
    kind: "FunctionLogHint",
    processed: false,
    subsystem: base.subsystem || "unknown",
    severity: base.severity || "info",
    hintCode: base.hintCode || "UNSPECIFIED_HINT",
    fileName: base.fileName || "unknown",
    functionName: base.functionName || "unknown",
    fieldName: base.fieldName || "unknown",
    note: base.note || null
    // Worker attaches timestamp, ids, etc.
  };
}

// ============================================================================
// FACTORY — PURE GLOBAL HEALER ORGAN (v24-IMMORTAL-Presence-MESH++)
// ============================================================================
export function createGlobalHealerV24({ modeKind = "dual" } = {}) {
  const identity = Object.freeze({
    ...GLOBAL_HEALER_CONTEXT_V24,
    modeKind,
    version: "v24-IMMORTAL++",
    layer: "global_healer",
    presenceAware: true,
    meshAware: true,
    advantageAware: true
  });

  // --------------------------------------------------------------------------
  // transformMeshDriftEvent — immune reflex for Mesh drift
  // Returns: { globalHealerLog, driftSignature, functionLogHint }
  // --------------------------------------------------------------------------
  function transformMeshDriftEvent(entry = {}) {
    const base = {
      source: "Mesh",
      subsystem: entry.subsystem ?? "Mesh",
      meshNodeId: entry.meshNodeId ?? null,
      routeId: entry.routeId ?? null,
      pathwayId: entry.pathwayId ?? null,
      severity: entry.severity ?? "info",
      driftType: entry.driftType ?? "unspecified",
      note: entry.note ?? null,
      loopId: entry.loopId ?? null,
      fpinId: entry.fpinId ?? null,

      // v24++ metadata (pure tagging)
      advantageTier: entry.advantageTier ?? "unknown",
      deviceTier: entry.deviceTier ?? "unknown",
      networkTier: entry.networkTier ?? "unknown",
      gpuTier: entry.gpuTier ?? "unknown"
    };

    const globalHealerLog = buildGlobalHealerLog({
      type: "mesh_drift_detected",
      ...base,
      details: entry.details ?? null
    });

    const driftSignature = buildDriftSignature("Mesh", {
      type: entry.driftType ?? "mesh_drift",
      severity: entry.severity ?? "info",
      details: {
        routeId: entry.routeId ?? null,
        pathwayId: entry.pathwayId ?? null,
        meshNodeId: entry.meshNodeId ?? null,
        loopId: entry.loopId ?? null,
        fpinId: entry.fpinId ?? null,
        advantageTier: entry.advantageTier ?? "unknown",
        deviceTier: entry.deviceTier ?? "unknown",
        networkTier: entry.networkTier ?? "unknown",
        gpuTier: entry.gpuTier ?? "unknown",
        ...(entry.details || {})
      }
    });

    const functionLogHint = buildFunctionLogHint({
      hintCode: entry.hintCode ?? "MESH_DRIFT_DETECTED",
      subsystem: "Mesh",
      fileName: entry.fileName ?? "Mesh.js",
      functionName: entry.functionName ?? "unknown",
      fieldName: entry.fieldName ?? "unknown",
      severity: entry.severity ?? "info",
      note:
        entry.note ??
        "Mesh drift detected; review mesh routing, memory alignment, and advantage tiers."
    });

    return {
      globalHealerLog,
      driftSignature,
      functionLogHint
    };
  }

  // --------------------------------------------------------------------------
  // transformPresenceDriftEvent — immune reflex for Presence / Bluetooth / Mesh
  // Returns: { globalHealerLog, driftSignature, functionLogHint }
  // --------------------------------------------------------------------------
  function transformPresenceDriftEvent(entry = {}) {
    const base = {
      source: "Presence",
      subsystem: entry.subsystem ?? "Presence",
      presenceNodeId: entry.presenceNodeId ?? null,
      deviceId: entry.deviceId ?? null,
      meshNodeId: entry.meshNodeId ?? null,
      routeId: entry.routeId ?? null,
      severity: entry.severity ?? "info",
      driftType: entry.driftType ?? "unspecified",
      note: entry.note ?? null,
      loopId: entry.loopId ?? null,
      fpinId: entry.fpinId ?? null,
      presenceBand: entry.presenceBand ?? "bluetooth",
      presenceField: entry.presenceField ?? "unknown",

      // v24++ metadata (pure tagging)
      advantageTier: entry.advantageTier ?? "unknown",
      deviceTier: entry.deviceTier ?? "unknown",
      networkTier: entry.networkTier ?? "unknown",
      gpuTier: entry.gpuTier ?? "unknown"
    };

    const globalHealerLog = buildGlobalHealerLog({
      type: "presence_drift_detected",
      ...base,
      details: entry.details ?? null
    });

    const driftSignature = buildDriftSignature("Presence", {
      type: entry.driftType ?? "presence_drift",
      severity: entry.severity ?? "info",
      details: {
        presenceNodeId: entry.presenceNodeId ?? null,
        deviceId: entry.deviceId ?? null,
        meshNodeId: entry.meshNodeId ?? null,
        routeId: entry.routeId ?? null,
        presenceBand: entry.presenceBand ?? "bluetooth",
        presenceField: entry.presenceField ?? "unknown",
        loopId: entry.loopId ?? null,
        fpinId: entry.fpinId ?? null,
        advantageTier: entry.advantageTier ?? "unknown",
        deviceTier: entry.deviceTier ?? "unknown",
        networkTier: entry.networkTier ?? "unknown",
        gpuTier: entry.gpuTier ?? "unknown",
        ...(entry.details || {})
      }
    });

    const functionLogHint = buildFunctionLogHint({
      hintCode: entry.hintCode ?? "PRESENCE_DRIFT_DETECTED",
      subsystem: "Presence",
      fileName: entry.fileName ?? "PresenceMesh.js",
      functionName: entry.functionName ?? "unknown",
      fieldName: entry.fieldName ?? "unknown",
      severity: entry.severity ?? "info",
      note:
        entry.note ??
        "Presence drift detected; review presence/mesh alignment, Bluetooth presence field, and advantage tiers."
    });

    return {
      globalHealerLog,
      driftSignature,
      functionLogHint
    };
  }

  return {
    meta: identity,
    transformMeshDriftEvent,
    transformPresenceDriftEvent
  };
}
