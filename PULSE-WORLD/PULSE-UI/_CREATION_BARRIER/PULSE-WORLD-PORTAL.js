//============================================================================
// FILE: /PulseWorldPortal-v24.js
// PULSE PORTAL — v24-Immortal-Evo+++
// PORTAL-MEMBRANE • ONE-WAY GLASS • ZERO-TRUST SURFACE • ORGANISM BOOT SIGNAL
// “The last surface before the organism. The first reflection of the portal.”
// ============================================================================
//
//  DESIGN (v24-IMMORTAL PORTAL BOOT):
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
//      This file + PulseProofBridge-v24 form the “Portal Trust Layer v2” —
//      the only surfaces that see both the outside page and the organism.
//  - PulseTouch-aware:
//      Reads PulseTouch skin snapshot as a first-contact hint into power/profile.
//
// ============================================================================
//  AI EXPERIENCE METADATA — v24 IMMORTAL PULSE PORTAL
// ============================================================================

// ============================================================================
// IMPORTS — PORTAL-ATTACHED ORGANS (SURFACE-SAFE)
// ============================================================================
import {
  route as BridgeRoute,
  PulseProofBridgeLogger as PulseProofLogger,
  PulseProofBridgeLogger as PulseProofMonitor,
  BridgeLog as log,
  BridgeWarn as warn,
  BridgeError as error,
  startUnderstanding as PulseUnderstanding,
  PulseBinaryOrganismBoot,
  PulseProofBridgeMonitor
} from "../_BACKEND/PULSE-WORLD-BRIDGE.js";

import { createPulseSkinReflex } from "../_MONITOR/PulseUISkinReflex-v24.js";
import PulseVitalsLogger from "../_MONITOR/PulseProofLogger-v24.js";

import PulseUIErrors from "../_MONITOR/PulseUIErrors-v24.js";
import PulseUIFlow from "../_MONITOR/PulseUIFlow-v24.js";
import PulsePageScanner from "../_MONITOR/PulseUIPageScanner-v24.js";
import { createPulseRouteMemory as PulseUIRouteMemory } from "../_MONITOR/PulseUIRouteMemory-v24.js";

import { createAdminDiagnosticsOrgan } from "../_COMPONENTS_EVOLUTION/PulseAIAdminPanel-v20.js";
import { createPulseWorldAdminPanel } from "../_COMPONENTS_EVOLUTION/PulseWorldAdminPanel-v20.js";

// ============================================================
//  CREATE SKINREFLEX INSTANCE + EXPORT A1 API TO WINDOW
// ============================================================
const PulseSkinReflex = null;
try {
  PulseSkinReflex = createPulseSkinReflex();

  console.log("[PORTAL] SkinReflex instance:", PulseSkinReflex);

  window.getHook    = PulseSkinReflex.getHook;
  window.getAuth    = PulseSkinReflex.getAuth;
  window.getMap     = PulseSkinReflex.getMap;
  window.callHelper = PulseSkinReflex.callHelper;

  console.log("[PORTAL] getHook type:", typeof window.getHook);
} catch (err) {
  console.error("[PORTAL] SkinReflex Error:", err);
}

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

console.log("Pulse Portal v24-Immortal-Evo+++");

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
// SURFACE ENVIRONMENT SNAPSHOT — v24 IMMORTAL (STRUCTURED-CLONE SAFE)
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

  // 🔥 v24: structured-clone-safe performance snapshot (NO PerformanceTiming objects)
  const perf = window.performance || null;
  const performanceSnapshot = perf
    ? {
        timeOrigin:
          typeof perf.timeOrigin === "number" ? perf.timeOrigin : null,
        now:
          typeof perf.now === "function"
            ? (() => {
                try {
                  return perf.now();
                } catch {
                  return null;
                }
              })()
            : null
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
  version: "24.0-Immortal-Evo+++",
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
  lineage: "PulseOS.Surface.Portal.Boot.v24"
});

