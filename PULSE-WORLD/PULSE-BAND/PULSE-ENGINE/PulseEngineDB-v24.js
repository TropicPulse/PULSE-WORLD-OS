// ============================================================================
// PulseDB-v24-Immortal-Evo+++.js — IMMORTAL Append-Only Database Adapter
//  • Append-only collections (never mutate existing entries)
//  • MemoryOrgan-backed (swappable for real DB later)
//  • Session-aware, envelope-aware, diagnostics-aware
//  • Drift-proof, deterministic, zero-compute, zero-mutation
//  • v24 schema discipline + trust-fabric tagging
// ============================================================================
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝

// 2 — EXPORT GENOME METADATA
// export const PulseEarnCustomReceptorMeta = Identity.OrganMeta;
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
// export const PULSE_EARN_IMMUNE_CONTEXT = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

export function createPulseDB({
  MemoryOrgan,
  trace = false,
  sessionId = null
} = {}) {
  if (!MemoryOrgan) {
    throw new Error("[PulseDB-v24] MemoryOrgan is required.");
  }

  // ---------------------------------------------------------------------------
  // INTERNAL: deterministic envelope builder
  // ---------------------------------------------------------------------------
  function buildEnvelope(record) {
    return {
      ...record,
      sessionId: sessionId || null,
      schemaVersion: "v24",
      version: "24.0-Immortal-Evo+++",
      timestamp: Date.now(),
      trustFabric: "pulse:immortal:evo+++"
    };
  }

  // ---------------------------------------------------------------------------
  // Ensure collection exists (append-only)
  // ---------------------------------------------------------------------------
  function ensureCollection(name) {
    const existing = MemoryOrgan.read?.(name);
    if (!Array.isArray(existing)) {
      MemoryOrgan.write?.(name, []);
      if (trace && typeof console !== "undefined") {
        console.log("[PulseDB-v24] Created collection:", name);
      }
    }
  }

  // ---------------------------------------------------------------------------
  // Append record (never mutate existing entries)
  // ---------------------------------------------------------------------------
  function append(name, record) {
    ensureCollection(name);

    const col = MemoryOrgan.read?.(name) || [];
    const entry = buildEnvelope(record);
    const next = [...col, entry];

    MemoryOrgan.write?.(name, next);

    if (trace && typeof console !== "undefined") {
      console.log("[PulseDB-v24] Appended to", name, entry);
    }
  }

  // ---------------------------------------------------------------------------
  // Read collection (always returns array)
  // ---------------------------------------------------------------------------
  function read(name) {
    ensureCollection(name);
    return MemoryOrgan.read?.(name) || [];
  }

  // ---------------------------------------------------------------------------
  // Public API
  // ---------------------------------------------------------------------------
  return Object.freeze({
    append,
    read,
    ensureCollection
  });
}
