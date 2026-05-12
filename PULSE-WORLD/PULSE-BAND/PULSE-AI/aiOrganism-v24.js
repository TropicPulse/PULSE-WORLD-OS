// ============================================================================
//  aiOrganism-v24-Immortal+++ .js — Pulse OS v24-Immortal+++ Organism
//  Dualband Organism Bootloader • Canonical Assembly • Trust/Artery/CNS/Spine Aware
// ============================================================================
//
// ROLE (v24-Immortal-Organism+++):
//   • Canonically assemble the binary + symbolic organism (organs, registry, conductor).
//   • Provide a deterministic, dualband-ready organism surface.
//   • Expose a stable organismSnapshot + organismArtery for higher layers.
//   • Integrate with diagnostics, deps, trust fabric, dualband, Pulse-Net,
//     CNS Nervous System, Spinal Cord, and Survival Instincts.
//   • Never perform user routing, UI, or external network access directly.
//   • Never mutate external config or DB; pure assembly + internal wiring.
//
// CONTRACT:
//   • Deterministic, drift-proof, read-only outward surface.
//   • No random, no timestamps, no external mutation.
//   • No direct internet / HTTP / DNS / WebSocket.
//   • CNS / Spine / Instincts are attached as pure internal organs / surfaces.
// ============================================================================

import { OrganismIdentity } from "../PULSE-X/PULSE-WORLD-MAP.js
";

const Identity = OrganismIdentity(import.meta.url);

// ============================================================================
//  META BLOCK — v24.0 IMMORTAL (ORGANISM KERNEL)
//  (backed by the Organism Map instead of hardcoded here)
// ============================================================================
export const OrganismMeta = Identity.OrganMeta;

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
//  IMPORTS — binary organs (v24 lineage)
// ============================================================================
import { createAIBinaryAgent } from "./aiBinaryAgent-v24.js";
import { createAIMemory } from "./aiMemory-v24.js";
import { createAIBinaryPipeline } from "./aiPipeline-v24.js";
import { createAIBinaryReflex } from "./aiReflex-v24.js";
import { createAIBinaryLoggerAdapter } from "./aiLoggerAdapter-v24.js";
import { createAIBinaryPageScannerAdapter } from "./aiPageScannerAdapter-v24.js";
import { createAIBinaryEvolution } from "./aiBinaryEvolution-v24.js";
import { createAIBinaryGovernorAdapter } from "./aiGovernorAdapter-v24.js";
import { createAIBinaryOrganRegistry } from "./aiBinaryOrganRegistry-v24.js";
import { createAIBinaryDelta } from "./aiBinaryDelta-v24.js";
import { createAIConductor as createAIBinaryConductor } from "./aiConductor-v24.js";
import { createAIBinaryMetabolism } from "./aiMetabolism-v24.js";
import { createAIBinaryHormones } from "./aiHormones-v24.js";
import { createAIBinaryImmunity } from "./aiImmunity-v24.js";
import { createAIBinaryNervousSystem } from "./aiNervousSystem-v24.js";

// ============================================================================
//  COMMANDMENTS / SUPEREGO LAYER
// ============================================================================
import { createPersonaEngine } from "./aiPersonality-v24.js";
import { createBoundariesEngine } from "./aiBoundaries-v24.js";
import { createPermissionsEngine } from "./aiPermissions-v24.js";

// ============================================================================
//  COGNITIVE FRAME / CONTEXT / CORTEX
// ============================================================================
import createCognitiveFrame, {
  COGNITIVE_FRAME_META,
  prewarmCognitiveFrame
} from "./aiContext-v24.js";

import {
  createContextEngine,
  prewarmContextEngine
} from "./aiContextEngine-v24.js";

import {
  createCortex,
  prewarmAICortex
} from "./aiCortex-v24.js";

// ============================================================================
//  EMOTION / EXPERIENCE / PERSONALITY
// ============================================================================
import aiEmotionEngine, {
  prewarmEmotionEngine
} from "./aiEmotionEngine-v24.js";

import createExperienceEngine from "./aiExperience-v24.js";
import { createPersonalityEngine } from "./aiPersonalityEngine-v24.js";
import { createPersonalFrame } from "./aiPersonalFrame-v24.js";

// ============================================================================
//  DELIVERY / EVOLUTION / DUALBAND
// ============================================================================
import aiDeliveryEngine, {
  prewarmDeliveryEngine
} from "./aiDeliveryEngine-v24.js";

