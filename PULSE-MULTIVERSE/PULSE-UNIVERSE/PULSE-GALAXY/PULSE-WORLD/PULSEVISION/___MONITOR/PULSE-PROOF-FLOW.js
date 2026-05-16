// ============================================================================
// FILE: /PulseOS/PULSE-MULTIVERSE/PULSEWORLD/PulseUIFlow-v24-Immortal-Evo++++.js
// PULSE OS — v24‑IMMORTAL‑EVO++++
// “UI FLOW ENGINE / INTENT GLUE / HUMAN‑VISIBLE ORGANISM MAP / EVIDENCE-AWARE”
// Offline‑First • LocalStorage+CoreMemory Mirrored • Replay‑Aware
// Tier/Channel‑Aware • Router‑Checked • Evolutionary‑Page‑Driven
// Evidence‑Aware • Diagnostics‑Aware • Admin‑Console‑Ready
// Vitals‑Aligned • ErrorSpine‑v24‑Aligned • Trust‑Fabric‑Aware
// ============================================================================
import {
  VitalsLogger as PulseProofLogger,
  log,
  warn,
  error,
  comment,
  makeTelemetryPacket as emitTelemetry,
  PulseVersion,
  PulseColors,
  PulseIcons
} from "../___MONITOR/PULSE-PROOF-LOGGER.js";
const UIFLOW_SCHEMA_VERSION = "v5";

// Global handle

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

// ============================================================================
//  IMMORTAL++ BRIDGE RESOLUTION — NEVER IMPORT, NEVER TDZ
// ============================================================================
function getBridge() {
  return window.PulseProofBridge || null;
}

// Lazy getters — ALWAYS call these inside functions, never at top-level
function getRoute() {
  const b = getBridge();
  return b?.route || null;
}

function getCoreMemory() {
  const b = getBridge();
  return b?.coreMemory || null;
}

function getTrust() {
  const b = getBridge();
  return b?.trust || null;
}


// ============================================================================
// IMMORTAL LOCALSTORAGE MIRROR — PulseUIFlowStore v24
// ============================================================================

const UIFLOW_LS_KEY = "PulseUIFlow.v24.buffer";
const UIFLOW_LS_MAX = 4000;

function hasLocalStorage() {
  try {
    if (typeof window === "undefined" || !window.localStorage) return false;
    const t = "__uiflow_v24_test__";
    window.localStorage.setItem(t, "1");
    window.localStorage.removeItem(t);
    return true;
  } catch {
    return false;
  }
}

