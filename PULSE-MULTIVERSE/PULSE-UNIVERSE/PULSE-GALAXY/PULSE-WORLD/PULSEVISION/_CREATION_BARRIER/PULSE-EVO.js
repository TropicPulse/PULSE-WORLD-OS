// ============================================================
// PULSE-EVO.js — UI BUILDER (FINAL UPGRADED VERSION v30.3)
// ============================================================

console.log("[PULSE-EVO] Running UI builder");

// 1. Get wrapper
const root = document.getElementById("evo-wrapper");

if (!root) {
  console.error("[PULSE-EVO] ERROR: #evo-wrapper not found.");
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
              Feels less like a dashboard and more like a graphics engine for your entire business — everything rendered in real time.
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
              Device‑Aware Identity, Points, and Rewards that travel across every Experience — including Referrals that Reward both sides of the Connection.
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

// ============================================================================
//  PULSE-EVO v30.3 — IMMORTAL++ REAL PULSE + GPU TEMPO + INDEXEDDB
// ============================================================================

// IMMORTAL COLOR CONSTANTS
const C_ID   = "color:#26C6DA; font-weight:bold; font-family:monospace;";
const C_OK   = "color:#00FF9C; font-family:monospace;";
const C_INFO = "color:#E8F8FF; font-family:monospace;";
const C_WARN = "color:#FFE066; font-family:monospace;";
const C_ERR  = "color:#FF3B3B; font-weight:bold; font-family:monospace;";

// PULSE-CHRONO v26
let _pulseChronoLast = performance.now();
function _pulseChronoLabel(absolute) {
  const now = performance.now();
  const diff = now - _pulseChronoLast;
  const label = absolute ? `@${now.toFixed(1)}ms` : `+${diff.toFixed(1)}ms`;
  _pulseChronoLast = now;
  return label;
}

function logID(msg, absolute = false, ...rest) {
  const time = _pulseChronoLabel(absolute);
  console.log(`%c[PULSE-EVO] %c${msg} %c${time}`, C_ID, C_INFO, "color:#999;font-weight:300;", ...rest);
}
function logOK(msg, absolute = false, ...rest) {
  const time = _pulseChronoLabel(absolute);
  console.log(`%c[PULSE-EVO] %c${msg} %c${time}`, C_ID, C_OK, "color:#999;font-weight:300;", ...rest);
}
function logWarn(msg, absolute = false, ...rest) {
  const time = _pulseChronoLabel(absolute);
  console.warn(`%c[PULSE-EVO] %c${msg} %c${time}`, C_ID, C_WARN, "color:#999;font-weight:300;", ...rest);
}
function logErr(msg, absolute = false, ...rest) {
  const time = _pulseChronoLabel(absolute);
  console.error(`%c[PULSE-EVO] %c${msg} %c${time}`, C_ID, C_ERR, "color:#999;font-weight:300;", ...rest);
}

logID.reset = () => {
  _pulseChronoLast = performance.now();
  console.log(`%c[PULSE-EVO] %cTimer reset`, C_ID, C_WARN);
};

// DOM TIMING
logID("BOOT MEMBRANE START");
window.__EVO_DOM_START = performance.now();
logID("DOM START", true);

// IMMORTAL IndexedDB Pulse Cache
const EvoPulseStore = window.PulseDB?.store?.("pulse_state");

// In-memory snapshot
window.__PULSE_LAST_SIGNAL__ = window.__PULSE_LAST_SIGNAL__ || null;

// EVO PAGE — DOM INIT v30.3
if (!window.__PULSE_EVO_DOM_V30__) {
  window.__PULSE_EVO_DOM_V30__ = true;

  document.addEventListener("DOMContentLoaded", async () => {
    const domEnd = performance.now();
    const domTotal = (domEnd - (window.__EVO_DOM_START || domEnd)).toFixed(1);
    logOK(`DOM READY — ${domTotal}ms`);

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

    // IMMORTAL RESTORE FROM INDEXEDDB
    try {
      const cached = await EvoPulseStore?.get("last");
      if (cached) {
        window.__PULSE_LAST_SIGNAL__ = cached;
        logOK("Restored IMMORTAL pulse snapshot (EVO) from IndexedDB");
      }
    } catch (err) {
      logWarn("EVO IndexedDB restore failed", err);
    }

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

    // PulseSignal subscription — IMMORTAL IndexedDB persistence
    try {
      const PS = window.PulseSignal;

      if (PS?.subscribe) {
        PS.subscribe(async (packet) => {
          const state = packet?.state || packet;
          window.__PULSE_LAST_SIGNAL__ = state;

          try {
            await EvoPulseStore?.set("last", state);
          } catch {}

          updateUI();
        });

        logOK("PulseSignal v30.3 (EVO) subscribed");
      }
    } catch (err) {
      logErr("PulseSignal subscription failed (EVO)", err);
    }

    // Base loop
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

    logOK("Pulse Engine v30.3 (EVO) active");

    // GPU Lymph Tempo
    try {
      window.PulseGpuLymphTempo?.attachToUi?.(updateUI);
      logOK("GPU Lymph Tempo attached (EVO)");
    } catch (err) {
      logWarn("GPU Lymph Tempo attach failed (EVO)");
    }

    // World-ready phase
    [100, 200, 500].forEach((delay) => {
      setTimeout(async () => {
        try {
          if (window.PulsePort?.Global?.signal) {
            window.__PULSE_LAST_SIGNAL__ = window.PulsePort.Global.signal;
            await EvoPulseStore?.set("last", window.__PULSE_LAST_SIGNAL__);
            updateUI();
            logOK(`World‑Ready (${delay}ms, EVO): PulsePort.Global signal applied`);
          }
        } catch {}
      }, delay);
    });

    // Core systems boot
    try {
      window.PulseBand?.emit?.("request", { type: "start" });
      window.PulseBand?.on?.("signal", async (p) => {
        window.__PULSE_LAST_SIGNAL__ = p?.state || p;
        await EvoPulseStore?.set("last", window.__PULSE_LAST_SIGNAL__);
        updateUI();
      });

      window.BinaryOS?.boot?.();
      window.DualBandAI?.boot?.();

      logOK("Core systems booted (EVO)");
    } catch (err) {
      logErr("Core boot failed (EVO)", err);
    }

    logOK("EVO PAGE v30.3 DOM INIT COMPLETE");

    window.__PULSE_EVO_CLEANUP__ = () => {
      clearInterval(uiInterval);
      logID("PULSE-EVO cleanup invoked");
    };
  });
}
