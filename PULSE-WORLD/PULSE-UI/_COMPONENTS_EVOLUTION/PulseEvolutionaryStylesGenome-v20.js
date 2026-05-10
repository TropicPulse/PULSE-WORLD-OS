// ============================================================================
// FILE: /PULSE-UI/_GENOME/PulseEvolutionaryStylesGenome-v20.js
// PULSE OS — v20++ IMMORTAL EVOLUTIONARY
// UNIVERSAL UI SKIN GENOME (A0–A5 SURFACE MEMBRANE)
// ============================================================================
//
// ROLE (IMMORTAL):
//   • Foundational UI skin genome for Pulse OS
//   • Provides universal A0–A5 membrane
//   • Deterministic, drift-proof, evolvable
//   • Auto-integrated with:
//       - Styles Organ (v20 IMMORTAL)
//       - Animations Organ (v20 IMMORTAL)
//       - Icons Organ (v20 IMMORTAL)
//       - IQMap UI Skills Genome
//       - Memory-v20++
//       - Router-v20
//
// CONTRACT:
//   • STATIC but EVOLVABLE
//   • Never mutated at runtime
//   • Always included exactly once
//   • Page-specific UI skills may extend/override
//
// SAFETY:
//   • IMMORTAL: deterministic, pure, zero side effects
//   • Zero network, zero filesystem, zero randomness
//   • Zero dynamic imports, zero eval
// ============================================================================

