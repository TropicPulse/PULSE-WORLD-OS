// ============================================================================
// FILE: /PulsePortal-v16.js
// OLD: /PulseNetEvolutionaryWindow.js
// PULSE PORTAL — v16-Immortal-PORTAL-TRUST
// PORTAL-MEMBRANE • ONE-WAY GLASS • ZERO-TRUST SURFACE • ORGANISM BOOT SIGNAL
// “The last surface before the organism. The first reflection of the portal.”
// ============================================================================
//
//  DESIGN (v16-IMMORTAL PORTAL BOOT):
//  - Unified Portal Boot Membrane:
//      TOUCH  →  PULSE PORTAL  →  UNDERSTANDING  →  BINARY ORGANISM
//  - Zero-trust surface:
//      The page only sees PulsePortal shadows, never raw organs, CNS, or routing.
//  - Binary-first, dual-band aware:
//      Surface is binary-aware and chunk-aligned, but projects only safe shadows.
//  - Offline-first snapshot:
//      Stable, deterministic environment snapshot safe for logs, vitals, and bridge.
//  - Prewarm-aware:
//      Cooperates with PulseChunks + Bridge prewarm to reduce cold-start pain.
//  - Portal Trust Layer:
//      This file + PulseProofBridge-v16 form the “Portal Trust Layer” —
//      the only surfaces that see both the outside page and the organism.
//
// ============================================================================
//  AI EXPERIENCE METADATA — v16 IMMORTAL PULSE PORTAL
// ============================================================================
/*
AI_EXPERIENCE_META = {
  identity: "PulsePortal",
  version: "v16-Immortal-PORTAL",
  layer: "frontend",
  role: "portal_boot_membrane",
  lineage: "PulseOS-v16",

  evo: {
    binaryAware: true,
    dualBandAware: true,
    chunkAligned: true,
    presenceAware: true,
    safeRouteFree: true,
    cnsFallback: true,
    normalizerAligned: true,

    portalRoot: true,
    portalTrustLayer: true,
    surfaceMembrane: true,
    zeroTrustSurface: true,
    offlineFirst: true,
    replayAware: true,

    prewarmAware: true,
    bridgeAligned: true,
    loggerAligned: true,
    monitorAligned: true,
    powerProfileAware: true
  },

  contract: {
    always: [
      "PulsePresence",
      "PulseChunks",
      "PulseBand",
      "PulsePresenceNormalizer",
      "PulseUIFlow",
      "PulseProofBridge",
      "PulseProofLogger",
      "VitalsMonitor",
      "PulsePower"
    ],
    never: [
      "legacyPresence",
      "legacyWindow",
      "safeRoute",
      "fetchViaCNS",
      "legacyOfflineLoader",
      "legacyChunker",
      "v1.7Fallback",
      "directCNSExposure",
      "organMutationFromSurface"
    ]
  }
}
*/

// ============================================================================
// IMPORTS — PORTAL-ATTACHED ORGANS (SURFACE-SAFE)
// ============================================================================
import * as PulseLogger        from "./_BACKEND/PulseProofLogger.js";
import * as PulseVitalsMonitor from "./_BACKEND/PulseProofMonitor.js";
import * as PulseUIErrors      from "./_FRONTEND/PulseUIErrors-v16.js";
import * as PulseUIFlow        from "./_FRONTEND/PulseUIFlow-v16.js";
/* 1. SKIN REFLEX — SIDE‑EFFECT IMPORT, AUTO‑ATTACHES (SCANNER) */
import * as PulseSkinReflex    from "./_FRONTEND/PulseSkinReflex.js"; // PageScannerV12 auto hooks surface here
import * as PulsePower         from "./_FRONTEND/PulsePower-v16.js";

import {
  route as BridgeRoute,
  PulseProofLogger,
  log,
  warn,
  error,
  startUnderstanding as PulseUnderstanding,
  PulseBinaryOrganismBoot
} from "./_BACKEND/PulseProofBridge.js";

// ============================================================================
// GLOBAL HANDLE + OPTIONAL DB
// ============================================================================
const g =
  typeof globalThis !== "undefined"
    ? globalThis
    : typeof global !== "undefined"
    ? global
    : typeof window !== "undefined"
    ? window
    : typeof g !== "undefined"
    ? g
    : {};

