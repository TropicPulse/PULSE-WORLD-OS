// ============================================================================
// FILE: PulseWorldBinarySubstrate-v24-IMMORTAL-INTEL.js
// ROOT:  PULSE-X
// LAYER: WorldBinary / BinarySubstrate / ThroughputFabric
// ----------------------------------------------------------------------------
// ROLE (WORLD-FIRST, FULL REWRITE v24++):
//   • This is the v24-IMMORTAL-INTEL++ Binary Substrate for PULSE-X.
//   • It replaces v20 while preserving the *spirit* (frames as nerves) but
//     upgrades the entire model to world-level, device-aware, throughput-class
//     binary substrate.
//
//   • It is NOT just a packer/unpacker anymore.
//   • It is a:
//       - Binary frame engine,
//       - World-aware substrate node,
//       - Device-aware throughput fabric endpoint,
//       - Advantage / band / presence / pulseTouch carrier,
//       - IMMORTAL-INTEL dual-signature surface.
//
//   • It supports:
//       - SNAPSHOT
//       - DELTA
//       - DEPLOYMENT_PLAN
//       - MULTI_PLAN
//       - EXECUTION_RESULT
//
//   • And adds v24++ surfaces:
//       - advantageScore / advantageTier
//       - throughputClass / throughputScore
//       - bandBinaryWave hints (density, amplitude)
//       - worldWaveIndex / substrateLaneId / substratePhaseIndex
//       - deviceProfile hints (laneAggression, burstAggression)
//       - dual-hash INTEL signatures
//       - frameProfile v24 (IMMORTAL-INTEL)
//
// ----------------------------------------------------------------------------
// PHILOSOPHY:
//   • Symbolic-first, binary-backed, substrate-aware.
//   • Frames are still “nerves” of the organism, but now they are:
//       - world-aware,
//       - device-aware,
//       - throughput-aware,
//       - advantage-aware,
//       - bandBinaryWave-aware.
//   • No guessing: fixed field order, explicit tags, explicit bands, explicit
//     substrate hints.
//   • Backward-safe at the *contract* level: v20 frames can be handled by a
//     compatibility shim (not included here), but v24 frames are richer and
//     world-aware.
//
// ----------------------------------------------------------------------------
// SAFETY CONTRACT (IMMORTAL v24-INTEL):
//   • Pure compute, no IO, no network, no randomness, no async.
//   • No mutation of input buffers.
//   • Deterministic: same input → same output.
//   • Drift-proof: all frames carry self-describing frameProfile + signatures.
//   • No direct hardware calls; deviceProfile is metadata-only.
// ============================================================================
import {
  OrganismIdentity,
  buildPulseOrganismMap as PulseOrganismMap
} from "./PULSE-WORLD-MAP.js";
const Identity = OrganismIdentity(import.meta.url);

// 2 — EXPORT GENOME METADATA
export const BinarySubstrateV24Meta = Identity.OrganMeta;
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
// export const WBC_CONTEXT = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

// ============================================================================
// BINARY PAYLOAD TYPES (v24)
// ============================================================================

export const BinaryPayloadType = Object.freeze({
  SNAPSHOT: 1,
  DELTA: 2,
  DEPLOYMENT_PLAN: 3,
  MULTI_PLAN: 4,
  EXECUTION_RESULT: 5
});

const PayloadTypeReverse = Object.freeze({
  1: "SNAPSHOT",
  2: "DELTA",
  3: "DEPLOYMENT_PLAN",
  4: "MULTI_PLAN",
  5: "EXECUTION_RESULT"
});

// ============================================================================
// LOW-LEVEL ENCODING HELPERS (fixed-width length prefix, LE)
// ============================================================================

function writeUint8(view, offset, value) {
  view.setUint8(offset, value & 0xff);
  return offset + 1;
}

function readUint8(view, offset) {
  return [view.getUint8(offset), offset + 1];
}

function encodeString(str) {
  const s = String(str ?? "");
  const utf8 = new TextEncoder().encode(s);
  const len = utf8.length;

  const buf = new ArrayBuffer(4 + len);
  const view = new DataView(buf);

  view.setUint32(0, len, true);
  new Uint8Array(buf, 4).set(utf8);

  return new Uint8Array(buf);
}

