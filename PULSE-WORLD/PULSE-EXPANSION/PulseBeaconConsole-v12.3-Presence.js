// ============================================================================
// PULSE-WORLD : PulseBeaconConsole.js
// ROLE: Global expansion console + Overmind control surface
// VERSION: v12.3-PRESENCE-EVO+
// ============================================================================
//
// PURPOSE:
//   This page is the "brain" of PulseWorld expansion.
//   It controls global hints, modes, payload shaping, and expansion pulses.
//
//   It consumes:
//     - beacon.getStateSnapshot()
//     - beacon.getGlobalHints()
//     - beacon.setGlobalHints()
//     - beacon.applyDirective()
//     - beacon.updatePayloadFromContext()
//     - beacon.broadcastOnce()
//
//   It produces:
//     - global organism hints (fallback/chunk/cache/prewarm/advantage/presence)
//     - mode changes
//     - payload updates
//     - expansion pulses
//
// CONTRACT:
//   - Never compute signal shaping.
//   - Never compute presence fields.
//   - Never mutate engine internals.
//   - Only call Beacon Engine APIs.
//   - Always deterministic.
// ============================================================================

export function PulseBeaconConsole({ beacon }) {
  if (!beacon) throw new Error("PulseBeaconConsole requires a Beacon Engine instance");

  return Object.freeze({

    // ------------------------------------------------------------------------
    // SNAPSHOT: Full engine state (presence, hints, mode, payload, telemetry)
    // ------------------------------------------------------------------------
    getSnapshot() {
      return beacon.getStateSnapshot();
    },

    // ------------------------------------------------------------------------
    // GLOBAL HINTS: Set organism-level hints (hybrid C)
    // ------------------------------------------------------------------------
    setGlobalHints(globalHints) {
      return beacon.setGlobalHints(globalHints);
    },

    getGlobalHints() {
      return beacon.getGlobalHints();
    },

    // ------------------------------------------------------------------------
    // MODE CONTROL: discovery | presence | adaptive | pulse-reach | pulse-storm | pulse-mesh | pulse-expand
    // ------------------------------------------------------------------------
    setMode(mode) {
      return beacon.setMode(mode);
    },

    // ------------------------------------------------------------------------
    // PAYLOAD CONTROL: regionTag, castlePresence, meshStatus, loadHint, userProfile
    // ------------------------------------------------------------------------
    updatePayload(payloadUpdate) {
      return beacon.updatePayloadFromContext(payloadUpdate);
    },

    // ------------------------------------------------------------------------
    // EXPANSION PULSE: Fire a broadcast with optional context hints
    // ------------------------------------------------------------------------
    pulse(contextHints = {}) {
      return beacon.broadcastOnce(contextHints);
    },

    // ------------------------------------------------------------------------
    // DIRECTIVES: Overmind-style multi-field updates
    // ------------------------------------------------------------------------
    directive(directive) {
      return beacon.applyDirective(directive);
    }
  });
}
