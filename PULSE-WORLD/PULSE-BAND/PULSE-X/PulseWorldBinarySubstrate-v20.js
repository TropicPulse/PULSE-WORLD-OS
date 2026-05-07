/**
 * ============================================================================
 *  PulseWorldBinarySubstrate-v20-IMMORTAL-ADVANTAGE.js
 *  ROOT:  PULSE-X
 *  LAYER: BinaryTransport / Substrate
 *
 *  ROLE:
 *    - Binary overlay for Runtime + Scheduler + Regioning + Finality.
 *    - Packs symbolic plans/snapshots/results into deterministic binary frames.
 *    - Encodes presence / mode / page / chunkProfile / identity / trusted /
 *      advantage / band / pulseTouch / frameProfile.
 *    - Backward-safe for v17+ frames (older layouts still decode).
 *
 *  PHILOSOPHY:
 *    - Symbolic-first, binary-backed.
 *    - No guessing: fixed field order, explicit tags, explicit bands.
 *    - Frames are “nerves” of the organism: small, precise, reversible.
 * ============================================================================
 */
/*
AI_EXPERIENCE_META = {
  identity: "PulseWorldBinarySubstrate",
  version: "v20-IMMORTAL-ADVANTAGE",
  layer: "binary_substrate",
  role: "binary_overlay_for_runtime_and_scheduler",

  description: `
    The Binary Substrate is the binary nervous system of PULSE-X.
    It compresses multi-organism plans, snapshots, deltas, and execution
    results into deterministic frames. Each frame carries presence, page,
    chunkProfile, identity, trust, advantage, band, and pulseTouch metadata,
    plus a frameProfile tail that describes the frame itself.

    Runtime and Scheduler treat this organ as a pure contract: they never
    guess about layout, never mutate frames in-place, and never perform IO.
    Unpacking is backward-safe: v17 frames still decode; v20 adds advantage
    and richer frameProfile without breaking anything.
  `,

  lineage: [
    "BinarySubstrate-v1",
    "BinarySubstrate-v11-Evo",
    "BinarySubstrate-v14-Immortal",
    "BinarySubstrate-v17-Immortal",
    "BinarySubstrate-v20-IMMORTAL-ADVANTAGE"
  ],

  evo: {
    binaryOverlay: true,
    runtimeAware: true,
    schedulerAware: true,
    regioningAware: true,
    finalityAware: true,

    deterministic: true,
    driftProof: true,
    pureCompute: true,

    zeroMutationOfInput: true,
    zeroNetwork: true,
    zeroFilesystem: true,

    pulseTouchAware: true,
    presenceAware: true,
    advantageAware: true,
    bandAware: true,
    frameProfileAware: true
  },

  contract: {
    always: [
      "PulseRuntime",
      "PulseScheduler",
      "PulseWorldRegioning",
      "PulseContinuance",
      "PulseOmniHosting"
    ],
    never: [
      "directInternetAccess",
      "externalNetworkIO",
      "unsafeEval",
      "randomnessSource"
    ]
  }
}
*/

// ============================================================================
//  META
// ============================================================================

export const BinarySubstrateV20Meta = Object.freeze({
  organId: "BinarySubstrate-v20-IMMORTAL-ADVANTAGE",
  role: "BINARY_SUBSTRATE",
  version: "v20-IMMORTAL-ADVANTAGE",
  epoch: "v20-IMMORTAL-ADVANTAGE",
  layer: "BinaryTransport",
  safety: Object.freeze({
    deterministic: true,
    noRandomness: true,
    noAsyncDrift: true,
    syntheticOnly: true
  }),
  evo: Object.freeze({
    presenceAware: true,
    advantageAware: true,
    dualbandSafe: true,
    chunkAware: true,
    cacheAware: true,
    prewarmAware: true,
    meshAware: true,
    expansionAware: true,
    pulseTouchAware: true,
    multiInstanceReady: true,
    bandAware: true,
    frameProfileAware: true
  })
});

