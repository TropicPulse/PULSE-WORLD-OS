/** ============================================================================
 *  PULSE-WORLD : PulseBeaconConsole-v25-Civilization++.js
 *  ROLE: Global expansion console + Overmind control surface
 *  VERSION: v25-Civilization++ (AIWorld + Mesh24/25 + BeaconPresence + Continuance/CI)
 * ============================================================================
 *
 *  PURPOSE:
 *    This organ is the Overmind-facing "brain" of PulseWorld expansion.
 *    It controls global hints, modes, payload shaping, and expansion pulses.
 *
 *    It consumes (BeaconEngine v25-Civilization++, symbolic only):
 *      - beacon.getStateSnapshot()
 *      - beacon.getTelemetry()
 *      - beacon.getGlobalHints()
 *      - beacon.setGlobalHints()
 *      - beacon.applyDirective()
 *      - beacon.updatePayloadFromContext()
 *      - beacon.broadcastOnce()
 *      - beacon.buildPresenceField()
 *      - beacon.buildAdvantageField()
 *      - beacon.buildHintsField()
 *      - beacon.buildBandField()
 *      - beacon.buildChunkPrewarmField()
 *      - beacon.buildBeaconPresenceField()   <-- NEW v25
 *
 *    Optional v25+ symbolic surfaces:
 *      - beacon.buildContinuanceField()
 *      - beacon.buildCIField()
 *      - beacon.buildBinaryDeltaField()
 *      - beacon.buildOmniHostingField()
 *      - beacon.buildImmortalField()
 *      - beacon.buildCostSignal()            <-- NEW v25
 *      - beacon.buildWorldMeshSignal()       <-- NEW v25
 *
 *    It produces (symbolic only):
 *      - global organism hints (fallback/chunk/cache/prewarm/advantage/presence/world/continuance/CI/binaryDelta)
 *      - civilization-tier hints (NEW)
 *      - town-type hints (NEW)
 *      - cost-band hints (NEW)
 *      - mode changes
 *      - payload updates
 *      - expansion pulses (symbolic)
 *      - region-scoped hint updates (symbolic)
 *      - band / advantage / prewarm / continuance / CI / world-core oriented directives
 *
 *  CONTRACT:
 *    - Never compute signal physics.
 *    - Never compute presence/advantage/band/chunk/continuance/CI/binaryDelta fields itself.
 *    - Never mutate engine internals.
 *    - Only call Beacon Engine APIs and symbolically merge fields.
 *    - Always deterministic.
 *    - Pure symbolic Overmind surface.
 * ============================================================================ */

import {
  OrganismIdentity
} from "../PULSE-X/PULSE-WORLD-MAPORGANISM.js";

const Identity = OrganismIdentity(import.meta.url);

// META
export const PulseBeaconConsoleMeta = {
  ...Identity.OrganMeta,
  organId: "PulseBeaconConsole-v25-Civilization++",
  version: "v25-Civilization++",
  role: "OVERMIND_CONSOLE"
};

export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

// ============================================================================
// HELPERS
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

// Console artery metrics
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

function _bump(kind) {
  _consoleArtery.totalOps++;
  if (kind === "hints") _consoleArtery.hintsOps++;
  if (kind === "mode") _consoleArtery.modeOps++;
  if (kind === "payload") _consoleArtery.payloadOps++;
  if (kind === "pulse") _consoleArtery.pulseOps++;
  if (kind === "directive") _consoleArtery.directiveOps++;
  if (kind === "world") _consoleArtery.worldOps++;
  if (kind === "continuance") _consoleArtery.continuanceOps++;
  if (kind === "ci") _consoleArtery.ciOps++;
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

// ============================================================================
// GLOBAL HINT MERGING (v25 Civilization++)
// ============================================================================
function mergeHints(prev = {}, patch = {}) {
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

    // v25: civilization + town + cost
    civilizationHints: {
      ...(prev.civilizationHints || {}),
      ...(patch.civilizationHints || {})
    },

    townHints: {
      ...(prev.townHints || {}),
      ...(patch.townHints || {})
    },

    costHints: {
      ...(prev.costHints || {}),
      ...(patch.costHints || {})
    },

    // v20+ overlays
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

    fallbackBandLevel:
      patch.fallbackBandLevel != null
        ? patch.fallbackBandLevel
        : prev.fallbackBandLevel
  };
}

