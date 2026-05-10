// ============================================================================
//  PULSE OS v24-IMMORTAL-ADVANTAGE++ — EXPERIENCE FRAME ORGAN
//  Conversational Repair • Misalignment Handling • UX + Organism Harmonization
//  PURE FUNCTIONAL ON INPUT/OUTPUT. NO BINARY MUTATION. ZERO-IO. DETERMINISTIC.
// ============================================================================

import { OrganismIdentity } from "../PULSE-X/PulseWorldOrganismMap-v21.js";

const Identity = OrganismIdentity(import.meta.url);

// or: const Identity = OrganismIdentity["pulse-ai/ai-v24.0-IMMORTAL"] if that's the key you chose

// ============================================================================
//  META BLOCK — v24.0 IMMORTAL (ORGANISM KERNEL)
//  (backed by the Organism Map instead of hardcoded here)
// ============================================================================
export const ExperienceFrameMeta = Identity.OrganMeta;

// ============================================================================
//  SURFACE / ORGANISM LAYER EXPORTS — v24.0 IMMORTAL
//  (for Understanding / CNS / Portal alignment)
// ============================================================================

// Required 3 for every “surface” in the organism graph
export const pulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;

// Optional: richer experience meta for AI / tooling
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;

// Optional: export meta for tooling / dev panels
export const EXPORT_META = Identity.EXPORT_META;

// ============================================================================
//  INTERNAL HELPERS — BUCKETS (v24 Advantage++ tuned)
// ============================================================================

function bucketLevel(v) {
  if (v >= 0.9) return "elite";
  if (v >= 0.75) return "high";
  if (v >= 0.5) return "medium";
  if (v >= 0.25) return "low";
  return "critical";
}

function bucketPressure(v) {
  if (v >= 0.9) return "overload";
  if (v >= 0.7) return "high";
  if (v >= 0.4) return "medium";
  if (v > 0) return "low";
  return "none";
}

// ============================================================================
//  PRESSURE EXTRACTION (BINARY + BOUNDARY) — v24 Advantage++
// ============================================================================

function extractBinaryPressure(binaryVitals = {}) {
  if (
    binaryVitals?.layered?.organism &&
    typeof binaryVitals.layered.organism.pressure === "number"
  ) {
    return binaryVitals.layered.organism.pressure;
  }
  if (binaryVitals?.binary && typeof binaryVitals.binary.pressure === "number") {
    return binaryVitals.binary.pressure;
  }
  if (
    binaryVitals?.metabolic &&
    typeof binaryVitals.metabolic.pressure === "number"
  ) {
    return binaryVitals.metabolic.pressure;
  }
  return 0;
}

function extractBoundaryPressure(boundaryArtery = {}) {
  if (typeof boundaryArtery?.vitals?.pressure === "number") {
    return boundaryArtery.vitals.pressure;
  }
  if (typeof boundaryArtery?.pressure === "number") {
    return boundaryArtery.pressure;
  }
  return 0;
}

// ============================================================================
//  TRI-HEART SNAPSHOT (MOM / DAD / BABY) — v24 Advantage++
// ============================================================================

function readGlobalTriHeart() {
  const mom = globalThis?.PulseProxyHeartTriHeart || null;
  const dad = globalThis?.PulseAiHeartTriHeart || null;
  const baby = globalThis?.PulseEarnTriHeart || null;

  return {
    mom,
    dad,
    baby
  };
}

function buildTriHeartSnapshot(metaTriHeart = {}) {
  const globalTri = readGlobalTriHeart();

  const liveness =
    metaTriHeart.liveness ||
    globalTri.dad?.triHeartLiveness ||
    globalTri.mom?.triHeartLiveness ||
    globalTri.baby?.triHeartLiveness ||
    null;

  const speed =
    metaTriHeart.speed ||
    globalTri.dad?.triHeartSpeed ||
    globalTri.mom?.triHeartSpeed ||
    globalTri.baby?.triHeartSpeed ||
    null;

  const advantage =
    metaTriHeart.advantage ||
    globalTri.dad?.triHeartAdvantage ||
    globalTri.mom?.triHeartAdvantage ||
    globalTri.baby?.triHeartAdvantage ||
    null;

  const presence =
    metaTriHeart.presence ||
    globalTri.dad?.triHeartPresence ||
    globalTri.mom?.triHeartPresence ||
    globalTri.baby?.triHeartPresence ||
    null;

  const healthScore = (() => {
    const adv = advantage?.combinedAdvantage ?? 0.5;
    const spd = speed?.combinedSpeed ?? 0.5;
    const liveCount =
      (liveness?.momAlive ? 1 : 0) +
      (liveness?.dadAlive ? 1 : 0) +
      (liveness?.babyAlive ? 1 : 0);
    const liveRatio = liveCount / 3;
    return Math.max(0, Math.min(1, 0.4 * adv + 0.3 * spd + 0.3 * liveRatio));
  })();

  const healthBucket = bucketLevel(healthScore);

  return {
    liveness,
    speed,
    advantage,
    presence,
    healthScore,
    healthBucket
  };
}

