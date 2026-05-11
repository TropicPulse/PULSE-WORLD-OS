
/* ============================================================
   IMMORTAL COLOR CONSTANTS
============================================================ */
const C_ID   = "color:#00E5FF; font-weight:bold; font-family:monospace;";
const C_OK   = "color:#00FF9C; font-family:monospace;";
const C_INFO = "color:#E8F8FF; font-family:monospace;";
const C_WARN = "color:#FFE066; font-family:monospace;";
const C_ERR  = "color:#FF3B3B; font-weight:bold; font-family:monospace;";

function logID(msg, ...rest) {
  console.log(`%c[PULSE-INDEX] %c${msg}`, C_ID, C_INFO, ...rest);
}
function logOK(msg, ...rest) {
  console.log(`%c[PULSE-INDEX] %c${msg}`, C_ID, C_OK, ...rest);
}
function logWarn(msg, ...rest) {
  console.log(`%c[PULSE-INDEX] %c${msg}`, C_ID, C_WARN, ...rest);
}
function logErr(msg, ...rest) {
  console.error(`%c[PULSE-INDEX] %c${msg}`, C_ID, C_ERR, ...rest);
}

/* ============================================================
   0. BOOT MEMBRANE — MUST BE FIRST
============================================================ */
logID("BOOT MEMBRANE START");