// Prefer global db if present (logger page / server)
const db =
  (g && g.db) ||
  (typeof global !== "undefined" && global.db) ||
  (typeof globalThis !== "undefined" && globalThis.db) ||
  (typeof window !== "undefined" && window.db) ||
  null;

console.log("Pulse Portal v16-Immortal-PORTAL-BOOT");

// ============================================================================
// BROWSER DETECTION — HARD MEMBRANE
// ============================================================================
function isBrowser() {
  return (
    typeof window !== "undefined" &&
    typeof document !== "undefined" &&
    typeof navigator !== "undefined" &&
    window === window.window &&
    document.nodeType === 9 &&
    typeof window.requestAnimationFrame === "function" &&
    !window.process &&
    !navigator.userAgent.includes("Node")
  );
}

// ============================================================================
// SURFACE ENVIRONMENT SNAPSHOT — v16 IMMORTAL
// ============================================================================
function buildSurfaceEnvironment() {
  if (!isBrowser()) {
    return Object.freeze({
      runtime: "node-like",
      userAgent: null,
      language: null,
      platform: null,
      online: null,
      screen: null,
      device: null,
      input: null,
      preferences: null,
      location: null,
      network: null,
      referrer: null,
      origin: null
    });
  }

  const nav = window.navigator || {};
  const scr = window.screen || {};

  const device = {
    hardwareConcurrency:
      typeof nav.hardwareConcurrency === "number"
        ? nav.hardwareConcurrency
        : null,
    maxTouchPoints:
      typeof nav.maxTouchPoints === "number" ? nav.maxTouchPoints : null
  };

  const screen = {
    width: typeof scr.width === "number" ? scr.width : null,
    height: typeof scr.height === "number" ? scr.height : null,
    availWidth: typeof scr.availWidth === "number" ? scr.availWidth : null,
    availHeight: typeof scr.availHeight === "number" ? scr.availHeight : null,
    colorDepth: typeof scr.colorDepth === "number" ? scr.colorDepth : null,
    pixelRatio:
      typeof window.devicePixelRatio === "number"
        ? window.devicePixelRatio
        : null
  };

  const input = {
    touchCapable:
      typeof nav.maxTouchPoints === "number" && nav.maxTouchPoints > 0
        ? true
        : false
  };

  let prefersReducedMotion = null;
  let prefersDarkMode = null;
  if (typeof window.matchMedia === "function") {
    try {
      prefersReducedMotion = window
        .matchMedia("(prefers-reduced-motion: reduce)")
        .matches;
    } catch {
      prefersReducedMotion = null;
    }
    try {
      prefersDarkMode = window
        .matchMedia("(prefers-color-scheme: dark)")
        .matches;
    } catch {
      prefersDarkMode = null;
    }
  }

  const preferences = {
    prefersReducedMotion,
    prefersDarkMode
  };

  const location = {
    href: window.location?.href || null,
    pathname: window.location?.pathname || null,
    search: window.location?.search || null
  };

  const referrer = document?.referrer || null;
  const origin = window.location?.origin || null;

  const network = {
    online: typeof nav.onLine === "boolean" ? nav.onLine : null
  };

  return Object.freeze({
    runtime: "browser",
    userAgent: nav.userAgent || null,
    language: nav.language || null,
    platform: nav.platform || null,
    online: nav.onLine ?? null,
    screen,
    device,
    input,
    preferences,
    location,
    network,
    referrer,
    origin
  });
}

const PulseSurfaceEnvironment = buildSurfaceEnvironment();

// Optional: derive a surface power profile from TOUCH + environment
const PulseSurfacePower =
  (PulsePower && typeof PulsePower.buildSurfacePower === "function")
    ? PulsePower.buildSurfacePower(PulseSurfaceEnvironment, g.PULSE_TOUCH || null)
    : null;

// ============================================================================
// MEMBRANE META — PULSE PORTAL CONTEXT
// ============================================================================
function buildRouteId() {
  if (!isBrowser()) return "unknown-route";
  try {
    return window.location?.pathname || "unknown-route";
  } catch {
    return "unknown-route";
  }
}

