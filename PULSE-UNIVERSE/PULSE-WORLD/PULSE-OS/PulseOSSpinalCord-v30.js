// ============================================================================
// FILE: /PULSE-OS/PulseOSSpinalCord-v30-IMMORTAL++++.js
// PULSE OS SPINAL CORD — v30.0-IMMORTAL++++-DUALBAND-PulseBand-ADVANTAGE
// “ORGANISM-WIDE DUAL-BAND SPINE • ADVANTAGE FIELD CONDUCTOR • ROUTE ROOT”
// CHUNK/PREWARM/CACHE-AWARE • MULTI-PRESENCE-AWARE • FIREWALL-GATED
// PASSIVE/ACTIVE PAGESCANNER-AWARE (NO TIMERS, NO POLLING)
// SDN PREWARM v30-IMMORTAL++++ (Spinal Reflex Ignition, Impulse-Speed)
// PULSEBAND-AWARE • PULSESIGNAL-AWARE • PRESENCE/ADVANTAGE-DENSITY-AWARE
// ============================================================================

import { prewarmSDN } from "./PulseOSSDNPrewarm-v30.js";
import { createPulseSkinReflex as PageScannerV12 } from "../../PULSE-BAND/____BACKEND/PULSE-WORLD-BRIDGE.js";

const hasWindow = typeof window !== "undefined";

// ============================================================================
// META KERNEL + ROLE (v30-IMMORTAL++++)
// ============================================================================
export const PulseOSSpinalCordMeta = Object.freeze({
  id: "PulseOSSpinalCord",
  identity: "PulseOSSpinalCord-v30-IMMORTAL++++",
  layer: "SpinalCord",
  role: "OS_SPINAL_CORD",
  version: "30.0-IMMORTAL++++",
  epoch: "v30-IMMORTAL++++",
  evo: Object.freeze({
    spinalCordOrgan: true,
    osLevel: true,
    deterministic: true,
    driftProof: true,

    dualBand: true,
    symbolicPrimary: true,
    binaryAware: true,

    presenceAware: true,
    multiPresenceAware: true,
    meshAware: true,
    arteryAware: true,
    advantageFieldAware: true,
    presenceDensityAware: true,

    pulseBandAware: true,
    pulseSignalAware: true,

    chunkPrewarmAware: true,
    cachePrewarmAware: true,
    routePrewarmAware: true,
    impulsePrewarmAware: true,

    firewallAware: true,
    pageScannerAware: true,
    sdnPrewarmAware: true
  })
});

export const PulseRole = Object.freeze({
  type: "Organ",
  subsystem: "SpinalCord",
  layer: "SC",
  identity: PulseOSSpinalCordMeta.identity,
  version: PulseOSSpinalCordMeta.version,
  evo: PulseOSSpinalCordMeta.evo
});

// ============================================================================
// ARTERY HELPERS — v30 (shared semantics with membranes/presence)
// ============================================================================
function clamp01(v) {
  const n = typeof v === "number" ? v : 0;
  if (n <= 0) return 0;
  if (n >= 1) return 1;
  return n;
}

function safePresenceDensity() {
  try {
    if (!hasWindow) return 0;
    const v = window.PULSE_PRESENCE_DENSITY;
    return typeof v === "number" ? clamp01(v) : 0;
  } catch {
    return 0;
  }
}

function safeAdvantageScore() {
  try {
    if (!hasWindow) return 0;
    const v = window.PULSE_ADVANTAGE_SCORE;
    return typeof v === "number" ? clamp01(v) : 0;
  } catch {
    return 0;
  }
}