import { aiEvolutionEngine } from "./aiEvolutionEngine-v24.js";
import { aiDualBand } from "./aiDualBand-v24.js";

// ============================================================================
//  SCRIBE / DIAGNOSTICS / DEPS
// ============================================================================
import {
  SCRIBE_META,
  formatDebugReport,
  formatDebugString,
  prewarmScribe
} from "./aiDebug-v24.js";

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

// ============================================================================
//  AI ENGINE
// ============================================================================
import { runAI, ExecutionEngineMeta } from "./aiEngine-v24.js";

// ============================================================================
//  EXTERNAL ORGANS (CNS / SPINAL / INSTINCTS) — injected surfaces
//  NOTE: these are expected to be passed in via config, not imported here,
//        to keep aiOrganism purely assembly-only and environment-agnostic.
//  config.cns                → PulseOSCNSNervousSystem surface
//  config.spinalCord         → PulseOSSpinalCord surface
//  config.survivalInstincts  → PulseOSSurvivalInstincts surface
// ============================================================================

// ============================================================================
//  ORGANISM ARTERY — v24 IMMORTAL+++
// ============================================================================
function computeOrganismArtery(self) {
  const registryCount = self.registry?.count?.() ?? 0;
  const metabolicPressure = self.metabolism?.getPressure?.() ?? null;
  const metabolicLoad = self.metabolism?.getLoad?.() ?? null;
  const immunityState = self.immunity?.getState?.() ?? null;

  const cnsDiagnostics = self.cns?.getDiagnostics?.() ?? null;
  const spinalAdvantage = self.spinalCord?.getSpinalAdvantageSnapshot?.() ?? null;
  const spinalPresence = self.spinalCord?.getSpinalPresenceSnapshot?.() ?? null;
  const spinalHealth = self.spinalCord?.getHealth?.() ?? null;

  const survivalMeta = self.survivalInstincts?.meta ?? null;
  const survivalEvolutionCount =
    self.survivalInstincts?.getEvolutionCount?.() ?? null;

  const buckets = {
    registry: registryCount > 128 ? "ultra" : registryCount > 64 ? "high" : registryCount > 0 ? "medium" : "none",
    metabolic:
      metabolicPressure != null
        ? metabolicPressure >= 0.95
          ? "critical"
          : metabolicPressure >= 0.8
          ? "high"
          : metabolicPressure >= 0.5
          ? "medium"
          : metabolicPressure > 0
          ? "low"
          : "none"
        : "none",
    nervous:
      immunityState && immunityState.alertLevel
        ? immunityState.alertLevel
        : "unknown"
  };

  return Object.freeze({
    meta: {
      layer: OrganismMeta.layer,
      role: OrganismMeta.role,
      version: OrganismMeta.version,
      identity: OrganismMeta.identity
    },
    registryCount,
    metabolicPressure,
    metabolicLoad,
    immunityState,
    buckets,

    // v24+++: CNS / Spine / Instincts artery branches
    cnsDiagnostics,
    spinalAdvantage,
    spinalPresence,
    spinalHealth,
    survivalMeta,
    survivalEvolutionCount
  });
}

