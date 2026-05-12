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
  PulseProofBridgeMonitor as PulseVitalsMonitor,
  PulseProofBridgeLogger as PulseVitalsLogger,
  BridgeLog as log,
  BridgeWarn as warn,
  BridgeError as error,
  startUnderstanding as PulseUnderstanding,
  PulseBinaryOrganismBoot,
  PulseProofBridgeLogger,
  PulseProofBridgeReflex,
  PulseProofBridgeErrors as PulseUIErrors,
  PulseProofBridgeFlow as PulseUIFlow,
  PulseProofBridgeMonitor,
  PulseProofBridgeScanner as PulsePageScanner,
  PulseProofBridgeRouteMemory as PulseUIRouteMemory,
  PulseProofBridgeWorldAdminPanel as createPulseWorldAdminPanel,
  PulseProofBridgeAdminDiagnostics as createAdminDiagnosticsOrgan} from "../_BACKEND/PULSE-WORLD-BRIDGE.js";
  import { firestore as db, SetDoc as setdoc, GetDoc as getdoc, Doc as doc } from "../_MONITOR/PULSE-PROOF-SHADOW.js"
// ============================================================
//  CREATE SKINREFLEX INSTANCE + EXPORT A1 API TO WINDOW
// ============================================================

console.log(
  "%c[PulsePortal v24‑IMMORTAL‑EVO+++] %cPortal membrane online",
  "color:#7E57C2; font-weight:bold; font-family:monospace;",   // Portal Cyan
  "color:#00FF9C; font-family:monospace;"                      // Monitor Neon Green
);


// ============================================================================
// WAIT FOR TOUCH → THEN WARM NEXT PAGE
// ============================================================================


let PulseSkinReflex = null;
try {
  PulseSkinReflex = PulseProofBridgeReflex;

  console.log(
    "%c[PulsePortal::SkinReflex] %cInstance created %c→ OK",
    "color:#7E57C2; font-weight:bold; font-family:monospace;",   // cyan tag
    "color:#00FF9C; font-family:monospace;",                     // neon green message
    "color:#E8F8FF; font-family:monospace;"                      // soft white arrow
  );

  console.log(
    "%c↳ Methods wired to window: %cgetHook, getAuth, getMap, callHelper",
    "color:#7E57C2; font-family:monospace; font-weight:bold;",
    "color:#E8F8FF; font-family:monospace;"
  );

  window.getHook    = PulseSkinReflex.getHook;
  window.getAuth    = PulseSkinReflex.getAuth;
  window.getMap     = PulseSkinReflex.getMap;
  window.callHelper = PulseSkinReflex.callHelper;

} catch (err) {
  console.error(
    "%c[PulsePortal::SkinReflex] %cERROR",
    "color:#FF3B3B; font-weight:bold; font-family:monospace;",
    "color:#FFE066; font-family:monospace;"
  );
  console.error(
    "%c↳ %s",
    "color:#FF3B3B; font-family:monospace;",
    err
  );
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
  if (typeof window === "undefined") return "PulseWorldBarrier";

  try {
    // 1 — Load OrganismMap (global or localStorage)
    let map = globalThis.PulseOrganismMap;

    if (!map) {
      const raw = localStorage.getItem("PulseOrganismMap_v25");
      if (raw) {
        map = JSON.parse(raw);
        globalThis.PulseOrganismMap = map;
        console.log("[RouteCarpet] buildRouteId() loaded OrganismMap from localStorage");
      }
    }

    const path = window.location?.pathname || "/";

    // ⭐ HARD GUARDS — prevent crashes
    if (!map || typeof map !== "object") {
      console.warn("[RouteCarpet] No OrganismMap → fallback PulseWorldBarrier");
      return "PulseWorldBarrier";
    }

    if (!map.systems) {
      console.warn("[RouteCarpet] OrganismMap missing systems → fallback PulseWorldBarrier");
      return "PulseWorldBarrier";
    }

    if (!map.systems.UI) {
      console.warn("[RouteCarpet] OrganismMap missing UI → fallback PulseWorldBarrier");
      return "PulseWorldBarrier";
    }

    if (!map.systems.UI.pages) {
      console.warn("[RouteCarpet] OrganismMap missing UI.pages → fallback PulseWorldBarrier");
      return "PulseWorldBarrier";
    }

    const pages = map.systems.UI.pages;

    // 3 — Try to match pathname to a page key
    for (const key of Object.keys(pages)) {
      const page = pages[key];
      const meta = page?.IDENTITY_META || {};

      if (meta.ROUTE === path) return meta.ROUTE;
      if (meta.ALIAS === path) return meta.ROUTE || key;
      if ("/" + key === path) return meta.ROUTE || key;
    }

    // 4 — Fallback: ALWAYS go to barrier
    console.warn("[RouteCarpet] No page matched path:", path, "→ fallback PulseWorldBarrier");
    return "PulseWorldBarrier";

  } catch (err) {
    console.error("[RouteCarpet] buildRouteId ERROR →", err);
    return "PulseWorldBarrier";
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

    const waitForTouch = setInterval(() => {
      if (window.__PULSE_TOUCH__) {
        clearInterval(waitForTouch);
        runPortalWarm();
      }
    }, 10);

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
          console.error(
            "%c[PulsePortal::fetchImage] %cchunk error %c→ %s",
            "color:#7E57C2; font-weight:bold; font-family:monospace;", // Portal Cyan
            "color:#FF3B3B; font-weight:bold; font-family:monospace;", // Monitor Red
            "color:#FFE066; font-family:monospace;",                   // Monitor Yellow
            String(err)
          );
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

              const result = await window.PulseChunks.PulseChunker(url, 0, metaPack);

              if (result && typeof result.chunk !== "undefined") {
                console.log(
                  "%c[PulsePortal::fetchChunk] %cchunk loaded %c→ %s",
                  "color:#7E57C2; font-weight:bold; font-family:monospace;",
                  "color:#00FF9C; font-family:monospace;",
                  "color:#E8F8FF; font-family:monospace;",
                  url
                );
                return result.chunk;
              }
            }

      if (window.PulseChunks?.fetchChunk) {
        const chunk = await window.PulseChunks.fetchChunk(url);
        console.log(
          "%c[PulsePortal::fetchChunk] %cfallback chunk loaded %c→ %s",
          "color:#7E57C2; font-weight:bold; font-family:monospace;",
          "color:#00FF9C; font-family:monospace;",
          "color:#E8F8FF; font-family:monospace;",
          url
        );
        return chunk;
      }
    } catch (err) {
      console.error(
        "%c[PulsePortal::fetchChunk] %cERROR %c→ %s",
        "color:#7E57C2; font-weight:bold; font-family:monospace;",
        "color:#FF3B3B; font-weight:bold; font-family:monospace;",
        "color:#FFE066; font-family:monospace;",
        String(err)
      );
    }

    return null;
  });

