// ============================================================================
//  PulseOSOuterBBB-v24-IMMORTAL-SPINE++.js
//  OUTER BLOOD–BRAIN BARRIER — OS SHELL PERIMETER (v24++ IMMORTAL)
//  Dualband • Presence-Aware • Mesh-Aware • Expansion-Aware
//  Trust-Boundary v24 • Continuance-Guard v24 • Prewarm/Lane Intel v24
//  PURE PERMISSION. ZERO BACKEND. ZERO NETWORK. ZERO UI.
// ============================================================================

import {
  OrganismIdentity,
  buildPulseOrganismMap as buildOrganismMap
} from "../PULSE-X/PULSE-WORLD-MAP.js
";

const Identity = OrganismIdentity(import.meta.url);

// GENOME METADATA — v24++
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

// ============================================================================
//  FACTORY — BBB MUST HAVE ZERO IMPORTS (all deps injected)
// ============================================================================
export function createPulseOSBBB({ log }) {
  const BBBMeta = {
    PulseRole,
    layer: "OuterBBB",
    version: "24-IMMORTAL-SPINE++",
    generation: "v24++",
    dualBand: true,
    symbolicSurface: true,
    binaryCompressionSurface: true,

    // v24++ metadata
    trustBoundary: "v24",
    continuanceGuard: "v24",
    presenceAware: true,
    meshAware: true,
    expansionAware: true,
    advantageAware: true
  };

  // ========================================================================
  //  SHELL STATE ENUM — v24++
  // ========================================================================
  const SHELL_STATES = {
    NO_SHELL: "no-shell",
    ANON_SHELL: "anon-shell",
    AUTH_SHELL: "auth-shell"
  };

  // ========================================================================
  //  ROUTE CLASSIFICATION — v24++
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

  // v24++: route → advantage tier
  const ADVANTAGE_ROUTE_TIERS = {
    critical: new Set(["dashboard", "session", "party", "play"]),
    high: new Set(["home", "main", "library"]),
    medium: new Set(["store", "public", "landing"]),
    low: new Set(["marketing", "moat"])
  };

  function classifyAdvantageTier(route) {
    const r = (route || "").toLowerCase();
    if (ADVANTAGE_ROUTE_TIERS.critical.has(r)) return "critical";
    if (ADVANTAGE_ROUTE_TIERS.high.has(r)) return "high";
    if (ADVANTAGE_ROUTE_TIERS.medium.has(r)) return "medium";
    return "low";
  }

  // ========================================================================
  //  determineShellState — pure, deterministic, v24++
  // ========================================================================
  function determineShellState({ routeName, hasIdentity }) {
    const route = (routeName || "").toLowerCase();

    if (HARD_NO_SHELL_ROUTES.has(route)) return SHELL_STATES.NO_SHELL;
    if (ANON_SHELL_ROUTES.has(route)) return SHELL_STATES.ANON_SHELL;
    if (hasIdentity) return SHELL_STATES.AUTH_SHELL;

    return SHELL_STATES.ANON_SHELL;
  }

  // ========================================================================
  //  guardPulseBand — v24++ trust boundary + continuance guard
  // ========================================================================
  function guardPulseBand(ctx) {
    const shellState = determineShellState(ctx);

    return {
      shellState,
      allowPulseBand:
        shellState === SHELL_STATES.ANON_SHELL ||
        shellState === SHELL_STATES.AUTH_SHELL,
      allowIdentity: shellState === SHELL_STATES.AUTH_SHELL,

      // v24++ metadata
      trustBoundary: BBBMeta.trustBoundary,
      continuanceGuard: BBBMeta.continuanceGuard,
      advantageTier: classifyAdvantageTier(ctx.routeName)
    };
  }

  // ========================================================================
  //  buildCacheHints — v24++ lane/prewarm intelligence
  // ========================================================================
  function buildCacheHints({ routeName }) {
    const route = (routeName || "").toLowerCase();

    const prewarm = PREFETCH_PRIORITY_ROUTES.has(route);
    const presenceCritical = PRESENCE_PRIORITY_ROUTES.has(route);

    return {
      route,
      prewarmChunks: prewarm,
      prewarmPresence: presenceCritical,
      suggestedBands: { symbolic: true, binary: true },

      // v24++ metadata
      advantageTier: classifyAdvantageTier(route),
      laneHints: {
        hot: prewarm,
        presence: presenceCritical
      }
    };
  }

  // ========================================================================
  //  buildPresenceDirectives — v24++ presence + mesh + expansion metadata
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
      enableMeshPresence,

      // v24++ metadata
      advantageTier: classifyAdvantageTier(route),
      expansionAware: true,
      meshAware: enableMeshPresence,
      presenceAware: enablePresenceField
    };
  }

  // ========================================================================
  //  PUBLIC BBB INTERFACE — v24++ IMMORTAL
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
