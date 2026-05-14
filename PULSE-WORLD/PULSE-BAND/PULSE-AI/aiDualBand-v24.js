// ============================================================================
//  aiDualBand-v24-Immortal-ORGANISM++.js
//  PULSE OS v24-Immortal++ — Dual-Band Organism (Symbolic ↔ Binary)
//  Organism Bridge • Context Engine • Clinical + Structural + ScanFile Aware
//  PURE BRIDGE. ZERO MUTATION. ZERO RANDOMNESS.
// ============================================================================

// ============================================================================
//  IDENTITY (from Organism Map)
// ============================================================================

// ============================================================================
// IMPORTS (dependency-ordered, ESM)
// ============================================================================

// Binary organism organs (needed by AIDualbandOrganismBootloader)
import { AIBinaryAgent } from "./aiBinaryAgent-v24.js";
import { AIMemory } from "./aiMemory-v24.js";
import { AIAnatomy as AIBinaryAnatomy } from "./aiAnatomy-v24.js";
import { AIBinaryGenome } from "./aiGenome-v24.js";
import { AIBinaryVitals } from "./aiVitals-v24.js";
import { AIBinaryMetabolism } from "./aiMetabolism-v24.js";
import { AIBinaryHormones } from "./aiHormones-v24.js";
import { AIBinarySentience } from "./aiSentience-v24.js";
import { AIBinaryConsciousness } from "./aiConsciousness-v24.js";
import { AIBinaryImmunity } from "./aiImmunity-v24.js";
import { AIBinaryPipeline } from "./aiPipeline-v24.js";
import { AIBinaryReflex } from "./aiReflex-v24.js";
import { AIBinaryScheduler } from "./aiScheduler-v24.js";
import { AIBinaryOrganRegistry } from "./aiBinaryOrganRegistry-v24.js";
import { AIBinaryEvolution } from "./aiBinaryEvolution-v24.js";

// Existing symbolic / tools imports
import depsSurface, {
  DepsMeta,
  getDb,
  getFsAPI,
  getRouteAPI,
  getSchemaAPI,
  getOrganismSnapshot,
  emitDepsPacket,
  prewarmDepsLayer
} from "./aiDeps-v24.js";

import {
  DiagnosticsMeta,
  createDiagnosticsState,
  attachDiagnosticsOrgan,
  createDiagnosticsAPI,
  prewarmDiagnosticsOrgan
} from "./aiDiagnostics-v24.js";

import {
  DiagnosticsWriteMeta,
  createDiagnosticsWriteOrgan,
  prewarmDiagnosticsWriteOrgan
} from "./aiDiagnosticsWrite-v24.js";

import {
  SCRIBE_META,
  formatDebugReport,
  formatDebugString,
  prewarmScribe
} from "./aiDebug-v24.js";

import { createPermissionsEngine } from "./aiPermissionsEngine-v24.js";
import { createBoundariesEngine } from "./aiBoundariesEngine-v24.js";
import { createPersonaEngine } from "./aiPersonality-v24.js";

import {
  createContextEngine,
  prewarmContextEngine
} from "./aiContextEngine-v24.js";

import createCognitiveFrame, {
  COGNITIVE_FRAME_META,
  prewarmCognitiveFrame
} from "./aiContext-v24.js";

import { createCortex, prewarmAICortex } from "./aiCortex-v24.js";
import { createRouterEngine } from "./aiRouter-v24.js";
import { runAI, ExecutionEngineMeta } from "./aiEngine-v24.js";

import aiDeliveryEngine, { prewarmDeliveryEngine } from "./aiDeliveryEngine-v24.js";
import aiEmotionEngine, { prewarmEmotionEngine } from "./aiEmotionEngine-v24.js";
import createEarnAPI, { EarnMeta, prewarmEarnOrgan } from "./aiEarn-v24.js";

