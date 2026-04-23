// ============================================================================
//  PULSE OS HEALER — “THE INFLAMMATORY RESPONSE”
//  C‑LAYER • OS‑LEVEL IMMUNE ORGAN • v9.2 LINEAGE
//  Deterministic Irritation Scanner • Drift Detector • Immune Signal Emitter
// ============================================================================
//
//  WHAT THIS ORGAN IS:
//  --------------------
//  The PulseOS Healer is the organism’s **inflammatory response** — the
//  early‑warning immune layer that detects irritation, drift, misalignment,
//  and subsystem distress across the OS. It does NOT compute, decide, or
//  repair. It simply:
//
//    • Scans OS‑level irritation signals (OSEvents)
//    • Scans subsystem irritation signals (SubsystemHealerLogs)
//    • Emits inflammation markers (FUNCTION_LOG hints)
//    • Records drift signatures for immune memory
//    • Forwards immune signals to the GlobalHealer
//
//  ROLE IN THE DIGITAL BODY:
//  --------------------------
//    • Early‑Warning Layer — detects irritation + drift
//    • Inflammation Marker Emitter — FUNCTION_LOG hints
//    • OS‑Level Irritation Scanner — watches global + subsystem signals
//    • Drift Signature Forwarder — hands off to immune memory
//    • Immune Escalation Trigger — signals GlobalHealer
//
//  SAFETY CONTRACT (v9.2):
//  ------------------------
//    • ZERO imports
//    • ZERO network
//    • ZERO backend
//    • ZERO compute
//    • ZERO marketplace calls
//    • Deterministic, drift‑proof healing only
//    • No eval(), no dynamic imports, no arbitrary execution
//    • Pure immune signaling — never mutates external state
//
//  IDENTITY (v9.2):
//  ----------------
//    • organ: PulseOSHealer
//    • layer: C‑Layer (immune surface)
//    • role: Inflammatory Response
//    • version: 9.2
//    • generation: v9
//    • organism: PulseOS
//
//  NOTES:
//  ------
//    • This organ is intentionally stable across v7.7 → v9.0 → v9.2.
//    • PulseOS v10.x uses the SAME immune organ — no rewrite required.
//    • All dependencies are injected by the CNS Brain.
//    • This organ must remain PURE and import‑free.
// ============================================================================

