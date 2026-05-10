// ============================================================================
//  PulseBinaryOS-v24-IMMORTAL-SPINE++.js
//  BINARY-NATIVE ORGANISM KERNEL — SPINE / REFLEX ENGINE (v24-IMMORTAL-SPINE++)
// ============================================================================
//  ROLE:
//    - Binary-native OS kernel of PulseOS v24-IMMORTAL++.
//    - Boots the organism using pure binary cognition, reflex, and wiring.
//    - ZERO symbolic execution inside core, ZERO browser impurities in kernel.
//    - Reflex organism: fast, deterministic, mutation-proof, presence + mesh aware.
//    - Dual-mode organism: binary-primary, symbolic-aware (metadata-only).
//
//  SYMBOLIC RELATION:
//    - Symbolic kernel (PulseOS Cortex) is the cortex.
//    - THIS binary kernel is the spinal brainstem + reflex engine.
//    - Together they form the dual-mode organism.
//
//  BINARY CONTRACT (INSIDE KERNEL):
//    - No Date.now()
//    - No console.*
//    - No window.*
//    - No randomness
//    - No mutation of meta
//    - No symbolic logging
//    - No browser dependencies
//
//  METAPHOR:
//    - When THIS file runs, the *binary creature* comes online.
//    - This is the reflex ignition — the organism’s heartbeat.
// ============================================================================

import {
  OrganismIdentity,
  buildPulseOrganismMap as buildOrganismMap
} from "../PULSE-X/PulseWorldOrganismMap-v21.js";

const Identity = OrganismIdentity(import.meta.url);

// 2 — EXPORT GENOME METADATA (v24++ surface, same stable identity wiring)
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
export const PULSE_BINARY_OS_CONTEXT = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

// ============================================================================
//  ORGANISM BOOTSTRAP SET — v16 CORE, v24++ WORLD-LAYER
// ============================================================================

import { withModuleInitGuard, withOrganGuard } from "./PulseOSGovernor-v24.js"; // Supervisor organ
import * as PulseOSBrain from "./PulseOSBrain-v16.js";                      // CNS brain organ
import * as PulseOSEvolution from "./PulseOSBrainEvolution.js";             // Evolution organ
import * as PulseSpinalCord from "./PulseOSSpinalCord-v16.js";              // Wiring organ

// Presence / Mesh presence (symbolic/OS side, optional)
import * as PulseOSPresence from "./PulseOSPresence-v16.js";                // OS Presence Organ (optional)

// Binary + symbolic mesh environment (IMMORTAL v16)
import {
  createBinaryMeshEnvironment as createBinaryMeshEnv
} from "../PULSE-MESH/PulseBinaryMesh-v16.js";

// PULSE OS Expansion — v24 world barrel (already v24)
import {
  createPulseExpansion,
  pulseExpansion,
  PulseExpansionMeta
} from "../PULSE-EXPANSION/PulseExpansion-v24.js";

// (optional) direct access if you want to surface them:
const Expansion = pulseExpansion; // singleton
const ExpansionMeta = PulseExpansionMeta;

// World-facing API (v24++ surface, same shape, more explicit meta)
export const PulseWorld = Object.freeze({
  meta: ExpansionMeta,

  // region governor
  expansion: Expansion,

  // convenience surfaces (all routed through Expansion)
  castle: ExpansionMeta.world.castle,
  beacons: ExpansionMeta.beacons,
  physics: ExpansionMeta.physics,

  // primary call: build expansion plan from region signals
  buildExpansionPlan(payload) {
    return Expansion.buildExpansionPlan(payload);
  }
});

// ============================================================================
//  PURE BINARY KERNEL BOOT — NO WINDOW, NO CONSOLE, NO TIMESTAMPS
//  (Clock access only via injected SystemClock in mesh/env/organs.)
// ============================================================================

