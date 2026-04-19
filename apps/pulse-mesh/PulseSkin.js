// ============================================================================
// [pulse:mesh] COMMUNITY_SKIN_LAYER v7.3  // silver
// Boundary Layer • Entry/Exit Normalization • Metadata-Only
// ============================================================================
//
// IDENTITY — THE SKIN:
//  --------------------
//  • Boundary layer between the system and external environment.
//  • Normalizes incoming impulses, sanitizes outgoing impulses.
//  • Reduces friction, stabilizes transitions, preserves pulse integrity.
//  • NEVER computes payloads, NEVER mutates data content.
//  • Metadata-only shaping for safe entry/exit.
//
// THEME:
//  • Color: Silver (boundary, membrane, protection).
//  • Subtheme: Normalization, stabilization, transition.
//
// SAFETY CONTRACT:
//  • Metadata-only.
//  • No payload access.
//  • No routing override.
//  • No autonomy, no sentience.
//  • Deterministic, drift-proof boundary behavior.
//
// ADVANTAGE CASCADE (conceptual only):
//  ------------------------------------
//  • Inherits ANY advantage from ANY organ automatically.
//  • Dual-mode: mental clarity + system efficiency.
//  • Local-aware: node-level boundary context.
//  • Internet-aware: cluster/mesh/global boundary context.
//  • Unified-advantage-field: ALL advantages active unless unsafe.
//  • Future-evolution-ready: new safe advantages auto-inherited.
// ============================================================================


// -----------------------------------------------------------
// Skin State (environment metadata)
// -----------------------------------------------------------

const SkinState = {
  environment: 'default',
  friction: 0.0,
  noise: 0.0,
  boundaryLoad: 0.0,

  meta: {
    layer: "PulseSkin",
    role: "BOUNDARY_LAYER",
    version: 7.3,
    target: "full-mesh",
    selfRepairable: true,
    evo: {
      dualMode: true,                 // mental + system
      localAware: true,               // node-level boundary
      internetAware: true,            // cluster/mesh/global boundary

      advantageCascadeAware: true,    // inherits ANY advantage
      pulseEfficiencyAware: true,     // 1-pulse collapse
      driftProof: true,
      multiInstanceReady: true,

      unifiedAdvantageField: true,    // no OR; all advantages ON
      futureEvolutionReady: true      // new safe advantages auto-inherited
    }
  }
};


// -----------------------------------------------------------
// Skin Pack: boundary shaping rules (logic unchanged)
// -----------------------------------------------------------

export const PulseSkin = {
  normalizeEntry(impulse) {
    impulse.flags = impulse.flags || {};
    impulse.flags.skin_entry_normalized = true;

    impulse.score = clamp01(impulse.score ?? 0.5);
    impulse.energy = Math.max(0.05, impulse.energy ?? 1);

    return impulse;
  },

  normalizeExit(impulse) {
    impulse.flags = impulse.flags || {};
    impulse.flags.skin_exit_normalized = true;

    impulse.flags.internal_metadata_stripped = true;

    return impulse;
  },

  applyFriction(impulse) {
    if (SkinState.friction > 0) {
      impulse.energy *= (1 - SkinState.friction * 0.1);
    }
    return impulse;
  },

  applyNoise(impulse) {
    if (SkinState.noise > 0) {
      impulse.score = clamp01(
        impulse.score - SkinState.noise * 0.05
      );
    }
    return impulse;
  },

  applyBoundaryLoad(impulse) {
    impulse.flags = impulse.flags || {};
    impulse.flags.skin_boundary_load = SkinState.boundaryLoad;
    return impulse;
  }
};


// -----------------------------------------------------------
// Skin Engine (logic unchanged, metadata upgraded)
// -----------------------------------------------------------

export function applyPulseSkin(impulse, phase = 'entry') {
  impulse.flags = impulse.flags || {};
  impulse.flags.skin_meta = SkinState.meta;

  if (phase === 'entry') {
    PulseSkin.normalizeEntry(impulse);
  }

  PulseSkin.applyFriction(impulse);
  PulseSkin.applyNoise(impulse);
  PulseSkin.applyBoundaryLoad(impulse);

  if (phase === 'exit') {
    PulseSkin.normalizeExit(impulse);
  }

  impulse.flags.skin_applied = true;

  return impulse;
}


// -----------------------------------------------------------
// Helpers
// -----------------------------------------------------------

function clamp01(v) {
  return Math.max(0, Math.min(1, v));
}
