// ============================================================================
// [pulse:mesh] PULSE_MESH_THALAMUS v10.4  // white‑violet
// Sensory Relay Gate • Perception Filter • Neural Signal Interpreter
// Deterministic • Metadata‑Only • Zero Pressure Logic
// ============================================================================
//
// IDENTITY — THALAMUS (v10.4):
// ----------------------------
// • First neural relay after ShadowGuard.
// • Interprets shellState → safe neuralState.
// • Performs structural validation only.
// • Blocks malformed or unsafe signals.
// • Pure metadata-only — zero payload mutation.
// • Deterministic, drift-proof, CNS-injected dependencies.
// • No pressure gating, no route-mode logic, no factoring logic.
// ============================================================================

const ThalamusMeta = {
  layer: "PulseMeshThalamus",
  role: "THALAMUS_RELAY",
  version: "10.4",
  target: "full-mesh",
  selfRepairable: true,
  evo: {
    dualMode: true,
    localAware: true,
    internetAware: true,
    advantageCascadeAware: true,
    pulseEfficiencyAware: true,
    driftProof: true,
    multiInstanceReady: true,
    unifiedAdvantageField: true,
    deterministicField: true,
    futureEvolutionReady: true,
    signalFactoringAware: true
  }
};


// ============================================================================
// FACTORY — ALL DEPENDENCIES INJECTED BY THE CNS BRAIN
// Thalamus MUST HAVE ZERO IMPORTS
// ============================================================================
export function createPulseMeshThalamus({
  log,
  warn,
  error,
  groupCollapsed,
  groupEnd
}) {

  // ======================================================
  //  SIGNAL RELAY ENGINE — Thalamic Interpretation Layer
  // ======================================================
  function interpretShellSignal(input) {
    groupCollapsed(
      "%c[PulseThalamus v10.4] Relay",
      "color:#CE93D8; font-weight:bold;"
    );

    try {
      log("thalamus", "ShadowGuard → Thalamus relay initiated.");

      // ------------------------------------------------------------
      // VALIDATION — Ensure input is well-formed
      // ------------------------------------------------------------
      if (!input || typeof input !== "object") {
        warn("thalamus", "Malformed shell signal received.");
        groupEnd();
        return null;
      }

      const { shellState, allowPulseBand, allowIdentity } = input;

      if (!shellState) {
        error("thalamus", "Missing shellState in thalamic relay.");
        groupEnd();
        return null;
      }

      // ------------------------------------------------------------
      // PERCEPTION SAFETY — v10.4: structural only
      // ------------------------------------------------------------
      let perceptionSafe = true;

      // Basic structural checks
      if (typeof shellState !== "object") perceptionSafe = false;
      if (shellState === null) perceptionSafe = false;

      // ------------------------------------------------------------
      // BUILD OUTPUT
      // ------------------------------------------------------------
      const output = {
        thalamus_meta: ThalamusMeta,
        neuralState: shellState,
        enablePulse: allowPulseBand === true && perceptionSafe,
        enableIdentity: allowIdentity === true && perceptionSafe,
        perceptionSafe,
        perceptionFlags: {
          structural_valid: perceptionSafe
        }
      };

      if (!perceptionSafe) {
        output.perceptionFlags.stabilized = true;
        warn("thalamus", "Perception stabilized due to malformed signal.");
      }

      log("thalamus", "Thalamic signal prepared for PulseBand.");
      log("thalamus", "Output payload", output);

      groupEnd();
      return output;

    } catch (err) {
      error("thalamus", "Critical thalamic relay failure", err);
      groupEnd();
      return null;
    }
  }

  return {
    interpretShellSignal,
    meta: ThalamusMeta
  };
}
