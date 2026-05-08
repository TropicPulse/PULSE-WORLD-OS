// ============================================================================
// FILE: /PULSE-UI/_GENOME/PulseEvolutionaryStylesBaseGenome-v20.js
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
`
});
