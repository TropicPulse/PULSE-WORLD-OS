// ============================================================================
// FILE: BinaryMesh-v24-IMMORTAL++.js
// BINARY MESH — v24-IMMORTAL++
// “PURE BINARY CONNECTIVE TISSUE / BINARY-FIRST / SYMBOLIC FALLBACK / BLUETOOTH-PRESENCE-AWARE”
// ============================================================================
//
// ROLE:
//   • Primary binary connective tissue between binary organs.
//   • Zero symbolic data in the binary path (0/1 arrays only).
//   • Deterministic, drift-proof, mutation-safe, presence-aware.
//   • Dual-band aware (binary primary, symbolic fallback).
//   • Bluetooth presence–aware via metadata (no device control).
//   • Falls back to symbolic PulseMesh when binary contract is violated.
//   • Exposes read-only BinaryMeshArtery v3 for NodeAdmin/Overmind.
//
// ARCHITECTURAL POSITION:
//   • Lives in mesh_binary layer.
//   • Sits under OrganismMesh as the binary nervous system.
//   • Talks to symbolic mesh via fallback (PulseMeshFlow, PresenceRelay, etc.).
//   • Never routes, never computes semantics — only validates and passes bits.
//
// GUARANTEES (v24-IMMORTAL++):
//   • No randomness, no timing-based branching, no env access.
//   • No dynamic imports, no eval.
//   • No network, no filesystem.
//   • Zero mutation of input bits.
//   • Mesh-topology-aware only via symbolic fallback.
//   • Presence-aware only via control metadata (band, presenceTag).
//   • Bluetooth-aware only via control metadata (bluetoothPresence).
//   • Artery metrics are local, read-only, advisory-only.
// ============================================================================
import {
  OrganismIdentity,
  buildPulseOrganismMap as PulseOrganismMap
} from "./PULSE-WORLD-MAP.js";
const Identity = OrganismIdentity(import.meta.url);

// 2 — EXPORT GENOME METADATA
export const BinaryMeshMeta = Identity.OrganMeta;
export const pulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
// export const PULSE_EARN_IMMUNE_CONTEXT = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

// ============================================================================
// IMPORTS — MESH SUBSYSTEMS (SYMBOLIC SIDE)
// ============================================================================

// 0 — CORE ORGANISM BOOT
import { createOrganismMesh } from "./PulseMeshOrganism-v24.js";

// 1 — SPINE (root of mesh nervous system)
import PulseMeshSpine from "./PulseMeshSpine-v24.js";

// 2 — FLOW (mesh circulation)
import PulseMeshFlow from "./PulseMeshFlow-V24.js";

// 3 — PRESENCE RELAY (mesh → world presence)
import PulseMeshPresenceRelay from "./PulseMeshPresenceRelay-v24.js";

// 4 — COGNITION (mesh-level cognition)
import PulseMeshCognition from "./PulseMeshCognition-v24.js";

// 5 — ENDOCRINE (mesh hormones)
import PulseMeshEndocrineSystem from "./PulseMeshEndocrineSystem-v24.js";

// 6 — IMMUNE SYSTEM (mesh immune layer)
import PulseMeshImmuneSystem from "./PulseMeshImmuneSystem-v24.js";

// 7 — ORGANS (mesh organ registry)
import PulseMeshOrgans from "./PulseMeshOrgans-V24.js";

// 8 — THALAMUS (relay after organs)
import PulseMeshThalamus from "./PulseMeshThalamus-V24.js";

// ============================================================================
// WORLD / PRESENCE LAYER
// ============================================================================
import PresenceAIView from "./PulseMeshPresenceAIView-V24.js";
import MentorUpgradeRequest from "./PulseMeshMentorUpgradeRequest-V24.js";
import { createPulseWorldSocialGraph } from "../PULSE-X/PulseWorldSocialGraph-v20.js";

