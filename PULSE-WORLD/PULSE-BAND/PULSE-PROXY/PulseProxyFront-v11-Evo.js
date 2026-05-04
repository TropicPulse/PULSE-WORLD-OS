// ============================================================================
//  PulseProxyFront-v14-Immortal-PROXY-FRONT.js
//  Binary-First Proxy Front • Legacy Fallback • Earned Route Memory
//  v14-Immortal: CoreMemory-integrated, immortal route memory, deterministic surfaces
//  Connects Proxy → Field (binary descriptor) OR Proxy → Legacy Router (symbolic)
// ============================================================================
//
//  ROLE (v14-Immortal-PROXY-FRONT):
//  --------------------------------
//  • Binary-first route planner at the proxy front.
//  • Treats binary as a DATA SURFACE ONLY (non-executable).
//  • Falls back to legacy symbolic router when bits are not pure binary.
//  • Uses earned route memory (previousRouteMemory + CoreMemory) deterministically.
//  • Emits band + dnaTag + A‑B‑A surfaces so CNS/Brain can classify routes.
//  • Immortal route memory via PulseCoreMemory (organ-local + global).
//
//  SAFETY CONTRACT (v14-Immortal):
//  -------------------------------
//  • Single import: PulseCoreMemory (immortal, in-process only).
//  • No randomness.
//  • No timestamps.
//  • Pure deterministic logic.
//  • Zero mutation outside instance (except CoreMemory writes).
//  • Binary is NEVER executed, only described (phenotype/surface fields).
// ============================================================================

// v14-Immortal upgrade: CoreMemory integration
import { PulseCoreMemory } from "./PulseCoreMemory.js";

export const PulseProxyFrontMeta = Object.freeze({
  layer: "PulseProxyFront",
  role: "BINARY_FIRST_PROXY_FRONT",
  version: "v14-Immortal-PROXY-FRONT",
  identity: "PulseProxyFront-v14-Immortal-PROXY-FRONT",

  guarantees: Object.freeze({
    deterministic: true,
    driftProof: true,
    multiInstanceReady: true,

    // Proxy‑front laws
    binaryFirst: true,
    symbolicFallback: true,
    binaryAsDataOnly: true,
    routePlanner: true,
    earnedRouteMemory: true,
    bandSignatureEmitter: true,
    dnaTagEmitter: true,
    binaryPhenotypeEmitter: true,
    binarySurfaceEmitter: true,

    // Advantage / A‑B‑A awareness (pulled from organism)
    unifiedAdvantageField: true,
    pulseEfficiencyAware: true,
    advantageCascadeAware: true,
    meshPulseReady: true,
    bandAware: true,
    waveFieldAware: true,
    binaryFieldAware: true,
    dualBandAware: true,
    dualMode: true,
    localAware: true,
    internetAware: true,
    abaBandAware: true,

    // CoreMemory / immortal memory
    coreMemoryIntegrated: true,
    immortalRouteMemory: true,
    coreMemoryDeterministicKeys: true,

    // Execution prohibitions (v14: imports allowed only for CoreMemory)
    zeroRandomness: true,
    zeroTimestamps: true,
    zeroDateNow: true,
    zeroTimers: true,
    zeroAsync: true,
    zeroNetwork: true,
    zeroIO: true,
    zeroExternalMutation: true,
    zeroDynamicImports: true,
    zeroEval: true,
    zeroRouting: true,        // not a router
    zeroCompute: true,        // no business logic
    zeroAI: true,             // no inference
    zeroWindow: true,
    zeroDOM: true,

    // Environment
    worldLensAware: false
  }),

  contract: Object.freeze({
    input: [
      "BinaryBits",
      "Pattern",
      "PageId",
      "SourceId",
      "PreviousRouteMemory",
      "DualBandContext"
    ],
    output: [
      "ProxyFrontDecision",
      "RouteKey",
      "BinaryField",
      "BinaryWaveField",
      "BandSignature",
      "FrontCycleSignature",
      "AdvantageField",
      "DnaTag",
      "ProxyFrontDiagnostics",
      "ProxyFrontHealingState"
    ]
  }),

  lineage: Object.freeze({
    root: "PulseProxy-v11",
    parent: "PulseProxy-v12.3-Evo",
    ancestry: [
      "PulseProxyFront-v7",
      "PulseProxyFront-v8",
      "PulseProxyFront-v9",
      "PulseProxyFront-v10",
      "PulseProxyFront-v11",
      "PulseProxyFront-v11-Evo",
      "PulseProxyFront-v11-Evo-Binary",
      "PulseProxyFront-v11-Evo-Binary-Max",
      "PulseProxyFront-v11.2-Evo-BINARY-MAX",
      "PulseProxyFront-v12.3-Evo-BINARY-MAX-ABA"
    ]
  }),

  bands: Object.freeze({
    supported: ["binary", "symbolic"],
    default: "binary",
    behavior: "proxy-front"
  }),

  architecture: Object.freeze({
    pattern: "A-B-A",
    baseline: "binary descriptor → route plan → symbolic fallback",
    adaptive: "earned route memory + binary phenotype + wave + advantage surfaces + CoreMemory",
    return: "deterministic proxy-front surfaces + signatures + immortal route memory"
  })
});


