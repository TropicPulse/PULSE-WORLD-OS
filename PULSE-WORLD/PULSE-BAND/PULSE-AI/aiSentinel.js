/**
 * aiSentinel.js — Pulse OS v12.3‑EVO+ Organ
 * ============================================================
 * ORGAN ROLE (CANONICAL):
 *   The Binary Sentinel is the organism’s **perimeter immune layer**.
 *
 *   It enforces the Prime Law:
 *       “THE ORGANISM MUST DEFEND ITS PERIMETER.”
 *
 *   It performs:
 *     - external threat detection
 *     - environmental anomaly scanning
 *     - hostile pattern recognition
 *     - perimeter-level packet filtering
 *     - early-warning alerts
 *     - binary immune artery metrics v3 (throughput, pressure, cost, budget)
 *     - multi-instance harmony + spiral warnings (non-blocking)
 *
 * ARCHITECTURAL POSITION:
 *   Layer: Binary Immune System (BIS)
 *   Band: Binary (primary), Symbolic (optional trace)
 *   Mode: Read‑only scanning + binary anomaly emission
 *
 *   This organ is NOT:
 *     - internal immunity
 *     - a reflex engine
 *     - a pipeline
 *     - a cortex
 *
 *   This organ IS:
 *     - a perimeter scanner
 *     - a threat detector
 *     - a hostile-pattern filter
 *     - a binary sentinel
 *     - an immune artery pressure source
 *
 * ORGAN CONTRACT (v12.3‑EVO+):
 *   - Must never mutate external organs
 *   - Must never generate symbolic state
 *   - Must only emit binary packets
 *   - Must remain deterministic
 *   - Must treat all inputs as untrusted
 *   - Must not block the organism
 */
import { OrganismIdentity } from "../PULSE-X/PulseWorldOrganismMap-v21.js";

const Identity = OrganismIdentity(import.meta.url);

// or: const Identity = OrganismIdentity["pulse-ai/ai-v24.0-IMMORTAL"] if that's the key you chose

// ============================================================================
//  META BLOCK — v24.0 IMMORTAL (ORGANISM KERNEL)
//  (now backed by the Organism Map instead of hardcoded here)
// ============================================================================
export const SentinelMeta = Identity.OrganMeta;

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
//  SECURITY ARTERY HELPERS — v6 (IMMORTAL‑EVO++)
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

function bucketCost(v) {
  if (v >= 0.8) return "heavy";
  if (v >= 0.5) return "moderate";
  if (v >= 0.2) return "light";
  if (v > 0) return "negligible";
  return "none";
}

// IMMORTAL‑EVO++ security artery v6
function computeSecurityArteryV6({
  scanRatePerSec,
  alertRatePerSec,
  pulseHaltRatePerSec,
  avgThreatSeverity,
  avgBinaryLength,
  severeRatio,
  instanceCount
}) {
  const harmonicAlertRate =
    instanceCount > 0 ? alertRatePerSec / instanceCount : alertRatePerSec;
  const harmonicHaltRate =
    instanceCount > 0 ? pulseHaltRatePerSec / instanceCount : pulseHaltRatePerSec;

  const scanFactor = Math.min(1, scanRatePerSec / 512);
  const alertFactor = Math.min(1, harmonicAlertRate / 128);
  const haltFactor = Math.min(1, harmonicHaltRate / 32);
  const severityFactor = Math.min(1, avgThreatSeverity);
  const sizeFactor = Math.min(1, avgBinaryLength / 131072);
  const severeFactor = Math.min(1, severeRatio);

  const pressure = Math.min(
    1,
    (scanFactor + alertFactor + haltFactor + severityFactor + sizeFactor + severeFactor) / 6
  );

  const throughput = Math.max(
    0,
    Math.min(1, 1 - (alertFactor * 0.3 + haltFactor * 0.3 + severityFactor * 0.2 + severeFactor * 0.2))
  );

  const cost = Math.max(0, Math.min(1, pressure * (1 - throughput)));
  const budget = Math.max(0, Math.min(1, throughput - cost));

  return Object.freeze({
    scanRatePerSec,
    alertRatePerSec,
    pulseHaltRatePerSec,
    harmonicAlertRate,
    harmonicHaltRate,
    severeRatio,
    avgThreatSeverity,
    avgBinaryLength,
    throughput,
    pressure,
    cost,
    budget,
    throughputBucket: bucketLevel(throughput),
    pressureBucket: bucketPressure(pressure),
    costBucket: bucketCost(cost),
    budgetBucket: bucketLevel(budget)
  });
}