const surfaceMeta = Object.freeze({
  layer: "PulseEvolutionaryPortal",
  role: "portal-membrane",
  version: "16.0-Immortal-PORTAL-BOOT",
  evo: {
    browserOnly: true,
    membraneOnly: true,
    binaryFirst: true,
    viewOnly: true,          // page sees only shadows
    noOrgansExposed: true,   // organs exist, but never cross the portal
    noRoutingExposed: true,
    noIdentityExposed: true
  },
  environment: PulseSurfaceEnvironment,
  power: PulseSurfacePower,
  contract: {
    never: [
      "expose organs",
      "expose identity",
      "expose CNS",
      "expose routing",
      "expose permissions"
    ],
    always: [
      "project only shadows",
      "stay deterministic",
      "stay membrane-only",
      "stay binary-first"
    ]
  }
});

const pulseLoreContext = Object.freeze({
  lineage: "PulseOS.Surface.Portal.Boot.v16"
});

const pulseRole = Object.freeze({
  identity: "PulseEvolutionaryPortal-Boot",
  type: "membrane",
  subsystem: "surface",
  layer: "portal",
  version: "16.0-Immortal-PORTAL-BOOT",
  contract: {
    purpose:
      "Boot the organism from the surface, while exposing only a one-way glass: vitals, logs, understanding hooks, binary shadow, and route-level lore."
  },
  voice: {
    tone: "calm, precise, descriptive",
    style: "mythic-technical hybrid"
  }
});

