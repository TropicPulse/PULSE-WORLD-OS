// ============================================================================
//  PULSE OS v24‑IMMORTAL++ — PULSE CASTLE (PRESENCE / HOST ORGAN)
//  PulseCastle-v24-Immortal++.js
// ============================================================================
//
//  ROLE (v24++):
//    - Primary presence + host organ for all PulseServer instances.
//    - Region identity + region security authority for the organism.
//    - Maintains castle identity, region physics, region tier, and region load.
//    - Manages castles (region/host nodes) and their attached servers.
//    - Manages user bindings + world cores per castle (user‑aware).
//    - Maintains awareness of other castles (mesh awareness).
//    - Maintains treasury, soldier, morale, and governance pressure (economic layer).
//    - Maintains symbolic expansion routes + NodeAdmin loops to servers.
//    - Maintains artery metrics per castle (v24++ per‑castle arteries).
//    - Integrates with Mesh, BeaconMesh, Touch, Net, Runtime, Scheduler,
//      Overmind, Earn, Proxy, BinaryMesh, DualBand Organism.
//    - Pure symbolic registry + mapping. No compute math, no routing, no AI.
//    - v24++: snapshot‑aware, artery‑aware, chunk/cache/prewarm aware,
//      engine‑local tick space, governance‑aware, treasury‑pressure aware.
// ============================================================================
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝


// ============================================================================
//  IMPORTS (backend-safe, organism-aware)
// ============================================================================
import { PulseProofBridgeLogger as logger } from "../../PULSEVISION/____BACKEND/PULSE-WORLD-BRIDGE.js";

// Expansion / world
import {
  PulseExpansionMeta,
  PulseExpansion,
  getPulseExpansionContext
} from "./PULSE-EXPANSION-WORLD.js";

// Server
import {
  PulseServerMeta,
  createPulseServer
} from "./PULSE-EXPANSION-SERVER.js";

// Router (meta only, for organism context)
import {
  PulseRouterMeta,
  createPulseRouter
} from "../X-PULSE-X/PULSE-WORLD-INTERNET-ROUTER.js";

// User lanes / WorldCore (v16 IMMORTAL ORGANISM)
import {
  PulseWorldCoreMeta,
  PulseUserMeta,
  createPulseWorldCore
} from "./PULSE-EXPANSION-USER.js";

// Mesh organism (symbolic + binary)
import createPulseMesh, {
  PulseMeshMeta
} from "../PULSE-MESH/PulseMesh-v30.js";
import createBinaryMesh, {
  BinaryMeshMeta
} from "../PULSE-MESH/PulseMeshBinary-v30.js";

// Beacon engine + membrane
import PulseBeaconEngine from "./PULSE-EXPANSION-BEACON-ENGINE.js";
import PulseBeaconMesh, {
  PulseBeaconMeshMeta
} from "./PULSE-EXPANSION-BEACON-MESH.js";

// Touch / presence
import { getPulseTouchContext } from "../../PULSE-MULTIVERSE/PULSEWORLD/PULSE-WORLD-TOUCH.js";

// Runtime / scheduler / overmind
import { getPulseRuntimeContext } from "../X-PULSE-X/PulseWorldRuntime-v20.js";
import { getPulseSchedulerContext } from "../X-PULSE-X/PulseWorldScheduler-v20.js";
import { getPulseOvermindContext } from "../X-PULSE-X/PULSE-WORLD-ALDWYN.js";

// (Optional) Earn / treasury integration hook (symbolic only)
import { getEarnContext } from "../PULSE-EARN/PulseEarn-v24.js";

// Dual-band organism + binary send
import { createDualBandOrganism as PulseBinaryOrganismBoot } from "../PULSE-AI/PulseAIDualBand-v30.js";
import { createBinarySend as PulseSendBin } from "../PULSE-SEND/PulseSendBinary-v24.js";

// Proxy context (v16 IMMORTAL ORGANISM)
import {
  getProxyContext,
  getProxyPressure,
  getProxyBoost,
  getProxyFallback,
  getProxyMode,
  getProxyLineage
} from "../PULSE-PROXY/PulseProxyContext-v20.js";

import { createPulseNodeEvolutionV16 } from "../PULSE-TOOLS/PulseToolsNodeEvolution-v20.js";
import { createBinaryPulse } from "../PULSE-TECH/PULSE-TECH-BINARY-WAVE.js";

const _castleEvolution = createPulseNodeEvolutionV16({
  nodeType: "castle",
  trace: false
});

// ============================================================================
//  TYPES
// ============================================================================
export class CastleRegistrationResult {
  constructor({ castleId, regionId, hostName, presenceField, meta = {} }) {
    this.castleId = castleId;
    this.regionId = regionId;
    this.hostName = hostName;
    this.presenceField = presenceField;
    this.meta = meta;
  }
}

export class CastlePresenceState {
  constructor({ castlesById, meshLinksByCastleId, meta = {} }) {
    this.castlesById = castlesById;
    this.meshLinksByCastleId = meshLinksByCastleId;
    this.meta = meta;
  }
}

export class ServerAttachResult {
  constructor({ castleId, serverId, serverMeta, attached, meta = {} }) {
    this.castleId = castleId;
    this.serverId = serverId;
    this.serverMeta = serverMeta;
    this.attached = attached;
    this.meta = meta;
  }
}

