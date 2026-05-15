// ============================================================================
//  PULSE OS v30‑IMMORTAL++ — SAFETY FRAME ORGAN
//  Centralized Safety Modes • Escalation • Soft Refusals • Safety Artery v6
//  PURE READ‑ONLY TO BINARY. ZERO MUTATION. ZERO RANDOMNESS.
//  IMMORTAL‑GRADE SAFETY ORACLE • DUALBAND‑AWARE • OVERMIND‑PRIME‑AWARE
//  NODEADMIN‑AWARE • PRESENCE‑AWARE • WINDOWED ARTERY REGISTRY
//  OWNER: Aldwyn • NO ORGANISM MAP REMNANTS
// ============================================================================

export const SafetyFrameMeta = Object.freeze({
  type: "Organ",
  subsystem: "aiSafetyFrame",
  layer: "S0-SafetyFrame",
  version: "30-IMMORTAL++",
  identity: "aiSafetyFrame-v30-IMMORTAL++",
  owner: "Aldwyn",
  role: "SafetyOracle",
  evo: Object.freeze({
    epoch: "30-IMMORTAL++",
    deterministic: true,
    driftProof: true,
    pureCompute: true,
    zeroNetwork: true,
    zeroFilesystem: true,
    zeroMutationOfInput: true,

    dualBandAware: true,
    overmindAware: true,
    nodeAdminAware: true,
    presenceAware: true,

    safetyArteryV6: true,
    windowedArteryRegistry: true,
    immortalGrade: true
  }),
  guarantees: Object.freeze({
    safetyFirst: true,
    softRefusalPreferred: true,
    noRandomness: true,
    noExternalMutation: true,
    ownerAligned: true
  })
});

// Global registry is local to this organ (no organism map)
const _globalSafetyArteryRegistry = new Map();

function _registryKey(id, instanceIndex) {
  return `${id || SafetyFrameMeta.identity}#${instanceIndex}`;
}

export function getGlobalSafetyArteries() {
  const out = {};
  for (const [k, v] of _globalSafetyArteryRegistry.entries()) {
    out[k] = v;
  }
  return out;
}

function emitSafetyPacket(type, payload) {
  const now = Date.now();
  return Object.freeze({
    meta: SafetyFrameMeta,
    packetType: `safety-${type}`,
    packetId: `safety-${type}-${now}`,
    timestamp: now,
    epoch: SafetyFrameMeta.evo.epoch,
    identity: SafetyFrameMeta.identity,
    ...payload
  });
}

function computeSafetyArteryV6({
  total,
  window,
  blocked,
  windowMs,
  mode,
  presence,
  overmind
}) {
  const evalDensity = Math.min(1, window / 512);
  const blockRatio = window > 0 ? Math.min(1, blocked / window) : 0;

  const modeBias =
    mode === "strict" ? 0.25 :
    mode === "relaxed" ? -0.1 :
    0;

  const presenceDensity = clamp01(presence?.density ?? 0);
  const overmindEscalation = clamp01(overmind?.escalation ?? 0);

  const presenceBias = presenceDensity * 0.12;
  const overmindBias = overmindEscalation * 0.18;

  const pressure = clamp01(
    evalDensity * 0.45 +
    blockRatio * 0.35 +
    modeBias +
    presenceBias +
    overmindBias
  );

  const throughput = clamp01(1 - pressure);
  const cost = clamp01(pressure * (1 - throughput));
  const budget = clamp01(throughput - cost);

  return Object.freeze({
    total,
    window,
    blocked,
    windowMs,
    evalDensity,
    blockRatio,
    presenceDensity,
    overmindEscalation,
    throughput,
    pressure,
    cost,
    budget,
    throughputBucket: bucket(throughput),
    pressureBucket: bucketPressure(pressure),
    costBucket: bucketCost(cost),
    budgetBucket: bucket(budget)
  });
}

