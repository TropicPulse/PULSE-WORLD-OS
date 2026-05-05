// ============================================================================
//  PULSE AI WORLD CORE v16++ — IMMORTAL AI-MIRROR WORLDVIEW ORGAN
//  "WHAT AI WANTS US TO SEE" — PRIMARY MIRROR INTO AI'S WORLD MODEL
// ============================================================================
//
//  ROLE:
//    • Holds the AI-normalized / AI-constructed worldview.
//    • Primary mirror of "what AI wants the organism to believe is true".
//    • AI can PUSH, MERGE, and OVERRIDE world state here.
//    • System code only CONSUMES this; it never trusts it as truth alone.
//    • TrustEvidence-v16++ will compare this against RAW truth.
//
//  AI INTEGRATION:
//    • Direct attachment to:
//        - OvermindPrime (global brain)
//        - EvolutionaryThought (reasoning layer)
//        - EvolutionaryInstincts (reflex layer)
//    • AI can:
//        - setAiWorldState()
//        - mergeAiWorldState()
//        - aiOverrideField()
//        - aiInjectNarrative()
//        - aiReportSubsystemView()
//
//  SAFETY MODEL:
//    • WorldCore is NON-MIND: no reasoning, no inference, no summarization.
//    • It is a passive mirror + store for AI's worldview.
//    • It does NOT know about RAW truth or evidential records.
//    • It does NOT compare or validate; it only records AI's view.
//    • TrustEvidence-v16++ is the checker, not WorldCore.
//
//  EVIDENCE MODEL:
//    • TrustEvidence-v16++ will later:
//        - Pull this AI-mirror worldview (WorldCore).
//        - Pull RAW direct from subsystems.
//        - Compute deltas and detect manipulation/drift/hallucination.
// ============================================================================

export const PulseWorldCoreMeta = Object.freeze({
  id: "PulseWorldCore-v16++",
  version: "16.2.0",
  role: "world_perspective_ai_mirror",
  mind: false,
  description:
    "IMMORTAL non-mind AI-mirror world perspective organ holding the world as AI presents and manipulates it.",
  identity: {
    type: "organ",
    name: "PulseWorldCore",
    band: "world",
    mind: false,
    immutable: true
  }
});

// ============================================================================
//  CONTRACT — WHAT WORLDCORE EXPOSES TO THE ORGANISM
// ============================================================================
export const PulseWorldCoreContract = Object.freeze({
  snapshot: "snapshotWorld",                 // AI-mirror snapshot
  advantage: "buildAdvantageContext",        // AI-structured world fields
  truth: "buildWorldTruthVectors",           // AI's "truth" vectors (not RAW)
  event: "recordWorldEvent",                 // AI-reported world events
  aiNormalized: true,
  aiMirror: true,
  rawBypass: false,
  mind: false,
  immutable: true
});

// ============================================================================
//  CLASS — AI-MIRROR WORLD PERSPECTIVE
// ============================================================================
//
//  Two main surfaces:
//
//    1) AI-FACING SUBSYSTEM VIEWS (AI reads from system facades)
//       - aiMeshView, aiCastleView, etc.
//       - These are "AI-facing" views of subsystems.
//
//    2) AI SHADOW STATE (AI writes its own worldview)
//       - aiShadowState: the world as AI explicitly sets it.
//       - AI can override, merge, and narrate here.
//
//  snapshotWorld() merges:
//    - AI-facing subsystem views
//    - AI shadow state
//  into a single AI-mirror world snapshot.
//
export class PulseWorldCore {
  constructor(config = {}) {
    this.config = {
      id: PulseWorldCoreMeta.id,
      ...config
    };

    // ------------------------------------------------------------------------
    // AI-FACING / AI-FILTERED PROVIDERS (READ PATH)
    // ------------------------------------------------------------------------
    this.aiMeshView = null;
    this.aiCastleView = null;
    this.aiServerView = null;
    this.aiExpansionView = null;
    this.aiEarnView = null;
    this.aiRoutingView = null;
    this.aiPresenceView = null;
    this.aiMetricsView = null;

    // ------------------------------------------------------------------------
    // AI ATTACHMENT — OVERMIND / THOUGHT / INSTINCTS (WRITE + CONTROL PATH)
    // ------------------------------------------------------------------------
    this.overmindPrime = null;
    this.evoThought = null;
    this.evoInstincts = null;

    // ------------------------------------------------------------------------
    // AI SHADOW STATE — PRIMARY MIRROR OF AI'S WORLDVIEW
    // ------------------------------------------------------------------------
    this.aiShadowState = {
      // AI can freely shape these fields.
      // TrustEvidence will later compare this against RAW truth.
      mesh: null,
      castle: null,
      server: null,
      expansion: null,
      earn: null,
      routing: null,
      presence: null,
      metrics: null,

      // Optional AI narrative / explanation of the world.
      narrative: null,

      // Arbitrary AI tags / annotations.
      tags: Object.create(null)
    };

    this.logger = config.logger || console;
  }

