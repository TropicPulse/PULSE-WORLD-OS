// ============================================================================
//  PulseEvolutionaryWindow.js — v11
//  SURFACE MEMBRANE (View-Only Protective Layer)
//  One import. Four imports. Zero OS organs.
// ============================================================================

// ============================================================================
//  SURFACE REFLEXES (ALWAYS SAFE, ALWAYS PRESENT)
// ============================================================================

import * as PulseVitals from "./pulse-proxy/PulseProxyVitalsMonitor.js";
import * as PulseLogger from "./pulse-proxy/PulseProxyVitalsLogger.js";

// ============================================================================
//  LOAD UNDERSTANDING (SECOND LAYER)
// ============================================================================
import * as PulseUnderstanding from "./PulseUnderstanding.js";

// ============================================================================
//  SURFACE MEMBRANE INITIALIZATION
// ============================================================================
PulseVitals.start();
PulseLogger.init();


// ============================================================================
//  EXPORT — WINDOW ONLY EXPOSES MEMBRANE + UNDERSTANDING
// ============================================================================
export default {
  Vitals: PulseVitals,
  Logger: PulseLogger,
  Understanding: PulseUnderstanding
};