// ============================================================================
//  ORGANISM IMPLEMENTATION — v24 IMMORTAL+++
// ============================================================================
export class AIOrganism {
  constructor(config = {}) {
    this.id = config.id || OrganismMeta.identity;
    this.trace = !!config.trace;

    // ---------------------------------------------------------
    //  BINARY LAYER
    // ---------------------------------------------------------
    this.agent = createAIBinaryAgent({ id: "agent", trace: this.trace });

    this.memory = createAIMemory({
      id: "memory",
      core: config.coreMemory,
      trace: this.trace
    });

    this.pipeline = createAIBinaryPipeline({
      id: "pipeline",
      trace: this.trace
    });

    this.reflex = createAIBinaryReflex({ id: "reflex", trace: this.trace });

    this.metabolism = createAIBinaryMetabolism({
      id: "metabolism",
      encoder: this.agent,
      pipeline: this.pipeline,
      trace: this.trace
    });

    this.hormones = createAIBinaryHormones({
      id: "hormones",
      encoder: this.agent,
      metabolism: this.metabolism,
      sentience: config.sentience,
      pipeline: this.pipeline,
      reflex: this.reflex,
      logger: config.logger,
      trace: this.trace
    });

    this.evolution = createAIBinaryEvolution({
      id: "evolution",
      encoder: this.agent,
      memory: this.memory,
      trace: this.trace
    });

    this.registry = createAIBinaryOrganRegistry({
      id: "organ-registry",
      encoder: this.agent,
      memory: this.memory,
      evolution: this.evolution,
      trace: this.trace
    });

    this.delta = createAIBinaryDelta({ id: "delta", trace: this.trace });

    this.logger = createAIBinaryLoggerAdapter({
      id: "logger-adapter",
      logger: config.logger,
      shadowLogger: config.shadowLogger,
      trace: this.trace
    });

    this.governorAdapter = createAIBinaryGovernorAdapter({
      id: "governor-adapter",
      governor: config.governor,
      encoder: this.agent,
      trace: this.trace
    });

    this.pageScannerAdapter = createAIBinaryPageScannerAdapter({
      id: "pagescanner-adapter",
      encoder: this.agent,
      trace: this.trace
    });

    this.immunity = createAIBinaryImmunity({
      id: "immunity",
      encoder: this.agent,
      anatomy: config.anatomy,
      evolution: this.evolution,
      registry: this.registry,
      pipeline: this.pipeline,
      reflex: this.reflex,
      logger: this.logger,
      trace: this.trace
    });

    this.nervous = createAIBinaryNervousSystem({
      id: "nervous-system",
      encoder: this.agent,
      anatomy: config.anatomy,
      immunity: this.immunity,
      registry: this.registry,
      logger: this.logger,
      trace: this.trace
    });

    this.conductor = createAIBinaryConductor({
      id: "conductor",
      trace: this.trace
    });

    // ---------------------------------------------------------
    //  SUPEREGO / COMMANDMENTS LAYER
    // ---------------------------------------------------------
    this.persona = createPersonaEngine({
      id: "persona",
      trace: this.trace
    });

    this.boundaries = createBoundariesEngine({
      id: "boundaries",
      trace: this.trace
    });

    this.permissions = createPermissionsEngine({
      id: "permissions",
      trace: this.trace
    });

    // ---------------------------------------------------------
    //  COGNITIVE FRAME / CONTEXT / CORTEX
    // ---------------------------------------------------------
    this.cognitiveFrame = createCognitiveFrame({
      id: "cognitive-frame",
      trace: this.trace
    });

    this.contextEngine = createContextEngine({
      id: "context-engine",
      trace: this.trace
    });

    this.cortex = createCortex({
      id: "cortex",
      trace: this.trace
    });

    // ---------------------------------------------------------
    //  EMOTION / EXPERIENCE / PERSONALITY
    // ---------------------------------------------------------
    this.emotion = aiEmotionEngine({
      id: "emotion",
      trace: this.trace
    });

    this.experience = createExperienceEngine({
      id: "experience",
      trace: this.trace
    });

    this.personality = createPersonalityEngine({
      id: "personality",
      trace: this.trace
    });

    this.personalFrame = createPersonalFrame({
      id: "personal-frame",
      trace: this.trace
    });

    // ---------------------------------------------------------
    //  SYMBOLIC EVOLUTION / DELIVERY / DUALBAND
    // ---------------------------------------------------------
    this.symbolicEvolution = aiEvolutionEngine({
      id: "symbolic-evolution",
      trace: this.trace
    });

    this.delivery = aiDeliveryEngine({
      id: "delivery",
      trace: this.trace
    });

    this.dualband = aiDualBand({
      id: "dualband",
      trace: this.trace
    });

    // ---------------------------------------------------------
    //  SCRIBE / DIAGNOSTICS / DEPS
    // ---------------------------------------------------------
    this.scribe = prewarmScribe({
      id: "scribe",
      trace: this.trace
    });

    const diagnosticsState = createDiagnosticsState();

    this.diagnostics = createDiagnosticsAPI({
      id: "diagnostics",
      state: diagnosticsState,
      trace: this.trace
    });

    attachDiagnosticsOrgan(this.diagnostics, diagnosticsState);

    this.diagnosticsWrite = createDiagnosticsWriteOrgan({
      id: "diagnostics-write",
      trace: this.trace
    });

    this.deps = depsSurface({
      id: "deps",
      trace: this.trace
    });

    // ---------------------------------------------------------
    //  EXTERNAL ORGANS ATTACHMENT — CNS / SPINAL / INSTINCTS
    //  (injected via config, no hard dependency)
// ---------------------------------------------------------
    this.cns = config.cns || config.CNS || null;
    this.spinalCord = config.spinalCord || config.spine || null;
    this.survivalInstincts = config.survivalInstincts || null;

    // ---------------------------------------------------------
    //  META SURFACES / ENGINE HANDLE
    // ---------------------------------------------------------
    this.meta = {
      organism: OrganismMeta,
      contextFrame: COGNITIVE_FRAME_META,
      scribe: SCRIBE_META,
      diagnostics: DiagnosticsMeta,
      diagnosticsWrite: DiagnosticsWriteMeta,
      deps: DepsMeta,
      engine: ExecutionEngineMeta
    };

    this.engine = {
      run: (payload) =>
        runAI({
          ...payload,
          organism: this,
          meta: this.meta
        })
    };

    // ---------------------------------------------------------
    //  REGISTER ORGANS WITH CONDUCTOR
    // ---------------------------------------------------------
    const organs = [
      // binary
      this.agent,
      this.memory,
      this.pipeline,
      this.reflex,
      this.metabolism,
      this.hormones,
      this.immunity,
      this.nervous,
      this.evolution,
      this.registry,
      this.delta,
      this.logger,
      this.pageScannerAdapter,
      this.governorAdapter,
      this.conductor,

      // superego / commandments
      this.persona,
      this.boundaries,
      this.permissions,

      // cognitive
      this.cognitiveFrame,
      this.contextEngine,
      this.cortex,

      // emotional / identity
      this.emotion,
      this.experience,
      this.personality,
      this.personalFrame,

      // symbolic evolution / delivery / dualband
      this.symbolicEvolution,
      this.delivery,
      this.dualband,

      // diagnostics / deps / engine
      this.scribe,
      this.diagnostics,
      this.diagnosticsWrite,
      this.deps
    ];

    for (const organ of organs) {
      this.conductor.register(organ);
    }

    // ---------------------------------------------------------
    //  WIRING — binary
    // ---------------------------------------------------------
    this.conductor.wireBinaryPipeline({
      pipeline: this.pipeline,
      reflex: this.reflex,
      logger: this.logger,
      governorAdapter: this.governorAdapter,
      metabolism: this.metabolism,
      hormones: this.hormones,
      immunity: this.immunity,
      nervous: this.nervous
    });

    this.conductor.wirePageScanner({
      scannerAdapter: this.pageScannerAdapter,
      pipeline: this.pipeline,
      reflex: this.reflex,
      logger: this.logger
    });

    this.conductor.wireEvolution({
      evolution: this.evolution,
      registry: this.registry
    });

    // ---------------------------------------------------------
    //  SYMBOLIC WIRING
    // ---------------------------------------------------------
    if (this.conductor.wireSymbolicCognition) {
      this.conductor.wireSymbolicCognition({
        persona: this.persona,
        boundaries: this.boundaries,
        permissions: this.permissions,
        cognitiveFrame: this.cognitiveFrame,
        contextEngine: this.contextEngine,
        cortex: this.cortex
      });
    }

    if (this.conductor.wireSymbolicIdentity) {
      this.conductor.wireSymbolicIdentity({
        emotion: this.emotion,
        experience: this.experience,
        personality: this.personality,
        personalFrame: this.personalFrame
      });
    }

    if (this.conductor.wireSymbolicEvolution) {
      this.conductor.wireSymbolicEvolution({
        symbolicEvolution: this.symbolicEvolution,
        delivery: this.delivery,
        dualband: this.dualband
      });
    }

    if (this.conductor.wireDiagnostics) {
      this.conductor.wireDiagnostics({
        scribe: this.scribe,
        diagnostics: this.diagnostics,
        diagnosticsWrite: this.diagnosticsWrite,
        deps: this.deps
      });
    }

    // ---------------------------------------------------------
    //  PREWARM — symbolic + cognitive + diagnostics + deps
    // ---------------------------------------------------------
    prewarmCognitiveFrame(this.cognitiveFrame);
    prewarmContextEngine(this.contextEngine);
    prewarmAICortex(this.cortex);

    prewarmEmotionEngine(this.emotion);
    prewarmDeliveryEngine(this.delivery);

    prewarmDiagnosticsOrgan(this.diagnostics);
    prewarmDiagnosticsWriteOrgan(this.diagnosticsWrite);
    prewarmDepsLayer(this.deps);

    // v24+++: allow external organs to prewarm if they expose prewarm surfaces
    if (this.cns?.getCNSNervousSystemDiagnostics) {
      // touch diagnostics once to “wake” CNS without side effects
      this.cns.getDiagnostics?.();
    }

    if (this.spinalCord?.getSpinalAdvantageSnapshot) {
      this.spinalCord.getSpinalAdvantageSnapshot();
    }

    if (this.survivalInstincts?.getEvolutionCount) {
      this.survivalInstincts.getEvolutionCount();
    }

    // ---------------------------------------------------------
    //  OPTIONAL SELF-RUNNING ENGINE
    // ---------------------------------------------------------
    if (config.autoRunEngine) {
      this.startEngine();
    }

    // ---------------------------------------------------------
    //  INITIALIZE ORGANISM
    // ---------------------------------------------------------
    this.conductor.initialize(this.registry, this.evolution);

    this._trace("organism:initialized", {
      organCount: organs.length,
      epoch: OrganismMeta.evo.epoch
    });

    this._lastArtery = null;
  }