// ============================================================================
// CORTEX + TENDONS (SHAPING LAYERS — ALWAYS LAST)
// ============================================================================
import { applyPulseCortex } from "./PulseMeshCortex-V24.js";
import { applyPulseMeshTendons } from "./PulseMeshTendons-V24.js";

// ============================================================================
// INTERNAL HELPERS
// ============================================================================
function isPureBinary(bits, maxBitsLength) {
  if (!Array.isArray(bits)) return false;
  const len = bits.length;
  if (len === 0 || len > maxBitsLength) return false;
  for (let i = 0; i < len; i++) {
    const b = bits[i];
    if (b !== 0 && b !== 1) return false;
  }
  return true;
}

function safeLog(fn, fallback) {
  if (typeof fn === "function") return fn;
  if (typeof console !== "undefined" && typeof fallback === "function") return fallback;
  return () => {};
}

function clamp01(v) {
  if (v <= 0) return 0;
  if (v >= 1) return 1;
  return v;
}

// BinaryMeshArtery v3 — local, read-only, no timing-based branching
function computeBinaryMeshArtery(state) {
  const total = state.totalTransmits;
  const fallbacks = state.totalFallbacks;
  const maxBits = state.maxBitsLength || 1;

  const fallbackRatio = total > 0 ? Math.min(1, fallbacks / total) : 0;
  const avgBits = total > 0 ? Math.min(1, state.totalBits / (total * maxBits)) : 0;

  const pressure = Math.max(0, Math.min(1, (fallbackRatio * 0.7 + avgBits * 0.3)));
  const throughput = Math.max(0, Math.min(1, 1 - pressure));
  const cost = Math.max(0, Math.min(1, pressure * (1 - throughput)));
  const budget = Math.max(0, Math.min(1, throughput - cost));

  function bucket(v) {
    if (v >= 0.9) return "elite";
    if (v >= 0.75) return "high";
    if (v >= 0.5) return "medium";
    if (v >= 0.25) return "low";
    return "critical";
  }

  function bucketPressure(v) {
    if (v >= 0.9) return "overload";
    if (v >= 0.7) return "high";
    if (v >= 0.4) return "medium";
    if (v > 0) return "low";
    return "none";
  }

  function bucketCost(v) {
    if (v >= 0.8) return "heavy";
    if (v >= 0.5) return "moderate";
    if (v >= 0.2) return "light";
    if (v > 0) return "negligible";
    return "none";
  }

  const btAvgLinkQuality =
    state.btLinkQualitySamples > 0
      ? state.btLinkQualitySum / state.btLinkQualitySamples
      : 0;

  return Object.freeze({
    totalTransmits: total,
    totalFallbacks: fallbacks,
    totalBits: state.totalBits,
    maxBitsLength: maxBits,
    fallbackRatio,
    avgBitsRatio: avgBits,
    throughput,
    pressure,
    cost,
    budget,
    throughputBucket: bucket(throughput),
    pressureBucket: bucketPressure(pressure),
    costBucket: bucketCost(cost),
    budgetBucket: bucket(budget),
    lastFallbackReason: state.lastFallbackReason || null,
    lastFrom: state.lastFrom || null,

    bluetoothEvents: state.btEvents,
    bluetoothNear: state.btNear,
    bluetoothMid: state.btMid,
    bluetoothFar: state.btFar,
    bluetoothUnknown: state.btUnknown,
    bluetoothAvgLinkQuality: btAvgLinkQuality
  });
}

function classifyBluetoothPresenceOnState(state, bluetoothPresence) {
  if (!bluetoothPresence || typeof bluetoothPresence !== "object") return;

  state.btEvents += 1;

  const proximity = bluetoothPresence.proximityTier || "unknown";
  if (proximity === "near") {
    state.btNear += 1;
  } else if (proximity === "mid") {
    state.btMid += 1;
  } else if (proximity === "far") {
    state.btFar += 1;
  } else {
    state.btUnknown += 1;
  }

  const qRaw = Number(bluetoothPresence.linkQuality);
  if (Number.isFinite(qRaw)) {
    const q = clamp01(qRaw);
    state.btLinkQualitySum += q;
    state.btLinkQualitySamples += 1;
  }
}

