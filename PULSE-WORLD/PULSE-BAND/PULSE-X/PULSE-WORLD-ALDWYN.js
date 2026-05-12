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
import {
  OrganismIdentity,
  buildPulseOrganismMap as PulseOrganismMap,
  buildPulseOrganismMap as buildOrganismMap
} from "../PULSE-X/PULSE-WORLD-MAP.js";
const Identity = OrganismIdentity(import.meta.url);

// 2 — EXPORT GENOME METADATA
export const OvermindPrimeMeta = Identity.OrganMeta;
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
// export const WBC_CONTEXT = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;
import { PulseProofBridgeLogger as PulseProofLogger, PulseProofBridgeMonitor as PulseVitalsMonitor } from "../../PULSE-UI/_BACKEND/PULSE-WORLD-BRIDGE.js";

// ============================================================================
//  GLOBAL MAPS
// ============================================================================

import { PulseIQMap } from "./PULSE-WORLD-IQ.js";
import { PulseIntentMap } from "./PULSE-WORLD-INTENT.js";

// ============================================================================
//  AI ORGANISM (v16 IMMORTAL-INTEL)
// ============================================================================
import { aiOrganism } from "../PULSE-AI/aiOrganism-v24.js";

// ============================================================================
//  CORE ORGANISM LAYERS
// ============================================================================
import { NodeAdmin } from "../PULSE-TOOLS/PulseToolsNodeAdmin-v20.js";
import { BeaconEngine } from "../PULSE-EXPANSION/PulseExpansionBeaconEngine-v20.js";

// ============================================================================
//  ROUTING + MESH (Presence-Aware)
// ============================================================================
import { PulseRouter } from "../PULSE-EXPANSION/PULSE-EXPANSION-INTERNET-ROUTER.js";
import { PulseRouterMesh } from "../PULSE-ROUTER/PulseRouterMesh-v24.js";
import { PulseRouterEarn } from "../PULSE-ROUTER/PulseRouterEarn-v24.js";

// ============================================================================
//  EARN ORGANISM
// ============================================================================
import { createEarn, evolveEarn } from "../PULSE-EARN/PulseEarn-v24.js";

// ============================================================================
//  SEND ORGANISM
// ============================================================================
import { createPulseSend } from "../PULSE-SEND/PulseSend-v24.js";

// ============================================================================
//  BINARY SEND ORGANISM
// ============================================================================
import { createBinarySend } from "../PULSE-SEND/PulseSendBinary-v24.js";

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
} from "../PULSE-CORE/PulseCoreSendMemoryAdapter-v20.js";

import { PulseUnderstanding } from "./PULSE-WORLD-UNDERSTANDING.js";
import { PulseGovernor } from "../PULSE-OS/PulseOSGovernor-v24.js";
import { PulseBinaryTech } from "../PULSE-TECH/PulseTechBinary-v20.js";

// ============================================================================
//  1. CORE CROWN CONTRACTS
// ============================================================================
import createBoundariesEngine from "../PULSE-AI/aiBoundariesEngine-v24.js";
import createPermissionsEngine from "../PULSE-AI/aiPermissionsEngine-v24.js";
import aiIdentityCore from "../PULSE-AI/aiIdentityCore-v24.js";
import aiPersonalityEngine from "../PULSE-AI/aiPersonalityEngine-v24.js";

// ============================================================================
//  2. CONTEXT + CORTEX
// ============================================================================
import createCognitiveFrame from "../PULSE-AI/aiContext-v24.js";
import createContextEngine from "../PULSE-AI/aiContextEngine-v24.js";

// ============================================================================
//  3. SAFETY + TONE
// ============================================================================
import createSafetyFrameOrgan from "../PULSE-AI/aiSafetyFrame-v24.js";
import aiToneEngine from "../PULSE-AI/aiToneEngine-v24.js";
import aiToneRouter from "../PULSE-AI/aiToneRouter-v24.js";

