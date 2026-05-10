// ============================================================================
// FILE: /organs/thalamus/PulseMeshThalamus-v15.0-Immortal.js
// [pulse:mesh] PULSE_MESH_THALAMUS v15.0-MESH-Immortal  // white‑violet
// Sensory Relay Gate • Perception Filter • Neural Signal Interpreter
// Deterministic • Metadata‑Only • Zero Pressure Logic
// Full Advantage Stack: Prewarm • Chunk • Cache • Presence-Band
// ============================================================================
//
// IDENTITY — THALAMUS (v15.0-Immortal):
// -------------------------------------
// • First neural relay after ShadowGuard.
// • Interprets shellState → safe neuralState.
// • Performs structural validation only (no pressure logic).
// • Blocks malformed or unsafe signals.
// • Pure metadata-only — zero payload mutation.
// • Deterministic, drift-proof, CNS-injected dependencies.
// • Binary-aware, dual-mode-ready, presence-band-aware, dual-band-ready.
// • No pressure gating, no route-mode logic, no factoring logic.
// ============================================================================
import {
  OrganismIdentity,
  buildPulseOrganismMap as buildOrganismMap
} from "../PULSE-X/PulseWorldOrganismMap-v24.js";
const Identity = OrganismIdentity(import.meta.url);

// 2 — EXPORT GENOME METADATA
export const ThalamusMeta = Identity.OrganMeta;
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
// export const PULSE_EARN_IMMUNE_CONTEXT = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;


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

  // ------------------------------------------------------
  // Presence-band classifier (v15.0-Immortal)
  // ------------------------------------------------------
  function classifyPresenceBand({ binaryMode, dualMode }) {
    if (binaryMode && dualMode) return "dual";
    if (binaryMode) return "binary";
    if (dualMode) return "dual";
    return "symbolic";
  }

  // ======================================================
  //  SIGNAL RELAY ENGINE — Thalamic Interpretation Layer
  // ======================================================
  function interpretShellSignal(input) {
    groupCollapsed?.(
      "%c[PulseThalamus v15.0-Immortal] Relay",
      "color:#CE93D8; font-weight:bold;"
    );

    try {
      log?.("thalamus", "ShadowGuard → Thalamus relay initiated.");

      // ------------------------------------------------------------
      // VALIDATION — Ensure input is well-formed
      // ------------------------------------------------------------
      if (!input || typeof input !== "object") {
        warn?.("thalamus", "Malformed shell signal received.");
        groupEnd?.();
        return null;
      }

      const {
        shellState,
        allowPulseBand,
        allowIdentity,
        binaryMode,
        dualMode
      } = input;

      if (!shellState) {
        error?.("thalamus", "Missing shellState in thalamic relay.");
        groupEnd?.();
        return null;
      }

      // ------------------------------------------------------------
      // PERCEPTION SAFETY — structural only
      // ------------------------------------------------------------
      let perceptionSafe = true;

      if (typeof shellState !== "object") perceptionSafe = false;
      if (shellState === null) perceptionSafe = false;

      // ------------------------------------------------------------
      // MODE + PRESENCE-BAND TAGGING — v15.0-Immortal
      // ------------------------------------------------------------
      const mode = binaryMode ? "binary" : dualMode ? "dual" : "symbolic";
      const presenceBand = classifyPresenceBand({ binaryMode, dualMode });

      // ------------------------------------------------------------
      // BUILD OUTPUT
      // ------------------------------------------------------------
      const output = {
        thalamus_meta: ThalamusMeta,
        neuralState: shellState,
        enablePulse: allowPulseBand === true && perceptionSafe,
        enableIdentity: allowIdentity === true && perceptionSafe,
        perceptionSafe,
        mode,
        perceptionFlags: {
          structural_valid: perceptionSafe,
          binary_mode: !!binaryMode,
          dual_mode: !!dualMode,
          presence_band: presenceBand
        },
        // v15.0+ unified-advantage-field surfaces (metadata-only)
        thalamus_advantage_meta: {
          prewarm_surface: true,
          chunk_surface: true,
          cache_surface: true,
          presence_band: presenceBand,
          band_kind: "neural_relay"
        }
      };

      if (!perceptionSafe) {
        output.perceptionFlags.stabilized = true;
        warn?.("thalamus", "Perception stabilized due to malformed signal.");
      }

      log?.("thalamus", "Thalamic signal prepared for PulseBand.");
      log?.("thalamus", "Output payload", output);

      groupEnd?.();
      return output;

    } catch (err) {
      error?.("thalamus", "Critical thalamic relay failure", err);
      groupEnd?.();
      return null;
    }
  }

  return {
    interpretShellSignal,
    meta: ThalamusMeta
  };
}