// ============================================================================
//  INTERNAL HELPERS — deterministic, pure
// ============================================================================

const CORE_MEMORY_NAMESPACE = "PulseProxyFrontRoute-v14-Immortal";

function computeHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `h${h}`;
}

function buildRouteKey({ pattern, pageId, sourceId }) {
  const safePattern = String(pattern || "");
  const safePageId = String(pageId || "NO_PAGE");
  const safeSourceId = String(sourceId || "NO_SOURCE");
  return computeHash(`ROUTEKEY::${safePattern}::${safePageId}::${safeSourceId}`);
}

function buildBinaryField(bits) {
  const len = Array.isArray(bits) ? bits.length : 0;
  const ones = Array.isArray(bits)
    ? bits.reduce((acc, b) => (b === 1 ? acc + 1 : acc), 0)
    : 0;
  const zeros = len - ones;
  const density = len === 0 ? 0 : ones / len;
  const surface = len + ones * 3 + zeros;

  return {
    length: len,
    ones,
    zeros,
    density,
    surface,
    binaryPhenotypeSignature: `front-binary-pheno-${surface % 99991}`,
    binarySurfaceSignature: `front-binary-surface-${(surface * 7) % 99991}`,
    parity: surface % 2 === 0 ? 0 : 1,
    shiftDepth: Math.max(0, Math.floor(Math.log2(surface || 1)))
  };
}

function buildWaveField(pattern) {
  const safePattern = String(pattern || "");
  const plen = safePattern.length;

  const amplitude = Math.max(4, plen % 16);
  const wavelength = amplitude + 6;
  const phase = (plen * 3) % 32;

  let band = "root";
  if (safePattern.includes("router")) band = "router";
  else if (safePattern.includes("mesh")) band = "mesh";
  else if (safePattern.includes("send")) band = "send";
  else if (safePattern.includes("proxy")) band = "proxy";

  return {
    pattern: safePattern,
    amplitude,
    wavelength,
    phase,
    band,
    mode: "symbolic-wave",
    waveSignature: computeHash(
      `WAVE::${safePattern}::${amplitude}::${wavelength}::${phase}::${band}`
    )
  };
}

function buildFrontCycleSignature(cycle) {
  return computeHash(`FRONT_CYCLE::${cycle}`);
}

function buildBandSignature(band, routeKey) {
  return computeHash(`FRONT_BAND::${band}::${routeKey}`);
}

function buildAdvantageField(binaryField, waveField, band) {
  const density = binaryField.density || 0;
  const amplitude = waveField.amplitude || 0;
  const wavelength = waveField.wavelength || 0;

  const efficiency = density === 0 ? 0 : (amplitude + 1) / (wavelength + 1);
  const stress = Math.min(1, density * 2);
  const advantageScore = efficiency * (1 + stress);

  return {
    band,
    density,
    amplitude,
    wavelength,
    efficiency,
    stress,
    advantageScore,
    advantageSignature: computeHash(
      `ADVANTAGE::${band}::${density}::${amplitude}::${wavelength}::${advantageScore}`
    )
  };
}

function isPureBinary(bits) {
  if (!Array.isArray(bits)) return false;
  for (let i = 0; i < bits.length; i++) {
    if (bits[i] !== 0 && bits[i] !== 1) return false;
  }
  return true;
}

// ============================================================================
//  CORE MEMORY INTEGRATION — immortal route memory (deterministic keys)
// ============================================================================

function coreMemoryRecordRoute(routeMemory) {
  if (!routeMemory || !routeMemory.routeKey) return;

  const summary = {
    routeKey: routeMemory.routeKey,
    decision: routeMemory.decision,
    band: routeMemory.band,
    bandSignature: routeMemory.bandSignature,
    advantageField: routeMemory.advantageField,
    dnaTag: routeMemory.dnaTag,
    frontCycle: routeMemory.frontCycle,
    frontCycleSignature: routeMemory.frontCycleSignature
  };

  try {
    if (PulseCoreMemory && typeof PulseCoreMemory.record === "function") {
      PulseCoreMemory.record(CORE_MEMORY_NAMESPACE, routeMemory.routeKey, summary);
    }
  } catch {
    // Fail-open: never throw, never break proxy front.
  }
}