const pulseRole = Object.freeze({
  identity: "PulseEvolutionaryPortal-Boot",
  type: "membrane",
  subsystem: "surface",
  layer: "portal",
  version: "24.0-Immortal-Evo+++",
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
    // PORTAL-SAFE CLONE HELPERS — STRIP NON-CLONEABLE FIELDS (kept as in your v24 draft)
    function portalSafeHeaders(headers) {
      try {
        if (!headers) return undefined;
        const out = {};
        if (headers instanceof Headers) {
          headers.forEach((v, k) => {
            out[k] = v;
          });
          return out;
        }
        if (typeof headers === "object") {
          return { ...headers };
        }
      } catch (_) {}
      return undefined;
    }

    function portalSafeFetchOptions(options) {
      if (!options || typeof options !== "object") return undefined;

      const safe = {};

      if (options.method) safe.method = String(options.method);
      const hdrs = portalSafeHeaders(options.headers);
      if (hdrs) safe.headers = hdrs;

      if (options.mode) safe.mode = String(options.mode);
      if (options.cache) safe.cache = String(options.cache);
      if (options.redirect) safe.redirect = String(options.redirect);
      if (options.referrer) safe.referrer = String(options.referrer);
      if (options.referrerPolicy)
        safe.referrerPolicy = String(options.referrerPolicy);
      if (options.credentials)
        safe.credentials = String(options.credentials);

      // DO NOT pass:
      // - signal (AbortSignal)
      // - window / document
      // - body streams
      // - functions
      // - DOM objects
      // - PerformanceTiming, PerformanceNavigation, etc.

      return safe;
    }

    // ------------------------------------------------------------------------
    // PORTAL-SAFE FETCH HELPERS — IMAGE + CHUNK + PREWARM
    // ------------------------------------------------------------------------

    window.fetchImage =
      window.fetchImage ||
      (async function (url) {
        if (!url) return url;
        try {
          if (window.PulseChunks?.getImage) {
            return await window.PulseChunks.getImage(url);
          }
        } catch (err) {
          console.error("[PulsePortal-v24] fetchImage chunk error:", err);
        }
        return url;
      });

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
          console.error("[PulsePortal-v24] fetchChunk error:", err);
        }
        return null;
      });

    window.prewarmAssets =
      window.prewarmAssets ||
      function (urls = []) {
        try {
          if (window.PulseChunks?.prewarm) {
            window.PulseChunks.prewarm(urls);
          }
        } catch (err) {
          console.error("[PulsePortal-v24] prewarmAssets error:", err);
        }
      };

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
              "[PulsePortal-v24] PulseRouteCarpet.unfold error:",
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
      console.error("[PulsePortal-v24] Image src patch failed:", err);
    }

    // ------------------------------------------------------------------------
    // FETCH PATCH — IMAGE SHORTCUT + OPTIONAL LOGGER ROUTE (PORTAL-SAFE)
    // ------------------------------------------------------------------------
    try {
      const originalFetch = window.fetch?.bind(window);
      if (originalFetch && !window.__PulseFetchPatched_v24) {
        window.__PulseFetchPatched_v24 = true;

        window.fetch = async function (resource, options) {
          try {
            const url =
              typeof resource === "string" ? resource : resource?.url || null;

            const isImage =
              typeof url === "string" &&
              url.match(/\.(png|jpe?g|webp|gif|avif|svg)$/i);

            if (isImage && window.fetchImage) {
              const blobUrl = await window.fetchImage(url);
              return originalFetch(blobUrl, options);
            }

            const hasLoggerRoute =
              window.PulseLogger &&
              typeof window.PulseLogger.route === "function";

            if (hasLoggerRoute && typeof url === "string") {
              const safeOptions = portalSafeFetchOptions(options);
              const result = await window.PulseLogger.route("fetchProxy", {
                url,
                options: safeOptions
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
            console.error("[PulsePortalFetch-v24] error:", err);
          }

          return originalFetch(resource, options);
        };
      }
    } catch (err) {
      console.error("[PulsePortal-v24] fetch patch failed:", err);
    }

    // ------------------------------------------------------------------------
    // PULSEBAND REQUEST HANDLER (existing)
    // ------------------------------------------------------------------------
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
          console.error("[PulsePortal-v24] PulseBand request failed:", err);
        }

        try {
          if (window.PulseBand && data) {
            window.PulseBand.emit("response:" + packet.sessionId, data);
          }
        } catch (err) {
          console.error("[PulsePortal-v24] PulseBand emit failed:", err);
        }
      });

      window.PulseBandStart = (opts) => window.PulseBand.start(opts);
    }

    // ------------------------------------------------------------------------
    // ⭐ NEW: PULSENET_INGRESS + PULSENET_FASTLANE LISTENERS
    // ------------------------------------------------------------------------

    if (window.PulsePortalBridge && typeof window.PulsePortalBridge.on === "function") {
      window.PulsePortalBridge.on("PULSENET_INGRESS", async (payload) => {
        try {
          await fetch("/PULSE-PROXY/pulsenet/ingress", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(payload)
          });
        } catch (err) {
          console.error("[PulsePortal-v24] PULSENET_INGRESS failed:", err);
        }
      });

      window.PulsePortalBridge.on("PULSENET_FASTLANE", async (payload) => {
        try {
          await fetch("/PULSE-PROXY/pulsenet/fastlane", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(payload)
          });
        } catch (err) {
          console.error("[PulsePortal-v24] PULSENET_FASTLANE failed:", err);
        }
      });
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
        console.error("[PulsePortal-v24] asset prewarm failed:", err);
      }
    });

    // ------------------------------------------------------------------------
    // SURFACE META + PORTAL SURFACE PROJECTION
    // ------------------------------------------------------------------------
    window.PulseSurface = window.PulseSurface
      ? Object.freeze({ ...window.PulseSurface, ...surfaceMeta })
      : surfaceMeta;

    window.PulsePortal =
      window.PulsePortal ||
      Object.freeze({
        meta: surfaceMeta,
        env: PulseSurfaceEnvironment,
        logger: PulseProofLogger,
        vitals: PulseProofMonitor,
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
        touch:
          typeof window !== "undefined"
            ? window.__PULSE_TOUCH__ || null
            : null,
        db
      });
  } catch (err) {
    console.error("[PulsePortal-v24] Membrane chunk layer failed:", err);
  }
}