window.prewarmAssets =
  window.prewarmAssets ||
  function (urls = []) {
    try {
      if (window.PulseChunks?.prewarm) {
        window.PulseChunks.prewarm(urls);

        console.log(
          "%c[PulsePortal::prewarmAssets] %cprewarmed %c→ %d assets",
          "color:#7E57C2; font-weight:bold; font-family:monospace;",
          "color:#00FF9C; font-family:monospace;",
          "color:#E8F8FF; font-family:monospace;",
          urls.length
        );
      }
    } catch (err) {
      console.error(
        "%c[PulsePortal::prewarmAssets] %cERROR %c→ %s",
        "color:#7E57C2; font-weight:bold; font-family:monospace;",
        "color:#FF3B3B; font-weight:bold; font-family:monospace;",
        "color:#FFE066; font-family:monospace;",
        String(err)
      );
    }
  };

// ============================================================================
// PULSEPORTAL v30 — ROUTE CARPET (Pure OrganismMap + LocalStorage)
// ============================================================================

window.PulseRouteCarpet =
  window.PulseRouteCarpet ||
  {
    // ------------------------------------------------------------------------
    // ⭐ Load OrganismMap from localStorage if global is missing
    // ------------------------------------------------------------------------
    loadOrganismMap() {
      try {
        // Already loaded globally
        if (globalThis.PulseOrganismMap) return globalThis.PulseOrganismMap;

        // Load from localStorage
        const raw = localStorage.getItem("PulseOrganismMap_v25");
        if (!raw) return null;

        const parsed = JSON.parse(raw);
        globalThis.PulseOrganismMap = parsed;

        console.log("[RouteCarpet] Loaded OrganismMap from localStorage");
        return parsed;

      } catch (err) {
        console.error("[RouteCarpet] Failed to load OrganismMap →", err);
        return null;
      }
    },

    // ------------------------------------------------------------------------
    // ⭐ Predict next page using ONLY:
    // 1. Genome NEXT
    // 2. Page order
    // 3. Wrap fallback
    // ------------------------------------------------------------------------
    predictNext(currentPage) {
      try {
        // Ensure OrganismMap is loaded
        const map = this.loadOrganismMap();

        // ❌ No organism map → fallback to index
        if (!map || !map.systems?.UI?.pages) {
          console.warn("[RouteCarpet] No OrganismMap — fallback next=index");
          return "index";
        }

        const pages = map.systems.UI.pages;
        const keys = Object.keys(pages);

        // ❌ No pages → fallback
        if (!keys.length) {
          console.warn("[RouteCarpet] No pages in OrganismMap — fallback");
          return "index";
        }

        // --------------------------------------------------------------------
        // ⭐ 1 — Genome NEXT
        // --------------------------------------------------------------------
        const meta = pages[currentPage]?.IDENTITY_META;
        if (meta?.NEXT) {
          console.log("[RouteCarpet] Using genome NEXT →", meta.NEXT);
          return meta.NEXT;
        }

        // --------------------------------------------------------------------
        // ⭐ 2 — Page order NEXT
        // --------------------------------------------------------------------
        const index = keys.indexOf(currentPage);

        if (index >= 0 && index < keys.length - 1) {
          const next = keys[index + 1];
          console.log("[RouteCarpet] Using ordered NEXT →", next);
          return next;
        }

        // --------------------------------------------------------------------
        // ⭐ 3 — Wrap to first page
        // --------------------------------------------------------------------
        const fallback = keys[0];
        console.log("[RouteCarpet] Wrapping to first page →", fallback);
        return fallback;

      } catch (err) {
        console.error("[RouteCarpet] predictNext ERROR →", err);
        return "index";
      }
    },

    // ------------------------------------------------------------------------
    // ⭐ Existing unfold() — unchanged
    // ------------------------------------------------------------------------
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

        console.log(
          "%c[PulsePortal::RouteCarpet] %cunfolded %c→ route:%s, assets:%d",
          "color:#7E57C2; font-weight:bold; font-family:monospace;",
          "color:#00FF9C; font-family:monospace;",
          "color:#E8F8FF; font-family:monospace;",
          routeId,
          urls.length
        );

        return { route: routeId, prewarmed: urls.length };
      } catch (err) {
        console.error(
          "%c[PulsePortal::RouteCarpet] %cERROR %c→ %s",
          "color:#7E57C2; font-weight:bold; font-family:monospace;",
          "color:#FF3B3B; font-weight:bold; font-family:monospace;",
          "color:#FFE066; font-family:monospace;",
          String(err)
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

        window.fetchImage(url)
          .then((blobUrl) => originalSet.call(this, blobUrl || url))
          .catch((err) => {
            console.error(
              "%c[PulsePortal::ImageSrc] %cERROR %c→ %s",
              "color:#7E57C2; font-weight:bold; font-family:monospace;",
              "color:#FF3B3B; font-weight:bold; font-family:monospace;",
              "color:#FFE066; font-family:monospace;",
              String(err)
            );
            originalSet.call(this, url);
          });
      }
    });

    console.log(
      "%c[PulsePortal::ImageSrc] %cpatch active",
      "color:#7E57C2; font-weight:bold; font-family:monospace;",
      "color:#00FF9C; font-family:monospace;"
    );
  }
} catch (err) {
  console.error(
    "%c[PulsePortal::ImageSrc] %cFAILED %c→ %s",
    "color:#7E57C2; font-weight:bold; font-family:monospace;",
    "color:#FF3B3B; font-weight:bold; font-family:monospace;",
    "color:#FFE066; font-family:monospace;",
    String(err)
  );
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

          console.log(
            "%c[PulsePortal::Fetch] %cimage shortcut %c→ %s",
            "color:#7E57C2; font-weight:bold; font-family:monospace;",
            "color:#00FF9C; font-family:monospace;",
            "color:#E8F8FF; font-family:monospace;",
            url
          );

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
            console.log(
              "%c[PulsePortal::Fetch] %cproxy hit %c→ %s",
              "color:#7E57C2; font-weight:bold; font-family:monospace;",
              "color:#00FF9C; font-family:monospace;",
              "color:#E8F8FF; font-family:monospace;",
              url
            );

            const blob = new Blob([result.body], {
              type: result.contentType
            });

            return new Response(blob, {
              status: result.status,
              headers: result.headers
            });
          }
        }
      } catch (err) {
        console.error(
          "%c[PulsePortal::Fetch] %cERROR %c→ %s",
          "color:#7E57C2; font-weight:bold; font-family:monospace;",
          "color:#FF3B3B; font-weight:bold; font-family:monospace;",
          "color:#FFE066; font-family:monospace;",
          String(err)
        );
      }

      return originalFetch(resource, options);
    };

    console.log(
      "%c[PulsePortal::Fetch] %cpatch active",
      "color:#7E57C2; font-weight:bold; font-family:monospace;",
      "color:#00FF9C; font-family:monospace;"
    );
  }
} catch (err) {
  console.error(
    "%c[PulsePortal::Fetch] %cFAILED %c→ %s",
    "color:#7E57C2; font-weight:bold; font-family:monospace;",
    "color:#FF3B3B; font-weight:bold; font-family:monospace;",
    "color:#FFE066; font-family:monospace;",
    String(err)
  );
}