// ============================================================================
// FACTORY — Dependencies injected by CNS Brain / Cortex
// ============================================================================
export function createPulseOSSpinalCord({
  Router,        // expected: route(type, payload)
  EventBus,      // expected: emit(event, payload)
  Brain,         // PulseOSBrain (for logging)
  Evolution,     // Evolution organ for lineage stamping
  CoreGovernor,  // optional: CoreGovernor (for context-only, no compute)
  BinaryOverlay, // optional: PulseBinaryOverlay (for context-only, no compute)
  Firewall,      // PulseChunks-v1 / firewall surface (optional but recommended)
  Chunker,       // route chunk/prewarm surface (context-only)
  PrewarmCache,  // cache prewarm surface (context-only)
  PresenceMesh,  // multi-presence mesh (context-only)
  MeshBus,       // optional: mesh event bus (metadata-only)
  PulseBand,     // optional: PulseBand (dual-band advantage conductor)
  PulseSignal,   // optional: PulseSignal (global pulse stream)
  log = console.log,
  warn = console.warn
}) {
  // --------------------------------------------------------------------------
  // SPINAL-LEVEL PAGESCANNER BRIDGE — ALWAYS-ON PASSIVE/ACTIVE
  // --------------------------------------------------------------------------
  const SpinalPageScanner = {
    emit(event, context = {}) {
      try {
        if (!PageScannerV12 || typeof PageScannerV12.buildDriftPacket !== "function") {
          return;
        }

        const packet = PageScannerV12.buildDriftPacket({
          event,
          layer: "SpinalCord",
          subsystem: "OS-Spine",
          spinalIdentity: PulseOSSpinalCordMeta.identity,
          ...context
        });

        if (
          hasWindow &&
          window.PageScannerAdapter &&
          typeof window.PageScannerAdapter.onEvent === "function"
        ) {
          window.PageScannerAdapter.onEvent(packet);
        }

        if (typeof packet.severity === "number") {
          Brain?.log?.(
            "[SpinalCord/PageScanner] event:",
            event,
            "severity:",
            packet.severity,
            "tooFar:",
            !!packet.tooFar
          );
        }
      } catch {
        // Scanner must never break spine
      }
    }
  };

  // --------------------------------------------------------------------------
  // INTERNAL STATE — deterministic, no timestamps
  // --------------------------------------------------------------------------
  const SpinalState = {
    receptors: {
      binary: Object.create(null),     // { source: Set<handler> }
      symbolic: Object.create(null),   // { source: Set<handler> }
      dual: Object.create(null)        // { source: Set<handler> }
    },

    // Extensions + systems registry (Mesh, GPU, Proxy, Send, Earn, AI, etc.)
    extensions: Object.create(null), // { extensionId: { kind, meta } }
    systems: Object.create(null),    // { systemId: { kind, meta } }

    // Advantage + loop theory (pure counters / flags, no time)
    impulseCount: 0,
    loopCounters: {
      binary: 0,
      symbolic: 0,
      dual: 0
    },
    advantageField: {
      binaryHot: false,
      symbolicHot: false,
      dualHot: false,
      lastModeKind: "symbolic",
      confidenceBand: "neutral",
      pulseBandLane: "symbolic",
      presenceDensity: 0,
      advantageScore: 0
    },

    // multi-presence + prewarm surfaces (pure metadata)
    presence: {
      sessions: Object.create(null), // { presenceId: { extensionId, systemId, modeKind } }
      multiPresenceEnabled: true
    },
    prewarm: {
      chunkPrewarmEnabled: true,
      cachePrewarmEnabled: true,
      routePrewarmEnabled: true,
      impulsePrewarmEnabled: true
    },

    // v30: artery/pulse topology snapshots (metadata-only, no routing)
    arterySnapshot: null,
    pulseTopologySnapshot: null,

    healthScore: 1.0
  };

  // --------------------------------------------------------------------------
  // HELPERS — deterministic impulse signature
  // --------------------------------------------------------------------------
  function buildImpulseSignature({ source, modeKind, executionContext }) {
    const ec = executionContext || {};
    return [
      source || "unknown",
      modeKind || "symbolic",
      ec.binaryMode || "auto",
      ec.pipelineId || "",
      ec.sceneType || "",
      ec.workloadClass || "",
      ec.dispatchSignature || "",
      ec.shapeSignature || "",
      ec.extensionId || "",
      ec.systemId || "",
      ec.presenceId || ""
    ].join("|");
  }

  function updateLoopAndAdvantage(modeKind) {
    if (modeKind === "binary") SpinalState.loopCounters.binary += 1;
    else if (modeKind === "symbolic") SpinalState.loopCounters.symbolic += 1;
    else if (modeKind === "dual") SpinalState.loopCounters.dual += 1;

    SpinalState.advantageField.lastModeKind = modeKind;

    SpinalState.advantageField.binaryHot =
      SpinalState.loopCounters.binary > SpinalState.loopCounters.symbolic;
    SpinalState.advantageField.symbolicHot =
      SpinalState.loopCounters.symbolic > SpinalState.loopCounters.binary;
    SpinalState.advantageField.dualHot =
      SpinalState.loopCounters.dual > 0;

    const total =
      SpinalState.loopCounters.binary +
      SpinalState.loopCounters.symbolic +
      SpinalState.loopCounters.dual;

    SpinalState.advantageField.confidenceBand =
      total > 500 ? "max" :
      total > 200 ? "very-high" :
      total > 100 ? "high" :
      total > 20 ? "medium" :
      "neutral";

    // v30: presence/advantage density harmonized with global PULSE_* fields
    SpinalState.advantageField.presenceDensity = safePresenceDensity();
    SpinalState.advantageField.advantageScore = safeAdvantageScore();

    // v30: pulse-band lane selection (impulse-speed hint only)
    if (SpinalState.advantageField.binaryHot) {
      SpinalState.advantageField.pulseBandLane = "binary";
    } else if (SpinalState.advantageField.symbolicHot) {
      SpinalState.advantageField.pulseBandLane = "symbolic";
    } else {
      SpinalState.advantageField.pulseBandLane = "dual";
    }
  }

  // --------------------------------------------------------------------------
  // v30: SPINAL ADVANTAGE SNAPSHOT (for Brain/Expansion)
// --------------------------------------------------------------------------
  function getSpinalAdvantageSnapshot() {
    return {
      impulseCount: SpinalState.impulseCount,
      loopCounters: { ...SpinalState.loopCounters },
      advantageField: { ...SpinalState.advantageField }
    };
  }

  // --------------------------------------------------------------------------
  // v30: SPINAL PRESENCE SNAPSHOT (for Brain/Presence/Mesh)
// --------------------------------------------------------------------------
  function getSpinalPresenceSnapshot() {
    return {
      sessions: { ...SpinalState.presence.sessions },
      multiPresenceEnabled: SpinalState.presence.multiPresenceEnabled
    };
  }

  // --------------------------------------------------------------------------
  // v30: ARTERY + PULSE TOPOLOGY SNAPSHOT (metadata-only)
// --------------------------------------------------------------------------
  function applySpinalArterySnapshot(snapshot) {
    SpinalState.arterySnapshot = snapshot || null;
    SpinalPageScanner.emit("spinal-artery-snapshot-apply", {
      hasSnapshot: !!snapshot
    });
  }

  function applySpinalPulseTopologySnapshot(snapshot) {
    SpinalState.pulseTopologySnapshot = snapshot || null;
    SpinalPageScanner.emit("spinal-pulse-topology-snapshot-apply", {
      hasSnapshot: !!snapshot
    });
  }

  function getSpinalArterySnapshot() {
    return SpinalState.arterySnapshot || null;
  }

  function getSpinalPulseTopologySnapshot() {
    return SpinalState.pulseTopologySnapshot || null;
  }

  // --------------------------------------------------------------------------
  // PRESENCE REGISTRATION — multi-presence map (pure metadata)
// --------------------------------------------------------------------------
  function registerPresence(presenceId, { extensionId, systemId, modeKind } = {}) {
    if (!presenceId) return;
    SpinalState.presence.sessions[presenceId] = {
      extensionId: extensionId || null,
      systemId: systemId || null,
      modeKind: modeKind || "symbolic"
    };
    Evolution?.recordLineage?.(`spinal-presence-register:${presenceId}`);
    Brain?.log?.("[SpinalCord] Presence registered:", presenceId);

    SpinalPageScanner.emit("spinal-presence-register", {
      presenceId,
      extensionId: extensionId || null,
      systemId: systemId || null,
      modeKind: modeKind || "symbolic"
    });

    if (PresenceMesh?.registerSpinePresence) {
      try {
        PresenceMesh.registerSpinePresence({
          presenceId,
          extensionId: extensionId || null,
          systemId: systemId || null,
          modeKind: modeKind || "symbolic"
        });
      } catch (err) {
        warn?.("[SpinalCord] PresenceMesh.registerSpinePresence failed:", err);
      }
    }
  }

  function unregisterPresence(presenceId) {
    if (!presenceId) return;
    if (SpinalState.presence.sessions[presenceId]) {
      delete SpinalState.presence.sessions[presenceId];
      Evolution?.recordLineage?.(`spinal-presence-unregister:${presenceId}`);
      Brain?.log?.("[SpinalCord] Presence unregistered:", presenceId);

      SpinalPageScanner.emit("spinal-presence-unregister", {
        presenceId
      });

      if (PresenceMesh?.unregisterSpinePresence) {
        try {
          PresenceMesh.unregisterSpinePresence({ presenceId });
        } catch (err) {
          warn?.("[SpinalCord] PresenceMesh.unregisterSpinePresence failed:", err);
        }
      }
    }
  }

  // --------------------------------------------------------------------------
  // PREWARM HELPERS — chunk/cache/route/impulse prewarm (context-only)
// --------------------------------------------------------------------------
  function buildRoutePrewarmContext(source, impulse, impulseSignature) {
    const modeKind = impulse.modeKind || "symbolic";
    const executionContext = impulse.executionContext || {};
    const pressureSnapshot = impulse.pressureSnapshot || {};
    const presenceId = executionContext.presenceId || null;

    return {
      source,
      modeKind,
      impulseSignature,
      executionContext,
      pressureSnapshot,
      presenceId,
      spinalAdvantageField: SpinalState.advantageField,
      spinalLoopCounters: SpinalState.loopCounters,
      spinalExtensions: SpinalState.extensions,
      spinalSystems: SpinalState.systems,
      spinalPresence: SpinalState.presence,
      spinalArterySnapshot: SpinalState.arterySnapshot,
      spinalPulseTopologySnapshot: SpinalState.pulseTopologySnapshot
    };
  }

  function prewarmForImpulse(source, impulse, impulseSignature) {
    if (!SpinalState.prewarm.impulsePrewarmEnabled) return;

    const ctx = buildRoutePrewarmContext(source, impulse, impulseSignature);

    SpinalPageScanner.emit("spinal-prewarm-context", {
      source,
      modeKind: impulse.modeKind || "symbolic",
      presenceId: ctx.presenceId
    });

    if (SpinalState.prewarm.chunkPrewarmEnabled && Chunker?.prewarmForRoute) {
      try {
        Chunker.prewarmForRoute(ctx);
        Evolution?.recordLineage?.("spinal-prewarm-chunk");
      } catch (err) {
        warn?.("[SpinalCord] Chunker prewarm failed:", err);
      }
    }

    if (SpinalState.prewarm.cachePrewarmEnabled && PrewarmCache?.prewarm) {
      try {
        PrewarmCache.prewarm(ctx);
        Evolution?.recordLineage?.("spinal-prewarm-cache");
      } catch (err) {
        warn?.("[SpinalCord] Cache prewarm failed:", err);
      }
    }

    if (PresenceMesh?.notifySpineImpulse) {
      try {
        PresenceMesh.notifySpineImpulse(ctx);
        Evolution?.recordLineage?.("spinal-presence-impulse");
      } catch (err) {
        warn?.("[SpinalCord] PresenceMesh notify failed:", err);
      }
    }
  }

  // --------------------------------------------------------------------------
  // FIREWALL HELPERS — centralized checks
  // --------------------------------------------------------------------------
  function firewallBlocksRoute(routeType) {
    if (!Firewall || typeof Firewall.isBlockedRoute !== "function") return false;
    const blocked = !!Firewall.isBlockedRoute(routeType);

    if (blocked) {
      SpinalPageScanner.emit("spinal-firewall-route-block", {
        routeType
      });
    }

    return blocked;
  }

  function firewallBlocksSource(source) {
    if (!Firewall || typeof Firewall.isBlockedSource !== "function") return false;
    const blocked = !!Firewall.isBlockedSource(source);

    if (blocked) {
      SpinalPageScanner.emit("spinal-firewall-source-block", {
        source
      });
    }

    return blocked;
  }

  function firewallBlocksExtension(extensionId) {
    if (!Firewall || typeof Firewall.isBlockedExtension !== "function") return false;
    const blocked = !!Firewall.isBlockedExtension(extensionId);

    if (blocked) {
      SpinalPageScanner.emit("spinal-firewall-extension-block", {
        extensionId
      });
    }

    return blocked;
  }

  function firewallBlocksSystem(systemId) {
    if (!Firewall || typeof Firewall.isBlockedSystem !== "function") return false;
    const blocked = !!Firewall.isBlockedSystem(systemId);

    if (blocked) {
      SpinalPageScanner.emit("spinal-firewall-system-block", {
        systemId
      });
    }

    return blocked;
  }

  // --------------------------------------------------------------------------
  // EXTENSION / SYSTEM REGISTRATION — organism-wide attachment points
  // --------------------------------------------------------------------------
  function registerExtension(extensionId, kind, meta = {}) {
    if (!extensionId || !kind) return;

    if (firewallBlocksExtension(extensionId)) {
      warn("[SpinalCord] Firewall blocked unsafe extension:", extensionId, kind);
      Evolution?.recordLineage?.(
        `spinal-firewall-ext-block:${extensionId}:${kind}`
      );
      return;
    }

    SpinalState.extensions[extensionId] = { kind, meta };
    Evolution?.recordLineage?.(`spinal-ext-register:${extensionId}:${kind}`);
    log("[SpinalCord] Extension registered:", extensionId, kind);

    SpinalPageScanner.emit("spinal-extension-register", {
      extensionId,
      kind
    });
  }

  function registerSystem(systemId, kind, meta = {}) {
    if (!systemId || !kind) return;

    if (firewallBlocksSystem(systemId)) {
      warn("[SpinalCord] Firewall blocked unsafe system:", systemId, kind);
      Evolution?.recordLineage?.(
        `spinal-firewall-sys-block:${systemId}:${kind}`
      );
      return;
    }

    SpinalState.systems[systemId] = { kind, meta };
    Evolution?.recordLineage?.(`spinal-sys-register:${systemId}:${kind}`);
    log("[SpinalCord] System registered:", systemId, kind);

    SpinalPageScanner.emit("spinal-system-register", {
      systemId,
      kind
    });
  }

  // --------------------------------------------------------------------------
  // RECEPTOR REGISTRATION — strict separation + firewall
  // --------------------------------------------------------------------------
  function registerReceptor(modeKind, source, handler) {
    if (!source || typeof handler !== "function") return;
    if (!["binary", "symbolic", "dual"].includes(modeKind)) return;

    if (firewallBlocksSource(source)) {
      warn(
        "[SpinalCord] Firewall blocked unsafe receptor source:",
        source,
        modeKind
      );
      Evolution?.recordLineage?.(
        `spinal-firewall-receptor-block:${modeKind}:${source}`
      );
      return;
    }

    const bucket = SpinalState.receptors[modeKind];
    if (!bucket[source]) bucket[source] = new Set();
    bucket[source].add(handler);

    Evolution?.recordLineage?.(`spinal-register-${modeKind}:${source}`);
    log("[SpinalCord] Receptor registered:", modeKind, source);

    SpinalPageScanner.emit("spinal-receptor-register", {
      modeKind,
      source
    });
  }

  function unregisterReceptor(modeKind, source, handler) {
    const bucket = SpinalState.receptors[modeKind];
    if (!bucket || !bucket[source]) return;

    bucket[source].delete(handler);
    if (bucket[source].size === 0) delete bucket[source];

    Evolution?.recordLineage?.(`spinal-unregister-${modeKind}:${source}`);
    log("[SpinalCord] Receptor unregistered:", modeKind, source);

    SpinalPageScanner.emit("spinal-receptor-unregister", {
      modeKind,
      source
    });
  }

  // --------------------------------------------------------------------------
  // IMPULSE EMISSION — strict dual-band conduction + advantage field + firewall
  // --------------------------------------------------------------------------
  function emitImpulse(source, impulse = {}) {
    const modeKind = impulse.modeKind || "symbolic";
    const executionContext = impulse.executionContext || {};
    const pressureSnapshot = impulse.pressureSnapshot || {};

    if (firewallBlocksSource(source)) {
      warn(
        "[SpinalCord] Firewall blocked unsafe impulse source:",
        source,
        modeKind
      );
      Evolution?.recordLineage?.(
        `spinal-firewall-impulse-block:${modeKind}:${source}`
      );

      SpinalPageScanner.emit("spinal-impulse-blocked", {
        source,
        modeKind
      });

      return;
    }

    SpinalState.impulseCount += 1;
    updateLoopAndAdvantage(modeKind);

    const impulseSignature = buildImpulseSignature({
      source,
      modeKind,
      executionContext
    });

    SpinalPageScanner.emit("spinal-impulse", {
      source,
      modeKind,
      impulseSignature,
      advantageField: SpinalState.advantageField
    });

    prewarmForImpulse(source, impulse, impulseSignature);

    EventBus?.emit?.("spinal:impulse", {
      source,
      modeKind,
      impulseSignature,
      executionContext,
      pressureSnapshot,
      advantageField: SpinalState.advantageField,
      loopCounters: SpinalState.loopCounters
    });

    if (MeshBus?.emit) {
      try {
        MeshBus.emit("spine:impulse", {
          source,
          modeKind,
          impulseSignature,
          advantageField: SpinalState.advantageField
        });
      } catch {
        // mesh emission must never break spine
      }
    }

    // v30: PulseBand + PulseSignal hooks (metadata-only, no routing)
    if (PulseBand?.emit) {
      try {
        PulseBand.emit("spineImpulse", {
          source,
          modeKind,
          impulseSignature,
          advantageField: SpinalState.advantageField
        });
      } catch {
        // PulseBand emission must never break spine
      }
    }

    if (PulseSignal?.publish || PulseSignal?.emit) {
      try {
        const fn = PulseSignal.publish || PulseSignal.emit;
        fn.call(PulseSignal, {
          kind: "spineImpulse",
          source,
          modeKind,
          impulseSignature,
          advantageField: SpinalState.advantageField
        });
      } catch {
        // PulseSignal emission must never break spine
      }
    }

    const bucket = SpinalState.receptors[modeKind];
    const set = bucket?.[source];

    if (set && set.size > 0) {
      for (const handler of set) {
        try {
          handler(impulse);
        } catch (err) {
          warn("[SpinalCord] Receptor handler error:", source, err);
          SpinalPageScanner.emit("spinal-receptor-error", {
            source,
            modeKind
          });
        }
      }
    }

    Evolution?.recordLineage?.(`spinal-impulse-${modeKind}`);
  }

  // --------------------------------------------------------------------------
  // ROUTING — deterministic, no timestamps, route-root aware + firewall
  // --------------------------------------------------------------------------
  async function routeToOrgan(routeType, payload = {}) {
    Evolution?.recordLineage?.("spinal-route-organ");

    if (firewallBlocksRoute(routeType)) {
      warn("[SpinalCord] Firewall blocked unsafe organ route:", routeType);
      Evolution?.recordLineage?.(
        `spinal-firewall-route-organ-block:${routeType}`
      );
      EventBus?.emit?.("spinal:route:block", {
        kind: "organ",
        routeType,
        reason: "firewallBlocked"
      });

      SpinalPageScanner.emit("spinal-route-organ-blocked", {
        routeType
      });

      return {
        error: "firewallBlocked",
        kind: "organ",
        routeType,
        reason: "unsafeRoute"
      };
    }

    if (!Router?.route) {
      warn("[SpinalCord] Router missing route() — cannot route to organ.");

      SpinalPageScanner.emit("spinal-route-organ-router-missing", {
        routeType
      });

      return { error: "routerMissing", details: "Router.route not available" };
    }

    SpinalPageScanner.emit("spinal-route-organ-call", {
      routeType
    });

    const res = await Router.route(routeType, {
      ...payload,
      spinalContext: {
        impulseCount: SpinalState.impulseCount,
        advantageField: SpinalState.advantageField,
        loopCounters: SpinalState.loopCounters,
        extensions: SpinalState.extensions,
        systems: SpinalState.systems,
        presence: SpinalState.presence,
        arterySnapshot: SpinalState.arterySnapshot,
        pulseTopologySnapshot: SpinalState.pulseTopologySnapshot,
        coreGovernorAware: !!CoreGovernor,
        binaryOverlayAware: !!BinaryOverlay
      }
    });

    EventBus?.emit?.("spinal:route:organ", { routeType, payload, res });

    SpinalPageScanner.emit("spinal-route-organ-response", {
      routeType
    });

    return res;
  }

  async function routeToBackend(endpointType, payload = {}) {
    Evolution?.recordLineage?.("spinal-route-backend");

    if (firewallBlocksRoute(endpointType)) {
      warn(
        "[SpinalCord] Firewall blocked unsafe backend route:",
        endpointType
      );
      Evolution?.recordLineage?.(
        `spinal-firewall-route-backend-block:${endpointType}`
      );
      EventBus?.emit?.("spinal:route:block", {
        kind: "backend",
        routeType: endpointType,
        reason: "firewallBlocked"
      });

      SpinalPageScanner.emit("spinal-route-backend-blocked", {
        endpointType
      });

      return {
        error: "firewallBlocked",
        kind: "backend",
        routeType: endpointType,
        reason: "unsafeRoute"
      };
    }

    if (!Router?.route) {
      warn("[SpinalCord] Router missing route() — cannot route to backend.");

      SpinalPageScanner.emit("spinal-route-backend-router-missing", {
        endpointType
      });

      return { error: "routerMissing", details: "Router.route not available" };
    }

    SpinalPageScanner.emit("spinal-route-backend-call", {
      endpointType
    });

    const res = await Router.route(endpointType, {
      ...payload,
      spinalContext: {
        impulseCount: SpinalState.impulseCount,
        advantageField: SpinalState.advantageField,
        loopCounters: SpinalState.loopCounters,
        extensions: SpinalState.extensions,
        systems: SpinalState.systems,
        presence: SpinalState.presence,
        arterySnapshot: SpinalState.arterySnapshot,
        pulseTopologySnapshot: SpinalState.pulseTopologySnapshot,
        coreGovernorAware: !!CoreGovernor,
        binaryOverlayAware: !!BinaryOverlay
      }
    });

    EventBus?.emit?.("spinal:route:backend", { endpointType, payload, res });

    SpinalPageScanner.emit("spinal-route-backend-response", {
      endpointType
    });

    return res;
  }

  // --------------------------------------------------------------------------
  // HEALTH ENGINE — deterministic, no timestamps
  // --------------------------------------------------------------------------
  function updateHealth(score) {
    SpinalState.healthScore = score;
    EventBus?.emit?.("spinal:health:update", { score });
    Evolution?.updateOrganHealth?.("PulseOSSpinalCord", score);

    SpinalPageScanner.emit("spinal-health-update", {
      score
    });
  }

  function getHealth() {
    return SpinalState.healthScore;
  }

  // --------------------------------------------------------------------------
  // PUBLIC SPINAL CORD SURFACE
  // --------------------------------------------------------------------------
  const PulseOSSpinalCord = {
    PulseRole,
    SpinalState,
    meta: PulseOSSpinalCordMeta,

    // Extensions / systems
    registerExtension,
    registerSystem,

    // Presence
    registerPresence,
    unregisterPresence,
    getSpinalPresenceSnapshot,

    // Receptors
    registerReceptor,
    unregisterReceptor,

    // Impulses
    emitImpulse,

    // Routing
    routeToOrgan,
    routeToBackend,

    // Health
    updateHealth,
    getHealth,

    // Advantage + artery + topology snapshots
    getSpinalAdvantageSnapshot,
    applySpinalArterySnapshot,
    applySpinalPulseTopologySnapshot,
    getSpinalArterySnapshot,
    getSpinalPulseTopologySnapshot
  };

  // --------------------------------------------------------------------------
  // SDN PREWARM ENGINE — Spinal Reflex Ignition (v30-IMMORTAL++++)
// --------------------------------------------------------------------------
  try {
    prewarmSDN(PulseOSSpinalCord);
    Brain?.log?.(
      "[PulseOSSpinalCord] SDN prewarm complete (reflex arcs hot, v30-IMMORTAL++++, impulse-speed)."
    );

    SpinalPageScanner.emit("spinal-sdn-prewarm-complete", {});
  } catch (err) {
    warn?.("[PulseOSSpinalCord] SDN prewarm failed:", err);

    SpinalPageScanner.emit("spinal-sdn-prewarm-error", {});
  }

  Brain?.log?.(
    "[PulseOSSpinalCord v30-IMMORTAL++++] Initialized organism-wide dual-band spinal cord with firewall gating, chunk/cache/route/impulse prewarm, multi-presence spine, SDN prewarm, artery/topology snapshots, mesh-aware impulses, PulseBand/PulseSignal hooks, and PageScanner spine-level intel."
  );
  Evolution?.recordLineage?.("spinal-init-v30-IMMORTAL++++");

  SpinalPageScanner.emit("spinal-init", { version: PulseOSSpinalCordMeta.version });

  return PulseOSSpinalCord;
}

export default {
  meta: PulseOSSpinalCordMeta,
  createPulseOSSpinalCord
};
