// ============================================================================
// PulseProofLogger-v24-IMMORTAL-EVOLVABLE
// PURE APPEND-ONLY LOGGER — ZERO ASYNC, ZERO NETWORK, HEARTBEAT-FLUSHABLE
// Designed for 10ms bursts of 1000+ messages without blocking or drift.
// ============================================================================
//
// CORE PRINCIPLES (v24++)
// -----------------------
// 1) Logger is a NERVE ENDING, not a NETWORK CLIENT.
// 2) Logger is SYNC-ONLY and APPEND-ONLY.
// 3) HEARTBEAT is the ONLY FLUSHER.
// 4) LOGGER MUST NEVER BLOCK UI OR GPU.
// 5) LOGGER IS EVOLUTION-AWARE BUT NOT EVOLUTION-DRIVING.
// 6) LOGGER IS MULTI-LAYER AWARE (WINDOW / WORKER / NODE / UNKNOWN).
// 7) AI CONSOLE / PROMPTS ARE REMOVED FROM LOGGER.
// 8) LOGGER IS SCHEMA-STABLE AND EVOLVABLE.
// ============================================================================
// import {
//   OrganismIdentity,
//   buildPulseOrganismMap as buildOrganismMap
// } from "../../PULSE-BAND/PULSE-X/PulseWorldOrganismMap-v24.js";
// const Identity = OrganismIdentity(import.meta.url);

// // 2 — EXPORT GENOME METADATA
// // export const PulseBinaryWaveScannerMeta = Identity.OrganMeta;
// export const pulseRole = Identity.pulseRole;
// export const PulseRole = Identity.pulseRole;
// export const surfaceMeta = Identity.surfaceMeta;
// export const pulseLoreContext = Identity.pulseLoreContext;
// // export const WBC_CONTEXT = Identity.pulseLoreContext;
// export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
// export const EXPORT_META = Identity.EXPORT_META;

console.log("PulseProofLogger v24-IMMORTAL-EVOLVABLE");

// Capture original console to avoid recursion and preserve native behavior
const _c = { ...console };

// Global handle (safe, environment-agnostic)
const g =
  typeof globalThis !== "undefined"
    ? globalThis
    : typeof global !== "undefined"
    ? global
    : typeof window !== "undefined"
    ? window
    : typeof self !== "undefined"
    ? self
    : {};

// -----------------------------------------------------------------------------
// Environment + layer detection (pure, no flags, no network)
// -----------------------------------------------------------------------------

function normalizeLayerName(layer) {
  if (!layer) return null;
  return String(layer).trim();
}

function detectEnvironmentKind() {
  if (typeof window !== "undefined" && typeof document !== "undefined") {
    return "WINDOW";
  }
  if (typeof self !== "undefined" && typeof self.postMessage === "function") {
    return "WORKER";
  }
  if (typeof process !== "undefined" && process.versions && process.versions.node) {
    return "NODE";
  }
  return "UNKNOWN";
}

function detectLayer(metaLayer = null) {
  const explicit = normalizeLayerName(metaLayer);
  if (explicit) return explicit;

  const env = detectEnvironmentKind();
  switch (env) {
    case "WINDOW":
      return "WINDOW";
    case "WORKER":
      return "WORKER";
    case "NODE":
      return "NODE";
    default:
      return "UNKNOWN";
  }
}

function detectUsVsThem(layer) {
  const upper = String(layer || "").toUpperCase();
  return upper.includes("PULSENET") || upper.includes("PULSEWORLD") ? "US" : "THEM";
}

function detectPage() {
  if (typeof window !== "undefined" && window.location) {
    return window.location.pathname || null;
  }
  return null;
}

function detectNodeProcessId() {
  if (typeof process !== "undefined" && process.pid) {
    return process.pid;
  }
  return null;
}

// -----------------------------------------------------------------------------
// Local persistence strategy — v24 IMMORTAL (PURELY LOCAL)
// -----------------------------------------------------------------------------

const LS_KEY_LOGS = "PulseProofLogger.v24.logs";
const LS_MAX_ENTRIES = 16000;

function hasLocalStorage() {
  try {
    if (typeof window === "undefined" || !window.localStorage) return false;
    const testKey = "__pulse_logger_test__";
    window.localStorage.setItem(testKey, "1");
    window.localStorage.removeItem(testKey);
    return true;
  } catch (_) {
    return false;
  }
}

