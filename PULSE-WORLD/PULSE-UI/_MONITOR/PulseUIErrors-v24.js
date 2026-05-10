/*
===============================================================================
FILE: /PULSE-UI/PulseUIErrors-v24-Immortal-Evo+++.js
UNIVERSAL ERROR SPINE — v24-Immortal-Evo+++
Membrane-Safe • Drift-Safe • Organism-Wide Error Unifier
Offline-First • CoreMemory-Mirrored • Evidence-Aware • Portal/Overmind-Aware
Multi-Mind • Multi-Band • Session-Aware • Future-Evolution-Ready
===============================================================================
AI_EXPERIENCE_META = {
  identity: "PulseUIErrors",
  version: "v24-Immortal-Evo+++",
  layer: "pulse_ui",
  role: "ui_error_spine",
  lineage: "PulseUIErrors-v12 → v14-Immortal → v16-Immortal → v20-Immortal-Evo+++ → v24-Immortal-Evo+++",

  evo: {
    presenceAware: true,
    chunkAligned: true,
    dualBand: true,
    safeRouteFree: true,
    normalizerAligned: true,
    errorSpine: true,

    offlineFirst: true,
    localStoreMirrored: true,
    replayAware: true,
    modeAgnostic: true,

    deterministic: true,
    driftProof: true,
    schemaVersioned: true,
    envelopeAware: true,
    integrityAware: true,
    degradationAware: true,
    experienceBlocksAware: true,
    coreMemoryMirrored: true,
    unifiedAdvantageField: true,
    futureEvolutionReady: true,

    // v20++ / v24 upgrades
    portalAware: true,
    overmindAware: true,
    adminPanelAware: true,
    diagnosticsAware: true,
    evidenceAware: true,
    multiMindAware: true,
    pulseBandAware: true,
    sessionAware: true,
    routeAware: true,
    surfaceAware: true,
    severityAware: true,
    tagAware: true,
    correlationAware: true,
    samplingAware: true,
    dedupAware: true
  },

  contract: {
    always: [
      "PulseWindow",
      "PulsePresence",
      "PulseChunks",
      "PulseUIFlow",
      "PulseCore.Memory",
      "PulseUI.EvolutionaryRouter",
      "PulseUI.EvolutionaryBrain",
      "PulseUI.EvolutionaryCode",
      "PulsePortal",
      "PulseOvermindPrime",
      "PulseWorldAdminPanel",
      "AdminDiagnosticsOrgan"
    ],
    never: [
      "legacyUIErrors",
      "safeRoute",
      "fetchViaCNS",
      "legacyPresence",
      "legacyFlow",
      "identityInference",
      "PIIExtraction"
    ]
  }
}
===============================================================================
*/
// ============================================================================
//  IMMORTAL++ LAZY BRIDGE ACCESS — SAFE, GLOBAL, CIRCULAR-PROOF
// ============================================================================

import { PulseProofBridge as BridgeExport } from "../_BACKEND/PULSE-WORLD-BRIDGE.js";

// IMMORTAL++: always resolve the bridge *late*, never at module top-level
function getBridge() {
  // Prefer the fully initialized global mirror
  if (typeof globalThis !== "undefined" && globalThis.PulseProofBridge) {
    return globalThis.PulseProofBridge;
  }
  // Fallback to direct import (only safe if no cycle)
  return BridgeExport || null;
}

// Lazy getters — ALWAYS call these inside functions, never at top-level
function getCore() {
  const b = getBridge();
  return b?.coreMemory || null;
}

function getEvidenceBus() {
  const b = getBridge();
  return b?.evidenceBus || null;
}

function getDiagnosticsBus() {
  const b = getBridge();
  return b?.diagnosticsBus || null;
}

const Core = getCore;
const DiagnosticsBus = getDiagnosticsBus;
const EvidenceBus = getEvidenceBus;
// ============================================================================
//  GLOBAL HANDLE (unchanged)
// ============================================================================
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

// Prefer global db if present (logger page / server)
const db =
  (g && g.db) ||
  (typeof global !== "undefined" && global.db) ||
  (typeof globalThis !== "undefined" && globalThis.db) ||
  (typeof window !== "undefined" && window.db) ||
  null;

// ============================================================================
//  DO NOT USE Core/EvidenceBus/DiagnosticsBus DIRECTLY ANYMORE
//  ALWAYS USE getCore(), getEvidenceBus(), getDiagnosticsBus()
// ============================================================================

