// ============================================================================
// FILE: PulseMesh-v24-IMMORTAL++.js
// PULSE SYMBOLIC MESH — v24-IMMORTAL++
// “PURE SYMBOLIC CONNECTIVE TISSUE / SEMANTIC PATH / BINARY-AWARE / CHUNK-AWARE / BLUETOOTH-PRESENCE-AWARE”
// ============================================================================
//
// ROLE:
//   • Primary symbolic connective tissue between symbolic organs.
//   • Carries semantic packets (plain objects) only — no raw binary arrays.
//   • Deterministic, drift-proof, mutation-safe, presence-aware, chunk-aware.
//   • Dual-band aware (symbolic primary, binary-aware via metadata).
//   • Falls back to a provided fallbackProxy when contract is violated.
//   • Exposes IMMORTAL-grade mesh artery metrics (throughput, pressure, cost, budget).
//   • Bluetooth presence metadata can be threaded through control path.
//
// ARCHITECTURAL POSITION:
//   • Lives in SymbolicNervousSystem layer.
//   • Sits under OrganismMesh as the symbolic nervous system.
//   • Talks to binary mesh via fallbackProxy or higher layers.
//   • Never executes code, never routes by itself — only validates + passes.
//   • Chunk/prewarm-aware only via metadata (never imperative).
//
// GUARANTEES (v24-IMMORTAL++):
//   • No randomness, no dynamic imports, no eval.
//   • No network, no filesystem.
//   • Zero mutation of input packets.
//   • Presence-aware only via control metadata (band, presenceTag, bandSignature, bluetoothPresence).
//   • Chunk/prewarm/cache hints are metadata-only, non-imperative.
//   • Mesh artery metrics are deterministic, window-based, and read-only.
//
// CONTRACT (v24):
//   • INPUT (data path):
//       - packet: object (symbolic, non-array)
//   • INPUT (control path):
//       - from: string
//       - options: {
//           band?,
//           presenceTag?,
//           bandSignature?,
//           trace?,
//           chunkHint?,
//           prewarmHint?,
//           cacheHint?,
//           bluetoothPresence?: {
//             deviceId?: string,
//             linkQuality?: number,   // 0..1
//             proximityTier?: string, // "near" | "mid" | "far" | "unknown"
//             transport?: "ble" | "wifi" | "wired" | "unknown"
//           }
//         }
//   • OUTPUT:
//       - packet (unchanged) OR fallback result from fallbackProxy.
//       - meshArtery snapshot available via getMeshArtery().
//
// SAFETY:
//   • Pure symbolic path is metadata-only, non-executable.
//   • Fallback path is delegated to injected fallbackProxy.
//   • Mesh artery is observational only — never used to mutate routing.
// ============================================================================
import {
  OrganismIdentity,
  buildPulseOrganismMap as PulseOrganismMap,
  buildPulseOrganismMap as buildOrganismMap
} from "./PULSE-WORLD-MAP.js";
const Identity = OrganismIdentity(import.meta.url);

// 2 — EXPORT GENOME METADATA
export const PulseMeshMeta = Identity.OrganMeta;
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
// INTERNAL HELPERS — v24-IMMORTAL++
// ============================================================================
function isSymbolicPacket(packet) {
  // Symbolic packets are plain objects (non-null, non-array).
  return packet && typeof packet === "object" && !Array.isArray(packet);
}

function safeLog(fn, fallback) {
  if (typeof fn === "function") return fn;
  if (typeof console !== "undefined" && typeof fallback === "function") return fallback;
  return () => {};
}

