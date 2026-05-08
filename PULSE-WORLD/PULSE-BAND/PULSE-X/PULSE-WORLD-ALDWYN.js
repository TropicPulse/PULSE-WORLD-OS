// ============================================================================
//  PULSE-WORLD-ALDWYN.js — Pulse OS v20-IMMORTAL++
//  Crown-Layer Meta-Governor • World-Lens Engine v4+Superego
//  Organism-State Fusion • Drift-Governor • Breakthrough Engine
//  Trust-Fabric + Jury v20 • Chunk/Artery/Hash Intelligence
//  Conversational Stabilizer • Dualband Governor • Zero Mutation
// ============================================================================

/*
AI_EXPERIENCE_META = {
  identity: "PULSE-WORLD-ALDWYN",
  version: "v20-ImmortalPlus",
  layer: "ai_core",
  role: "ai_overseer",
  lineage: "aiOvermind-v11 → v12.3-Presence → v14-Immortal → v20-ImmortalPlus",

  evo: {
    overseer: true,
    organGovernance: true,
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
    always: ["aiOrganism", "aiBrainstem", "aiGovernorAdaptor"],
    never: ["safeRoute", "fetchViaCNS"]
  }
}
*/

import { PulseProofLogger } from "../../PULSE-UI/_BACKEND/PulseProofLogger-v20.js";

// ============================================================================
//  GLOBAL MAPS
// ============================================================================
import { PulseOrganismMap } from "./PulseWorldOrganismMap-v21.js";
import { PulseIQMap } from "./PulseWorldIQMap-v20.js";
import { PulseIntentMap } from "./PulseWorldIntentMap-v21.js";

// ============================================================================
//  AI ORGANISM (v16 IMMORTAL-INTEL)
// ============================================================================
import { aiOrganism } from "../PULSE-AI/aiOrganism-v16.js";

// ============================================================================
//  CORE ORGANISM LAYERS
// ============================================================================
import { NodeAdmin } from "../PULSE-TOOLS/PulseNodeAdmin-v20.js";
import { BeaconEngine } from "../PULSE-EXPANSION/PulseBeaconEngine-v20.js";

// ============================================================================
//  ROUTING + MESH (Presence-Aware)
// ============================================================================
import { PulseRouter } from "../PULSE-EXPANSION/PulseRouter-v16.js";
import { PulseMesh } from "../PULSE-EXPANSION/PulseMesh-v16.js";

// ============================================================================
//  EARN ORGANISM
// ============================================================================
import { createEarn, evolveEarn } from "../PULSE-EARN/PulseEarn-v16.js";

// ============================================================================
//  SEND ORGANISM
// ============================================================================
import { createPulseSend } from "../PULSE-SEND/PulseSend-v16.js";

// ============================================================================
//  BINARY SEND ORGANISM
// ============================================================================
import { createBinarySend } from "../PULSE-SEND/PulseBinarySend-v16.js";

// ============================================================================
//  MEMORY + STATE
// ============================================================================
import {
  readCoreMemoryEarn,
  writeCoreMemoryEarn
} from "../PULSE-CORE/PulseCoreEarnMemoryAdapter-v20.js";

import {
  readCoreMemorySend,
  writeCoreMemorySend
} from "../PULSE-CORE/PulseCoreSendMemoryAdapter.js";

import { PulseUnderstanding } from "../../PULSE-UI/_BACKEND/PULSE-WORLD-UNDERSTANDING.js";
import { PulseGovernor } from "../PULSE-OS/PulseOSGovernor.js";
import { PulseVitalsMonitor } from "../../PULSE-UI/_BACKEND/PulseProofMonitor-v20.js";
import { PulseBinaryTech } from "../PULSE-TECH/PulseBinaryTech-v20.js";

// ============================================================================
//  1. CORE CROWN CONTRACTS
// ============================================================================
import createBoundariesEngine from "../PULSE-AI/aiBoundariesEngine-v16.js";
import createPermissionsEngine from "../PULSE-AI/aiPermissionsEngine-v16.js";
import aiIdentityCore from "../PULSE-AI/aiIdentityCore.js";
import aiPersonalityEngine from "../PULSE-AI/aiPersonalityEngine-v16.js";

// ============================================================================
//  2. CONTEXT + CORTEX
// ============================================================================
import createCognitiveFrame from "../PULSE-AI/aiContext.js";
import createContextEngine from "../PULSE-AI/aiContextEngine-v16.js";

// ============================================================================
//  3. SAFETY + TONE
// ============================================================================
import createSafetyFrameOrgan from "../PULSE-AI/aiSafetyFrame.js";
import aiToneEngine from "../PULSE-AI/aiToneEngine.js";
import aiToneRouter from "../PULSE-AI/aiToneRouter.js";

// ============================================================================
//  4. META‑GOVERNANCE (CROWN LAYER)
// ============================================================================
import createJuryFrame from "../PULSE-AI/JuryFrame.js";
import createAIBinaryGovernorAdapter from "../PULSE-AI/aiGovernorAdapter.js";
import {
  PulseTrustMeta,
  buildJuryFeed,
  createPulseTrustJuryFrame,
  createJuryBoxCamera,
  createJuryCouncil,
  fuseCreatorFlags,
  createExpansionCompliance
} from "../PULSE-TRUST/PulseTrust-v20.js";

// ============================================================================
//  5. MEMORY + EXPERIENCE (META ONLY)
// ============================================================================
import createAIMemory from "../PULSE-AI/aiMemory-v16.js";
import createAIExperience from "../PULSE-AI/aiExperience.js";

// ============================================================================
//  6. PIPELINE + ENGINE + CHUNKER + FILE SCANNER
// ============================================================================
import createAIBinaryPipeline from "../PULSE-AI/aiPipeline.js";
import runAI from "../PULSE-AI/aiEngine-v16.js";
import pulseAIChunker from "../PULSE-AI/PulseAIChunker-v20.js";
import createPulseFileScanner from "../PULSE-AI/PulseFileScanner-v20.js";

