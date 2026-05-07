// ============================================================================
// PulseProofLogger-v20-IMMORTAL-EVOLVABLE
// PURE APPEND-ONLY LOGGER — ZERO ASYNC, ZERO NETWORK, HEARTBEAT-FLUSHABLE
// Designed for 10ms bursts of 1000+ messages without blocking or drift.
// ============================================================================
//
// CORE PRINCIPLES
// ---------------
// 1) Logger is a NERVE ENDING, not a NETWORK CLIENT.
//    - It ONLY records events locally.
//    - It NEVER talks to Firebase, CNS, HTTP, or any remote.
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
//      comfort pattern, compiler version, etc.
//    - But it does NOT compute or mutate those systems.
//      It only records what it’s told.
//
// 6) AI CONSOLE / PROMPTS ARE REMOVED FROM LOGGER.
//    - Developer-console-based AI interaction is no longer the path.
//    - We will use a dedicated UI organ (e.g., dropdown AI console)
//      for AI interaction, not the logger.
//
// ============================================================================

console.log("PulseProofLogger v20-IMMORTAL-EVOLVABLE");

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
    : typeof g !== "undefined"
    ? g
    : {};

// -----------------------------------------------------------------------------
// Environment + layer detection (pure, no flags, no network)
// -----------------------------------------------------------------------------
//
// These helpers are intentionally minimal and synchronous.
// They infer context (layer, us/them, page) without any external calls.
// This keeps logging cheap and deterministic.
//

function normalizeLayerName(layer) {
  if (!layer) return null;
  return String(layer).trim();
}

function detectLayer(metaLayer = null) {
  const explicit = normalizeLayerName(metaLayer);
  if (explicit) return explicit;

  if (typeof window !== "undefined") return "WINDOW";
  return "UNKNOWN";
}

function detectUsVsThem(layer) {
  const upper = String(layer || "").toUpperCase();
  return upper.includes("PULSENET") ? "US" : "THEM";
}

function detectPage() {
  if (typeof window !== "undefined" && window.location) {
    return window.location.pathname || null;
  }
  return null;
}

// -----------------------------------------------------------------------------
// LocalStorage OFFLINE LOG STORE — v20 IMMORTAL (PURELY LOCAL)
// -----------------------------------------------------------------------------
//
// This is the ONLY persistence layer the logger touches.
// - No Firebase
// - No CNS
// - No network
//
// Heartbeat will read from this store and push logs to remote systems.
// Logger only appends and trims.
//

const LS_KEY_LOGS = "PulseProofLogger.v20.logs";
const LS_MAX_ENTRIES = 12000; // allow high-burst logging without unbounded growth

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

