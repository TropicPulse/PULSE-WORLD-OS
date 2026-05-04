/*
===============================================================================
FILE: /PULSE-UI/PulseEvolutionaryImpulse.js
LAYER: UI → CNS SIGNAL ORGAN
===============================================================================
===============================================================================
AI_EXPERIENCE_META = {
  identity: "PulseUI.EvolutionaryImpulse",
  version: "v15-Immortal",
  layer: "pulse_ui",
  role: "ui_to_cns_signal_layer",
  lineage: "PulseEvolutionaryImpulse-v11.3-Evo-Prime → v14-Immortal → v15-Immortal",

  evo: {
    impulseOrgan: true,
    dualBand: true,
    binaryAware: true,
    symbolicAware: true,
    routeAware: true,
    lineageAware: true,
    cnsAware: true,
    unifiedAdvantageField: true,
    tierAware: true,
    channelAware: true,
    signatureAware: true,
    futureEvolutionReady: true,

    deterministic: true,
    driftProof: true,
    pureCompute: true,

    zeroNetwork: true,
    zeroFilesystem: true,
    zeroMutationOfInput: true,

    // v15 upgrades
    schemaVersioned: true,
    envelopeAware: true,
    errorAware: true
  },

  contract: {
    always: [
      "PulseUI.Evolution",
      "PulseUI.RouteOrgan",
      "PulseCore.CNS",
      "PulseDesign.Manifest"
    ],
    never: [
      "eval",
      "Function",
      "dynamicImport",
      "fetchViaCNS",
      "safeRoute"
    ]
  }
}
===============================================================================
EXPORT_META = {
  organ: "PulseUI.EvolutionaryImpulse",
  layer: "pulse_ui",
  stability: "IMMORTAL",
  deterministic: true,
  pure: true,

  consumes: [
    "SymbolicPayload",
    "BinaryPayload",
    "ImpulseContext",
    "RouteOrgan",
    "Evolution"
  ],

  produces: [
    "ImpulseEnvelope",
    "ImpulseSignature",
    "ImpulseTier",
    "ImpulseChannel"
  ],

  sideEffects: "cns_emit_only",
  network: "none",
  filesystem: "none"
}

*/

// Global handle
const g =
  typeof globalThis !== "undefined"
    ? globalThis
    : typeof global !== "undefined"
    ? global
    : typeof window !== "undefined"
    ? window
    : typeof g !== "undefined"
    ? g
    : {};

// Prefer global db if present (logger page / server)
const db =
  (g && g.db) ||
  (typeof global !== "undefined" && global.db) ||
  (typeof globalThis !== "undefined" && globalThis.db) ||
  (typeof window !== "undefined" && window.db) ||
  null;

export const ImpulseRole = {
  type: "Organ",
  subsystem: "UI",
  layer: "Impulse",
  version: "15.0-Immortal",
  identity: "PulseEvolutionaryImpulse",

  evo: {
    driftProof: true,
    deterministic: true,
    dualBand: true,
    binaryAware: true,
    symbolicAware: true,
    impulseEmitter: true,
    routeAware: true,
    lineageAware: true,
    unifiedAdvantageField: true,
    tierAware: true,
    channelAware: true,
    signatureAware: true,
    futureEvolutionReady: true
  }
};

const IMPULSE_SCHEMA_VERSION = "v2";

// ============================================================================
// INTERNAL: deterministic signature generator (no randomness)
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
// INTERNAL: impulse tiers (structural layer)
// ============================================================================
const ImpulseTiers = Object.freeze({
  info: "info",
  action: "action",
  warning: "warning",
  critical: "critical",
  immortal: "immortal"
});

