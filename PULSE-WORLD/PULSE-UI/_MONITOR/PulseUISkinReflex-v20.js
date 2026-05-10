/*
===============================================================================
FILE: /PULSE-UI/PulseUISkinReflex-v20.js
LAYER: A1 SURFACE REFLEX + A3 ERROR SPINE
===============================================================================
===============================================================================
/*
===============================================================================
FILE: /PULSE-UI/PulseUISkinReflex-v20.js
LAYER: A1 SURFACE REFLEX + A3 ERROR SPINE (v20 IMMORTAL)
===============================================================================
*/

// ---------------------------------------------------------------------------
// GLOBAL ROOT
// ---------------------------------------------------------------------------
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

import {
  safeRoute as safeRouteV20,
  safeRoute as safeRouteLegacy,
  PulseProofBridgeLogger as PulseLogger
} from "../_BACKEND/PULSE-WORLD-BRIDGE.js";
import PulseUIErrors from "./PulseUIErrors-v24.js";
import { getUIFlowSnapshot } from "./PulseUIFlow-v24.js";
import PulsePageScanner from "./PulseUIPageScanner-v20.js";
import createPulseRouteMemory from "./PulseUIRouteMemory-v20.js";

const route = typeof safeRouteV20 === "function" ? safeRouteV20 : safeRouteLegacy;

// ---------------------------------------------------------------------------
// ONLINE CHECK
// ---------------------------------------------------------------------------
function isOnline() {
  if (typeof window !== "undefined" && typeof window.PULSE_ONLINE === "boolean") {
    return window.PULSE_ONLINE === true;
  }
  if (typeof global !== "undefined" && typeof global.PULSE_ONLINE === "boolean") {
    return global.PULSE_ONLINE === true;
  }
  if (
    typeof globalThis !== "undefined" &&
    typeof globalThis.PULSE_ONLINE === "boolean"
  ) {
    return globalThis.PULSE_ONLINE === true;
  }
  if (typeof g !== "undefined" && typeof g.PULSE_ONLINE === "boolean") {
    return g.PULSE_ONLINE === true;
  }
  return false;
}

// ---------------------------------------------------------------------------
// ROLE
// ---------------------------------------------------------------------------
export const SkinReflexRole = {
  type: "Skin",
  subsystem: "PulseSkinReflex",
  layer: "A1-SurfaceReflex",
  version: "20.0-Immortal",
  identity: "PulseSkinReflex-v20-Immortal",

  evo: {
    driftProof: true,
    deterministicReflex: true,
    zeroState: true,
    zeroTiming: true,
    surfaceOnly: true,
    classificationFirst: true,
    healingTriggerOnly: true,
    binaryAware: true,
    dualBand: true,
    presenceAware: true,
    errorSpineIntegrated: true,
    pageScannerAware: true,
    routeMemoryAware: true,
    coreMemoryAware: true,
    cacheAware: true,
    offlineAware: true,
    pageCacheAware: true,
    meshV20Ready: true,
    sendV20Ready: true,
    futureEvolutionReady: true
  },

  reflex: {
    pageLevel: true,
    errorIntake: true,
    routeSampler: true,
    degradationAnnotator: true,
    binaryShadowTagger: true
  },

  pulseContract: "Pulse-v1/v2/v3/v20",
  meshContract: "PulseMesh-v20",
  sendContract: "PulseSend-v20"
};

// ---------------------------------------------------------------------------
// GLOBALS / DIAGNOSTICS
// ---------------------------------------------------------------------------
const hasWindow = typeof window !== "undefined";

const LAYER_ID = "SKIN-REFLEX";
const LAYER_NAME = "THE SKIN REFLEX";
const LAYER_ROLE = "UNIVERSAL ERROR GUARDIAN & HEALING TRIGGER";
const LAYER_VER = SkinReflexRole.version;

const log = (typeof global !== "undefined" && global.log) || console.log;
const warn = (typeof global !== "undefined" && global.warn) || console.warn;
const error = (typeof global !== "undefined" && global.error) || console.error;

const PROTECTOR_DIAGNOSTICS_ENABLED =
  hasWindow &&
  (window.PULSE_PROTECTOR_DIAGNOSTICS === "true" ||
    window.PULSE_DIAGNOSTICS === "true");

