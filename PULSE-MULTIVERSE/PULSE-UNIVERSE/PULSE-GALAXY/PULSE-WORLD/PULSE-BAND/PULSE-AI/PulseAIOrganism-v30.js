// ============================================================================
//  aiOrganism-v30-IMMORTAL+++.js — Pulse OS v30-IMMORTAL+++ Organism
//  Dualband Organism Bootloader • Canonical Assembly • Trust/Artery/CNS/Spine Aware
//  Environment-Agnostic • Mapless • Binary-Centric
// ============================================================================

import { createAIBinaryAgent } from "./PulseAIBinaryAgent-v30.js";
import { createAIMemory } from "./PulseAIMemory-v24.js";
import { createAIBinaryPipeline } from "./PulseAIPipeline-v30.js";
import { createAIBinaryReflex } from "./PulseAIlseAIReflex-v24.js";
import { createAIBinaryLoggerAdapter } from "./PulseAILoggerAdapter-v24.js";
import { createAIBinaryPageScannerAdapter } from "./PulseAIPageScannerAdapter-v24.js";
import { createAIBinaryEvolution } from "./PulseAIBinaryEvolution-v24.js";
import { createAIBinaryGovernorAdapter } from "./PulseAIGovernorAdapter-v30.js";
import { createAIBinaryOrganRegistry } from "./PulseAIBinaryOrganRegistry-v24.js";
import { createAIConductor as createAIBinaryConductor } from "./PulseAIConductor-v30.js";
import { createAIBinaryMetabolism } from "./PulseAIMetabolism-v24.js";
import { createAIBinaryHormones } from "./PulseAIHormones-v30.js";
import { createAIBinaryImmunity } from "./PulseAIImmunity-v24.js";
import { createAIBinaryNervousSystem } from "./PulseAINervousSystem-v24.js";
import { createAIBinarySentience } from "./PulseAISentience-v30.js";
import { createAIBinaryConsciousness } from "./PulseAIConsciousness-v30-IMMORTAL+++.js";

import { createPersonaEngine } from "./PulseAIPersonality-v24.js";
import { createBoundariesEngine } from "./PulseAIBoundaries-v30.js";
import { createPermissionsEngine } from "./PulseAIPermissions-v24.js";

import createCognitiveFrame, {
  COGNITIVE_FRAME_META,
  prewarmCognitiveFrame
} from "./PulseAIContext-v30.js";

import {
  createContextEngine,
  prewarmContextEngine
} from "./PulseAIContextEngine-v24.js";

import {
  createCortex,
  prewarmAICortex
} from "./PulseAICortex-v24.js";

import aiEmotionEngine, {
  prewarmEmotionEngine
} from "./PulseAIEmotionEngine-v24.js";

import createExperienceEngine from "./PulseAIExperience-v30.js";
import { createPersonalityEngine } from "./PulseAIPersonalityEngine-v24.js";
import { createPersonalFrame } from "./PulseAIPersonalFrame-v24.js";

import aiDeliveryEngine, {
  prewarmDeliveryEngine
} from "./PulseAIDeliveryEngine-v24.js";

import { aiEvolutionEngine } from "./PulseAIEvolutionEngine-v24.js";
import { aiDualBand } from "./PulseAIDualBand-v30.js";

import {
  SCRIBE_META,
  formatDebugReport,
  formatDebugString,
  prewarmScribe
} from "./PulseAIDebug-v24.js";

import {
  DiagnosticsMeta,
  createDiagnosticsState,
  attachDiagnosticsOrgan,
  createDiagnosticsAPI,
  prewarmDiagnosticsOrgan
} from "./PulseAIDiagnostics-v24.js";

import {
  DiagnosticsWriteMeta,
  createDiagnosticsWriteOrgan,
  prewarmDiagnosticsWriteOrgan
} from "./PulseAIDiagnosticsWrite-v24.js";

import depsSurface, {
  DepsMeta,
  getDb,
  getFsAPI,
  getRouteAPI,
  getSchemaAPI,
  getOrganismSnapshot,
  emitDepsPacket,
  prewarmDepsLayer
} from "./PulseAIDeps-v24.js";

import { runAI, ExecutionEngineMeta } from "./PulseAIEngine-v30.js";

// optional: if you have a dedicated delta organ
import { createAIBinaryDelta } from "./PulseAIBinaryDelta-v24.js";

// ============================================================================
//  META — v30-IMMORTAL+++
// ============================================================================

export const OrganismMeta = Object.freeze({
  identity: "ai-organism",
  version: "v30-IMMORTAL+++",
  layer: "organism",
  role: "dualband-organism",
  evo: {
    epoch: Date.now()
  }
});

// ============================================================================
//  ORGANISM ARTERY v30+++ (PURE, MAPLESS)
// ============================================================================

function clamp01(v) {
  const n = typeof v === "number" ? v : 0;
  return n < 0 ? 0 : n > 1 ? 1 : n;
}

function bucketMetabolic(pressure) {
  const v = clamp01(pressure);
  if (v >= 0.95) return "critical";
  if (v >= 0.8) return "high";
  if (v >= 0.5) return "medium";
  if (v > 0) return "low";
  return "none";
}

function computeOrganismArtery(self) {
  const registryCount = self.registry?.count?.() ?? 0;
  const metabolicPressure = clamp01(self.metabolism?.getPressure?.() ?? 0);
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
    registry:
      registryCount > 128
        ? "ultra"
        : registryCount > 64
        ? "high"
        : registryCount > 0
        ? "medium"
        : "none",
    metabolic: bucketMetabolic(metabolicPressure),
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
    cnsDiagnostics,
    spinalAdvantage,
    spinalPresence,
    spinalHealth,
    survivalMeta,
    survivalEvolutionCount
  });
}