export class ServerDetachResult {
  constructor({ castleId, serverId, detached, meta = {} }) {
    this.castleId = castleId;
    this.serverId = serverId;
    this.detached = detached;
    this.meta = meta;
  }
}

export class CastleMeshState {
  constructor({ castlesById, meshLinksByCastleId, meta = {} }) {
    this.castlesById = castlesById;
    this.meshLinksByCastleId = meshLinksByCastleId;
    this.meta = meta;
  }
}

export class CastleUserRegistrationResult {
  constructor({
    castleId,
    userId,
    regionId,
    hostName,
    userMeta,
    worldCoreSnapshot,
    boundServers = [],
    meta = {}
  }) {
    this.castleId = castleId;
    this.userId = userId;
    this.regionId = regionId;
    this.hostName = hostName;
    this.userMeta = userMeta;
    this.worldCoreSnapshot = worldCoreSnapshot;
    this.boundServers = boundServers;
    this.meta = meta;
  }
}

export class CastleUserBindingState {
  constructor({ castleId, usersById, bindingsByServerId, meta = {} }) {
    this.castleId = castleId;
    this.usersById = usersById;
    this.bindingsByServerId = bindingsByServerId;
    this.meta = meta;
  }
}

export class CastleExpansionRouteState {
  constructor({ routesById, meta = {} }) {
    this.routesById = routesById;
    this.meta = meta;
  }
}

export class CastleNodeAdminLoopState {
  constructor({ loopsById, meta = {} }) {
    this.loopsById = loopsById;
    this.meta = meta;
  }
}

// ============================================================================
//  INTERNAL STATE (symbolic, deterministic)
// ============================================================================
const castlesById = Object.create(null);
const meshLinksByCastleId = Object.create(null);

const usersById = Object.create(null);
const userBindingsByServerId = Object.create(null);

const expansionRoutesById = Object.create(null);
const nodeAdminLoopsById = Object.create(null);

const castleArteriesById = Object.create(null);

// ============================================================================
//  HELPERS + ORGANISM CONTEXT
// ============================================================================
function createCastleArtery(castleId) {
  const artery = {
    castleId,
    ticks: 0,
    presenceUpdates: 0,
    serversAttached: 0,
    serversDetached: 0,
    usersRegistered: 0,
    routesRegistered: 0,
    loopsSpawned: 0,
    meshLinks: 0,
    treasuryDelta: 0,
    prewarms: 0,
    lastPresenceScore: 0,
    lastLoadIndex: 0,
    lastStressIndex: 0,
    snapshot() {
      return Object.freeze({
        castleId: artery.castleId,
        ticks: artery.ticks,
        presenceUpdates: artery.presenceUpdates,
        serversAttached: artery.serversAttached,
        serversDetached: artery.serversDetached,
        usersRegistered: artery.usersRegistered,
        routesRegistered: artery.routesRegistered,
        loopsSpawned: artery.loopsSpawned,
        meshLinks: artery.meshLinks,
        treasuryDelta: artery.treasuryDelta,
        prewarms: artery.prewarms,
        lastPresenceScore: artery.lastPresenceScore,
        lastLoadIndex: artery.lastLoadIndex,
        lastStressIndex: artery.lastStressIndex
      });
    }
  };
  return artery;
}

function stableHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 1000000007;
  }
  return `c${h}`;
}

function clamp01(x) {
  if (x == null || Number.isNaN(x)) return 0;
  return Math.max(0, Math.min(1, x));
}

function buildOrganismContext(extra = {}) {
  const expansion = getPulseExpansionContext?.() || {};
  const touch = getPulseTouchContext?.() || {};
  const runtime = getPulseRuntimeContext?.() || {};
  const scheduler = getPulseSchedulerContext?.() || {};
  const overmind = getPulseOvermindContext?.() || {};
  const earn = getEarnContext?.() || {};

  const proxy = getProxyContext?.() || {};
  const proxyPressure = getProxyPressure?.() ?? 0;
  const proxyBoost = getProxyBoost?.() ?? 0;
  const proxyFallback = getProxyFallback?.() ?? false;
  const proxyMode = getProxyMode?.() || "normal";
  const proxyLineage = getProxyLineage?.() || null;

  return {
    expansion,
    touch,
    runtime,
    scheduler,
    overmind,
    earn,
    meshMeta: PulseMeshMeta,
    beaconMeshMeta: PulseBeaconMeshMeta,
    binaryMeshMeta: BinaryMeshMeta,
    proxy,
    proxyPressure,
    proxyBoost,
    proxyFallback,
    proxyMode,
    proxyLineage,
    ...extra
  };
}

function buildCastleId({ regionId, hostName }) {
  return stableHash(`CASTLE::${regionId}::${hostName}`);
}

function buildUserId({ regionId, hostName, userKey }) {
  return stableHash(`USER::${regionId}::${hostName}::${userKey || "default"}`);
}

function buildRouteId({ fromCastleId, toServerId, toServerUrl, hops }) {
  return stableHash(
    `ROUTE::${fromCastleId}::${toServerId || ""}::${toServerUrl || ""}::${JSON.stringify(
      hops || []
    )}`
  );
}

function buildLoopId({ routeId, originCastleId }) {
  return stableHash(`LOOP::${routeId}::${originCastleId}`);
}