const logProtector = (stage, details = {}) => {
  if (!PROTECTOR_DIAGNOSTICS_ENABLED) return;
  if (typeof log !== "function") return;

  try {
    log(
      JSON.stringify({
        pulseLayer: LAYER_ID,
        pulseName: LAYER_NAME,
        pulseRole: LAYER_ROLE,
        pulseVer: LAYER_VER,
        stage,
        ...details
      })
    );
  } catch {}
};

function safeSpine(err, origin) {
  try {
    const normalized = PulseUIErrors.normalizeError(err, origin);
    PulseUIErrors.broadcast(normalized);
  } catch {}
}

// ---------------------------------------------------------------------------
// ORGANISM MAP RESOLUTION (v20-aware)
// ---------------------------------------------------------------------------
function getOrganismMapSafe() {
  try {
    if (!hasWindow) return null;

    const brain = window.PulseOSBrain || null;
    if (brain && (brain.PulseOrganismMapV20 || brain.PulseOrganismMap)) {
      return brain.PulseOrganismMapV20 || brain.PulseOrganismMap;
    }

    if (window.__PULSE_ORGANISM_MAP_V20__) {
      return window.__PULSE_ORGANISM_MAP_V20__;
    }

    if (window.__PULSE_ORGANISM_MAP__) {
      return window.__PULSE_ORGANISM_MAP__;
    }

    return null;
  } catch {
    return null;
  }
}

function resolveOwnerModule(symbol) {
  try {
    if (typeof symbol !== "string") return null;

    const organism = getOrganismMapSafe();
    if (!organism || !organism.organs) return null;

    const organ = organism.organs[symbol];
    return organ ? organ.system : null;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// SENSE REPORT — richer local diagnostics (binary-aware, v20)
// ---------------------------------------------------------------------------
function emitReflexSenseReport(context = {}) {
  if (typeof console === "undefined" || !console.groupCollapsed) return;

  console.groupCollapsed(
    "%c[SkinReflex SENSE REPORT — v20-Immortal]",
    "color:#FF9800; font-weight:bold;"
  );

  console.log("• layer:", "A1 (Surface Reflex)");
  console.log("• role:", LAYER_ROLE);
  console.log("• version:", LAYER_VER);

  console.log("• message:", context.message || "none");
  console.log("• file:", context.file || "unknown");
  console.log("• line:", context.line || "unknown");
  console.log("• frames:", context.frames ?? 0);

  console.log("• degraded:", context.degraded);
  console.log("• healthScore:", context.healthScore);
  console.log("• tier:", context.tier);
  console.log("• dnaTag:", context.dnaTag);
  console.log("• driftSignature:", context.driftSignature || "none");

  console.log("• binaryAware:", context.binaryAware || false);
  console.log("• dualBand:", true);
  console.log("• online:", isOnline());

  console.log("• page:", context.page || "unknown");
  console.log("• reflexSeq:", context.seq || "n/a");

  console.groupEnd();
}

// ---------------------------------------------------------------------------
// SESSION CHECK (trustedDevice barrier + identity exposure)
// ---------------------------------------------------------------------------
async function sessionCheck() {
  try {
    if (!hasWindow || !window.localStorage) {
      logProtector("SESSIONCHECK_SKIPPED_NO_WINDOW", {});
      return null;
    }

    let id = null;

    try {
      const raw = window.localStorage.getItem("tp_identity_v9");
      if (raw) id = JSON.parse(raw);
    } catch {
      id = null;
    }

    if (hasWindow) {
      if (!window.Pulse) window.Pulse = {};
      window.PulseIdentity = id || null;
    }

    if (!id || !id.trustedDevice) {
      const here =
        encodeURIComponent(window.location.pathname + window.location.search);
      logProtector("SESSIONCHECK_REDIRECT_UNTRUSTED", {
        path: window.location.pathname,
        trustedDevice: id?.trustedDevice || false
      });
      window.location.href = `/CheckEmail.html?returnTo=${here}`;
      return null;
    }

    logProtector("SESSIONCHECK_OK", { trustedDevice: true });
    return id;
  } catch (err) {
    safeSpine(err, "skinreflex.sessionCheck");
    return null;
  }
}

// ---------------------------------------------------------------------------
// ROUTE CHECK (page continuity) — ONLY HEAL WHEN NEEDED
// ---------------------------------------------------------------------------
let hasBootedOnce = false;

function routeCheck() {
  try {
    if (!hasWindow) {
      logProtector("ROUTECHECK_SKIPPED_NO_WINDOW", {});
      return { needsHealing: false };
    }

    if (!window.Pulse) window.Pulse = {};

    const lastPage = window.Pulse.pageName || null;
    const pageName =
      (window.location && window.location.pathname) || null;

    window.Pulse.lastPage = lastPage;
    window.Pulse.pageName = pageName;

    const needsHealing =
      !pageName ||
      pageName === "unknown" ||
      pageName.trim() === "" ||
      pageName.includes("undefined") ||
      pageName.includes("//") ||
      lastPage === "unknown" ||
      (lastPage === null && hasBootedOnce);

    logProtector("ROUTECHECK_UPDATED", {
      pageName,
      lastPage,
      needsHealing
    });

    return { pageName, lastPage, needsHealing };
  } catch (err) {
    safeSpine(err, "skinreflex.routeCheck");
    return { needsHealing: false };
  }
}

// ---------------------------------------------------------------------------
// PAGE SCANNER INTEL EMITTER (A2, v20 drift packet)
// ---------------------------------------------------------------------------
function emitPageScannerIntel(context = {}) {
  try {
    if (typeof window === "undefined" || !window.PageScannerAdapter) return;

    const packet = PulsePageScanner.buildDriftPacket(context);

    if (packet && typeof packet.severity === "number") {
      logProtector("PAGESCANNER_DRIFT_INTEL", {
        severity: packet.severity,
        tooFar: !!packet.tooFar,
        hasStructural: !!packet.structural,
        tier: packet.tier,
        dnaTag: packet.dnaTag
      });
    }

    if (typeof window.PageScannerAdapter.onEvent === "function") {
      window.PageScannerAdapter.onEvent(packet);
    }
  } catch (err) {
    safeSpine(err, "pagescanner.emitIntel");
  }
}

// ---------------------------------------------------------------------------
// MISSING FIELD PARSER — deterministic, dualband-safe
// ---------------------------------------------------------------------------
function parseMissingField(message) {
  try {
    logProtector("PARSER_INVOKED", {});

    let match = message.match(/reading '([^']+)'/);
    if (match) return { table: "Users", field: match[1] };

    match = message.match(/([^ ]+) is not defined/);
    if (match) return { table: "Users", field: match[1] };

    match = message.match(/property '([^']+)'/);
    if (match) return { table: "Users", field: match[1] };

    return null;
  } catch (err) {
    safeSpine(err, "skinreflex.parseMissingField");
    return null;
  }
}

