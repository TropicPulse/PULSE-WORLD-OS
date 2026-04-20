// ============================================================================
//  PULSE OS HEALER v7.3
//  “THE INFLAMMATORY RESPONSE / EARLY‑WARNING LAYER”
//  C‑LAYER (BACKEND OS-LEVEL HEALER)
//  Deterministic OS-Level Drift & Misconfiguration Healer
//  PURE HEALING. NO AI. NO COMPUTE. NO MARKETPLACE.
// ============================================================================
//
// BODY THEME — ROLE IN THE ORGANISM:
//  ----------------------------------
//  PulseOSHealer is the **INFLAMMATORY RESPONSE** of the OS.
//  It is the **EARLY‑WARNING LAYER** — the system‑wide alarm + triage signal.
//
// SAFETY CONTRACT:
//  ----------------
//  • No eval().
//  • No dynamic imports.
//  • No arbitrary code execution.
//  • No compute.
//  • No GPU work.
//  • No marketplace calls.
//  • Deterministic, drift-proof healing only.
//
// ADVANTAGE CASCADE (v7.3):
//  -------------------------
//  • Dual-mode: mental + system.
//  • Local-aware: node-level irritation context.
//  • Internet-aware: cluster/mesh/global irritation context.
//  • Advantage-cascade-aware: inherits ANY safe advantage.
//  • Unified-advantage-field: ALL advantages ON unless unsafe.
//  • Future-evolution-ready: new safe advantages auto-inherited.
// ============================================================================


// ============================================================================
//  HUMAN‑READABLE CONTEXT MAP (INFLAMMATORY RESPONSE)
// ============================================================================
const HEALER_CONTEXT = {
  label: "OS_HEALER_INFLAMMATORY_RESPONSE",
  layer: "C‑Layer",
  purpose: "Early‑Warning + Cross‑Subsystem Drift Detection + Healing Coordination",
  context:
    "Watches OSEvents + SubsystemHealerLogs and emits FUNCTION_LOG hints as inflammation markers",
  version: "7.3",
  evo: {
    dualMode: true,
    localAware: true,
    internetAware: true,
    advantageCascadeAware: true,
    pulseEfficiencyAware: true,
    driftProof: true,
    multiInstanceReady: true,
    unifiedAdvantageField: true,
    futureEvolutionReady: true
  }
};


// ============================================================================
//  CONFIGURABLE COLLECTIONS
// ============================================================================
export const OS_EVENTS_COLLECTION = "OSEvents";
export const SUBSYSTEM_HEALER_COLLECTION = "SubsystemHealerLogs";
export const OS_HEALER_LOGS_COLLECTION = "OSHealerLogs";
export const FUNCTION_LOGS_COLLECTION = "FUNCTION_LOGS";

export const OS_EVENTS_SCAN_INTERVAL_MS = 45_000;
export const SUBSYSTEM_SCAN_INTERVAL_MS = 45_000;

import { getFirestore, Timestamp } from "firebase-admin/firestore";
import { recordDriftSignature } from "./PulseOSMemory.js";

const db = getFirestore();

log(
  "%c🟦 PulseOSHealer v7.3 online — Inflammatory Response (C‑Layer) activated.",
  "color:#03A9F4; font-weight:bold;"
);

  "[PulseOSHealer BOOT] Scan intervals:",
  { OS_EVENTS_SCAN_INTERVAL_MS, SUBSYSTEM_SCAN_INTERVAL_MS }
);


// ============================================================================
//  writeOSHealerLog() — OSHealerLogs emitter (visible inflammation)
// ============================================================================
async function writeOSHealerLog(entry) {
  try {
    await db.collection(OS_HEALER_LOGS_COLLECTION).add({
      ts: Date.now(),
      ...HEALER_CONTEXT,
      ...entry
    });

    
      `%c🟩 OS_HEALER LOG → ${entry.type}`,
      "color:#4CAF50; font-weight:bold;"
    );

  } catch (err) {
    
      `%c🟥 OS_HEALER LOG ERROR`,
      "color:#FF5252; font-weight:bold;",
      err
    );
  }
}


// ============================================================================
//  emitFunctionLogHint() — FUNCTION_LOGS emitter (inflammation markers)
// ============================================================================
async function emitFunctionLogHint(entry) {
  try {
    await db.collection(FUNCTION_LOGS_COLLECTION).add({
      ...HEALER_CONTEXT,
      ...entry,
      createdAt: Timestamp.now(),
      processed: false,
      subsystem: entry.subsystem ?? "unknown",
      severity: entry.severity ?? "info",
      hintCode: entry.hintCode ?? "UNSPECIFIED_HINT"
    });

    log(
      `%c🟦 HINT EMITTED → ${entry.hintCode}`,
      "color:#03A9F4; font-weight:bold;"
    );

  } catch (err) {
    error(
      `%c🟥 HINT EMIT ERROR`,
      "color:#FF5252; font-weight:bold;",
      err
    );
  }
}


// ============================================================================
//  scanOSEventsForHints() — watches OS-level events (system‑wide irritation)
// ============================================================================
async function scanOSEventsForHints() {
  log("%c🟪 Scanning OSEvents…", "color:#9C27B0; font-weight:bold;");

  const snap = await db
    .collection(OS_EVENTS_COLLECTION)
    .orderBy("ts", "desc")
    .limit(100)
    .get();

  if (snap.empty) {
    log("[PulseOSHealer] No OSEvents found.");
    return;
  }

  for (const doc of snap.docs) {
    const ev = doc.data();

    log(
      `%c🟨 OSEVENT → ${ev.type}`,
      "color:#FFC107; font-weight:bold;"
    );

    if (ev.type === "function_log_ingested") {
      await writeOSHealerLog({
        source: "OSEvents",
        eventId: doc.id,
        type: "function_log_seen",
        subsystem: ev.subsystem ?? null,
        fileName: ev.fileName ?? null,
        functionName: ev.functionName ?? null,
        note: ev.note ?? null
      });
    }
  }
}


