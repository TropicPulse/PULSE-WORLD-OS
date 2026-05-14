// ============================================================================
//  BinaryProxy-v20.4-Immortal-ABA-ADVANTAGE-PRESENCE-PLUS.js
//  PURE BINARY NERVE ROOT — v20++ IMMORTAL A‑B‑A ADVANTAGE EDITION
//  + CACHE/CHUNK/PRESENCE/PREWARM/ADVANTAGE ENVELOPES (DETERMINISTIC META)
//  + RESOURCE/IMPULSE/ROUTER-MEMORY/PNS ENVELOPES (META-ONLY)
//  + PROXY MODE BAND (ADDON-ONLY, BINARY-SAFE TAP, PRESSURE-AWARE)
// ============================================================================
//  ROLE:
//    - Accept ONLY pure binary arrays (0/1).
//    - Encode using BinaryAgent (encoder).
//    - Exchange using encoder.process() (cortex / binary brain).
//    - Emit A‑B‑A bandSignature + binaryField + waveField + cycleSignature.
//    - Emit cacheChunk + presence + prewarm + advantage envelopes (meta-only).
//    - Emit resourcePressure + impulseSpeed + routerMemory + PNS envelopes.
//    - Deterministic fallback to symbolic proxy (PulseProxy / OS proxy).
//    - Expose Proxy Mode band for OS-level proxy / Pulse-Pal (addon-only).
//
//  ARCHITECTURE LAW (v20++ IMMORTAL A‑B‑A):
//    - Binary adds ONLY binary representation + binary meta envelopes.
//    - No routing, no lineage, no patterns, no evolution logic here.
//    - No JSON except internal ops. No external objects.
//    - No randomness, no drift, no mutation of external state.
//    - All envelopes are deterministic, replayable, cache/prewarm aware.
//    - Proxy Mode is ADDON-ONLY: tap-only, no routing, no OS logic here.
// ============================================================================
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝

// 2 — EXPORT GENOME METADATA
export const PulseOSBinaryProxyMeta = Identity.OrganMeta;
export const pulseRole = Identity.pulseRole;
export const BinaryProxyRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
// export const PULSE_EARN_IMMUNE_CONTEXT = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

import PulseProxyHeart from "./PulseProxyHeart-v20.js";
import PulseProxyBloodPressure from "./PulseProxyBloodPressure-v20.js";
import PulseProxyCirculatorySystem from "./PulseProxyCirculatorySystem-v20.js";

import PulseProxyHypothalamus from "./PulseProxyHypothalamus-v20.js";
import PulseProxySpine from "./PulseProxySpine-v20.js";

import pulseband from "./PulseProxyPNSNervousSystem-v20.js";   // PNS
import PulseProxySynapse from "./PulseProxySynapse-v20.js";   // Synapse junctions

import { PulseClient, PulseNet, PULSE_LIMBIC_SHADOW_META } from "./PulseProxyLimbic-v20.js";

import {
  scanUserScoresForInstanceHints,
  checkProxyHealthAndMetrics
} from "./PulseProxyWBCells-v20.js";

import {
  cleanupSessionsBefore,
  cleanupErrorsBefore,
  cleanupRedownloadsBefore
} from "./PulseProxyPNSPurifier-v20.js";

import PulseProxyOuterAgent from "./PulseProxyOuterAgent-v20.js";
import createPulseProxyInnerAgent from "./PulseProxyInnerAgent-v20.js";

import PulseProxyImpulse from "./PulseProxyImpulse-v20.js";

import PulseProxyBloodstream from "./PulseProxyBloodstream-v20.js";

import PulseProxyAdrenalSystem from "./PulseProxyAdrenalSystem-v20.js";

import PulseProxyBBB from "./PulseProxyBBB-v20.js";

import pulseHistoryRepair from "./PulseProxyPNSRepair-v20.js";

import {
  PulseNetBoot,
  PulseProofBridge
} from "../../PULSE-UI/___BACKEND/PULSE-WORLD-BRIDGE.js";