  // ---------------------------------------------------------
  //  PUBLIC API
  // ---------------------------------------------------------
  sense(event) {
    // Binary PageScanner path
    this.pageScannerAdapter._handleScannerEvent(event);

    // v24+++: forward to CNS if present (pure event, no routing)
    if (this.cns?.logEvent) {
      try {
        this.cns.logEvent("aiOrganismSense", {
          event,
          __band: "symbolic",
          __dnaTag: "ai-organism-sense"
        });
      } catch {
        // CNS must never break organism
      }
    }
  }

  compute(value) {
    const binary = this.agent.encode(value);
    return this.pipeline.run(binary);
  }

  evolveOrgan(organId) {
    const organ = this.conductor.get(organId);
    if (!organ) return null;
    return this.registry.evolveOrgan(organ);
  }

  organismSnapshot() {
    try {
      return getOrganismSnapshot(this.deps) || this.memory.snapshot();
    } catch {
      return this.memory.snapshot();
    }
  }

  organismArtery() {
    const artery = computeOrganismArtery(this);
    this._lastArtery = artery;
    return artery;
  }

  startEngine(task = { mode: "heartbeat" }) {
    this._trace("engine:start", { task });
    return this.engine.run(task);
  }

  debugReport(extra = {}) {
    const snapshot = this.organismSnapshot();
    const base = {
      id: this.id,
      epoch: OrganismMeta.evo.epoch,
      meta: this.meta
    };

    const report = formatDebugReport({
      base,
      snapshot,
      extra
    });

    return formatDebugString(report);
  }

