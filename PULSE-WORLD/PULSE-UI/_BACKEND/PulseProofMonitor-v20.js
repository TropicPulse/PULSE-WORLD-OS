// ============================================================================
//  PULSE OS — PROOF VITALS MONITOR (v20‑IMMORTAL‑PROOF‑MONITOR)
//  “Organism Life Witness / Continuous Vitals / Offline-First Telemetry”
// ============================================================================
//
//  EXPERIENCE METADATA (v20 IMMORTAL)
// ============================================================================
/*
AI_EXPERIENCE_META = {
  identity: "PulseProofMonitor",
  version: "v20-Immortal-Proof-Monitor",
  layer: "frontend",
  role: "observer_monitor",
  lineage: "PulseOS-v20",

  evo: {
    binaryAware: true,
    dualBandAware: true,
    presenceAware: true,
    advantageAware: true,
    speedAware: true,
    experienceAware: true,

    chunkAligned: true,
    chunkProfileAware: true,
    actNowAware: true,
    powerAware: true,
    compilerAware: true,
    routerMemoryAware: true,

    safeRouteFree: true,
    vitalsMonitor: true,
    passive: true,

    offlineFirst: true,
    localStoreMirrored: true,
    replayAware: true,
    loggerAligned: true,
    monitorSeparated: true,

    driftProof: true,
    deterministicVitals: true,
    zeroDriftAverages: true,

    backendOptional: true,
    noRouting: true,
    noHealing: true,
    noOrgans: true,
    noControl: true,

    multiInstanceReady: true,
    unifiedAdvantageField: true,
    pulseEfficiencyAware: true,
    futureEvolutionReady: true
  },

  contract: {
    always: [
      "PulseWindow",
      "PulsePresence",
      "PulseUIFlow",
      "PulseUIErrors",
      "PulseProofLogger"
    ],
    never: [
      "legacyMonitor",
      "legacyVitals",
      "safeRoute",
      "fetchViaCNS",
      "legacyPresence",
      "legacyChunker",
      "legacyFlow"
    ]
  }
}
*/

console.log("Monitor v20-Immortal-Proof");

import { pulseLog, log, warn, error } from "./PulseProofLogger-v20.js";

// ============================================================================
//  GLOBAL + DB
// ============================================================================
const g =
  typeof globalThis !== "undefined"
    ? globalThis
    : typeof global !== "undefined"
    ? global
    : typeof window !== "undefined"
    ? window
    : {};

const db =
  g.db ||
  (typeof global !== "undefined" && global.db) ||
  (typeof globalThis !== "undefined" && globalThis.db) ||
  (typeof window !== "undefined" && window.db) ||
  null;

// ============================================================================
//  ONLINE FLAG
// ============================================================================
function isOnline() {
  if (typeof window !== "undefined" && typeof window.PULSE_ONLINE === "boolean")
    return window.PULSE_ONLINE;
  if (typeof globalThis !== "undefined" && typeof globalThis.PULSE_ONLINE === "boolean")
    return globalThis.PULSE_ONLINE;
  if (typeof global !== "undefined" && typeof global.PULSE_ONLINE === "boolean")
    return global.PULSE_ONLINE;
  if (typeof g.PULSE_ONLINE === "boolean") return g.PULSE_ONLINE;
  return false;
}