// ============================================================================
// ORGAN: PulseBeaconConsole v25-Civilization++
// ============================================================================
export function PulseBeaconConsole({ beacon }) {
  if (!beacon) throw new Error("PulseBeaconConsole requires a Beacon Engine instance");

  const identity = Object.freeze({
    consoleId: stableHash("PULSE_BEACON_CONSOLE_V25"),
    version: PulseBeaconConsoleMeta.version,
    role: PulseBeaconConsoleMeta.role
  });

  function _safe(target, method) {
    try {
      if (!target || typeof target[method] !== "function") return null;
      return target[method]();
    } catch {
      return null;
    }
  }

  return Object.freeze({
  meta: PulseBeaconConsoleMeta,
  identity,
  // v25 preferred
  getConsoleArterySnapshot: () => getBeaconConsoleArterySnapshot(),

  // legacy v20 compatibility
  getBeaconConsoleArterySnapshot: () => getBeaconConsoleArterySnapshot(),
    // SNAPSHOTS
    getSnapshot() {
      _bump("hints");
      return beacon.getStateSnapshot();
    },

    getTelemetry() {
      _bump("hints");
      return beacon.getTelemetry();
    },

    // FIELDS (delegated)
    getPresenceField() {
      _bump("hints");
      return beacon.buildPresenceField();
    },

    getAdvantageField() {
      _bump("hints");
      return beacon.buildAdvantageField();
    },

    getHintsField() {
      _bump("hints");
      return beacon.buildHintsField();
    },

    getBandField() {
      _bump("hints");
      return beacon.buildBandField();
    },

    getChunkPrewarmField() {
      _bump("hints");
      return beacon.buildChunkPrewarmField();
    },

    // v25: BeaconPresence
    getBeaconPresenceField() {
      _bump("hints");
      return beacon.buildBeaconPresenceField?.() || null;
    },

    // v25: cost + worldMesh
    getCostField() {
      _bump("hints");
      return beacon.buildCostSignal?.() || null;
    },

    getWorldMeshField() {
      _bump("hints");
      return beacon.buildWorldMeshSignal?.() || null;
    },

    // v20+ overlays
    getContinuanceOverlayField() {
      _bump("continuance");
      return _safe(beacon, "buildContinuanceField");
    },

    getCIOverlayField() {
      _bump("ci");
      return _safe(beacon, "buildCIField");
    },

    getBinaryDeltaOverlayField() {
      _bump("hints");
      return _safe(beacon, "buildBinaryDeltaField");
    },

    getOmniHostingField() {
      _bump("world");
      return _safe(beacon, "buildOmniHostingField");
    },

    getImmortalField() {
      _bump("world");
      return _safe(beacon, "buildImmortalField");
    },

    // GLOBAL HINTS
    setGlobalHints(h) {
      _bump("hints");
      return beacon.setGlobalHints(h);
    },

    getGlobalHints() {
      _bump("hints");
      return beacon.getGlobalHints();
    },

    mergeGlobalHints(patch = {}) {
      _bump("hints");
      const current = beacon.getGlobalHints() || {};
      const merged = mergeHints(current, patch);
      return beacon.setGlobalHints(merged);
    },

    // REGION HINTS
    setRegionScopedHints(regionId, patch = {}) {
      _bump("hints");
      const current = beacon.getGlobalHints() || {};
      const regionHints = { ...(current.regionHints || {}) };

      regionHints[regionId] = {
        ...(regionHints[regionId] || {}),
        ...patch
      };

      const merged = mergeHints(current, { regionHints });
      return beacon.setGlobalHints(merged);
    },

    // v25: Civilization / Town / Cost hints
    setCivilizationHints(regionId, { civilizationTier, townType, costBand } = {}) {
      _bump("world");
      const current = beacon.getGlobalHints() || {};

      const civ = {
        ...(current.civilizationHints || {}),
        [regionId]: civilizationTier || "void"
      };

      const towns = {
        ...(current.townHints || {}),
        [regionId]: townType || "wilderness"
      };

      const costs = {
        ...(current.costHints || {}),
        [regionId]: costBand || "unknown"
      };

      const merged = mergeHints(current, {
        civilizationHints: civ,
        townHints: towns,
        costHints: costs
      });

      return beacon.setGlobalHints(merged);
    },

    // CONTINUANCE + WORLD OVERLAYS
    applyContinuanceAndWorldOverlays({
      continuanceRiskReport = null,
      omniHostingPlan = null,
      worldAdvantageContext = null,
      worldTruthVectors = null,
      ciOverlay = null,
      binaryDeltaOverlay = null,
      consoleTags = {}
    } = {}) {
      _bump("world");

      const patch = {};

      if (continuanceRiskReport) {
        patch.continuanceHint = {
          globalRisk: continuanceRiskReport.globalRisk,
          band: continuanceRiskReport.fallbackBandLevel,
          notes: Array.isArray(continuanceRiskReport.notes)
            ? continuanceRiskReport.notes.slice()
            : []
        };
        patch.fallbackBandLevel = continuanceRiskReport.fallbackBandLevel;
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
      const merged = mergeHints(current, patch);
      return beacon.setGlobalHints(merged);
    },

    // MODE CONTROL
    setMode(mode) {
      _bump("mode");
      return beacon.setMode(mode);
    },

    setDiscoveryMode() { return this.setMode("discovery"); },
    setPresenceMode() { return this.setMode("presence"); },
    setAdaptiveMode() { return this.setMode("adaptive"); },
    setMeshMode() { return this.setMode("PULSE-MESH"); },
    setExpandMode() { return this.setMode("pulse-expand"); },
    setReachMode() { return this.setMode("pulse-reach"); },
    setStormMode() { return this.setMode("pulse-storm"); },
    setColdStartMode() { return this.setMode("pulse-coldstart"); },
    setAIWorldMode() { return this.setMode("pulse-aiworld"); },

    // PAYLOAD CONTROL
    updatePayload(payloadUpdate) {
      _bump("payload");
      return beacon.updatePayloadFromContext(payloadUpdate);
    },

    updateRegionPayload(regionId, patch = {}) {
      _bump("payload");
      return beacon.updatePayloadFromContext({
        ...patch,
        regionTag: regionId
      });
    },

    // PULSES
    pulse(contextHints = {}) {
      _bump("pulse");
      return beacon.broadcastOnce(contextHints);
    },

    pulseDiscovery(ctx = {}) { this.setDiscoveryMode(); return this.pulse(ctx); },
    pulsePresence(ctx = {}) {
      _bump("pulse");
      this.setPresenceMode();
      return this.pulse(ctx);
    },

    pulseAdaptive(ctx = {}) {
      _bump("pulse");
      this.setAdaptiveMode();
      return this.pulse(ctx);
    },

    pulseMesh(ctx = {}) {
      _bump("pulse");
      this.setMeshMode();
      return this.pulse(ctx);
    },

    pulseExpand(ctx = {}) {
      _bump("pulse");
      this.setExpandMode();
      return this.pulse(ctx);
    },

    pulseReach(ctx = {}) {
      _bump("pulse");
      this.setReachMode();
      return this.pulse(ctx);
    },

    pulseStorm(ctx = {}) {
      _bump("pulse");
      this.setStormMode();
      return this.pulse(ctx);
    },

    pulseColdStart(ctx = {}) {
      _bump("pulse");
      this.setColdStartMode();
      return this.pulse(ctx);
    },

    pulseAIWorld(ctx = {}) {
      _bump("pulse");
      this.setAIWorldMode();
      return this.pulse(ctx);
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
      _bump("pulse");
      return beacon.broadcastOnce({
        densityHint,
        demandHint,
        regionType,
        meshStatus,
        regionId,
        worldTag
      });
    },

    // v25: pulse with civilization overlays
    pulseCivilization(
      regionId,
      {
        civilizationTier = "outpost",
        townType = "wilderness",
        costBand = "unknown",
        contextHints = {}
      } = {}
    ) {
      _bump("pulse");

      // merge civ/town/cost hints into global hints
      const current = beacon.getGlobalHints() || {};
      const merged = mergeHints(current, {
        civilizationHints: {
          ...(current.civilizationHints || {}),
          [regionId]: civilizationTier
        },
        townHints: {
          ...(current.townHints || {}),
          [regionId]: townType
        },
        costHints: {
          ...(current.costHints || {}),
          [regionId]: costBand
        }
      });

      beacon.setGlobalHints(merged);

      return beacon.broadcastOnce({
        ...contextHints,
        regionId,
        civilizationTier,
        townType,
        costBand
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
      _bump("pulse");

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
    // DIRECTIVES
    // ------------------------------------------------------------------------
    directive(directive) {
      _bump("directive");
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
      _bump("directive");

      const patchedPayload = {
        ...payloadUpdate,
        regionTag: regionId
      };

      const current = beacon.getGlobalHints() || {};
      const mergedHints =
        Object.keys(globalHintsPatch).length > 0
          ? mergeHints(current, {
              ...globalHintsPatch,
              regionHints: {
                ...(current.regionHints || {}),
                [regionId]: {
                  ...((current.regionHints || {})[regionId] || {}),
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

    // v25: civilization-aware region directive
    regionCivilizationDirective(
      regionId,
      {
        mode = null,
        payloadUpdate = {},
        civilizationTier = null,
        townType = null,
        costBand = null,
        globalHintsPatch = {},
        broadcastNow = false,
        contextHints = {}
      } = {}
    ) {
      _bump("world");

      const current = beacon.getGlobalHints() || {};

      const civPatch = {};
      if (civilizationTier != null) {
        civPatch.civilizationHints = {
          ...(current.civilizationHints || {}),
          [regionId]: civilizationTier
        };
      }
      if (townType != null) {
        civPatch.townHints = {
          ...(current.townHints || {}),
          [regionId]: townType
        };
      }
      if (costBand != null) {
        civPatch.costHints = {
          ...(current.costHints || {}),
          [regionId]: costBand
        };
      }

      const mergedHints = mergeHints(current, {
        ...globalHintsPatch,
        ...civPatch
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
          regionId,
          civilizationTier,
          townType,
          costBand
        }
      };

      return beacon.applyDirective(directive);
    },

    // v20+: continuance-aware region directive
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
      _bump("continuance");

      const current = beacon.getGlobalHints() || {};

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
              current.fallbackBandLevel
          }
        : {};

      const mergedHints = mergeHints(current, {
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

export default PulseBeaconConsole;
