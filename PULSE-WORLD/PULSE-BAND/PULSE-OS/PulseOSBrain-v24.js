// ============================================================================
// FILE: /PulseOS/Brain/PulseOSBrain-v24.js
// PULSE OS BRAIN — v24-Immortal++-DUALBAND-Presence-ADVANTAGE-ARTERY
// “REAL CNS / ORGANISM-WIDE IDENTITY + INTELLIGENCE + ARTERY KERNEL”
// ============================================================================
//
// LAWS (v24+IMMORTAL++ + PULSE-TOPOLOGY 24):
//   • Brain may import ONLY:
//       - PulseIQMap        (design + logging + long-term memory)
//       - PulseOrganismMap  (organ layout + organs + lineage)
//       - PulseOSEvolution  (CNS evolution organ, which boots Cortex)
//   • Brain NEVER executes binary payloads.
//   • Brain NEVER performs network calls.
//   • Brain NEVER routes anything.
//   • Brain is binary-aware, dualband, but symbolic-primary.
//   • Binary is always post-render, handled by GPU / Send / Binary organs.
//   • Brain is the CNS identity + contract + artery kernel, not a router, not a GPU.
//   • No presence/mesh/gpu/heartbeat imports — awareness is metadata-only.
//   • Brain may hold world-lens / advantage / presence / pulse-topology / artery
//     summaries, but only emits view-only, non-network-dependent descriptors.
//   • All internet / network intent MUST be emitted upward as symbolic intent
//     and fulfilled by Castle → Expansion → Pulse-Net (server / higher power).
//   • Expansion + server are the *internet center*; Brain is read-only consumer
//     via snapshots, never the origin of network traffic.
//   • v24++: artery-aware, SDN-prewarm-aware, multi-presence-aware, mesh-artery-aware,
//     chunk/cache/presence/advantage-field aware, but still zero-network, zero-binary.
// ============================================================================

import {
  OrganismIdentity,
  buildPulseOrganismMap as PulseOrganismMap,
  buildPulseOrganismMap as buildOrganismMap
} from "../PULSE-X/PULSE-WORLD-MAP.js";
const Identity = OrganismIdentity(import.meta.url);

// 2 — EXPORT GENOME METADATA
// export const PulseMeshMeta = Identity.OrganMeta;
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
// export const PULSE_EARN_IMMUNE_CONTEXT = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

// ============================================================================
//  IMPORTS — LAW: BRAIN MAY IMPORT ONLY PULSEIQ + ORGANISM + EVOLUTION
// ============================================================================
import { PulseIQMap } from "../PULSE-X/PulseWorldIQMap-v24.js";
import { PulseOrganismMap } from "../PULSE-X/PULSE-WORLD-MAP.js
";
import { PulseOSEvolution } from "./PulseOSBrainEvolution-v24.js";

import checkBand from "../PULSE-X/PULSE-WORLD-BAND.js";
import checkIdentity from "../PULSE-X/PulseWorldIdentity-v20.js";
import checkRouterMemory from "../PULSE-PROXY/PulseProxyMemoryRouter-v20.js";

// ============================================================================
//  CNS BRAIN — v24-Immortal++-DUALBAND-Presence-ADVANTAGE-ARTERY
// ============================================================================

// deterministic symbolic sequence (replaces Date.now usage inside Brain)
let BrainSeq = 0;
function nextBrainSeq() {
  BrainSeq += 1;
  return BrainSeq;
}

