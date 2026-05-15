// ============================================================================
//  PULSE OS v30‑IMMORTAL++ — BRAINSTEM
//  Organ Assembly • Dual‑Band Context Binding • CNS + Pulse‑Net + PulsePort
//  PURE ORGANISM. ZERO MUTATION. ZERO RANDOMNESS. ZERO DIRECT INTERNET.
// ============================================================================


// ============================================================================
//  IMPORTS (interfaces upgraded to v30 where applicable)
// ============================================================================

// v30 PulseAIChunker — PulsePort + StoragePort (IndexedDB) aware
import { pulseAIChunker as createPulseChunker } from "./PulseAIChunker-v30-IMMORTAL.js";

import PulseOSPresence from "../PULSE-OS/PulseOSPresence-V30.js";
import PulseMeshPresenceRelay from "../PULSE-MESH/PulseMeshPresenceRelay-v30.js";

import { createArchitectAPI } from "./aiArchitect-v30.js";
import { createTouristAPI, prewarmTourist } from "./aiTourist-v30.js";

import { createEnvironmentAPI } from "./PulseAIEnvironment-v30.js";
import { createPowerAPI } from "./aiPowerPrime-v30.js";
import { createEvolutionAPI } from "./PulseAIEvolution-v30.js";
import { createEarnAPI } from "./PulseAIEarn-v30.js";
import { createDiagnosticsWriteAPI } from "./PulseAIDiagnosticsWrite-v30.js";

import { createPersonaEngine } from "./aiPersonality-v30.js";
import { createBoundariesEngine } from "./aiBoundaries-v30.js";
import { createPermissionsEngine } from "./aiPermissions-v30.js";
import { createRouterEngine } from "./aiRouter-v30.js";
import { createCortex } from "./PulseAICortex-v30.js";

import { createDualBandOrganism } from "./PulseAIDualBand-v30.js";

import { createDoctorAPI } from "./aiDoctorAssistant-v30.js";
import { createSurgeonAPI } from "./aiSurgeon-v30.js";
import { createLawyerAPI } from "./aiLawAssistant-v30.js";
import { createEntrepreneurAPI } from "./PulseAIEntrepreneur-v30.js";
import { createVeterinarianAPI } from "./aiVeterinarian-v30.js";
import { createClinicianAPI } from "./PulseAIClinician-v30.js";
import { createEvolutionaryAPI } from "./PulseAIEvolutionary-v30.js";

import { createSafetyFrameOrgan } from "./aiSafetyFrame-v30.js";
import { createJuryFrame } from "./aiJuryFrame-v30.js";


// ============================================================================
//  PULSE‑NET / PORT SURFACES
// ============================================================================
function buildPulseNetSurface(context) {
  return Object.freeze({
    fetch: context.fetchAPI || null,
    pulseNet: context.PulseNet || null,
    proxySpine: context.ProxySpine || null,
    boxCamera: context.BoxCamera || null,
    juryFrame: context.JuryFrame || null,
    trustFabric: context.TrustFabric || null
  });
}

function buildChunkerConfig(context, ports, pulseNetSurface) {
  const { db, fsAPI, routeAPI, schemaAPI, storagePort, pulsePort, signalPort } = ports;

  return {
    Brain: {
      log: context.log,
      warn: context.warn,
      error: context.error,
      // legacy compatibility for older organs
      firebase: () => db,
      fsAPI,
      routeAPI,
      schemaAPI,
      PulseNet: pulseNetSurface.pulseNet,
      ProxySpine: pulseNetSurface.proxySpine,
      JuryFrame: pulseNetSurface.juryFrame,
      TrustFabric: pulseNetSurface.trustFabric,
      PulsePort: pulsePort || null,
      SignalPort: signalPort || null,
      StoragePort: storagePort || null
    },
    Logger: context,
    Lanes: {
      total: 32,
      names: [
        "lane-core",
        "lane-earn",
        "lane-evolution",
        "lane-doctor",
        "lane-surgeon",
        "lane-lawyer",
        "lane-entrepreneur",
        "lane-veterinarian",
        "lane-clinician",
        "lane-environment",
        "lane-power",
        "lane-tourist",
        "lane-architect",
        "lane-diagnostics",
        "lane-presence",
        "lane-mesh",
        "lane-dualband",
        "lane-router",
        "lane-cortex",
        "lane-trust",
        "lane-jury",
        "lane-evidence",
        "lane-anomaly",
        "lane-honeypot",
        "lane-dominance",
        "lane-scanfile",
        "lane-code",
        "lane-binary-metrics",
        "lane-symbolic-metrics",
        "lane-prewarm",
        "lane-reserved-1",
        "lane-reserved-2"
      ]
    }
  };
}