// ============================================================================
// IMMORTAL LOCALSTORAGE MIRROR — PulseUIErrorStore v24
// ============================================================================
const UIE_SCHEMA_VERSION = "v5";
const UIE_LS_KEY = "PulseUIErrors.v24.buffer";
const UIE_LS_MAX = 4000;

function uieHasLocalStorage() {
  try {
    if (typeof window === "undefined" || !window.localStorage) return false;
    const t = "__uie_test__";
    window.localStorage.setItem(t, "1");
    window.localStorage.removeItem(t);
    return true;
  } catch {
    return false;
  }
}

function uieLoadBuffer() {
  if (!uieHasLocalStorage()) return [];
  try {
    const raw = window.localStorage.getItem(UIE_LS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function uieSaveBuffer(buf) {
  if (!uieHasLocalStorage()) return;
  try {
    const trimmed =
      buf.length > UIE_LS_MAX ? buf.slice(buf.length - UIE_LS_MAX) : buf;
    window.localStorage.setItem(UIE_LS_KEY, JSON.stringify(trimmed));
  } catch {
    // never throw
  }
}

function uieHashString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) >>> 0;
  }
  return h >>> 0;
}

// lightweight dedup window
const UIE_DEDUP_WINDOW_MS = 5000;
let uieLastEnvelopeByKey = Object.create(null);

function uieShouldSample(kind, envelope) {
  const severity = envelope?.severity || "error";
  if (severity === "fatal" || severity === "critical") return true;
  if (severity === "warning") return Math.random() < 0.5;
  return true;
}

function uieDedupKey(envelope) {
  const p = envelope?.packet || {};
  const base = `${p.origin || "unknown"}:${p.name || "Error"}:${(p.message || "").slice(0, 80)}`;
  return uieHashString(base).toString(16);
}

function uiePassesDedup(envelope) {
  try {
    const key = uieDedupKey(envelope);
    const now = Date.now();
    const last = uieLastEnvelopeByKey[key];
    if (last && now - last < UIE_DEDUP_WINDOW_MS) {
      return false;
    }
    uieLastEnvelopeByKey[key] = now;
    return true;
  } catch {
    return true;
  }
}

function appendUIErrorRecord(kind, payload) {
  const entry = {
    ts: Date.now(),
    kind,
    payload
  };
  const buf = uieLoadBuffer();
  buf.push(entry);
  uieSaveBuffer(buf);

  // CoreMemory mirror via bridge (router-style snapshot)
  try {
    Core?.setRouteSnapshot?.("ui_errors", {
      schemaVersion: UIE_SCHEMA_VERSION,
      version: "24.0-Immortal-Evo+++",
      kind,
      entry,
      timestamp: Date.now()
    });
  } catch {}

  // Optional: append to a rolling log channel
  try {
    Core?.appendLog?.("ui_errors_log", {
      schemaVersion: UIE_SCHEMA_VERSION,
      version: "24.0-Immortal-Evo+++",
      kind,
      entry
    });
  } catch {}

  // Optional: diagnostics bus
  try {
    DiagnosticsBus?.emit?.("ui_error_record", {
      kind,
      entry
    });
  } catch {}
}

export const PulseUIErrorStore = {
  getAll() {
    return uieLoadBuffer();
  },
  tail(n = 400) {
    const buf = uieLoadBuffer();
    return buf.slice(Math.max(0, buf.length - n));
  },
  clear() {
    uieSaveBuffer([]);
    try {
      Core?.setRouteSnapshot?.("ui_errors", {
        schemaVersion: UIE_SCHEMA_VERSION,
        version: "24.0-Immortal-Evo+++",
        cleared: true,
        timestamp: Date.now()
      });
    } catch {}
  }
};

// ============================================================================
// INTERNAL: advantage + integrity + experience blocks + severity/tags
// ============================================================================
function uieComputeAdvantage(packet) {
  const msg = packet?.message || "";
  const stack = packet?.stack || "";
  const origin = packet?.origin || "";

  const msgLen = msg.length;
  const stackLen = stack.length;
  const originLen = origin.length;

  const total = msgLen + stackLen + originLen || 1;
  const msgWeight = msgLen / total;
  const stackWeight = stackLen / total;
  const originWeight = originLen / total;

  const density = stackWeight;
  const entropyHint = 1 - Math.abs(0.5 - density) * 2;

  const advantage =
    0.5 * msgWeight +
    0.3 * stackWeight +
    0.2 * originWeight;

  return {
    msgLen,
    stackLen,
    originLen,
    totalSize: total,
    msgWeight,
    stackWeight,
    originWeight,
    density,
    entropyHint,
    advantage
  };
}

