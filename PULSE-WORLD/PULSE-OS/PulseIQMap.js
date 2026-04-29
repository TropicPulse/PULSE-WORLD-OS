// -----------------------------------------------------------------------------
// PulseIQMapPrime.js — v13‑EVO‑PRIME
// INTERPRETATION LAYER OF THE GENOME (PulseOrganismMap)
// -----------------------------------------------------------------------------

import { PulseOrganismMap } from "./PulseOrganismMap.js";
import { log, warn, error as logError } from "../PULSEProofLogger.js";
import { bootCortex } from "./PulseOSBrainCortex.js";

// -----------------------------------------------------------------------------
// VERSION MAP — carried forward, still text-only
// -----------------------------------------------------------------------------
const VERSION_MAP = {
  organism: "v12.3‑PRESENCE‑EVO‑MAX‑PRIME",
  iq: "v13‑EVO‑PRIME",
  router: "v12.3‑PRESENCE",
  mesh: "v12.3‑PRESENCE",
  send: "v12.3‑PRESENCE",
  pulse: "v12.3‑PRESENCE",
  proxy: "v12.3‑PRESENCE",

  gpu: "v12.3‑GPU‑PRESENCE",
  sdn: "v12.3‑SDN‑PRESENCE",
  pnsNervousSystem: "v12.3‑PNS‑PRESENCE",
  pnsNervousSystemBinary: "v12.3‑PNS‑BINARY‑MAX",

  proxySpine: "v12.3‑SPINE‑PRESENCE",
  proxySpineBinary: "v12.3‑SPINE‑BINARY‑MAX",
  proxyCleanup: "v12.3‑CLEANUP‑PRESENCE",
  proxyHistoryRepair: "v12.3‑REPAIR‑PRESENCE",

  binaryNervousSystem: "v12.3‑PURE‑BINARY‑MAX",
  dynamicPageSystem: "v12.3‑EVO‑MAX",
  fallbackSystem: "ContinuancePulse‑v3‑Presence",

  uiOrganism: "v12.3‑UI‑PRESENCE",
  uiEvolutionaryPage: "v12.3‑UI‑PAGE‑PRESENCE",
  uiBinaryOrgan: "v12.3‑UI‑BINARY‑PRESENCE",
  uiRouterOrgan: "v12.3‑UI‑ROUTER‑PRESENCE",
  uiBrainOrgan: "v12.3‑UI‑BRAIN‑PRESENCE",
  uiMemoryOrgan: "v12.3‑UI‑MEMORY‑PRESENCE",
  uiImpulseOrgan: "v12.3‑UI‑IMPULSE‑PRESENCE",
  uiSkin: "v12.3‑UI‑SKIN‑PRESENCE",
  uiAnimations: "v12.3‑UI‑ANIM‑PRESENCE",

  coreMemory: "v12.3‑CORE‑MEMORY",
  coreBinaryMemory: "v12.3‑CORE‑BINARY",

  fileScanner: "v12.3‑FILE‑SCANNER",
  codeAnalyzer: "v12.3‑CODE‑ANALYZER"
};

function inferTopLevelFromPath(path = "") {
  if (!path || typeof path !== "string") return "/";
  const clean = path.toLowerCase().split("?")[0].split("#")[0];
  if (clean === "/" || clean === "") return "/";
  return clean;
}


// -----------------------------------------------------------------------------
// STATIC ACCESS BLUEPRINTS (Firebase, etc.)
// -----------------------------------------------------------------------------
const firebaseAccess = {
  provider: "Firebase",
  role: "REMOTE_STATE_STORE",
  routed: true,
  handle: "db",
  meta: {
    helperModule: "../NETLIFY/FUNCTIONS/helpers.js",
    contract: "PulseFirebase-v12.6-Routed"
  }
};

// -----------------------------------------------------------------------------
// FRONTEND / WORLD TOPOLOGY — derived from your description
// -----------------------------------------------------------------------------
const FRONTEND_ROOT = "PULSE-WORLD";

const FRONTEND_FILES = [
  "index.html",
  "dashboard.html",
  "checkemail.html",
  "userrecords.html"
];

const FRONTEND_SYSTEMS = [
  "PulseAdmin",
  "PulseDirectory",
  "PulseDelivery",
  "PulseRewards"
];

const WORLD_FOLDERS = [
  "NETLIFY/FUNCTIONS",
  "_PICTURES",
  "_REDIRECT",
  "_SOUNDS",
  "_LOADERS",
  "_HELPERS"
];

// -----------------------------------------------------------------------------
// ORGANISM INTERPRETATION HELPERS (from genome → IQ expectations)
// -----------------------------------------------------------------------------
function buildOrganExpectationsFromGenome(genome) {
  const systems = genome.systems || {};
  const organsBySystem = {};

  for (const [systemKey, systemDef] of Object.entries(systems)) {
    organsBySystem[systemKey] = systemDef.organs || [];
  }

  return organsBySystem;
}

