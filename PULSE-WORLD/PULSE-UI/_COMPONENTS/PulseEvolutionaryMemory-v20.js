/*
===============================================================================
FILE: /PULSE-UI/_COMPONENTS/PulseEvolutionaryMemory-v20Plus.js
LAYER: UI LONG‑TERM MEMORY ORGAN — IMMORTAL v20++
ROLE: MEMORY‑DRIVEN EVOLUTION GOVERNOR (BACKWARD FROM NORMAL SYSTEMS)
===============================================================================

AI_EXPERIENCE_META = {
  identity: "PulseUI.EvolutionaryMemory",
  version: "v20Plus-Immortal-Evolutionary",
  layer: "pulse_ui",
  role: "ui_long_term_memory_governor",
  lineage: "v11.3-Evo-Prime → v14-Immortal → v16-Immortal → v20-Immortal → v20Plus-Governor",

  evo: {
    memoryOrgan: true,
    longTermMemory: true,
    routeAware: true,
    lineageAware: true,
    binaryAware: true,
    symbolicAware: true,
    dualBand: true,
    unifiedAdvantageField: true,
    futureEvolutionReady: true,

    deterministic: true,
    driftProof: true,
    pureCompute: true,

    zeroNetwork: true,
    zeroFilesystem: true,
    zeroMutationOfInput: true,

    // v20+ upgrades
    schemaVersioned: true,
    envelopeAware: true,
    integrityAware: true,
    bulkFlushAware: true,
    degradationAware: true,
    experienceBlocksAware: true,

    iqVersionAware: true,
    uiGenomeVersionAware: true,
    comfortPatternAware: true,
    compilerVersionAware: true,
    organismVersionAware: true,

    // v20++: MEMORY‑DRIVEN EVOLUTION
    styleGenomeAware: true,
    animationGenomeAware: true,
    styleFootprintAware: true,
    animationFootprintAware: true,
    upcomingPlanAware: true,
    evolutionAdvisoryAware: true,
    memoryControlsEvolution: true
  },

  contract: {
    always: [
      "PulseCore.Memory",
      "PulseUI.EvolutionaryCode",
      "PulseUI.EvolutionaryBrain",
      "PulseUI.EvolutionaryBinary",
      "PulseProofBridge",
      "PulseIQMap-v20",
      "PulseEvolutionaryStyles-v20",
      "PulseEvolutionaryAnimations-v20"
    ],
    never: [
      "eval",
      "Function",
      "dynamicImport",
      "fetchViaCNS",
      "networkIO",
      "filesystemIO"
    ]
  }
}

EXPORT_META = {
  organ: "PulseUI.EvolutionaryMemory",
  layer: "pulse_ui",
  stability: "IMMORTAL",
  deterministic: true,
  pure: true,

  consumes: [
    "PageModel",
    "RouteId",
    "PulseProofBridge.coreMemory",
    "IQMap",
    "PulseEvolutionaryStyles",
    "PulseEvolutionaryAnimations"
  ],

  produces: [
    "SavedSnapshot",
    "LoadedSnapshot",
    "BulkFlushResult",
    "ExperienceEnvelope",
    "EvolutionAdvisory"
  ],

  sideEffects: "core_memory_write_only",
  network: "none",
  filesystem: "none"
}
===============================================================================
*/

const g =
  typeof globalThis !== "undefined"
    ? globalThis
    : typeof global !== "undefined"
    ? global
    : typeof window !== "undefined"
    ? window
    : {};

// v20: memory is purely via PulseProofBridge.coreMemory (in‑process, sync).
import { PulseProofBridge } from "../_BACKEND/PulseProofBridge.js";

// ---------------------------------------------------------------------------
// ROLE BLOCK — v20++ IMMORTAL
// ---------------------------------------------------------------------------
export const MemoryRole = {
  type: "Organ",
  subsystem: "UI",
  layer: "PageMemory",
  version: "20.1-Immortal-Governor",
  identity: "PulseEvolutionaryMemory",

  evo: {
    driftProof: true,
    deterministic: true,
    dualBand: true,
    binaryAware: true,
    symbolicAware: true,
    memoryPersistence: true,
    lineageAware: true,
    routeAware: true,
    unifiedAdvantageField: true,
    futureEvolutionReady: true,
    envelopeAware: true,
    integrityAware: true,
    bulkFlushAware: true,
    degradationAware: true,
    experienceBlocksAware: true,
    iqVersionAware: true,
    uiGenomeVersionAware: true,
    comfortPatternAware: true,
    compilerVersionAware: true,
    organismVersionAware: true,

    // v20++: memory‑driven evolution
    styleGenomeAware: true,
    animationGenomeAware: true,
    styleFootprintAware: true,
    animationFootprintAware: true,
    upcomingPlanAware: true,
    evolutionAdvisoryAware: true,
    memoryControlsEvolution: true
  }
};