export const PulseOSBrain = {
  // -------------------------------------------------------------------------
  // Identity — Organism-wide CNS contract
  // -------------------------------------------------------------------------
  PulseRole: {
    type: "Brain",
    subsystem: "OS",
    layer: "CNS",
    version: "24-Immortal++",
    identity: "PulseOSBrain",
    evo: {
      deterministicNeuron: true,
      driftProof: true,
      multiInstanceReady: true,
      advantageCascadeAware: true,
      unifiedAdvantageField: true,

      routingContract: "PulseRouter-v24-Immortal++",
      osOrganContract: "PulseOS-v24-Immortal++",
      earnCompatibility: "PulseEarn-v24-Immortal++",
      proxyCompatibility: "PulseProxySpine-v24-Immortal++",
      gpuCompatibility: "PulseGPU-v24-Immortal++",

      loopTheoryAware: true,
      continuanceAware: true,

      dualMode: true,
      symbolicPrimary: true,
      binaryPostRenderOnly: true,
      binaryCompressionAware: true,
      binaryNonExecutable: true,
      organismWideIdentityField: true,

      presenceFieldAware: true,
      bluetoothPresenceAware: true,
      meshPresenceRelayAware: true,
      meshTopologyAware: true,
      kernelChunkingReady: true,
      kernelPrewarmReady: true,
      advantageFieldAware: true,
      pulseTopologyAware: true,

      // v24 internet-center awareness
      expansionAware: true,
      serverRoundtripAware: true,
      internetCenterExternal: true,

      // Artery awareness
      arteryAware: true,
      arteryDeterministic: true,
      arteryDriftProof: true,
      arteryMultiBandAware: true,

      // v24++ SDN / prewarm alignment
      sdnPrewarmAware: true,
      spinalPrewarmAware: true,
      organismMeshArteryAware: true
    }
  },

  // -------------------------------------------------------------------------
  // CNS Infrastructure — IQ-aware but NOT IQ-dependent for survival
  // -------------------------------------------------------------------------
  PulseIQMap: PulseIQMap || {},
  PulseOrganismMap: PulseOrganismMap,
  PulseOSEvolution: PulseOSEvolution,

  intent: {
    mode: "organism-brain",
    epoch: "24-Immortal++",
    dualBand: true,
    symbolicPrimary: true
  },

  understanding: {
    classify: () => null,
    fallback: () => null
  },

  evolution: null, // attached by cognitiveBootstrap

  cortex: {
    routes: {},
    pages: {},
    bind: () => {},
    initializeNervousSystem: () => {},
    initializeOrgans: () => {},
    scanFile: null
  },

  // CNS snapshots (filled by Castle/Expansion/Pulse-Net via server roundtrip)
  CNSWorldLensSnapshot: null,
  CNSAdvantageSnapshot: null,
  CNSPresenceSnapshot: null,
  CNSTopologySnapshot: null,
  CNSArterySnapshot: null,

  // CNS Artery live state (internal, deterministic, drift-proof)
  CNSArteryState: {
    pressure: 0,          // 0..1
    throughput: 0,        // 0..1
    cost: 0,              // 0..1
    stability: 1,         // 0..1
    entropy: 0,           // 0..1
    expansionReadiness: 0,// 0..1
    recoveryNeed: 0,      // 0..1
    cortexLoad: 0,        // 0..1
    meshLoad: 0,          // 0..1
    presenceLoad: 0,      // 0..1
    advantageLoad: 0,     // 0..1
    worldLensLoad: 0,     // 0..1
    topologyLoad: 0,      // 0..1
    organismMeshLoad: 0,  // 0..1
    dualBandLoad: 0,      // 0..1
    binaryOverlayLoad: 0  // 0..1
  },

  log: (...args) => {
    if (PulseOSBrain.PulseIQMap?.log) return PulseOSBrain.PulseIQMap.log(...args);
    return console.log("[BRAIN]", ...args);
  },

  warn: (...args) => {
    if (PulseOSBrain.PulseIQMap?.warn) return PulseOSBrain.PulseIQMap.warn(...args);
    return console.warn("[BRAIN-WARN]", ...args);
  },

  logError: (...args) => {
    if (PulseOSBrain.PulseIQMap?.logError) return PulseOSBrain.PulseIQMap.logError(...args);
    return console.error("[BRAIN-ERROR]", ...args);
  },

  firebase: (...args) => {
    if (PulseOSBrain.PulseIQMap?.firebase) return PulseOSBrain.PulseIQMap.firebase(...args);
    return null;
  },

  // -------------------------------------------------------------------------
  // UNIFIED NETWORK INTENT SURFACE — v24 IMMORTAL++
  // -------------------------------------------------------------------------
  //
  // Brain does NOT perform network. It only emits symbolic intent that
  // Castle → Expansion → Pulse-Net (server) interpret and fulfill.
  //
  // Internet center is Expansion+Server; Brain is a pure intent + snapshot node.
  //
  BrainIntent: {
    emitNetworkIntent({ type, payload = {} }) {
      return {
        ok: true,
        intent: "network-request",
        type,
        payload,
        band: "symbolic",
        source: "PulseOSBrain",
        // deterministic symbolic sequence; Expansion/Server may ignore/override
        seq: nextBrainSeq()
      };
    },

    worldLensRefresh() {
      const iq = PulseOSBrain.PulseIQMap || {};
      return PulseOSBrain.BrainIntent.emitNetworkIntent({
        type: "worldLens.refresh",
        payload: {
          url: iq.worldLensURL || null,
          offlineSafe: true
        }
      });
    },

    advantageRefresh() {
      return PulseOSBrain.BrainIntent.emitNetworkIntent({
        type: "advantage.refresh",
        payload: {}
      });
    },

    presenceRefresh() {
      return PulseOSBrain.BrainIntent.emitNetworkIntent({
        type: "presence.refresh",
        payload: {}
      });
    },

    topologyRefresh() {
      return PulseOSBrain.BrainIntent.emitNetworkIntent({
        type: "topology.refresh",
        payload: {}
      });
    }
  },

  // -------------------------------------------------------------------------
  // SNAPSHOT APPLY SURFACES — filled by Castle/Expansion/Pulse-Net
  // -------------------------------------------------------------------------
  //
  // These are the ONLY ways network-derived data enters the Brain.
  // They are called by higher layers after server roundtrip.
  //
  applyWorldLensSnapshot(snapshot) {
    const s = snapshot || {};
    PulseOSBrain.CNSWorldLensSnapshot = {
      lastUpdated: s.lastUpdated ?? null,
      summary: s.summary || {},
      sources: s.sources || [],
      offlineSafe: s.offlineSafe !== false
    };
  },

  applyAdvantageSnapshot(snapshot) {
    const adv = snapshot || {};
    PulseOSBrain.CNSAdvantageSnapshot = {
      advantageScore: adv.advantageScore ?? adv.score ?? null,
      advantageBand: adv.advantageBand || adv.band || "neutral",
      regionAdvantage: adv.regionAdvantage || {},
      cascadeHints: adv.cascadeHints || {}
    };
  },

  applyPresenceSnapshot(snapshot) {
    const s = snapshot || {};
    PulseOSBrain.CNSPresenceSnapshot = {
      presenceField: s.presenceField || {},
      meshPresence: s.meshPresence || {},
      organismSnapshot: s.organismSnapshot || {
        organs: Object.keys(PulseOSBrain.PulseOrganismMap || {})
      }
    };
  },

  applyTopologySnapshot(snapshot) {
    const s = snapshot || {};
    PulseOSBrain.CNSTopologySnapshot = {
      momHeart: s.momHeart || null,
      dadHeart: s.dadHeart || null,
      babyHeart: s.babyHeart || null,
      fallbackRules: s.fallbackRules || {
        babyPulseSource: "mom-or-dad",
        momFallbackToDad: true,
        dadFallbackToMom: true
      }
    };
  },

  applyArterySnapshot(snapshot) {
    const s = snapshot || {};
    // snapshot is allowed to come from OrganismMesh / Expansion / NodeAdmin
    PulseOSBrain.CNSArterySnapshot = {
      pressure: s.pressure ?? PulseOSBrain.CNSArteryState.pressure,
      throughput: s.throughput ?? PulseOSBrain.CNSArteryState.throughput,
      cost: s.cost ?? PulseOSBrain.CNSArteryState.cost,
      stability: s.stability ?? PulseOSBrain.CNSArteryState.stability,
      entropy: s.entropy ?? PulseOSBrain.CNSArteryState.entropy,
      expansionReadiness: s.expansionReadiness ?? PulseOSBrain.CNSArteryState.expansionReadiness,
      recoveryNeed: s.recoveryNeed ?? PulseOSBrain.CNSArteryState.recoveryNeed,
      cortexLoad: s.cortexLoad ?? PulseOSBrain.CNSArteryState.cortexLoad,
      meshLoad: s.meshLoad ?? PulseOSBrain.CNSArteryState.meshLoad,
      presenceLoad: s.presenceLoad ?? PulseOSBrain.CNSArteryState.presenceLoad,
      advantageLoad: s.advantageLoad ?? PulseOSBrain.CNSArteryState.advantageLoad,
      worldLensLoad: s.worldLensLoad ?? PulseOSBrain.CNSArteryState.worldLensLoad,
      topologyLoad: s.topologyLoad ?? PulseOSBrain.CNSArteryState.topologyLoad,
      organismMeshLoad: s.organismMeshLoad ?? PulseOSBrain.CNSArteryState.organismMeshLoad,
      dualBandLoad: s.dualBandLoad ?? PulseOSBrain.CNSArteryState.dualBandLoad,
      binaryOverlayLoad: s.binaryOverlayLoad ?? PulseOSBrain.CNSArteryState.binaryOverlayLoad
    };
  },

  // -------------------------------------------------------------------------
  // CNS Artery Engine — internal, deterministic, drift-proof
  // -------------------------------------------------------------------------
  CNSArtery: {
    // clamp helper
    _clamp01(x) {
      if (typeof x !== "number" || Number.isNaN(x)) return 0;
      if (x < 0) return 0;
      if (x > 1) return 1;
      return x;
    },

    // update from local signals (no network)
    updateLocalSignals({
      cortexLoad,
      meshLoad,
      presenceLoad,
      advantageLoad,
      worldLensLoad,
      topologyLoad,
      organismMeshLoad,
      dualBandLoad,
      binaryOverlayLoad
    } = {}) {
      const s = PulseOSBrain.CNSArteryState;

      if (cortexLoad != null) s.cortexLoad = this._clamp01(cortexLoad);
      if (meshLoad != null) s.meshLoad = this._clamp01(meshLoad);
      if (presenceLoad != null) s.presenceLoad = this._clamp01(presenceLoad);
      if (advantageLoad != null) s.advantageLoad = this._clamp01(advantageLoad);
      if (worldLensLoad != null) s.worldLensLoad = this._clamp01(worldLensLoad);
      if (topologyLoad != null) s.topologyLoad = this._clamp01(topologyLoad);
      if (organismMeshLoad != null) s.organismMeshLoad = this._clamp01(organismMeshLoad);
      if (dualBandLoad != null) s.dualBandLoad = this._clamp01(dualBandLoad);
      if (binaryOverlayLoad != null) s.binaryOverlayLoad = this._clamp01(binaryOverlayLoad);

      // derive pressure/throughput/cost/stability/entropy deterministically
      const avgLoad =
        (s.cortexLoad +
          s.meshLoad +
          s.presenceLoad +
          s.advantageLoad +
          s.worldLensLoad +
          s.topologyLoad +
          s.organismMeshLoad +
          s.dualBandLoad +
          s.binaryOverlayLoad) / 9;

      s.pressure = this._clamp01(avgLoad);
      s.throughput = this._clamp01(1 - Math.abs(avgLoad - 0.5) * 1.2);
      s.cost = this._clamp01(avgLoad * 0.8 + s.dualBandLoad * 0.2);
      s.stability = this._clamp01(1 - avgLoad * 0.7);
      s.entropy = this._clamp01(
        avgLoad * 0.6 + s.meshLoad * 0.2 + s.presenceLoad * 0.2
      );

      s.expansionReadiness = this._clamp01(
        (1 - s.pressure) * 0.4 + s.throughput * 0.4 + s.stability * 0.2
      );

      s.recoveryNeed = this._clamp01(
        s.pressure * 0.5 + (1 - s.stability) * 0.5
      );

      return this.getSnapshot();
    },

    getSnapshot() {
      const s = PulseOSBrain.CNSArteryState;
      return {
        pressure: s.pressure,
        throughput: s.throughput,
        cost: s.cost,
        stability: s.stability,
        entropy: s.entropy,
        expansionReadiness: s.expansionReadiness,
        recoveryNeed: s.recoveryNeed,
        cortexLoad: s.cortexLoad,
        meshLoad: s.meshLoad,
        presenceLoad: s.presenceLoad,
        advantageLoad: s.advantageLoad,
        worldLensLoad: s.worldLensLoad,
        topologyLoad: s.topologyLoad,
        organismMeshLoad: s.organismMeshLoad,
        dualBandLoad: s.dualBandLoad,
        binaryOverlayLoad: s.binaryOverlayLoad
      };
    }
  },

  // -------------------------------------------------------------------------
  // CNS Intelligence Layer — structural reasoning, not routing
  // -------------------------------------------------------------------------
  BrainIntel: {
    classifyDegradation(healthScore) {
      if (healthScore >= 0.85) return "direct";
      if (healthScore >= 0.15) return "bypass";
      return "routeAround";
    },

    scoreIdentityMatch(signature, module) {
      let score = 0;
      if (module?.PulseRole?.type === signature.type) score += 1;
      if (module?.PulseRole?.subsystem === signature.subsystem) score += 1;
      return score;
    },

    fallbackToMemory() {
      const iq = PulseOSBrain.PulseIQMap || PulseIQMap || {};
      const route = iq.getRecoveryRoute ? iq.getRecoveryRoute() : "/";
      const organs = iq.pages && iq.pages[route] ? iq.pages[route] : [];
      return { route, organs };
    },

    getSymbolicOrganismIdentity() {
      return {
        role: PulseOSBrain.PulseRole,
        intent: PulseOSBrain.intent,
        organismMap: PulseOSBrain.PulseOrganismMap,
        iqMap: PulseOSBrain.PulseIQMap
      };
    },

    getBinaryOrganismDescriptor() {
      const symbolic = this.getSymbolicOrganismIdentity();

      const descriptor = {
        version: PulseOSBrain.PulseRole.version,
        identity: PulseOSBrain.PulseRole.identity,
        subsystem: PulseOSBrain.PulseRole.subsystem,
        layer: PulseOSBrain.PulseRole.layer,

        dualMode: true,
        symbolicPrimary: true,
        binaryFirst: true,
        binaryPostRenderOnly: true,
        binaryNonExecutable: true,

        encoding: {
          format: "application/pulse-organism+json",
          suggestedTransport: "PulseGPU-v24-Immortal++",
          suggestedCompression: "post-render",
          executable: false
        }
      };

      return {
        descriptor,
        symbolicSnapshot: symbolic
      };
    },

    getPresenceDescriptors() {
      if (PulseOSBrain.CNSPresenceSnapshot) {
        return PulseOSBrain.CNSPresenceSnapshot;
      }

      const iq = PulseOSBrain.PulseIQMap || PulseIQMap || {};
      const organism = PulseOSBrain.PulseOrganismMap || PulseOrganismMap || {};

      const presenceConfig = iq.presenceConfig || {};
      const meshConfig = iq.meshPresenceConfig || {};

      return {
        presenceField: {
          enabled: !!presenceConfig.enabled,
          bluetoothPreferred: !!presenceConfig.bluetoothPreferred,
          routes: presenceConfig.routes || []
        },
        meshPresence: {
          enabled: !!meshConfig.enabled,
          topology: meshConfig.topology || "none",
          routes: meshConfig.routes || []
        },
        organismSnapshot: {
          organs: Object.keys(organism || {})
        }
      };
    },

    getChunkingProfiles() {
      const iq = PulseOSBrain.PulseIQMap || PulseIQMap || {};
      const profiles = iq.chunkingProfiles || {};

      return {
        defaultProfile: profiles.default || null,
        routeProfiles: profiles.routes || {},
        gpuProfiles: profiles.gpu || {}
      };
    },

    getAdvantageField() {
      if (PulseOSBrain.CNSAdvantageSnapshot) {
        return PulseOSBrain.CNSAdvantageSnapshot;
      }

      const iq = PulseOSBrain.PulseIQMap || PulseIQMap || {};
      const adv = iq.advantageField || {};

      return {
        advantageScore: adv.score ?? null,
        advantageBand: adv.band || "neutral",
        regionAdvantage: adv.regionAdvantage || {},
        cascadeHints: adv.cascadeHints || {}
      };
    },

    getWorldLensSnapshot() {
      const lens = PulseOSBrain.CNSWorldLensSnapshot || {};
      return {
        lastUpdated: lens.lastUpdated || null,
        summary: lens.summary || {},
        sources: lens.sources || [],
        offlineSafe: lens.offlineSafe !== false
      };
    },

    getPulseTopologyDescriptors() {
      if (PulseOSBrain.CNSTopologySnapshot) {
        return PulseOSBrain.CNSTopologySnapshot;
      }

      const iq = PulseOSBrain.PulseIQMap || PulseIQMap || {};
      const organism = PulseOSBrain.PulseOrganismMap || PulseOrganismMap || {};

      const topo = iq.pulseTopology || {};

      const mom = topo.momHeart || organism.PulseProxyHeart || null;
      const dad = topo.dadHeart || organism.PulseAIHeartbeat || null;
      const baby = topo.earnHeart || organism.PulseEarnHeart || null;

      return {
        momHeart: mom
          ? { identity: mom.identity || "mom-heart", role: mom.role || "MOM_HEART" }
          : null,
        dadHeart: dad
          ? { identity: dad.identity || "dad-heart", role: dad.role || "DAD_HEART" }
          : null,
        babyHeart: baby
          ? { identity: baby.identity || "baby-heart", role: baby.role || "EARN_HEART" }
          : null,
        fallbackRules: topo.fallbackRules || {
          babyPulseSource: "mom-or-dad",
          momFallbackToDad: true,
          dadFallbackToMom: true
        }
      };
    },

    getArterySnapshot() {
      // prefer external snapshot if present, otherwise derive from local state
      if (PulseOSBrain.CNSArterySnapshot) {
        return PulseOSBrain.CNSArterySnapshot;
      }
      return PulseOSBrain.CNSArtery.getSnapshot();
    }
  },

  scanFile(filePath) {
    const cortex = PulseOSBrain.cortex;

    if (cortex && typeof cortex.scanFile === "function") {
      return cortex.scanFile(filePath);
    }

    PulseOSBrain.warn("🧠 [PulseOSBrain v24-Immortal++] scanFile called but Cortex has no scanFile surface.", {
      filePath
    });

    return {
      ok: false,
      error: "SCANNER_UNAVAILABLE",
      filePath
    };
  }
};

