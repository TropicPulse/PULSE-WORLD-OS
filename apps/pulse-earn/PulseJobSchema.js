// ============================================================================
// FILE: tropic-pulse-functions/apps/pulse-earn/PulseJobSchema.js
// LAYER: THE GENOME CORE
// (Immutable DNA Sequence + Cross‑Organism Law + Eternal Job Contract)
// ============================================================================
//
// ROLE (v7.1+):
//   THE GENOME CORE — the immutable DNA of Pulse‑Earn.
//   • Defines the canonical job structure (genetic sequence).
//   • Establishes the cross‑organism treaty all subsystems must obey.
//   • Guarantees compatibility across every organ in the Earn organism.
//   • Serves as the constitutional backbone of job identity.
//
// WHY “GENOME CORE”?:
//   • It is the highest authority in the biological architecture.
//   • It cannot drift, mutate, fork, or adapt dynamically.
//   • All organs (Heart, Muscle, Nervous System, Immune System, Cells)
//     must obey it without exception.
//   • It defines the structure of every job — permanently.
//
// PURPOSE (v7.1+):
//   • Provide a deterministic, drift‑proof job format.
//   • Ensure universal compatibility across all Earn layers.
//   • Serve as the legal + biological foundation for job execution,
//     routing, metabolism, healing, and archival reconstruction.
//
// CONTRACT (unchanged):
//   • PURE STATIC SCHEMA — no logic, no runtime behavior.
//   • NO dynamic fields, NO optional structural keys.
//   • NO environment‑specific or marketplace‑specific fields.
//   • Immutable across versions unless explicitly ratified
//     (constitutional amendment).
//
// SAFETY (unchanged):
//   • v7.1+ upgrade is COMMENTAL ONLY — NO LOGIC CHANGES.
//   • All behavior remains identical to pre‑v7.1 schema.
//   • This file is the *one place* where immutability is required.
// ============================================================================

export const PulseJobSchema = {
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
  timestamp: "number"     // Job assignment time (genetic activation moment)
};
