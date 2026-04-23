// ============================================================================
//  PulseOS-v11-Evo.js
//  Organism Bootloader • CNS Kernel • Deterministic OS Brainstem
//
//  METAPHOR:
//  - This is the OS "main breaker panel".
//  - All major organs are wired here: Evolution, Brain, SpinalCord, Governor.
//  - When this file runs, the organism *comes online* as PulseOS v11-EVO.
// ============================================================================


// ============================================================================
//  ORGANISM BOOTSTRAP SET — v11-EVO
//  (ALL OS-LEVEL ORGANS, INCLUDING GOVERNOR)
// ============================================================================
import { withOrganGuard } from "./PULSE-OS/PulseOSGovernor.js";           // Supervisor organ
import * as PulseOSBrain from "./PULSE-OS/PulseOSBrain.js";              // CNS brain organ
import * as PulseOSEvolution from "./PULSE-OS/PulseOSBrainEvolution.js"; // Evolution organ
import * as PulseSpinalCord from "./PULSE-OS/PulseOSSpinalCord.js";      // Wiring organ


// ============================================================================
//  CONTEXT — OS KERNEL IDENTITY (v11-EVO)
// ============================================================================
const PULSE_OS_CONTEXT = {
  layer: "PulseOSKernel",
  role: "ORGANISM_BOOTLOADER",
  version: "11.0-EVO",
  lineage: "pulse-os-v11-evo-kernel",
  evo: {
    dualMode: true,
    browserOnly: true,
    driftProof: true,
    organismLoader: true,
    legacyBridgeCapable: true
  }
};


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
      console.warn("[PulseOS-v11-Evo] AI_LOGS write failed:", err);
    }

    return result;
  });
}


// ============================================================================
//  KERNEL BOOTSTRAP — FULL OS BOOT (EVOLUTION + BRAIN + SPINAL CORD)
// ============================================================================
async function buildPulseOSKernel() {
  // 1) Evolution (organism grows its neural core)
  const Evolution = PulseOSEvolution.PulseOSEvolution
    ? PulseOSEvolution.PulseOSEvolution({ understanding: PULSE_OS_CONTEXT })
    : PulseOSEvolution;

  // 2) Brain (CNS brain organ)
  const Brain = Evolution.bootBrain
    ? Evolution.bootBrain(PulseOSBrain.PulseOSBrain)
    : PulseOSBrain.PulseOSBrain?.();

  // 3) Spinal Cord (wiring between brain and body)
  const SpinalCord = PulseSpinalCord.createPulseOSSpinalCord
    ? PulseSpinalCord.createPulseOSSpinalCord({
        Brain,
        Evolution,
        log: Brain?.log,
        warn: Brain?.warn
      })
    : PulseSpinalCord;

  const meta = {
    ...PULSE_OS_CONTEXT
  };

  const PulseKernel = {
    meta,
    Brain,
    Evolution,
    SDN: SpinalCord,
    Governed: {
      run: runThroughGovernor
    }
  };

  return PulseKernel;
}

const PulseOSKernelPromise = buildPulseOSKernel();


// ============================================================================
//  GLOBAL BROADCAST (ASYNC-AWARE)
// ============================================================================
if (typeof window !== "undefined") {
  PulseOSKernelPromise.then((PulseKernel) => {
    window.Pulse = window.Pulse
      ? {
          ...window.Pulse,
          meta: PulseKernel.meta,
          Brain: PulseKernel.Brain,
          Evolution: PulseKernel.Evolution,
          SDN: PulseKernel.SDN,
          Governed: PulseKernel.Governed
        }
      : PulseKernel;
  }).catch((err) => {
    console.error("[PulseOS-v11-Evo] Kernel bootstrap failed:", err);
  });
}


// ============================================================================
//  EXPORTS — FULL OS KERNEL
// ============================================================================
export const PulseOSv11Evo = {
  ...PULSE_OS_CONTEXT,
  Kernel: PulseOSKernelPromise,
  runThroughGovernor
};

export default PulseOSv11Evo;
