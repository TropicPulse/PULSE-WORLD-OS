
/* 0. BOOT MEMBRANE — MUST BE FIRST */
import * as PulseWindow from "../_FRONTEND/PULSE-WORLD-PORTAL.js";

function mark(label) {
  console.log("[INDEX]", label);
}

/* 2. UI ONLY — ensure this runs ONCE */
if (!window.__PULSE_UI_INIT__) {
  window.__PULSE_UI_INIT__ = true;

  document.addEventListener("DOMContentLoaded", () => {
    mark("WINDOW DOM STARTED INDEX PAGE");

    /* ============================================================
       3. PULSEBAND UI — UI ONLY (NO LOGIC)
    ============================================================ */
    const pbBadge = document.getElementById("pulseband-badge");
    const pbPanel = document.getElementById("pulseband-panel");
    let pbOpen = false;

    if (pbBadge && pbPanel) {
      pbBadge.addEventListener("click", () => {
        pbOpen = !pbOpen;
        pbPanel.classList.toggle("pb-open", pbOpen);
      });

      document.addEventListener("click", (e) => {
        if (!pbPanel.contains(e.target) && !pbBadge.contains(e.target)) {
          pbOpen = false;
          pbPanel.classList.remove("pb-open");
        }
      });
    }

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

    /* ============================================================
       3B. PULSEBAND SNAPSHOT — UI ONLY
    ============================================================ */
    (async () => {
      try {
        const vitals    = window.VitalsMonitor.Vitals?.generate?.() ?? null;
        const binary    = window.PulseBinary ?? null;
        const sentience = binary?.Sentience?.snapshot?.() ?? null;

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
      } catch (err) {
        mark("Window PulseBand snapshot failed", err);
      }
    })();

    /* ============================================================
       4. GPU TEST — UI ONLY
    ============================================================ */
    const testBtn     = document.getElementById("tp-test-button");
    const testFile    = document.getElementById("tp-test-file");
    const testStatus  = document.getElementById("tp-test-status");
    const testMetrics = document.getElementById("tp-test-metrics");

    testBtn?.addEventListener("click", async () => {
      if (!testFile?.files?.length) {
        if (testStatus) testStatus.textContent = "Please select a file first.";
        return;
      }

      if (testStatus)  testStatus.textContent  = "Running GPU warm test…";
      if (testMetrics) testMetrics.textContent = "";

      await new Promise((res) => requestAnimationFrame(res));

      try {
        const file = testFile.files[0];

        const binary   = window.PulseBinary ?? null;
        const vitalsFn = binary?.Vitals?.generate ?? PulseWindow.Vitals?.generate;

        const before = performance.now();
        await file.arrayBuffer();
        const after = performance.now();

        const vitalsAfter = vitalsFn ? await vitalsFn() : null;

        const gpuSmooth   = vitalsAfter?.stability?.score ?? null;
        const advantage   = vitalsAfter?.advantage?.multiplier ?? null;
        const route       = vitalsAfter?.network?.route ?? null;
        const cpuImpact   = vitalsAfter?.cpu?.impact ?? null;
        const memImpact   = vitalsAfter?.memory?.impact ?? null;
        const microMs     = vitalsAfter?.latency?.microMs ?? null;
        const decodeMs    = Math.round(after - before);

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
      } catch (err) {
        mark("Window GPU test failed", err);
        if (testStatus)  testStatus.textContent  = "Test failed.";
        if (testMetrics) testMetrics.textContent = "";
      }
    });

    /* ============================================================
       5. CAROUSEL — UI ONLY
    ============================================================ */
    const carousel = document.getElementById("appCarousel");
    if (carousel) {
      const track  = carousel.querySelector(".carousel-track");
      const slides = Array.from(carousel.querySelectorAll(".carousel-slide"));
      const dots   = Array.from(carousel.querySelectorAll(".carousel-dot"));
      const arrows = Array.from(carousel.querySelectorAll(".carousel-arrow"));

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
    }

    /* ============================================================
       6. FAQ ACCORDION — UI ONLY
    ============================================================ */
    document.querySelectorAll("[data-faq]").forEach((item) => {
      const btn = item.querySelector(".faq-question");
      btn.addEventListener("click", () => {
        const isOpen = item.classList.contains("open");
        document.querySelectorAll("[data-faq]").forEach((i) => i.classList.remove("open"));
        if (!isOpen) item.classList.add("open");
      });
    });

    mark("WINDOW DOM ENDED INDEX PAGE");
  });
}