function loadLocalLogs() {
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

function saveLocalLogs(entries) {
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

// In-memory buffer mirrors localStorage; all operations are sync and cheap.
let localLogBuffer = loadLocalLogs();

function appendLocalLog(entry) {
  // PURE APPEND — no async, no network, no branching on environment.
  localLogBuffer.push(entry);
  saveLocalLogs(localLogBuffer);
}

function getLocalLogs({ level = null, subsystem = null } = {}) {
  return localLogBuffer.filter((e) => {
    if (level && e.level !== level) return false;
    if (subsystem && e.subsystem !== subsystem) return false;
    return true;
  });
}

// Heartbeat-only drain: HEART reads + clears, then posts wherever it wants.
// This is the ONLY place logs are "removed" from the buffer.
function drainLocalLogsForHeartbeat() {
  const copy = localLogBuffer.slice();
  localLogBuffer = [];
  saveLocalLogs(localLogBuffer);
  return copy;
}

// -----------------------------------------------------------------------------
// Version / roles / colors / icons (metadata only, no behavior)
// -----------------------------------------------------------------------------
//
// These are purely descriptive. They help format console output and
// annotate logs with subsystem identity.
//

export const PulseVersion = {
  proof: "20.0",
  logger: "20.0",
  renderer: "20.0",
  gpu: "20.0",
  band: "20.0",
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
  const version = PulseVersion[subsystem] || "20.x";
  const icon = PulseIcons[subsystem] || PulseIcons.legacy;
  return `${icon} ${role} v${version}`;
}

// -----------------------------------------------------------------------------
// Telemetry packet formatter (LOCAL-ONLY, NO NETWORK)
// -----------------------------------------------------------------------------
//
// This does NOT send telemetry anywhere.
// It only builds a structured packet that Heartbeat or another organ
// may choose to send later.
//

export function makeTelemetryPacket(subsystem, event, data = {}) {
  const ts = Date.now();
  const version = PulseVersion[subsystem] || "20.x";
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

  return {
    ts,
    subsystem,
    event,
    version,
    role,
    icon,
    data,
    meta: {
      layer: "PulseProofLogger",
      version: "20.0-Immortal-META",
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
//
// This is the core shape of a log entry.
// It includes evolution-aware fields but does not compute them.
// The caller (IQ, UI genome, compiler, etc.) provides those values.
//

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

  // v20 evolution metadata (all optional, purely descriptive)
  const iqVersion = meta.iqVersion || null;
  const uiGenomeVersion = meta.uiGenomeVersion || null;
  const comfortPattern = meta.comfortPattern || null;
  const route = meta.route || null;
  const compilerVersion = meta.compilerVersion || null;
  const organismVersion = meta.organismVersion || null;

  return {
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
    // "synced" is now a semantic flag Heartbeat can use if it wants.
    synced: false
  };
}

// -----------------------------------------------------------------------------
// CORE PULSE LOGGING PIPELINE — PURELY LOCAL, ZERO NETWORK
// -----------------------------------------------------------------------------
//
// This is the ONLY place where log entries are created and appended.
// No async, no network, no flush, no routing.
//

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

  const entry = makeLocalLogEntry(level, subsystem || "legacy", message, rest, meta);
  appendLocalLog(entry);
}

// -----------------------------------------------------------------------------
// ARG NORMALIZATION + SAFETY
// -----------------------------------------------------------------------------
//
// This keeps the public log/warn/error/critical API ergonomic while still
// feeding a structured pipeline.
//

function normalizeArgs(args) {
  let subsystem = "legacy";
  let message = "";
  let rest = [];
  let raw = false;

  const first = args[0];

  // CSS-style console formatting: log("%c...", "color:red", ...)
  if (typeof first === "string" && first.startsWith("%c")) {
    return { subsystem, message: first, rest: args.slice(1), raw: true };
  }

  // Subsystem + message: log("logger", "Something happened", ...)
  if (args.length >= 2 && typeof first === "string" && typeof args[1] === "string") {
    return { subsystem: first, message: args[1], rest: args.slice(2), raw: false };
  }

  // Object-based logging: log({ ... })
  if (typeof first === "object" && first !== null) {
    const obj = first;
    if (obj.pulseLayer === "NERVOUS-SYSTEM") subsystem = "band";
    if (obj.schemaVersion && obj.textures !== undefined) subsystem = "gpu";
    if (obj.binaryArtery === true) subsystem = "logger";
    return { subsystem, message: "", rest: [obj], raw: false };
  }

  // Single argument: log("hello")
  if (args.length === 1) {
    return { subsystem, message: first, rest: [], raw: false };
  }

  // Fallback: join everything into a single string
  return { subsystem, message: args.join(" "), rest: [], raw: false };
}

function mark404(message) {
  if (typeof message === "string" && message.trim() === "404") {
    // Mark 404s distinctly without changing semantics.
    return "404*";
  }
  return message;
}

// -----------------------------------------------------------------------------
// CORE LOGGING FUNCTIONS — PURE, BURST-SAFE, HEARTBEAT-FRIENDLY
// -----------------------------------------------------------------------------
//
// These are the functions you actually call: log, warn, error, critical.
// They:
//   1) Format to the original console (for dev visibility).
//   2) Append to the local log buffer via pulseLog().
// No async, no network, no flush.
//

export function log(...args) {
  const { subsystem, message, rest, raw } = normalizeArgs(args);
  const color = PulseColors[subsystem] || "#fff";
  const prefix = formatPrefix(subsystem);

  const safeMessage = mark404(message);

  if (raw) {
    _c.log(safeMessage, ...rest);
  } else {
    _c.log(
      `%c${prefix} — ${safeMessage}`,
      `color:${color}; font-weight:bold;`,
      ...rest
    );
  }

  pulseLog({
    level: "log",
    subsystem,
    message: safeMessage,
    rest
  });
}

export function warn(...args) {
  const { subsystem, message, rest } = normalizeArgs(args);
  const prefix = formatPrefix(subsystem);
  const safeMessage = mark404(message);

  _c.warn(
    `%c${prefix} ⚠️ [WARN] — ${safeMessage}`,
    "color:#FFEE58; font-weight:bold;",
    ...rest
  );

  pulseLog({
    level: "warn",
    subsystem,
    message: safeMessage,
    rest
  });
}

export function error(...args) {
  const { subsystem, message, rest } = normalizeArgs(args);
  const prefix = formatPrefix(subsystem);
  const safeMessage = mark404(message);

  _c.error(
    `%c${prefix} 🟥 [ERROR] — ${safeMessage}`,
    "color:#EF5350; font-weight:bold;",
    ...rest
  );

  pulseLog({
    level: "error",
    subsystem,
    message: safeMessage,
    rest
  });
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

  pulseLog({
    level: "critical",
    subsystem,
    message: safeMessage,
    rest
  });
}

// -----------------------------------------------------------------------------
// GROUPING HELPERS
// -----------------------------------------------------------------------------
//
// These are purely visual helpers for the dev console.
// They do not affect logging behavior.
//

export function group(subsystem, label) {
  const color = PulseColors[subsystem] || "#fff";
  const prefix = formatPrefix(subsystem);
  _c.groupCollapsed(
    `%c${prefix} — ${label}`,
    `color:${color}; font-weight:bold;`
  );
}

export function groupEnd() {
  _c.groupEnd();
}

// -----------------------------------------------------------------------------
// PulseLoggerStore — HEARTBEAT INTERFACE (PURELY LOCAL)
// -----------------------------------------------------------------------------
//
// This is the official interface Heartbeat uses to:
//   - inspect logs
//   - clear logs
//   - drain logs for remote posting
//
// Heartbeat is the ONLY organ that should call drainForHeartbeat().
//

export const PulseLoggerStore = {
  getAll() {
    return getLocalLogs();
  },

  clear() {
    localLogBuffer = [];
    saveLocalLogs(localLogBuffer);
  },

  tail(n = 200) {
    const buf = getLocalLogs();
    if (n <= 0) return [];
    return buf.slice(Math.max(0, buf.length - n));
  },

  // Heartbeat uses this to atomically drain logs and then post them elsewhere.
  drainForHeartbeat() {
    return drainLocalLogsForHeartbeat();
  }
};

// -----------------------------------------------------------------------------
// Pulse command handler (LOCAL-ONLY, NO NETWORK)
// -----------------------------------------------------------------------------
//
// We keep a minimal "Pulse: ..." console command handler for dev ergonomics,
// but we REMOVE all AI prompt / telemetry routing / persistence.
// This is now strictly local and diagnostic.
//

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
// Legacy console redirects — logger is the membrane (NO ASYNC, NO NETWORK)
// -----------------------------------------------------------------------------
//
// We intercept console.log/warn/error and route them through our logger,
// but we always use the captured original console methods (_c) internally
// to avoid recursion.
//

const originalConsoleLog = _c.log;
const originalConsoleWarn = _c.warn;
const originalConsoleError = _c.error;

console.log = (...args) => {
  // Special dev command: "Pulse: ..."
  if (typeof args[0] === "string" && args[0].startsWith("Pulse:")) {
    handlePulseCommand(args[0]);
    return;
  }
  log(...args);
};

console.warn = (...args) => {
  warn(...args);
};

console.error = (...args) => {
  error(...args);
};

// -----------------------------------------------------------------------------
// GLOBAL LOGGER BINDINGS — v20 IMMORTAL + OFFLINE LOG SURFACE
// -----------------------------------------------------------------------------
//
// We expose the logger globally for convenience, but we DO NOT expose any
// network or flush functions. Heartbeat owns flushing.
//

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
        // No flush here — Heartbeat owns flushing to network.
      };
    }

    globalThis.log = log;
    globalThis.warn = warn;
    globalThis.error = error;
    globalThis.critical = critical;
    globalThis.group = group;
    globalThis.groupEnd = groupEnd;

    globalThis.PulseOfflineLogs = {
      getAll: () => getLocalLogs(),
      getByLevel: (level) => getLocalLogs({ level }),
      getBySubsystem: (subsystem) => getLocalLogs({ subsystem }),
      clear: () => PulseLoggerStore.clear()
    };
  } catch (err) {
    originalConsoleError("Logger binding failed:", err);
  }
})();

// -----------------------------------------------------------------------------
// VitalsLogger EXPORT
// -----------------------------------------------------------------------------
//
// This is the public logger object. It is IMMORTAL, EVOLVABLE, and
// completely decoupled from network and async behavior.
//

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
  meta: { layer: "PulseProofLogger", version: "20.0-Immortal-EVOLVABLE" }
};

export const logger = { ...VitalsLogger };

const PulseProofLogger = logger;
export default PulseProofLogger;
