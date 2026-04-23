// ============================================================================
//  PulseUnderstanding.js — v11
//  Cortical Opener • Page-Aware Kernel View • Deterministic Frontend Brainstem
// ============================================================================

// ============================================================================
//  IMPORTS — DOWNSTREAM OF EVOLUTIONARY WINDOW
// ============================================================================

// Core OS Maps (design-time only, no organs here)
import { PulseIntentMap } from "./PulseIntentMap.js";
import { PulseOrganismMap } from "./PulseOrganismMap.js";
import { PulseIQMap } from "./PulseIQMap.js";

// A1 Skin Reflex (page-level error membrane)
import { attachScanner } from "./PulseOSSkinReflex.js";

// v11 Ignition Organ (top-level boot)
import EvolutionaryWindow from "../PulseEvolutionaryWindow.js";

// Governor (for AI logging wrapper only)
import { withOrganGuard } from "./PulseOSGovernor.js";


// ============================================================================
//  ATTACH SKIN REFLEX WITH IDENTITY SNAPSHOT
// ============================================================================

let PulseIdentitySnapshot = null;

(async () => {
  try {
    PulseIdentitySnapshot = await EvolutionaryWindow.igniteIdentity("hybrid");
    attachScanner(PulseIdentitySnapshot);
  } catch (err) {
    console.warn("[PulseUnderstanding] Identity ignition failed, SkinReflex attached with null identity");
    attachScanner({});
  }
})();


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
  const Evolution = EvolutionaryWindow.igniteBrain({
    intent: PulseIntentMap,
    organism: PulseOrganismMap,
    iq: PulseIQMap,
    understanding: PULSE_UNDERSTANDING_CONTEXT
  });

  const Brain = Evolution; // igniteBrain already returns a booted brain

  // 2) Ignite Router + GPU
  const Router = EvolutionaryWindow.igniteRouter();
  const GPU = EvolutionaryWindow.igniteGPU();

  // 3) Ignite Spinal Cord (wires Brain + Router + GPU)
  const SpinalCord = EvolutionaryWindow.igniteSpinalCord({
    Router,
    Brain,
    Evolution
  });

  const meta = {
    ...PULSE_UNDERSTANDING_CONTEXT,
    identity: PulseIdentitySnapshot,
    environment: PulseEnvironment
  };

  const Pulse = {
    meta,
    Identity: PulseIdentitySnapshot,
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
  Identity: () => PulseIdentitySnapshot,
  Environment: PulseEnvironment,
  Kernel: PulseKernelPromise,
  runThroughGovernor
};

export default PulseKernelPromise;