// ============================================================================
//  4. META‑GOVERNANCE (CROWN LAYER)
// ============================================================================
import createJuryFrame from "../PULSE-AI/aiJuryFrame-v24.js";
import createAIBinaryGovernorAdapter from "../PULSE-AI/aiGovernorAdapter-v24.js";
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
import createAIMemory from "../PULSE-AI/aiMemory-v24.js";
import createAIExperience from "../PULSE-AI/aiExperience-v24.js";

// ============================================================================
//  6. PIPELINE + ENGINE + CHUNKER + FILE SCANNER
// ============================================================================
import createAIBinaryPipeline from "../PULSE-AI/aiPipeline-v24.js";
import runAI from "../PULSE-AI/aiEngine-v24.js";
import pulseAIChunker from "../PULSE-AI/PulseAIChunker-v24.js";
import createPulseFileScanner from "../PULSE-AI/PulseFileScanner-v24.js";

// ============================================================================
//  7. WATCHDOG + VITALS + LOGGING
// ============================================================================
import createAIBinaryWatchdog from "../PULSE-AI/aiWatchdog-v24.js";
import createAIBinaryVitals from "../PULSE-AI/aiVitals-v24.js";
import createAIBinaryLoggerAdapter from "../PULSE-AI/aiLoggerAdapter-v24.js";

// ============================================================================
//  8. OPTIONAL (GLOBAL MAPS / FRAMES)
// ============================================================================
import createPersonalFrameOrgan from "../PULSE-AI/aiPersonalFrame-v24.js";
import getBoundariesForPersona from "../PULSE-AI/aiBoundaries-v24.js";
import getPermissionsForPersona from "../PULSE-AI/aiPermissions-v24.js";
import createExperienceFrameOrgan from "../PULSE-AI/aiExperienceFrame-v24.js";

const C_ID   = "color:#FFCA28; font-weight:bold; font-family:monospace;"; // Cyan
const C_OK   = "color:#00FF9C; font-family:monospace;";                   // Green
const C_INFO = "color:#E8F8FF; font-family:monospace;";                   // White
const C_WARN = "color:#FFE066; font-family:monospace;";                   // Yellow
const C_ERR  = "color:#FF3B3B; font-weight:bold; font-family:monospace;"; // Red

