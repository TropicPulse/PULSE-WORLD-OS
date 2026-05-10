// ============================================================================
//  PULSE OS v15.0-MESH-ORGANS-Evo — SURVIVAL / MESH ORGANS LAYER  // orange
//  “Functional Organ Map of the Mesh Body”
//  Capability Signatures • Deterministic Organ Matching • Metadata-Only
// ============================================================================
//
// IDENTITY (v15.0):
// ------------------
// • Maps impulses to functional + mesh organs (storage, routing, security,
//   earnPrep, binaryPrep, meshSignal, presence, meshFlow, meshCognition,
//   meshAwareness).
// • Pure metadata-only classification — zero payload mutation.
// • Deterministic-field, drift-proof, SDN-aligned.
// • No pressure gating.
// • Multi-instance-ready, unified-advantage-field,
//   binary-aware, dual-mode-ready, presence-aware, mesh-aware.
// ============================================================================
import {
  OrganismIdentity,
  buildPulseOrganismMap as buildOrganismMap
} from "../PULSE-X/PulseWorldOrganismMap-v21.js";
const Identity = OrganismIdentity(import.meta.url);

// 2 — EXPORT GENOME METADATA
// export const PulseMeshMeta = Identity.OrganMeta;
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
// export const PULSE_EARN_IMMUNE_CONTEXT = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

export function createPulseOrgans() {

  // -------------------------------------------------------
  // IMMORTAL META (v15)
  // -------------------------------------------------------
  const organMeta = {
    layer: "PulseOrgans",
    role: "FUNCTIONAL_ORGAN_MAP",
    version: "15.0-MESH-ORGANS-Evo-Immortal",
    target: "full-mesh",
    selfRepairable: true,
    evo: {
      dualMode: true,
      binaryAware: true,
      symbolicAware: true,
      presenceAware: true,
      bandAware: true,
      localAware: true,
      internetAware: true,

      advantageCascadeAware: true,
      pulseEfficiencyAware: true,
      driftProof: true,
      multiInstanceReady: true,

      unifiedAdvantageField: true,
      deterministicField: true,
      futureEvolutionReady: true,

      signalFactoringAware: true,
      meshPressureAware: true,
      auraPressureAware: true,
      meshAware: true,

      zeroCompute: true,
      zeroMutation: true,
      zeroRoutingInfluence: true
    }
  };


  // -------------------------------------------------------
  // ORGAN DEFINITIONS (v15 IMMORTAL)
  // -------------------------------------------------------
  const PulseOrgans = {

    storage: {
      id: "organ-storage",
      lineage: "mesh-storage-v15",
      capabilities: ["store", "retrieve", "index"],
      match(impulse) {
        return impulse.flags?.cortex_intent === "normal";
      }
    },

    routing: {
      id: "organ-routing",
      lineage: "mesh-routing-v15",
      capabilities: ["route", "shape", "classify"],
      match(impulse) {
        return impulse.flags?.cortex_intent === "push_hard" ||
               impulse.score >= 0.7;
      }
    },

    security: {
      id: "organ-security",
      lineage: "mesh-security-v15",
      capabilities: ["validate", "verify", "protect"],
      match(impulse) {
        return impulse.flags?.cortex_anomaly ||
               impulse.flags?.cortex_factoring_anomaly ||
               impulse.flags?.cortex_flow_anomaly;
      }
    },

    earnPrep: {
      id: "organ-earnprep",
      lineage: "mesh-earnprep-v15",
      capabilities: ["prepare", "shape_intent", "assign_earner"],
      match(impulse) {
        return typeof impulse.routeHint === "string" &&
               impulse.routeHint.startsWith("earner-");
      }
    },

    binaryPrep: {
      id: "organ-binaryprep",
      lineage: "mesh-binaryprep-v15",
      capabilities: ["binary_prepare", "binary_shape", "binary_assign"],
      match(impulse) {
        return impulse.flags?.binary_mode === true ||
               impulse.band === "binary" ||
               impulse.flags?.hormone_prefers_binary === true;
      }
    },

    meshSignal: {
      id: "organ-meshsignal",
      lineage: "mesh-signal-v15",
      capabilities: ["mesh_signal", "mesh_factor", "mesh_trace"],
      match(impulse) {
        return impulse.flags?.aura_prefers_factored_paths ||
               impulse.flags?.mesh_signal ||
               impulse.flags?.aura_system_under_tension ||
               impulse.flags?.hormone_factoring_pressure ||
               impulse.band === "dual";
      }
    },

    presence: {
      id: "organ-presence",
      lineage: "mesh-presence-v15",
      capabilities: ["presence_shape", "presence_tag", "presence_band"],
      match(impulse) {
        return typeof impulse.band === "string" &&
               ["binary", "symbolic", "dual"].includes(impulse.band);
      }
    },

    meshFlow: {
      id: "organ-meshflow",
      lineage: "mesh-flow-v15",
      capabilities: ["mesh_flow_tag", "mesh_flow_shape"],
      match(impulse) {
        return impulse.flags?.mesh_flow ||
               impulse.flags?.mesh_topology_change ||
               impulse.flags?.mesh_lane_activity ||
               impulse.flags?.hormone_mesh_storm_pressure;
      }
    },

    meshCognition: {
      id: "organ-meshcognition",
      lineage: "mesh-cognition-v15",
      capabilities: ["mesh_cognition_tag", "mesh_reasoning_tag"],
      match(impulse) {
        return impulse.flags?.mesh_cognition ||
               impulse.flags?.mesh_decision ||
               impulse.flags?.mesh_coordinator_signal ||
               impulse.flags?.hormone_dual_mode_ready;
      }
    },

    meshAwareness: {
      id: "organ-meshawareness",
      lineage: "mesh-awareness-v15",
      capabilities: ["mesh_awareness_tag", "mesh_presence_tag"],
      match(impulse) {
        return impulse.flags?.mesh_presence ||
               impulse.flags?.mesh_state_probe ||
               impulse.flags?.mesh_observe_only ||
               impulse.flags?.hormone_presence_dual_pressure;
      }
    }
  };


  // ========================================================================
  // ORGAN ENGINE (v15 IMMORTAL)
  // ========================================================================
  function applyPulseOrgans(impulse) {
    impulse = impulse || {};
    impulse.flags = impulse.flags || {};
    impulse.organs = impulse.organs || [];

    impulse.flags.organ_meta = organMeta;

    for (const key of Object.keys(PulseOrgans)) {
      const organ = PulseOrgans[key];
      if (organ.match(impulse)) {
        impulse.organs.push(organ.id);

        impulse.flags[`organ_${organ.id}`] = true;
        impulse.flags[`organ_lineage_${organ.id}`] = organ.lineage;
      }
    }

    return impulse;
  }

  return {
    apply: applyPulseOrgans,
    organs: PulseOrgans,
    meta: organMeta
  };
}
