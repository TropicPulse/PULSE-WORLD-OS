// ============================================================================
// FILE: PULSE-proxy/PulseWorldIdentity-v20.js
// PULSE IDENTITY ENGINE — v20-Immortal-WorldPresence-ADVANTAGE
// “THE SELF++++WORLD • BINARY-FIRST IDENTITY ENGINE • DUALBAND PRESENCE + WORLD + ADVANTAGE CORE”
// ============================================================================
//
// ROLE (v20-Immortal-WorldPresence-ADVANTAGE):
//   • Canonical identity + presence + world + advantage validator for a binary-first organism.
//   • Dualband identity engine (Symbolic A → Binary B → Symbolic A) with compression + world metadata.
//   • Backbone of PulseBand / PulseNet / CheckBand / RouterMemory / PulseWorldSocialGraph identity field.
//   • Preserves lineage, drift markers, binary signatures, device trust, presence field, world field, advantage field.
//   • Presence-aware: Bluetooth / device / band presence surfaces, offline-first survival.
//   • World-aware: worldBand, social profile, trust/reputation, skill tiers, job/earn readiness.
//   • Advantage-aware: unified advantage hints, cascade level, time-saved descriptors, world-advantage overlays.
//   • Deterministic, replayable, lineage-safe, drift-aware, cache/chunk/prewarm-aware, artery-aware.
//   • Returns authoritative v20 identity + presence + world + advantage snapshot.
//
// CONTRACT (v20-Immortal-WorldPresence-ADVANTAGE):
//   • Fail-open: invalid identity → null (frontend + PulseBand handle fallback).
//   • Never mutate original input; always clone/normalize.
//   • Always return structurally complete v20 identity snapshot when valid.
//   • Never trust external identity providers blindly; token is treated as hint only.
//   • No astral layers, no legacy PNS, no translator cores.
//   • Binary-first nervous system compliance; dualband compression + unified world+advantage field.
//   • No network fetch; no timers beyond Date.now(); no randomness; no external mutation.
// ============================================================================

/*
AI_EXPERIENCE_META = {
  identity: "CheckIdentity",
  version: "v20-Immortal-WorldPresence-ADVANTAGE",
  layer: "backend_identity_engine",
  role: "binary_first_identity_healer_world",
  lineage: "PulseProxy-v16-Immortal → v18-Bridge → v20-WorldPresence",

  evo: {
    // Core identity engine
    identityEngine: true,
    binaryFirstIdentity: true,
    dualBandIdentity: true,
    symbolicAware: true,
    binaryAware: true,
    dualModeAware: true,
    deterministic: true,
    driftProof: true,
    lineageSafe: true,
    replaySafe: true,
    zeroMutationOfInput: true,
    zeroRandomness: true,
    zeroTimers: false, // Date.now() for timestamps only
    zeroNetworkFetch: true,
    zeroExternalMutation: true,
    zeroDynamicImports: true,
    zeroEval: true,
    zeroAI: true,
    zeroAutonomy: true,

    // Presence / mesh / band / world
    presenceAware: true,
    bluetoothPresenceAware: true,
    bandPresenceAware: true,
    identityPresenceField: true,
    offlineSurvivalReady: true,
    worldPresenceAware: true,
    worldBandAware: true,
    socialGraphAware: true,
    trustAware: true,
    reputationAware: true,
    skillTierAware: true,
    jobReadinessAware: true,
    earnReadinessAware: true,

    // Advantage / topology / chunking
    unifiedAdvantageField: true,
    advantageCascadeAware: true,
    pulseEfficiencyAware: true,
    cacheWarmupAware: true,
    chunkAware: true,
    prewarmAware: true,
    pulseTopologyAware: true,
    arteryAware: true,

    // Context awareness
    deviceTrustAware: true,
    compressionAware: true,
    localAware: true,
    internetAware: true,
    safeRouteFree: true,
    worldLensAware: true
  },

  contract: {
    always: [
      "PulsePresence",
      "PulseBand",
      "CheckBand",
      "CheckRouterMemory",
      "CheckIdentity",
      "PulseOSBrain",
      "PulseWorldSocialGraph",
      "PulseProofBridge",
      "PulseChunker"
    ],
    never: [
      "legacyIdentity",
      "legacyCheckIdentity",
      "legacyPresenceIdentity",
      "safeRoute",
      "fetchViaCNS"
    ]
  }
}
*/