/* ============================================================
   1. UI INIT — RUN ONCE ONLY
============================================================ */
if (!window.__PULSE_UI_INIT__) {
  window.__PULSE_UI_INIT__ = true;

  document.addEventListener("DOMContentLoaded", () => {
    logOK("DOM CONTENT LOADED — INDEX PAGE");

    /* ============================================================
       2. PULSEBAND UI — UI ONLY
    ============================================================ */
    try {
      logID("INIT PULSEBAND UI");

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

    /* ============================================================
       3. PULSEBAND SNAPSHOT — IMMORTAL++ UPGRADE
    ============================================================ */
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
    
async function waitForEngines() {
  logID("WAITING FOR ENGINES — HARD‑WIRE MODE + PULSEBAND SUPPORT");

  async function tryWireKernel() {
    let Kernel =
      window.PulseBinaryKernel ||
      window.PulseBinaryOSv24Immortal?.Kernel ||
      null;

    if (Kernel && typeof Kernel.then === "function") {
      Kernel = await Kernel;
    }

    if (Kernel) {
      window.PulseBinaryKernel = Kernel;

      if (!window.PulseBinary) {
        const vitalsImpl =
          Kernel?.Vitals?.generateVitals ||
          Kernel?.Vitals?.generate ||
          null;

        const sentienceImpl = Kernel?.Sentience?.snapshot || null;
        const consciousnessImpl =
          Kernel?.Consciousness?.generateConsciousnessPacket ||
          Kernel?.Consciousness?.latest ||
          null;

        window.PulseBinary = Object.freeze({
          meta: Kernel.meta || null,
          Vitals: {
            generate: () => (vitalsImpl ? vitalsImpl() : null)
          },
          Sentience: {
            snapshot: () => (sentienceImpl ? sentienceImpl() : null)
          },
          Consciousness: {
            latest: () => (consciousnessImpl ? consciousnessImpl() : null)
          }
        });

        logOK("PulseBinary shadow created on index page");
      }

      if (!window.VitalsMonitor) {
        logWarn("VitalsMonitor missing — creating inline monitor");
        window.VitalsMonitor = {
          Vitals: {
            generate() {
              try {
                return window.PulseBinary?.Vitals?.generate?.() ?? null;
              } catch (err) {
                logErr("VitalsMonitor.Vitals.generate failed", err);
                return null;
              }
            }
          }
        };
      }
    }
  }

  // NEW: Try to wire PulseBand FIRST
  function tryWirePulseBand() {
    if (window.pulseband && !window.PulseBand) {
      window.PulseBand = window.pulseband;
      logOK("PulseBand detected via window.pulseband");
    }

    if (window.PulseBand) {
      // PulseBand is a session engine, not a vitals engine
      // but we expose it so updatePulseBand() can use it if needed
      return true;
    }

    return false;
  }

  let spins = 0;

  while (true) {
    spins++;

    // 1. Prefer PulseBand if present
    if (tryWirePulseBand()) {
      logOK("PulseBand available — engines ready");
      return;
    }

    // 2. Try to wire PulseBinaryKernel every 10 spins
    if (spins % 10 === 0) {
      await tryWireKernel();
    }

    // 3. If PulseBinary + VitalsMonitor exist → ready
    if (
      window.VitalsMonitor &&
      window.VitalsMonitor.Vitals &&
      window.VitalsMonitor.Vitals.generate &&
      window.PulseBinary &&
      window.PulseBinary.Sentience
    ) {
      logOK("PulseBinary engines ready");
      return;
    }

    logWarn("Engines not ready yet…", {
      spin: spins,
      hasPulseBand: !!window.PulseBand,
      hasPulseBinary: !!window.PulseBinary,
      hasVitalsMonitor: !!window.VitalsMonitor,
      hasKernel: !!window.PulseBinaryKernel
    });

    await new Promise((res) => setTimeout(res, 100));
  }
  logOK("ENGINES READY — PulseBand fully embedded");
}

async function updatePulseBand() {
  try {
    // ============================================================
    // 1. PULSEBAND FIRST — REAL SESSION ENGINE
    // ============================================================
    const band = window.pulseband || window.PulseBand || null;

    if (band && typeof band.snapshot === "function") {
      const snap = band.snapshot() || {};

      const signalBars  = snap?.network?.bars ?? "—";
      const phoneBars   = snap?.device?.bars ?? signalBars;
      const stability   = snap?.stability?.score ?? null;
      const latencyMs   = snap?.latency?.ms ?? null;
      const microPhase  = snap?.micro?.phase ?? "Idle";
      const route       = snap?.network?.route ?? "Primary";
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

      logOK("PulseBand UI updated (PulseBand session engine)");
      return;
    }

    // ============================================================
    // 2. FALLBACK: PulseBinary + VitalsMonitor
    // ============================================================
    if (!window.VitalsMonitor) {
      logWarn("VitalsMonitor missing");
      return;
    }
    if (!window.PulseBinary) {
      logWarn("PulseBinary missing");
      return;
    }

    const vitals    = window.VitalsMonitor.Vitals.generate() ?? null;
    const binary    = window.PulseBinary ?? null;
    const sentience = binary?.Sentience?.snapshot?.() ?? null;

    if (!vitals) logWarn("Vitals generate() returned null");
    if (!sentience) logWarn("Sentience snapshot missing");

    const signalBars  = vitals?.network?.bars ?? "—";
    const phoneBars   = vitals?.device?.bars ?? signalBars;
    const stability   = vitals?.stability?.score ?? null;
    const latencyMs   = vitals?.latency?.ms ?? null;
    const microPhase  = vitals?.micro?.phase ?? sentience?.phase ?? "Idle";
    const route       = vitals?.network?.route ?? "Primary";
    const state       = vitals?.state ?? "Active";
    const syncAge     = vitals?.sync?.ageLabel ?? "Just now";
    const efficiency  = vitals?.efficiency?.label ?? "Balanced";
    const health      = vitals?.health?.label ?? "Excellent";
    const advantage   = vitals?.advantage?.multiplier ?? 1.0;
    const estimated   = vitals?.advantage?.percent ?? 0;

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

    logOK("PulseBand UI updated (PulseBinary fallback)");
  } catch (err) {
    logErr("PulseBand update failed", err);
  }
}


    (async () => {
      try {
        await waitForEngines();
        updatePulseBand();
        setInterval(updatePulseBand, 1000);
      } catch (err) {
        logErr("PulseBand engine loop failed", err);
      }
    })();
/* ============================================================
   4. GPU TEST — UI ONLY (PulseBand-aware)
============================================================ */
try {
  const testBtn     = document.getElementById("tp-test-button");
  const testFile    = document.getElementById("tp-test-file");
  const testStatus  = document.getElementById("tp-test-status");
  const testMetrics = document.getElementById("tp-test-metrics");

  if (!testBtn) logWarn("GPU test button missing");

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

      // ============================================================
      // 1. PULSEBAND FIRST — REAL SESSION ENGINE
      // ============================================================
      const band = window.pulseband || window.PulseBand || null;

      const before = performance.now();
      await file.arrayBuffer();
      const after = performance.now();
      const decodeMs = Math.round(after - before);

      if (band && typeof band.snapshot === "function") {
        const snap = band.snapshot() || {};

        const gpuSmooth   = snap?.stability?.score ?? null;
        const advantage   = snap?.advantage?.multiplier ?? null;
        const route       = snap?.network?.route ?? null;
        const cpuImpact   = snap?.cpu?.impact ?? null;
        const memImpact   = snap?.memory?.impact ?? null;
        const microMs     = snap?.latency?.microMs ?? null;

        if (testMetrics) {
          testMetrics.innerHTML = `
            GPU Smoothness: <strong>${gpuSmooth != null ? gpuSmooth + "%" : "—"}</strong><br>
            PulseBand Advantage: <strong>${advantage != null ? advantage + "×" : "—"}</strong><br>
            Network Route: <strong>${route ?? "—"}</strong><br>
            CPU Impact: <strong>${cpuImpact != null ? cpuImpact + "%" : "—"}</strong><br>
            Memory Impact: <strong>${memImpact != null ? memImpact + "%" : "—"}</strong><br>
            Micro Latency: <strong>${microMs != null ? microMs + " ms" : "—"}</strong><br>
            Decode Speed: <strong>${decodeMs} ms</strong>
          `;
        }

        if (testStatus) testStatus.textContent = "Test complete.";
        logOK("GPU test complete (PulseBand)");
        return;
      }

      // ============================================================
      // 2. FALLBACK: PulseBinary + VitalsMonitor
      // ============================================================
      const binary   = window.PulseBinary ?? null;
      const vitalsFn = binary?.Vitals?.generate;

      if (!binary) logWarn("PulseBinary missing during GPU test");
      if (!vitalsFn) logWarn("Vitals.generate missing during GPU test");

      const vitalsAfter = vitalsFn ? await vitalsFn() : null;

      if (!vitalsAfter) logWarn("Vitals after GPU test missing");

      const gpuSmooth   = vitalsAfter?.stability?.score ?? null;
      const advantage   = vitalsAfter?.advantage?.multiplier ?? null;
      const route       = vitalsAfter?.network?.route ?? null;
      const cpuImpact   = vitalsAfter?.cpu?.impact ?? null;
      const memImpact   = vitalsAfter?.memory?.impact ?? null;
      const microMs     = vitalsAfter?.latency?.microMs ?? null;

      if (testMetrics) {
        testMetrics.innerHTML = `
          GPU Smoothness: <strong>${gpuSmooth != null ? gpuSmooth + "%" : "—"}</strong><br>
          PulseBand Advantage: <strong>${advantage != null ? advantage + "×" : "—"}</strong><br>
          Network Route: <strong>${route ?? "—"}</strong><br>
          CPU Impact: <strong>${cpuImpact != null ? cpuImpact + "%" : "—"}</strong><br>
          Memory Impact: <strong>${memImpact != null ? memImpact + "%" : "—"}</strong><br>
          Micro Latency: <strong>${microMs != null ? microMs + " ms" : "—"}</strong><br>
          Decode Speed: <strong>${decodeMs} ms</strong>
        `;
      }

      if (testStatus) testStatus.textContent = "Test complete.";
      logOK("GPU test complete (PulseBinary fallback)");
    } catch (err) {
      logErr("GPU test failed", err);
      if (testStatus)  testStatus.textContent  = "Test failed.";
      if (testMetrics) testMetrics.textContent = "";
    }
  });
} catch (err) {
  logErr("GPU test init failed", err);
}

/* ============================================================
   5. CAROUSEL — UI ONLY (safe delayed init)
============================================================ */
try {
  function initCarousel() {
    const carousel = document.getElementById("appCarousel");
    if (!carousel) {
      logWarn("Carousel missing — retrying…");
      return false;
    }

    const track  = carousel.querySelector(".carousel-track");
    const slides = Array.from(carousel.querySelectorAll(".carousel-slide"));
    const dots   = Array.from(carousel.querySelectorAll(".carousel-dot"));
    const arrows = Array.from(carousel.querySelectorAll(".carousel-arrow"));

    if (!track || slides.length === 0) {
      logWarn("Carousel structure incomplete — retrying…");
      return false;
    }

    const visibleSlides = 2;
    const totalSlides   = slides.length;
    const maxIndex      = totalSlides - visibleSlides;

    let currentIndex = 0;

    function updateCarousel(index) {
      const clamped = Math.max(0, Math.min(index, maxIndex));
      currentIndex = clamped;

      const offset = -(clamped * (100 / visibleSlides));
      track.style.transform = `translateX(${offset}%)`;

      dots.forEach((dot, i) => dot.classList.toggle("active", i === clamped));
    }

    dots.forEach((dot, i) => dot.addEventListener("click", () => updateCarousel(i)));

    arrows.forEach((arrow) => {
      arrow.addEventListener("click", () => {
        const dir = arrow.getAttribute("data-dir");
        updateCarousel(dir === "next" ? currentIndex + 1 : currentIndex - 1);
      });
    });

    logOK("Carousel initialized");
    return true;
  }

  // Retry until carousel exists (max 50 attempts)
  let attempts = 0;
  const carouselInterval = setInterval(() => {
    attempts++;
    if (initCarousel() || attempts > 50) {
      clearInterval(carouselInterval);
    }
  }, 100);
} catch (err) {
  logErr("Carousel init failed", err);
}


    /* ============================================================
       6. FAQ ACCORDION — UI ONLY
    ============================================================ */
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