// ------------------------------------------------------------------------
// PULSEBAND REQUEST HANDLER
// ------------------------------------------------------------------------
if (window.pulseband && !window.PulseBand) {
  window.PulseBand = window.pulseband;

  console.log(
    "%c[PulsePortal::PulseBand] %chandler active",
    "color:#7E57C2; font-weight:bold; font-family:monospace;",
    "color:#00FF9C; font-family:monospace;"
  );

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

        console.log(
          "%c[PulsePortal::PulseBand] %cproxy request %c→ %s",
          "color:#7E57C2; font-weight:bold; font-family:monospace;",
          "color:#00FF9C; font-family:monospace;",
          "color:#E8F8FF; font-family:monospace;",
          url + query
        );
      } else {
        const res = await fetch(url + query, opts);
        data = await res.json().catch(() => null);

        console.log(
          "%c[PulsePortal::PulseBand] %cfetch request %c→ %s",
          "color:#7E57C2; font-weight:bold; font-family:monospace;",
          "color:#00FF9C; font-family:monospace;",
          "color:#E8F8FF; font-family:monospace;",
          url + query
        );
      }
    } catch (err) {
      console.error(
        "%c[PulsePortal::PulseBand] %cREQUEST FAILED %c→ %s",
        "color:#7E57C2; font-weight:bold; font-family:monospace;",
        "color:#FF3B3B; font-weight:bold; font-family:monospace;",
        "color:#FFE066; font-family:monospace;",
        String(err)
      );
    }

    try {
      if (window.PulseBand && data) {
        window.PulseBand.emit("response:" + packet.sessionId, data);
      }
    } catch (err) {
      console.error(
        "%c[PulsePortal::PulseBand] %cEMIT FAILED %c→ %s",
        "color:#7E57C2; font-weight:bold; font-family:monospace;",
        "color:#FF3B3B; font-weight:bold; font-family:monospace;",
        "color:#FFE066; font-family:monospace;",
        String(err)
      );
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

      console.log(
        "%c[PulsePortal::PulseNet] %cingress %c→ OK",
        "color:#7E57C2; font-weight:bold; font-family:monospace;",
        "color:#00FF9C; font-family:monospace;",
        "color:#E8F8FF; font-family:monospace;"
      );
    } catch (err) {
      console.error(
        "%c[PulsePortal::PulseNet] %cINGRESS FAILED %c→ %s",
        "color:#7E57C2; font-weight:bold; font-family:monospace;",
        "color:#FF3B3B; font-weight:bold; font-family:monospace;",
        "color:#FFE066; font-family:monospace;",
        String(err)
      );
    }
  });

  window.PulsePortalBridge.on("PULSENET_FASTLANE", async (payload) => {
    try {
      await fetch("/PULSE-PROXY/pulsenet/fastlane", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload)
      });

      console.log(
        "%c[PulsePortal::PulseNet] %cfastlane %c→ OK",
        "color:#7E57C2; font-weight:bold; font-family:monospace;",
        "color:#00FF9C; font-family:monospace;",
        "color:#E8F8FF; font-family:monospace;"
      );
    } catch (err) {
      console.error(
        "%c[PulsePortal::PulseNet] %cFASTLANE FAILED %c→ %s",
        "color:#7E57C2; font-weight:bold; font-family:monospace;",
        "color:#FF3B3B; font-weight:bold; font-family:monospace;",
        "color:#FFE066; font-family:monospace;",
        String(err)
      );
    }
  });
}
function detectRoutesOnPageSync() {
  const routes = new Set();

  // <a href="page.html">
  document.querySelectorAll("a[href]").forEach(a => {
    const href = a.getAttribute("href");
    if (href && href.endsWith(".html")) {
      routes.add(href.split("/").pop().replace(".html", ""));
    }
  });

  // data-route="page"
  document.querySelectorAll("[data-route]").forEach(el => {
    const r = el.getAttribute("data-route");
    if (r) routes.add(r);
  });

  // route="page"
  document.querySelectorAll("[route]").forEach(el => {
    const r = el.getAttribute("route");
    if (r) routes.add(r);
  });

  return Array.from(routes);
}

