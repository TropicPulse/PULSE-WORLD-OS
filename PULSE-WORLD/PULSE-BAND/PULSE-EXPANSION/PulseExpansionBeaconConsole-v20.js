// ============================================================================
// PULSE-WORLD : PulseBeaconConsole-v20-Immortal-AIWorld-GPU+-CI.js
// ROLE: Global expansion console + Overmind control surface
// VERSION: v20-Immortal-AIWorld-GPU+-CI
// ============================================================================
//
// PURPOSE:
//   This organ is the Overmind-facing "brain" of PulseWorld expansion.
//   It controls global hints, modes, payload shaping, and expansion pulses.
//
//   It consumes (Beacon Engine v20-Immortal-AIWorld-GPU+-CI, symbolic only):
//     - beacon.getStateSnapshot()
//     - beacon.getTelemetry()
//     - beacon.getGlobalHints()
//     - beacon.setGlobalHints()
//     - beacon.applyDirective()
//     - beacon.updatePayloadFromContext()
//     - beacon.broadcastOnce()
//     - beacon.buildPresenceField()
//     - beacon.buildAdvantageField()
//     - beacon.buildHintsField()
//     - beacon.buildBandField()
//     - beacon.buildChunkPrewarmField()
//
//   Optional v20+ symbolic surfaces (if engine exposes them):
//     - beacon.buildContinuanceOverlayField?.()
//     - beacon.buildCIOverlayField?.()
//     - beacon.buildBinaryDeltaOverlayField?.()
//     - beacon.buildWorldAdvantageField?.()
//     - beacon.buildWorldTruthField?.()
//
//   It produces (symbolic only):
//     - global organism hints (fallback/chunk/cache/prewarm/advantage/presence/world/continuance/CI/binaryDelta)
//     - mode changes
//     - payload updates
//     - expansion pulses (symbolic)
//     - region-scoped hint updates (symbolic)
//     - band / advantage / prewarm / continuance / CI / world-core oriented directives
//
// CONTRACT:
//   - Never compute signal shaping physics.
//   - Never compute presence/advantage/band/chunk/continuance/CI/binaryDelta fields itself.
//   - Never mutate engine internals.
//   - Only call Beacon Engine APIs and symbolically merge fields.
//   - Always deterministic.
//   - Pure symbolic Overmind surface.
// ============================================================================
import {
  OrganismIdentity,
  buildPulseOrganismMap as PulseOrganismMap,
  buildPulseOrganismMap as buildOrganismMap
} from "../PULSE-X/PULSE-WORLD-MAP.js";
const Identity = OrganismIdentity(import.meta.url);

// 2 — EXPORT GENOME METADATA
export const PulseBeaconConsoleMeta = Identity.OrganMeta;
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
// export const PULSE_EARN_IMMUNE_CONTEXT = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

// ============================================================================
// HELPERS (symbolic, deterministic)
// ============================================================================
function clamp01(x) {
  if (x == null || Number.isNaN(x)) return 0;
  return Math.max(0, Math.min(1, x));
}

function stableHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 1000003;
  }
  return `bc${h}`;
}

// Console artery metrics (symbolic only)
const _consoleArtery = {
  totalOps: 0,
  hintsOps: 0,
  modeOps: 0,
  payloadOps: 0,
  pulseOps: 0,
  directiveOps: 0,
  worldOps: 0,
  continuanceOps: 0,
  ciOps: 0,
  lastOpKind: null
};

function _bumpConsoleArtery(kind) {
  _consoleArtery.totalOps += 1;
  if (kind === "hints") _consoleArtery.hintsOps += 1;
  if (kind === "mode") _consoleArtery.modeOps += 1;
  if (kind === "payload") _consoleArtery.payloadOps += 1;
  if (kind === "pulse") _consoleArtery.pulseOps += 1;
  if (kind === "directive") _consoleArtery.directiveOps += 1;
  if (kind === "world") _consoleArtery.worldOps += 1;
  if (kind === "continuance") _consoleArtery.continuanceOps += 1;
  if (kind === "ci") _consoleArtery.ciOps += 1;
  _consoleArtery.lastOpKind = kind;
}

