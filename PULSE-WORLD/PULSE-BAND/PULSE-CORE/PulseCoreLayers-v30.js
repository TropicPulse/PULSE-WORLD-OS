// ============================================================================
//  PulseCoreLayers-v30.js — v30-IMMORTAL-LAYERS
//  ORGANISM‑WIDE MEMORY LAYER ORGAN (MAP‑STRIPPED, PURE)
//  “RAM IS FAST. DISK IS PERSISTENT. GPU IS OPTIONAL. NOTHING ELSE.”
// ============================================================================

// ============================================================================
//  MEMORY LAYER DEFINITIONS — v30 (identity-light, no meta)
// ============================================================================
export const PulseCoreLayers = {
  RAM: {
    id: "ram",
    speed: "fastest",
    volatility: "volatile"
  },

  DISK_PRIMARY: {
    id: "disk-primary",
    speed: "medium",
    volatility: "persistent"
  },

  DISK_SECONDARY: {
    id: "disk-secondary",
    speed: "medium",
    volatility: "persistent"
  },

  GPU: {
    id: "gpu",
    speed: "fast",
    volatility: "volatile"
  },

  PROXY: {
    id: "proxy",
    speed: "fast",
    volatility: "transient"
  }
};

// ============================================================================
//  LAYER DECISION ENGINE — v30 (NO MAP, NO RULES, NO HINTS)
//  Always returns a minimal placement object.
// ============================================================================
export const PulseCoreLayerRules = {
  decidePlacement(dataType, dnaTag, routeId) {
    return {
      primary: "disk-primary",
      secondary: "disk-secondary",
      ram: "ram",
      gpu: "gpu",
      proxy: "proxy",
      routeId: routeId || "global"
    };
  },

  shouldPromote() {
    return false;
  },

  shouldDemote() {
    return false;
  },

  shouldFlush() {
    return false;
  }
};

// ============================================================================
//  PUBLIC EXPORT — v30 (META‑STRIPPED, IDENTITY‑LIGHT)
// ============================================================================
export const PulseCoreLayersOrgan = {
  PulseCoreLayers,
  PulseCoreLayerRules
};