export const PulseOSCheckIdentityMetaV20 = Object.freeze({
  layer: "PulseProxyIdentityEngine",
  role: "BINARY_FIRST_IDENTITY_ORGAN_WORLD",
  version: "v20-Immortal-WorldPresence-ADVANTAGE",
  identity: "CheckIdentity-v20-Immortal-WorldPresence-ADVANTAGE",

  guarantees: Object.freeze({
    deterministic: true,
    driftProof: true,
    multiInstanceReady: true,
    lineageSafe: true,
    replaySafe: true,

    // Identity laws
    identityEngine: true,
    binaryFirstIdentity: true,
    dualBandIdentity: true,
    symbolicAware: true,
    binaryAware: true,
    dualModeAware: true,
    lineageAware: true,
    driftMarkerAware: true,
    deviceTrustAware: true,
    compressionAware: true,
    offlineSurvivalReady: true,

    // Presence + world + advantage field
    unifiedAdvantageField: true,
    advantageCascadeAware: true,
    pulseEfficiencyAware: true,
    presenceAware: true,
    bluetoothPresenceAware: true,
    bandPresenceAware: true,
    identityPresenceField: true,
    worldPresenceAware: true,
    worldBandAware: true,
    socialGraphAware: true,
    trustAware: true,
    reputationAware: true,
    skillTierAware: true,
    jobReadinessAware: true,
    earnReadinessAware: true,
    cacheWarmupAware: true,
    chunkAware: true,
    prewarmAware: true,
    pulseTopologyAware: true,
    arteryAware: true,

    // Execution prohibitions (binary core)
    zeroMutationOfInput: true,
    zeroRandomness: true,
    zeroTimers: false, // timestamps only
    zeroNetworkFetch: true,
    zeroExternalMutation: true,
    zeroDynamicImports: true,
    zeroEval: true,
    zeroAI: true,
    zeroAutonomy: true,

    // Environment
    localAware: true,
    internetAware: true,
    worldLensAware: true
  }),

  contract: Object.freeze({
    input: [
      "IdentityPayload",
      "BinaryIdentityContext",
      "DualBandContext",
      "DeviceTrustContext",
      "PresenceContext",
      "WorldPresenceContext",
      "AdvantageContext",
      "TopologyContext",
      "SocialGraphContext",
      "EarnContext",
      "JobContext",
      "ArteryContext"
    ],
    output: [
      "AuthoritativeIdentitySnapshot",
      "IdentityDiagnostics",
      "IdentitySignatures",
      "IdentityPresenceSnapshot",
      "IdentityWorldSnapshot",
      "IdentityAdvantageSnapshot",
      "IdentityTopologySnapshot",
      "IdentitySocialSnapshot",
      "IdentityArterySnapshot",
      "IdentityHealingState"
    ]
  }),

  lineage: Object.freeze({
    root: "PulseProxy-v11-Evo",
    parent: "PulseProxy-v16-Immortal",
    ancestry: [
      "CheckIdentity-v7",
      "CheckIdentity-v8",
      "CheckIdentity-v9",
      "CheckIdentity-v10",
      "CheckIdentity-v11",
      "CheckIdentity-v11-Evo",
      "CheckIdentity-v11-Evo-Binary",
      "CheckIdentity-v12.0-Evo",
      "CheckIdentity-v12.1-Evo",
      "CheckIdentity-v12.2-Evo",
      "CheckIdentity-v12.3-Presence-Evo-BINARY-MAX",
      "CheckIdentity-v16-Immortal-Dualband-Presence-ADVANTAGE"
    ]
  }),

  bands: Object.freeze({
    supported: ["binary", "symbolic", "dual"],
    default: "binary",
    behavior: "identity-engine"
  }),

  architecture: Object.freeze({
    pattern: "A-B-A",
    baseline: "symbolic identity → binary compression → symbolic return",
    adaptive:
      "binary-first identity + presence/world/advantage/topology/social overlays + chunk/prewarm-aware descriptors",
    return:
      "deterministic identity + presence + world + advantage + topology + social + artery snapshot + signatures"
  })
});

