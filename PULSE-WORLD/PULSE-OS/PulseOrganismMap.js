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

import fs from "fs";
import path from "path";

// -----------------------------------------------------------------------------
// Scan all PULSE-* systems and extract their organs
// -----------------------------------------------------------------------------
function scanPulseSystems(baseDir) {
  const entries = fs.readdirSync(baseDir, { withFileTypes: true });

  const pulseSystems = entries
    .filter(e => e.isDirectory() && e.name.startsWith("PULSE-"))
    .map(e => e.name);

  const systems = {};

  for (const system of pulseSystems) {
    const systemPath = path.join(baseDir, system);
    const files = fs.readdirSync(systemPath, { withFileTypes: true });

    const organs = files
      .filter(f => f.isFile() && f.name.endsWith(".js"))
      .map(f => f.name.replace(".js", ""));

    systems[system.toLowerCase()] = {
      root: system,
      organs
    };
  }

  return systems;
}

// -----------------------------------------------------------------------------
// Build the full organism map (v12.4+ / v13-EVO)
// -----------------------------------------------------------------------------
export function buildPulseOrganismMap(baseDir = process.cwd()) {
  return {
    version: "12.4‑EVO‑SELF‑DESCRIBING‑ORGANISM",
    generatedAt: new Date().toISOString(),

    // The REAL organism: discovered from filesystem
    systems: scanPulseSystems(baseDir),

    // Lineage metadata (kept because it describes evolution, not structure)
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
// EXPORT: This IS the organism genome.
// -----------------------------------------------------------------------------
export const PulseOrganismMap = buildPulseOrganismMap();