function savePageRoutesDaily(page, routes) {
  try {
    const today = new Date().toISOString().slice(0, 10);

    // Load existing snapshot
    const snap = window.PulsePageRouteSnapshot || {};

    // If already saved today → skip
    if (snap.date === today && snap.routes?.[page]) return;

    // Update snapshot
    snap.date = today;
    snap.routes = snap.routes || {};
    snap.routes[page] = routes;

    // Save globally
    window.PulsePageRouteSnapshot = snap;

   setdoc(doc(db, "pulse_page_routes_v26", "daily"), snap);


  } catch (err) {
    console.error("[PortalRouteSave] FAILED →", err);
  }
}

// ============================================================================
// PULSEPORTAL v27 — NEXT-PAGE WARM (OrganismMap-aware, Touch-safe)
// ============================================================================
function runPortalWarm() {
  try {
    const touch = window.__PULSE_TOUCH__;
    if (!touch) {
      console.warn("[PortalWarm] Touch not ready — skipping warm");
      return;
    }

    // ⭐ CURRENT PAGE NAME
    const page =
      location.pathname.split("/").pop().replace(".html", "") || "index";

    // ========================================================================
    // ⭐ NEW — DETECT ROUTES ON PAGE (SYNC, NO SCAN)
    // ========================================================================
    const routes = detectRoutesOnPageSync();

    // ⭐ Save to global memory
    window.PulsePageRoutes = window.PulsePageRoutes || {};
    window.PulsePageRoutes[page] = routes;

    // ⭐ Save to Firebase (sync wrapper)
    savePageRoutesDaily(page, routes);

    // ========================================================================
    // ⭐ USE PORTAL ROUTER (NOT TOUCH)
    // ========================================================================
    const next = window.PulseRouteCarpet?.predictNext?.(page);

    // ⭐ Prewarm assets via RouteCarpet
    window.PulseRouteCarpet?.unfold?.({
      route: next,
      imports: [`./${next}.js`],
      assets: [`./${next}.assets.json`]
    });

    if (!next) {
      console.log("[PortalWarm] No next page predicted");
      return;
    }

    // ⭐ SKIP IF NEXT PAGE == CURRENT PAGE
    if (next === page) {
      console.log("[PortalWarm] Next page is current page — skipping");
      return;
    }

    // ========================================================================
    // ⭐ ORGANISMMAP-AWARE ROUTE RESOLUTION
    // ========================================================================
    let nextRouteHtml = null;

    const map = globalThis.PulseOrganismMap;
    if (map && map.systems?.UI?.pages?.[next]) {
      // ⭐ Use the REAL route from the organism genome
      nextRouteHtml = map.systems.UI.pages[next].IDENTITY_META.ROUTE;
    } else {
      // ⭐ Fallback: local relative path
      nextRouteHtml = `./${next}.html`;
    }

    // ========================================================================
    // ⭐ PORTAL WARM — USE PORTAL ORGANS (NOT TOUCH)
    // ========================================================================

    // ⭐ 1 — Preload NEXT PAGE HTML
    window.PulsePortalPreloader?.preloadPage?.(next);

    // ⭐ 2 — Preload NEXT PAGE IMAGES (OrganismMap-aware)
    window.__PULSE_SCAN_ROUTE_IMAGES__?.(nextRouteHtml);

    // ⭐ 3 — Preload NEXT PAGE CHUNKS
    window.PulsePortalChunker?.preloadChunksForPage?.(next);

    // ⭐ 4 — Light ADVANTAGE warm (Portal’s warm engine)
    window.PulsePortalWarmup?.prewarmLight?.(next);

    // ⭐ 6 — Log warm event into Touch timeline
    window.TouchTimeline("portalWarm", { page, next });

    console.log(
      "%c[PulsePortal::Warm] %cv27 next-page warm complete %c→ %s",
      "color:#7E57C2; font-weight:bold; font-family:monospace;",
      "color:#00FF9C; font-family:monospace;",
      "color:#E8F8FF; font-family:monospace;",
      next
    );

  } catch (err) {
    console.error("[PortalWarm] FAILED →", err);
  }
}