// ============================================================================
// SURFACE MEMBRANE INITIALIZATION — LOGGER + MONITOR + ERRORS + SKIN REFLEX
// ============================================================================

try {
  if (
    typeof window !== "undefined" &&
    window.VitalsMonitor &&
    typeof window.VitalsMonitor.PulseRole === "object"
  ) {
    // no explicit start needed; updateUserMetrics is called by organs
  }

  if (
    typeof window !== "undefined" &&
    window.PulseLogger &&
    typeof window.PulseLogger.meta === "object"
  ) {
    // no explicit init required; logger file already hijacks console
  }
} catch (err) {
  console.error("[PulsePortal-v24] Vitals/Logger init failed:", err);
}

try {
  if (typeof window !== "undefined") {
    window.PulseUIErrors?.init?.();
  }
} catch (err) {
  console.error("[PulsePortal-v24] Error spine failed to initialize:", err);
}

if (isBrowser() && window.PulseSkinReflex?.membraneAlive) {
  try {
    window.PulseSkinReflex.membraneAlive("Portal-v24");
  } catch (err) {
    console.error("[PulsePortal-v24] SkinReflex membraneAlive failed:", err);
  }
}

// ============================================================================
// BINARY ORGANISM + UNDERSTANDING + UI FLOW BOOT — v24 IMMORTAL PORTAL
// ============================================================================

if (isBrowser()) {
  (async () => {
    try {
      let binaryKernel = null;

      // BINARY ORGANISM BOOT — READ-ONLY SHADOW EXPOSED AS PulseBinary
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
            window.PulseBinary = window.PulseBinary || frozenBinaryView;
          }
        }
      } catch (err) {
        console.error("[PulsePortal-v24] Binary organism boot failed:", err);
      }


      // ----------------------------------------------------------------------
      // UNDERSTANDING BOOT — HIGH-LEVEL ORGANISM CONTEXT (CORTEX ENTRY)
      //  → make the boot packet structured-clone safe
      // ----------------------------------------------------------------------
      function safeMeta(meta) {
        if (!meta || typeof meta !== "object") return {};
        const out = { ...meta };
        delete out.performance;
        delete out.timing;
        delete out.navigation;
        delete out.memory;
        return out;
      }

      function safeEnv(env) {
        if (!env || typeof env !== "object") return {};
        const out = { ...env };

        // Strip anything that might be a browser intrinsic or heavy object
        delete out.performance;
        delete out.timing;
        delete out.navigation;
        delete out.memory;
        delete out.window;
        delete out.document;
        delete out.location;
        delete out.history;

        return out;
      }

      try {
        if (typeof PulseUnderstanding === "function") {
          const safeBootPacket = {
            meta: safeMeta(baseMetaPack),
            env: safeEnv(PulseSurfaceEnvironment),
            binary: window.PulseBinary || null
          };

          await PulseUnderstanding(safeBootPacket);
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
            meta: safeMeta(baseMetaPack),
            env: safeEnv(PulseSurfaceEnvironment)
          });
        }
      } catch (err) {
        console.error("[PulsePortal-v20] UIFlow init failed:", err);
      }
    } catch (err) {
      console.error("[PulsePortal-v24] Understanding boot failed:", err);
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

      // local safeEnv for this block so structure stays the same above
      function safeEnvForBand(env) {
        if (!env || typeof env !== "object") return {};
        const out = { ...env };
        delete out.performance;
        delete out.timing;
        delete out.navigation;
        delete out.memory;
        delete out.window;
        delete out.document;
        delete out.location;
        delete out.history;
        return out;
      }

      // CHUNK SESSION START — OPTIONAL, CHUNK-AWARE SESSION MARKER
      try {
        if (window.PulseBandStart) {
          window.PulseBandStart({
            type: "chunk-session",
            surface: "PulsePortal-v20",
            environment: safeEnvForBand(PulseSurfaceEnvironment),
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
// ============================================================================
// SAFE HELPERS (HOISTED SO EXPORT BLOCK CAN USE THEM)
// ============================================================================
function safeMeta(meta) {
  if (!meta || typeof meta !== "object") return {};
  const out = { ...meta };
  delete out.performance;
  delete out.timing;
  delete out.navigation;
  delete out.memory;
  return out;
}

function safeEnv(env) {
  if (!env || typeof env !== "object") return {};
  const out = { ...env };
  delete out.performance;
  delete out.timing;
  delete out.navigation;
  delete out.memory;
  delete out.window;
  delete out.document;
  delete out.location;
  delete out.history;
  return out;
}

const PulsePortalAPI = Object.freeze({
  VitalsMonitor: typeof window !== "undefined" ? window.VitalsMonitor : null,
  Logger: typeof window !== "undefined" ? window.PulseLogger : null,
  Understanding: PulseUnderstanding,
  SurfaceEnvironment: safeEnv(PulseSurfaceEnvironment),
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
