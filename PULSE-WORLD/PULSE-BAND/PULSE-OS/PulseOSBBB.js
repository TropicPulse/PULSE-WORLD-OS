// ============================================================================
//  PULSE OS v11 — OUTER BLOOD–BRAIN BARRIER (Outer BBB)
//  Perivascular Shield • Shell Gatekeeper • Environmental Filter
//  PURE PERMISSION. NO BACKEND. NO NETWORK. NO UI.
//  DUALBAND: SYMBOLIC SURFACE + BINARY-AWARE METADATA (NO BINARY EXECUTION)
// ============================================================================
//
//  IDENTITY — OUTER BBB (v11):
//  ---------------------------
//  • First defensive membrane of the PulseOS organism.
//  • Filters environmental context before it reaches the cortex (PulseOSBrain).
//  • Determines whether PulseBand / PNS nervous system may exist on this route.
//  • Distinguishes SAFE vs UNSAFE environments.
//  • Blocks identity access unless conditions are met.
//  • Protects the inner BBB (Identity Organ) from contamination.
//  • Fully LOCAL-FIRST — zero backend, zero network dependency.
//  • Drift-proof, deterministic, offline-capable.
//  • Pure shell-state engine — no side effects.
//  • Dualband-aware: symbolic routing surface + binary compression metadata.
//    (Binary is a post-render compression pass elsewhere, never here.)
//
//  ROLE IN THE DIGITAL BODY (v11):
//  -------------------------------
//  • Environmental Filter → Screens unsafe routes.
//  • Shell Gatekeeper → Controls PulseBand existence.
//  • Identity Sentinel → Blocks unauthorized identity flow.
//  • Permission Valve → Determines anon/auth/no-shell modes.
//  • Cortex Perimeter → Protects PulseOSBrain + Identity Organ.
//  • Offline Autonomy → Works even with WiFi OFF.
//  • **Outer BBB = Shell Permission + Trust Boundary + Continuance Guard**.
//
//  WHAT THIS FILE IS (v11):
//  ------------------------
//  • Global shell boundary for PulseOS.
//  • Single source of truth for shell state.
//  • Permission engine for PulseBand existence.
//  • Identity-access gate for the frontend layer.
//  • Environmental classifier for all routes.
//  • First line of defense in the trust chain.
//  • Fully local — no backend calls required.
//  • Pure logic — no side effects, no mutations.
//  • Deterministic continuance membrane (never blocks the organism, only shapes access).
//  • Dualband contract surface for CNS + Router + SendSystem.
//
//  WHAT THIS FILE IS NOT (v11):
//  ----------------------------
//  • NOT a backend module.
//  • NOT an identity loader.
//  • NOT a UI renderer.
//  • NOT a healing engine.
//  • NOT a session validator.
//  • NOT a compute engine.
//  • NOT a place for dynamic imports or eval.
//  • NOT dependent on network state.
//  • NOT allowed to mutate identity or memory.
//  • NOT a binary executor (binary is post-render compression elsewhere).
//
//  SAFETY CONTRACT (v11):
//  ----------------------
//  • No backend calls.
//  • No identity mutation.
//  • No UI logic.
//  • No compute.
//  • No dynamic imports.
//  • Deterministic, drift-proof shell-state behavior only.
//  • Local-only permission logic.
//  • Offline continuity guaranteed.
//  • Pure function purity — no side effects.
//  • Compatible with:
//      - PulseOS v11
//      - PulseRouter-v11
//      - PulseSendSystem-v11
//      - PulseGPU-v11 (metadata only, no GPU calls)
// ============================================================================
// ============================================================================
//  PulseOSOuterBBB-v12.3-Spine.js
//  OUTER BLOOD–BRAIN BARRIER — OS SHELL PERIMETER (v12.3-SPINE)
//  Dualband, Presence-Aware, Chunk/Prewarm-Aware, Deterministic Shell Gate
// ============================================================================
import {
  OrganismIdentity,
  buildPulseOrganismMap as buildOrganismMap
} from "../PULSE-X/PulseWorldOrganismMap-v21.js";
const Identity = OrganismIdentity(import.meta.url);

// 2 — EXPORT GENOME METADATA
// export const PulseMeshMeta = Identity.OrganMeta;
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
// export const PULSE_EARN_IMMUNE_CONTEXT = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;


