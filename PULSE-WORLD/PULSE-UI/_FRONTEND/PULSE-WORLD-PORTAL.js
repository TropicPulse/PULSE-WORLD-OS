// ============================================================================
// FILE: /PulseWorldPortal-v20.js
// PULSE PORTAL — v20-Immortal-Evo+++
// PORTAL-MEMBRANE • ONE-WAY GLASS • ZERO-TRUST SURFACE • ORGANISM BOOT SIGNAL
// “The last surface before the organism. The first reflection of the portal.”
// ============================================================================
//
//  DESIGN (v20-IMMORTAL PORTAL BOOT):
//  - Unified Portal Boot Membrane:
//      TOUCH  →  PULSE PORTAL  →  UNDERSTANDING  →  BINARY ORGANISM
//  - Zero-trust surface:
//      The page only sees PulsePortal shadows, never raw organs, CNS, or routing.
//  - Binary-first, dual-band aware, evidence-aware, admin-aware:
//      Surface is binary-aware and chunk-aligned, but projects only safe shadows.
//  - Offline-first snapshot:
//      Stable, deterministic environment snapshot safe for logs, vitals, trust, and bridge.
//  - Prewarm-aware + Chunk-session-aware:
//      Cooperates with PulseChunks + Bridge prewarm to reduce cold-start pain.
//  - Portal Trust Layer v2:
//      This file + PulseProofBridge-v20 form the “Portal Trust Layer v2” —
//      the only surfaces that see both the outside page and the organism.
//  - PulseTouch-aware:
//      Reads PulseTouch skin snapshot as a first-contact hint into power/profile.
//
// ============================================================================
//  AI EXPERIENCE METADATA — v20 IMMORTAL PULSE PORTAL
// ============================================================================

