// ============================================================================
// FILE: /PULSE-BAND/__COMPONENTS_EVOLUTION/PulseEvolutionaryImpulse-v20.js
// PULSE OS — v20-IMMORTAL-EVOLUTIONARY
// CNS BRAINSTEM IMPULSE ORGAN — CONTEXT-FUSION, TIER-AWARE, CHANNEL-AWARE
// ============================================================================
//
// AI_EXPERIENCE_META:
//   This organ is the *CNS brainstem* of Pulse OS v20.
//   It fuses symbolic + binary payloads with:
//     • Router context
//     • Evolution context
//     • Memory context
//     • IQMap context
//     • Page lineage
//     • Boot path
//     • Route lineage
//     • UI skill footprint
//     • System tier + channel
//
//   It produces:
//     • Deterministic CNS envelopes
//     • Tier-aware, channel-aware impulses
//     • 7-dimensional advantage fields
//     • Deep or Slim envelopes (runtime switch)
//     • Auto-throttle mode switching
//
//   It is IMMORTAL:
//     • deterministic
//     • drift-proof
//     • zero-network
//     • zero-filesystem
//     • zero-mutation
//
//   It is the most intelligent organ in Pulse OS.
//
// ============================================================================
//
// META BLOCK (IMMORTAL):
//   identity: "PulseEvolutionaryImpulse"
//   version: "20.0-Immortal-Evolutionary"
//   schemaVersion: "v5"
//   organKind: "cns_brainstem"
//   lineage: "v16 → v18 → v20-Immortal"
//   role: "UI → CNS signal fusion layer"
//   stability: "IMMORTAL"
//   deterministic: true
//   pure: true
//
// CONTRACT:
//   consumes:
//     • symbolic payload
//     • binary payload
//     • Router context
//     • Evolution context
//     • Memory context
//     • IQMap context
//
//   produces:
//     • CNS envelope
//     • impulseId
//     • signature
//     • tier
//     • channel
//     • advantage
//
// ============================================================================

export let IMPULSE_MODE = "deep"; 
// "deep" → full CNS intelligence
// "slim" → optimized envelope
// Auto-switching enabled via CNS load

const IMPULSE_SCHEMA_VERSION = "v5";

// ============================================================================
// INTERNAL: deterministic signature generator
// ============================================================================
function deterministicSignature(obj) {
  const json = JSON.stringify(obj || {});
  let hash = 0;
  for (let i = 0; i < json.length; i++) {
    hash = (hash * 31 + json.charCodeAt(i)) >>> 0;
  }
  return "SIG_" + hash.toString(16).padStart(8, "0");
}

// ============================================================================
// TIERS
// ============================================================================
const ImpulseTiers = Object.freeze({
  info: "info",
  action: "action",
  warning: "warning",
  critical: "critical",
  immortal: "immortal"
});

// ============================================================================
// CHANNELS
// ============================================================================
const ImpulseChannels = Object.freeze({
  ui: "ui",
  system: "system",
  memory: "memory",
  evolution: "evolution",
  router: "router",
  earn: "earn"
});

// ============================================================================
// BAND METRICS (symbolic + binary fusion)
// ============================================================================
function computeBandMetrics(payload, binaryPayload) {
  const symJson = JSON.stringify(payload || {});
  const symSize = symJson.length;
  const binSize = Array.isArray(binaryPayload) ? binaryPayload.length : 0;

  const total = symSize + binSize || 1;
  const symbolicWeight = symSize / total;
  const binaryWeight = binSize / total;

  const advantage = 0.4 * symbolicWeight + 0.6 * binaryWeight;

  return {
    symbolicSize: symSize,
    binarySize: binSize,
    symbolicWeight,
    binaryWeight,
    advantage
  };
}

// ============================================================================
// TIER CLASSIFIER
// ============================================================================
function classifyTier({ context }) {
  const c = context || {};

  const severity =
    (c.severity === "critical" && 1.0) ||
    (c.severity === "warning" && 0.7) ||
    (c.severity === "action" && 0.5) ||
    (c.severity === "info" && 0.2) ||
    0.2;

  if (severity >= 0.95) return ImpulseTiers.immortal;
  if (severity >= 0.75) return ImpulseTiers.critical;
  if (severity >= 0.55) return ImpulseTiers.warning;
  if (severity >= 0.35) return ImpulseTiers.action;
  return ImpulseTiers.info;
}