// ============================================================================
//  PROXY-AWARE PRESENCE COMPUTE
// ============================================================================
export function computeCastlePresence(castle) {
  const serverCount = Object.keys(castle.serversById || {}).length;
  const soldierCount = Object.keys(castle.soldiersById || {}).length;
  const capacityHint = castle.presenceField?.capacityHint ?? 1;

  const rawLoad =
    (serverCount + soldierCount * 0.5) / Math.max(1, capacityHint * 4);
  let loadIndex = clamp01(rawLoad);

  const proxyPressure = getProxyPressure?.() ?? 0;
  loadIndex = clamp01(loadIndex + proxyPressure * 0.1);

  let stressIndex = clamp01(
    loadIndex >= 0.8 ? 0.9 :
    loadIndex >= 0.6 ? 0.7 :
    loadIndex >= 0.3 ? 0.4 :
    0.1
  );

  if (getProxyFallback?.()) {
    stressIndex = clamp01(stressIndex + 0.15);
  }

  let presenceScore = clamp01(
    loadIndex * 0.6 +
      (1 - Math.abs(0.5 - loadIndex) * 2) * 0.4
  );

  const proxyBoost = getProxyBoost?.() ?? 0;
  presenceScore = clamp01(presenceScore + proxyBoost * 0.05);

  let tier = castle.presenceField?.tier || "normal";
  if (presenceScore >= 0.7) tier = "high";
  else if (presenceScore >= 0.4) tier = "normal";
  else tier = "low";

  // ⭐ Binary waveform injection
  let binaryWave = null;
  try {
    binaryWave = castle.binaryPulse?.nextPulse?.();
  } catch {}

  // ⭐ Presence boost from binary presence band
  if (binaryWave?.presencePulse?.presenceBandState) {
    presenceScore = clamp01(presenceScore + 0.05);
  }

  // ⭐ Stress reduction from binary harmonics
  if (binaryWave?.harmonicsPulse?.harmonicDrift) {
    stressIndex = clamp01(stressIndex - 0.03);
  }

  // ⭐ Governance stability from binary coherence
  if (binaryWave?.coherencePulse?.coherenceScore) {
    presenceScore = clamp01(presenceScore + 0.02);
  }


  return {
    loadIndex,
    stressIndex,
    presenceScore,
    tier,
    proxyPressure,
    proxyBoost,
    proxyFallback: !!getProxyFallback?.(),
    proxyMode: getProxyMode?.() || "normal"
  };
}

export function summarizeCastlePresence(castles = castlesById) {
  const byRegion = {};
  const meshSnapshot = {};

  for (const castleId in castles) {
    const castle = castles[castleId];
    const region = castle.regionId || "unknown-region";

    const presenceMetrics = computeCastlePresence(castle);
    const presenceField = {
      ...(castle.presenceField || {}),
      ...presenceMetrics
    };

    if (!byRegion[region]) {
      byRegion[region] = {
        castles: [],
        totalLoad: 0,
        avgLoad: 0,
        count: 0
      };
    }

    byRegion[region].castles.push({
      castleId,
      regionId: castle.regionId,
      hostName: castle.hostName,
      presenceField
    });

    byRegion[region].totalLoad += presenceMetrics.loadIndex;
    byRegion[region].count++;
  }

  for (const region in byRegion) {
    const r = byRegion[region];
    r.avgLoad = r.count > 0 ? r.totalLoad / r.count : 0;
  }

  for (const [id, set] of Object.entries(meshLinksByCastleId)) {
    meshSnapshot[id] = new Set(set);
  }

  return {
    byRegion,
    meshLinksByCastleId: meshSnapshot
  };
}

function ensureCastle(castleId, regionId, hostName, presenceField) {
  if (!castlesById[castleId]) {
  castlesById[castleId] = {
    castleId,
    regionId,
    hostName,
    presenceField: {
      regionId,
      hostName,
      tier: "normal",
      capacityHint: 1,
      tags: [],
      loadIndex: 0,
      stressIndex: 0,
      presenceScore: 0,
      ...(presenceField || {})
    },
    serversById: Object.create(null),
    soldiersById: Object.create(null),
    treasury: {
      balance: 0,
      lastDelta: 0,
      proxyPressure: 0,
      proxyBoost: 0
    },

    // ⭐ NEW: attach binary waveform engine
    binaryPulse: createBinaryPulse({
      spins: 10,
      regionId,
      hostName,
      bluetoothContext: getPulseTouchContext()?.bluetooth || null
    })
  };

  castleArteriesById[castleId] = createCastleArtery(castleId);
  } else if (presenceField) {
    castlesById[castleId].presenceField = {
      ...castlesById[castleId].presenceField,
      ...presenceField
    };
  }

  if (!meshLinksByCastleId[castleId]) {
    meshLinksByCastleId[castleId] = new Set();
  }

  const metrics = computeCastlePresence(castlesById[castleId]);
  castlesById[castleId].presenceField = {
    ...castlesById[castleId].presenceField,
    ...metrics
  };

  const artery = castleArteriesById[castleId] || createCastleArtery(castleId);
  artery.lastPresenceScore = metrics.presenceScore;
  artery.lastLoadIndex = metrics.loadIndex;
  artery.lastStressIndex = metrics.stressIndex;
  artery.meshLinks = meshLinksByCastleId[castleId].size;

  castlesById[castleId].treasury.proxyPressure = getProxyPressure?.() ?? 0;
  castlesById[castleId].treasury.proxyBoost = getProxyBoost?.() ?? 0;

  return castlesById[castleId];
}