import { createTouristAPI } from "./aiTourist-v24.js";
import { createArchitectAPI } from "./aiArchitect-v24.js";
import { createDoctorOrgan } from "./aiDoctorAssistant-v24.js";
import { createDoctorArchitectOrgan } from "./aiDoctorArchitect-v24.js";

import { createAIOrganism } from "./aiOrganism-v24.js";

import {
  getProxyContext,
  getProxyPressure,
  getProxyBoost,
  getProxyFallback,
  getProxyMode,
  getProxyLineage
} from "../PULSE-PROXY/PulseProxyContext-v20.js";

import { createPulseAIChunker } from "./PulseAIChunker-v30.js";

// ============================================================================
//  Dualband Organism Bootloader
// ============================================================================
export async function AIDualbandOrganismBootloader() {
  // Create chunker
  const chunker = createPulseAIChunker();

  // Instantiate binary organs
  const agent = AIBinaryAgent();
  const memory = AIMemory();
  const anatomy = AIBinaryAnatomy();
  const genome = AIBinaryGenome();
  const vitals = AIBinaryVitals();
  const metabolism = AIBinaryMetabolism();
  const hormones = AIBinaryHormones();
  const sentience = AIBinarySentience();
  const consciousness = AIBinaryConsciousness();
  const immunity = AIBinaryImmunity();
  const pipeline = AIBinaryPipeline();
  const reflex = AIBinaryReflex();
  const scheduler = AIBinaryScheduler();
  const registry = AIBinaryOrganRegistry();
  const evolution = AIBinaryEvolution();

  // Wire organism anatomy
  registry.register("agent", agent);
  registry.register("memory", memory);
  registry.register("anatomy", anatomy);
  registry.register("genome", genome);
  registry.register("vitals", vitals);
  registry.register("metabolism", metabolism);
  registry.register("hormones", hormones);
  registry.register("sentience", sentience);
  registry.register("consciousness", consciousness);
  registry.register("immunity", immunity);
  registry.register("pipeline", pipeline);
  registry.register("reflex", reflex);
  registry.register("scheduler", scheduler);
  registry.register("evolution", evolution);

  // Compute organism artery
  const artery = anatomy.computeArtery({
    agent,
    memory,
    genome,
    vitals,
    metabolism,
    hormones,
    sentience,
    consciousness,
    immunity,
    pipeline,
    reflex,
    scheduler,
    evolution
  });

  // Expose stable organism surface
  return Object.freeze({
    artery,
    registry,
    chunker,
    bootVersion: "v24.0-IMMORTAL"
  });
}

// ============================================================================
//  DUALBAND CHUNKER (32-LANE, NON-MIND)
// ============================================================================
const dualBandChunker = createPulseAIChunker({
  id: "PulseAIChunker-DualBandOrganism",
  defaultChunkSize: 4096,
  maxChunkSize: 65536,
  trace: false
});

dualBandChunker.prewarmPattern("dualband_artery", {
  defaultChunkSize: 2048,
  maxChunkSize: 16384,
  band: "symbolic"
});

dualBandChunker.prewarmPattern("cognitive_frame", {
  defaultChunkSize: 4096,
  maxChunkSize: 32768,
  band: "symbolic"
});

dualBandChunker.prewarmPattern("diagnostics", {
  defaultChunkSize: 2048,
  maxChunkSize: 16384,
  band: "symbolic"
});

// ============================================================================
//  HELPERS — PRESSURE + ARTERY + PROXY OVERLAY
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
  if (v > 0)   return "low";
  return "none";
}

function buildProxyOverlay() {
  const proxyCtx = getProxyContext?.() || {};
  const proxyPressure = getProxyPressure?.() ?? 0;
  const proxyBoost = getProxyBoost?.() ?? 0;
  const proxyFallback = !!getProxyFallback?.();
  const proxyMode = getProxyMode?.() || "standard";
  const proxyLineage = getProxyLineage?.() || null;

  const pressureDelta = proxyPressure * 0.3;
  const fallbackPenalty = proxyFallback ? 0.15 : 0;

  return Object.freeze({
    proxyContext: proxyCtx,
    proxyPressure,
    proxyBoost,
    proxyFallback,
    proxyMode,
    proxyLineage,
    pressureDelta,
    fallbackPenalty
  });
}