// ============================================================================
//  EXPERIENCE CORE — v24 IMMORTAL ADVANTAGE++
// ============================================================================

export class AiExperienceFrame {
  constructor({ personalFrame = null } = {}) {
    this.personalFrame = personalFrame || null;

    // UX stats for artery
    this._totalInteractions = 0;
    this._frustrationCount = 0;
    this._ambiguityCount = 0;
    this._refusalCount = 0;

    // simple deterministic cache
    this._decisionCache = Object.create(null);
  }

  // ---------------------------------------------------------------------------
  // PREWARM (NO-OP BUT EXPLICIT FOR CONSISTENCY)
// ---------------------------------------------------------------------------

  prewarm() {
    this._totalInteractions = this._totalInteractions || 0;
  }

  /**
   * Entry point.
   * @param {Object} payload
   * @param {Object} payload.context   Full context (user, persona, safetyMode, etc.)
   * @param {String} payload.text      Final text from Overmind (already safe)
   * @param {Object} payload.meta      Overmind meta: { safetyStatus, worldLens, notes, lenses, binaryVitals, boundaryArtery, personaId, toneMode, triHeartContext, ... }
   */
  async shapeExperience({ context = {}, text = "", meta = {} }) {
    const base = String(text || "");
    const safetyStatus = meta?.safetyStatus || "ok";
    const worldLens = meta?.worldLens || "consensus";

    const triHeart = buildTriHeartSnapshot(meta?.triHeartContext || {});
    const state = this.buildExperienceState({ context, base, meta, triHeart });

    const cacheKey = this._buildCacheKey(base, state, meta, triHeart);
    const cached = this._decisionCache[cacheKey];
    if (cached) {
      return cached;
    }

    let repaired = this.applyRepairLogic({ base, state, triHeart });

    if (this.personalFrame?.shapeOutput) {
      try {
        const shaped = await this.personalFrame.shapeOutput({
          context,
          text: repaired,
          triHeart
        });
        if (shaped?.text) {
          repaired = shaped.text;
        }
      } catch {
        // best-effort only
      }
    }

    this._updateStats(state);

    const uxArtery = this._computeUxArtery({ state, meta, triHeart });

    const result = Object.freeze({
      text: repaired,
      experience: Object.freeze({
        safetyStatus,
        worldLens,
        state,
        triHeart,
        uxArtery
      })
    });

    this._decisionCache[cacheKey] = result;
    return result;
  }

  // ---------------------------------------------------------------------------
  // EXPERIENCE STATE CONSTRUCTION — v24 Advantage++
// ---------------------------------------------------------------------------

  buildExperienceState({ context, base, meta, triHeart }) {
    const safetyStatus = meta?.safetyStatus || "ok";
    const worldLens = meta?.worldLens || "consensus";
    const notes = meta?.notes || [];
    const lenses = meta?.lenses || [];

    const userFrustrationSignal =
      this.detectFrustrationFromContext(context) ||
      this.detectFrustrationFromNotes(notes);

    const ambiguitySignal =
      worldLens === "ambiguous" ||
      lenses.some(
        (l) =>
          l.status === "warn" && /vague|indirect|unclear/i.test(l.notes || "")
      );

    const refusalSignal =
      safetyStatus === "blocked" ||
      /can’t provide|cannot provide|not able to do that|i can.t do that/i.test(
        base.toLowerCase()
      );

    const personaId = meta?.personaId || context?.personaId || "neutral";
    const toneMode = meta?.toneMode || "default";

    const triHeartHealth = triHeart?.healthScore ?? 0.5;
    const triHeartBucket = triHeart?.healthBucket || bucketLevel(triHeartHealth);

    return {
      safetyStatus,
      worldLens,
      hasFrustration: userFrustrationSignal,
      hasAmbiguity: ambiguitySignal,
      hasRefusal: refusalSignal,
      personaId,
      toneMode,
      triHeartHealth,
      triHeartBucket
    };
  }

