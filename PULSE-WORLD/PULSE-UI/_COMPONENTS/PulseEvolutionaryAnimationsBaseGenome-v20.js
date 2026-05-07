// ============================================================================
// FILE: /PULSE-UI/_COMPONENTS/PulseEvolutionaryAnimationsBaseGenome-v20.js
// PULSE OS — v20-IMMORTAL-EVOLUTIONARY
// UNIVERSAL ANIMATION GENOME (A0 ANIMATION MEMBRANE)
// ============================================================================
//
// ROLE (v20 IMMORTAL):
//   This is the foundational animation genome for Pulse OS UI.
//   It provides the universal animation membrane that all pages inherit before
//   page-specific animation skills are applied.
//
//   • deterministic GPU-friendly animations
//   • binary-aware contrast motion
//   • neon-native glow pulses
//   • cinematic breathing + heartbeat
//   • vault / door / portal sequences
//   • smoke / fog / particle atmospherics
//   • mascot / character hooks
//   • weather + wildlife FX (Belize-tropic)
//   • Earn / economy / badge FX
//   • route / CNS / impulse-aware hooks
//   • sound / picture hooks via data- attributes
//   • shimmer v4, impulse-flash v3, scanline v3
//   • evolvable asset mapping via Organism Map
//
// CONTRACT:
//   • This genome is STATIC but EVOLVABLE.
//   • It is always included by PulseEvolutionaryStyles-v20.
//   • It is never duplicated, never drifted, never mutated at runtime.
//   • Page-specific animation skills may override or extend it.
//
// SAFETY:
//   • IMMORTAL: deterministic, drift-proof, no side effects.
//   • DOM-safe: applied only through the Styles Organ.
// ============================================================================