// ============================================================================
//  BRAIN PREWARM ENGINE — v24-Immortal++
// ============================================================================
//
// v24++: still zero-network, zero-binary, but SDN-prewarm-aware. This is a
// structural warm-up only: touch IQ + organism maps and stabilize artery once.
//
function prewarmPulseOSBrain() {
  try {
    const iq = PulseOSBrain.PulseIQMap || {};
    const organism = PulseOSBrain.PulseOrganismMap || {};

    const iqKeys = Object.keys(iq);
    for (const k of iqKeys) {
      const o = iq[k];
      void o;
    }

    const orgKeys = Object.keys(organism);
    for (const k of orgKeys) {
      const o = organism[k];
      void o;
    }

    // prewarm artery once with neutral loads
    PulseOSBrain.CNSArtery.updateLocalSignals({});

    return true;
  } catch (err) {
    console.error("[PulseOSBrain Prewarm v24-Immortal++] Failed:", err);
    return false;
  }
}

prewarmPulseOSBrain();

// ============================================================================
// 1) ROLE VALIDATION — CNS Gatekeeper
// ============================================================================
export function validatePulseRole(module, expectedType, expectedSubsystem) {
  if (!module?.PulseRole) return false;

  const role = module.PulseRole;

  const typeOk = expectedType
    ? role.type?.toLowerCase() === expectedType.toLowerCase()
    : true;

  const subsystemOk = expectedSubsystem
    ? role.subsystem?.toLowerCase() === expectedSubsystem.toLowerCase()
    : true;

  return typeOk && subsystemOk;
}

