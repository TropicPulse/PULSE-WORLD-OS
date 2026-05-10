// ============================================================================
//  PULSE OS v24.0‑IMMORTAL++ — PulseProofSignal Engine
//  Signal-Grade Telemetry • Logger-Attached but Logger-Independent
//  ZERO RANDOMNESS • ZERO EGO • DUALBAND-AWARE • ORGANISM-MAP-AWARE
// ============================================================================

import { OrganismIdentity } from "../PULSE-X/PulseWorldOrganismMap-v21.js";

const Identity = OrganismIdentity(import.meta.url);

// ============================================================================
//  META BLOCK — v24.0 IMMORTAL (ORGANISM KERNEL)
// ============================================================================
export const PulseProofSignalMeta = Identity.OrganMeta;

// ============================================================================
//  SURFACE / ORGANISM LAYER EXPORTS — v24.0 IMMORTAL
// ============================================================================
export const pulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

// ============================================================================
//  PACKET EMITTER — deterministic, signal-scoped
// ============================================================================
function emitSignalPacket(type, payload) {
  const now = Date.now();
  return Object.freeze({
    meta: PulseProofSignalMeta,
    exportMeta: EXPORT_META,
    packetType: `signal-${type}`,
    packetId: `signal-${type}-${now}`,
    timestamp: now,
    epoch: PulseProofSignalMeta.evo.epoch,
    ...payload
  });
}

// ============================================================================
//  TRANSPORT LAYER — network-safe, logger-independent
// ============================================================================

const DEFAULT_ENDPOINT = "/pulse/signal"; // you can override via config

function defaultSendBatch(batch, endpoint = DEFAULT_ENDPOINT) {
  try {
    if (typeof navigator !== "undefined" && navigator.sendBeacon) {
      const blob = new Blob([JSON.stringify(batch)], {
        type: "application/json"
      });
      navigator.sendBeacon(endpoint, blob);
      return;
    }

    if (typeof fetch !== "undefined") {
      // Fire-and-forget; no await to avoid coupling to app flow
      fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        keepalive: true,
        body: JSON.stringify(batch)
      }).catch(() => {});
    }
  } catch {
    // Swallow — signal engine must never throw into caller
  }
}

// ============================================================================
//  INTERNAL BUFFER — burst-safe, window-aware
// ============================================================================
const SignalBuffer = {
  _queue: [],
  _max: 2048,
  _flushSize: 128,
  _endpoint: DEFAULT_ENDPOINT,
  _customTransport: null,

  configure({ endpoint, transport } = {}) {
    if (endpoint) this._endpoint = endpoint;
    if (typeof transport === "function") this._customTransport = transport;
  },

  push(packet) {
    if (!packet) return;
    this._queue.push(packet);
    if (this._queue.length > this._max) {
      this._queue.splice(0, this._queue.length - this._max);
    }
    if (this._queue.length >= this._flushSize) {
      this.flush();
    }
  },

  flush() {
    if (!this._queue.length) return;
    const batch = this._queue.slice();
    this._queue.length = 0;

    const transport = this._customTransport || defaultSendBatch;
    transport(batch, this._endpoint);
  },

  tail(n = 200) {
    if (n <= 0) return [];
    return this._queue.slice(Math.max(0, this._queue.length - n));
  }
};

// ============================================================================
//  CORE SIGNAL API — logger-attached, logger-independent
// ============================================================================

function normalizeLogEntryToSignal(entry) {
  if (!entry || typeof entry !== "object") return null;

  const {
    id,
    ts,
    level,
    subsystem,
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
    env
  } = entry;

  return emitSignalPacket("log", {
    source: "logger",
    id,
    ts,
    level,
    subsystem,
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
    env
  });
}

function normalizeDirectSignal(payload = {}) {
  const {
    level = "info",
    subsystem = "signal",
    message = "",
    extra = {},
    band = "dual",
    layer = null,
    page = null,
    func = null,
    system = null,
    organ = null,
    route = null,
    organismVersion = null
  } = payload;

  return emitSignalPacket("direct", {
    source: "direct",
    level,
    subsystem,
    message,
    extra,
    band,
    layer,
    page,
    func,
    system,
    organ,
    route,
    organismVersion
  });
}

// ============================================================================
//  LOGGER ATTACHMENT — non-invasive, failure-isolated
// ============================================================================

function safeWrap(fn, wrapper) {
  if (typeof fn !== "function") return fn;
  const original = fn;
  const wrapped = function wrappedLoggerFn(...args) {
    let result;
    try {
      result = original.apply(this, args);
    } catch (err) {
      // Logger failure must not break signal
      const packet = emitSignalPacket("logger-error", {
        source: "logger",
        error: String(err && err.message ? err.message : err),
        stack: err && err.stack ? String(err.stack) : null
      });
      SignalBuffer.push(packet);
      // Re-throw to preserve original behavior if desired
      throw err;
    }

    try {
      wrapper({ args, result, fnName: original.name || "anonymous" });
    } catch {
      // Signal wrapper must never throw into logger
    }

    return result;
  };
  return wrapped;
}