function coreMemoryRecallRoute(routeKey) {
  if (!routeKey) return null;
  try {
    if (PulseCoreMemory && typeof PulseCoreMemory.recall === "function") {
      const stored = PulseCoreMemory.recall(CORE_MEMORY_NAMESPACE, routeKey);
      if (stored && typeof stored === "object") {
        return {
          routeKey: stored.routeKey || routeKey,
          decision: stored.decision || { mode: "binary" },
          binaryField: stored.binaryField || null,
          waveField: stored.waveField || null,
          band: stored.band || "binary",
          bandSignature: stored.bandSignature || null,
          advantageField: stored.advantageField || null,
          frontCycle: stored.frontCycle || 0,
          frontCycleSignature: stored.frontCycleSignature || null,
          dnaTag: stored.dnaTag || null
        };
      }
    }
  } catch {
    // Fail-open: ignore CoreMemory failures.
  }
  return null;
}


// ============================================================================
//  ROUTE PLANNER — binary-first, fallback-safe, deterministic (A‑B‑A surfaces)
// ============================================================================

let frontCycle = 0;

export function planProxyRoute({
  bits,
  pattern,
  pageId,
  sourceId,
  previousRouteMemory
}) {
  frontCycle++;

  const routeKey = buildRouteKey({ pattern, pageId, sourceId });
  const binaryField = buildBinaryField(bits);
  const waveField = buildWaveField(pattern);
  const frontCycleSignature = buildFrontCycleSignature(frontCycle);

  const pureBinary = isPureBinary(bits);

  // v14-Immortal: merge local previousRouteMemory with CoreMemory recall
  let usedMemory = false;
  let decision = { mode: "binary" };

  let effectiveMemory = previousRouteMemory;
  if (!effectiveMemory || effectiveMemory.routeKey !== routeKey) {
    const recalled = coreMemoryRecallRoute(routeKey);
    if (recalled && recalled.routeKey === routeKey && recalled.decision) {
      effectiveMemory = recalled;
    }
  }

  if (effectiveMemory && effectiveMemory.routeKey === routeKey) {
    usedMemory = true;
    decision = effectiveMemory.decision;
  } else {
    if (!pureBinary) {
      decision = { mode: "legacy" };
    } else {
      decision = { mode: "binary" };
    }
  }

  const band = decision.mode === "binary" ? "binary" : "symbolic";
  const bandSignature = buildBandSignature(band, routeKey);
  const advantageField = buildAdvantageField(binaryField, waveField, band);

  const routeMemory = {
    routeKey,
    decision,
    binaryField,
    waveField,
    band,
    bandSignature,
    advantageField,
    frontCycle,
    frontCycleSignature,
    dnaTag:
      decision.mode === "binary"
        ? "PROXY_FRONT_BINARY"
        : "PROXY_FRONT_LEGACY"
  };

  // v14-Immortal: persist route memory into CoreMemory (immortal, deterministic)
  coreMemoryRecordRoute(routeMemory);

  return {
    routeKey,
    decision,
    routeMemory,
    usedMemory,
    binaryField,
    waveField,
    bandSignature,
    frontCycleSignature,
    advantageField
  };
}


// ============================================================================
//  PROXY FRONT — orchestrates binary-first routing with fallback
// ============================================================================
export function proxyFrontRoute({
  bits,
  pattern,
  pageId = "NO_PAGE",
  sourceId = "NO_SOURCE",
  previousRouteMemory = null,

  // external wiring (you pass these in)
  fieldIngest,     // function(bits) → packet (non-executable binary descriptor)
  legacyCreate     // function(params) → proxyObject
}) {
  const plan = planProxyRoute({
    bits,
    pattern,
    pageId,
    sourceId,
    previousRouteMemory
  });

  if (plan.decision.mode === "binary") {
    const packet = fieldIngest(bits);

    return {
      mode: "binary",
      band: "binary",
      dnaTag: "PROXY_FRONT_BINARY",
      routeKey: plan.routeKey,
      packet,
      binaryField: plan.binaryField,
      binaryWaveField: plan.waveField,
      bandSignature: plan.bandSignature,
      frontCycleSignature: plan.frontCycleSignature,
      advantageField: plan.advantageField,
      routeMemory: plan.routeMemory,
      usedMemory: plan.usedMemory
    };
  }

  const proxy = legacyCreate({
    jobId: "NO_JOB",
    pattern,
    payload: {},
    priority: "normal",
    returnTo: null,
    parentLineage: null,
    pageId
  });

  return {
    mode: "legacy",
    band: "symbolic",
    dnaTag: "PROXY_FRONT_LEGACY",
    routeKey: plan.routeKey,
    proxy,
    binaryField: plan.binaryField,
    binaryWaveField: plan.waveField,
    bandSignature: plan.bandSignature,
    frontCycleSignature: plan.frontCycleSignature,
    advantageField: plan.advantageField,
    routeMemory: plan.routeMemory,
    usedMemory: plan.usedMemory
  };
}