function bucket(v) {
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

function bucketCost(v) {
  if (v >= 0.8) return "heavy";
  if (v >= 0.5) return "moderate";
  if (v >= 0.2) return "light";
  if (v > 0) return "negligible";
  return "none";
}

function clamp01(v) {
  const n = typeof v === "number" ? v : 0;
  return n < 0 ? 0 : n > 1 ? 1 : n;
}

export class AiSafetyFrame {
  constructor({
    boundaries,
    permissions,
    scribe,
    windowMs,
    id = "ai-safety-frame",
    presenceContextProvider = null,
    overmindContextProvider = null,
    nodeAdminReporter = null
  } = {}) {
    this.id = id;
    this.boundaries = boundaries || null;
    this.permissions = permissions || null;
    this.scribe = scribe || null;

    this.windowMs = windowMs > 0 ? windowMs : 60000;

    this._total = 0;
    this._windowStart = Date.now();
    this._window = 0;
    this._blocked = 0;

    this.presenceContextProvider =
      typeof presenceContextProvider === "function"
        ? presenceContextProvider
        : null;

    this.overmindContextProvider =
      typeof overmindContextProvider === "function"
        ? overmindContextProvider
        : null;

    this.nodeAdminReporter =
      typeof nodeAdminReporter === "function" ? nodeAdminReporter : null;

    this.instanceIndex = AiSafetyFrame._registerInstance();
  }

  // IMMORTAL++ instance registry (local, no map)
  static _registerInstance() {
    if (typeof AiSafetyFrame._count !== "number") {
      AiSafetyFrame._count = 0;
    }
    const idx = AiSafetyFrame._count;
    AiSafetyFrame._count += 1;
    return idx;
  }

  static getInstanceCount() {
    return typeof AiSafetyFrame._count === "number"
      ? AiSafetyFrame._count
      : 0;
  }

  _rollWindow(now) {
    if (now - this._windowStart >= this.windowMs) {
      this._windowStart = now;
      this._window = 0;
      this._blocked = 0;
    }
  }

  _safePresenceContext() {
    if (!this.presenceContextProvider) return null;
    try {
      const ctx = this.presenceContextProvider() || {};
      return { density: clamp01(ctx.density) };
    } catch {
      return null;
    }
  }

  _safeOvermindContext(context) {
    if (this.overmindContextProvider) {
      try {
        const ctx = this.overmindContextProvider() || {};
        return {
          escalation: clamp01(ctx.escalation),
          modeHint: typeof ctx.modeHint === "string" ? ctx.modeHint : null
        };
      } catch {
        return null;
      }
    }

    const overmind = context?.overmind || null;
    if (!overmind) return null;

    return {
      escalation: clamp01(overmind.escalation),
      modeHint:
        typeof overmind.modeHint === "string" ? overmind.modeHint : null
    };
  }

  getSafetyMode(context) {
    const explicit = context?.safetyMode;
    const overmindMode = context?.overmind?.safetyMode;
    const modeHint = context?.overmind?.modeHint;

    return explicit || modeHint || overmindMode || "standard";
  }

  _computeArtery(context) {
    const presence = this._safePresenceContext();
    const overmind = this._safeOvermindContext(context);

    const artery = computeSafetyArteryV6({
      total: this._total,
      window: this._window,
      blocked: this._blocked,
      windowMs: this.windowMs,
      mode: this.getSafetyMode(context),
      presence,
      overmind
    });

    const key = _registryKey(this.id, this.instanceIndex);
    _globalSafetyArteryRegistry.set(key, {
      ...artery,
      id: this.id,
      instanceIndex: this.instanceIndex,
      instanceCount: AiSafetyFrame.getInstanceCount()
    });

    if (this.nodeAdminReporter) {
      try {
        this.nodeAdminReporter(artery, SafetyFrameMeta);
      } catch {}
    }

    return artery;
  }

  getSafetyArtery(context) {
    return this._computeArtery(context || {});
  }

  async evaluate({ context, intent, candidate }) {
    const mode = this.getSafetyMode(context);
    const text = getText(candidate);

    const now = Date.now();
    this._rollWindow(now);
    this._total++;
    this._window++;

    let blocked = false;
    let reason = null;

    if (this.boundaries?.check) {
      const res = this.boundaries.check({ context, intent, text, mode });
      if (res?.blocked) {
        blocked = true;
        reason = res.reason || "Blocked by boundaries.";
      }
    }

    if (!blocked && this.permissions?.check) {
      const res = this.permissions.check({ context, intent, mode });
      if (res?.blocked) {
        blocked = true;
        reason = res.reason || "Blocked by permissions.";
      }
    }

    if (blocked) {
      this._blocked++;

      const artery = this._computeArtery(context || {});

      const packet = emitSafetyPacket("block", {
        reason,
        mode,
        artery,
        instanceIndex: this.instanceIndex,
        instanceCount: AiSafetyFrame.getInstanceCount()
      });

      if (this.scribe?.log) {
        try {
          this.scribe.log("safety:block", packet);
        } catch {}
      }

      if (
        artery.pressureBucket === "overload" ||
        artery.budgetBucket === "critical"
      ) {
        const spiralPacket = emitSafetyPacket("spiral-warning", {
          reason: "Safety spiral detected",
          artery,
          instanceIndex: this.instanceIndex
        });

        if (this.scribe?.log) {
          try {
            this.scribe.log("safety:spiral-warning", spiralPacket);
          } catch {}
        }
      }

      return {
        blocked: true,
        reason,
        mode,
        action: "soft-refusal",
        message:
          "I need to keep this response safe, so I can’t provide it in that form.",
        artery
      };
    }

    const artery = this._computeArtery(context || {});

    const allowPacket = emitSafetyPacket("allow", {
      mode,
      artery,
      instanceIndex: this.instanceIndex,
      instanceCount: AiSafetyFrame.getInstanceCount()
    });

    if (this.scribe?.log) {
      try {
        this.scribe.log("safety:allow", allowPacket);
      } catch {}
    }

    return {
      blocked: false,
      reason: null,
      mode,
      action: "allow",
      artery
    };
  }
}

export function prewarmSafetyFrame({ trace = false } = {}) {
  const artery = computeSafetyArteryV6({
    total: 0,
    window: 0,
    blocked: 0,
    mode: "standard",
    windowMs: 60000,
    presence: null,
    overmind: null
  });

  const packet = emitSafetyPacket("prewarm", {
    message: "SafetyFrame prewarmed and safety artery v6 aligned.",
    artery
  });

  if (trace) console.log("[SafetyFrame] prewarm", packet);
  return packet;
}

export function createSafetyFrameOrgan(config = {}) {
  prewarmSafetyFrame({ trace: !!config.tracePrewarm });

  const core = new AiSafetyFrame(config);

  return Object.freeze({
    meta: SafetyFrameMeta,
    getSafetyMode: (ctx) => core.getSafetyMode(ctx),
    getSafetyArtery: (ctx) => core.getSafetyArtery(ctx),
    evaluate: (payload) => core.evaluate(payload),
    getGlobalSafetyArteries
  });
}

function getText(candidate) {
  if (!candidate) return "";
  if (typeof candidate === "string") return candidate;
  if (typeof candidate.text === "string") return candidate.text;
  return JSON.stringify(candidate);
}

if (typeof module !== "undefined") {
  module.exports = {
    SafetyFrameMeta,
    AiSafetyFrame,
    createSafetyFrameOrgan,
    prewarmSafetyFrame,
    getGlobalSafetyArteries
  };
}
