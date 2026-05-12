/*
===============================================================================
FILE: /PULSE-UI/PulsePageScanner-v24.js
LAYER: A2 DRIFT INTELLIGENCE • v24-IMMORTAL++
===============================================================================

EXPORT_META = {
  organ: "PulseUI.PageScanner",
  layer: "pulse_ui",
  stability: "IMMORTAL",
  deterministic: true,
  pure: true,

  consumes: [
    "SourceA",
    "SourceB",
    "Context"
  ],

  produces: [
    "DriftPacket",
    "StructuralDrift",
    "LineageDrift",
    "ModuleModeDrift",
    "ExportDrift",
    "ContractDrift",
    "PathDrift"
  ],

  sideEffects: "localstorage_and_corememory_write_only",
  network: "none",
  filesystem: "none"
}
*/

import PulseUIErrors from "../_MONITOR/PULSE-PROOF-ERRORS.js"; // keep only if you actually call it

// ============================================================================
//  IMMORTAL++: NO DIRECT BRIDGE IMPORT — ALWAYS USE GLOBAL BRIDGE
// ============================================================================

const PAGESCANNER_SCHEMA_VERSION = "24.0";

const PAGESCANNER_VERSION = "24.0-IMMORTAL++";
const PAGESCANNER_ROUTE_ID = "pageScanner";

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
  try {
    return g.PulseProofBridge || null;
  } catch {
    return null;
  }
}

function getCoreMemory() {
  const b = getBridge();
  return b?.coreMemory || null;
}

function getDiagnosticsBus() {
  const b = getBridge();
  return b?.diagnosticsBus || null;
}

function getEvidenceBus() {
  const b = getBridge();
  return b?.evidenceBus || null;
}

// ============================================================================
// IMMORTAL LOCALSTORAGE MIRROR — PulsePageScannerStore
// ============================================================================

const PAGESCANNER_LS_KEY = "PulsePageScanner.v24.buffer";
const PAGESCANNER_LS_MAX = 4000;

function psHasLocalStorage() {
  try {
    if (typeof window === "undefined" || !window.localStorage) return false;
    const t = "__pagescanner_test__";
    window.localStorage.setItem(t, "1");
    window.localStorage.removeItem(t);
    return true;
  } catch {
    return false;
  }
}