function uieComputeIntegrity(packet, advantage) {
  const base =
    0.2 * (packet?.origin ? 1 : 0) +
    0.2 * (packet?.name ? 1 : 0) +
    0.2 * (packet?.route ? 1 : 0) +
    0.2 * (packet?.surface ? 1 : 0) +
    0.2 * (advantage.entropyHint ?? 0.5);

  const score = Math.max(0, Math.min(1, base));

  const status =
    score >= 0.97 ? "immortal" :
    score >= 0.90 ? "excellent" :
    score >= 0.75 ? "good" :
    score >= 0.60 ? "fair" :
    score >= 0.40 ? "degraded" :
                    "critical";

  const degraded = status === "degraded" || status === "critical";

  return { score, status, degraded };
}

function uieInferSeverity(packet) {
  const msg = (packet?.message || "").toLowerCase();
  const name = (packet?.name || "").toLowerCase();

  if (name.includes("rangeerror") || msg.includes("out of memory")) {
    return "fatal";
  }
  if (name.includes("typeerror") || msg.includes("undefined")) {
    return "error";
  }
  if (msg.includes("network") || msg.includes("timeout")) {
    return "warning";
  }
  return "error";
}

function uieInferTags(packet) {
  const tags = new Set();

  const msg = (packet?.message || "").toLowerCase();
  const origin = (packet?.origin || "").toLowerCase();

  if (origin.includes("router")) tags.add("router");
  if (origin.includes("flow")) tags.add("ui-flow");
  if (origin.includes("portal")) tags.add("portal");
  if (origin.includes("overmind")) tags.add("overmind");
  if (origin.includes("admin")) tags.add("admin");
  if (origin.includes("diagnostics")) tags.add("diagnostics");
  if (origin.includes("skin")) tags.add("skin");
  if (origin.includes("binary")) tags.add("binary");
  if (origin.includes("band")) tags.add("pulseband");

  if (msg.includes("network")) tags.add("network");
  if (msg.includes("timeout")) tags.add("timeout");
  if (msg.includes("fetch")) tags.add("fetch");
  if (msg.includes("chunk")) tags.add("chunk");

  return Array.from(tags);
}

function uieBuildExperienceBlocks(packet, advantage, integrity, severity, tags) {
  return {
    schemaVersion: UIE_SCHEMA_VERSION,
    blocks: [
      {
        id: "ui.error.core",
        kind: "error-core",
        origin: packet.origin,
        name: packet.name,
        messagePreview: (packet.message || "").slice(0, 160),
        route: packet.route || null,
        surface: packet.surface || null,
        band: packet.band || null,
        sessionId: packet.sessionId || null
      },
      {
        id: "ui.error.advantage",
        kind: "advantage",
        msgLen: advantage.msgLen,
        stackLen: advantage.stackLen,
        originLen: advantage.originLen,
        totalSize: advantage.totalSize,
        msgWeight: advantage.msgWeight,
        stackWeight: advantage.stackWeight,
        originWeight: advantage.originWeight,
        density: advantage.density,
        entropyHint: advantage.entropyHint,
        advantage: advantage.advantage
      },
      {
        id: "ui.error.integrity",
        kind: "integrity",
        score: integrity.score,
        status: integrity.status,
        degraded: integrity.degraded
      },
      {
        id: "ui.error.classification",
        kind: "classification",
        severity,
        tags
      }
    ]
  };
}

function uieBuildEnvelopeId(packet, signature) {
  const base = `${packet.origin || "unknown"}:${packet.name || "Error"}:${signature}`;
  const h = uieHashString(base);
  return `UIE-${UIE_SCHEMA_VERSION}-${h.toString(16).padStart(8, "0")}`;
}

