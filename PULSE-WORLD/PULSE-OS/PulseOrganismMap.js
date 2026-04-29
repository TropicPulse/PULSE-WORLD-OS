// -----------------------------------------------------------------------------
// PulseOrganismMap.js
// PulseOS v12.4+ / v13-EVO
// SELF-DESCRIBING ORGANISM GENOME
//
// LAW:
//   - Any folder starting with "PULSE-" is a system.
//   - Any .js file inside that folder is an organ.
//   - No hardcoded clusters.
//   - No hardcoded organs.
//   - No hardcoded pages.
//   - The filesystem IS the organism.
//
// This file IS the organism map.
// Every other subsystem (IQMap, Cortex, Earn, Router, Mesh, Presence)
// reads from THIS genome.
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// PulseOrganismMap.js — v13‑EVO / SELF‑DESCRIBING ORGANISM GENOME
// -----------------------------------------------------------------------------

import path from "path";

// Adapters
let fs = null;
let db = null;
let routes = null;
let schema = null;

// -----------------------------------------------------------------------------
// PREWARM LAYER (unchanged, uses your new APIs)
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
    console.error("[Deps Prewarm] Failed:", err);
    return emitDepsPacket("prewarm-error", {
      error: String(err),
      message: "OrganismMap layer prewarm failed."
    });
  }
}

// -----------------------------------------------------------------------------
// ASYNC SCAN OF PULSE-* SYSTEMS USING NEW FS API
// -----------------------------------------------------------------------------
async function scanPulseSystems(baseDir) {
  fs = getFsAPI({ trace: false });

  // Get all files in the entire organism root
  const allFiles = await fs.getAllFiles();

  // Filter directories that start with PULSE-
  const pulseSystems = allFiles
    .filter(f => f.type === "dir" && f.name.startsWith("PULSE-"))
    .map(f => f.name);

  const systems = {};

  for (const system of pulseSystems) {
    const systemPath = path.join(baseDir, system);

    // Get all files inside this system folder
    const systemFiles = allFiles.filter(f =>
      f.path.startsWith(systemPath)
    );

    const organs = systemFiles
      .filter(f => f.type === "file" && f.name.endsWith(".js"))
      .map(f => f.name.replace(".js", ""));

    systems[system.toLowerCase()] = {
      root: system,
      organs
    };
  }

  return systems;
}

// -----------------------------------------------------------------------------
// BUILD ORGANISM MAP (ASYNC, NODE-FREE, EVO-CORRECT)
// -----------------------------------------------------------------------------
export async function buildPulseOrganismMap(baseDir = "/") {
  const systems = await scanPulseSystems(baseDir);

  return {
    version: "13‑EVO‑SELF‑DESCRIBING‑ORGANISM",
    generatedAt: new Date().toISOString(),
    systems,

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
}

// -----------------------------------------------------------------------------
// EXPORT — PROMISE (async organism genome)
// -----------------------------------------------------------------------------
export const PulseOrganismMap = await buildPulseOrganismMap("/");