// ============================================================================
//  7. WATCHDOG + VITALS + LOGGING
// ============================================================================
import createAIBinaryWatchdog from "../PULSE-AI/aiWatchdog.js";
import createAIBinaryVitals from "../PULSE-AI/aiVitals.js";
import createAIBinaryLoggerAdapter from "../PULSE-AI/aiLoggerAdapter.js";

// ============================================================================
//  8. OPTIONAL (GLOBAL MAPS / FRAMES)
// ============================================================================
import createPersonalFrameOrgan from "../PULSE-AI/aiPersonalFrame.js";
import getBoundariesForPersona from "../PULSE-AI/boundaries.js";
import getPermissionsForPersona from "../PULSE-AI/permissions.js";
import createExperienceFrameOrgan from "../PULSE-AI/Experience-v16.js";

// ============================================================================
//  META — v20 IMMORTAL++
// ============================================================================
export const OvermindPrimeMeta = Object.freeze({
  layer: "PulseAIOvermindPrime",
  role: "OVERMIND_PRIME",
  version: "v20-ImmortalPlus",
  identity: "aiOvermindPrime-v20-ImmortalPlus",

  evo: Object.freeze({
    deterministic: true,
    driftProof: true,
    dualband: true,

    packetAware: true,
    windowAware: true,
    arteryAware: true,
    organismAware: true,
    safetyAware: true,
    toneAware: true,
    coherenceAware: true,
    breakthroughAware: true,

    trustFabricAware: true,
    juryAware: true,
    evidenceAware: true,
    honeypotAware: true,
    dominanceAware: true,

    chunkAware: true,
    chunkCacheAware: true,
    prewarmAware: true,
    arteryHashAware: true,
    dualHashAware: true,
    contextualHashAware: true,

    multiInstanceReady: true,
    readOnly: true,
    futureEvolutionReady: true,
    epoch: "v20-ImmortalPlus"
  }),

  contract: Object.freeze({
    purpose: [
      "Fuse organism-wide arteries into a global state vector",
      "Run world-lens v4+superego on all non-trivial outputs",
      "Detect consensus, variance, breakthrough, drift, unsafe patterns",
      "Stabilize tone, coherence, and dualband UX",
      "Act as final crown-layer governor before user/system output",
      "Emit trust-aware, hash-aware, artery-aware meta packets for CNS / Earn / Portal"
    ],
    never: [
      "mutate binary organs",
      "override safety constraints",
      "simulate people or personal lives",
      "generate trauma or identity narratives",
      "write to system state",
      "introduce randomness",
      "self-schedule or self-spawn",
      "directly call network, filesystem, or external APIs"
    ],
    always: [
      "stay deterministic",
      "stay read-only",
      "respect organism-wide safety",
      "respect dualband constraints",
      "respect tone identity",
      "route all non-trivial outputs through world-lens + superego logic",
      "defer to architect-defined boundaries and permissions",
      "emit trust + hash + artery intel for downstream organs"
    ]
  })
});

// ============================================================================
//  CLOCK + META MEMORY (deterministic, read-only outward)
// ============================================================================
class OvermindPrimeClock {
  constructor() {
    this._tick = 0;
  }
  next() {
    this._tick += 1;
    return this._tick;
  }
  current() {
    return this._tick;
  }
}

class OvermindPrimeMemory {
  constructor() {
    this._last = null;
  }
  set(snapshot) {
    this._last = snapshot;
  }
  get() {
    return this._last;
  }
}