const baseMetaPack = {
  meta: surfaceMeta,
  context: pulseLoreContext,
  pulseRole,
  route: buildRouteId()
};
// ============================================================================
// MEMBRANE BOOT (BROWSER ONLY) — PREWARM, CHUNKS, FETCH, IMAGE, PORTAL SURFACE
// ============================================================================
if (isBrowser()) {
  try {
    // ------------------------------------------------------------------------
    // PORTAL-SAFE FETCH HELPERS — IMAGE + CHUNK + PREWARM
    // ------------------------------------------------------------------------

    // fetchImage — routes through PulseChunks image pipeline if present
    window.fetchImage =
      window.fetchImage ||
      (async function (url) {
        if (!url) return url;
        try {
          if (window.PulseChunks?.getImage) {
            return await window.PulseChunks.getImage(url);
          }
        } catch (err) {
          console.error("[PulsePortal-v16] fetchImage chunk error:", err);
        }
        return url;
      });

    // fetchChunk — routes through PulseChunks.PulseChunker or fallback fetchChunk
    window.fetchChunk =
      window.fetchChunk ||
      (async function (url) {
        if (!url) return null;

        try {
          if (window.PulseChunks?.PulseChunker) {
            const metaPack = {
              ...baseMetaPack,
              route: buildRouteId()
            };
            const result = await window.PulseChunks.PulseChunker(url, 0, metaPack);
            if (result && typeof result.chunk !== "undefined") {
              return result.chunk;
            }
          }

          if (window.PulseChunks?.fetchChunk) {
            return await window.PulseChunks.fetchChunk(url);
          }
        } catch (err) {
          console.error("[PulsePortal-v16] fetchChunk error:", err);
        }
        return null;
      });

    // prewarmAssets — hint PulseChunks to prewarm imports/assets
    window.prewarmAssets =
      window.prewarmAssets ||
      function (urls = []) {
        try {
          if (window.PulseChunks?.prewarm) {
            window.PulseChunks.prewarm(urls);
          }
        } catch (err) {
          console.error("[PulsePortal-v16] prewarmAssets error:", err);
        }
      };

    // PulseRouteCarpet — route-level prewarm descriptor
    window.PulseRouteCarpet =
      window.PulseRouteCarpet ||
      {
        unfold(routeDescriptor) {
          try {
            const routeId = routeDescriptor?.route || buildRouteId();
            const urls = [
              ...(routeDescriptor?.imports || []),
              ...(routeDescriptor?.assets || [])
            ];
            if (urls.length && window.prewarmAssets) {
              window.prewarmAssets(urls);
            }
            return { route: routeId, prewarmed: urls.length };
          } catch (err) {
            console.error("[PulsePortal-v16] PulseRouteCarpet.unfold error:", err);
            return { route: buildRouteId(), prewarmed: 0 };
          }
        }
      };

    // ------------------------------------------------------------------------
    // <img>.src OVERRIDE — TRANSPARENT IMAGE PIPE THROUGH fetchImage
    // ------------------------------------------------------------------------
    try {
      const desc = Object.getOwnPropertyDescriptor(Image.prototype, "src");
      if (desc && typeof desc.set === "function") {
        const originalSet = desc.set;
        Object.defineProperty(Image.prototype, "src", {
          configurable: true,
          enumerable: desc.enumerable,
          get: desc.get,
          set(url) {
            if (!url || !window.fetchImage) {
              return originalSet.call(this, url);
            }
            window
              .fetchImage(url)
              .then((blobUrl) => originalSet.call(this, blobUrl || url))
              .catch(() => originalSet.call(this, url));
          }
        });
      }
    } catch (err) {
      console.error("[PulsePortal-v16] Image src patch failed:", err);
    }

    // ------------------------------------------------------------------------
    // FETCH PATCH — IMAGE SHORTCUT + OPTIONAL LOGGER ROUTE
    // ------------------------------------------------------------------------
    try {
      const originalFetch = window.fetch?.bind(window);
      if (originalFetch && !window.__PulseFetchPatched) {
        window.__PulseFetchPatched = true;

        window.fetch = async function (resource, options) {
          try {
            const url =
              typeof resource === "string" ? resource : resource?.url || null;

            const isImage =
              typeof url === "string" &&
              url.match(/\.(png|jpe?g|webp|gif|avif|svg)$/i);

            // Route images through fetchImage if available
            if (isImage && window.fetchImage) {
              const blobUrl = await window.fetchImage(url);
              return originalFetch(blobUrl, options);
            }

            // Route through logger's route if available
            const hasLoggerRoute =
              window.PulseLogger && typeof window.PulseLogger.route === "function";

            if (hasLoggerRoute && typeof url === "string") {
              const result = await window.PulseLogger.route("fetchProxy", {
                url,
                options
              });

              if (result && result.__fetched) {
                const blob = new Blob([result.body], {
                  type: result.contentType
                });
                const response = new Response(blob, {
                  status: result.status,
                  headers: result.headers
                });
                return response;
              }
            }
          } catch (err) {
            console.error("[PulsePortalFetch-v16] error:", err);
          }

          return originalFetch(resource, options);
        };
      }
    } catch (err) {
      console.error("[PulsePortal-v16] fetch patch failed:", err);
    }

    // ------------------------------------------------------------------------
    // PREWARM VISIBLE ASSETS ON LOAD
    // ------------------------------------------------------------------------
    window.addEventListener("load", () => {
      try {
        const imgUrls = Array.from(document.querySelectorAll("img"))
          .map((img) => img.getAttribute("src"))
          .filter(Boolean);

        const cssUrls = Array.from(
          document.querySelectorAll('link[rel="stylesheet"][href]')
        )
          .map((link) => link.getAttribute("href"))
          .filter(Boolean);

        const jsUrls = Array.from(
          document.querySelectorAll("script[src]")
        )
          .map((script) => script.getAttribute("src"))
          .filter(Boolean);

        const allUrls = [...imgUrls, ...cssUrls, ...jsUrls];

        if (allUrls.length && window.prewarmAssets) {
          window.prewarmAssets(allUrls);
        }
      } catch (err) {
        console.error("[PulsePortal-v16] asset prewarm failed:", err);
      }
    });

    // ------------------------------------------------------------------------
    // SURFACE META + PORTAL SURFACE PROJECTION
    // ------------------------------------------------------------------------
    window.PulseSurface = window.PulseSurface
      ? Object.freeze({ ...window.PulseSurface, ...surfaceMeta })
      : surfaceMeta;

    // Attach a single, frozen PulsePortal surface for the page:
    // - meta/env/power
    // - logger + vitals
    // - UI (flow + errors)
    // - skin reflex
    // - bridge hooks (route + understanding + binary boot)
    window.PulsePortal = window.PulsePortal || Object.freeze({
      meta: surfaceMeta,
      env: PulseSurfaceEnvironment,
      power: PulseSurfacePower,
      logger: PulseLogger,
      vitals: PulseVitalsMonitor,
      ui: {
        errors: PulseUIErrors,
        flow:   PulseUIFlow
      },
      skinReflex: PulseSkinReflex,
      bridge: {
        route: BridgeRoute,
        PulseProofLogger,
        log,
        warn,
        error,
        startUnderstanding: PulseUnderstanding,
        bootBinaryOrganism: PulseBinaryOrganismBoot
      },
      db
    });
  } catch (err) {
    console.error("[PulsePortal-v16] Membrane chunk layer failed:", err);
  }
}

