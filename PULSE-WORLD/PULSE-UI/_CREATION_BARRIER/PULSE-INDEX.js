// ============================================================================
//  PULSE-INDEX v26 — IMMORTAL++
//  Frontend UI • Portal-Signal Driven • Zero Backend Imports
//  Reads ONLY from window.PulsePortal.getSignal()
// ============================================================================

// IMMORTAL COLOR CONSTANTS
const C_ID   = "color:#00E5FF; font-weight:bold; font-family:monospace;";
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

  // ============================================================================
  //  PULSEBAND PANEL TOGGLE
  // ============================================================================
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

  // ============================================================================
  //  PULSEBAND FIELD REFERENCES
  // ============================================================================
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

  // ============================================================================
  //  PORTAL SIGNAL SNAPSHOT
  // ============================================================================
  function getSignalSnapshot() {
    try {
      return window.PulsePortal?.getSignal?.() || null;
    } catch {
      return null;
    }
  }

  // ============================================================================
  //  PULSE-DRIVEN UI UPDATE (NO TIMER, NO WAIT LOOP)
  // ============================================================================
  function onPulse(packet) {
    try {
      const snap = getSignalSnapshot();
      if (!snap) return; // engine hasn't pulsed yet — stay silent

      const signalBars  = snap?.network?.bars ?? "—";
      const phoneBars   = snap?.device?.bars ?? signalBars;
      const stability   = snap?.stability?.score ?? null;
      const latencyMs   = snap?.latency?.ms ?? null;
      const microPhase  = snap?.micro?.phase ?? snap?.phase ?? "Idle";
      const route       = snap?.network?.route ?? snap?.route ?? "Primary";
      const state       = snap?.state ?? "Active";
      const syncAge     = snap?.sync?.ageLabel ?? "Just now";
      const efficiency  = snap?.efficiency?.label ?? "Balanced";
      const health      = snap?.health?.label ?? "Excellent";
      const advantage   = snap?.advantage?.multiplier ?? 1.0;
      const estimated   = snap?.advantage?.percent ?? 0;

      if (pbFields.bars)       pbFields.bars.textContent       = String(signalBars);
      if (pbFields.phone)      pbFields.phone.textContent      = String(phoneBars);
      if (pbFields.stability)  pbFields.stability.textContent  = stability != null ? `${stability}%` : "—";
      if (pbFields.latency)    pbFields.latency.textContent    = latencyMs != null ? `${latencyMs} ms` : "—";
      if (pbFields.micro)      pbFields.micro.textContent      = microPhase;
      if (pbFields.route)      pbFields.route.textContent      = route;
      if (pbFields.state)      pbFields.state.textContent      = state;
      if (pbFields.sync)       pbFields.sync.textContent       = syncAge;
      if (pbFields.efficiency) pbFields.efficiency.textContent = efficiency;
      if (pbFields.health)     pbFields.health.textContent     = health;
      if (pbFields.advantage)  pbFields.advantage.textContent  = `${advantage}× Faster`;
      if (pbFields.estimated)  pbFields.estimated.textContent  = `${estimated}% better`;

    } catch (err) {
      logErr("Pulse-driven UI update failed", err);
    }
  }

  // ============================================================================
  //  SUBSCRIBE TO CNS PULSES
  // ============================================================================
  if (window.PulseProofSignal?.subscribe) {
    window.PulseProofSignal.subscribe(onPulse);
    logOK("Pulse-driven UI subscribed to engine");
  } else {
    logWarn("PulseProofSignal.subscribe missing — UI will not pulse");
  }

  // ============================================================================
  //  GPU TEST (UNCHANGED)
  // ============================================================================
  try {
    const testBtn     = document.getElementById("tp-test-button");
    const testFile    = document.getElementById("tp-test-file");
    const testStatus  = document.getElementById("tp-test-status");
    const testMetrics = document.getElementById("tp-test-metrics");

    testBtn?.addEventListener("click", async () => {
      try {
        if (!testFile?.files?.length) {
          if (testStatus) testStatus.textContent = "Please select a file first.";
          logWarn("GPU test: no file selected");
          return;
        }

        if (testStatus)  testStatus.textContent  = "Running GPU warm test…";
        if (testMetrics) testMetrics.textContent = "";

        await new Promise((res) => requestAnimationFrame(res));

        const file = testFile.files[0];

        const before = performance.now();
        await file.arrayBuffer();
        const after = performance.now();
        const decodeMs = Math.round(after - before);

        const snap = getSignalSnapshot();

        const gpuSmooth   = snap?.stability?.score ?? null;
        const advantage   = snap?.advantage?.multiplier ?? null;
        const route       = snap?.network?.route ?? snap?.route ?? null;
        const cpuImpact   = snap?.cpu?.impact ?? null;
        const memImpact   = snap?.memory?.impact ?? null;
        const microMs     = snap?.latency?.microMs ?? null;

        if (testMetrics) {
          testMetrics.innerHTML = `
            GPU Smoothness: <strong>${gpuSmooth != null ? gpuSmooth + "%" : "—"}</strong><br>
            Pulse Advantage: <strong>${advantage != null ? advantage + "×" : "—"}</strong><br>
            Network Route: <strong>${route ?? "—"}</strong><br>
            CPU Impact: <strong>${cpuImpact != null ? cpuImpact + "%" : "—"}</strong><br>
            Memory Impact: <strong>${memImpact != null ? memImpact + "%" : "—"}</strong><br>
            Micro Latency: <strong>${microMs != null ? microMs + " ms" : "—"}</strong><br>
            Decode Speed: <strong>${decodeMs} ms</strong>
          `;
        }

        if (testStatus) testStatus.textContent = "Test complete.";
        logOK("GPU test complete (Portal signal snapshot)");
      } catch (err) {
        logErr("GPU test failed", err);
        if (testStatus)  testStatus.textContent  = "Test failed.";
        if (testMetrics) testMetrics.textContent = "";
      }
    });
  } catch (err) {
    logErr("GPU test init failed", err);
  }

  // ============================================================================
  //  FAQ ACCORDION (UNCHANGED)
  // ============================================================================
  try {
    document.querySelectorAll("[data-faq]").forEach((item) => {
      const btn = item.querySelector(".faq-question");
      btn.addEventListener("click", () => {
        const isOpen = item.classList.contains("open");
        document.querySelectorAll("[data-faq]").forEach((i) => i.classList.remove("open"));
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
