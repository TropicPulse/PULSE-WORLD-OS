// ============================================================================
// PULSE-WORLD-TOUCH-RELAY-v30-Immortal++++ — Internet Relay Sensing Organ
//  • Senses “pre-request” network intent (relay hints) BEFORE host is hit
//  • Emits Touch-Relay impulses into Motion/Brain/DB/GPU lanes
//  • Prewarms MotionEngine, Compass, DB, GPU cache, and organism membranes
//  • Zero heavy compute — pure sensing, routing, and prewarm orchestration
//  • Cosmos-aware, presence-aware, advantage-aware, dual-band, session-aware
//  • Designed to sit beside EngineBlock + Compass + MotionEngine as a reflex arc
// ============================================================================
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝
//
//  ROLE:
//    • “Reflex arc” that fires on *relay* instead of *request*
//    • First touch BEFORE Touch: DNS, preconnect, prefetch, speculative nav
//    • Goal: have the organism HOT before the HTTP hit even exists
// ============================================================================

export function createPulseTouchRelay({
  // Core organs
  Motion,          // PulseCompass / MotionEngine face (submit/tick/prewarm)
  MemoryOrgan,     // Long-term memory organ
  BrainOrgan,      // Evolutionary brain (optional but powerful)
  PulseDB,         // PulseDB-v30 (optional, for logging)
  Reporter,        // PulseCompassReporter (optional, for motion logs)

  // Context
  sessionId = null,
  trace = false,
  cosmosContext = {
    universeId: "u:default",
    timelineId: "t:main",
    branchId: "b:root",
    shardId: "s:primary"
  },
  presenceContext = {},
  advantageContext = {}
} = {}) {
  if (!Motion) {
    throw new Error("[PULSE=TOUCH-RELAY-v30] Motion (Compass/Engine) is required.");
  }
  if (!MemoryOrgan) {
    throw new Error("[PULSE=TOUCH-RELAY-v30] MemoryOrgan is required.");
  }

  // ---------------------------------------------------------------------------
  // CONSTANTS / KEYS
  // ---------------------------------------------------------------------------
  const RELAY_HISTORY_KEY = "pulse:v30:touchRelay:history";
  const RELAY_METRICS_KEY = "pulse:v30:touchRelay:metrics";

  const ROLE = Object.freeze({
    identity: "PULSE=TOUCH-RELAY-v30-Immortal++++",
    layer: "organ",
    type: "relay_sensing",
    schemaVersion: "v30",
    version: "30.0-Immortal++++"
  });

  // ---------------------------------------------------------------------------
  // INTERNAL STATE
  // ---------------------------------------------------------------------------
  const metrics = {
    relayEvents: 0,
    dnsPrefetch: 0,
    preconnect: 0,
    prefetch: 0,
    speculativeNav: 0,
    edgeProbe: 0,
    prewarmsTriggered: 0,
    motionTicksTriggered: 0,
    brainHintsEmitted: 0
  };

  let lastPrewarmAt = null;
  let lastRelayAt = null;
  let prewarmDebounceTimer = null;

  // Ensure history collection exists
  if (MemoryOrgan.read?.(RELAY_HISTORY_KEY) == null) {
    MemoryOrgan.write?.(RELAY_HISTORY_KEY, []);
  }

  // ---------------------------------------------------------------------------
  // HELPERS
  // ---------------------------------------------------------------------------
  function now() {
    return Date.now();
  }

  function log(...args) {
    if (!trace || typeof console === "undefined") return;
    console.log("[PULSE=TOUCH-RELAY-v30]", ...args);
  }

  function readHistory() {
    const h = MemoryOrgan.read?.(RELAY_HISTORY_KEY);
    return Array.isArray(h) ? h : [];
  }

  function writeHistory(next) {
    MemoryOrgan.write?.(RELAY_HISTORY_KEY, Array.isArray(next) ? next : []);
  }

  function persistMetrics() {
    MemoryOrgan.write?.(RELAY_METRICS_KEY, {
      ...metrics,
      lastRelayAt,
      lastPrewarmAt,
      role: ROLE,
      timestamp: now()
    });
  }

  function buildEnvelope(entry) {
    return {
      ...entry,
      sessionId: sessionId || null,
      cosmos: cosmosContext,
      presence: presenceContext,
      advantage: advantageContext,
      schemaVersion: "v30",
      version: ROLE.version,
      role: ROLE.identity,
      timestamp: now()
    };
  }

  async function appendToDB(entry) {
    if (!PulseDB || typeof PulseDB.append !== "function") return;
    try {
      await PulseDB.append("pulse:v30:Touch_Relay_Events", buildEnvelope(entry));
    } catch (err) {
      if (trace && typeof console !== "undefined") {
        console.warn("[PULSE=TOUCH-RELAY-v30] DB append failed:", err);
      }
    }
  }

  // ---------------------------------------------------------------------------
  // CORE: PREWARM / PRELOAD / PRE-DO
  // ---------------------------------------------------------------------------
  async function triggerPrewarm(reason, meta = {}) {
    const nowTs = now();
    lastPrewarmAt = nowTs;
    metrics.prewarmsTriggered += 1;

    log("Prewarm triggered:", reason, meta);

    // 1) Prewarm Motion (Compass/Engine)
    try {
      await Motion.prewarm?.();
    } catch (err) {
      log("Motion.prewarm failed:", err);
    }

    // 2) Trigger a motion tick (reflex)
    try {
      const res = await Motion.tick?.();
      metrics.motionTicksTriggered += 1;
      if (Reporter && typeof Reporter.recordTick === "function" && res?.metrics) {
        await Reporter.recordTick(res);
      }
    } catch (err) {
      log("Motion.tick failed:", err);
    }

    // 3) Hint BrainOrgan (if present)
    if (BrainOrgan && typeof BrainOrgan.evolve === "function") {
      try {
        await BrainOrgan.evolve({
          type: "relay:prewarm",
          payload: {
            reason,
            meta,
            cosmos: cosmosContext,
            presence: presenceContext,
            advantage: advantageContext,
            timestamp: nowTs
          }
        });
        metrics.brainHintsEmitted += 1;
      } catch (err) {
        log("BrainOrgan.evolve relay:prewarm failed:", err);
      }
    }

    // 4) Log to DB
    await appendToDB({
      type: "prewarm",
      reason,
      meta
    });

    persistMetrics();
  }

  function schedulePrewarm(reason, meta = {}) {
    // Debounce to avoid thrashing on multiple relay hints
    if (prewarmDebounceTimer) return;
    prewarmDebounceTimer = setTimeout(() => {
      prewarmDebounceTimer = null;
      triggerPrewarm(reason, meta);
    }, 50);
  }

  // ---------------------------------------------------------------------------
  // RELAY SENSING ENTRYPOINTS
  // ---------------------------------------------------------------------------
  function recordRelayEvent(kind, meta = {}) {
    const ts = now();
    lastRelayAt = ts;
    metrics.relayEvents += 1;

    switch (kind) {
      case "dns_prefetch":
        metrics.dnsPrefetch += 1;
        break;
      case "preconnect":
        metrics.preconnect += 1;
        break;
      case "prefetch":
        metrics.prefetch += 1;
        break;
      case "speculative_nav":
        metrics.speculativeNav += 1;
        break;
      case "edge_probe":
        metrics.edgeProbe += 1;
        break;
      default:
        break;
    }

    const history = readHistory();
    history.push(
      buildEnvelope({
        kind,
        meta,
        event: "relay_sensed"
      })
    );
    // Keep history bounded
    if (history.length > 256) history.splice(0, history.length - 256);
    writeHistory(history);
    persistMetrics();

    appendToDB({
      type: "relay_sensed",
      kind,
      meta
    });

    log("Relay sensed:", kind, meta);
  }

  // Generic sensing API
  function senseRelay(kind, meta = {}) {
    recordRelayEvent(kind, meta);
    schedulePrewarm(kind, meta);
  }

  // Specific helpers
  function senseDNSPrefetch(hostname, meta = {}) {
    senseRelay("dns_prefetch", { hostname, ...meta });
  }

  function sensePreconnect(url, meta = {}) {
    senseRelay("preconnect", { url, ...meta });
  }

  function sensePrefetch(url, meta = {}) {
    senseRelay("prefetch", { url, ...meta });
  }

  function senseSpeculativeNavigation(url, meta = {}) {
    senseRelay("speculative_nav", { url, ...meta });
  }

  function senseEdgeProbe(edgeId, meta = {}) {
    senseRelay("edge_probe", { edgeId, ...meta });
  }

  // ---------------------------------------------------------------------------
  // BROWSER HOOKS (BEST-EFFORT, ZERO BREAKAGE)
  //  • Scan link[rel=dns-prefetch|preconnect|prefetch] as relay hints
  //  • Can be extended with PerformanceObserver, NetworkInformation, etc.
// ---------------------------------------------------------------------------
  function attachDOMRelaySensors() {
    if (typeof document === "undefined") return;

    try {
      const links = Array.from(document.querySelectorAll("link[rel]")) || [];
      for (const link of links) {
        const rel = (link.getAttribute("rel") || "").toLowerCase();
        const href = link.getAttribute("href") || link.getAttribute("hrefsrc") || null;
        if (!href) continue;

        if (rel === "dns-prefetch") {
          senseDNSPrefetch(href, { source: "dom_link" });
        } else if (rel === "preconnect") {
          sensePreconnect(href, { source: "dom_link" });
        } else if (rel === "prefetch" || rel === "prerender" || rel === "preload") {
          sensePrefetch(href, { source: "dom_link", as: link.getAttribute("as") || null });
        }
      }
    } catch (err) {
      log("attachDOMRelaySensors failed:", err);
    }
  }

  function attachPerformanceRelaySensors() {
    if (typeof performance === "undefined" || typeof performance.getEntries !== "function") {
      return;
    }

    try {
      const entries = performance.getEntries() || [];
      for (const e of entries) {
        if (!e || typeof e !== "object") continue;
        const name = e.name || e.initiatorType || "";
        const type = (e.initiatorType || "").toLowerCase();

        if (type === "preconnect") {
          sensePreconnect(name, { source: "performance" });
        } else if (type === "dns") {
          senseDNSPrefetch(name, { source: "performance" });
        } else if (type === "prefetch" || type === "prerender") {
          sensePrefetch(name, { source: "performance" });
        }
      }
    } catch (err) {
      log("attachPerformanceRelaySensors failed:", err);
    }
  }

  function autoAttach() {
    attachDOMRelaySensors();
    attachPerformanceRelaySensors();
  }

  // ---------------------------------------------------------------------------
  // PUBLIC API
  // ---------------------------------------------------------------------------
  function getMetrics() {
    const stored = MemoryOrgan.read?.(RELAY_METRICS_KEY) || {};
    return {
      ...metrics,
      lastRelayAt,
      lastPrewarmAt,
      stored
    };
  }

  function getHistory() {
    return readHistory();
  }

  // Immediately attach passive sensors (best-effort)
  autoAttach();

  log("PULSE=TOUCH-RELAY-v30 ready.", ROLE);

  return Object.freeze({
    role: ROLE,
    senseRelay,
    senseDNSPrefetch,
    sensePreconnect,
    sensePrefetch,
    senseSpeculativeNavigation,
    senseEdgeProbe,
    triggerPrewarm,
    getMetrics,
    getHistory,
    autoAttach
  });
}