// ============================================================================
//  ORGAN ASSEMBLY — v30 IMMORTAL++
// ============================================================================

/**
 * createOrgans
 *
 * @param {Object} context  – logging, clocks, mesh, identity directory, etc.
 * @param {Object} ports    – substrate ports:
 *   {
 *     db,          // legacy Firestore / Shadow DB handle (optional)
 *     fsAPI,       // file system API
 *     routeAPI,    // routing API
 *     schemaAPI,   // schema API
 *     pulsePort,   // PulsePort v30 (binary / organism port)
 *     signalPort,  // PulseSignalPort v30 (artery / CNS signaling)
 *     storagePort  // IndexedDB / local‑first storage port
 *   }
 */
export function createOrgans(context, ports = {}) {
  const {
    db,
    fsAPI,
    routeAPI,
    schemaAPI,
    pulsePort,
    signalPort,
    storagePort
  } = ports;

  // ------------------------------------------------------------------------
  // 0) LEGACY CNS GLOBAL SURFACE (kept for compatibility only)
  // ------------------------------------------------------------------------
  if (typeof window !== "undefined") {
    window.db    = db;
    window.log   = context.log;
    window.warn  = context.warn;
    window.error = context.error;

    window.fsAPI     = fsAPI;
    window.routeAPI  = routeAPI;
    window.schemaAPI = schemaAPI;

    // NOTE: fetchAPI is assumed to be Pulse‑Net routed; no raw internet.
    window.fetchAPI  = context.fetchAPI || window.fetchAPI || null;
  }

  // ------------------------------------------------------------------------
  // 1) PULSE‑NET SURFACE
  // ------------------------------------------------------------------------
  const pulseNetSurface = buildPulseNetSurface(context);

  // ------------------------------------------------------------------------
  // 2) CNS CHUNKER — v30 IMMORTAL++ (PulsePort + StoragePort aware)
// ------------------------------------------------------------------------
  const chunker = createPulseChunker(
    buildChunkerConfig(
      context,
      { db, fsAPI, routeAPI, schemaAPI, pulsePort, signalPort, storagePort },
      pulseNetSurface
    )
  );

  chunker?.startPulseBandSession?.({
    trace: context.trace,
    db,
    fsAPI,
    routeAPI,
    schemaAPI,
    PulseNet: pulseNetSurface.pulseNet,
    PulsePort: pulsePort || null,
    SignalPort: signalPort || null,
    StoragePort: storagePort || null
  });

  // ------------------------------------------------------------------------
  // 3) CNS ENGINES (persona, boundaries, permissions)
// ------------------------------------------------------------------------
  const personaEngine = createPersonaEngine({ context, db, pulsePort, storagePort });
  const boundariesEngine = createBoundariesEngine({ context, db, pulsePort });
  const permissionsEngine = createPermissionsEngine({ context, db, pulsePort });

  // ------------------------------------------------------------------------
  // 4) ROUTER + CORTEX (symbolic CNS)
// ------------------------------------------------------------------------
  const router = createRouterEngine({
    context,
    personaEngine,
    boundariesEngine,
    permissionsEngine,
    pulsePort,
    signalPort
  });

  const cortex = createCortex({
    context,
    router,
    personaEngine,
    boundariesEngine,
    permissionsEngine,
    pulsePort,
    signalPort
  });

  // ------------------------------------------------------------------------
  // 5) DUAL‑BAND ORGANISM (symbolic ↔ binary, artery‑aware)
// ------------------------------------------------------------------------
  const dualBand = createDualBandOrganism({
    trace: context.trace,
    db,
    fsAPI,
    routeAPI,
    schemaAPI,
    pulsePort,
    storagePort,
    signalPort
  });

  // ------------------------------------------------------------------------
  // 6) REAL ORGANS (symbolic service organs)
// ------------------------------------------------------------------------
  const osPresence = PulseOSPresence.create({
    SystemClock: context.SystemClock,
    IdentityDirectory: context.IdentityDirectory,
    DeviceFingerprint: context.DeviceFingerprint,
    log: context.log
  });

  const meshPresenceRelay = PulseMeshPresenceRelay.create({
    MeshBus: context.MeshBus,
    SystemClock: context.SystemClock,
    IdentityDirectory: context.IdentityDirectory,
    log: context.log
  });

  const doctor = createDoctorAPI({ context, db, pulsePort });
  const surgeon = createSurgeonAPI({ context, db, pulsePort });
  const lawyer = createLawyerAPI({ context, db, pulsePort });
  const entrepreneur = createEntrepreneurAPI({ context, db, pulsePort });
  const veterinarian = createVeterinarianAPI({ context, db, pulsePort });
  const clinician = createClinicianAPI({ context, db, pulsePort });
  const evolutionary = createEvolutionaryAPI({ context, db, pulsePort });

  // ------------------------------------------------------------------------
  // 7) CORE ORGANS (architect, tourist, environment, power, evolution, earn)
// ------------------------------------------------------------------------
  const architect = createArchitectAPI({ context, db, pulsePort, storagePort });
  const tourist = createTouristAPI({ context, db, pulsePort });
  const environment = createEnvironmentAPI({ context, db, fsAPI, routeAPI, pulsePort });
  const power = createPowerAPI({ context, db, pulsePort });
  const evolution = createEvolutionAPI({
    context,
    fsAPI,
    routeAPI,
    schemaAPI,
    pulsePort,
    storagePort
  });
  const earn = createEarnAPI({ context, db, pulsePort });
  const diagnosticsWrite = createDiagnosticsWriteAPI({ context, db, storagePort });

  // ------------------------------------------------------------------------
  // 8) UNIVERSAL SYSTEM MAP
  // ------------------------------------------------------------------------
  const ALL_SYSTEMS = Object.freeze({
    personaEngine,
    boundariesEngine,
    permissionsEngine,
    router,
    cortex,
    dualBand,
    chunker,
    doctor,
    surgeon,
    lawyer,
    entrepreneur,
    veterinarian,
    clinician,
    evolutionary,
    architect,
    tourist,
    environment,
    power,
    evolution,
    earn,
    diagnosticsWrite,
    osPresence,
    meshPresenceRelay
  });

  // ------------------------------------------------------------------------
  // 9) REGISTER CHUNKER WITH DUAL‑BAND + ROUTER
  // ------------------------------------------------------------------------
  dualBand?.registerBackendOrgan?.("chunker", chunker);
  router?.registerBackendOrgan?.("chunker", chunker);

  // ------------------------------------------------------------------------
  // 10) UNIVERSAL REGISTRATION WITH CHUNKER (lane‑aware)
// ------------------------------------------------------------------------
  if (chunker?.registerBackendOrgan) {
    for (const [name, system] of Object.entries(ALL_SYSTEMS)) {
      if (system?.chunk || system?.prewarm) {
        chunker.registerBackendOrgan(name, {
          chunk: system.chunk,
          prewarm: system.prewarm,
          laneHint: (() => {
            switch (name) {
              case "earn":
                return "lane-earn";
              case "evolution":
              case "evolutionary":
                return "lane-evolution";
              case "doctor":
              case "clinician":
              case "veterinarian":
                return "lane-doctor";
              case "surgeon":
                return "lane-surgeon";
              case "lawyer":
                return "lane-lawyer";
              case "architect":
                return "lane-architect";
              case "tourist":
                return "lane-tourist";
              case "environment":
                return "lane-environment";
              case "power":
                return "lane-power";
              case "router":
                return "lane-router";
              case "cortex":
                return "lane-cortex";
              case "dualBand":
                return "lane-dualband";
              case "osPresence":
              case "meshPresenceRelay":
                return "lane-presence";
              case "diagnosticsWrite":
                return "lane-diagnostics";
              default:
                return "lane-core";
            }
          })()
        });
      }
    }
  }

  // ------------------------------------------------------------------------
  // 11) UNIVERSAL PREWARM (CNS + organs + chunker)
// ------------------------------------------------------------------------
  chunker?.prewarm?.();

  for (const system of Object.values(ALL_SYSTEMS)) {
    system?.prewarm?.();
  }

  prewarmTourist?.(tourist);

  // ------------------------------------------------------------------------
  // 12) RETURN FULL ORGANISM MAP (frozen, read‑only)
// ------------------------------------------------------------------------
  return Object.freeze(ALL_SYSTEMS);
}

// ---------------------------------------------------------------------------
//  DUAL EXPORT LAYER — CommonJS compatibility
// ---------------------------------------------------------------------------
if (typeof module !== "undefined") {
  module.exports = {
    createOrgans
  };
}