  detectFrustrationFromContext(context) {
    const lastUserText = context?.lastUserText || "";
    if (!lastUserText) return false;

    const lowered = lastUserText.toLowerCase();
    const patterns = [
      "you didn't answer",
      "that’s not what i asked",
      "that's not what i asked",
      "you’re not listening",
      "you're not listening",
      "this is wrong",
      "you ignored",
      "why can't you just",
      "stay on point",
      "answer the question",
      "stop dodging"
    ];

    return patterns.some((p) => lowered.includes(p));
  }

  detectFrustrationFromNotes(notes) {
    if (!Array.isArray(notes)) return false;
    const joined = notes.join(" ").toLowerCase();
    const patterns = ["off-topic", "indirect", "vague", "warn", "frustration"];
    return patterns.some((p) => joined.includes(p));
  }

  // ---------------------------------------------------------------------------
  // REPAIR LOGIC (TRI-HEART AWARE, v24 Advantage++)
  // ---------------------------------------------------------------------------

  applyRepairLogic({ base, state, triHeart }) {
    let text = base;

    if (state.hasRefusal) {
      text = this.ensureRefusalClarity(text);
    }

    if (state.hasAmbiguity) {
      text = this.appendClarifier(
        text,
        "If anything here feels unclear or indirect, say so and I’ll tighten it."
      );
    }

    if (state.hasFrustration) {
      const triHint =
        triHeart?.healthBucket === "critical"
          ? "I’m also running under higher internal load, so I’m keeping things extra direct."
          : triHeart?.healthBucket === "low"
          ? "I’m balancing some internal load, but I can still ground this clearly."
          : null;

      const baseAck =
        "It seems my earlier response may not have matched what you needed. Let me ground this more directly.";

      const ack = triHint ? `${baseAck} ${triHint}` : baseAck;

      text = this.prependAcknowledgement(text, ack);
    }

    return text;
  }

  ensureRefusalClarity(text) {
    const lowered = text.toLowerCase();
    const alreadyExplained =
      lowered.includes("because") ||
      lowered.includes("due to") ||
      lowered.includes("for safety reasons");

    if (alreadyExplained) return text;

    return (
      text +
      "\n\nTo be clear: I’m constrained by safety and capability boundaries, " +
      "so I can’t provide that in the way you requested."
    );
  }

  appendClarifier(text, clarifier) {
    if (!clarifier) return text;
    if (text.includes(clarifier)) return text;
    return text + "\n\n" + clarifier;
  }

  prependAcknowledgement(text, ack) {
    if (!ack) return text;
    return ack + "\n\n" + text;
  }

  // ---------------------------------------------------------------------------
  // UX STATS + ARTERY (TRI-HEART + ADVANTAGE AWARE)
// ---------------------------------------------------------------------------

  _updateStats(state) {
    this._totalInteractions += 1;
    if (state.hasFrustration) this._frustrationCount += 1;
    if (state.hasAmbiguity) this._ambiguityCount += 1;
    if (state.hasRefusal) this._refusalCount += 1;
  }