// ============================================================================
// 2) STRUCTURAL ERROR INTELLIGENCE — Drift Surface
// ============================================================================
export function structuralError(expected, found, extraContext = {}) {
  const payload = {
    error: "ROLE_MISMATCH",
    expectedType: expected.type,
    expectedSubsystem: expected.subsystem,
    foundType: found.type,
    foundSubsystem: found.subsystem,
    message: `Invalid attachment: expected ${expected.type}/${expected.subsystem} but found ${found.type}/${found.subsystem}`,
    severity: "warning",
    action: "fallbackToLongTermMemory",
    ...extraContext
  };

  PulseOSBrain.warn("[STRUCTURAL_ERROR v24-Immortal++]", payload);
  return payload;
}

// ============================================================================
// 3) EVOLUTION + ORGAN LOADING — Design-Driven CNS Logic
// ============================================================================
export async function loadOrganByDesign(designIdentity, expectedType, expectedSubsys) {
  const evolveRaw =
    PulseOSBrain.evolution?.evolveRaw ||
    PulseOSBrain.evolution?.evolveOrganRaw;

  const raw = typeof evolveRaw === "function"
    ? await evolveRaw(designIdentity)
    : [];

  const expected = { type: expectedType, subsystem: expectedSubsys };

  const candidates = raw.filter(({ module }) =>
    validatePulseRole(module, expected.type, expected.subsystem)
  );

  if (candidates.length > 0) {
    const chosen = candidates[0];
    PulseOSBrain.log(`🧠 [PulseOSBrain v24-Immortal++] Attached organ from ${chosen.path}`);
    return chosen.module;
  }

  PulseOSBrain.warn("[PulseOSBrain v24-Immortal++] No matching organ found for designIdentity.", {
    designIdentity,
    expected
  });

  return null;
}

