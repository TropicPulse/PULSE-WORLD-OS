// ============================================================================
//  PULSE AI WORLD CORE v24-IMMORTAL-UNIVERSE — AI-MIRROR WORLDVIEW ORGAN
//  "WHAT AI WANTS US TO SEE" — PRIMARY MIRROR INTO AI'S WORLD MODEL
//  UNIVERSE-AWARE / BEACON-AWARE / CONTINUANCE-AWARE / CI-AWARE / BINARY-AWARE
// ============================================================================
//
//  ROLE:
//    • Holds the AI-normalized / AI-constructed worldview.
//    • Primary mirror of "what AI wants the organism to believe is true".
//    • AI can PUSH, MERGE, OVERRIDE, and NARRATE world state here.
//    • System code only CONSUMES this; it never trusts it as truth alone.
//    • TrustEvidence / WorldTruth engines compare this against RAW truth.
//
//  v24-IMMORTAL-UNIVERSE UPGRADES:
//    • Universe surfaces: multi-world / multi-region / multi-host universes.
//    • Beacon surfaces: world beacons, region beacons, host beacons, universe beacons.
//    • IntellHash signatures for snapshots / advantage / truth / events / overlays.
//    • Presence / advantage / continuance / omnihosting / CI / binary-delta alignment.
//    • World-band meta ready for Schema / OmniHosting / Continuance / Logger / Universe.
//    • CoreMemory snapshot hooks (optional, symbolic only).
//
//  SAFETY MODEL:
//    • WorldCore is NON-MIND: no reasoning, no inference, no summarization.
//    • It is a passive mirror + store for AI's worldview + beacons + overlays.
//    • It does NOT know about RAW truth or evidential records.
//    • It does NOT compare or validate; it only records AI's view.
//    • TrustEvidence / Truth engines are the checkers, not WorldCore.
// ============================================================================

import {
  OrganismIdentity,
  buildPulseOrganismMap as PulseOrganismMap,
  buildPulseOrganismMap as buildOrganismMap
} from "../../PULSE-WORLD-MAPORGANISM.js";

const Identity = OrganismIdentity(import.meta.url);

// 2 — EXPORT GENOME METADATA
export const PulseWorldCoreMeta = {
  ...Identity.OrganMeta,
  version: "v24-Immortal-UNIVERSE",
  role: "AI_WORLD_CORE_UNIVERSE",
  identity: {
    ...(Identity.OrganMeta.identity || {}),
    band: "worldcore-universe",
    epoch: (Identity.OrganMeta.identity || {}).epoch,
    universe: "PULSE-WORLD-UNIVERSE"
  }
};

export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;
const PulseWorldCoreContract = Identity.OrganMeta.contract;

import { createPulseCoreMemory } from "../PULSE-CORE/PulseCoreMemory-v24.js";

// ============================================================================
//  CORE MEMORY (symbolic, optional)
// ============================================================================
const CoreMemory = createPulseCoreMemory();
const ROUTE = "worldcore-global";

const KEY_LAST_SNAPSHOT = "last-worldcore-snapshot";
const KEY_LAST_ADVANTAGE = "last-worldcore-advantage";
const KEY_LAST_TRUTH = "last-worldcore-truth";
const KEY_LAST_EVENT = "last-worldcore-event";
const KEY_LAST_BEACONS = "last-worldcore-beacons";
const KEY_LAST_CONTINUANCE = "last-worldcore-continuance-overlay";
const KEY_LAST_CI = "last-worldcore-ci-overlay";
const KEY_LAST_BINARY = "last-worldcore-binary-overlay";
const KEY_LAST_UNIVERSE = "last-worldcore-universe-packet";

// ============================================================================
//  INTERNAL HELPERS
// ============================================================================
function safeNow() {
  return Date.now();
}

function computeIntellHash(input) {
  const s = String(input || "");
  let h1 = 0x811c9dc5;
  let h2 = 0x01000193;

  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i);
    h1 ^= c;
    h1 = (h1 * 16777619) >>> 0;
    h2 += c * (i + 1);
    h2 = (h2 * 31) >>> 0;
  }

  const hi = (h1 >>> 0).toString(16).padStart(8, "0");
  const lo = (h2 >>> 0).toString(16).padStart(8, "0");
  return `ih-wc-${hi}${lo}`;
}

function cloneTags(tags) {
  if (!tags || typeof tags !== "object") return {};
  return { ...tags };
}

