// ============================================================================
// FILE: PulseOSPresence-v24.js
// PULSE OS PRESENCE ORGAN — v24.0-Immortal++
// OS-Level Presence • Deterministic • Metadata-Only • Membrane-Safe
// No Organs Exposed • No Identity Leaks • No Routing • Dualband-Aware
// Packet-Aware • Artery-Aware • Mesh-Presence-Ready
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
//   • All advantage/world-lens/topology are snapshots from Brain/Expansion, not here.
//   • Packet-aware + artery-aware: presence packets are deterministic and bounded.
// ============================================================================

import {
  OrganismIdentity,
  buildPulseOrganismMap as buildOrganismMap
} from "../PULSE-X/PulseWorldOrganismMap-v24.js";

const Identity = OrganismIdentity(import.meta.url);

// ---------------------------------------------------------------------------
//  KERNEL META — v24.0 IMMORTAL (ORGANISM KERNEL)
// ---------------------------------------------------------------------------
export const PresenceMeta = Identity.OrganMeta;

// 2 — SURFACE EXPORTS
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

// ============================================================================
//  PRESENCE ORGAN — v24.0-Immortal++
// ============================================================================

export function createPulseOSPresence({
  SystemClock,       // uptime + organism age (safe)
  IdentityDirectory, // safeName + safeId (no secrets)
  DeviceFingerprint, // safe, non-PII fingerprint (optional)
  log, warn, error
}) {
  const meta = Object.freeze({
    layer: "PulseOSPresence",
    role: "OS_PRESENCE_ORGAN",
    version: "24.0-Immortal++",
    identity: "PulseOSPresence-v24.0-Immortal++",
    kernel: PresenceMeta,
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
      multiInstanceReady: true,
      clusterCoherence: true,

      packetAware: true,
      arteryAware: true,
      epoch: PresenceMeta.evo.epoch
    }),
    contract: Object.freeze({
      never: [
        "expose internal organs",
        "expose routing tables",
        "expose CNS",
        "expose private identity",
        "expose permissions",
        "expose OS internals"
      ],
      always: [
        "emit metadata-only presence",
        "stay deterministic",
        "stay membrane-safe",
        "stay binary-first",
        "stay read-only",
        "stay dualband-aware",
        "emit packet-scoped presence",
        "keep artery metrics bounded"
      ]
    })
  });

  // --------------------------------------------------------------------------
  // PACKET EMITTER — deterministic, presence-scoped
  // --------------------------------------------------------------------------
  function emitPresencePacket(type, payload) {
    return Object.freeze({
      meta,
      packetType: `presence-${type}`,
      timestamp: safeNow(),
      epoch: meta.evo.epoch,
      ...payload
    });
  }

  // --------------------------------------------------------------------------
  // SAFE ACCESSORS
  // --------------------------------------------------------------------------
  function safeNow() {
    try {
      return SystemClock?.now ? SystemClock.now() : Date.now();
    } catch {
      return Date.now();
    }
  }

  function safeUptimeSeconds() {
    try {
      return SystemClock?.uptimeSeconds ? SystemClock.uptimeSeconds() : 0;
    } catch {
      return 0;
    }
  }

  function safeOrganismAgeDays() {
    try {
      return SystemClock?.organismAgeDays ? SystemClock.organismAgeDays() : 0;
    } catch {
      return 0;
    }
  }

  function safeDisplayName() {
    try {
      return IdentityDirectory?.safeName
        ? IdentityDirectory.safeName("self")
        : "PulseOS";
    } catch {
      return "PulseOS";
    }
  }

  function safePublicId() {
    try {
      return IdentityDirectory?.safeId
        ? IdentityDirectory.safeId("self")
        : "pulseos-self";
    } catch {
      return "pulseos-self";
    }
  }

  function safeFingerprint() {
    try {
      return DeviceFingerprint?.safeFingerprint
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
          source: "injected",
          confidence: injected.confidence ?? 1
        };
      }

      return {
        band: "neutral",
        score: null,
        stability: 1,
        ageMs: 0,
        source: "os-presence",
        confidence: 1
      };
    } catch {
      return {
        band: "neutral",
        score: null,
        stability: 1,
        ageMs: 0,
        source: "fallback",
        confidence: 1
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

  // --------------------------------------------------------------------------
  // PRESENCE ARTERY — bounded, deterministic, metadata-only
  // --------------------------------------------------------------------------
  function computePresenceArtery() {
    const uptime = safeUptimeSeconds();
    const ageDays = safeOrganismAgeDays();

    const uptimeNorm = Math.max(0, Math.min(1, uptime / (60 * 60 * 24))); // up to 1 day
    const ageNorm = Math.max(0, Math.min(1, ageDays / 365)); // up to 1 year

    const stability = 1 - Math.abs(uptimeNorm - ageNorm) * 0.3;
    const drift = 0; // presence organ is drift-proof by contract

    const throughput = Math.max(0, Math.min(1, 0.7 + uptimeNorm * 0.3));
    const pressure = Math.max(0, Math.min(1, 0.1 + ageNorm * 0.2));
    const cost = Math.max(0, Math.min(1, pressure * (1 - throughput)));
    const budget = Math.max(0, Math.min(1, throughput - cost));

    const bucketLevel = (v) => {
      if (v >= 0.9) return "elite";
      if (v >= 0.75) return "high";
      if (v >= 0.5) return "medium";
      if (v >= 0.25) return "low";
      return "critical";
    };

    const bucketPressure = (v) => {
      if (v >= 0.9) return "overload";
      if (v >= 0.7) return "high";
      if (v >= 0.4) return "medium";
      if (v > 0) return "low";
      return "none";
    };

    const bucketCost = (v) => {
      if (v >= 0.8) return "heavy";
      if (v >= 0.5) return "moderate";
      if (v >= 0.2) return "light";
      if (v > 0) return "negligible";
      return "none";
    };

    return Object.freeze({
      throughput,
      throughputBucket: bucketLevel(throughput),

      pressure,
      pressureBucket: bucketPressure(pressure),

      cost,
      costBucket: bucketCost(cost),

      budget,
      budgetBucket: bucketLevel(budget),

      uptimeSeconds: uptime,
      organismAgeDays: ageDays,
      stability,
      drift
    });
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
    const artery = computePresenceArtery();

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
        score: advantageHint.score
      },
      artery
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

      // presence band for MeshPresenceRelay
      presenceBand: sig.presenceBand,

      // organism age + uptime
      uptimeSeconds: sig.time.uptimeSeconds,
      organismAgeDays: sig.time.organismAgeDays,

      // optional fingerprint (non-PII)
      fingerprint: sig.os.fingerprint,

      // v24: advantage + mesh hints (metadata-only)
      advantageHint: sig.advantage,
      meshPresenceHint: sig.mesh,

      // v24: artery snapshot (presence-only, safe)
      presenceArtery: sig.artery
    };
  }

  // --------------------------------------------------------------------------
  // SNAPSHOT PACKET — window-safe presence snapshot
  // --------------------------------------------------------------------------
  function snapshotPresence() {
    const sig = getPresenceSignature();
    return emitPresencePacket("snapshot", {
      signature: sig
    });
  }

  // --------------------------------------------------------------------------
  // HEARTBEAT — emits local presence packet (no network)
// --------------------------------------------------------------------------
  function heartbeat() {
    try {
      const packet = getSelfPresencePacket();
      const wrapped = emitPresencePacket("heartbeat", {
        selfPresence: packet
      });
      log?.("presence", "OS heartbeat", wrapped);
      return wrapped;
    } catch (err) {
      warn?.("presence", "OS heartbeat failed", err);
      return null;
    }
  }

  return Object.freeze({
    meta,
    getPresenceSignature,
    getSelfPresencePacket,
    snapshotPresence,
    heartbeat
  });
}

// Default export for simple wiring
const DefaultPulseOSPresence = {
  create: createPulseOSPresence
};

export default DefaultPulseOSPresence;
