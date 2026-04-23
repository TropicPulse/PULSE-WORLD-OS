// ============================================================================
// FILE: tropic-pulse-functions/apps/pulse-earn/PulseEarnGenome.js
// LAYER: THE GENOME CORE (v10.4)
// (Immutable DNA Sequence + Cross‑Organism Law + Eternal Job Contract)
// ============================================================================
//
// ROLE (v10.4):
//   THE GENOME CORE — the immutable DNA of Pulse‑Earn.
//   • Defines the canonical job structure (genetic sequence).
//   • Establishes the cross‑organism treaty all subsystems must obey.
//   • Guarantees compatibility across every organ in the Earn organism.
//   • Serves as the constitutional backbone of job identity.
//
// PURPOSE (v10.4):
//   • Provide a deterministic, drift‑proof job format.
//   • Ensure universal compatibility across all Earn layers.
//   • Serve as the legal + biological foundation for job execution,
//     routing, metabolism, healing, and archival reconstruction.
//
// CONTRACT (v10.4):
//   • PURE STATIC SCHEMA — no logic, no runtime behavior.
//   • NO dynamic fields, NO optional structural keys.
//   • NO timestamps, NO environment‑dependent fields.
//   • Immutable across versions unless explicitly ratified.
// ============================================================================

export const PulseEarnJobSchema = {
  id: "string", // Unique job ID (genetic locus)

  payload: {
    type: "string", // Job category (genetic phenotype)
    data: "any",    // Raw job data (genetic payload)

    gpu: {
      workgroupSize: "number", // GPU workgroup size (muscle fiber allocation)
      iterations: "number",    // Compute passes (metabolic cycles)
      shader: "string"         // WGSL shader source (empty for non-GPU jobs)
    }
  },

  marketplace: "string", // Job origin (environmental source)
  assignedTo: "deviceId", // Worker device ID (cell assignment)

  // v10.4: deterministic cycle index replaces nondeterministic timestamp
  cycleIndex: "number" // Genetic activation cycle (deterministic)
};
