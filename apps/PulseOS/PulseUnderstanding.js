// ============================================================================
//  PulseUnderstanding.js — v10.4 (Upgraded with Global AI Logging)
//  Kernel Opener • Organism Loader • Deterministic Frontend Brainstem
// ============================================================================

// ============================================================================
//  IMPORTS — FRONTEND BARREL (ALL ORGANS ROUTE THROUGH HERE)
// ============================================================================
import { PulseIntentMap } from "./PULSE-OS/PulseIntentMap.js";
import { PulseOrganismMap } from "./PULSE-OS/PulseOrganismMap.js";
import { PulseIQMap } from "./PULSE-OS/PulseIQMap.js";
import { PulseIdentity } from "./PULSE-OS/PulseIdentity.js";

import { PulseOSEvolution } from "./PULSE-OS/PulseOSEvolution.js";
import { PulseOSBrain } from "./PULSE-OS/PulseOSBrain.js";

import { VitalsMonitor } from "./pulse-proxy/PulseProxyVitalsMonitor.js";
import { attachScanner } from "./PULSE-OS/PulseOSSkinReflex.js";

import * as PulseRouter from "./pulse-router/PulseRouterEvolutionaryThought.js";
import * as PulseGPU from "./pulse-gpu/PulseGPU-v10.4.js";

import { PulseSendSystem } from "./pulse-send/PulseSendSystem.js";

import * as PulseEarn from "./pulse-earn/PulseEarn.js";
import { PulseEarnSendSystem } from "./pulse-earn/PulseEarnSendSystem.js";
import { PulseEarnContinuancePulse } from "./pulse-earn/PulseEarnContinuancePulse.js";

import { createPulseSDN } from "./pulse-sdn/PulseSDN.js";

import { withOrganGuard } from "./PULSE-OS/PulseOSGovernor.js";

// ⭐ NEW — Logging organ (frontend-safe)
import { createDiagnosticsWriteAPI } from "./aiDiagnosticsWrite.js";


// ============================================================================
//  ATTACH SKIN REFLEX
// ============================================================================
attachScanner(PulseIdentity);


// ============================================================================
//  CONTEXT — KERNEL IDENTITY (v10.4)
// ============================================================================
const PULSE_UNDERSTANDING_CONTEXT = {
  layer: "PulseUnderstanding",
  role: "KERNEL_OPENER",
  version: "10.4",
  lineage: "cortical-opener",
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
//  GOVERNED EXECUTION — NOW WITH GLOBAL AI LOGGING
// ============================================================================
function runThroughGovernor(organName, pulseOrImpulse, fn) {
  return withOrganGuard(organName, pulseOrImpulse, async (instanceContext) => {

    // Execute organ logic
    const result = await fn(instanceContext);

    // ⭐ NEW: Global AI Logging (Option A)
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

      // Write to AI_LOGS
      await instanceContext?.organs?.diagnosticsWrite?.writeRun({
        docId,
        payload: safe
      });
    } catch (err) {
      console.warn("AI_LOGS write failed:", err);
    }

    return result;
  });
}


// ============================================================================
//  KERNEL BOOTSTRAP
// ============================================================================
function buildPulseKernel() {
  const meta = {
    ...PULSE_UNDERSTANDING_CONTEXT,
    identity: PulseIdentity,
    environment: PulseEnvironment
  };

  const Pulse = {
    meta,
    Identity: PulseIdentity,
    Environment: PulseEnvironment,

    GPU: PulseGPU,
    Router: PulseRouter,
    Send: PulseSendSystem,

    Earn: {
      Organism: PulseEarn,
      SendSystem: PulseEarnSendSystem,
      Continuance: PulseEarnContinuancePulse
    },

    Vitals: {
      Monitor: VitalsMonitor
    },

    SDN: null,

    Governed: {
      run: runThroughGovernor
    }
  };

  return Pulse;
}

const PulseKernel = buildPulseKernel();


// ============================================================================
//  EVOLUTION BOOTSTRAP
// ============================================================================
const Evolution = PulseOSEvolution({
  intent: PulseIntentMap,
  organism: PulseOrganismMap,
  iq: PulseIQMap,
  understanding: PULSE_UNDERSTANDING_CONTEXT
});

const Brain = Evolution.bootBrain(PulseOSBrain);
PulseKernel.Brain = Brain;


// ============================================================================
//  SDN BOOTSTRAP
// ============================================================================
PulseKernel.SDN = createPulseSDN({
  Router: PulseRouter,
  EventBus: PulseKernel.Earn?.Organism?.EventBus || null,
  Brain,
  Evolution,
  log: Brain.log,
  warn: Brain.warn
});


// ============================================================================
//  GLOBAL BROADCAST
// ============================================================================
if (typeof window !== "undefined") {
  window.Pulse = window.Pulse
    ? {
        ...window.Pulse,
        meta: PulseKernel.meta,
        Governed: PulseKernel.Governed,
        SDN: PulseKernel.SDN
      }
    : PulseKernel;
}


// ============================================================================
//  EXPORTS
// ============================================================================
export const PulseUnderstanding = {
  ...PULSE_UNDERSTANDING_CONTEXT,
  Identity: PulseIdentity,
  Environment: PulseEnvironment,
  Kernel: PulseKernel,
  runThroughGovernor
};

export default PulseKernel;
