// ============================================================================
//  PulseOS-v24-IMMORTAL-Spine-Symbolic++.js
//  SYMBOLIC ORGANISM KERNEL — IMMORTAL CORTEX / DUAL-MODE / MESH-AWARE (v24++)
// ============================================================================
//  ROLE:
//    - Symbolic (non-binary) OS kernel of PulseOS v24-IMMORTAL++.
//    - Boots the organism using symbolic cognition, lineage, CNS logic.
//    - Cortex-facing OS brainstem, dual-mode with binary kernel.
//    - Presence-aware, Mesh-aware, Expansion-aware, NodeAdmin-aware.
//    - Deterministic, drift-proof, organ-based, multi-instance coherent.
//
//  BINARY RELATION:
//    - Binary-aware (knows binary organs exist).
//    - Binary-ready (can host binary organs but does not execute them).
//    - Dual-mode organism: symbolic cortex + binary spinal brainstem.
//
//  PRESENCE / MESH RELATION:
//    - Presence-aware (OS Presence Organ).
//    - Mesh presence relay-aware (Mesh Presence Relay Organ).
//    - Designed to host PresenceField + MeshPresenceRelay as organs.
//
//  WORLD-FIRST ARCHITECTURE:
//    - Evolution, Brain, SpinalCord, Governor, Presence, MeshPresence are organs.
//    - Symbolic + Binary coexist as dual-mode cognition.
//    - All drift eliminated; unified organism identity.
// ============================================================================

import {
  OrganismIdentity,
  buildPulseOrganismMap as buildOrganismMap
} from "../PULSE-X/PulseWorldOrganismMap-v24.js";

const Identity = OrganismIdentity(import.meta.url);

// 2 — EXPORT GENOME METADATA (v24++ surface, same stable identity wiring)
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
export const PULSE_OS_CONTEXT = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

// ============================================================================
//  ORGANISM BOOTSTRAP SET — v16 CORE, v24++ WORLD-LAYER
// ============================================================================

import { withModuleInitGuard, withOrganGuard } from "./PulseOSGovernor-v24.js";
import * as PulseOSBrain from "./PulseOSBrain-v16.js";
import * as PulseOSEvolution from "./PulseOSBrainEvolution.js";
import * as PulseSpinalCord from "./PulseOSSpinalCord-v16.js";

// Presence / Mesh presence (symbolic/OS side)
import * as PulseOSPresence from "./PulseOSPresence-v16.js";

// IMMORTAL Mesh Presence Relay v16
import {
  createPulseMeshPresenceRelay as PulseMeshPresence
} from "../PULSE-MESH/PulseMeshPresenceRelay-v16.js";

// IMMORTAL Binary Mesh Environment v16
import {
  createBinaryMeshEnvironment as createBinaryMeshEnv
} from "../PULSE-MESH/PulseBinaryMesh-v16.js";

// IMMORTAL OrganismMesh v16
import { createOrganismMesh } from "../PULSE-MESH/PulseMeshOrganism-v16.js";

// IMMORTAL Expansion v24 (already v24)
import {
  createPulseExpansion,
  pulseExpansion,
  PulseExpansionMeta
} from "../PULSE-EXPANSION/PulseExpansion-v24.js";

const Expansion = pulseExpansion;
const ExpansionMeta = PulseExpansionMeta;

// ============================================================================
//  WORLD-FACING API (v24++ surface)
// ============================================================================
export const PulseWorld = Object.freeze({
  meta: ExpansionMeta,
  expansion: Expansion,
  castle: ExpansionMeta.world.castle,
  beacons: ExpansionMeta.beacons,
  physics: ExpansionMeta.physics,
  buildExpansionPlan(payload) {
    return Expansion.buildExpansionPlan(payload);
  }
});

// ============================================================================
//  GOVERNED EXECUTION — SYMBOLIC SHELL (v24++)
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
        trace: Array.isArray(instanceContext.trace)
          ? [...instanceContext.trace]
          : [],
        diagnostics: instanceContext.diagnostics || null,
        result
      };

      const diagnosticsWriter =
        instanceContext?.organs?.diagnosticsWrite?.writeRun;

      if (typeof diagnosticsWriter === "function") {
        await diagnosticsWriter({ docId, payload: safe });
      }
    } catch (err) {
      console.warn(
        "[PulseOS-v24-Spine-Symbolic++] AI_LOGS write failed:",
        err
      );
    }

    return result;
  });
}