// ============================================================================
// ⭐ SIGNAL SNAPSHOT EXPORT (v26 IMMORTAL++)
// Portal exposes the CSS‑merged signal snapshot from PulseProofSignal.
// Understanding stays backend-only. Portal stays membrane-only.
// ============================================================================
function __PulsePortalGetSignalSnapshot() {
  try {
    const sig = window.PulseProofSignal;
    if (!sig || typeof sig.comments !== "function") return null;

    const comments = sig.comments(1);
    if (!comments || !comments.length) return null;

    // v26: top-layer merged comment contains computed state
    return comments[0]?.details?.computed || null;
  } catch {
    return null;
  }
}


// ============================================================================
// ⭐ SURFACE META + PORTAL SURFACE PROJECTION
// ============================================================================
window.PulseSurface = window.PulseSurface
  ? Object.freeze({ ...window.PulseSurface, ...surfaceMeta })
  : surfaceMeta;


// ============================================================================
// ⭐ PULSEPORTAL v26 — IMMORTAL++
// Upgrade ONLY. Do NOT remove legacy fields.
// ============================================================================
window.PulsePortal =
  window.PulsePortal ||
  Object.freeze({
    // ------------------------------------------------------------------------
    // CORE META + ENVIRONMENT
    // ------------------------------------------------------------------------
    meta: surfaceMeta,
    env: PulseSurfaceEnvironment,
    logger: PulseVitalsLogger,

    // ------------------------------------------------------------------------
    // ⭐ NEW: v26 Signal Snapshot API
    // ------------------------------------------------------------------------
    getSignal() {
      return __PulsePortalGetSignalSnapshot();
    },

    // ------------------------------------------------------------------------
    // LEGACY FIELDS — PRESERVED EXACTLY AS YOU SAID
    // ------------------------------------------------------------------------
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
      PulseVitalsLogger,
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

console.log(
  "%c[PulsePortal::Surface] %cprojection active (v26 IMMORTAL++)",
  "color:#7E57C2; font-weight:bold; font-family:monospace;",
  "color:#00FF9C; font-family:monospace;"
);


} catch (err) {
  console.error(
    "%c[PulsePortal::Surface] %cFAILED %c→ %s",
    "color:#7E57C2; font-weight:bold; font-family:monospace;",
    "color:#FF3B3B; font-weight:bold; font-family:monospace;",
    "color:#FFE066; font-family:monospace;",
    String(err)
  );
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
    console.log(
      "%c[PulsePortal::Vitals] %cmonitor online",
      "color:#7E57C2; font-weight:bold; font-family:monospace;",
      "color:#00FF9C; font-family:monospace;"
    );
  }

  if (
    typeof window !== "undefined" &&
    window.PulseLogger &&
    typeof window.PulseLogger.meta === "object"
  ) {
    console.log(
      "%c[PulsePortal::Logger] %clogger active",
      "color:#7E57C2; font-weight:bold; font-family:monospace;",
      "color:#00FF9C; font-family:monospace;"
    );
  }
} catch (err) {
  console.error(
    "%c[PulsePortal::Vitals/Logger] %cFAILED %c→ %s",
    "color:#7E57C2; font-weight:bold; font-family:monospace;",
    "color:#FF3B3B; font-weight:bold; font-family:monospace;",
    "color:#FFE066; font-family:monospace;",
    String(err)
  );
}