// --- PULSE-CORE MEMORY SPINE (FULL SPINE) ----------------------------------
import PulseCoreMemory from "../PULSE-CORE/PulseCoreMemory-v24.js";
import PulseCoreAIMemoryAdapter from "../PULSE-CORE/PulseCoreAIMemoryAdapter-v20.js";
import PulseCoreProxyMemoryAdapter from "../PULSE-CORE/PulseCoreProxyMemoryAdapter-v20.js";
import PulseBinaryCoreOverlay from "../PULSE-CORE/PulseCoreBinaryOverlay-v20.js";

// CoreMemory bridge: structural, deterministic, keyed by memory surfaces.
export const CoreMemory = Object.freeze({
  raw: () => PulseCoreMemory,
  all: () => PulseCoreAIMemoryAdapter,
  proxy: () => PulseCoreProxyMemoryAdapter,
  binaryOverlay: () => PulseBinaryCoreOverlay
});


// ---------------------------------------------------------------------------
// HEALING STATE — IMMORTAL BINARY NERVE ROOT
// ---------------------------------------------------------------------------
const BinaryProxyHealingState = {
  layer: "BinaryProxy",
  role: "PURE_BINARY_NERVE_ROOT",
  version: "v20.4-Immortal-ABA-ADVANTAGE-PRESENCE-PLUS",
  lastCycle: 0,
  lastDir: null,
  lastBandSignature: null,
  lastBinarySurface: null,
  lastWaveField: null,
  lastAdvantageScoreHint: 1.0,
  lastResourcePressure: null,
  lastImpulseSpeedBand: null,
  lastRouterMemoryHint: null,
  lastPnsHint: null,
  cycleCount: 0,
  proxyModeEnabled: false
};

export function getBinaryProxyHealingState() {
  return { ...BinaryProxyHealingState };
}