// ============================================================================
// 4) CNS DIAGNOSTICS + OUTPUT — CALLS ALL HEALERS + SURFACES
// ============================================================================
function safeRun(label, fn) {
  try {
    const res = fn();
    return res === undefined ? { ok: true, surface: label } : res;
  } catch (err) {
    return { ok: false, error: String(err), surface: label };
  }
}

export function getCNSDiagnostics() {
  return {
    bandCheck: safeRun("checkBand", checkBand),
    identityCheck: safeRun("checkIdentity", checkIdentity),
    routerMemoryCheck: safeRun("checkRouterMemory", checkRouterMemory),
    worldLens: PulseOSBrain.BrainIntel.getWorldLensSnapshot(),
    advantageField: PulseOSBrain.BrainIntel.getAdvantageField(),
    pulseTopology: PulseOSBrain.BrainIntel.getPulseTopologyDescriptors(),
    artery: PulseOSBrain.BrainIntel.getArterySnapshot()
  };
}

export function getCNSState() {
  const identity = PulseOSBrain.BrainIntel.getSymbolicOrganismIdentity();
  const presence = PulseOSBrain.BrainIntel.getPresenceDescriptors();
  const chunking = PulseOSBrain.BrainIntel.getChunkingProfiles();
  const advantage = PulseOSBrain.BrainIntel.getAdvantageField();
  const worldLens = PulseOSBrain.BrainIntel.getWorldLensSnapshot();
  const pulseTopology = PulseOSBrain.BrainIntel.getPulseTopologyDescriptors();
  const artery = PulseOSBrain.BrainIntel.getArterySnapshot();
  const diagnostics = getCNSDiagnostics();

  return {
    CNSIdentity: identity,
    CNSContracts: PulseOSBrain.PulseRole,
    CNSDiagnostics: diagnostics,
    CNSBootSignatures: {
      organism: PulseOSBrain.PulseOrganismMap,
      iq: PulseOSBrain.PulseIQMap
    },
    CNSPresenceDescriptors: presence,
    CNSChunkingProfiles: chunking,
    CNSAdvantageField: advantage,
    CNSWorldLensSnapshot: worldLens,
    CNSPulseTopologyDescriptors: pulseTopology,
    CNSArterySnapshot: artery
  };
}