// ============================================================================
// BINARY MESH FACTORY — v24-IMMORTAL++ (WITH CORTEX + TENDONS APPLIED)
// ============================================================================
export function createBinaryMesh({
  symbolicMesh,
  trace = false,
  maxBitsLength = 64,
  defaultBand = "binary",
  defaultPresenceTag = "BinaryMesh-v24"
} = {}) {

  const links = Object.create(null);

  const logWarn = safeLog(globalThis?.warn, console?.warn);
  const logInfo = safeLog(globalThis?.log, console?.log);

  // local artery state (no timing-based branching)
  const arteryState = {
    totalTransmits: 0,
    totalFallbacks: 0,
    totalBits: 0,
    lastFallbackReason: null,
    lastFrom: null,
    maxBitsLength,

    // bluetooth artery metadata
    btEvents: 0,
    btNear: 0,
    btMid: 0,
    btFar: 0,
    btUnknown: 0,
    btLinkQualitySum: 0,
    btLinkQualitySamples: 0
  };

  function link(from, to) {
    links[from] = to;
  }

  function getBinaryMeshArtery() {
    return computeBinaryMeshArtery(arteryState);
  }

  // -------------------------------------------------------------------------
  // SYMBOLIC FALLBACK (binary → symbolic) WITH CORTEX + TENDONS
  // -------------------------------------------------------------------------
  function fallback(reason, from, bits, {
    band = defaultBand,
    presenceTag = defaultPresenceTag,
    bluetoothPresence = null
  } = {}) {

    arteryState.totalFallbacks += 1;
    arteryState.lastFallbackReason = reason;
    arteryState.lastFrom = from;
    arteryState.totalBits += Array.isArray(bits) ? bits.length : 0;
    classifyBluetoothPresenceOnState(arteryState, bluetoothPresence);

    if (!symbolicMesh) {
      throw new Error(`BinaryMesh fallback (${reason}) from:${from} but no symbolicMesh provided`);
    }

    if (trace) {
      logWarn(
        `[BinaryMesh v24] FALLBACK (${reason}) from:${from} band:${band} presence:${presenceTag}`,
        { bits, bluetoothPresence }
      );
    }

    const impulse = {
      type: "binaryFallback",
      reason,
      from,
      bits,
      band,
      presenceTag,
      bluetoothPresence,
      flags: {
        binary_fallback: true,
        binary_reason: reason,
        binary_presence_tag: presenceTag
      }
    };

    applyPulseCortex(impulse, {
      binaryMode: false,
      dualMode: false,
      symbolicMode: true
    });

    applyPulseMeshTendons(impulse);

    return symbolicMesh.transmit(from, impulse, {
      band: "symbolic",
      presenceTag: "PulseMesh-v24",
      bluetoothPresence
    });
  }

  // -------------------------------------------------------------------------
  // PURE BINARY TRANSMISSION
  // -------------------------------------------------------------------------
  function transmit(from, bits, {
    band = defaultBand,
    presenceTag = defaultPresenceTag,
    bluetoothPresence = null
  } = {}) {

    arteryState.totalTransmits += 1;
    arteryState.totalBits += Array.isArray(bits) ? bits.length : 0;
    classifyBluetoothPresenceOnState(arteryState, bluetoothPresence);

    const to = links[from];

    if (!to) {
      return fallback("missing-link", from, bits, { band, presenceTag, bluetoothPresence });
    }

    if (!isPureBinary(bits, maxBitsLength)) {
      return fallback("non-binary-input", from, bits, { band, presenceTag, bluetoothPresence });
    }

    if (trace) {
      logInfo(
        `[BinaryMesh v24] ${from} → ${to} band:${band} presence:${presenceTag}`,
        { bits, bluetoothPresence }
      );
    }

    // pure binary path: bits are passed unchanged
    return bits;
  }

  return Object.freeze({
    meta: BinaryMeshMeta,
    link,
    transmit,
    fallback,
    getBinaryMeshArtery
  });
}

