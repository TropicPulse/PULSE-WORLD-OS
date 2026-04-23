// ============================================================================
// FILE: /apps/PulseOS/Brain/PulseIQMap.js
// PULSE OS — v10.4
// “THE IQ WAREHOUSE / IMPORT CORTEX / KNOWLEDGE APPENDAGE STORE”
// ============================================================================
//
//  This is the ONLY file allowed to import anything.
//  All other organs remain importless.
//  IQ = intelligence = imports.
// ============================================================================


// ============================================================================
//  SAFE LOGGING
// ============================================================================
import { log, warn, error as logError } from "../pulse-proxy/PulseProxyVitalsLogger.js";


// ============================================================================
//  KERNEL / BRAINSTEM (v10.4)
// ============================================================================
import { PulseKernel } from "./PulseOSBoot.js";


// ============================================================================
//  IDENTITY + PERMISSIONS
// ============================================================================
import * as BBB from "./PulseOSBBB.js";


// ============================================================================
//  MEMORY LAYERS
// ============================================================================
import * as LongTermMemory from "./PulseOSLongTermMemory.js";
import { PulseOSShortTermMemory } from "./PulseOSShortTermMemory.js";
import {
  saveSnapshot,
  recordDriftSignature,
  createRestorePoint
} from "./PulseOSLiverMemory.js";


// ============================================================================
//  EVOLUTION + CORTEX BOOT
// ============================================================================
import { evolveRaw } from "./PulseOSBrainEvolution.js";
import { boot } from "./PulseOSBrainCortex.js";


// ============================================================================
//  NERVOUS SYSTEM — v10.4 SDN (Software‑Defined Nervous System)
// ============================================================================
import * as PulseSDN from "../pulse-sdn/PulseSDN.js";


// ============================================================================
//  GPU ORGAN — v10.4 (Deterministic GPU Organ)
// ============================================================================
import * as PulseGPU from "../pulse-gpu/PulseGPUv10.js";


// ============================================================================
//  ROUTER — v10.4 Evolutionary Thought
// ============================================================================
import * as PulseRouter from "../pulse-router/PulseRouterEvolutionaryThought.js";


// ============================================================================
//  SEND SYSTEM — v10.4 Deterministic
// ============================================================================
import { PulseSendSystem } from "../pulse-send/PulseSendSystem.js";


// ============================================================================
//  EARN ORGANISM — v10.4 Deterministic
// ============================================================================
import * as PulseEarn from "../pulse-earn/PulseEarn.js";
import { PulseEarnSendSystem } from "../pulse-earn/PulseEarnSendSystem.js";
import { PulseEarnContinuancePulse } from "../pulse-earn/PulseEarnContinuancePulse.js";


// ============================================================================
//  MESH (OPTIONAL — STILL SUPPORTED IN v10.4)
// ============================================================================
import { createCommunityReflex } from "./CommunityReflex.js";
import { applyPulseCortex } from "./PulseMeshCortex.js";
import { applyPulseMeshTendons } from "./PulseMeshTendons.js";
import { applyMeshSignalFactoring } from "./PulseMeshSignalFactoring.js";
import { recordMeshDriftEvent } from "./GlobalHealer.js";
import "./MeshScanner.js"; // side-effect scanner


// ============================================================================
//  FIREBASE (ALLOWED — EXTERNAL SERVICE IQ)
// ============================================================================
import * as firebase from "../netlify/functions/firebase.js";


// ============================================================================
//  IQ REGISTRY — EXPORTED AS THE BRAIN'S INTELLIGENCE LAYER
// ============================================================================
export const PulseIQMap = {
  // Logging
  log,
  warn,
  logError,

  // Kernel
  PulseKernel,

  // Identity + Permissions
  BBB,

  // Firebase
  firebase,

  // Memory layers
  LongTermMemory,
  PulseOSShortTermMemory,
  saveSnapshot,
  recordDriftSignature,
  createRestorePoint,

  // Evolution + Cortex
  evolveRaw,
  boot,

  // Nervous System (v10.4 SDN)
  PulseSDN,

  // GPU Organ (v10.4)
  PulseGPU,

  // Router (v10.4)
  PulseRouter,

  // Send System (v10.4)
  PulseSendSystem,

  // Earn (v10.4)
  PulseEarn,
  PulseEarnSendSystem,
  PulseEarnContinuancePulse,

  // Mesh (optional)
  createCommunityReflex,
  applyPulseCortex,
  applyPulseMeshTendons,
  applyMeshSignalFactoring,
  recordMeshDriftEvent,

  // -------------------------------------------------------------------------
  // SUBIMPORT RESOLVER (v10.4)
  // -------------------------------------------------------------------------
  resolve(subimportName) {
    return null; // deterministic placeholder
  },

  // -------------------------------------------------------------------------
  // SIGNATURE → MODULE MATCHER (v10.4)
  // -------------------------------------------------------------------------
  matchSignature(signature) {
    return null; // deterministic placeholder
  }
};

// ============================================================================
// END OF FILE — PULSE IQ / IMPORT CORTEX / v10.4
// ============================================================================