function loadLocalLogsFromStorage() {
  if (!hasLocalStorage()) return [];
  try {
    const raw = window.localStorage.getItem(LS_KEY_LOGS);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch (_) {
    return [];
  }
}

function saveLocalLogsToStorage(entries) {
  if (!hasLocalStorage()) return;
  try {
    const trimmed =
      entries.length > LS_MAX_ENTRIES
        ? entries.slice(entries.length - LS_MAX_ENTRIES)
        : entries;
    window.localStorage.setItem(LS_KEY_LOGS, JSON.stringify(trimmed));
  } catch (_) {
    // Never throw from logger; logging must never break the app.
  }
}

// In-memory buffer mirrors localStorage when available.
let localLogBuffer = loadLocalLogsFromStorage();
let inMemoryOnly = !hasLocalStorage();

function persistLocalLogs(entries) {
  if (inMemoryOnly) {
    if (entries.length > LS_MAX_ENTRIES) {
      localLogBuffer = entries.slice(entries.length - LS_MAX_ENTRIES);
    } else {
      localLogBuffer = entries;
    }
    return;
  }
  saveLocalLogsToStorage(entries);
}

function appendLocalLog(entry) {
  localLogBuffer.push(entry);
  persistLocalLogs(localLogBuffer);
}

function getLocalLogs({ level = null, subsystem = null } = {}) {
  return localLogBuffer.filter((e) => {
    if (level && e.level !== level) return false;
    if (subsystem && e.subsystem !== subsystem) return false;
    return true;
  });
}

function drainLocalLogsForHeartbeat() {
  const copy = localLogBuffer.slice();
  localLogBuffer = [];
  persistLocalLogs(localLogBuffer);
  return copy;
}

// -----------------------------------------------------------------------------
// Version / roles / colors / icons (metadata only, no behavior)
// -----------------------------------------------------------------------------
// ============================================================================
//  DETERMINISTIC VERSION MAP
//  - All real subsystems are v24
//  - Legacy is fallback ONLY
// ============================================================================

export const PulseVersion = {
  proof: "24.0",
  logger: "24.0",
  renderer: "24.0",
  gpu: "24.0",
  band: "24.0",
  vault: "24.0",
  hooks: "24.0",
  endpoint: "24.0",
  router: "24.0",
  expansion: "24.0",
  bridge: "24.0",
  internet: "24.0",
  memory: "24.0",
  pages: "24.0",
  cns: "24.0"
};

// fallback only
export const PulseVersionFallback = "16.x";


// ============================================================================
//  DETERMINISTIC ROLE MAP
//  - No legacy in main list
//  - Legacy is fallback ONLY
// ============================================================================

export const PulseRoles = {
  proof: "PROOF MONITOR",
  logger: "PROOF LOGGER",
  renderer: "RENDERER",
  gpu: "GPU SUBSYSTEM",
  band: "NERVOUS SYSTEM",
  vault: "VAULT SUBSYSTEM",
  hooks: "HOOK REGISTRY",
  endpoint: "REMOTE ENDPOINT",
  router: "ROUTER",
  expansion: "EXPANSION ENGINE",
  bridge: "CNS BRIDGE",
  internet: "INTERNET SUBSYSTEM",
  memory: "MEMORY SUBSYSTEM",
  pages: "PAGE SUBSYSTEM",
  cns: "CNS CORE"
};

// fallback only
export const PulseRoleFallback = "LEGACY SUBSYSTEM";


// ============================================================================
//  DETERMINISTIC COLOR MAP
//  - No legacy in main list
//  - Legacy is fallback ONLY
// ============================================================================

export const PulseColors = {
  proof: "#4DD0E1",
  logger: "#FF7043",
  renderer: "#29B6F6",
  gpu: "#7E57C2",
  band: "#66BB6A",
  vault: "#26C6DA",
  hooks: "#AB47BC",
  endpoint: "#FFA726",
  router: "#42A5F5",
  expansion: "#26A69A",
  bridge: "#EC407A",
  internet: "#8D6E63",
  memory: "#5C6BC0",
  pages: "#26C6DA",
  cns: "#EF5350",
  signal: "#90CAF9"
};

// fallback only
export const PulseColorFallback = "#BDBDBD";


// ============================================================================
//  DETERMINISTIC ICON MAP
//  - No legacy in main list
//  - Legacy is fallback ONLY
// ============================================================================

export const PulseIcons = {
  proof: "📜",
  logger: "🖨️",
  renderer: "✨",
  gpu: "🎨",
  band: "🧠",
  vault: "🔐",
  hooks: "🪝",
  endpoint: "🌐",
  router: "🛰️",
  expansion: "🚀",
  bridge: "🌉",
  internet: "📡",
  memory: "💾",
  pages: "📄",
  cns: "🧬",
  signal: "📡"
};

// fallback only
export const PulseIconFallback = "🖥️";

// ============================================================================
//  PREFIX FORMATTER — DETERMINISTIC
// ============================================================================

function formatPrefix(subsystem) {
  const safe = subsystem || "legacy";
  const role = PulseRoles[safe] || PulseRoleFallback;
  const version = PulseVersion[safe] || PulseVersionFallback;
  const icon = PulseIcons[safe] || PulseIconFallback;
  return `${icon} ${role} v${version}`;
}

// ============================================================================
//  TELEMETRY PACKET — DETERMINISTIC
// ============================================================================

export function makeTelemetryPacket(subsystem, event, data = {}) {
  const safe = subsystem || "legacy";
  const ts = Date.now();

  const version = PulseVersion[safe] || PulseVersionFallback;
  const role = PulseRoles[safe] || PulseRoleFallback;
  const icon = PulseIcons[safe] || PulseIconFallback;

  const band = data.band || "dual";
  const presenceField = data.presenceField || null;
  const advantageField = data.advantageField || null;
  const speedField = data.speedField || null;
  const experienceField = data.experienceField || null;

  const binary = {
    artery: data.binaryArtery || false,
    channel: data.binaryChannel || null
  };

  const lineage = {
    id: data.lineageId || null,
    parent: data.lineageParent || null
  };

  const envKind = detectEnvironmentKind();
  const nodePid = detectNodeProcessId();

  return {
    schemaVersion: "24.0",
    ts,
    subsystem: safe,
    event,
    version,
    role,
    icon,
    data,
    env: {
      kind: envKind,
      nodePid
    },
    meta: {
      layer: "PulseProofLogger",
      version: "24.0-Immortal-META",
      subsystem: safe,
      event,
      band,
      presenceField,
      advantageField,
      speedField,
      experienceField,
      binary,
      lineage
    }
  };
}

// ============================================================================
//  IMMORTAL LOG ENTRY BUILDER — DETERMINISTIC
// ============================================================================

let logIdCounter = Date.now();

function makeLocalLogEntry(level, subsystem, message, rest, meta = {}) {
  const safe = subsystem || "legacy";

  const layer = detectLayer(meta.layer);
  const us_vs_them = detectUsVsThem(layer);
  const page = meta.page || detectPage();
  const func = meta.func || null;
  const system = meta.system || null;
  const subsystemName = meta.subsystem || safe;
  const organ = meta.organ || null;
  const extra = meta.extra || {};

  const band = meta.band || "dual";
  const presenceField = meta.presenceField || null;
  const advantageField = meta.advantageField || null;
  const speedField = meta.speedField || null;
  const experienceField = meta.experienceField || null;

  const iqVersion = meta.iqVersion || null;
  const uiGenomeVersion = meta.uiGenomeVersion || null;
  const comfortPattern = meta.comfortPattern || null;
  const route = meta.route || null;
  const compilerVersion = meta.compilerVersion || null;
  const organismVersion = meta.organismVersion || null;

  const envKind = detectEnvironmentKind();
  const nodePid = detectNodeProcessId();

  return {
    schemaVersion: "24.0",
    id: `L${++logIdCounter}`,
    ts: Date.now(),
    level,
    subsystem: subsystemName,
    message,
    rest,
    layer,
    us_vs_them,
    system,
    organ,
    page,
    func,
    extra,
    band,
    presenceField,
    advantageField,
    speedField,
    experienceField,
    iqVersion,
    uiGenomeVersion,
    comfortPattern,
    route,
    compilerVersion,
    organismVersion,
    env: {
      kind: envKind,
      nodePid
    },
    synced: false
  };
}

// ============================================================================
//  CORE LOG ENTRY CREATION — IMMORTAL++
// ============================================================================

import { PulseProofSignal } from "./PulseProofSignal-v24.js";

export function pulseLog({
  layer = null,
  system = null,
  subsystem = null,
  organ = null,
  page = null,
  func = null,
  message = "",
  extra = {},
  level = "log",
  rest = [],
  band = "dual",
  presenceField = null,
  advantageField = null,
  speedField = null,
  experienceField = null,
  iqVersion = null,
  uiGenomeVersion = null,
  comfortPattern = null,
  route = null,
  compilerVersion = null,
  organismVersion = null
} = {}) {
  const detectedLayer = detectLayer(layer);
  const detectedPage = page || detectPage();
  const safeSubsystem = subsystem || "legacy";

  if (typeof func === "function") func = func.name || "anonymous";

  const meta = {
    layer: detectedLayer,
    system,
    subsystem: safeSubsystem,
    organ,
    page: detectedPage,
    func,
    extra,
    band,
    presenceField,
    advantageField,
    speedField,
    experienceField,
    iqVersion,
    uiGenomeVersion,
    comfortPattern,
    route,
    compilerVersion,
    organismVersion
  };

  const entry = makeLocalLogEntry(level, safeSubsystem, message, rest, meta);

  appendLocalLog(entry);

  try {
    PulseProofSignal.fromLogEntry(entry);
  } catch (_) {}
}

// ============================================================================
//  ARG NORMALIZATION — DETERMINISTIC
// ============================================================================

function normalizeArgs(args) {
  let message = "";
  let rest = [];
  let raw = false;

  const first = args[0];

  // Raw CSS logs: log("%c...", ...)
  if (typeof first === "string" && first.startsWith("%c")) {
    return { subsystem: null, message: first, rest: args.slice(1), raw: true };
  }

  // comment("comment", { ... })
  if (
    args.length === 2 &&
    first === "comment" &&
    typeof args[1] === "object" &&
    args[1] !== null
  ) {
    const obj = args[1];

    const pretty =
      obj.pretty ||
      obj.summary ||
      obj.message ||
      obj.signalPacketType ||
      "signal-comment";

    return {
      subsystem: "signal",
      message: pretty,
      rest: [obj],
      raw: false
    };
  }

  // log("gpu", "message")
  if (args.length >= 2 && typeof first === "string" && typeof args[1] === "string") {
    return { subsystem: first, message: args[1], rest: args.slice(2), raw: false };
  }

  // log({ ... })
  if (typeof first === "object" && first !== null) {
    return { subsystem: null, message: "", rest: [first], raw: false };
  }

  // log("message")
  if (args.length === 1) {
    return { subsystem: null, message: first, rest: [], raw: false };
  }

  // log("a", "b", "c")
  return { subsystem: null, message: args.join(" "), rest: [], raw: false };
}


function mark404(message) {
  if (typeof message === "string" && message.trim() === "404") {
    return "404*";
  }
  return message;
}

// ============================================================================
//  CORE LOGGING FUNCTIONS — DETERMINISTIC
// ============================================================================
export function log(...args) {
  const { subsystem, message, rest, raw } = normalizeArgs(args);

  const meta = resolveFromOrganismMap();
  const safe = meta?.subsystem || subsystem || "legacy";
  const version = meta?.version || "v12.3";

  const color = meta?.color || PulseColors[safe] || PulseColorFallback;
  const prefix = `${meta?.icon || "🔹"} ${safe.toUpperCase()} ${version}`;

  const safeMessage = mark404(message);

  if (raw) {
    _c.log(safeMessage, ...rest);
  } else {
    _c.log(`%c${prefix} — ${safeMessage}`, `color:${color}; font-weight:bold;`, ...rest);
  }

  pulseLog({ level: "log", subsystem: safe, version, message: safeMessage, rest });
}


export function warn(...args) {
  const { subsystem, message, rest } = normalizeArgs(args);

  const meta = resolveFromOrganismMap();
  const safe = meta?.subsystem || subsystem || "legacy";
  const version = meta?.version || "v12.3";

  const color = meta?.color || "#FFEE58";
  const prefix = `${meta?.icon || "🔹"} ${safe.toUpperCase()} ${version}`;

  const safeMessage = mark404(message);

  _c.warn(`%c${prefix} ⚠️ [WARN] — ${safeMessage}`, `color:${color}; font-weight:bold;`, ...rest);

  pulseLog({ level: "warn", subsystem: safe, version, message: safeMessage, rest });
}


export function error(...args) {
  const { subsystem, message, rest } = normalizeArgs(args);

  const meta = resolveFromOrganismMap();
  const safe = meta?.subsystem || subsystem || "legacy";
  const version = meta?.version || "v12.3";

  const color = meta?.color || "#EF5350";
  const prefix = `${meta?.icon || "🔹"} ${safe.toUpperCase()} ${version}`;

  const safeMessage = mark404(message);

  _c.error(`%c${prefix} 🟥 [ERROR] — ${safeMessage}`, `color:${color}; font-weight:bold;`, ...rest);

  pulseLog({ level: "error", subsystem: safe, version, message: safeMessage, rest });
}


export function critical(...args) {
  const { subsystem, message, rest } = normalizeArgs(args);

  const meta = resolveFromOrganismMap();
  const safe = meta?.subsystem || subsystem || "legacy";
  const version = meta?.version || "v12.3";

  const color = meta?.color || "#D32F2F";
  const prefix = `${meta?.icon || "🔹"} ${safe.toUpperCase()} ${version}`;

  const safeMessage = mark404(message);

  _c.groupCollapsed(
    `%c${prefix} 💀 [CRITICAL] — ${safeMessage}`,
    `color:${color}; font-weight:bold; font-size:14px;`
  );
  _c.error(`%c${safeMessage}`, `color:${color}; font-weight:bold;`, ...rest);
  _c.groupEnd();

  pulseLog({ level: "critical", subsystem: safe, version, message: safeMessage, rest });
}


// -----------------------------------------------------------------------------
//  COMMENT LEVEL — IMMORTAL++
// -----------------------------------------------------------------------------

export function comment(...args) {
  const { subsystem, message, rest } = normalizeArgs(args);

  const meta = resolveFromOrganismMap();
  const safe = meta?.subsystem || subsystem || "signal";
  const version = meta?.version || "v12.3";

  const color = meta?.color || "#90CAF9";
  const prefix = `${meta?.icon || "🔹"} ${safe.toUpperCase()} ${version}`;

  const safeMessage = mark404(message);

  _c.log(
    `%c${prefix} 📝 [COMMENT] — ${safeMessage}`,
    `color:${color}; font-weight:bold;`,
    ...rest
  );

  pulseLog({ level: "comment", subsystem: safe, version, message: safeMessage, rest });
}


// -----------------------------------------------------------------------------
//  GROUPING HELPERS — IMMORTAL++
// -----------------------------------------------------------------------------

export function group(subsystem, label) {
  const meta = resolveFromOrganismMap();
  const safe = meta?.subsystem || subsystem || "legacy";
  const version = meta?.version || "v12.3";

  const color = meta?.color || PulseColors[safe] || PulseColorFallback;
  const prefix = `${meta?.icon || "🔹"} ${safe.toUpperCase()} ${version}`;

  _c.groupCollapsed(`%c${prefix} — ${label}`, `color:${color}; font-weight:bold;`);
}


export function groupEnd() {
  _c.groupEnd();
}


function resolveFromOrganismMap() {
  try {
    const stack = new Error().stack;
    const match = stack.match(/(file:\/\/[^\s)]+)/);
    if (!match) return null;

    const fileUrl = match[1];
    const parts = fileUrl.split("/");

    // ---------------------------------------------
    // SUBSYSTEM FROM FOLDER NAME
    // ---------------------------------------------
    const folder = parts[parts.length - 2]; // e.g. "PULSE-MESH"
    let subsystem = "legacy";

    if (folder.startsWith("PULSE-")) {
      subsystem = folder.replace("PULSE-", "").toLowerCase();
    }

    // Special case: PULSE-X → world
    if (folder === "PULSE-X") {
      subsystem = "world";
    }

    // ---------------------------------------------
    // VERSION FROM FILENAME
    // ---------------------------------------------
    const fileName = parts[parts.length - 1];
    let version = "v12.3";

    const vMatch = fileName.match(/-v(\d+(\.\d+)?)/i);
    if (vMatch) {
      version = `v${vMatch[1]}`;
    }

    return {
      subsystem,
      version,
      color: PulseColors[subsystem] || PulseColorFallback,
      icon: "🔹"
    };

  } catch {
    return null;
  }
}