// ============================================================================
//  ORGAN IDENTITY — v20 IMMORTAL PROOF MONITOR
// ============================================================================
export const PulseRole = {
  type: "Organ",
  subsystem: "ProofLayer",
  layer: "ProofVitalsMonitor",
  version: "20.0-Immortal-Proof-Monitor",
  identity: "PulseProofVitalsMonitor-v20",

  evo: {
    driftProof: true,
    deterministicVitals: true,
    zeroDriftAverages: true,

    backendOptional: true,
    noRouting: true,
    noHealing: true,
    noOrgans: true,
    noControl: true,

    metricsOnly: true,
    binaryAware: true,
    dualBandAware: true,
    presenceAware: true,
    advantageAware: true,
    speedAware: true,
    experienceAware: true,

    proxyTierAware: true,
    multiInstanceReady: true,
    unifiedAdvantageField: true,
    pulseEfficiencyAware: true,
    futureEvolutionReady: true,

    alwaysOn: true,
    spinalAware: true,
    cnsAware: true,
    pageScannerAware: true,
    errorSpineAware: true,
    routerMemoryAware: true,

    offlineFirst: true,
    localStoreMirrored: true,
    replayAware: true,
    loggerAligned: true,
    monitorSeparated: true,

    chunkAligned: true,
    chunkProfileAware: true,
    actNowAware: true,
    powerAware: true,
    compilerAware: true
  }
};

const PROOF_CONTEXT = {
  layer: PulseRole.layer,
  role: PulseRole.identity,
  version: PulseRole.version,
  lineage: "proof-core-v20",
  evo: PulseRole.evo
};

const VITALS_CONTEXT = {
  ...PROOF_CONTEXT,
  organ: "VitalsMonitor"
};

// ============================================================================
//  ICONS / HEALTH
// ============================================================================
const ICON = {
  update: "🩸",
  trust: "🧪",
  phase: "📊",
  hub: "🛰️",
  alloc: "⚙️",
  warn: "⚠️",
  error: "🟥",
  ok: "🟢",
  pulse: "💓",
  death: "💀",
  route: "🛰️",
  drift: "🌊",
  spine: "🧵",
  cns: "🧠"
};

const HEALTH = {
  healthy: "|",
  stable: "|",
  degrading: "~",
  critical: "X",
  unknown: "?"
};

function makeHealthBar(status) {
  const sym = HEALTH[status] || HEALTH.unknown;
  switch (status) {
    case "healthy":
      return `${sym} OK`;
    case "stable":
      return `${sym} STABLE`;
    case "degrading":
      return `${sym} DEGRADED`;
    case "critical":
      return `${sym} BROKEN`;
    default:
      return `${sym} UNKNOWN`;
  }
}

// ============================================================================
//  LOCAL STORAGE BUFFER — v20 IMMORTAL
// ============================================================================
const VITALS_LS_KEY = "PulseVitals.v20.buffer";
const VITALS_LS_MAX = 4000;

function hasLocalStorage() {
  try {
    if (typeof window === "undefined" || !window.localStorage) return false;
    window.localStorage.setItem("__pulse_vitals_test__", "1");
    window.localStorage.removeItem("__pulse_vitals_test__");
    return true;
  } catch {
    return false;
  }
}

