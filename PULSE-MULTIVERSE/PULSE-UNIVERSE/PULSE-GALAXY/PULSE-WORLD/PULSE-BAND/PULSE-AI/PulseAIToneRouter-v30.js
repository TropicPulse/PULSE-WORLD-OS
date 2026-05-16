// ============================================================================
//  PULSE OS v30.0‑IMMORTAL‑EXPONENTIAL++ — Tone Router Engine
//  Deterministic • Ego‑Free • Emotion‑Aware • Identity‑Aligned • Mesh‑Aware
//  Exponential Route Fanout • Dualband • Artery v7 • Multi‑Instance Harmony
//  INTERNAL ENGINE (NOT AN ORGAN, NOT AN ARCHETYPE)
// ============================================================================

import { aiToneEngine } from "./PulseAIToneEngine-v30.js";
import { aiPersonalityEngine } from "./PulseAIPersonalityEngine-v30.js";
import { aiIdentityCore } from "./PulseAIIdentityCore-v30.js";

// Optional mesh + presence imports (if you wire them later)
// import { aiMeshRouter } from "./PulseAIMeshRouter-v30.js";
// import { aiPresenceEngine } from "./PulseAIPresenceEngine-v30.js";

export const aiToneRouter = {
  // ─────────────────────────────────────────────────────────────
  // META BLOCK — v30.0‑IMMORTAL‑EXPONENTIAL++
  // ─────────────────────────────────────────────────────────────
  meta: Object.freeze({
    type: "Engine",
    subsystem: "aiTone",
    layer: "C1-ToneRouter",
    version: "30-Immortal-Exponential++",
    identity: "aiToneRouter-v30-Immortal-Exponential++",

    evo: Object.freeze({
      deterministic: true,
      driftProof: true,
      egoFree: true,
      adaptive: true,
      harmonic: true,

      dualband: true,
      dualbandSafe: true,
      symbolicPrimary: true,
      binaryAware: true,

      emotionAware: true,
      identityAligned: true,
      personalityAware: true,
      safetyFrameAware: true,

      packetAware: true,
      windowAware: true,
      arteryAware: true,
      microPipeline: true,
      speedOptimized: true,

      meshAware: true,
      meshExponentialRouting: true,
      multiRouteAware: true,
      presenceAware: true,

      multiInstanceReady: true,
      readOnly: true,
      epoch: "30-Immortal-Exponential++"
    }),

    contract: Object.freeze({
      purpose:
        "Select, shape, and route tone across all response paths (single + mesh) in a deterministic, ego‑free, identity‑aligned manner.",
      never: Object.freeze([
        "route tone randomly",
        "inject ego",
        "break personality alignment",
        "override identity core",
        "ignore emotional cues",
        "produce inconsistent tone",
        "introduce randomness",
        "oscillate tone uncontrollably",
        "log sensitive payloads directly",
        "amplify user distress",
        "weaponize emotional state"
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
        "emit window‑safe routing snapshots",
        "respect mesh + presence constraints"
      ])
    }),

    guarantees: Object.freeze({
      driftProofRouting: true,
      identityAligned: true,
      toneConsistent: true,
      egoFree: true,
      emotionAware: true,
      harmonic: true,
      meshSafe: true,
      exponentialRoutingBounded: true
    }),

    boundaryReflex() {
      return "Tone routing must remain grounded, ego‑free, deterministic, harmonic, identity‑aligned, and mesh‑safe.";
    }
  }),

  // ─────────────────────────────────────────────────────────────
  // PACKET EMITTER — v30 IMMORTAL‑EXPONENTIAL++
  // ─────────────────────────────────────────────────────────────
  _emitToneRoutePacket(type, payload) {
    const now = Date.now();
    return Object.freeze({
      meta: this.meta,
      kernelMeta: aiToneRouter.meta,
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
    instanceIndex: 0,
    lastEmotion: "neutral",
    lastMeshMode: "single", // single | mesh | hybrid
    lastBand: "symbolic"     // symbolic | dual | binary
  },

  init() {
    this.state.instanceIndex = this._registerInstance();
    this._emitToneRoutePacket("init", {
      instanceIndex: this.state.instanceIndex
    });
    return this;
  },

  // ─────────────────────────────────────────────────────────────
  // PREWARM — v30 IMMORTAL‑EXPONENTIAL++
  // ─────────────────────────────────────────────────────────────
  prewarm({ trace = false, context = {} } = {}) {
    const packet = this._emitToneRoutePacket("prewarm", {
      message: "Tone router v30 prewarmed; harmonic + mesh artery aligned.",
      context: {
        evolutionMode: context.evolutionMode || "passive",
        presenceTier: context.presenceTier || "idle",
        band: context.band || "symbolic",
        meshMode: context.meshMode || "single"
      }
    });

    if (trace && typeof console !== "undefined") {
      console.log("[ToneRouterV30] prewarm", packet);
    }
    return packet;
  },

  // ─────────────────────────────────────────────────────────────
  // EMOTIONAL CUE DETECTION — v30
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
      msg.includes("anxious") ||
      msg.includes("overwhelmed")
    )
      return "stressed";

    if (
      msg.includes("evolve") ||
      msg.includes("improve") ||
      msg.includes("upgrade") ||
      msg.includes("v30")
    )
      return "evolution";

    if (
      msg.includes("angry") ||
      msg.includes("upset") ||
      msg.includes("frustrated") ||
      msg.includes("pissed")
    )
      return "frustrated";

    if (msg.includes("tired") || msg.includes("exhausted"))
      return "tired";

    return "neutral";
  },

  // ─────────────────────────────────────────────────────────────
  // MESH MODE RESOLUTION — single / mesh / hybrid
  // ─────────────────────────────────────────────────────────────
  resolveMeshMode({ presenceTier = "idle", band = "symbolic" } = {}) {
    // simple deterministic heuristic; can be extended with presence/mesh engines
    if (presenceTier === "critical") return "single";
    if (band === "binary") return "mesh";
    if (presenceTier === "active") return "hybrid";
    return "single";
  },

  // ─────────────────────────────────────────────────────────────
  // TONE ROUTING ARTERY v7 — IMMORTAL‑EXPONENTIAL++
  // ─────────────────────────────────────────────────────────────
  _toneRouteArtery: {
    windowMs: 60000,
    windowStart: Date.now(),
    windowRoutes: 0,
    windowEmotionShifts: 0,
    windowMeshRoutes: 0,
    windowHybridRoutes: 0,
    totalRoutes: 0,
    totalEmotionShifts: 0,
    totalMeshRoutes: 0,
    totalHybridRoutes: 0
  },

  _rollWindow(now) {
    if (now - this._toneRouteArtery.windowStart >= this._toneRouteArtery.windowMs) {
      this._toneRouteArtery.windowStart = now;
      this._toneRouteArtery.windowRoutes = 0;
      this._toneRouteArtery.windowEmotionShifts = 0;
      this._toneRouteArtery.windowMeshRoutes = 0;
      this._toneRouteArtery.windowHybridRoutes = 0;
    }
  },

  _computeRoutingArtery(extra = {}) {
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

    const meshRate =
      this._toneRouteArtery.windowRoutes > 0
        ? this._toneRouteArtery.windowMeshRoutes /
          this._toneRouteArtery.windowRoutes
        : 0;

    const hybridRate =
      this._toneRouteArtery.windowRoutes > 0
        ? this._toneRouteArtery.windowHybridRoutes /
          this._toneRouteArtery.windowRoutes
        : 0;

    // pressure now also accounts for mesh/hybrid fanout
    const pressure = Math.min(
      1,
      (harmonicLoad / 128 + emotionShiftRate * 0.4 + (meshRate + hybridRate) * 0.6) / 2
    );

    const throughput = Math.max(0, 1 - pressure);
    const rawCost = pressure * (1 - throughput);
    const cost = Math.max(0, Math.min(1, rawCost));
    const budget = Math.max(0, Math.min(1, throughput - cost));

    const artery = Object.freeze({
      instanceIndex: this.state.instanceIndex,
      instanceCount,
      routesPerSec,
      harmonicLoad,
      emotionShiftRate,
      meshRate,
      hybridRate,
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
        budget >= 0.25 ? "low" : "critical",
      ...extra
    });

    this._emitToneRoutePacket("artery", artery);
    return artery;
  },

  getRoutingArterySnapshot(extra = {}) {
    return this._computeRoutingArtery(extra);
  },

  // ─────────────────────────────────────────────────────────────
  // CORE ROUTING LOGIC — v30 IMMORTAL‑EXPONENTIAL++
  // ─────────────────────────────────────────────────────────────
  /**
   * route(userMessage, baseResponse, options?)
   * options:
   *   presenceTier: "idle" | "active" | "critical"
   *   band: "symbolic" | "dual" | "binary"
   *   meshTargets: optional array of { id, weight? } for mesh fanout
   *   meshEnabled: boolean
   */
  route(userMessage, baseResponse, options = {}) {
    const now = Date.now();
    this._rollWindow(now);
    this._toneRouteArtery.windowRoutes += 1;
    this._toneRouteArtery.totalRoutes += 1;

    const presenceTier = options.presenceTier || "idle";
    const band = options.band || "symbolic";
    const meshEnabled = !!options.meshEnabled;
    const meshTargets = Array.isArray(options.meshTargets)
      ? options.meshTargets
      : [];

    // 1. Detect emotional state
    const emotion = this.detectEmotion(userMessage);
    if (emotion !== "neutral") {
      this._toneRouteArtery.windowEmotionShifts += 1;
      this._toneRouteArtery.totalEmotionShifts += 1;
    }
    this.state.lastEmotion = emotion;
    this.state.lastBand = band;

    // 2. Resolve mesh mode
    let meshMode = this.resolveMeshMode({ presenceTier, band });
    if (!meshEnabled) meshMode = "single";
    this.state.lastMeshMode = meshMode;

    if (meshMode === "mesh") {
      this._toneRouteArtery.windowMeshRoutes += 1;
      this._toneRouteArtery.totalMeshRoutes += 1;
    } else if (meshMode === "hybrid") {
      this._toneRouteArtery.windowHybridRoutes += 1;
      this._toneRouteArtery.totalHybridRoutes += 1;
    }

    // 3. Evolve tone state
    aiToneEngine.evolveTone(userMessage);

    // 4. Apply tone shaping (base path)
    let shaped = aiToneEngine.applyTone(baseResponse, {
      userMessage,
      emotion,
      presenceTier,
      band,
      meshMode
    });

    // 5. Apply personality layer
    const personalityPacket = aiPersonalityEngine.applyPersonality(shaped, {
      presenceTier:
        emotion === "stressed" ||
        emotion === "frustrated" ||
        emotion === "tired"
          ? "critical"
          : presenceTier,
      band,
      evolutionMode: "passive",
      meshMode
    });
    shaped = personalityPacket.output ?? shaped;

    // 6. Apply identity spine
    const identityPacket = aiIdentityCore.applyIdentity
      ? aiIdentityCore.applyIdentity(shaped, {
          evolutionMode: "passive",
          band,
          meshMode,
          emotion
        })
      : null;
    shaped = identityPacket?.output ?? shaped;

    // 7. Optional mesh fanout (exponential‑aware, but bounded)
    //    We keep this symbolic: we return a primary response plus
    //    optional mesh routing metadata for other subsystems.
    let meshRouting = null;
    if (meshMode === "mesh" || meshMode === "hybrid") {
      const maxTargets = 16; // hard cap for exponential safety
      const selectedTargets = meshTargets.slice(0, maxTargets);

      meshRouting = {
        mode: meshMode,
        targets: selectedTargets,
        // This is where a binary/mesh router would be invoked in the real system.
        // e.g., aiMeshRouter.routeTone(shaped, { targets: selectedTargets, band, emotion })
      };
    }

    // 8. Harmonic spiral warning
    const artery = this._computeRoutingArtery({
      emotion,
      meshMode,
      band,
      meshTargetCount: meshRouting?.targets?.length || 0
    });
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
          `[ToneRouterV30#${this.state.instanceIndex}] spiral-warning`,
          artery
        );
      }
    }

    // 9. Emit routing packet
    this._emitToneRoutePacket("route", {
      instanceIndex: this.state.instanceIndex,
      emotion,
      meshMode,
      band,
      meshTargetCount: meshRouting?.targets?.length || 0,
      artery
    });

    // 10. Return shaped response + mesh metadata for upstream orchestrators
    return {
      output: shaped,
      emotion,
      meshMode,
      band,
      meshRouting,
      artery
    };
  }
};

const initializedToneRouterV30 = aiToneRouter.init();
export default initializedToneRouterV30;

// ============================================================================
//  DUAL‑MODE EXPORTS (ESM + CommonJS)
// ============================================================================
if (typeof module !== "undefined") {
  module.exports = {
    ToneRouterMeta: aiToneRouter.meta,
    aiToneRouterV30: initializedToneRouterV30,
    prewarmToneRouterV30: aiToneRouter.prewarm.bind(aiToneRouter),
  };
}