// ============================================================================
// LOCAL BINARY SUBSYSTEMS — LIVE ON THIS PAGE (v24-IMMORTAL++)
// ============================================================================
//
//  PulseBinaryMeshPresence:
//    • Thin wrapper that exposes a `pulse` API over the binary mesh.
//    • Used for presence-band binary signaling (pings, heartbeats, etc.).
//
//  PulseBinaryMeshPrime:
//    • Extension point for future binary-first logic.
//    • Currently just forwards to binaryMesh.transmit (pure connective tissue).
// ============================================================================
const PulseBinaryMeshPresence = {
  create({ context, binaryMesh, log, warn }) {
    function prewarm() {
      log?.("[BinaryPresence v24] prewarm");
    }

    function pulse(from, bits, options) {
      return binaryMesh.transmit(from, bits, options);
    }

    function artery() {
      return binaryMesh.getBinaryMeshArtery();
    }

    return Object.freeze({
      prewarm,
      pulse,
      artery
    });
  }
};

const PulseBinaryMeshPrime = {
  create({ context, binaryMesh, log, warn }) {
    function prewarm() {
      log?.("[BinaryPrime v24] prewarm");
    }

    function process(from, bits, options) {
      return binaryMesh.transmit(from, bits, options);
    }

    function artery() {
      return binaryMesh.getBinaryMeshArtery();
    }

    return Object.freeze({
      prewarm,
      process,
      artery
    });
  }
};