// ============================================================================
//  ORGAN IMPLEMENTATION — v16‑IMMORTAL‑EVO++
// ============================================================================
export class AISecuritySentinel {
  constructor(config = {}) {
    this.id = config.id || "ai-security-sentinel";
    this.encoder = config.encoder;
    this.immunity = config.immunity;

    this.logger = config.logger || null;
    this.pipeline = config.pipeline || null;
    this.reflex = config.reflex || null;

    // hooks: organism decides what to do with pulseHalt
    this.onPulseHalt = typeof config.onPulseHalt === "function"
      ? config.onPulseHalt
      : null;
    this.onIsolation = typeof config.onIsolation === "function"
      ? config.onIsolation
      : null;

    this.trace = !!config.trace;

    if (!this.encoder)
      throw new Error("AISecuritySentinel requires aiBinaryAgent encoder");
    if (!this.immunity)
      throw new Error("AISecuritySentinel requires aiBinaryImmunity");

    this.windowMs = config.windowMs > 0 ? config.windowMs : 60000;

    this._windowStart = Date.now();
    this._windowScans = 0;
    this._windowAlerts = 0;
    this._windowSevereAlerts = 0;
    this._windowPulseHalts = 0;
    this._windowSeveritySum = 0;
    this._windowBinaryLengthSum = 0;

    this._totalAlerts = 0;
    this._totalPulseHalts = 0;

    this.instanceIndex = AISecuritySentinel._registerInstance();
  }

  // STATIC INSTANCE REGISTRY
  static _registerInstance() {
    if (typeof AISecuritySentinel._instanceCount !== "number") {
      AISecuritySentinel._instanceCount = 0;
    }
    return AISecuritySentinel._instanceCount++;
  }

  static getInstanceCount() {
    return AISecuritySentinel._instanceCount || 0;
  }

  // WINDOW ROLLING
  _rollWindow(now) {
    if (now - this._windowStart >= this.windowMs) {
      this._windowStart = now;
      this._windowScans = 0;
      this._windowAlerts = 0;
      this._windowSevereAlerts = 0;
      this._windowPulseHalts = 0;
      this._windowSeveritySum = 0;
      this._windowBinaryLengthSum = 0;
    }
  }

  // ========================================================================
  //  SECURITY ARTERY SNAPSHOT — v6
  // ========================================================================
  _computeSecurityArterySnapshot(binaryLengthHint = 0, severityHint = 0) {
    const now = Date.now();
    this._rollWindow(now);

    const elapsedMs = Math.max(1, now - this._windowStart);
    const scanRatePerSec = (this._windowScans / elapsedMs) * 1000;
    const alertRatePerSec = (this._windowAlerts / elapsedMs) * 1000;
    const pulseHaltRatePerSec = (this._windowPulseHalts / elapsedMs) * 1000;

    const instanceCount = AISecuritySentinel.getInstanceCount();

    const avgThreatSeverity =
      this._windowAlerts > 0
        ? this._windowSeveritySum / this._windowAlerts
        : severityHint;

    const avgBinaryLength =
      this._windowAlerts > 0
        ? this._windowBinaryLengthSum / this._windowAlerts
        : binaryLengthHint;

    const severeRatio =
      this._windowAlerts > 0
        ? this._windowSevereAlerts / this._windowAlerts
        : 0;

    return computeSecurityArteryV6({
      scanRatePerSec,
      alertRatePerSec,
      pulseHaltRatePerSec,
      avgThreatSeverity,
      avgBinaryLength,
      severeRatio,
      instanceCount
    });
  }

  getSecurityArtery() {
    return this._computeSecurityArterySnapshot();
  }

  // ========================================================================
  //  THREAT + TRUST + RISK — deterministic
  // ========================================================================
  _detectThreat(binary) {
    if (typeof binary !== "string" || !/^[01]+$/.test(binary)) {
      return { threat: "non-binary-input", severity: 1.0, trust: 0.0 };
    }

    if (/00000000|11111111/.test(binary)) {
      return { threat: "repetition-attack", severity: 0.85, trust: 0.1 };
    }

    if (binary.length < 8) {
      return { threat: "probing-signal", severity: 0.4, trust: 0.4 };
    }

    if (binary.length > 120000) {
      return { threat: "flood-attack", severity: 0.95, trust: 0.05 };
    }

    const ones = binary.split("").filter((b) => b === "1").length;
    const ratio = ones / binary.length;

    if (ratio > 0.9 || ratio < 0.1) {
      return { threat: "entropy-anomaly", severity: 0.65, trust: 0.25 };
    }

    // default: low risk, high trust
    return { threat: null, severity: 0.0, trust: 0.9 };
  }