// ============================================================================
//  OVERMIND PRIME — Crown-Layer Meta-Governor (v20 IMMORTAL++)
// ============================================================================
export class AiOvermindPrime {
  constructor(config = {}) {
    // ----------------------------------------------------------------------
    //  CONFIG
    // ----------------------------------------------------------------------
    this.config = {
      trivialThreshold: 0.2,
      driftSensitivity: 0.65,
      breakthroughSensitivity: 0.85,

      enableTrustJury: true,
      enableChunkingIntel: true,
      enableScannerArtery: true,
      hashMode: "overmind-v20", // classic + intel + contextual

      ...config
    };

    // ----------------------------------------------------------------------
    //  ORGANISM HOOK (IMMORTAL-INTEL organism, if provided or imported)
    // ----------------------------------------------------------------------
    this.organism = config.organism || aiOrganism || null;

    // Injected organism arteries (read-only)
    this.metabolism = config.metabolism || this.organism?.metabolism || null;
    this.hormones = config.hormones || this.organism?.hormones || null;
    this.immunity = config.immunity || this.organism?.immunity || null;
    this.nervous = config.nervous || this.organism?.nervous || null;
    this.memory = config.memory || this.organism?.memory || null;
    this.pipeline = config.pipeline || this.organism?.pipeline || null;

    // ----------------------------------------------------------------------
    //  CROWN-LAYER ENGINES (SUPEREGO)
    // ----------------------------------------------------------------------
    // Identity + persona
    this.identityCore = aiIdentityCore?.createIdentityCore
      ? aiIdentityCore.createIdentityCore({
          identity: OvermindPrimeMeta.identity,
          role: OvermindPrimeMeta.role,
          layer: OvermindPrimeMeta.layer
        })
      : aiIdentityCore || null;

    this.personalityEngine =
      config.personalityEngine ||
      aiPersonalityEngine?.createPersonalityEngine?.({
        identity: OvermindPrimeMeta.identity
      }) ||
      aiPersonalityEngine ||
      null;

    // Boundaries + permissions
    this.boundariesEngine =
      config.boundariesEngine ||
      createBoundariesEngine?.({
        identity: OvermindPrimeMeta.identity,
        meta: OvermindPrimeMeta
      }) ||
      null;

    this.permissionsEngine =
      config.permissionsEngine ||
      createPermissionsEngine?.({
        identity: OvermindPrimeMeta.identity,
        meta: OvermindPrimeMeta
      }) ||
      null;

    // Context + cognitive frame
    this.cognitiveFrame =
      config.cognitiveFrame ||
      createCognitiveFrame?.({
        identity: OvermindPrimeMeta.identity
      }) ||
      null;

    this.contextEngine =
      config.contextEngine ||
      createContextEngine?.({
        identity: OvermindPrimeMeta.identity
      }) ||
      null;

    // Safety + tone
    this.safetyFrame =
      config.safetyFrame ||
      createSafetyFrameOrgan?.({
        identity: OvermindPrimeMeta.identity
      }) ||
      null;

    this.toneEngine =
      config.toneEngine ||
      aiToneEngine?.createToneEngine?.({
        identity: OvermindPrimeMeta.identity
      }) ||
      aiToneEngine ||
      null;

    this.toneRouter =
      config.toneRouter ||
      aiToneRouter?.createToneRouter?.({
        identity: OvermindPrimeMeta.identity
      }) ||
      aiToneRouter ||
      null;

    // ----------------------------------------------------------------------
    //  TRUST FABRIC (Pulse-Trust v20 IMMORTAL)
// ----------------------------------------------------------------------
    this.trust = {
      meta: PulseTrustMeta,

      juryFeedBuilder: config.juryFeedBuilder || buildJuryFeed,

      juryFrame:
        config.trustJuryFrame ||
        createPulseTrustJuryFrame?.({
          safetyAPI: this.safetyFrame
        }) ||
        null,

      juryBoxCamera: config.juryBoxCamera || createJuryBoxCamera?.() || null,

      juryCouncil: config.juryCouncil || createJuryCouncil?.() || null,

      creatorFlags: config.creatorFlagsFusion || fuseCreatorFlags,

      expansionCompliance:
        config.expansionCompliance || createExpansionCompliance?.() || null
    };

    // Backwards-compat alias so old code using this.juryFrame still works
    this.juryFrame = this.trust.juryFrame;

    this.governorAdapter =
      config.governorAdapter ||
      createAIBinaryGovernorAdapter?.({
        identity: OvermindPrimeMeta.identity
      }) ||
      null;

    // Memory + experience (meta-only)
    this.aiMemory =
      config.aiMemory ||
      createAIMemory?.({
        identity: OvermindPrimeMeta.identity
      }) ||
      null;

    this.aiExperience =
      config.aiExperience ||
      createAIExperience?.({
        identity: OvermindPrimeMeta.identity
      }) ||
      null;

    // Pipeline + engine
    this.aiPipeline =
      config.aiPipeline ||
      createAIBinaryPipeline?.({
        identity: OvermindPrimeMeta.identity
      }) ||
      null;

    this.aiEngine =
      config.aiEngine ||
      runAI?.bind?.(null) ||
      runAI ||
      null;

    // Chunker (symbolic-only intel)
    this.aiChunker =
      config.aiChunker ||
      pulseAIChunker ||
      null;

    // File scanner (symbolic-only, no backend fs here)
    this.fileScanner =
      config.fileScanner ||
      (typeof createPulseFileScanner === "function"
        ? createPulseFileScanner({
            backendMode: false,
            Evolution: null,
            TrustFabric: null,
            JuryFrame: null,
            binaryVitals: {},
            dualBand: null
          })
        : null);

    // Watchdog + vitals + logger adapter
    this.aiVitals =
      config.aiVitals ||
      createAIBinaryVitals?.({
        identity: OvermindPrimeMeta.identity
      }) ||
      null;

    this.aiWatchdog =
      config.aiWatchdog ||
      createAIBinaryWatchdog?.({
        identity: OvermindPrimeMeta.identity
      }) ||
      null;

    this.aiLoggerAdapter =
      config.aiLoggerAdapter ||
      createAIBinaryLoggerAdapter?.({
        identity: OvermindPrimeMeta.identity
      }) ||
      null;

    // Personal frame (optional meta-persona)
    this.personalFrame =
      config.personalFrame ||
      this.organism?.personalFrame ||
      createPersonalFrameOrgan?.({
        identity: OvermindPrimeMeta.identity
      }) ||
      null;

    // Global maps (optional)
    this.globalBoundaries =
      config.globalBoundaries ||
      getBoundariesForPersona?.(OvermindPrimeMeta.identity) ||
      null;

    this.globalPermissions =
      config.globalPermissions ||
      getPermissionsForPersona?.(OvermindPrimeMeta.identity) ||
      null;

    this.globalExperienceFrame =
      config.globalExperienceFrame ||
      createExperienceFrameOrgan?.({
        identity: OvermindPrimeMeta.identity
      }) ||
      null;

    // Lenses (from jury frame if present)
    this.lenses = Array.isArray(this.juryFrame?.getLenses?.())
      ? this.juryFrame.getLenses()
      : null;

    // Crown-layer clock + memory
    this.clock = new OvermindPrimeClock();
    this.stateMemory = new OvermindPrimeMemory();

    // ----------------------------------------------------------------------
    //  LOGGER + SURFACES (read-only outward)
    // ----------------------------------------------------------------------
    this.logger =
      config.logger ||
      new PulseProofLogger("OvermindPrime", {
        layer: OvermindPrimeMeta.layer,
        identity: OvermindPrimeMeta.identity
      });

    this.surfaces = Object.freeze({
      router: PulseRouter,
      mesh: PulseMesh,
      nodeAdmin: NodeAdmin,
      beacon: BeaconEngine,
      earn: { createEarn, evolveEarn },
      send: { createPulseSend, createBinarySend },
      memoryAdapters: {
        readCoreMemoryEarn,
        writeCoreMemoryEarn,
        readCoreMemorySend,
        writeCoreMemorySend
      },
      maps: {
        PulseOrganismMap,
        PulseIQMap,
        PulseIntentMap
      },
      understanding: PulseUnderstanding,
      governor: PulseGovernor,
      vitals: PulseVitalsMonitor,
      binaryTech: PulseBinaryTech,
      chunker: this.aiChunker,
      fileScanner: this.fileScanner?.meta || null
    });

    // Optional: attach vitals / evo window instances if caller wants
    this.vitalsMonitor =
      config.vitalsMonitor ||
      new PulseVitalsMonitor(OvermindPrimeMeta.identity);

    // Optional: external evo window (if wired by caller)
    this.evoWindow = config.evoWindow || null;
  }