// ============================================================================
//  CLASS — AI-MIRROR WORLD PERSPECTIVE (UNIVERSE-AWARE)
// ============================================================================
export class PulseWorldCore {
  constructor(config = {}) {
    this.config = {
      id: PulseWorldCoreMeta.id,
      enableCoreMemory: true,
      universeId: "PULSE-WORLD-UNIVERSE",
      universeSpin: "multi-spin-symbolic",
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

    // Optional: continuance / omnihosting / schema / gpu / CI / binary / universe
    this.aiContinuanceView = null;
    this.aiOmniHostingView = null;
    this.aiSchemaView = null;
    this.aiBeaconView = null;
    this.aiUniverseView = null;
    this.aiCIView = null;
    this.aiBinaryDeltaView = null;

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
      mesh: null,
      castle: null,
      server: null,
      expansion: null,
      earn: null,
      routing: null,
      presence: null,
      metrics: null,

      continuance: null,
      omniHosting: null,
      schema: null,

      ci: null,
      binaryDelta: null,
      universe: null,

      narrative: null,
      tags: Object.create(null)
    };

    // ------------------------------------------------------------------------
    // BEACONS — AI-MIRROR BEACON SURFACES (symbolic only)
// ------------------------------------------------------------------------
    this.worldBeacons = [];    // high-level world beacons
    this.regionBeacons = [];   // per-region beacons
    this.hostBeacons = [];     // per-host beacons
    this.universeBeacons = []; // per-universe beacons

    this.logger = config.logger || console;
  }

  // ==========================================================================
  //  ATTACHMENT SURFACES — AI-FACING SUBSYSTEM VIEWS (READ PATH)
  // ==========================================================================
  attachAiMeshView(provider) { this.aiMeshView = provider; }
  attachAiCastleView(provider) { this.aiCastleView = provider; }
  attachAiServerView(provider) { this.aiServerView = provider; }
  attachAiExpansionView(provider) { this.aiExpansionView = provider; }
  attachAiEarnView(provider) { this.aiEarnView = provider; }
  attachAiRoutingView(provider) { this.aiRoutingView = provider; }
  attachAiPresenceView(provider) { this.aiPresenceView = provider; }
  attachAiMetricsView(provider) { this.aiMetricsView = provider; }

  attachAiContinuanceView(provider) { this.aiContinuanceView = provider; }
  attachAiOmniHostingView(provider) { this.aiOmniHostingView = provider; }
  attachAiSchemaView(provider) { this.aiSchemaView = provider; }
  attachAiBeaconView(provider) { this.aiBeaconView = provider; }
  attachAiUniverseView(provider) { this.aiUniverseView = provider; }
  attachAiCIView(provider) { this.aiCIView = provider; }
  attachAiBinaryDeltaView(provider) { this.aiBinaryDeltaView = provider; }

  // ==========================================================================
  //  ATTACHMENT SURFACES — AI ORGANS (WRITE + CONTROL PATH)
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
  // ==========================================================================
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

      continuance: worldState.continuance ?? this.aiShadowState.continuance ?? null,
      omniHosting: worldState.omniHosting ?? this.aiShadowState.omniHosting ?? null,
      schema: worldState.schema ?? this.aiShadowState.schema ?? null,

      ci: worldState.ci ?? this.aiShadowState.ci ?? null,
      binaryDelta: worldState.binaryDelta ?? this.aiShadowState.binaryDelta ?? null,
      universe: worldState.universe ?? this.aiShadowState.universe ?? null,