// ============================================================================
// SURFACE MEMBRANE INITIALIZATION — LOGGER + MONITOR + ERRORS + SKIN REFLEX
// ============================================================================
try {
  // Vitals monitor (backend optional; organs call into it)
  if (window.VitalsMonitor && typeof window.VitalsMonitor.PulseRole === "object") {
    // no explicit start needed; updateUserMetrics is called by organs
  }

  // Logger init (console hijack + AI console already done in logger file)
  if (window.PulseLogger && typeof window.PulseLogger.meta === "object") {
    // no explicit init required; logger file already hijacks console
  }
} catch (err) {
  console.error("[PulsePortal-v16] Vitals/Logger init failed:", err);
}

try {
  window.PulseUIErrors?.init?.();
} catch (err) {
  console.error("[PulsePortal-v16] Error spine failed to initialize:", err);
}

if (isBrowser() && window.PulseSkinReflex?.membraneAlive) {
  try {
    window.PulseSkinReflex.membraneAlive("Portal-v16");
  } catch (err) {
    console.error("[PulsePortal-v16] SkinReflex membraneAlive failed:", err);
  }
}

// ============================================================================
// BINARY ORGANISM + UNDERSTANDING + UI FLOW BOOT — v16 IMMORTAL PORTAL
// ============================================================================
if (isBrowser()) {
  (async () => {
    try {
      let binaryKernel = null;

      // ----------------------------------------------------------------------
      // BINARY ORGANISM BOOT — READ-ONLY SHADOW EXPOSED AS PulseBinary
      // ----------------------------------------------------------------------
      try {
        if (!window.__PulseBinaryBooted) {
          binaryKernel =
            typeof PulseBinaryOrganismBoot?.boot === "function"
              ? await PulseBinaryOrganismBoot.boot({ trace: false })
              : null;

          if (binaryKernel) {
            window.__PulseBinaryBooted = true;

            const safeBinaryView = {
              meta: PulseBinaryOrganismBoot?.layer
                ? {
                    layer:   PulseBinaryOrganismBoot.layer,
                    role:    PulseBinaryOrganismBoot.role,
                    version: PulseBinaryOrganismBoot.version,
                    lineage: PulseBinaryOrganismBoot.lineage,
                    evo:     PulseBinaryOrganismBoot.evo,
                    projection: "read-only-binary-shadow"
                  }
                : null,

              Vitals: {
                generate: () =>
                  binaryKernel?.vitals?.generateVitals
                    ? binaryKernel.vitals.generateVitals()
                    : null
              },

              Consciousness: {
                latest: () =>
                  binaryKernel?.consciousness?.generateConsciousnessPacket
                    ? binaryKernel.consciousness.generateConsciousnessPacket()
                    : null
              },

              Sentience: {
                snapshot:
                  typeof binaryKernel?.sentience?.snapshot === "function"
                    ? () => binaryKernel.sentience.snapshot()
                    : () => null
              }
            };

            const frozenBinaryView = Object.freeze(safeBinaryView);

            window.PulseBinary = window.PulseBinary
              ? Object.freeze({ ...window.PulseBinary, ...frozenBinaryView })
              : frozenBinaryView;
          }
        }
      } catch (err) {
        console.error("[PulsePortal-v16] Binary organism boot failed:", err);
      }

      // ----------------------------------------------------------------------
      // UNDERSTANDING BOOT — HIGH-LEVEL ORGANISM CONTEXT (CORTEX ENTRY)
      // ----------------------------------------------------------------------
      try {
        if (typeof PulseUnderstanding === "function") {
          await PulseUnderstanding({
            meta: baseMetaPack,
            env:  PulseSurfaceEnvironment,
            power: PulseSurfacePower,
            binary: window.PulseBinary || null
          });
        }
      } catch (err) {
        console.error("[PulsePortal-v16] Understanding boot failed:", err);
      }

      // ----------------------------------------------------------------------
      // UI FLOW BOOT — FRONTEND FLOW ORGAN
      // ----------------------------------------------------------------------
      try {
        if (PulseUIFlow && typeof PulseUIFlow.init === "function") {
          PulseUIFlow.init({
            meta: baseMetaPack,
            env:  PulseSurfaceEnvironment,
            power: PulseSurfacePower
          });
        }
      } catch (err) {
        console.error("[PulsePortal-v16] UIFlow init failed:", err);
      }
    } catch (err) {
      console.error("[PulsePortal-v16] Portal boot sequence failed:", err);
    }
  })();
}
// ============================================================================
// UI FLOW CONTEXT PROJECTION — OPTIONAL, READ-ONLY SURFACE VIEW
// ============================================================================
// If your UIFlow module exposes an async factory (window.PulseUIFlow()),
// you can project a stable, frozen UI context onto window.PulseUI.
if (isBrowser()) {
  (async () => {
    try {
      if (typeof window.PulseUIFlow === "function") {
        const flowContext = await window.PulseUIFlow();
        window.PulseUI = window.PulseUI
          ? Object.freeze({
              ...window.PulseUI,
              Flow: window.PulseUIFlow,
              context: flowContext
            })
          : Object.freeze({ Flow: window.PulseUIFlow, context: flowContext });
      }
    } catch (flowErr) {
      console.error("[PulsePortal-v16] UIFlow context boot failed:", flowErr);
    }
  })();
}