function linkCastles(aId, bId) {
  if (!meshLinksByCastleId[aId]) meshLinksByCastleId[aId] = new Set();
  if (!meshLinksByCastleId[bId]) meshLinksByCastleId[bId] = new Set();
  if (aId === bId) return;
  meshLinksByCastleId[aId].add(bId);
  meshLinksByCastleId[bId].add(aId);
}

function ensureUser({
  castleId,
  regionId,
  hostName,
  userId,
  userKey,
  worldCoreConfig = {}
}) {
  const effectiveUserId =
    userId || buildUserId({ regionId, hostName, userKey });

  if (!usersById[effectiveUserId]) {
    const worldCore =
      typeof createPulseWorldCore === "function"
        ? createPulseWorldCore({
            regionID: regionId,
            serverMode: true,
            ...worldCoreConfig
          })
        : null;

    const worldCoreSnapshot = worldCore?.getSnapshot?.() || null;

    usersById[effectiveUserId] = {
      userId: effectiveUserId,
      castleId,
      regionId,
      hostName,
      userMeta: PulseUserMeta,
      worldCore,
      worldCoreSnapshot,
      servers: new Set()
    };

    logger?.log?.("castle", "register_user", {
      castleId,
      userId: effectiveUserId,
      regionId,
      hostName
    });
  }

  return usersById[effectiveUserId];
}

function computePeopleNeedsForCastle(castle) {
  const presence = castle.presenceField || {};
  const stress = presence.stressIndex ?? 0;
  const load = presence.loadIndex ?? 0;
  const morale = castle.moraleIndex ?? 0;
  const population = castle.population || 0;

  const needScore = morale * 0.4 + stress * 0.4 + load * 0.2;

  return {
    population,
    morale,
    stress,
    load,
    needScore,
    governanceStabilityIndex: 1 - (needScore * 0.5 + stress * 0.5)
  };
}

function bindServerToUserInternal({ castleId, serverId, userId }) {
  const user = usersById[userId];
  const castle = castlesById[castleId];
  if (!user || !castle) {
    return { ok: false, reason: "castle_or_user_not_found" };
  }

  user.servers.add(serverId);
  userBindingsByServerId[serverId] = userId;

  logger?.log?.("castle", "bind_server_user", {
    castleId,
    serverId,
    userId
  });

  return { ok: true };
}

function snapshotMesh() {
  const castlesSnapshot = {};
  for (const [id, c] of Object.entries(castlesById)) {
    castlesSnapshot[id] = {
      castleId: c.castleId,
      regionId: c.regionId,
      hostName: c.hostName,
      presenceField: c.presenceField,
      servers: Object.keys(c.serversById),
      soldiers: Object.keys(c.soldiersById || {}),
      binaryWave: castlesById[id].binaryPulse?.nextPulseEcho?.() || null,
      treasury: {
        balance: c.treasury.balance,
        lastDelta: c.treasury.lastDelta,
        proxyPressure: c.treasury.proxyPressure,
        proxyBoost: c.treasury.proxyBoost
      }
    };
  }

  const meshSnapshot = {};
  for (const [id, set] of Object.entries(meshLinksByCastleId)) {
    meshSnapshot[id] = Array.from(set);
  }

  return { castlesSnapshot, meshSnapshot };
}

function snapshotUsersForCastle(castleId) {
  const users = {};
  const bindings = {};

  for (const [uid, u] of Object.entries(usersById)) {
    if (u.castleId !== castleId) continue;
    users[uid] = {
      userId: u.userId,
      regionId: u.regionId,
      hostName: u.hostName,
      userMeta: u.userMeta,
      worldCoreSnapshot: u.worldCoreSnapshot,
      servers: Array.from(u.servers)
    };
  }

  for (const [serverId, userId] of Object.entries(userBindingsByServerId)) {
    const u = usersById[userId];
    if (!u || u.castleId !== castleId) continue;
    bindings[serverId] = userId;
  }

  return { users, bindings };
}

// ---------------------------------------------------------------------------
// Expansion routes + NodeAdmin loops (symbolic only)
// ---------------------------------------------------------------------------
function registerExpansionRouteInternal({
  fromCastleId,
  toServerId = null,
  toServerUrl = null,
  hops = [],
  loopHint = {}
}) {
  if (!fromCastleId) {
    return { ok: false, reason: "missing_fromCastleId" };
  }

  const routeId = buildRouteId({ fromCastleId, toServerId, toServerUrl, hops });

  expansionRoutesById[routeId] = {
    routeId,
    fromCastleId,
    toServerId,
    toServerUrl,
    hops: Array.from(hops || []),
    loopHint: {
      intervalHint: loopHint.intervalHint || "steady",
      pressureHint: loopHint.pressureHint || "normal"
    },
    tags: loopHint.tags || [],
    proxyMode: getProxyMode?.() || "normal",
    proxyPressure: getProxyPressure?.() ?? 0
  };

  logger?.log?.("castle", "register_expansion_route", {
    routeId,
    fromCastleId,
    toServerId,
    toServerUrl,
    hops: expansionRoutesById[routeId].hops,
    loopHint: expansionRoutesById[routeId].loopHint,
    proxyMode: expansionRoutesById[routeId].proxyMode,
    proxyPressure: expansionRoutesById[routeId].proxyPressure
  });

  return { ok: true, routeId };
}