// ============================================================================
// CHANNEL CLASSIFIER
// ============================================================================
function classifyChannel({ context, route }) {
  const c = context || {};
  const r = route || "";

  if (c.channel && ImpulseChannels[c.channel]) return c.channel;

  if (r.startsWith("/earn")) return ImpulseChannels.earn;
  if (r.startsWith("/router")) return ImpulseChannels.router;
  if (r.startsWith("/evo")) return ImpulseChannels.evolution;
  if (r.startsWith("/mem")) return ImpulseChannels.memory;
  if (r.startsWith("/sys")) return ImpulseChannels.system;

  return ImpulseChannels.ui;
}

// ============================================================================
// AUTO-THROTTLE MODE SWITCHER
// ============================================================================
function autoSelectMode({ CNS }) {
  try {
    const load = CNS?.getLoad?.() || 0;
    if (load > 0.85) return "slim";
    if (load < 0.65) return "deep";
  } catch {}
  return IMPULSE_MODE;
}

// ============================================================================
// ADVANTAGE FUSION (7-dimensional)
// ============================================================================
function compute7Advantage({ fused, band, tier, channel }) {
  const routeAdv =
    (fused.route?.length || 0) * 0.01 +
    (fused.prevRoute ? 0.05 : 0) +
    (fused.upcoming ? 0.05 : 0);

  const evoAdv =
    (fused.pageLineage?.depth || 0) * 0.02 +
    (fused.evoStage === "critical" ? 0.1 : 0);

  const memAdv =
    (fused.memTier === "immortal" ? 0.1 : 0) +
    (fused.memChannel === "memory" ? 0.05 : 0);

  const iqAdv =
    (fused.iqSkills?.icons?.length || 0) * 0.01 +
    (fused.iqSkills?.animations?.length || 0) * 0.01 +
    (fused.iqSkills?.styles?.length || 0) * 0.01;

  const contextAdv =
    (fused.context?.urgency || 0) * 0.1 +
    (fused.context?.importance || 0) * 0.1;

  const channelAdv =
    channel === "system" ? 0.15 :
    channel === "evolution" ? 0.12 :
    channel === "router" ? 0.10 :
    channel === "memory" ? 0.08 :
    0.05;

  const tierAdv =
    tier === "immortal" ? 0.15 :
    tier === "critical" ? 0.12 :
    tier === "warning" ? 0.08 :
    tier === "action" ? 0.05 :
    0.02;

  return (
    0.20 * band.advantage +
    0.10 * routeAdv +
    0.10 * evoAdv +
    0.10 * memAdv +
    0.15 * iqAdv +
    0.10 * contextAdv +
    0.10 * channelAdv +
    0.15 * tierAdv
  );
}