// ============================================================================
// LAYER CONSTANTS + DIAGNOSTICS
// ============================================================================

const LAYER_ID   = "IDENTITY-LAYER-BINARY-WORLD";
const LAYER_NAME = "THE SELF++++WORLD";
const LAYER_ROLE = "BINARY-FIRST SENSE-OF-SELF + WORLD ENGINE";
const LAYER_VER  = "20-Immortal-WorldPresence-ADVANTAGE";

const IDENTITY_DIAGNOSTICS_ENABLED =
  process.env.PULSE_IDENTITY_DIAGNOSTICS === "true" ||
  process.env.PULSE_DIAGNOSTICS === "true";

function safeLog(...args)  { try { console.log(...args); } catch {} }
function safeError(...args){ try { console.error(...args); } catch {} }

const logSelf = (stage, details = {}) => {
  if (!IDENTITY_DIAGNOSTICS_ENABLED) return;

  safeLog(JSON.stringify({
    pulseLayer: LAYER_ID,
    pulseName:  LAYER_NAME,
    pulseRole:  LAYER_ROLE,
    pulseVer:   LAYER_VER,
    stage,
    ...details
  }));
};

// ============================================================================
// MODE RESOLUTION — A/B/A routing metadata
// ============================================================================

function resolveMode(event) {
  try {
    const headers = event?.headers || {};
    return (
      headers["x-pulse-mode"] ||
      headers["X-Pulse-Mode"] ||
      "identity"
    ).toString();
  } catch {
    return "identity";
  }
}

// ============================================================================
// SIGNATURES — v20-Immortal-WorldPresence-ADVANTAGE
// ============================================================================

function computeBinarySignature(identity) {
  try {
    const seed = JSON.stringify({
      uid: identity.uid,
      lineage: identity.lineage,
      drift: identity.drift,
      presenceBand: identity?.presence?.band || "unknown",
      worldBand: identity?.world?.worldBand || "unknown",
      advantageScore: identity?.advantage?.advantageScore ?? null,
      trustScore: identity?.world?.trustScore ?? null,
      reputationScore: identity?.world?.reputationScore ?? null
    });

    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
    }

    return "BIN20-" + hash.toString(16).padStart(8, "0");
  } catch {
    return "BIN20-00000000";
  }
}

function computePresenceSignature(identity, presence) {
  try {
    const seed = JSON.stringify({
      uid: identity.uid,
      deviceId: presence?.deviceId || null,
      bluetooth: !!presence?.bluetooth,
      band: presence?.band || "unknown",
      route: presence?.route || "unknown",
      presenceLevel: presence?.presenceLevel || "Unknown",
      lastSeenMs: presence?.lastSeenMs || 0
    });

    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
    }

    return "PRES20-" + hash.toString(16).padStart(8, "0");
  } catch {
    return "PRES20-00000000";
  }
}

function computeWorldSignature(world) {
  try {
    const seed = JSON.stringify({
      worldBand: world?.worldBand || "presence",
      systemAge: world?.systemAge || 0,
      skillTier: world?.skillTier || null,
      mentorTier: world?.mentorTier || null,
      trustScore: world?.trustScore || 0,
      reputationScore: world?.reputationScore || 0,
      followers: world?.followersCount || 0,
      following: world?.followingCount || 0
    });

    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
    }

    return "WORLD20-" + hash.toString(16).padStart(8, "0");
  } catch {
    return "WORLD20-00000000";
  }
}

function computeAdvantageSignature(advantage) {
  try {
    const seed = JSON.stringify({
      score: advantage?.advantageScore ?? null,
      band: advantage?.advantageBand || "neutral",
      cascadeLevel: advantage?.cascadeLevel ?? 0,
      field: advantage?.field || "identity",
      worldAdvantageBand: advantage?.worldAdvantageBand || "neutral",
      timeSavedMs: advantage?.timeSavedMs ?? null
    });

    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
    }

    return "ADV20-" + hash.toString(16).padStart(8, "0");
  } catch {
    return "ADV20-00000000";
  }
}