function spawnNodeAdminLoopInternal({
  routeId,
  originCastleId,
  intervalHint = "steady",
  pressureHint = "normal"
}) {
  const route = expansionRoutesById[routeId];
  if (!route) {
    return { ok: false, reason: "route_not_found" };
  }

  const loopId = buildLoopId({
    routeId,
    originCastleId: originCastleId || route.fromCastleId
  });

  nodeAdminLoopsById[loopId] = {
    loopId,
    routeId,
    originCastleId: originCastleId || route.fromCastleId,
    targetServerId: route.toServerId || null,
    intervalHint,
    pressureHint,
    active: true,
    proxyMode: getProxyMode?.() || "normal",
    proxyPressure: getProxyPressure?.() ?? 0
  };

  logger?.log?.("castle", "spawn_nodeadmin_loop", {
    loopId,
    routeId,
    originCastleId: nodeAdminLoopsById[loopId].originCastleId,
    targetServerId: nodeAdminLoopsById[loopId].targetServerId,
    intervalHint,
    pressureHint,
    proxyMode: nodeAdminLoopsById[loopId].proxyMode,
    proxyPressure: nodeAdminLoopsById[loopId].proxyPressure
  });

  return { ok: true, loopId };
}

function snapshotExpansionRoutes() {
  const routes = {};
  for (const [id, r] of Object.entries(expansionRoutesById)) {
    routes[id] = { ...r };
  }
  return routes;
}

function snapshotNodeAdminLoops() {
  const loops = {};
  for (const [id, l] of Object.entries(nodeAdminLoopsById)) {
    loops[id] = { ...l };
  }
  return loops;
}

// ---------------------------------------------------------------------------
// Beacon Engine singleton for Castle + BeaconMesh
// ---------------------------------------------------------------------------
let _beaconEngineInstance = null;

export function setBeaconEngineInstance(engine) {
  _beaconEngineInstance = engine;
}

export function getBeaconEngineContext() {
  if (!_beaconEngineInstance) {
    try {
      _beaconEngineInstance =
        typeof PulseBeaconEngine === "function"
          ? new PulseBeaconEngine()
          : PulseBeaconEngine;
    } catch {
      return null;
    }
  }
  return _beaconEngineInstance;
}

// ============================================================================
//  EXECUTOR HELPERS — APPLY EXPANSION PLAN (v16 IMMORTAL ORGANISM)
// ============================================================================
function spawnCastleInternal({ regionId, hostName, presenceField = null }) {
  const rId = regionId || "unknown-region";
  const hName = hostName || "unknown-host";
  const castleId = buildCastleId({ regionId: rId, hostName: hName });
  const castle = ensureCastle(castleId, rId, hName, presenceField);
  return castle;
}

function spawnServersForCastleInternal({
  castleId,
  count = 1,
  serverConfig = {}
}) {
  const castle = castlesById[castleId];
  if (!castle) return [];
  const artery = castleArteriesById[castleId];
  const created = [];
  for (let i = 0; i < count; i++) {
    const effectiveServerId = stableHash(
      `SERVER::${castleId}::${JSON.stringify(serverConfig)}::${i}`
    );

    if (!castle.serversById[effectiveServerId]) {
      const server =
        typeof createPulseServer === "function"
          ? createPulseServer({
              castleId,
              serverId: effectiveServerId,
              ...serverConfig
            })
          : null;

      castle.serversById[effectiveServerId] = {
        serverId: effectiveServerId,
        serverMeta: PulseServerMeta,
        server
      };
      if (artery) artery.serversAttached += 1;
      logger?.log?.("castle", "attach_server_auto", {
        castleId,
        serverId: effectiveServerId
      });

      created.push(effectiveServerId);
    }
  }
  return created;
}

function spawnUsersForCastleInternal({
  castleId,
  regionId,
  hostName,
  count = 1,
  worldCoreConfig = {}
}) {
  const created = [];
  for (let i = 0; i < count; i++) {
    const userKey = `auto-user-${i}`;
    const user = ensureUser({
      castleId,
      regionId,
      hostName,
      userKey,
      worldCoreConfig
    });
    created.push(user.userId);
  }
  return created;
}

function applySoldierDelegationInternal(actions = []) {
  for (const act of actions) {
    const castle = castlesById[act.castleId];
    if (!castle) continue;

    castle.soldiersById = castle.soldiersById || Object.create(null);

    for (let i = 0; i < (act.spawn || 0); i++) {
      const soldierId = stableHash(
        `SOLDIER::${act.castleId}::${act.reason || "spawn"}::${i}`
      );
      castle.soldiersById[soldierId] = {
        soldierId,
        castleId: act.castleId,
        reason: act.reason || "spawn"
      };
      logger?.log?.("castle", "spawn_soldier_auto", {
        castleId: act.castleId,
        soldierId,
        reason: act.reason
      });
    }

    for (let i = 0; i < (act.kill || 0); i++) {
      const ids = Object.keys(castle.soldiersById);
      const victim = ids[0];
      if (!victim) break;
      delete castle.soldiersById[victim];
      logger?.log?.("castle", "kill_soldier_auto", {
        castleId: act.castleId,
        soldierId: victim,
        reason: act.reason
      });
    }
  }
}