// ============================================================================
// UNIVERSAL ERROR SPINE v24
// ============================================================================
export const PulseUIErrors = (() => {
  const spineMeta = Object.freeze({
    layer: "PulseUIErrors",
    role: "universal-error-spine",
    version: "24.0-Immortal-Evo+++",
    schemaVersion: UIE_SCHEMA_VERSION,
    evo: {
      driftSafe: true,
      membraneSafe: true,
      organismWide: true,
      dualBandAware: true,
      binaryAware: true,
      symbolicAware: true,
      uiFlowAware: true,
      skinReflexAware: true,
      evolutionaryPageAware: true,
      cortexAware: true,
      routerAware: true,
      coreMemoryMirrored: true,
      experienceBlocksAware: true,
      unifiedAdvantageField: true,
      portalAware: true,
      overmindAware: true,
      adminPanelAware: true,
      diagnosticsAware: true,
      evidenceAware: true,
      multiMindAware: true,
      pulseBandAware: true,
      sessionAware: true,
      routeAware: true,
      surfaceAware: true,
      severityAware: true,
      tagAware: true,
      correlationAware: true,
      samplingAware: true,
      dedupAware: true
    }
  });

  function readSurfaceContext() {
    try {
      const portal = typeof window !== "undefined" ? window.PulsePortal : null;
      const env = portal?.env || null;
      const meta = portal?.meta || null;

      const route =
        (typeof window !== "undefined" && window.location?.pathname) ||
        meta?.route ||
        null;

      const band =
        (typeof window !== "undefined" && window.PulseBand?.mode) ||
        null;

      const sessionId =
        (typeof window !== "undefined" && window.PulseBand?.sessionId) ||
        null;

      return {
        route,
        surface: meta?.pulseRole?.identity || "unknown-surface",
        band,
        sessionId
      };
    } catch {
      return {
        route: null,
        surface: "unknown-surface",
        band: null,
        sessionId: null
      };
    }
  }

  // --------------------------------------------------------------------------
  // NORMALIZER — convert ANY error into a safe packet + envelope
  // --------------------------------------------------------------------------
  function normalizeError(err, origin = "unknown") {
    const surfaceCtx = readSurfaceContext();

    let packet;
    try {
      packet = {
        origin,
        message: err?.message ?? String(err),
        name: err?.name ?? "Error",
        stack: err?.stack ?? null,
        time: Date.now(),
        meta: spineMeta,
        route: surfaceCtx.route,
        surface: surfaceCtx.surface,
        band: surfaceCtx.band,
        sessionId: surfaceCtx.sessionId
      };
    } catch {
      packet = {
        origin,
        message: "Unknown error",
        name: "Unknown",
        stack: null,
        time: Date.now(),
        meta: spineMeta,
        route: surfaceCtx.route,
        surface: surfaceCtx.surface,
        band: surfaceCtx.band,
        sessionId: surfaceCtx.sessionId
      };
    }

    const advantage = uieComputeAdvantage(packet);
    const integrity = uieComputeIntegrity(packet, advantage);
    const severity = uieInferSeverity(packet);
    const tags = uieInferTags(packet);

    const baseEnvelope = {
      schemaVersion: UIE_SCHEMA_VERSION,
      version: spineMeta.version,
      packet,
      advantage,
      integrity,
      severity,
      tags,
      timestamp: packet.time
    };

    const sigSource = JSON.stringify(baseEnvelope);
    const signature =
      "UIE_SIG_" + uieHashString(sigSource).toString(16).padStart(8, "0");
    const id = uieBuildEnvelopeId(packet, signature);
    const experience = uieBuildExperienceBlocks(
      packet,
      advantage,
      integrity,
      severity,
      tags
    );

    const envelope = {
      ...baseEnvelope,
      id,
      signature,
      experience
    };

    appendUIErrorRecord("normalize", envelope);
    return envelope;
  }

  // --------------------------------------------------------------------------
  // BROADCAST — send normalized error envelope to all safe listeners
  // --------------------------------------------------------------------------
  function broadcast(envelope) {
    if (!uiePassesDedup(envelope)) {
      appendUIErrorRecord("dedup_skipped", envelope);
      return;
    }

    if (!uieShouldSample("broadcast", envelope)) {
      appendUIErrorRecord("sample_skipped", envelope);
      return;
    }

    appendUIErrorRecord("broadcast", envelope);

    const packet = envelope.packet;

    // Window logger
    try {
      window?.PulseLogger?.logError?.(envelope);
    } catch {}

    // EvolutionaryPage
    try {
      window?.PulseEvolutionaryPage?.onError?.(envelope);
    } catch {}

    // UI Flow (v16+ / v20+ / v24+)
    try {
      window?.PulseUIFlowV13?.onError?.(envelope);
    } catch {}
    try {
      window?.PulseUIFlow?.onError?.(envelope);
    } catch {}

    // RouterOrgan
    try {
      window?.PulseRouterOrgan?.onError?.(envelope);
    } catch {}

    // Cortex
    try {
      window?.PulseCortex?.onError?.(envelope);
    } catch {}

    // MemoryOrgan
    try {
      window?.PulseMemoryOrgan?.onError?.(envelope);
    } catch {}

    // BinaryOrgan
    try {
      window?.PulseBinaryOrgan?.onError?.(envelope);
    } catch {}

    // Overmind / Crown layer
    try {
      window?.PulseOvermindPrime?.onError?.(envelope);
    } catch {}

    // Admin diagnostics organ
    try {
      window?.AdminDiagnosticsOrgan?.onError?.(envelope);
    } catch {}

    // PulseWorld Admin Panel
    try {
      window?.PulseWorldAdminPanel?.onError?.(envelope);
    } catch {}

    // Understanding (SDN)
    try {
      window?.Pulse?.SDN?.emitImpulse?.("ErrorSpine", {
        modeKind: "dual",
        executionContext: {
          sceneType: "error",
          workloadClass: "ui-error",
          dispatchSignature: "PulseUIErrors.v24",
          shapeSignature: "error-spine",
          extensionId: "PulseUIErrors"
        },
        errorEnvelope: envelope
      });
    } catch {}

    // Evidence bus (for AI evidence alignment)
    try {
      EvidenceBus?.recordErrorEvidence?.({
        envelope,
        severity: envelope.severity,
        tags: envelope.tags
      });
    } catch {}

    // Binary shadow
    try {
      window?.PulseBinary?.Vitals?.generate?.();
    } catch {}

    // SkinReflex
    try {
      window?.PulseSkinReflex?.onError?.(envelope);
    } catch {}

    // CoreMemory mirror (full envelope)
    try {
      Core?.setRouteSnapshot?.("ui_errors_last", envelope);
    } catch {}
  }

  // --------------------------------------------------------------------------
  // CAPTURE — global listeners
  // --------------------------------------------------------------------------
  function installGlobalHandlers() {
    if (typeof window === "undefined" || !window.addEventListener) return;

    // JS runtime errors
    window.addEventListener("error", (e) => {
      const envelope = normalizeError(e.error || e, "window.error");
      appendUIErrorRecord("window.error", envelope);
      broadcast(envelope);
    });

    // Promise rejections
    window.addEventListener("unhandledrejection", (e) => {
      const envelope = normalizeError(
        e.reason || e,
        "window.unhandledrejection"
      );
      appendUIErrorRecord("window.unhandledrejection", envelope);
      broadcast(envelope);
    });

    // SkinReflex internal errors (if it exposes a handler)
    try {
      window.PulseSkinReflex?.registerErrorHandler?.((err) => {
        const envelope = normalizeError(err, "skin.reflex");
        appendUIErrorRecord("skin.reflex", envelope);
        broadcast(envelope);
      });
    } catch {}

    // Optional: iframe / worker bridges (future hooks, no WorkerGlobalScope)
    try {
      window.addEventListener("message", (evt) => {
        if (!evt?.data || !evt.data.__PulseUIError) return;
        const envelope = normalizeError(
          evt.data.error || evt.data,
          evt.data.origin || "window.message"
        );
        appendUIErrorRecord("window.message", envelope);
        broadcast(envelope);
      });
    } catch {}
  }

  // --------------------------------------------------------------------------
  // INIT
  // --------------------------------------------------------------------------
  function init() {
    try {
      installGlobalHandlers();
    } catch {}
  }

  // Auto-init
  if (typeof window !== "undefined") init();

  return {
    meta: spineMeta,
    normalizeError,
    broadcast,
    init
  };
})();

export default PulseUIErrors;

// ============================================================================
// GLOBAL EXPOSURE OF IMMORTAL STORE + ERROR SPINE v24
// ============================================================================
try {
  if (typeof window !== "undefined") {
    window.PulseUIErrorStore = PulseUIErrorStore;
    window.PulseUIErrors = PulseUIErrors;
  }
  if (typeof globalThis !== "undefined") {
    globalThis.PulseUIErrorStore = PulseUIErrorStore;
    globalThis.PulseUIErrors = PulseUIErrors;
  }
  if (typeof global !== "undefined") {
    global.PulseUIErrorStore = PulseUIErrorStore;
    global.PulseUIErrors = PulseUIErrors;
  }
  if (typeof g !== "undefined") {
    g.PulseUIErrorStore = PulseUIErrorStore;
    g.PulseUIErrors = PulseUIErrors;
  }
} catch {}