// -----------------------------------------------------------------------------
//  Pulse command handler (LOCAL-ONLY, NO NETWORK)
// -----------------------------------------------------------------------------

function handlePulseCommand(cmd) {
  const raw = cmd.slice(6).trim();
  const parts = raw.split(/\s+/);
  const verb = parts[0] ? parts[0].toLowerCase() : "";

  switch (verb) {
    case "help":
      _c.groupCollapsed(
        "%c🤖 Pulse Logger Help (Pulse: commands)",
        "color:#9b59b6; font-weight:bold; font-size:13px;"
      );
      _c.log("• Pulse: Help   → show this help banner");
      _c.log("• Pulse: Logs   → dump offline log buffer");
      _c.groupEnd();
      break;

    case "logs": {
      const all = getLocalLogs();
      _c.groupCollapsed(
        "%cPulse: Offline Logs",
        "color:#FF7043; font-weight:bold;"
      );
      _c.log(all);
      _c.groupEnd();
      break;
    }

    default:
      _c.warn(`Unknown Pulse command: ${verb}. Type "Pulse: Help" for options.`);
      break;
  }
}

// -----------------------------------------------------------------------------
//  PulseLoggerStore — HEARTBEAT INTERFACE (IMMORTAL++)
// -----------------------------------------------------------------------------