// ============================================================================
// FACTORY
// ============================================================================
export function createPulseEvolutionaryImpulse({
  CNS,
  Evolution,
  Router,
  Memory,
  IQMap,
  log = console.log,
  warn = console.warn
} = {}) {

  const ImpulseState = {
    lastImpulse: null,
    lastMode: IMPULSE_MODE,
    lastRoute: null,
    lastSignature: null,
    lastTier: null,
    lastChannel: null,
    lastAdvantage: null,
    lastError: null,
    seq: 0
  };

  function nextSeq() {
    ImpulseState.seq += 1;
    return ImpulseState.seq;
  }

  function safeLog(stage, details = {}) {
    try {
      log("[PulseEvolutionaryImpulse-v20]", stage, JSON.stringify(details));
    } catch {}
  }

  // --------------------------------------------------------------------------
  // CONTEXT FUSION (v20++)
  // --------------------------------------------------------------------------
  function fuseContext(context) {
    const route = Router?.RouterState?.currentRoute || "unknown";
    const prevRoute = Router?.RouterState?.previousRoute || null;
    const upcoming = Router?.RouterState?.upcomingRoute || null;

    const pageLineage = Evolution?.getPageLineage?.() || {};
    const bootPath = Evolution?.getBootPath?.() || "unknown";
    const evoStage = Evolution?.getStage?.() || "unknown";

    const memTier = Memory?.getTier?.() || "info";
    const memChannel = Memory?.getChannel?.() || "memory";

    const iqSkills = IQMap?.getRouteUISkills?.(route) || {};
    const iqUpcoming = IQMap?.planUpcomingSkills?.([upcoming]) || {};

    return {
      route,
      prevRoute,
      upcoming,
      pageLineage,
      bootPath,
      evoStage,
      memTier,
      memChannel,
      iqSkills,
      iqUpcoming,
      context
    };
  }

  // --------------------------------------------------------------------------
  // BUILD ENVELOPE (deep/slim)
  // --------------------------------------------------------------------------
  function buildEnvelope({
    source,
    payload,
    binaryPayload,
    context,
    tier,
    channel
  }) {
    const mode = autoSelectMode({ CNS });
    const fused = fuseContext(context);
    const band = computeBandMetrics(payload, binaryPayload);

    const autoTier = tier || classifyTier({ context });
    const autoChannel = channel || classifyChannel({ context, route: fused.route });

    const advantage = compute7Advantage({
      fused,
      band,
      tier: autoTier,
      channel: autoChannel
    });

    const base = {
      schemaVersion: IMPULSE_SCHEMA_VERSION,
      source,
      modeKind: binaryPayload ? "dual" : "symbolic",
      route: fused.route,
      tier: autoTier,
      channel: autoChannel,
      payload: payload || {},
      binary: binaryPayload || null,
      context: context || {},
      bandMetrics: band,
      advantage,
      version: "20.0-Immortal",
      timestamp: "NO_TIMESTAMP_v20"
    };

    if (mode === "slim") {
      base.signature = deterministicSignature(base);
      base.impulseId = "IMP_" + base.signature.slice(4);
      return base;
    }

    // DEEP MODE — full CNS intelligence
    const deep = {
      ...base,
      prevRoute: fused.prevRoute,
      upcomingRoute: fused.upcoming,
      pageLineage: fused.pageLineage,
      bootPath: fused.bootPath,
      evolutionStage: fused.evoStage,
      memoryTier: fused.memTier,
      memoryChannel: fused.memChannel,
      iqSkills: fused.iqSkills,
      iqUpcomingSkills: fused.iqUpcoming,
      iconFootprint: fused.iqSkills?.icons || [],
      animationFootprint: fused.iqSkills?.animations || [],
      styleFootprint: fused.iqSkills?.styles || [],
      hookFootprint: fused.iqSkills?.hooks || []
    };

    deep.signature = deterministicSignature(deep);
    deep.impulseId = "IMP_" + deep.signature.slice(4);

    return deep;
  }

  // --------------------------------------------------------------------------
  // EMIT
  // --------------------------------------------------------------------------
  function emit({
    source = "UI",
    payload = {},
    binaryPayload = null,
    context = {},
    tier = null,
    channel = null
  } = {}) {
    nextSeq();

    const envelope = buildEnvelope({
      source,
      payload,
      binaryPayload,
      context,
      tier,
      channel
    });

    ImpulseState.lastImpulse = envelope;
    ImpulseState.lastMode = envelope.modeKind;
    ImpulseState.lastRoute = envelope.route;
    ImpulseState.lastSignature = envelope.signature;
    ImpulseState.lastTier = envelope.tier;
    ImpulseState.lastChannel = envelope.channel;
    ImpulseState.lastAdvantage = envelope.advantage;

    try {
      CNS?.emitImpulse?.("PulseEvolutionaryImpulse", envelope);
      safeLog("IMPULSE_OK", {
        mode: envelope.modeKind,
        route: envelope.route,
        tier: envelope.tier,
        channel: envelope.channel,
        advantage: envelope.advantage
      });
      return {
        ok: true,
        signature: envelope.signature,
        impulseId: envelope.impulseId,
        tier: envelope.tier,
        channel: envelope.channel,
        advantage: envelope.advantage
      };
    } catch (err) {
      const msg = String(err);
      ImpulseState.lastError = msg;
      warn("[PulseEvolutionaryImpulse] EMIT_ERROR", msg);
      safeLog("IMPULSE_ERROR", { error: msg });
      return { ok: false, error: "EmitError" };
    }
  }

  // --------------------------------------------------------------------------
  // PUBLIC API
  // --------------------------------------------------------------------------
  const PulseEvolutionaryImpulse = {
    ImpulseState,
    emit,
    Tiers: ImpulseTiers,
    Channels: ImpulseChannels,
    getAdvantageSnapshot() {
      return ImpulseState.lastAdvantage || null;
    }
  };

  safeLog("INIT", {
    identity: "PulseEvolutionaryImpulse-v20",
    schemaVersion: IMPULSE_SCHEMA_VERSION
  });

  return PulseEvolutionaryImpulse;
}
