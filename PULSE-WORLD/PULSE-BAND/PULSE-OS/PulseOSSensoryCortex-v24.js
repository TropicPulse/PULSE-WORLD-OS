// ============================================================================
// FILE: PulseOSPresence-v24-IMMORTAL.js
// PULSE OS PRESENCE ORGAN — v24-IMMORTAL
// OS-Level Presence • Deterministic • Metadata-Only • Membrane-Safe
// No Organs Exposed • No Identity Leaks • No Routing • Dualband + Advantage + CoreMemory-Aware
// ============================================================================
//
// LAWS (v24+IMMORTAL+PRESENCE+MESH):
//   • Presence organ is OS-level only — NOT a router, NOT a mesh brain.
//   • Emits metadata-only presence; never exposes organs, routes, CNS, or secrets.
//   • Never performs network calls, never talks to server directly.
//   • Internet center is Expansion ⇄ Server; Presence is a local field emitter.
//   • Binary-aware and dualband-aware, but symbolic-primary in semantics.
//   • Safe to broadcast into MeshBus / PresenceRelay as a self-presence packet.
//   • May carry advantage hints, but never computes or fetches advantage itself.
//   • May carry CoreMemory references, but never dereferences or mutates them.
//   • All advantage/world-lens/topology are snapshots from Brain/Expansion, not here.
// ============================================================================

import {
  OrganismIdentity,
  buildPulseOrganismMap as buildOrganismMap
} from "../PULSE-X/PulseWorldOrganismMap-v21.js";

const Identity = OrganismIdentity(import.meta.url);

// 2 — EXPORT GENOME METADATA (v24++)
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

