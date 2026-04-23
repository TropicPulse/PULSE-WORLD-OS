// ============================================================================
//  PulseEvolutionaryWindow.js — v11
//  THE IGNITION ORGAN
//  One import. Four functions. Entire organism follows this route.
// ============================================================================

// ⭐ TOP-LAYER IGNITION IMPORTS ONLY
import * as PulseIdentity from "./PULSE-PROXY/PulseProxyBBB.js";          // BBB Identity
import * as PulseOSBrain from "./PULSE-OS/PulseOSBrain.js";            // Brain
import * as PulseOSEvolution from "./PULSE-OS/PulseOSBrainEvolution.js"; // Evolution Engine
import * as PulseSpinalCord from "./PULSE-OS/PulseOSSpinalCord.js";    // Nervous System
import * as PulseRouter from "./pulse-router/PulseRouter-v10.4.js";    // Router (entrypoint)

// Optional (but safe): GPU accelerator
import * as PulseGPU from "./pulse-gpu/PulseGPU-v10.4.js";

// ============================================================================
//  IGNITION API — The Only 4–5 Functions the Window Ever Exposes
// ============================================================================

export async function igniteIdentity(mode = "hybrid") {
  return await PulseIdentity.identity(mode);
}

export function igniteBrain(evolutionConfig) {
  return PulseOSEvolution.PulseOSEvolution(evolutionConfig)
    .bootBrain(PulseOSBrain.PulseOSBrain);
}

export function igniteSpinalCord({ Router, Brain, Evolution }) {
  return PulseSpinalCord.createPulseOSSpinalCord({
    Router,
    Brain,
    Evolution,
    log: Brain.log,
    warn: Brain.warn
  });
}

export function igniteRouter() {
  return PulseRouter;
}

export function igniteGPU() {
  return PulseGPU;
}

// ============================================================================
//  DEFAULT EXPORT — The Ignition Bundle
// ============================================================================
export default {
  igniteIdentity,
  igniteBrain,
  igniteSpinalCord,
  igniteRouter,
  igniteGPU
};