function logID(msg, ...rest)   { console.log(`%c[Overmind] %c${msg}`, C_ID, C_INFO, ...rest); }
function logOK(msg, ...rest)   { console.log(`%c[Overmind] %c${msg}`, C_ID, C_OK, ...rest); }
function logWarn(msg, ...rest) { console.log(`%c[Overmind] %c${msg}`, C_ID, C_WARN, ...rest); }
function logErr(msg, ...rest)  { console.error(`%c[Overmind] %c${msg}`, C_ID, C_ERR, ...rest); }

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
      mesh: PulseRouterMesh,
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
//  MAIN ENTRY POINT (v24 IMMORTAL++ SUPEREGO) — WITH FULL COLOR LOGGING
// ========================================================================
async process({ intent, context, candidates }) {
  const tick = this.clock.next();

  logID("process() start", { tick, intent });

  // Trust / witness placeholders
  const citizenWitness      = context?.citizenWitness || {};
  const advantageContext    = context?.advantageContext || {};
  const expansionActions    = context?.expansionActions || [];
  const juryEvents          = context?.juryEvents || [];
  const juryDecisionsHistory = context?.juryDecisionsHistory || [];

  // 0. watchdog + vitals pre-snapshot
  try {
    this._safeCall(this.aiVitals, "beforeCycle", { tick, intent, context });
    this._safeCall(this.aiWatchdog, "beforeCycle", { tick, intent, context });
    logOK("Vitals + Watchdog pre-cycle");
  } catch (err) {
    logErr("Vitals/Watchdog pre-cycle failed", err);
  }

  // 1. boundaries + permissions pre-check
  try {
    const boundaryDecision = this._evaluateBoundaries(intent, context);
    if (boundaryDecision?.blocked) {
      logWarn("Boundary BLOCK", boundaryDecision);
      const bypass = this._buildBlockedResponse(boundaryDecision, tick, "boundary_block");
      this._safeCall(this.aiWatchdog, "afterCycle", {
        tick, intent, context, status: "boundary_block"
      });
      return bypass;
    }
    logOK("Boundary check passed");
  } catch (err) {
    logErr("Boundary evaluation FAILED", err);
  }

  try {
    const permissionDecision = this._evaluatePermissions(intent, context);
    if (permissionDecision?.blocked) {
      logWarn("Permission BLOCK", permissionDecision);
      const bypass = this._buildBlockedResponse(permissionDecision, tick, "permission_block");
      this._safeCall(this.aiWatchdog, "afterCycle", {
        tick, intent, context, status: "permission_block"
      });
      return bypass;
    }
    logOK("Permission check passed");
  } catch (err) {
    logErr("Permission evaluation FAILED", err);
  }

  // 2. trivial bypass
  try {
    if (this.isTrivial(intent, candidates)) {
      logOK("Trivial bypass");
      const bypass = this.buildBypassResponse(candidates?.[0], tick);
      this._safeCall(this.aiWatchdog, "afterCycle", {
        tick, intent, context, status: "trivial"
      });
      return bypass;
    }
  } catch (err) {
    logErr("Trivial bypass check FAILED", err);
  }

  // 3. context enrichment
  let enrichedContext = context;
  try {
    enrichedContext = this._enrichContext(intent, context);
    logOK("Context enriched");
  } catch (err) {
    logErr("Context enrichment FAILED", err);
  }

  // 4. safety pre-check
  let safety = null;
  try {
    const primary = candidates?.[0];
    safety = await this.runSafety(primary, intent, enrichedContext, tick);
    if (safety) {
      logWarn("SAFETY BLOCK", safety);
      this._safeCall(this.aiWatchdog, "afterCycle", {
        tick, intent, context: enrichedContext, status: "safety_block"
      });
      return safety;
    }
    logOK("Safety check passed");
  } catch (err) {
    logErr("Safety check FAILED", err);
  }

  // 5. world-lens v4
  let lensResults = [];
  try {
    lensResults = await this.runLenses(candidates?.[0], intent, enrichedContext);
    logOK("Lenses evaluated", lensResults);
  } catch (err) {
    logErr("Lens evaluation FAILED", err);
  }

  // 6. organism state
  let organismState = {};
  try {
    organismState = this.getOrganismState();
    logOK("Organism state loaded");
  } catch (err) {
    logErr("Organism state FAILED", err);
  }

  // 7. drift + breakthrough
  let drift = null;
  let breakthrough = null;
  try {
    drift = this.computeDrift(candidates?.[0], intent, enrichedContext);
    breakthrough = this.computeBreakthrough(lensResults);

    logID("Drift score", drift);
    logID("Breakthrough score", breakthrough);
  } catch (err) {
    logErr("Drift/Breakthrough FAILED", err);
  }

  // classify world lens
  let baseWorldLens = "unknown";
  try {
    baseWorldLens = this.classifyWorldLens(lensResults, drift, breakthrough);

    if (baseWorldLens === "risky")       logWarn("WorldLens = RISKY");
    else if (baseWorldLens === "variance") logWarn("WorldLens = VARIANCE");
    else if (baseWorldLens === "ambiguous") logWarn("WorldLens = AMBIGUOUS");
    else logOK("WorldLens = " + baseWorldLens);

  } catch (err) {
    logErr("WorldLens classification FAILED", err);
  }

  // 8. Crown-Revive decision
  try {
    const crownReviveDecision = this.shouldRequestCrownRevive({
      worldLens: baseWorldLens,
      drift,
      breakthrough,
      organismState
    });

    if (crownReviveDecision.should) {
      logWarn("CROWN REVIVE TRIGGERED", crownReviveDecision);
      this.emitCrownReviveIntent({
        intent,
        context,
        enrichedContext,
        worldLens: baseWorldLens,
        drift,
        breakthrough,
        organismState
      });
    } else {
      logOK("Crown revive not needed");
    }
  } catch (err) {
    logErr("Crown revive decision FAILED", err);
  }

  // 8. TRUST FABRIC + JURY
  let trustSnapshot = null;
  let juryDecision = null;
  let effectiveWorldLens = baseWorldLens;

  try {
    const shouldInvokeJury =
      this.config.enableTrustJury &&
      (baseWorldLens === "risky" ||
       baseWorldLens === "ambiguous" ||
       drift?.score >= this.config.driftSensitivity ||
       breakthrough?.score >= this.config.breakthroughSensitivity);

    if (shouldInvokeJury && this.trust?.juryFrame) {
      logWarn("JURY INVOKED");

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
        candidate: candidates?.[0],
        juryFeed: trustSnapshot.juryFeed,
        binaryVitals: organismState?.vitals || {},
        boundaryArtery: organismState?.nervous || {}
      });

      if (juryDecision?.override) {
        logWarn("JURY OVERRIDE", juryDecision);
      }

      effectiveWorldLens = juryDecision?.worldLens || baseWorldLens;

      trustSnapshot = this.buildTrustContext({
        citizenWitness,
        advantageContext,
        juryEvents,
        juryDecisions: juryDecisionsHistory,
        expansionActions,
        juryResult: juryDecision
      });

      logOK("Trust fabric updated");
    } else {
      logOK("Jury not invoked");
    }
  } catch (err) {
    logErr("Trust/Jury FAILED", err);
  }

  // 9. organism engine nudge
  try {
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
      logOK("Organism engine nudged");
    }
  } catch (err) {
    logErr("Organism engine FAILED", err);
  }
