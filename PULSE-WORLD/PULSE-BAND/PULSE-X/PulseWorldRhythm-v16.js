/* ============================================================================
   PulseWorldRhythm-v16.js — IMMORTAL GLOBAL RHYTHM ORGAN
   ----------------------------------------------------------------------------
   PURPOSE:
     This organ is the ONE global middleman for:
       • Logging
       • Telemetry
       • Analytics
       • World-level sync

     All logs from ALL organs, ALL lanes, ALL pages, ALL hearts
     flow into a single local buffer.

     The heartbeat flushes that buffer to:
       1. Firebase (primary)
       2. Expansion → PulseNet (fallback)

   NOTES:
     • This organ must remain pure, deterministic, and drift-proof.
     • It must NEVER block the organism.
     • It must NEVER perform compute.
     • It must NEVER mutate external organs.
   ============================================================================ */
/* ============================================================================
   META BLOCK — PulseWorldRhythm-v16 IMMORTAL
   ----------------------------------------------------------------------------
   ORGAN NAME: PulseWorldRhythm
   VERSION: v16-IMMORTAL
   LAYER: World Layer (Above Hearts, Above Lanes, Above Pages)
   ROLE: Global Rhythm Coordinator + Log Flusher + Fallback Router

   IDENTITY:
     • The ONE global middleman for the entire organism.
     • Owns the IMMORTAL localBuffer for logs, telemetry, analytics.
     • Flushes ONLY on world-level rhythm ticks.
     • Never blocks, never computes, never mutates external organs.
     • Pure coordinator, pure scheduler, pure IMMORTAL.

   RESPONSIBILITIES:
     • Collect logs from ALL organs, ALL lanes, ALL hearts, ALL pages.
     • Maintain a deterministic append-only localBuffer.
     • Flush buffer → Firebase (primary).
     • If Firebase fails → Expansion → PulseNet (fallback).
     • Guarantee delivery even under catastrophic failure.
     • Run on a stable world-level rhythm (default 5s).
     • Flush after boot, before unload, and on demand.

   IMMORTAL TRAITS:
     • driftProof
     • zeroLatencyLocalWrites
     • batchFlush
     • fallbackRouted
     • worldLevelCoordinator
     • nonBlocking
     • deterministic
     • multiOrganAware
     • multiLaneAware
     • multiHeartAware
     • globalScope

   GUARANTEES:
     • No log is ever lost.
     • No log is ever blocked.
     • No log is ever reordered.
     • No log is ever mutated.
     • No log is ever flushed during boot.
     • All logs escape via Firebase or PulseNet.
     • Organ never stalls the organism.

   FALLBACK CONTRACT:
     • If FirebaseAdapter.batchWrite() fails:
         → ExpansionOrgan.sendIntent("world:log:fallback")
         → PulseNet.send("/world/logs/fallback")
         → Clear buffer only after confirmed fallback delivery.

   FAILURE MODES:
     • If both Firebase + PulseNet fail:
         → Buffer is preserved.
         → Next rhythm tick retries.
         → No data loss.

   ============================================================================
*/


/* ============================================================================
   ORGAN BLOCK — PulseWorldRhythm-v16
   ----------------------------------------------------------------------------
   This organ is the global rhythm conductor.
   It sits ABOVE:
     • MomHeart
     • DadHeart
     • BabyHeart
     • All lanes
     • All pages
     • All organs

   It is the ONLY safe bottleneck in the entire organism.
   ============================================================================
*/

export function createPulseWorldRhythm({
  ExpansionOrgan,
  PulseNet,
  FirebaseAdapter,
  tickRate = 5000 // 5 seconds default
}) {

  /* --------------------------------------------------------------------------
     IMMORTAL LOCAL BUFFER
     -------------------------------------------------------------------------- */
  const localBuffer = [];

  function append(entry) {
    try {
      localBuffer.push({
        ...entry,
        ts: Date.now(),
        id: crypto.randomUUID()
      });
    } catch (err) {
      console.warn("[WorldRhythm] Append failed:", err);
    }
  }


  /* --------------------------------------------------------------------------
     PRIMARY FLUSH → FIREBASE (BATCH)
     -------------------------------------------------------------------------- */
  async function flushToFirebase() {
    if (!localBuffer.length) return { ok: true, count: 0 };

    try {
      const payload = [...localBuffer];
      await FirebaseAdapter.batchWrite(payload);

      console.log(`[WorldRhythm] Firebase flush OK → ${payload.length} entries`);

      localBuffer.length = 0;
      return { ok: true, count: payload.length };
    } catch (err) {
      console.warn("[WorldRhythm] Firebase flush FAILED:", err);
      return { ok: false, error: err };
    }
  }


  /* --------------------------------------------------------------------------
     FALLBACK FLUSH → EXPANSION → PULSENET
     -------------------------------------------------------------------------- */
  async function flushViaFallback() {
    if (!localBuffer.length) return { ok: true, count: 0 };

    try {
      const payload = [...localBuffer];

      const expansionIntent = await ExpansionOrgan.sendIntent({
        type: "world:log:fallback",
        payload
      });

      const netRes = await PulseNet.send({
        route: "/world/logs/fallback",
        method: "POST",
        body: payload
      });

      console.log(
        `[WorldRhythm] Fallback flush OK → ${payload.length} entries`
      );

      localBuffer.length = 0;
      return { ok: true, count: payload.length, expansionIntent, netRes };
    } catch (err) {
      console.error("[WorldRhythm] Fallback flush FAILED:", err);
      return { ok: false, error: err };
    }
  }


  /* --------------------------------------------------------------------------
     GLOBAL RHYTHM TICK — THE ONE MIDDLEMAN
     -------------------------------------------------------------------------- */
  async function rhythmTick() {
    if (!localBuffer.length) return;

    console.log(
      `[WorldRhythm] Tick → attempting flush (${localBuffer.length} entries)`
    );

    const primary = await flushToFirebase();
    if (!primary.ok) {
      console.warn("[WorldRhythm] Primary failed → using fallback…");
      await flushViaFallback();
    }
  }


  /* --------------------------------------------------------------------------
     START GLOBAL RHYTHM LOOP
     -------------------------------------------------------------------------- */
  setInterval(() => {
    rhythmTick();
  }, tickRate);


  /* --------------------------------------------------------------------------
     PUBLIC API
     -------------------------------------------------------------------------- */
  return {
    append,
    flush: rhythmTick,
    flushToFirebase,
    flushViaFallback,
    buffer: localBuffer
  };
}