function applyMeshRebalanceInternal(actions = []) {
  for (const act of actions) {
    if (act.action === "link") {
      linkCastles(act.castleId, act.targetCastleId);
      logger?.log?.("castle", "mesh_link_auto", {
        castleId: act.castleId,
        targetCastleId: act.targetCastleId
      });
    }
  }
}

// ============================================================================
//  ROUTE DEFENSE + NODEADMIN ORBITS (v16 IMMORTAL ORGANISM)
// ============================================================================
function defendRouteInternal({ routeId, soldierCount = 2 }) {
  const route = expansionRoutesById[routeId];
  if (!route) {
    logger?.log?.("castle", "defend_route_missing", { routeId });
    return { ok: false, reason: "route_not_found" };
  }

  const originCastleId = route.fromCastleId;
  const castle = castlesById[originCastleId];
  if (!castle) {
    logger?.log?.("castle", "defend_route_castle_missing", {
      routeId,
      originCastleId
    });
    return { ok: false, reason: "castle_not_found" };
  }

  castle.soldiersById = castle.soldiersById || Object.create(null);

  for (let i = 0; i < soldierCount; i++) {
    const soldierId = stableHash(
      `SOLDIER_DEFEND::${originCastleId}::${routeId}::${i}`
    );
    castle.soldiersById[soldierId] = {
      soldierId,
      castleId: originCastleId,
      routeId,
      role: "defender"
    };
    logger?.log?.("castle", "spawn_soldier_defender", {
      castleId: originCastleId,
      soldierId,
      routeId
    });
  }

  return { ok: true, routeId, originCastleId, soldiers: soldierCount };
}

function spawnNodeAdminOrbitInternal({
  castleId,
  intervalHint = "steady",
  pressureHint = "normal"
}) {
  const castle = castlesById[castleId];
  if (!castle) {
    return { ok: false, reason: "castle_not_found" };
  }

  const loopId = stableHash(`ORBIT::${castleId}::${intervalHint}::${pressureHint}`);

  nodeAdminLoopsById[loopId] = {
    loopId,
    routeId: null,
    originCastleId: castleId,
    targetServerId: null,
    intervalHint,
    pressureHint,
    active: true,
    proxyMode: getProxyMode?.() || "normal",
    proxyPressure: getProxyPressure?.() ?? 0,
    orbit: true
  };

  logger?.log?.("castle", "spawn_nodeadmin_orbit", {
    loopId,
    castleId,
    intervalHint,
    pressureHint,
    proxyMode: nodeAdminLoopsById[loopId].proxyMode,
    proxyPressure: nodeAdminLoopsById[loopId].proxyPressure
  });

  return { ok: true, loopId };
}

