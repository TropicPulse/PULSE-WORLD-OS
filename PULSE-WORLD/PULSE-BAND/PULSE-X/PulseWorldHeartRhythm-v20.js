// ============================================================================
// PulseWorldHeartRhythm-v20-IMMORTAL
// GLOBAL RHYTHM ORGAN — THE ONLY ASYNC MIDDLEMAN
// ----------------------------------------------------------------------------
// PURPOSE:
//   This organ is the ONE global middleman for:
//     • Log flushing (from IMMORTAL logger → remote systems)
//     • Telemetry / analytics dispatch (if desired)
//     • World-level sync rhythm
//
//   The IMMORTAL logger is now:
//     • sync-only
//     • append-only
//     • zero-network
//     • zero-async
//
//   That means ALL network I/O for logs MUST flow through this organ.
//
// CORE CONTRACT:
//   • Reads logs ONLY via PulseLoggerStore.drainForHeartbeat()
//   • Batches and flushes to:
//       1. FirebaseAdapter.batchWrite (primary)
//       2. ExpansionOrgan + PulseNet (fallback)
//   • Never touches UI, pages, or organs directly.
//   • Never mutates external organs.
//   • Never blocks the main thread longer than necessary.
//   • All async is contained HERE, not in the logger.
//
// WHY v16 NEEDED TO CHANGE:
//   • v16 mixed logging + flushing + Firebase + routing inside the logger.
//   • That violated IMMORTAL constraints: logger must be pure, sync, local.
//   • v20 moves ALL async + network into this dedicated Rhythm organ.
//   • Logger now only records; Rhythm now only flushes.
//
// ============================================================================
import {
  OrganismIdentity,
  buildPulseOrganismMap as buildOrganismMap
} from "../PULSE-X/PulseWorldOrganismMap-v21.js";
const Identity = OrganismIdentity(import.meta.url);