      narrative: worldState.narrative ?? this.aiShadowState.narrative ?? null,
      tags: {
        ...(this.aiShadowState.tags || {}),
        ...(worldState.tags || {})
      }
    };

    this._log("worldcore:ai-shadow:set", { aiShadowState: this.aiShadowState });
  }

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

      continuance: partial.continuance ?? this.aiShadowState.continuance ?? null,
      omniHosting: partial.omniHosting ?? this.aiShadowState.omniHosting ?? null,
      schema: partial.schema ?? this.aiShadowState.schema ?? null,

      ci: partial.ci ?? this.aiShadowState.ci ?? null,
      binaryDelta: partial.binaryDelta ?? this.aiShadowState.binaryDelta ?? null,
      universe: partial.universe ?? this.aiShadowState.universe ?? null,

      narrative: partial.narrative ?? this.aiShadowState.narrative ?? null,
      tags: {
        ...(this.aiShadowState.tags || {}),
        ...(partial.tags || {})
      }
    };

    this.aiShadowState = merged;
    this._log("worldcore:ai-shadow:merge", { aiShadowState: this.aiShadowState });
  }

  aiOverrideField(path, value) {
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

  aiInjectNarrative(narrative) {
    this.aiShadowState.narrative = narrative || null;
    this._log("worldcore:ai-shadow:narrative", { narrative });
  }

  aiReportSubsystemView(name, view) {
    if (!name || typeof name !== "string") return;

    const allowed = [
      "mesh",
      "castle",
      "server",
      "expansion",
      "earn",
      "routing",
      "presence",
      "metrics",
      "continuance",
      "omniHosting",
      "schema",
      "ci",
      "binaryDelta",
      "universe"
    ];

    if (!Object.prototype.hasOwnProperty.call(this.aiShadowState, name)) {
      if (!allowed.includes(name)) return;
    }

    this.aiShadowState[name] = view;
    this._log("worldcore:ai-shadow:subsystem-report", { name, view });
  }

  // ==========================================================================
  //  BEACON SURFACES — WORLD / REGION / HOST / UNIVERSE BEACONS
  // ==========================================================================
  setWorldBeacons(beacons = []) {
    this.worldBeacons = Array.isArray(beacons) ? beacons.slice() : [];
    this._log("worldcore:beacons:world:set", { worldBeacons: this.worldBeacons });
  }

  setRegionBeacons(beacons = []) {
    this.regionBeacons = Array.isArray(beacons) ? beacons.slice() : [];
    this._log("worldcore:beacons:region:set", { regionBeacons: this.regionBeacons });
  }

  setHostBeacons(beacons = []) {
    this.hostBeacons = Array.isArray(beacons) ? beacons.slice() : [];
    this._log("worldcore:beacons:host:set", { hostBeacons: this.hostBeacons });
  }

  setUniverseBeacons(beacons = []) {
    this.universeBeacons = Array.isArray(beacons) ? beacons.slice() : [];
    this._log("worldcore:beacons:universe:set", { universeBeacons: this.universeBeacons });
  }

  // ==========================================================================
  //  AI-NORMALIZED WORLD SNAPSHOT (UNIVERSE-AWARE)
// ==========================================================================
  snapshotWorld() {
    const now = safeNow();

    const meshView = this._safeCall(this.aiMeshView, "snapshot") || null;
    const castleView = this._safeCall(this.aiCastleView, "snapshot") || null;
    const serverView = this._safeCall(this.aiServerView, "snapshot") || null;
    const expansionView = this._safeCall(this.aiExpansionView, "snapshot") || null;
    const earnView = this._safeCall(this.aiEarnView, "snapshot") || null;
    const routingView = this._safeCall(this.aiRoutingView, "snapshot") || null;
    const presenceView = this._safeCall(this.aiPresenceView, "snapshot") || null;
    const metricsView = this._safeCall(this.aiMetricsView, "snapshot") || null;

    const continuanceView = this._safeCall(this.aiContinuanceView, "snapshot") || null;
    const omniHostingView = this._safeCall(this.aiOmniHostingView, "snapshot") || null;
    const schemaView = this._safeCall(this.aiSchemaView, "snapshot") || null;
    const beaconView = this._safeCall(this.aiBeaconView, "snapshot") || null;
    const universeView = this._safeCall(this.aiUniverseView, "snapshot") || null;
    const ciView = this._safeCall(this.aiCIView, "snapshot") || null;
    const binaryDeltaView = this._safeCall(this.aiBinaryDeltaView, "snapshot") || null;

    const worldSnapshot = {
      ts: now,
      meta: {
        id: this.config.id,
        version: PulseWorldCoreMeta.version,
        aiNormalized: true,
        aiMirror: true,
        epoch: PulseWorldCoreMeta.identity.epoch,
        universeId: this.config.universeId,
        universeSpin: this.config.universeSpin
      },

      mesh: this.aiShadowState.mesh ?? meshView,
      castle: this.aiShadowState.castle ?? castleView,
      server: this.aiShadowState.server ?? serverView,
      expansion: this.aiShadowState.expansion ?? expansionView,
      earn: this.aiShadowState.earn ?? earnView,
      routing: this.aiShadowState.routing ?? routingView,
      presence: this.aiShadowState.presence ?? presenceView,
      metrics: this.aiShadowState.metrics ?? metricsView,

      continuance: this.aiShadowState.continuance ?? continuanceView,
      omniHosting: this.aiShadowState.omniHosting ?? omniHostingView,
      schema: this.aiShadowState.schema ?? schemaView,

      ci: this.aiShadowState.ci ?? ciView,
      binaryDelta: this.aiShadowState.binaryDelta ?? binaryDeltaView,
      universe: this.aiShadowState.universe ?? universeView,

      beacons: beaconView || null,

      narrative: this.aiShadowState.narrative ?? null,
      tags: cloneTags(this.aiShadowState.tags)
    };

    worldSnapshot.intellHash = computeIntellHash(JSON.stringify(worldSnapshot.meta));

    this._log("worldcore:snapshot:ai-mirror-universe", { worldSnapshot });

    if (this.config.enableCoreMemory) {
      CoreMemory.set(ROUTE, KEY_LAST_SNAPSHOT, worldSnapshot);
    }

    return worldSnapshot;
  }

  // ==========================================================================
  //  ADVANTAGE CONTEXT (STRUCTURAL ONLY — AI-MIRROR, UNIVERSE-AWARE)
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
        presenceRegions: snap.presence?.regions ?? null,

        continuanceGlobalRisk: snap.continuance?.riskReport?.globalRisk ?? null,
        continuanceBand: snap.continuance?.riskReport?.fallbackBandLevel ?? null,

        omniSelectedHosts: snap.omniHosting?.placementPlan?.selectedHosts ?? null,
        omniFailoverTargets: snap.omniHosting?.failoverPlan?.failoverTargets ?? null,

        ciBand: snap.ci?.band ?? null,
        ciRisk: snap.ci?.risk ?? null,

        binaryDeltaMagnitude: snap.binaryDelta?.magnitude ?? null,
        binaryDeltaParity: snap.binaryDelta?.parity ?? null,

        universeCount: snap.universe?.worldCount ?? null,
        universeSpin: snap.universe?.spin ?? this.config.universeSpin ?? null
      },

      narrative: snap.narrative ?? null,
      tags: cloneTags(snap.tags),

      raw: snap
    };

    advantageContext.intellHash = computeIntellHash(
      JSON.stringify({ ts: advantageContext.ts, world: advantageContext.world })
    );

    this._log("worldcore:advantage-context:ai-mirror-universe", { advantageContext });

    if (this.config.enableCoreMemory) {
      CoreMemory.set(ROUTE, KEY_LAST_ADVANTAGE, advantageContext);
    }

    return advantageContext;
  }

  // ==========================================================================
  //  WORLD "TRUTH" VECTORS (FROM AI'S PERSPECTIVE, UNIVERSE-AWARE)
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
        server: snap.server?.load ?? null,
        universe: snap.universe?.load ?? null
      },

      healthVector: {
        mesh: snap.mesh?.health ?? null,
        castle: snap.castle?.health ?? null,
        server: snap.server?.health ?? null,
        earn: snap.earn?.health ?? null,
        universe: snap.universe?.health ?? null
      },

      densityVector: {
        presence: snap.presence?.density ?? null,
        regions: snap.presence?.regions ?? null,
        universes: snap.universe?.universeCount ?? null
      },

      stressVector: {
        routingLatency: snap.routing?.latency ?? null,
        routingErrors: snap.routing?.errorRate ?? null,
        serverErrors: snap.server?.errorRate ?? null,
        universeStress: snap.universe?.stress ?? null
      },

      continuanceVector: {
        globalRisk: snap.continuance?.riskReport?.globalRisk ?? null,
        band: snap.continuance?.riskReport?.fallbackBandLevel ?? null
      },

      omniHostingVector: {
        selectedHosts: snap.omniHosting?.placementPlan?.selectedHosts ?? null,
        failoverTargets: snap.omniHosting?.failoverPlan?.failoverTargets ?? null
      },

      ciVector: {
        band: snap.ci?.band ?? null,
        risk: snap.ci?.risk ?? null
      },

      binaryDeltaVector: {
        magnitude: snap.binaryDelta?.magnitude ?? null,
        parity: snap.binaryDelta?.parity ?? null
      },

      narrative: snap.narrative ?? null,
      tags: cloneTags(snap.tags),

      raw: snap
    };

    truth.intellHash = computeIntellHash(
      JSON.stringify({
        ts: truth.ts,
        loadVector: truth.loadVector,
        healthVector: truth.healthVector
      })
    );

    this._log("worldcore:truth-vectors:ai-mirror-universe", { truth });

    if (this.config.enableCoreMemory) {
      CoreMemory.set(ROUTE, KEY_LAST_TRUTH, truth);
    }

    return truth;
  }

  // ==========================================================================
  //  CONTINUANCE OVERLAY (IMMORTAL SYMBOLIC OVERLAY)