function computeTopologySignature(topology) {
  try {
    const seed = JSON.stringify({
      momHeart: topology?.momHeart?.identity || null,
      dadHeart: topology?.dadHeart?.identity || null,
      babyHeart: topology?.babyHeart?.identity || null,
      bandSource: topology?.bandSource || "unknown",
      fallbackRules: topology?.fallbackRules || null
    });

    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
    }

    return "TOPO20-" + hash.toString(16).padStart(8, "0");
  } catch {
    return "TOPO20-00000000";
  }
}

function computeArterySignature(artery) {
  try {
    const seed = JSON.stringify({
      throughputBucket: artery?.throughputBucket || "unknown",
      pressureBucket: artery?.pressureBucket || "unknown",
      budgetBucket: artery?.budgetBucket || "unknown",
      reproductionHint: artery?.reproductionHint || "none",
      earnReadiness: artery?.earnReadiness || "unknown"
    });

    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
    }

    return "ARTERY20-" + hash.toString(16).padStart(8, "0");
  } catch {
    return "ARTERY20-00000000";
  }
}

// ============================================================================
// SAFE HELPERS — TYPE-SAFE NORMALIZATION
// ============================================================================

function safeStr(v, d = "") {
  return typeof v === "string" ? v : d;
}

function safeBool(v, d = false) {
  return typeof v === "boolean" ? v : d;
}

function safeObj(v, d = {}) {
  return typeof v === "object" && v !== null ? v : d;
}

function safeNum(v, d = 0) {
  return typeof v === "number" && !isNaN(v) ? v : d;
}

function safeArr(v, d = []) {
  return Array.isArray(v) ? v : d;
}

// ============================================================================
// ADVANTAGE + TOPOLOGY + WORLD HINTS — metadata-only, no network
// ============================================================================

function safeAdvantageHint(advantageContext = {}, worldContext = {}) {
  try {
    const score = safeNum(
      advantageContext.advantageScore,
      advantageContext.score ?? null
    );
    const band = safeStr(
      advantageContext.advantageBand,
      advantageContext.band || "neutral"
    );

    const worldAdvantageBand = safeStr(
      worldContext.worldAdvantageBand,
      worldContext.worldBand || "presence"
    );

    return {
      advantageScore: score,
      advantageBand: band,
      worldAdvantageBand,
      regionAdvantage: safeObj(advantageContext.regionAdvantage, {}),
      cascadeHints: safeObj(advantageContext.cascadeHints, {}),
      cascadeLevel: safeNum(advantageContext.cascadeLevel, 0),
      timeSavedMs: safeNum(advantageContext.timeSavedMs, null),
      field: safeStr(advantageContext.field, "identity")
    };
  } catch {
    return {
      advantageScore: null,
      advantageBand: "neutral",
      worldAdvantageBand: "presence",
      regionAdvantage: {},
      cascadeHints: {},
      cascadeLevel: 0,
      timeSavedMs: null,
      field: "identity"
    };
  }
}

function safeTopologyHint(topologyContext = {}) {
  try {
    const mom = safeObj(topologyContext.momHeart, null);
    const dad = safeObj(topologyContext.dadHeart, null);
    const baby = safeObj(topologyContext.babyHeart, null);

    const fallbackRules = safeObj(topologyContext.fallbackRules, {
      babyPulseSource: "mom-or-dad",
      momFallbackToDad: true,
      dadFallbackToMom: true
    });

    return {
      momHeart: mom
        ? { identity: mom.identity || "mom-heart", role: mom.role || "MOM_HEART" }
        : null,
      dadHeart: dad
        ? { identity: dad.identity || "dad-heart", role: dad.role || "DAD_HEART" }
        : null,
      babyHeart: baby
        ? { identity: baby.identity || "baby-heart", role: baby.role || "EARN_HEART" }
        : null,
      bandSource: safeStr(topologyContext.bandSource, "identity"),
      fallbackRules
    };
  } catch {
    return {
      momHeart: null,
      dadHeart: null,
      babyHeart: null,
      bandSource: "identity",
      fallbackRules: {
        babyPulseSource: "mom-or-dad",
        momFallbackToDad: true,
        dadFallbackToMom: true
      }
    };
  }
}

