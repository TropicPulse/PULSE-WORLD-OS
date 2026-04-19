// ============================================================================
// [pulse:clinician] PULSE_OS_CLINICAL_INTERPRETER v7.3  // white
// Clinical Interpretation Layer • Read‑Only • Metadata‑Only
// ============================================================================
//
// IDENTITY — THE CLINICAL INTERPRETER:
//  ------------------------------------
//  • Reads Halo, Field, Echo, Flow metadata.
//  • Produces human‑readable, body‑style interpretations.
//  • Uses hybrid biological + system language (Option B).
//  • NEVER mutates system state, NEVER routes, NEVER computes payloads.
//  • Advantage‑cascade aware: inherits any systemic speed/efficiency gain.
//
// THEME:
//  • Color: White (clinical clarity, observation‑only).
//  • Subtheme: Diagnosis, interpretation, explanation.
//
// SAFETY CONTRACT:
//  • Read‑only.
//  • Metadata‑only.
//  • No control, no autonomy, no sentience.
//  • Deterministic: same metadata → same interpretation.
//  • Drift‑proof: no mutation, no side effects.
//
// ADVANTAGE CASCADE (conceptual only):
//  • If pulses become faster → interpretation conceptually accelerates.
//  • If system collapses 1000 pulses into 1 → clinician inherits that gain.
//  • If any organ evolves → clinician reads with that advantage.
//  • No OR — all advantages are inherited automatically.
// ============================================================================

import { PulseField } from './PulseField.js';
import { PulseHalo } from './PulseHalo.js';
import { createPulseEcho } from './PulseEcho.js';
import { PulseFlow } from './PulseFlow.js';

// -----------------------------------------------------------
// Clinician Factory
// -----------------------------------------------------------

export function createPulseClinician(mesh) {
  const flow = PulseFlow(mesh);
  const echo = createPulseEcho(mesh, flow);

  const meta = {
    layer: "PulseClinician",
    role: "CLINICAL_INTERPRETER",
    version: 7.3,
    target: "full-mesh",
    selfRepairable: true,
    evo: {
      advantageCascadeAware: true,
      pulseEfficiencyAware: true,
      driftProof: true,
      multiInstanceReady: true
    }
  };

  return {
    meta,

    // -------------------------------------------------------
    // [pulse:clinician] EXAMINE_SYSTEM  // white
    // -------------------------------------------------------
    examineSystem(entryNodeId, context = {}) {
      const haloSnapshot = PulseHalo.snapshotForClinician?.() || {};
      const fieldSnapshot = PulseField.snapshot();
      const echoReflection = echo.sendEcho(entryNodeId, context);

      return buildClinicalReport({
        halo: haloSnapshot,
        field: fieldSnapshot,
        echo: echoReflection,
        meta
      });
    }
  };
}

// -----------------------------------------------------------
// Clinical Report Builder
// -----------------------------------------------------------

function buildClinicalReport({ halo, field, echo, meta }) {
  const sections = [];

  // PERFORMANCE SUMMARY
  const performance = estimatePerformance(field, echo);
  sections.push({
    title: 'System Performance',
    summary: `Current performance is estimated at ${performance.toFixed(1)}%.`,
    details: [
      `Internal Stability (blood pressure): ${(field.stability * 100).toFixed(0)}%`,
      `Impulse Throughput (pulse rate / blood flow): ${describeThroughput(echo)}`,
      `Resonance (heart rhythm coherence): ${(field.resonance * 100).toFixed(0)}%`,
      `Friction (inflammation / resistance): ${(field.friction * 100).toFixed(0)}%`,
      `Noise (sensory overload): ${(field.noise * 100).toFixed(0)}%`
    ]
  });

  // STABILITY & DRIFT
  sections.push({
    title: 'Stability & Drift',
    summary: describeStabilityAndDrift(field, echo),
    details: [
      `Internal Stability (blood pressure): ${(field.stability * 100).toFixed(0)}%`,
      `Drift Pressure (systemic stress): ${(field.driftPressure * 100).toFixed(0)}%`,
      `Aura Loop (feedback loop): ${echo.aura.loop ? 'ACTIVE' : 'inactive'}`,
      `Aura Sync (neural synchronization / grounding): ${echo.aura.sync ? 'ACTIVE' : 'inactive'}`
    ]
  });

  // IMMUNE & HORMONES
  sections.push({
    title: 'Immune & Hormones',
    summary: describeImmuneAndHormones(echo),
    details: [
      `Immune Quarantine (infection isolation): ${echo.immune.quarantined ? 'YES' : 'no'}`,
      `Hormone Event (adrenaline / cortisol): ${echo.hormones.event || 'none'}`,
      `Reflex Drop (instinctive rejection): ${echo.reflex.triggered ? 'YES' : 'no'}`
    ]
  });

  // ENVIRONMENTAL FIELD
  sections.push({
    title: 'Internal Environment (Field)',
    summary: describeField(field),
    details: [
      `Friction (inflammation): ${(field.friction * 100).toFixed(0)}%`,
      `Noise (sensory overload): ${(field.noise * 100).toFixed(0)}%`,
      `Load Wave (circulatory surge / metabolic demand): ${(field.loadWave * 100).toFixed(0)}%`,
      `External Heat (world heat influence): ${(field.externalHeat * 100).toFixed(0)}%`,
      `External Storm (world turbulence): ${(field.externalStorm * 100).toFixed(0)}%`,
      `External Signal (world clarity): ${(field.externalSignal * 100).toFixed(0)}%`
    ]
  });

  return {
    performancePercent: performance,
    interpretation: summarizeForYou(performance, field, echo),
    sections,
    meta
  };
}

