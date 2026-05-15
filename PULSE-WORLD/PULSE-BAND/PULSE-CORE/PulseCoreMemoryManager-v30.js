// ============================================================================
// FILE: /PULSE-CORE/PulseCoreMemoryManager-v30.js
// PULSE OS — v30 IMMORTAL++
// MEMORY MANAGER ORGAN — ORCHESTRATOR FOR MEMORY MODE + PULSE-BAND MODE
// BINARY‑FIRST • MAP‑STRIPPED • ZERO META
// ============================================================================
//
// ROLE:
//   The Memory Manager is the governor of memory in Pulse‑World OS.
//   It orchestrates:
//     • Pulse‑Band Memory Mode (normal browser memory)
//     • Memory Mode (future OS-level takeover mode)
//     • Memory flushing
//     • Memory hydration (lightweight in v30)
//     • Memory healing
//     • Drift‑proof snapshots (via CoreMemory snapshots)
//     • Memory pressure detection
//
//   It does NOT replace CoreMemory.
//   It CONTROLS CoreMemory.
//
// CONTRACT:
//   • Pure orchestrator (no DOM, no UI)
//   • Zero network
//   • Deterministic
//   • v30 binary spine compatible
// ============================================================================

import { PulseProofBridge } from "../../PULSE-UI/____BACKEND/PULSE-WORLD-BRIDGE.js";

// ============================================================================
// BRIDGE INTEGRATION — REQUIRED (v30)
// ============================================================================
const CoreMemory   = PulseProofBridge.corememory;   // expected: v30 API (create/read/write/snapshot/clear*)
const CoreSpeech   = PulseProofBridge.corespeech;
const CorePresence = PulseProofBridge.corepresence;
const CoreDaemon   = PulseProofBridge.coredaemon;

// ============================================================================
// IMPLEMENTATION — v30 IMMORTAL++
// ============================================================================
export function PulseCoreMemoryManager_v30() {

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
      const used  = performance.memory?.usedJSHeapSize || 0;
      const total = performance.memory?.jsHeapSizeLimit || 1;
      const pct   = used / total;

      state.pressure = pct;
      return pct;
    } catch {
      state.pressure = 0;
      return 0;
    }
  }

  // ---------------------------------------------------------
  // FLUSH — Clear CoreMemory (Pulse‑Band mode)
// ---------------------------------------------------------
  function flush() {
    try {
      // v30 CoreMemory API: clearAll() on the bridge surface
      CoreMemory.clearAll?.();
    } catch {}
    state.lastFlush = Date.now();
  }

  // ---------------------------------------------------------
  // HYDRATE — v30 (lightweight, no semantic engine)
// ---------------------------------------------------------
  function hydrate() {
    // In v24 this rebuilt semantic memory from speech + daemon.
    // In v30, CoreMemory is binary spine only, so hydration is
    // a light touch: ensure memory is prewarmed and optionally
    // store a minimal presence snapshot if desired.

    try {
      const presenceSnapshot = CorePresence.snapshot?.();
      const daemonSnapshot   = CoreDaemon.snapshot?.();
      const speechMessages   = CoreSpeech.messages?.() || [];

      // Optional: store a tiny hydration marker route
      const inst = CoreMemory.create?.();
      if (inst) {
        inst.set("memory-hydration", "lastPresence", presenceSnapshot || {});
        inst.set("memory-hydration", "lastDaemon", daemonSnapshot || {});
        inst.set("memory-hydration", "lastSpeechCount", speechMessages.length);
      }
    } catch {}

    state.lastHydrate = Date.now();
  }

  // ---------------------------------------------------------
  // HEAL — Drift-proof memory cleanup
  // ---------------------------------------------------------
  function heal() {
    const pressure = detectPressure();

    // If memory pressure is high, flush all routes
    if (pressure > 0.75) {
      try {
        CoreMemory.clearAll?.();
      } catch {}
    }

    // Rehydrate lightweight state
    hydrate();

    state.lastHeal = Date.now();
  }

  // ---------------------------------------------------------
  // SNAPSHOT — Return memory manager + core snapshot
  // ---------------------------------------------------------
  function snapshot() {
    let coreSnapshot = {};
    try {
      // v30 CoreMemory API: snapshot(routeId)
      coreSnapshot = CoreMemory.snapshot?.("global") || {};
    } catch {}

    return {
      mode: state.mode,
      pressure: state.pressure,
      lastFlush: state.lastFlush,
      lastHeal: state.lastHeal,
      lastHydrate: state.lastHydrate,
      core: coreSnapshot
    };
  }

  // ---------------------------------------------------------
  // SWITCH MODE — pulseband ↔ memorymode
  // ---------------------------------------------------------
  function switchMode(mode) {
    if (mode !== "pulseband" && mode !== "memorymode") return;

    state.mode = mode;

    if (mode === "pulseband") {
      // Normal browser memory: heal in place
      heal();
    }

    if (mode === "memorymode") {
      // Future OS-level memory takeover:
      // clear, then hydrate fresh
      flush();
      hydrate();
    }
  }

  // ---------------------------------------------------------
  // PUBLIC API — v30 (META‑STRIPPED, BINARY‑ALIGNED)
// ---------------------------------------------------------
  return {
    mode: () => state.mode,
    pressure: () => state.pressure,

    flush,
    hydrate,
    heal,
    snapshot,
    switchMode
  };
}

export default PulseCoreMemoryManager_v30;
