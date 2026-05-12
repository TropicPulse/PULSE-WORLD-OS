// ============================================================
// PULSE-INDEX.js — UI BUILDER (FINAL UPGRADED VERSION)
// ============================================================

console.log("[PULSE-INDEX] Running UI builder");

// 1. Get wrapper
const root = document.getElementById("evo-wrapper");

if (!root) {
  console.error("[PULSE-INDEX] ERROR: #evo-wrapper not found.");
}

// ============================================================
// 2. Inject FULL HTML structure
// ============================================================

root.innerHTML = String.raw`

  <!-- ========================= -->
  <!-- 0. BOOT MEMBRANE OVERLAY -->
  <!-- ========================= -->

  <div id="pulseband-overlay">
    <div id="pulseband-badge">
      <div class="pb-bars">
        <span></span><span></span><span></span><span></span>
      </div>
    </div>

    <div id="pulseband-panel" class="pb-card">

      <div class="pb-header">
        <img id="pb-mini-badge" class="pb-mini-badge offline-img"
             src="../_PICTURES/PulseBand.png"
             alt="PulseBand Badge">
      </div>

      <div class="pb-row">
        <label>PulseBand Bars <span class="pb-hint">(App Speed)</span></label>
        <span id="pb-bars-text" class="pb-value">0/4</span>
      </div>

      <div class="pb-row">
        <label>Phone Bars <span class="pb-hint">(Signal Speed)</span></label>
        <span id="pb-phonebars-text" class="pb-value">0/4</span>
      </div>

      <div class="pb-row">
        <label>Stability <span class="pb-hint">(Connect Quality)</span></label>
        <span id="pb-stability" class="pb-value">0%</span>
      </div>

      <div class="pb-row">
        <label>Latency <span class="pb-hint">(Response Time)</span></label>
        <span id="pb-latency" class="pb-value">0 ms</span>
      </div>

      <div class="pb-row">
        <label>Micro‑Windows <span class="pb-hint">(Speed Bursts)</span></label>
        <span id="pb-micro" class="pb-value">Idle</span>
      </div>

      <div class="pb-row">
        <label>Route <span class="pb-hint">(Network Path)</span></label>
        <span id="pb-route" class="pb-value">Primary</span>
      </div>

      <div class="pb-row">
        <label>State <span class="pb-hint">(Current Mode)</span></label>
        <span id="pb-state" class="pb-value">Initializing</span>
      </div>

      <div class="pb-row">
        <label>Last Sync <span class="pb-hint">(Updated)</span></label>
        <span id="pb-sync" class="pb-value">0s ago</span>
      </div>

      <div class="pb-row">
        <label>Efficiency <span class="pb-hint">(Speed Mode)</span></label>
        <span id="pb-efficiency" class="pb-value">Micro‑Burst</span>
      </div>

      <div class="pb-row">
        <label>Network Health <span class="pb-hint">(Overall)</span></label>
        <span id="pb-health" class="pb-value">Checking…</span>
      </div>

      <div class="pb-row">
        <label>PulseBand Advantage</label>
        <span id="pb-advantage" class="pb-value">2.5× Faster</span>
      </div>

      <div class="pb-row">
        <label>PulseBand vs Phone</label>
        <span id="pb-estimated" class="pb-value">Calculating…</span>
      </div>
    </div>
  </div>

  <!-- ========================= -->
  <!-- MOBILE MENU -->
  <!-- ========================= -->

  <div class="mobile-menu" id="mobileMenu">
    <div class="mobile-menu-panel">
      <div class="mobile-menu-header">
        <div class="tp-logo-wrapper">
          <img class="tp-logo-circle-mobile offline-img"
               src="../_PICTURES/ToucanLogo-Mini.png"
               alt="Tropic Pulse Logo">
        </div>
        <h1 class="tp-header-mobile">Tropic Pulse</h1>
        <button class="mobile-menu-close" id="mobileMenuClose">&times;</button>
      </div>

      <div class="mobile-menu-nav">
        <a href="#tp-os-hero">Home</a>
        <a href="#tp-use-cases">Use Cases</a>
        <a href="#tp-delivery-directory">Delivery & Directory</a>
        <a href="#pricing">Pricing</a>
        <a href="#faq">FAQ</a>
        <a href="#contact">Contact</a>
        <a href="./PULSE/PulseWorldBarrier.html">Open Tropic Pulse</a>
      </div>

      <div class="mobile-menu-cta">
        <a class="btn btn-primary" href="./PULSE/PulseWorldBarrier.html">Open Tropic Pulse</a>
        <a class="btn" style="background:#fff;color:#333;" href="#tp-use-cases">Explore Use Cases</a>
      </div>
    </div>
  </div>

  <!-- ========================= -->
  <!-- HEADER -->
  <!-- ========================= -->

  <header class="topmenu" style="background:#000;color:#fff;border-bottom:3px inset rgba(0,0,0,0.4);box-shadow:0 4px 10px rgba(0,0,0,0.25);">
    <div class="header-inner">
      <div class="tp-logo-wrapper">
        <img class="tp-logo-circle offline-img"
             src="../_PICTURES/ToucanLogo-Mini.png"
             alt="Tropic Pulse Logo">
      </div>

      <h1 class="tp-header">Tropic Pulse</h1>

      <nav>
        <a href="#tp-os-hero">Home</a>
        <a href="#tp-use-cases">Use Cases</a>
        <a href="#tp-delivery-directory">Delivery</a>
        <a href="#pricing">Pricing</a>
        <a href="#faq">FAQ</a>
        <a href="#contact">Contact</a>
      </nav>

      <div class="header-cta">
        <a href="./PULSE/PulseWorldBarrier.html" class="btn btn-primary">Open Tropic Pulse</a>
      </div>

      <button class="mobile-menu-toggle" id="mobileMenuToggle">
        <span></span>
      </button>
    </div>
  </header>

  <!-- ========================= -->
  <!-- HERO SECTION -->
  <!-- ========================= -->

  <section class="hero gradient-bg" id="tp-os-hero">
    <div class="hero-bg"></div>
    <div class="hero-overlay"></div>

    <div class="hero-inner">
      <div class="hero-grid">

        <div>
          <div class="hero-eyebrow">
            <span class="badge">A Browser-Native Operating System</span>
          </div>

          <h1 class="hero-title">Tropic Pulse OS</h1>

          <p class="hero-subtitle">
            Not an app. Not a website. A GPU‑accelerated operating system that runs inside your browser — powering identity, performance, and live intelligence for anything you build.
          </p>

          <div class="hero-ctas">
            <a href="#tp-live-demo" class="btn btn-primary">Test the OS</a>
            <a href="#tp-use-cases" class="btn btn-outline">See What It Powers</a>
          </div>

          <div class="hero-meta">
            Built for Belize. Designed for the world. Engineered for the future.
          </div>
        </div>

        <div class="hero-phone">
          <div class="phone-frame">
            <div class="phone-inner">
              <img class="phone-screen-img offline-img"
                   src="../_PICTURES/Phone1.png"
                   alt="OS Preview">
            </div>
          </div>
          <div class="phone-glow"></div>
        </div>

      </div>
    </div>
  </section>

  <!-- ========================= -->
  <!-- LIVE DEMO -->
  <!-- ========================= -->

  <section class="section" id="tp-live-demo" style="background:#000;color:#fff;">
    <div class="container">

      <div class="section-header" style="text-align:center;">
        <div class="section-eyebrow" style="color:#FFD400;">Live in Your Browser</div>
        <h2 class="section-title" style="color:#fff;">Test Tropic Pulse OS</h2>
        <p class="section-subtitle" style="color:#ddd;max-width:720px;margin:0 auto;">
          Upload a file and watch Tropic Pulse wrap it with GPU acceleration, PulseBand metrics, and network intelligence — right inside your browser.
        </p>
      </div>

      <div class="feature-grid" style="margin-top:28px;grid-template-columns:minmax(0,2fr) minmax(0,1.4fr);align-items:flex-start;">

        <div class="feature-card" style="background:#111;border-radius:16px;padding:20px;">
          <h3 style="margin-bottom:10px;">Test this feature</h3>
          <p style="font-size:0.95rem;opacity:0.9;margin-bottom:14px;">
            You can run this test once every 15 minutes per device.
          </p>

          <div style="display:flex;flex-direction:column;gap:10px;">
            <input type="file" id="tp-test-file" accept="image/*,application/json" />
            <button class="btn btn-primary" id="tp-test-button">Run Test</button>
            <div id="tp-test-status" style="font-size:0.85rem;opacity:0.85;"></div>
          </div>
        </div>

        <div class="feature-card" style="background:#111;border-radius:16px;padding:20px;">
          <h3 style="margin-bottom:10px;">What you'll see</h3>
          <ul style="list-style:none;padding:0;margin:0;font-size:0.9rem;opacity:0.9;">
            <li>• GPU warm state & smoothness</li>
            <li>• PulseBand advantage score</li>
            <li>• Network route prediction</li>
            <li>• CPU & memory impact</li>
            <li>• Micro latency</li>
            <li>• Decode speed</li>
          </ul>
          <div id="tp-test-metrics" style="margin-top:14px;font-size:0.85rem;color:#FFD400;">
            Metrics will appear here after your test runs.
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- ========================= -->
  <!-- USE CASES -->
  <!-- ========================= -->

  <section class="section" id="tp-use-cases">
    <div class="container">
      <div class="section-header">
        <div class="section-eyebrow">More than Delivery</div>
        <h2 class="section-title">One OS, Many Front Doors!</h2>
        <p class="section-subtitle">
          Tropic Pulse started with Food Delivery! Now it powers Dashboards, Marketplaces, Local Networks, and Real-Time Overlays that sit on Top of any Product.
        </p>
      </div>

      <div class="feature-grid">

        <div class="feature-card">
          <img class="offline-img"
               src="../_PICTURES/PulseBackbone.png"
               alt="Pulse Backbone" />
          <div class="feature-card-overlay">
            <div class="feature-card-title">Pulse Backbone</div>
            <div class="feature-card-text">
              The layered core of the new internet — <strong>PulseBand</strong> for speed and reliability,
              <strong>PulseNet</strong> for unbreakable signal, and <strong>PulseMesh</strong> for community coverage.
              Together they form a living infrastructure that adapts, heals, and expands in real time.
            </div>
          </div>
        </div>

        <div class="feature-card">
          <img class="offline-img"
               src="../_PICTURES/LocalNetworks.png"
               alt="Local Networks" />
          <div class="feature-card-overlay">
            <div class="feature-card-title">Local Networks</div>
            <div class="feature-card-text">
              Build living maps of Cities, Islands, or Campuses with Identity and Trust Baked In!
            </div>
          </div>
        </div>

        <div class="feature-card">
          <img class="offline-img"
               src="../_PICTURES/PulseEarn.png"
               alt="Pulse Earn" />
          <div class="feature-card-overlay">
            <div class="feature-card-title">Pulse Earn</div>
            <div class="feature-card-text">
              A system so advanced it feels Impossible — value, motion, and momentum fused into one living layer.
              <strong>Coming Soon.</strong>
            </div>
          </div>
        </div>

        <div class="feature-card">
          <img class="offline-img"
               src="../_PICTURES/PulseGPU.png"
               alt="PULSE-GPU" />
          <div class="feature-card-overlay">
            <div class="feature-card-title">Pulse‑GPU</div>
            <div class="feature-card-text">
              Feels less like a dashboard and more like a graphics engine for your entire business —
              everything rendered in real time.
              <strong>Coming Soon.</strong>
            </div>
          </div>
        </div>

        <div class="feature-card">
          <img class="offline-img"
               src="../_PICTURES/PulseLoyalty.png"
               alt="Loyalty & Identity" />
          <div class="feature-card-overlay">
            <div class="feature-card-title">Identity & Loyalty</div>
            <div class="feature-card-text">
              Device‑Aware Identity, Points, and Rewards that travel across every Experience —
              including Referrals that Reward both sides of the Connection.
            </div>
          </div>
        </div>

        <div class="feature-card">
          <img class="offline-img"
               src="../_PICTURES/AdminPanels.png"
               alt="Admin Dashboards" />
          <div class="feature-card-overlay">
            <div class="feature-card-title">Admin Dashboards</div>
            <div class="feature-card-text">
              Give operators a live view of Performance, Health, and Behavior — powered by PulseBand!
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- ========================= -->
  <!-- FOOTER -->
  <!-- ========================= -->

  <footer style="background:#ffff99;padding:0;text-align:center;font-size:0.95rem;color:#333;">
    <div style="max-width:900px;margin:0 auto;">

      <h3 style="margin-bottom:10px;font-weight:800;color:#00a884;">Tropic Pulse</h3>
      <p style="margin-bottom:20px;font-size:0.9rem;color:#444;">
        Your all‑in‑one platform for food, drinks, shops, groceries, events, and local services across San Pedro, Belize.
      </p>

      <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:30px;margin-bottom:30px;">

        <div style="text-align:left;">
          <h4 style="margin-bottom:8px;font-size:1rem;color:#00a884;">Contact</h4>
          <p>Email: <a href="mailto:Sales@tropicpulse.bz">Sales@TropicPulse.bz</a></p>
          <p>Phone: <a href="https://wa.me/15096077261">+1 (509) 607‑7261</a></p>
          <p>Location: San Pedro, Belize</p>
        </div>

        <div style="text-align:left;">
          <h4 style="margin-bottom:8px;font-size:1rem;color:#00a884;">Quick Links</h4>
          <p><a href="#hero">Home</a></p>
          <p><a href="#vendors">Become a Vendor</a></p>
          <p><a href="#deliverers">Become a Deliverer</a></p>
          <p><a href="#pricing">Pricing</a></p>
          <p><a href="#faq">FAQ</a></p>
          <p><a href="./PULSE/PulseWorldBarrier.html">Open Tropic Pulse</a></p>
        </div>

        <div style="text-align:left;">
          <h4 style="margin-bottom:8px;font-size:1rem;color:#00a884;">Legal</h4>
          <p><a href="#">Privacy Policy</a></p>
          <p><a href="#">Terms of Service</a></p>
          <p><a href="#">Vendor Agreement</a></p>
        </div>

      </div>

      <div style="font-size:0.85rem;color:#555;margin-top:20px;">
        © 2026 Tropic Pulse — Built with Passion for Belize.
      </div>
    </div>
  </footer>

`;

// ============================================================
// 3. UI LOGIC — ALWAYS RUNS (NO DOMContentLoaded BUG)
// ============================================================

function mark(label) {
  console.log("[INDEX]", label);
}

/* 2. UI ONLY — ensure this runs ONCE */
if (!global.__PULSE_UI_INIT__) {
  global.__PULSE_UI_INIT__ = true;

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
        const vitals    = global.VitalsMonitor.Vitals?.generate?.() ?? null;
        const binary    = global.PulseBinary ?? null;
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

        const binary   = global.PulseBinary ?? null;
        const vitalsFn = binary?.Vitals?.generate;

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