export function getBeaconConsoleArterySnapshot() {
  const total = Math.max(1, _consoleArtery.totalOps || 1);
  const load = clamp01(total / 16384);

  const loadBucket =
    load >= 0.9 ? "saturated" :
    load >= 0.7 ? "high" :
    load >= 0.4 ? "medium" :
    load > 0 ? "low" : "idle";

  return Object.freeze({
    ..._consoleArtery,
    load,
    loadBucket
  });
}

// Build a merged globalHints object without inventing new physics.
// This is purely symbolic merging of caller-provided fields.
function mergeGlobalHints(prev = {}, patch = {}) {
  return {
    ...prev,
    presenceContext: {
      ...(prev.presenceContext || {}),
      ...(patch.presenceContext || {})
    },
    advantageContext: {
      ...(prev.advantageContext || {}),
      ...(patch.advantageContext || {})
    },
    fallbackContext: {
      ...(prev.fallbackContext || {}),
      ...(patch.fallbackContext || {})
    },
    chunkHints: {
      ...(prev.chunkHints || {}),
      ...(patch.chunkHints || {})
    },
    cacheHints: {
      ...(prev.cacheHints || {}),
      ...(patch.cacheHints || {})
    },
    prewarmHints: {
      ...(prev.prewarmHints || {}),
      ...(patch.prewarmHints || {})
    },
    regionChunkPlan: {
      ...(prev.regionChunkPlan || {}),
      ...(patch.regionChunkPlan || {})
    },
    regionHints: {
      ...(prev.regionHints || {}),
      ...(patch.regionHints || {})
    },
    // v20+: continuance / CI / binary-delta / world-core symbolic overlays
    continuanceHint: {
      ...(prev.continuanceHint || {}),
      ...(patch.continuanceHint || {})
    },
    ciHint: {
      ...(prev.ciHint || {}),
      ...(patch.ciHint || {})
    },
    binaryDeltaHint: {
      ...(prev.binaryDeltaHint || {}),
      ...(patch.binaryDeltaHint || {})
    },
    worldAdvantage: {
      ...(prev.worldAdvantage || {}),
      ...(patch.worldAdvantage || {})
    },
    worldTruth: {
      ...(prev.worldTruth || {}),
      ...(patch.worldTruth || {})
    },
    consoleTags: {
      ...(prev.consoleTags || {}),
      ...(patch.consoleTags || {})
    },
    bandSignature:
      patch.bandSignature != null
        ? patch.bandSignature
        : prev.bandSignature,
    // allow direct fallbackBandLevel override if present
    fallbackBandLevel:
      patch.fallbackBandLevel != null
        ? patch.fallbackBandLevel
        : prev.fallbackBandLevel
  };
}