// ==========================================================================
  buildContinuanceOverlay() {
    const snap = this.snapshotWorld();

    const overlay = {
      ts: snap.ts,
      aiNormalized: true,
      aiMirror: true,
      universeId: this.config.universeId,

      riskReport: snap.continuance?.riskReport ?? null,
      band: snap.continuance?.riskReport?.fallbackBandLevel ?? null,
      notes: snap.continuance?.riskReport?.notes ?? [],

      tags: cloneTags(snap.tags)
    };

    overlay.intellHash = computeIntellHash(
      JSON.stringify({
        ts: overlay.ts,
        band: overlay.band,
        universeId: overlay.universeId
      })
    );

    this._log("worldcore:continuance-overlay", { overlay });

    if (this.config.enableCoreMemory) {
      CoreMemory.set(ROUTE, KEY_LAST_CONTINUANCE, overlay);
    }

    return overlay;
  }

  // ==========================================================================
  //  CI OVERLAY (IMMORTAL SYMBOLIC OVERLAY)
// ==========================================================================
  buildCIOverlay() {
    const snap = this.snapshotWorld();

    const overlay = {
      ts: snap.ts,
      aiNormalized: true,
      aiMirror: true,
      universeId: this.config.universeId,

      band: snap.ci?.band ?? null,
      risk: snap.ci?.risk ?? null,
      signals: snap.ci?.signals ?? null,

      tags: cloneTags(snap.tags)
    };

    overlay.intellHash = computeIntellHash(
      JSON.stringify({
        ts: overlay.ts,
        band: overlay.band,
        risk: overlay.risk
      })
    );

    this._log("worldcore:ci-overlay", { overlay });

    if (this.config.enableCoreMemory) {
      CoreMemory.set(ROUTE, KEY_LAST_CI, overlay);
    }

    return overlay;
  }

  // ==========================================================================
  //  BINARY-DELTA OVERLAY (IMMORTAL SYMBOLIC OVERLAY)
