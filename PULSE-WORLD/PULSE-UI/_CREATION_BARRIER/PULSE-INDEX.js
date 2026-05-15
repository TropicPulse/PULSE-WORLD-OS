// ============================================================================
//  PULSE-INDEX v30 — IMMORTAL++ REAL PULSE + GPU TEMPO
//  Frontend UI • PulseSignal / PulsePort.Global Driven • Self-Pulsing Fallback
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

function _pulseChronoLabel(absolute) {
  const now = performance.now();
  const diff = now - _pulseChronoLast;

  const label = absolute
    ? `@${now.toFixed(1)}ms`
    : `+${diff.toFixed(1)}ms`;

  _pulseChronoLast = now;
  return label;
}

// ---------------------------------------------------------------------------
//  LOGGERS — All Upgraded to Chrono v26
// ---------------------------------------------------------------------------
function logID(msg, absolute = false, ...rest) {
  const time = _pulseChronoLabel(absolute);
  console.log(
    `%c[PULSE-INDEX] %c${msg} %c${time}`,
    C_ID,
    C_INFO,
    "color:#999;font-weight:300;",
    ...rest
  );
}

function logOK(msg, absolute = false, ...rest) {
  const time = _pulseChronoLabel(absolute);
  console.log(
    `%c[PULSE-INDEX] %c${msg} %c${time}`,
    C_ID,
    C_OK,
    "color:#999;font-weight:300;",
    ...rest
  );
}

function logWarn(msg, absolute = false, ...rest) {
  const time = _pulseChronoLabel(absolute);
  console.warn(
    `%c[PULSE-INDEX] %c${msg} %c${time}`,
    C_ID,
    C_WARN,
    "color:#999;font-weight:300;",
    ...rest
  );
}

function logErr(msg, absolute = false, ...rest) {
  const time = _pulseChronoLabel(absolute);
  console.error(
    `%c[PULSE-INDEX] %c${msg} %c${time}`,
    C_ID,
    C_ERR,
    "color:#999;font-weight:300;",
    ...rest
  );
}

// Optional: manual reset
logID.reset = () => {
  _pulseChronoLast = performance.now();
  console.log(`%c[PULSE-INDEX] %cTimer reset`, C_ID, C_WARN);
};


// ============================================================================
//  DOM TIMING — NEW
// ============================================================================
logID("BOOT MEMBRANE START");

// Start DOM timing
window.__DOM_START = performance.now();
logID("DOM START", true);

// ===============================================================
// INDEX PAGE — DOM INIT v30 (Stable, Deterministic, Pulse‑Aligned)
// ===============================================================
if (!window.__PULSE_DOM_V30__) {
  window.__PULSE_DOM_V30__ = true;

  document.addEventListener("DOMContentLoaded", () => {
    const domEnd = performance.now();
    const domTotal = (domEnd - (window.__DOM_START || domEnd)).toFixed(1);
    logOK(`DOM READY — ${domTotal}ms`);

    // -----------------------------------------------------------
    // 1. SAFE FIELD MAP (auto‑null‑tolerant)
    // -----------------------------------------------------------
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
    // 2. PULSE SNAPSHOT RESOLVER (Unified v30 — Import‑Free Index)
    // -----------------------------------------------------------
    function getSnap() {
      try {
        return window.__PULSE_LAST_SIGNAL__ || null;
      } catch {
        return null;
      }
    }

    // -----------------------------------------------------------
    // 3. UI UPDATE (Stable, No Drift)
    // -----------------------------------------------------------
    function updateUI() {
      const s = getSnap();
      if (!s) return;

      window.__PULSE_LAST_SIGNAL__ = s;

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
    // 4. PULSE SIGNAL SUBSCRIBE (IMMORTAL++ v30)
    // -----------------------------------------------------------
    try {
      const PS = window.PulseSignal;

      if (PS?.subscribe) {
        PS.subscribe((packet) => {
          const state = packet?.state || packet;
          window.__PULSE_LAST_SIGNAL__ = state;

          try {
            localStorage.setItem("__pulse_signal__", JSON.stringify(state));
          } catch {}

          updateUI();
        });

        logOK("PulseSignal v30 subscribed");
      }

      // Cross‑tab sync
      window.addEventListener("storage", (e) => {
        if (e.key === "__pulse_signal__") {
          try {
            window.__PULSE_LAST_SIGNAL__ = JSON.parse(e.newValue);
            updateUI();
          } catch {}
        }
      });

      // Restore last snapshot
      try {
        const last = localStorage.getItem("__pulse_signal__");
        if (last) {
          window.__PULSE_LAST_SIGNAL__ = JSON.parse(last);
          updateUI();
        }
      } catch {}
    } catch (err) {
      logErr("PulseSignal v30 subscription failed", err);
    }

    // -----------------------------------------------------------
    // 5. PULSE ENGINE v30 (Balanced + RAF) — BASE LOOP
    // -----------------------------------------------------------
    setInterval(updateUI, 120);

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

    logOK("Pulse Engine v30 active");

    // -----------------------------------------------------------
    // 5b. GPU LYMPH TEMPO (Heartbeat Attach, if present)
    // -----------------------------------------------------------
    try {
      // From upgraded GPU lymph nodes module
      window.PulseGpuLymphTempo?.attachToUi?.(updateUI);
      logOK("GPU Lymph Tempo attached");
    } catch (err) {
      logWarn("GPU Lymph Tempo attach failed");
    }

    // -----------------------------------------------------------
    // 6. WORLD‑READY PHASE (100/200/500ms — PulsePort, Mesh, World, Routes)
    // -----------------------------------------------------------
    [100, 200, 500].forEach((delay) => {
      setTimeout(() => {
        try {
          if (window.PulsePort?.Global?.signal) {
            window.__PULSE_LAST_SIGNAL__ = window.PulsePort.Global.signal;
            updateUI();
            logOK(`World‑Ready (${delay}ms): PulsePort.Global signal applied`);
          }
        } catch {}
      }, delay);
    });

    // -----------------------------------------------------------
    // 7. BOOT CORE SYSTEMS (PulseBand, BinaryOS, DualBandAI)
    // -----------------------------------------------------------
    try {
      window.PulseBand?.emit?.("request", { type: "start" });
      window.PulseBand?.on?.("signal", (p) => {
        window.__PULSE_LAST_SIGNAL__ = p?.state || p;
        updateUI();
      });

      window.BinaryOS?.boot?.();
      window.DualBandAI?.boot?.();

      logOK("Core systems booted");
    } catch (err) {
      logErr("Core boot failed", err);
    }

    logOK("INDEX PAGE v30 DOM INIT COMPLETE");
  });
}
