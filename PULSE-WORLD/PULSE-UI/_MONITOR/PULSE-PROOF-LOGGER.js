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
import { PulseProofSignal, PulseColors, PulseIcons, PulseColorFallback, PulseIconFallback, PulseRoleFallback, PulseRoles,PulseVersion,PulseVersionFallback } from "../_BACKEND/PULSE-WORLD-SIGNAL.js";

    console.log(
      "%c[PulseProofLogger v24-IMMORTAL-EVOLVABLE] %c Initializing PulseProofLogger %c",
      "color:#FF7043; font-weight:bold; font-family:monospace;",
      "color:#00FF9C; font-family:monospace;",
      "color:#E8F8FF; font-family:monospace;");

// Capture original console to avoid recursion and preserve native behavior
const _c = { ...console };

// Global handle (safe, environment-agnostic)

const G =
  (typeof window !== "undefined" && window) ||
  (typeof globalThis !== "undefined" && globalThis) ||
  (typeof self !== "undefined" && self) ||
  (typeof global !== "undefined" && global) ||
  {};
const g = G;
// ============================================================================
// UNIVERSAL TIMESTAMP (Shadow or Admin)
// ============================================================================

const Timestamp =
  (G.firebaseAdmin && G.firebaseAdmin.firestore && G.firebaseAdmin.firestore.Timestamp) ||
  (G.Timestamp && G.Timestamp) ||
  null;

// ============================================================================
// UNIVERSAL ADMIN (Shadow or Admin)
// ============================================================================

const admin =
  (G.firebaseAdmin && G.firebaseAdmin) ||
  (G.admin && G.admin) ||
  null;

// ============================================================================
// UNIVERSAL DB (Shadow DB ALWAYS wins)
// ============================================================================
const db =
  (G.db && G.db) ||                 // Shadow DB (v25++)
  (admin && admin.firestore && admin.firestore()) || // Admin fallback
  null;

// ============================================================================
// UNIVERSAL LOGGING
// ============================================================================

const dblog =
  (G.log && G.log) ||
  console.log;

const dberror =
  (G.error && G.error) ||
  console.error;
  
const fetchFn =
  (G.fetchfn && typeof G.fetchfn === "function" && G.fetchfn) ||   // Shadow fetch alias
  (G.fetch && typeof G.fetch === "function" && G.fetch) ||         // Global broadcasted Shadow.fetch
  null;

// Shared recursion guard with Signal (used by Signal side)
g.__PULSE_SIGNAL_LOGGING = g.__PULSE_SIGNAL_LOGGING || { active: false };

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
  if (typeof window !== "undefined" && global.location) {
    return global.location.pathname || null;
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
    if (typeof window === "undefined" || !global.localStorage) return false;
    const testKey = "__pulse_logger_test__";
    global.localStorage.setItem(testKey, "1");
    global.localStorage.removeItem(testKey);
    return true;
  } catch (_) {
    return false;
  }
}

