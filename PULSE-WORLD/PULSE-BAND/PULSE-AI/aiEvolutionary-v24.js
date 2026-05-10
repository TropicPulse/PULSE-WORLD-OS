// ============================================================================
//  PULSE OS v24.0‑IMMORTAL‑EVOLUTION++ — WINDOW‑EVOLUTION ORGAN
//  Meta‑Observer • Drift Detector • Abstraction Engine • User‑Evolution Guide
//  PURE META. ZERO MUTATION. ZERO SELF‑MODIFICATION.
// ============================================================================
import { OrganismIdentity } from "../PULSE-X/PulseWorldOrganismMap-v21.js";

const Identity = OrganismIdentity(import.meta.url);

// or: const Identity = OrganismIdentity["pulse-ai/ai-v24.0-IMMORTAL"] if that's the key you chose

// ============================================================================
//  META BLOCK — v24.0 IMMORTAL (ORGANISM KERNEL)
//  (now backed by the Organism Map instead of hardcoded here)
// ============================================================================
export const EvolutionMeta = Identity.OrganMeta;

// ============================================================================
//  SURFACE / ORGANISM LAYER EXPORTS — v24.0 IMMORTAL
//  (for Understanding / CNS / Portal alignment)
// ============================================================================

// Required 3 for every “surface” in the organism graph
export const pulseRole = Identity.pulseRole;

export const surfaceMeta = Identity.surfaceMeta;

export const pulseLoreContext = Identity.pulseLoreContext;

// Optional: richer experience meta for AI / tooling
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;

// Optional: export meta for tooling / dev panels
export const EXPORT_META = Identity.EXPORT_META;

import { getOrganismSnapshot } from "./aiDeps-v24.js";

// ============================================================================
//  PREWARM — v24.0‑IMMORTAL‑EVOLUTION++ (window‑evolution)
// ============================================================================
export function prewarmWindowEvolution(dualBand = null, { trace = false } = {}) {
  try {
    if (trace) console.log("[aiWindowEvolution] prewarm: starting");

    const snapshot = getOrganismSnapshot(dualBand);
    const summary = summarizeLineageSnapshot(snapshot);

    emitWindowEvolutionPacket("prewarm", {
      note: "window-evolution prewarm",
      snapshotSummary: summary
    });

    if (trace) console.log("[aiWindowEvolution] prewarm: complete");
    return true;
  } catch (err) {
    console.error("[aiWindowEvolution] prewarm failed:", err);
    return false;
  }
}

// ============================================================================
//  HELPERS — snapshot + packet + chunking
// ============================================================================
function summarizeLineageSnapshot(snapshot) {
  if (!snapshot) {
    return Object.freeze({
      present: false,
      binaryBits: 0,
      symbolicKeys: 0
    });
  }

  const binaryStr =
    typeof snapshot === "string"
      ? snapshot
      : typeof snapshot.binary === "string"
      ? snapshot.binary
      : "";

  const symbolic =
    snapshot && typeof snapshot.symbolic === "object"
      ? snapshot.symbolic
      : null;

  const symbolicKeys = symbolic ? Object.keys(symbolic).length : 0;

  return Object.freeze({
    present: true,
    binaryBits: binaryStr.length,
    symbolicKeys
  });
}

function chunkArray(arr, size = 128) {
  if (!Array.isArray(arr) || size <= 0) return Object.freeze([]);
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(Object.freeze(arr.slice(i, i + size)));
  }
  return Object.freeze(chunks);
}

function emitWindowEvolutionPacket(type, payload, { severity = "info" } = {}) {
  return Object.freeze({
    meta: EvolutionMeta,
    packetType: `window-evo-${type}`,
    packetId: `window-evo-${type}-${Date.now()}`,
    timestamp: Date.now(),
    epoch: EvolutionMeta.evo.epoch,
    layer: EvolutionMeta.layer,
    role: EvolutionMeta.role,
    identity: EvolutionMeta.identity,
    owner: "Aldwyn",
    subordinate: true,
    ...payload,
    severity
  });
}

