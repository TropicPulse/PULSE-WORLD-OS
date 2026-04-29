// -----------------------------------------------------------------------------
// PulseOrganismMap.js — v13‑EVO‑PRIME
// THE JEWEL OF THE ORGANISM
//
// LAWS OF THE ORGANISM:
//   • Any folder starting with "PULSE-" is a system.
//   • Any .js file inside that folder is an organ.
//   • No hardcoded clusters.
//   • No hardcoded organs.
//   • No hardcoded pages.
//   • The filesystem IS the organism.
//   • The organism map IS the genome.
//   • All subsystems read from THIS file.
// -----------------------------------------------------------------------------

let fs = null;
let db = null;
let routes = null;
let schema = null;

// -----------------------------------------------------------------------------
// PREWARM LAYER — Aligns all adapters before organism boot
// -----------------------------------------------------------------------------
export function prewarmLayer() {
  try {
    db = getDb({ trace: false });
    db.getCollection("prewarm");
    db.getDocument("prewarm", "id");

    fs = getFsAPI({ trace: false });
    fs.getAllFiles();
    fs.getFile("/prewarm");

    routes = getRouteAPI({ trace: false });
    routes.getRouteMap();
    routes.getRoute("prewarm");

    schema = getSchemaAPI({ trace: false });
    schema.getAllSchemas();
    schema.getSchema("prewarm");

    return emitDepsPacket("prewarm", {
      message: "OrganismMap layer prewarmed and adapter pathways aligned."
    });
  } catch (err) {
    console.error("[OrganismMap:Prewarm] Failed:", err);
    return emitDepsPacket("prewarm-error", {
      error: String(err),
      message: "OrganismMap layer prewarm failed."
    });
  }
}

// -----------------------------------------------------------------------------
// SCAN SYSTEMS — Pure FS API, no Node, no assumptions
// -----------------------------------------------------------------------------
async function scanPulseSystems(baseDir) {
  fs = getFsAPI({ trace: false });

  const allFiles = await fs.getAllFiles();

  // Identify PULSE-* system directories
  const pulseSystems = allFiles
    .filter(f => f.type === "dir" && f.name.startsWith("PULSE-"))
    .map(f => ({
      name: f.name,
      path: f.path
    }));

  const systems = {};

  for (const system of pulseSystems) {
    const systemFiles = allFiles.filter(f =>
      f.path.startsWith(system.path)
    );

    const organs = systemFiles
      .filter(f => f.type === "file" && f.name.endsWith(".js"))
      .map(f => f.name.replace(".js", ""));

    systems[system.name.toLowerCase()] = {
      root: system.name,
      organs
    };
  }

  return systems;
}

// -----------------------------------------------------------------------------
// BUILD ORGANISM MAP — The Genome
// -----------------------------------------------------------------------------
export async function buildPulseOrganismMap(baseDir = "/") {
  const systems = await scanPulseSystems(baseDir);

  return {
    version: "13‑EVO‑PRIME‑SELF‑DESCRIBING‑ORGANISM",
    generatedAt: new Date().toISOString(),
    systems,

    // Lineage metadata — evolution, not structure
    aliases: {
      base: {
        PulseBand: {
          old: ["PulseBand"],
          now: [
            "PulseOSSkinReflex",
            "PulseOSSensoryCortex",
            "PulseProxyImpulse"
          ]
        },
        PulseNet: {
          old: ["PulseNet"],
          now: ["PulseSDN"]
        },
        PulseClient: {
          old: ["PulseClient"],
          now: ["PulseProxyImpulse", "PulseProxySpine"]
        },
        PulseUpdate: {
          old: ["PulseUpdate"],
          now: ["PulseOSBrainEvolution", "PulseIQ"]
        },
        PulseIdentity: {
          old: ["PulseIdentity"],
          now: ["PulseProxyBBB"]
        }
      },

      routing: {
        Router: {
          old: ["router.js", "PulseRouter"],
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
        old: [
          "PulseBand",
          "PulseNet",
          "PulseClient",
          "router.js",
          "organ",
          "PulseSend",
          "backend"
        ],
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
}

// -----------------------------------------------------------------------------
// EXPORT — The Genome (async)
// -----------------------------------------------------------------------------
export const PulseOrganismMap = await buildPulseOrganismMap("/");
