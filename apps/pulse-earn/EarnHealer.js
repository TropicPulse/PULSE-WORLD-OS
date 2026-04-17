// ============================================================================
// FILE: tropic-pulse-functions/apps/pulse-earn/EarnHealer.js
// LAYER: EARN-SUBSYSTEM (PURE LOGIC / SUBSYSTEM HEALING)
//
// EarnHealer v5.2 — Deterministic, Drift‑Proof, Subsystem‑Level Healing Layer
// NO AI LAYERS. NO TRANSLATION. NO MEMORY MODEL. PURE HEALING.
// ============================================================================

// ------------------------------------------------------------
// ⭐ OS‑v5 CONTEXT METADATA
// ------------------------------------------------------------
const EARN_HEALER_CONTEXT = {
  layer: "EarnHealer",
  role: "EARN_SUBSYSTEM_HEALER",
  purpose: "Detect and repair drift across EarnEngine, Runtime, Worker, Submission, Packets, Earner, Connector",
  context: "Subsystem-level drift detection + deterministic repair"
};

// ------------------------------------------------------------
// Imports — healing metadata from all Earn modules
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
// Healer State (now includes OS‑v5 metadata)
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
// runHealthCheck() — subsystem‑level drift detection
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
        ...EARN_HEALER_CONTEXT
      };
    }

    healerState.status = "warning";
    healerState.lastError = "drift_detected";

    return {
      status: "warning",
      report,
      message: "Subsystem drift detected",
      ...EARN_HEALER_CONTEXT
    };

  } catch (err) {
    healerState.status = "error";
    healerState.lastError = err.message;

    return {
      status: "error",
      error: err.message,
      ...EARN_HEALER_CONTEXT
    };
  }
}

// ------------------------------------------------------------
// runRepair() — subsystem‑level auto‑repair
// ------------------------------------------------------------
export async function runRepair() {
  healerState.lastRepair = Date.now();
  healerState.status = "repairing";

  try {
    const packets = getPacketEngineHealingState();

    // If PacketEngine drifted, regenerate last packet
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
      ...EARN_HEALER_CONTEXT
    };

  } catch (err) {
    healerState.status = "error";
    healerState.lastError = err.message;

    return {
      repaired: false,
      error: err.message,
      ...EARN_HEALER_CONTEXT
    };
  }
}

// ------------------------------------------------------------
// getEarnHealerState()
// ------------------------------------------------------------
export function getEarnHealerState() {
  return { ...healerState };
}