function psLoadBuffer() {
  if (!psHasLocalStorage()) return [];
  try {
    const raw = window.localStorage.getItem(PAGESCANNER_LS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function psMirrorBufferToCoreMemory(buf) {
  try {
    const core = getCoreMemory();
    if (!core || typeof core.setRouteSnapshot !== "function") return;

    const envelope = {
      schemaVersion: PAGESCANNER_SCHEMA_VERSION,
      version: PAGESCANNER_VERSION,
      routeId: PAGESCANNER_ROUTE_ID,
      buffer: buf,
      timestamp: Date.now()
    };

    core.setRouteSnapshot(PAGESCANNER_ROUTE_ID, envelope);
  } catch {
    // best-effort only
  }
}

function psSaveBuffer(buf) {
  if (!psHasLocalStorage()) return;

  try {
    const trimmed =
      buf.length > PAGESCANNER_LS_MAX
        ? buf.slice(buf.length - PAGESCANNER_LS_MAX)
        : buf;

    window.localStorage.setItem(PAGESCANNER_LS_KEY, JSON.stringify(trimmed));

    // IMMORTAL++: lazy bridge mirror
    psMirrorBufferToCoreMemory(trimmed);
  } catch {}
}

function appendPageScannerRecord(kind, payload) {
  const entry = {
    ts: Date.now(),
    schemaVersion: PAGESCANNER_SCHEMA_VERSION,
    kind,
    payload
  };

  const buf = psLoadBuffer();
  buf.push(entry);
  psSaveBuffer(buf);

  // Diagnostics bus mirror
  try {
    getDiagnosticsBus()?.emit?.("PageScanner.record", entry);
  } catch {}

  // Evidence bus mirror (low-entropy drift intel)
  try {
    getEvidenceBus()?.emit?.("PageScanner.trace", {
      kind,
      ts: entry.ts,
      schemaVersion: PAGESCANNER_SCHEMA_VERSION
    });
  } catch {}
}

export const PulsePageScannerStore = {
  getAll() {
    return psLoadBuffer();
  },

  tail(n = 200) {
    const buf = psLoadBuffer();
    return buf.slice(Math.max(0, buf.length - n));
  },

  clear() {
    psSaveBuffer([]);

    try {
      const core = getCoreMemory();
      core?.setRouteSnapshot?.(PAGESCANNER_ROUTE_ID, {
        schemaVersion: PAGESCANNER_SCHEMA_VERSION,
        version: PAGESCANNER_VERSION,
        routeId: PAGESCANNER_ROUTE_ID,
        buffer: [],
        cleared: true,
        timestamp: Date.now()
      });
    } catch {}
  }
};

// ============================================================================
// ROLE
// ============================================================================

export const PageScannerRole = {
  type: "Organ",
  subsystem: "UI",
  layer: "PageScanner",
  version: PAGESCANNER_VERSION,
  identity: "PulsePageScanner-v24",

  evo: {
    driftProof: true,
    deterministic: true,
    dualBand: true,
    binaryAware: true,
    symbolicAware: true,
    structuralEngine: true,
    lineageEngine: true,
    moduleEngine: true,
    exportEngine: true,
    contractEngine: true,
    pathEngine: true,
    futureEvolutionReady: true,
    evidenceAware: true,
    diagnosticsAware: true,
    adminPanelAware: true,
    portalAware: true,
    touchAware: true,
    uiFlowAware: true,
    errorSpineAware: true,
    coreMemoryMirrored: true,
    overmindAware: true,
    governorAware: true,
    timeAxisAware: true,
    sessionAware: true,
    multiMindAware: true
  }
};

// ============================================================================
// DRIFT TIERS + CHANNELS
// ============================================================================

const DriftTiers = Object.freeze({
  none: "none",
  low: "low",
  medium: "medium",
  high: "high",
  critical: "critical",
  immortal: "immortal"
});

const DriftChannels = Object.freeze({
  ui: "ui",
  system: "system",
  evolution: "evolution",
  memory: "memory",
  devtools: "devtools",
  earn: "earn",
  admin: "admin",
  portal: "portal",
  touch: "touch",
  ai: "ai"
});

// ============================================================================
// INTERNAL: deterministic signature generator
// ============================================================================

function deterministicSignature(obj) {
  const json = JSON.stringify(obj || {});
  let hash = 0;
  for (let i = 0; i < json.length; i++) {
    hash = (hash * 31 + json.charCodeAt(i)) >>> 0;
  }
  return "PSIG_" + hash.toString(16).padStart(8, "0");
}

function safeNormalizeError(err, origin) {
  try {
    const packet = PulseUIErrors.normalizeError(err, origin);
    appendPageScannerRecord("error", { origin, packet });
    PulseUIErrors.broadcast(packet);
  } catch {}
}

// ---------------------------------------------------------------------------
// Extract variable names from JS source
// ---------------------------------------------------------------------------

function extractVars(source = "") {
  appendPageScannerRecord("extractVars_in", { sourceLength: source.length });
  try {
    const vars = [...source.matchAll(/(?:const|let|var)\s+([A-Za-z0-9_]+)/g)].map(
      (m) => m[1]
    );
    appendPageScannerRecord("extractVars_out", { vars });
    return vars;
  } catch (err) {
    safeNormalizeError(err, "pagescanner.extractVars");
    return [];
  }
}

// ---------------------------------------------------------------------------
// Normalize names (strip suffixes, digits, casing)
// ---------------------------------------------------------------------------

function normalizeName(name = "") {
  appendPageScannerRecord("normalizeName_in", { name });
  try {
    const out = name
      .replace(/[\d_]+$/, "")
      .replace(/(Field|State|Mode|Organ|Organism)$/i, "")
      .toLowerCase();
    appendPageScannerRecord("normalizeName_out", { out });
    return out;
  } catch (err) {
    safeNormalizeError(err, "pagescanner.normalize");
    return "";
  }
}

// ---------------------------------------------------------------------------
// Detect lineage drift between two sets of variables
// ---------------------------------------------------------------------------

function detectLineage(varsA = [], varsB = []) {
  appendPageScannerRecord("detectLineage_in", { varsA, varsB });
  try {
    const splits = [];

    for (const a of varsA) {
      const normA = normalizeName(a);

      for (const b of varsB) {
        const normB = normalizeName(b);

        if (normA === normB && a !== b) {
          splits.push({ canonical: a, drifted: b });
        }
      }
    }

    appendPageScannerRecord("detectLineage_out", { splits });
    return splits;
  } catch (err) {
    safeNormalizeError(err, "pagescanner.detectLineage");
    return [];
  }
}

// ---------------------------------------------------------------------------
// Detect and rewrite illegal admin imports (frontend-safe)
// ---------------------------------------------------------------------------

function rewriteIllegalImports(source = "") {
  appendPageScannerRecord("rewriteIllegalImports_in", {
    sourceLength: source.length
  });
  try {
    let rewritten = false;
    let out = source;

    if (out.includes("firebase-admin")) {
      out = out.replace(/firebase-admin/g, "firebase/functions");
      rewritten = true;
    }

    if (out.includes("@google-cloud/")) {
      out = out.replace(/@google-cloud\//g, "@google-cloud/browser/");
      rewritten = true;
    }

    appendPageScannerRecord("rewriteIllegalImports_out", {
      rewritten
    });
    return out;
  } catch (err) {
    safeNormalizeError(err, "pagescanner.rewriteIllegalImports");
    return source;
  }
}

// ---------------------------------------------------------------------------
// Detect module mode drift (ESM vs CJS)
// ---------------------------------------------------------------------------

function detectModuleMode(source = "") {
  appendPageScannerRecord("detectModuleMode_in", {
    sourceLength: source.length
  });
  try {
    const esm = /import\s+.*from\s+['"]/.test(source);
    const cjs = /require\s*\(/.test(source);

    const out = Object.freeze({
      esm,
      cjs,
      mixed: esm && cjs
    });

    appendPageScannerRecord("detectModuleMode_out", out);
    return out;
  } catch (err) {
    safeNormalizeError(err, "pagescanner.detectModuleMode");
    const out = Object.freeze({ esm: false, cjs: false, mixed: false });
    appendPageScannerRecord("detectModuleMode_out_error", out);
    return out;
  }
}

// ---------------------------------------------------------------------------
// Detect export drift (ESM/CJS)
// ---------------------------------------------------------------------------

function detectExportDrift(source = "", vars = []) {
  appendPageScannerRecord("detectExportDrift_in", {
    sourceLength: source.length,
    vars
  });
  try {
    const hasESM = /export\s+/.test(source);
    const hasCJS = /module\.exports/.test(source);

    const out = Object.freeze({
      missingESM: !hasESM,
      missingCJS: !hasCJS,
      vars
    });

    appendPageScannerRecord("detectExportDrift_out", out);
    return out;
  } catch (err) {
    safeNormalizeError(err, "pagescanner.detectExportDrift");
    const out = Object.freeze({
      missingESM: false,
      missingCJS: false,
      vars
    });
    appendPageScannerRecord("detectExportDrift_out_error", out);
    return out;
  }
}

// ---------------------------------------------------------------------------
// Detect structural drift (shape + field mismatches)
// ---------------------------------------------------------------------------

function detectStructural(sourceA = "", sourceB = "") {
  appendPageScannerRecord("detectStructural_in", {
    sourceALength: sourceA.length,
    sourceBLength: sourceB.length
  });
  try {
    const extractShape = (src) => {
      const matches = [...src.matchAll(/return\s+{([^}]+)}/gs)];
      return matches.map((m) => {
        return m[1]
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
          .map((field) => {
            const [key] = field.split(":").map((x) => x.trim());
            return key;
          });
      });
    };

    const shapeA = extractShape(sourceA);
    const shapeB = extractShape(sourceB);

    const flatA = shapeA.flat();
    const flatB = shapeB.flat();

    const missingInB = flatA.filter((f) => !flatB.includes(f));
    const missingInA = flatB.filter((f) => !flatA.includes(f));

    const substructureMismatch =
      JSON.stringify(shapeA) !== JSON.stringify(shapeB);

    const severity =
      missingInA.length +
      missingInB.length +
      Math.abs(flatA.length - flatB.length) +
      (substructureMismatch ? 1 : 0);

    const out = Object.freeze({
      shapeA,
      shapeB,
      missingInA,
      missingInB,
      substructureMismatch,
      severity,
      mismatch: severity > 0
    });

    appendPageScannerRecord("detectStructural_out", out);
    return out;
  } catch (err) {
    safeNormalizeError(err, "pagescanner.detectStructural");
    const out = Object.freeze({
      shapeA: [],
      shapeB: [],
      missingInA: [],
      missingInB: [],
      substructureMismatch: false,
      severity: 0,
      mismatch: false
    });
    appendPageScannerRecord("detectStructural_out_error", out);
    return out;
  }
}

// ---------------------------------------------------------------------------
// Detect contract drift (function signature mismatches)
// ---------------------------------------------------------------------------

function detectContract(sourceA = "", sourceB = "") {
  appendPageScannerRecord("detectContract_in", {
    sourceALength: sourceA.length,
    sourceBLength: sourceB.length
  });
  try {
    const sigA = [...sourceA.matchAll(/function\s+([A-Za-z0-9_]+)\(([^)]*)\)/g)].map(
      (m) => ({
        name: m[1],
        params: m[2].split(",").map((s) => s.trim()).filter(Boolean)
      })
    );

    const sigB = [...sourceB.matchAll(/function\s+([A-Za-z0-9_]+)\(([^)]*)\)/g)].map(
      (m) => ({
        name: m[1],
        params: m[2].split(",").map((s) => s.trim()).filter(Boolean)
      })
    );

    const out = Object.freeze({
      sigA,
      sigB,
      mismatch: JSON.stringify(sigA) !== JSON.stringify(sigB)
    });

    appendPageScannerRecord("detectContract_out", out);
    return out;
  } catch (err) {
    safeNormalizeError(err, "pagescanner.detectContract");
    const out = Object.freeze({
      sigA: [],
      sigB: [],
      mismatch: false
    });
    appendPageScannerRecord("detectContract_out_error", out);
    return out;
  }
}

// ---------------------------------------------------------------------------
// Detect path drift (file moved or renamed)
// ---------------------------------------------------------------------------

function detectPathDrift(importLine = "") {
  appendPageScannerRecord("detectPathDrift_in", { importLine });
  try {
    const match = importLine.match(/from\s+['"](.+?)['"]/);
    if (!match) {
      appendPageScannerRecord("detectPathDrift_out", { result: null });
      return null;
    }

    const path = match[1];
    const exists = false; // cannot check filesystem in browser

    const out = Object.freeze({
      path,
      exists,
      drift: !exists
    });

    appendPageScannerRecord("detectPathDrift_out", out);
    return out;
  } catch (err) {
    safeNormalizeError(err, "pagescanner.detectPathDrift");
    appendPageScannerRecord("detectPathDrift_out_error", { error: true });
    return null;
  }
}

// ---------------------------------------------------------------------------
// INTERNAL: map severity → drift tier
// ---------------------------------------------------------------------------

function mapSeverityToTier(severity) {
  if (severity <= 0) return DriftTiers.none;
  if (severity === 1) return DriftTiers.low;
  if (severity === 2) return DriftTiers.medium;
  if (severity <= 4) return DriftTiers.high;
  if (severity <= 8) return DriftTiers.critical;
  return DriftTiers.immortal;
}

// ---------------------------------------------------------------------------
// Build drift intelligence packet (adapter-ready)
// ---------------------------------------------------------------------------

function buildDriftPacket(context = {}) {
  appendPageScannerRecord("buildDriftPacket_in", { context });

  try {
    const structural = context.structural || {};
    const severity =
      typeof structural.severity === "number" ? structural.severity : 0;

    const tooFar = severity >= 3;
    const tier = mapSeverityToTier(severity);
    const channel = context.channel || DriftChannels.devtools;
    const modeKind = context.binarySource ? "dual" : "symbolic";

    const base = {
      schemaVersion: PAGESCANNER_SCHEMA_VERSION,
      role: PageScannerRole.identity,
      version: PageScannerRole.version,
      type: "pagescanner-drift-intel",
      timestamp: Date.now(),
      severity,
      tooFar,
      tier,
      channel,
      modeKind,
      structural: {
        shapeA: structural.shapeA || [],
        shapeB: structural.shapeB || [],
        missingInA: structural.missingInA || [],
        missingInB: structural.missingInB || [],
        substructureMismatch: !!structural.substructureMismatch
      },
      lineage: context.lineage || null,
      moduleMode: context.moduleMode || null,
      exportDrift: context.exportDrift || null,
      contract: context.contract || null,
      path: context.path || null,
      sourceMeta: context.sourceMeta || null
    };

    const signature = deterministicSignature(base);
    const out = Object.freeze({
      ...base,
      signature
    });

    appendPageScannerRecord("buildDriftPacket_out", out);

    try {
      getDiagnosticsBus()?.emit?.("PageScanner.driftPacket", out);
    } catch {}

    try {
      getEvidenceBus()?.emit?.("PageScanner.driftEvidence", {
        signature,
        tier,
        channel,
        severity,
        timestamp: base.timestamp
      });
    } catch {}

    return out;
  } catch (err) {
    safeNormalizeError(err, "pagescanner.buildDriftPacket");

    const base = {
      schemaVersion: PAGESCANNER_SCHEMA_VERSION,
      role: PageScannerRole.identity,
      version: PageScannerRole.version,
      type: "pagescanner-drift-intel",
      timestamp: Date.now(),
      error: true
    };

    const out = Object.freeze({
      ...base,
      signature: deterministicSignature(base)
    });

    appendPageScannerRecord("buildDriftPacket_out_error", out);
    return out;
  }
}

// ---------------------------------------------------------------------------
// PUBLIC ORGAN
// ---------------------------------------------------------------------------

export const PulsePageScanner = Object.freeze({
  PageScannerRole,

  extractVars,
  normalize: normalizeName,
  detectLineage,
  rewriteIllegalImports,
  detectModuleMode,
  detectExportDrift,
  detectStructural,
  detectContract,
  detectPathDrift,
  buildDriftPacket,

  DriftTiers,
  DriftChannels,
  schemaVersion: PAGESCANNER_SCHEMA_VERSION
});

export default PulsePageScanner;

// ============================================================================
// GLOBAL EXPOSURE OF IMMORTAL STORE
// ============================================================================

try {
  if (typeof window !== "undefined") {
    window.PulsePageScanner = PulsePageScanner;
    window.PulsePageScannerStore = PulsePageScannerStore;
  }
  if (typeof globalThis !== "undefined") {
    globalThis.PulsePageScanner = PulsePageScanner;
    globalThis.PulsePageScannerStore = PulsePageScannerStore;
  }
  if (typeof global !== "undefined") {
    global.PulsePageScanner = PulsePageScanner;
    global.PulsePageScannerStore = PulsePageScannerStore;
  }
  if (typeof g !== "undefined") {
    g.PulsePageScanner = PulsePageScanner;
    g.PulsePageScannerStore = PulsePageScannerStore;
  }
} catch {}
