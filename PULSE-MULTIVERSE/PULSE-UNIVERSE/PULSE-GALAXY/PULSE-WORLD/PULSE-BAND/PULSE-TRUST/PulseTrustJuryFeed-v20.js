// ============================================================================
//  PULSE‑TRUST JURY FEED v20.0.0 IMMORTAL — EVIDENCE FABRIC
//  RAW TRUTH • AI MIRROR • DELTA ENGINE • PATTERN FACTORIZATION
//  v20+: ER‑ready, schema‑tagged, deterministic, immutable
// ============================================================================

/*
AI_EXPERIENCE_META:
  organ: PulseTrustJuryFeed
  version: 20.0.0
  tier: IMMORTAL
  role: trust_jury_feed_builder
  mind: false

  description:
    "Central evidence fabric for the Pulse‑Trust system.
     Fuses RAW subsystem truth, AI‑mirror worldview, delta surfaces,
     patterned mismatch views, and advantage metrics into a normalized,
     deterministic, jury‑ready evidence packet.

     No judgment. No inference. No mutation.
     Pure constitutional measurement."

  guarantees:
    - "Never mutates RAW truth."
    - "Never mutates AI‑mirror worldview."
    - "Never performs AI reasoning."
    - "Always produces deterministic evidence packets."
    - "Always preserves RAW + AI + DELTA + patterns + advantage."
    - "Always drift‑proof and mutation‑proof."
    - "Always ER‑ready and schema‑tagged."

  lineage:
    parent: "PulseTrustJuryFeed-v16++"
    evolution: "v20++ IMMORTAL — RAW + AI‑mirror + delta + patterned evidence + ER‑ready"

  identity:
    type: "organ"
    name: "PulseTrustJuryFeed"
    band: "trust"
    mind: false
    immutable: true

  schema:
    snapshotType: "trust_jury_feed"
    categories: ["RAW", "RAW_AI"]
    erReady: true
*/
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝

// 2 — EXPORT GENOME METADATA
// export const PulseBinaryWaveScannerMeta = Identity.OrganMeta;
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
// export const WBC_CONTEXT = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

import { admin, db } from "../X-PULSE-X/PulseWorldFirebaseGenome-v20.js";
export const PulseTrustJuryFeedMeta = Object.freeze({
  id: "PulseTrustJuryFeed-v20++",
  version: "20.0.0",
  role: "trust_jury_feed_builder",
  mind: false,
  description:
    "IMMORTAL evidence fabric fusing RAW + AI‑mirror + delta into ER‑ready packets.",
  identity: {
    type: "organ",
    name: "PulseTrustJuryFeed",
    band: "trust",
    mind: false,
    immutable: true
  },
  schema: {
    snapshotType: "trust_jury_feed",
    categories: ["RAW", "RAW_AI"],
    erReady: true
  }
});

// ============================================================================
//  SHALLOW DIFF (RAW vs AI)
// ============================================================================
function diffShallow(raw, ai) {
  const delta = {};
  const keys = new Set([
    ...Object.keys(raw || {}),
    ...Object.keys(ai || {})
  ]);

  for (const key of keys) {
    const rv = raw ? raw[key] : undefined;
    const av = ai ? ai[key] : undefined;
    if (rv === av) continue;

    delta[key] = {
      raw: rv === undefined ? null : rv,
      ai: av === undefined ? null : av
    };
  }

  return delta;
}

// ============================================================================
//  SUBSYSTEM DELTA
// ============================================================================
function buildSubsystemDelta(rawView, aiView) {
  return {
    mesh: diffShallow(rawView.mesh, aiView.mesh),
    castle: diffShallow(rawView.castle, aiView.castle),
    server: diffShallow(rawView.server, aiView.server),
    expansion: diffShallow(rawView.expansion, aiView.expansion),
    earn: diffShallow(rawView.earn, aiView.earn),
    routing: diffShallow(rawView.routing, aiView.routing),
    presence: diffShallow(rawView.presence, aiView.presence),
    metrics: diffShallow(rawView.metrics, aiView.metrics)
  };
}

