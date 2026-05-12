/* global log, warn, error */
// ============================================================================
// FILE: PULSE-WORLD/PULSE-BAND/PULSE-X/PulseSpecsGenomeRouter-v20.js
// ORGAN: PulseSpecsGenomeRouter-v20 (Genome → Memory Router Organ)
// LAYER: PULSE-WORLD / DATA-ROUTING / INTELLEDB / IMMORTAL-V20
// ============================================================================
//
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝
//
// ROLE:
//   The Genome Router reads PulseSpecsDNAGenome-v20.js and decides:
//     • Which MEMORY ORGAN to use (LongTerm, ShortTerm, Muscle)
//     • How to route PulseFields → correct memory tier
//     • How to interpret field metadata deterministically
//
//   This is the “brainstem” of INTELLEDB™.
//   It is the central router for:
//     • Evolutionary memory
//     • Hot-path memory
//     • Semantic memory
//
// THIS FILE IS:
//   • A pure logic organ
//   • A deterministic router
//   • A metadata interpreter
//   • A memory-tier selector
//
// THIS FILE IS NOT:
//   • A database client
//   • A translator implementation
//   • A storage engine
//   • A Firestore/SQL wrapper
//
// DEPENDENCIES:
//   • PulseSpecsDNAGenome-v20.js (source of truth for PulseFields)
//   • PulseSpecsLongTermMemory-v20.js
//   • PulseSpecsShortTermMemory-v20.js
//   • PulseSpecsMuscleMemory-v20.js
//
// ============================================================================
// AI EXPERIENCE META — IMMORTAL ORGAN BLOCK
// ============================================================================
import {
  OrganismIdentity,
  buildPulseOrganismMap as PulseOrganismMap,
  buildPulseOrganismMap as buildOrganismMap
} from "./PULSE-WORLD-MAP.js";
const Identity = OrganismIdentity(import.meta.url);

// 2 — EXPORT GENOME METADATA
// export const PulseMeshMeta = Identity.OrganMeta;
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
// export const WBC_CONTEXT = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

// ============================================================================
// IMPORTS
// ============================================================================

import { PulseSpecsDNAGenome } from "./PulseSpecsDNAGenome-v20.js";

// NEW MEMORY ORGANS (IMMORTAL v20)
import * as LongTermMemory from "./PulseSpecsLongTermMemory-v20.js";
import * as ShortTermMemory from "./PulseSpecsShortTermMemory-v20.js";
import * as MuscleMemory from "./PulseSpecsMuscleMemory-v20.js";

// ============================================================================
// ROUTER LOGIC — IMMORTAL
// ============================================================================
//
// The router reads PulseField metadata and chooses the correct MEMORY ORGAN.
// This is the core of INTELLEDB™.
//

export function routePulseField(fieldName) {
  const field = PulseSpecsDNAGenome.fields[fieldName];

  if (!field) {
    throw new Error(`Unknown PulseField: ${fieldName}`);
  }

  // ---------------------------------------------------------
  // 1. LONG-TERM MEMORY (persistent, evolutionary)
  // ---------------------------------------------------------
  if (
    field.longTerm === true ||
    field.persistent === true ||
    field.evolutionary === true ||
    field.history === true
  ) {
    return {
      tier: "long_term",
      organ: LongTermMemory,
      field
    };
  }

  // ---------------------------------------------------------
  // 2. MUSCLE MEMORY (vector embeddings, semantic recall)
  // ---------------------------------------------------------
  if (
    field.vector === true ||
    field.embedding === true ||
    field.semantic === true ||
    field.searchable === true
  ) {
    return {
      tier: "muscle_memory",
      organ: MuscleMemory,
      field
    };
  }

  // ---------------------------------------------------------
  // 3. SHORT-TERM MEMORY (hot cache, ephemeral)
  // ---------------------------------------------------------
  if (
    field.shortTerm === true ||
    field.cache === true ||
    field.ephemeral === true ||
    field.hot === true
  ) {
    return {
      tier: "short_term",
      organ: ShortTermMemory,
      field
    };
  }

  // ---------------------------------------------------------
  // 4. DEFAULT → SHORT-TERM MEMORY
  // ---------------------------------------------------------
  return {
    tier: "short_term",
    organ: ShortTermMemory,
    field
  };
}

// ============================================================================
// HIGH-LEVEL ROUTER API — IMMORTAL
// ============================================================================
//
// These functions hide routing + memory organ selection.
//

export async function savePulseField(fieldName, value, context = {}) {
  const route = routePulseField(fieldName);
  return route.organ.save?.({ fieldName, value, field: route.field, context });
}

export async function loadPulseField(fieldName, context = {}) {
  const route = routePulseField(fieldName);
  return route.organ.load?.({ fieldName, field: route.field, context });
}

export async function deletePulseField(fieldName, context = {}) {
  const route = routePulseField(fieldName);
  return route.organ.delete?.({ fieldName, field: route.field, context });
}

// ============================================================================
// FOOTER — INTELLEDB™ NOTES FOR ALDWYN
// ============================================================================
//
// ⭐ This router now uses your NEW memory organs:
//      • LongTermMemory  → persistent evolutionary memory
//      • ShortTermMemory → hot-path working memory
//      • MuscleMemory    → semantic vector memory
//
// ⭐ This is the correct IMMORTAL v20 architecture.
// ⭐ This is the brainstem of INTELLEDB™.
// ⭐ This is the deterministic router for all PulseFields.
// ⭐ This is the foundation for the OS-level proxy integration.
//
// ============================================================================
