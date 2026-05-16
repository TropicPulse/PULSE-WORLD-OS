// ============================================================================
//  PULSE-INDEX v30.3 — IMMORTAL++ REAL PULSE + GPU TEMPO + INDEXEDDB PERSISTENCE
//  Frontend UI • PulseSignal / PulsePort.Global Driven • Self-Pulsing Fallback
//  IMMORTAL STORAGE: PulseDB (IndexedDB) — No localStorage, No storage events
// ============================================================================

// IMMORTAL COLOR CONSTANTS
const C_ID   = "color:#26C6DA; font-weight:bold; font-family:monospace;";
const C_OK   = "color:#00FF9C; font-family:monospace;";
const C_INFO = "color:#E8F8FF; font-family:monospace;";
const C_WARN = "color:#FFE066; font-family:monospace;";
const C_ERR  = "color:#FF3B3B; font-weight:bold; font-family:monospace;";

// ---------------------------------------------------------------------------
//  PULSE-CHRONO v26 — Unified Timing Core
// ---------------------------------------------------------------------------
let _pulseChronoLast = performance.now();
function _pulseChronoLabel(abs) {
  const now = performance.now();
  const diff = now - _pulseChronoLast;
  const label = abs ? `@${now.toFixed(1)}ms` : `+${diff.toFixed(1)}ms`;
  _pulseChronoLast = now;
  return label;
}

function logID(msg, abs = false, ...rest) {
  console.log(`%c[PULSE-INDEX] %c${msg} %c${_pulseChronoLabel(abs)}`,
    C_ID, C_INFO, "color:#999;font-weight:300;", ...rest);
}
function logOK(msg, abs = false, ...rest) {
  console.log(`%c[PULSE-INDEX] %c${msg} %c${_pulseChronoLabel(abs)}`,
    C_ID, C_OK, "color:#999;font-weight:300;", ...rest);
}
function logWarn(msg, abs = false, ...rest) {
  console.warn(`%c[PULSE-INDEX] %c${msg} %c${_pulseChronoLabel(abs)}`,
    C_ID, C_WARN, "color:#999;font-weight:300;", ...rest);
}
function logErr(msg, abs = false, ...rest) {
  console.error(`%c[PULSE-INDEX] %c${msg} %c${_pulseChronoLabel(abs)}`,
    C_ID, C_ERR, "color:#999;font-weight:300;", ...rest);
}

// ============================================================================
//  DOM TIMING
// ============================================================================
logID("BOOT MEMBRANE START");
window.__DOM_START = performance.now();
logID("DOM START", true);

// IMMORTAL IndexedDB Pulse Cache
const PulseStore = window.PulseDB?.store("pulse_state");

// In-memory fallback
window.__PULSE_LAST_SIGNAL__ = null;

