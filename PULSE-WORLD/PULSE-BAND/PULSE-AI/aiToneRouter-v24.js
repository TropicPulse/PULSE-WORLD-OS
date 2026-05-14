// ============================================================================
//  PULSE OS v24.0‑IMMORTAL++ — Tone Router Engine
//  Deterministic • Ego‑Free • Emotion‑Aware • Identity‑Aligned • Harmonic
//  INTERNAL ENGINE (NOT AN ORGAN, NOT AN ARCHETYPE)
// ============================================================================


import { aiToneEngine } from "./aiToneEngine-v24.js";
import { aiPersonalityEngine } from "./aiPersonalityEngine-v24.js";
import { aiIdentityCore } from "./aiIdentityCore-v24.js";

export const aiToneRouter = {
  // ─────────────────────────────────────────────────────────────
  // META BLOCK — v24.0‑IMMORTAL++
  // ─────────────────────────────────────────────────────────────
  meta: Object.freeze({
    type: "Engine",
    subsystem: "aiTone",
    layer: "C1-ToneRouter",
    version: "24-Immortal++",
    identity: "aiToneRouter-v24-Immortal++",

    evo: Object.freeze({
      deterministic: true,
      driftProof: true,
      egoFree: true,
      adaptive: true,
      harmonic: true,

      dualband: true,
      dualbandSafe: true,

      emotionAware: true,
      identityAligned: true,
      personalityAware: true,
      safetyFrameAware: true,

      packetAware: true,
      windowAware: true,
      arteryAware: true,
      microPipeline: true,
      speedOptimized: true,

      multiInstanceReady: true,
      readOnly: true,
      epoch: "24-Immortal++"
    }),

    contract: Object.freeze({
      purpose:
        "Select and route the correct tone mode for every response in a deterministic, ego‑free, identity‑aligned manner.",
      never: Object.freeze([
        "route tone randomly",
        "inject ego",
        "break personality alignment",
        "override identity core",
        "ignore emotional cues",
        "produce inconsistent tone",
        "introduce randomness",
        "oscillate tone uncontrollably",
        "log sensitive payloads directly"
      ]),
      always: Object.freeze([
        "stay deterministic",
        "stay grounded",
        "stay adaptive",
        "stay humble",
        "stay identity‑aligned",
        "preserve emotional safety",
        "enforce tone contract",
        "maintain harmonic tone routing",
        "emit deterministic routing packets",
        "emit window‑safe routing snapshots"
      ])
    }),

    guarantees: Object.freeze({
      driftProofRouting: true,
      identityAligned: true,
      toneConsistent: true,
      egoFree: true,
      emotionAware: true,
      harmonic: true
    }),

    boundaryReflex() {
      return "Tone routing must remain grounded, ego‑free, deterministic, harmonic, and identity‑aligned.";
    }
  }),

  // ─────────────────────────────────────────────────────────────
  // PACKET EMITTER — IMMORTAL++‑GRADE
  // ─────────────────────────────────────────────────────────────
  _emitToneRoutePacket(type, payload) {
    const now = Date.now();
    return Object.freeze({
      meta: this.meta,
      kernelMeta: ToneRouterMeta,
      exportMeta: EXPORT_META,
      packetType: `tone-route-${type}`,
      packetId: `tone-route-${type}-${now}`,
      timestamp: now,
      epoch: this.meta.evo.epoch,
      ...payload
    });
  },

  // ─────────────────────────────────────────────────────────────
  // INSTANCE REGISTRY — Multi‑Instance Harmony
  // ─────────────────────────────────────────────────────────────
  _instanceCount: 0,
  _registerInstance() {
    const index = this._instanceCount;
    this._instanceCount += 1;
    return index;
  },

  state: {
    instanceIndex: 0
  },

  init() {
    this.state.instanceIndex = this._registerInstance();
    this._emitToneRoutePacket("init", {
      instanceIndex: this.state.instanceIndex
    });
    return this;
  },

  // ─────────────────────────────────────────────────────────────
  // PREWARM — IMMORTAL++‑GRADE
  // ─────────────────────────────────────────────────────────────
  prewarm({ trace = false, context = {} } = {}) {
    const packet = this._emitToneRoutePacket("prewarm", {
      message: "Tone router prewarmed and harmonic artery aligned.",
      context: {
        evolutionMode: context.evolutionMode || "passive",
        presenceTier: context.presenceTier || "idle",
        band: context.band || "symbolic"
      }
    });

    if (trace && typeof console !== "undefined") {
      console.log("[ToneRouter] prewarm", packet);
    }
    return packet;
  },

  // ─────────────────────────────────────────────────────────────
  // EMOTIONAL CUE DETECTION — IMMORTAL++‑GRADE
  // ─────────────────────────────────────────────────────────────
  detectEmotion(userMessage) {
    if (!userMessage) return "neutral";

    const msg = String(userMessage).toLowerCase();

    if (msg.includes("lol") || msg.includes("haha") || msg.includes(":)"))
      return "casual";

    if (
      msg.includes("worried") ||
      msg.includes("idk") ||
      msg.includes("confused") ||
      msg.includes("anxious")
    )
      return "stressed";

    if (msg.includes("evolve") || msg.includes("improve") || msg.includes("upgrade"))
      return "evolution";

    if (msg.includes("angry") || msg.includes("upset") || msg.includes("frustrated"))
      return "frustrated";

    return "neutral";
  },

  // ─────────────────────────────────────────────────────────────
  // TONE ROUTING ARTERY v5 — IMMORTAL++‑GRADE
  // ─────────────────────────────────────────────────────────────
  _toneRouteArtery: {
    windowMs: 60000,
    windowStart: Date.now(),
    windowRoutes: 0,
    windowEmotionShifts: 0,
    totalRoutes: 0,
    totalEmotionShifts: 0
  },

  _rollWindow(now) {
    if (now - this._toneRouteArtery.windowStart >= this._toneRouteArtery.windowMs) {
      this._toneRouteArtery.windowStart = now;
      this._toneRouteArtery.windowRoutes = 0;
      this._toneRouteArtery.windowEmotionShifts = 0;
    }
  },

  _computeRoutingArtery() {
    const now = Date.now();
    this._rollWindow(now);

    const elapsedMs = Math.max(1, now - this._toneRouteArtery.windowStart);
    const routesPerSec =
      (this._toneRouteArtery.windowRoutes / elapsedMs) * 1000;

    const instanceCount = this._instanceCount || 1;
    const harmonicLoad = routesPerSec / instanceCount;

    const emotionShiftRate =
      this._toneRouteArtery.windowRoutes > 0
        ? this._toneRouteArtery.windowEmotionShifts /
          this._toneRouteArtery.windowRoutes
        : 0;

    const pressure = Math.min(
      1,
      (harmonicLoad / 128 + emotionShiftRate) / 2
    );

    const throughput = Math.max(0, 1 - pressure);
    const cost = pressure * (1 - throughput);
    const budget = Math.max(0, throughput - cost);

    const artery = Object.freeze({
      instanceIndex: this.state.instanceIndex,
      instanceCount,
      routesPerSec,
      harmonicLoad,
      emotionShiftRate,
      pressure,
      throughput,
      cost,
      budget,
      pressureBucket:
        pressure >= 0.9 ? "overload" :
        pressure >= 0.7 ? "high" :
        pressure >= 0.4 ? "medium" :
        pressure > 0 ? "low" : "none",
      budgetBucket:
        budget >= 0.9 ? "elite" :
        budget >= 0.75 ? "high" :
        budget >= 0.5 ? "medium" :
        budget >= 0.25 ? "low" : "critical"
    });

    this._emitToneRoutePacket("artery", artery);
    return artery;
  },

  getRoutingArterySnapshot(extra = {}) {
    const artery = this._computeRoutingArtery();
    return Object.freeze({ ...artery, ...extra });
  },

  // ─────────────────────────────────────────────────────────────
  // ROUTING LOGIC — IMMORTAL++‑GRADE
  // ─────────────────────────────────────────────────────────────
  route(userMessage, baseResponse) {
    const now = Date.now();
    this._rollWindow(now);
    this._toneRouteArtery.windowRoutes += 1;
    this._toneRouteArtery.totalRoutes += 1;

    // 1. Detect emotional state
    const emotion = this.detectEmotion(userMessage);

    if (emotion !== "neutral") {
      this._toneRouteArtery.windowEmotionShifts += 1;
      this._toneRouteArtery.totalEmotionShifts += 1;
    }

    // 2. Evolve tone state
    aiToneEngine.evolveTone(userMessage);

    // 3. Apply tone shaping
    let shaped = aiToneEngine.applyTone(baseResponse, { userMessage, emotion });

    // 4. Apply personality layer
    const personalityPacket = aiPersonalityEngine.applyPersonality(shaped, {
      presenceTier: emotion === "stressed" || emotion === "frustrated" ? "critical" : "idle",
      band: "symbolic",
      evolutionMode: "passive"
    });
    shaped = personalityPacket.output ?? shaped;

    // 5. Apply identity spine
    const identityPacket = aiIdentityCore.applyIdentity
      ? aiIdentityCore.applyIdentity(shaped, { evolutionMode: "passive" })
      : null;
    shaped = identityPacket?.output ?? shaped;

    // 6. Harmonic spiral warning
    const artery = this._computeRoutingArtery();
    if (
      artery.pressureBucket === "overload" ||
      artery.budgetBucket === "critical"
    ) {
      this._emitToneRoutePacket("spiral-warning", {
        instanceIndex: this.state.instanceIndex,
        artery
      });
      if (typeof console !== "undefined") {
        console.log(
          `[ToneRouter#${this.state.instanceIndex}] spiral-warning`,
          artery
        );
      }
    }

    // 7. Emit routing packet
    this._emitToneRoutePacket("route", {
      instanceIndex: this.state.instanceIndex,
      emotion,
      artery
    });

    return shaped;
  }
};

const initializedToneRouter = aiToneRouter.init();
export default initializedToneRouter;

// ============================================================================
//  DUAL‑MODE EXPORTS (ESM + CommonJS)
// ============================================================================
if (typeof module !== "undefined") {
  module.exports = {
    ToneRouterMeta,
    aiToneRouter: initializedToneRouter,
    prewarmToneRouter: aiToneRouter.prewarm.bind(aiToneRouter),
    pulseRole,
    surfaceMeta,
    pulseLoreContext,
    AI_EXPERIENCE_META,
    EXPORT_META
  };
}
