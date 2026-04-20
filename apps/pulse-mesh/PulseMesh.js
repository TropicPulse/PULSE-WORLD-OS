// ============================================================================
// [pulse:mesh] COMMUNITY_SPINE_LAYER v7.4  // teal
// Distributed Routing Spine • Reflex + Cortex + Tendons • Metadata-Only
// ============================================================================
//
// IDENTITY — THE SPINE:
//  ---------------------
//  • Routes impulses between nodes (devices, services, earners).
//  • Applies 1/0 reflex at each hop (instinct-style filtering).
//  • Applies cortex shaping (risk, novelty, cooperation, load).
//  • Applies tendon shaping (intent, routeHint, energy shaping).
//  • Accumulates mesh metadata: hops, score, energy, routeHint.
//  • NEVER mutates payload data, NEVER performs compute.
//
// THEME:
//  • Color: Teal (conduction, routing, distributed coherence).
//  • Subtheme: Flow, traversal, organism-wide conduction.
//
// SAFETY CONTRACT:
//  • Metadata-only.
//  • No payload access.
//  • No compute.
//  • No autonomy.
//  • Deterministic, drift-proof routing behavior.
//
// ADVANTAGE CASCADE (conceptual only):
//  ------------------------------------
//  • Inherits ANY advantage from ANY organ automatically.
//  • Dual-mode: mental clarity + system efficiency.
//  • Local-aware: node-level routing context.
//  • Internet-aware: cluster/mesh/global routing context.
//  • Unified-advantage-field: ALL advantages active unless unsafe.
//  • Future-evolution-ready: new safe advantages auto-inherited.
// ============================================================================

import { createCommunityReflex } from "./CommunityReflex.js";
import { applyPulseCortex } from "./PulseCortex.js";
import { applyTendons } from "./Tendons.js";

// -----------------------------------------------------------
// Mesh Factory
// -----------------------------------------------------------

export function createPulseMesh() {
  return {
    nodes: new Map(),
    reflex: createCommunityReflex(),

    meta: {
      layer: "PulseMeshSpine",
      role: "ROUTING_SPINE",
      version: 7.4,
      target: "full-mesh",
      selfRepairable: true,
      evo: {
        dualMode: true,                 // mental + system
        localAware: true,               // node-level routing
        internetAware: true,            // cluster/mesh/global routing

        advantageCascadeAware: true,    // inherits ANY advantage
        pulseEfficiencyAware: true,     // 1-pulse collapse
        driftProof: true,
        multiInstanceReady: true,

        unifiedAdvantageField: true,    // no OR; all advantages ON
        futureEvolutionReady: true      // new safe advantages auto-inherited
      },

      // v7.4: conceptual reach metadata (for dashboards / PulseBand)
      reach: {
        estimatedHops: 0,
        estimatedMeters: 0,
        mode: "direct" // "direct" | "cluster" | "wide"
      }
    }
  };
}

// -----------------------------------------------------------
// Node Registration
// -----------------------------------------------------------

export function registerMeshNode(mesh, nodeConfig) {
  if (!nodeConfig?.id) {
    throw new Error("[pulse:mesh] nodeConfig.id required");
  }

  mesh.nodes.set(nodeConfig.id, {
    id: nodeConfig.id,
    kind: nodeConfig.kind || "service",
    neighbors: nodeConfig.neighbors || [],
    reflex: nodeConfig.reflex || mesh.reflex,
    trustLevel: nodeConfig.trustLevel ?? 0.5,
    load: nodeConfig.load ?? 0.0
  });

  return mesh;
}

// -----------------------------------------------------------
// Routing Entry Point
// -----------------------------------------------------------

export function routeImpulse(mesh, impulse, entryNodeId, context = {}) {
  impulse.flags = impulse.flags || {};
  impulse.flags.mesh_meta = mesh.meta;

  const visited = new Set();
  let currentNodeId = entryNodeId;

  while (currentNodeId) {
    const node = mesh.nodes.get(currentNodeId);
    if (!node) break;

    visited.add(currentNodeId);

    // update hops
    impulse.hops = (impulse.hops || 0) + 1;

    // -------------------------------------------------------
    // 1. REFLEX (1/0 instinct)
    // -------------------------------------------------------
    const decision = node.reflex(impulse, node);
    if (decision === 0) {
      impulse.flags[`reflex_drop_at_${node.id}`] = true;
      break;
    }

    // -------------------------------------------------------
    // 2. CORTEX (strategic shaping)
    // -------------------------------------------------------
    applyPulseCortex(impulse, {
      ...context,
      globalLoad: node.load,
      trustLevel: node.trustLevel
    });

    // -------------------------------------------------------
    // 3. TENDONS (intent + routeHint + energy shaping)
    // -------------------------------------------------------
    applyTendons(impulse);

    // -------------------------------------------------------
    // 4. Energy decay (instinctive fatigue)
    // -------------------------------------------------------
    impulse.energy =
      typeof impulse.energy === "number" ? impulse.energy * 0.9 : 0.9;

    if (impulse.energy <= 0.05) {
      impulse.flags.mesh_energy_exhausted = true;
      break;
    }

    // -------------------------------------------------------
    // 5. Earner delivery check
    // -------------------------------------------------------
    if (node.kind === "earner" && shouldDeliverToEarner(impulse, node)) {
      impulse.flags[`delivered_to_${node.id}`] = true;
      break;
    }

    // -------------------------------------------------------
    // 6. Next hop selection
    // -------------------------------------------------------
    const nextId = node.neighbors.find((n) => !visited.has(n));

    if (!nextId) {
      impulse.flags[`stalled_at_${node.id}`] = true;
      break;
    }

    currentNodeId = nextId;
  }

  return impulse;
}

// -----------------------------------------------------------
// Earner Targeting Helper
// -----------------------------------------------------------

function shouldDeliverToEarner(impulse, node) {
  const hint = impulse.routeHint;
  if (!hint) return true;

  if (hint === node.id) return true;
  if (hint === node.kind) return true;

  return false;
}

// -----------------------------------------------------------
// v7.4 — Mesh Reach Snapshot (Metadata-Only)
// -----------------------------------------------------------

export function getMeshReachSnapshot(mesh) {
  const nodeCount = mesh.nodes.size;
  const avgDegree =
    nodeCount === 0
      ? 0
      : Array.from(mesh.nodes.values()).reduce(
          (sum, n) => sum + (n.neighbors?.length || 0),
          0
        ) / nodeCount;

  // Conceptual estimates only — no real RF / geo compute
  const estimatedHops = Math.max(1, Math.round(avgDegree || 1));
  const estimatedMeters = estimatedHops * 30; // conceptual: ~30m per hop

  let mode = "direct";
  if (estimatedHops >= 3 && estimatedHops < 6) mode = "cluster";
  if (estimatedHops >= 6) mode = "wide";

  const reach = {
    estimatedHops,
    estimatedMeters,
    mode
  };

  return {
    layer: mesh.meta.layer,
    role: mesh.meta.role,
    version: mesh.meta.version,
    nodeCount,
    avgDegree,
    reach
  };
}