try {
  if (typeof window !== "undefined") {
    window.PulseUIErrors?.init?.();
    console.log(
      "%c[PulsePortal::UIErrors] %cspine initialized",
      "color:#7E57C2; font-weight:bold; font-family:monospace;",
      "color:#00FF9C; font-family:monospace;"
    );
  }
} catch (err) {
  console.error(
    "%c[PulsePortal::UIErrors] %cFAILED %c→ %s",
    "color:#7E57C2; font-weight:bold; font-family:monospace;",
    "color:#FF3B3B; font-weight:bold; font-family:monospace;",
    "color:#FFE066; font-family:monospace;",
    String(err)
  );
}

if (isBrowser() && window.PulseSkinReflex?.membraneAlive) {
  try {
    window.PulseSkinReflex.membraneAlive("Portal-v24");
    console.log(
      "%c[PulsePortal::SkinReflex] %cmembrane alive",
      "color:#7E57C2; font-weight:bold; font-family:monospace;",
      "color:#00FF9C; font-family:monospace;"
    );
  } catch (err) {
    console.error(
      "%c[PulsePortal::SkinReflex] %cFAILED %c→ %s",
      "color:#7E57C2; font-weight:bold; font-family:monospace;",
      "color:#FF3B3B; font-weight:bold; font-family:monospace;",
      "color:#FFE066; font-family:monospace;",
      String(err)
    );
  }
}