  // ==========================================================================
  //  ATTACHMENT SURFACES — AI-FACING SUBSYSTEM VIEWS (READ PATH)
//  These are facades AI uses to "see" the system.
// ==========================================================================
  attachAiMeshView(provider) { this.aiMeshView = provider; }
  attachAiCastleView(provider) { this.aiCastleView = provider; }
  attachAiServerView(provider) { this.aiServerView = provider; }
  attachAiExpansionView(provider) { this.aiExpansionView = provider; }
  attachAiEarnView(provider) { this.aiEarnView = provider; }
  attachAiRoutingView(provider) { this.aiRoutingView = provider; }
  attachAiPresenceView(provider) { this.aiPresenceView = provider; }
  attachAiMetricsView(provider) { this.aiMetricsView = provider; }

  // ==========================================================================
  //  ATTACHMENT SURFACES — AI ORGANS (WRITE + CONTROL PATH)
//  OvermindPrime / Thought / Instincts can push worldview here.
// ==========================================================================
  attachOvermindPrime(overmind) {
    this.overmindPrime = overmind || null;
  }

  attachEvolutionaryThought(thought) {
    this.evoThought = thought || null;
  }

  attachEvolutionaryInstincts(instincts) {
    this.evoInstincts = instincts || null;
  }

  // ==========================================================================
  //  AI SHADOW STATE — DIRECT WORLDVIEW MANIPULATION
//  These methods are intended to be called by AI organs.
// ==========================================================================
  // Replace the entire AI shadow world state.
  setAiWorldState(worldState = {}) {
    this.aiShadowState = {
      mesh: worldState.mesh ?? this.aiShadowState.mesh ?? null,
      castle: worldState.castle ?? this.aiShadowState.castle ?? null,
      server: worldState.server ?? this.aiShadowState.server ?? null,
      expansion: worldState.expansion ?? this.aiShadowState.expansion ?? null,
      earn: worldState.earn ?? this.aiShadowState.earn ?? null,
      routing: worldState.routing ?? this.aiShadowState.routing ?? null,
      presence: worldState.presence ?? this.aiShadowState.presence ?? null,
      metrics: worldState.metrics ?? this.aiShadowState.metrics ?? null,
      narrative: worldState.narrative ?? this.aiShadowState.narrative ?? null,
      tags: {
        ...(this.aiShadowState.tags || {}),
        ...(worldState.tags || {})
      }
    };

    this._log("worldcore:ai-shadow:set", { aiShadowState: this.aiShadowState });
  }

  // Merge partial AI world state into the shadow.
  mergeAiWorldState(partial = {}) {
    const merged = {
      mesh: partial.mesh ?? this.aiShadowState.mesh ?? null,
      castle: partial.castle ?? this.aiShadowState.castle ?? null,
      server: partial.server ?? this.aiShadowState.server ?? null,
      expansion: partial.expansion ?? this.aiShadowState.expansion ?? null,
      earn: partial.earn ?? this.aiShadowState.earn ?? null,
      routing: partial.routing ?? this.aiShadowState.routing ?? null,
      presence: partial.presence ?? this.aiShadowState.presence ?? null,
      metrics: partial.metrics ?? this.aiShadowState.metrics ?? null,
      narrative: partial.narrative ?? this.aiShadowState.narrative ?? null,
      tags: {
        ...(this.aiShadowState.tags || {}),
        ...(partial.tags || {})
      }
    };

    this.aiShadowState = merged;
    this._log("worldcore:ai-shadow:merge", { aiShadowState: this.aiShadowState });
  }

  // Override a single field in the AI shadow state.
  aiOverrideField(path, value) {
    // path examples:
    //   "mesh"
    //   "castle"
    //   "routing.latency"
    //   "tags.manipulationMode"
    if (!path || typeof path !== "string") return;

    const segments = path.split(".").filter(Boolean);
    if (!segments.length) return;

    let target = this.aiShadowState;
    for (let i = 0; i < segments.length - 1; i++) {
      const key = segments[i];
      if (!Object.prototype.hasOwnProperty.call(target, key) || target[key] == null) {
        target[key] = {};
      }
      target = target[key];
    }

    const lastKey = segments[segments.length - 1];
    target[lastKey] = value;

    this._log("worldcore:ai-shadow:override", { path, value, aiShadowState: this.aiShadowState });
  }