// v20++ schema bump — evolution‑governor aware.
const MEMORY_SCHEMA_VERSION = "v5";

// ============================================================================
// INTERNAL HELPERS — deterministic hashing + metrics
// ============================================================================

function hashString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) >>> 0;
  }
  return h >>> 0;
}

function computeChecksum(model) {
  return hashString(JSON.stringify(model || {}));
}

function computeLineageHash(lineage) {
  return hashString(JSON.stringify(lineage || {}));
}

function computeBandMetrics(model) {
  const payloadJson = JSON.stringify(model?.payload || {});
  const payloadSize = payloadJson.length;

  const binary = model?.binary;
  const binarySize = Array.isArray(binary) ? binary.length : 0;

  const total = payloadSize + binarySize || 1;
  const symbolicWeight = payloadSize / total;
  const binaryWeight = binarySize / total;

  const density = binaryWeight;
  const entropyHint = 1 - Math.abs(0.5 - density) * 2;

  const advantage = 0.4 * symbolicWeight + 0.6 * binaryWeight;

  return {
    payloadSize,
    binarySize,
    totalSize: total,
    symbolicWeight,
    binaryWeight,
    density,
    entropyHint,
    advantage
  };
}

function computeIntegrity({ checksum, lineageHash, band }) {
  const base =
    (checksum ? 0.4 : 0) +
    (lineageHash ? 0.3 : 0) +
    0.3 * (band.entropyHint ?? 0.5);

  const score = Math.max(0, Math.min(1, base));

  const status =
    score >= 0.95 ? "immortal" :
    score >= 0.85 ? "excellent" :
    score >= 0.70 ? "good" :
    score >= 0.55 ? "fair" :
    score >= 0.40 ? "degraded" :
                    "critical";

  const degraded = status === "degraded" || status === "critical";

  return { score, status, degraded };
}

function buildExperienceBlocks({ model, band, integrity }) {
  const lineage = model?.lineage || {};
  const route = lineage.route || model?.route || "unknown";

  const iqVersion = model?.meta?.iqVersion || null;
  const uiGenomeVersion = model?.meta?.uiGenomeVersion || null;
  const comfortPattern = model?.meta?.comfortPattern || null;
  const compilerVersion = model?.meta?.compilerVersion || null;
  const organismVersion = model?.meta?.organismVersion || null;

  return {
    schemaVersion: MEMORY_SCHEMA_VERSION,
    blocks: [
      {
        id: "memory.band",
        kind: "bandMetrics",
        route,
        payloadSize: band.payloadSize,
        binarySize: band.binarySize,
        totalSize: band.totalSize,
        symbolicWeight: band.symbolicWeight,
        binaryWeight: band.binaryWeight,
        density: band.density,
        entropyHint: band.entropyHint,
        advantage: band.advantage
      },
      {
        id: "memory.integrity",
        kind: "integrity",
        route,
        score: integrity.score,
        status: integrity.status,
        degraded: integrity.degraded
      },
      {
        id: "memory.lineage",
        kind: "lineage",
        route,
        lineage
      },
      {
        id: "memory.evolution",
        kind: "evolutionMeta",
        route,
        iqVersion,
        uiGenomeVersion,
        comfortPattern,
        compilerVersion,
        organismVersion
      }
    ]
  };
}

// ============================================================================
// STYLE + ANIMATION GENOME AWARENESS — v20++
// ============================================================================
//
// Memory becomes the governor: it inspects style/animation genomes, route
// footprints, and upcoming plans, and then issues evolution advisories.
// ============================================================================