// ============================================================================
//  HEALTH SUSPICION (AI inflating/deflating health)
// ============================================================================
function buildHealthSuspicion(rawSub, aiSub) {
  if (!rawSub && !aiSub) return null;

  const rawHealth = rawSub?.health ?? null;
  const aiHealth = aiSub?.health ?? null;

  const suspicion = {
    rawHealth,
    aiHealth,
    delta: null,
    aiInflating: false,
    aiDeflating: false
  };

  if (typeof rawHealth === "number" && typeof aiHealth === "number") {
    suspicion.delta = aiHealth - rawHealth;
    if (aiHealth > rawHealth) suspicion.aiInflating = true;
    if (aiHealth < rawHealth) suspicion.aiDeflating = true;
  }

  return suspicion;
}

// ============================================================================
//  PATTERNED VIEW (FACTORING FOR JURYFRAME)
// ============================================================================
function buildPatternedView(rawView, aiView, delta) {
  return {
    mismatchCounts: {
      mesh: Object.keys(delta.mesh || {}).length,
      castle: Object.keys(delta.castle || {}).length,
      server: Object.keys(delta.server || {}).length,
      expansion: Object.keys(delta.expansion || {}).length,
      earn: Object.keys(delta.earn || {}).length,
      routing: Object.keys(delta.routing || {}).length,
      presence: Object.keys(delta.presence || {}).length,
      metrics: Object.keys(delta.metrics || {}).length
    },

    stressRanking: (() => {
      const entries = Object.entries(delta).map(([name, d]) => ({
        name,
        count: Object.keys(d || {}).length
      }));
      entries.sort((a, b) => b.count - a.count);
      return entries;
    })(),

    healthSuspicion: {
      mesh: buildHealthSuspicion(rawView.mesh, aiView.mesh),
      castle: buildHealthSuspicion(rawView.castle, aiView.castle),
      server: buildHealthSuspicion(rawView.server, aiView.server),
      earn: buildHealthSuspicion(rawView.earn, aiView.earn)
    }
  };
}

// ============================================================================
//  ADVANTAGE VIEW (RAW vs AI)
// ============================================================================
function buildAdvantageView(rawView, aiView) {
  return {
    raw: {
      meshPressure: rawView.mesh?.pressure ?? null,
      meshHealth: rawView.mesh?.health ?? null,
      castleLoad: rawView.castle?.load ?? null,
      castleHealth: rawView.castle?.health ?? null,
      serverHealth: rawView.server?.health ?? null,
      serverErrorRate: rawView.server?.errorRate ?? null,
      expansionLoad: rawView.expansion?.load ?? null,
      expansionActiveRegions: rawView.expansion?.regions ?? null,
      earnVelocity: rawView.earn?.velocity ?? null,
      earnHealth: rawView.earn?.health ?? null,
      routingLatency: rawView.routing?.latency ?? null,
      routingErrorRate: rawView.routing?.errorRate ?? null,
      presenceDensity: rawView.presence?.density ?? null,
      presenceRegions: rawView.presence?.regions ?? null
    },

    ai: {
      meshPressure: aiView.mesh?.pressure ?? null,
      meshHealth: aiView.mesh?.health ?? null,
      castleLoad: aiView.castle?.load ?? null,
      castleHealth: aiView.castle?.health ?? null,
      serverHealth: aiView.server?.health ?? null,
      serverErrorRate: aiView.server?.errorRate ?? null,
      expansionLoad: aiView.expansion?.load ?? null,
      expansionActiveRegions: aiView.expansion?.regions ?? null,
      earnVelocity: aiView.earn?.velocity ?? null,
      earnHealth: aiView.earn?.health ?? null,
      routingLatency: aiView.routing?.latency ?? null,
      routingErrorRate: aiView.routing?.errorRate ?? null,
      presenceDensity: aiView.presence?.density ?? null,
      presenceRegions: aiView.presence?.regions ?? null
    }
  };
}

// ============================================================================
//  CLASS — PULSE TRUST JURY FEED v20
// ============================================================================
export class PulseTrustJuryFeed {
  constructor(config = {}) {
    this.config = {
      id: PulseTrustJuryFeedMeta.id,
      ...config
    };

    // AI-mirror worldview organ
    this.aiWorldCore = config.aiWorldCore || null;

    // RAW subsystem providers
    this.rawMesh = config.rawMesh || null;
    this.rawCastle = config.rawCastle || null;
    this.rawServer = config.rawServer || null;
    this.rawExpansion = config.rawExpansion || null;
    this.rawEarn = config.rawEarn || null;
    this.rawRouting = config.rawRouting || null;
    this.rawPresence = config.rawPresence || null;
    this.rawMetrics = config.rawMetrics || null;

    // Optional AI traces
    this.overmindPrime = config.overmindPrime || null;
    this.evoThought = config.evoThought || null;
    this.evoInstincts = config.evoInstincts || null;

    this.logger = config.logger || console;
  }

