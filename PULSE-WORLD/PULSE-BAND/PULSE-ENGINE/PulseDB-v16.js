// ============================================================================
// PulseDB-v16.js — IMMORTAL Database Adapter
//  • Append-only collections
//  • Zero mutation of existing records
//  • MemoryOrgan-backed (swappable for real DB later)
//  • Deterministic, drift-proof, lane-agnostic
// ============================================================================

/*
AI_EXPERIENCE_META = {
  identity: "PulseDB",
  version: "v16-IMMORTAL",
  layer: "db_adapter",
  role: "append_only_database",
  lineage: "PulseDB-v14 → PulseDB-v16",

  evo: {
    appendOnly: true,
    driftProof: true,
    zeroMutation: true,
    zeroCompute: true,
    pureStorage: true,
    memoryAware: true
  },

  contract: {
    always: ["MemoryOrgan"],
    never: ["PulseMotionEngine", "ShifterPulse", "routerCore"]
  }
}
*/

/*
PAGE_INDEX = {
  purpose: "Provide append-only collections for PulseCompass and other organs",
  responsibilities: [
    "Create collections",
    "Append records",
    "Read collections",
    "Never mutate existing entries"
  ],
  forbidden: [
    "No compute logic",
    "No pattern logic",
    "No engine logic"
  ]
}
*/

export function createPulseDB({ MemoryOrgan, trace = false } = {}) {
  if (!MemoryOrgan) {
    throw new Error("[PulseDB] MemoryOrgan is required.");
  }

  function ensureCollection(name) {
    const existing = MemoryOrgan.read?.(name);
    if (!Array.isArray(existing)) {
      MemoryOrgan.write?.(name, []);
      if (trace) console.log("[PulseDB] Created collection:", name);
    }
  }

  function append(name, record) {
    ensureCollection(name);
    const col = MemoryOrgan.read?.(name) || [];
    const next = [...col, record];
    MemoryOrgan.write?.(name, next);

    if (trace) console.log("[PulseDB] Appended to", name, record);
  }

  function read(name) {
    ensureCollection(name);
    return MemoryOrgan.read?.(name) || [];
  }

  return Object.freeze({
    append,
    read,
    ensureCollection
  });
}
