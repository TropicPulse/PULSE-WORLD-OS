// ============================================================================
// PulseProofLogger-v24-IMMORTAL-EVOLVABLE
// PURE APPEND-ONLY LOGGER — ZERO ASYNC, ZERO NETWORK, HEARTBEAT-FLUSHABLE
// Designed for 10ms bursts of 1000+ messages without blocking or drift.
// ============================================================================
//
// CORE PRINCIPLES (v24++)
// -----------------------
// 1) Logger is a NERVE ENDING, not a NETWORK CLIENT.
//    - It ONLY records events locally.
//    - It NEVER talks to Firebase, CNS, HTTP, or any remote.
//    - It is world-agnostic: any backend/frontend organ can attach.
//
// 2) Logger is SYNC-ONLY and APPEND-ONLY.
//    - No async, no await, no promises.
//    - No window.online listeners, no boot-time flushes.
//    - Every call returns immediately after writing to local memory.
//
// 3) HEARTBEAT is the ONLY FLUSHER.
//    - Heart/Heartbeat/PulseRhythm reads the local buffer
//      via PulseLoggerStore.drainForHeartbeat().
//    - Heartbeat decides when/how/where to send logs (Firebase, backend, etc).
//
// 4) LOGGER MUST NEVER BLOCK UI OR GPU.
//    - Must tolerate 1000+ logs in a 10ms burst.
//    - Must not allocate huge objects per call.
//    - Must not perform network, disk, or heavy computation.
//
// 5) LOGGER IS EVOLUTION-AWARE BUT NOT EVOLUTION-DRIVING.
//    - It can tag logs with IQ version, UI genome version,
//      comfort pattern, compiler version, organism version, etc.
//    - But it does NOT compute or mutate those systems.
//      It only records what it’s told.
//
// 6) LOGGER IS MULTI-LAYER AWARE (v24++).
//    - Can run in WINDOW, WORKER, NODE, or UNKNOWN.
//    - Uses a unified global surface (globalThis) where possible.
//    - Storage strategy is environment-aware but still local-only.
//
// 7) AI CONSOLE / PROMPTS ARE REMOVED FROM LOGGER.
//    - Developer-console-based AI interaction is not the path.
//    - A dedicated UI organ handles AI interaction, not the logger.
//
// 8) LOGGER IS SCHEMA-STABLE AND EVOLVABLE.
//    - Every entry carries a schemaVersion.
//    - New fields are additive and optional.
//    - Heartbeat can branch on schemaVersion safely.
// ============================================================================

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
  // Browser window
  if (typeof window !== "undefined" && typeof document !== "undefined") {
    return "WINDOW";
  }

  // Web Worker (Dedicated, Shared, Service)
  // SAFE: does NOT reference WorkerGlobalScope
  if (typeof self !== "undefined" && typeof self.postMessage === "function") {
    return "WORKER";
  }

  // Node.js
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
//
// Browser: localStorage
// Node / Worker / Unknown: in-memory only
// No network, no disk writes, no async.
// Heartbeat is responsible for shipping logs elsewhere.
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

export const PulseVersion = {
  proof: "24.0",
  logger: "24.0",
  renderer: "24.0",
  gpu: "24.0",
  band: "24.0",
  legacy: "11.x"
};

export const PulseRoles = {
  proof: "PROOF MONITOR",
  logger: "PROOF LOGGER",
  renderer: "RENDERER",
  gpu: "GPU SUBSYSTEM",
  band: "NERVOUS SYSTEM",
  legacy: "LEGACY SUBSYSTEM"
};

export const PulseColors = {
  proof: "#4DD0E1",
  logger: "#FF7043",
  renderer: "#29B6F6",
  gpu: "#7E57C2",
  band: "#66BB6A",
  legacy: "#BDBDBD"
};

export const PulseIcons = {
  proof: "📜",
  logger: "🖨️",
  renderer: "✨",
  gpu: "🎨",
  band: "🧠",
  legacy: "🖥️"
};

function formatPrefix(subsystem) {
  const role = PulseRoles[subsystem] || "SUBSYSTEM";
  const version = PulseVersion[subsystem] || "24.x";
  const icon = PulseIcons[subsystem] || PulseIcons.legacy;
  return `${icon} ${role} v${version}`;
}