// 2 — EXPORT GENOME METADATA
// export const PulseBinaryWaveScannerMeta = Identity.OrganMeta;
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
// export const WBC_CONTEXT = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;
export function createPulseWorldRhythm({
  // IMMORTAL external organs / adapters
  ExpansionOrgan,      // optional, for fallback intents
  PulseNet,            // optional, for fallback network routes
  FirebaseAdapter,     // primary log sink (batchWrite)
  PulseLoggerStore,    // REQUIRED: the v20 IMMORTAL logger store
  tickRate = 5000,     // world-level rhythm in ms (default 5s)
  maxBatchSize = 500,  // max logs per flush to avoid huge payloads
  maxRetries = 3,      // retries per tick before giving up (buffer preserved)
  backoffBaseMs = 500  // base backoff between retries within a tick
}) {
  // ---------------------------------------------------------------------------
  // META BLOCK — PulseWorldRhythm-v20 IMMORTAL
  // ---------------------------------------------------------------------------
  //
  // ORGAN NAME: PulseWorldRhythm
  // VERSION: v20-IMMORTAL
  // LAYER: World Layer (Above Hearts, Above Lanes, Above Pages)
  // ROLE: Global Rhythm Coordinator + Log Flusher + Fallback Router
  //
  // IDENTITY:
  //   • The ONE global middleman for log flushing.
  //   • Does NOT own the log buffer; logger does.
  //   • Reads logs ONLY via PulseLoggerStore.drainForHeartbeat().
  //   • Flushes ONLY on world-level rhythm ticks.
  //
  // RESPONSIBILITIES:
  //   • On each tick:
  //       1. Drain logs from PulseLoggerStore.
  //       2. Batch them.
  //       3. Try FirebaseAdapter.batchWrite().
  //       4. If that fails, try ExpansionOrgan + PulseNet fallback.
  //       5. If everything fails, KEEP the drained logs in a local retry buffer.
  //
  // IMMORTAL TRAITS:
  //   • driftProof (fixed tick rhythm, no hidden timers)
  //   • batchFlush (never flush per-log)
  //   • fallbackRouted (Expansion + PulseNet)
  //   • nonBlocking (bounded work per tick)
  //   • deterministic (no random mutation of logs)
  //   • worldLevelCoordinator (above hearts, lanes, pages)
  //
  // GUARANTEES:
  //   • Logger remains pure and sync-only.
  //   • No log is ever flushed from inside the logger.
  //   • All network I/O for logs is centralized here.
  //   • If all remote sinks fail, logs are preserved for next tick.
  //
  // ---------------------------------------------------------------------------

  if (!PulseLoggerStore || typeof PulseLoggerStore.drainForHeartbeat !== "function") {
    throw new Error(
      "PulseWorldRhythm-v20 requires PulseLoggerStore with drainForHeartbeat()."
    );
  }

  const hasFirebase =
    FirebaseAdapter && typeof FirebaseAdapter.batchWrite === "function";
  const hasExpansion =
    ExpansionOrgan && typeof ExpansionOrgan.sendIntent === "function";
  const hasPulseNet = PulseNet && typeof PulseNet.send === "function";

  // ---------------------------------------------------------------------------
  // INTERNAL RETRY BUFFER
  // ---------------------------------------------------------------------------
  //
  // We never mutate the logger’s internal buffer directly.
  // Instead:
  //   • On each tick, we call PulseLoggerStore.drainForHeartbeat().
  //   • That gives us a batch of logs and clears them from the logger.
  //   • If we fail to deliver them remotely, we store them here in
  //     retryBuffer and try again on the next tick.
  //
  // This ensures:
  //   • Logger stays pure and fast.
  //   • Rhythm owns delivery responsibility.
  //   • No log is lost unless explicitly discarded by policy.
  //

  let retryBuffer = [];
  let inFlight = false; // prevent overlapping ticks

  function takeBatchFromRetryBuffer(limit) {
    if (!retryBuffer.length) return [];
    if (retryBuffer.length <= limit) {
      const batch = retryBuffer;
      retryBuffer = [];
      return batch;
    }
    const batch = retryBuffer.slice(0, limit);
    retryBuffer = retryBuffer.slice(limit);
    return batch;
  }

  function pushBackToRetryBuffer(entries) {
    if (!entries || !entries.length) return;
    retryBuffer = entries.concat(retryBuffer);
  }

  // ---------------------------------------------------------------------------
  // PRIMARY FLUSH → FIREBASE (BATCH)
  // ---------------------------------------------------------------------------
  //
  // This is the primary sink for logs.
  // It is the ONLY place we call FirebaseAdapter.batchWrite().
  // It is async by design, but isolated from the logger.
  //

  async function flushToFirebase(batch) {
    if (!hasFirebase || !batch.length) {
      return { ok: true, count: 0, skipped: !hasFirebase };
    }

    try {
      await FirebaseAdapter.batchWrite(batch);
      console.log(
        `[WorldRhythm-v20] Firebase flush OK → ${batch.length} entries`
      );
      return { ok: true, count: batch.length };
    } catch (err) {
      console.warn("[WorldRhythm-v20] Firebase flush FAILED:", err);
      return { ok: false, error: err };
    }
  }

  // ---------------------------------------------------------------------------
  // FALLBACK FLUSH → EXPANSION → PULSENET
  // ---------------------------------------------------------------------------
  //
  // If Firebase fails, we attempt a fallback path:
  //   1) ExpansionOrgan.sendIntent("world:log:fallback", payload)
  //   2) PulseNet.send("/world/logs/fallback", payload)
  //
  // Both are optional; if not present, we simply keep the logs in retryBuffer.
  //

  async function flushViaFallback(batch) {
    if (!batch.length) return { ok: true, count: 0 };

    if (!hasExpansion && !hasPulseNet) {
      console.warn(
        "[WorldRhythm-v20] No fallback sinks (Expansion/PulseNet) configured; preserving logs for next tick."
      );
      return { ok: false, error: new Error("No fallback sinks configured") };
    }

    try {
      let expansionIntent = null;
      let netRes = null;

      if (hasExpansion) {
        expansionIntent = await ExpansionOrgan.sendIntent({
          type: "world:log:fallback",
          payload: batch
        });
      }

      if (hasPulseNet) {
        netRes = await PulseNet.send({
          route: "/world/logs/fallback",
          method: "POST",
          body: batch
        });
      }

      console.log(
        `[WorldRhythm-v20] Fallback flush OK → ${batch.length} entries`
      );

      return { ok: true, count: batch.length, expansionIntent, netRes };
    } catch (err) {
      console.error("[WorldRhythm-v20] Fallback flush FAILED:", err);
      return { ok: false, error: err };
    }
  }

  // ---------------------------------------------------------------------------
  // SINGLE FLUSH CYCLE (ONE BATCH)
  // ---------------------------------------------------------------------------
  //
  // This function:
  //   • Takes a batch from retryBuffer (if any), otherwise from logger drain.
  //   • Tries Firebase.
  //   • If Firebase fails, tries fallback.
  //   • If everything fails, pushes the batch back into retryBuffer.
  //
  // It is intentionally bounded by maxBatchSize to avoid huge payloads.
  //

  async function flushOnce() {
    // 1) Prefer retryBuffer first (previous failures)
    let batch = takeBatchFromRetryBuffer(maxBatchSize);

    // 2) If no retry backlog, drain fresh logs from logger
    if (!batch.length) {
      const drained = PulseLoggerStore.drainForHeartbeat();
      if (Array.isArray(drained) && drained.length) {
        batch =
          drained.length > maxBatchSize
            ? drained.slice(0, maxBatchSize)
            : drained;
        // If drained > maxBatchSize, push remainder into retryBuffer
        if (drained.length > maxBatchSize) {
          pushBackToRetryBuffer(drained.slice(maxBatchSize));
        }
      }
    }

    if (!batch.length) {
      // Nothing to flush this cycle
      return { ok: true, count: 0 };
    }

    console.log(
      `[WorldRhythm-v20] Flush cycle starting → ${batch.length} entries (retryBuffer: ${retryBuffer.length})`
    );

    // Try primary sink
    const primary = await flushToFirebase(batch);
    if (primary.ok) {
      return primary;
    }

    console.warn("[WorldRhythm-v20] Primary sink failed → attempting fallback…");

    // Try fallback sink(s)
    const fallback = await flushViaFallback(batch);
    if (fallback.ok) {
      return fallback;
    }

    // If everything fails, preserve batch for next tick
    console.error(
      "[WorldRhythm-v20] All sinks failed → preserving batch for next tick."
    );
    pushBackToRetryBuffer(batch);
    return { ok: false, error: fallback.error || primary.error };
  }

  // ---------------------------------------------------------------------------
  // RHYTHM TICK — THE ONE MIDDLEMAN
  // ---------------------------------------------------------------------------
  //
  // This is the world-level rhythm:
  //   • Runs every tickRate ms.
  //   • Never overlaps with itself (inFlight guard).
  //   • Performs bounded work:
  //       - At most one flushOnce() per tick.
  //       - At most maxRetries attempts with backoff inside a tick.
  //
  // This keeps the system:
  //   • non-blocking
  //   • predictable
  //   • drift-proof
  //

  async function rhythmTick() {
    if (inFlight) {
      console.warn("[WorldRhythm-v20] Tick skipped (previous tick still in flight).");
      return;
    }

    inFlight = true;
    try {
      let attempt = 0;
      let lastError = null;

      while (attempt < maxRetries) {
        attempt += 1;
        const res = await flushOnce();
        if (res.ok) {
          return;
        }
        lastError = res.error || lastError;

        // Simple linear backoff (could be exponential if desired)
        if (attempt < maxRetries) {
          const delay = backoffBaseMs * attempt;
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      }

      if (lastError) {
        console.error(
          "[WorldRhythm-v20] Max retries reached for this tick. Logs preserved in retryBuffer.",
          lastError
        );
      }
    } finally {
      inFlight = false;
    }
  }

  // ---------------------------------------------------------------------------
  // START GLOBAL RHYTHM LOOP
  // ---------------------------------------------------------------------------
  //
  // This is the ONLY interval this organ owns.
  // No hidden timers, no window.online listeners, no boot-time flushes.
  //

  const intervalId = setInterval(() => {
    rhythmTick().catch((err) => {
      console.error("[WorldRhythm-v20] rhythmTick failed:", err);
    });
  }, tickRate);

  // ---------------------------------------------------------------------------
  // PUBLIC API
  // ---------------------------------------------------------------------------
  //
  // Note:
  //   • We do NOT expose append() here anymore.
  //     Logger owns the log buffer; Rhythm only drains it.
  //   • We expose:
  //       - flush() → manual trigger of rhythmTick
  //       - stop()  → stop the world rhythm loop
  //       - getRetryBuffer() → inspect pending logs
  //

  return {
    // Manual flush trigger (e.g., before unload, or on demand)
    flush: () => rhythmTick(),

    // Stop the world rhythm loop (e.g., on teardown)
    stop: () => clearInterval(intervalId),

    // Inspect pending logs that failed to flush
    getRetryBuffer: () => retryBuffer.slice()
  };
}