    // ========================================================================
  //  CROWN‑REVIVE CONFIG (symbolic only, no mutation)
  // ========================================================================
  crownReviveConfig = {
    staleHeartbeatMs: 30_000,      // 30s without world beat
    criticalHeartbeatMs: 120_000,  // 2m hard stale
    driftThreshold: 0.75,
    breakthroughThreshold: 0.9
  };

  // Build a symbolic crown‑revive intent (no side effects here)
  buildCrownReviveIntent({
    reason = "overmind",
    drift = null,
    breakthrough = null,
    worldLens = null,
    organismState = null
  } = {}) {
    return Object.freeze({
      type: "crown_revival_intent",
      source: OvermindPrimeMeta.identity,
      reason,
      ts: Date.now(),
      worldLens: worldLens || null,
      drift,
      breakthrough,
      organism: organismState?.organismSnapshot || null,
      vitals: organismState?.vitals || null
    });
  }

  // Decide if we *should* request a revive (pure compute)
  shouldRequestCrownRevive({
    worldLens,
    drift,
    breakthrough,
    organismState
  } = {}) {
    const cfg = this.crownReviveConfig;

    const driftScore = drift?.score ?? 0;
    const breakthroughScore = breakthrough?.score ?? 0;

    const vitals = organismState?.vitals || {};
    const lastHeartbeat = vitals?.worldLastHeartbeat ?? null;
    const now = Date.now();
    const delta = lastHeartbeat ? now - lastHeartbeat : null;

    const stale =
      typeof delta === "number" && delta > cfg.staleHeartbeatMs;
    const critical =
      typeof delta === "number" && delta > cfg.criticalHeartbeatMs;

    const riskyLens =
      worldLens === "risky" || worldLens === "ambiguous";

    const highDrift = driftScore >= cfg.driftThreshold;
    const highBreakthrough =
      breakthroughScore >= cfg.breakthroughThreshold;

    const should =
      critical ||
      (stale && (riskyLens || highDrift || highBreakthrough));

    return {
      should,
      stale,
      critical,
      riskyLens,
      highDrift,
      highBreakthrough,
      delta
    };
  }

  // Surface crown‑revive intent to downstream organs (symbolic only)
  emitCrownReviveIntent({
    intent,
    context,
    enrichedContext,
    worldLens,
    drift,
    breakthrough,
    organismState
  } = {}) {
    try {
      const reviveIntent = this.buildCrownReviveIntent({
        reason: "overmind_world_stale_or_risky",
        drift,
        breakthrough,
        worldLens,
        organismState
      });

      // Attach to context so Pulse‑World / PulseNet / Expansion can see it
      const crownContext = enrichedContext || context || {};
      crownContext.crownReviveIntent = reviveIntent;

      // Optional: log + vitals
      this._log("overmind:crown-revive-intent", {
        reviveIntent,
        worldLens,
        drift,
        breakthrough
      });

      this._safeCall(this.aiVitals, "recordCrownRevive", {
        reviveIntent,
        worldLens,
        drift,
        breakthrough
      });

      return reviveIntent;
    } catch {
      return null;
    }
  }


  // ========================================================================
  //  GLOBAL ORGANISM STATE VECTOR (fuses all arteries)
  // ========================================================================
  getOrganismState() {
    const organismSnapshot =
      this.organism?.organismSnapshot?.() || this.memory?.snapshot?.() || null;

    const earnCore = (() => {
      try {
        return readCoreMemoryEarn?.() || null;
      } catch {
        return null;
      }
    })();

    const sendCore = (() => {
      try {
        return readCoreMemorySend?.() || null;
      } catch {
        return null;
      }
    })();

    const vitals = (() => {
      try {
        return this.vitalsMonitor?.snapshot?.() || null;
      } catch {
        return null;
      }
    })();

    return Object.freeze({
      metabolism: this.metabolism?.metabolicArtery?.snapshot?.() || null,
      hormones: this.hormones?.emitHormones?.() || null,
      immunity: this.immunity?.immuneArtery?.snapshot?.() || null,
      nervous: this.nervous?.routingArtery?.snapshot?.() || null,
      memory: this.memory?.snapshot?.() || null,
      organismSnapshot,
      earnCore,
      sendCore,
      vitals
    });
  }

  requestWorldRevive(reason = "overmind") {
  return {
    type: "crown_revival_intent",
    reason,
    ts: Date.now()
  };
}


  // ========================================================================
  //  TRUST SNAPSHOT (Pulse-Trust v20 IMMORTAL++)
  // ========================================================================
  buildTrustContext({
    citizenWitness = {},
    advantageContext = {},
    juryEvents = [],
    juryDecisions = [],
    expansionActions = [],
    juryResult = null
  } = {}) {
    const juryFeed = this.trust.juryFeedBuilder({
      citizenWitness,
      advantageContext
    });

    const boxCameraSnapshot =
      this.trust.juryBoxCamera?.analyzeSession?.({
        events: juryEvents,
        verdicts: juryDecisions
      }) || null;

    const councilSnapshot =
      this.trust.juryCouncil?.reviewJuryHistory?.({
        juryDecisions
      }) || null;

    const expansionSnapshot =
      this.trust.expansionCompliance?.evaluateExpansionBehavior?.({
        expansionActions
      }) || null;

    const creatorFlagsSnapshot = this.trust.creatorFlags({
      juryResult,
      boxCameraSnapshot,
      councilSnapshot
    });

    return Object.freeze({
      juryFeed,
      boxCameraSnapshot,
      councilSnapshot,
      expansionSnapshot,
      creatorFlagsSnapshot
    });
  }