// ============================================================================
// 5) COGNITIVE BOOTSTRAP — Brain → Evolution → Cortex
// ============================================================================
export async function cognitiveBootstrap({ intent, organism, iqMap, understanding }) {
  // v24++: still IQ-driven, but we keep the same surface for compatibility.
  iqMap = PulseIQMap;

  if (intent) PulseOSBrain.intent = intent;
  if (organism) PulseOSBrain.PulseOrganismMap = organism;

  if (iqMap) {
    PulseOSBrain.PulseIQMap = iqMap;

    if (iqMap.log) PulseOSBrain.log = (...args) => iqMap.log(...args);
    if (iqMap.warn) PulseOSBrain.warn = (...args) => iqMap.warn(...args);
    if (iqMap.logError) PulseOSBrain.logError = (...args) => iqMap.logError(...args);
    if (iqMap.firebase) PulseOSBrain.firebase = (...args) => iqMap.firebase(...args);
  }

  if (understanding) {
    PulseOSBrain.understanding = understanding;
  }

  const evolutionOrgan = PulseOSEvolution({
    intent,
    organism,
    iq: iqMap,
    understanding
  });

  PulseOSBrain.evolution = evolutionOrgan;

  const cortex = evolutionOrgan.bootCortex(PulseOSBrain, { band: "dual" });
  PulseOSBrain.cortex = cortex;

  evolutionOrgan.recordLineage("brain-cognitive-bootstrap-v24-immortal++", { band: "dual" });
  evolutionOrgan.scanDrift(PulseOSBrain, { band: "dual" });

  // update artery from initial cortex/organism signals if any
  try {
    const initialLoads = evolutionOrgan.getInitialArteryLoads
      ? evolutionOrgan.getInitialArteryLoads()
      : {};
    PulseOSBrain.CNSArtery.updateLocalSignals(initialLoads);
  } catch (err) {
    PulseOSBrain.warn("[PulseOSBrain v24-Immortal++] Initial artery load update failed", { error: String(err) });
  }

  PulseOSBrain.log("🧠 [PulseOSBrain v24-Immortal++] cognitiveBootstrap complete (advantage-integrated, artery-aware, zero-network, internet-center external).");

  const diagnostics = getCNSDiagnostics();
  PulseOSBrain.CNSLastDiagnostics = diagnostics;
  PulseOSBrain.CNSLastState = getCNSState();

  return PulseOSBrain;
}

// -------------------------------------------------------------------------
// NOTE: v24-Immortal++ — Brain is NOT the internet center.
// -------------------------------------------------------------------------
// • Brain never fetches.
// • Brain never talks to the server directly.
// • All network-class behavior flows:
//     BrainIntent → Expansion → Server → Expansion → Brain.apply*Snapshot → User.
// • Artery is shared conceptually with OrganismMesh + SDN Prewarm, but Brain’s
//   CNSArtery is a local, deterministic, metadata-only view — no routing,
//   no network, no binary execution.
// -------------------------------------------------------------------------