// ============================================================================
//  FACTORY — ALL DEPENDENCIES ARE INJECTED BY THE CNS BRAIN
//  (BBB MUST HAVE ZERO IMPORTS)
// ============================================================================
export function createPulseOSBBB({ log }) {
  const BBBMeta = {
    PulseRole,
    layer: "OuterBBB",
    version: "12.3-SPINE",
    generation: "v12.3",
    dualBand: true,
    symbolicSurface: true,
    binaryCompressionSurface: true
  };

  // ========================================================================
  //  SHELL STATE ENUM (v12.3-SPINE)
  // ========================================================================
  const SHELL_STATES = {
    NO_SHELL: "no-shell",      // PulseBand forbidden
    ANON_SHELL: "anon-shell",  // PulseBand allowed, identity blocked
    AUTH_SHELL: "auth-shell"   // PulseBand + identity allowed
  };

  // ========================================================================
  //  ROUTE CLASSIFICATION (v12.3-SPINE)
  // ========================================================================
  const HARD_NO_SHELL_ROUTES = new Set([
    "login",
    "404",
    "expired",
    "maintenance",
    "offline",
    "fatal",
    "panic"
  ]);

  const ANON_SHELL_ROUTES = new Set([
    "main",
    "landing",
    "marketing",
    "moat",
    "public",
    "welcome"
  ]);

  const PRESENCE_PRIORITY_ROUTES = new Set([
    "main",
    "home",
    "dashboard",
    "play",
    "session",
    "party"
  ]);

  const PREFETCH_PRIORITY_ROUTES = new Set([
    "main",
    "home",
    "dashboard",
    "library",
    "store"
  ]);

  // ========================================================================
  //  determineShellState — pure shell-state engine
  // ========================================================================
  function determineShellState({ routeName, hasIdentity }) {
    const route = (routeName || "").toLowerCase();

    if (HARD_NO_SHELL_ROUTES.has(route)) {
      return SHELL_STATES.NO_SHELL;
    }

    if (ANON_SHELL_ROUTES.has(route)) {
      return SHELL_STATES.ANON_SHELL;
    }

    if (hasIdentity) {
      return SHELL_STATES.AUTH_SHELL;
    }

    return SHELL_STATES.ANON_SHELL;
  }

  // ========================================================================
  //  guardPulseBand — shapes PulseBand + identity access
  // ========================================================================
  function guardPulseBand(ctx) {
    const shellState = determineShellState(ctx);

    return {
      shellState,
      allowPulseBand:
        shellState === SHELL_STATES.ANON_SHELL ||
        shellState === SHELL_STATES.AUTH_SHELL,
      allowIdentity: shellState === SHELL_STATES.AUTH_SHELL
    };
  }

  // ========================================================================
  //  buildCacheHints — route-level chunk/prewarm hints (metadata only)
// ========================================================================
  function buildCacheHints({ routeName }) {
    const route = (routeName || "").toLowerCase();

    const prewarm = PREFETCH_PRIORITY_ROUTES.has(route);
    const presenceCritical = PRESENCE_PRIORITY_ROUTES.has(route);

    return {
      route,
      prewarmChunks: prewarm,
      prewarmPresence: presenceCritical,
      suggestedBands: {
        symbolic: true,
        binary: true
      }
    };
  }

  // ========================================================================
  //  buildPresenceDirectives — presence/mesh directives (metadata only)
// ========================================================================
  function buildPresenceDirectives({
    routeName,
    hasIdentity,
    bluetoothAvailable,
    meshAvailable
  }) {
    const route = (routeName || "").toLowerCase();
    const presenceCritical = PRESENCE_PRIORITY_ROUTES.has(route);

    const enablePresenceField =
      presenceCritical && (hasIdentity || route === "party");

    const enableBluetoothPresence =
      enablePresenceField && !!bluetoothAvailable;

    const enableMeshPresence =
      enablePresenceField && !!meshAvailable;

    return {
      route,
      enablePresenceField,
      enableBluetoothPresence,
      enableMeshPresence
    };
  }

  // ========================================================================
  //  PUBLIC BBB INTERFACE (v12.3-SPINE)
// ========================================================================
  return {
    PulseRole,
    BBBMeta,
    SHELL_STATES,
    determineShellState,
    guardPulseBand,
    buildCacheHints,
    buildPresenceDirectives
  };
}