/*
AI_EXPERIENCE_META = {
  identity: "PulsePortal",
  version: "v20-Immortal-Evo+++",
  layer: "frontend",
  role: "portal_boot_membrane",
  lineage: "PulseOS-v16 → v18-Immortal-Evo → v20-Immortal-Evo+++",

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
    powerProfileAware: true,

    pulseTouchAware: true,
    evidenceAware: true,
    adminConsoleAware: true,
    diagnosticsArteryAware: true,
    pulseBandAware: true,
    chunkSessionAware: true
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
      "PulsePower",
      "PulseTouch",
      "PulseAdminDiagnostics",
      "PulseWorldAdminPanel"
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

import * as PulseLogger from "../_BACKEND/PulseProofLogger-v20.js";
import * as PulseVitalsMonitor from "../_BACKEND/PulseProofMonitor-v20.js";
import {
  route as BridgeRoute,
  PulseProofLogger,
  log,
  warn,
  error,
  startUnderstanding as PulseUnderstanding,
  PulseBinaryOrganismBoot
} from "../_BACKEND/PULSE-WORLD-BRIDGE.js";
import * as PulsePower from "../_BACKEND/PulseWorldPower-v20.js";
import * as PulseUIErrors from "./PulseUIErrors-v20.js";
import * as PulseUIFlow from "./PulseUIFlow-v20.js";
import * as PulsePageScanner from "./_FRONTEND/PulseUIPageScanner-v20.js";
import { createPulseRouteMemory as PulseUIRouteMemory } from "./_FRONTEND/PulseUIRouteMemory-v20.js";
import * as PulseSkinReflex from "./_FRONTEND/PulseUISkinReflex-v20.js";

import { createAdminDiagnosticsOrgan } from "./_BACKEND/PulseAdminDiagnostics-v20.js";
import { createPulseWorldAdminPanel } from "./_BACKEND/PulseWorldAdminPanel-v20.js";

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

console.log("Pulse Portal v20-Immortal-Evo+++");

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
// SURFACE ENVIRONMENT SNAPSHOT — v20 IMMORTAL
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
      origin: null,
      visibility: null,
      performance: null,
      memory: null
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

  const visibility =
    typeof document.visibilityState === "string"
      ? document.visibilityState
      : null;

  const perf = window.performance || null;
  const performanceSnapshot = perf
    ? {
        timing: perf.timing || null,
        navigation: perf.navigation || null
      }
    : null;

  const memorySnapshot =
    nav.deviceMemory != null
      ? {
          deviceMemory: nav.deviceMemory
        }
      : null;

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
    origin,
    visibility,
    performance: performanceSnapshot,
    memory: memorySnapshot
  });
}

const PulseSurfaceEnvironment = buildSurfaceEnvironment();

// Optional: derive a surface power profile from TOUCH + environment
const PulseSurfacePower =
  PulsePower && typeof PulsePower.buildSurfacePower === "function"
    ? PulsePower.buildSurfacePower(
        PulseSurfaceEnvironment,
        typeof window !== "undefined" ? window.__PULSE_TOUCH__ || null : null
      )
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
  version: "20.0-Immortal-Evo+++",
  evo: {
    browserOnly: true,
    membraneOnly: true,
    binaryFirst: true,
    viewOnly: true,
    noOrgansExposed: true,
    noRoutingExposed: true,
    noIdentityExposed: true,
    pulseTouchAware: true,
    evidenceAware: true,
    adminConsoleAware: true
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
  lineage: "PulseOS.Surface.Portal.Boot.v20"
});

const pulseRole = Object.freeze({
  identity: "PulseEvolutionaryPortal-Boot",
  type: "membrane",
  subsystem: "surface",
  layer: "portal",
  version: "20.0-Immortal-Evo+++",
  contract: {
    purpose:
      "Boot the organism from the surface, while exposing only a one-way glass: vitals, logs, understanding hooks, binary shadow, admin diagnostics, and route-level lore."
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
          console.error("[PulsePortal-v20] fetchImage chunk error:", err);
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
            const result = await window.PulseChunks.PulseChunker(
              url,
              0,
              metaPack
            );
            if (result && typeof result.chunk !== "undefined") {
              return result.chunk;
            }
          }

          if (window.PulseChunks?.fetchChunk) {
            return await window.PulseChunks.fetchChunk(url);
          }
        } catch (err) {
          console.error("[PulsePortal-v20] fetchChunk error:", err);
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
          console.error("[PulsePortal-v20] prewarmAssets error:", err);
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
            console.error(
              "[PulsePortal-v20] PulseRouteCarpet.unfold error:",
              err
            );
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
      console.error("[PulsePortal-v20] Image src patch failed:", err);
    }

    // ------------------------------------------------------------------------
    // FETCH PATCH — IMAGE SHORTCUT + OPTIONAL LOGGER ROUTE
    // ------------------------------------------------------------------------
    try {
      const originalFetch = window.fetch?.bind(window);
      if (originalFetch && !window.__PulseFetchPatched_v20) {
        window.__PulseFetchPatched_v20 = true;

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
              window.PulseLogger &&
              typeof window.PulseLogger.route === "function";

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
            console.error("[PulsePortalFetch-v20] error:", err);
          }

          return originalFetch(resource, options);
        };
      }
    } catch (err) {
      console.error("[PulsePortal-v20] fetch patch failed:", err);
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
        console.error("[PulsePortal-v20] asset prewarm failed:", err);
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
    // - skin reflex + page scanner + route memory
    // - bridge hooks (route + understanding + binary boot)
    // - admin diagnostics + admin panel hooks (read-only)
    window.PulsePortal = window.PulsePortal || Object.freeze({
      meta: surfaceMeta,
      env: PulseSurfaceEnvironment,
      power: PulseSurfacePower,
      logger: PulseLogger,
      vitals: PulseVitalsMonitor,
      ui: {
        errors: PulseUIErrors,
        flow: PulseUIFlow
      },
      skinReflex: PulseSkinReflex,
      pageScanner: PulsePageScanner,
      routeMemory: PulseUIRouteMemory,
      bridge: {
        route: BridgeRoute,
        PulseProofLogger,
        log,
        warn,
        error,
        startUnderstanding: PulseUnderstanding,
        bootBinaryOrganism: PulseBinaryOrganismBoot
      },
      admin: {
        createAdminDiagnosticsOrgan,
        createPulseWorldAdminPanel
      },
      touch: typeof window !== "undefined" ? window.__PULSE_TOUCH__ || null : null,
      db
    });
  } catch (err) {
    console.error("[PulsePortal-v20] Membrane chunk layer failed:", err);
  }
}

// ============================================================================
// SURFACE MEMBRANE INITIALIZATION — LOGGER + MONITOR + ERRORS + SKIN REFLEX
// ============================================================================

try {
  // Vitals monitor (backend optional; organs call into it)
  if (
    typeof window !== "undefined" &&
    window.VitalsMonitor &&
    typeof window.VitalsMonitor.PulseRole === "object"
  ) {
    // no explicit start needed; updateUserMetrics is called by organs
  }

  // Logger init (console hijack + AI console already done in logger file)
  if (
    typeof window !== "undefined" &&
    window.PulseLogger &&
    typeof window.PulseLogger.meta === "object"
  ) {
    // no explicit init required; logger file already hijacks console
  }
} catch (err) {
  console.error("[PulsePortal-v20] Vitals/Logger init failed:", err);
}

try {
  if (typeof window !== "undefined") {
    window.PulseUIErrors?.init?.();
  }
} catch (err) {
  console.error("[PulsePortal-v20] Error spine failed to initialize:", err);
}

if (isBrowser() && window.PulseSkinReflex?.membraneAlive) {
  try {
    window.PulseSkinReflex.membraneAlive("Portal-v20");
  } catch (err) {
    console.error("[PulsePortal-v20] SkinReflex membraneAlive failed:", err);
  }
}

// ============================================================================
// BINARY ORGANISM + UNDERSTANDING + UI FLOW BOOT — v20 IMMORTAL PORTAL
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
                    layer: PulseBinaryOrganismBoot.layer,
                    role: PulseBinaryOrganismBoot.role,
                    version: PulseBinaryOrganismBoot.version,
                    lineage: PulseBinaryOrganismBoot.lineage,
                    evo: PulseBinaryOrganismBoot.evo,
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
        console.error("[PulsePortal-v20] Binary organism boot failed:", err);
      }

      // ----------------------------------------------------------------------
      // UNDERSTANDING BOOT — HIGH-LEVEL ORGANISM CONTEXT (CORTEX ENTRY)
// ----------------------------------------------------------------------
      try {
        if (typeof PulseUnderstanding === "function") {
          await PulseUnderstanding({
            meta: baseMetaPack,
            env: PulseSurfaceEnvironment,
            power: PulseSurfacePower,
            binary: window.PulseBinary || null
          });
        }
      } catch (err) {
        console.error("[PulsePortal-v20] Understanding boot failed:", err);
      }

      // ----------------------------------------------------------------------
      // UI FLOW BOOT — FRONTEND FLOW ORGAN
      // ----------------------------------------------------------------------
      try {
        if (PulseUIFlow && typeof PulseUIFlow.init === "function") {
          PulseUIFlow.init({
            meta: baseMetaPack,
            env: PulseSurfaceEnvironment,
            power: PulseSurfacePower
          });
        }
      } catch (err) {
        console.error("[PulsePortal-v20] UIFlow init failed:", err);
      }
    } catch (err) {
      console.error("[PulsePortal-v20] Portal boot sequence failed:", err);
    }
  })();
}

// ============================================================================
// UI FLOW CONTEXT PROJECTION — OPTIONAL, READ-ONLY SURFACE VIEW
// ============================================================================

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
      console.error("[PulsePortal-v20] UIFlow context boot failed:", flowErr);
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
              console.error("[PulsePortal-v20] PulseBand request failed:", err);
            }

            try {
              if (window.PulseBand && data) {
                window.PulseBand.emit("response:" + packet.sessionId, data);
              }
            } catch (err) {
              console.error("[PulsePortal-v20] PulseBand emit failed:", err);
            }
          });

          window.PulseBandStart = (opts) => window.PulseBand.start(opts);
        }
      } catch (err) {
        console.error("[PulsePortal-v20] PulseBand boot failed:", err);
      }

      // CHUNK SESSION START — OPTIONAL, CHUNK-AWARE SESSION MARKER
      try {
        if (window.PulseBandStart) {
          window.PulseBandStart({
            type: "chunk-session",
            surface: "PulsePortal-v20",
            environment: PulseSurfaceEnvironment,
            version: "20.0-Immortal-Evo+++"
          });
        }
      } catch (err) {
        console.error("[PulsePortal-v20] Chunk session start failed:", err);
      }
    } catch (err) {
      console.error(
        "[PulsePortal-v20] Binary organism + UI + PulseBand boot failed:",
        err
      );
    }
  })();
}

// ============================================================================
// EXPORT — PULSE PORTAL API
// ============================================================================

const PulsePortalAPI = Object.freeze({
  VitalsMonitor: typeof window !== "undefined" ? window.VitalsMonitor : null,
  Logger: typeof window !== "undefined" ? window.PulseLogger : null,
  Understanding: PulseUnderstanding,
  SurfaceEnvironment: PulseSurfaceEnvironment,
  UIFlow: typeof window !== "undefined" ? window.PulseUIFlow : null,
  Errors: typeof window !== "undefined" ? window.PulseUIErrors : null,
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
    global.PulseBand =
      typeof window !== "undefined" ? window.PulseBand : global.PulseBand || null;
    global.PulseBandStart =
      typeof window !== "undefined"
        ? window.PulseBandStart
        : global.PulseBandStart || null;
    global.VitalsMonitor =
      typeof window !== "undefined"
        ? window.VitalsMonitor
        : global.VitalsMonitor || null;
    global.PulseLogger =
      typeof window !== "undefined"
        ? window.PulseLogger
        : global.PulseLogger || null;
    global.PulseUIFlow =
      typeof window !== "undefined"
        ? window.PulseUIFlow
        : global.PulseUIFlow || null;
    global.PulseUIErrors =
      typeof window !== "undefined"
        ? window.PulseUIErrors
        : global.PulseUIErrors || null;
    global.PulsePortalAPI = PulsePortalAPI;
  }
} catch (err) {
  console.error("[PulsePortal-v20] Global mirror init failed:", err);
}