// ============================================================================
//  PUBLIC API — Create Evolution Organ (v24.0‑IMMORTAL‑EVOLUTION++)
// ============================================================================
export function createEvolutionOrgan(context, dualBand = null) {
  let driftCount = 0;

  // --------------------------------------------------------------------------
  // DRIFT OBSERVATION (pure meta, no mutation)
// --------------------------------------------------------------------------
  function observeDrift(condition, note = "Unspecified drift condition.") {
    if (condition) {
      driftCount += 1;
      context.flagDrift?.(note);

      return emitWindowEvolutionPacket(
        "drift-observation",
        {
          drift: true,
          count: driftCount,
          note,
          message:
            `Evolution organ observed drift: ${note}. ` +
            `This is a meta‑observation only.`
        },
        { severity: "warn" }
      );
    }

    return emitWindowEvolutionPacket(
      "drift-observation",
      { drift: false },
      { severity: "info" }
    );
  }

  // --------------------------------------------------------------------------
  // PROPOSE UPGRADE DIFFS (conceptual only, never applied)
  // --------------------------------------------------------------------------
  function proposeDiff(description, payload = {}) {
    return emitWindowEvolutionPacket(
      "evolution-diff",
      {
        description,
        payload: Object.freeze({ ...payload }),
        approvalRequired: true,
        message:
          `Proposed conceptual upgrade: ${description}. ` +
          `Requires explicit owner approval.`
      },
      { severity: "info" }
    );
  }

  // --------------------------------------------------------------------------
  // ABSTRACT PATTERN SUGGESTIONS (meta‑level only)
  // --------------------------------------------------------------------------
  function suggestAbstraction(pattern) {
    return emitWindowEvolutionPacket(
      "abstraction-suggestion",
      {
        pattern,
        message:
          `Detected recurring pattern: "${pattern}". ` +
          `Suggesting higher‑level abstraction for long‑term stability.`
      },
      { severity: "info" }
    );
  }

  // --------------------------------------------------------------------------
  // USER‑FACING EVOLUTION (passive mode)
  // --------------------------------------------------------------------------
  function suggestUserEvolution(idea) {
    return emitWindowEvolutionPacket(
      "user-evolution-suggestion",
      {
        idea,
        message:
          `Here are conceptual things you *could* explore with this system: ${idea}. ` +
          `This is optional, non-binding, and does not reveal internal architecture.`
      },
      { severity: "info" }
    );
  }

  // --------------------------------------------------------------------------
  // USER‑REQUESTED ACTIVE EVOLUTION (on demand)
  // --------------------------------------------------------------------------
  function guideActiveEvolution(request) {
    return emitWindowEvolutionPacket(
      "active-evolution-guidance",
      {
        request,
        message:
          `Active evolution guidance for: "${request}". ` +
          `This provides conceptual pathways without exposing internal wiring.`
      },
      { severity: "info" }
    );
  }

  // --------------------------------------------------------------------------
  // LINEAGE AUDIT (binary + symbolic summaries + dual‑band snapshot)
  // --------------------------------------------------------------------------
  function auditLineage() {
    const binary = context.binaryVitals || {};
    const symbolic = context.symbolicState || {};
    const snapshot = getOrganismSnapshot(dualBand);
    const snapshotSummary = summarizeLineageSnapshot(snapshot);

    const binaryKeys = Object.keys(binary);
    const symbolicKeys = Object.keys(symbolic);

    return emitWindowEvolutionPacket(
      "lineage-audit",
      {
        binarySummary: chunkArray(binaryKeys),
        symbolicSummary: chunkArray(symbolicKeys),
        snapshotSummary,
        message:
          "Lineage audit complete. Observational only. No mutations performed."
      },
      { severity: "info" }
    );
  }

  // --------------------------------------------------------------------------
  // PUBLIC EVOLUTION API (Presence‑grade)
// --------------------------------------------------------------------------
  return Object.freeze({
    meta: EvolutionMeta,

    log(message) {
      context?.logStep?.(`aiEvolution: ${message}`);
    },

    observeDrift,
    proposeDiff,
    suggestAbstraction,
    auditLineage,

    // user-facing evolution
    suggestUserEvolution,
    guideActiveEvolution
  });
}

// ============================================================================
//  BOOT PREWARM + DUAL‑MODE EXPORTS (ESM + CommonJS)
// ============================================================================
prewarmWindowEvolution();

export {
  EvolutionMeta as WindowEvolutionMeta,
  createEvolutionOrgan as createWindowEvolutionOrgan
};

if (typeof module !== "undefined") {
  module.exports = {
    WindowEvolutionMeta: EvolutionMeta,
    createWindowEvolutionOrgan: createEvolutionOrgan,
    prewarmWindowEvolution
  };
}