export function createPulseOSPresence({
  SystemClock,       // uptime + organism age (safe, injected)
  IdentityDirectory, // safeName + safeId (no secrets)
  DeviceFingerprint, // safe, non-PII fingerprint (optional)
  CoreMemory,        // optional: { latestPresenceSnapshotId?: () => string | null }
  log,
  warn,
  error
}) {
  const meta = Object.freeze({
    layer: "PulseOSPresence",
    role: "OS_PRESENCE_ORGAN",
    version: "24-IMMORTAL",
    identity: "PulseOSPresence-v24-IMMORTAL",
    evo: Object.freeze({
      presenceOrgan: true,
      osLevel: true,
      deterministic: true,
      driftProof: true,
      zeroTrustSurface: true,
      zeroSecrets: true,
      zeroRouting: true,
      zeroOrgans: true,

      symbolicPrimary: true,
      binaryAware: true,
      dualBand: true,

      meshAware: true,
      bluetoothPresenceAware: true,

      internetCenterExternal: true,
      snapshotOnlyInputs: true,
      advantageHintAware: true,
      meshPresenceHintAware: true,
      coreMemoryAware: true,
      multiInstanceReady: true,
      clusterCoherence: true
    }),
    contract: Object.freeze({
      never: [
        "expose internal organs",
        "expose routing tables",
        "expose CNS",
        "expose private identity",
        "expose permissions",
        "expose OS internals",
        "dereference CoreMemory",
        "mutate CoreMemory"
      ],
      always: [
        "emit metadata-only presence",
        "stay deterministic",
        "stay membrane-safe",
        "stay binary-first",
        "stay read-only",
        "stay dualband-aware",
        "treat CoreMemory as opaque reference"
      ]
    })
  });

  // --------------------------------------------------------------------------
  // SAFE ACCESSORS (IMMORTAL: no direct Date.now; fall back to 0)
// --------------------------------------------------------------------------
  function safeNow() {
    try {
      return typeof SystemClock?.now === "function" ? SystemClock.now() : 0;
    } catch {
      return 0;
    }
  }

  function safeUptimeSeconds() {
    try {
      return typeof SystemClock?.uptimeSeconds === "function"
        ? SystemClock.uptimeSeconds()
        : 0;
    } catch {
      return 0;
    }
  }

  function safeOrganismAgeDays() {
    try {
      return typeof SystemClock?.organismAgeDays === "function"
        ? SystemClock.organismAgeDays()
        : 0;
    } catch {
      return 0;
    }
  }

  function safeDisplayName() {
    try {
      return typeof IdentityDirectory?.safeName === "function"
        ? IdentityDirectory.safeName("self")
        : "PulseOS";
    } catch {
      return "PulseOS";
    }
  }

  function safePublicId() {
    try {
      return typeof IdentityDirectory?.safeId === "function"
        ? IdentityDirectory.safeId("self")
        : "pulseos-self";
    } catch {
      return "pulseos-self";
    }
  }

  function safeFingerprint() {
    try {
      return typeof DeviceFingerprint?.safeFingerprint === "function"
        ? DeviceFingerprint.safeFingerprint()
        : null;
    } catch {
      return null;
    }
  }

  // v24: optional local advantage hint (pure metadata, no network, no secrets)
  function safeAdvantageHint() {
    try {
      const injected =
        typeof SystemClock?.advantageHint === "function"
          ? SystemClock.advantageHint()
          : null;

      if (injected && typeof injected === "object") {
        return {
          band: injected.band ?? "neutral",
          score: injected.score ?? null,
          stability: injected.stability ?? 1,
          ageMs: injected.ageMs ?? 0,
          source: injected.source ?? "injected",
          confidence: injected.confidence ?? 1,
          deviceTier: injected.deviceTier ?? "unknown",
          networkTier: injected.networkTier ?? "unknown",
          gpuTier: injected.gpuTier ?? "unknown"
        };
      }

      return {
        band: "neutral",
        score: null,
        stability: 1,
        ageMs: 0,
        source: "os-presence",
        confidence: 1,
        deviceTier: "unknown",
        networkTier: "unknown",
        gpuTier: "unknown"
      };
    } catch {
      return {
        band: "neutral",
        score: null,
        stability: 1,
        ageMs: 0,
        source: "fallback",
        confidence: 1,
        deviceTier: "unknown",
        networkTier: "unknown",
        gpuTier: "unknown"
      };
    }
  }

  // v24: mesh presence hint (topology-only, no routing)
  function safeMeshPresenceHint() {
    return {
      topology: "local-os-core",
      band: "mesh",
      relayPreferred: true
    };
  }

  // v24: CoreMemory reference (opaque id only)
  function safeCoreMemoryRef() {
    try {
      if (CoreMemory && typeof CoreMemory.latestPresenceSnapshotId === "function") {
        return CoreMemory.latestPresenceSnapshotId() || null;
      }
      return null;
    } catch {
      return null;
    }
  }

  // --------------------------------------------------------------------------
  // OS PRESENCE SIGNATURE (metadata-only, deterministic)
// --------------------------------------------------------------------------
  function getPresenceSignature() {
    const now = safeNow();
    const uptime = safeUptimeSeconds();
    const ageDays = safeOrganismAgeDays();
    const displayName = safeDisplayName();
    const publicId = safePublicId();
    const fingerprint = safeFingerprint();
    const advantageHint = safeAdvantageHint();
    const meshHint = safeMeshPresenceHint();
    const coreMemoryRef = safeCoreMemoryRef();

    return {
      meta,
      os: {
        displayName,
        publicId,
        fingerprint,
        version: meta.version
      },
      time: {
        now,
        uptimeSeconds: uptime,
        organismAgeDays: ageDays
      },
      presenceBand: "OS_CORE",
      bands: {
        symbolic: true,
        binary: true,
        default: "symbolic"
      },
      health: {
        status: "alive",
        stability: "stable",
        drift: "none"
      },
      mesh: {
        topologyHint: meshHint.topology,
        band: meshHint.band,
        relayPreferred: meshHint.relayPreferred
      },
      advantage: {
        band: advantageHint.band,
        score: advantageHint.score,
        deviceTier: advantageHint.deviceTier,
        networkTier: advantageHint.networkTier,
        gpuTier: advantageHint.gpuTier
      },
      coreMemory: {
        snapshotRef: coreMemoryRef
      }
    };
  }

  // --------------------------------------------------------------------------
  // SELF PRESENCE PACKET (for PresenceRelay / Mesh / HUD)
// --------------------------------------------------------------------------
  function getSelfPresencePacket() {
    const sig = getPresenceSignature();
    return {
      uid: sig.os.publicId,
      displayName: sig.os.displayName,

      presenceBand: sig.presenceBand,

      uptimeSeconds: sig.time.uptimeSeconds,
      organismAgeDays: sig.time.organismAgeDays,

      fingerprint: sig.os.fingerprint,

      advantageHint: sig.advantage,
      meshPresenceHint: sig.mesh,

      coreMemoryRef: sig.coreMemory.snapshotRef
    };
  }

  // --------------------------------------------------------------------------
  // HEARTBEAT — emits local presence packet (no network)
// --------------------------------------------------------------------------
  function heartbeat() {
    try {
      const packet = getSelfPresencePacket();
      log?.("presence", "OS heartbeat", packet);
      return packet;
    } catch (err) {
      warn?.("presence", "OS heartbeat failed", err);
      return null;
    }
  }

  return Object.freeze({
    meta,
    getPresenceSignature,
    getSelfPresencePacket,
    heartbeat
  });
}

// Default export for simple wiring
const DefaultPulseOSPresence = {
  create: createPulseOSPresence
};

export default DefaultPulseOSPresence;