// -----------------------------------------------------------------------------
// Telemetry packet formatter (LOCAL-ONLY, NO NETWORK)
// -----------------------------------------------------------------------------

export function makeTelemetryPacket(subsystem, event, data = {}) {
  const ts = Date.now();
  const version = PulseVersion[subsystem] || "24.x";
  const role = PulseRoles[subsystem] || "SUBSYSTEM";
  const icon = PulseIcons[subsystem] || PulseIcons.legacy;

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
    subsystem,
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
      subsystem,
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

// -----------------------------------------------------------------------------
// IMMORTAL LOG ENTRY BUILDER — PURE, SYNC, HEARTBEAT-FRIENDLY
// -----------------------------------------------------------------------------

let logIdCounter = Date.now();

function makeLocalLogEntry(level, subsystem, message, rest, meta = {}) {
  const layer = detectLayer(meta.layer);
  const us_vs_them = detectUsVsThem(layer);
  const page = meta.page || detectPage();
  const func = meta.func || null;
  const system = meta.system || null;
  const subsystemName = meta.subsystem || subsystem || null;
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

// -----------------------------------------------------------------------------
// CORE PULSE LOGGING PIPELINE — PURELY LOCAL, ZERO NETWORK
// -----------------------------------------------------------------------------
// ============================================================================
//  PULSEPROOFLOGGER-v24 IMMORTAL++
//  Pure Append-Only Logger • Signal-Mirrored • Zero Async • Zero Network
//  IMMORTAL++: Logger and Signal are parallel, not dependent
// ============================================================================

import { PulseProofSignal } from "./PulseProofSignal-v24.js";

// ============================================================================
//  CORE LOG ENTRY CREATION — IMMORTAL++
// ============================================================================

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

  if (typeof func === "function") func = func.name || "anonymous";

  const meta = {
    layer: detectedLayer,
    system,
    subsystem,
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

  // 1. Create local log entry
  const entry = makeLocalLogEntry(level, subsystem || "legacy", message, rest, meta);

  // 2. Append locally (IMMORTAL++: pure local, zero async)
  appendLocalLog(entry);

  // 3. Mirror to PulseProofSignal (IMMORTAL++: logger-independent)
  try {
    PulseProofSignal.fromLogEntry(entry);
  } catch (_) {
    // IMMORTAL++: signal must never break logger
  }
}

// ============================================================================
//  ARG NORMALIZATION — IMMORTAL++
// ============================================================================

function normalizeArgs(args) {
  let subsystem = "legacy";
  let message = "";
  let rest = [];
  let raw = false;

  const first = args[0];

  if (typeof first === "string" && first.startsWith("%c")) {
    return { subsystem, message: first, rest: args.slice(1), raw: true };
  }

  if (args.length >= 2 && typeof first === "string" && typeof args[1] === "string") {
    return { subsystem: first, message: args[1], rest: args.slice(2), raw: false };
  }

  if (typeof first === "object" && first !== null) {
    const obj = first;
    if (obj.pulseLayer === "NERVOUS-SYSTEM") subsystem = "band";
    if (obj.schemaVersion && obj.textures !== undefined) subsystem = "gpu";
    if (obj.binaryArtery === true) subsystem = "logger";
    return { subsystem, message: "", rest: [obj], raw: false };
  }

  if (args.length === 1) {
    return { subsystem, message: first, rest: [], raw: false };
  }

  return { subsystem, message: args.join(" "), rest: [], raw: false };
}

function mark404(message) {
  if (typeof message === "string" && message.trim() === "404") {
    return "404*";
  }
  return message;
}

// ============================================================================
//  CORE LOGGING FUNCTIONS — IMMORTAL++
// ============================================================================

export function log(...args) {
  const { subsystem, message, rest, raw } = normalizeArgs(args);
  const color = PulseColors[subsystem] || "#fff";
  const prefix = formatPrefix(subsystem);
  const safeMessage = mark404(message);

  if (raw) {
    _c.log(safeMessage, ...rest);
  } else {
    _c.log(`%c${prefix} — ${safeMessage}`, `color:${color}; font-weight:bold;`, ...rest);
  }

  pulseLog({ level: "log", subsystem, message: safeMessage, rest });
}

export function warn(...args) {
  const { subsystem, message, rest } = normalizeArgs(args);
  const prefix = formatPrefix(subsystem);
  const safeMessage = mark404(message);

  _c.warn(`%c${prefix} ⚠️ [WARN] — ${safeMessage}`, "color:#FFEE58; font-weight:bold;", ...rest);

  pulseLog({ level: "warn", subsystem, message: safeMessage, rest });
}

export function error(...args) {
  const { subsystem, message, rest } = normalizeArgs(args);
  const prefix = formatPrefix(subsystem);
  const safeMessage = mark404(message);

  _c.error(`%c${prefix} 🟥 [ERROR] — ${safeMessage}`, "color:#EF5350; font-weight:bold;", ...rest);

  pulseLog({ level: "error", subsystem, message: safeMessage, rest });
}

export function critical(...args) {
  const { subsystem, message, rest } = normalizeArgs(args);
  const prefix = formatPrefix(subsystem);
  const safeMessage = mark404(message);

  _c.groupCollapsed(
    `%c${prefix} 💀 [CRITICAL] — ${safeMessage}`,
    "color:#D32F2F; font-weight:bold; font-size:14px;"
  );
  _c.error(`%c${safeMessage}`, "color:#D32F2F; font-weight:bold;", ...rest);
  _c.groupEnd();

  pulseLog({ level: "critical", subsystem, message: safeMessage, rest });
}

// ============================================================================
//  GROUPING HELPERS — IMMORTAL++
// ============================================================================



// -----------------------------------------------------------------------------
// Pulse command handler (LOCAL-ONLY, NO NETWORK)
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

export function group(subsystem, label) {
  const color = PulseColors[subsystem] || "#fff";
  const prefix = formatPrefix(subsystem);
  _c.groupCollapsed(`%c${prefix} — ${label}`, `color:${color}; font-weight:bold;`);
}

export function groupEnd() {
  _c.groupEnd();
}

// ============================================================================
//  PulseLoggerStore — HEARTBEAT INTERFACE (IMMORTAL++)
// ============================================================================

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

    // IMMORTAL++: mirror drained logs to signal
    try {
      for (const entry of drained) {
        PulseProofSignal.fromLogEntry(entry);
      }
    } catch (_) {}

    return drained;
  }
};