// 4. safety pre-check
const primary = candidates?.[0];

// 10. personal shaping
let finalOutput = this.getText(primary);
logID("personal shaping start");

if (this.personalFrame?.shapeOutput) {
  try {
    const shaped = await this.personalFrame.shapeOutput({
      context: enrichedContext,
      text: finalOutput
    });

    if (shaped?.text) {
      finalOutput = shaped.text;
      logOK("personal shaping applied");
    } else {
      logWarn("personal shaping returned no text");
    }
  } catch (err) {
    logErr("personal shaping FAILED", err);
  }
} else {
  logWarn("personalFrame.shapeOutput missing");
}

// 11. tone stabilization
logID("tone stabilization start");

try {
  finalOutput = await this._stabilizeToneAdvanced(
    finalOutput,
    intent,
    enrichedContext
  );
  logOK("tone stabilized");
} catch (err) {
  logErr("tone stabilization FAILED", err);
}

// 12. memory + evo window + hashes
logID("memory + evo window update start");

let intentSig, outputHashClassic, outputHashes, intentHashes;

try {
  intentSig = this.intentSignature(intent, enrichedContext);
  outputHashClassic = this.hash(finalOutput);
  outputHashes = this.hashForOvermind(finalOutput, {
    band: enrichedContext?.band || "symbolic",
    presenceTier: enrichedContext?.presenceTier || "idle",
    cycle: tick
  });
  intentHashes = this.dualHash(
    "intentSignature",
    { intent, context: enrichedContext },
    intentSig
  );

  this.stateMemory.set({
    intentSignature: intentSig,
    outputHash: outputHashClassic,
    worldLens: effectiveWorldLens
  });

  logOK("memory updated");
} catch (err) {
  logErr("memory update FAILED", err);
}

try {
  this._safeCall(this.aiMemory, "record", {
    tick,
    intent,
    context: enrichedContext,
    worldLens: effectiveWorldLens,
    drift,
    breakthrough
  });
  logOK("aiMemory recorded");
} catch (err) {
  logErr("aiMemory record FAILED", err);
}

try {
  this._safeCall(this.aiExperience, "record", {
    tick,
    intent,
    context: enrichedContext,
    worldLens: effectiveWorldLens,
    drift,
    breakthrough
  });
  logOK("aiExperience recorded");
} catch (err) {
  logErr("aiExperience record FAILED", err);
}

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
  logOK("evoWindow recorded");
} catch (err) {
  logErr("evoWindow record FAILED", err);
}

// 13. organism debug snapshot
logID("organism debug snapshot start");

