// ============================================================================
// FILE: /PulsePower-v16.js
// OLD: /PulseNetEvolutionaryWindow.js
// PULSE PORTAL WINDOW — v16-Immortal-PORTAL-TRUST
// PORTAL-MEMBRANE • ONE-WAY GLASS • ZERO-TRUST SURFACE • NO ORGANS BEYOND GLASS
// “The last surface before the organism. The first reflection of the portal.”
// ============================================================================
//
//  DESIGN:
//  - v16-IMMORTAL Portal Window: the surface membrane that knows the portal exists,
//    but never crosses it.
//  - Zero-trust: no organs, no CNS, no direct routing exposed to the page.
//  - Offline-first: surface environment snapshot is stable, deterministic, and
//    safe to mirror into logs, bridge, and vitals.
//  - Prewarm-aware: cooperates with PulseChunks + Bridge prewarm to reduce
//    cold-start pain without exposing internals.
//  - Binary-aware: can project a read-only binary shadow of the organism.
//  - Portal-trust-aligned: this window and the PulseProofBridge-v16 form the
//    “Portal Trust Layer” — the only two surfaces that see both worlds.
//
// ============================================================================
//  EXPERIENCE METADATA — v16 IMMORTAL PORTAL WINDOW
// ============================================================================
/*
AI_EXPERIENCE_META = {
  identity: "PulseWindow",
  version: "v16-Immortal-PORTAL-WINDOW",
  layer: "frontend",
  role: "portal_window_loader",
  lineage: "PulseOS-v16",

  evo: {
    binaryAware: true,
    dualBandAware: true,
    chunkAligned: true,
    presenceAware: true,
    safeRouteFree: true,
    cnsFallback: true,
    normalizerAligned: true,
    windowRoot: true,

    portalTrustLayer: true,
    surfaceMembrane: true,
    zeroTrustSurface: true,
    offlineFirst: true,
    localStoreMirrored: false,   // window itself does not store, but informs
    replayAware: true,

    prewarmAware: true,
    bridgeAligned: true,
    loggerAligned: true,
    monitorAligned: true
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
      "VitalsMonitor"
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

console.log("Pulse Portal Window v16-Immortal-PORTAL-TRUST");
import { route as BridgeRoute, PulseProofLogger, log, warn, error, startUnderstanding as PulseUnderstanding, PulseBinaryOrganismBoot} from "./_BACKEND/PulseProofBridge.js";

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

// ============================================================================
// MEMBRANE META — PORTAL WINDOW CONTEXT
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
  layer: "PulseEvolutionaryWindow",
  role: "surface-membrane",
  version: "16.0-Immortal-PORTAL-WINDOW",
  evo: {
    browserOnly: true,
    membraneOnly: true,
    binaryFirst: true,
    viewOnly: true,
    noOrgans: true,
    noRouting: true,
    noIdentity: true
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
  lineage: "PulseOS.Surface.Portal.Window.v16"
});

const pulseRole = Object.freeze({
  identity: "PulseEvolutionaryWindow-Portal",
  type: "membrane",
  subsystem: "surface",
  layer: "window",
  version: "16.0-Immortal-PORTAL-WINDOW",
  contract: {
    purpose:
      "Provide a one-way glass into the organism: vitals, logs, understanding, binary shadow, and route-level lore."
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
// MEMBRANE BOOT (BROWSER ONLY) — PREWARM, CHUNKS, FETCH, IMAGE
// ============================================================================
if (isBrowser()) {
  try {
    // fetchImage
    window.fetchImage =
      window.fetchImage ||
      (async function (url) {
        if (!url) return url;
        try {
          if (window.PulseChunks?.getImage) {
            return await window.PulseChunks.getImage(url);
          }
        } catch (err) {
          console.error("[PulseEvolutionaryWindow-v16] fetchImage chunk error:", err);
        }
        return url;
      });

    // fetchChunk
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
          console.error("[PulseEvolutionaryWindow-v16] fetchChunk error:", err);
        }
        return null;
      });

    // prewarmAssets
    window.prewarmAssets =
      window.prewarmAssets ||
      function (urls = []) {
        try {
          if (window.PulseChunks?.prewarm) {
            window.PulseChunks.prewarm(urls);
          }
        } catch (err) {
          console.error("[PulseEvolutionaryWindow-v16] prewarmAssets error:", err);
        }
      };

    // PulseRouteCarpet
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
              "[PulseEvolutionaryWindow-v16] PulseRouteCarpet.unfold error:",
              err
            );
            return { route: buildRouteId(), prewarmed: 0 };
          }
        }
      };

    // <img>.src override
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
      console.error("[PulseEvolutionaryWindow-v16] Image src patch failed:", err);
    }

    // FETCH PATCH — guarded, never blocks
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
            console.error("[PulseFetchPatch-v16] error:", err);
          }

          return originalFetch(resource, options);
        };
      }
    } catch (err) {
      console.error("[PulseEvolutionaryWindow-v16] fetch patch failed:", err);
    }

    // Prewarm visible assets on load
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
        console.error("[PulseEvolutionaryWindow-v16] asset prewarm failed:", err);
      }
    });

    // Surface meta (also used by Bridge as environment)
    window.PulseSurface = window.PulseSurface
      ? Object.freeze({ ...window.PulseSurface, ...surfaceMeta })
      : surfaceMeta;
  } catch (err) {
    console.error("[PulseEvolutionaryWindow-v16] Membrane chunk layer failed:", err);
  }
}

// ============================================================================
// SURFACE MEMBRANE INITIALIZATION — LOGGER + MONITOR + ERRORS
// ============================================================================
try {
  // Always-on vitals monitor (backend optional)
  if (window.VitalsMonitor && typeof window.VitalsMonitor.PulseRole === "object") {
    // no explicit start needed; updateUserMetrics is called by organs
  }

  // Logger init (AI console, telemetry, console hijack already done in logger file)
  if (window.PulseLogger && typeof window.PulseLogger.meta === "object") {
    // no explicit init required; logger file already hijacks console
  }
} catch (err) {
  console.error("[PulseEvolutionaryWindow-v16] Vitals/Logger init failed:", err);
}

try {
  window.PulseUIErrors?.init?.();
} catch (err) {
  console.error(
    "[PulseEvolutionaryWindow-v16] Error spine failed to initialize:",
    err
  );
}

if (isBrowser() && window.PulseSkinReflex?.membraneAlive) {
  try {
    window.PulseSkinReflex.membraneAlive("Window-v16");
  } catch (err) {
    console.error(
      "[PulseEvolutionaryWindow-v16] SkinReflex membraneAlive failed:",
      err
    );
  }
}

// ============================================================================
// BINARY ORGANISM + UI FLOW + PULSEBAND BOOTSTRAP — v16 IMMORTAL
// ============================================================================
if (isBrowser()) {
  (async () => {
    try {
      let binaryKernel = null;

      // BINARY ORGANISM BOOT
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
        console.error(
          "[PulseEvolutionaryWindow-v16] Binary organism boot failed:",
          err
        );
      }

      // UI FLOW BOOT
      try {
        const flowContext = await window.PulseUIFlow();
        window.PulseUI = window.PulseUI
          ? Object.freeze({
              ...window.PulseUI,
              Flow: window.PulseUIFlow,
              context: flowContext
            })
          : Object.freeze({ Flow: window.PulseUIFlow, context: flowContext });
      } catch (flowErr) {
        console.error("[PulseEvolutionaryWindow-v16] UIFlow boot failed:", flowErr);
      }

      // PULSEBAND BOOT
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
                window.PulseLogger && typeof window.PulseLogger.route === "function";

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
              console.error("[PulseEvolutionaryWindow-v16] PulseBand request failed:", err);
            }

            try {
              if (window.PulseBand && data) {
                window.PulseBand.emit("response:" + packet.sessionId, data);
              }
            } catch (err) {
              console.error(
                "[PulseEvolutionaryWindow-v16] PulseBand emit failed:",
                err
              );
            }
          });

          window.PulseBandStart = (opts) => window.PulseBand.start(opts);
        }
      } catch (err) {
        console.error("[PulseEvolutionaryWindow-v16] PulseBand boot failed:", err);
      }

      // CHUNK SESSION START
      try {
        if (window.PulseBandStart) {
          window.PulseBandStart({
            type: "chunk-session",
            surface: "PulseEvolutionaryWindow-v16",
            environment: PulseSurfaceEnvironment,
            version: "16.0-Immortal-PORTAL-WINDOW"
          });
        }
      } catch (err) {
        console.error(
          "[PulseEvolutionaryWindow-v16] Chunk session start failed:",
          err
        );
      }
    } catch (err) {
      console.error(
        "[PulseEvolutionaryWindow-v16] Binary organism + UI boot failed:",
        err
      );
    }
  })();
}

// ============================================================================
// EXPORT — PORTAL API
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

try {
  if (typeof global !== "undefined") {
    global.PulseBand = typeof window !== "undefined" ? window.PulseBand : null;
    global.PulseBandStart =
      typeof window !== "undefined" ? window.PulseBandStart : null;
    global.VitalsMonitor =
      typeof window !== "undefined" ? window.VitalsMonitor : null;
    global.PulseLogger =
      typeof window !== "undefined" ? window.PulseLogger : null;
    global.PulseUIFlow =
      typeof window !== "undefined" ? window.PulseUIFlow : null;
    global.PulseUIErrors =
      typeof window !== "undefined" ? window.PulseUIErrors : null;
  }
  if (typeof globalThis !== "undefined") {
    globalThis.PulseBand =
      typeof window !== "undefined" ? window.PulseBand : null;
    globalThis.PulseBandStart =
      typeof window !== "undefined" ? window.PulseBandStart : null;
    globalThis.VitalsMonitor =
      typeof window !== "undefined" ? window.VitalsMonitor : null;
    globalThis.PulseLogger =
      typeof window !== "undefined" ? window.PulseLogger : null;
    globalThis.PulseUIFlow =
      typeof window !== "undefined" ? window.PulseUIFlow : null;
    globalThis.PulseUIErrors =
      typeof window !== "undefined" ? window.PulseUIErrors : null;
  }

  if (typeof g !== "undefined") {
    g.PulseBand = typeof window !== "undefined" ? window.PulseBand : null;
    g.PulseBandStart =
      typeof window !== "undefined" ? window.PulseBandStart : null;
    g.VitalsMonitor =
      typeof window !== "undefined" ? window.VitalsMonitor : null;
    g.PulseLogger =
      typeof window !== "undefined" ? window.PulseLogger : null;
    g.PulseUIFlow =
      typeof window !== "undefined" ? window.PulseUIFlow : null;
    g.PulseUIErrors =
      typeof window !== "undefined" ? window.PulseUIErrors : null;
  }
} catch {
  // never throw
}

// ============================================================================
//  IMMORTAL PORTAL WINDOW FOOTER — LORE, CHALLENGE, ORIGIN
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
//  END OF FILE — THE PORTAL WINDOW CLOSES.
//  The next line of code you write will echo on both sides.
// ============================================================================