function dualBandArtery({ diagnostics = {}, binaryVitals = {} } = {}) {
  const baseBinaryPressure = extractBinaryPressure(binaryVitals);
  const proxyOverlay = buildProxyOverlay();

  const mismatchCount = diagnostics.mismatches?.length || 0;
  const missingCount = diagnostics.missingFields?.length || 0;
  const slowdownCount = diagnostics.slowdownCauses?.length || 0;
  const drift = diagnostics.driftDetected === true;

  const localPressure =
    (mismatchCount ? 0.2 : 0) +
    (missingCount ? 0.1 : 0) +
    (slowdownCount ? 0.2 : 0) +
    (drift ? 0.3 : 0);

  let pressure = 0.6 * localPressure + 0.4 * baseBinaryPressure;

  pressure += proxyOverlay.pressureDelta;
  pressure += proxyOverlay.fallbackPenalty;

  pressure = Math.max(0, Math.min(1, pressure));

  const artery = Object.freeze({
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
    proxy: {
      pressure: proxyOverlay.proxyPressure,
      boost: proxyOverlay.proxyBoost,
      fallback: proxyOverlay.proxyFallback,
      mode: proxyOverlay.proxyMode,
      lineage: proxyOverlay.proxyLineage
    },
    gpu: binaryVitals.gpu || null,
    binaryOverlay: binaryVitals.binaryOverlay || null
  });

  const arteryChunks = dualBandChunker.chunkJSON(artery, {
    label: "dualband_artery",
    band: "symbolic"
  });

  return { artery, arteryChunks };
}

// ============================================================================
//  DUAL‑BAND BRIDGE PREWARM ENGINE — v24‑IMMORTAL-ORGANISM++
// ============================================================================
export function prewarmDualBandBridge({ trace = false } = {}) {
  try {
    JSON.stringify({
      intent: "prewarm",
      personaId: "ARCHITECT",
      safetyMode: "standard",
      flags: { stable: true }
    });

    prewarmDepsLayer();
    prewarmDiagnosticsOrgan();
    prewarmDiagnosticsWriteOrgan();
    prewarmScribe();

    prewarmEmotionEngine();
    prewarmDeliveryEngine();

    prewarmContextEngine();
    prewarmCognitiveFrame();
    prewarmEarnOrgan(null, null, null);
    prewarmAICortex();

    emitDepsPacket();
    formatDebugReport({ trace: ["prewarm"] }, null);
    formatDebugString({ trace: ["prewarm"] }, null);

    const warmContextEngine = createContextEngine({});
    const warmFrame = warmContextEngine.buildContextFrame({
      brainstem: { context: { userId: "prewarm" } },
      request: { intent: "prewarm" },
      routerPacket: { personaId: "ARCHITECT", reasoning: ["prewarm"] },
      persona: { id: "ARCHITECT" },
      binaryVitals: { throughput: 1 },
      dualBand: { organism: { organismSnapshot: () => ({}) } }
    });

    createCognitiveFrame({
      request: { intent: "prewarm" },
      routing: { personaId: "ARCHITECT", reasoning: ["prewarm"] },
      organismSnapshot: { binary: {}, symbolic: {} }
    });

    dualBandChunker.chunkJSON(warmFrame || {}, {
      label: "cognitive_frame",
      band: "symbolic"
    });

    dualBandChunker.chunkJSON(
      {
        diagnostics: { mismatches: [], missingFields: [], slowdownCauses: [] },
        binaryVitals: { throughput: 1 }
      },
      { label: "diagnostics", band: "symbolic" }
    );

    if (trace) {
      console.log("[DualBandBridge v24] prewarm complete");
    }

    return true;
  } catch (err) {
    console.error("[DualBandBridge Prewarm v24] Failed:", err);
    return false;
  }
}

