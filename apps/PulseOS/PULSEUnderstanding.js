// ============================================================================
//  PulseUnderstanding.js — v11
//  Cortical Opener • Page-Aware Kernel View • Deterministic Frontend Brainstem
// ============================================================================

// ============================================================================
//  IMPORTS — DOWNSTREAM OF EVOLUTIONARY WINDOW
// ============================================================================

// Core OS Maps (design-time only, no organs here)
import { PulseIntentMap } from "./PULSE-OS/PulseIntentMap.js";
import { PulseOrganismMap } from "./PULSE-OS/PulseOrganismMap.js";
import { PulseIQMap } from "./PULSE-OS/PulseIQMap.js";

// v11 Ignition Organ (top-level boot)
import EvolutionaryWindow from "./PULSEEvolutionaryWindow.js";

// Governor (for AI logging wrapper only)
import { withOrganGuard } from "./PULSE-OS/PulseOSGovernor.js";


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
//  GOVERNED EXECUTION — GLOBAL AI LOGGING (FRONTEND WRAPPER ONLY)
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
//  KERNEL BOOTSTRAP — DOWNSTREAM OF EVOLUTIONARY WINDOW
// ============================================================================
async function buildPulseKernel() {
  // 1) Ignite Brain (loads organism via maps)
  const Brain = EvolutionaryWindow.igniteBrain({
    intent: PulseIntentMap,
    organism: PulseOrganismMap,
    iq: PulseIQMap,
    understanding: PULSE_UNDERSTANDING_CONTEXT
  });

  // 2) Ignite Router + GPU
  const Router = EvolutionaryWindow.igniteRouter();
  const GPU = EvolutionaryWindow.igniteGPU();

  // 3) Ignite Spinal Cord (wires Brain + Router)
  const SpinalCord = EvolutionaryWindow.igniteSpinalCord({
    Router,
    Brain,
    Evolution: null // if needed later, adjust igniteBrain to return { Brain, Evolution }
  });

  const meta = {
    ...PULSE_UNDERSTANDING_CONTEXT,
    identity: null, // identity is handled at the window/ignition layer
    environment: PulseEnvironment
  };

  const Pulse = {
    meta,
    Identity: null,
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
          Governed: PulseKernel.Governed,
          SDN: PulseKernel.SDN
        }
      : PulseKernel;
  }).catch((err) => {
    console.error("[PulseUnderstanding] Kernel bootstrap failed:", err);
  });
}


// ============================================================================
//  EXPORTS
// ============================================================================
export const PulseUnderstanding = {
  ...PULSE_UNDERSTANDING_CONTEXT,
  Identity: () => window?.Pulse?.Identity ?? null,
  Environment: PulseEnvironment,
  Kernel: PulseKernelPromise,
  runThroughGovernor
};

export default PulseKernelPromise;
