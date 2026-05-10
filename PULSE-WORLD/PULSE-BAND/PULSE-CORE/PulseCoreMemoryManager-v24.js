// ============================================================================
// FILE: /PULSE-CORE/PulseCoreMemoryManager-v24.js
// PULSE OS — v24 IMMORTAL
// MEMORY MANAGER ORGAN — ORCHESTRATOR FOR MEMORY MODE + PULSE-BAND MODE
// ============================================================================
//
// ROLE:
//   The Memory Manager is the *governor* of memory in Pulse‑World OS.
//   It orchestrates:
//     • Pulse‑Band Memory Mode (normal browser memory)
//     • Memory Mode (future OS-level takeover mode)
//     • Memory flushing
//     • Memory hydration
//     • Memory prewarming
//     • Memory healing
//     • Drift-proof snapshots
//     • Memory pressure detection
//     • Memory routing for GPU / Proxy / Daemon
//
//   It does NOT replace CoreMemory.
//   It CONTROLS CoreMemory.
//
// CONTRACT:
//   • Pure orchestrator (no DOM, no UI)
//   • Zero network
//   • Deterministic
//   • Evolvable to OS-level memory control
// ============================================================================

import { OrganismIdentity } from "../PULSE-X/PulseWorldOrganismMap-v21.js";
import { PulseProofBridge } from "../../PULSE-UI/_BACKEND/PULSE-WORLD-BRIDGE.js";
const Identity = OrganismIdentity(import.meta.url);

// ============================================================================
//  META BLOCK — v24 IMMORTAL (from genome)
// ============================================================================
export const PulseCoreMemoryManagerMeta = Identity.OrganMeta;

// ============================================================================
//  SURFACE / ORGANISM LAYER EXPORTS — v24 IMMORTAL
// ============================================================================
export const pulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;

export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

// ============================================================================
// BRIDGE INTEGRATION — REQUIRED
// ============================================================================
const CoreMemory   = PulseProofBridge.corememory;
const CoreSpeech   = PulseProofBridge.corespeech;
const CorePresence = PulseProofBridge.corepresence;
const CoreDaemon   = PulseProofBridge.coredaemon;

// ============================================================================
// IMPLEMENTATION — v24 IMMORTAL++
// ============================================================================
export function PulseCoreMemoryManager() {

  // ---------------------------------------------------------
  // INTERNAL STATE
  // ---------------------------------------------------------
  const state = {
    mode: "pulseband", // "pulseband" | "memorymode"
    lastFlush: 0,
    lastHeal: 0,
    lastHydrate: 0,
    pressure: 0
  };

  // ---------------------------------------------------------
  // MEMORY PRESSURE DETECTION
  // ---------------------------------------------------------
  function detectPressure() {
    try {
      const used = performance.memory?.usedJSHeapSize || 0;
      const total = performance.memory?.jsHeapSizeLimit || 1;
      const pct = used / total;

      state.pressure = pct;
      return pct;
    } catch {
      return 0;
    }
  }

  // ---------------------------------------------------------
  // FLUSH — Clear CoreMemory (Pulse‑Band mode)
  // ---------------------------------------------------------
  function flush() {
    CoreMemory.clearAll();
    state.lastFlush = Date.now();
  }

  // ---------------------------------------------------------
  // HYDRATE — Rebuild semantic memory from speech + daemon
  // ---------------------------------------------------------
  function hydrate() {
    CoreMemory.engine.fullScan({
      speech: CoreSpeech.messages(),
      presence: CorePresence.snapshot(),
      daemon: CoreDaemon.snapshot()
    });

    state.lastHydrate = Date.now();
  }

  // ---------------------------------------------------------
  // HEAL — Drift-proof memory cleanup
  // ---------------------------------------------------------
  function heal() {
    const pressure = detectPressure();

    // If memory pressure is high, flush old routes
    if (pressure > 0.75) {
      CoreMemory.clearAll();
    }

    // Rehydrate semantic memory
    hydrate();

    state.lastHeal = Date.now();
  }

  // ---------------------------------------------------------
  // SNAPSHOT — Return full memory state
  // ---------------------------------------------------------
  function snapshot() {
    return {
      mode: state.mode,
      pressure: state.pressure,
      lastFlush: state.lastFlush,
      lastHeal: state.lastHeal,
      lastHydrate: state.lastHydrate,
      semantic: CoreMemory.graph(),
      timeline: CoreMemory.timeline()
    };
  }

  // ---------------------------------------------------------
  // SWITCH MODE — pulseband ↔ memorymode
  // ---------------------------------------------------------
  function switchMode(mode) {
    if (mode !== "pulseband" && mode !== "memorymode") return;

    state.mode = mode;

    if (mode === "pulseband") {
      // Normal browser memory
      heal();
    }

    if (mode === "memorymode") {
      // Future OS-level memory takeover
      flush();
      hydrate();
    }
  }

  // ---------------------------------------------------------
  // PUBLIC API
  // ---------------------------------------------------------
  return {
    meta: PulseCoreMemoryManagerMeta,
    pulseRole,
    surfaceMeta,
    pulseLoreContext,
    AI_EXPERIENCE_META,
    EXPORT_META,

    mode: () => state.mode,
    pressure: () => state.pressure,
    flush,
    hydrate,
    heal,
    snapshot,
    switchMode
  };
}
