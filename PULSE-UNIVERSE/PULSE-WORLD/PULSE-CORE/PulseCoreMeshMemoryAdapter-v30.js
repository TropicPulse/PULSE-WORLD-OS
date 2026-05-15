// ============================================================================
//  PulseMeshMemoryAdapter-v30.js — v30‑IMMORTAL‑MESH‑MEMORY‑ADAPTER
//  “GPU LOADS ONCE. COMPUTES FOREVER. MEMORY NEVER DRIFTS.”
//  BINARY‑ONLY • MAP‑STRIPPED • ZERO META
// ============================================================================

import { createPulseBinaryOverlay } from "./PulseCoreBinaryOverlay-v20.js";

// deterministic epoch for Mesh adapter events
let MESH_EPOCH = 0;
function nextMeshEpoch() {
  MESH_EPOCH += 1;
  return MESH_EPOCH;
}

// ============================================================================
//  FACTORY — v30 IMMORTAL (BINARY‑ONLY)
// ============================================================================
export function createPulseMeshMemoryAdapter({
  overlay = createPulseBinaryOverlay(),
  dnaTag = "default-dna",
  version = "30.0-IMMORTAL-MESH-MEMORY",
  log = console.log
} = {}) {

  function wrap(routeId, blob, dataType) {
    const epoch = nextMeshEpoch();

    const meshSize =
      typeof blob === "object"
        ? JSON.stringify(blob).length
        : String(blob || "").length;

    const band = "binary";

    try {
      overlay.touch?.(routeId, epoch, {
        dataType,
        dnaTag,
        version,
        epoch,
        band,
        meshSize
      });
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
      log("[PulseMeshMemoryAdapter-v30] HOT_PROMOTE", { routeId, key });
    } catch {}
  }

  return {
    dnaTag,
    version,

    registerModel,
    registerKernel,
    registerTransform,

    promoteHot
  };
}

export default createPulseMeshMemoryAdapter;