// ---------------------------------------------------------------------------
// MESH ARTERY HELPERS — v4 (PURE, STATEFUL BUT LOCAL TO MESH CORE)
// ---------------------------------------------------------------------------
function bucketLevel(v) {
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

function computeMeshArtery({
  total,
  window,
  windowMs,
  errors,
  fallbacks
}) {
  const evalDensity = Math.min(1, window / 1024);
  const errorRate = window > 0 ? Math.min(1, errors / window) : 0;
  const fallbackRate = window > 0 ? Math.min(1, fallbacks / window) : 0;

  const pressureBase = Math.max(
    0,
    Math.min(1, (evalDensity * 0.5 + errorRate * 0.3 + fallbackRate * 0.2))
  );

  const pressure = pressureBase;
  const throughput = Math.max(0, Math.min(1, 1 - pressure));
  const cost = Math.max(0, Math.min(1, pressure * (1 - throughput)));
  const budget = Math.max(0, Math.min(1, throughput - cost));

  return Object.freeze({
    total,
    window,
    windowMs,
    errors,
    fallbacks,
    evalDensity,
    errorRate,
    fallbackRate,
    throughput,
    pressure,
    cost,
    budget,
    throughputBucket: bucketLevel(throughput),
    pressureBucket: bucketPressure(pressure),
    costBucket: bucketCost(cost),
    budgetBucket: bucketLevel(budget)
  });
}

// ---------------------------------------------------------------------------
// BLUETOOTH PRESENCE NORMALIZATION — v24++
// ---------------------------------------------------------------------------
function normalizeBluetoothPresence(bt = {}) {
  const deviceId = typeof bt.deviceId === "string" ? bt.deviceId : null;

  const linkQualityRaw = Number(bt.linkQuality);
  const linkQuality = Number.isFinite(linkQualityRaw)
    ? Math.max(0, Math.min(1, linkQualityRaw))
    : 0;

  let proximityTier = bt.proximityTier || "unknown";
  if (!["near", "mid", "far", "unknown"].includes(proximityTier)) {
    proximityTier = "unknown";
  }

  let transport = bt.transport || "unknown";
  if (!["ble", "wifi", "wired", "unknown"].includes(transport)) {
    transport = "unknown";
  }

  return {
    deviceId,
    linkQuality,
    proximityTier,
    transport
  };
}

// ============================================================================
// PULSE MESH CORE — v24‑IMMORTAL++
// ============================================================================
export function createPulseMesh({
  fallbackProxy,
  trace = false,
  defaultBand = "symbolic",
  defaultPresenceTag = "PulseMesh-v24",
  windowMs = 60000
} = {}) {

  // links[from] = to
  const links = Object.create(null);

  const logWarn = safeLog(globalThis?.warn, console?.warn);
  const logInfo = safeLog(globalThis?.log, console?.log);

  // artery counters
  let _total = 0;
  let _window = 0;
  let _errors = 0;
  let _fallbacks = 0;
  let _windowStart = Date.now();

  function rollWindow(now) {
    if (now - _windowStart >= windowMs) {
      _windowStart = now;
      _window = 0;
      _errors = 0;
      _fallbacks = 0;
    }
  }

  function getMeshArtery() {
    const now = Date.now();
    rollWindow(now);
    return computeMeshArtery({
      total: _total,
      window: _window,
      windowMs,
      errors: _errors,
      fallbacks: _fallbacks
    });
  }

  // -------------------------------------------------------------------------
  // LINK REGISTRATION (symbolic-only)
  // -------------------------------------------------------------------------
  function link(from, to) {
    links[from] = to;
  }

  // -------------------------------------------------------------------------
  // SMART SYMBOLIC FALLBACK (presence-aware, artery-aware, bluetooth-aware)
  // -------------------------------------------------------------------------
  function fallback(reason, from, packet, {
    band = defaultBand,
    presenceTag = defaultPresenceTag,
    bandSignature = null,
    chunkHint = null,
    prewarmHint = null,
    cacheHint = null,
    bluetoothPresence = null
  } = {}) {

    if (!fallbackProxy) {
      _errors++;
      throw new Error(
        `PulseMesh v24 fallback triggered (${reason}) from:${from} but no fallbackProxy provided`
      );
    }

    _fallbacks++;

    const now = Date.now();
    rollWindow(now);
    _total++;
    _window++;

    const bt = normalizeBluetoothPresence(bluetoothPresence || {});

    if (trace) {
      logWarn(
        `[PulseMesh v24] FALLBACK (${reason}) from:${from} band:${band} presence:${presenceTag} bandSig:${bandSignature || "none"}`,
        { packet, chunkHint, prewarmHint, cacheHint, bluetoothPresence: bt }
      );
    }

    const artery = getMeshArtery();
    const control = {
      band,
      presenceTag,
      bandSignature,
      reason,
      chunkHint,
      prewarmHint,
      cacheHint,
      meshArtery: artery,
      bluetoothPresence: bt
    };

    return fallbackProxy.exchange
      ? fallbackProxy.exchange(packet, control)
      : fallbackProxy(packet, control);
  }

  // -------------------------------------------------------------------------
  // PURE SYMBOLIC TRANSMISSION (semantic connective tissue)
  // -------------------------------------------------------------------------
  function transmit(from, packet, {
    band = defaultBand,
    presenceTag = defaultPresenceTag,
    bandSignature = null,
    chunkHint = null,
    prewarmHint = null,
    cacheHint = null,
    bluetoothPresence = null
  } = {}) {

    const now = Date.now();
    rollWindow(now);
    _total++;
    _window++;

    const to = links[from];

    if (!to) {
      return fallback("missing-link", from, packet, {
        band,
        presenceTag,
        bandSignature,
        chunkHint,
        prewarmHint,
        cacheHint,
        bluetoothPresence
      });
    }

    if (!isSymbolicPacket(packet)) {
      return fallback("non-symbolic-input", from, packet, {
        band,
        presenceTag,
        bandSignature,
        chunkHint,
        prewarmHint,
        cacheHint,
        bluetoothPresence
      });
    }

    const bt = normalizeBluetoothPresence(bluetoothPresence || {});

    if (trace) {
      logInfo(
        `[PulseMesh v24] ${from} → ${to} band:${band} presence:${presenceTag} bandSig:${bandSignature || "none"}`,
        { packet, chunkHint, prewarmHint, cacheHint, bluetoothPresence: bt }
      );
    }

    // Pure symbolic path — never mutate packets, never interpret them.
    return packet;
  }

  // -------------------------------------------------------------------------
  // PUBLIC CORE API
  // -------------------------------------------------------------------------
  return Object.freeze({
    meta: PulseMeshMeta,
    link,
    transmit,
    fallback,
    getMeshArtery
  });
}

// ============================================================================
// PULSE MESH ENVIRONMENT — v24‑IMMORTAL++
//   LOAD ALL MESH SYSTEMS, WIRE, PREWARM, BOOT VIA ORGANISM
// ============================================================================
//
//  ROLE:
//    • Creates the symbolic mesh core (v24-IMMORTAL++).
//    • Boots OrganismMesh with Cortex + Tendons injected.
//    • Wires symbolic mesh subsystems in correct IMMORTAL order.
//    • Provides a single `prewarm` entrypoint for the symbolic mesh world.
//    • Exposes mesh artery snapshot via meshCore.getMeshArtery().
// ============================================================================
export function createPulseMeshEnvironment({
  context = {},
  fallbackProxy,
  trace = false,
  defaultBand = "symbolic",
  defaultPresenceTag = "PulseMesh-v24",
  windowMs = 60000
} = {}) {

  const log   = context.log   || safeLog(globalThis?.log, console?.log);
  const warn  = context.warn  || safeLog(globalThis?.warn, console?.warn);
  const error = context.error || safeLog(globalThis?.error, console?.error);

  // -------------------------------------------------------
  // 0) CREATE SYMBOLIC CORE (CORTEX + TENDONS APPLIED IN FALLBACK)
  // -------------------------------------------------------
  const symbolicMesh = createPulseMesh({
    fallbackProxy,
    trace,
    defaultBand,
    defaultPresenceTag,
    windowMs
  });

  // -------------------------------------------------------
  // 1) BOOT ORGANISM (CORTEX + TENDONS INJECTED)
  // -------------------------------------------------------
  const organism = createOrganismMesh({
    context: {
      ...context,
      applyPulseCortex,
      applyPulseMeshTendons
    },
    symbolicMeshEnv: { symbolicMesh },
    binaryMeshEnv: context.binaryMeshEnv,
    trace
  });

  const meshCore = organism.symbolicMeshEnv?.symbolicMesh || symbolicMesh;

  // -------------------------------------------------------
  // 2) SPINE (ROOT OF MESH NERVOUS SYSTEM)
  // -------------------------------------------------------
  const meshSpine = PulseMeshSpine?.create
    ? PulseMeshSpine.create({ context, mesh: meshCore, log, warn })
    : null;

  // -------------------------------------------------------
  // 3) FLOW (MESH CIRCULATION)
  // -------------------------------------------------------
  const meshFlow = PulseMeshFlow?.create
    ? PulseMeshFlow.create({ context, mesh: meshCore, log, warn })
    : null;

  // -------------------------------------------------------
  // 4) PRESENCE RELAY (MESH → WORLD PRESENCE)
  // -------------------------------------------------------
  const meshPresenceRelay = PulseMeshPresenceRelay?.create
    ? PulseMeshPresenceRelay.create({
        MeshBus: context.MeshBus,
        SystemClock: context.SystemClock,
        IdentityDirectory: context.IdentityDirectory,
        log
      })
    : null;

  // -------------------------------------------------------
  // 5) COGNITION (MESH-LEVEL COGNITION)
  // -------------------------------------------------------
  const meshCognition = PulseMeshCognition?.create
    ? PulseMeshCognition.create({ context, mesh: meshCore, flow: meshFlow, log, warn })
    : null;

  // -------------------------------------------------------
  // 6) ENDOCRINE / IMMUNE / ORGANS (STRUCTURAL LAYERS)
  // -------------------------------------------------------
  const meshEndocrine = PulseMeshEndocrineSystem?.create
    ? PulseMeshEndocrineSystem.create({ context, mesh: meshCore, log, warn })
    : null;

  const meshImmune = PulseMeshImmuneSystem?.create
    ? PulseMeshImmuneSystem.create({ context, mesh: meshCore, log, warn })
    : null;

  const meshOrgans = PulseMeshOrgans?.create
    ? PulseMeshOrgans.create({ context, mesh: meshCore, log, warn })
    : null;

  // -------------------------------------------------------
  // 7) THALAMUS (AFTER ORGANS)
  // -------------------------------------------------------
  const meshThalamus = PulseMeshThalamus?.create
    ? PulseMeshThalamus.create({
        log,
        warn,
        error,
        groupCollapsed: context.groupCollapsed || console.groupCollapsed?.bind(console),
        groupEnd: context.groupEnd || console.groupEnd?.bind(console)
      })
    : null;

  // -------------------------------------------------------
  // 8) WORLD LAYER (PRESENCE + MENTOR + SOCIAL GRAPH)
  // -------------------------------------------------------
  const presenceAIView = PresenceAIView?.create
    ? PresenceAIView.create({ context, mesh: meshCore, log, warn })
    : null;

  const mentorUpgradeRequest = MentorUpgradeRequest?.create
    ? MentorUpgradeRequest.create({ context, mesh: meshCore, log, warn })
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
  // 9) ENVIRONMENT REGISTRY (IMMORTAL ORDER)
  // -------------------------------------------------------
  const ALL_MESH_SYSTEMS = Object.freeze({
    symbolicMesh: meshCore,
    meshSpine,
    meshFlow,
    meshPresenceRelay,
    meshCognition,
    meshEndocrine,
    meshImmune,
    meshOrgans,
    meshThalamus,
    presenceAIView,
    mentorUpgradeRequest,
    socialGraph
  });

  // -------------------------------------------------------
  // 10) UNIVERSAL PREWARM (IMMORTAL ORDER)
  // -------------------------------------------------------
  function prewarm() {
    log("[PulseMesh v24] Prewarm start");

    for (const [name, system] of Object.entries(ALL_MESH_SYSTEMS)) {
      if (system?.prewarm) {
        try {
          system.prewarm();
          log("[PulseMesh v24] Prewarmed mesh system", { name });
        } catch (e) {
          warn("[PulseMesh v24] Prewarm failed", { name, error: e?.message });
        }
      }
    }

    log("[PulseMesh v24] Prewarm complete");
  }

  // -------------------------------------------------------
  // 11) PUBLIC API
  // -------------------------------------------------------
  return Object.freeze({
    meta: PulseMeshMeta,

    // core
    symbolicMesh: meshCore,

    // subsystems
    meshSpine,
    meshFlow,
    meshPresenceRelay,
    meshCognition,
    meshEndocrine,
    meshImmune,
    meshOrgans,
    meshThalamus,
    presenceAIView,
    mentorUpgradeRequest,
    socialGraph,

    // controls
    link: meshCore.link,
    transmit: meshCore.transmit,
    fallback: meshCore.fallback,
    getMeshArtery: meshCore.getMeshArtery,
    prewarm,

    systems: ALL_MESH_SYSTEMS,
    organism
  });
}

export const PulseMeshAbilities = {
  v24Immortal: true,
  bluetoothPresence: true,
  cacheHints: true,
  prewarmHints: true,
  chunkAware: true,
  arteryDeterministic: true
};

export default {
  PulseMeshMeta,
  createPulseMesh,
  createPulseMeshEnvironment
};