async function _buildPulseBinaryOSKernel() {
  const meta = PULSE_BINARY_OS_CONTEXT;

  // 1) Evolution organ (binary growth engine)
  const Evolution =
    typeof PulseOSEvolution.PulseOSEvolution === "function"
      ? PulseOSEvolution.PulseOSEvolution({ understanding: meta })
      : PulseOSEvolution;

  // 2) Brain organ (binary CNS)
  const Brain =
    typeof PulseOSBrain.PulseOSBrain === "function"
      ? PulseOSBrain.PulseOSBrain()
      : PulseOSBrain;

  // 3) Spinal Cord organ (binary wiring fabric) — guarded
  const createSpinal =
    typeof PulseSpinalCord.createPulseOSSpinalCord === "function"
      ? PulseSpinalCord.createPulseOSSpinalCord
      : null;

  const SpinalCord = createSpinal
    ? (withOrganGuard
        ? withOrganGuard("PulseOSSpinalCord", createSpinal)({
            Brain,
            Evolution,
            log: null, // binary kernel does not log
            warn: null // binary kernel does not warn
          })
        : createSpinal({
            Brain,
            Evolution,
            log: null,
            warn: null
          }))
    : PulseSpinalCord;

  // 4) CORE MEMORY (if v16 stack exposes it via Evolution or Brain)
  let MemoryCore = null;
  if (Evolution && typeof Evolution.bootMemoryCore === "function") {
    MemoryCore = Evolution.bootMemoryCore(Brain);
  } else if (Brain && typeof Brain.getMemoryCore === "function") {
    MemoryCore = Brain.getMemoryCore();
  }

  // 5) BINARY OVERLAY (if available from Evolution or Brain)
  let BinaryOverlay = null;
  if (Evolution && typeof Evolution.buildBinaryOverlay === "function") {
    BinaryOverlay = Evolution.buildBinaryOverlay({
      Brain,
      SpinalCord,
      MemoryCore
    });
  } else if (Brain && typeof Brain.getBinaryOverlay === "function") {
    BinaryOverlay = Brain.getBinaryOverlay();
  }

  // 6) PRESENCE FIELD (OS-level presence organ, optional)
  let PresenceField = null;
  if (PulseOSPresence && typeof PulseOSPresence.buildPresenceField === "function") {
    PresenceField = PulseOSPresence.buildPresenceField({
      Brain,
      Evolution,
      SpinalCord,
      MemoryCore,
      BinaryOverlay,
      meta
    });
  } else if (PulseOSPresence && typeof PulseOSPresence.PulseOSPresence === "function") {
    PresenceField = PulseOSPresence.PulseOSPresence({
      Brain,
      Evolution,
      SpinalCord,
      MemoryCore,
      BinaryOverlay,
      meta
    });
  }

  // 7) BINARY MESH ENVIRONMENT (Mesh-level presence + mesh subsystems, optional)
  let BinaryMeshEnv = null;
  let MeshPresenceRelay = null;
  let OrganismMeshRoot = null;

  if (typeof createBinaryMeshEnv === "function") {
    BinaryMeshEnv = createBinaryMeshEnv({
      context: {
        // OS‑kernel context surfaced into mesh env
        meta,
        Brain,
        Evolution,
        SpinalCord,
        MemoryCore,
        BinaryOverlay,
        PresenceField,

        // mesh bus + clocks + identity if exposed by organs
        MeshBus: SpinalCord?.MeshBus,
        SystemClock: Brain?.SystemClock,
        IdentityDirectory: Brain?.IdentityDirectory,

        // expansion / world hooks
        Expansion,
        ExpansionMeta
      },
      trace: false
    });

    MeshPresenceRelay = BinaryMeshEnv?.meshPresenceRelay || null;
    OrganismMeshRoot = BinaryMeshEnv?.organism || null;
  }

  // PURE BINARY ORGANISM KERNEL (v24++ surface, v16 core)
  return {
    meta,
    Brain,
    Evolution,
    SDN: SpinalCord,
    MemoryCore,
    BinaryOverlay,
    PresenceField,
    BinaryMeshEnv,
    MeshPresenceRelay,
    OrganismMeshRoot,
    Expansion,
    ExpansionMeta,

    // Binary kernel does NOT have symbolic governor
    Governed: {
      run: () => {
        throw new Error("Binary kernel does not support symbolic governor.");
      }
    }
  };
}

// Wrap kernel build with module init guard if available
const buildPulseBinaryOSKernel = withModuleInitGuard
  ? withModuleInitGuard(
      "PulseBinaryOSKernel-v24-IMMORTAL-SPINE++",
      _buildPulseBinaryOSKernel
    )
  : _buildPulseBinaryOSKernel;

// ============================================================================
//  BINARY KERNEL PROMISE — PURE ORGANISM CORE
// ============================================================================

const PulseBinaryOSKernelPromise = buildPulseBinaryOSKernel();

// ============================================================================
//  OPTIONAL BROWSER SHELL — ONLY IF WINDOW EXISTS
//  (This is the ONLY impurity, and it is kept OUTSIDE the organism.)
// ============================================================================

if (typeof window !== "undefined") {
  PulseBinaryOSKernelPromise
    .then((Kernel) => {
      const exposed = {
        meta: Kernel.meta,
        SDN: Kernel.SDN,
        Brain: Kernel.Brain,
        Evolution: Kernel.Evolution,
        MemoryCore: Kernel.MemoryCore,
        BinaryOverlay: Kernel.BinaryOverlay,
        PresenceField: Kernel.PresenceField,
        BinaryMeshEnv: Kernel.BinaryMeshEnv,
        MeshPresenceRelay: Kernel.MeshPresenceRelay,
        OrganismMeshRoot: Kernel.OrganismMeshRoot,
        Expansion: Kernel.Expansion,
        ExpansionMeta: Kernel.ExpansionMeta
      };

      window.PulseBinaryKernel = window.PulseBinaryKernel
        ? Object.freeze({ ...window.PulseBinaryKernel, ...exposed })
        : Object.freeze(exposed);
    })
    .catch((_err) => {
      // Outside organism: optional symbolic logging if desired.
      // console.error("[PulseBinaryOS-v24-IMMORTAL-SPINE++] Kernel bootstrap failed:", _err);
    });
}

// ============================================================================
//  EXPORTS — FULL BINARY OS KERNEL (v24-IMMORTAL-SPINE++)
// ============================================================================

export const PulseBinaryOSv24Immortal = {
  ...PULSE_BINARY_OS_CONTEXT,
  Kernel: PulseBinaryOSKernelPromise
};

export default PulseBinaryOSv24Immortal;