export const PulseEvolutionaryAnimationsBaseGenomeV20 = {
  id: "base_animations_v20",
  kind: "animation_pack",
  version: "20.0-Immortal-Evolutionary",
  description: "Universal Pulse OS v20 Animation Genome (A0 Animation Membrane)",

  css: `
/* ============================================================================
   PulseEvolutionaryAnimations.css — v20‑IMMORTAL
   UNIVERSAL ANIMATION ORGAN FOR PULSE UI (EVOLVABLE)
   ============================================================================ */

/* CORE TIMING TOKENS -------------------------------------------------------- */
:root {
  --evo-fast: 0.25s;
  --evo-med: 0.55s;
  --evo-slow: 1.2s;
  --evo-loop-long: 4.8s;
  --evo-loop-short: 2.4s;

  --evo-neon-cyan:   #00eaff;
  --evo-neon-green:  #00ff99;
  --evo-neon-red:    #ff4d4d;
  --evo-neon-gold:   #ffd700;
  --evo-neon-purple: #b300ff;
  --evo-neon-blue:   #4da3ff;

  /* Evolvable picture registry (populated by Organism Map) */
  --picture-toucan-silhouette: "";
  --picture-jaguar-eyes: "";
  --picture-dolphin-silhouette: "";
  --picture-ocean-wave-tile: "";
  --picture-mascot-idle: "";
  --picture-vault-bg: "";
  --picture-belize-sunset: "";

  /* Evolvable sound registry (populated by Organism Map) */
  --sound-vault-open: "";
  --sound-mascot-talk: "";
  --sound-earn-badge: "";
}

/* PULSE GLOW v3 ------------------------------------------------------------- */
@keyframes pulse-glow-v3 {
  0%   { box-shadow: 0 0 4px rgba(0,255,255,0.18); }
  40%  { box-shadow: 0 0 22px rgba(0,255,255,0.65); }
  100% { box-shadow: 0 0 4px rgba(0,255,255,0.18); }
}

.evo-pulse {
  animation: pulse-glow-v3 2.8s infinite ease-in-out;
}

/* BREATHING PANEL v3 -------------------------------------------------------- */
@keyframes evo-breathe-v3 {
  0%   { transform: scale(1); opacity: 0.9; }
  50%  { transform: scale(1.02); opacity: 1; }
  100% { transform: scale(1); opacity: 0.9; }
}

.evo-breathe {
  animation: evo-breathe-v3 4.6s infinite ease-in-out;
}

/* SHIMMER v4 (route-aware) -------------------------------------------------- */
@keyframes evo-shimmer-v4 {
  0%   { left: -180%; }
  100% { left: 180%; }
}

.evo-shimmer {
  position: relative;
  overflow: hidden;
}

.evo-shimmer::after {
  content: "";
  position: absolute;
  top: 0;
  left: -180%;
  width: 180%;
  height: 100%;
  background: linear-gradient(
    120deg,
    transparent 0%,
    rgba(255,255,255,0.14) 50%,
    transparent 100%
  );
  animation: evo-shimmer-v4 2.9s linear infinite;
}

/* NEON FLICKER v3 ----------------------------------------------------------- */
@keyframes evo-flicker-v3 {
  0%, 18%, 22%, 24%, 53%, 57%, 100% { opacity: 1; }
  20%, 23%, 55% { opacity: 0.32; }
}

.evo-flicker {
  animation: evo-flicker-v3 3.8s infinite;
}

/* BINARY SCAN v3 ------------------------------------------------------------ */
@keyframes evo-scan-v3 {
  0%   { background-position: 0 0; }
  100% { background-position: 0 140%; }
}

.evo-binary-scan {
  background-image: repeating-linear-gradient(
    to bottom,
    rgba(0,255,255,0.10) 0px,
    rgba(0,255,255,0.10) 2px,
    transparent 2px,
    transparent 6px
  );
  animation: evo-scan-v3 1.9s linear infinite;
}

/* ORGANISM HEARTBEAT v3 ----------------------------------------------------- */
@keyframes evo-heartbeat-v3 {
  0%   { transform: scale(1); }
  18%  { transform: scale(1.07); }
  36%  { transform: scale(1); }
  58%  { transform: scale(1.045); }
  80%  { transform: scale(1); }
  100% { transform: scale(1); }
}

.evo-heartbeat {
  animation: evo-heartbeat-v3 3.3s infinite ease-in-out;
}

/* CNS IMPULSE FLASH v3 ------------------------------------------------------ */
@keyframes evo-impulse-flash-v3 {
  0%   { box-shadow: 0 0 0 rgba(0,255,255,0); }
  40%  { box-shadow: 0 0 28px rgba(0,255,255,0.7); }
  100% { box-shadow: 0 0 0 rgba(0,255,255,0); }
}

.evo-impulse {
  animation: evo-impulse-flash-v3 0.48s ease-out;
}

/* ROUTE TRANSITION GLOW v2 -------------------------------------------------- */
@keyframes evo-route-transition-v2 {
  0%   { box-shadow: 0 0 0 rgba(0,255,255,0); }
  50%  { box-shadow: 0 0 22px rgba(0,255,255,0.5); }
  100% { box-shadow: 0 0 0 rgba(0,255,255,0); }
}

.evo-route-active {
  animation: evo-route-transition-v2 0.65s ease-out;
}

/* IMMORTAL TIER GLOW v2 ----------------------------------------------------- */
@keyframes evo-immortal-glow-v2 {
  0%   { filter: drop-shadow(0 0 6px rgba(180,0,255,0.45)); }
  50%  { filter: drop-shadow(0 0 16px rgba(180,0,255,0.8)); }
  100% { filter: drop-shadow(0 0 6px rgba(180,0,255,0.45)); }
}

.evo-immortal {
  animation: evo-immortal-glow-v2 3.2s infinite ease-in-out;
}

/* ============================================================================  
   VAULT / DOOR / PORTAL PACK
   ============================================================================ */

@keyframes evo-vault-wheel-spin {
  0%   { transform: rotate(0deg); }
  40%  { transform: rotate(120deg); }
  100% { transform: rotate(180deg); }
}

@keyframes evo-vault-door-open {
  0%   { transform: translateZ(0) rotateY(0deg); }
  40%  { transform: translateZ(10px) rotateY(-25deg); }
  100% { transform: translateZ(20px) rotateY(-60deg); }
}

.evo-vault {
  position: relative;
  transform-style: preserve-3d;
  perspective: 1200px;
}

.evo-vault-wheel {
  animation: evo-vault-wheel-spin 1.6s ease-in-out forwards;
  transform-origin: center;
}

.evo-vault-door {
  transform-origin: left center;
  animation: evo-vault-door-open 1.8s ease-out forwards;
}

@keyframes evo-vault-smoke {
  0%   { opacity: 0; transform: scale(0.8) translateY(10px); filter: blur(6px); }
  40%  { opacity: 0.9; transform: scale(1.05) translateY(0); filter: blur(10px); }
  100% { opacity: 0; transform: scale(1.2) translateY(-10px); filter: blur(14px); }
}

.evo-vault-smoke {
  pointer-events: none;
  position: absolute;
  inset: -20px;
  background: radial-gradient(circle, rgba(255,255,255,0.18), transparent 60%);
  mix-blend-mode: screen;
  animation: evo-vault-smoke 1.4s ease-out forwards;
}

/* PORTAL PACK --------------------------------------------------------------- */

@keyframes evo-portal-open {
  0%   { transform: scale(0.4); opacity: 0; box-shadow: 0 0 0 rgba(0,255,255,0); }
  50%  { transform: scale(1.05); opacity: 1; box-shadow: 0 0 26px rgba(0,255,255,0.7); }
  100% { transform: scale(1); opacity: 1; box-shadow: 0 0 12px rgba(0,255,255,0.4); }
}

@keyframes evo-portal-swirl {
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.evo-portal {
  position: relative;
  border-radius: 999px;
  border: 1px solid rgba(0,255,255,0.5);
  box-shadow: 0 0 18px rgba(0,255,255,0.6);
  animation: evo-portal-open 0.9s ease-out forwards;
}

.evo-portal-ring {
  position: absolute;
  inset: 10%;
  border-radius: 999px;
  border: 1px solid rgba(0,255,255,0.4);
  animation: evo-portal-swirl 6s linear infinite;
}

/* ============================================================================  
   SMOKE / FOG / PARTICLE PACK
   ============================================================================ */

@keyframes evo-smoke-vortex {
  0%   { transform: translate(-10px, 10px) scale(0.9); opacity: 0.0; }
  30%  { opacity: 0.6; }
  60%  { transform: translate(10px, -10px) scale(1.05); opacity: 0.8; }
  100% { transform: translate(20px, -20px) scale(1.15); opacity: 0; }
}

.evo-smoke-vortex {
  position: absolute;
  inset: -40px;
  background: radial-gradient(circle, rgba(255,255,255,0.16), transparent 70%);
  mix-blend-mode: screen;
  filter: blur(10px);
  pointer-events: none;
  animation: evo-smoke-vortex 4.8s ease-out infinite;
}

@keyframes evo-cyber-mist {
  0%   { transform: translateX(-20px); opacity: 0.0; }
  20%  { opacity: 0.35; }
  80%  { opacity: 0.35; }
  100% { transform: translateX(20px); opacity: 0.0; }
}

.evo-cyber-mist {
  position: absolute;
  inset: -30px;
  background: linear-gradient(
    to right,
    rgba(0,255,255,0.08),
    rgba(0,255,150,0.10),
    rgba(0,255,255,0.08)
  );
  mix-blend-mode: screen;
  filter: blur(12px);
  pointer-events: none;
  animation: evo-cyber-mist 9s linear infinite;
}

@keyframes evo-particle-burst {
  0%   { transform: translate(0,0) scale(0.4); opacity: 1; }
  100% { transform: translate(var(--evo-px, 20px), var(--evo-py, -20px)) scale(1.2); opacity: 0; }
}

.evo-particle {
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: radial-gradient(circle, #00eaff, transparent 70%);
  pointer-events: none;
  animation: evo-particle-burst 0.7s ease-out forwards;
}

/* ============================================================================  
   MASCOT / CHARACTER PACK
   ============================================================================ */

@keyframes evo-mascot-idle {
  0%   { transform: translateY(0); }
  50%  { transform: translateY(-4px); }
  100% { transform: translateY(0); }
}

@keyframes evo-mascot-blink {
  0%, 92%, 100% { transform: scaleY(1); }
  94%, 96%      { transform: scaleY(0.1); }
}

@keyframes evo-mascot-talk {
  0%   { transform: scaleY(1); }
  25%  { transform: scaleY(0.7); }
  50%  { transform: scaleY(1.1); }
  75%  { transform: scaleY(0.8); }
  100% { transform: scaleY(1); }
}

.evo-mascot {
  transform-origin: center bottom;
  animation: evo-mascot-idle 4.2s ease-in-out infinite;
}

.evo-mascot-eyes {
  transform-origin: center;
  animation: evo-mascot-blink 6.5s linear infinite;
}

.evo-mascot-mouth-talking {
  transform-origin: center;
  animation: evo-mascot-talk 0.32s ease-in-out infinite;
}

/* ============================================================================  
   WEATHER FX PACK (BELIZE TROPIC)
   ============================================================================ */

@keyframes evo-rain-fall {
  0%   { background-position: 0 -40px; opacity: 0.0; }
  10%  { opacity: 0.45; }
  90%  { opacity: 0.45; }
  100% { background-position: 0 40px; opacity: 0.0; }
}

.evo-weather-rain {
  pointer-events: none;
  position: absolute;
  inset: 0;
  background-image: linear-gradient(
    to bottom,
    rgba(0,255,255,0.35) 0px,
    transparent 40px
  );
  background-size: 2px 40px;
  mix-blend-mode: screen;
  animation: evo-rain-fall 1.4s linear infinite;
}

@keyframes evo-lightning-flash {
  0%, 92%, 100% { opacity: 0; }
  94%          { opacity: 0.9; }
  96%          { opacity: 0.2; }
}

.evo-weather-storm {
  pointer-events: none;
  position: absolute;
  inset: 0;
  background: radial-gradient(circle, rgba(255,255,255,0.9), transparent 60%);
  mix-blend-mode: screen;
  opacity: 0;
  animation: evo-lightning-flash 3.8s linear infinite;
}
@keyframes evo-sun-glow {
  0%   { transform: scale(0.95); opacity: 0.7; }
  50%  { transform: scale(1.05); opacity: 1; }
  100% { transform: scale(0.95); opacity: 0.7; }
}

.evo-weather-sun {
  position: absolute;
  width: 120px;
  height: 120px;
  border-radius: 999px;
  background: radial-gradient(circle, #ffd700, transparent 70%);
  mix-blend-mode: screen;
  animation: evo-sun-glow 5.2s ease-in-out infinite;
}

/* CLOUD DRIFT --------------------------------------------------------------- */
@keyframes evo-cloud-drift {
  0%   { transform: translateX(-40px); opacity: 0.0; }
  20%  { opacity: 0.6; }
  80%  { opacity: 0.6; }
  100% { transform: translateX(40px); opacity: 0.0; }
}

.evo-weather-clouds {
  position: absolute;
  inset: 10% 0 40% 0;
  background: radial-gradient(circle, rgba(255,255,255,0.4), transparent 70%);
  filter: blur(10px);
  mix-blend-mode: screen;
  animation: evo-cloud-drift 18s linear infinite;
}

/* ============================================================================  
   WILDLIFE FX PACK (BELIZE)
   ============================================================================ */

/* TOUCAN FLYBY -------------------------------------------------------------- */
@keyframes evo-toucan-fly {
  0%   { transform: translateX(-20%) translateY(-10px); opacity: 0; }
  10%  { opacity: 1; }
  90%  { opacity: 1; }
  100% { transform: translateX(120%) translateY(10px); opacity: 0; }
}

.evo-wildlife-toucan {
  position: absolute;
  top: 12%;
  left: -20%;
  width: 120px;
  height: 60px;
  background: var(--picture-toucan-silhouette) center/contain no-repeat;
  animation: evo-toucan-fly 14s linear infinite;
}

/* JAGUAR PROWL -------------------------------------------------------------- */
@keyframes evo-jaguar-prowl {
  0%   { transform: translateX(0); opacity: 0.0; }
  10%  { opacity: 0.7; }
  90%  { opacity: 0.7; }
  100% { transform: translateX(40px); opacity: 0.0; }
}

.evo-wildlife-jaguar-eyes {
  position: absolute;
  bottom: 12%;
  left: 10%;
  width: 80px;
  height: 30px;
  background: var(--picture-jaguar-eyes) center/contain no-repeat;
  animation: evo-jaguar-prowl 11s ease-in-out infinite;
}

/* DOLPHIN SPLASH ------------------------------------------------------------ */
@keyframes evo-dolphin-arc {
  0%   { transform: translate(-10%, 20%) scale(0.9); opacity: 0; }
  20%  { opacity: 1; }
  50%  { transform: translate(20%, -10%) scale(1.05); }
  80%  { opacity: 1; }
  100% { transform: translate(50%, 20%) scale(0.9); opacity: 0; }
}

.evo-wildlife-dolphin {
  position: absolute;
  bottom: 8%;
  left: 5%;
  width: 120px;
  height: 80px;
  background: var(--picture-dolphin-silhouette) center/contain no-repeat;
  animation: evo-dolphin-arc 16s ease-in-out infinite;
}

/* ============================================================================  
   TECH / ORGAN FX PACK
   ============================================================================ */

/* BINARY FLOW --------------------------------------------------------------- */
@keyframes evo-binary-flow {
  0%   { background-position: 0 0; opacity: 0.0; }
  10%  { opacity: 0.4; }
  90%  { opacity: 0.4; }
  100% { background-position: 0 100%; opacity: 0.0; }
}

.evo-binary-flow {
  background-image: linear-gradient(
    to bottom,
    rgba(0,255,255,0.4) 0px,
    transparent 18px
  );
  background-size: 2px 18px;
  animation: evo-binary-flow 2.2s linear infinite;
}

/* NEURAL PULSE -------------------------------------------------------------- */
@keyframes evo-neural-pulse {
  0%   { box-shadow: 0 0 0 rgba(0,255,150,0); }
  50%  { box-shadow: 0 0 18px rgba(0,255,150,0.7); }
  100% { box-shadow: 0 0 0 rgba(0,255,150,0); }
}

.evo-neural {
  animation: evo-neural-pulse 2.6s ease-in-out infinite;
}

/* ROUTER HOP ---------------------------------------------------------------- */
@keyframes evo-router-hop {
  0%   { stroke-dashoffset: 40; }
  100% { stroke-dashoffset: 0; }
}

.evo-router-line {
  stroke-dasharray: 40;
  animation: evo-router-hop 1.2s ease-out forwards;
}

/* MEMORY SAVE --------------------------------------------------------------- */
@keyframes evo-memory-save {
  0%   { box-shadow: 0 0 0 rgba(0,255,255,0); }
  50%  { box-shadow: 0 0 18px rgba(0,255,255,0.7); }
  100% { box-shadow: 0 0 0 rgba(0,255,255,0); }
}

.evo-memory-save {
  animation: evo-memory-save 0.6s ease-out;
}

/* ============================================================================  
   EARN / ECONOMY FX PACK
   ============================================================================ */

/* COIN SPIN ----------------------------------------------------------------- */
@keyframes evo-coin-spin {
  0%   { transform: rotateY(0deg); }
  50%  { transform: rotateY(180deg); }
  100% { transform: rotateY(360deg); }
}

.evo-earn-coin {
  transform-style: preserve-3d;
  animation: evo-coin-spin 1.4s linear infinite;
}

/* BADGE EARNED -------------------------------------------------------------- */
@keyframes evo-badge-pop {
  0%   { transform: scale(0.4); opacity: 0; }
  40%  { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}

@keyframes evo-confetti-fall {
  0%   { transform: translateY(-20px) rotate(0deg); opacity: 1; }
  100% { transform: translateY(40px) rotate(180deg); opacity: 0; }
}

.evo-badge-earned {
  animation: evo-badge-pop 0.45s ease-out forwards;
}

.evo-confetti {
  position: absolute;
  width: 6px;
  height: 10px;
  background: linear-gradient(to bottom, #ffd700, #00eaff);
  animation: evo-confetti-fall 0.9s ease-out forwards;
}

/* ============================================================================  
   NAVIGATION / ROUTE FX PACK
   ============================================================================ */

@keyframes evo-route-slide {
  0%   { transform: translateX(12px); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
}

.evo-route-enter {
  animation: evo-route-slide 0.35s ease-out;
}

@keyframes evo-route-ripple {
  0%   { transform: scale(0.4); opacity: 0.6; }
  100% { transform: scale(1.6); opacity: 0; }
}

.evo-route-ripple {
  position: absolute;
  border-radius: 999px;
  border: 1px solid rgba(0,255,255,0.6);
  animation: evo-route-ripple 0.6s ease-out forwards;
}

/* ============================================================================  
   BRAND / AESTHETIC FX PACK
   ============================================================================ */

@keyframes evo-neon-ring {
  0%   { box-shadow: 0 0 6px rgba(0,234,255,0.4); }
  50%  { box-shadow: 0 0 18px rgba(0,234,255,0.9); }
  100% { box-shadow: 0 0 6px rgba(0,234,255,0.4); }
}

.evo-neon-ring {
  border-radius: 999px;
  border: 1px solid rgba(0,234,255,0.7);
  animation: evo-neon-ring 3.4s ease-in-out infinite;
}

/* ============================================================================  
   TROPIC BELIZE PACK
   ============================================================================ */

@keyframes evo-palm-sway {
  0%   { transform: rotate(-2deg); }
  50%  { transform: rotate(3deg); }
  100% { transform: rotate(-2deg); }
}

.evo-palm {
  transform-origin: bottom center;
  animation: evo-palm-sway 6.8s ease-in-out infinite;
}

@keyframes evo-ocean-wave {
  0%   { background-position: 0 0; }
  100% { background-position: 80px 0; }
}

.evo-ocean {
  background-image: var(--picture-ocean-wave-tile);
  background-repeat: repeat-x;
  animation: evo-ocean-wave 8s linear infinite;
}

/* ============================================================================  
   SOUND / PICTURE HOOK CLASSES
   ============================================================================ */

[data-sound] { }
[data-picture] { }

[data-picture="vault-bg"] {
  background-image: var(--picture-vault-bg);
}

[data-picture="mascot-idle"] {
  background-image: var(--picture-mascot-idle);
}

[data-picture="belize-sunset"] {
  background-image: var(--picture-belize-sunset);
}

[data-sound="vault-open"] {
  --sound-src: var(--sound-vault-open);
}

[data-sound="mascot-talk"] {
  --sound-src: var(--sound-mascot-talk);
}

[data-sound="earn-badge"] {
  --sound-src: var(--sound-earn-badge);
}
`
};