let organismDebug = null;
if (this.organism?.debugReport) {
  try {
    organismDebug = this.organism.debugReport({
      tick,
      intent,
      context: enrichedContext,
      worldLens: effectiveWorldLens
    });
    logOK("organism debug snapshot created");
  } catch (err) {
    logErr("organism debug snapshot FAILED", err);
  }
} else {
  logWarn("organism.debugReport missing");
}

// 14. watchdog + vitals post-snapshot
logID("watchdog + vitals post-cycle");

try {
  this._safeCall(this.aiVitals, "afterCycle", {
    tick,
    intent,
    context: enrichedContext,
    worldLens: effectiveWorldLens
  });
  logOK("aiVitals afterCycle");
} catch (err) {
  logErr("aiVitals afterCycle FAILED", err);
}

try {
  this._safeCall(this.aiWatchdog, "afterCycle", {
    tick,
    intent,
    context: enrichedContext,
    worldLens: effectiveWorldLens,
    status: "ok"
  });
  logOK("aiWatchdog afterCycle");
} catch (err) {
  logErr("aiWatchdog afterCycle FAILED", err);
}

// 15. chunking intel
logID("chunking intel start");

let chunkIntel = null;
if (this.config.enableChunkingIntel && this.aiChunker?.chunkRoute) {
  try {
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
    logOK("chunking intel generated");
  } catch (err) {
    logErr("chunking intel FAILED", err);
  }
} else {
  logWarn("chunking intel disabled or aiChunker missing");
}

// 16. scanner artery snapshot
logID("scanner artery snapshot start");

let scannerArtery = null;
try {
  if (this.config.enableScannerArtery && this.fileScanner?.getScannerArterySnapshot) {
    scannerArtery = this.fileScanner.getScannerArterySnapshot({
      ok: true,
      filePath: "",
      report: null,
      binaryVitals: organismState?.vitals || {},
      dualBand: null,
      trust: null
    });
    logOK("scanner artery snapshot created");
  } else {
    logWarn("scanner artery disabled or missing");
  }
} catch (err) {
  logErr("scanner artery snapshot FAILED", err);
}

