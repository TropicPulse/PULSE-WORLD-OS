// ============================================================================
//  PULSE OS v20-ImmortalPlus — TELEMETRY ORGAN (BLOODSTREAM)
//  Unified Metrics • Subsystem Heartbeats • Drift Detection
//  Mesh‑Aware Telemetry Propagation (Mini‑Pulse Distance Engine)
//  PURE NERVOUS‑SYSTEM ORGAN — NO BACKEND, NO DOM, NO GPU
//  v20‑ImmortalPlus‑BINARY‑MAX‑ABA + CACHE/CHUNK/PRESENCE ADVANTAGE
//    • Deterministic, drift‑proof, multi‑instance safe
//    • Unified advantage field (distance → advantageScore)
//    • Dual‑band A‑B‑A surfaces (band/binary/wave)
//    • Mesh‑pulse aware (hops/distance bounded)
//    • Read‑only experience meta for Overmind/World
// ============================================================================
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝

// 2 — EXPORT GENOME METADATA
export const PulseTelemetryExperienceMeta = Identity.OrganMeta;
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
// export const PULSE_EARN_IMMUNE_CONTEXT = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

import {
  PulseProofBridgeLogger as logger,
  PulseVersion,
  PulseRoles,
  PulseLineage
} from "../../PULSE-BAND/____BACKEND/PULSE-WORLD-BRIDGE.js";

// ============================================================================
// INTERNAL STATE — Telemetry Bloodstream (bounded, observational only)
// ============================================================================

const telemetryStream = [];
const MAX_STREAM_SIZE = 5000;

// Mini‑Pulse mesh settings
const MAX_HOPS = 5;
const DEFAULT_DISTANCE = 1;

let telemetryCycle = 0;

// ============================================================================
// A‑B‑A SURFACES — Band + Binary/Wave Fields + Advantage
// ============================================================================

function buildBand(distance) {
  if (distance == null) return "symbolic";
  return distance > 3 ? "binary" : "symbolic";
}