// ===============================================================
// INDEX PAGE — DOM INIT v30.3 (IMMORTAL IndexedDB)
// ===============================================================
if (!window.__PULSE_DOM_V30__) {
  window.__PULSE_DOM_V30__ = true;

  document.addEventListener("DOMContentLoaded", async () => {
    const domEnd = performance.now();
    logOK(`DOM READY — ${(domEnd - window.__DOM_START).toFixed(1)}ms`);

    const $ = (id) => document.getElementById(id);

    const PB = {
      bars:       $("pb-bars-text"),
      phone:      $("pb-phonebars-text"),
      stability:  $("pb-stability"),
      latency:    $("pb-latency"),
      micro:      $("pb-micro"),
      route:      $("pb-route"),
      state:      $("pb-state"),
      sync:       $("pb-sync"),
      efficiency: $("pb-efficiency"),
      health:     $("pb-health"),
      advantage:  $("pb-advantage"),
      estimated:  $("pb-estimated")
    };

    // -----------------------------------------------------------
    // IMMORTAL RESTORE FROM INDEXEDDB
    // -----------------------------------------------------------
    try {
      const cached = await PulseStore?.get("last");
      if (cached) {
        window.__PULSE_LAST_SIGNAL__ = cached;
        logOK("Restored IMMORTAL pulse snapshot from IndexedDB");
      }
    } catch (err) {
      logWarn("IndexedDB restore failed", err);
    }

    // -----------------------------------------------------------
    // UI UPDATE
    // -----------------------------------------------------------
    function getSnap() {
      return window.__PULSE_LAST_SIGNAL__ || null;
    }

    function updateUI() {
      const s = getSnap();
      if (!s) return;

      PB.bars       && (PB.bars.textContent       = s.network?.bars ?? "—");
      PB.phone      && (PB.phone.textContent      = s.device?.bars ?? s.network?.bars ?? "—");
      PB.stability  && (PB.stability.textContent  = s.stability?.score != null ? s.stability.score + "%" : "—");
      PB.latency    && (PB.latency.textContent    = s.latency?.ms != null ? s.latency.ms + " ms" : "—");
      PB.micro      && (PB.micro.textContent      = s.micro?.phase ?? s.phase ?? "Idle");
      PB.route      && (PB.route.textContent      = s.network?.route ?? s.route ?? "Primary");
      PB.state      && (PB.state.textContent      = s.state ?? "Active");
      PB.sync       && (PB.sync.textContent       = s.sync?.ageLabel ?? "Just now");
      PB.efficiency && (PB.efficiency.textContent = s.efficiency?.label ?? "Balanced");
      PB.health     && (PB.health.textContent     = s.health?.label ?? "Excellent");
      PB.advantage  && (PB.advantage.textContent  = (s.advantage?.multiplier ?? 1) + "× Faster");
      PB.estimated  && (PB.estimated.textContent  = (s.advantage?.percent ?? 0) + "% better");
    }

    // -----------------------------------------------------------
    // PulseSignal subscription — IMMORTAL IndexedDB persistence
    // -----------------------------------------------------------
    try {
      const PS = window.PulseSignal;

      if (PS?.subscribe) {
        PS.subscribe(async (packet) => {
          const state = packet?.state || packet;
          window.__PULSE_LAST_SIGNAL__ = state;

          try {
            await PulseStore?.set("last", state);
          } catch {}

          updateUI();
        });

        logOK("PulseSignal v30.3 subscribed");
      }
    } catch (err) {
      logErr("PulseSignal subscription failed", err);
    }

    // -----------------------------------------------------------
    // Base Loop
    // -----------------------------------------------------------
    const uiInterval = setInterval(updateUI, 120);

    (function rafLoop() {
      updateUI();
      requestAnimationFrame(rafLoop);
    })();

    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) updateUI();
    });

    window.addEventListener("online",  updateUI);
    window.addEventListener("offline", updateUI);

    ["click", "keydown", "mousemove", "touchstart"].forEach((evt) => {
      window.addEventListener(evt, updateUI, { passive: true });
    });

    logOK("Pulse Engine v30.3 active");

    // -----------------------------------------------------------
    // GPU Lymph Tempo
    // -----------------------------------------------------------
    try {
      window.PulseGpuLymphTempo?.attachToUi?.(updateUI);
      logOK("GPU Lymph Tempo attached");
    } catch (err) {
      logWarn("GPU Lymph Tempo attach failed");
    }

    // -----------------------------------------------------------
    // World-ready phase
    // -----------------------------------------------------------
    [100, 200, 500].forEach((delay) => {
      setTimeout(() => {
        try {
          if (window.PulsePort?.Global?.signal) {
            window.__PULSE_LAST_SIGNAL__ = window.PulsePort.Global.signal;
            PulseStore?.set("last", window.__PULSE_LAST_SIGNAL__);
            updateUI();
            logOK(`World‑Ready (${delay}ms): PulsePort.Global applied`);
          }
        } catch {}
      }, delay);
    });

    // -----------------------------------------------------------
    // Core systems boot
    // -----------------------------------------------------------
    try {
      window.PulseBand?.emit?.("request", { type: "start" });
      window.PulseBand?.on?.("signal", async (p) => {
        window.__PULSE_LAST_SIGNAL__ = p?.state || p;
        await PulseStore?.set("last", window.__PULSE_LAST_SIGNAL__);
        updateUI();
      });

      window.BinaryOS?.boot?.();
      window.DualBandAI?.boot?.();

      logOK("Core systems booted");
    } catch (err) {
      logErr("Core boot failed", err);
    }

    logOK("INDEX PAGE v30.3 DOM INIT COMPLETE");

    window.__PULSE_INDEX_CLEANUP__ = () => {
      clearInterval(uiInterval);
      logID("PULSE-INDEX cleanup invoked");
    };
  });
}