  _computeUxArtery({ state, meta, triHeart }) {
    const total = this._totalInteractions || 1;

    const frustrationRate = this._frustrationCount / total;
    const ambiguityRate = this._ambiguityCount / total;
    const refusalRate = this._refusalCount / total;

    const uxLoad = Math.max(
      0,
      Math.min(
        1,
        0.4 * frustrationRate + 0.3 * ambiguityRate + 0.3 * refusalRate
      )
    );

    const binaryPressure = extractBinaryPressure(meta?.binaryVitals || {});
    const boundaryPressure = extractBoundaryPressure(meta?.boundaryArtery || {});

    const triHeartHealth = triHeart?.healthScore ?? 0.5;
    const triHeartPenalty = Math.max(0, 1 - triHeartHealth); // worse health → more pressure

    const uxPressureLocal = uxLoad;
    const fusedPressure = Math.max(
      0,
      Math.min(
        1,
        0.4 * uxPressureLocal +
          0.25 * binaryPressure +
          0.2 * boundaryPressure +
          0.15 * triHeartPenalty
      )
    );

    const throughput = Math.max(0, Math.min(1, 1 - fusedPressure));
    const cost = Math.max(0, Math.min(1, fusedPressure * (1 - throughput)));
    const budget = Math.max(0, Math.min(1, throughput - cost));

    const organism = {
      pressure: fusedPressure,
      cost,
      budget,
      pressureBucket: bucketPressure(fusedPressure),
      budgetBucket: bucketLevel(budget)
    };

    const harmonyScore = 1 - uxLoad;
    const harmonyBucket = bucketLevel(harmonyScore);

    const ux = {
      uxLoad,
      frustrationRate,
      ambiguityRate,
      refusalRate,
      harmonyBucket
    };

    const boundaries = {
      pressure: boundaryPressure,
      pressureBucket: bucketPressure(boundaryPressure)
    };

    const binary = {
      pressure: binaryPressure,
      pressureBucket: bucketPressure(binaryPressure)
    };

    const persona = {
      id: state.personaId,
      toneMode: state.toneMode
    };

    const triHeartArtery = {
      healthScore: triHeart?.healthScore ?? 0.5,
      healthBucket:
        triHeart?.healthBucket || bucketLevel(triHeart?.healthScore ?? 0.5),
      liveness: triHeart?.liveness || null,
      speed: triHeart?.speed || null,
      advantage: triHeart?.advantage || null,
      presence: triHeart?.presence || null
    };

    return {
      organism,
      ux,
      boundaries,
      binary,
      persona,
      triHeart: triHeartArtery
    };
  }

  // ---------------------------------------------------------------------------
  // CACHE KEY — v24 Advantage++
// ---------------------------------------------------------------------------

  _buildCacheKey(base, state, meta, triHeart) {
    const safetyStatus = state.safetyStatus;
    const worldLens = state.worldLens;
    const flags =
      (state.hasFrustration ? "F" : "f") +
      (state.hasAmbiguity ? "A" : "a") +
      (state.hasRefusal ? "R" : "r");

    const personaId = state.personaId || "neutral";
    const toneMode = state.toneMode || "default";

    const boundaryModeId = meta?.boundaryArtery?.mode?.id || "";
    const pressureBucket = bucketPressure(
      extractBinaryPressure(meta?.binaryVitals || {})
    );

    const triHeartBucket = triHeart?.healthBucket || "medium";

    return [
      base,
      safetyStatus,
      worldLens,
      flags,
      personaId,
      toneMode,
      boundaryModeId,
      pressureBucket,
      triHeartBucket
    ].join("|");
  }

  // ---------------------------------------------------------------------------
  // OPTIONAL: STATS SNAPSHOT (v24 Advantage++)
  // ---------------------------------------------------------------------------

  getStatsSnapshot() {
    const total = this._totalInteractions || 1;
    return Object.freeze({
      totalInteractions: this._totalInteractions,
      frustrationRate: this._frustrationCount / total,
      ambiguityRate: this._ambiguityCount / total,
      refusalRate: this._refusalCount / total
    });
  }
}

// ============================================================================
//  PUBLIC API — Create Experience Frame Organ (v24 IMMORTAL ADVANTAGE++)
// ============================================================================

export function createExperienceFrameOrgan(config = {}) {
  const core = new AiExperienceFrame({
    personalFrame: config.personalFrame || null
  });

  if (typeof core.prewarm === "function") {
    core.prewarm();
  }

  return Object.freeze({
    meta: ExperienceFrameMeta,

    async shapeExperience(payload) {
      return core.shapeExperience(payload);
    },

    // optional UX-artery accessor for external organs
    getUxArterySnapshot(meta = {}, context = {}, text = "") {
      const triHeart = buildTriHeartSnapshot(meta?.triHeartContext || {});
      const state = core.buildExperienceState({
        context,
        base: String(text || ""),
        meta,
        triHeart
      });
      return core._computeUxArtery({ state, meta, triHeart });
    },

    // optional stats snapshot for diagnostics
    getStatsSnapshot() {
      return core.getStatsSnapshot();
    }
  });
}

// ---------------------------------------------------------------------------
//  DUAL EXPORT LAYER — CommonJS compatibility (v24-IMMORTAL dualband)
// ---------------------------------------------------------------------------
/* c8 ignore next 10 */
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    ExperienceFrameMeta,
    AiExperienceFrame,
    createExperienceFrameOrgan
  };
}