function safeWorldPresenceHint(worldContext = {}, socialContext = {}) {
  try {
    const trustScore = safeNum(worldContext.trustScore, socialContext.trustScore || 0);
    const reputationScore = safeNum(
      worldContext.reputationScore,
      socialContext.reputationScore || 0
    );

    return {
      worldBand: safeStr(worldContext.worldBand, "presence"),
      systemAge: safeNum(worldContext.systemAge, socialContext.systemAge || 0),
      presenceBand: safeStr(worldContext.presenceBand, socialContext.presenceBand || "symbolic"),
      skillTier: safeStr(worldContext.skillTier, socialContext.skillTier || null),
      mentorTier: safeStr(worldContext.mentorTier, socialContext.mentorTier || null),
      trustScore,
      reputationScore,
      followersCount: safeNum(worldContext.followersCount, socialContext.followersCount || 0),
      followingCount: safeNum(worldContext.followingCount, socialContext.followingCount || 0),
      jobReadiness: safeStr(worldContext.jobReadiness, socialContext.jobReadiness || "unknown"),
      earnReadiness: safeStr(worldContext.earnReadiness, socialContext.earnReadiness || "unknown")
    };
  } catch {
    return {
      worldBand: "presence",
      systemAge: 0,
      presenceBand: "symbolic",
      skillTier: null,
      mentorTier: null,
      trustScore: 0,
      reputationScore: 0,
      followersCount: 0,
      followingCount: 0,
      jobReadiness: "unknown",
      earnReadiness: "unknown"
    };
  }
}

function safeSocialSnapshot(socialContext = {}) {
  try {
    return {
      hasGraph: !!socialContext.hasGraph,
      nodeDegree: safeNum(socialContext.nodeDegree, 0),
      mentorCount: safeNum(socialContext.mentorCount, 0),
      menteeCount: safeNum(socialContext.menteeCount, 0),
      partyCount: safeNum(socialContext.partyCount, 0),
      sessionCount: safeNum(socialContext.sessionCount, 0),
      coworkCount: safeNum(socialContext.coworkCount, 0),
      lastSnapshotTs: safeNum(socialContext.lastSnapshotTs, 0)
    };
  } catch {
    return {
      hasGraph: false,
      nodeDegree: 0,
      mentorCount: 0,
      menteeCount: 0,
      partyCount: 0,
      sessionCount: 0,
      coworkCount: 0,
      lastSnapshotTs: 0
    };
  }
}

function safeArterySnapshot(arteryContext = {}) {
  try {
    return {
      throughput: safeNum(arteryContext.throughput, 0),
      pressure: safeNum(arteryContext.pressure, 0),
      cost: safeNum(arteryContext.cost, 0),
      budget: safeNum(arteryContext.budget, 0),
      throughputBucket: safeStr(arteryContext.throughputBucket, "critical"),
      pressureBucket: safeStr(arteryContext.pressureBucket, "none"),
      costBucket: safeStr(arteryContext.costBucket, "none"),
      budgetBucket: safeStr(arteryContext.budgetBucket, "critical"),
      reproductionHint: safeStr(arteryContext.reproductionHint, "none"),
      earnReadiness: safeStr(arteryContext.earnReadiness, "unknown")
    };
  } catch {
    return {
      throughput: 0,
      pressure: 0,
      cost: 0,
      budget: 0,
      throughputBucket: "critical",
      pressureBucket: "none",
      costBucket: "none",
      budgetBucket: "critical",
      reproductionHint: "none",
      earnReadiness: "unknown"
    };
  }
}

// ============================================================================
// HELPERS — NORMALIZE IDENTITY TO v20-Immortal-WorldPresence-ADVANTAGE SHAPE
// ============================================================================