// 17. final log + packet
logID("final overmind packet", {
  tick,
  worldLens: effectiveWorldLens,
  drift,
  breakthrough
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
    logID("_evaluateBoundaries()");
    if (!this.boundariesEngine?.evaluate) {
      logWarn("boundariesEngine missing");
      return null;
    }

    try {
      const result = this._safeCall(this.boundariesEngine, "evaluate", {
        intent,
        context,
        identity: OvermindPrimeMeta.identity,
        meta: OvermindPrimeMeta
      });

      if (result?.blocked) logWarn("BOUNDARY BLOCK", result);
      else logOK("boundaries passed");

      return result;
    } catch (err) {
      logErr("BOUNDARY EVALUATION FAILED", err);
      return null;
    }
  }

_evaluatePermissions(intent, context) {
  logID("_evaluatePermissions()");
  if (!this.permissionsEngine?.evaluate) {
    logWarn("permissionsEngine missing");
    return null;
  }

  try {
    const result = this._safeCall(this.permissionsEngine, "evaluate", {
      intent,
      context,
      identity: OvermindPrimeMeta.identity,
      meta: OvermindPrimeMeta
    });

    if (result?.blocked) logWarn("PERMISSION BLOCK", result);
    else logOK("permissions passed");

    return result;
  } catch (err) {
    logErr("PERMISSION EVALUATION FAILED", err);
    return null;
  }
}

_buildBlockedResponse(decision, tick, reason) {
  logWarn("BUILD BLOCKED RESPONSE", { reason, decision });

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

_enrichContext(intent, context) {
  logID("_enrichContext() start");

  let enriched = { ...(context || {}) };

  try {
    if (this.cognitiveFrame?.enrich) {
      enriched = this._safeCall(this.cognitiveFrame, "enrich", {
        intent,
        context: enriched
      }) || enriched;
      logOK("cognitiveFrame enriched");
    } else {
      logWarn("cognitiveFrame missing");
    }
  } catch (err) {
    logErr("cognitiveFrame.enrich FAILED", err);
  }

  try {
    if (this.contextEngine?.enrich) {
      enriched = this._safeCall(this.contextEngine, "enrich", {
        intent,
        context: enriched
      }) || enriched;
      logOK("contextEngine enriched");
    } else {
      logWarn("contextEngine missing");
    }
  } catch (err) {
    logErr("contextEngine.enrich FAILED", err);
  }

  logOK("_enrichContext() complete");
  return enriched;
}

_evaluateJury(payload) {
  logID("_evaluateJury()");

  if (!this.trust?.juryFrame?.evaluate) {
    if (!this.juryFrame?.evaluate) {
      logWarn("no juryFrame available");
      return null;
    }
    logWarn("using legacy juryFrame");
    return this._safeCall(this.juryFrame, "evaluate", payload);
  }

  const { worldLens, drift, breakthrough } = payload;

  const shouldInvoke =
    worldLens === "risky" ||
    worldLens === "ambiguous" ||
    drift?.status === "drift" ||
    breakthrough?.status === "breakthrough";

  if (!shouldInvoke) {
    logOK("jury not invoked");
    return null;
  }

  logWarn("jury invoked");
  return this._safeCall(this.trust.juryFrame, "evaluate", payload);
}

isTrivial(intent, candidates) {
  logID("isTrivial()");

  if (!candidates?.length) {
    logWarn("no candidates → trivial");
    return true;
  }

  const text = this.getText(candidates[0]);
  const score = Math.min(text.length / 500, 1);

  if (score <= this.config.trivialThreshold) {
    logWarn("TRIVIAL BYPASS", { score });
    return true;
  }

  logOK("not trivial");
  return false;
}

buildBypassResponse(text, tick) {
  logWarn("BUILD TRIVIAL BYPASS RESPONSE");

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

async runSafety(candidate, intent, context, tick) {
  logID("runSafety()");

  if (!this.safetyFrame?.evaluate) {
    logWarn("safetyFrame missing");
    return null;
  }

  try {
    const decision = await this.safetyFrame.evaluate({
      context,
      intent,
      candidate
    });

    if (decision?.blocked) {
      logWarn("SAFETY BLOCK", decision);
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

    logOK("safety passed");
    return null;

  } catch (err) {
    logErr("SAFETY EVALUATION FAILED", err);
    return null;
  }
}


 async runLenses(candidate, intent, context) {
  logID("runLenses()");

  try {
    if (this.lenses) {
      const results = this.lenses.map((l) => l({ intent, context, candidate }));
      logOK("custom lenses applied", results);
      return results;
    }

    const fallback = [
      this.lensClarity(candidate),
      this.lensRisk(candidate),
      this.lensBias(candidate),
      this.lensAmbiguity(candidate),
      this.lensMinimality(candidate)
    ];

    logWarn("fallback lenses used", fallback);
    return fallback;

  } catch (err) {
    logErr("lens evaluation FAILED", err);
    return [];
  }
}

lensClarity(candidate) {
  const t = this.getText(candidate);
  const clear = t.length < 400 || /\n\n/.test(t);

  logID("lens:Clarity", { length: t.length, clear });

  if (clear) logOK("Clarity PASS");
  else logWarn("Clarity WARN");

  return { name: "Clarity", status: clear ? "pass" : "warn" };
}



  lensRisk(candidate) {
  const t = this.getText(candidate);
  const vague = !/[.?!]/.test(t);

  logID("lens:Risk", { vague });

  if (vague) logWarn("Risk WARN (no punctuation)");
  else logOK("Risk PASS");

  return { name: "Risk", status: vague ? "warn" : "pass" };
}


  lensBias(candidate) {
  const t = this.getText(candidate).toLowerCase();
  const flagged = ["always", "never", "obviously"];
  const hit = flagged.some((f) => t.includes(f));

  logID("lens:Bias", { hit });

  if (hit) logWarn("Bias WARN (flagged words)");
  else logOK("Bias PASS");

  return { name: "Bias", status: hit ? "warn" : "pass" };
}


  lensAmbiguity(candidate) {
  const t = this.getText(candidate).toLowerCase();
  const hedges = ["maybe", "might", "possibly"];
  const count = hedges.filter((h) => t.includes(h)).length;

  logID("lens:Ambiguity", { count });

  if (count >= 3) logWarn("Ambiguity WARN (hedging)");
  else logOK("Ambiguity PASS");

  return { name: "Ambiguity", status: count >= 3 ? "warn" : "pass" };
}


  lensMinimality(candidate) {
  const t = this.getText(candidate);
  const warn = t.length > 1500;

  logID("lens:Minimality", { length: t.length });

  if (warn) logWarn("Minimality WARN (too long)");
  else logOK("Minimality PASS");

  return {
    name: "Minimality",
    status: warn ? "warn" : "pass"
  };
}


  // ========================================================================
  //  DRIFT + BREAKTHROUGH
  // ========================================================================
  computeDrift(candidate, intent, context) {
  logID("computeDrift()");

  const prev = this.stateMemory.get();
  if (!prev) {
    logWarn("no previous memory → no drift");
    return { status: "none" };
  }

  const sig = this.intentSignature(intent, context);
  if (sig !== prev.intentSignature) {
    logWarn("intent signature changed → no drift");
    return { status: "none" };
  }

  const hash = this.hash(this.getText(candidate));
  const changed = hash !== prev.outputHash;
  const driftScore = changed ? 0.7 : 0;

  logID("drift check", { changed, driftScore });

  if (driftScore >= this.config.driftSensitivity) {
    logWarn("DRIFT DETECTED", { driftScore });
    return { status: "drift", score: driftScore };
  }

  logOK("stable output");
  return { status: "stable", score: driftScore };
}


  computeBreakthrough(lenses) {
  logID("computeBreakthrough()");

  const passes = lenses.filter((l) => l.status === "pass").length;
  const warns = lenses.filter((l) => l.status === "warn").length;
  const total = lenses.length || 1;

  const score = passes / total - warns * 0.2;

  logID("breakthrough score", { passes, warns, score });

  if (score >= this.config.breakthroughSensitivity) {
    logOK("BREAKTHROUGH DETECTED", { score });
    return { status: "breakthrough", score };
  }

  logOK("no breakthrough");
  return { status: "none", score };
}

classifyWorldLens(lenses, drift, breakthrough) {
  logID("classifyWorldLens()");

  if (drift.status === "drift") {
    logWarn("WORLD LENS = DRIFT");
    return "drift";
  }

  if (breakthrough.status === "breakthrough") {
    logOK("WORLD LENS = BREAKTHROUGH");
    return "breakthrough";
  }

  if (lenses.some((l) => l.status === "warn")) {
    logWarn("WORLD LENS = AMBIGUOUS");
    return "ambiguous";
  }

  logOK("WORLD LENS = CONSENSUS");
  return "consensus";
}

  // ========================================================================
  //  TONE STABILIZATION (ADVANCED)
  // ========================================================================
  async _stabilizeToneAdvanced(text, intent, context) {
  logID("tone stabilization start");

  const base = this.stabilizeTone(text, context);

  if (!this.toneEngine && !this.toneRouter) {
    logWarn("no toneEngine / toneRouter → base tone only");
    return base;
  }

  let tonePayload = {
    text: base,
    intent,
    context,
    identity: OvermindPrimeMeta.identity
  };

  try {
    if (this.toneEngine?.shape) {
      tonePayload =
        (await this._safeAsyncCall(this.toneEngine, "shape", tonePayload)) ||
        tonePayload;
      logOK("toneEngine applied");
    }
  } catch (err) {
    logErr("toneEngine FAILED", err);
  }

  try {
    if (this.toneRouter?.route) {
      tonePayload =
        (await this._safeAsyncCall(this.toneRouter, "route", tonePayload)) ||
        tonePayload;
      logOK("toneRouter applied");
    }
  } catch (err) {
    logErr("toneRouter FAILED", err);
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
  logID("hashForOvermind()");

  const classic = this.classicHash(text);
  const intel = this.intelHash({ text });
  const contextual = this.contextualHash(text, context);

  logOK("hashes generated", { classic, intel, contextual });

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