function loadFlowBuffer() {
  if (!hasLocalStorage()) return [];
  try {
    const raw = window.localStorage.getItem(UIFLOW_LS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
function mirrorFlowBufferToCoreMemory(buf) {
  try {
    const core = getCoreMemory();
    if (!core || typeof core.setRouteSnapshot !== "function") return;

    const envelope = {
      schemaVersion: UIFLOW_SCHEMA_VERSION,
      version: "24.0-Immortal-Evo++++",
      routeId: "uiFlow",
      buffer: buf,
      timestamp: Date.now()
    };

    core.setRouteSnapshot("uiFlow", envelope);
  } catch {
    // best-effort only
  }
}

function saveFlowBuffer(buf) {
  if (!hasLocalStorage()) return;

  try {
    const trimmed =
      buf.length > UIFLOW_LS_MAX ? buf.slice(buf.length - UIFLOW_LS_MAX) : buf;

    window.localStorage.setItem(UIFLOW_LS_KEY, JSON.stringify(trimmed));

    // Mirror to CoreMemory (lazy bridge)
    mirrorFlowBufferToCoreMemory(trimmed);
  } catch {}
}

function appendFlowRecord(kind, payload) {
  const entry = {
    ts: Date.now(),
    kind,
    payload
  };

  const buf = loadFlowBuffer();
  buf.push(entry);
  saveFlowBuffer(buf);
}

export const PulseUIFlowStore = {
  getAll() {
    return loadFlowBuffer();
  },

  tail(n = 200) {
    const buf = loadFlowBuffer();
    return buf.slice(Math.max(0, buf.length - n));
  },

  clear() {
    saveFlowBuffer([]);

    try {
      const core = getCoreMemory();
      core?.setRouteSnapshot?.("uiFlow", {
        schemaVersion: UIFLOW_SCHEMA_VERSION,
        version: "24.0-Immortal-Evo++++",
        routeId: "uiFlow",
        buffer: [],
        cleared: true,
        timestamp: Date.now()
      });
    } catch {}
  }
};

// ============================================================================
// ROLE / META — v24 IMMORTAL FLOW ROLE
// ============================================================================

export const PulseUIFlowRole = {
  type: "UIFlow",
  subsystem: "PulseUIFlow",
  layer: "UI-Flow",
  version: "24.0-Immortal-Evo++++",
  identity: "PulseUIFlow-v24-Immortal-Evo++++",

  evo: {
    driftProof: true,
    deterministicFlow: true,
    minimalState: true,
    binaryAware: true,
    dualBand: true,
    futureEvolutionReady: true,
    diagnosticsAware: true,
    evidenceAware: true,
    adminPanelAware: true,
    trustFabricAware: true,
    vitalsAware: true,
    errorSpineAligned: true
  },

  flow: {
    intentLevel: true,
    routeAware: true,
    errorAware: true,
    identityAware: true,
    organismAware: true,
    diagnosticsLinked: true,
    evidenceLinked: true,
    vitalsLinked: true
  },

  pulseContract: "PulseUIFlow-v5",
  meshContract: "PulseMesh-v24-ready",
  sendContract: "PulseSend-v24-ready"
};

const hasWindow = typeof window !== "undefined";

function safeConsoleLog(...args) {
  if (typeof console !== "undefined" && typeof console.log === "function") {
    console.log(...args);
  }
}

const FLOW_LAYER_ID   = "UI-FLOW";
const FLOW_LAYER_NAME = "PULSE UI FLOW ENGINE";
const FLOW_LAYER_VER  = "24.0-Immortal-Evo++++";

const FLOW_DIAGNOSTICS_ENABLED =
  hasWindow &&
  (window.PULSE_UIFLOW_DIAGNOSTICS === "true" ||
   window.PULSE_DIAGNOSTICS === "true" ||
   window.PULSE_ADMIN_MODE === "true");

function logFlow(stage, details = {}) {
  appendFlowRecord("flow_log", { stage, details });

  if (!FLOW_DIAGNOSTICS_ENABLED) return;
  if (typeof log === "function") {
    log(
      JSON.stringify({
        pulseLayer: FLOW_LAYER_ID,
        pulseName:  FLOW_LAYER_NAME,
        pulseVer:   FLOW_LAYER_VER,
        schemaVersion: UIFLOW_SCHEMA_VERSION,
        stage,
        ...details
      })
    );
  } else {
    safeConsoleLog("[PulseUIFlow-v24]", stage, details);
  }
}

// ============================================================================
// INTENT MAP — v24 (same core, extended lanes/hooks)
// ============================================================================

const UIIntentFlowMap = Object.freeze({
  login: {
    id: "login",
    intent: "login",
    next: ["dashboard"],
    requiresIdentity: false,
    lane: "public"
  },
  dashboard: {
    id: "dashboard",
    intent: "dashboard",
    next: ["settings", "profile", "earn", "scanner", "proxyHealth", "aiEarn", "admin"],
    requiresIdentity: true,
    lane: "core"
  },
  settings: {
    id: "settings",
    intent: "settings",
    next: ["dashboard"],
    requiresIdentity: true,
    lane: "core"
  },
  profile: {
    id: "profile",
    intent: "profile",
    next: ["dashboard"],
    requiresIdentity: true,
    lane: "core"
  },
  earn: {
    id: "earn",
    intent: "earn",
    next: ["dashboard"],
    requiresIdentity: true,
    lane: "earn"
  },
  aiEarn: {
    id: "aiEarn",
    intent: "aiEarn",
    next: ["dashboard"],
    requiresIdentity: true,
    lane: "earn"
  },
  scanner: {
    id: "scanner",
    intent: "scanner",
    next: ["dashboard"],
    requiresIdentity: true,
    lane: "tools"
  },
  proxyHealth: {
    id: "proxyHealth",
    intent: "proxyHealth",
    next: ["dashboard"],
    requiresIdentity: true,
    lane: "tools"
  },
  admin: {
    id: "admin",
    intent: "adminPanel",
    next: ["dashboard"],
    requiresIdentity: true,
    lane: "admin",
    requiresAdmin: true
  },
  error: {
    id: "error",
    intent: "error",
    next: ["dashboard"],
    requiresIdentity: false,
    lane: "error"
  }
});

// ============================================================================
// FLOW STATE — v24 IMMORTAL VISIBILITY
// ============================================================================

const UIFlowState = {
  current: null,
  last: null,
  identityTrusted: false,
  adminTrusted: false,
  sessionId: null,
  lastEvidence: null,
  lastDiagnostics: null,
  lastVitals: null,

  setCurrent(flowId) {
    this.last = this.current;
    this.current = flowId;

    appendFlowRecord("setCurrent", {
      current: this.current,
      last: this.last
    });

    logFlow("FLOW_STATE_UPDATED", {
      current: this.current,
      last: this.last,
      identityTrusted: this.identityTrusted,
      adminTrusted: this.adminTrusted
    });
  },

  setIdentityTrusted(trusted) {
    this.identityTrusted = !!trusted;

    appendFlowRecord("setIdentityTrusted", {
      identityTrusted: this.identityTrusted
    });

    logFlow("FLOW_IDENTITY_UPDATED", {
      identityTrusted: this.identityTrusted
    });
  },

  setAdminTrusted(trusted) {
    this.adminTrusted = !!trusted;

    appendFlowRecord("setAdminTrusted", {
      adminTrusted: this.adminTrusted
    });

    logFlow("FLOW_ADMIN_UPDATED", {
      adminTrusted: this.adminTrusted
    });
  },

  setSessionId(id) {
    this.sessionId = id || null;
    appendFlowRecord("setSessionId", { sessionId: this.sessionId });
  },

  setEvidenceSummary(evidence) {
    this.lastEvidence = evidence || null;
    appendFlowRecord("setEvidenceSummary", { evidence: this.lastEvidence });
  },

  setDiagnosticsSummary(diag) {
    this.lastDiagnostics = diag || null;
    appendFlowRecord("setDiagnosticsSummary", { diagnostics: this.lastDiagnostics });
  },

  setVitalsSnapshot(vitals) {
    this.lastVitals = vitals || null;
    appendFlowRecord("setVitalsSnapshot", { vitals: this.lastVitals });
  },

  snapshot() {
    return {
      schemaVersion: UIFLOW_SCHEMA_VERSION,
      current: this.current,
      last: this.last,
      identityTrusted: this.identityTrusted,
      adminTrusted: this.adminTrusted,
      sessionId: this.sessionId,
      lastEvidence: this.lastEvidence,
      lastDiagnostics: this.lastDiagnostics,
      lastVitals: this.lastVitals
    };
  }
};

// ============================================================================
// HELPERS
// ============================================================================

function resolveFlowByIntent(intentId) {
  return UIIntentFlowMap[intentId] || null;
}

function getEvolutionaryPage() {
  if (!hasWindow) return null;
  return window.PulseEvolutionaryPage || null;
}

function getAdminDiagnosticsModel() {
  if (!hasWindow) return null;
  return window.PulseAdminDiagnosticsModel || null;
}

function getEvidenceSummary() {
  if (!hasWindow) return null;
  return window.PulseEvidenceSummary || null;
}

function getVitalsSnapshot() {
  if (!hasWindow) return null;
  const store = window.PulseVitalsStore || window.PulseVitalsStore || null;
  try {
    return store ? store.tail(64) : null;
  } catch {
    return null;
  }
}

async function evolveToIntent(flowDef, extraPayload = {}) {
  const EvoPage = getEvolutionaryPage();
  if (!EvoPage || typeof EvoPage.evolve !== "function") {
    appendFlowRecord("evolve_missing_page", { flowId: flowDef.id });
    logFlow("EVOLVE_MISSING_EVOLUTIONARY_PAGE", { flowId: flowDef.id });
    return { ok: false, reason: "NO_EVOLUTIONARY_PAGE" };
  }

  appendFlowRecord("evolve_intent", {
    flowId: flowDef.id,
    intent: flowDef.intent,
    extraPayload
  });

  logFlow("EVOLVE_INTENT", {
    flowId: flowDef.id,
    intent: flowDef.intent
  });

  await EvoPage.evolve({
    intent: flowDef.intent,
    lane: flowDef.lane,
    ...extraPayload
  });

  return { ok: true };
}

function mirrorStateToCoreMemory() {
  try {
    const core = getCoreMemory();
    if (!core || typeof core.setRouteSnapshot !== "function") return;

    core.setRouteSnapshot("uiFlowState", {
      schemaVersion: UIFLOW_SCHEMA_VERSION,
      version: "24.0-Immortal-Evo++++",
      routeId: "uiFlowState",
      state: UIFlowState.snapshot(),
      timestamp: Date.now()
    });
  } catch {
    // best-effort
  }
}


function buildDiagnosticsEnvelope() {
  const state = UIFlowState.snapshot();
  const diagModel = getAdminDiagnosticsModel();
  const evidence = getEvidenceSummary();
  const vitals = getVitalsSnapshot();

  const envelope = {
    schemaVersion: UIFLOW_SCHEMA_VERSION,
    version: "24.0-Immortal-Evo++++",
    layer: FLOW_LAYER_ID,
    role: FLOW_LAYER_NAME,
    state,
    diagnostics: diagModel || null,
    evidence: evidence || null,
    vitals: vitals || null,
    ts: Date.now()
  };

  appendFlowRecord("diagnostics_envelope", envelope);

  try {
    const core = getCoreMemory();
    core?.setRouteSnapshot?.("uiFlowDiagnostics", envelope);
  } catch {}

  return envelope;
}


// ============================================================================
// PUBLIC API — IMMORTAL UI FLOW ENGINE v24
// ============================================================================

export async function initUIFlow() {
  appendFlowRecord("init_start", {});
  logFlow("INIT_V24_START", {});

  if (!hasWindow) {
    appendFlowRecord("init_no_window", {});
    logFlow("INIT_V24_SKIPPED_NO_WINDOW", {});
    return null;
  }

  let identityTrusted = false;
  let identityContext = null;
  let adminTrusted = false;
  let sessionId = null;

  try {
    const route = getRoute();
    if (typeof route === "function") {
      identityContext = await route("identity.check", {
        reflexOrigin: "UIFlow-v24",
        layer: "UI-Flow",
        binaryAware: true,
        dualBand: true
      });

      identityTrusted = !!identityContext?.trustedDevice;
      adminTrusted = !!identityContext?.isOwner || !!identityContext?.isAdmin;
      sessionId = identityContext?.sessionId || null;

      appendFlowRecord("identity_check", {
        identityTrusted,
        adminTrusted,
        identityContext
      });
    } else {
      appendFlowRecord("identity_check_skipped_no_route", {});
      logFlow("IDENTITY_CHECK_SKIPPED_NO_ROUTE", {});
    }
  } catch (err) {
    appendFlowRecord("identity_check_error", { error: String(err) });
    logFlow("IDENTITY_CHECK_FAILED", { error: String(err) });
  }

  UIFlowState.setIdentityTrusted(identityTrusted);
  UIFlowState.setAdminTrusted(adminTrusted);
  UIFlowState.setSessionId(sessionId);

  // Evidence + diagnostics + vitals snapshots (if present)
  try {
    const diagModel = getAdminDiagnosticsModel();
    if (diagModel) {
      UIFlowState.setDiagnosticsSummary({
        pressure: diagModel.artery?.organism?.pressure || 0,
        issues: diagModel.issueList?.length || 0
      });
    }

    const evidence = getEvidenceSummary();
    if (evidence) {
      UIFlowState.setEvidenceSummary({
        match: evidence.match || 0,
        mismatch: evidence.mismatch || 0,
        omission: evidence.omission || 0,
        drift: evidence.drift || 0
      });
    }

    const vitals = getVitalsSnapshot();
    if (vitals) {
      UIFlowState.setVitalsSnapshot({
        count: vitals.length,
        lastTs: vitals[vitals.length - 1]?.ts || null
      });
    }
  } catch {}

  const initialFlow = identityTrusted
    ? UIIntentFlowMap.dashboard
    : UIIntentFlowMap.login;

  UIFlowState.setCurrent(initialFlow.id);

  await evolveToIntent(initialFlow, {
    mode: identityTrusted ? "inside" : "outside",
    admin: adminTrusted ? "owner" : "user"
  });

  appendFlowRecord("init_complete", {
    flowId: initialFlow.id,
    identityTrusted,
    adminTrusted,
    sessionId
  });

  logFlow("INIT_V24_COMPLETE", {
    flowId: initialFlow.id,
    identityTrusted,
    adminTrusted
  });

  mirrorStateToCoreMemory();
  buildDiagnosticsEnvelope();

  return {
    flow: initialFlow,
    identityTrusted,
    adminTrusted,
    identityContext,
    sessionId
  };
}


export async function goToFlowIntent(flowId, options = {}) {
  appendFlowRecord("goToFlowIntent_in", { flowId, options });

  const currentId = UIFlowState.current;
  const currentFlow = UIIntentFlowMap[currentId] || null;
  const targetFlow = UIIntentFlowMap[flowId] || null;

  if (!targetFlow) {
    appendFlowRecord("unknown_target", { flowId });
    logFlow("FLOW_UNKNOWN_TARGET_INTENT", { flowId });
    return { ok: false, reason: "UNKNOWN_TARGET" };
  }

  if (currentFlow && !currentFlow.next.includes(flowId)) {
    appendFlowRecord("illegal_transition", {
      from: currentFlow.id,
      to: targetFlow.id
    });
    logFlow("FLOW_ILLEGAL_TRANSITION_INTENT", {
      from: currentFlow.id,
      to: targetFlow.id
    });
    return { ok: false, reason: "ILLEGAL_TRANSITION" };
  }

  if (targetFlow.requiresIdentity && !UIFlowState.identityTrusted) {
    appendFlowRecord("identity_block", {
      flowId: targetFlow.id,
      identityTrusted: UIFlowState.identityTrusted
    });

    logFlow("FLOW_IDENTITY_BLOCK_INTENT", {
      flowId: targetFlow.id,
      intent: targetFlow.intent,
      identityTrusted: UIFlowState.identityTrusted
    });

    const loginFlow = UIIntentFlowMap.login;
    UIFlowState.setCurrent(loginFlow.id);
    await evolveToIntent(loginFlow, { mode: "outside" });

    mirrorStateToCoreMemory();
    buildDiagnosticsEnvelope();

    return { ok: false, reason: "IDENTITY_REQUIRED_REDIRECT_LOGIN" };
  }

  if (targetFlow.requiresAdmin && !UIFlowState.adminTrusted) {
    appendFlowRecord("admin_block", {
      flowId: targetFlow.id,
      adminTrusted: UIFlowState.adminTrusted
    });

    logFlow("FLOW_ADMIN_BLOCK_INTENT", {
      flowId: targetFlow.id,
      intent: targetFlow.intent,
      adminTrusted: UIFlowState.adminTrusted
    });

    return { ok: false, reason: "ADMIN_REQUIRED" };
  }

  let allowed = true;
  try {
    const route = getRoute();
    if (typeof route === "function") {
      const result = await route("uiFlowIntentCheck", {
        from: currentFlow ? currentFlow.id : null,
        to: targetFlow.id,
        reflexOrigin: "UIFlow-v24",
        layer: "UI-Flow",
        binaryAware: true,
        dualBand: true,
        sessionId: UIFlowState.sessionId
      });

      appendFlowRecord("router_check", { result });

      if (result && result.allowed === false) {
        allowed = false;
        logFlow("FLOW_ROUTER_BLOCKED_INTENT", {
          from: currentFlow ? currentFlow.id : null,
          to: targetFlow.id
        });
      }
    } else {
      appendFlowRecord("router_check_skipped_no_route", {});
      logFlow("FLOW_ROUTER_CHECK_SKIPPED_NO_ROUTE", {});
    }
  } catch (err) {
    appendFlowRecord("router_check_error", { error: String(err) });
    logFlow("FLOW_ROUTER_CHECK_FAILED_INTENT", { error: String(err) });
  }

  if (!allowed) {
    appendFlowRecord("router_blocked", {});
    return { ok: false, reason: "ROUTER_BLOCKED" };
  }

  UIFlowState.setCurrent(targetFlow.id);
  await evolveToIntent(targetFlow, options.payload || {});

  appendFlowRecord("goToFlowIntent_out", {
    from: currentFlow ? currentFlow.id : null,
    to: targetFlow.id
  });

  mirrorStateToCoreMemory();
  const diagEnvelope = buildDiagnosticsEnvelope();

  // Optional: trust fabric hook
  try {
    const trust = getTrust();
    trust?.recordEvent?.("uiFlowTransition", {
      from: currentFlow ? currentFlow.id : null,
      to: targetFlow.id,
      diagnostics: diagEnvelope
    });
  } catch {}

  return {
    ok: true,
    from: currentFlow ? currentFlow.id : null,
    to: targetFlow.id
  };
}


export function getUIFlowSnapshot() {
  const snap = {
    ...UIFlowState.snapshot(),
    map: UIIntentFlowMap
  };

  appendFlowRecord("snapshot", snap);
  return snap;
}

export function bindUIFlowIntentControls(root = null) {
  if (!hasWindow || !document) return;

  const scope = root || document;
  const nodes = scope.querySelectorAll("[data-pulse-intent-target]");

  nodes.forEach((node) => {
    const target = node.getAttribute("data-pulse-intent-target");
    if (!target) return;

    node.addEventListener("click", async (e) => {
      e.preventDefault();
      await goToFlowIntent(target);
    });
  });

  appendFlowRecord("bind_controls", { count: nodes.length });

  logFlow("FLOW_INTENT_CONTROLS_BOUND", {
    count: nodes.length
  });
}

// ============================================================================
// DEFAULT EXPORT
// ============================================================================

const PulseUIFlowAPI = {
  PulseUIFlowRole,
  initUIFlow,
  goToFlowIntent,
  getUIFlowSnapshot,
  bindUIFlowIntentControls,
  store: PulseUIFlowStore
};

export default PulseUIFlowAPI;

// ============================================================================
// GLOBAL EXPOSURE OF IMMORTAL STORE + FLOW ENGINE (v24 + back-compat)
// ============================================================================

try {
  if (typeof window !== "undefined") {
    // v24 primary
    window.PulseUIFlow = initUIFlow;
    window.PulseUIFlowStore = PulseUIFlowStore;
    window.PulseUIFlowV24 = {
      onError: (packet) => {
        appendFlowRecord("error_spine_packet_v24", packet);
        logFlow("ERROR_SPINE_PACKET_V24", { signature: packet.signature });
      }
    };

    // back-compat aliases
    window.PulseUIFlowV20 = window.PulseUIFlowV20 || {
      onError: (packet) => {
        appendFlowRecord("error_spine_packet_v20_alias", packet);
        logFlow("ERROR_SPINE_PACKET_V20_ALIAS", { signature: packet.signature });
      }
    };
    window.PulseUIFlowV16 = window.PulseUIFlowV16 || {
      onError: (packet) => {
        appendFlowRecord("error_spine_packet_legacy", packet);
        logFlow("ERROR_SPINE_PACKET_V16_ALIAS", { signature: packet.signature });
      }
    };
  }
  if (typeof globalThis !== "undefined") {
    window.PulseUIFlow = initUIFlow;
    window.PulseUIFlowStore = PulseUIFlowStore;
  }
  if (typeof global !== "undefined") {
    window.PulseUIFlow = initUIFlow;
    window.PulseUIFlowStore = PulseUIFlowStore;
  }
  if (typeof g !== "undefined") {
    g.PulseUIFlow = initUIFlow;
    g.PulseUIFlowStore = PulseUIFlowStore;
  }
} catch {}