function normalizeIdentity(
  raw,
  mode,
  presenceContext = {},
  worldContext = {},
  advantageContext = {},
  topologyContext = {},
  socialContext = {},
  arteryContext = {}
) {
  if (!raw || typeof raw !== "object") return null;

  const presence = {
    deviceId: safeStr(presenceContext.deviceId, ""),
    bluetooth: safeBool(presenceContext.bluetooth, false),
    band: safeStr(presenceContext.band, "unknown"),
    route: safeStr(presenceContext.route, "unknown"),
    lastSeenMs: safeNum(presenceContext.lastSeenMs, 0),
    presenceLevel: safeStr(presenceContext.presenceLevel, "Unknown"),
    page: safeStr(presenceContext.page, null),
    mode: safeStr(presenceContext.mode, null)
  };

  const world = safeWorldPresenceHint(worldContext, socialContext);
  const advantage = safeAdvantageHint(advantageContext, world);
  const topology = safeTopologyHint(topologyContext);
  const social = safeSocialSnapshot(socialContext);
  const artery = safeArterySnapshot(arteryContext);

  const now = Date.now();

  const normalized = {
    // Core identity
    uid: safeStr(raw.uid || raw.userId, null),
    email: safeStr(raw.email),
    name: safeStr(raw.name),
    roles: safeArr(raw.roles),

    // Identity health + drift markers
    identityHealth: safeStr(raw.identityHealth, "Unknown"),
    drift: safeObj(raw.drift, {}),

    // Lineage + versioning
    identityVersion: LAYER_VER,
    lineage: safeObj(raw.lineage, {}),
    repairMode: safeStr(raw.repairMode, "none"),

    // Session + device
    trustedDevice: safeBool(raw.trustedDevice, false),
    sessionAge: safeNum(raw.sessionAge, 0),
    lastVaultVisit: safeNum(raw.lastVaultVisit, 0),

    // Device + session profile (metadata only)
    deviceProfile: safeObj(raw.deviceProfile, {
      platform: safeStr(raw.platform, "unknown"),
      userAgent: safeStr(raw.userAgent, null)
    }),
    sessionProfile: safeObj(raw.sessionProfile, {
      entryRoute: safeStr(raw.entryRoute, null),
      lastRoute: safeStr(raw.lastRoute, null)
    }),

    // Timestamps (symbolic; binary core treats as opaque)
    createdAt: raw.createdAt || now,
    updatedAt: now,

    // Presence + world + advantage + topology + social + artery fields
    presence,
    world,
    advantage,
    topology,
    social,
    artery,

    // Context injection
    layer: LAYER_NAME,
    context:
      "Canonical backend identity + presence + world + advantage + topology + social + artery snapshot (v20-Immortal-WorldPresence-ADVANTAGE)",
    mode
  };

  normalized.binarySignature = computeBinarySignature(normalized);
  normalized.presenceSignature = computePresenceSignature(normalized, presence);
  normalized.worldSignature = computeWorldSignature(world);
  normalized.advantageSignature = computeAdvantageSignature(advantage);
  normalized.topologySignature = computeTopologySignature(topology);
  normalized.arterySignature = computeArterySignature(artery);

  return normalized;
}

// ============================================================================
// DUALBAND IDENTITY REPAIR — A → B → A
// ============================================================================

async function repairIdentity(identity) {
  if (!identity) return null;

  return {
    ...identity,
    uid: identity.uid || identity.userId || null,
    resendToken: identity.resendToken || null
  };
}

async function dualbandRepair(identity) {
  const symbolic = await repairIdentity(identity);

  const binary = {
    ...symbolic,
    binaryCompressed: true,
    binarySignature: computeBinarySignature(symbolic)
  };

  return {
    ...binary,
    repairMode: "dualband-world"
  };
}

// ============================================================================
// IDENTITY LOADER — token → minimal identity seed (no DB, no cache wiring)
// ============================================================================

async function validateAndLoadIdentity(token) {
  if (!token || typeof token !== "string") return null;

  const raw = token.replace("identity=", "").trim();
  if (!raw) return null;

  let decoded;
  try {
    decoded = JSON.parse(Buffer.from(raw, "base64").toString("utf8"));
  } catch {
    return null;
  }

  if (!decoded?.uid) return null;

  return {
    uid: decoded.uid,
    resendToken: decoded.resendToken || null,
    tokenVersion: decoded.version || "unknown",
    source: "token"
  };
}

