// ============================================================================
// FILE: /PULSE-UI/_COMPONENTS/PulseEvolutionaryStylesBaseGenome-v20.js
// PULSE OS — v20-IMMORTAL-EVOLUTIONARY
// UNIVERSAL UI SKIN GENOME (A0/A1/A2/A3 SURFACE MEMBRANE)
// ============================================================================
//
// ROLE (v20 IMMORTAL):
//   This is the *foundational style genome* for Pulse OS UI.
//   It provides the universal membrane that all pages inherit before
//   page-specific UI skills are applied.
//
//   • 3D parallax depth layers
//   • Neon edge-tracing v3
//   • Immortal-grade shadows + glow rings
//   • Glass-membrane refractive surfaces
//   • Binary spectral tinting
//   • Pulse shimmer v3 (deterministic)
//   • Tier-aware chroma flares
//   • Route-aware underglow
//   • CNS impulse ripple v2
//
// CONTRACT:
//   • This genome is STATIC but EVOLVABLE.
//   • It is always included by PulseEvolutionaryStyles-v20.
//   • It is never duplicated, never drifted, never mutated at runtime.
//   • Page-specific skills may override or extend it.
//
// SAFETY:
//   • IMMORTAL: deterministic, drift-proof, no side effects.
//   • DOM-safe: applied only through the Styles Organ.
// ============================================================================

export const PulseEvolutionaryStylesBaseGenomeV20 = {
  id: "base_skin_v20",
  kind: "style_pack",
  version: "20.0-Immortal-Evolutionary",
  description: "Universal Pulse OS v20 Skin (A0/A1/A2/A3 Membrane)",

  css: `
/* ============================================================================
   PulseEvolutionaryStylesBaseGenome — v20‑IMMORTAL
   UNIVERSAL PULSE OS UI SKIN ORGAN (A0/A1/A2/A3 SURFACE MEMBRANE)
   ============================================================================ */

/* GLOBAL RESET -------------------------------------------------------------- */
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

/* WRAPPER ------------------------------------------------------------------- */
#evo-wrapper {
  padding: 32px;
  max-width: 1080px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 28px;
  position: relative;
}

/* AMBIENT PARTICLES --------------------------------------------------------- */
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

/* BLOCKS -------------------------------------------------------------------- */
.evo-block {
  background: rgba(18, 18, 18, 0.78);
  border: 1px solid rgba(0, 255, 255, 0.12);
  border-radius: 18px;
  padding: 28px;
  backdrop-filter: blur(14px) saturate(160%);
  transform-style: preserve-3d;
  transform: translateZ(0px);
  transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;

  box-shadow:
    0 8px 22px rgba(0,0,0,0.55),
    0 18px 42px rgba(0,0,0,0.65),
    inset 0 0 0 1px rgba(255,255,255,0.05);
}

/* 3D HOVER LIFT + MICRO‑TILT ------------------------------------------------ */
.evo-block:hover {
  transform: translateY(-6px) rotateX(3deg) rotateY(-2deg);
  border-color: rgba(0, 255, 255, 0.45);
  box-shadow:
    0 12px 28px rgba(0,0,0,0.65),
    0 0 22px rgba(0, 255, 255, 0.45),
    inset 0 0 0 1px rgba(255,255,255,0.08);
}

/* NEON EDGE‑TRACE v3 -------------------------------------------------------- */
.evo-block::after {
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

/* TITLES -------------------------------------------------------------------- */
.evo-title {
  font-size: 1.65rem;
  margin-bottom: 14px;
  font-weight: 600;
  color: #00eaff;
  text-shadow:
    0 0 12px rgba(0, 255, 255, 0.55),
    0 0 22px rgba(0, 255, 255, 0.35);
}

/* CONTENT ------------------------------------------------------------------- */
.evo-content {
  font-size: 1.1rem;
  line-height: 1.65rem;
  color: #dcdcdc;
  white-space: pre-wrap;
}

/* BUTTONS ------------------------------------------------------------------- */
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

/* ICONS --------------------------------------------------------------------- */
.evo-icon {
  width: 22px;
  height: 22px;
  filter: drop-shadow(0 0 6px rgba(0,255,255,0.55));
}

/* SHIMMER EFFECT v3 --------------------------------------------------------- */
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

/* ROUTE-AWARE UNDERGLOW ----------------------------------------------------- */
.evo-route-active {
  box-shadow:
    0 0 22px rgba(0, 255, 255, 0.75),
    inset 0 0 0 1px rgba(255,255,255,0.10) !important;
  border-color: rgba(0, 255, 255, 0.75) !important;
}

/* BINARY SPECTRAL TINT ------------------------------------------------------ */
.evo-binary {
  border-color: rgba(0, 255, 255, 0.65) !important;
  box-shadow:
    0 0 20px rgba(0, 255, 255, 0.65),
    inset 0 0 0 1px rgba(255,255,255,0.08) !important;
  filter: saturate(140%);
}

/* CNS IMPULSE RIPPLE v2 ----------------------------------------------------- */
.evo-impulse {
  animation: impulse-ripple 0.55s ease-out;
}

@keyframes impulse-ripple {
  0% { box-shadow: 0 0 0 rgba(0,255,255,0); }
  40% { box-shadow: 0 0 26px rgba(0,255,255,0.65); }
  100% { box-shadow: 0 0 0 rgba(0,255,255,0); }
}

/* TIER-AWARE CHROMA FLARES -------------------------------------------------- */
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
`
};