// ---------------------------------------------------------------------------
// EXTERNAL RESOURCE CLASSIFIER (presence-aware)
// ---------------------------------------------------------------------------
function isExternal(url) {
  try {
    const u = new URL(url, window.location.href);

    const localOrigins = new Set([
      window.location.origin,
      "null",
      "file://",
      "data:",
      "blob:",
      "pulse://",
      "chrome://",
      "about:",
      "http://localhost",
      "http://127.0.0.1",
      "https://localhost",
      "https://127.0.0.1"
    ]);

    return !localOrigins.has(u.origin);
  } catch {
    return true;
  }
}

// ---------------------------------------------------------------------------
// FACTORY — creates the SkinReflex organ (v20 IMMORTAL)
// ---------------------------------------------------------------------------
export function createPulseSkinReflex({
  routeMemoryBucketId = "skinreflex-route-memory-v20",
  log: injectedLog = log,
  warn: injectedWarn = warn
} = {}) {
  const RouteMemory = createPulseRouteMemory({
    bucketId: routeMemoryBucketId,
    log: injectedLog,
    warn: injectedWarn
  });

  const SKINREFLEX_STORE_KEY = "PulseSkinReflexStore_v20";

  function loadSkinReflexStore() {
    if (!hasWindow || !window.localStorage) return [];
    try {
      const raw = window.localStorage.getItem(SKINREFLEX_STORE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  function saveSkinReflexStore(entries) {
    if (!hasWindow || !window.localStorage) return;
    try {
      window.localStorage.setItem(
        SKINREFLEX_STORE_KEY,
        JSON.stringify(entries)
      );
    } catch {}
  }

  function appendSkinReflexEntry(eventType, payload = {}) {
    try {
      const entries = loadSkinReflexStore();
      const entry = {
        eventType,
        timestamp: Date.now(),
        layer: "A1/A2/A3",
        version: LAYER_VER,
        ...payload
      };
      entries.push(entry);
      saveSkinReflexStore(entries);
    } catch (err) {
      safeSpine(err, "skinreflex.store.append");
    }
  }

  let healingInProgress = false;

  if (typeof console !== "undefined" && typeof console.log === "function") {
    console.log(
      "%c[PulseSkinReflex v20-Immortal] Loaded — A1/A2/A3 Universal Membrane Active",
      "color:#4CAF50; font-weight:bold;"
    );
  }

  // -------------------------------------------------------------------------
  // PUBLIC: membraneAlive
  // -------------------------------------------------------------------------
  function membraneAlive(origin = "unknown") {
    try {
      if (typeof console !== "undefined") {
        console.debug(`[SkinReflex] membraneAlive from ${origin}`);
      }
    } catch (err) {
      safeSpine(err, "skinreflex.membraneAlive");
    }
  }

  // -------------------------------------------------------------------------
  // PUBLIC: attach (sessionCheck → routeCheck → ready)
  // -------------------------------------------------------------------------
  async function attach() {
    try {
      logProtector("SCANNER_ATTACH_START", { online: isOnline() });

      const identity = await sessionCheck();
      if (!identity) {
        logProtector("SCANNER_ABORTED_UNTRUSTED", {});
        return null;
      }

      if (!hasBootedOnce) {
        hasBootedOnce = true;

        logProtector("SCANNER_FIRST_BOOT_ATTACH_ONLY", {
          pageName: window.Pulse?.pageName || null
        });

        appendSkinReflexEntry("A1_ATTACH_FIRST_BOOT", {
          identity,
          pageName: window.Pulse?.pageName || null
        });

        return {
          identity,
          route: null,
          needsHealing: false,
          healingTier: "none",
          healingVector: null
        };
      }

      const routeInfo = routeCheck();
      const needsHealing = routeInfo?.needsHealing === true;

      logProtector(
        needsHealing
          ? "SCANNER_CONTINUITY_BROKEN"
          : "SCANNER_CONTINUITY_OK",
        routeInfo
      );

      appendSkinReflexEntry("A1_ATTACH_CONTINUITY", {
        identity,
        routeInfo,
        needsHealing
      });

      return {
        identity,
        route: routeInfo,
        needsHealing,
        healingTier: needsHealing ? "micro" : "none",
        healingVector: needsHealing ? "routeContinuity" : null
      };
    } catch (err) {
      safeSpine(err, "skinreflex.attachScanner");
      return null;
    }
  }

  // -------------------------------------------------------------------------
  // PUBLIC: identity + continuity helpers (v20 API-compatible)
  // -------------------------------------------------------------------------
  async function identity() {
    return sessionCheck();
  }

  function continuity() {
    return routeCheck();
  }

  // -------------------------------------------------------------------------
  // PUBLIC: dualband nervous entry helpers (v20 send contract)
  // -------------------------------------------------------------------------
  async function getAuth(jwtToken) {
    try {
      logProtector("GET_AUTH", {});
      const result = await route("auth", {
        jwtToken,
        reflexOrigin: "SkinReflex",
        layer: "A1",
        binaryAware: true,
        dualBand: true,
        presenceAware: true,
        sendContract: "PulseSend-v20"
      });

      appendSkinReflexEntry("A1_GET_AUTH", {
        jwtTokenPresent: !!jwtToken,
        result
      });

      return result;
    } catch (err) {
      safeSpine(err, "skinreflex.getAuth");
      return null;
    }
  }

  async function getHook(name, payload = {}) {
    try {
      logProtector("GET_HOOK", { name });
      const result = await route("hook", {
        name,
        payload,
        reflexOrigin: "SkinReflex",
        layer: "A1",
        binaryAware: true,
        dualBand: true,
        presenceAware: true,
        sendContract: "PulseSend-v20"
      });

      appendSkinReflexEntry("A1_GET_HOOK", {
        name,
        payload,
        result
      });

      return result;
    } catch (err) {
      safeSpine(err, "skinreflex.getHook");
      return null;
    }
  }

  async function getMap(mapName) {
    try {
      logProtector("GET_MAP", { mapName });
      const result = await route("map", {
        mapName,
        reflexOrigin: "SkinReflex",
        layer: "A1",
        binaryAware: true,
        dualBand: true,
        presenceAware: true,
        sendContract: "PulseSend-v20"
      });

      appendSkinReflexEntry("A1_GET_MAP", {
        mapName,
        result
      });

      return result;
    } catch (err) {
      safeSpine(err, "skinreflex.getMap");
      return null;
    }
  }

  async function callHelper(helperName, payload = {}) {
    try {
      logProtector("CALL_HELPER", { helperName });
      const result = await route("helper", {
        helperName,
        payload,
        reflexOrigin: "SkinReflex",
        layer: "A1",
        binaryAware: true,
        dualBand: true,
        presenceAware: true,
        sendContract: "PulseSend-v20"
      });

      appendSkinReflexEntry("A1_CALL_HELPER", {
        helperName,
        payload,
        result
      });

      return result;
    } catch (err) {
      safeSpine(err, "skinreflex.callHelper");
      return null;
    }
  }

  // -------------------------------------------------------------------------
  // INTERNAL: A1 ERROR INTERCEPTOR (v20 drift + healing)
  // -------------------------------------------------------------------------
  function installErrorInterceptor() {
    if (!hasWindow || typeof window.addEventListener !== "function") return;

    window.addEventListener(
      "error",
      async (event) => {
        if (healingInProgress) return;

        const msg = event.message || "";
        const stack = event.error?.stack || "";
        const frames = stack.split("\n").map((s) => s.trim());

        const rawFrames = frames
          .filter((f) => f.includes(".js"))
          .map((f) => f.replace(/^at\s+/, ""));

        logProtector("ERROR_INTERCEPTED", { message: msg });

        // A3 Error Spine integration (capture packet for SkinReflexStore)
        let errorPacket = null;
        try {
          errorPacket = PulseUIErrors.normalizeError(
            event.error || msg,
            "skinreflex.window.error"
          );
          PulseUIErrors.broadcast(errorPacket);
        } catch (spineErr) {
          console.warn("[PulseUIErrors] failed to broadcast A1 error:", spineErr);
        }

        const top = rawFrames[0] || "unknown";
        const file = top.split("/").pop().split(":")[0] || "unknown";
        const line = top.split(":")[1] || "unknown";

        const pagePath =
          hasWindow && window.location ? window.location.pathname : null;

        const uiFlowSnapshot = (() => {
          try {
            return typeof getUIFlowSnapshot === "function"
              ? getUIFlowSnapshot()
              : null;
          } catch {
            return null;
          }
        })();

        // Local A1 diagnostics
        (function emitA1LocalDiagnostics() {
          try {
            if (typeof console !== "undefined" && console.groupCollapsed) {
              console.groupCollapsed(
                `%cA1 DIAGNOSTIC — ${msg}`,
                "color:#FF7043; font-weight:bold;"
              );

              console.log("• message:", msg);
              console.log("• file:", file);
              console.log("• line:", line);
              console.log("• top frame:", top);
              console.log("• raw frames:", rawFrames);
              console.log("• page:", pagePath);
              console.log("• layer:", "A1 (SkinReflex)");
              console.log(
                "• note:",
                "LOCAL ONLY — does NOT depend on routing or backend."
              );

              console.groupEnd();
            }
          } catch (err) {
            safeSpine(err, "skinreflex.localDiagnostics");
          }
        })();

        // Route trace via RouteMemory
        let routeTrace = RouteMemory.recall(msg, rawFrames);

        if (!routeTrace) {
          routeTrace = rawFrames.map((frame, index) => {
            const fFile = frame.split("/").pop().split(":")[0];

            return {
              frame,
              file: fFile,
              index,
              label: "A1_FRAME",
              layer: "A1",
              purpose: "Surface observed frame",
              context: "SkinReflex dynamic trace",
              binaryAware: true,
              dualBand: true
            };
          });

          logProtector("ROUTE_TRACE_BUILT_DYNAMIC", {
            frames: routeTrace.length
          });

          RouteMemory.remember(msg, rawFrames, routeTrace, {
            binaryAware: true
          });
        }

        // External resource classifier
        if (isExternal(msg)) {
          logProtector("EXTERNAL_RESOURCE_REQUEST", {
            note: "External resource detected — routing through CNS (v20-Immortal)",
            url: msg
          });

          const memoryEntry = RouteMemory.getEntry(msg, rawFrames) || {};
          const driftSignature =
            memoryEntry.driftSignature || `A1_EXT_${Date.now()}`;

          emitReflexSenseReport({
            message: msg,
            file,
            line,
            frames: rawFrames.length,
            degraded: false,
            healthScore: 1.0,
            tier: "externalResource",
            dnaTag: "A1_SURFACE",
            page: pagePath,
            seq: memoryEntry?.seq || 0,
            binaryAware: true,
            dualBand: true,
            presenceAware: true,
            external: true,
            driftSignature
          });

          appendSkinReflexEntry("A1_EXTERNAL_RESOURCE", {
            message: msg,
            file,
            line,
            frames,
            rawFrames,
            routeTrace,
            page: pagePath,
            uiFlowSnapshot,
            errorPacket,
            driftSignature
          });

          await route("fetchExternalResource", {
            url: msg,
            page: pagePath,
            routeTrace,
            reflexOrigin: "SkinReflex",
            layer: "A1",
            binaryAware: true,
            dualBand: true,
            presenceAware: true,
            external: true,
            driftSignature
          });

          event.preventDefault();
          return;
        }

        // Classification
        let classified = false;

        if (msg.includes("Cannot find module")) {
          logProtector("IMPORT_DEGRADED", {
            note: "Import errors are degradation signals in v20-Immortal",
            details: msg
          });

          RouteMemory.markDegraded(msg, rawFrames, 0.8, true);
          classified = true;
        }

        if (msg.includes("process is not defined")) {
          logProtector("PAGE_ENV_MISMATCH", {
            error: "frontendEnvMismatch",
            hint: "Replace process.env.* with window.PULSE_*"
          });

          RouteMemory.markDegraded(msg, rawFrames, 0.7, false);
          classified = true;
        }

        // PulseCORS classifier
        if (
          msg.includes("CORS") ||
          msg.includes("cors") ||
          msg.includes("Access-Control-Allow") ||
          msg.includes("blocked by CORS") ||
          msg.includes("No 'Access-Control-Allow-Origin'")
        ) {
          logProtector("PULSECORS_REQUIRED", {
            error: "corsMismatch",
            hint: "Use PulseCORS instead of default browser CORS.",
            note: "PulseCORS is the unified v20 IMMORTAL CORS layer."
          });

          RouteMemory.markDegraded(msg, rawFrames, 0.72, false);
          classified = true;

          await route("PulseCORS", {
            message: msg,
            frames: rawFrames,
            page: pagePath,
            reflexOrigin: "SkinReflex",
            layer: "A1",
            binaryAware: true,
            dualBand: true,
            presenceAware: true
          });
        }

        if (msg.includes("Maximum call stack size exceeded")) {
          logProtector("PAGE_RECURSION_LOOP", {
            error: "pageRecursionLoop",
            details: msg
          });

          RouteMemory.markDegraded(msg, rawFrames, 0.5, false);
          classified = true;
        }

        const memoryEntry = RouteMemory.getEntry(msg, rawFrames) || {};
        const degraded = memoryEntry?.degraded || false;
        const healthScore = memoryEntry?.healthScore ?? 1.0;
        const tier = memoryEntry?.tier || "microDegrade";
        const dnaTag = memoryEntry?.dnaTag || "A1_SURFACE";
        const seq = memoryEntry?.seq || 0;
        const driftSignature =
          memoryEntry?.driftSignature || `A1_ERR_${Date.now()}`;

        emitReflexSenseReport({
          message: msg,
          file,
          line,
          frames: rawFrames.length,
          degraded,
          healthScore,
          tier,
          dnaTag,
          page: pagePath,
          seq,
          binaryAware: true,
          dualBand: true,
          presenceAware: true,
          driftSignature
        });

        // Drift intelligence via PulsePageScanner (v20 packet)
        let structural = null;
        let severity = 0;
        let tooFar = false;
        let lineage = [];
        let moduleModeA = null;
        let moduleModeB = null;
        let exportDrift = null;
        let contract = null;

        try {
          const sourceA = event?.error?.sourceA || "";
          const sourceB = event?.error?.sourceB || "";

          const varsA = PulsePageScanner.extractVars(sourceA);
          const varsB = PulsePageScanner.extractVars(sourceB);

          lineage = PulsePageScanner.detectLineage(varsA, varsB);
          moduleModeA = PulsePageScanner.detectModuleMode(sourceA);
          moduleModeB = PulsePageScanner.detectModuleMode(sourceB);
          exportDrift = PulsePageScanner.detectExportDrift(sourceB, varsB);

          structural = PulsePageScanner.detectStructural(sourceA, sourceB);
          contract = PulsePageScanner.detectContract(sourceA, sourceB);

          severity =
            typeof structural?.severity === "number" ? structural.severity : 0;
          tooFar = severity >= 3;

          const driftPacketContext = {
            event: "page-error-drift-detected",
            message: msg,
            file,
            line,
            frames: rawFrames,
            degraded,
            healthScore,
            tier,
            dnaTag,
            lineage,
            moduleMode: {
              pageA: moduleModeA,
              pageB: moduleModeB
            },
            exportDrift,
            structural,
            contract,
            severity,
            tooFar,
            page: pagePath,
            seq,
            layer: "A1/A2",
            subsystem: "PulsePageScanner",
            binaryAware: true,
            dualBand: true,
            driftSignature
          };

          emitPageScannerIntel(driftPacketContext);

          logProtector("DRIFT_INTEL_EMITTED", {
            lineageCount: lineage.length,
            moduleMixedA: moduleModeA?.mixed,
            moduleMixedB: moduleModeB?.mixed,
            exportMissingESM: exportDrift?.missingESM,
            exportMissingCJS: exportDrift?.missingCJS,
            structuralMismatch: structural?.mismatch,
            structuralSeverity: severity,
            structuralTooFar: tooFar,
            contractMismatch: contract?.mismatch
          });

          appendSkinReflexEntry("A2_DRIFT_INTEL", {
            message: msg,
            file,
            line,
            frames,
            rawFrames,
            degraded,
            healthScore,
            tier,
            dnaTag,
            page: pagePath,
            routeTrace,
            structural,
            lineage,
            moduleModeA,
            moduleModeB,
            exportDrift,
            contract,
            severity,
            tooFar,
            uiFlowSnapshot,
            errorPacket,
            driftSignature
          });
        } catch (intelErr) {
          safeSpine(intelErr, "skinreflex.driftIntel");
        }
      },
      true
    );
  }

  // -------------------------------------------------------------------------
  // PUBLIC API
  // -------------------------------------------------------------------------
  function init() {
    try {
      installErrorInterceptor();
      membraneAlive("init");
    } catch (err) {
      safeSpine(err, "skinreflex.init");
    }
  }

  function onError(err, origin = "manual") {
    try {
      safeSpine(err, `skinreflex.onError.${origin}`);
    } catch (e) {
      // swallow
    }
  }

  return {
    init,
    attach,
    onError,
    route,
    identity,
    continuity,
    getAuth,
    getHook,
    getMap,
    callHelper,
    membraneAlive
  };
}

// ============================================================
//  GLOBAL EXPORTS — MAKE SKINREFLEX + HELPERS AVAILABLE
// ============================================================
try {
  if (typeof window !== "undefined") {

    // Create ONE instance of the organ AND initialize it
    const _skin = createPulseSkinReflex();
    _skin.init(); // ← THIS is what was missing

    // Export the full organ instance
    window.PulseSkinReflex = _skin;

    // Export individual helpers
    window.getHook       = _skin.getHook;
    window.getAuth       = _skin.getAuth;
    window.getMap        = _skin.getMap;
    window.callHelper    = _skin.callHelper;
    window.route         = _skin.route;
    window.identity      = _skin.identity;
    window.continuity    = _skin.continuity;
    window.membraneAlive = _skin.membraneAlive;

    // Optional aliases
    window.PulseGetHook  = _skin.getHook;
    window.PulseRoute    = _skin.route;
    window.PulseMap      = _skin.getMap;
  }
} catch (err) {
  console.error("[SkinReflex] Failed to export globals:", err);
}