// ============================================================================
//  scanSubsystemHealerLogs() — watches subsystem healers (local tissue signals)
// ============================================================================
async function scanSubsystemHealerLogs() {
  log(
    "%c🟪 Scanning SubsystemHealerLogs…",
    "color:#9C27B0; font-weight:bold;"
  );

  const snap = await db
    .collection(SUBSYSTEM_HEALER_COLLECTION)
    .orderBy("ts", "desc")
    .limit(100)
    .get();

  if (snap.empty) {
    log("[PulseOSHealer] No subsystem healer logs found.");
    return;
  }

  for (const doc of snap.docs) {
    const log = doc.data();
    const subsystem = log.subsystem ?? "unknown";
    const type = log.type ?? "unknown";

    log(
      `%c🟨 SUBSYSTEM DRIFT → ${subsystem} / ${type}`,
      "color:#FFC107; font-weight:bold;"
    );

    // PulseBand → latency/bar mismatch
    if (subsystem === "PulseBand" && type === "latency_bar_mismatch") {
      await writeOSHealerLog({
        source: "PulseBand",
        eventId: doc.id,
        type: "latency_bar_mismatch_seen",
        latency: log.latency,
        bars: log.bars
      });

      await recordDriftSignature("PulseBand", {
        type: "latency_bar_mismatch",
        severity: "warning",
        details: { latency: log.latency, bars: log.bars }
      });

      await emitFunctionLogHint({
        hintCode: "PB_LATENCY_BAR_MISMATCH",
        subsystem: "PulseBand",
        fileName: "PulseBand.js",
        functionName: "setStatus",
        fieldName: "latencyClass",
        note: "Latency and bar count mismatch; review thresholds."
      });
    }

    // PulseNet → unstable signal slope
    if (subsystem === "PulseNet" && type === "unstable_signal_slope") {
      await writeOSHealerLog({
        source: "PulseNet",
        eventId: doc.id,
        type: "unstable_signal_slope_seen",
        slope: log.slope,
        score: log.score
      });

      await recordDriftSignature("PulseNet", {
        type: "unstable_signal_slope",
        severity: "warning",
        details: { slope: log.slope, score: log.score }
      });

      await emitFunctionLogHint({
        hintCode: "PN_UNSTABLE_SIGNAL_SLOPE",
        subsystem: "PulseNet",
        fileName: "PulseNet.js",
        functionName: "updateSignalFromPulseBand",
        fieldName: "signalSlope",
        note: "Unstable signal slope; consider smoothing window."
      });
    }

    // PulseClient → fallback spike
    if (subsystem === "PulseClient" && type === "fallback_spike") {
      await writeOSHealerLog({
        source: "PulseClient",
        eventId: doc.id,
        type: "fallback_spike_seen",
        count: log.count
      });

      await recordDriftSignature("PulseClient", {
        type: "fallback_spike",
        severity: "warning",
        details: { count: log.count }
      });

      await emitFunctionLogHint({
        hintCode: "PC_FALLBACK_SPIKE",
        subsystem: "PulseClient",
        fileName: "PulseClient.js",
        functionName: "pulseFetch",
        fieldName: "route",
        note: "Frequent fallback to phone route; review proxy timeouts."
      });
    }

    // Proxy → instance out-of-bounds
    if (subsystem === "Proxy" && type === "instance_out_of_bounds") {
      await writeOSHealerLog({
        source: "Proxy",
        eventId: doc.id,
        type: "instance_out_of_bounds_seen",
        userId: log.userId,
        instances: log.instances
      });

      await recordDriftSignature("Proxy", {
        type: "instance_out_of_bounds",
        severity: "critical",
        details: { userId: log.userId, instances: log.instances }
      });

      await emitFunctionLogHint({
        hintCode: "PX_INSTANCE_OUT_OF_BOUNDS",
        subsystem: "Proxy",
        fileName: "PulseUserScoring.js",
        functionName: "allocateInstances",
        fieldName: "instances",
        note: "Instance count outside sane bounds; review allocation formula."
      });
    }
  }
}


// ============================================================================
//  PUBLIC: startPulseOSHealer() — activate inflammatory response loop
// ============================================================================
export default function startPulseOSHealer() {
  log(
    "%c🟦 PulseOSHealer v7.3 started — Inflammatory Response (C‑Layer) active.",
    "color:#03A9F4; font-weight:bold;"
  );

  setInterval(() => {
    scanOSEventsForHints().catch((err) => {
      error(
        "%c🟥 OSEvents scan error",
        "color:#FF5252; font-weight:bold;",
        err
      );
    });
  }, OS_EVENTS_SCAN_INTERVAL_MS);

  setInterval(() => {
    scanSubsystemHealerLogs().catch((err) => {
      error(
        "%c🟥 Subsystem scan error",
        "color:#FF5252; font-weight:bold;",
        err
      );
    });
  }, SUBSYSTEM_SCAN_INTERVAL_MS);
}

export {
  writeOSHealerLog,
  emitFunctionLogHint,
  scanOSEventsForHints,
  scanSubsystemHealerLogs
};