/**
 * Attach PulseProofSignal to a logger module.
 *
 * Expected shape (any subset is fine):
 *   {
 *     pulseLog(entryLike),
 *     log(...args),
 *     warn(...args),
 *     error(...args),
 *     critical(...args),
 *     PulseLoggerStore: { drainForHeartbeat?, getAll? }
 *   }
 */
function attachToLogger(logger) {
  if (!logger || typeof logger !== "object") {
    return emitSignalPacket("attach-skip", {
      reason: "invalid-logger"
    });
  }

  const packets = [];

  // 1. Wrap pulseLog if present — best place to see full entry
  if (typeof logger.pulseLog === "function") {
    const originalPulseLog = logger.pulseLog;
    logger.pulseLog = function pulseLogWithSignal(payload = {}) {
      // Let logger build its entry first
      const result = originalPulseLog.call(logger, payload);

      try {
        // If logger exposes makeLocalLogEntry/appendLocalLog, we don't rely on it.
        // We just mirror the payload we see.
        const packet = emitSignalPacket("pulseLog-call", {
          source: "logger",
          payload
        });
        SignalBuffer.push(packet);
      } catch {
        // ignore
      }

      return result;
    };

    packets.push(
      emitSignalPacket("attach", {
        hook: "pulseLog",
        status: "ok"
      })
    );
  }

  // 2. Wrap console-level helpers (log/warn/error/critical)
  ["log", "warn", "error", "critical"].forEach((name) => {
    if (typeof logger[name] !== "function") return;

    logger[name] = safeWrap(logger[name], ({ args, fnName }) => {
      const packet = emitSignalPacket("console-call", {
        source: "logger",
        fn: fnName || name,
        level: name,
        args
      });
      SignalBuffer.push(packet);
    });

    packets.push(
      emitSignalPacket("attach", {
        hook: name,
        status: "ok"
      })
    );
  });

  // 3. Optional: hook into PulseLoggerStore heartbeat drain
  if (
    logger.PulseLoggerStore &&
    typeof logger.PulseLoggerStore.drainForHeartbeat === "function"
  ) {
    const store = logger.PulseLoggerStore;
    const originalDrain = store.drainForHeartbeat.bind(store);

    store.drainForHeartbeat = function drainWithSignal() {
      const entries = originalDrain();
      if (Array.isArray(entries)) {
        for (const entry of entries) {
          const packet = normalizeLogEntryToSignal(entry);
          if (packet) SignalBuffer.push(packet);
        }
      }
      return entries;
    };

    packets.push(
      emitSignalPacket("attach", {
        hook: "PulseLoggerStore.drainForHeartbeat",
        status: "ok"
      })
    );
  }

  // Emit attach packets
  for (const p of packets) {
    SignalBuffer.push(p);
  }

  return packets;
}

// ============================================================================
//  PUBLIC API — PulseProofSignal Engine
// ============================================================================

export const PulseProofSignal = Object.freeze({
  meta: PulseProofSignalMeta,

  configure(config) {
    SignalBuffer.configure(config);
  },

  /**
   * Direct signal logging — bypasses logger entirely.
   * Safe to call from anywhere, even if logger is broken.
   */
  signal(payload) {
    const packet = normalizeDirectSignal(payload);
    SignalBuffer.push(packet);
    return packet;
  },

  /**
   * Mirror a logger entry into signal space.
   * Can be used manually if you have access to the raw entry.
   */
  fromLogEntry(entry) {
    const packet = normalizeLogEntryToSignal(entry);
    if (packet) SignalBuffer.push(packet);
    return packet;
  },

  /**
   * Attach to a logger module (non-invasive, failure-isolated).
   */
  attachToLogger(logger) {
    return attachToLogger(logger);
  },

  /**
   * Flush buffered signals to network.
   */
  flush() {
    SignalBuffer.flush();
  },

  /**
   * Inspect in-memory signal buffer (for dev panels / organism map views).
   */
  tail(n = 200) {
    return SignalBuffer.tail(n);
  }
});

// ============================================================================
//  DUAL-MODE EXPORTS
// ============================================================================
if (typeof module !== "undefined") {
  module.exports = {
    PulseProofSignalMeta,
    PulseProofSignal,
    pulseRole,
    surfaceMeta,
    pulseLoreContext,
    AI_EXPERIENCE_META,
    EXPORT_META
  };
}