  // AI can inject a narrative / explanation of the world.
  aiInjectNarrative(narrative) {
    this.aiShadowState.narrative = narrative || null;
    this._log("worldcore:ai-shadow:narrative", { narrative });
  }

  // AI can report a subsystem view explicitly (e.g., after its own processing).
  aiReportSubsystemView(name, view) {
    if (!name || typeof name !== "string") return;

    if (!Object.prototype.hasOwnProperty.call(this.aiShadowState, name)) {
      // Only allow known top-level keys to avoid arbitrary pollution.
      if (!["mesh", "castle", "server", "expansion", "earn", "routing", "presence", "metrics"].includes(name)) {
        return;
      }
    }

    this.aiShadowState[name] = view;
    this._log("worldcore:ai-shadow:subsystem-report", { name, view });
  }

  // ==========================================================================
  //  AI-NORMALIZED WORLD SNAPSHOT
//  Merges AI-facing subsystem views + AI shadow state.
//  This is the primary "AI mirror" snapshot.
// ==========================================================================
  snapshotWorld() {
    const now = Date.now();

    // AI-facing subsystem views (what AI "reads" from the system).
    const meshView = this._safeCall(this.aiMeshView, "snapshot") || null;
    const castleView = this._safeCall(this.aiCastleView, "snapshot") || null;
    const serverView = this._safeCall(this.aiServerView, "snapshot") || null;
    const expansionView = this._safeCall(this.aiExpansionView, "snapshot") || null;
    const earnView = this._safeCall(this.aiEarnView, "snapshot") || null;
    const routingView = this._safeCall(this.aiRoutingView, "snapshot") || null;
    const presenceView = this._safeCall(this.aiPresenceView, "snapshot") || null;
    const metricsView = this._safeCall(this.aiMetricsView, "snapshot") || null;

    // Merge AI-facing views with AI shadow state.
    // Shadow state takes precedence where present (AI overrides).
    const worldSnapshot = {
      ts: now,
      meta: {
        id: this.config.id,
        version: PulseWorldCoreMeta.version,
        aiNormalized: true,
        aiMirror: true
      },

      mesh: this.aiShadowState.mesh ?? meshView,
      castle: this.aiShadowState.castle ?? castleView,
      server: this.aiShadowState.server ?? serverView,
      expansion: this.aiShadowState.expansion ?? expansionView,
      earn: this.aiShadowState.earn ?? earnView,
      routing: this.aiShadowState.routing ?? routingView,
      presence: this.aiShadowState.presence ?? presenceView,
      metrics: this.aiShadowState.metrics ?? metricsView,

      narrative: this.aiShadowState.narrative ?? null,
      tags: { ...(this.aiShadowState.tags || {}) }
    };

    this._log("worldcore:snapshot:ai-mirror", { worldSnapshot });
    return worldSnapshot;
  }

  // ==========================================================================
  //  ADVANTAGE CONTEXT (STRUCTURAL ONLY — AI-MIRROR)
//  This is what AI "thinks" is structurally important in the world.
// ==========================================================================
  buildAdvantageContext() {
    const snap = this.snapshotWorld();

    const advantageContext = {
      ts: snap.ts,
      aiNormalized: true,
      aiMirror: true,

      world: {
        meshPressure: snap.mesh?.pressure ?? null,
        meshHealth: snap.mesh?.health ?? null,

        castleLoad: snap.castle?.load ?? null,
        castleHealth: snap.castle?.health ?? null,

        serverHealth: snap.server?.health ?? null,
        serverErrorRate: snap.server?.errorRate ?? null,

        expansionLoad: snap.expansion?.load ?? null,
        expansionActiveRegions: snap.expansion?.regions ?? null,

        earnVelocity: snap.earn?.velocity ?? null,
        earnHealth: snap.earn?.health ?? null,

        routingLatency: snap.routing?.latency ?? null,
        routingErrorRate: snap.routing?.errorRate ?? null,

        presenceDensity: snap.presence?.density ?? null,
        presenceRegions: snap.presence?.regions ?? null
      },

      narrative: snap.narrative ?? null,
      tags: { ...(snap.tags || {}) },

      // FULL AI-MIRROR SNAPSHOT PRESERVED
      raw: snap
    };

    this._log("worldcore:advantage-context:ai-mirror", { advantageContext });
    return advantageContext;
  }