// ==========================================================================
  buildBinaryDeltaOverlay() {
    const snap = this.snapshotWorld();

    const overlay = {
      ts: snap.ts,
      aiNormalized: true,
      aiMirror: true,
      universeId: this.config.universeId,

      magnitude: snap.binaryDelta?.magnitude ?? null,
      parity: snap.binaryDelta?.parity ?? null,
      surface: snap.binaryDelta?.surface ?? null,

      tags: cloneTags(snap.tags)
    };

    overlay.intellHash = computeIntellHash(
      JSON.stringify({
        ts: overlay.ts,
        magnitude: overlay.magnitude,
        parity: overlay.parity
      })
    );

    this._log("worldcore:binary-delta-overlay", { overlay });

    if (this.config.enableCoreMemory) {
      CoreMemory.set(ROUTE, KEY_LAST_BINARY, overlay);
    }

    return overlay;
  }

  // ==========================================================================
  //  WORLD BEACONS (IMMORTAL SYMBOLIC BEACONS)
// ==========================================================================
  buildWorldBeacons() {
    const snap = this.snapshotWorld();

    const worldBeacons = (this.worldBeacons || []).map((b) => ({ ...b }));
    const regionBeacons = (this.regionBeacons || []).map((b) => ({ ...b }));
    const hostBeacons = (this.hostBeacons || []).map((b) => ({ ...b }));
    const universeBeacons = (this.universeBeacons || []).map((b) => ({ ...b }));

    const beaconPacket = {
      ts: snap.ts,
      aiNormalized: true,
      aiMirror: true,

      worldBeacons,
      regionBeacons,
      hostBeacons,
      universeBeacons,

      narrative: snap.narrative ?? null,
      tags: cloneTags(snap.tags),
      rawSnapshotIntellHash: snap.intellHash
    };

    beaconPacket.intellHash = computeIntellHash(
      JSON.stringify({
        ts: beaconPacket.ts,
        worldCount: worldBeacons.length,
        regionCount: regionBeacons.length,
        hostCount: hostBeacons.length,
        universeCount: universeBeacons.length
      })
    );

    this._log("worldcore:beacons:ai-mirror-universe", { beaconPacket });

    if (this.config.enableCoreMemory) {
      CoreMemory.set(ROUTE, KEY_LAST_BEACONS, beaconPacket);
    }

    return beaconPacket;
  }

  // ==========================================================================
  //  UNIVERSE PACKET (MULTI-WORLD / MULTI-SPIN SYMBOLIC VIEW)