// ============================================================================
// INTERNAL: impulse channels (structural layer)
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
// FACTORY — creates the impulse organ
// ============================================================================
export function createPulseEvolutionaryImpulse({
  CNS,
  Evolution,
  RouteOrgan,
  log = console.log,
  warn = console.warn
} = {}) {

  const ImpulseState = {
    lastImpulse: null,
    lastModeKind: null,
    lastRoute: null,
    lastSignature: null,
    lastTier: null,
    lastChannel: null,
    lastError: null,
    eventSeq: 0
  };

  function nextSeq() {
    ImpulseState.eventSeq += 1;
    return ImpulseState.eventSeq;
  }

  function safeLog(stage, details = {}) {
    try {
      log(
        "[PulseEvolutionaryImpulse]",
        stage,
        JSON.stringify({
          schemaVersion: IMPULSE_SCHEMA_VERSION,
          seq: ImpulseState.eventSeq,
          ...details
        })
      );
    } catch {}
  }

  // --------------------------------------------------------------------------
  // BUILD IMPULSE ENVELOPE — deterministic, binary-native, tier-aware
  // --------------------------------------------------------------------------
  function buildImpulseEnvelope({
    source,
    payload,
    binaryPayload,
    context,
    tier = ImpulseTiers.info,
    channel = ImpulseChannels.ui
  }) {
    const modeKind = binaryPayload ? "dual" : "symbolic";
    const lineage = Evolution?.getPageLineage?.() || {};
    const route = RouteOrgan?.RouterState?.currentRoute || "unknown";

    const envelope = {
      schemaVersion: IMPULSE_SCHEMA_VERSION,
      source,
      modeKind,
      route,
      lineage,
      tier,
      channel,
      payload: payload || {},
      binary: binaryPayload || null,
      context: context || {},
      version: ImpulseRole.version,
      timestamp: "NO_TIMESTAMP_v15"
    };

    envelope.signature = deterministicSignature(envelope);
    return envelope;
  }

  // --------------------------------------------------------------------------
  // EMIT IMPULSE — deterministic, dual-band, CNS-aware
  // --------------------------------------------------------------------------
  function emit({
    source = "UI",
    payload = {},
    binaryPayload = null,
    context = {},
    tier = ImpulseTiers.info,
    channel = ImpulseChannels.ui
  } = {}) {
    nextSeq();

    const envelope = buildImpulseEnvelope({
      source,
      payload,
      binaryPayload,
      context,
      tier,
      channel
    });

    ImpulseState.lastImpulse = envelope;
    ImpulseState.lastModeKind = envelope.modeKind;
    ImpulseState.lastRoute = envelope.route;
    ImpulseState.lastSignature = envelope.signature;
    ImpulseState.lastTier = tier;
    ImpulseState.lastChannel = channel;

    try {
      CNS?.emitImpulse?.("PulseEvolutionaryImpulse", envelope);
      safeLog("IMPULSE_OK", {
        modeKind: envelope.modeKind,
        route: envelope.route,
        tier,
        channel
      });
      return { ok: true, signature: envelope.signature };
    } catch (err) {
      const msg = String(err);
      ImpulseState.lastError = msg;
      warn("[PulseEvolutionaryImpulse] EMIT_ERROR", msg);
      safeLog("IMPULSE_ERROR", { error: msg });
      return { ok: false, error: "EmitError" };
    }
  }

  const PulseEvolutionaryImpulse = {
    ImpulseRole,
    ImpulseState,
    emit,
    Tiers: ImpulseTiers,
    Channels: ImpulseChannels
  };

  safeLog("INIT", {
    identity: ImpulseRole.identity,
    version: ImpulseRole.version
  });

  return PulseEvolutionaryImpulse;
}
try {
  if (typeof window !== "undefined") {
    window.PulseEvolutionaryImpulse = createPulseEvolutionaryImpulse;
  }
  if (typeof globalThis !== "undefined") {
    globalThis.PulseEvolutionaryImpulse = createPulseEvolutionaryImpulse;
  }
  if (typeof global !== "undefined") {
    global.PulseEvolutionaryImpulse = createPulseEvolutionaryImpulse;
  }
  if (typeof g !== "undefined") {
    g.PulseEvolutionaryImpulse = createPulseEvolutionaryImpulse;
  }
} catch {}