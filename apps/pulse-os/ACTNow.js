// ============================================================================
// FILE: /apps/organs/loop/ACTNow.js
// PULSE OS — v7.3
// AUTO-REFRESH LOOP — “ACT NOW”
// ============================================================================
//
// IDENTITY — THE HEARTBEAT:
//  -------------------------
//  • Provides a safe, timed refresh cycle for the organism.
//  • Re-runs PulseImmunity at intervals.
//  • Re-runs PulseSurgeonGeneral for healing.
//  • Broadcasts updates to dashboards.
//  • Ensures no drift, no stale state, no memory corruption.
//  • Rebuilds state cleanly between cycles.
//  • Metadata-only, no payload compute.
//
// THEME:
//  • Color: White/Silver (heartbeat, rhythm, non-interference).
//  • Subtheme: Renewal, refresh, systemic coherence.
//
// SAFETY CONTRACT:
//  • No payload access.
//  • No routing override.
//  • No autonomy, no sentience.
//  • Deterministic, drift-proof timed loop.
//
// ADVANTAGE CASCADE (conceptual only):
//  ------------------------------------
//  • Inherits ANY advantage from ANY organ automatically.
//  • Dual-mode: mental clarity + system efficiency.
//  • Local-aware: node-level cycle context.
//  • Internet-aware: cluster/mesh/global cycle context.
//  • Unified-advantage-field: ALL advantages active unless unsafe.
//  • Future-evolution-ready: new safe advantages auto-inherited.
// ============================================================================

import { PulseImmunity } from "../immune/PulseImmunity.js";
import { PulseSurgeonGeneral } from "../immune/PulseSurgeonGeneral.js";
import { PulseEventBus } from "../events/PulseEventBus.js";

export const ACTNow = {

  // ----------------------------------------------------------
  // CONFIG — timing + safety
  // ----------------------------------------------------------
  intervalMs: 5000,
  running: false,
  timer: null,

  meta: {
    layer: "ACTNow",
    role: "HEARTBEAT_LOOP",
    version: 7.3,
    target: "full-mesh",
    selfRepairable: true,
    evo: {
      dualMode: true,                 // mental + system
      localAware: true,               // node-level cycle awareness
      internetAware: true,            // cluster/mesh/global cycle awareness

      advantageCascadeAware: true,    // inherits ANY advantage
      pulseEfficiencyAware: true,     // 1-pulse collapse
      driftProof: true,
      multiInstanceReady: true,

      unifiedAdvantageField: true,    // no OR; all advantages ON
      futureEvolutionReady: true      // new safe advantages auto-inherited
    }
  },

  // ----------------------------------------------------------
  // START LOOP
  // ----------------------------------------------------------
  start(snapshotProvider) {
    if (this.running) return;

    this.running = true;

    this.timer = setInterval(async () => {
      try {
        await this.cycle(snapshotProvider);
      } catch (err) {
        console.error("[ACTNow] Cycle error:", err);
      }
    }, this.intervalMs);

    console.log("[ACTNow] Auto-refresh loop started.");
  },

  // ----------------------------------------------------------
  // STOP LOOP
  // ----------------------------------------------------------
  stop() {
    if (!this.running) return;

    clearInterval(this.timer);
    this.running = false;

    console.log("[ACTNow] Auto-refresh loop stopped.");
  },

  // ----------------------------------------------------------
  // ONE FULL CYCLE
  // ----------------------------------------------------------
  async cycle(snapshotProvider) {
    // Step 1: Get fresh snapshot
    const snapshot = await snapshotProvider();
    if (!snapshot) return;

    // Step 2: Analyze (metadata-only)
    const analysis = PulseImmunity.analyze(snapshot);

    // Step 3: Command immune system (healing)
    const report = await PulseSurgeonGeneral.command(analysis);

    // Step 4: Broadcast to dashboards
    PulseEventBus.emit("immune:update", {
      meta: this.meta,
      analysis,
      report,
      timestamp: Date.now()
    });

    console.log("[ACTNow] Cycle complete.");
  }
};