// ============================================================================
// ORGAN: PulseBeaconConsole (v20-Immortal-AIWorld-GPU+-CI)
// ============================================================================
export function PulseBeaconConsole({ beacon }) {
  if (!beacon) throw new Error("PulseBeaconConsole requires a Beacon Engine instance");

  const consoleIdentity = Object.freeze({
    consoleId: stableHash("PULSE_BEACON_CONSOLE_V20"),
    version: PulseBeaconConsoleMeta.version,
    role: PulseBeaconConsoleMeta.role
  });

  // Optional-safe helpers for v20+ overlay builders
  function _safeCall(target, method) {
    try {
      if (!target || typeof target[method] !== "function") return null;
      return target[method]();
    } catch {
      return null;
    }
  }

  return Object.freeze({

    // ------------------------------------------------------------------------
    // META
    // ------------------------------------------------------------------------
    meta: PulseBeaconConsoleMeta,
    identity: consoleIdentity,
    getConsoleArterySnapshot: () => getBeaconConsoleArterySnapshot(),

    // ------------------------------------------------------------------------
    // SNAPSHOT: Full engine state (presence, hints, mode, payload, telemetry)
    // ------------------------------------------------------------------------
    getSnapshot() {
      _bumpConsoleArtery("hints");
      return beacon.getStateSnapshot();
    },

    getTelemetry() {
      _bumpConsoleArtery("hints");
      return beacon.getTelemetry();
    },

    // ------------------------------------------------------------------------
    // PRESENCE / ADVANTAGE / HINTS / BAND / CHUNK FIELDS (delegated)
    // ------------------------------------------------------------------------
    getPresenceField() {
      _bumpConsoleArtery("hints");
      return beacon.buildPresenceField();
    },

    getAdvantageField() {
      _bumpConsoleArtery("hints");
      return beacon.buildAdvantageField();
    },

    getHintsField() {
      _bumpConsoleArtery("hints");
      return beacon.buildHintsField();
    },

    getBandField() {
      _bumpConsoleArtery("hints");
      return beacon.buildBandField();
    },

    getChunkPrewarmField() {
      _bumpConsoleArtery("hints");
      return beacon.buildChunkPrewarmField();
    },

    // v20+: optional overlay fields (continuance / CI / binary-delta / world-core)
    getContinuanceOverlayField() {
      _bumpConsoleArtery("continuance");
      return _safeCall(beacon, "buildContinuanceOverlayField");
    },

    getCIOverlayField() {
      _bumpConsoleArtery("ci");
      return _safeCall(beacon, "buildCIOverlayField");
    },

    getBinaryDeltaOverlayField() {
      _bumpConsoleArtery("hints");
      return _safeCall(beacon, "buildBinaryDeltaOverlayField");
    },

    getWorldAdvantageField() {
      _bumpConsoleArtery("world");
      return _safeCall(beacon, "buildWorldAdvantageField");
    },

    getWorldTruthField() {
      _bumpConsoleArtery("world");
      return _safeCall(beacon, "buildWorldTruthField");
    },

    // ------------------------------------------------------------------------
    // GLOBAL HINTS: Set organism-level hints (hybrid v20 / region-aware)
// ------------------------------------------------------------------------
    setGlobalHints(globalHints) {
      _bumpConsoleArtery("hints");
      return beacon.setGlobalHints(globalHints);
    },

    getGlobalHints() {
      _bumpConsoleArtery("hints");
      return beacon.getGlobalHints();
    },

    // Symbolic helper: merge patch into existing global hints.
    mergeGlobalHints(patch = {}) {
      _bumpConsoleArtery("hints");
      const current = beacon.getGlobalHints() || {};
      const merged = mergeGlobalHints(current, patch);
      return beacon.setGlobalHints(merged);
    },

    // Region-scoped hints: purely symbolic tagging, no physics here.
    setRegionScopedHints(
      regionId,
      {
        presenceTier,
        advantageScore,
        fallbackBandLevel,
        chunkPriority
      } = {}
    ) {
      _bumpConsoleArtery("hints");
      const current = beacon.getGlobalHints() || {};
      const regionHints = {
        ...(current.regionHints || {})
      };

      regionHints[regionId] = {
        presenceTier:
          presenceTier ||
          regionHints[regionId]?.presenceTier ||
          "presence_low",
        advantageScore:
          advantageScore != null
            ? advantageScore
            : regionHints[regionId]?.advantageScore ?? 0,
        fallbackBandLevel:
          fallbackBandLevel != null
            ? fallbackBandLevel
            : regionHints[regionId]?.fallbackBandLevel ?? 0,
        chunkPriority:
          chunkPriority != null
            ? chunkPriority
            : regionHints[regionId]?.chunkPriority ?? "normal"
      };

      const merged = {
        ...current,
        regionHints
      };

      return beacon.setGlobalHints(merged);
    },

    // v20+: symbolic helper to apply continuance + omnihosting + world-core overlays
    applyContinuanceAndWorldOverlays({
      continuanceRiskReport = null,
      omniHostingPlan = null,
      worldAdvantageContext = null,
      worldTruthVectors = null,
      ciOverlay = null,
      binaryDeltaOverlay = null,
      consoleTags = {}
    } = {}) {
      _bumpConsoleArtery("world");
      const patch = {};

      if (continuanceRiskReport) {
        patch.continuanceHint = {
          globalRisk: continuanceRiskReport.globalRisk,
          band: continuanceRiskReport.fallbackBandLevel,
          notes: Array.isArray(continuanceRiskReport.notes)
            ? continuanceRiskReport.notes.slice()
            : []
        };
        patch.fallbackBandLevel =
          continuanceRiskReport.fallbackBandLevel ?? patch.fallbackBandLevel;
        patch.chunkHints = {
          ...(patch.chunkHints || {}),
          ...(continuanceRiskReport.chunkHint || {})
        };
        patch.cacheHints = {
          ...(patch.cacheHints || {}),
          ...(continuanceRiskReport.cacheHint || {})
        };
        patch.prewarmHints = {
          ...(patch.prewarmHints || {}),
          ...(continuanceRiskReport.prewarmHint || {})
        };
      }

      if (omniHostingPlan) {
        patch.presenceContext = {
          ...(patch.presenceContext || {}),
          ...(omniHostingPlan.presenceField || {})
        };
        patch.advantageContext = {
          ...(patch.advantageContext || {}),
          ...(omniHostingPlan.advantageField || {})
        };
        patch.fallbackBandLevel =
          omniHostingPlan.fallbackBandLevel ?? patch.fallbackBandLevel;
        patch.chunkHints = {
          ...(patch.chunkHints || {}),
          ...(omniHostingPlan.chunkHint || {})
        };
        patch.cacheHints = {
          ...(patch.cacheHints || {}),
          ...(omniHostingPlan.cacheHint || {})
        };
        patch.prewarmHints = {
          ...(patch.prewarmHints || {}),
          ...(omniHostingPlan.prewarmHint || {})
        };
      }

      if (worldAdvantageContext) {
        patch.worldAdvantage = {
          ...(patch.worldAdvantage || {}),
          ...(worldAdvantageContext.world || {})
        };
        patch.consoleTags = {
          ...(patch.consoleTags || {}),
          ...(worldAdvantageContext.tags || {})
        };
      }

      if (worldTruthVectors) {
        patch.worldTruth = {
          ...(patch.worldTruth || {}),
          loadVector: worldTruthVectors.loadVector || null,
          healthVector: worldTruthVectors.healthVector || null,
          densityVector: worldTruthVectors.densityVector || null,
          stressVector: worldTruthVectors.stressVector || null
        };
        patch.consoleTags = {
          ...(patch.consoleTags || {}),
          ...(worldTruthVectors.tags || {})
        };
      }

      if (ciOverlay) {
        patch.ciHint = {
          ...(patch.ciHint || {}),
          ...ciOverlay
        };
      }

      if (binaryDeltaOverlay) {
        patch.binaryDeltaHint = {
          ...(patch.binaryDeltaHint || {}),
          ...binaryDeltaOverlay
        };
      }

      if (consoleTags && Object.keys(consoleTags).length) {
        patch.consoleTags = {
          ...(patch.consoleTags || {}),
          ...consoleTags
        };
      }

      const current = beacon.getGlobalHints() || {};
      const merged = mergeGlobalHints(current, patch);
      return beacon.setGlobalHints(merged);
    },

    // ------------------------------------------------------------------------
    // MODE CONTROL: discovery | presence | adaptive | pulse-reach | pulse-storm
    //               | PULSE-MESH | pulse-expand | pulse-coldstart | pulse-aiworld
    // (delegated via setMode)
// ------------------------------------------------------------------------
    setMode(mode) {
      _bumpConsoleArtery("mode");
      return beacon.setMode(mode);
    },

    setDiscoveryMode() {
      _bumpConsoleArtery("mode");
      return beacon.setMode("discovery");
    },

    setPresenceMode() {
      _bumpConsoleArtery("mode");
      return beacon.setMode("presence");
    },

    setAdaptiveMode() {
      _bumpConsoleArtery("mode");
      return beacon.setMode("adaptive");
    },

    setMeshMode() {
      _bumpConsoleArtery("mode");
      return beacon.setMode("PULSE-MESH");
    },

    setExpandMode() {
      _bumpConsoleArtery("mode");
      return beacon.setMode("pulse-expand");
    },

    setReachMode() {
      _bumpConsoleArtery("mode");
      return beacon.setMode("pulse-reach");
    },

    setStormMode() {
      _bumpConsoleArtery("mode");
      return beacon.setMode("pulse-storm");
    },

    setColdStartMode() {
      _bumpConsoleArtery("mode");
      return beacon.setMode("pulse-coldstart");
    },

    setAIWorldMode() {
      _bumpConsoleArtery("mode");
      return beacon.setMode("pulse-aiworld");
    },

    // ------------------------------------------------------------------------
    // PAYLOAD CONTROL: regionTag, castlePresence, meshStatus, loadHint, userProfile, etc.
// ------------------------------------------------------------------------
    updatePayload(payloadUpdate) {
      _bumpConsoleArtery("payload");
      return beacon.updatePayloadFromContext(payloadUpdate);
    },

    updateRegionPayload(
      regionId,
      {
        meshStatus,
        loadHint,
        userProfile,
        advantageHint,
        fallbackBandLevel,
        coldStartPhase,
        worldTag,
        continuanceBand
      } = {}
    ) {
      _bumpConsoleArtery("payload");
      return beacon.updatePayloadFromContext({
        regionTag: regionId,
        meshStatus,
        loadHint,
        userProfile,
        advantageHint,
        fallbackBandLevel,
        coldStartPhase,
        worldTag,
        continuanceBand
      });
    },

    // ------------------------------------------------------------------------
    // EXPANSION PULSE: Fire a broadcast with optional context hints
    // (Bluetooth emission happens ONLY inside the engine/adapter organ)
// ------------------------------------------------------------------------
    pulse(contextHints = {}) {
      _bumpConsoleArtery("pulse");
      return beacon.broadcastOnce(contextHints);
    },

    pulseDiscovery(contextHints = {}) {
      _bumpConsoleArtery("pulse");
      beacon.setMode("discovery");
      return beacon.broadcastOnce(contextHints);
    },

    pulsePresence(contextHints = {}) {
      _bumpConsoleArtery("pulse");
      beacon.setMode("presence");
      return beacon.broadcastOnce(contextHints);
    },

    pulseMesh(contextHints = {}) {
      _bumpConsoleArtery("pulse");
      beacon.setMode("PULSE-MESH");
      return beacon.broadcastOnce(contextHints);
    },

    pulseExpand(contextHints = {}) {
      _bumpConsoleArtery("pulse");
      beacon.setMode("pulse-expand");
      return beacon.broadcastOnce(contextHints);
    },

    pulseReach(contextHints = {}) {
      _bumpConsoleArtery("pulse");
      beacon.setMode("pulse-reach");
      return beacon.broadcastOnce(contextHints);
    },

    pulseStorm(contextHints = {}) {
      _bumpConsoleArtery("pulse");
      beacon.setMode("pulse-storm");
      return beacon.broadcastOnce(contextHints);
    },

    pulseColdStart(contextHints = {}) {
      _bumpConsoleArtery("pulse");
      beacon.setMode("pulse-coldstart");
      return beacon.broadcastOnce(contextHints);
    },

    pulseAIWorld(contextHints = {}) {
      _bumpConsoleArtery("pulse");
      beacon.setMode("pulse-aiworld");
      return beacon.broadcastOnce(contextHints);
    },

    pulseRegion(
      regionId,
      {
        densityHint = "medium",
        demandHint = "medium",
        regionType = "venue",
        meshStatus = "unknown",
        worldTag = null
      } = {}
    ) {
      _bumpConsoleArtery("pulse");
      return beacon.broadcastOnce({
        densityHint,
        demandHint,
        regionType,
        meshStatus,
        regionId,
        worldTag
      });
    },

    // v20+: pulse with overlays (symbolic only)
    pulseWithOverlays({
      mode = null,
      contextHints = {},
      continuanceRiskReport = null,
      omniHostingPlan = null,
      worldAdvantageContext = null,
      worldTruthVectors = null,
      ciOverlay = null,
      binaryDeltaOverlay = null
    } = {}) {
      _bumpConsoleArtery("pulse");
      if (mode) beacon.setMode(mode);

      this.applyContinuanceAndWorldOverlays({
        continuanceRiskReport,
        omniHostingPlan,
        worldAdvantageContext,
        worldTruthVectors,
        ciOverlay,
        binaryDeltaOverlay
      });

      return beacon.broadcastOnce(contextHints);
    },

    // ------------------------------------------------------------------------
    // DIRECTIVES: Overmind-style multi-field updates
    // ------------------------------------------------------------------------
    directive(directive) {
      _bumpConsoleArtery("directive");
      return beacon.applyDirective(directive);
    },

    regionDirective(
      regionId,
      {
        mode = null,
        payloadUpdate = {},
        globalHintsPatch = {},
        broadcastNow = false,
        contextHints = {}
      } = {}
    ) {
      _bumpConsoleArtery("directive");
      const patchedPayload = {
        ...payloadUpdate,
        regionTag: regionId
      };

      const currentHints = beacon.getGlobalHints() || {};
      const mergedHints = Object.keys(globalHintsPatch).length
        ? mergeGlobalHints(currentHints, {
            ...(globalHintsPatch || {}),
            regionHints: {
              ...(currentHints.regionHints || {}),
              [regionId]: {
                ...((currentHints.regionHints || {})[regionId] || {}),
                ...(globalHintsPatch.regionHints || {})
              }
            }
          })
        : undefined;

      const directive = {
        mode,
        payloadUpdate: patchedPayload,
        globalHints: mergedHints,
        broadcastNow,
        contextHints: {
          ...contextHints,
          regionId
        }
      };

      return beacon.applyDirective(directive);
    },

    // v20+: continuance-aware region directive (symbolic)
    regionContinuanceDirective(
      regionId,
      {
        mode = null,
        payloadUpdate = {},
        continuanceRiskReport = null,
        globalHintsPatch = {},
        broadcastNow = false,
        contextHints = {}
      } = {}
    ) {
      _bumpConsoleArtery("continuance");
      const currentHints = beacon.getGlobalHints() || {};

      const continuancePatch = continuanceRiskReport
        ? {
            continuanceHint: {
              globalRisk: continuanceRiskReport.globalRisk,
              band: continuanceRiskReport.fallbackBandLevel,
              notes: Array.isArray(continuanceRiskReport.notes)
                ? continuanceRiskReport.notes.slice()
                : []
            },
            fallbackBandLevel:
              continuanceRiskReport.fallbackBandLevel ??
              currentHints.fallbackBandLevel
          }
        : {};

      const mergedHints = mergeGlobalHints(currentHints, {
        ...globalHintsPatch,
        ...continuancePatch
      });

      const directive = {
        mode,
        payloadUpdate: {
          ...payloadUpdate,
          regionTag: regionId
        },
        globalHints: mergedHints,
        broadcastNow,
        contextHints: {
          ...contextHints,
          regionId
        }
      };

      return beacon.applyDirective(directive);
    }
  });
}