// ============================================================================
//  BINARY PAYLOAD TYPES
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
//  LOW-LEVEL ENCODING HELPERS (fixed-width length prefix, LE)
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

// v20: frame profile helper (pure, no memory)
export function computeFrameProfile(uint8, tag, bandHint = null) {
  const size = uint8?.length || 0;
  const band =
    bandHint ||
    (tag === "MULTI_PLAN" || tag === "DEPLOYMENT_PLAN" ? "symbolic" : "binary");

  return {
    tag,
    size,
    band
  };
}

// ============================================================================
//  SNAPSHOT PACKER (v20, advantage-aware)
// ============================================================================

/**
 * snapshot = {
 *   snapshotId,
 *   instanceId,
 *   lineageRootId,
 *   logicalClock,
 *   regionId,
 *   hostName,
 *   configVersion,
 *   role,
 *   mode,
 *   healthFlags,
 *   meta,
 *   presence,
 *   page,
 *   chunkProfile,
 *   identity,
 *   trusted,
 *   advantage,
 *   band,
 *   pulseTouch
 * }
 */
export function packSnapshot(snapshot) {
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
    pulseTouch = {}
  } = snapshot || {};

  const healthFlagsStr = JSON.stringify(healthFlags || {});
  const metaStr = JSON.stringify(meta || {});
  const touchMetaStr = JSON.stringify(pulseTouch || {});

  const frameProfile = {
    tag: "SNAPSHOT",
    band,
    sizeHint: 0
  };

  const frameProfileStr = JSON.stringify(frameProfile);

  const fields = [
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
    touchMetaStr,
    frameProfileStr
  ];

  const encoded = fields.map(encodeString);
  const totalSize = 1 + encoded.reduce((s, f) => s + f.length, 0);

  const buf = new ArrayBuffer(totalSize);
  const view = new DataView(buf);
  let o = 0;

  o = writeUint8(view, o, BinaryPayloadType.SNAPSHOT);

  for (const ef of encoded) {
    new Uint8Array(buf, o).set(ef);
    o += ef.length;
  }

  return new Uint8Array(buf);
}

// ============================================================================
//  DELTA PACKER (v20)
// ============================================================================

/**
 * delta = {
 *   instanceId,
 *   snapshotBeforeId,
 *   snapshotAfterId,
 *   changes,
 *   pulseTouch,
 *   band
 * }
 */
export function packDelta(delta) {
  const {
    instanceId = "",
    snapshotBeforeId = "",
    snapshotAfterId = "",
    changes = {},
    pulseTouch = {},
    band = "dual"
  } = delta || {};

  const changesStr = JSON.stringify(changes || {});
  const touchMetaStr = JSON.stringify(pulseTouch || {});

  const frameProfile = {
    tag: "DELTA",
    band,
    sizeHint: 0
  };

  const frameProfileStr = JSON.stringify(frameProfile);

  const fields = [
    instanceId,
    snapshotBeforeId,
    snapshotAfterId,
    changesStr,
    touchMetaStr,
    band,
    frameProfileStr
  ];

  const encoded = fields.map(encodeString);
  const totalSize = 1 + encoded.reduce((s, f) => s + f.length, 0);

  const buf = new ArrayBuffer(totalSize);
  const view = new DataView(buf);
  let o = 0;

  o = writeUint8(view, o, BinaryPayloadType.DELTA);

  for (const ef of encoded) {
    new Uint8Array(buf, o).set(ef);
    o += ef.length;
  }

  return new Uint8Array(buf);
}

// ============================================================================
//  DEPLOYMENT PLAN PACKER (v20)
// ============================================================================

/**
 * plan = {
 *   instanceId,
 *   actions: [{ type, regionId, hostName, patch, meta }],
 *   pulseTouch,
 *   band
 * }
 */
