// ============================================================================
//  PulseMeshMemoryAdapter-v20.js — v20‑IMMORTAL‑MESH‑MEMORY‑ADAPTER
//  “GPU LOADS ONCE. COMPUTES FOREVER. MEMORY NEVER DRIFTS.”
// ============================================================================

import { OrganismIdentity } from "../PULSE-X/PULSE-WORLD-MAP.js
";

const Identity = OrganismIdentity(import.meta.url);

// ============================================================================
//  META BLOCK — v20 IMMORTAL (from genome)
// ============================================================================
export const PulseMeshMemoryAdapterMeta = Identity.OrganMeta;

// ============================================================================
//  SURFACE / ORGANISM LAYER EXPORTS — v20 IMMORTAL
// ============================================================================
export const pulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;

export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

// deterministic epoch for Mesh adapter events
let MESH_EPOCH = 0;
function nextMeshEpoch() {
  MESH_EPOCH += 1;
  return MESH_EPOCH;
}

// ============================================================================
//  FACTORY — v20 IMMORTAL
// ============================================================================
import { createPulseBinaryOverlay } from "./PulseCoreBinaryOverlay-v20.js";

export function createPulseMeshMemoryAdapter({
  overlay = createPulseBinaryOverlay(),
  dnaTag = "default-dna",
  version = "20.0-IMMORTAL-MESH-MEMORY",
  log = console.log
} = {}) {

  function wrap(routeId, blob, dataType) {
    const epoch = nextMeshEpoch();

    const band =
      dataType === "gpu-model" ||
      dataType === "gpu-kernel" ||
      dataType === "gpu-transform"
        ? "binary"
        : "symbolic";

    const meshSize =
      typeof blob === "object"
        ? JSON.stringify(blob).length
        : String(blob || "").length;

    const meta = {
      dataType,
      dnaTag,
      version,
      epoch,
      band,
      meshSize,
      metaBlock: PulseMeshMemoryAdapterMeta
    };

    try {
      overlay.touch?.(routeId, epoch, meta);
    } catch {}

    return overlay.canonicalize(routeId, blob, {
      dataType,
      band
    });
  }

  function registerModel(routeId, modelBlob) {
    return wrap(routeId, modelBlob, "gpu-model");
  }

  function registerKernel(routeId, kernelBlob) {
    return wrap(routeId, kernelBlob, "gpu-kernel");
  }

  function registerTransform(routeId, transform) {
    return wrap(routeId, transform, "gpu-transform");
  }

  function promoteHot(routeId, key) {
    try {
      overlay.markHot?.(routeId, key);
      log("[PulseMeshMemoryAdapter-v20] HOT_PROMOTE", { routeId, key });
    } catch {}
  }

  return {
    PulseMeshMemoryAdapterMeta,
    dnaTag,
    version,

    registerModel,
    registerKernel,
    registerTransform,

    promoteHot,

    // genome-driven meta exports
    AI_EXPERIENCE_META,
    EXPORT_META,
    pulseRole,
    surfaceMeta,
    pulseLoreContext
  };
}