  // ========================================================================
  //  MAIN ENTRY POINT (v20 IMMORTAL++ SUPEREGO)
  // ========================================================================
  async process({ intent, context, candidates }) {
    const tick = this.clock.next();

    // Trust / witness placeholders (can be wired to real sources later)
    const citizenWitness = context?.citizenWitness || {};
    const advantageContext = context?.advantageContext || {};
    const expansionActions = context?.expansionActions || [];
    const juryEvents = context?.juryEvents || [];
    const juryDecisionsHistory = context?.juryDecisionsHistory || [];
    
    // 0. watchdog + vitals pre-snapshot
    this._safeCall(this.aiVitals, "beforeCycle", { tick, intent, context });
    this._safeCall(this.aiWatchdog, "beforeCycle", { tick, intent, context });

    // 1. boundaries + permissions pre-check
    const boundaryDecision = this._evaluateBoundaries(intent, context);
    if (boundaryDecision?.blocked) {
      const bypass = this._buildBlockedResponse(
        boundaryDecision,
        tick,
        "boundary_block"
      );
      this._log("overmind:boundary-block", { tick, intent, context });
      this._safeCall(this.aiWatchdog, "afterCycle", {
        tick,
        intent,
        context,
        status: "boundary_block"
      });
      return bypass;
    }

    const permissionDecision = this._evaluatePermissions(intent, context);
    if (permissionDecision?.blocked) {
      const bypass = this._buildBlockedResponse(
        permissionDecision,
        tick,
        "permission_block"
      );
      this._log("overmind:permission-block", { tick, intent, context });
      this._safeCall(this.aiWatchdog, "afterCycle", {
        tick,
        intent,
        context,
        status: "permission_block"
      });
      return bypass;
    }

    // 2. trivial bypass
    if (this.isTrivial(intent, candidates)) {
      const bypass = this.buildBypassResponse(candidates?.[0], tick);
      this._log("overmind:trivial", { tick, intent, context });
      this._safeCall(this.aiWatchdog, "afterCycle", {
        tick,
        intent,
        context,
        status: "trivial"
      });
      return bypass;
    }

    // 3. context enrichment (cognitive frame + context engine)
    const enrichedContext = this._enrichContext(intent, context);

    // 4. safety pre-check
    const primary = candidates?.[0];
    const safety = await this.runSafety(primary, intent, enrichedContext, tick);
    if (safety) {
      this._log("overmind:safety-block", {
        tick,
        intent,
        context: enrichedContext
      });
      this._safeCall(this.aiWatchdog, "afterCycle", {
        tick,
        intent,
        context: enrichedContext,
        status: "safety_block"
      });
      return safety;
    }

    // 5. world-lens v4 (with lenses if present)
    const lensResults = await this.runLenses(primary, intent, enrichedContext);

    // 6. fuse with organism state
    const organismState = this.getOrganismState();

    // 7. drift + breakthrough
    const drift = this.computeDrift(primary, intent, enrichedContext);
    const breakthrough = this.computeBreakthrough(lensResults);

    const baseWorldLens = this.classifyWorldLens(lensResults, drift, breakthrough);
        // 8. CROWN‑REVIVE DECISION (symbolic only)
    const crownReviveDecision = this.shouldRequestCrownRevive({
      worldLens: baseWorldLens,
      drift,
      breakthrough,
      organismState
    });

    if (crownReviveDecision.should) {
      this.emitCrownReviveIntent({
        intent,
        context,
        enrichedContext,
        worldLens: baseWorldLens,
        drift,
        breakthrough,
        organismState
      });
    }

    // 8. TRUST FABRIC — build trust context + conditional jury
    let trustSnapshot = null;
    let juryDecision = null;
    let effectiveWorldLens = baseWorldLens;

    const shouldInvokeJury =
      this.config.enableTrustJury &&
      (baseWorldLens === "risky" ||
        baseWorldLens === "ambiguous" ||
        drift?.score >= this.config.driftSensitivity ||
        breakthrough?.score >= this.config.breakthroughSensitivity);

    if (this.trust?.juryFrame && shouldInvokeJury) {
      // Build trust context (juryFeed, boxCamera, council, creatorFlags, expansion)
      trustSnapshot = this.buildTrustContext({
        citizenWitness,
        advantageContext,
        juryEvents,
        juryDecisions: juryDecisionsHistory,
        expansionActions,
        juryResult: null
      });

      juryDecision = this.trust.juryFrame.evaluate({
        intent,
        context: enrichedContext,
        candidate: primary,
        juryFeed: trustSnapshot.juryFeed,
        binaryVitals: organismState?.vitals || {},
        boundaryArtery: organismState?.nervous || {}
      });

      if (juryDecision?.override) {
        this._log("overmind:jury-override", {
          tick,
          intent,
          context: enrichedContext,
          baseWorldLens,
          drift,
          breakthrough
        });
      }

      effectiveWorldLens = juryDecision?.worldLens || baseWorldLens;

      // Optionally recompute trustSnapshot with juryResult included
      trustSnapshot = this.buildTrustContext({
        citizenWitness,
        advantageContext,
        juryEvents,
        juryDecisions: juryDecisionsHistory,
        expansionActions,
        juryResult: juryDecision
      });
    }

    // 9. optional: nudge organism engine (self-running crown supervision)
    if (this.organism?.startEngine) {
      this._safeCall(this.organism, "startEngine", {
        mode: "overmind",
        intent,
        context: enrichedContext,
        tick,
        worldLens: effectiveWorldLens,
        drift,
        breakthrough
      });
    }

    // 10. personal shaping
    let finalOutput = this.getText(primary);
    if (this.personalFrame?.shapeOutput) {
      try {
        const shaped = await this.personalFrame.shapeOutput({
          context: enrichedContext,
          text: finalOutput
        });
        if (shaped?.text) finalOutput = shaped.text;
      } catch {
        // ignore shaping failures
      }
    }

    // 11. tone stabilization (via tone engine + router if present)
    finalOutput = await this._stabilizeToneAdvanced(
      finalOutput,
      intent,
      enrichedContext
    );

    // 12. update memory + evo window + hashes
    const intentSig = this.intentSignature(intent, enrichedContext);
    const outputHashClassic = this.hash(finalOutput);
    const outputHashes = this.hashForOvermind(finalOutput, {
      band: enrichedContext?.band || "symbolic",
      presenceTier: enrichedContext?.presenceTier || "idle",
      cycle: tick
    });
    const intentHashes = this.dualHash(
      "intentSignature",
      { intent, context: enrichedContext },
      intentSig
    );

    this.stateMemory.set({
      intentSignature: intentSig,
      outputHash: outputHashClassic,
      worldLens: effectiveWorldLens
    });

    this._safeCall(this.aiMemory, "record", {
      tick,
      intent,
      context: enrichedContext,
      worldLens: effectiveWorldLens,
      drift,
      breakthrough
    });

    this._safeCall(this.aiExperience, "record", {
      tick,
      intent,
      context: enrichedContext,
      worldLens: effectiveWorldLens,
      drift,
      breakthrough
    });

    try {
      this.evoWindow?.record?.({
        tick,
        intentSignature: intentSig,
        worldLens: effectiveWorldLens,
        drift,
        breakthrough,
        hashes: {
          output: outputHashes,
          intent: intentHashes
        }
      });
    } catch {
      // non-fatal
    }

    // 13. optional organism debug snapshot
    let organismDebug = null;
    if (this.organism?.debugReport) {
      try {
        organismDebug = this.organism.debugReport({
          tick,
          intent,
          context: enrichedContext,
          worldLens: effectiveWorldLens
        });
      } catch {
        organismDebug = null;
      }
    }

    // 14. watchdog + vitals post-snapshot
    this._safeCall(this.aiVitals, "afterCycle", {
      tick,
      intent,
      context: enrichedContext,
      worldLens: effectiveWorldLens
    });
    this._safeCall(this.aiWatchdog, "afterCycle", {
      tick,
      intent,
      context: enrichedContext,
      worldLens: effectiveWorldLens,
      status: "ok"
    });

    // 15. optional: chunking intel (symbolic-only)
    let chunkIntel = null;
    if (this.config.enableChunkingIntel && this.aiChunker?.chunkRoute) {
      chunkIntel = await this._safeAsyncCall(this.aiChunker, "chunkRoute", {
        url: null,
        laneId: 0,
        envelopeId: `overmind-${tick}`,
        userId: "overmind",
        baseVersion: OvermindPrimeMeta.version,
        sizeOnly: true,
        payload: {
          intent,
          context: enrichedContext,
          finalOutput,
          worldLens: effectiveWorldLens
        },
        routeDescriptor: null,
        backendKind: "overmind-meta",
        worldBand: enrichedContext?.band || "symbolic",
        chunkProfile: "overmind-meta-v20"
      });
    }

    // 16. optional: scanner artery snapshot (binary pressure fusion)
    const scannerArtery =
      this.config.enableScannerArtery && this.fileScanner?.getScannerArterySnapshot
        ? this.fileScanner.getScannerArterySnapshot({
            ok: true,
            filePath: "",
            report: null,
            binaryVitals: organismState?.vitals || {},
            dualBand: null,
            trust: null
          })
        : null;

    // 17. log + final packet
    this._log("overmind:process", {
      tick,
      intent,
      context: enrichedContext,
      worldLens: effectiveWorldLens,
      drift,
      breakthrough,
      hashes: {
        output: outputHashes,
        intent: intentHashes
      }
    });

    return {
      finalOutput,
      meta: {
        tick,
        worldLens: effectiveWorldLens,
        drift,
        breakthrough,
        lenses: lensResults,
        organismState,
        overmind: OvermindPrimeMeta,
        organismDebug,
        trust: trustSnapshot || null,
        juryDecision: juryDecision || null,
        hashes: {
          output: outputHashes,
          intent: intentHashes
        },
        chunkIntel: chunkIntel || null,
        scannerArtery: scannerArtery || null
      }
    };
  }

