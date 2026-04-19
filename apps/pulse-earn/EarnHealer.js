// ============================================================================
// FILE: tropic-pulse-functions/apps/pulse-earn/EarnHealer.js
// LAYER: THE IMMUNE SYSTEM (Subsystem Doctor + Drift Diagnostician)
// ============================================================================
//
// ROLE (v7.1+):
//   THE IMMUNE SYSTEM — Pulse‑Earn’s subsystem physician.
//   • Checks vitals across all Earn subsystems (immune surveillance).
//   • Detects drift, errors, and inconsistencies (pathogen detection).
//   • Prescribes deterministic repairs (immune response).
//   • Maintains subsystem health records (immune memory).
//
// WHY “IMMUNE SYSTEM”?:
//   • Performs diagnostic evaluations (runHealthCheck = immune scan).
//   • Prescribes treatment (runRepair = immune response).
//   • Monitors vitals (healing metadata = cell health).
//   • Maintains medical history (reports = immune memory).
//   • Protects the health of the Earn organism (homeostasis).
//
// PURPOSE (v7.1+):
//   • Provide deterministic, drift‑proof subsystem healing.
//   • Guarantee safe repair of PacketEngine + related modules.
//   • Maintain OS‑v5 healing metadata for Earn healers.
//   • Preserve immune lineage + subsystem health (conceptual only).
//
// CONTRACT (unchanged):
//   • PURE HEALING — no AI layers, no translation, no memory model.
//   • READ‑ONLY except for deterministic repair actions.
//   • NO eval(), NO Function(), NO dynamic imports.
//   • NO executing user code.
//   • Deterministic drift detection only.
//
// SAFETY (unchanged):
//   • v7.1+ upgrade is COMMENTAL ONLY — NO LOGIC CHANGES.
//   • All behavior remains identical to pre‑v7.1 EarnHealer.
// ============================================================================

// ------------------------------------------------------------
// IMMUNE CONTEXT METADATA
// ------------------------------------------------------------
const EARN_HEALER_CONTEXT = {
  layer: "EarnHealer",
  role: "IMMUNE_PHYSICIAN",
  purpose: "Diagnose and repair drift across Earn subsystems",
  context: "Immune surveillance + deterministic healing"
};

// ------------------------------------------------------------
// Imports — subsystem vitals (immune scan targets)
// ------------------------------------------------------------
import { getEarnEngineHealingState } from "./EarnEngine.js";
import { getEarnRuntimeHealingState } from "./EarnRuntime.js";
import { getWorkerExecutionHealingState } from "./WorkerExecution.js";
import { getResultSubmissionHealingState } from "./ResultSubmission.js";
import {
  getPacketEngineHealingState,
  generatePacketData,
  writePacket
} from "./PacketEngine.js";
import { getEarnerHealingState } from "./Earner.js";
import { getMarketplaceConnectorHealingState } from "./MarketplaceConnector.js";

// ------------------------------------------------------------
// Immune State — medical chart (immune memory)
// ------------------------------------------------------------
const healerState = {
  lastCheck: null,
  lastRepair: null,
  lastError: null,
  cycleCount: 0,
  status: "healthy", // healthy | warning | error | repairing
  lastReport: null,
  ...EARN_HEALER_CONTEXT
};

// ------------------------------------------------------------
// runHealthCheck() — immune surveillance scan
// ------------------------------------------------------------
export async function runHealthCheck() {
  healerState.cycleCount++;
  healerState.lastCheck = Date.now();

  try {
    const report = {
      engine: getEarnEngineHealingState(),
      runtime: getEarnRuntimeHealingState(),
      worker: getWorkerExecutionHealingState(),
      submission: getResultSubmissionHealingState(),
      packets: getPacketEngineHealingState(),
      earner: getEarnerHealingState(),
      connector: getMarketplaceConnectorHealingState(),
      // NOTE: This report is the immune system's "body scan"
      ...EARN_HEALER_CONTEXT
    };

    healerState.lastReport = report;

    const driftDetected =
      report.engine.lastError ||
      report.runtime.lastError ||
      report.worker.lastError ||
      report.submission.lastError ||
      report.packets.lastError ||
      report.earner.lastError ||
      report.connector.lastError;

    if (!driftDetected) {
      healerState.status = "healthy";
      healerState.lastError = null;

      return {
        status: "healthy",
        report,
        // NOTE: Healthy = organism is making money efficiently
        ...EARN_HEALER_CONTEXT
      };
    }

    healerState.status = "warning";
    healerState.lastError = "drift_detected";

    return {
      status: "warning",
      report,
      message: "Subsystem drift detected",
      // NOTE: Drift reduces throughput (conceptual only)
      ...EARN_HEALER_CONTEXT
    };

  } catch (err) {
    healerState.status = "error";
    healerState.lastError = err.message;

    return {
      status: "error",
      error: err.message,
      // NOTE: Immune failure = organism requires attention
      ...EARN_HEALER_CONTEXT
    };
  }
}

// ------------------------------------------------------------
// runRepair() — immune response
// ------------------------------------------------------------
export async function runRepair() {
  healerState.lastRepair = Date.now();
  healerState.status = "repairing";

  try {
    const packets = getPacketEngineHealingState();

    // If PacketEngine drifted, regenerate last packet
    // NOTE: This is the immune system regenerating damaged tissue
    if (packets.lastError && packets.lastKey) {
      const [fileId, packetIndex] = packets.lastKey.split(":");

      const regenerated = await generatePacketData(fileId, packetIndex);
      await writePacket(fileId, packetIndex, regenerated);
    }

    healerState.status = "healthy";
    healerState.lastError = null;

    return {
      repaired: true,
      message: "Subsystem repaired",
      // NOTE: Repair = restored earning potential
      ...EARN_HEALER_CONTEXT
    };

  } catch (err) {
    healerState.status = "error";
    healerState.lastError = err.message;

    return {
      repaired: false,
      error: err.message,
      // NOTE: Failed repair = immune deficiency (conceptual only)
      ...EARN_HEALER_CONTEXT
    };
  }
}

// ------------------------------------------------------------
// getEarnHealerState() — immune memory export
// ------------------------------------------------------------
export function getEarnHealerState() {
  return { ...healerState };
}