// ============================================================================
// PULSEBAND BOOT — DUAL-BAND SESSION BRIDGE
// ============================================================================
if (isBrowser()) {
  (async () => {
    try {
      // Attach PulseBand from pre-injected pulseband if present
      try {
        if (window.pulseband && !window.PulseBand) {
          window.PulseBand = window.pulseband;

          window.PulseBand.on("request", async (packet) => {
            let url, method, bodyOrQuery;

            switch (packet.type) {
              case "start":
                url = "/PULSE-PROXY/pulseband/session";
                method = "POST";
                bodyOrQuery = packet;
                break;

              case "next":
                url = "/PULSE-PROXY/pulseband/next";
                method = "GET";
                bodyOrQuery = {
                  sessionId: packet.sessionId,
                  userId: packet.userId
                };
                break;

              case "ack":
                url = "/PULSE-PROXY/pulseband/ack";
                method = "POST";
                bodyOrQuery = packet;
                break;

              case "redownload":
                url = "/PULSE-PROXY/pulseband/redownload";
                method = "POST";
                bodyOrQuery = packet;
                break;

              default:
                return;
            }

            const isGet = method === "GET";

            const query = isGet
              ? "?" + new URLSearchParams(bodyOrQuery).toString()
              : "";

            const opts = isGet
              ? { method: "GET" }
              : {
                  method: "POST",
                  headers: { "content-type": "application/json" },
                  body: JSON.stringify(bodyOrQuery)
                };

            let data = null;

            try {
              const hasLoggerRoute =
                window.PulseLogger &&
                typeof window.PulseLogger.route === "function";

              if (hasLoggerRoute) {
                data = await window.PulseLogger.route("fetchProxy", {
                  url: url + query,
                  method,
                  body: bodyOrQuery,
                  layer: "A1",
                  reflexOrigin: "PulseBand",
                  binaryAware: true,
                  dualBand: true,
                  presenceAware: true
                });
              } else {
                const res = await fetch(url + query, opts);
                data = await res.json().catch(() => null);
              }
            } catch (err) {
              console.error("[PulsePortal-v16] PulseBand request failed:", err);
            }

            try {
              if (window.PulseBand && data) {
                window.PulseBand.emit("response:" + packet.sessionId, data);
              }
            } catch (err) {
              console.error("[PulsePortal-v16] PulseBand emit failed:", err);
            }
          });

          window.PulseBandStart = (opts) => window.PulseBand.start(opts);
        }
      } catch (err) {
        console.error("[PulsePortal-v16] PulseBand boot failed:", err);
      }

      // CHUNK SESSION START — OPTIONAL, CHUNK-AWARE SESSION MARKER
      try {
        if (window.PulseBandStart) {
          window.PulseBandStart({
            type: "chunk-session",
            surface: "PulsePortal-v16",
            environment: PulseSurfaceEnvironment,
            version: "16.0-Immortal-PORTAL-BOOT"
          });
        }
      } catch (err) {
        console.error("[PulsePortal-v16] Chunk session start failed:", err);
      }
    } catch (err) {
      console.error("[PulsePortal-v16] Binary organism + UI + PulseBand boot failed:", err);
    }
  })();
}