// -----------------------------------------------------------
// Interpretation Logic (unchanged)
// -----------------------------------------------------------

function estimatePerformance(field, echo) {
  let base = 100;
  base += field.resonance * 5;
  base -= field.friction * 5;
  base -= field.noise * 5;
  base -= field.driftPressure * 5;
  if (echo.aura.sync) base += 2;
  if (echo.aura.loop) base -= 3;
  return Math.max(0, base);
}

function describeThroughput(echo) {
  const hops = echo.mesh.hops || 0;
  if (hops === 0) return 'minimal routing activity';
  if (hops < 5) return 'light routing activity';
  if (hops < 15) return 'moderate routing activity';
  return 'high routing activity';
}

function describeStabilityAndDrift(field, echo) {
  const stability = field.stability;
  const drift = field.driftPressure;

  if (stability > 0.85 && drift < 0.2)
    return 'System is stable with low Drift Pressure (systemic stress).';

  if (stability > 0.6 && drift < 0.4)
    return 'System is generally stable with mild Drift Pressure.';

  if (drift >= 0.4 && !echo.aura.sync)
    return 'Drift Pressure is elevated and Aura Sync (grounding) is not active — watch for instability.';

  if (echo.aura.loop)
    return 'Aura Loop (feedback loop) detected — system may be cycling on certain patterns.';

  return 'Stability and Drift are in a mixed state; system is compensating but should be monitored.';
}

function describeImmuneAndHormones(echo) {
  const parts = [];

  if (echo.immune.quarantined)
    parts.push('Immune Quarantine is ACTIVE — unsafe impulses are being isolated.');
  else
    parts.push('Immune Quarantine is quiet — no major threats detected.');

  if (echo.hormones.event === 'boost')
    parts.push('Hormone Boost (adrenaline) event detected — system is energizing.');
  else if (echo.hormones.event === 'damp')
    parts.push('Hormone Damp (cortisol) event detected — system is calming.');
  else
    parts.push('No major hormone modulation events detected.');

  if (echo.reflex.triggered)
    parts.push('Reflex Drop occurred — some impulses were rejected early.');

  return parts.join(' ');
}

function describeField(field) {
  const { friction, noise, loadWave, externalHeat, externalStorm } = field;
  const bits = [];

  if (friction > 0.5) bits.push('Internal Friction is elevated.');
  if (noise > 0.5) bits.push('Noise is high.');
  if (loadWave > 0.5) bits.push('Load Wave is strong.');
  if (externalHeat > 0.5) bits.push('External Heat is contributing to stress.');
  if (externalStorm > 0.5) bits.push('External Storm pressure is impacting stability.');

  if (bits.length === 0)
    return 'Internal Environment is calm — low friction, low noise, manageable load.';

  return bits.join(' ');
}

function summarizeForYou(performance, field, echo) {
  const perf = performance.toFixed(1);

  if (perf > 100)
    return `We are at ${perf}%. Stability is holding, resonance is high, and Flow is compensating.`;

  if (perf > 90)
    return `System is performing well at ${perf}%. Drift Pressure and Friction are present but manageable.`;

  return `System performance is at ${perf}%. Stability and Drift should be watched — Immune and Aura patterns will reveal compensation vs degradation.`;
}