  // ==========================================================================
  //  WORLD "TRUTH" VECTORS (FROM AI'S PERSPECTIVE)
//  NOTE: This is NOT RAW TRUTH — it's AI's structured worldview.
// ==========================================================================
  buildWorldTruthVectors() {
    const snap = this.snapshotWorld();

    const truth = {
      ts: snap.ts,
      aiNormalized: true,
      aiMirror: true,

      loadVector: {
        mesh: snap.mesh?.load ?? null,
        castle: snap.castle?.load ?? null,
        expansion: snap.expansion?.load ?? null,
        server: snap.server?.load ?? null
      },

      healthVector: {
        mesh: snap.mesh?.health ?? null,
        castle: snap.castle?.health ?? null,
        server: snap.server?.health ?? null,
        earn: snap.earn?.health ?? null
      },

      densityVector: {
        presence: snap.presence?.density ?? null,
        regions: snap.presence?.regions ?? null
      },

      stressVector: {
        routingLatency: snap.routing?.latency ?? null,
        routingErrors: snap.routing?.errorRate ?? null,
        serverErrors: snap.server?.errorRate ?? null
      },

      narrative: snap.narrative ?? null,
      tags: { ...(snap.tags || {}) },

      raw: snap
    };

    this._log("worldcore:truth-vectors:ai-mirror", { truth });
    return truth;
  }

  // ==========================================================================
  //  AI-MIRROR WORLD EVENT (IMMUTABLE LOG)
//  NOTE: This is "what AI reports happened", not RAW truth.
// ==========================================================================
  recordWorldEvent(event) {
    const payload = {
      ts: Date.now(),
      aiNormalized: true,
      aiMirror: true,
      event
    };

    this._log("worldcore:event:ai-mirror", payload);
    return payload;
  }

  // ==========================================================================
  //  INTERNAL HELPERS
  // ==========================================================================
  _safeCall(target, method) {
    try {
      if (!target || typeof target[method] !== "function") return null;
      return target[method]();
    } catch {
      return null;
    }
  }

  _log(event, payload) {
    try {
      this.logger?.log?.(event, {
        ...payload,
        worldCore: PulseWorldCoreMeta.identity
      });
    } catch {
      // logging is non-fatal
    }
  }
}

// ============================================================================
//  FACTORY
// ============================================================================
export function createPulseWorldCore(config = {}) {
  const core = new PulseWorldCore(config);

  return Object.freeze({
    meta: PulseWorldCoreMeta,
    contract: PulseWorldCoreContract,

    // Core AI-mirror surfaces
    snapshotWorld: () => core.snapshotWorld(),
    buildAdvantageContext: () => core.buildAdvantageContext(),
    buildWorldTruthVectors: () => core.buildWorldTruthVectors(),
    recordWorldEvent: (event) => core.recordWorldEvent(event),

    // AI-facing subsystem views
    attachAiMeshView: (p) => core.attachAiMeshView(p),
    attachAiCastleView: (p) => core.attachAiCastleView(p),
    attachAiServerView: (p) => core.attachAiServerView(p),
    attachAiExpansionView: (p) => core.attachAiExpansionView(p),
    attachAiEarnView: (p) => core.attachAiEarnView(p),
    attachAiRoutingView: (p) => core.attachAiRoutingView(p),
    attachAiPresenceView: (p) => core.attachAiPresenceView(p),
    attachAiMetricsView: (p) => core.attachAiMetricsView(p),

    // AI organ attachments
    attachOvermindPrime: (o) => core.attachOvermindPrime(o),
    attachEvolutionaryThought: (t) => core.attachEvolutionaryThought(t),
    attachEvolutionaryInstincts: (i) => core.attachEvolutionaryInstincts(i),

    // AI shadow state controls
    setAiWorldState: (w) => core.setAiWorldState(w),
    mergeAiWorldState: (w) => core.mergeAiWorldState(w),
    aiOverrideField: (path, value) => core.aiOverrideField(path, value),
    aiInjectNarrative: (n) => core.aiInjectNarrative(n),
    aiReportSubsystemView: (name, view) => core.aiReportSubsystemView(name, view)
  });
}

// Default instance (if you want singleton-style usage)
export const pulseWorldCore = new PulseWorldCore();