// ============================================================================
// BINARY ORGANISM + UNDERSTANDING + UI FLOW BOOT — v24 IMMORTAL PORTAL
// ============================================================================
if (isBrowser()) {
  (async () => {
    try {
      let binary = null;

      // ----------------------------------------------------------------------
      // BINARY ORGANISM BOOT — GLOBAL PulseBinary (NO Kernel)
      // ----------------------------------------------------------------------
      try {
        // Prefer existing organism if Touch/Index already booted it
        if (window.PulseBinary) {
          binary = window.PulseBinary;
        } else if (typeof PulseBinaryOrganismBoot?.boot === "function") {
          binary = await PulseBinaryOrganismBoot.boot({ trace: false });
        }

        if (binary) {
          // Expose organism globally for ALL surfaces (Index, Touch, Portal)
          window.PulseBinary = binary;
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
                binary?.vitals?.generateVitals
                  ? binary.vitals.generateVitals()
                  : null
            },

            Consciousness: {
              latest: () =>
                binary?.consciousness?.generateConsciousnessPacket
                  ? binary.consciousness.generateConsciousnessPacket()
                  : null
            },

            Sentience: {
              snapshot:
                typeof binary?.sentience?.snapshot === "function"
                  ? () => binary.sentience.snapshot()
                  : () => null
            }
          };

          // Merge with any existing PulseBinary shadow
          window.PulseBinary = Object.freeze({
            ...safeBinaryView,
            ...window.PulseBinary
          });

          console.log(
            "%c[PulsePortal::Binary] %corganism booted + wired",
            "color:#7E57C2; font-weight:bold; font-family:monospace;",
            "color:#00FF9C; font-family:monospace;"
          );
        } else {
          console.error(
            "%c[PulsePortal::Binary] %cNO ORGANISM AVAILABLE",
            "color:#7E57C2; font-weight:bold; font-family:monospace;",
            "color:#FF3B3B; font-weight:bold; font-family:monospace;"
          );
        }
      } catch (err) {
        console.error(
          "%c[PulsePortal::Binary] %cBOOT FAILED %c→ %s",
          "color:#7E57C2; font-weight:bold; font-family:monospace;",
          "color:#FF3B3B; font-weight:bold; font-family:monospace;",
          "color:#FFE066; font-family:monospace;",
          String(err)
        );
      }

      // ----------------------------------------------------------------------
      // UNDERSTANDING BOOT — HIGH-LEVEL ORGANISM CONTEXT (CORTEX ENTRY)
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

          console.log(
            "%c[PulsePortal::Understanding] %cboot complete",
            "color:#7E57C2; font-weight:bold; font-family:monospace;",
            "color:#00FF9C; font-family:monospace;"
          );
        }
      } catch (err) {
        console.error(
          "%c[PulsePortal::Understanding] %cFAILED %c→ %s",
          "color:#7E57C2; font-weight:bold; font-family:monospace;",
          "color:#FF3B3B; font-weight:bold; font-family:monospace;",
          "color:#FFE066; font-family:monospace;",
          String(err)
        );
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

          console.log(
            "%c[PulsePortal::UIFlow] %cinitialized",
            "color:#7E57C2; font-weight:bold; font-family:monospace;",
            "color:#00FF9C; font-family:monospace;"
          );
        }
      } catch (err) {
        console.error(
          "%c[PulsePortal::UIFlow] %cFAILED %c→ %s",
          "color:#7E57C2; font-weight:bold; font-family:monospace;",
          "color:#FF3B3B; font-weight:bold; font-family:monospace;",
          "color:#FFE066; font-family:monospace;",
          String(err)
        );
      }

    } catch (err) {
      console.error(
        "%c[PulsePortal::Boot] %cFAILED %c→ %s",
        "color:#7E57C2; font-weight:bold; font-family:monospace;",
        "color:#FF3B3B; font-weight:bold; font-family:monospace;",
        "color:#FFE066; font-family:monospace;",
        String(err)
      );
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
          : Object.freeze({
              Flow: window.PulseUIFlow,
              context: flowContext
            });

        console.log(
          "%c[PulsePortal::UIFlow] %ccontext projected",
          "color:#7E57C2; font-weight:bold; font-family:monospace;",
          "color:#00FF9C; font-family:monospace;"
        );
      }
    } catch (flowErr) {
      console.error(
        "%c[PulsePortal::UIFlow] %cCONTEXT FAILED %c→ %s",
        "color:#7E57C2; font-weight:bold; font-family:monospace;",
        "color:#FF3B3B; font-weight:bold; font-family:monospace;",
        "color:#FFE066; font-family:monospace;",
        String(flowErr)
      );
    }
  })();
}
// ============================================================================
// PULSEBAND BOOT — DUAL-BAND SESSION BRIDGE
// ============================================================================
if (isBrowser()) {
  (async () => {
    try {
      // Attach PulseBand from pre-injected pulseband / PulseBand if present
      try {
        const injectedBand = window.PulseBand || window.pulseband || null;

        if (!injectedBand) {
          console.warn(
            "%c[PulsePortal::PulseBand] %cno injected PulseBand instance found",
            "color:#7E57C2; font-weight:bold; font-family:monospace;",
            "color:#FFE066; font-family:monospace;"
          );
        } else {
          // Normalize to window.PulseBand
          window.PulseBand = injectedBand;

          console.log(
            "%c[PulsePortal::PulseBand] %cbridge attached",
            "color:#7E57C2; font-weight:bold; font-family:monospace;",
            "color:#00FF9C; font-family:monospace;"
          );

          // Attach proxy handler once
          if (!window.__PulseBandProxyAttached) {
            window.__PulseBandProxyAttached = true;

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

                  console.log(
                    "%c[PulsePortal::PulseBand] %cproxy request %c→ %s",
                    "color:#7E57C2; font-weight:bold; font-family:monospace;",
                    "color:#00FF9C; font-family:monospace;",
                    "color:#E8F8FF; font-family:monospace;",
                    url + query
                  );
                } else {
                  const res = await fetch(url + query, opts);
                  data = await res.json().catch(() => null);

                  console.log(
                    "%c[PulsePortal::PulseBand] %cfetch request %c→ %s",
                    "color:#7E57C2; font-weight:bold; font-family:monospace;",
                    "color:#00FF9C; font-family:monospace;",
                    "color:#E8F8FF; font-family:monospace;",
                    url + query
                  );
                }
              } catch (err) {
                console.error(
                  "%c[PulsePortal::PulseBand] %cREQUEST FAILED %c→ %s",
                  "color:#7E57C2; font-weight:bold; font-family:monospace;",
                  "color:#FF3B3B; font-weight:bold; font-family:monospace;",
                  "color:#FFE066; font-family:monospace;",
                  String(err)
                );
              }

              try {
                if (window.PulseBand && data) {
                  window.PulseBand.emit("response:" + packet.sessionId, data);
                }
              } catch (err) {
                console.error(
                  "%c[PulsePortal::PulseBand] %cEMIT FAILED %c→ %s",
                  "color:#7E57C2; font-weight:bold; font-family:monospace;",
                  "color:#FF3B3B; font-weight:bold; font-family:monospace;",
                  "color:#FFE066; font-family:monospace;",
                  String(err)
                );
              }
            });
          }

          // Always expose a normalized start helper
          window.PulseBandStart = (opts) =>
            window.PulseBand && typeof window.PulseBand.start === "function"
              ? window.PulseBand.start(opts)
              : null;
        }
      } catch (err) {
        console.error(
          "%c[PulsePortal::PulseBand] %cBOOT FAILED %c→ %s",
          "color:#7E57C2; font-weight:bold; font-family:monospace;",
          "color:#FF3B3B; font-weight:bold; font-family:monospace;",
          "color:#FFE066; font-family:monospace;",
          String(err)
        );
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
            surface: "PulsePortal-v24",
            environment: safeEnvForBand(PulseSurfaceEnvironment),
            version: "24.0-Immortal-Evo+++"
          });

          console.log(
            "%c[PulsePortal::PulseBand] %cchunk-session started",
            "color:#7E57C2; font-weight:bold; font-family:monospace;",
            "color:#00FF9C; font-family:monospace;"
          );
        } else {
          console.warn(
            "%c[PulsePortal::PulseBand] %cno PulseBandStart available — chunk-session skipped",
            "color:#7E57C2; font-weight:bold; font-family:monospace;",
            "color:#FFE066; font-family:monospace;"
          );
        }
      } catch (err) {
        console.error(
          "%c[PulsePortal::PulseBand] %cCHUNK SESSION FAILED %c→ %s",
          "color:#7E57C2; font-weight:bold; font-family:monospace;",
          "color:#FF3B3B; font-weight:bold; font-family:monospace;",
          "color:#FFE066; font-family:monospace;",
          String(err)
        );
      }
    } catch (err) {
      console.error(
        "%c[PulsePortal::PulseBand] %cBOOT FAILED %c→ %s",
        "color:#7E57C2; font-weight:bold; font-family:monospace;",
        "color:#FF3B3B; font-weight:bold; font-family:monospace;",
        "color:#FFE066; font-family:monospace;",
        String(err)
      );
    }
  })();
}