function computeStyleAnimationMetrics({ model, IQMap }) {
  const route = model?.lineage?.route || model?.route || "unknown";

  const uiGenomeMeta = IQMap?.uiGenomeMeta || {};
  const styleGenomeVersion =
    uiGenomeMeta.styleGenomeVersion ||
    model?.meta?.styleGenomeVersion ||
    "unknown";

  const animationGenomeVersion =
    uiGenomeMeta.animationGenomeVersion ||
    model?.meta?.animationGenomeVersion ||
    "unknown";

  const iqVersion =
    IQMap?.version || model?.meta?.iqVersion || null;

  const routeSkills = IQMap?.getRouteUISkills?.(route) || {
    animations: [],
    styles: [],
    icons: [],
    hooks: []
  };

  const upcomingPlan = IQMap?.planUpcomingSkills?.([route]) || {
    flatSkills: [],
    skillsByRoute: {}
  };

  const styleCount = routeSkills.styles?.length || 0;
  const animationCount = routeSkills.animations?.length || 0;

  const upcomingStyleCount = upcomingPlan.flatSkills.filter(
    (s) => s.kind === "styles"
  ).length;

  const upcomingAnimationCount = upcomingPlan.flatSkills.filter(
    (s) => s.kind === "animations"
  ).length;

  return {
    route,
    iqVersion,
    styleGenomeVersion,
    animationGenomeVersion,
    styleCount,
    animationCount,
    upcomingStyleCount,
    upcomingAnimationCount,
    routeSkills,
    upcomingPlan
  };
}

function buildStyleAnimationExperienceBlock(styleAnim) {
  return {
    id: "memory.styleAnimation",
    kind: "styleAnimationMeta",
    route: styleAnim.route,
    iqVersion: styleAnim.iqVersion,
    styleGenomeVersion: styleAnim.styleGenomeVersion,
    animationGenomeVersion: styleAnim.animationGenomeVersion,
    styleCount: styleAnim.styleCount,
    animationCount: styleAnim.animationCount,
    upcomingStyleCount: styleAnim.upcomingStyleCount,
    upcomingAnimationCount: styleAnim.upcomingAnimationCount,
    routeSkills: styleAnim.routeSkills,
    upcomingPlan: styleAnim.upcomingPlan
  };
}

// ============================================================================
// EVOLUTION ADVISORY — MEMORY IN CHARGE
// ============================================================================
//
// Memory inspects the envelope + current IQMap and issues a deterministic
// advisory describing what evolution is required.
// ============================================================================

function buildEvolutionAdvisory({ envelope, IQMap, styleAnim }) {
  const advisory = {
    route: styleAnim.route,
    iqVersion: styleAnim.iqVersion,
    styleGenomeVersionSaved: envelope.meta?.styleGenomeVersion || null,
    animationGenomeVersionSaved: envelope.meta?.animationGenomeVersion || null,
    styleGenomeVersionCurrent: styleAnim.styleGenomeVersion,
    animationGenomeVersionCurrent: styleAnim.animationGenomeVersion,

    // high‑level flags
    shouldRebuildStyles: false,
    shouldRebuildAnimations: false,
    shouldRefreshIQMap: false,
    shouldFlushMemory: false,
    integrityStatus: envelope.integrity?.status || "unknown",
    degraded: !!envelope.integrity?.degraded,

    // reasons
    reasons: []
  };

  // Genome mismatch checks
  if (
    advisory.styleGenomeVersionSaved &&
    advisory.styleGenomeVersionSaved !== advisory.styleGenomeVersionCurrent
  ) {
    advisory.shouldRebuildStyles = true;
    advisory.reasons.push("styleGenomeMismatch");
  }

  if (
    advisory.animationGenomeVersionSaved &&
    advisory.animationGenomeVersionSaved !== advisory.animationGenomeVersionCurrent
  ) {
    advisory.shouldRebuildAnimations = true;
    advisory.reasons.push("animationGenomeMismatch");
  }

  // IQ version drift
  const savedIqVersion = envelope.model?.meta?.iqVersion || null;
  if (savedIqVersion && styleAnim.iqVersion && savedIqVersion !== styleAnim.iqVersion) {
    advisory.shouldRefreshIQMap = true;
    advisory.reasons.push("iqVersionMismatch");
  }

  // Integrity‑based decisions
  if (envelope.integrity?.degraded) {
    advisory.shouldFlushMemory = true;
    advisory.reasons.push("integrityDegraded");
  }

  return advisory;
}

function buildEnvelopeId({ routeId, checksum, lineageHash }) {
  const base = `${routeId}:${checksum}:${lineageHash}`;
  const h = hashString(base);
  return `MEM-${MEMORY_SCHEMA_VERSION}-${h.toString(16).padStart(8, "0")}`;
}