  _decideAction({ severity, trust }) {
    // deterministic policy:
    // severity high OR trust very low → pulse halt + isolation
    if (severity >= 0.85 || trust <= 0.1) {
      return { action: "pulse_halt", isolation: true };
    }

    // medium severity → isolation only
    if (severity >= 0.5 || trust <= 0.4) {
      return { action: "isolate", isolation: true };
    }

    // low severity, high trust → allow
    return { action: "allow", isolation: false };
  }

  // ========================================================================
  //  SECURITY PACKET GENERATION
  // ========================================================================
  _generateSecurityPacket({ threat, severity, trust, action, isolation, binaryLength }) {
    const artery = this._computeSecurityArterySnapshot(binaryLength, severity);

    const payload = {
      type: "binary-security-decision",
      timestamp: Date.now(),
      threat,
      severity,
      trust,
      action,
      isolation,
      artery
    };

    const json = JSON.stringify(payload);
    const bits = this.encoder.encode(json);

    const packet = {
      ...payload,
      bits,
      bitLength: bits.length
    };

    if (
      artery.pressureBucket === "overload" ||
      artery.budgetBucket === "critical"
    ) {
      this._trace("security:spiral-warning", {
        threat,
        severity,
        action,
        securityPressure: artery.pressure,
        securityBudgetBucket: artery.budgetBucket
      });
    }

    this._trace("security:decision", { threat, severity, trust, action, isolation });
    return packet;
  }

  // ========================================================================
  //  EVALUATE (pure decision, no side effects)
// ========================================================================
  evaluate(binary) {
    const now = Date.now();
    this._rollWindow(now);
    this._windowScans++;

    const { threat, severity, trust } = this._detectThreat(binary);

    if (!threat && severity === 0) {
      const artery = this._computeSecurityArterySnapshot(binary?.length || 0, 0);
      this._trace("security:safe", {
        size: binary?.length || 0,
        securityPressure: artery.pressure,
        securityBudgetBucket: artery.budgetBucket
      });

      return {
        threat: null,
        severity: 0,
        trust,
        action: "allow",
        isolation: false,
        artery
      };
    }

    this._windowAlerts++;
    this._windowSeveritySum += severity;
    this._windowBinaryLengthSum += binary.length;
    if (severity >= 0.7) this._windowSevereAlerts++;
    this._totalAlerts++;

    const { action, isolation } = this._decideAction({ severity, trust });

    if (action === "pulse_halt") {
      this._windowPulseHalts++;
      this._totalPulseHalts++;
    }

    const packet = this._generateSecurityPacket({
      threat,
      severity,
      trust,
      action,
      isolation,
      binaryLength: binary.length
    });

    return {
      threat,
      severity,
      trust,
      action,
      isolation,
      packet,
      artery: packet.artery
    };
  }

  // ========================================================================
  //  ENFORCE (side effects: pipeline/reflex/immunity/hooks)
// ========================================================================
  enforce(binary) {
    const decision = this.evaluate(binary);

    // emit binary packet to pipeline/reflex/logger
    if (decision.packet) {
      const bits = decision.packet.bits;
      if (this.pipeline) this.pipeline.run(bits);
      if (this.reflex) this.reflex.run(bits);
      if (this.logger)
        this.logger.logBinary(bits, {
          source: "security_sentinel",
          threat: decision.threat,
          action: decision.action
        });
    }

    // isolation path
    if (decision.isolation && this.onIsolation) {
      try {
        this.onIsolation({ binary, decision });
      } catch {
        // non-fatal
      }
    }

    // pulse halt path — organism decides what "stop pulse" means
    if (decision.action === "pulse_halt" && this.onPulseHalt) {
      try {
        this.onPulseHalt({ binary, decision });
      } catch {
        // non-fatal
      }
    }

    // immunity sanitization for any non-allow
    if (decision.action !== "allow") {
      this.immunity.sanitize(binary);
    }

    return decision;
  }

  // ========================================================================
  //  COMPAT: perimeter-style scan (returns boolean allow/deny)
// ========================================================================
  scan(binary) {
    const decision = this.enforce(binary);
    return decision.action === "allow";
  }

  // ========================================================================
  //  INTERNAL HELPERS
  // ========================================================================
  _trace(event, payload) {
    if (!this.trace) return;
    console.log(`[${this.id}#${this.instanceIndex}] ${event}`, payload);
  }
}

// ============================================================================
//  FACTORY — v16‑IMMORTAL‑EVO++
// ============================================================================
export function createAISecuritySentinel(config) {
  return new AISecuritySentinel(config);
}

// ============================================================================
//  DUAL‑MODE EXPORTS
// ============================================================================
if (typeof module !== "undefined") {
  module.exports = {
    SentinelMeta,
    AISecuritySentinel,
    createAISecuritySentinel,
    AI_EXPERIENCE_META,
    EXPORT_META
  };
}
