// ============================================================================
//  PulseEvolutionaryWindow.js — v11
//  THE IGNITION ORGAN (Surface Membrane + OS Bootloader)
//  One import. Four functions. Entire organism follows this route.
// ============================================================================

// ============================================================================
//  SURFACE REFLEXES (ALWAYS SAFE, ALWAYS PRESENT)
//  These DO NOT depend on Brain, Router, SpinalCord, Evolution, or Organism.
//  They are page-level safety membranes.
// ============================================================================

import * as PulseSkinReflex from "./PULSE-OS/PulseOSSkinReflex.js";     // A1 Reflex
import * as PulseVitals from "./pulse-proxy/PulseProxyVitalsMonitor.js"; // Vitals Monitor
import * as PulseLogger from "./pulse-proxy/PulseProxyVitalsLogger.js";  // Front-layer Logger


// ============================================================================
//  TOP-LAYER IGNITION IMPORTS ONLY (OS BOOT)
//  These are the ONLY OS-level imports allowed in v11 ignition.
//  They load the organism indirectly through Brain + Evolution.
// ============================================================================

import * as PulseIdentity from "./PULSE-PROXY/PulseProxyBBB.js";          
import * as PulseOSBrain from "./PULSE-OS/PulseOSBrain.js";            
import * as PulseOSEvolution from "./PULSE-OS/PulseOSBrainEvolution.js";
import * as PulseSpinalCord from "./PULSE-OS/PulseOSSpinalCord.js";    
import * as PulseRouter from "./pulse-router/PulseRouter-v10.4.js";    

// Optional (but safe): GPU accelerator
import * as PulseGPU from "./pulse-gpu/PulseGPU-v10.4.js";


// ============================================================================
//  SURFACE MEMBRANE INITIALIZATION
//  These ALWAYS run before the organism loads.
// ============================================================================

PulseVitals.start();                 // Page-level vitals
PulseLogger.init();                  // Page-level logger
PulseSkinReflex.attachScanner({});   // A1 Reflex attaches immediately with placeholder identity


// ============================================================================
//  IGNITION API — The Only 4–5 Functions the Window Ever Exposes
//  Everything else is loaded THROUGH these.
// ============================================================================

export async function igniteIdentity(mode = "hybrid") {
  const id = await PulseIdentity.identity(mode);

  // Re-attach A1 with REAL identity
  PulseSkinReflex.attachScanner(id);

  return id;
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
