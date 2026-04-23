// ============================================================================
//  PULSE OS — ACTNow v10.4
//  ADRENAL REFLEX LOOP — “ACT NOW”
//  White/Silver Organ • Reflex • Renewal • Non‑Interference
// ============================================================================
//
//  THIS ORGAN HAS ZERO IMPORTS.
//  ALL dependencies are injected by the CNS Brain.
//  PURE REFLEX. ZERO COGNITION. ZERO NETWORK. ZERO BACKEND.
//  DETERMINISTIC LOOP-THEORY COMPLIANT.
// ============================================================================

export function createACTNow({
  PulseImmunity,
  PulseSurgeonGeneral,
  PulseEventBus,
  log,
  error
}) {

  return {

    intervalMs: 5000,
    running: false,
    timer: null,

    meta: {
      layer: "ACTNow",
      role: "HEARTBEAT_LOOP",
      version: "10.4",
      generation: "v10",
      color: "white-silver",
      theme: "renewal",

      driftProof: true,
      selfRepairable: true,
      futureEvolutionReady: true,
      multiInstanceReady: true,
      reflexPure: true,
      zeroNetwork: true,
      zeroBackend: true,
      zeroCognition: true,

      evo: {
        deterministicNeuron: true,
        deterministicCycle: true,
        advantageCascadeAware: true,
        unifiedAdvantageField: true,
        pulseEfficiencyAware: true,
        zeroMutationOutsideOrgan: true,
        loopTheoryAware: true,
        continuanceAware: true,

        // Conceptual compatibility (no logic impact)
        routingContract: "PulseSendSystem-v10.4",
        osOrganContract: "PulseOS-v10.4",
        earnCompatibility: "PulseEarn-v10.4"
      }
    },

    // ----------------------------------------------------------
    // START LOOP — deterministic reflex activation
    // ----------------------------------------------------------
    start(snapshotProvider) {
      if (this.running) return;

      this.running = true;

      this.timer = setInterval(async () => {
        try {
          await this.cycle(snapshotProvider);
        } catch (err) {
          error("[ACTNow] Cycle error:", err);
        }
      }, this.intervalMs);

      log("[ACTNow] Heartbeat loop started.");
    },

    // ----------------------------------------------------------
    // STOP LOOP — reflex shutdown
    // ----------------------------------------------------------
    stop() {
      if (!this.running) return;

      clearInterval(this.timer);
      this.running = false;

      log("[ACTNow] Heartbeat loop stopped.");
    },

    // ----------------------------------------------------------
    // ONE FULL CYCLE — pure reflex, no cognition
    // ----------------------------------------------------------
    async cycle(snapshotProvider) {
      const snapshot = await snapshotProvider();
      if (!snapshot) return;

      // Reflex immune analysis
      const analysis = PulseImmunity.analyze(snapshot);

      // Surgeon General command (deterministic)
      const report = await PulseSurgeonGeneral.command(analysis);

      // Emit immune update
      PulseEventBus.emit("immune:update", {
        meta: this.meta,
        analysis,
        report,
        timestamp: Date.now()
      });

      log("[ACTNow] Cycle complete.");
    }
  };
}