// ============================================================================
// EXPORT — PULSE PORTAL API
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

console.log(
  "%c[PulsePortal::API] %cexported",
  "color:#7E57C2; font-weight:bold; font-family:monospace;",
  "color:#00FF9C; font-family:monospace;"
);

export default PulsePortalAPI;

// ============================================================================
// GLOBAL MIRRORS — UNIVERSAL (Browser + Node + Workers)
// ============================================================================
try {
  const G = globalThis; // universal global root

  // Mirror PulseBand
  G.PulseBand =
    typeof window !== "undefined"
      ? window.PulseBand
      : G.PulseBand || null;

  // Mirror Firebase (frontend client SDK)
  G.Firebase = typeof db !== "undefined" ? db : G.Firebase || null;

  // Mirror PulseBandStart
  G.PulseBandStart =
    typeof window !== "undefined"
      ? window.PulseBandStart
      : G.PulseBandStart || null;

  // Mirror VitalsMonitor
  G.VitalsMonitor =
    typeof window !== "undefined"
      ? window.VitalsMonitor
      : G.VitalsMonitor || null;

  // Mirror PulseLogger
  G.PulseLogger =
    typeof window !== "undefined"
      ? window.PulseLogger
      : G.PulseLogger || null;

  // Mirror UIFlow
  G.PulseUIFlow =
    typeof window !== "undefined"
      ? window.PulseUIFlow
      : G.PulseUIFlow || null;

  // Mirror UIErrors
  G.PulseUIErrors =
    typeof window !== "undefined"
      ? window.PulseUIErrors
      : G.PulseUIErrors || null;

  // Mirror Portal API
  G.PulsePortalAPI = PulsePortalAPI;

  console.log(
    "%c[PulsePortal::Global] %cv26 universal mirrors initialized",
    "color:#7E57C2; font-weight:bold; font-family:monospace;",
    "color:#00FF9C; font-family:monospace;"
  );

} catch (err) {
  console.error(
    "%c[PulsePortal::Global] %cFAILED %c→ %s",
    "color:#7E57C2; font-weight:bold; font-family:monospace;",
    "color:#FF3B3B; font-weight:bold; font-family:monospace;",
    "color:#FFE066; font-family:monospace;",
    String(err)
  );
}
