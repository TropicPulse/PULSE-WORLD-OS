// ============================================================================
// PULSE-WORLD : PulseBeaconMesh.js
// ROLE: Local membrane simulator + density/mode debugger
// VERSION: v12.3-PRESENCE-EVO+
// ============================================================================
//
// PURPOSE:
//   This page simulates local world conditions and feeds them into the
//   PulseBeaconEngine. It does NOT compute anything itself.
//
//   It is the "muscle" of PulseWorld expansion — it lets you:
//     - simulate density (low/medium/high)
//     - simulate demand (low/medium/high)
//     - simulate region types (home/venue/campus/city)
//     - simulate mesh strength (unknown/weak/stable/strong)
//     - inspect broadcast profiles
//     - inspect presence fields
//     - inspect multi-instance behavior
//
// CONTRACT:
//   - Never mutate the Beacon Engine.
//   - Never compute signal shaping.
//   - Never override global hints.
//   - Only call Beacon Engine APIs.
//   - Always deterministic.
// ============================================================================

export function PulseBeaconMesh({ beacon }) {
  if (!beacon) throw new Error("PulseBeaconMesh requires a Beacon Engine instance");

  return Object.freeze({

    // ------------------------------------------------------------------------
    // SIMULATION: Broadcast under simulated world conditions
    // ------------------------------------------------------------------------
    simulate({
      densityHint = "medium",   // low | medium | high
      demandHint = "medium",    // low | medium | high
      regionType = "venue",     // home | venue | campus | city
      meshStatus = "unknown"    // unknown | weak | stable | strong
    } = {}) {
      return beacon.broadcastOnce({
        densityHint,
        demandHint,
        regionType,
        meshStatus
      });
    },

    // ------------------------------------------------------------------------
    // TELEMETRY: Inspect broadcast history + last profile
    // ------------------------------------------------------------------------
    getTelemetry() {
      return beacon.getTelemetry();
    },

    // ------------------------------------------------------------------------
    // SNAPSHOT: Full membrane state
    // ------------------------------------------------------------------------
    getSnapshot() {
      return beacon.getStateSnapshot();
    },

    // ------------------------------------------------------------------------
    // PRESENCE FIELD: Local presence field (mesh, castle, region, band)
    // ------------------------------------------------------------------------
    getPresenceField() {
      return beacon.buildPresenceField();
    }
  });
}