function loadLocalLogsFromStorage() {
  if (!hasLocalStorage()) return [];
  try {
    const raw = global.localStorage.getItem(LS_KEY_LOGS);
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
    global.localStorage.setItem(LS_KEY_LOGS, JSON.stringify(trimmed));
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
//  PULSE LOG — FIXED (NO MORE LOGGER → SIGNAL → LOGGER LOOPS)
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
}

// ============================================================================
//  ARG NORMALIZATION — unchanged except for object handling
// ============================================================================

function normalizeArgs(args) {
  let message = "";
  let rest = [];
  let raw = false;

  const first = args[0];

  if (typeof first === "string" && first.startsWith("%c")) {
    return { subsystem: null, message: first, rest: args.slice(1), raw: true };
  }

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

  if (
    args.length >= 2 &&
    typeof first === "string" &&
    typeof args[1] === "object" &&
    args[1] !== null
  ) {
    return { subsystem: null, message: first, rest: args.slice(1), raw: false };
  }

  if (args.length >= 2 && typeof first === "string" && typeof args[1] === "string") {
    return { subsystem: first, message: args[1], rest: args.slice(2), raw: false };
  }

  if (typeof first === "object" && first !== null) {
    return { subsystem: null, message: "", rest: [first], raw: false };
  }

  if (args.length === 1) {
    return { subsystem: null, message: first, rest: [], raw: false };
  }

  return { subsystem: null, message: args.join(" "), rest: [], raw: false };
}

function mark404(message) {
  if (typeof message === "string" && message.trim() === "404") {
    return "404*";
  }
  return message;
}

// ============================================================================
//  CORE LOGGING FUNCTIONS — unchanged except for using IMMORTAL MAP
// ============================================================================
// ============================================================================
//  PULSE LOGGER v26 — IMMORTAL++
//  Full Chrono Logging Across All Levels
//  Colors preserved exactly as original
// ============================================================================
// ============================================================================
//  PULSE LOGGER v26 — IMMORTAL++
//  Colors ALWAYS ON — raw mode included
//  Adds delta/absolute timing to all logs
// ============================================================================

// ---------------------------------------------------------------------------
//  UNIFIED CHRONO CORE — v26
// ---------------------------------------------------------------------------
let _pulseChronoLast = global.__PULSE_CHRONO_LAST__ || performance.now();


function _chronoLabel(absolute) {
  const now = performance.now();
  const diff = now - _pulseChronoLast;

  const label = absolute
    ? `@${now.toFixed(1)}ms`
    : `+${diff.toFixed(1)}ms`;

  _pulseChronoLast = now;
  return label;
}

export function log(...args) {
  const { subsystem, message, rest, raw, absolute } = normalizeArgs(args);

  const meta  = resolveFromOrganismMap();
  const safe  = meta?.subsystem || subsystem || "legacy";

  const version =
    (PulseVersion[safe] ? `v${PulseVersion[safe]}` : `v${PulseVersionFallback}`) || meta?.version;

  const color = PulseColors[safe] || meta?.color || PulseColorFallback;
  const icon  = PulseIcons[safe] || meta?.icon  || PulseIconFallback;

  const prefix      = `${icon} ${safe.toUpperCase()} ${version}`;
  const safeMessage = mark404(message);
  const time        = _chronoLabel(absolute);
  global.__PULSE_CHRONO_LAST__ = _pulseChronoLast;

  // RAW MODE — SAME COLORS, SAME FORMAT, SAME %d SUPPORT
  if (raw) {
    _c.log(
      `%c${safeMessage} ${time}`,
      `color:${color}; font-weight:bold;`,
      ...rest
    );
    pulseLog({ level: "log", subsystem: safe, message: safeMessage, rest });
    return;
  }

  // NORMAL MODE — ONE %c ONLY (SAFE FOR %d/%s)
  _c.log(
    `%c${prefix} — ${safeMessage} ${time}`,
    `color:${color}; font-weight:bold;`,
    ...rest
  );

  pulseLog({ level: "log", subsystem: safe, message: safeMessage, rest });
}



// ---------------------------------------------------------------------------
//  WARN — YELLOW (UNCHANGED COLOR)
// ---------------------------------------------------------------------------
export function warn(...args) {
  const { subsystem, message, rest, absolute } = normalizeArgs(args);

  const meta = resolveFromOrganismMap();
  const safe = meta?.subsystem || subsystem || "legacy";

  const version =
    meta?.version ||
    (PulseVersion[safe] ? `v${PulseVersion[safe]}` : `v${PulseVersionFallback}`);

  const color = meta?.color || "#FFEE58"; // ORIGINAL COLOR
  const icon  = PulseIcons[safe] || meta?.icon  || PulseIconFallback;
  const prefix = `${icon} ${safe.toUpperCase()} ${version}`;

  const safeMessage = mark404(message);
  const time = _chronoLabel(absolute);
  global.__PULSE_CHRONO_LAST__ = _pulseChronoLast;

  _c.warn(
    `%c${prefix} ⚠️ [WARN] — ${safeMessage} %c${time}`,
    `color:${color}; font-weight:bold;`,
    "color:#999;font-weight:300;",
    ...rest
  );

  pulseLog({ level: "warn", subsystem: safe, message: safeMessage, rest });
}

// ---------------------------------------------------------------------------
//  ERROR — RED (UNCHANGED COLOR)
// ---------------------------------------------------------------------------
export function error(...args) {
  const { subsystem, message, rest, absolute } = normalizeArgs(args);

  const meta = resolveFromOrganismMap();
  const safe = meta?.subsystem || subsystem || "legacy";

  const version =
    meta?.version ||
    (PulseVersion[safe] ? `v${PulseVersion[safe]}` : `v${PulseVersionFallback}`);

  const color = meta?.color || "#EF5350"; // ORIGINAL COLOR
  const icon  = PulseIcons[safe] || meta?.icon  || PulseIconFallback;
  const prefix = `${icon} ${safe.toUpperCase()} ${version}`;

  const safeMessage = mark404(message);
  const time = _chronoLabel(absolute);
  global.__PULSE_CHRONO_LAST__ = _pulseChronoLast;

  _c.error(
    `%c${prefix} 🟥 [ERROR] — ${safeMessage} %c${time}`,
    `color:${color}; font-weight:bold;`,
    "color:#999;font-weight:300;",
    ...rest
  );

  pulseLog({ level: "error", subsystem: safe, message: safeMessage, rest });
}

// ---------------------------------------------------------------------------
//  CRITICAL — DARK RED (UNCHANGED COLOR)
// ---------------------------------------------------------------------------
export function critical(...args) {
  const { subsystem, message, rest, absolute } = normalizeArgs(args);

  const meta = resolveFromOrganismMap();
  const safe = meta?.subsystem || subsystem || "legacy";

  const version =
    meta?.version ||
    (PulseVersion[safe] ? `v${PulseVersion[safe]}` : `v${PulseVersionFallback}`);

  const color = meta?.color || "#D32F2F"; // ORIGINAL COLOR
  const icon  = PulseIcons[safe] || meta?.icon  || PulseIconFallback;
  const prefix = `${icon} ${safe.toUpperCase()} ${version}`;

  const safeMessage = mark404(message);
  const time = _chronoLabel(absolute);
  global.__PULSE_CHRONO_LAST__ = _pulseChronoLast;

  _c.groupCollapsed(
    `%c${prefix} 💀 [CRITICAL] — ${safeMessage} %c${time}`,
    `color:${color}; font-weight:bold; font-size:14px;`,
    "color:#999;font-weight:300;"
  );

  _c.error(
    `%c${safeMessage}`,
    `color:${color}; font-weight:bold;`,
    ...rest
  );

  _c.groupEnd();

  pulseLog({ level: "critical", subsystem: safe, message: safeMessage, rest });
}

// ---------------------------------------------------------------------------
//  COMMENT — BLUE (UNCHANGED COLOR)
// ---------------------------------------------------------------------------
export function comment(...args) {
  const { subsystem, message, rest, absolute } = normalizeArgs(args);

  const meta = resolveFromOrganismMap();
  const safe = meta?.subsystem || subsystem || "signal";

  const version =
    meta?.version ||
    (PulseVersion[safe] ? `v${PulseVersion[safe]}` : `v${PulseVersionFallback}`);

  const color = meta?.color || "#90CAF9"; // ORIGINAL COLOR
  const icon  = PulseIcons[safe] || meta?.icon  || PulseIconFallback;
  const prefix = `${icon} ${safe.toUpperCase()} ${version}`;

  const safeMessage = mark404(message);
  const time = _chronoLabel(absolute);
  global.__PULSE_CHRONO_LAST__ = _pulseChronoLast;

  _c.log(
    `%c${prefix} 📝 [COMMENT] — ${safeMessage} %c${time}`,
    `color:${color}; font-weight:bold;`,
    "color:#999;font-weight:300;",
    ...rest
  );

  pulseLog({ level: "comment", subsystem: safe, message: safeMessage, rest });
}

// ---------------------------------------------------------------------------
//  GROUPING HELPERS — IMMORTAL++
// ---------------------------------------------------------------------------
export function group(subsystem, label, absolute = false) {
  const meta = resolveFromOrganismMap();
  const safe = meta?.subsystem || subsystem || "legacy";

  const version =
    meta?.version ||
    (PulseVersion[safe] ? `v${PulseVersion[safe]}` : `v${PulseVersionFallback}`);

  const color = PulseColors[safe] || meta?.color || PulseColorFallback;
  const icon  = PulseIcons[safe] || meta?.icon  || PulseIconFallback;
  const prefix = `${icon} ${safe.toUpperCase()} ${version}`;

  const time = _chronoLabel(absolute);
  global.__PULSE_CHRONO_LAST__ = _pulseChronoLast;

  _c.groupCollapsed(
    `%c${prefix} — ${label} %c${time}`,
    `color:${color}; font-weight:bold;`,
    "color:#999;font-weight:300;"
  );
}

export function groupEnd() {
  _c.groupEnd();
}



// ============================================================================
//  IMMORTAL ORGANISM MAP LOOKUP — O(1)
// ============================================================================

function resolveFromOrganismMap() {
  try {
    if (global.PulseOrganismMap && typeof global.PulseOrganismMap.resolveCaller === "function") {
      return global.PulseOrganismMap.resolveCaller(new Error().stack);
    }

    return {
      subsystem: "legacy",
      version: "v16",
      color: PulseColorFallback,
      icon: PulseIconFallback
    };

  } catch (err) {
    return {
      subsystem: "legacy",
      version: "v16",
      color: PulseColorFallback,
      icon: PulseIconFallback
    };
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
      global.log = log;
      global.warn = warn;
      global.error = error;
      global.critical = critical;
      global.comment = comment;
      global.group = group;
      global.groupEnd = groupEnd;

      global.PulseOfflineLogs = {
        getAll: () => getLocalLogs(),
        getByLevel: (level) => getLocalLogs({ level }),
        getBySubsystem: (subsystem) => getLocalLogs({ subsystem }),
        clear: () => PulseLoggerStore.clear()
      };

      global.PulseLogger = {
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

export {PulseColors, PulseIcons, PulseColorFallback, PulseIconFallback, PulseRoleFallback, PulseRoles,PulseVersion,PulseVersionFallback};