export function packDeploymentPlan(plan) {
  const {
    instanceId = "",
    actions = [],
    pulseTouch = {},
    band = "symbolic"
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

  const frameProfile = {
    tag: "DEPLOYMENT_PLAN",
    band,
    sizeHint: 0
  };

  const frameProfileStr = JSON.stringify(frameProfile);

  const fields = [
    instanceId,
    actionsStr,
    touchMetaStr,
    band,
    frameProfileStr
  ];

  const encoded = fields.map(encodeString);
  const totalSize = 1 + encoded.reduce((s, f) => s + f.length, 0);

  const buf = new ArrayBuffer(totalSize);
  const view = new DataView(buf);
  let o = 0;

  o = writeUint8(view, o, BinaryPayloadType.DEPLOYMENT_PLAN);

  for (const ef of encoded) {
    new Uint8Array(buf, o).set(ef);
    o += ef.length;
  }

  return new Uint8Array(buf);
}

// ============================================================================
//  MULTI-ORGANISM PLAN PACKER (v20)
// ============================================================================

/**
 * multiPlan = {
 *   instances: [{
 *     instanceId,
 *     deploymentPlan: { actions: [...] },
 *     pulseTouch,
 *     band
 *   }],
 *   band
 * }
 */
export function packMultiOrganismPlan(multiPlan, defaultBand = "symbolic") {
  const band = multiPlan.band || defaultBand || "symbolic";

  const frameProfile = {
    tag: "MULTI_PLAN",
    band,
    sizeHint: 0
  };

  const frameProfileStr = JSON.stringify(frameProfile);

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

  const fields = [
    JSON.stringify(instancesPayload),
    band,
    frameProfileStr
  ];

  const encoded = fields.map(encodeString);
  const totalSize = 1 + encoded.reduce((s, f) => s + f.length, 0);

  const buf = new ArrayBuffer(totalSize);
  const view = new DataView(buf);
  let o = 0;

  o = writeUint8(view, o, BinaryPayloadType.MULTI_PLAN);

  for (const ef of encoded) {
    new Uint8Array(buf, o).set(ef);
    o += ef.length;
  }

  return new Uint8Array(buf);
}

// ============================================================================
//  EXECUTION RESULT PACKER (v20)
// ============================================================================

/**
 * exec = {
 *   instanceId,
 *   newState,
 *   logs,
 *   pulseTouch,
 *   band
 * }
 */
export function packExecutionResult(exec) {
  const touch = exec.pulseTouch || exec.touch || {};
  const band = exec.band || touch.band || "binary";
  const touchMeta = touch && Object.keys(touch).length > 0 ? touch : null;

  const frameProfile = {
    tag: "EXECUTION_RESULT",
    band,
    sizeHint: 0
  };

  const fields = [
    exec.instanceId || "",
    JSON.stringify(exec.newState || {}),
    JSON.stringify(exec.logs || []),
    JSON.stringify(touchMeta || {}),
    band,
    JSON.stringify(frameProfile)
  ];

  const encoded = fields.map(encodeString);
  const totalSize = 1 + encoded.reduce((s, f) => s + f.length, 0);

  const buf = new ArrayBuffer(totalSize);
  const view = new DataView(buf);
  let o = 0;

  o = writeUint8(view, o, BinaryPayloadType.EXECUTION_RESULT);

  for (const ef of encoded) {
    new Uint8Array(buf, o).set(ef);
    o += ef.length;
  }

  return new Uint8Array(buf);
}

// ============================================================================
//  UNPACKER (v20, backward-safe for v17+)
// ============================================================================

export function unpackBinaryPayload(uint8) {
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
      out.error = "Unknown payload type";
  }

  return out;
}

// ============================================================================
//  EXPORTED API
// ============================================================================

const BinarySubstrateV20 = {
  meta: BinarySubstrateV20Meta,
  BinaryPayloadType,
  packSnapshot,
  packDelta,
  packDeploymentPlan,
  packMultiOrganismPlan,
  packExecutionResult,
  unpackBinaryPayload,
  computeFrameProfile
};

export default BinarySubstrateV20;