// ============================================================================
//  createDualBandOrganism() — v24‑IMMORTAL-ORGANISM++
// ============================================================================
export function createDualBandOrganism({
  trace = false,
  db,
  fsAPI,
  routeAPI,
  schemaAPI,
  binaryVitals = {},
  diagnostics = {}
} = {}) {
  prewarmDualBandBridge({ trace });

  const organism = createAIOrganism({ trace });

  const context = {
    ...DUAL_BAND_CONTEXT,
    trace
  };

  const deps = Object.freeze({
    meta: DepsMeta,
    db: db || getDb({ trace }),
    fsAPI: fsAPI || getFsAPI({ trace }),
    routeAPI: routeAPI || getRouteAPI({ trace }),
    schemaAPI: schemaAPI || getSchemaAPI({ trace }),
    organismSnapshot: () =>
      getOrganismSnapshot({
        binary: { vitals: organism.vitals },
        symbolic: null
      }),
    emitDepsPacket
  });

  const diagnosticsState = createDiagnosticsState(diagnostics || {});
  const diagnosticsAPI = createDiagnosticsAPI(diagnosticsState);

  const diagnosticsWriteOrgan = createDiagnosticsWriteOrgan({
    context,
    backend: deps.db
  });

  const diagnosticsOrgan = attachDiagnosticsOrgan(diagnosticsState, {
    diagnosticsAPI,
    diagnosticsWriteOrgan
  });

  const scribe = {
    meta: SCRIBE_META,
    formatDebugReport,
    formatDebugString
  };

  const personaEngine = createPersonaEngine({ context, db: deps.db });
  const boundariesEngine = createBoundariesEngine({ context, db: deps.db });
  const permissionsEngine = createPermissionsEngine({ context, db: deps.db });

  const emotionEngine = aiEmotionEngine({ context, personaEngine });

  const router = createRouterEngine({
    context,
    personaEngine,
    boundariesEngine,
    permissionsEngine,
    emotionEngine
  });

  const cortex = createCortex({
    context,
    router,
    personaEngine,
    boundariesEngine,
    permissionsEngine,
    emotionEngine,
    encoder: organism.agent,
    diagnosticsOrgan,
    trace
  });

  const contextEngine = createContextEngine({
    safetyFrame: boundariesEngine,
    experienceFrame: null,
    emotionEngine
  });

  function buildCognitiveFrame(request = {}) {
    const brainstemSnapshot = organism.organismSnapshot();
    const routerPacket = router?.getLastPacket?.() || {};
    const persona = personaEngine?.getActivePersona?.() || {};

    const frame = createCognitiveFrame({
      request,
      routing: {
        personaId: routerPacket.personaId || persona.id || null,
        persona,
        permissions: persona.permissions || {},
        boundaries: persona.boundaries || {},
        dualBand: { primary: "binary", secondary: "symbolic" },
        reasoning: routerPacket.reasoning || []
      },
      organismSnapshot: {
        binary: brainstemSnapshot.binary || null,
        symbolic: brainstemSnapshot.symbolic || null
      },
      emotionEngine
    });

    const frameChunks = dualBandChunker.chunkJSON(frame || {}, {
      label: "cognitive_frame",
      band: "symbolic"
    });

    return { frame, frameChunks };
  }

  const doctor = createDoctorOrgan({
    logStep: msg => trace && console.log("[Doctor]", msg)
  });

  const doctorArchitect = createDoctorArchitectOrgan({
    logStep: msg => trace && console.log("[DoctorArchitect]", msg)
  });

  const delivery = aiDeliveryEngine;

  const architect = createArchitectAPI({
    context,
    db: deps.db,
    router,
    cortex,
    delivery
  });

  const tourist = createTouristAPI({
    context,
    db: deps.db,
    router,
    cortex,
    delivery
  });

  const earn = createEarnAPI(deps.db, null, null);

  function encodeToBinary(value) {
    return organism.agent.encode(value);
  }

  function decodeFromBinary(bits) {
    return organism.agent.decode(bits);
  }

  function symbolicComputeToBinary(value) {
    const bits = encodeToBinary(value);
    const resultBits = organism.pipeline.run(bits);
    return decodeFromBinary(resultBits);
  }

  function symbolicReflexToBinary(event) {
    const bits = encodeToBinary(event);
    const reflexBits = organism.reflex.run(bits);
    return reflexBits ? decodeFromBinary(reflexBits) : null;
  }

  function syncSymbolicVitalsToBinary(symbolicVitals) {
    return {
      symbolicVitals,
      organismSnapshot: organism.organismSnapshot()
    };
  }

  function syncBinaryVitalsToSymbolic() {
    return organism.organismSnapshot();
  }

  const diagnosticsSnapshot = diagnosticsState.snapshot
    ? diagnosticsState.snapshot()
    : diagnostics;

  const { artery, arteryChunks } = dualBandArtery({
    diagnostics: diagnosticsSnapshot,
    binaryVitals
  });

  // SIDE DESIGN: dualband scan surface for this organism instance
  function dualBandScanSurface() {
    const { frame } = buildCognitiveFrame({});
    const diagChunks = dualBandChunker.chunkJSON(
      diagnosticsSnapshot || {},
      { label: "diagnostics", band: "symbolic" }
    );

    const contextChunks = dualBandChunker.chunkJSON(
      frame || {},
      { label: "cognitive_frame", band: "symbolic" }
    );

    return Object.freeze({
      meta: {
        layer: "DualBandScanSurface",
        role: "SCAN_SURFACE",
        version: "v24-Immortal-ORGANISM++",
        evo: {
          deterministic: true,
          driftProof: true,
          readOnly: true,
          chunkAware: true,
          arteryAware: true,
          gpuLaneAware: true,
          binaryOverlayAware: true
        }
      },
      artery,
      arteryChunks,
      contextChunks,
      diagnosticsChunks: diagChunks
    });
  }

  const dualBand = Object.freeze({
    meta: DualBandMeta,
    context,
    deps,
    artery,
    arteryChunks,

    symbolic: Object.freeze({
      cortex,
      router,
      personaEngine,
      boundariesEngine,
      permissionsEngine,
      architect,
      tourist,
      contextEngine,
      buildCognitiveFrame,
      doctor,
      doctorArchitect,
      diagnosticsMeta: DiagnosticsMeta,
      diagnosticsAPI,
      diagnosticsWriteOrgan,
      diagnosticsOrgan,
      diagnosticsWriteMeta: DiagnosticsWriteMeta,
      scribe,
      delivery,
      emotionEngine,
      earn,
      earnMeta: EarnMeta,

      execution: {
        meta: ExecutionEngineMeta,
        run: (request, operation) =>
          runAI(
            request,
            operation,
            {
              db: deps.db,
              fsAPI: deps.fsAPI,
              routeAPI: deps.routeAPI,
              schemaAPI: deps.schemaAPI
            },
            dualBand
          )
      }
    }),

    organism,
    bridge: Object.freeze({
      encodeToBinary,
      decodeFromBinary,
      symbolicComputeToBinary,
      symbolicReflexToBinary,
      syncSymbolicVitalsToBinary,
      syncBinaryVitalsToSymbolic
    }),

    chunker: dualBandChunker,
    scanSurface: dualBandScanSurface
  });

  return dualBand;
}

// ============================================================================
//  PUBLIC API — v24‑IMMORTAL-ORGANISM++
// ============================================================================
export const DualBandAPI = {
  DualBandMeta,
  create: createDualBandOrganism,
  prewarm: prewarmDualBandBridge,
  chunker: dualBandChunker
};

export default DualBandAPI;