function loadVitalsBuffer() {
  if (!hasLocalStorage()) return [];
  try {
    const raw = window.localStorage.getItem(VITALS_LS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveVitalsBuffer(buf) {
  if (!hasLocalStorage()) return;
  try {
    const trimmed =
      buf.length > VITALS_LS_MAX ? buf.slice(buf.length - VITALS_LS_MAX) : buf;
    window.localStorage.setItem(VITALS_LS_KEY, JSON.stringify(trimmed));
  } catch {
    // never throw
  }
}

function appendVitalsEntry(kind, payload) {
  const entry = {
    ts: Date.now(),
    kind,
    payload,
    context: {
      layer: VITALS_CONTEXT.layer,
      organ: VITALS_CONTEXT.organ,
      version: VITALS_CONTEXT.version
    },
    synced: false
  };

  const buf = loadVitalsBuffer();
  buf.push(entry);
  saveVitalsBuffer(buf);

  // Mirror into GLOBAL_LOGS via logger
  pulseLog({
    subsystem: "vitals",
    system: "ProofLayer",
    organ: VITALS_CONTEXT.organ,
    layer: VITALS_CONTEXT.layer,
    message: `[Vitals] ${kind}`,
    extra: payload,
    level: "log",
    band: payload.band || "dual",
    presenceField: payload.presenceField || null,
    advantageField: payload.advantageField || null,
    speedField: payload.speedField || null,
    experienceField: payload.experienceField || null
  });
}

// ============================================================================
//  FIREBASE FLUSH — SEPARATE MONITOR COLLECTION (ASYNC, OPTIONAL)
// ============================================================================
async function flushVitalsToFirebase() {
  if (!db || typeof db.collection !== "function") return;

  const buf = loadVitalsBuffer();
  if (!buf.length) return;

  const remaining = [];

  for (const entry of buf) {
    if (entry.synced) {
      remaining.push(entry);
      continue;
    }
    try {
      await db.collection("MONITOR_LOGS").add(entry);
      entry.synced = true;
      remaining.push(entry);
    } catch {
      remaining.push(entry);
      break;
    }
  }

  saveVitalsBuffer(remaining);
}

if (typeof window !== "undefined") {
  if (isOnline()) flushVitalsToFirebase().catch(() => {});
  window.addEventListener("online", () => flushVitalsToFirebase().catch(() => {}));
}

// ============================================================================
//  CONSTANTS / CONFIG
// ============================================================================
export const NORMAL_MAX = 4;
export const UPGRADED_MAX = 8;
export const HIGHEND_MAX = 8;
export const TEST_EARN_MAX = 16;

export const UPGRADED_MULT = 2;
export const HIGHEND_MULT = 2;
export const EARN_MODE_MULT = 1.5;

export const ENABLE_PERFORMANCE_LOGGING = true;
export const PERFORMANCE_LOG_COLLECTION = "MonitorPerformanceLogsV20";

// ============================================================================
//  BACKEND METRICS
// ============================================================================
export async function updateUserMetrics(userId, data = {}) {
  const uid = userId || "anonymous";

  const localPayload = {
    userId: uid,
    ...data,
    band: "dual",
    binaryArtery: false
  };

  log("vitals", `${ICON.update} update_local`, localPayload);
  appendVitalsEntry("metrics_update", localPayload);

  if (!db || !isOnline()) return;
  if (!userId || userId === "anonymous") return;

  const payload = {
    userId,
    bytes: data.bytes ?? 0,
    durationMs: data.durationMs ?? 0,
    meshRelay: !!data.meshRelay,
    meshPing: !!data.meshPing,
    hubFlag: !!data.hubFlag,
    band: "dual",
    binaryArtery: false
  };

  const ref = db.collection("UserMetrics").doc(userId);
  const now = Date.now();

  try {
    await db.runTransaction(async (tx) => {
      const snap = await tx.get(ref);
      const existing = snap.exists ? snap.data() : {};

      const totalRequests = (existing.totalRequests || 0) + 1;
      const totalBytes = (existing.totalBytes || 0) + (data.bytes || 0);

      let avgLatency = existing.avgLatency || 0;
      if (data.durationMs != null) {
        if (!existing.totalRequests) avgLatency = data.durationMs;
        else
          avgLatency =
            (avgLatency * existing.totalRequests + data.durationMs) /
            totalRequests;
      }

      const meshRelays = (existing.meshRelays || 0) + (data.meshRelay ? 1 : 0);
      const meshPings = (existing.meshPings || 0) + (data.meshPing ? 1 : 0);
      const hubSignals = (existing.hubSignals || 0) + (data.hubFlag ? 1 : 0);
      const stabilityScore = existing.stabilityScore || 0;

      tx.set(
        ref,
        {
          userId,
          totalRequests,
          totalBytes,
          avgLatency,
          meshRelays,
          meshPings,
          hubSignals,
          stabilityScore,
          lastSeen: now,
          updatedAt: now
        },
        { merge: true }
      );
    });
  } catch (err) {
    error("vitals", `${ICON.error} metrics_update_failed`, {
      error: String(err),
      band: "dual",
      binaryArtery: false
    });
  }

  if (ENABLE_PERFORMANCE_LOGGING) {
    try {
      await db.collection(PERFORMANCE_LOG_COLLECTION).add({
        ...VITALS_CONTEXT,
        userId,
        ts: Date.now(),
        bytes: data.bytes ?? null,
        durationMs: data.durationMs ?? null,
        meshRelay: data.meshRelay ?? false,
        meshPing: data.meshPing ?? false,
        hubFlag: data.hubFlag ?? false
      });

      log("vitals", `${ICON.ok} snapshot_logged_remote`, {
        userId,
        band: "dual",
        binaryArtery: false
      });
    } catch (err) {
      error("vitals", `${ICON.error} snapshot_failed_remote`, {
        error: String(err),
        band: "dual",
        binaryArtery: false
      });
    }
  }
}

// ============================================================================
//  PURE FUNCTIONS — TRUST / PHASE / HUB / ALLOCATION
// ============================================================================
export function calculateTrustScore(metrics) {
  if (!metrics) return 0;

  let score = 0;

  score += Math.min((metrics.totalRequests || 0) / 100, 20);
  score += Math.min((metrics.meshRelays || 0) / 10, 20);
  score += Math.min((metrics.hubSignals || 0) / 5, 20);

  if (metrics.avgLatency && metrics.avgLatency < 150) score += 20;

  score += metrics.stabilityScore || 0;

  const final = Math.min(score, 100);

  const payload = {
    userId: metrics.userId ?? "?",
    score: final,
    band: "dual",
    binaryArtery: false
  };

  log("vitals", `${ICON.trust} trust_score`, payload);
  appendVitalsEntry("trust_score", payload);

  return final;
}

export function calculatePhase(trustScore) {
  let phase = 1;

  if (trustScore < 25) phase = 1;
  else if (trustScore < 50) phase = 2;
  else if (trustScore < 75) phase = 3;
  else phase = 4;

  const payload = {
    trustScore,
    phase,
    band: "dual",
    binaryArtery: false
  };

  log("vitals", `${ICON.phase} phase`, payload);
  appendVitalsEntry("phase", payload);

  return phase;
}

export function isHub(metrics) {
  if (!metrics) return false;

  const hub =
    (metrics.meshRelays || 0) > 50 ||
    (metrics.hubSignals || 0) > 20 ||
    (metrics.totalRequests || 0) > 500;

  if (hub) {
    const payload = {
      userId: metrics.userId ?? "?",
      relays: metrics.meshRelays,
      hubSignals: metrics.hubSignals,
      totalRequests: metrics.totalRequests,
      band: "dual",
      binaryArtery: false
    };

    warn("vitals", `${ICON.hub} hub_detected`, payload);
    appendVitalsEntry("hub_detected", payload);
  }

  return hub;
}

export function allocateInstances(
  phase,
  hubFlag,
  deviceTier,
  earnMode,
  testEarnActive
) {
  if (!isOnline()) return;
  let base = phase >= 2 ? 2 : 1;

  if (hubFlag) base *= 2;
  if (deviceTier === "upgraded") base *= UPGRADED_MULT;
  if (deviceTier === "highend") base *= HIGHEND_MULT;
  if (earnMode) base = Math.floor(base * EARN_MODE_MULT);
  if (testEarnActive) base = TEST_EARN_MAX;

  const max =
    testEarnActive
      ? TEST_EARN_MAX
      : deviceTier === "upgraded"
      ? UPGRADED_MAX
      : deviceTier === "highend"
      ? HIGHEND_MAX
      : NORMAL_MAX;

  const final = Math.max(1, Math.min(base, max));

  const payload = {
    phase,
    hubFlag,
    deviceTier,
    earnMode,
    testEarnActive,
    final,
    band: "dual",
    binaryArtery: false
  };

  log("vitals", `${ICON.alloc} instance_allocation`, payload);
  appendVitalsEntry("instance_allocation", payload);

  return final;
}

// ============================================================================
//  ROUTE SCAN — READ-ONLY VISUALIZATION
// ============================================================================
export function printRouteScan(route = {}) {
  console.groupCollapsed(
    "%c🔍 ROUTE SCAN — PulseOS v20‑IMMORTAL‑PROOF‑MONITOR",
    "color:#03A9F4; font-weight:bold;"
  );

  const nodes = [
    ["Brain", "🧠", route.brain, "#7C4DFF"],
    ["Synapse", "⚡", route.synapse, "#42A5F5"],
    ["Spine", "🧵", route.spine, "#26A69A"],
    ["Heart", "🫀", route.heart, "#E53935"],
    ["PulseBand", "📡", route.band, "#EC407A"],
    ["Router", "🛰️", route.router, "#26C6DA"],
    ["Proxy", "🌐", route.proxy, "#29B6F6"],
    ["Vitals", "🩸", route.vitals, "#FF7043"],
    ["History", "📜", route.history, "#BDBDBD"],
    ["Purifier", "🧹", route.purifier, "#8D6E63"]
  ];

  for (const [name, icon, status, color] of nodes) {
    const bar = makeHealthBar(status || "unknown");
    console.log(
      `%c${icon}  ${name.padEnd(14)} → ${bar}`,
      `color:${color}; font-weight:bold;`
    );
  }

  console.groupEnd();
}

// ============================================================================
//  ATTACH VITALS MONITOR
// ============================================================================
function safeGroup(label, fn) {
  try {
    if (typeof console !== "undefined" && console.groupCollapsed) {
      console.groupCollapsed(label);
      fn();
      console.groupEnd();
    } else {
      fn();
    }
  } catch {
    // never throw
  }
}

export function attachVitalsMonitor({
  EventBus,
  RouterMemory,
  PageScanner,
  ErrorSpine,
  getCurrentUserId
} = {}) {
  const VitalsState = {
    lastImpulseSeq: 0,
    lastRouteSeq: 0,
    lastHeartbeatSeq: 0,
    lastDriftSeq: 0,
    lastErrorSeq: 0,
    organismAlive: true
  };

  function currentUserId() {
    try {
      return typeof getCurrentUserId === "function"
        ? getCurrentUserId() || "anonymous"
        : "anonymous";
    } catch {
      return "anonymous";
    }
  }

  function markPulse(kind, details = {}) {
    const payload = {
      kind,
      ts: Date.now(),
      userId: currentUserId(),
      ...details
    };

    log("vitals", `${ICON.pulse} pulse`, payload);
    appendVitalsEntry("pulse", payload);
  }

  function markOrganismDeath(reason) {
    if (!VitalsState.organismAlive) return;
    VitalsState.organismAlive = false;

    const payload = {
      reason,
      band: "dual",
      binaryArtery: false
    };

    error("vitals", `${ICON.death} organism_death`, payload);
    appendVitalsEntry("organism_death", payload);

    safeGroup("%c💀 ORGANISM DEATH DETECTED", () => {
      console.log("Reason:", reason);
      console.log("VitalsState:", VitalsState);
    });
  }

  // Spinal impulses / CNS routes / heartbeat / any EventBus events
  if (EventBus && typeof EventBus.on === "function") {
    EventBus.on("spinal:impulse", (evt) => {
      VitalsState.lastImpulseSeq += 1;
      markPulse("spinalImpulse", {
        seq: VitalsState.lastImpulseSeq,
        source: evt?.source || "unknown",
        modeKind: evt?.modeKind || "symbolic"
      });
    });

    EventBus.on("cns:route", (evt) => {
      VitalsState.lastRouteSeq += 1;
      markPulse("cnsRoute", {
        seq: VitalsState.lastRouteSeq,
        type: evt?.type || "unknown",
        band: evt?.band || "symbolic"
      });
    });

    EventBus.on("heartbeat", (evt) => {
      VitalsState.lastHeartbeatSeq += 1;
      markPulse("heartbeat", {
        seq: VitalsState.lastHeartbeatSeq,
        source: evt?.source || "unknown"
      });
    });

    EventBus.on("organism:death", (evt) => {
      markOrganismDeath(evt?.reason || "unknown");
    });
  }

  // RouterMemory snapshot (read-only)
  if (RouterMemory && typeof RouterMemory.getAll === "function") {
    try {
      const logs = RouterMemory.getAll() || [];
      if (logs.length > 0) {
        safeGroup("%c🩸 ROUTER MEMORY SNAPSHOT", () => {
          console.log("count:", logs.length);
        });
        markPulse("routerMemorySnapshot", { count: logs.length });
      }
    } catch {
      // never throw
    }
  }

  // PageScanner drift intel
  if (PageScanner && typeof PageScanner.onEvent === "function") {
    const original = PageScanner.onEvent;
    PageScanner.onEvent = function patched(packet) {
      VitalsState.lastDriftSeq += 1;

      markPulse("pageScannerDrift", {
        seq: VitalsState.lastDriftSeq,
        severity: packet?.severity ?? 0,
        tooFar: !!packet?.tooFar
      });

      return original.call(PageScanner, packet);
    };
  }

  // Error spine
  if (ErrorSpine && typeof ErrorSpine.on === "function") {
    ErrorSpine.on("error", (evt) => {
      VitalsState.lastErrorSeq += 1;
      markPulse("errorSpine", {
        seq: VitalsState.lastErrorSeq,
        message: String(evt?.message || evt || "unknown")
      });
    });
  }

  // Frontend global error hook
  if (typeof window !== "undefined" && typeof window.addEventListener === "function") {
    window.addEventListener("error", (event) => {
      VitalsState.lastErrorSeq += 1;
      markPulse("windowError", {
        seq: VitalsState.lastErrorSeq,
        message: event?.message || "unknown"
      });
    });
  }

  log("vitals", `${ICON.ok} monitor_attached`, {
    band: "dual",
    binaryArtery: false
  });
  appendVitalsEntry("monitor_attached", {
    ts: Date.now(),
    band: "dual",
    binaryArtery: false
  });

  return {
    PulseRole,
    VitalsState
  };
}

// ============================================================================
//  VITALS STORE + EXPORT SURFACE
// ============================================================================
export const PulseVitalsStore = {
  getAll() {
    return loadVitalsBuffer();
  },
  clear() {
    saveVitalsBuffer([]);
  },
  tail(n = 200) {
    const buf = loadVitalsBuffer();
    if (n <= 0) return [];
    return buf.slice(Math.max(0, buf.length - n));
  }
};

export const VitalsMonitor = {
  PulseRole,

  updateUserMetrics,
  calculateTrustScore,
  calculatePhase,
  isHub,
  allocateInstances,

  printRouteScan,
  attachVitalsMonitor,

  NORMAL_MAX,
  UPGRADED_MAX,
  HIGHEND_MAX,
  TEST_EARN_MAX,
  UPGRADED_MULT,
  HIGHEND_MULT,
  EARN_MODE_MULT,
  ENABLE_PERFORMANCE_LOGGING,
  PERFORMANCE_LOG_COLLECTION,

  PulseVitalsStore,

  meta: {
    layer: PulseRole.layer,
    subsystem: PulseRole.subsystem,
    version: PulseRole.version,
    identity: PulseRole.identity
  }
};

// ============================================================================
//  GLOBAL BINDING (OPTIONAL)
// ============================================================================
try {
  if (typeof global !== "undefined") {
    global.PulseVitalsStore = PulseVitalsStore;
    global.VitalsMonitor = VitalsMonitor;
  }
  if (typeof globalThis !== "undefined") {
    globalThis.PulseVitalsStore = PulseVitalsStore;
    globalThis.VitalsMonitor = VitalsMonitor;
  }
  if (typeof window !== "undefined") {
    window.PulseVitalsStore = PulseVitalsStore;
    window.VitalsMonitor = VitalsMonitor;
  }
  if (typeof g !== "undefined") {
    g.PulseVitalsStore = PulseVitalsStore;
    g.VitalsMonitor = VitalsMonitor;
  }
} catch {
  // never throw
}