export const PulseLoggerStore = {
  getAll() {
    return getLocalLogs();
  },

  clear() {
    localLogBuffer = [];
    persistLocalLogs(localLogBuffer);
  },

  tail(n = 200) {
    const buf = getLocalLogs();
    if (n <= 0) return [];
    return buf.slice(Math.max(0, buf.length - n));
  },

  drainForHeartbeat() {
    const drained = drainLocalLogsForHeartbeat();

    try {
      for (const entry of drained) {
        PulseProofSignal.fromLogEntry(entry);
      }
    } catch (_) {}

    return drained;
  }
};

// -----------------------------------------------------------------------------
//  LEGACY CONSOLE REDIRECTS — IMMORTAL++
// -----------------------------------------------------------------------------

const originalConsoleLog = _c.log;
const originalConsoleWarn = _c.warn;
const originalConsoleError = _c.error;

console.log = (...args) => {
  if (typeof args[0] === "string" && args[0].startsWith("Pulse:")) {
    handlePulseCommand(args[0]);
    return;
  }
  log(...args);
};

console.warn = (...args) => warn(...args);
console.error = (...args) => error(...args);

// -----------------------------------------------------------------------------
//  GLOBAL LOGGER BINDINGS — IMMORTAL++
// -----------------------------------------------------------------------------