export const PulseEvolutionaryStylesBaseGenomeV20 = Object.freeze({

  schemaVersion: "v20++",
  identity: "PulseEvolutionaryStylesBaseGenome",
  version: "20.0-Immortal-Evolutionary",
  layer: "pulse_ui",
  role: "style_genome_a0_a5",

  evo: Object.freeze({
    deterministic: true,
    driftProof: true,
    schemaVersioned: true,
    styleGenome: true,
    animationGenomeAware: true,
    iconGenomeAware: true,
    iqMapAware: true,
    evolvable: true,
    futureEvolutionReady: true,

    zeroNetwork: true,
    zeroFilesystem: true,
    zeroMutationOfInput: true,
    zeroDynamicImports: true,
    zeroEval: true,
    zeroRandomness: true
  }),

  // -------------------------------------------------------------------------
  // UNIVERSAL CSS MEMBRANE (A0–A5)
  // -------------------------------------------------------------------------
  css: `
/* ============================================================================
   PulseEvolutionaryStylesBaseGenome — v20++ IMMORTAL
   UNIVERSAL PULSE OS UI SKIN ORGAN (A0–A5 SURFACE MEMBRANE)
   ============================================================================ */

/* ============================================================================
   A0 — GLOBAL RESET + DARK MEMBRANE
   ============================================================================ */
html, body {
  margin: 0;
  padding: 0;
  background: radial-gradient(circle at 50% 20%, #0a0a0a, #030303 60%, #000 100%);
  color: #e8e8e8;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  perspective: 1600px;
}

*, *::before, *::after {
  box-sizing: border-box;
}

/* ============================================================================
   A1 — 3D SURFACES + NEON EDGES + GLOW RINGS
   ============================================================================ */
.evo-surface {
  background: rgba(18, 18, 18, 0.78);
  border: 1px solid rgba(0, 255, 255, 0.12);
  border-radius: 18px;
  padding: 24px;
  backdrop-filter: blur(14px) saturate(160%);
  transform-style: preserve-3d;
  transition: 0.35s ease;
  box-shadow:
    0 8px 22px rgba(0,0,0,0.55),
    0 18px 42px rgba(0,0,0,0.65),
    inset 0 0 0 1px rgba(255,255,255,0.05);
}

.evo-surface:hover {
  transform: translateY(-6px) rotateX(3deg) rotateY(-2deg);
  border-color: rgba(0, 255, 255, 0.45);
  box-shadow:
    0 12px 28px rgba(0,0,0,0.65),
    0 0 22px rgba(0, 255, 255, 0.45),
    inset 0 0 0 1px rgba(255,255,255,0.08);
}

.evo-surface::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  background: linear-gradient(
    135deg,
    rgba(0,255,255,0.18),
    rgba(0,255,255,0.00) 40%,
    rgba(0,255,255,0.18)
  );
  opacity: 0.25;
  mix-blend-mode: screen;
  filter: blur(6px);
}

/* ============================================================================
   A2 — WRAPPERS, BLOCKS, CONTAINERS
   ============================================================================ */
#evo-wrapper {
  padding: 32px;
  max-width: 1080px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 28px;
  position: relative;
}

.evo-block { composes: evo-surface; }

/* Ambient particles */
#evo-wrapper::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    radial-gradient(circle, rgba(0,255,255,0.12) 0%, transparent 60%),
    radial-gradient(circle, rgba(0,255,255,0.08) 0%, transparent 70%);
  background-size: 220px 220px, 340px 340px;
  background-position: 20% 30%, 80% 70%;
  opacity: 0.15;
  filter: blur(12px);
}

/* ============================================================================
   A3 — BUTTONS, ICONS, SHIMMER, IMPULSE, TIERS
   ============================================================================ */
.evo-button {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 24px;
  border-radius: 14px;
  background: linear-gradient(145deg, #0b0b0b, #1c1c1c);
  border: 1px solid rgba(0, 255, 255, 0.22);
  color: #00eaff;
  cursor: pointer;
  font-size: 1rem;
  transition: 0.28s ease;
  transform-style: preserve-3d;
  box-shadow:
    0 6px 16px rgba(0,0,0,0.55),
    inset 0 0 0 1px rgba(255,255,255,0.06);
}

.evo-button:hover {
  transform: translateY(-3px) translateZ(12px);
  border-color: rgba(0, 255, 255, 0.55);
  box-shadow:
    0 10px 22px rgba(0,0,0,0.65),
    0 0 18px rgba(0, 255, 255, 0.45);
}

.evo-icon {
  width: 22px;
  height: 22px;
  filter: drop-shadow(0 0 6px rgba(0,255,255,0.55));
}

/* Shimmer */
.evo-shimmer {
  position: relative;
  overflow: hidden;
}
.evo-shimmer::before {
  content: "";
  position: absolute;
  top: 0;
  left: -180%;
  width: 180%;
  height: 100%;
  background: linear-gradient(
    120deg,
    transparent 0%,
    rgba(255,255,255,0.12) 50%,
    transparent 100%
  );
  animation: shimmer-v3 2.4s linear infinite;
}
@keyframes shimmer-v3 {
  0% { left: -180%; }
  100% { left: 180%; }
}

/* Impulse */
.evo-impulse {
  animation: impulse-ripple 0.55s ease-out;
}
@keyframes impulse-ripple {
  0% { box-shadow: 0 0 0 rgba(0,255,255,0); }
  40% { box-shadow: 0 0 26px rgba(0,255,255,0.65); }
  100% { box-shadow: 0 0 0 rgba(0,255,255,0); }
}

/* Tiers */
.evo-tier-critical {
  box-shadow:
    0 0 26px rgba(255, 60, 60, 0.75),
    inset 0 0 0 1px rgba(255,255,255,0.10) !important;
  border-color: rgba(255, 60, 60, 0.75) !important;
}
.evo-tier-immortal {
  box-shadow:
    0 0 32px rgba(0, 255, 150, 0.85),
    inset 0 0 0 1px rgba(255,255,255,0.12) !important;
  border-color: rgba(0, 255, 150, 0.85) !important;
}

/* ============================================================================
   A4 — FORMS, INPUTS, SELECTS, TOGGLES, SLIDERS
   ============================================================================ */
.evo-input {
  width: 100%;
  padding: 12px 16px;
  border-radius: 12px;
  background: rgba(20,20,20,0.85);
  border: 1px solid rgba(0,255,255,0.18);
  color: #e8e8e8;
  font-size: 1rem;
  transition: 0.25s ease;
}
.evo-input:focus {
  outline: none;
  border-color: rgba(0,255,255,0.55);
  box-shadow: 0 0 12px rgba(0,255,255,0.45);
}

.evo-select {
  composes: evo-input;
  appearance: none;
  background-image: linear-gradient(45deg, transparent 50%, #00eaff 50%),
                    linear-gradient(135deg, #00eaff 50%, transparent 50%);
  background-position: calc(100% - 20px) calc(50% - 4px),
                       calc(100% - 16px) calc(50% + 4px);
  background-size: 6px 6px, 6px 6px;
  background-repeat: no-repeat;
}

.evo-toggle {
  width: 48px;
  height: 24px;
  border-radius: 24px;
  background: rgba(0,255,255,0.15);
  position: relative;
  cursor: pointer;
  transition: 0.25s ease;
}
.evo-toggle::after {
  content: "";
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  background: #00eaff;
  border-radius: 50%;
  transition: 0.25s ease;
}
.evo-toggle.active {
  background: rgba(0,255,255,0.45);
}
.evo-toggle.active::after {
  transform: translateX(24px);
}

.evo-slider {
  width: 100%;
  appearance: none;
  height: 4px;
  background: rgba(0,255,255,0.25);
  border-radius: 4px;
}
.evo-slider::-webkit-slider-thumb {
  appearance: none;
  width: 18px;
  height: 18px;
  background: #00eaff;
  border-radius: 50%;
  cursor: pointer;
}

/* ============================================================================
   A5 — LISTS, TABLES, MODALS, TOASTS, BADGES, CHIPS, NAVBARS
   ============================================================================ */
.evo-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.evo-list-item {
  composes: evo-surface;
  padding: 18px;
}

.evo-table {
  width: 100%;
  border-collapse: collapse;
  background: rgba(20,20,20,0.85);
}
.evo-table th, .evo-table td {
  padding: 14px;
  border-bottom: 1px solid rgba(0,255,255,0.12);
}

.evo-modal {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(8px);
}
.evo-modal-content {
  composes: evo-surface;
  max-width: 480px;
}

.evo-toast {
  composes: evo-surface;
  position: fixed;
  bottom: 24px;
  right: 24px;
  padding: 18px 24px;
}

.evo-badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 12px;
  background: rgba(0,255,255,0.25);
  color: #00eaff;
  font-size: 0.85rem;
}

.evo-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 16px;
  background: rgba(0,255,255,0.18);
  color: #00eaff;
}

.evo-navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 24px;
  background: rgba(10,10,10,0.85);
  border-bottom: 1px solid rgba(0,255,255,0.12);
}

    :root {
  /* Colors */
  --tp-yellow: #ffff99;
  --tp-yellow-strong: #ffd400;
  --tp-teal: #00a884;
  --tp-teal-soft: #00c7a6;
  --tp-coral: #ff5a5a;
  --tp-coral-dark: #ff3d3d;
  --tp-bg: #000000;
  --tp-text: #1a1a1a;
  --tp-muted: #777777;
  --tp-card-bg: #000000;
  --tp-shadow-soft: 0 6px 18px rgba(0, 0, 0, 0.12);
  --tp-radius-lg: 18px;
  --tp-radius-md: 12px;
  --tp-radius-sm: 8px;

  /* Layout */
  --tp-max-width: 1200px;
  --tp-section-padding: 40px;
  --tp-section-padding-lg: 40px;

  /* Animation */
  --tp-gradient-duration: 10s;
}

/* RESET / BASE */

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

img {
  max-width: 100%;
  display: block;
}

a {
  color: inherit;
  text-decoration: none;
}

body {
  padding: 0;
  margin: 0;

  /* Use normal flow width, avoid scrollbar overflow */
  width: 100%;
  max-width: 100%;

  /* Full dynamic viewport height is fine */
  min-height: 100dvh;

  /* Centering is handled by .container, not body */
  display: block;

  background: var(--tp-yellow);
  font-family: Arial, sans-serif;
}

/* UTILITY */

.container {
  width: 100%;
  max-width: var(--tp-max-width);
  margin: 0 auto;
  padding: 0 20px;
}

.testimonials-container {
  width: 100%;
  max-width: var(--tp-max-width);
  margin: 0 auto;
  padding: 0;
}

.section {
  padding: var(--tp-section-padding) 0;
}

@media (min-width: 992px) {
  .section {
    padding: var(--tp-section-padding-lg) 0;
  }
}


/* BUTTONS */

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 22px;
  border-radius: var(--tp-radius-md);
  font-weight: 600;
  font-size: 0.95rem;
  border: none;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.15s ease, box-shadow 0.15s ease;
  text-decoration: none;
  white-space: nowrap;
}

.btn-primary {
  background: var(--tp-coral);
  color: #fff;
  box-shadow: 0 4px 10px rgba(255, 90, 90, 0.4);
}

.btn-primary:hover {
  background: var(--tp-coral-dark);
  transform: translateY(-1px);
  box-shadow: 0 6px 14px rgba(255, 90, 90, 0.5);
}

.btn-outline {
  background: transparent;
  border: 2px solid transparent;
  padding: 10px 20px;
  font-weight: 600;

  /* TEXT GRADIENT */
  background-image: linear-gradient(90deg, #000000, #ffffff, #000000);
  background-size: 400%;
  background-position: 0%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  /* BORDER GRADIENT */
  border-image: linear-gradient(90deg, #000000, #ffffff, #000000) 1;
  transition: background-position 1s linear, border-image 1s linear, box-shadow 0.2s ease;
}

.btn-outline:hover {
  background-position: 100%;
  border-image: linear-gradient(90deg, #ff3d3d, #ffff00, #ff3d3d) 1;
  box-shadow: 0 6px 14px rgba(255, 90, 90, 0.5);
}

/* BADGE */

.badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  background: rgba(255, 255, 255, 0.18);
}

/* GLOBAL GRADIENT WRAPPER */

.gradient-bg {
  position: relative;
  background: var(--tp-yellow);
  overflow: hidden;
}

.gradient-bg::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #ffff99, #000000, #ffff99);
  background-size: 400% 400%;
  animation: tpGradient var(--tp-gradient-duration) linear 1 forwards;
  z-index: -1;
}

@keyframes tpGradient {
  0% {
    background-position: 0% 100%;
  }
  10% {
    background-position: 10% 90%;
  }
  25% {
    background-position: 25% 75%;
  }
  50% {
    background-position: 50% 50%;
  }
  75% {
    background-position: 75% 25%;
  }
  90% {
    background-position: 90% 10%;
  }
  100% {
    background-position: 100% 0%;
  }
}

/* HERO TEXT GRADIENT */

.hero-title,
.hero-subtitle,
.hero-eyebrow,
.hero-meta {
  background: linear-gradient(
    90deg,
    #000000 0%,
    #000000 25%,
    #ffffff 50%,
    #000000 75%,
    #000000 100%
  );
  background-size: 200% 100%;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  animation: textPulse var(--tp-gradient-duration) linear 1;
}

@keyframes textPulse {
  0% {
    background-position: 0% 100%;
  }
  10% {
    background-position: 10% 90%;
  }
  25% {
    background-position: 25% 75%;
  }
  50% {
    background-position: 50% 50%;
  }
  75% {
    background-position: 75% 25%;
  }
  90% {
    background-position: 90% 10%;
  }
  100% {
    background-position: 100% 0%;
  }
}

/* ================= PULSEBAND + LOADING ================= */


/* Fullscreen overlay */
#t-loading {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.22);
  backdrop-filter: blur(16px) saturate(180%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999999;
  opacity: 1;
  transition: opacity 0.6s ease-out;
}

/* Logo */
#t-loading-logo {
  width: 250px;
  height: 250px;
  object-fit: contain;
  animation: tpShimmer 3.5s ease-in-out infinite;
  
}

@keyframes tpLogoPulse {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(0, 168, 132, 0.6);
  }
  70% {
    transform: scale(1.06);
    box-shadow: 0 0 0 18px rgba(0, 168, 132, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(0, 168, 132, 0);
  }
}

  /* Hidden state */
  #t-loading.hide {
    opacity: 0;
    pointer-events: none;
  }
/* PulseBand overlay root */
#pulseband-overlay {
  position: fixed;
  bottom: 18px;
  right: 18px;
  z-index: 80;
  pointer-events: none; /* panel/badge will re-enable */
}

/* Bubble badge */
#pulseband-badge {
  width: 52px;
  height: 52px;
  border-radius: 999px;
  background: radial-gradient(circle at 30% 20%, #ffffff 0%, #ffd400 40%, #ff5a5a 100%);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  pointer-events: auto;
  position: relative;
  overflow: hidden;
  border: 2px solid #000;
}

/* Animated bars inside badge */
.pb-bars {
  display: flex;
  align-items: flex-end;
  gap: 3px;
}

.pb-bars span {
  width: 4px;
  border-radius: 999px;
  background: #000;
  animation: pbBarPulse 1s ease-in-out infinite;
}

.pb-bars span:nth-child(1) {
  height: 10px;
  animation-delay: 0s;
}
.pb-bars span:nth-child(2) {
  height: 14px;
  animation-delay: 0.1s;
}
.pb-bars span:nth-child(3) {
  height: 18px;
  animation-delay: 0.2s;
}
.pb-bars span:nth-child(4) {
  height: 12px;
  animation-delay: 0.3s;
}

@keyframes pbBarPulse {
  0%, 100% {
    transform: scaleY(0.7);
  }
  50% {
    transform: scaleY(1.2);
  }
}

/* Panel card */
.pb-card {
  position: absolute;
  bottom: 70px;
  right: 0;
  width: 280px;
  max-width: 90vw;
  background: #000;
  border-radius: 18px;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.6);
  padding: 14px 16px 16px 16px;
  color: #fff;
  border: 2px solid #ffd400;
  pointer-events: auto;
  transform-origin: bottom right;
  transform: translateY(12px) scale(0.96);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.18s ease, transform 0.18s ease, visibility 0.18s ease;
}

/* When active (you can toggle via JS by adding a class) */
.pb-card.pb-open {
  opacity: 1;
  visibility: visible;
  transform: translateY(0) scale(1);
}

/* Panel header */
.pb-header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 8px;
}

.pb-mini-badge {
  width: 32px;
  height: 32px;
  border-radius: 999px;
  border: 2px solid var(--tp-yellow-strong);
  box-shadow: 0 0 10px rgba(255, 212, 0, 0.6);
}

/* Rows */
.pb-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  font-size: 0.82rem;
  padding: 4px 0;
  border-bottom: 1px dashed rgba(255, 255, 255, 0.08);
}

.pb-row:last-child {
  border-bottom: none;
}

.pb-row label {
  font-weight: 500;
  color: #f5f5f5;
}

.pb-hint {
  font-weight: 400;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
}

.pb-value {
  font-weight: 600;
  color: var(--tp-yellow-strong);
  text-align: right;
}

/* ================= HEADER ================= */

header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: linear-gradient(to bottom, #000000 0%, #000000 60%, rgba(0, 0, 0, 0.9) 100%);
  backdrop-filter: blur(6px);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
  max-width: var(--tp-max-width);
  margin: 0 auto;
}

.tp-header {
  font-size: 2.1rem;
  font-weight: 800;
  color: var(--tp-teal);
  letter-spacing: -0.5px;
}

.tp-header-mobile {
  font-size: 1.3rem;
  font-weight: 800;
  color: var(--tp-teal);
  letter-spacing: -0.5px;
}

nav {
  display: flex;
  align-items: center;
  gap: 24px;
}

nav a {
  font-size: 0.95rem;
  font-weight: 500;
  position: relative;
  color: #fff;
}

nav a::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -4px;
  width: 0;
  height: 2px;
  background: var(--tp-teal);
  transition: width 0.2s ease;
}

nav a:hover::after {
  width: 100%;
}

.header-cta {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* MOBILE MENU TOGGLE */

.mobile-menu-toggle {
  display: none;
  width: 32px;
  height: 32px;
  border-radius: 999px;
  border: none;
  background: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.mobile-menu-toggle span {
  width: 18px;
  height: 2px;
  background: #333;
  position: relative;
}

.mobile-menu-toggle span::before,
.mobile-menu-toggle span::after {
  content: "";
  position: absolute;
  left: 0;
  width: 18px;
  height: 2px;
  background: #333;
}

.mobile-menu-toggle span::before {
  top: -5px;
}

.mobile-menu-toggle span::after {
  top: 5px;
}

/* MOBILE MENU */

.mobile-menu {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(6px);
  display: none;
  z-index: 60;
}

.mobile-menu-panel {
  position: absolute;
  top: 0;
  right: 0;
  width: 260px;
  height: 100%;
  background: #ffffcc;
  padding: 24px 18px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  box-shadow: -4px 0 12px rgba(0, 0, 0, 0.2);
}

.mobile-menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.mobile-menu-close {
  border: none;
  background: transparent;
  font-size: 1.4rem;
  cursor: pointer;
}

.mobile-menu-nav a {
  display: block;
  padding: 8px 0;
  font-weight: 500;
}

.mobile-menu-cta {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.mobile-menu.show {
  display: block;
}

@media (max-width: 768px) {
  nav {
    display: none;
  }
  .header-cta {
    display: none;
  }
  .mobile-menu-toggle {
    display: inline-flex;
  }
}

/* ================= HERO ================= */

.hero {
  position: relative;
  color: #000;
  overflow: hidden;
}

.hero-bg {
  position: relative;
  width: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at top left, rgba(255, 255, 153, 0.35), transparent 55%),
    radial-gradient(circle at bottom right, rgba(255, 90, 90, 0.35), transparent 55%);
  z-index: -1;
}

.hero-inner {
  padding: 50px 0 50px;
}

.hero-grid {
  display: grid;
  align-items: center;
  gap: clamp(24px, 5vw, 80px);
}

@media (min-width: 900px) {
  .hero-grid {
    grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
  }
}


.hero-eyebrow {
  margin-bottom: 12px;
}

.hero-title {
  font-size: 2.6rem;
  font-weight: 800;
  letter-spacing: -0.04em;
  margin-bottom: 14px;
}

@media (min-width: 900px) {
  .hero-title {
    font-size: 3.2rem;
  }
}

.hero-subtitle {
  font-size: 1.05rem;
  max-width: 520px;
  margin-bottom: 24px;
  opacity: 0.95;
}

.hero-ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 8px;
}

.hero-meta {
  font-size: 0.9rem;
  opacity: 0.9;
}

.hero-phone {
  position: relative;
  max-width: 320px;
  margin: 0 auto;
}

.phone-frame {
  border-radius: 36px;
  padding: 10px;
  background: #ffffff;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.4);
}

.phone-inner {
  border-radius: 28px;
  overflow: hidden;
  background: #000;
}

.phone-screen-img {
  width: 100%;
  height: auto;
  aspect-ratio: 9 / 19.5;
  object-fit: cover;
}


.phone-glow {
  position: absolute;
  left: 50%;
  bottom: -40px;
  width: 220px;
  height: 40px;
  transform: translateX(-50%);
  background: radial-gradient(circle, rgba(0, 0, 0, 0.4), transparent 70%);
  filter: blur(4px);
  z-index: -1;
}

/* ================= SECTION HEADERS ================= */

.section-header {
  text-align: center;
  margin-bottom: 40px;
  color: #000;
}

.intouchsection {
  text-align: center;
  margin: 0 auto;
  padding: 0;
  color: #000;
  max-width: var(--tp-max-width);
  width: 100%;
}

.showcase-header {
  text-align: center;
  margin-bottom: 40px;
  color: #fff;
}

.testimonials-header {
  text-align: center;
  margin-bottom: 40px;
  color: #fff;
}

.section-eyebrow {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #000;
  margin-bottom: 8px;
  font-weight: 600;
}

.showcase-eyebrow,
.testimonials-eyebrow {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #fff;
  margin-bottom: 8px;
  font-weight: 600;
}

.section-title {
  font-size: 2rem;
  font-weight: 800;
  color: #000;
  margin-bottom: 8px;
}

.section-subtitle {
  font-size: 0.98rem;
  color: #000;
  max-width: 520px;
  margin: 0 auto;
}

.showcase-title,
.testimonials-title {
  font-size: 2rem;
  font-weight: 800;
  color: #fff;
  margin-bottom: 8px;
}

.showcase-subtitle,
.testimonials-subtitle {
  font-size: 0.98rem;
  color: #fff;
  max-width: 520px;
  margin: 0 auto;
}

/* ================= FEATURE GRID ================= */

.feature-grid-wrapper {
  background: #ffff99;
  background-size: cover;
  background-position: center;
  background-blend-mode: soft-light;
}

.feature-grid {
  display: grid;
  gap: 24px;
}

@media (min-width: 900px) {
  .feature-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.feature-card {
  position: relative;
  border-radius: var(--tp-radius-lg);
  overflow: hidden;
  box-shadow: var(--tp-shadow-soft);
  height: 340px;
  color: #fff;
}

.feature-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.75);
  transition: transform 0.3s ease;
}

.feature-card:hover img {
  transform: scale(1.05);
}

.feature-card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent 55%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 20px;
}

.feature-card-title {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 6px;
}

.feature-card-text {
  font-size: 0.9rem;
  margin-bottom: 10px;
  opacity: 0.95;
}

.feature-card .btn {
  font-size: 0.85rem;
  padding: 8px 16px;
}

/* Testimonials cards reuse feature-card sizing but override height */
.testimonial-card {
  position: relative;
  border-radius: var(--tp-radius-lg);
  overflow: hidden;
  box-shadow: var(--tp-shadow-soft);
  height: auto;
  color: #fff;
}

/* ================= TESTIMONIALS WRAPPER ================= */

.testimonials-wrapper {
  background: #ffd400;
  padding: 25px;
  border-radius: 18px;
}

.testimonials-inner {
  background: #000;
  border-radius: 14px;
  padding: 30px;
  color: #fff;
}

.testimonials-inner h2 {
  color: #ffd400;
  margin-bottom: 20px;
}

/* ================= TWO COLUMN / CONTACT ================= */

.vendor-section,
.deliverer-section {
  background: #ffff99;
}

.two-column {
  display: grid;
  gap: 32px;
  align-items: center;
}

@media (min-width: 900px) {
  .two-column {
    grid-template-columns: 1.1fr 1fr;
  }
}

.section-text-block h2 {
  font-size: 2rem;
  margin-bottom: 12px;
  font-weight: 800;
  color: var(--tp-text);
}

.section-text-block p {
  font-size: 0.98rem;
  color: var(--tp-muted);
  margin-bottom: 18px;
  max-width: 520px;
}

.contact-text-block h2 {
  font-size: 2rem;
  margin-bottom: 12px;
  font-weight: 800;
  color: #000;
}

.contact-text-block p {
  font-size: 0.98rem;
  color: #000;
  margin-bottom: 18px;
  max-width: 520px;
}

.icon-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 10px;
  margin-bottom: 20px;
}

.icon-list li {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 0.95rem;
  color: var(--tp-text);
}

.icon-bullet {
  width: 22px;
  height: 22px;
  border-radius: 999px;
  background: rgba(0, 168, 132, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--tp-teal);
  font-size: 0.8rem;
  flex-shrink: 0;
}

/* ================= LOGO ================= */

.tp-logo-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

.tp-logo-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #00b3b3;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
}

.tp-logo-circle-mobile {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #00b3b3;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
}

/* ================= FAQ ================= */

.faq-item {
  background: #ffffff;
  border-radius: 12px;
  margin-bottom: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  overflow: hidden;
}

.faq-question {
  width: 100%;
  padding: 14px 18px;
  border: none;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.98rem;
  font-weight: 600;
  cursor: pointer;
}

.faq-answer {
  padding: 0 18px 14px 18px;
  font-size: 0.9rem;
  color: #555;
  display: none;
}

.faq-item.open .faq-answer {
  display: block;
}

.faq-item.open .faq-toggle {
  transform: rotate(45deg);
}

.faq-toggle {
  transition: transform 0.2s ease;
  font-size: 1.2rem;
}

/* ================= RESPONSIVE TWEAKS ================= */

@media (max-width: 900px) {
  .hero-grid {
    gap: 40px;
  }

  .hero-inner {
    padding: 32px 0 40px;
  }

  #pulseband-overlay {
    bottom: 12px;
    right: 12px;
  }

  .pb-card {
    width: 260px;
  }
}

`
});