// ============================================================================
//  LEGACY CONSOLE REDIRECTS — IMMORTAL++
// ============================================================================

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

// ============================================================================
//  GLOBAL LOGGER BINDINGS — IMMORTAL++
// ============================================================================

(function bindLogger() {
  try {
    if (typeof window !== "undefined") {
      window.log = log;
      window.warn = warn;
      window.error = error;
      window.critical = critical;
      window.group = group;
      window.groupEnd = groupEnd;

      window.PulseOfflineLogs = {
        getAll: () => getLocalLogs(),
        getByLevel: (level) => getLocalLogs({ level }),
        getBySubsystem: (subsystem) => getLocalLogs({ subsystem }),
        clear: () => PulseLoggerStore.clear()
      };
    }

    g.log = log;
    g.warn = warn;
    g.error = error;
    g.critical = critical;
    g.group = group;
    g.groupEnd = groupEnd;

    g.PulseOfflineLogs = {
      getAll: () => getLocalLogs(),
      getByLevel: (level) => getLocalLogs({ level }),
      getBySubsystem: (subsystem) => getLocalLogs({ subsystem }),
      clear: () => PulseLoggerStore.clear()
    };
  } catch (err) {
    originalConsoleError("Logger binding failed:", err);
  }
})();

// ============================================================================
//  EXPORT IMMORTAL++ LOGGER
// ============================================================================

export const VitalsLogger = {
  log,
  warn,
  error,
  critical,
  group,
  groupEnd,
  makeTelemetryPacket,
  getLocalLogs,
  PulseLoggerStore,
  meta: { layer: "PulseProofLogger", version: "24.0-IMMORTAL++" }
};

export const logger = { ...VitalsLogger };
export default logger;
