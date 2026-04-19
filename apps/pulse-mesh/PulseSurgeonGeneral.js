// ============================================================================
// FILE: /apps/organs/immune/PulseSurgeonGeneral.js
// PULSE OS — v7.0
// IMMUNE SYSTEM COMMANDER — “THE SURGEON GENERAL”
// LOCAL‑FIRST • OFFLINE‑CAPABLE • ZERO DRIFT • PURE LOGIC
// ============================================================================
//
// ROLE (v7.0):
//   • Receives analysis from PulseImmunity
//   • Identifies root causes
//   • Prioritizes repair order (A → B → A)
//   • Activates the correct healer subsystem
//   • Coordinates backend immune responders (optional)
//   • Ensures safe, ordered, non-destructive healing
//   • Operates fully offline when backend is unavailable
//
// This file does NOT heal anything directly.
// It LEADS the healers.
//
// ============================================================================
// SUBSYSTEM IDENTITY — “IMMUNE SYSTEM”  [PURPLE]
// ----------------------------------------------------------------------------
// This organ is the TOP of the immune hierarchy.
// It commands:
//   • GPUHealer (muscular immune response)
//   • RouteDownResponder (router immune response)
//   • IdentityHealer (identity/BBB immune response)
//   • Any future healers added to the registry
//
// v7.0: Surgeon General now supports explicit offline mode.
// ============================================================================

// ============================================================================
// IMPORTS
// ============================================================================
import { PulseImmunity } from "./PulseImmunity.js";

// Local immune responders
import { GPUHealer } from "../../../pulse-gpu/GPUHealer.js";
import { IdentityHealer } from "../identity/IdentityHealer.js";

// Backend immune responder (optional)
import { handler as RouteDownResponder } from "../../../../netlify/functions/RouteDownAlert.js";

// ============================================================================
// MODE — v7.0 LOCAL-FIRST IMMUNE COMMANDER
// ----------------------------------------------------------------------------
// If PULSE_OFFLINE_MODE = "1", backend responders are skipped.
// All local healers still run normally.
// ============================================================================
const OFFLINE_MODE =
  (typeof window !== "undefined" && window.PULSE_OFFLINE_MODE === "1") ||
  false;

// ============================================================================
// HEALER REGISTRY (v7.0)
// ----------------------------------------------------------------------------
// Evolvable registry. Add new healers here.
// v7.0: RouteDownResponder is now optional in offline mode.
// ============================================================================
const HEALER_REGISTRY = [
  {
    name: "GPUHealer",
    match: /gpu|render|frame|canvas/i,
    handler: (issue) => GPUHealer.repair(issue)
  },
  {
    name: "RouteDownResponder",
    match: /route|network|down|offline|timeout/i,
    handler: (issue) => {
      if (OFFLINE_MODE) {
        return {
          ok: false,
          skipped: true,
          reason: "offline-mode",
          issue
        };
      }
      return RouteDownResponder({ body: JSON.stringify(issue) });
    }
  },
  {
    name: "IdentityHealer",
    match: /identity|auth|token|session/i,
    handler: (issue) => IdentityHealer.repair(issue)
  }
];

// ============================================================================
// SURGEON GENERAL — COMMANDER ORGAN (v7.0)
// ============================================================================
export const PulseSurgeonGeneral = {

  // ----------------------------------------------------------
  // TRIAGE (v7.0)
  // ----------------------------------------------------------
  triage(analysis) {
    const { issues } = analysis;

    return issues.sort((a, b) => {
      const sa = a.severity || 1;
      const sb = b.severity || 1;
      return sb - sa;
    });
  },

  // ----------------------------------------------------------
  // DISPATCH (v7.0)
  // ----------------------------------------------------------
  async dispatch(issue) {
    const msg = issue.message || "";

    for (const healer of HEALER_REGISTRY) {
      if (healer.match.test(msg)) {
        return healer.handler(issue);
      }
    }

    return {
      ok: false,
      message: "No healer found for issue",
      issue
    };
  },

  // ----------------------------------------------------------
  // COMMAND CYCLE (v7.0)
  // ----------------------------------------------------------
  async command(diagSnapshot) {
    const analysis = PulseImmunity.analyze(diagSnapshot);

    const orderedIssues = this.triage(analysis);

    const results = [];

    for (const issue of orderedIssues) {
      const res = await this.dispatch(issue);
      results.push({ issue, result: res });
    }

    return {
      commander: "PulseSurgeonGeneral",
      mode: OFFLINE_MODE ? "offline" : "online",
      analysis,
      orderedIssues,
      results
    };
  }
};

// ============================================================================
// END OF FILE — IMMUNE SYSTEM COMMANDER  [PURPLE]
// ============================================================================