(function bindLogger() {
  try {
    if (typeof window !== "undefined") {
      window.log = log;
      window.warn = warn;
      window.error = error;
      window.critical = critical;
      window.comment = comment;
      window.group = group;
      window.groupEnd = groupEnd;

      window.PulseOfflineLogs = {
        getAll: () => getLocalLogs(),
        getByLevel: (level) => getLocalLogs({ level }),
        getBySubsystem: (subsystem) => getLocalLogs({ subsystem }),
        clear: () => PulseLoggerStore.clear()
      };

      window.PulseLogger = {
        log,
        warn,
        error,
        critical,
        comment,
        group,
        groupEnd,
        makeTelemetryPacket,
        getLocalLogs,
        PulseLoggerStore,
        meta: { layer: "PulseProofLogger", version: "24.0-IMMORTAL++" }
      };
    }

    g.log = log;
    g.warn = warn;
    g.error = error;
    g.critical = critical;
    g.comment = comment;
    g.group = group;
    g.groupEnd = groupEnd;

    g.PulseOfflineLogs = {
      getAll: () => getLocalLogs(),
      getByLevel: (level) => getLocalLogs({ level }),
      getBySubsystem: (subsystem) => getLocalLogs({ subsystem }),
      clear: () => PulseLoggerStore.clear()
    };

    g.PulseLogger = {
      log,
      warn,
      error,
      critical,
      comment,
      group,
      groupEnd,
      makeTelemetryPacket,
      getLocalLogs,
      PulseLoggerStore,
      meta: { layer: "PulseProofLogger", version: "24.0-IMMORTAL++" }
    };
  } catch (err) {
    originalConsoleError("Logger binding failed:", err);
  }
})();

// -----------------------------------------------------------------------------
//  EXPORT IMMORTAL++ LOGGER
// -----------------------------------------------------------------------------

export const VitalsLogger = {
  log,
  warn,
  error,
  critical,
  comment,
  group,
  groupEnd,
  makeTelemetryPacket,
  getLocalLogs,
  PulseLoggerStore,
  meta: { layer: "PulseProofLogger", version: "24.0-IMMORTAL++" }
};

export const logger = { ...VitalsLogger };
export default logger;