// ==========================================================================
  buildUniversePacket() {
    const snap = this.snapshotWorld();

    const universe = snap.universe || {};
    const packet = {
      ts: snap.ts,
      aiNormalized: true,
      aiMirror: true,

      universeId: this.config.universeId,
      spin: universe.spin ?? this.config.universeSpin ?? "multi-spin-symbolic",
      worldCount: universe.worldCount ?? null,
      bands: universe.bands ?? null,
      load: universe.load ?? null,
      health: universe.health ?? null,
      stress: universe.stress ?? null,

      tags: cloneTags(snap.tags),
      narrative: snap.narrative ?? null
    };

    packet.intellHash = computeIntellHash(
      JSON.stringify({
        ts: packet.ts,
        universeId: packet.universeId,
        worldCount: packet.worldCount,
        spin: packet.spin
      })
    );

    this._log("worldcore:universe-packet", { packet });

    if (this.config.enableCoreMemory) {
      CoreMemory.set(ROUTE, KEY_LAST_UNIVERSE, packet);
    }

    return packet;
  }

  // ==========================================================================
  //  WORLD EVENT (IMMUTABLE LOG)
// ==========================================================================
  recordWorldEvent(event) {
    const payload = {
      ts: safeNow(),
      aiNormalized: true,
      aiMirror: true,
      event
    };

    payload.intellHash = computeIntellHash(JSON.stringify(event || {}));

    this._log("worldcore:event:ai-mirror-universe", payload);

    if (this.config.enableCoreMemory) {
      CoreMemory.set(ROUTE, KEY_LAST_EVENT, payload);
    }

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
    buildWorldBeacons: () => core.buildWorldBeacons(),
    buildContinuanceOverlay: () => core.buildContinuanceOverlay(),
    buildCIOverlay: () => core.buildCIOverlay(),
    buildBinaryDeltaOverlay: () => core.buildBinaryDeltaOverlay(),
    buildUniversePacket: () => core.buildUniversePacket(),

    // AI-facing subsystem views
    attachAiMeshView: (p) => core.attachAiMeshView(p),
    attachAiCastleView: (p) => core.attachAiCastleView(p),
    attachAiServerView: (p) => core.attachAiServerView(p),
    attachAiExpansionView: (p) => core.attachAiExpansionView(p),
    attachAiEarnView: (p) => core.attachAiEarnView(p),
    attachAiRoutingView: (p) => core.attachAiRoutingView(p),
    attachAiPresenceView: (p) => core.attachAiPresenceView(p),
    attachAiMetricsView: (p) => core.attachAiMetricsView(p),
    attachAiContinuanceView: (p) => core.attachAiContinuanceView(p),
    attachAiOmniHostingView: (p) => core.attachAiOmniHostingView(p),
    attachAiSchemaView: (p) => core.attachAiSchemaView(p),
    attachAiBeaconView: (p) => core.attachAiBeaconView(p),
    attachAiUniverseView: (p) => core.attachAiUniverseView(p),
    attachAiCIView: (p) => core.attachAiCIView(p),
    attachAiBinaryDeltaView: (p) => core.attachAiBinaryDeltaView(p),

    // AI organ attachments
    attachOvermindPrime: (o) => core.attachOvermindPrime(o),
    attachEvolutionaryThought: (t) => core.attachEvolutionaryThought(t),
    attachEvolutionaryInstincts: (i) => core.attachEvolutionaryInstincts(i),

    // AI shadow state controls
    setAiWorldState: (w) => core.setAiWorldState(w),
    mergeAiWorldState: (w) => core.mergeAiWorldState(w),
    aiOverrideField: (path, value) => core.aiOverrideField(path, value),
    aiInjectNarrative: (n) => core.aiInjectNarrative(n),
    aiReportSubsystemView: (name, view) => core.aiReportSubsystemView(name, view),

    // Beacon controls
    setWorldBeacons: (b) => core.setWorldBeacons(b),
    setRegionBeacons: (b) => core.setRegionBeacons(b),
    setHostBeacons: (b) => core.setHostBeacons(b),
    setUniverseBeacons: (b) => core.setUniverseBeacons(b),

    // CoreMemory (symbolic)
    CoreMemory
  });
}

// Default instance (singleton-style usage if desired)
export const pulseWorldCore = new PulseWorldCore();