// ---------------------------------------------------------------------------
// BINARY PROXY FACTORY (v20++ with Proxy Mode band)
// ---------------------------------------------------------------------------
export function createBinaryProxy({
  encoder,
  fallbackProxyFactory,
  trace = false,
  proxyModeAdapter = null   // OS-level proxy / Pulse-Pal hook (addon-only)
} = {}) {
  if (!encoder) {
    throw new Error("BinaryProxy requires a BinaryAgent encoder");
  }

  let cycle = 0;
  const history = [];
  let proxyModeEnabled = !!proxyModeAdapter;

  // -------------------------------------------------------------------------
  //  SAFETY: PURE BINARY ONLY
  // -------------------------------------------------------------------------
  function isPureBinary(bits) {
    if (!Array.isArray(bits)) return false;
    for (let i = 0; i < bits.length; i++) {
      if (bits[i] !== 0 && bits[i] !== 1) return false;
    }
    return true;
  }

  function ensurePureBinaryOrFallback(op, bits, reason) {
    if (!isPureBinary(bits)) {
      return fallback(op, bits, reason);
    }
    return bits;
  }

  // -------------------------------------------------------------------------
  //  A‑B‑A SURFACES (binary-only phenotype, deterministic)
// -------------------------------------------------------------------------
  function buildBandSignature() {
    return encoder.hash("binary-band-v20.4-immortal-aba");
  }

  function buildBinaryField() {
    const patternLen = 16;
    const density = patternLen + cycle + 64;
    const surface = density + patternLen;

    return {
      binaryPhenotypeSignature: encoder.hash(`BINARY_PHENO::${surface}`),
      binarySurfaceSignature: encoder.hash(`BINARY_SURF::${surface}`),
      binarySurface: { patternLen, density, surface },
      parity: surface % 2 === 0 ? 0 : 1,
      shiftDepth: Math.max(0, Math.floor(Math.log2(surface || 1)))
    };
  }

  function buildWaveField() {
    const amplitude = (cycle + 1) * 16;
    const wavelength = amplitude + 8;
    const phase = amplitude % 32;

    return {
      amplitude,
      wavelength,
      phase,
      band: "binary",
      mode: "compression-wave"
    };
  }

  function buildCycleSignature() {
    return encoder.hash(`BINARY_PROXY_CYCLE::${cycle}`);
  }

  // -------------------------------------------------------------------------
  //  v16+ CACHE/CHUNK/PRESENCE/PREWARM/ADVANTAGE ENVELOPES (META-ONLY)
// -------------------------------------------------------------------------
  function buildCacheChunkEnvelope(dir) {
    const chunkId = encoder.hash(`BINARY_CHUNK_ID::${dir}::${cycle}`);
    const chunkBandSignature = encoder.hash(`BINARY_CHUNK_BAND::${cycle}`);
    const chunkSurface = encoder.hash(`BINARY_CHUNK_SURF::${cycle}`);

    return {
      cacheChunkId: chunkId,
      cacheChunkBandSignature: chunkBandSignature,
      cacheChunkSurfaceSignature: chunkSurface
    };
  }

  function buildPresenceEnvelope(dir) {
    const presenceId = encoder.hash(`BINARY_PRESENCE_ID::${dir}::${cycle}`);
    const presenceSignature = encoder.hash(`BINARY_PRESENCE_SIG::${cycle}`);
    const prewarmSignature = encoder.hash(`BINARY_PREWARM_SIG::${cycle}`);

    return {
      presenceId,
      presenceSignature,
      prewarmSignature,
      presenceBand: "binary-nerve",
      presenceMode: dir
    };
  }

  function buildPrewarmEnvelope(dir) {
    const prewarmId = encoder.hash(`BINARY_PREWARM_ID::${dir}::${cycle}`);
    const routeHint = encoder.hash(`BINARY_PREWARM_ROUTE::${cycle}`);
    const cacheHint = encoder.hash(`BINARY_PREWARM_CACHE::${cycle}`);
    const chunkHint = encoder.hash(`BINARY_PREWARM_CHUNK::${cycle}`);

    return {
      prewarmId,
      routePrewarmSignature: routeHint,
      cachePrewarmSignature: cacheHint,
      chunkPrewarmSignature: chunkHint,
      prewarmBand: "binary",
      prewarmMode: "nerve-root"
    };
  }

  function buildAdvantageEnvelope(dir) {
    const advantageId = encoder.hash(`BINARY_ADV_ID::${dir}::${cycle}`);
    const advantageFieldSignature = encoder.hash(
      `BINARY_ADV_FIELD::${cycle}`
    );
    const advantageBandSignature = encoder.hash(
      `BINARY_ADV_BAND::${cycle}`
    );

    return {
      advantageId,
      advantageFieldSignature,
      advantageBandSignature,
      advantageBand: "binary",
      advantageField: "binary-nerve-root",
      advantageScoreHint: 1.0,
      cascadeLevelHint: 0
    };
  }

  // -------------------------------------------------------------------------
  //  v20++ RESOURCE / IMPULSE / ROUTER MEMORY / PNS ENVELOPES (META-ONLY)
// -------------------------------------------------------------------------
  function buildResourceEnvelope() {
    // Pure metadata wiring of resource pressure (CPU/GPU/memory) as seen by proxy
    const cpu = 0.3;   // symbolic hint only, deterministic constant
    const gpu = 0.2;
    const memory = 0.25;

    const resourceBand =
      cpu > 0.8 || gpu > 0.8 || memory > 0.8
        ? "hot"
        : cpu > 0.4 || gpu > 0.4 || memory > 0.4
        ? "warm"
        : "cool";

    return {
      cpuPressure: cpu,
      gpuPressure: gpu,
      memoryPressure: memory,
      resourceBand,
      resourceSignature: encoder.hash(
        `BINARY_RESOURCE::${cpu}::${gpu}::${memory}::${resourceBand}`
      )
    };
  }

  function buildImpulseEnvelope(dir) {
    // Impulse speed band is symbolic-only, but deterministic
    const impulseBand =
      dir === "exchange" ? "reflex" :
      dir === "in" ? "afferent" :
      "efferent";

    const impulseSpeed = dir === "exchange" ? "fast" : "normal";

    return {
      impulseBand,
      impulseSpeed,
      impulseSignature: encoder.hash(
        `BINARY_IMPULSE::${dir}::${impulseBand}::${impulseSpeed}::${cycle}`
      )
    };
  }

  function buildRouterMemoryEnvelope() {
    // Router memory awareness is metadata-only: hints for CheckRouterMemory
    const routeWarmth =
      cycle === 0 ? "cold" :
      cycle < 8 ? "warming" :
      "warm";

    return {
      routerMemoryBand: "binary-router-memory",
      routeWarmth,
      routerMemorySignature: encoder.hash(
        `BINARY_ROUTER_MEMORY::${routeWarmth}::${cycle}`
      )
    };
  }

  function buildPnsEnvelope() {
    // PNS awareness: binary nerve root knows if PNS / pulseband is wired
    const pnsAvailable = !!pulseband;
    const pnsBand = pnsAvailable ? "dual" : "none";

    return {
      pnsAvailable,
      pnsBand,
      pnsSignature: encoder.hash(
        `BINARY_PNS::${pnsAvailable ? "1" : "0"}::${pnsBand}::${cycle}`
      )
    };
  }

  function buildPhysiologyEnvelope() {
    // Pure metadata wiring of circulatory / endocrine / barrier systems
    return {
      heart: !!PulseProxyHeart,
      bloodPressure: !!PulseProxyBloodPressure,
      circulatorySystem: !!PulseProxyCirculatorySystem,
      hypothalamus: !!PulseProxyHypothalamus,
      spine: !!PulseProxySpine,
      pns: !!pulseband,
      synapse: !!PulseProxySynapse,
      bloodstream: !!PulseProxyBloodstream,
      adrenalSystem: !!PulseProxyAdrenalSystem,
      bbb: !!PulseProxyBBB
    };
  }

  function buildLimbicEnvelope() {
    return {
      limbicMeta: PULSE_LIMBIC_SHADOW_META || null,
      clientAvailable: !!PulseClient,
      netAvailable: !!PulseNet
    };
  }

  function buildAgentsEnvelope() {
    return {
      outerAgentAvailable: !!PulseProxyOuterAgent,
      innerAgentFactoryAvailable: !!createPulseProxyInnerAgent,
      impulseAvailable: !!PulseProxyImpulse,
      historyRepairAvailable: !!pulseHistoryRepair
    };
  }

  // -------------------------------------------------------------------------
  //  HEALING STATE UPDATE
  // -------------------------------------------------------------------------
  function updateHealingState({
    dir,
    bandSignature,
    binaryField,
    waveField,
    advantageEnvelope,
    resourceEnvelope,
    impulseEnvelope,
    routerMemoryEnvelope,
    pnsEnvelope
  }) {
    BinaryProxyHealingState.lastCycle = cycle;
    BinaryProxyHealingState.lastDir = dir;
    BinaryProxyHealingState.lastBandSignature = bandSignature;
    BinaryProxyHealingState.lastBinarySurface =
      binaryField?.binarySurface || null;
    BinaryProxyHealingState.lastWaveField = waveField || null;
    BinaryProxyHealingState.lastAdvantageScoreHint =
      typeof advantageEnvelope?.advantageScoreHint === "number"
        ? advantageEnvelope.advantageScoreHint
        : BinaryProxyHealingState.lastAdvantageScoreHint;
    BinaryProxyHealingState.lastResourcePressure = resourceEnvelope || null;
    BinaryProxyHealingState.lastImpulseSpeedBand = impulseEnvelope || null;
    BinaryProxyHealingState.lastRouterMemoryHint = routerMemoryEnvelope || null;
    BinaryProxyHealingState.lastPnsHint = pnsEnvelope || null;
    BinaryProxyHealingState.cycleCount += 1;
    BinaryProxyHealingState.proxyModeEnabled = proxyModeEnabled;
  }

  // -------------------------------------------------------------------------
  //  v20+ BINARY ENVELOPE + PROXY MODE TAP (ADDON-ONLY)
// -------------------------------------------------------------------------
  function buildBinaryEnvelope(dir, bits, encoded, extra = null) {
    const bandSignature = buildBandSignature();
    const binaryField = buildBinaryField();
    const waveField = buildWaveField();
    const cycleSignature = buildCycleSignature();
    const cacheChunkEnvelope = buildCacheChunkEnvelope(dir);
    const presenceEnvelope = buildPresenceEnvelope(dir);
    const prewarmEnvelope = buildPrewarmEnvelope(dir);
    const advantageEnvelope = buildAdvantageEnvelope(dir);
    const resourceEnvelope = buildResourceEnvelope();
    const impulseEnvelope = buildImpulseEnvelope(dir);
    const routerMemoryEnvelope = buildRouterMemoryEnvelope();
    const pnsEnvelope = buildPnsEnvelope();
    const physiologyEnvelope = buildPhysiologyEnvelope();
    const limbicEnvelope = buildLimbicEnvelope();
    const agentsEnvelope = buildAgentsEnvelope();

    const record = {
      dir,
      bits,
      encoded,
      bandSignature,
      binaryField,
      waveField,
      cycleSignature,
      cacheChunkEnvelope,
      presenceEnvelope,
      prewarmEnvelope,
      advantageEnvelope,
      resourceEnvelope,
      impulseEnvelope,
      routerMemoryEnvelope,
      pnsEnvelope,
      physiologyEnvelope,
      limbicEnvelope,
      agentsEnvelope
    };

    if (extra) {
      record.extra = extra;
    }

    history.push(record);

    updateHealingState({
      dir,
      bandSignature,
      binaryField,
      waveField,
      advantageEnvelope,
      resourceEnvelope,
      impulseEnvelope,
      routerMemoryEnvelope,
      pnsEnvelope
    });

    // PROXY MODE TAP (ADDON-ONLY, NO MUTATION OF BINARY FLOW)
    if (proxyModeEnabled && proxyModeAdapter && typeof proxyModeAdapter.tap === "function") {
      try {
        proxyModeAdapter.tap({
          dir,
          cycle,
          bits,
          encoded,
          bandSignature,
          binaryField,
          waveField,
          cycleSignature
        });
      } catch (e) {
        if (trace && typeof console !== "undefined") {
          console.warn("[BinaryProxy] ProxyMode tap error:", e);
        }
      }
    }

    return {
      encoded,
      bandSignature,
      binaryField,
      waveField,
      cycleSignature,
      cacheChunkEnvelope,
      presenceEnvelope,
      prewarmEnvelope,
      advantageEnvelope,
      resourceEnvelope,
      impulseEnvelope,
      routerMemoryEnvelope,
      pnsEnvelope,
      physiologyEnvelope,
      limbicEnvelope,
      agentsEnvelope,
      healingState: getBinaryProxyHealingState()
    };
  }

  // -------------------------------------------------------------------------
  //  RECEIVE (binary → encoded)
// -------------------------------------------------------------------------
  function receive(bits) {
    cycle++;

    const pure = ensurePureBinaryOrFallback("receive", bits, "non-binary-input");
    const encoded = encoder.encode(pure);

    if (trace && typeof console !== "undefined") {
      console.log("[BinaryProxy] IN:", pure);
    }

    const envelope = buildBinaryEnvelope("in", pure, encoded);
    return envelope.encoded;
  }

  // -------------------------------------------------------------------------
  //  SEND (binary → encoded)
// -------------------------------------------------------------------------
  function send(bits) {
    cycle++;

    const pure = ensurePureBinaryOrFallback("send", bits, "non-binary-output");
    const encoded = encoder.encode(pure);

    if (trace && typeof console !== "undefined") {
      console.log("[BinaryProxy] OUT:", pure);
    }

    const envelope = buildBinaryEnvelope("out", pure, encoded);
    return envelope.encoded;
  }

  // -------------------------------------------------------------------------
  //  EXCHANGE (binary → cortex → binary)
// -------------------------------------------------------------------------
  function exchange(bits) {
    cycle++;

    const pure = ensurePureBinaryOrFallback(
      "exchange",
      bits,
      "non-binary-exchange"
    );

    const encodedIn = encoder.encode(pure);
    const response = encoder.process(encodedIn);

    const pureResponse = ensurePureBinaryOrFallback(
      "exchange",
      response,
      "cortex-non-binary-response"
    );

    const encodedOut = encoder.encode(pureResponse);

    if (trace && typeof console !== "undefined") {
      console.log("[BinaryProxy] EXCHANGE IN:", pure);
      console.log("[BinaryProxy] EXCHANGE OUT:", pureResponse);
    }

    const envelope = buildBinaryEnvelope("exchange", pure, encodedOut, {
      responseBits: pureResponse
    });

    return envelope.encoded;
  }

  // -------------------------------------------------------------------------
  //  FALLBACK — deterministic, drift-proof, symbolic proxy bridge
  // -------------------------------------------------------------------------
  function fallback(op, bits, reason) {
    if (!fallbackProxyFactory) {
      throw new Error(
        `BinaryProxy fallback triggered (${reason}) but no fallbackProxyFactory provided`
      );
    }

    if (trace && typeof console !== "undefined") {
      console.warn(`[BinaryProxy] FALLBACK (${op}):`, reason, bits);
    }

    // Attach limbic + agents metadata into the fallback payload
    const limbicEnvelope = buildLimbicEnvelope();
    const agentsEnvelope = buildAgentsEnvelope();

    return fallbackProxyFactory({
      jobId: `fallback-${op}`,
      pattern: "binary-fallback",
      payload: { bits, reason, limbicEnvelope, agentsEnvelope },
      priority: "normal",
      returnTo: null,
      parentLineage: null,
      pageId: "BINARY_PROXY_FALLBACK"
    });
  }

  // -------------------------------------------------------------------------
  //  PROXY MODE CONTROL (v20+ ADDON)
// -------------------------------------------------------------------------
  function enableProxyMode(adapter) {
    if (adapter && typeof adapter.tap === "function") {
      proxyModeAdapter = adapter;
      proxyModeEnabled = true;
    }
    BinaryProxyHealingState.proxyModeEnabled = proxyModeEnabled;
    return proxyModeEnabled;
  }

  function disableProxyMode() {
    proxyModeEnabled = false;
    BinaryProxyHealingState.proxyModeEnabled = proxyModeEnabled;
    return proxyModeEnabled;
  }

  function getProxyModeStatus() {
    return {
      enabled: proxyModeEnabled,
      adapterAvailable: !!proxyModeAdapter
    };
  }

  function getProxyModePressureField() {
    // Pure symbolic pressure field derived from healing state + cycle
    const cycles = BinaryProxyHealingState.cycleCount || 0;
    const band = proxyModeEnabled ? "active" : "inactive";
    const load =
      cycles === 0 ? 0 :
      cycles < 32 ? 0.25 :
      cycles < 128 ? 0.5 :
      0.75;

    return {
      band,
      load,
      pressureSignature: encoder.hash(
        `BINARY_PROXY_MODE_PRESSURE::${band}::${load}::${cycles}`
      )
    };
  }

  // -------------------------------------------------------------------------
  //  DIAGNOSTICS — uses WB cells (scores + health metrics)
// -------------------------------------------------------------------------
  async function diagnostics({ instanceId, beforeTimestamp } = {}) {
    const scores = await scanUserScoresForInstanceHints(instanceId || null);
    const health = await checkProxyHealthAndMetrics();

    return {
      role: BinaryProxyRole,
      meta: PulseOSBinaryProxyMeta,
      cycle,
      scores,
      health,
      beforeTimestamp: beforeTimestamp || null,
      proxyMode: getProxyModeStatus(),
      proxyModePressureField: getProxyModePressureField(),
      healingState: getBinaryProxyHealingState()
    };
  }

  // -------------------------------------------------------------------------
  //  MAINTENANCE — uses PNS purifier + history repair
  // -------------------------------------------------------------------------
  async function maintenance({ beforeTimestamp } = {}) {
    const ts = beforeTimestamp || Date.now();

    const sessions = await cleanupSessionsBefore(ts);
    const errors = await cleanupErrorsBefore(ts);
    const redownloads = await cleanupRedownloadsBefore(ts);
    const historyFix = await pulseHistoryRepair({ before: ts });

    return {
      role: BinaryProxyRole,
      meta: PulseOSBinaryProxyMeta,
      cycle,
      sessions,
      errors,
      redownloads,
      historyFix,
      healingState: getBinaryProxyHealingState()
    };
  }

  // -------------------------------------------------------------------------
  //  PUBLIC API
  // -------------------------------------------------------------------------
  return {
    role: BinaryProxyRole,
    meta: PulseOSBinaryProxyMeta,
    receive,
    send,
    exchange,
    fallback,
    history,
    diagnostics,
    maintenance,
    // v20+ Proxy Mode addon
    enableProxyMode,
    disableProxyMode,
    getProxyModeStatus,
    getProxyModePressureField,
    getHealingState: getBinaryProxyHealingState
  };
}

const PulseProxyBridge = PulseProofBridge;
export default PulseProxyBridge;
