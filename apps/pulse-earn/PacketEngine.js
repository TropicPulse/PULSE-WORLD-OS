// ============================================================================
// FILE: tropic-pulse-functions/apps/pulse-earn/PacketEngine.js
// LAYER: THE GENETIC MEMORY
// (Keeper of Packets + Guardian of Determinism + DNA Repair Substrate)
// ============================================================================
//
// ROLE (v7.1+):
//   THE GENETIC MEMORY — Pulse‑Earn’s deterministic packet genome.
//   • Stores packet data in a safe, in‑memory gene archive.
//   • Generates deterministic packet values (genetic identity → future).
//   • Ensures reproducibility for healing + compute (DNA stability).
//   • Maintains packet‑level healing metadata (genetic health).
//
// WHY “GENETIC MEMORY”?:
//   • Packets behave like genes: smallest units of truth.
//   • Deterministic hashing = genetic identity function.
//   • Regeneration = DNA repair (EarnHealer uses this).
//   • PacketStore = genome map (in‑memory chromosome).
//
// PURPOSE (v7.1+):
//   • Provide a deterministic, drift‑proof genetic layer.
//   • Guarantee safe read/write/compute operations.
//   • Serve as the foundation for EarnHealer’s DNA repair logic.
//   • Preserve genetic lineage + deterministic reconstruction.
//
// CONTRACT (unchanged):
//   • PURE PACKET ENGINE — no AI layers, no translation, no memory model.
//   • NO eval(), NO Function(), NO dynamic imports.
//   • NO network calls, NO filesystem, NO external mutation.
//   • Deterministic hashing + safe in‑memory storage only.
//
// SAFETY (unchanged):
//   • v7.1+ upgrade is COMMENTAL ONLY — NO LOGIC CHANGES.
//   • All behavior remains identical to pre‑v7.1 PacketEngine.
// ============================================================================

// ---------------------------------------------------------------------------
// Healing Metadata — Genetic Health Log
// ---------------------------------------------------------------------------
const healingState = {
  lastKey: null,           // last gene accessed
  lastWrite: null,         // last gene written
  lastGenerated: null,     // last gene synthesized
  lastError: null,         // genetic fault
  cycleCount: 0,           // DNA cycles completed
  lastTimestamp: null,     // last genetic event
};

// ---------------------------------------------------------------------------
// In‑Memory Genome — Packet Store (Chromosome Map)
// ---------------------------------------------------------------------------
const packetStore = new Map();

// ---------------------------------------------------------------------------
// 1. readPacketExists — Genome Lookup
// ---------------------------------------------------------------------------
export async function readPacketExists(fileId, packetIndex) {
  healingState.cycleCount++;
  healingState.lastTimestamp = Date.now();

  try {
    const key = `${fileId}:${packetIndex}`;
    healingState.lastKey = key;

    // NOTE: Genome lookup — checking if gene exists
    return packetStore.has(key);

  } catch (err) {
    healingState.lastError = err.message;
    return false;
  }
}

// ---------------------------------------------------------------------------
// 2. writePacket — DNA Write (Gene Expression)
// ---------------------------------------------------------------------------
export async function writePacket(fileId, packetIndex, data) {
  healingState.cycleCount++;
  healingState.lastTimestamp = Date.now();

  try {
    const key = `${fileId}:${packetIndex}`;
    healingState.lastKey = key;

    // NOTE: Gene expression — writing deterministic genetic material
    packetStore.set(key, structuredClone(data));

    healingState.lastWrite = { key, size: JSON.stringify(data).length };
    healingState.lastError = null;

    return true;

  } catch (err) {
    healingState.lastError = err.message;
    return false;
  }
}

// ---------------------------------------------------------------------------
// 3. generatePacketData — Deterministic DNA Synthesis
// ---------------------------------------------------------------------------
export async function generatePacketData(fileId, packetIndex) {
  healingState.cycleCount++;
  healingState.lastTimestamp = Date.now();

  try {
    const key = `${fileId}:${packetIndex}`;
    healingState.lastKey = key;

    // Deterministic FNV‑1a hash → genetic identity
    let hash = 2166136261;
    for (let i = 0; i < key.length; i++) {
      hash ^= key.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }

    const value = (hash >>> 0) / 0xffffffff;

    const packet = {
      fileId,
      packetIndex,
      key,
      value,
      generatedAt: Date.now(), // DNA synthesis timestamp
    };

    healingState.lastGenerated = packet;
    healingState.lastError = null;

    return packet;

  } catch (err) {
    healingState.lastError = err.message;
    return null;
  }
}

// ---------------------------------------------------------------------------
// Export Healing Metadata — Genetic Health Report
// ---------------------------------------------------------------------------
export function getPacketEngineHealingState() {
  return { ...healingState };
}