// ============================================================================
//  AIOrganism v30-IMMORTAL+++
// ============================================================================

export class AIOrganism {
  constructor(config = {}) {
    this.id = config.id || OrganismMeta.identity;
    this.trace = !!config.trace;

    // ------------------------------------------------------------------------
    //  BINARY CORE
    // ------------------------------------------------------------------------

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

    this.sentience = createAIBinarySentience({
      id: "sentience",
      encoder: this.agent,
      anatomy: config.anatomy,
      genome: config.genome,
      immunity: null, // wired after immunity created
      vitals: config.vitals,
      registry: null, // wired after registry created
      logger: config.logger,
      pipeline: this.pipeline,
      reflex: this.reflex,
      trace: this.trace
    });

    this.hormones = createAIBinaryHormones({
      id: "hormones",
      encoder: this.agent,
      metabolism: this.metabolism,
      sentience: this.sentience,
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

    this.delta = createAIBinaryDelta({
      id: "delta",
      trace: this.trace
    });

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

    this.consciousness = createAIBinaryConsciousness({
      id: "consciousness",
      encoder: this.agent,
      sentience: this.sentience,
      metabolism: this.metabolism,
      hormones: this.hormones,
      vitals: config.vitals,
      anatomy: config.anatomy,
      immunity: this.immunity,
      cortex: null,
      logger: this.logger,
      pipeline: this.pipeline,
      reflex: this.reflex,
      trace: this.trace
    });

    // wire sentience dependencies that needed immunity/registry
    this.sentience.immunity = this.immunity;
    this.sentience.registry = this.registry;

    // ------------------------------------------------------------------------
    //  SUPEREGO / COMMANDMENTS
    // ------------------------------------------------------------------------

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

    // ------------------------------------------------------------------------
    //  COGNITIVE LAYER
    // ------------------------------------------------------------------------

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

    // ------------------------------------------------------------------------
    //  EMOTIONAL / IDENTITY
    // ------------------------------------------------------------------------

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

    // ------------------------------------------------------------------------
    //  SYMBOLIC EVOLUTION / DELIVERY / DUALBAND
    // ------------------------------------------------------------------------

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

    // ------------------------------------------------------------------------
    //  DIAGNOSTICS / DEPS / ENGINE
    // ------------------------------------------------------------------------

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

    // ------------------------------------------------------------------------
    //  EXTERNAL ORGANS (CNS / SPINAL / INSTINCTS)
//  config.cns                → PulseOSCNSNervousSystem surface
//  config.spinalCord         → PulseOSSpinalCord surface
//  config.survivalInstincts  → PulseOSSurvivalInstincts surface
    // ------------------------------------------------------------------------

    this.cns = config.cns || config.CNS || null;
    this.spinalCord = config.spinalCord || config.spine || null;
    this.survivalInstincts = config.survivalInstincts || null;

    // ------------------------------------------------------------------------
    //  META + ENGINE
    // ------------------------------------------------------------------------

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

    // ------------------------------------------------------------------------
    //  REGISTRATION + WIRING
    // ------------------------------------------------------------------------

    const organs = [
      // binary
      this.agent,
      this.memory,
      this.pipeline,
      this.reflex,
      this.metabolism,
      this.sentience,
      this.consciousness,
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

    // ------------------------------------------------------------------------
    //  PREWARM v30+++ (MAPLESS, PURE)
    // ------------------------------------------------------------------------

    prewarmCognitiveFrame(this.cognitiveFrame);
    prewarmContextEngine(this.contextEngine);
    prewarmAICortex(this.cortex);

    prewarmEmotionEngine(this.emotion);
    prewarmDeliveryEngine(this.delivery);

    prewarmDiagnosticsOrgan(this.diagnostics);
    prewarmDiagnosticsWriteOrgan(this.diagnosticsWrite);
    prewarmDepsLayer(this.deps);

    // external organs prewarm (no mutation, no routing)
    if (this.cns?.getDiagnostics) {
      try {
        this.cns.getDiagnostics();
      } catch {
        // CNS must never break organism
      }
    }

    if (this.spinalCord?.getSpinalAdvantageSnapshot) {
      try {
        this.spinalCord.getSpinalAdvantageSnapshot();
      } catch {
        // non-fatal
      }
    }

    if (this.survivalInstincts?.getEvolutionCount) {
      try {
        this.survivalInstincts.getEvolutionCount();
      } catch {
        // non-fatal
      }
    }

    if (config.autoRunEngine) {
      this.startEngine();
    }

    this.conductor.initialize(this.registry, this.evolution);

    this._trace("organism:initialized", {
      organCount: organs.length,
      epoch: OrganismMeta.evo.epoch
    });

    this._lastArtery = null;
  }

  // ========================================================================
  //  PUBLIC SURFACES
  // ========================================================================

  sense(event) {
    // Binary PageScanner path
    this.pageScannerAdapter._handleScannerEvent(event);

    // forward to CNS if present (pure event, no routing)
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
//  PREWARM ORGANISM v30-IMMORTAL+++
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

    if (trace) {
      console.log("[AIOrganism Prewarm v30-IMMORTAL+++] complete");
    }

    return true;
  } catch (err) {
    console.error("[AIOrganism Prewarm v30-IMMORTAL+++] Failed:", err);
    return false;
  }
}

export function createAIOrganism(config = {}) {
  prewarmAIOrganism({ trace: !!config.trace });
  return new AIOrganism(config);
}

export default createAIOrganism;

if (typeof module !== "undefined") {
  module.exports = {
    AIOrganism,
    createAIOrganism,
    prewarmAIOrganism,
    OrganismMeta
  };
}