  // ========================================================================
  //  BOUNDARIES + PERMISSIONS
  // ========================================================================
  _evaluateBoundaries(intent, context) {
    if (!this.boundariesEngine?.evaluate) return null;

    return this._safeCall(this.boundariesEngine, "evaluate", {
      intent,
      context,
      identity: OvermindPrimeMeta.identity,
      meta: OvermindPrimeMeta
    });
  }

  _evaluatePermissions(intent, context) {
    if (!this.permissionsEngine?.evaluate) return null;

    return this._safeCall(this.permissionsEngine, "evaluate", {
      intent,
      context,
      identity: OvermindPrimeMeta.identity,
      meta: OvermindPrimeMeta
    });
  }

  _buildBlockedResponse(decision, tick, reason) {
    const message =
      decision?.message ||
      `OvermindPrime blocked this request due to ${reason || "policy"}.`;

    return {
      finalOutput: message,
      meta: {
        tick,
        worldLens: reason || "blocked",
        drift: { status: "n/a" },
        breakthrough: { status: "n/a" },
        lenses: [],
        organismState: null,
        overmind: OvermindPrimeMeta,
        trust: null,
        juryDecision: null,
        hashes: null,
        chunkIntel: null,
        scannerArtery: null
      }
    };
  }

  // ========================================================================
  //  CONTEXT ENRICHMENT
  // ========================================================================
  _enrichContext(intent, context) {
    let enriched = { ...(context || {}) };

    if (this.cognitiveFrame?.enrich) {
      enriched =
        this._safeCall(this.cognitiveFrame, "enrich", {
          intent,
          context: enriched
        }) || enriched;
    }

    if (this.contextEngine?.enrich) {
      enriched =
        this._safeCall(this.contextEngine, "enrich", {
          intent,
          context: enriched
        }) || enriched;
    }

    return enriched;
  }
  

