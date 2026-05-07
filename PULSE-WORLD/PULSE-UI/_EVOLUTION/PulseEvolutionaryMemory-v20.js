// ============================================================================
// FILE: /PULSE-UI/_EVOLUTION/PulseEvolutionaryMemory-v20Plus.js
// PULSE OS — v20++ IMMORTAL EVOLUTIONARY MEMORY ORGAN
// ROLE: MEMORY-DRIVEN EVOLUTION ADVISOR (ADVISORY MODE)
// ============================================================================
//
// AI_EXPERIENCE_META:
//   identity: "PulseUI.EvolutionaryMemory"
//   version: "v20Plus-Immortal-Evolutionary"
//   layer: "pulse_ui"
//   role: "ui_long_term_memory_governor"
//   lineage: "v11.3 → v14 → v16 → v20 → v20Plus-Advisory"
//
//   evo: {
//     memoryOrgan: true,
//     longTermMemory: true,
//     advisoryMode: true,
//     routeAware: true,
//     lineageAware: true,
//     binaryAware: true,
//     symbolicAware: true,
//     dualBand: true,
//     unifiedAdvantageField: true,
//     futureEvolutionReady: true,
//
//     deterministic: true,
//     driftProof: true,
//     pureCompute: true,
//     zeroNetwork: true,
//     zeroFilesystem: true,
//     zeroMutationOfInput: true,
//
//     // v20++
//     schemaVersioned: true,
//     envelopeAware: true,
//     integrityAware: true,
//     experienceBlocksAware: true,
//     iqVersionAware: true,
//     uiGenomeVersionAware: true,
//     comfortPatternAware: true,
//     compilerVersionAware: true,
//     organismVersionAware: true,
//     styleGenomeAware: true,
//     animationGenomeAware: true,
//     styleFootprintAware: true,
//     animationFootprintAware: true,
//     upcomingPlanAware: true,
//     evolutionAdvisoryAware: true,
//     memoryControlsEvolution: false,   // ADVISORY MODE
//
//     cnsAware: true,
//     impulseAware: true,
//     routerAware: true,
//     evolutionAware: true
//   }
//
// CONTRACT:
//   consumes:
//     • PageModel
//     • RouteId
//     • PulseProofBridge.coreMemory
//     • IQMap
//     • Styles Organ
//     • Animations Organ
//
//   produces:
//     • SavedSnapshot
//     • LoadedSnapshot
//     • BulkFlushResult
//     • ExperienceEnvelope
//     • EvolutionAdvisory
//     • CNS Impulses (advisory only)
//
// ============================================================================

export let MEMORY_MODE = "deep"; 
// "deep" → full envelope
// "slim" → optimized envelope
// auto-switch enabled via CNS load

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

function deterministicSignature(obj) {
  const json = JSON.stringify(obj || {});
  return "MEM_SIG_" + hashString(json).toString(16).padStart(8, "0");
}

function computeChecksum(model) {
  return hashString(JSON.stringify(model || {}));
}

function computeLineageHash(lineage) {
  return hashString(JSON.stringify(lineage || {}));
}

// ============================================================================
// BAND METRICS (symbolic + binary fusion)
// ============================================================================
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

// ============================================================================
// INTEGRITY
// ============================================================================
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
// ============================================================================
// STYLE + ANIMATION GENOME AWARENESS — v20++
// ============================================================================
//
// Memory becomes the evolution advisor: it inspects style/animation genomes,
// route footprints, and upcoming plans, and then issues deterministic,
// IMMORTAL advisories for Evolution Organ to act on.
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
// EXPERIENCE BLOCKS — v20++
// ============================================================================
//
// Memory produces experience blocks that describe:
//   • band metrics
//   • integrity
//   • lineage
//   • style/animation genome state
//   • IQMap footprint
//   • upcoming plan
//
// These blocks are IMMORTAL and deterministic.
// ============================================================================

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
// EVOLUTION ADVISORY ENGINE — v20++
// ============================================================================
//
// Memory inspects the saved envelope + current IQMap and issues a deterministic
// advisory describing what evolution is required.
//
// ADVISORY MODE:
//   • Memory NEVER overrides Evolution
//   • Memory NEVER forces rebuilds
//   • Memory NEVER forces flushes
//
// It only *advises* Evolution Organ.
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
// FACTORY — IMMORTAL, SYNC, MEMORY‑DRIVEN EVOLUTION (ADVISORY MODE)
// ============================================================================
export function createPulseEvolutionaryMemory({
  routeId = "page",
  IQMap = null,
  CNS = null,
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
    seq: 0
  };

  function nextSeq() {
    MemoryState.seq += 1;
    return MemoryState.seq;
  }

  function safeLog(stage, details = {}) {
    try {
      log(
        "[PulseEvolutionaryMemory-v20Plus]",
        stage,
        JSON.stringify({
          schemaVersion: MEMORY_SCHEMA_VERSION,
          seq: MemoryState.seq,
          routeId,
          ...details
        })
      );
    } catch {}
  }

  // ========================================================================
  // CNS IMPULSE EMITTER (ADVISORY ONLY)
  // ========================================================================
  function emitMemoryImpulse({ advisory, integrity, route }) {
    if (!CNS?.emitImpulse) return;

    try {
      CNS.emitImpulse("PulseEvolutionaryMemory", {
        schemaVersion: MEMORY_SCHEMA_VERSION,
        source: "PulseEvolutionaryMemory",
        route,
        advisory,
        integrityStatus: integrity?.status,
        degraded: integrity?.degraded,
        timestamp: "NO_TIMESTAMP_v20Plus"
      });

      safeLog("CNS_IMPULSE_OK", {
        route,
        integrityStatus: integrity?.status,
        degraded: integrity?.degraded,
        reasons: advisory?.reasons
      });
    } catch (err) {
      warn("[PulseEvolutionaryMemory] CNS_IMPULSE_ERROR", String(err));
      safeLog("CNS_IMPULSE_ERROR", { error: String(err) });
    }
  }

  // ========================================================================
  // SAVE PAGE MODEL — IMMORTAL envelope + experience blocks (SYNC)
  // ========================================================================
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

      // Style/Animation metrics + block
      const styleAnim = computeStyleAnimationMetrics({ model, IQMap });
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

      if (!Core?.setRouteSnapshot) {
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

  // ========================================================================
  // LOAD PAGE MODEL — integrity + experience + advisory surfaced (SYNC)
  // ========================================================================
  function loadPage() {
    nextSeq();

    try {
      if (!Core?.getRouteSnapshot) {
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
        IQMap
      });

      // Memory‑driven evolution advisory
      const advisory = buildEvolutionAdvisory({
        envelope,
        IQMap,
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

      // Emit CNS impulse (advisory only)
      emitMemoryImpulse({
        advisory,
        integrity: envelope.integrity,
        route: envelope.routeId
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

  // ========================================================================
  // BULK FLUSH — IMMORTAL bridge wrapper (SYNC)
  // ========================================================================
  function flush() {
    nextSeq();
    try {
      if (!Core?.bulkFlush) {
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

  // ========================================================================
  // EVOLUTION ADVISORY SURFACE — for Brain / PageEvo
  // ========================================================================
  function getEvolutionAdvisory() {
    return MemoryState.lastAdvisory || null;
  }

  // ========================================================================
  // PUBLIC API
  // ========================================================================
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

// ============================================================================
// GLOBAL REGISTRATION (OPTIONAL)
// ============================================================================
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
} catch {}