// ============================================================================
//  CASTLE ORGAN — createPulseCastle (v24-Immortal++)
// ============================================================================
export function createPulseCastle(config = {}) {
  const castleOrgan = {
    config: {
      autoMeshByRegion: true,
      autoMeshAll: false,
      autoBindServerToUser: true,
      demoUsersOnBoot: true,
      regionId: null,
      ...config
    },

    engineTickId: 0,
    prewarmed: false,

    localMesh: null,
    binaryMesh: null,

    prewarm() {
      if (this.prewarmed) return true;
      try {
        this.binaryWarm = createBinaryPulse({
          spins: 10,
          regionId: this.config.regionId,
          hostName: "castle-prewarm",
          bluetoothContext: getPulseTouchContext()?.bluetooth || null
        }).nextPulseMulti();
      } catch {}

      const ctx = buildOrganismContext();
      void ctx.expansion;
      void ctx.runtime;
      void ctx.scheduler;
      void ctx.overmind;
      void ctx.earn;
      void getBeaconEngineContext?.();

      this.prewarmed = true;

      for (const artery of Object.values(castleArteriesById)) {
        artery.prewarms += 1;
      }

      logger?.log?.("castle", "prewarm", {
        regionId: this.config.regionId || null
      });

      if (this.config.demoUsersOnBoot) {
        this._bootstrapDemoUsers();
      }

      return true;
    },

    _bootstrapDemoUsers() {
      const regionId = this.config.regionId || "demo-region";
      const hostName = "demo-host";

      const reg = this.registerCastle({ regionId, hostName });

      this.registerUserAtCastle({
        regionId,
        hostName,
        userKey: "demo-user-1",
        worldCoreConfig: { demo: true }
      });

      this.registerUserAtCastle({
        regionId,
        hostName,
        userKey: "demo-user-2",
        worldCoreConfig: { demo: true }
      });

      logger?.log?.("castle", "bootstrap_demo_users", {
        regionId,
        hostName,
        castleId: reg.castleId
      });
    },

    // -----------------------------------------------------------------------
    // REGISTRATION + PRESENCE
    // -----------------------------------------------------------------------
    registerCastle({ regionId, hostName, presenceField = {} }) {
      const castle = spawnCastleInternal({ regionId, hostName, presenceField });
      const artery = castleArteriesById[castle.castleId];
      if (artery) artery.ticks += 1;

      if (this.config.autoMeshByRegion) {
        for (const otherId in castlesById) {
          const other = castlesById[otherId];
          if (other.regionId === castle.regionId && other.castleId !== castle.castleId) {
            linkCastles(castle.castleId, other.castleId);
          }
        }
      }

      if (this.config.autoMeshAll) {
        for (const otherId in castlesById) {
          if (otherId !== castle.castleId) {
            linkCastles(castle.castleId, otherId);
          }
        }
      }

      logger?.log?.("castle", "register_castle", {
        castleId: castle.castleId,
        regionId: castle.regionId,
        hostName: castle.hostName
      });

      return new CastleRegistrationResult({
        castleId: castle.castleId,
        regionId: castle.regionId,
        hostName: castle.hostName,
        presenceField: castle.presenceField,
        meta: {
          proxyMode: getProxyMode?.() || "normal",
          proxyPressure: getProxyPressure?.() ?? 0
        }
      });
    },

    updateCastlePresence({ castleId, presenceField = {} }) {
      const castle = castlesById[castleId];
      if (!castle) {
        return { ok: false, reason: "castle_not_found" };
      }

      castle.presenceField = {
        ...castle.presenceField,
        ...presenceField
      };

      const metrics = computeCastlePresence(castle);
      castle.presenceField = {
        ...castle.presenceField,
        ...metrics
      };

      const artery = castleArteriesById[castleId];
      if (artery) {
        artery.presenceUpdates += 1;
        artery.lastPresenceScore = metrics.presenceScore;
        artery.lastLoadIndex = metrics.loadIndex;
        artery.lastStressIndex = metrics.stressIndex;
      }

      logger?.log?.("castle", "update_presence", {
        castleId,
        presenceField: castle.presenceField
      });

      return { ok: true, presenceField: castle.presenceField };
    },

    // -----------------------------------------------------------------------
    // SERVER ATTACH / DETACH
    // -----------------------------------------------------------------------
    attachServerToCastle({ castleId, serverConfig = {} }) {
      const castle = castlesById[castleId];
      if (!castle) {
        return new ServerAttachResult({
          castleId,
          serverId: null,
          serverMeta: null,
          attached: false,
          meta: { reason: "castle_not_found" }
        });
      }

      const created = spawnServersForCastleInternal({
        castleId,
        count: 1,
        serverConfig
      });

      const serverId = created[0] || null;
      const artery = castleArteriesById[castleId];
      if (artery && serverId) artery.serversAttached += 1;

      return new ServerAttachResult({
        castleId,
        serverId,
        serverMeta: PulseServerMeta,
        attached: !!serverId,
        meta: {}
      });
    },

    detachServerFromCastle({ castleId, serverId }) {
      const castle = castlesById[castleId];
      if (!castle || !castle.serversById[serverId]) {
        return new ServerDetachResult({
          castleId,
          serverId,
          detached: false,
          meta: { reason: "castle_or_server_not_found" }
        });
      }

      delete castle.serversById[serverId];
      delete userBindingsByServerId[serverId];

      const artery = castleArteriesById[castleId];
      if (artery) artery.serversDetached += 1;

      logger?.log?.("castle", "detach_server", {
        castleId,
        serverId
      });

      return new ServerDetachResult({
        castleId,
        serverId,
        detached: true,
        meta: {}
      });
    },

    // -----------------------------------------------------------------------
    // USER REGISTRATION + BINDINGS
    // -----------------------------------------------------------------------
    registerUserAtCastle({
      regionId,
      hostName,
      castleId = null,
      userId = null,
      userKey = null,
      worldCoreConfig = {}
    }) {
      const effectiveRegionId = regionId || this.config.regionId || "unknown-region";
      const effectiveHostName = hostName || "unknown-host";

      let targetCastleId = castleId;
      if (!targetCastleId) {
        const builtId = buildCastleId({
          regionId: effectiveRegionId,
          hostName: effectiveHostName
        });
        if (!castlesById[builtId]) {
          this.registerCastle({
            regionId: effectiveRegionId,
            hostName: effectiveHostName
          });
        }
        targetCastleId = builtId;
      }

      const castle = castlesById[targetCastleId];
      if (!castle) {
        return new CastleUserRegistrationResult({
          castleId: targetCastleId,
          userId: null,
          regionId: effectiveRegionId,
          hostName: effectiveHostName,
          userMeta: null,
          worldCoreSnapshot: null,
          boundServers: [],
          meta: { reason: "castle_not_found" }
        });
      }

      const user = ensureUser({
        castleId: targetCastleId,
        regionId: effectiveRegionId,
        hostName: effectiveHostName,
        userId,
        userKey,
        worldCoreConfig
      });

      const artery = castleArteriesById[targetCastleId];
      if (artery) artery.usersRegistered += 1;

      const boundServers = [];
      if (this.config.autoBindServerToUser) {
        const serverIds = Object.keys(castle.serversById);
        for (const sid of serverIds) {
          const res = bindServerToUserInternal({
            castleId: targetCastleId,
            serverId: sid,
            userId: user.userId
          });
          if (res.ok) boundServers.push(sid);
        }
      }

      return new CastleUserRegistrationResult({
        castleId: targetCastleId,
        userId: user.userId,
        regionId: effectiveRegionId,
        hostName: effectiveHostName,
        userMeta: user.userMeta,
        worldCoreSnapshot: user.worldCoreSnapshot,
        boundServers,
        meta: {}
      });
    },

    // -----------------------------------------------------------------------
    // EXPANSION ROUTES + NODEADMIN LOOPS (public surface)
// -----------------------------------------------------------------------
    registerExpansionRoute({
      fromCastleId,
      toServerId = null,
      toServerUrl = null,
      hops = [],
      loopHint = {}
    }) {
      const res = registerExpansionRouteInternal({
        fromCastleId,
        toServerId,
        toServerUrl,
        hops,
        loopHint
      });

      if (res.ok) {
        const artery = castleArteriesById[fromCastleId];
        if (artery) artery.routesRegistered += 1;
      }

      return res;
    },

    spawnNodeAdminLoop({
      routeId,
      originCastleId,
      intervalHint = "steady",
      pressureHint = "normal"
    }) {
      const res = spawnNodeAdminLoopInternal({
        routeId,
        originCastleId,
        intervalHint,
        pressureHint
      });

      if (res.ok) {
        const castleId = originCastleId || expansionRoutesById[routeId]?.fromCastleId;
        const artery = castleId ? castleArteriesById[castleId] : null;
        if (artery) artery.loopsSpawned += 1;
      }

      return res;
    },

    spawnNodeAdminOrbit({
      castleId,
      intervalHint = "steady",
      pressureHint = "normal"
    }) {
      const res = spawnNodeAdminOrbitInternal({
        castleId,
        intervalHint,
        pressureHint
      });

      if (res.ok) {
        const artery = castleArteriesById[castleId];
        if (artery) artery.loopsSpawned += 1;
      }

      return res;
    },

    defendRoute({ routeId, soldierCount = 2 }) {
      return defendRouteInternal({ routeId, soldierCount });
    },

    // -----------------------------------------------------------------------
    // SNAPSHOTS
    // -----------------------------------------------------------------------
    getCastlePresenceSnapshot() {
      const { byRegion, meshLinksByCastleId: meshLinks } =
        summarizeCastlePresence();
      return new CastlePresenceState({
        castlesById: { ...castlesById },
        meshLinksByCastleId: meshLinks,
        meta: {
          proxyMode: getProxyMode?.() || "normal",
          proxyPressure: getProxyPressure?.() ?? 0
        }
      });
    },

    getCastleMeshSnapshot() {
      const { castlesSnapshot, meshSnapshot } = snapshotMesh();
      return new CastleMeshState({
        castlesById: castlesSnapshot,
        meshLinksByCastleId: meshSnapshot,
        meta: {}
      });
    },

    getCastleUsersSnapshot({ castleId }) {
      const { users, bindings } = snapshotUsersForCastle(castleId);
      return new CastleUserBindingState({
        castleId,
        usersById: users,
        bindingsByServerId: bindings,
        meta: {}
      });
    },

    getExpansionRoutesSnapshot() {
      return new CastleExpansionRouteState({
        routesById: snapshotExpansionRoutes(),
        meta: {}
      });
    },

    getNodeAdminLoopsSnapshot() {
      return new CastleNodeAdminLoopState({
        loopsById: snapshotNodeAdminLoops(),
        meta: {}
      });
    },

    getCastleArterySnapshot({ castleId }) {
      const artery = castleArteriesById[castleId];
      return artery ? artery.snapshot() : null;
    },

    // -----------------------------------------------------------------------
    // EXPANSION PLAN EXECUTION (bridge from PulseExpansion)
// -----------------------------------------------------------------------
    applyExpansionPlan(plan) {
      if (!plan) return { ok: false, reason: "no_plan" };

      applyMeshRebalanceInternal(plan.rebalanceLinks || []);
      applySoldierDelegationInternal(plan.soldierDelegation || []);

      for (const exp of plan.expansions || []) {
        const castle = spawnCastleInternal({
          regionId: exp.regionId,
          hostName: exp.hostHint || "auto-host",
          presenceField: { tier: exp.tier || "normal" }
        });

        spawnServersForCastleInternal({
          castleId: castle.castleId,
          count: exp.desiredServers || 1
        });

        spawnUsersForCastleInternal({
          castleId: castle.castleId,
          regionId: castle.regionId,
          hostName: castle.hostName,
          count: exp.desiredSoldiers || 0,
          worldCoreConfig: { expansionSpawn: true }
        });
      }

      for (const con of plan.contractions || []) {
        const castle = castlesById[con.castleId];
        if (!castle) continue;
        const serverIds = Object.keys(castle.serversById);
        const soldierIds = Object.keys(castle.soldiersById || {});
        if (con.removeServers > 0 && serverIds.length) {
          const sid = serverIds[0];
          this.detachServerFromCastle({ castleId: con.castleId, serverId: sid });
        }
        if (con.removeSoldiers > 0 && soldierIds.length) {
          const victim = soldierIds[0];
          delete castle.soldiersById[victim];
        }
      }

      for (const rd of plan.routeDefenseActions || []) {
        const routeId = Object.keys(expansionRoutesById).find(
          (id) => expansionRoutesById[id].fromCastleId === rd.castleId
        );
        if (routeId) {
          defendRouteInternal({
            routeId,
            soldierCount: rd.desiredDefenders || 2
          });
        }
      }

      for (const na of plan.nodeAdminOrbitActions || []) {
        spawnNodeAdminOrbitInternal({
          castleId: na.castleId,
          intervalHint: na.intervalHint,
          pressureHint: na.pressureHint
        });
      }

      return { ok: true };
    }
  };

  castleOrgan.prewarm();
  return castleOrgan;
}

export default createPulseCastle;
