// ============================================================================
// FILE: /apps/PulseOS/Brain/PulseOrganismMap.js
// PULSE ORGANISM MAP — v12.3‑PRESENCE‑EVO‑MAX‑PRIME
// “THE ORGANISM IS THE MACHINE. THE MACHINE IS THE ORGANISM.”
//
// TEXT‑ONLY • DETERMINISTIC • NON‑EVOLVABLE • REAL FOLDER ROOTS ONLY
// Binary‑first • Presence‑aware • Firewall‑aligned
// ============================================================================

export const PulseOrganismMap = {
  version: "12.3‑PRESENCE‑EVO‑MAX‑PRIME",

  // ========================================================================
  // SYSTEMS — REAL PULSE‑* FOLDERS (backend = organism, frontend = shells)
  // ========================================================================
  systems: {

    // ----------------------------------------------------------------------
    // PULSE‑OS — CNS / Reflex / Immune / SDN / GPU / Presence / Identity
    // ----------------------------------------------------------------------
    "pulse-os": {
      role: "CNS / Reflex / Immune / SDN / GPU / Presence / Identity",
      root: "PULSE-OS",
      organs: [
        // Identity + Brainstem
        "PulseOrganismMap","PulseIntentMap","PulseIQMap",
        "PulseOSBrain","PulseOSBrainCortex","PulseOSBrainStem","PulseOSBrainEvolution",

        // Nervous System (software‑defined)
        "PulseSDN","PulseGPUv11","PulseSDN-Prewarm-v12.3-Presence",

        // Reflex + Immune
        "PulseOSFightFlightResponse","PulseOSImmuneSystem","PulseOSInflammatoryResponse",

        // Memory spine
        "PulseCoreMemory",

        // Membranes
        "PulseOSBBB","PulseOSMucusMembrane","PulseOSOrganMembrane","PulseOSTissueMembrane",

        // Senses + Reflex
        "PulseOSSensoryCortex","PulseOSSkinReflex",

        // Survival
        "PulseOSSurvivalInstincts","PulseOSThymus",

        // Alerts
        "RouteDownAlert"
      ]
    },

    // ----------------------------------------------------------------------
    // PULSE‑AI — Binary Nervous System / Pure Binary Nerves / Presence Cortex
    // ----------------------------------------------------------------------
    "pulse-binary": {
      role: "Binary Nervous System / Pure Binary Nerves / AI Cortex / Presence",
      root: "PULSE-AI",
      organs: [
        "BinaryProxy-v12.3-PURE","BinaryRouter-v12.3-PURE","BinaryMesh-v12.3-PURE",
        "BinarySend-v12.3-PURE","BinaryPulse-v12.3-PURE",

        // Binary organism bootloader
        "AIBinaryOrganism",

        // Binary cortex + adapters
        "BinaryAgent","BinaryMemory","BinaryPipeline","BinaryReflex",
        "BinaryLoggerAdapter","BinaryPageScannerAdapter","BinaryEvolution",
        "BinaryGovernorAdapter","BinaryOrganRegistry","BinaryDelta","BinaryConductor",

        // Binary scanners
        "BinaryMRI","BinaryWaveScanner","BinaryLoopScanner",

        // File / code cognition (symbolic-only)
        "PulseFileScanner-v12.3-Presence",

        // Archetypes
        "BinaryDoctor","BinaryCommunicator","BinaryAgent"
      ]
    },

    // ----------------------------------------------------------------------
    // PULSE‑CORE — Core Memory Spine
    // ----------------------------------------------------------------------
    "pulse-core": {
      role: "Core Memory System",
      root: "PULSE-CORE",
      organs: [
        "PulseBinaryCoreOverlay","PulseCoreAIMemoryAdapter","PulseCoreBrain",
        "PulseCoreEarnMemoryAdapter","PulseCoreEvolution","PulseCoreGovernor",
        "PulseCoreGPUMemoryAdapter","PulseCoreLayers","PulseCoreMemory",
        "PulseCoreMeshMemoryAdapter","PulseCoreProxyMemoryAdapter",
        "PulseCoreRouterMemoryAdapter","PulseCoreSendMemoryAdapter"
      ]
    },

    // ----------------------------------------------------------------------
    // PULSE‑DESIGN — Repo / Manifest / Translation
    // ----------------------------------------------------------------------
    "pulse-design": {
      role: "Design System / Repo / Manifest / Translation",
      root: "PULSE-DESIGN",
      organs: [
        "fileClassifier","manifestBuilder","manifestWriter","translator","repoWalker"
      ]
    },

    // ----------------------------------------------------------------------
    // PULSE‑EARN — Economy / Market / Biological Engine
    // ----------------------------------------------------------------------
    "pulse-earn": {
      role: "Economy / Market / Biological Earn Engine",
      root: "PULSE-EARN",
      organs: [
        "PulseEarn","PulseEarnCell","PulseEarnCirculatorySystem","PulseEarnCustomReceptor",
        "PulseEarnEndocrineSystem","PulseEarnGeneticMemory","PulseEarnGenome","PulseEarnHeart",
        "PulseEarnImmuneSystem","PulseEarnLymphNodes","PulseEarnMetabolism","PulseEarnMktAmbassador",
        "PulseEarnMktAuctioneer","PulseEarnMktBroker","PulseEarnMktConsulate","PulseEarnMktCourier",
        "PulseEarnMktEmbassyLedger","PulseEarnMktForager","PulseEarnMuscleSystem","PulseEarnNervousSystem",
        "PulseEarnReceptor","PulseEarnReflex","PulseEarnReflexRouter","PulseEarnSkeletalSystem",
        "PulseEarnSurvivalInstincts","PulseEarnSendSystem","PulseEarnContinuancePulse","PulseEarnTest"
      ]
    },

    // ----------------------------------------------------------------------
    // PULSE‑GPU — Deterministic GPU Nervous System
    // ----------------------------------------------------------------------
    "pulse-gpu": {
      role: "GPU / Deterministic Compute / GPU Nervous System",
      root: "PULSE-GPU",
      organs: ["PulseGPUv11"]
    },

    // ----------------------------------------------------------------------
    // PULSE‑MESH — Aura / Cognition / Endocrine / Immune / Cortex
    // ----------------------------------------------------------------------
    "pulse-mesh": {
      role: "Mesh / Aura / Cognition / Endocrine / Immune / Cortex",
      root: "PULSE-MESH",
      organs: [
        "PulseMeshAura","PulseMeshAwareness","PulseMeshCognition","PulseMeshCortex",
        "PulseMeshEcho","PulseMeshEndocrineSystem","PulseMeshEnvironmentalField",
        "PulseMeshEvolutionaryWiring","PulseMeshOrgans","PulseMeshFlow","PulseMeshHormones",
        "PulseMeshImmuneMembrane","PulseMeshImmuneSystem","PulseMeshSenses","PulseMeshSkin",
        "PulseMeshSpine","PulseMeshSurvivalInstincts","PulseMeshTendons","PulseMeshThalamus"
      ]
    },

    // ----------------------------------------------------------------------
    // PULSE‑PROXY — Edge / Pressure / Vitals / Spine / Blood
    // ----------------------------------------------------------------------
    "pulse-proxy": {
      role: "Proxy / Edge / Pressure / Vitals / Spine / Blood",
      root: "PULSE-PROXY",
      organs: [
        "CheckBand","CheckIdentity","CheckRouterMemory","PulseProxyAdrenalSystem",
        "PulseProxyBBB","PulseProxyBloodPressure","PulseProxyBloodStream",
        "PulseProxyCirculatorySystem","PulseProxyHeart","PulseProxyHeartBeat",
        "PulseProxyHypothalamus","PulseProxyImpulse","PulseProxyLimbic",
        "PulseProxyOuterAgent","PulseProxySpine","PulseProxySynapse",
        "PulseProxyVitalsLogger","PulseProxyVitalsMonitor","PulseProxyWBCells",

        // v12.3 Presence spine + repair
        "PulseProxy-v12.3-Presence","BinaryProxyFallbackTier",
        "PulseHistoryRepair","PulseBandCleanup"
      ]
    },

    // ----------------------------------------------------------------------
    // PULSE‑ROUTER — Evolutionary Thought + Binary Routing
    // ----------------------------------------------------------------------
    "pulse-router": {
      role: "Routing / Evolutionary Thought / Binary Routing",
      root: "PULSE-ROUTER",
      organs: [
        "PulseRouterEvolutionaryThought",
        "BinaryRouter-v12.3-PURE"
      ]
    },

    // ----------------------------------------------------------------------
    // PULSE‑SEND — Outbound Delivery
    // ----------------------------------------------------------------------
    "pulse-send": {
      role: "Outbound / Delivery / Deterministic Send / Binary Send",
      root: "PULSE-SEND",
      organs: [
        "PulseSendSystem",
        "BinarySend-v12.3-PURE"
      ]
    },

    // ----------------------------------------------------------------------
    // PULSE‑PULSE — Heartbeat + Binary Pulse
    // ----------------------------------------------------------------------
    "pulse-pulse": {
      role: "Heartbeat / Pulse / Binary Pulse",
      root: "PULSE-SHIFTER",
      organs: [
        "PulseShifterEvolutionaryPulse",
        "BinaryPulse-v12.3-PURE"
      ]
    },

    // ----------------------------------------------------------------------
    // PULSE‑SCANNER — MRI / Wave / Loop
    // ----------------------------------------------------------------------
    "pulse-scanner": {
      role: "Scanning / MRI / Wave / Loop",
      root: "PULSE-TOOLS",
      organs: [
        "BinaryMRI",
        "BinaryWaveScanner",
        "BinaryLoopScanner"
      ]
    },

    // ----------------------------------------------------------------------
    // PULSE‑ARCHETYPES — AI Archetypes
    // ----------------------------------------------------------------------
    "pulse-archetypes": {
      role: "AI Archetypes / Doctor / Communicator / Agent",
      root: "PULSE-AI",
      organs: [
        "BinaryDoctor",
        "BinaryCommunicator",
        "BinaryAgent"
      ]
    },

    // ----------------------------------------------------------------------
    // PULSE‑DYNAMIC — Evolutionary UI
    // ----------------------------------------------------------------------
    "pulse-dynamic": {
      role: "Dynamic Page System / Evolutionary UI",
      root: "PULSE-UI",
      organs: [
        "PulseEvolutionaryPage",
        "PageEvo",
        "DynamicWrapperPage"
      ]
    }
  },

  // ========================================================================
  // ALIASES — TEXT‑ONLY (legacy → v12.3 → binary)
  // ========================================================================
  aliases: {
    base: {
      PulseBand: {
        old: ["PulseBand"],
        now: ["PulseOSSkinReflex","PulseOSSensoryCortex","PulseProxyImpulse"]
      },
      PulseNet: {
        old: ["PulseNet"],
        now: ["PulseSDN"]
      },
      PulseClient: {
        old: ["PulseClient"],
        now: ["PulseProxyImpulse","PulseProxySpine"]
      },
      PulseUpdate: {
        old: ["PulseUpdate"],
        now: ["PulseOSBrainEvolution","PulseIQ"]
      },
      PulseIdentity: {
        old: ["PulseIdentity"],
        now: ["PulseProxyBBB"]
      }
    },

    routing: {
      Router: {
        old: ["router.js","PulseRouter"],
        now: ["PulseRouterEvolutionaryThought"]
      },
      RouterMemory: {
        old: ["RouterMemory"],
        now: [
          "PulseOSShortTermMemory",
          "PulseOSTissueMembrane"
        ]
      },
      BackendEndpoint: {
        old: ["Endpoint"],
        now: ["PulseProxyOuterAgent"]
      },
      BackendRouter: {
        old: ["BackendRouter"],
        now: ["PulseProxySpine"]
      }
    },

    routeChain: {
      old: ["PulseBand","PulseNet","PulseClient","router.js","organ","PulseSend","backend"],
      now: [
        "PulseOSSkinReflex / PulseOSSensoryCortex",
        "PulseSDN",
        "PulseProxyImpulse",
        "PulseRouterEvolutionaryThought",
        "Organ (PulseOrganismMap)",
        "PulseSendSystem",
        "PulseProxySpine"
      ]
    },

    binaryRouteChain: {
      old: [],
      now: [
        "PulseOSSkinReflex / PulseOSSensoryCortex",
        "PulseSDN",
        "BinaryRouter-v12.3-PURE",
        "BinaryProxy-v12.3-PURE",
        "BinaryMesh-v12.3-PURE",
        "BinarySend-v12.3-PURE",
        "BinaryPulse-v12.3-PURE"
      ]
    }
  }
};

// ============================================================================
// END OF FILE — PULSE ORGANISM MAP / v12.3‑PRESENCE‑EVO‑MAX‑PRIME
// ============================================================================
