// ============================================================================
// PULSE-WORLD-TOUCH-RELAY-3D-v30-Immortal++++
//  • First 3D Internet Touch Organ — “outward” + “inward” + “backward/forward”
//  • Uses Relay sensing + PathPhysics + OutwardPulse to warm RELAY NODES THEMSELVES
//  • Treats internet relays (edges, POPs, sat beams, mesh nodes) as organs to touch
//  • Prewarms MotionEngine, Compass, GPU, DB AND the network path itself
//  • Cosmos-aware, presence-aware, advantage-aware, dual-band, session-aware
//  • Designed to sit beside EngineBlock + Touch + Relay as the 3D routing layer
// ============================================================================
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝
//
//  LAYERS:
//    • PathPhysics: learns relay paths (edges, POPs, ISP, RTT) per client
//    • OutwardPulse: sends 3D pulses directly to relay targets to warm them
//    • RelayBridge: connects existing Touch-Relay organ into PathPhysics/OutwardPulse
//    • 3D Touch API: single organ you call from EngineBlock / Touch / Motion
// ============================================================================

/**
 * Small helper: safe function call
 */
function safe(fn, ...args) {
  try {
    if (typeof fn === "function") return fn(...args);
  } catch {
    // swallow
  }
  return undefined;
}

// ============================================================================
// PathPhysics — learns and chooses better relay paths
// ============================================================================
function createPathPhysics3D({ MemoryOrgan, trace = false } = {}) {
  const ROUTES_KEY = "pulse:v30:3d:pathPhysics:routes";

  function log(...args) {
    if (!trace || typeof console === "undefined") return;
    console.log("[PULSE-3D:PathPhysics]", ...args);
  }

  function readRoutes() {
    const r = safe(MemoryOrgan.read, ROUTES_KEY);
    return Array.isArray(r) ? r : [];
  }

  function writeRoutes(routes) {
    safe(MemoryOrgan.write, ROUTES_KEY, Array.isArray(routes) ? routes : []);
  }

  function recordHopSample({
    clientId = null,
    edgeId = null,
    isp = null,
    rttMs = null,
    routeHint = null,
    satBeamId = null,
    meshNodeId = null,
    source = "unknown"
  }) {
    const routes = readRoutes();
    routes.push({
      clientId,
      edgeId,
      isp,
      rttMs,
      routeHint,
      satBeamId,
      meshNodeId,
      source,
      ts: Date.now()
    });
    if (routes.length > 2048) routes.splice(0, routes.length - 2048);
    writeRoutes(routes);
    log("hop sample recorded:", { clientId, edgeId, isp, rttMs, routeHint, satBeamId, meshNodeId, source });
  }

  function pickBestRouteForClient({ clientId = null, isp = null, candidates = [] }) {
    const routes = readRoutes().filter(
      (r) => (clientId && r.clientId === clientId) || (isp && r.isp === isp)
    );
    if (!routes.length || !candidates?.length) return null;

    let best = null;
    let bestScore = Infinity;

    for (const c of candidates) {
      const samples = routes.filter((r) => {
        if (c.edgeId && r.edgeId === c.edgeId) return true;
        if (c.satBeamId && r.satBeamId === c.satBeamId) return true;
        if (c.meshNodeId && r.meshNodeId === c.meshNodeId) return true;
        return false;
      });
      if (!samples.length) continue;
      const avg = samples.reduce((s, r) => s + (r.rttMs ?? 200), 0) / samples.length;
      if (avg < bestScore) {
        bestScore = avg;
        best = { ...c, avgRttMs: avg };
      }
    }

    if (best) {
      log("best route chosen:", best);
    }
    return best;
  }

  function getRoutes() {
    return readRoutes();
  }

  return Object.freeze({
    recordHopSample,
    pickBestRouteForClient,
    getRoutes
  });
}