// ============================================================================
// BINARY MESH ENVIRONMENT — v24-IMMORTAL++
//   BINARY BARREL: BOOT ORGANISM, LOAD SUBSYSTEMS, WIRE, PREWARM
// ============================================================================
export function createBinaryMeshEnvironment({
  context = {},
  trace = false,
  maxBitsLength = 64,
  defaultBand = "binary",
  defaultPresenceTag = "BinaryMesh-v24"
} = {}) {

  const log   = context.log   || safeLog(globalThis?.log, console?.log);
  const warn  = context.warn  || safeLog(globalThis?.warn, console?.warn);
  const error = context.error || safeLog(globalThis?.error, console?.error);

  // -------------------------------------------------------
  // 0) BOOT THE ORGANISM (CORTEX + TENDONS INJECTED)
  // -------------------------------------------------------
  const organism = createOrganismMesh({
    context: {
      ...context,
      applyPulseCortex,
      applyPulseMeshTendons
    },
    symbolicMeshEnv: context.symbolicMeshEnv,
    binaryMeshEnv: context.binaryMeshEnv,
    trace
  });

  const symbolicMesh =
    organism.symbolicMeshEnv?.symbolicMesh || organism.symbolicMeshEnv;

  const binaryMesh = createBinaryMesh({
    symbolicMesh,
    trace,
    maxBitsLength,
    defaultBand,
    defaultPresenceTag
  });

  // -------------------------------------------------------
  // 1) BINARY SUBSYSTEMS
  // -------------------------------------------------------
  const binaryPresence = PulseBinaryMeshPresence?.create
    ? PulseBinaryMeshPresence.create({ context, binaryMesh, log, warn })
    : null;

  const binaryPrime = PulseBinaryMeshPrime?.create
    ? PulseBinaryMeshPrime.create({ context, binaryMesh, log, warn })
    : null;

  // -------------------------------------------------------
  // 2) SYMBOLIC-ADJACENT SUBSYSTEMS
  // -------------------------------------------------------
  const meshFlow = PulseMeshFlow?.create
    ? PulseMeshFlow.create({ context, mesh: symbolicMesh, log, warn })
    : null;

  const meshPresenceRelay = PulseMeshPresenceRelay?.create
    ? PulseMeshPresenceRelay.create({
        MeshBus: context.MeshBus,
        SystemClock: context.SystemClock,
        IdentityDirectory: context.IdentityDirectory,
        log
      })
    : null;

  const meshCognition = PulseMeshCognition?.create
    ? PulseMeshCognition.create({ context, mesh: symbolicMesh, flow: meshFlow, log, warn })
    : null;

  const meshEndocrine = PulseMeshEndocrineSystem?.create
    ? PulseMeshEndocrineSystem.create({ context, mesh: symbolicMesh, log, warn })
    : null;

  const meshImmune = PulseMeshImmuneSystem?.create
    ? PulseMeshImmuneSystem.create({ context, mesh: symbolicMesh, log, warn })
    : null;

  const meshOrgans = PulseMeshOrgans?.create
    ? PulseMeshOrgans.create({ context, mesh: symbolicMesh, log, warn })
    : null;

  const meshThalamus = PulseMeshThalamus?.create
    ? PulseMeshThalamus.create({
        log,
        warn,
        error,
        groupCollapsed: context.groupCollapsed || console.groupCollapsed?.bind(console),
        groupEnd: context.groupEnd || console.groupEnd?.bind(console)
      })
    : null;

  const meshSpine = typeof PulseMeshSpine?.create === "function"
    ? PulseMeshSpine.create({ context, mesh: symbolicMesh, log, warn })
    : null;

  const presenceAIView = PresenceAIView?.create
    ? PresenceAIView.create({ context, mesh: symbolicMesh, log, warn })
    : null;

  const mentorUpgradeRequest = MentorUpgradeRequest?.create
    ? MentorUpgradeRequest.create({ context, mesh: symbolicMesh, log, warn })
    : null;

  const socialGraph = typeof createPulseWorldSocialGraph === "function"
    ? createPulseWorldSocialGraph({
        PowerUserRanking: context.PowerUserRanking,
        log,
        warn,
        error
      })
    : null;

  // -------------------------------------------------------
  // 3) REGISTRY
  // -------------------------------------------------------
  const ALL_SYSTEMS = Object.freeze({
    // core
    binaryMesh,

    // binary subsystems
    binaryPresence,
    binaryPrime,

    // symbolic-adjacent subsystems
    meshFlow,
    meshPresenceRelay,
    meshCognition,
    meshEndocrine,
    meshImmune,
    meshOrgans,
    meshThalamus,
    meshSpine,
    presenceAIView,
    mentorUpgradeRequest,
    socialGraph
  });

  // -------------------------------------------------------
  // 4) PREWARM
  // -------------------------------------------------------
  function prewarm() {
    log("[BinaryMesh v24] Prewarm start");

    for (const [name, system] of Object.entries(ALL_SYSTEMS)) {
      if (system && typeof system.prewarm === "function") {
        try {
          system.prewarm();
          log("[BinaryMesh v24] Prewarmed system", { name });
        } catch (e) {
          warn("[BinaryMesh v24] Prewarm failed", { name, error: e?.message });
        }
      }
    }

    log("[BinaryMesh v24] Prewarm complete");
  }

  // -------------------------------------------------------
  // 5) PUBLIC ENVIRONMENT API
  // -------------------------------------------------------
  return Object.freeze({
    meta: BinaryMeshMeta,

    // core
    binaryMesh,

    // binary subsystems
    binaryPresence,
    binaryPrime,

    // symbolic-adjacent subsystems
    meshFlow,
    meshPresenceRelay,
    meshCognition,
    meshEndocrine,
    meshImmune,
    meshOrgans,
    meshThalamus,
    meshSpine,
    presenceAIView,
    mentorUpgradeRequest,
    socialGraph,

    prewarm,
    systems: ALL_SYSTEMS,

    organism
  });
}

export default {
  BinaryMeshMeta,
  createBinaryMesh,
  createBinaryMeshEnvironment
};
