// ============================================================================
//  PulseBinaryOS-v30-IMMORTAL-SPINE++++.js
//  BINARY-NATIVE ORGANISM KERNEL — SPINE / REFLEX ENGINE (v30-IMMORTAL-SPINE++++)
// ============================================================================
//  ROLE:
//    - Binary-native OS kernel of PulseOS v30-IMMORTAL++++.
//    - Boots the organism using pure binary cognition, reflex, and wiring.
//    - ZERO symbolic execution inside core, ZERO browser impurities in kernel.
//    - Reflex organism: fast, deterministic, mutation-proof, presence + mesh aware.
//    - Dual-mode organism: binary-primary, symbolic-aware (metadata-only).
//
//  SYMBOLIC RELATION:
//    - Symbolic kernel (PulseOS Cortex / Brain) is the cortex.
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

// ============================================================================
//  ORGANISM BOOTSTRAP SET — v16 CORE, v30++++ WORLD-LAYER
// ============================================================================

import { withModuleInitGuard, withOrganGuard } from "./PulseOSGovernor-v30.js"; // Supervisor organ
import * as PulseOSBrain from "./PulseOSBrain-v30.js";                         // CNS brain organ (v30)
import * as PulseOSEvolution from "./PulseOSEvolution-v30-Immortal-CoreMemory.js"; // Evolution organ (v30)
import * as PulseSpinalCord from "./PulseOSSpinalCord-v30.js";                 // Wiring organ (v24)

// Presence / Mesh presence (symbolic/OS side, optional)
import * as PulseOSPresence from "./PulseOSPresence-v30.js";                   // OS Presence Organ (optional)

// Binary + symbolic mesh environment (IMMORTAL v16)
import {
  createBinaryMeshEnvironment as createBinaryMeshEnv
} from "../PULSE-MESH/PulseMeshBinary-v30.js";

// PULSE OS Expansion — v24 world barrel (still v24 surface)
import {
  createPulseExpansion,
  pulseExpansion,
  PulseExpansionMeta
} from "../PULSE-EXPANSION/PULSE-EXPANSION-WORLD.js";

// Global binary OS context (injected by loader / bundler)
const PULSE_BINARY_OS_CONTEXT =
  (typeof globalThis !== "undefined" && globalThis.PULSE_BINARY_OS_CONTEXT)
    ? globalThis.PULSE_BINARY_OS_CONTEXT
    : {
        region: "unknown",
        build: "dev",
        epoch: "v30-IMMORTAL++++"
      };


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

  // 1) Evolution organ (binary growth engine, v30)
  const Evolution =
    typeof PulseOSEvolution.PulseOSEvolution === "function"
      ? PulseOSEvolution.PulseOSEvolution({ understanding: meta })
      : PulseOSEvolution;

  // 2) Brain organ (binary CNS, v30)
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

  // 4) CORE MEMORY (if v30 stack exposes it via Evolution or Brain)
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

  // PURE BINARY ORGANISM KERNEL (v30++++ surface, v16 core)
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
      "PulseBinaryOSKernel-v30-IMMORTAL-SPINE++++",
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
  PulseBinaryOSKernelPromise.then((Kernel) => {
    const shadow = {
      meta: Kernel.meta,

      Vitals: {
        generate: () => Kernel?.Vitals?.generateVitals?.()
      },

      Sentience: {
        snapshot: () => Kernel?.Sentience?.snapshot?.()
      },

      Consciousness: {
        latest: () => Kernel?.Consciousness?.generateConsciousnessPacket?.()
      }
    };

    window.PulseBinary = Kernel;

    window.PulseBinary = window.PulseBinary
      ? Object.freeze({ ...window.PulseBinary, ...shadow })
      : Object.freeze(shadow);
  });
}

// ============================================================================
//  EXPORTS — FULL BINARY OS KERNEL (v30-IMMORTAL-SPINE++++)
// ============================================================================

export const PulseBinaryOSv30Immortal = {
  ...PULSE_BINARY_OS_CONTEXT,
  Kernel: PulseBinaryOSKernelPromise
};

export default PulseBinaryOSv30Immortal;