  getDb() {
    return getDb(this.deps);
  }

  getFs() {
    return getFsAPI(this.deps);
  }

  getRoutes() {
    return getRouteAPI(this.deps);
  }

  getSchemas() {
    return getSchemaAPI(this.deps);
  }

  emitDepsPacket(packet) {
    return emitDepsPacket(this.deps, packet);
  }

  _trace(event, payload) {
    if (!this.trace) return;
    console.log(`[${this.id}] ${event}`, payload);
  }
}

// ============================================================================
//  PREWARM WRAPPER — v24 IMMORTAL+++
// ============================================================================
export function prewarmAIOrganism({ trace = false } = {}) {
  try {
    prewarmDepsLayer();
    prewarmDiagnosticsOrgan();
    prewarmDiagnosticsWriteOrgan();
    prewarmScribe();

    prewarmEmotionEngine();
    prewarmDeliveryEngine();

    prewarmContextEngine();
    prewarmCognitiveFrame();
    prewarmAICortex();

    emitDepsPacket();
    formatDebugReport({ trace: ["organism-prewarm"] }, null);
    formatDebugString({ trace: ["organism-prewarm"] }, null);

    return true;
  } catch (err) {
    console.error("[AIOrganism Prewarm v24+++] Failed:", err);
    return false;
  }
}

// ============================================================================
//  FACTORY
// ============================================================================
export function createAIOrganism(config = {}) {
  prewarmAIOrganism({ trace: !!config.trace });
  return new AIOrganism(config);
}

// ============================================================================
//  DUAL‑MODE EXPORTS
// ============================================================================
export default createAIOrganism;

if (typeof module !== "undefined") {
  module.exports = {
    AIOrganism,
    createAIOrganism,
    OrganismMeta
  };
}
