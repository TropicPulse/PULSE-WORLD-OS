// ============================================================================
//  PULSE OS v24.0‑IMMORTAL++ — PulseProofSignal Engine
//  Signal-Grade Telemetry • Logger-Attached but Logger-Independent
//  ZERO RANDOMNESS • ZERO EGO • DUALBAND-AWARE • ORGANISM-MAP-AWARE
// ============================================================================

console.log("PulseProofSignal v24-IMMORTAL-EVOLVABLE");

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

// ============================================================================
//  PACKET EMITTER — deterministic, signal-scoped, FRONTEND-SAFE
//  No OrganismMap, No Meta, No EXPORT_META, No evo.epoch
// ============================================================================

function emitSignalPacket(type, payload) {
  const now = Date.now();

  return Object.freeze({
    packetType: `signal-${type}`,
    packetId: `signal-${type}-${now}`,
    timestamp: now,

    // IMMORTAL++: minimal, stable, frontend-safe identity
    version: "24.0-IMMORTAL++",
    source: "PulseProofSignal",

    // user payload last
    ...payload
  });
}

// ============================================================================
//  COMMENT LOG GENERATION — SIGNAL IS AUTHORITY, LOGGER IS SINK
// ============================================================================

function safeClone(v) {
  try {
    return JSON.parse(JSON.stringify(v));
  } catch {
    return null;
  }
}

function buildCommentFromSignalPacket(packet, kind = "direct") {
  const env =
    g.PulseSurface && g.PulseSurface.environment
      ? safeClone(g.PulseSurface.environment)
      : null;

  const route =
    g.PulseRouteMemory && g.PulseRouteMemory.currentRoute
      ? safeClone(g.PulseRouteMemory.currentRoute)
      : null;

  const flow =
    g.PulseUIFlow && g.PulseUIFlow.currentState
      ? safeClone(g.PulseUIFlow.currentState)
      : null;

  const reflex =
    g.PulseSkinReflex && g.PulseSkinReflex.currentReflex
      ? safeClone(g.PulseSkinReflex.currentReflex)
      : null;

  const identity =
    g.PulseProofBridge &&
    typeof g.PulseProofBridge.getBridgeIdentitySnapshot === "function"
      ? safeClone(g.PulseProofBridge.getBridgeIdentitySnapshot())
      : null;

  const bridgeEnv =
    g.PulseProofBridge && g.PulseProofBridge.BRIDGE_ENV
      ? safeClone(g.PulseProofBridge.BRIDGE_ENV)
      : null;

  const page =
    typeof location !== "undefined" && location
      ? location.pathname || null
      : null;

  return {
    type: "comment",
    ts: packet.timestamp,
    signalPacketId: packet.packetId,
    signalPacketType: packet.packetType,
    summary: `Signal (${kind}) fired: ${packet.packetType}`,
    details: {
      packet: safeClone(packet),
      route,
      flow,
      reflex,
      page,
      env,
      identity,
      bridgeEnv,
      meta: {
        version: "24.0-IMMORTAL++",
        generator: "PulseProofSignalCommentEngine",
        kind
      }
    }
  };
}

function emitCommentLogForPacket(packet, kind = "direct") {
  // Logger is a sink; signal is authority.
  const logger =
    (g.PulseLogger && typeof g.PulseLogger.log === "function"
      ? g.PulseLogger
      : null) ||
    (g.PulseProofLogger && typeof g.PulseProofLogger.log === "function"
      ? g.PulseProofLogger
      : null);

  if (!logger) return;

  try {
    const comment = buildCommentFromSignalPacket(packet, kind);
    logger.log("comment", comment);
  } catch {
    // Comment generation must never break signal engine
  }
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
      const result = originalPulseLog.call(logger, payload);

      try {
        const packet = emitSignalPacket("pulseLog-call", {
          source: "logger",
          payload
        });
        SignalBuffer.push(packet);
        // also emit a comment for this signalized log
        emitCommentLogForPacket(packet, "log-pulse");
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
      emitCommentLogForPacket(packet, "logger-console");
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
          if (packet) {
            SignalBuffer.push(packet);
            emitCommentLogForPacket(packet, "logger-entry");
          }
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

  for (const p of packets) {
    SignalBuffer.push(p);
  }

  return packets;
}

// ============================================================================
//  PUBLIC API — PulseProofSignal Engine (FRONTEND-SAFE IMMORTAL++)
//  No OrganismMap, No Meta, No EXPORT_META, No evo.epoch
// ============================================================================

export const PulseProofSignal = Object.freeze({
  // Minimal identity (frontend-safe)
  version: "24.0-IMMORTAL++",
  source: "PulseProofSignal",

  configure(config) {
    SignalBuffer.configure(config);
  },

  /**
   * Direct signal logging — bypasses logger entirely.
   * Safe even if logger is broken or missing.
   * 🔥 NOW: also auto-creates a COMMENT LOG as signal authority.
   */
  signal(payload) {
    const packet = normalizeDirectSignal(payload);
    SignalBuffer.push(packet);
    emitCommentLogForPacket(packet, "direct");
    return packet;
  },

  /**
   * Mirror a logger entry into signal space.
   * Safe even if logger is broken.
   * 🔥 NOW: also auto-creates a COMMENT LOG for mirrored log entries.
   */
  fromLogEntry(entry) {
    const packet = normalizeLogEntryToSignal(entry);
    if (packet) {
      SignalBuffer.push(packet);
      emitCommentLogForPacket(packet, "log-entry");
    }
    return packet;
  },

  /**
   * Attach to a logger module (non-invasive, failure-isolated).
   * If logger breaks, signal still works.
   */
  attachToLogger(logger) {
    return attachToLogger(logger);
  },

  /**
   * Flush buffered signals (network-safe, fire-and-forget).
   */
  flush() {
    SignalBuffer.flush();
  },

  /**
   * Inspect in-memory signal buffer (dev panels, debugging).
   */
  tail(n = 200) {
    return SignalBuffer.tail(n);
  }
});

// ============================================================================
//  DUAL-MODE EXPORTS — FRONTEND-SAFE
// ============================================================================

if (typeof module !== "undefined") {
  module.exports = {
    PulseProofSignal
  };
}