function decodeString(view, offset) {
  if (offset + 4 > view.byteLength) return ["", offset];
  const len = view.getUint32(offset, true);
  const start = offset + 4;
  const end = start + len;
  if (end > view.byteLength) return ["", end];

  const slice = new Uint8Array(view.buffer, view.byteOffset + start, len);
  const str = new TextDecoder().decode(slice);

  return [str, end];
}

// ============================================================================
// INTEL / HASH HELPERS (v24 IMMORTAL-INTEL)
// ============================================================================

function computeHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `h${h}`;
}

function computeHashIntelligence(payload) {
  const base = JSON.stringify(payload || "");
  let h = 0;
  for (let i = 0; i < base.length; i++) {
    const c = base.charCodeAt(i);
    h = (h * 131 + c * (i + 7)) % 1000000007;
  }
  return `HINTEL_${h}`;
}

function buildDualHashSignature(label, intelPayload, classicString) {
  const intelBase = {
    label,
    intel: intelPayload || {},
    classic: classicString || ""
  };
  const intelHash = computeHashIntelligence(intelBase);
  const classicHash = computeHash(`${label}::${classicString || ""}`);
  return {
    intel: intelHash,
    classic: classicHash
  };
}

function clamp01(v) {
  const n = Number(v);
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, Math.min(1, n));
}