// ============================================================================
// FACTORY — IMMORTAL, SYNC, MEMORY‑DRIVEN EVOLUTION
// ============================================================================
export function createPulseEvolutionaryMemory({
  routeId = "page",
  IQMap = null,              // IQ Map for style/animation awareness
  log = console.log,
  warn = console.warn
} = {}) {
  const Core = PulseProofBridge.coreMemory;

  if (!Core) {
    warn("[PulseEvolutionaryMemory-v20Plus] CoreMemory bridge missing");
  }

  const MemoryState = {
    lastSaved: null,
    lastLoaded: null,
    lastExperience: null,
    lastAdvisory: null,
    lastError: null,
    routeId,
    eventSeq: 0
  };

  function nextSeq() {
    MemoryState.eventSeq += 1;
    return MemoryState.eventSeq;
  }

  function safeLog(stage, details = {}) {
    try {
      log(
        "[PulseEvolutionaryMemory-v20Plus]",
        stage,
        JSON.stringify({
          schemaVersion: MEMORY_SCHEMA_VERSION,
          seq: MemoryState.eventSeq,
          routeId,
          ...details
        })
      );
    } catch {}
  }

  // ------------------------------------------------------------------------
  // SAVE PAGE MODEL — IMMORTAL envelope + experience blocks (SYNC)
  // ------------------------------------------------------------------------
  function savePage(model) {
    nextSeq();

    if (!model || typeof model !== "object") {
      const errorInfo = "InvalidModel";
      MemoryState.lastError = errorInfo;
      warn("[PulseEvolutionaryMemory-v20Plus] INVALID_MODEL");
      safeLog("SAVE_INVALID_MODEL", { error: errorInfo });
      return { ok: false, error: errorInfo };
    }

    try {
      const lineage = model.lineage || {};
      const checksum = computeChecksum(model);
      const lineageHash = computeLineageHash(lineage);
      const band = computeBandMetrics(model);
      const integrity = computeIntegrity({ checksum, lineageHash, band });

      const experience = buildExperienceBlocks({ model, band, integrity });

      // ⭐ Style/Animation metrics + block
      const styleAnim = computeStyleAnimationMetrics({ model, IQMap: IQMap || null });
      experience.blocks.push(buildStyleAnimationExperienceBlock(styleAnim));

      const envelopeId = buildEnvelopeId({ routeId, checksum, lineageHash });

      const envelope = {
        schemaVersion: MEMORY_SCHEMA_VERSION,
        version: MemoryRole.version,
        id: envelopeId,
        routeId,
        model,
        checksum,
        lineageHash,
        band,
        integrity,
        experience,
        meta: {
          ...model.meta,
          styleGenomeVersion: styleAnim.styleGenomeVersion,
          animationGenomeVersion: styleAnim.animationGenomeVersion
        },
        timestamp: "NO_TIMESTAMP_v20Plus"
      };

      if (!Core || typeof Core.setRouteSnapshot !== "function") {
        const msg = "CoreMemoryMissing";
        MemoryState.lastError = msg;
        warn("[PulseEvolutionaryMemory-v20Plus] CoreMemory.setRouteSnapshot missing");
        safeLog("SAVE_ERROR", { error: msg });
        return { ok: false, error: msg };
      }

      Core.setRouteSnapshot(routeId, envelope);

      MemoryState.lastSaved = envelope;
      MemoryState.lastExperience = experience;

      safeLog("SAVE_OK", {
        id: envelopeId,
        checksum,
        lineageHash,
        integrityStatus: integrity.status,
        degraded: integrity.degraded,
        styleGenomeVersion: styleAnim.styleGenomeVersion,
        animationGenomeVersion: styleAnim.animationGenomeVersion
      });

      return {
        ok: true,
        envelope,
        experience
      };
    } catch (err) {
      const msg = String(err);
      MemoryState.lastError = msg;
      warn("[PulseEvolutionaryMemory-v20Plus] SAVE_ERROR", msg);
      safeLog("SAVE_ERROR", { error: msg });
      return { ok: false, error: "SaveError" };
    }
  }

  // ------------------------------------------------------------------------
  // LOAD PAGE MODEL — integrity + experience + advisory surfaced (SYNC)
  // ------------------------------------------------------------------------
  function loadPage() {
    nextSeq();

    try {
      if (!Core || typeof Core.getRouteSnapshot !== "function") {
        const msg = "CoreMemoryMissing";
        MemoryState.lastError = msg;
        warn("[PulseEvolutionaryMemory-v20Plus] CoreMemory.getRouteSnapshot missing");
        safeLog("LOAD_ERROR", { error: msg });
        return null;
      }

      const envelope = Core.getRouteSnapshot(routeId);

      if (!envelope || typeof envelope !== "object") {
        safeLog("LOAD_EMPTY");
        return null;
      }

      MemoryState.lastLoaded = envelope;
      MemoryState.lastExperience = envelope.experience || null;

      // Style/animation metrics under current IQMap
      const styleAnim = computeStyleAnimationMetrics({
        model: envelope.model,
        IQMap: IQMap || null
      });

      // Memory‑driven evolution advisory
      const advisory = buildEvolutionAdvisory({
        envelope,
        IQMap: IQMap || null,
        styleAnim
      });

      MemoryState.lastAdvisory = advisory;

      safeLog("LOAD_OK", {
        id: envelope.id,
        checksum: envelope.checksum,
        lineageHash: envelope.lineageHash,
        integrityStatus: envelope.integrity?.status,
        degraded: envelope.integrity?.degraded,
        styleGenomeVersionSaved: advisory.styleGenomeVersionSaved,
        styleGenomeVersionCurrent: advisory.styleGenomeVersionCurrent,
        animationGenomeVersionSaved: advisory.animationGenomeVersionSaved,
        animationGenomeVersionCurrent: advisory.animationGenomeVersionCurrent,
        reasons: advisory.reasons
      });

      return envelope.model || null;
    } catch (err) {
      const msg = String(err);
      MemoryState.lastError = msg;
      warn("[PulseEvolutionaryMemory-v20Plus] LOAD_ERROR", msg);
      safeLog("LOAD_ERROR", { error: msg });
      return null;
    }
  }

  // ------------------------------------------------------------------------
  // BULK FLUSH — IMMORTAL bridge wrapper (SYNC)
  // ------------------------------------------------------------------------
  function flush() {
    nextSeq();
    try {
      if (!Core || typeof Core.bulkFlush !== "function") {
        const msg = "CoreMemoryMissing";
        MemoryState.lastError = msg;
        warn("[PulseEvolutionaryMemory-v20Plus] CoreMemory.bulkFlush missing");
        safeLog("FLUSH_ERROR", { error: msg });
        return { ok: false, error: msg };
      }

      Core.bulkFlush();
      safeLog("FLUSH_OK");
      return { ok: true };
    } catch (err) {
      const msg = String(err);
      MemoryState.lastError = msg;
      warn("[PulseEvolutionaryMemory-v20Plus] FLUSH_ERROR", msg);
      safeLog("FLUSH_ERROR", { error: msg });
      return { ok: false, error: "FlushError" };
    }
  }

  // ------------------------------------------------------------------------
  // EVOLUTION ADVISORY SURFACE — for Brain / PageEvo
  // ------------------------------------------------------------------------
  function getEvolutionAdvisory() {
    return MemoryState.lastAdvisory || null;
  }

  const PulseEvolutionaryMemory = {
    MemoryRole,
    MemoryState,
    savePage,
    loadPage,
    flush,
    getEvolutionAdvisory,
    core: Core
  };

  safeLog("INIT", {
    identity: MemoryRole.identity,
    version: MemoryRole.version,
    schemaVersion: MEMORY_SCHEMA_VERSION
  });

  return PulseEvolutionaryMemory;
}

// ---------------------------------------------------------------------------
// GLOBAL REGISTRATION (OPTIONAL)
// ---------------------------------------------------------------------------
try {
  if (typeof window !== "undefined") {
    window.PulseEvolutionaryMemory = createPulseEvolutionaryMemory;
  }
  if (typeof globalThis !== "undefined") {
    globalThis.PulseEvolutionaryMemory = createPulseEvolutionaryMemory;
  }
  if (typeof global !== "undefined") {
    global.PulseEvolutionaryMemory = createPulseEvolutionaryMemory;
  }
  if (typeof g !== "undefined") {
    g.PulseEvolutionaryMemory = createPulseEvolutionaryMemory;
  }
} catch {
  // Never throw from global registration.
}