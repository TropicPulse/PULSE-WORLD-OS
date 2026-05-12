// ============================================================================
// FILE: PulseMeshPresenceRelay-v24-IMMORTAL++.js
// PULSE MESH PRESENCE RELAY — v24-IMMORTAL++
// Mesh-Level Presence • Nearby Scan • Region/Beacon/Band/Advantage Aware
// Metadata-Only • Membrane-Safe • Deterministic • NodeAdmin-Ready
// ============================================================================

import {
  OrganismIdentity,
  buildPulseOrganismMap as buildOrganismMap
} from "../PULSE-X/PulseWorldOrganismMap-v24.js";

const Identity = OrganismIdentity(import.meta.url);

// 2 — EXPORT GENOME METADATA
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

// ============================================================================
// FACTORY — v24-IMMORTAL++
// ============================================================================

export function createPulseMeshPresenceRelay({
  MeshBus,            // safe metadata-only pub/sub
  SystemClock,        // uptime + age (safe)
  IdentityDirectory,  // safeName + safeId (no secrets)
  log,
  warn,
  error
}) {

  // ==========================================================================
  // META — v24-IMMORTAL++
  // ==========================================================================
  const meta = Object.freeze({
    layer: "PulseMeshPresenceRelay",
    role: "MESH_PRESENCE_RELAY",
    version: "v24-IMMORTAL++",
    lineage: "PulseMesh-v24",
    target: "full-mesh",
    selfRepairable: true,

    evo: Object.freeze({
      presenceRelay: true,
      meshLevel: true,
      deterministic: true,
      driftProof: true,
      zeroTrustSurface: true,
      zeroSecrets: true,
      zeroRouting: true,
      zeroOrgans: true,
      zeroCompute: true,
      zeroMutation: true,
      zeroNetworkFetch: true,
      safeRouteFree: true,

      // IMMORTAL++ upgrades
      presenceAware: true,
      bandAware: true,
      binaryAware: true,
      symbolicAware: true,
      dualBand: true,
      meshAware: true,
      advantageAware: true,
      unifiedAdvantageField: true,
      regionAware: true,
      beaconAware: true,
      bluetoothAware: true,
      multiInstanceReady: true,
      nodeAdminReady: true,
      futureEvolutionReady: true
    }),

    contract: Object.freeze({
      never: [
        "expose internal mesh topology",
        "expose routing tables",
        "expose CNS",
        "expose private identity",
        "expose permissions",
        "expose OS internals"
      ],
      always: [
        "relay metadata-only presence",
        "stay deterministic",
        "stay membrane-safe",
        "stay read-only",
        "stay mesh-level only"
      ]
    })
  });

  // ==========================================================================
  // INTERNAL STATE — deterministic, drift-proof
  // ==========================================================================
  const nearbyMap = new Map();   // uid -> enriched presence packet
  const bandStats = new Map();   // band -> { count, lastSeen }
  const regionStats = new Map(); // regionTag -> { count, lastSeen }
  const beaconStats = new Map(); // beaconId -> { count, lastSeen }
  const bluetoothStats = new Map(); // proximityTier -> { count, lastSeen }

  let lastScanAt = 0;

  // ==========================================================================
  // SAFE HELPERS
  // ==========================================================================
  function safeNow() {
    try { return SystemClock?.now ? SystemClock.now() : Date.now(); }
    catch { return Date.now(); }
  }

  function safeDisplayName(uid) {
    try { return IdentityDirectory?.safeName ? IdentityDirectory.safeName(uid) : uid; }
    catch { return uid; }
  }

  function normalizePresenceBand(band) {
    if (!band) return "mesh";
    const v = String(band).toLowerCase();
    if (v.includes("binary")) return "binary";
    if (v.includes("symbolic")) return "symbolic";
    if (v.includes("dual")) return "dual";
    if (v.includes("mesh")) return "mesh";
    return "mesh";
  }

  function classifySystemAgeDays(days) {
    if (typeof days !== "number" || !Number.isFinite(days)) return "unknown";
    if (days < 7) return "new";
    if (days < 90) return "growing";
    if (days < 365) return "established";
    return "veteran";
  }

  function updateBandStats(band, now) {
    const key = normalizePresenceBand(band);
    const prev = bandStats.get(key) || { count: 0, lastSeen: 0 };
    bandStats.set(key, { count: prev.count + 1, lastSeen: now });
  }

  function updateRegionStats(regionTag, now) {
    if (!regionTag) return;
    const prev = regionStats.get(regionTag) || { count: 0, lastSeen: 0 };
    regionStats.set(regionTag, { count: prev.count + 1, lastSeen: now });
  }

  function updateBeaconStats(beaconId, now) {
    if (!beaconId) return;
    const prev = beaconStats.get(beaconId) || { count: 0, lastSeen: 0 };
    beaconStats.set(beaconId, { count: prev.count + 1, lastSeen: now });
  }

  function updateBluetoothStats(bt, now) {
    if (!bt) return;
    const tier = bt.proximityTier || bt.proximity || "unknown";
    const prev = bluetoothStats.get(tier) || { count: 0, lastSeen: 0 };
    bluetoothStats.set(tier, { count: prev.count + 1, lastSeen: now });
  }

  // ==========================================================================
  // IMMORTAL++ PRESENCE ENRICHMENT
  // ==========================================================================
  function extractUid(packet) {
    if (!packet) return null;
    if (packet.uid) return packet.uid;
    if (packet.presenceField?.uid) return packet.presenceField.uid;
    return null;
  }

  function enrichPresence(packet) {
    const now = safeNow();
    const uid = extractUid(packet);
    if (!uid) return null;

    const presenceField = packet.presenceField || packet.presence || null;
    const advantageField = packet.advantageField || null;
    const bluetoothField = packet.bluetoothPresence || packet.bluetooth || null;

    const distance =
      packet.distance ??
      presenceField?.distance ??
      null;

    const presenceBand =
      normalizePresenceBand(
        packet.presenceBand ??
        presenceField?.presenceBand ??
        packet.bandSignature ??
        "mesh"
      );

    const systemAgeDays =
      packet.systemAgeDays ??
      presenceField?.systemAgeDays ??
      null;

    const regionTag =
      packet.regionTag ??
      presenceField?.regionTag ??
      presenceField?.region ??
      null;

    const beaconId =
      packet.beaconId ??
      presenceField?.beaconId ??
      null;

    const meshStatus =
      packet.meshStatus ??
      presenceField?.meshStatus ??
      null;

    const advantageHint =
      packet.advantageHint ??
      advantageField?.hint ??
      null;

    const advantageVector = advantageField?.vector ?? null;

    const systemAgeBand = classifySystemAgeDays(systemAgeDays);

    return {
      uid,
      displayName: safeDisplayName(uid),

      distance,
      regionTag,
      beaconId,
      meshStatus,

      presenceBand,
      systemAgeDays,
      systemAgeBand,

      lastSeen: now,
      presenceAgeMs: 0,
      lineage: "presence-relay-v24",
      stability: 1,

      advantageHint,
      advantageVector,

      bluetooth: bluetoothField || null,

      _rawPresenceField: presenceField || null,
      _rawAdvantageField: advantageField || null,
      _rawBluetoothField: bluetoothField || null
    };
  }

  // ==========================================================================
  // MESH EVENT HANDLER
  // ==========================================================================
  function handleMeshPresence(packet) {
    try {
      if (!packet) return;

      const enriched = enrichPresence(packet);
      if (!enriched) return;

      nearbyMap.set(enriched.uid, enriched);

      const now = enriched.lastSeen;
      updateBandStats(enriched.presenceBand, now);
      updateRegionStats(enriched.regionTag, now);
      updateBeaconStats(enriched.beaconId, now);
      updateBluetoothStats(enriched.bluetooth, now);

      log?.("presence", "Mesh presence update (v24++)", {
        uid: enriched.uid,
        band: enriched.presenceBand,
        region: enriched.regionTag,
        beacon: enriched.beaconId
      });
    } catch (err) {
      warn?.("presence", "Mesh presence handler failed", err);
    }
  }

  // ==========================================================================
  // SUBSCRIBE TO MESH BUS
  // ==========================================================================
  function subscribe() {
    try {
      if (!MeshBus || typeof MeshBus.on !== "function") return;
      MeshBus.on("presence", handleMeshPresence);
      log?.("presence", "MeshPresenceRelay v24++ subscribed to MeshBus");
    } catch (err) {
      warn?.("presence", "MeshPresenceRelay subscribe failed", err);
    }
  }

  // ==========================================================================
  // IMMORTAL++ PRESENCE WINDOW SCAN
  // ==========================================================================
  function scanNearby({
    maxAgeMs = 60_000,
    band = "any",
    regionTag = null,
    beaconId = null,
    bluetoothTier = null,
    limit = null
  } = {}) {
    try {
      const now = safeNow();
      lastScanAt = now;

      const result = [];
      const bandFilter = band === "any" ? null : normalizePresenceBand(band);

      for (const [uid, p] of nearbyMap.entries()) {
        const age = now - (p.lastSeen || 0);

        if (age > maxAgeMs) {
          nearbyMap.delete(uid);
          continue;
        }

        const stability =
          age < 10_000 ? 1 :
          age < 20_000 ? 0.8 :
          age < 40_000 ? 0.6 :
          0.4;

        if (bandFilter && normalizePresenceBand(p.presenceBand) !== bandFilter) continue;
        if (regionTag && p.regionTag !== regionTag) continue;
        if (beaconId && p.beaconId !== beaconId) continue;

        if (bluetoothTier) {
          const bt = p.bluetooth;
          const tier = bt?.proximityTier || bt?.proximity || "unknown";
          if (tier !== bluetoothTier) continue;
        }

        result.push({
          uid: p.uid,
          displayName: p.displayName,
          distance: p.distance,
          presenceBand: p.presenceBand,
          systemAgeDays: p.systemAgeDays,
          systemAgeBand: p.systemAgeBand,
          presenceAgeMs: age,
          stability,
          regionTag: p.regionTag,
          beaconId: p.beaconId,
          meshStatus: p.meshStatus,
          lineage: p.lineage,
          advantageHint: p.advantageHint ?? null,
          bluetooth: p.bluetooth || null
        });

        if (typeof limit === "number" && limit > 0 && result.length >= limit) break;
      }

      return Object.freeze(result);
    } catch (err) {
      warn?.("presence", "scanNearby failed", err);
      return Object.freeze([]);
    }
  }

  // ==========================================================================
  // NODEADMIN / PRESENCE-JOB VIEW WINDOW
  // ==========================================================================
  function getNearbyPresenceWindow(options = {}) {
    const nearby = scanNearby(options);
    return Object.freeze({
      nearbyPresence: nearby,
      bandStats: getBandStats(),
      regionStats: getRegionStats(),
      beaconStats: getBeaconStats(),
      bluetoothStats: getBluetoothStats(),
      lastScanAt
    });
  }

  // ==========================================================================
  // STATS SNAPSHOTS
  // ==========================================================================
  function getBandStats() {
    const out = {};
    for (const [band, s] of bandStats.entries()) {
      out[band] = { count: s.count, lastSeen: s.lastSeen };
    }
    return Object.freeze(out);
  }

  function getRegionStats() {
    const out = {};
    for (const [region, s] of regionStats.entries()) {
      out[region] = { count: s.count, lastSeen: s.lastSeen };
    }
    return Object.freeze(out);
  }

  function getBeaconStats() {
    const out = {};
    for (const [beacon, s] of beaconStats.entries()) {
      out[beacon] = { count: s.count, lastSeen: s.lastSeen };
    }
    return Object.freeze(out);
  }

  function getBluetoothStats() {
    const out = {};
    for (const [tier, s] of bluetoothStats.entries()) {
      out[tier] = { count: s.count, lastSeen: s.lastSeen };
    }
    return Object.freeze(out);
  }

  // ==========================================================================
  // FULL SNAPSHOT
  // ==========================================================================
  function getPresenceSnapshot(options = {}) {
    const nearby = scanNearby(options);
    return Object.freeze({
      meta,
      count: nearby.length,
      bands: getBandStats(),
      regions: getRegionStats(),
      beacons: getBeaconStats(),
      bluetooth: getBluetoothStats(),
      lastScanAt,
      nearby
    });
  }

  // ==========================================================================
  // BROADCAST SELF PRESENCE
  // ==========================================================================
  function broadcastSelfPresence(selfPresencePacket) {
    try {
      if (!MeshBus || typeof MeshBus.emit !== "function") return;
      if (!selfPresencePacket || !selfPresencePacket.uid) return;

      MeshBus.emit("presence", {
        uid: selfPresencePacket.uid,
        distance: 0,
        presenceBand: selfPresencePacket.presenceBand ?? "OS_CORE",
        systemAgeDays: selfPresencePacket.organismAgeDays ?? null,
        advantageHint: selfPresencePacket.advantageHint ?? null,
        regionTag: selfPresencePacket.regionTag ?? null,
        beaconId: selfPresencePacket.beaconId ?? null,
        meshStatus: selfPresencePacket.meshStatus ?? null,
        bluetooth: selfPresencePacket.bluetooth ?? null
      });
    } catch (err) {
      warn?.("presence", "broadcastSelfPresence failed", err);
    }
  }

  // ==========================================================================
  // BOOT
  // ==========================================================================
  subscribe();

  // ==========================================================================
  // PUBLIC API — v24-IMMORTAL++
  // ==========================================================================
  return Object.freeze({
    meta,

    scanNearby,
    getNearbyPresenceWindow,
    getPresenceSnapshot,

    getBandStats,
    getRegionStats,
    getBeaconStats,
    getBluetoothStats,

    broadcastSelfPresence
  });
}

const DefaultPulseMeshPresenceRelay = {
  create: createPulseMeshPresenceRelay
};

export default DefaultPulseMeshPresenceRelay;