function buildBandSignature(band) {
  const raw = `TELEMETRY_BAND::${band}`;
  let acc = 0;
  for (let i = 0; i < raw.length; i++) {
    acc = (acc + raw.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `telemetry-band-${acc}`;
}

function buildBinaryField(distance) {
  const d = distance ?? DEFAULT_DISTANCE;
  const patternLen = 10 + d * 2;
  const density = patternLen + d * 3;
  const surface = density + patternLen;

  return {
    binaryPhenotypeSignature: `telemetry-binary-pheno-${surface % 99991}`,
    binarySurfaceSignature: `telemetry-binary-surface-${(surface * 7) % 99991}`,
    binarySurface: { patternLen, density, surface },
    parity: surface % 2 === 0 ? 0 : 1,
    shiftDepth: Math.max(0, Math.floor(Math.log2(surface || 1)))
  };
}

function buildWaveField(distance, band) {
  const d = distance ?? DEFAULT_DISTANCE;
  const amplitude = 6 + d * (band === "binary" ? 2 : 1);
  const wavelength = amplitude + 4;
  const phase = amplitude % 16;

  return {
    amplitude,
    wavelength,
    phase,
    band,
    mode: band === "binary" ? "compression-wave" : "symbolic-wave"
  };
}

function buildTelemetryCycleSignature() {
  return `telemetry-cycle-${(telemetryCycle * 7919) % 99991}`;
}

// IMMORTAL advantage field: distance → 0–1 advantageScore (closer = higher)
function buildAdvantageField(distance) {
  const d = distance ?? DEFAULT_DISTANCE;

  const clamped = Math.max(0, Math.min(MAX_HOPS, d));
  const advantageScore = Math.max(0, Math.min(1, 1 - clamped / MAX_HOPS));

  let distanceBand = "near";
  if (clamped >= 4) distanceBand = "far";
  else if (clamped >= 2) distanceBand = "mid";

  return {
    distance,
    distanceBand,
    advantageScore,
    advantageSignature: `telemetry-adv-${Math.round(advantageScore * 1000)}`
  };
}

// ============================================================================
// EMIT TELEMETRY — Universal signal emitter (v20‑ImmortalPlus A‑B‑A)
// ============================================================================

export function emitTelemetry(subsystem, event, data = {}) {
  try {
    telemetryCycle++;

    const baseDistance = data.distance ?? DEFAULT_DISTANCE;
    const band = buildBand(baseDistance);
    const bandSignature = buildBandSignature(band);
    const binaryField = buildBinaryField(baseDistance);
    const waveField = buildWaveField(baseDistance, band);
    const telemetryCycleSignature = buildTelemetryCycleSignature();
    const advantageField = buildAdvantageField(baseDistance);

    const packet = logger.makeTelemetryPacket(subsystem, event, {
      ...data,
      lineage: PulseLineage[subsystem],
      hops: 0,
      distance: baseDistance,
      band,
      bandSignature,
      binaryField,
      waveField,
      telemetryCycleSignature,
      advantageField,
      meta: {
        layer: PulseRole.layer,
        version: PulseRole.version,
        subsystem,
        event,
        experienceMeta: PulseTelemetryExperienceMeta
      }
    });

    telemetryStream.push(packet);
    if (telemetryStream.length > MAX_STREAM_SIZE) telemetryStream.shift();

    broadcastTelemetry(packet);

    return packet;
  } catch (err) {
    logger.error("telemetry", "emit_failed", { error: String(err) });
    return null;
  }
}

// ============================================================================
// MINI‑PULSE BROADCAST — Mesh‑safe propagation (v20‑ImmortalPlus)
// ============================================================================

export function broadcastTelemetry(packet) {
  try {
    if (!packet || typeof packet !== "object") return;
    if (packet.hops >= MAX_HOPS) return;

    const amplified = amplifyPulse(packet);

    logger.log("telemetry", "broadcast", {
      subsystem: amplified.subsystem,
      hops: amplified.hops,
      distance: amplified.distance,
      band: amplified.band
    });
  } catch (err) {
    logger.error("telemetry", "broadcast_failed", { error: String(err) });
  }
}

// ============================================================================
// MINI‑PULSE AMPLIFIER — Increase distance + hop count (v20‑ImmortalPlus)
// ============================================================================

export function amplifyPulse(packet) {
  const nextHops = (packet.hops ?? 0) + 1;
  const nextDistance = (packet.distance ?? DEFAULT_DISTANCE) + 1;

  const band = buildBand(nextDistance);
  const bandSignature = buildBandSignature(band);
  const binaryField = buildBinaryField(nextDistance);
  const waveField = buildWaveField(nextDistance, band);
  const advantageField = buildAdvantageField(nextDistance);

  return {
    ...packet,
    hops: nextHops,
    distance: nextDistance,
    band,
    bandSignature,
    binaryField,
    waveField,
    advantageField
  };
}

// ============================================================================
// RECEIVE MESH PULSE — Accept telemetry from other nodes (v20‑ImmortalPlus)
// ============================================================================

export function receiveMeshPulse(packet) {
  try {
    if (!packet || typeof packet !== "object") return;
    if (packet.hops >= MAX_HOPS) return;

    telemetryStream.push(packet);
    if (telemetryStream.length > MAX_STREAM_SIZE) telemetryStream.shift();

    broadcastTelemetry(packet);
  } catch (err) {
    logger.error("telemetry", "mesh_receive_failed", { error: String(err) });
  }
}

// ============================================================================
// HEARTBEAT — Subsystem periodic pulse (v20‑ImmortalPlus)
// ============================================================================

export function heartbeat(subsystem, extra = {}) {
  return emitTelemetry(subsystem, "heartbeat", {
    version: PulseVersion[subsystem],
    role: PulseRoles[subsystem],
    ...extra
  });
}

// ============================================================================
// DRIFT DETECTION (v20‑ImmortalPlus)
// ============================================================================

export function detectDrift(subsystem, expectedVersion) {
  const actual = PulseVersion[subsystem];
  if (actual !== expectedVersion) {
    return emitTelemetry(subsystem, "version-drift", {
      expected: expectedVersion,
      actual
    });
  }
  return null;
}

// ============================================================================
// ANOMALY (v20‑ImmortalPlus)
// ============================================================================

export function anomaly(subsystem, description, details = {}) {
  return emitTelemetry(subsystem, "anomaly", {
    description,
    ...details
  });
}

// ============================================================================
// PERFORMANCE METRICS (v20‑ImmortalPlus)
// ============================================================================

export function metric(subsystem, name, value, extra = {}) {
  return emitTelemetry(subsystem, "metric", {
    name,
    value,
    ...extra
  });
}

// ============================================================================
// STREAM ACCESS (v20‑ImmortalPlus)
// ============================================================================

export function getStream(limit = 500) {
  if (limit <= 0) return [...telemetryStream];
  return telemetryStream.slice(-limit);
}

// Optional: compact snapshot for quick debug
export function getTelemetryStreamSnapshot() {
  return telemetryStream.slice(-256);
}

// ============================================================================
// SNAPSHOT (v20‑ImmortalPlus)
// ============================================================================

export function getTelemetrySnapshot() {
  const latest = telemetryStream.slice(-200);
  const bySubsystem = {};

  latest.forEach((p) => {
    if (!bySubsystem[p.subsystem]) bySubsystem[p.subsystem] = [];
    bySubsystem[p.subsystem].push(p);
  });

  return {
    ts: Date.now(), // local telemetry time is OK (sensor-only)
    totalPackets: telemetryStream.length,
    recentPackets: latest.length,
    bySubsystem,
    meta: {
      layer: PulseRole.layer,
      version: PulseRole.version,
      experienceMeta: PulseTelemetryExperienceMeta
    }
  };
}

// ============================================================================
// EXPORTS — Telemetry Organ API (v20‑ImmortalPlus BINARY‑MAX‑ABA)
// ============================================================================

export const PulseTelemetry = {
  emit: emitTelemetry,
  heartbeat,
  detectDrift,
  anomaly,
  metric,
  getStream,
  getTelemetrySnapshot,
  getTelemetryStreamSnapshot,
  broadcastTelemetry,
  receiveMeshPulse,
  amplifyPulse,
  meta: {
    layer: PulseRole.layer,
    version: PulseRole.version,
    experienceMeta: PulseTelemetryExperienceMeta
  },
  PulseRole
};