// ============================================================================
//  KERNEL BOOTSTRAP — SYMBOLIC OS BOOT (EVOLUTION + BRAIN + SPINAL CORD + PRESENCE)
// ============================================================================
async function _buildPulseOSKernel() {
  // 1) Evolution organ
  const Evolution =
    typeof PulseOSEvolution.PulseOSEvolution === "function"
      ? PulseOSEvolution.PulseOSEvolution({ understanding: PULSE_OS_CONTEXT })
      : PulseOSEvolution;

  // 2) Brain organ
  const Brain =
    typeof PulseOSBrain.PulseOSBrain === "function"
      ? PulseOSBrain.PulseOSBrain()
      : PulseOSBrain;

  // 3) Spinal Cord organ
  const createSpinal = PulseSpinalCord?.createPulseOSSpinalCord;
  const SpinalCord = createSpinal
    ? (withOrganGuard
        ? withOrganGuard("PulseOSSpinalCord", createSpinal)({
            Brain,
            Evolution,
            log: Brain?.log,
            warn: Brain?.warn
          })
        : createSpinal({
            Brain,
            Evolution,
            log: Brain?.log,
            warn: Brain?.warn
          }))
    : PulseSpinalCord;

  const meta = { ...PULSE_OS_CONTEXT };

  // 4) Presence Field
  let PresenceField = null;
  if (PulseOSPresence?.buildPresenceField) {
    PresenceField = PulseOSPresence.buildPresenceField({
      Brain,
      Evolution,
      SpinalCord,
      meta
    });
  } else if (PulseOSPresence?.PulseOSPresence) {
    PresenceField = PulseOSPresence.PulseOSPresence({
      Brain,
      Evolution,
      SpinalCord,
      meta
    });
  }

  // 5) Mesh Presence Relay (IMMORTAL v16)
  let MeshPresenceRelay = null;
  if (PulseMeshPresence?.create) {
    MeshPresenceRelay = PulseMeshPresence.create({
      MeshBus: SpinalCord?.MeshBus,
      SystemClock: Brain?.SystemClock,
      IdentityDirectory: Brain?.IdentityDirectory,
      log: Brain?.log,
      warn: Brain?.warn,
      error: Brain?.error
    });
  }

  // 6) Binary Mesh Environment (IMMORTAL v16)
  let BinaryMeshEnv = null;
  if (typeof createBinaryMeshEnv === "function") {
    BinaryMeshEnv = createBinaryMeshEnv({
      context: {
        meta,
        Brain,
        Evolution,
        SpinalCord,
        PresenceField,
        MeshPresenceRelay,
        MeshBus: SpinalCord?.MeshBus,
        SystemClock: Brain?.SystemClock,
        IdentityDirectory: Brain?.IdentityDirectory
      },
      trace: false
    });
  }

  // 7) Organism Mesh Root (IMMORTAL v16)
  let OrganismMeshRoot = null;
  if (typeof createOrganismMesh === "function") {
    OrganismMeshRoot = createOrganismMesh({
      context: {
        meta,
        Brain,
        Evolution,
        SpinalCord,
        PresenceField,
        MeshPresenceRelay,
        MeshBus: SpinalCord?.MeshBus,
        SystemClock: Brain?.SystemClock,
        IdentityDirectory: Brain?.IdentityDirectory
      },
      symbolicMeshEnv: BinaryMeshEnv?.symbolicMeshEnv,
      binaryMeshEnv: BinaryMeshEnv,
      trace: false
    });
  }

  // FINAL SYMBOLIC KERNEL — v24 IMMORTAL++
  const PulseKernel = {
    meta,
    Brain,
    Evolution,
    SDN: SpinalCord,
    PresenceField,
    MeshPresenceRelay,
    BinaryMeshEnv,
    OrganismMeshRoot,

    Governed: {
      run: runThroughGovernor
    }
  };

  return PulseKernel;
}

// Wrap with module init guard
const buildPulseOSKernel = withModuleInitGuard
  ? withModuleInitGuard("PulseOSKernel-v24-IMMORTAL-SPINE++", _buildPulseOSKernel)
  : _buildPulseOSKernel;

const PulseOSKernelPromise = buildPulseOSKernel();

// ============================================================================
//  GLOBAL BROADCAST — SYMBOLIC SHELL ONLY
// ============================================================================
if (typeof window !== "undefined") {
  PulseOSKernelPromise
    .then((Kernel) => {
      const exposed = {
        meta: Kernel.meta,
        Brain: Kernel.Brain,
        Evolution: Kernel.Evolution,
        SDN: Kernel.SDN,
        PresenceField: Kernel.PresenceField,
        MeshPresenceRelay: Kernel.MeshPresenceRelay,
        BinaryMeshEnv: Kernel.BinaryMeshEnv,
        OrganismMeshRoot: Kernel.OrganismMeshRoot,
        Governed: Kernel.Governed
      };

      window.Pulse = window.Pulse
        ? Object.freeze({ ...window.Pulse, ...exposed })
        : Object.freeze(exposed);
    })
    .catch((err) => {
      console.error(
        "[PulseOS-v24-Spine-Symbolic++] Kernel bootstrap failed:",
        err
      );
    });
}

// ============================================================================
//  EXPORTS — FULL SYMBOLIC OS KERNEL (v24 IMMORTAL++)
// ============================================================================
export const PulseOSv24Immortal = {
  ...PULSE_OS_CONTEXT,
  Kernel: PulseOSKernelPromise,
  runThroughGovernor
};

export default PulseOSv24Immortal;