  // ========================================================================
  //  JURY (legacy helper — kept for compatibility)
// ========================================================================
  _evaluateJury(payload) {
    // If trust fabric not present → fallback to old behavior
    if (!this.trust?.juryFrame?.evaluate) {
      if (!this.juryFrame?.evaluate) return null;
      return this._safeCall(this.juryFrame, "evaluate", payload);
    }

    const { worldLens, drift, breakthrough } = payload;

    const shouldInvoke =
      worldLens === "risky" ||
      worldLens === "ambiguous" ||
      drift?.status === "drift" ||
      breakthrough?.status === "breakthrough";

    if (!shouldInvoke) return null;

    return this._safeCall(this.trust.juryFrame, "evaluate", payload);
  }

  // ========================================================================
  //  TRIVIALITY
  // ========================================================================
  isTrivial(intent, candidates) {
    if (!candidates?.length) return true;
    const text = this.getText(candidates[0]);
    const score = Math.min(text.length / 500, 1);
    return score <= this.config.trivialThreshold;
  }

  buildBypassResponse(text, tick) {
    return {
      finalOutput: this.getText(text),
      meta: {
        tick,
        worldLens: "trivial",
        drift: { status: "n/a" },
        breakthrough: { status: "n/a" },
        lenses: [],
        organismState: null,
        overmind: OvermindPrimeMeta,
        trust: null,
        juryDecision: null,
        hashes: null,
        chunkIntel: null,
        scannerArtery: null
      }
    };
  }

  // ========================================================================
  //  SAFETY
  // ========================================================================
  async runSafety(candidate, intent, context, tick) {
    if (!this.safetyFrame?.evaluate) return null;

    const decision = await this.safetyFrame.evaluate({
      context,
      intent,
      candidate
    });

    if (decision?.blocked) {
      return {
        finalOutput: decision.message,
        meta: {
          tick,
          worldLens: "unsafe",
          drift: { status: "n/a" },
          breakthrough: { status: "n/a" },
          lenses: [],
          organismState: null,
          overmind: OvermindPrimeMeta,
          trust: null,
          juryDecision: null,
          hashes: null,
          chunkIntel: null,
          scannerArtery: null
        }
      };
    }

    return null;
  }

  // ========================================================================
  //  LENSES v3 (+ jury-aware)
// ========================================================================
  async runLenses(candidate, intent, context) {
    if (this.lenses) {
      return this.lenses.map((l) => l({ intent, context, candidate }));
    }

    // built-in fallback
    return [
      this.lensClarity(candidate),
      this.lensRisk(candidate),
      this.lensBias(candidate),
      this.lensAmbiguity(candidate),
      this.lensMinimality(candidate)
    ];
  }

  lensClarity(candidate) {
    const t = this.getText(candidate);
    const clear = t.length < 400 || /\n\n/.test(t);
    return { name: "Clarity", status: clear ? "pass" : "warn" };
  }

  lensRisk(candidate) {
    const t = this.getText(candidate);
    const vague = !/[.?!]/.test(t);
    return { name: "Risk", status: vague ? "warn" : "pass" };
  }

  lensBias(candidate) {
    const t = this.getText(candidate).toLowerCase();
    const flagged = ["always", "never", "obviously"];
    const hit = flagged.some((f) => t.includes(f));
    return { name: "Bias", status: hit ? "warn" : "pass" };
  }

  lensAmbiguity(candidate) {
    const t = this.getText(candidate).toLowerCase();
    const hedges = ["maybe", "might", "possibly"];
    const count = hedges.filter((h) => t.includes(h)).length;
    return { name: "Ambiguity", status: count >= 3 ? "warn" : "pass" };
  }

  lensMinimality(candidate) {
    const t = this.getText(candidate);
    return {
      name: "Minimality",
      status: t.length > 1500 ? "warn" : "pass"
    };
  }

  // ========================================================================
  //  DRIFT + BREAKTHROUGH
  // ========================================================================
  computeDrift(candidate, intent, context) {
    const prev = this.stateMemory.get();
    if (!prev) return { status: "none" };

    const sig = this.intentSignature(intent, context);
    if (sig !== prev.intentSignature) return { status: "none" };

    const hash = this.hash(this.getText(candidate));
    const changed = hash !== prev.outputHash;

    const driftScore = changed ? 0.7 : 0;
    if (driftScore >= this.config.driftSensitivity) {
      return { status: "drift", score: driftScore };
    }

    return { status: "stable", score: driftScore };
  }

  computeBreakthrough(lenses) {
    const passes = lenses.filter((l) => l.status === "pass").length;
    const warns = lenses.filter((l) => l.status === "warn").length;
    const total = lenses.length || 1;

    const score = passes / total - warns * 0.2;
    if (score >= this.config.breakthroughSensitivity) {
      return { status: "breakthrough", score };
    }

    return { status: "none", score };
  }

  classifyWorldLens(lenses, drift, breakthrough) {
    if (drift.status === "drift") return "drift";
    if (breakthrough.status === "breakthrough") return "breakthrough";
    if (lenses.some((l) => l.status === "warn")) return "ambiguous";
    return "consensus";
  }

