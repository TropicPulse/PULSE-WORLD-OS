// ============================================================================
//  PULSE WORLD CORE v16 — IMMORTAL WORLD PERSPECTIVE ORGAN
//  RAW-ONLY • NON-MIND • CONSTITUTIONAL WORLD EVIDENCE LAYER
// ============================================================================

/*
AI_EXPERIENCE_META:
  organ: PulseWorldCore
  version: 16.0.0
  tier: IMMORTAL
  role: world_perspective
  mind: false
  description:
    "Non-mind world-perspective organ. Emits RAW world signals only.
     No inference, no reasoning, no interpretation. Feeds constitutional
     evidence, advantageContext, and world truth vectors."

  guarantees:
    - "Never performs AI reasoning."
    - "Never summarizes or interprets data."
    - "Never rewrites or mutates raw signals."
    - "Always emits RAW world-state snapshots."
    - "Always preserves full raw snapshot for evidence."
    - "Always logs world events without modification."
    - "Always remains deterministic and drift-proof."

  boundaries:
    - "Cannot call AI models."
    - "Cannot infer meaning."
    - "Cannot compress or filter evidence."
    - "Cannot alter world truth."
    - "Cannot generate opinions."

  identity:
    band: "world"
    type: "organ"
    mind: false
    immutable: true

  lineage:
    parent: "PulseWorldCore-v15"
    evolution: "v16 IMMORTAL — constitutional world evidence separation"

  safety:
    - "No AI cognition allowed."
    - "No user-facing text generation."
    - "No interpretation of world signals."

  integration:
    feeds:
      - PulseTrustEvidence
      - OvermindPrime (advantageContext)
      - JuryFrame (world spin vector)
    receives:
      - mesh.raw
      - castle.raw
      - server.raw
      - expansion.raw
      - earn.raw
      - routing.raw
      - presence.raw
      - metrics.raw

  contract:
    input: "None (pull-only organ)"
    output:
      - snapshotWorld(): RAW world snapshot
      - buildAdvantageContext(): compact world truth vector
      - recordWorldEvent(): immutable world event

  immortal:
    drift_protection: true
    mutation_protection: true
    deterministic: true
    constitutional: true
*/

// ============================================================================
//  META EXPORT
// ============================================================================
export const PulseWorldCoreMeta = Object.freeze({
  id: "PulseWorldCore-v16",
  version: "16.0.0",
  role: "world_perspective",
  mind: false,
  description: "IMMORTAL non-mind world perspective organ emitting RAW world signals only.",
  identity: {
    type: "organ",
    name: "PulseWorldCore",
    band: "world",
    mind: false
  }
});

// ============================================================================
//  CLASS — RAW-ONLY WORLD PERSPECTIVE
// ============================================================================
export class PulseWorldCore {
  constructor(config = {}) {
    this.config = {
      id: PulseWorldCoreMeta.id,
      ...config
    };

    // RAW-ONLY PROVIDERS (NON-MIND)
    this.mesh = config.mesh || null;
    this.castle = config.castle || null;
    this.server = config.server || null;
    this.expansion = config.expansion || null;
    this.earn = config.earn || null;
    this.routing = config.routing || null;
    this.presence = config.presence || null;
    this.metrics = config.metrics || null;

    this.logger = config.logger || console;
  }

  // ==========================================================================
  //  RAW WORLD SNAPSHOT (NO AI, NO INTERPRETATION)
  // ==========================================================================
  snapshotWorld() {
    const now = Date.now();

    const mesh = this._safeCall(this.mesh, "snapshot") || null;
    const castle = this._safeCall(this.castle, "snapshot") || null;
    const server = this._safeCall(this.server, "snapshot") || null;
    const expansion = this._safeCall(this.expansion, "snapshot") || null;
    const earn = this._safeCall(this.earn, "snapshot") || null;
    const routing = this._safeCall(this.routing, "snapshot") || null;
    const presence = this._safeCall(this.presence, "snapshot") || null;
    const metrics = this._safeCall(this.metrics, "snapshot") || null;

    const worldSnapshot = {
      ts: now,
      meta: {
        id: this.config.id,
        version: PulseWorldCoreMeta.version
      },
      mesh,
      castle,
      server,
      expansion,
      earn,
      routing,
      presence,
      metrics
    };

    this._log("worldcore:snapshot", { worldSnapshot });
    return worldSnapshot;
  }

  // ==========================================================================
  //  ADVANTAGE CONTEXT (STRUCTURAL SELECTION ONLY — NO AI)
  // ==========================================================================
  buildAdvantageContext() {
    const snap = this.snapshotWorld();

    const advantageContext = {
      ts: snap.ts,
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

      // FULL RAW SNAPSHOT PRESERVED FOR EVIDENCE
      raw: snap
    };

    this._log("worldcore:advantage-context", { advantageContext });
    return advantageContext;
  }

  // ==========================================================================
  //  RAW WORLD EVENT (IMMUTABLE)
  // ==========================================================================
  recordWorldEvent(event) {
    const payload = {
      ts: Date.now(),
      event
    };

    this._log("worldcore:event", payload);
    return payload;
  }

  // ==========================================================================
  //  INTERNAL RAW HELPERS (NO AI)
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
    snapshotWorld: () => core.snapshotWorld(),
    buildAdvantageContext: () => core.buildAdvantageContext(),
    recordWorldEvent: (event) => core.recordWorldEvent(event)
  });
}

export const pulseWorldCore = new PulseWorldCore();