function safeNumber(v, fallback = 0) {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

// ============================================================================
// FRAME PROFILE v24 (IMMORTAL-INTEL)
// ----------------------------------------------------------------------------
// This replaces the simple v20 frameProfile with a richer v24 version:
//
//   frameProfile = {
//     tag,                 // SNAPSHOT / DELTA / ...
//     band,                // symbolic | binary | dual
//     size,                // actual byte length
//     payloadType,         // numeric payload type
//     advantageTier,       // 0..3
//     advantageScore,      // 0..1
//     throughputClass,     // throughput_extreme | high | normal | low
//     throughputScore,     // 0..1
//     worldWaveIndex,      // optional, from world scheduler
//     substrateLaneId,     // optional, from world substrate
//     substratePhaseIndex, // optional, from world substrate
//     binaryDensity,       // optional, from bandBinaryWave
//     waveAmplitude,       // optional, from bandBinaryWave
//     signatures: {        // dual-hash INTEL signatures
//       intel,
//       classic
//     }
//   }
// ============================================================================

export function computeFrameProfileV24({
  tag,
  band,
  size,
  payloadType,
  advantageTier = 0,
  advantageScore = 0,
  throughputClass = "throughput_low",
  throughputScore = 0,
  worldWaveIndex = null,
  substrateLaneId = null,
  substratePhaseIndex = null,
  binaryDensity = 0,
  waveAmplitude = 0
}) {
  const intelPayload = {
    tag,
    band,
    size,
    payloadType,
    advantageTier,
    advantageScore,
    throughputClass,
    throughputScore,
    worldWaveIndex,
    substrateLaneId,
    substratePhaseIndex,
    binaryDensity,
    waveAmplitude
  };

  const classicString =
    `FRAME_v24::${tag}` +
    `::B:${band}` +
    `::PT:${payloadType}` +
    `::AT:${advantageTier}` +
    `::TC:${throughputClass}`;

  const sig = buildDualHashSignature(
    "BINARY_SUBSTRATE_FRAME_v24",
    intelPayload,
    classicString
  );

  return {
    tag,
    band,
    size,
    payloadType,
    advantageTier,
    advantageScore,
    throughputClass,
    throughputScore,
    worldWaveIndex,
    substrateLaneId,
    substratePhaseIndex,
    binaryDensity,
    waveAmplitude,
    signatures: {
      intel: sig.intel,
      classic: sig.classic
    }
  };
}

// ============================================================================
// SNAPSHOT PACKER (v24, world-aware, device-aware, advantage-aware)
// ----------------------------------------------------------------------------
// snapshot = {
//   snapshotId,
//   instanceId,
//   lineageRootId,
//   logicalClock,
//   regionId,
//   hostName,
//   configVersion,
//   role,
//   mode,
//   healthFlags,
//   meta,
//   presence,
//   page,
//   chunkProfile,
//   identity,
//   trusted,
//   advantage,          // legacy string
//   band,               // "symbolic" | "binary" | "dual"
//   pulseTouch,         // { ... }
//
//   // v24+ surfaces (optional):
//   advantageTier,      // 0..3
//   advantageScore,     // 0..1
//   throughputClass,    // "throughput_extreme" | "high" | "normal" | "low"
//   throughputScore,    // 0..1
//   worldWaveIndex,     // from world scheduler
//   substrateLaneId,    // from world substrate
//   substratePhaseIndex,// from world substrate
//   binaryDensity,      // from bandBinaryWave
//   waveAmplitude       // from bandBinaryWave
// }
// ============================================================================

export function packSnapshotV24(snapshot) {
  const {
    snapshotId = "",
    instanceId = "",
    lineageRootId = "",
    logicalClock = "",
    regionId = "",
    hostName = "",
    configVersion = "",
    role = "",
    mode = "",
    healthFlags = {},
    meta = {},
    presence = "",
    page = "",
    chunkProfile = "",
    identity = "",
    trusted = "",
    advantage = "",
    band = "dual",
    pulseTouch = {},

    advantageTier = 0,
    advantageScore = 0,
    throughputClass = "throughput_low",
    throughputScore = 0,
    worldWaveIndex = null,
    substrateLaneId = null,
    substratePhaseIndex = null,
    binaryDensity = 0,
    waveAmplitude = 0
  } = snapshot || {};

  const healthFlagsStr = JSON.stringify(healthFlags || {});
  const metaStr = JSON.stringify(meta || {});
  const touchMetaStr = JSON.stringify(pulseTouch || {});

  // We build the frameProfile AFTER we know the size, so we first pack
  // without frameProfile, then compute size, then repack with frameProfile.
  // To keep it simple and deterministic, we do a two-pass approach.

  const baseFields = [
    snapshotId,
    instanceId,
    lineageRootId,
    String(logicalClock),
    regionId,
    hostName,
    configVersion,
    role,
    mode,
    healthFlagsStr,
    metaStr,
    presence,
    page,
    chunkProfile,
    identity,
    trusted,
    advantage,
    band,
    touchMetaStr
    // frameProfileStr will be appended after we compute it
  ];

  const encodedBase = baseFields.map(encodeString);
  const baseSize = 1 + encodedBase.reduce((s, f) => s + f.length, 0);

  const payloadType = BinaryPayloadType.SNAPSHOT;
  const frameProfile = computeFrameProfileV24({
    tag: "SNAPSHOT",
    band,
    size: baseSize, // approximate; final size will be slightly larger
    payloadType,
    advantageTier,
    advantageScore,
    throughputClass,
    throughputScore,
    worldWaveIndex,
    substrateLaneId,
    substratePhaseIndex,
    binaryDensity,
    waveAmplitude
  });

  const frameProfileStr = JSON.stringify(frameProfile);

  const fields = [...baseFields, frameProfileStr];
  const encoded = fields.map(encodeString);
  const totalSize = 1 + encoded.reduce((s, f) => s + f.length, 0);

  const buf = new ArrayBuffer(totalSize);
  const view = new DataView(buf);
  let o = 0;

  o = writeUint8(view, o, payloadType);

  for (const ef of encoded) {
    new Uint8Array(buf, o).set(ef);
    o += ef.length;
  }

  return new Uint8Array(buf);
}

// ============================================================================
// DELTA PACKER (v24)
// ----------------------------------------------------------------------------
// delta = {
//   instanceId,
//   snapshotBeforeId,
//   snapshotAfterId,
//   changes,
//   pulseTouch,
//   band,
//
//   // v24+ surfaces:
//   advantageTier,
//   advantageScore,
//   throughputClass,
//   throughputScore,
//   worldWaveIndex,
//   substrateLaneId,
//   substratePhaseIndex,
//   binaryDensity,
//   waveAmplitude
// }
// ============================================================================

export function packDeltaV24(delta) {
  const {
    instanceId = "",
    snapshotBeforeId = "",
    snapshotAfterId = "",
    changes = {},
    pulseTouch = {},
    band = "dual",

    advantageTier = 0,
    advantageScore = 0,
    throughputClass = "throughput_low",
    throughputScore = 0,
    worldWaveIndex = null,
    substrateLaneId = null,
    substratePhaseIndex = null,
    binaryDensity = 0,
    waveAmplitude = 0
  } = delta || {};

  const changesStr = JSON.stringify(changes || {});
  const touchMetaStr = JSON.stringify(pulseTouch || {});

  const baseFields = [
    instanceId,
    snapshotBeforeId,
    snapshotAfterId,
    changesStr,
    touchMetaStr,
    band
    // frameProfileStr appended after
  ];

  const encodedBase = baseFields.map(encodeString);
  const baseSize = 1 + encodedBase.reduce((s, f) => s + f.length, 0);

  const payloadType = BinaryPayloadType.DELTA;
  const frameProfile = computeFrameProfileV24({
    tag: "DELTA",
    band,
    size: baseSize,
    payloadType,
    advantageTier,
    advantageScore,
    throughputClass,
    throughputScore,
    worldWaveIndex,
    substrateLaneId,
    substratePhaseIndex,
    binaryDensity,
    waveAmplitude
  });

  const frameProfileStr = JSON.stringify(frameProfile);

  const fields = [...baseFields, frameProfileStr];
  const encoded = fields.map(encodeString);
  const totalSize = 1 + encoded.reduce((s, f) => s + f.length, 0);

  const buf = new ArrayBuffer(totalSize);
  const view = new DataView(buf);
  let o = 0;

  o = writeUint8(view, o, payloadType);

  for (const ef of encoded) {
    new Uint8Array(buf, o).set(ef);
    o += ef.length;
  }

  return new Uint8Array(buf);
}

// ============================================================================
// DEPLOYMENT PLAN PACKER (v24)
// ----------------------------------------------------------------------------
// plan = {
//   instanceId,
//   actions: [{ type, regionId, hostName, patch, meta }],
//   pulseTouch,
//   band,
//
//   // v24+ surfaces:
//   advantageTier,
//   advantageScore,
//   throughputClass,
//   throughputScore,
//   worldWaveIndex,
//   substrateLaneId,
//   substratePhaseIndex,
//   binaryDensity,
//   waveAmplitude
// }
// ============================================================================

export function packDeploymentPlanV24(plan) {
  const {
    instanceId = "",
    actions = [],
    pulseTouch = {},
    band = "symbolic",

    advantageTier = 0,
    advantageScore = 0,
    throughputClass = "throughput_low",
    throughputScore = 0,
    worldWaveIndex = null,
    substrateLaneId = null,
    substratePhaseIndex = null,
    binaryDensity = 0,
    waveAmplitude = 0
  } = plan || {};

  const actionsStr = JSON.stringify(
    (actions || []).map((a) => ({
      t: a.type,
      r: a.regionId || "",
      h: a.hostName || "",
      p: a.patch || null,
      m: a.meta || null
    }))
  );

  const touchMetaStr = JSON.stringify(pulseTouch || {});

  const baseFields = [
    instanceId,
    actionsStr,
    touchMetaStr,
    band
    // frameProfileStr appended after
  ];

  const encodedBase = baseFields.map(encodeString);
  const baseSize = 1 + encodedBase.reduce((s, f) => s + f.length, 0);

  const payloadType = BinaryPayloadType.DEPLOYMENT_PLAN;
  const frameProfile = computeFrameProfileV24({
    tag: "DEPLOYMENT_PLAN",
    band,
    size: baseSize,
    payloadType,
    advantageTier,
    advantageScore,
    throughputClass,
    throughputScore,
    worldWaveIndex,
    substrateLaneId,
    substratePhaseIndex,
    binaryDensity,
    waveAmplitude
  });

  const frameProfileStr = JSON.stringify(frameProfile);

  const fields = [...baseFields, frameProfileStr];
  const encoded = fields.map(encodeString);
  const totalSize = 1 + encoded.reduce((s, f) => s + f.length, 0);

  const buf = new ArrayBuffer(totalSize);
  const view = new DataView(buf);
  let o = 0;

  o = writeUint8(view, o, payloadType);

  for (const ef of encoded) {
    new Uint8Array(buf, o).set(ef);
    o += ef.length;
  }

  return new Uint8Array(buf);
}

// ============================================================================
// MULTI-ORGANISM PLAN PACKER (v24)
// ----------------------------------------------------------------------------
// multiPlan = {
//   instances: [{
//     instanceId,
//     deploymentPlan: { actions: [...] },
//     pulseTouch,
//     band
//   }],
//   band,
//
//   // v24+ surfaces:
//   advantageTier,
//   advantageScore,
//   throughputClass,
//   throughputScore,
//   worldWaveIndex,
//   substrateLaneId,
//   substratePhaseIndex,
//   binaryDensity,
//   waveAmplitude
// }
// ============================================================================

export function packMultiOrganismPlanV24(multiPlan, defaultBand = "symbolic") {
  const band = multiPlan.band || defaultBand || "symbolic";

  const {
    advantageTier = 0,
    advantageScore = 0,
    throughputClass = "throughput_low",
    throughputScore = 0,
    worldWaveIndex = null,
    substrateLaneId = null,
    substratePhaseIndex = null,
    binaryDensity = 0,
    waveAmplitude = 0
  } = multiPlan || {};

  const instancesPayload = (multiPlan.instances || []).map((bundle) => ({
    id: bundle.instanceId,
    plan: (bundle.deploymentPlan?.actions || []).map((a) => ({
      t: a.type,
      r: a.regionId || "",
      h: a.hostName || "",
      p: a.patch || null,
      m: a.meta || null
    })),
    touch: bundle.pulseTouch || bundle.touch || null,
    band: bundle.band || band
  }));

  const baseFields = [
    JSON.stringify(instancesPayload),
    band
    // frameProfileStr appended after
  ];

  const encodedBase = baseFields.map(encodeString);
  const baseSize = 1 + encodedBase.reduce((s, f) => s + f.length, 0);

  const payloadType = BinaryPayloadType.MULTI_PLAN;
  const frameProfile = computeFrameProfileV24({
    tag: "MULTI_PLAN",
    band,
    size: baseSize,
    payloadType,
    advantageTier,
    advantageScore,
    throughputClass,
    throughputScore,
    worldWaveIndex,
    substrateLaneId,
    substratePhaseIndex,
    binaryDensity,
    waveAmplitude
  });

  const frameProfileStr = JSON.stringify(frameProfile);

  const fields = [...baseFields, frameProfileStr];
  const encoded = fields.map(encodeString);
  const totalSize = 1 + encoded.reduce((s, f) => s + f.length, 0);

  const buf = new ArrayBuffer(totalSize);
  const view = new DataView(buf);
  let o = 0;

  o = writeUint8(view, o, payloadType);

  for (const ef of encoded) {
    new Uint8Array(buf, o).set(ef);
    o += ef.length;
  }

  return new Uint8Array(buf);
}

// ============================================================================
// EXECUTION RESULT PACKER (v24)
// ----------------------------------------------------------------------------
// exec = {
//   instanceId,
//   newState,
//   logs,
//   pulseTouch,
//   band,
//
//   // v24+ surfaces:
//   advantageTier,
//   advantageScore,
//   throughputClass,
//   throughputScore,
//   worldWaveIndex,
//   substrateLaneId,
//   substratePhaseIndex,
//   binaryDensity,
//   waveAmplitude
// }
// ============================================================================

export function packExecutionResultV24(exec) {
  const touch = exec.pulseTouch || exec.touch || {};
  const band = exec.band || touch.band || "binary";

  const {
    advantageTier = 0,
    advantageScore = 0,
    throughputClass = "throughput_low",
    throughputScore = 0,
    worldWaveIndex = null,
    substrateLaneId = null,
    substratePhaseIndex = null,
    binaryDensity = 0,
    waveAmplitude = 0
  } = exec || {};

  const touchMeta = touch && Object.keys(touch).length > 0 ? touch : null;

  const baseFields = [
    exec.instanceId || "",
    JSON.stringify(exec.newState || {}),
    JSON.stringify(exec.logs || []),
    JSON.stringify(touchMeta || {}),
    band
    // frameProfileStr appended after
  ];

  const encodedBase = baseFields.map(encodeString);
  const baseSize = 1 + encodedBase.reduce((s, f) => s + f.length, 0);

  const payloadType = BinaryPayloadType.EXECUTION_RESULT;
  const frameProfile = computeFrameProfileV24({
    tag: "EXECUTION_RESULT",
    band,
    size: baseSize,
    payloadType,
    advantageTier,
    advantageScore,
    throughputClass,
    throughputScore,
    worldWaveIndex,
    substrateLaneId,
    substratePhaseIndex,
    binaryDensity,
    waveAmplitude
  });

  const frameProfileStr = JSON.stringify(frameProfile);

  const fields = [...baseFields, frameProfileStr];
  const encoded = fields.map(encodeString);
  const totalSize = 1 + encoded.reduce((s, f) => s + f.length, 0);

  const buf = new ArrayBuffer(totalSize);
  const view = new DataView(buf);
  let o = 0;

  o = writeUint8(view, o, payloadType);

  for (const ef of encoded) {
    new Uint8Array(buf, o).set(ef);
    o += ef.length;
  }

  return new Uint8Array(buf);
}

// ============================================================================
// UNPACKER (v24, IMMORTAL-INTEL, v24 frames)
// ----------------------------------------------------------------------------
// NOTE:
//   • This unpacks v24 frames with full frameProfile.
//   • v20 frames can be handled by a separate compatibility shim if needed.
// ============================================================================

export function unpackBinaryPayloadV24(uint8) {
  const view = new DataView(uint8.buffer, uint8.byteOffset, uint8.byteLength);
  let o = 0;

  const [type, o2] = readUint8(view, o);
  o = o2;

  const tag = PayloadTypeReverse[type] || "UNKNOWN";
  const out = { _t: tag };

  function readFieldSafe() {
    if (o >= view.byteLength) return [null, o];
    try {
      const [str, next] = decodeString(view, o);
      return [str, next];
    } catch {
      return [null, o];
    }
  }

  switch (tag) {
    case "SNAPSHOT": {
      const [snapshotId, o3] = decodeString(view, o);
      o = o3;
      const [instanceId, o4] = decodeString(view, o);
      o = o4;
      const [lineageRootId, o5] = decodeString(view, o);
      o = o5;
      const [logicalClockStr, o6] = decodeString(view, o);
      o = o6;
      const [regionId, o7] = decodeString(view, o);
      o = o7;
      const [hostName, o8] = decodeString(view, o);
      o = o8;
      const [configVersion, o9] = decodeString(view, o);
      o = o9;
      const [role, o10] = decodeString(view, o);
      o = o10;
      const [mode, o11] = decodeString(view, o);
      o = o11;
      const [healthFlagsStr, o12] = decodeString(view, o);
      o = o12;
      const [metaStr, o13] = decodeString(view, o);
      o = o13;

      let presence = "";
      let page = "";
      let chunkProfile = "";
      let identity = "";
      let trusted = "";
      let advantage = "";
      let band = "dual";
      let touchMeta = {};
      let frameProfile = null;

      let tmp;
      [tmp, o] = readFieldSafe();
      if (tmp !== null) presence = tmp;
      [tmp, o] = readFieldSafe();
      if (tmp !== null) page = tmp;
      [tmp, o] = readFieldSafe();
      if (tmp !== null) chunkProfile = tmp;
      [tmp, o] = readFieldSafe();
      if (tmp !== null) identity = tmp;
      [tmp, o] = readFieldSafe();
      if (tmp !== null) trusted = tmp;
      [tmp, o] = readFieldSafe();
      if (tmp !== null) advantage = tmp;
      [tmp, o] = readFieldSafe();
      if (tmp !== null) band = tmp || "dual";
      [tmp, o] = readFieldSafe();
      if (tmp !== null) {
        try {
          touchMeta = JSON.parse(tmp || "{}");
        } catch {
          touchMeta = {};
        }
      }
      [tmp, o] = readFieldSafe();
      if (tmp !== null) {
        try {
          frameProfile = JSON.parse(tmp || "{}");
        } catch {
          frameProfile = null;
        }
      }

      let healthFlags = {};
      let meta = {};
      try {
        healthFlags = JSON.parse(healthFlagsStr || "{}");
      } catch {}
      try {
        meta = JSON.parse(metaStr || "{}");
      } catch {}

      out.header = {
        snapshotId,
        instanceId,
        lineageRootId,
        logicalClock: logicalClockStr
      };

      out.state = {
        regionId,
        hostName,
        configVersion,
        role,
        mode,
        healthFlags,
        meta,
        presence,
        page,
        chunkProfile,
        identity,
        trusted,
        advantage,
        band,
        pulseTouch: touchMeta
      };

      if (frameProfile) out.frameProfile = frameProfile;
      break;
    }

    case "DELTA": {
      const [instanceId, o3] = decodeString(view, o);
      o = o3;
      const [beforeId, o4] = decodeString(view, o);
      o = o4;
      const [afterId, o5] = decodeString(view, o);
      o = o5;
      const [changesStr, o6] = decodeString(view, o);
      o = o6;

      let touchMeta = {};
      let band = "dual";
      let frameProfile = null;

      let tmp;
      [tmp, o] = readFieldSafe();
      if (tmp !== null) {
        try {
          touchMeta = JSON.parse(tmp || "{}");
        } catch {
          touchMeta = {};
        }
      }
      [tmp, o] = readFieldSafe();
      if (tmp !== null) band = tmp || "dual";
      [tmp, o] = readFieldSafe();
      if (tmp !== null) {
        try {
          frameProfile = JSON.parse(tmp || "{}");
        } catch {
          frameProfile = null;
        }
      }

      let changes = {};
      try {
        changes = JSON.parse(changesStr || "{}");
      } catch {}

      out.instanceId = instanceId;
      out.snapshotBeforeId = beforeId;
      out.snapshotAfterId = afterId;
      out.changes = changes;
      out.pulseTouch = touchMeta;
      out.band = band;
      if (frameProfile) out.frameProfile = frameProfile;
      break;
    }

    case "DEPLOYMENT_PLAN": {
      const [instanceId, o3] = decodeString(view, o);
      o = o3;
      const [actionsStr, o4] = decodeString(view, o);
      o = o4;

      let touchMeta = {};
      let band = "symbolic";
      let frameProfile = null;

      let tmp;
      [tmp, o] = readFieldSafe();
      if (tmp !== null) {
        try {
          touchMeta = JSON.parse(tmp || "{}");
        } catch {
          touchMeta = {};
        }
      }
      [tmp, o] = readFieldSafe();
      if (tmp !== null) band = tmp || "symbolic";
      [tmp, o] = readFieldSafe();
      if (tmp !== null) {
        try {
          frameProfile = JSON.parse(tmp || "{}");
        } catch {
          frameProfile = null;
        }
      }

      let actions = [];
      try {
        actions = JSON.parse(actionsStr || "[]");
      } catch {}

      out.instanceId = instanceId;
      out.actions = actions;
      out.pulseTouch = touchMeta;
      out.band = band;
      if (frameProfile) out.frameProfile = frameProfile;
      break;
    }

    case "MULTI_PLAN": {
      const [instancesStr, o3] = decodeString(view, o);
      o = o3;

      let band = "symbolic";
      let frameProfile = null;

      let tmp;
      [tmp, o] = readFieldSafe();
      if (tmp !== null) band = tmp || "symbolic";
      [tmp, o] = readFieldSafe();
      if (tmp !== null) {
        try {
          frameProfile = JSON.parse(tmp || "{}");
        } catch {
          frameProfile = null;
        }
      }

      let instances = [];
      try {
        instances = JSON.parse(instancesStr || "[]");
      } catch {}

      out.instances = instances;
      out.band = band;
      if (frameProfile) out.frameProfile = frameProfile;
      break;
    }

    case "EXECUTION_RESULT": {
      const [instanceId, o3] = decodeString(view, o);
      o = o3;
      const [newStateStr, o4] = decodeString(view, o);
      o = o4;
      const [logsStr, o5] = decodeString(view, o);
      o = o5;

      let touchMeta = {};
      let band = "binary";
      let frameProfile = null;

      let tmp;
      [tmp, o] = readFieldSafe();
      if (tmp !== null) {
        try {
          touchMeta = JSON.parse(tmp || "{}");
        } catch {
          touchMeta = {};
        }
      }
      [tmp, o] = readFieldSafe();
      if (tmp !== null) band = tmp || "binary";
      [tmp, o] = readFieldSafe();
      if (tmp !== null) {
        try {
          frameProfile = JSON.parse(tmp || "{}");
        } catch {
          frameProfile = null;
        }
      }

      let newState = {};
      let logs = [];
      try {
        newState = JSON.parse(newStateStr || "{}");
      } catch {}
      try {
        logs = JSON.parse(logsStr || "[]");
      } catch {}

      out.instanceId = instanceId;
      out.newState = newState;
      out.logs = logs;
      out.pulseTouch = touchMeta;
      out.band = band;
      if (frameProfile) out.frameProfile = frameProfile;
      break;
    }

    default:
      out.error = "Unknown payload type (v24)";
  }

  return out;
}

// ============================================================================
// EXPORTED API (v24 IMMORTAL-INTEL)
// ============================================================================

const BinarySubstrateV24 = {
  meta: BinarySubstrateV24Meta,
  BinaryPayloadType,
  packSnapshotV24,
  packDeltaV24,
  packDeploymentPlanV24,
  packMultiOrganismPlanV24,
  packExecutionResultV24,
  unpackBinaryPayloadV24,
  computeFrameProfileV24
};

export default BinarySubstrateV24;
