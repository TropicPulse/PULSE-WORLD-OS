// ============================================================================
//  PulseUnderstanding.js — v11
//  Cortical Opener • Kernel Boot • Deterministic Frontend Brainstem
// ============================================================================

// ============================================================================
//  IMPORTS — OS BOOT + MAPS (DOWNSTREAM OF WINDOW MEMBRANE)
// ============================================================================

// Core OS Maps (design-time only)
import { PulseIntentMap } from "./PULSE-OS/PulseIntentMap.js";
import { PulseOrganismMap } from "./PULSE-OS/PulseOrganismMap.js";
import { PulseIQMap } from "./PULSE-OS/PulseIQMap.js";

// Governor (frontend AI wrapper)
import { withOrganGuard } from "./PULSE-OS/PulseOSGovernor.js";

// OS-level organs (top-layer boot)
import * as PulseIdentity from "./PULSE-PROXY/PulseProxyBBB.js";
import * as PulseOSBrain from "./PULSE-OS/PulseOSBrain.js";
import * as PulseOSEvolution from "./PULSE-OS/PulseOSBrainEvolution.js";
import * as PulseSpinalCord from "./PULSE-OS/PulseOSSpinalCord.js";
import * as PulseRouter from "./pulse-router/PulseRouter-v10.4.js";
import * as PulseGPU from "./pulse-gpu/PulseGPU-v10.4.js";


// ============================================================================
//  CONTEXT — KERNEL IDENTITY (v11)
// ============================================================================
const PULSE_UNDERSTANDING_CONTEXT = {
  layer: "PulseUnderstanding",
  role: "KERNEL_OPENER",
  version: "11.0",
  lineage: "cortical-opener-core",
  evo: {
    dualMode: true,
    browserOnly: true,
    advantageCascadeAware: true,
    driftProof: true,
    unifiedAdvantageField: true,
    organismLoader: true,
    cognitiveBootstrap: false,
    zeroDriftIdentity: true,
    continuanceAware: true,
    legacyBridgeCapable: true
  }
};


// ============================================================================
//  ENVIRONMENT SNAPSHOT
// ============================================================================
function buildEnvironmentSnapshot() {
  if (typeof window === "undefined") {
    return {
      runtime: "node-like",
      userAgent: null,
      language: null,
      online: null,
      platform: null
    };
  }

  return {
    runtime: "browser",
    userAgent: window.navigator?.userAgent || null,
    language: window.navigator?.language || null,
    online: window.navigator?.onLine ?? null,
    platform: window.navigator?.platform || null
  };
}

const PulseEnvironment = buildEnvironmentSnapshot();


// ============================================================================
//  GOVERNED EXECUTION — FRONTEND AI LOGGING WRAPPER
// ============================================================================
function runThroughGovernor(organName, pulseOrImpulse, fn) {
  return withOrganGuard(organName, pulseOrImpulse, async (instanceContext) => {
    const result = await fn(instanceContext);

    try {
      const timestamp = Date.now();
      const docId = `${organName}-${timestamp}`;

      const safe = {
        organ: organName,
        timestamp,
        personaId: instanceContext.personaId || null,
        boundaries: instanceContext.boundaries || null,
        permissions: instanceContext.permissions || null,
        trace: [...(instanceContext.trace || [])],
        diagnostics: instanceContext.diagnostics || null,
        result
      };

      await instanceContext?.organs?.diagnosticsWrite?.writeRun({
        docId,
        payload: safe
      });
    } catch (err) {
      console.warn("[PulseUnderstanding] AI_LOGS write failed:", err);
    }

    return result;
  });
}


// ============================================================================
//  KERNEL BOOTSTRAP — FULL OS BOOT FROM UNDERSTANDING
// ============================================================================
async function buildPulseKernel() {
  // 1) Identity (if needed at this layer)
  let identity = null;
  try {
    identity = await PulseIdentity.identity("hybrid");
  } catch {
    identity = null;
  }

  // 2) Evolution + Brain (loads organism via maps)
  const Evolution = PulseOSEvolution.PulseOSEvolution({
    intent: PulseIntentMap,
    organism: PulseOrganismMap,
    iq: PulseIQMap,
    understanding: PULSE_UNDERSTANDING_CONTEXT
  });

  const Brain = Evolution.bootBrain(PulseOSBrain.PulseOSBrain);

  // 3) Router + GPU
  const Router = PulseRouter;
  const GPU = PulseGPU;

  // 4) Spinal Cord (wires Brain + Router + Evolution)
  const SpinalCord = PulseSpinalCord.createPulseOSSpinalCord({
    Router,
    Brain,
    Evolution,
    log: Brain.log,
    warn: Brain.warn
  });

  const meta = {
    ...PULSE_UNDERSTANDING_CONTEXT,
    identity,
    environment: PulseEnvironment
  };

  const Pulse = {
    meta,
    Identity: identity,
    Environment: PulseEnvironment,

    Brain,
    Router,
    GPU,
    SDN: SpinalCord,

    Governed: {
      run: runThroughGovernor
    }
  };

  return Pulse;
}

const PulseKernelPromise = buildPulseKernel();


// ============================================================================
//  GLOBAL BROADCAST (ASYNC-AWARE)
// ============================================================================
if (typeof window !== "undefined") {
  PulseKernelPromise.then((PulseKernel) => {
    window.Pulse = window.Pulse
      ? {
          ...window.Pulse,
          meta: PulseKernel.meta,
          Brain: PulseKernel.Brain,
          Router: PulseKernel.Router,
          GPU: PulseKernel.GPU,
          SDN: PulseKernel.SDN,
          Governed: PulseKernel.Governed
        }
      : PulseKernel;
  }).catch((err) => {
    console.error("[PulseUnderstanding] Kernel bootstrap failed:", err);
  });
}


// ============================================================================
//  EXPORTS — FULL BOOT LAYER
// ============================================================================
export const PulseUnderstanding = {
  ...PULSE_UNDERSTANDING_CONTEXT,
  Environment: PulseEnvironment,
  IntentMap: PulseIntentMap,
  OrganismMap: PulseOrganismMap,
  IQMap: PulseIQMap,
  Kernel: PulseKernelPromise,
  Identity: () => (typeof window !== "undefined" ? window?.Pulse?.Identity ?? null : null),
  runThroughGovernor
};

export default PulseUnderstanding;