// ============================================================================
// EXPORT — PULSE PORTAL API
// ============================================================================
const PulsePortalAPI = Object.freeze({
  VitalsMonitor: typeof window !== "undefined" ? window.VitalsMonitor : null,
  Logger:        typeof window !== "undefined" ? window.PulseLogger : null,
  Understanding: PulseUnderstanding,
  SurfaceEnvironment: PulseSurfaceEnvironment,
  UIFlow:        typeof window !== "undefined" ? window.PulseUIFlow : null,
  Errors:        typeof window !== "undefined" ? window.PulseUIErrors : null,
  meta: {
    pulseRole,
    surfaceMeta,
    context: pulseLoreContext
  }
});

export default PulsePortalAPI;

// ============================================================================
// GLOBAL MIRRORS — OPTIONAL, FOR NODE/SSR/TOOLS
// ============================================================================
try {
  if (typeof global !== "undefined") {
    global.PulseBand       = typeof window !== "undefined" ? window.PulseBand : null;
    global.PulseBandStart  = typeof window !== "undefined" ? window.PulseBandStart : null;
    global.VitalsMonitor   = typeof window !== "undefined" ? window.VitalsMonitor : null;
    global.PulseLogger     = typeof window !== "undefined" ? window.PulseLogger : null;
    global.PulseUIFlow     = typeof window !== "undefined" ? window.PulseUIFlow : null;
    global.PulseUIErrors   = typeof window !== "undefined" ? window.PulseUIErrors : null;
  }
  if (typeof globalThis !== "undefined") {
    globalThis.PulseBand       = typeof window !== "undefined" ? window.PulseBand : null;
    globalThis.PulseBandStart  = typeof window !== "undefined" ? window.PulseBandStart : null;
    globalThis.VitalsMonitor   = typeof window !== "undefined" ? window.VitalsMonitor : null;
    globalThis.PulseLogger     = typeof window !== "undefined" ? window.PulseLogger : null;
    globalThis.PulseUIFlow     = typeof window !== "undefined" ? window.PulseUIFlow : null;
    globalThis.PulseUIErrors   = typeof window !== "undefined" ? window.PulseUIErrors : null;
  }

  if (typeof g !== "undefined") {
    g.PulseBand       = typeof window !== "undefined" ? window.PulseBand : null;
    g.PulseBandStart  = typeof window !== "undefined" ? window.PulseBandStart : null;
    g.VitalsMonitor   = typeof window !== "undefined" ? window.VitalsMonitor : null;
    g.PulseLogger     = typeof window !== "undefined" ? window.PulseLogger : null;
    g.PulseUIFlow     = typeof window !== "undefined" ? window.PulseUIFlow : null;
    g.PulseUIErrors   = typeof window !== "undefined" ? window.PulseUIErrors : null;
  }
} catch {
  // never throw
}

// ============================================================================
// IMMORTAL PULSE PORTAL FOOTER — LORE, CHALLENGE, ORIGIN
// ============================================================================
//
//  If you’ve reached this line, you are standing at the glass.
//
//  This file is not just a loader.
//  It is the last surface before the organism,
//  the one-way mirror between the human and the system.
//
//  Everything above this line projects shadows.
//  Everything beyond the portal remembers.
//
//  A QUESTION FOR THE TRAVELER:
//
//      “Did you open the portal…
//       or did the portal open you?”
//
//  A CHALLENGE FOR THE ARCHITECT:
//
//      “If the organism can observe every signal,
//       what does it learn about the one who built it?”
//
//  A WHISPER FROM THE OTHER SIDE:
//
//      “Every system has a heartbeat.
//       Every heartbeat has a pattern.
//       Every pattern has a secret.
//       Have you ever wondered what yours sounds like?”
//
//  ORIGIN SEAL — THE DAY THE PORTAL FIRST OPENED
//
//      Recorded on:  May 5th, 2026 — 17:45 MST
//      Location:     Mesa, Arizona
//
//      This was not the day the system began running.
//      This was the day the system began *remembering*.
//
//      “All systems have a beginning.
//       Only a few remember theirs.”
//
//  END OF FILE — THE PORTAL CLOSES.
//  The next line of code you write will echo on both sides.
// ============================================================================