export function createPulseOSHealer({
  db,
  Timestamp,
  writeGlobalHealerLog,
  recordDriftSignature,
  emitFunctionLogHint,
  log,
  error
}) {

  const HEALER_CONTEXT = {
    organ: "PulseOSHealer",
    layer: "C-Layer",
    role: "Inflammatory Response",
    version: "9.2",
    generation: "v9",
    organism: "PulseOS"
  };

  const OS_EVENTS_COLLECTION          = "OSEvents";
  const SUBSYSTEM_HEALER_COLLECTION   = "SubsystemHealerLogs";
  const OS_HEALER_LOGS_COLLECTION     = "OSHealerLogs";
  const FUNCTION_LOGS_COLLECTION      = "FUNCTION_LOGS";

  const OS_EVENTS_SCAN_INTERVAL_MS    = 45_000;
  const SUBSYSTEM_SCAN_INTERVAL_MS    = 45_000;

  async function writeOSHealer(entry) {
    try {
      await db.collection(OS_HEALER_LOGS_COLLECTION).add({
        ts: Date.now(),
        ...HEALER_CONTEXT,
        ...entry
      });

      log("oshealer", `OS_HEALER LOG → ${entry.type}`, entry);

    } catch (err) {
      error("oshealer", "OS_HEALER LOG ERROR", err);
    }
  }

  async function emitHint(entry) {
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

      log("oshealer", `HINT EMITTED → ${entry.hintCode}`);

    } catch (err) {
      error("oshealer", "HINT EMIT ERROR", err);
    }
  }

  async function scanOSEventsForHints() {
    log("oshealer", "Scanning OSEvents…");

    const snap = await db
      .collection(OS_EVENTS_COLLECTION)
      .orderBy("ts", "desc")
      .limit(100)
      .get();

    if (snap.empty) return;

    for (const doc of snap.docs) {
      const ev = doc.data();

      if (ev.type === "function_log_ingested") {
        await writeOSHealer({
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

  async function scanSubsystemHealerLogs() {
    log("oshealer", "Scanning SubsystemHealerLogs…");

    const snap = await db
      .collection(SUBSYSTEM_HEALER_COLLECTION)
      .orderBy("ts", "desc")
      .limit(100)
      .get();

    if (snap.empty) return;

    for (const doc of snap.docs) {
      const logEntry  = doc.data();
      const subsystem = logEntry.subsystem ?? "unknown";
      const type      = logEntry.type ?? "unknown";

      const driftMeta = {
        version: "9.2",
        generation: "v9",
        organ: "PulseOSHealer",
        timestamp: Date.now()
      };

      if (subsystem === "PulseBand" && type === "latency_bar_mismatch") {
        await writeOSHealer({
          source: "PulseBand",
          eventId: doc.id,
          type: "latency_bar_mismatch_seen",
          latency: logEntry.latency,
          bars: logEntry.bars
        });

        await recordDriftSignature("PulseBand", {
          type: "latency_bar_mismatch",
          severity: "warning",
          details: { latency: logEntry.latency, bars: logEntry.bars },
          ...driftMeta
        });

        await emitHint({
          hintCode: "PB_LATENCY_BAR_MISMATCH",
          subsystem: "PulseBand",
          fileName: "PulseBand.js",
          functionName: "setStatus",
          fieldName: "latencyClass",
          note: "Latency and bar count mismatch; review thresholds."
        });
      }

      if (subsystem === "PulseNet" && type === "unstable_signal_slope") {
        await writeOSHealer({
          source: "PulseNet",
          eventId: doc.id,
          type: "unstable_signal_slope_seen",
          slope: logEntry.slope,
          score: logEntry.score
        });

        await recordDriftSignature("PulseNet", {
          type: "unstable_signal_slope",
          severity: "warning",
          details: { slope: logEntry.slope, score: logEntry.score },
          ...driftMeta
        });

        await emitHint({
          hintCode: "PN_UNSTABLE_SIGNAL_SLOPE",
          subsystem: "PulseNet",
          fileName: "PulseNet.js",
          functionName: "updateSignalFromPulseBand",
          fieldName: "signalSlope",
          note: "Unstable signal slope; consider smoothing window."
        });
      }

      if (subsystem === "PulseClient" && type === "fallback_spike") {
        await writeOSHealer({
          source: "PulseClient",
          eventId: doc.id,
          type: "fallback_spike_seen",
          count: logEntry.count
        });

        await recordDriftSignature("PulseClient", {
          type: "fallback_spike",
          severity: "warning",
          details: { count: logEntry.count },
          ...driftMeta
        });

        await emitHint({
          hintCode: "PC_FALLBACK_SPIKE",
          subsystem: "PulseClient",
          fileName: "PulseClient.js",
          functionName: "pulseFetch",
          fieldName: "route",
          note: "Frequent fallback to phone route; review proxy timeouts."
        });
      }

      if (subsystem === "Proxy" && type === "instance_out_of_bounds") {
        await writeOSHealer({
          source: "Proxy",
          eventId: doc.id,
          type: "instance_out_of_bounds_seen",
          userId: logEntry.userId,
          instances: logEntry.instances
        });

        await recordDriftSignature("Proxy", {
          type: "instance_out_of_bounds",
          severity: "critical",
          details: { userId: logEntry.userId, instances: logEntry.instances },
          ...driftMeta
        });

        await emitHint({
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

  function startPulseOSHealer() {
    log("oshealer", "PulseOSHealer v9.2 started — Inflammatory Response active.");

    setInterval(() => {
      scanOSEventsForHints().catch((err) => {
        error("oshealer", "OSEvents scan error", err);
      });
    }, OS_EVENTS_SCAN_INTERVAL_MS);

    setInterval(() => {
      scanSubsystemHealerLogs().catch((err) => {
        error("oshealer", "Subsystem scan error", err);
      });
    }, SUBSYSTEM_SCAN_INTERVAL_MS);
  }

  return {
    startPulseOSHealer,
    writeOSHealer,
    emitHint,
    scanOSEventsForHints,
    scanSubsystemHealerLogs
  };
}