// ============================================================================
// IDENTITY DIAGNOSTICS SNAPSHOT — metadata-only
// ============================================================================

function buildIdentityDiagnostics(normalized, mode) {
  if (!normalized) {
    return {
      ok: false,
      mode,
      reason: "IDENTITY_NULL"
    };
  }

  return {
    ok: true,
    mode,
    uid: normalized.uid || null,
    identityVersion: normalized.identityVersion,
    presenceBand: normalized?.presence?.band || "unknown",
    presenceLevel: normalized?.presence?.presenceLevel || "Unknown",
    worldBand: normalized?.world?.worldBand || "presence",
    systemAge: normalized?.world?.systemAge || 0,
    skillTier: normalized?.world?.skillTier || null,
    mentorTier: normalized?.world?.mentorTier || null,
    trustScore: normalized?.world?.trustScore || 0,
    reputationScore: normalized?.world?.reputationScore || 0,
    jobReadiness: normalized?.world?.jobReadiness || "unknown",
    earnReadiness: normalized?.world?.earnReadiness || "unknown",
    advantageBand: normalized?.advantage?.advantageBand || "neutral",
    advantageScore: normalized?.advantage?.advantageScore ?? null,
    topologyBandSource: normalized?.topology?.bandSource || "identity",
    binarySignature: normalized.binarySignature,
    presenceSignature: normalized.presenceSignature,
    worldSignature: normalized.worldSignature,
    advantageSignature: normalized.advantageSignature,
    topologySignature: normalized.topologySignature,
    arterySignature: normalized.arterySignature
  };
}

// ============================================================================
// BACKEND ENTRY POINT — “THE SELF++++WORLD” v20-Immortal-WorldPresence-ADVANTAGE
// ============================================================================

export const handler = async (event, context) => {
  const mode = resolveMode(event);

  logSelf("INTAKE_START", {
    hasCookie: !!event?.headers?.cookie,
    mode
  });

  try {
    const token = event.headers.cookie || "";
    logSelf("TOKEN_LOADED", { tokenLength: token.length, mode });

    const identity = await validateAndLoadIdentity(token);

    if (!identity) {
      logSelf("IDENTITY_INVALID", { mode });
      return {
        statusCode: 401,
        body: JSON.stringify(null)
      };
    }

    logSelf("IDENTITY_LOADED", {
      uid: identity?.uid || null,
      mode
    });

    const repaired = await dualbandRepair(identity);

    logSelf("IDENTITY_REPAIRED", {
      uid: repaired?.uid || null,
      mode
    });

    // Presence + world + advantage + topology + social + artery context
    // are injected by caller / organism wiring (Portal/Bridge/NodeAdmin/etc.)
    const presenceContext = event?.presenceContext || {};
    const worldContext = event?.worldContext || {};
    const advantageContext = event?.advantageContext || {};
    const topologyContext = event?.topologyContext || {};
    const socialContext = event?.socialContext || {};
    const arteryContext = event?.arteryContext || {};

    const normalized = normalizeIdentity(
      repaired,
      mode,
      presenceContext,
      worldContext,
      advantageContext,
      topologyContext,
      socialContext,
      arteryContext
    );

    const diagnostics = buildIdentityDiagnostics(normalized, mode);

    logSelf("IDENTITY_NORMALIZED", {
      uid: normalized?.uid || null,
      version: normalized?.identityVersion,
      presenceSignature: normalized?.presenceSignature,
      worldSignature: normalized?.worldSignature,
      advantageSignature: normalized?.advantageSignature,
      topologySignature: normalized?.topologySignature,
      arterySignature: normalized?.arterySignature,
      mode
    });

    logSelf("RETURN_SELF", {
      uid: normalized?.uid || null,
      mode
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        snapshot: normalized,
        diagnostics
      })
    };

  } catch (err) {
    safeError("CheckIdentity v20-Immortal-WorldPresence-ADVANTAGE error:", err);

    logSelf("FATAL_ERROR", {
      message: err?.message || "Unknown error",
      mode
    });

    return {
      statusCode: 500,
      body: JSON.stringify(null)
    };
  }
};