// ============================================================================
// OutwardPulse — sends 3D pulses directly to relay targets
// ============================================================================
function createOutwardPulse3D({
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
  function log(...args) {
    if (!trace || typeof console === "undefined") return;
    console.log("[PULSE-3D:OutwardPulse]", ...args);
  }

  /**
   * Generic outward pulse — conceptually a 3D “touch” to a relay node.
   * In practice this can be:
   *  • a tiny fetch to a relay endpoint
   *  • a sat/mesh controller call
   *  • a CDN edge warming endpoint
   *  • or a no-op stub in environments without such access
   */
  async function pulseRelayTarget(target, meta = {}) {
    const payload = {
      target,
      meta,
      cosmos: cosmosContext,
      presence: presenceContext,
      advantage: advantageContext,
      ts: Date.now()
    };

    log("3D outward pulse → relay target:", payload);

    // This is intentionally abstract: you wire this into your sat/mesh/CDN layer.
    // Example stub: if target.warmUrl exists, do a tiny fetch.
    if (typeof fetch === "function" && target?.warmUrl) {
      try {
        await fetch(target.warmUrl, {
          method: "HEAD",
          mode: "no-cors",
          cache: "no-store"
        });
      } catch {
        // ignore; this is best-effort
      }
    }

    return payload;
  }

  async function pulseEdge(edgeId, meta = {}) {
    return pulseRelayTarget({ kind: "edge", edgeId, ...meta }, meta);
  }

  async function pulseSatBeam(satBeamId, meta = {}) {
    return pulseRelayTarget({ kind: "sat_beam", satBeamId, ...meta }, meta);
  }

  async function pulseMeshNode(meshNodeId, meta = {}) {
    return pulseRelayTarget({ kind: "mesh_node", meshNodeId, ...meta }, meta);
  }

  return Object.freeze({
    pulseRelayTarget,
    pulseEdge,
    pulseSatBeam,
    pulseMeshNode
  });
}

// ============================================================================
// RelayBridge — connects existing Touch-Relay organ into PathPhysics/OutwardPulse
// ============================================================================
function createRelayBridge3D({
  Relay,          // existing PULSE=TOUCH-RELAY organ (optional but ideal)
  PathPhysics3D,
  OutwardPulse3D,
  trace = false
} = {}) {
  function log(...args) {
    if (!trace || typeof console === "undefined") return;
    console.log("[PULSE-3D:RelayBridge]", ...args);
  }

  function onRelaySensed(kind, meta = {}) {
    // Feed PathPhysics with hop samples if we have enough info
    const hopSample = {
      clientId: meta.clientId || null,
      edgeId: meta.edgeId || meta.edge || null,
      isp: meta.isp || null,
      rttMs: meta.rttMs ?? null,
      routeHint: meta.routeHint || null,
      satBeamId: meta.satBeamId || null,
      meshNodeId: meta.meshNodeId || null,
      source: meta.source || kind
    };
    PathPhysics3D.recordHopSample(hopSample);

    // Optionally, immediately pulse outward to that relay
    if (hopSample.edgeId) {
      OutwardPulse3D.pulseEdge(hopSample.edgeId, { source: "relay_sensed", kind });
    }
    if (hopSample.satBeamId) {
      OutwardPulse3D.pulseSatBeam(hopSample.satBeamId, { source: "relay_sensed", kind });
    }
    if (hopSample.meshNodeId) {
      OutwardPulse3D.pulseMeshNode(hopSample.meshNodeId, { source: "relay_sensed", kind });
    }

    log("relay sensed → 3D bridge:", { kind, meta, hopSample });
  }

  // If we have a Relay organ, we can wrap its senseRelay
  if (Relay && typeof Relay.senseRelay === "function") {
    const originalSenseRelay = Relay.senseRelay.bind(Relay);
    Relay.senseRelay = (kind, meta = {}) => {
      onRelaySensed(kind, meta);
      return originalSenseRelay(kind, meta);
    };
  }

  return Object.freeze({
    onRelaySensed
  });
}

// ============================================================================
// PULSE-WORLD-TOUCH-RELAY-3D — main organ
// ============================================================================
export function createPulseWorldTouchRelay3D({
  // Core organs
  Motion,          // Compass / MotionEngine (submit/tick/prewarm)
  MemoryOrgan,     // Long-term memory
  BrainOrgan,      // Evolutionary brain (optional)
  PulseDB,         // PulseDB-v30 (optional)
  Reporter,        // Motion reporter (optional)
  Relay,           // Existing PULSE=TOUCH-RELAY organ (optional)

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
  if (!MemoryOrgan) {
    throw new Error("[PULSE-WORLD-TOUCH-RELAY-3D] MemoryOrgan is required.");
  }
  if (!Motion) {
    throw new Error("[PULSE-WORLD-TOUCH-RELAY-3D] Motion (Compass/Engine) is required.");
  }

  const ROLE = Object.freeze({
    identity: "PULSE-WORLD-TOUCH-RELAY-3D-v30-Immortal++++",
    layer: "organ",
    type: "3d_touch_relay",
    schemaVersion: "v30",
    version: "30.0-Immortal++++"
  });

  function log(...args) {
    if (!trace || typeof console === "undefined") return;
    console.log("[PULSE-WORLD-TOUCH-RELAY-3D]", ...args);
  }

  // Sub-organs
  const PathPhysics3D = createPathPhysics3D({ MemoryOrgan, trace });
  const OutwardPulse3D = createOutwardPulse3D({
    trace,
    cosmosContext,
    presenceContext,
    advantageContext
  });
  const RelayBridge3D = createRelayBridge3D({
    Relay,
    PathPhysics3D,
    OutwardPulse3D,
    trace
  });

  // -------------------------------------------------------------------------
  // 3D Touch: when the page / host is actually touched
  // -------------------------------------------------------------------------
  async function on3DTouch(meta = {}) {
    log("3D Touch fired:", meta);

    // 1) Prewarm Motion + tick once (reflex)
    try {
      await safe(Motion.prewarm?.bind(Motion));
      const res = await safe(Motion.tick?.bind(Motion));
      if (Reporter && typeof Reporter.recordTick === "function" && res?.metrics) {
        await Reporter.recordTick(res);
      }
    } catch (err) {
      log("Motion prewarm/tick failed:", err);
    }

    // 2) Use PathPhysics to pick best route for this client
    const bestRoute = PathPhysics3D.pickBestRouteForClient({
      clientId: meta.clientId || null,
      isp: meta.isp || null,
      candidates: meta.routeCandidates || []
    });

    // 3) Pulse outward to that route (3D)
    if (bestRoute) {
      await OutwardPulse3D.pulseRelayTarget(bestRoute, {
        source: "3d_touch",
        meta
      });
    }

    // 4) Hint BrainOrgan about 3D route
    if (BrainOrgan && typeof BrainOrgan.evolve === "function") {
      try {
        await BrainOrgan.evolve({
          type: "route:3d:optimize",
          payload: {
            bestRoute,
            meta,
            cosmos: cosmosContext,
            presence: presenceContext,
            advantage: advantageContext,
            sessionId
          }
        });
      } catch (err) {
        log("BrainOrgan.evolve route:3d:optimize failed:", err);
      }
    }

    // 5) Optionally log to DB
    if (PulseDB && typeof PulseDB.append === "function") {
      try {
        await PulseDB.append("pulse:v30:3d:Touch_Events", {
          type: "3d_touch",
          meta,
          bestRoute,
          sessionId: sessionId || null,
          cosmos: cosmosContext,
          presence: presenceContext,
          advantage: advantageContext,
          schemaVersion: "v30",
          version: ROLE.version,
          timestamp: Date.now()
        });
      } catch {
        // ignore
      }
    }

    return { ok: true, bestRoute };
  }

  // -------------------------------------------------------------------------
  // Public API
  // -------------------------------------------------------------------------
  function getPathRoutes() {
    return PathPhysics3D.getRoutes();
  }

  return Object.freeze({
    role: ROLE,
    sessionId,
    cosmosContext,
    presenceContext,
    advantageContext,

    // 3D touch entrypoint
    on3DTouch,

    // Sub-organs exposed
    PathPhysics3D,
    OutwardPulse3D,
    RelayBridge3D,

    // Convenience outward pulses
    pulseRelayTarget: OutwardPulse3D.pulseRelayTarget,
    pulseEdge: OutwardPulse3D.pulseEdge,
    pulseSatBeam: OutwardPulse3D.pulseSatBeam,
    pulseMeshNode: OutwardPulse3D.pulseMeshNode,

    // Path inspection
    getPathRoutes
  });
}
