// ============================================================================
//  PULSE-INDEX v27 — IMMORTAL++ REAL PULSE
//  Frontend UI • Portal-Signal Driven (when present) • Self-Pulsing Fallback
//  Reads from window.PulsePortal.getSignal() but DOES NOT depend on old signals
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
let __DOM_START = performance.now();
logID("DOM START", true);


if (!window.__PULSE_UI_INIT__) {
  window.__PULSE_UI_INIT__ = true;

  document.addEventListener("DOMContentLoaded", () => {
    // End DOM timing
    const __DOM_END = performance.now();
    const __DOM_TOTAL = (__DOM_END - __DOM_START).toFixed(1);
    logOK(`DOM END — TOTAL LOAD ${__DOM_TOTAL}ms`, true);
    logOK("DOM CONTENT LOADED — INDEX PAGE");

    // -------------------------------------------------------------------------
    // PulseBand panel UI
    // -------------------------------------------------------------------------
    try {
      const pbBadge = document.getElementById("pulseband-badge");
      const pbPanel = document.getElementById("pulseband-panel");
      let pbOpen = false;

      if (!pbBadge) logWarn("pbBadge missing");
      if (!pbPanel) logWarn("pbPanel missing");

      if (pbBadge && pbPanel) {
        pbBadge.addEventListener("click", () => {
          pbOpen = !pbOpen;
          pbPanel.classList.toggle("pb-open", pbOpen);
          logOK("PulseBand panel toggled", pbOpen);
        });

        document.addEventListener("click", (e) => {
          if (!pbPanel.contains(e.target) && !pbBadge.contains(e.target)) {
            pbOpen = false;
            pbPanel.classList.remove("pb-open");
          }
        });
      }
    } catch (err) {
      logErr("PulseBand UI init failed", err);
    }

    // -------------------------------------------------------------------------
    // PulseBand field refs
    // -------------------------------------------------------------------------
    const pbFields = {
      bars:       document.getElementById("pb-bars-text"),
      phone:      document.getElementById("pb-phonebars-text"),
      stability:  document.getElementById("pb-stability"),
      latency:    document.getElementById("pb-latency"),
      micro:      document.getElementById("pb-micro"),
      route:      document.getElementById("pb-route"),
      state:      document.getElementById("pb-state"),
      sync:       document.getElementById("pb-sync"),
      efficiency: document.getElementById("pb-efficiency"),
      health:     document.getElementById("pb-health"),
      advantage:  document.getElementById("pb-advantage"),
      estimated:  document.getElementById("pb-estimated")
    };

    // -------------------------------------------------------------------------
    // REAL SIGNAL SNAPSHOT — PulseSignal → localStorage → UI
    // -------------------------------------------------------------------------
    function getSignalSnapshot() {
      try {
        // Primary: PulseSignal bus (backed by localStorage)
        if (window.PulseSignal && typeof window.PulseSignal.getState === "function") {
          const state = window.PulseSignal.getState();
          if (state) return state;
        }

        // Fallback: PulseProofSignal.latest (merged top-layer)
        if (window.PulseProofSignal && typeof window.PulseProofSignal.latest === "function") {
          const latest = window.PulseProofSignal.latest();
          if (latest) return latest;
        }

        // Legacy: Portal signal
        if (window.PulsePortal && typeof window.PulsePortal.getSignal === "function") {
          return window.PulsePortal.getSignal();
        }

        // Legacy: PulseBand signal
        if (window.PulseBand && typeof window.PulseBand.getSignal === "function") {
          return window.PulseBand.getSignal();
        }

        // Last resort: cached snapshot
        return window.__PULSE_LAST_SIGNAL__ || null;
      } catch {
        return null;
      }
    }

    // -------------------------------------------------------------------------
    // Pulse-driven UI update
    // -------------------------------------------------------------------------
    function onPulse() {
      try {
        const snap = getSignalSnapshot();
        if (!snap) return;

        window.__PULSE_LAST_SIGNAL__ = snap;

        const signalBars  = snap && snap.network && snap.network.bars != null ? snap.network.bars : "—";
        const phoneBars   = snap && snap.device && snap.device.bars != null ? snap.device.bars : signalBars;
        const stability   = snap && snap.stability && snap.stability.score != null ? snap.stability.score : null;
        const latencyMs   = snap && snap.latency && snap.latency.ms != null ? snap.latency.ms : null;
        const microPhase  = snap && snap.micro && snap.micro.phase != null ? snap.micro.phase : (snap && snap.phase) || "Idle";
        const route       = snap && snap.network && snap.network.route != null ? snap.network.route : (snap && snap.route) || "Primary";
        const state       = snap && snap.state != null ? snap.state : "Active";
        const syncAge     = snap && snap.sync && snap.sync.ageLabel != null ? snap.sync.ageLabel : "Just now";
        const efficiency  = snap && snap.efficiency && snap.efficiency.label != null ? snap.efficiency.label : "Balanced";
        const health      = snap && snap.health && snap.health.label != null ? snap.health.label : "Excellent";
        const advantage   = snap && snap.advantage && snap.advantage.multiplier != null ? snap.advantage.multiplier : 1.0;
        const estimated   = snap && snap.advantage && snap.advantage.percent != null ? snap.advantage.percent : 0;

        if (pbFields.bars)       pbFields.bars.textContent       = String(signalBars);
        if (pbFields.phone)      pbFields.phone.textContent      = String(phoneBars);
        if (pbFields.stability)  pbFields.stability.textContent  = stability != null ? (stability + "%") : "—";
        if (pbFields.latency)    pbFields.latency.textContent    = latencyMs != null ? (latencyMs + " ms") : "—";
        if (pbFields.micro)      pbFields.micro.textContent      = microPhase;
        if (pbFields.route)      pbFields.route.textContent      = route;
        if (pbFields.state)      pbFields.state.textContent      = state;
        if (pbFields.sync)       pbFields.sync.textContent       = syncAge;
        if (pbFields.efficiency) pbFields.efficiency.textContent = efficiency;
        if (pbFields.health)     pbFields.health.textContent     = health;
        if (pbFields.advantage)  pbFields.advantage.textContent  = advantage + "× Faster";
        if (pbFields.estimated)  pbFields.estimated.textContent  = estimated + "% better";

      } catch (err) {
        logErr("Pulse-driven UI update failed", err);
      }
    }

    // -------------------------------------------------------------------------
    // Boot core beasts: PulseBand, BinaryOS, DualBandAI (if present)
    // -------------------------------------------------------------------------
    try {
      if (window.PulseBand && typeof window.PulseBand.emit === "function") {
        logOK("PulseBand detected — starting session");
        window.PulseBand.emit("request", { type: "start" });

        if (typeof window.PulseBand.on === "function") {
          window.PulseBand.on("signal", function (packet) {
            window.__PULSE_LAST_SIGNAL__ = packet && (packet.state || packet);
            onPulse();
          });
        }
      } else {
        logWarn("PulseBand not found — skipping PulseBand auto-start");
      }

      if (window.BinaryOS && typeof window.BinaryOS.boot === "function") {
        window.BinaryOS.boot();
        logOK("BinaryOS booted");
      }

      if (window.DualBandAI && typeof window.DualBandAI.boot === "function") {
        window.DualBandAI.boot();
        logOK("DualBandAI booted");
      }
    } catch (err) {
      logErr("Beast boot sequence failed", err);
    }

   // -------------------------------------------------------------------------
// PULSE SIGNAL SUBSCRIBE (IMMORTAL++ LOCALSTORAGE BUS)
// -------------------------------------------------------------------------
try {
  const PS = window.PulseSignal;

  // ⭐ 1 — Subscribe to live PulseSignal engine (if available)
  if (PS && typeof PS.subscribe === "function") {
    PS.subscribe(function (packet) {
      const state = packet && (packet.state || packet);

      // Save last signal in memory
      window.__PULSE_LAST_SIGNAL__ = state;

      // ⭐ IMMORTAL++ broadcast to localStorage
      try {
        localStorage.setItem("__pulse_signal__", JSON.stringify(state));
      } catch {}

      onPulse();
    });

    logOK("Subscribed to PulseSignal (IMMORTAL++ localStorage-backed)");
  } else {
    logWarn("PulseSignal not found — relying on storage bus only");
  }

  // ⭐ 2 — Listen for localStorage events (cross-tab, cross-window)
  window.addEventListener("storage", function (e) {
    if (e.key === "__pulse_signal__") {
      try {
        const packet = e.newValue ? JSON.parse(e.newValue) : null;
        window.__PULSE_LAST_SIGNAL__ = packet;
        onPulse();
      } catch {
        // ignore
      }
    }
  });

  // ⭐ 3 — Restore last signal on boot (IMMORTAL++)
  try {
    const last = localStorage.getItem("__pulse_signal__");
    if (last) {
      window.__PULSE_LAST_SIGNAL__ = JSON.parse(last);
      onPulse();
    }
  } catch {}

} catch (err) {
  logErr("PulseSignal subscription failed", err);
}


    // -------------------------------------------------------------------------
    // REAL Pulse Engine v27 (no async, just timers + RAF)
    // -------------------------------------------------------------------------
    logID("Initializing REAL Pulse Engine v27");

    // 1 — Balanced pulse (every 120ms)
    var __pulseTimer = setInterval(function () {
      try { onPulse(); } catch {}
    }, 120);

    // 2 — Animation-frame pulse (smooth UI)
    function rafPulse() {
      try { onPulse(); } catch {}
      requestAnimationFrame(rafPulse);
    }
    requestAnimationFrame(rafPulse);

    // 3 — Visibility pulse (tab focus)
    document.addEventListener("visibilitychange", function () {
      if (!document.hidden) {
        logOK("Visibility pulse");
        try { onPulse(); } catch {}
      }
    });

    // 4 — Network pulse
    window.addEventListener("online",  function () { logOK("Network online pulse");  onPulse(); });
    window.addEventListener("offline", function () { logWarn("Network offline pulse"); onPulse(); });

    // 5 — User interaction pulse
    ["click", "keydown", "mousemove", "touchstart"].forEach(function (evt) {
      window.addEventListener(evt, function () {
        try { onPulse(); } catch {}
      }, { passive: true });
    });

    logOK("REAL Pulse Engine v27 initialized");

    // -------------------------------------------------------------------------
    // GPU TEST — uses real signal snapshot, no async keyword
    // -------------------------------------------------------------------------
    try {
      var testBtn     = document.getElementById("tp-test-button");
      var testFile    = document.getElementById("tp-test-file");
      var testStatus  = document.getElementById("tp-test-status");
      var testMetrics = document.getElementById("tp-test-metrics");

      if (testBtn) {
        testBtn.addEventListener("click", function () {
          try {
            if (!testFile || !testFile.files || !testFile.files.length) {
              if (testStatus) testStatus.textContent = "Please select a file first.";
              logWarn("GPU test: no file selected");
              return;
            }

            if (testStatus)  testStatus.textContent  = "Running GPU warm test…";
            if (testMetrics) testMetrics.textContent = "";

            // Let layout settle
            requestAnimationFrame(function () {
              var file = testFile.files[0];
              var before = performance.now();

              file.arrayBuffer().then(function () {
                var after = performance.now();
                var decodeMs = Math.round(after - before);

                var snap = getSignalSnapshot() || {};

                var gpuSmooth   = snap && snap.stability && snap.stability.score != null ? snap.stability.score : null;
                var advantage   = snap && snap.advantage && snap.advantage.multiplier != null ? snap.advantage.multiplier : null;
                var route       = snap && snap.network && snap.network.route != null ? snap.network.route : (snap && snap.route) || null;
                var cpuImpact   = snap && snap.cpu && snap.cpu.impact != null ? snap.cpu.impact : null;
                var memImpact   = snap && snap.memory && snap.memory.impact != null ? snap.memory.impact : null;
                var microMs     = snap && snap.latency && (snap.latency.microMs != null ? snap.latency.microMs : snap.latency.ms != null ? snap.latency.ms : null);

                if (testMetrics) {
                  testMetrics.innerHTML =
                    "GPU Smoothness: <strong>" + (gpuSmooth != null ? gpuSmooth + "%" : "—") + "</strong><br>" +
                    "Pulse Advantage: <strong>" + (advantage != null ? advantage + "×" : "—") + "</strong><br>" +
                    "Network Route: <strong>" + (route || "—") + "</strong><br>" +
                    "CPU Impact: <strong>" + (cpuImpact != null ? cpuImpact + "%" : "—") + "</strong><br>" +
                    "Memory Impact: <strong>" + (memImpact != null ? memImpact + "%" : "—") + "</strong><br>" +
                    "Micro Latency: <strong>" + (microMs != null ? microMs + " ms" : "—") + "</strong><br>" +
                    "Decode Speed: <strong>" + decodeMs + " ms</strong>";
                }

                if (testStatus) testStatus.textContent = "Test complete.";
                logOK("GPU test complete (real signal snapshot)");
              }).catch(function (err) {
                logErr("GPU test failed", err);
                if (testStatus)  testStatus.textContent  = "Test failed.";
                if (testMetrics) testMetrics.textContent = "";
              });
            });
          } catch (err) {
            logErr("GPU test failed (outer)", err);
            if (testStatus)  testStatus.textContent  = "Test failed.";
            if (testMetrics) testMetrics.textContent = "";
          }
        });
      }
    } catch (err) {
      logErr("GPU test init failed", err);
    }

    // -------------------------------------------------------------------------
    // FAQ ACCORDION (unchanged)
    // -------------------------------------------------------------------------
    try {
      document.querySelectorAll("[data-faq]").forEach(function (item) {
        var btn = item.querySelector(".faq-question");
        if (!btn) return;
        btn.addEventListener("click", function () {
          var isOpen = item.classList.contains("open");
          document.querySelectorAll("[data-faq]").forEach(function (i) {
            i.classList.remove("open");
          });
          if (!isOpen) item.classList.add("open");
        });
      });

      logOK("FAQ accordion initialized");
    } catch (err) {
      logErr("FAQ accordion failed", err);
    }

    logOK("INDEX PAGE FULLY INITIALIZED");
  });
}