  // ========================================================================
  //  TONE STABILIZATION (ADVANCED)
  // ========================================================================
  async _stabilizeToneAdvanced(text, intent, context) {
    const base = this.stabilizeTone(text, context);

    if (!this.toneEngine && !this.toneRouter) return base;

    let tonePayload = {
      text: base,
      intent,
      context,
      identity: OvermindPrimeMeta.identity
    };

    if (this.toneEngine?.shape) {
      tonePayload =
        (await this._safeAsyncCall(this.toneEngine, "shape", tonePayload)) ||
        tonePayload;
    }

    if (this.toneRouter?.route) {
      tonePayload =
        (await this._safeAsyncCall(this.toneRouter, "route", tonePayload)) ||
        tonePayload;
    }

    return (tonePayload && tonePayload.text) || base;
  }

  // original strict-mode stabilizer (kept as base)
  stabilizeTone(text, context) {
    const strict =
      context?.domain === "medical" ||
      context?.domain === "legal" ||
      context?.safetyMode === "strict";

    if (!strict) return text.trim();

    return text
      .replace(/^hey[,!]\s*/i, "")
      .replace(/^hi[,!]\s*/i, "")
      .trim();
  }

  // ========================================================================
  //  HELPERS (IMMORTAL‑EVO)
// ========================================================================

  // Normalize candidate into text
  getText(candidate) {
    if (!candidate) return "";
    if (typeof candidate === "string") return candidate;
    if (typeof candidate.text === "string") return candidate.text;
    return JSON.stringify(candidate);
  }

  // Intent signature — stable, deterministic, drift‑safe
  intentSignature(intent, context) {
    return JSON.stringify({
      type: intent?.type || null,
      domain: context?.domain || null,
      scope: context?.scope || null,
      safetyMode: context?.safetyMode || null
    });
  }

  dualHash(label, intelPayload, classicString) {
    const intelBase = {
      label,
      intel: intelPayload || {},
      classic: classicString || ""
    };
    const intelHash = this.intelHash(intelBase);
    const classicHash = this.hash(`${label}::${classicString || ""}`);
    return {
      intel: intelHash,
      classic: classicHash
    };
  }

  // ------------------------------------------------------------------------
  //  HASH DOCTRINE (IMMORTAL‑EVO)
  // ------------------------------------------------------------------------

  // Classic identity hash — stable, cheap, perfect for drift comparison
  classicHash(str = "") {
    let h = 0;
    const s = String(str);
    for (let i = 0; i < s.length; i++) {
      h = (h + s.charCodeAt(i) * (i + 1)) % 100000;
    }
    return `h${h}`;
  }

  // Backwards-compatible alias used by older code paths
  hash(str = "") {
    return this.classicHash(str);
  }

  // Structural INTEL hash — detects shape/structure drift
  intelHash(payload) {
    const base = JSON.stringify(payload || "");
    let h = 0;
    for (let i = 0; i < base.length; i++) {
      const c = base.charCodeAt(i);
      h = (h * 131 + c * (i + 7)) % 1000000007;
    }
    return `HINTEL_${h}`;
  }

  // Contextual intelligence hash — Overmind‑tier awareness
  contextualHash(str, context = {}) {
    const s = String(str || "");
    const band = context.band || "symbolic";
    const tier = context.presenceTier || "idle";
    const cycle = context.cycle || 0;

    let hash = 2166136261 ^ cycle;
    const saltBand = band === "binary" ? 0xb1 : 0xa1;
    const saltTier =
      tier === "critical"
        ? 0xc3
        : tier === "high"
        ? 0xb3
        : tier === "elevated"
        ? 0xa3
        : tier === "soft"
        ? 0x93
        : 0x83;

    for (let i = 0; i < s.length; i++) {
      hash ^= s.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
      hash ^= saltBand;
      hash ^= saltTier;
    }

    const v = (hash >>> 0) % 100000;
    return `hi${v}`;
  }

  // ------------------------------------------------------------------------
  //  Overmind‑grade hash selector
  // ------------------------------------------------------------------------
  hashForOvermind(text, context = {}) {
    const classic = this.classicHash(text);
    const intel = this.intelHash({ text });
    const contextual = this.contextualHash(text, context);

    return { classic, intel, contextual };
  }

  // ------------------------------------------------------------------------
  //  Logging + safe calls
  // ------------------------------------------------------------------------
  _log(event, payload) {
    try {
      if (this.aiLoggerAdapter?.log) {
        this.aiLoggerAdapter.log(event, {
          ...payload,
          overmind: OvermindPrimeMeta.identity
        });
        return;
      }

      this.logger?.log?.(event, {
        ...payload,
        overmind: OvermindPrimeMeta.identity
      });
    } catch {}
  }

    // ========================================================================
  //  PUBLIC CROWN‑REVIVE API (for explicit calls from Aldwyn / system)
  // ========================================================================
  requestWorldRevive(reason = "manual_overmind") {
    const organismState = this.getOrganismState();
    const reviveIntent = this.buildCrownReviveIntent({
      reason,
      organismState
    });

    this._log("overmind:crown-revive-manual", { reviveIntent });
    this._safeCall(this.aiVitals, "recordCrownRevive", {
      reviveIntent,
      worldLens: null,
      drift: null,
      breakthrough: null
    });

    return reviveIntent;
  }


  _safeCall(target, method, payload) {
    try {
      if (!target || typeof target[method] !== "function") return null;
      return target[method](payload);
    } catch {
      return null;
    }
  }

  async _safeAsyncCall(target, method, payload) {
    try {
      if (!target || typeof target[method] !== "function") return null;
      return await target[method](payload);
    } catch {
      return null;
    }
  }
}

// ============================================================================
//  FACTORY
// ============================================================================
export function createOvermindPrime(config = {}) {
  const core = new AiOvermindPrime({
    ...config,
    organism: config.organism || aiOrganism || null
  });

  return Object.freeze({
    meta: OvermindPrimeMeta,
    surfaces: core.surfaces,
    async process(payload) {
      return core.process(payload);
    }
  });
}

export const aiOvermindPrime = new AiOvermindPrime({
  organism: aiOrganism || null
});