function buildPageExpectations() {
  // Keep your existing page expectations, but this is now the place
  // where you could dynamically extend based on FRONTEND_SYSTEMS if desired.
  return {
    "/": ["PulseRouter", "PulseKernel", "PulseEvolutionaryPage"],

    "/dashboard": [
      "PulseRouter",
      "PulseGPU",
      "LongTermMemory",
      "PulseEvolutionaryPage"
    ],

    "/send": [
      "PulseSendSystem",
      "BinarySend",
      "PulseOSShortTermMemory",
      "PulseEvolutionaryPage"
    ],

    "/forms/send": [
      "PulseSendSystem",
      "PulseEvolutionaryPage",
      "DynamicWrapperPage"
    ],

    "/earn": [
      "PulseEarn",
      "PulseEarnSendSystem",
      "PulseEarnContinuancePulse",
      "PulseEvolutionaryPage"
    ],

    "/settings": [
      "BBB",
      "LongTermMemory",
      "PulseOSShortTermMemory",
      "PulseEvolutionaryPage"
    ],

    "/organism": [
      "PulseProxySpine",
      "PulseBand",
      "PulseBandCleanup",
      "PulseHistoryRepair",
      "BinaryRouter",
      "BinaryMesh",
      "BinaryPulse",
      "PulseEvolutionaryPage"
    ],

    "/scanner": [
      "BinaryMRI",
      "BinaryWaveScanner",
      "BinaryLoopScanner",
      "PulseEvolutionaryPage"
    ],

    "/scanner/file": [
      "PulseFileScanner",
      "PulseEvolutionaryPage"
    ],

    "/proxy": [
      "PulseProxySpine",
      "PulseProxyHealer",
      "PulseEvolutionaryPage"
    ],

    "/proxy/health": [
      "PulseProxySpine",
      "PulseProxyHealer",
      "PulseEvolutionaryPage"
    ],

    "/proxy/metrics": [
      "PulseProxySpine",
      "PulseProxyHealer",
      "PulseEvolutionaryPage"
    ],

    "/proxy/node": [
      "PulseProxySpine",
      "PulseEvolutionaryPage"
    ],

    // Frontend-specific logical pages (can be expanded later)
    "/admin":      ["PulseEvolutionaryPage"],
    "/directory":  ["PulseEvolutionaryPage"],
    "/delivery":   ["PulseEvolutionaryPage"],
    "/rewards":    ["PulseEvolutionaryPage"],
    "/userrecords":["PulseEvolutionaryPage"]
  };
}

// -----------------------------------------------------------------------------
// DRIFT / REPAIR METADATA
// -----------------------------------------------------------------------------
const DRIFT_METADATA = {
  lastScan: null,
  lastRepair: null,
  signatures: [],
  repairOrgans: [
    "PulseBandCleanup",
    "PulseHistoryRepair",
    "PulseOSHealer",
    "GlobalHealer",
    "PulseProxyHealer"
  ],
  scannerOrgans: ["PulseFileScanner", "PulseCodeAnalyzer"]
};

// -----------------------------------------------------------------------------
// PRIME IQ MAP — ASYNC CONSTRUCTION FROM GENOME
// -----------------------------------------------------------------------------
async function buildPulseIQMapPrime() {
  const genome = await PulseOrganismMap;

  const organExpectations = buildOrganExpectationsFromGenome(genome);
  const pageExpectations = buildPageExpectations();

  return {
    // ACCESS UTILITIES
    log,
    warn,
    logError,
    bootCortex,
    firebase: firebaseAccess,

    // VERSION MAP
    version: VERSION_MAP,

    // GENOME REFERENCE
    genome,

    // TOPOLOGY
    topology: {
      backendRoot: "tropic-pulse-functions",
      publishRoot: FRONTEND_ROOT,
      frontendFiles: FRONTEND_FILES,
      frontendSystems: FRONTEND_SYSTEMS,
      worldFolders: WORLD_FOLDERS
    },

    // ORGAN EXPECTATIONS (derived from genome)
    organs: organExpectations,

    // PAGE EXPECTATIONS (currently semi-static, but now centralized)
    pages: pageExpectations,

    // DRIFT / REPAIR
    drift: DRIFT_METADATA,

    // ROUTING HELPERS
    topLevelRoutes: TOP_LEVEL_ROUTES,

    getTopLevelRouteFor(path) {
      return inferTopLevelFromPath(path);
    },

    getRecoveryRoute() {
      return TOP_LEVEL_ROUTES.fallback;
    }
  };
}

// -----------------------------------------------------------------------------
// EXPORT — PRIME IQ MAP (PROMISE)
// -----------------------------------------------------------------------------
export const PulseIQMap = await buildPulseIQMapPrime();