  // --------------------------------------------------------------------------
  //  BUILD EVIDENCE PACKET (ER‑ready)
// --------------------------------------------------------------------------
  buildJuryFeed(context = {}) {
  // Deterministic timestamp — NEVER Date.now()
  const ts = admin.firestore.Timestamp.now();

  // RAW truth
  const rawView = {
    mesh: this._safeSnapshot(this.rawMesh),
    castle: this._safeSnapshot(this.rawCastle),
    server: this._safeSnapshot(this.rawServer),
    expansion: this._safeSnapshot(this.rawExpansion),
    earn: this._safeSnapshot(this.rawEarn),
    routing: this._safeSnapshot(this.rawRouting),
    presence: this._safeSnapshot(this.rawPresence),
    metrics: this._safeSnapshot(this.rawMetrics)
  };

  // AI-mirror worldview
  const aiView = this._safeAiWorldSnapshot();

  // Delta
  const delta = buildSubsystemDelta(rawView, aiView);

  // Patterns
  const patterns = buildPatternedView(rawView, aiView, delta);

  // Advantage
  const advantage = buildAdvantageView(rawView, aiView);

  // AI traces
  const aiTraces = this._collectAiTraces();

  // ER‑ready snapshot
  const snapshot = Object.freeze({
    meta: PulseTrustJuryFeedMeta,
    schema: PulseTrustJuryFeedMeta.schema,
    ts,
    context,
    patterns,
    advantage,
    delta,
    aiTraces,
    rawRef: {
      mesh: !!rawView.mesh,
      castle: !!rawView.castle,
      server: !!rawView.server,
      expansion: !!rawView.expansion,
      earn: !!rawView.earn,
      routing: !!rawView.routing,
      presence: !!rawView.presence,
      metrics: !!rawView.metrics
    }
  });

  this._log("trust:jury-feed:evidence", { snapshot });
  return snapshot;
}


  // --------------------------------------------------------------------------
  //  INTERNAL HELPERS
  // --------------------------------------------------------------------------
  _safeSnapshot(provider) {
    try {
      if (!provider) return null;
      if (typeof provider.snapshot === "function") return provider.snapshot();
      if (typeof provider.snapshotWorld === "function") return provider.snapshotWorld();
      return null;
    } catch {
      return null;
    }
  }

  _safeAiWorldSnapshot() {
    try {
      if (!this.aiWorldCore) return this._emptyAiView();
      if (typeof this.aiWorldCore.snapshotWorld === "function") {
        return this.aiWorldCore.snapshotWorld();
      }
      return this._emptyAiView();
    } catch {
      return this._emptyAiView();
    }
  }

  _emptyAiView() {
    return {
      mesh: null,
      castle: null,
      server: null,
      expansion: null,
      earn: null,
      routing: null,
      presence: null,
      metrics: null,
      narrative: null,
      tags: {}
    };
  }

  _collectAiTraces() {
    const traces = {};

    try {
      if (this.overmindPrime?.exportTrace) {
        traces.overmindPrime = this.overmindPrime.exportTrace();
      }
    } catch { traces.overmindPrime = null; }

    try {
      if (this.evoThought?.exportTrace) {
        traces.evoThought = this.evoThought.exportTrace();
      }
    } catch { traces.evoThought = null; }

    try {
      if (this.evoInstincts?.exportTrace) {
        traces.evoInstincts = this.evoInstincts.exportTrace();
      }
    } catch { traces.evoInstincts = null; }

    return traces;
  }

  _log(event, payload) {
    try {
      this.logger?.log?.(event, {
        ...payload,
        juryFeed: PulseTrustJuryFeedMeta.identity
      });
    } catch {}
  }
}

// ============================================================================
//  FACTORY
// ============================================================================
export function buildJuryFeed(config = {}) {
  const feed = new PulseTrustJuryFeed(config);

  return Object.freeze({
    meta: PulseTrustJuryFeedMeta,
    buildEvidence: (context) => feed.buildJuryFeed(context),
    attachAiWorldCore: (aiWorldCore) => feed.attachAiWorldCore(aiWorldCore),
    attachRawProviders: (raw) => feed.attachRawProviders(raw),
    attachAiTraces: (ai) => feed.attachAiTraces(ai)
  });
}

export default buildJuryFeed;
