// ============================================================================
// PulseWorldOrganismMap-v25.js — v25.0‑IMMORTAL‑WORLD‑GENOME++
// THE JEWEL OF THE ORGANISM — THE GENOME
// ----------------------------------------------------------------------------
// LAWS OF THE ORGANISM (v25):
//   • Any folder starting with "PULSE-" is a SYSTEM.
//   • Any .js file inside that folder is an ORGAN.
//   • Any nested PULSE-* folder is a SUBSYSTEM.
//   • No hardcoded clusters, organs, or pages.
//   • The filesystem IS the organism.
//   • The organism map IS the genome.
//   • All subsystems read from THIS file.
//   • ALL network fetch MUST go through Route API.
//   • Genome must NEVER fetch directly (only via Route API adapter).
//   • Patterns > versions. Naming discipline IS evolution.
//   • World-aware: detects PulseWorld, PulseWorldBand, PulseWorldOS, etc.
//   • Evolves automatically as new PULSE-* folders appear.
//   • v25++: organism‑wide, band‑aware, artery‑aware, multi‑instance, drift‑proof,
//            snapshot‑driven, delta‑per‑page, signal‑wired, architect‑aware.
// ----------------------------------------------------------------------------
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝
import {db as firebase} from "./PulseWorldFirebaseGenome-v20.js"
// ⭐ NEW: Import upgraded CSS‑merged signal engine
import { PulseProofSignal, PulseColors, PulseIcons, PulseColorFallback, PulseIconFallback, PulseRoleFallback, PulseRoles,PulseVersion,PulseVersionFallback } from "./PULSE-WORLD-SIGNAL.js";


let fs = null;
let routes = null;
let schema = null;
let fetchAPI = null;

console.log("ORGANISMMAP v25-ImmortalPlus");

const G =
  (typeof window !== "undefined" && window) ||
  (typeof globalThis !== "undefined" && globalThis) ||
  (typeof self !== "undefined" && self) ||
  (typeof global !== "undefined" && global) ||
  {};
const g = G;
// ============================================================================
// UNIVERSAL TIMESTAMP (Shadow or Admin)
// ============================================================================

const Timestamp =
  (G.firebaseAdmin && G.firebaseAdmin.firestore && G.firebaseAdmin.firestore.Timestamp) ||
  (G.Timestamp && G.Timestamp) ||
  null;

// ============================================================================
// UNIVERSAL ADMIN (Shadow or Admin)
// ============================================================================

const admin =
  (G.firebaseAdmin && G.firebaseAdmin) ||
  (G.admin && G.admin) ||
  null;

// ============================================================================
// UNIVERSAL DB (Shadow DB ALWAYS wins)
// ============================================================================
const db =
  (G.db && G.db) ||                 // Shadow DB (v25++)
  (admin && admin.firestore && admin.firestore()) || // Admin fallback
  null;

// ============================================================================
// UNIVERSAL LOGGING
// ============================================================================

const dblog =
  (G.log && G.log) ||
  console.log;

const dberror =
  (G.error && G.error) ||
  console.error;
  
const fetchFn =
  (G.fetchfn && typeof G.fetchfn === "function" && G.fetchfn) ||   // Shadow fetch alias
  (G.fetch && typeof G.fetch === "function" && G.fetch) ||         // Global broadcasted Shadow.fetch
  null;
const C_ID   = "color:#26A69A; font-weight:bold; font-family:monospace;"; // Cyan
const C_OK   = "color:#00FF9C; font-family:monospace;";                   // Neon Green
const C_INFO = "color:#E8F8FF; font-family:monospace;";                   // White
const C_WARN = "color:#FFE066; font-family:monospace;";                   // Yellow
const C_ERR  = "color:#FF3B3B; font-weight:bold; font-family:monospace;"; // Red

console.log(
      "%c[PULSE-WORLD-MAP] %c→ %s",
      C_ID, C_INFO, C_OK, "Initialized PULSE-WORLD-MAP"
    );
    
// ============================================================================
// DELTA SYNC ENGINE — Only send changes, not full maps
// ============================================================================
function applyDelta(collection, newData) {
  const key = `firebase_map_${collection}`;
  const raw = localStorage.getItem(key);
  const oldData = raw ? JSON.parse(raw) : [];

  const delta = [];
  const index = new Map(oldData.map(x => [x.id, x]));

  for (const doc of newData) {
    const old = index.get(doc.id);
    if (!old || JSON.stringify(old) !== JSON.stringify(doc)) {
      delta.push(doc);
    }
  }

  if (delta.length > 0) {
    localStorage.setItem(key, JSON.stringify(newData));

    window.dispatchEvent(new CustomEvent("firebase_delta_out", {
      detail: { collection, delta }
    }));
  }

  return delta;
}

// ============================================================================
// PREWARM LAYER — Aligns all adapters before organism boot
// ============================================================================
export function prewarmLayer() {
  try {
    firebase = getDb({ trace: false });
    firebase.getCollection("prewarm");
    firebase.getDocument("prewarm", "id");

    fs = getFsAPI({ trace: false });
    fs.getAllFiles();
    fs.getFile("/prewarm");

    routes = getRouteAPI({ trace: false });
    routes.getRouteMap();
    routes.getRoute("prewarm");

    schema = getSchemaAPI({ trace: false });
    schema.getAllSchemas();
    schema.getSchema("prewarm");

    fetchAPI = getFetchAPI({ trace: false, routes });

  } catch (err) {
    console.error("[OrganismMap:Prewarm] Failed:", err);
  }
}


// ============================================================================
// DATABASE API — Firestore/SQL/KV Compatible Adapter
// ============================================================================
export function getDb({ trace = false } = {}) {
  const log = (msg, data) => trace && console.log(`[OrganismMap:db] ${msg}`, data);

  function read(collection) {
    const raw = localStorage.getItem(`firebase_map_${collection}`);
    if (!raw) return [];
    try { return JSON.parse(raw); } catch { return []; }
  }

  function write(collection, arr) {
    const delta = applyDelta(collection, arr);
    return delta;
  }

  return Object.freeze({
    async getCollection(collection) {
      log("getCollection", { collection });
      return read(collection);
    },

    async getDocument(collection, id) {
      log("getDocument", { collection, id });
      return read(collection).find(x => x.id === id) || null;
    },

    async setDocument(collection, id, value) {
      log("setDocument", { collection, id, value });

      const arr = read(collection);
      const idx = arr.findIndex(x => x.id === id);

      if (idx >= 0) arr[idx] = value;
      else arr.push(value);

      return write(collection, arr);
    },

    async deleteDocument(collection, id) {
      log("deleteDocument", { collection, id });

      const arr = read(collection).filter(x => x.id !== id);
      return write(collection, arr);
    }
  });
}


// ============================================================================
// FILESYSTEM API — Required by aiEvolution
// ============================================================================
export function getFsAPI({ trace = false } = {}) {
  const log = (msg, data) => trace && console.log(`[OrganismMap:fs] ${msg}`, data);

  return Object.freeze({
    async getAllFiles() {
      log("getAllFiles");
      const raw = localStorage.getItem("firebase_fs_index");
      return raw ? JSON.parse(raw) : [];
    },

    async getFile(path) {
      log("getFile", { path });
      return localStorage.getItem(`firebase_fs_${path}`) || null;
    },

    async writeFile(path, content) {
      log("writeFile", { path });

      localStorage.setItem(`firebase_fs_${path}`, content);

      window.dispatchEvent(new CustomEvent("firebase_fs_delta_out", {
        detail: { path, content }
      }));

      return true;
    }
  });
}


// ============================================================================
// ROUTE API — FETCH‑AWARE (IMMORTAL v25)
// ============================================================================
export function getRouteAPI({ trace = false } = {}) {
  const log = (msg, data) => trace && console.log(`[OrganismMap:routes] ${msg}`, data);

  function readRoutes() {
    const raw = localStorage.getItem("firebase_map_routes");
    return raw ? JSON.parse(raw) : [];
  }

  return Object.freeze({
    async getRouteMap() {
      log("getRouteMap");
      return readRoutes();
    },

    async getRoute(routeId) {
      log("getRoute", { routeId });
      return readRoutes().find(x => x.id === routeId) || null;
    },

    async resolve(url) {
      log("resolve", { url });
      return {
        id: "default",
        target: url,
        method: "GET",
        meta: { layer: "PulseRouteAPI", version: "25.0-MAP" }
      };
    },

    async fetchThroughRoute(route, options = {}) {
      log("fetchThroughRoute", { route, options });

      try {
        const res = await fetch(route.target, {
          method: options.method || "GET",
          headers: options.headers || {},
          body: options.body || null
        });

        const text = await res.text();
        return { ok: res.ok, status: res.status, body: text };
      } catch (err) {
        return { ok: false, error: err.message };
      }
    }
  });
}


// ============================================================================
// SCHEMA API — Required by aiEvolution
// ============================================================================
export function getSchemaAPI({ trace = false } = {}) {
  const log = (msg, data) => trace && console.log(`[OrganismMap:schema] ${msg}`, data);

  function readSchemas() {
    const raw = localStorage.getItem("firebase_map_schemas");
    return raw ? JSON.parse(raw) : [];
  }

  return Object.freeze({
    async getAllSchemas() {
      log("getAllSchemas");
      return readSchemas();
    },

    async getSchema(name) {
      log("getSchema", { name });
      return readSchemas().find(x => x.name === name) || null;
    }
  });
}


// ============================================================================
// FETCH API — ROUTE‑AWARE, IMMORTAL v25
// ============================================================================
// ============================================================================
// FETCH API — ROUTE‑AWARE, IMMORTAL v25.2
// ============================================================================
export function getFetchAPI({ trace = false, routes } = {}) {
  const log = (msg, data) => trace && console.log(`[aiDeps:fetch] ${msg}`, data);

  const meta = Object.freeze({
    layer: "PulseFetchAPI",
    role: "NETWORK_ADAPTER",
    version: "25.2-IMMORTAL-WORLD",
    evo: {
      deterministicField: true,
      unifiedAdvantageField: true,
      driftProof: true,
      multiInstanceReady: true,
      dualMode: true,
      binaryAware: true,
      symbolicAware: true,
      presenceAware: true,
      bandAware: true,
      worldAware: true,
      zeroMutation: true,
      zeroExternalMutation: true,
      zeroRoutingInfluence: true,
      safeRouteFree: true
    }
  });

  async function fetchViaRoute(url, options = {}) {
    log("fetchViaRoute", { url, options });

    try {
      // Resolve route deterministically
      const route = await routes.resolve(url);

      // Clone options to avoid mutation
      const opts = {
        method: options.method || "GET",
        headers: Object.assign({}, options.headers || {}),
        body: options.body || null
      };

      const result = await routes.fetchThroughRoute(route, opts);
      return Object.freeze({ ...result, meta });

    } catch (err) {
      return Object.freeze({
        ok: false,
        error: err?.message || "fetch_via_route_failed",
        meta
      });
    }
  }

  return Object.freeze({
    fetch: fetchViaRoute,
    meta
  });
}


// ============================================================================
// CACHESTORAGE ORGAN — v25.0‑IMMORTAL‑WORLD
// ============================================================================
// ============================================================================
// CACHESTORAGE ORGAN — v25.2‑IMMORTAL‑WORLD
// ============================================================================
export function getCacheStorageOrgan({ trace = false } = {}) {
  const log = (msg, data) => trace && console.log(`[aiDeps:cache] ${msg}`, data);

  const CACHE_PATTERNS = Object.freeze({
    rootStatic: /^\/[^\/]+\.(html|css|js|json|png|jpe?g|webp|svg)$/i,
    pulseFrontend: /^\/PULSE(?!-)[^\/]*\/.*\.(html|css|js|json|png|jpe?g|webp|svg)$/i,
    microChunks: /micro\-chunk/i
  });

  const EXCLUDE_PATTERNS = Object.freeze({
    brain: /OSBrain/i,
    logger: /ProofLogger/i,
    monitor: /ProofMonitor/i,
    bridge: /ProofBridge/i,
    flow: /UIFlow/i,
    errors: /UIErrors/i,
    touch: /PULSE\-TOUCH/i,
    net: /PULSE\-NET/i,
    world: /PULSE\-WORLD/i,
    band: /PULSE\-WORLD\-BAND/i,
    os: /PULSE\-WORLD\-OS/i,
    overmind: /Overmind/i,
    heartbeat: /Heartbeat/i,
    dashboard: /dashboard/i,
    admin: /admin/i,
    report: /report/i,
    userSpecific: /(profile|wallet|settings|notifications|messages)/i
  });

  function shouldCache(path) {
    const p = path.toLowerCase();

    for (const key in EXCLUDE_PATTERNS) {
      if (EXCLUDE_PATTERNS[key].test(p)) return false;
    }

    for (const key in CACHE_PATTERNS) {
      if (CACHE_PATTERNS[key].test(p)) return true;
    }

    return false;
  }

  async function autoCacheFiles(fsAPI) {
    if (typeof caches === "undefined") {
      log("caches_unavailable", {});
      return;
    }

    try {
      const allFiles = await fsAPI.getAllFiles();
      const cache = await caches.open("pulse-immortal-v25");

      for (const file of allFiles) {
        if (file.type !== "file") continue;
        if (!shouldCache(file.path)) continue;

        try {
          await cache.add(file.path);
          log("cached", file.path);
        } catch (err) {
          log("cache_failed", { file: file.path, err });
        }
      }
    } catch (err) {
      log("autoCacheFiles_failed", err);
    }
  }

  return Object.freeze({
    shouldCache,
    autoCacheFiles,
    meta: {
      layer: "PulseCacheStorageOrgan",
      role: "FIRST_FRAME_FREEZER",
      version: "25.2-IMMORTAL-WORLD",
      evo: {
        patternDriven: true,
        driftProof: true,
        selfEvolving: true,
        staticOnly: true,
        noBrains: true,
        noDashboards: true,
        noUserData: true
      }
    }
  });
}


// ============================================================================
// SYSTEM CLASSIFIER — v25 (WORLD / UI / BAND / OS / ROUTER / PROXY / CORE / GPU / AI / EARN / TECH / etc.)
// ============================================================================
// ============================================================================
// SYSTEM CLASSIFIER — v25.2 IMMORTAL (no behavior changes, just hardened)
// ============================================================================
function classifySystem(system) {
  const name = system.name.toLowerCase();

  const MAP = Object.freeze({
    "pulse-ai":          { layer: "ai",            kind: "ai" },
    "pulse-band":        { layer: "backend",       kind: "band" },
    "pulse-code":        { layer: "specs",         kind: "code" },
    "pulse-core":        { layer: "core",          kind: "core" },
    "pulse-design":      { layer: "design",        kind: "design" },
    "pulse-earn":        { layer: "earn",          kind: "earn" },
    "pulse-engine":      { layer: "engine",        kind: "engine" },
    "pulse-expansion":   { layer: "expansion",     kind: "expansion" },
    "pulse-finality":    { layer: "finality",      kind: "finality" },
    "pulse-gpu":         { layer: "gpu",           kind: "gpu" },
    "pulse-grid":        { layer: "grid",          kind: "grid" },
    "pulse-mesh":        { layer: "mesh",          kind: "mesh" },
    "pulse-os":          { layer: "os",            kind: "os" },
    "pulse-proxy":       { layer: "proxy",         kind: "boundary" },
    "pulse-regioning":   { layer: "regioning",     kind: "regioning" },
    "pulse-router":      { layer: "router",        kind: "router" },
    "pulse-send":        { layer: "send",          kind: "send" },
    "pulse-specs":       { layer: "specs",         kind: "specs" },
    "pulse-shifter":     { layer: "shifter",       kind: "shifter" },
    "pulse-tech":        { layer: "tech",          kind: "tech" },
    "pulse-tools":       { layer: "tools",         kind: "tools" },
    "pulse-translator":  { layer: "translator",    kind: "translator" },
    "pulse-trust":       { layer: "trust",         kind: "trust" },
    "pulse-ui":          { layer: "frontend",      kind: "ui" },
    "pulse-world":       { layer: "world_root",    kind: "world" },
    "pulse-x":           { layer: "core_engine",   kind: "engine" },
    "pulse":             { layer: "security_ui",   kind: "pulse" },
    "pulseadmin":        { layer: "admin_ui",      kind: "admin" },
    "pulsedelivery":     { layer: "delivery_ui",   kind: "delivery" },
    "pulsedirectory":    { layer: "directory_ui",  kind: "directory" },
    "pulserewards":      { layer: "rewards_ui",    kind: "rewards" },
    "netlify":           { layer: "backup",        kind: "backup" }
  });

  return MAP[name] || { layer: "generic", kind: "system" };
}


// ============================================================================
// SCAN SYSTEMS — v25.1 IMMORTAL WORLD GENOME++
// Extract subsystem from folder name + version from FILES
// ============================================================================
// ============================================================================
// IMMORTAL ORGANISM MAP — SCAN ONCE, HYDRATE RUNTIME, REUSE FOREVER
// ============================================================================
export async function scanPulseSystemsOnce() {
  // Already in memory → return hydrated map
  if (window.PulseOrganismMap) return window.PulseOrganismMap;

  const today = new Date().toISOString().slice(0, 10);

  // 1 — Try localStorage (fastest, offline)
  try {
    const raw = localStorage.getItem("PulseOrganismMap_v25");
    if (raw) {
      const snapshot = JSON.parse(raw);
      const hydrated = attachOrganismMapRuntime(snapshot);
      window.PulseOrganismMap = hydrated;
      return hydrated;
    }
  } catch {}

  // 2 — Try Firebase snapshot
  try {
    const fb = await firebase.get("pulse_organism_snapshot_v26");
    if (fb && fb.date === today) {
      const snapshot = fb.snapshot;
      const hydrated = attachOrganismMapRuntime(snapshot);

      window.PulseOrganismMap = hydrated;
      localStorage.setItem("PulseOrganismMap_v25", JSON.stringify(snapshot));

      return hydrated;
    }
  } catch {}

  // 3 — Build fresh snapshot (full genome scan)
  const snapshot = await buildPulseOrganismSnapshotV26();
  const hydrated = attachOrganismMapRuntime(snapshot);

  // Save to Firebase
  try {
    await firebase.set("pulse_organism_snapshot_v26", {
      date: today,
      snapshot
    });
  } catch {}

  // Save to localStorage
  try {
    localStorage.setItem("PulseOrganismMap_v25", JSON.stringify(snapshot));
  } catch {}

  // Save globally
  window.PulseOrganismMap = hydrated;
  return hydrated;
}



// ============================================================================
// v25++ GENOME SNAPSHOT — ONE REAL SCAN, REUSED FOREVER
// ============================================================================

export async function buildPulseOrganismSnapshotV26() {
  const fs = getFsAPI({ trace: false });

  async function findPulseWorldRoot(fs) {
    let cwd = await fs.cwd();
    const parts = cwd.split("/").filter(Boolean);

    while (parts.length > 0) {
      if (parts[parts.length - 1] === "PULSE-WORLD") {
        return "/" + parts.join("/");
      }
      parts.pop();
    }

    return "/PULSE-WORLD";
  }

  const root = await findPulseWorldRoot(fs);
  const allFiles = await fs.getAllFiles(root);

  const systems = {};
  const fileToMeta = {};
  const htmlRoutes = {};
  const jsRoutes = {};

  const pulseSystems = allFiles.filter(
    f => f.type === "dir" && f.name.startsWith("PULSE-")
  );

  for (const system of pulseSystems) {
    const systemFiles = allFiles.filter(f => f.path.startsWith(system.path));

    const organs = systemFiles
      .filter(f => f.type === "file" && f.name.endsWith(".js"))
      .map(f => f.name.replace(".js", ""));

    const subsystem = system.name.replace(/^PULSE-/, "").toLowerCase();
    const version = detectVersionFromFiles(systemFiles);
    const classification = classifySystem(system);

    const sysKey = system.name.toLowerCase();
    systems[sysKey] = {
      root: system.name,
      path: system.path,
      layer: classification.layer,
      kind: classification.kind,
      subsystem,
      version,
      organs
    };

    for (const file of systemFiles) {
      fileToMeta[file.path] = {
        subsystem,
        version,
        color: PulseColors[subsystem] || PulseColorFallback,
        icon: PulseIcons[subsystem] || PulseIconFallback
      };
    }
  }

  const htmlFiles = allFiles.filter(f => f.name.endsWith(".html"));
  for (const file of htmlFiles) {
    const html = await fs.readFile(file.path);
    htmlRoutes[file.name.replace(".html", "")] = extractRoutesFromHTML(html);
  }

  const jsFiles = allFiles.filter(f => f.name.endsWith(".js"));
  for (const file of jsFiles) {
    const js = await fs.readFile(file.path);
    jsRoutes[file.name.replace(".js", "")] = extractRoutesFromJS(js);
  }

  return {
    epoch: Date.now(),
    hour: new Date().toISOString().slice(0, 13),
    version: "v26.5-GENOME",
    systems,
    fileToMeta,
    htmlRoutes,
    jsRoutes
  };
}
// ============================================================================
// ATTACH RUNTIME — v25.2 IMMORTAL
// Turns a pure JSON snapshot into a living OrganismMap
// ============================================================================
export function attachOrganismMapRuntime(snapshot) {
  // Clone snapshot so we can attach runtime methods
  const map = Object.assign({}, snapshot);

  // ------------------------------------------------------------
  // SIGNAL BUS — Touch → OrganismMap
  // ------------------------------------------------------------
  map.signal = function (evt) {
    if (!evt || typeof evt !== "object") return;

    switch (evt.type) {
      case "touch_prewarm":
        this.handleTouchPrewarm(evt);
        break;
    }
  };

  // ------------------------------------------------------------
  // TOUCH PREWARM HANDLER
  // ------------------------------------------------------------
  map.handleTouchPrewarm = function (evt) {
    try {
      this.prewarm(evt.page, evt.region, evt.mode);
    } catch {}
  };

  // ------------------------------------------------------------
  // PREWARM LOGIC — backend/offline warmup
  // ------------------------------------------------------------
  map.prewarm = function (page, region, mode) {
    try {
      // Warm identity
      this._lastIdentity =
        this.identitiesByPath?.[`/PULSE/${page}.html`] || null;

      // Warm UI page
      this._lastUI = this.systems?.ui?.pages?.[page] ||
                     this.systems?.pulse_ui?.pages?.[page] ||
                     null;

      // Warm port routing
      const identity = this._lastIdentity;
      if (identity?.IDENTITY_META?.PORT_IDENTITY) {
        const port = identity.IDENTITY_META.PORT_IDENTITY.portName;
        this._lastPort = this.portSystems?.[port] || null;
      }

      // Warm advantage hints
      this._lastAdvantage = { page, region, mode };

    } catch {}
  };

  // ------------------------------------------------------------
  // EXPORT SNAPSHOT TO LOCALSTORAGE
  // ------------------------------------------------------------
  map.exportToLocalStorage = function () {
    try {
      localStorage.setItem(
        "PulseOrganismMap_v25",
        JSON.stringify(snapshot)
      );
    } catch {}
  };

  // ------------------------------------------------------------
  // IDENTITY RESOLVER (runtime)
  // ------------------------------------------------------------
  map.resolveIdentity = function (metaUrl) {
    try {
      const normalized = metaUrl.replace("file://", "").split("?")[0];
      return this.identitiesByPath?.[normalized] || null;
    } catch {
      return null;
    }
  };

  return map;
}


async function savePerSystemSnapshots(snapshot) {
  const shadow = window.PulseWorldFirebaseShadow;
  if (!shadow) return;

  const { systems, fileToMeta, htmlRoutes, jsRoutes } = snapshot;

  for (const sysKey of Object.keys(systems)) {
    const sys = systems[sysKey];

    const filteredFiles = {};
    for (const [path, meta] of Object.entries(fileToMeta)) {
      if (meta.subsystem === sys.subsystem) filteredFiles[path] = meta;
    }

    const filteredHTML = {};
    for (const [page, routes] of Object.entries(htmlRoutes)) {
      if (page.toLowerCase().includes(sys.subsystem))
        filteredHTML[page] = routes;
    }

    const filteredJS = {};
    for (const [page, routes] of Object.entries(jsRoutes)) {
      if (page.toLowerCase().includes(sys.subsystem))
        filteredJS[page] = routes;
    }

    const sysSnapshot = {
      epoch: Date.now(),
      hour: new Date().toISOString().slice(0, 13),
      system: sysKey,
      meta: sys,
      files: filteredFiles,
      htmlRoutes: filteredHTML,
      jsRoutes: filteredJS
    };

    try {
      await shadow.saveSystemSnapshot(sysKey, sysSnapshot);
    } catch {}
  }
}


function extractRoutesFromHTML(html) {
  const routes = new Set();

  html.replace(/href="([^"]+\.html)"/gi, (_, href) =>
    routes.add(href.replace(".html", ""))
  );

  html.replace(/href='([^']+\.html)'/gi, (_, href) =>
    routes.add(href.replace(".html", ""))
  );

  html.replace(/data-route="([^"]+)"/gi, (_, r) => routes.add(r));
  html.replace(/route="([^"]+)"/gi, (_, r) => routes.add(r));
  html.replace(/router-link="([^"]+)"/gi, (_, r) => routes.add(r));

  return Array.from(routes);
}


function extractRoutesFromJS(js) {
  const routes = new Set();

  js.replace(/route:\s*["']([^"']+)["']/gi, (_, r) => routes.add(r));
  js.replace(/navigate\(\s*["']([^"']+)["']\s*\)/gi, (_, r) => routes.add(r));
  js.replace(/router\.push\(\s*["']([^"']+)["']\s*\)/gi, (_, r) => routes.add(r));
  js.replace(/goTo\(\s*["']([^"']+)["']\s*\)/gi, (_, r) => routes.add(r));

  return Array.from(routes);
}


function detectVersionFromFiles(files) {
  let detected = null;

  for (const file of files) {
    const match = file.name.match(/v(\d+(\.\d+)?)/i);
    if (match) {
      const v = parseFloat(match[1]);
      if (!detected || v > detected) detected = v;
    }
  }

  return detected ? `v${detected}` : "v16";
}



// ============================================================================
// v25++ RUNTIME GENOME ACCESSOR — SYNC ONLY, EVERY PAGE
// ============================================================================

export function getPulseOrganismMapV25() {
  if (window.PulseOrganismMapV25) return window.PulseOrganismMapV25;

  const snapshot = window.__PULSE_ORGANISM_SNAPSHOT__;
  if (!snapshot) {
    console.error("[OrganismMap:v25++] Missing organism snapshot.");
    throw new Error("PulseOrganismSnapshotMissing");
  }

  const { systems, fileToMeta } = snapshot;

  const map = {
    systems,
    fileToMeta,

    lookup(fileUrl) {
      return this.fileToMeta[fileUrl] || this.defaultMeta;
    },

    resolveCaller(stack) {
      try {
        const lines = stack.split("\n");
        for (const line of lines) {
          const match = line.match(/(file:\/\/[^\s)]+)/);
          if (match) return this.lookup(match[1]);
        }
      } catch {}
      return this.defaultMeta;
    },

    defaultMeta: {
      subsystem: "legacy",
      version: "v24.0",
      color: PulseColorFallback,
      icon: PulseIconFallback
    }
  };

  window.PulseOrganismMapV25 = map;
  return map;
}


// ============================================================================
// v25++ PAGE DELTA ENGINE — ONLY WHAT THIS PAGE NEEDS
// ============================================================================

export function getPageOrganismDeltaV25(pageId) {
  const organism = getPulseOrganismMapV25();
  const id = String(pageId || "").toLowerCase();

  const systems = Object.values(organism.systems).filter(sys =>
    id.includes(sys.subsystem) || id.includes(sys.root.toLowerCase())
  );

  return { systems };
}


// ============================================================================
// v25++ SIGNAL BUS — NORMALIZED, WORLD-AWARE
// ============================================================================

function normalizeSignalName(name) {
  return String(name || "")
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9_]/g, "_");
}

export function createPulseSignalBusV25() {
  const listeners = new Map();

  function on(signalName, handler) {
    const name = normalizeSignalName(signalName);
    if (!name || typeof handler !== "function") return;

    if (!listeners.has(name)) listeners.set(name, new Set());
    listeners.get(name).add(handler);
  }

  function emit(signalName, payload) {
    const name = normalizeSignalName(signalName);
    const set = listeners.get(name);
    if (set) {
      for (const fn of set) {
        try {
          fn(payload || { name, payload: null });
        } catch (err) {
          console.error("[PulseSignalBus:v25] handler error", name, err);
        }
      }
    }

    const wildcard = listeners.get("*");
    if (wildcard) {
      for (const fn of wildcard) {
        try {
          fn({ name, payload });
        } catch (err) {
          console.error("[PulseSignalBus:v25] wildcard handler error", name, err);
        }
      }
    }
  }

  function clearAll() {
    listeners.clear();
  }

  return { on, emit, clearAll };
}

window.PulseSignalBus = window.PulseSignalBus || createPulseSignalBusV25();

// ============================================================================
// v25++ LISTENER ENGINE — AUTO WIRES ORGANS FROM GENOME
// ============================================================================

export function buildOrganismListenersV25() {
  const organism = getPulseOrganismMapV25();
  const bus = window.PulseSignalBus;

  // Reset listeners safely
  bus.clearAll?.();

  const registered = new Set();

  Object.entries(organism.systems).forEach(([systemKey, system]) => {
    system.organs.forEach(organName => {
      const bootSignal = normalizeSignalName(
        `${system.subsystem}_${organName}_BOOT`
      );

      if (registered.has(bootSignal)) return;
      registered.add(bootSignal);

      bus.on(bootSignal, () => {
        let module =
          window[organName] ||
          window[systemKey] ||
          window[organName.replace(/[^a-zA-Z0-9]/g, "")] ||
          null;

        try {
          if (module?.boot) {
            module.boot();
          } else {
            bus.emit("UNKNOWN_ORGAN_BOOT", {
              systemKey,
              organName,
              signal: bootSignal
            });
          }
        } catch (err) {
          bus.emit("ORGAN_BOOT_ERROR", {
            systemKey,
            organName,
            signal: bootSignal,
            error: err?.message || "boot_failed"
          });
        }
      });
    });
  });

  // Wildcard listener — hardened
  bus.on("*", ({ name }) => {
    const n = String(name || "").toUpperCase();

    const known = Object.values(organism.systems).some(sys =>
      sys.organs.some(organ => n.includes(organ.toUpperCase()))
    );

    if (!known && window.FrontendArchitect?.handleUnknownSignal) {
      window.FrontendArchitect.handleUnknownSignal({ signal: n });
    }
  });
}


// ============================================================================
// v25++ ARCHITECT LAYER — SELF-DIAGNOSTIC ORGANISM
// ============================================================================

window.FrontendArchitect = window.FrontendArchitect || {
  handleUnknownSignal({ signal }) {
    console.warn(`⚠️ [Architect] Unknown signal not in genome: ${signal}`);
  },

  handleMissingPage(pageId) {
    console.warn(`⚠️ [Architect] Page missing from genome: ${pageId}`);
  },

  handleGenomeDrift(snapshot) {
    console.warn("⚠️ [Architect] Genome drift detected:", snapshot?.epoch);
  },

  handleOrganError({ systemKey, organName, error }) {
    console.error(
      `❌ [Architect] Organ boot error in ${systemKey}/${organName}: ${error}`
    );
  }
};


// ============================================================================
// v25++ BOOT ENTRYPOINT — CALL THIS ON FIRST PAGE
// ============================================================================

export async function bootOrganismGenomeV25() {
  const snapshot = await buildPulseOrganismSnapshotV26();

  // Save snapshot globally for sync access
  window.__PULSE_ORGANISM_SNAPSHOT__ = snapshot;

  // Hydrate runtime map
  getPulseOrganismMapV25();

  // Wire signals → organs
  buildOrganismListenersV25();
}


// ============================================================================
// IDENTITY GENERATION ENGINE — v25‑IMMORTAL‑WORLD‑GENOME++
// ----------------------------------------------------------------------------
// Same 7 layers, upgraded version/epoch + evo flags.
// ============================================================================
function toConstName(name) {
  return String(name || "")
    .replace(/\.js$/i, "")
    .replace(/[^a-zA-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .toUpperCase();
}

function toTitleName(name) {
  return String(name || "")
    .replace(/\.js$/i, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, c => c.toUpperCase());
}


// ============================================================================
// ORGAN IDENTITY BUILDER — v25.1 IMMORTAL WORLD GENOME++
// ============================================================================

function extractSubsystem(systemKey) {
  return systemKey
    .replace(/^pulse-/, "")
    .replace(/-v\d+(\.\d+)?$/, "");
}

function extractVersion(systemKey) {
  const match = systemKey.match(/v(\d+(\.\d+)?)/);
  return match ? `v${match[1]}` : "v25.0";
}

function buildOrganIdentity({ systemKey, system, organName, portName, handler }) {
  const organId = `${systemKey}/${organName}`;
  const constName = toConstName(organName);
  const titleName = toTitleName(organName);

  const layer = system.layer || "generic";
  const roleConst = `${constName}_ORGAN`;

  const subsystem = system.subsystem;
  const rawVersion = system.version;
  const version = `${rawVersion}-IMMORTAL-WORLD-GENOME++`;

  // ---------------------------------------------------------------------------
  // PORT IDENTITY — v26 IMMORTAL SIGNALPORT
  // ---------------------------------------------------------------------------
  const canonicalPort = (
    portName ||
    organName ||
    subsystem ||
    systemKey
  )
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");

  const aliasSet = new Set(
    [
      canonicalPort,
      portName,
      subsystem,
      systemKey,
      organName,
      organName?.toLowerCase(),
      systemKey?.replace(/^pulse-/, "")
    ]
      .filter(Boolean)
      .map(a => a.toLowerCase().replace(/[^a-z0-9]/g, ""))
  );

  const PORT_IDENTITY = Object.freeze({
    portName: canonicalPort,
    aliases: Object.freeze([...aliasSet]),
    handler: null, // runtime only — NEVER stored in snapshot
    route: Object.freeze({
      subsystem,
      systemKey,
      organName,
      canonicalPort
    }),
    capabilities: Object.freeze({
      deterministic: true,
      driftProof: true,
      pureCompute: true,
      zeroNetwork: true,
      zeroFilesystem: true,
      zeroMutationOfInput: true,
      worldAware: true,
      bandAware: true
    }),
    contract: Object.freeze({
      purpose: `Port for organ ${organName} in subsystem ${subsystem}.`,
      never: Object.freeze([
        "introduce randomness",
        "mutate external organs",
        "depend on wall-clock time",
        "break deterministic routing"
      ]),
      always: Object.freeze([
        "route deterministically",
        "respect organ identity",
        "emit inspectable state only",
        "remain drift-proof"
      ])
    })
  });

  // ---------------------------------------------------------------------------
  // IDENTITY META
  // ---------------------------------------------------------------------------
  const IDENTITY_META = Object.freeze({
    subsystem,
    version,
    role: `${subsystem.toUpperCase()} SUBSYSTEM`,
    icon: "🔹",
    color: "#4DD0E1",
    PORT_IDENTITY
  });

  // ---------------------------------------------------------------------------
  // 1) PulseRole
  // ---------------------------------------------------------------------------
  const PulseRole = Object.freeze({
    type: "Organ",
    subsystem,
    layer,
    version: rawVersion,
    identity: organId,
    evo: Object.freeze({
      driftProof: true,
      deterministicField: true,
      futureEvolutionReady: true,
      immortalityEpoch: true,
      environmentAgnostic: true,
      multiInstanceReady: true,
      windowAware: true,
      packetAware: true,
      arteryAware: true,
      prewarmAware: true,
      worldAware: true,
      bandAware: true
    })
  });

  // ---------------------------------------------------------------------------
  // 2) OrganMeta
  // ---------------------------------------------------------------------------
  const OrganMeta = Object.freeze({
    layer,
    role: roleConst,
    version,
    identity: organId,
    system: systemKey,
    organ: organName,
    subsystem,
    IDENTITY_META,
    evo: Object.freeze({
      deterministic: true,
      driftProof: true,
      binaryAware: true,
      symbolicAware: true,
      dualBand: true,
      registryAware: true,
      evolutionAware: true,
      multiInstanceReady: true,
      epoch: version,
      worldAware: true,
      bandAware: true
    }),
    contract: Object.freeze({
      purpose: `Organ ${titleName} within system ${systemKey} at layer ${layer}.`,
      never: Object.freeze([
        "override global safety",
        "mutate external organs directly",
        "introduce randomness",
        "depend on wall-clock time"
      ]),
      always: Object.freeze([
        "remain deterministic",
        "respect organism topology",
        "respect organism contracts",
        "emit inspectable state only"
      ])
    })
  });

  // ---------------------------------------------------------------------------
  // 3) pulseRole
  // ---------------------------------------------------------------------------
  const pulseRole = `ai.organism.${organName}`;

  // ---------------------------------------------------------------------------
  // 4) surfaceMeta
  // ---------------------------------------------------------------------------
  const surfaceMeta = Object.freeze({
    id: organId,
    layer,
    role: roleConst.toLowerCase(),
    version,
    identity: organId,
    subsystem,
    IDENTITY_META
  });

  // ---------------------------------------------------------------------------
  // 5) pulseLoreContext
  // ---------------------------------------------------------------------------
  const pulseLoreContext = Object.freeze({
    page: organId,
    organ: titleName.replace(/\s+/g, ""),
    layer,
    tier: "Immortal-World-Genome-v25",
    description: `Organ ${titleName} in system ${systemKey}, auto-mapped by PulseWorldOrganismMap v25.`,
    subsystem,
    IDENTITY_META,
    capabilities: {
      deterministic: true,
      driftProof: true,
      pureCompute: true,
      zeroNetwork: true,
      zeroFilesystem: true,
      zeroMutationOfInput: true
    }
  });

  // ---------------------------------------------------------------------------
  // 6) AI_EXPERIENCE_META
  // ---------------------------------------------------------------------------
  const AI_EXPERIENCE_META = Object.freeze({
    identity: organId,
    version,
    layer,
    role: roleConst.toLowerCase(),
    subsystem,
    IDENTITY_META,
    lineage: `${organName}-auto-v25-Immortal-World-Genome`,
    evo: Object.freeze({
      deterministic: true,
      driftProof: true,
      pureCompute: true,
      zeroNetwork: true,
      zeroFilesystem: true,
      zeroMutationOfInput: true,
      binaryAware: true,
      symbolicAware: true,
      dualBand: true,
      worldAware: true,
      bandAware: true
    }),
    contract: Object.freeze({
      always: [],
      never: ["safeRoute", "fetchViaCNS"]
    })
  });

  // ---------------------------------------------------------------------------
  // 7) EXPORT_META
  // ---------------------------------------------------------------------------
  const EXPORT_META = Object.freeze({
    file: `${organName}.js`,
    organ: titleName.replace(/\s+/g, ""),
    identity: organId,
    epoch: Date.now(), // FIXED: must be numeric
    layer,
    role: roleConst,
    version,
    subsystem,
    IDENTITY_META
  });

  // ---------------------------------------------------------------------------
  // FINAL RETURN
  // ---------------------------------------------------------------------------
  return Object.freeze({
    id: organId,
    system: systemKey,
    organ: organName,
    subsystem,
    IDENTITY_META,
    PulseRole,
    OrganMeta,
    pulseRole,
    surfaceMeta,
    pulseLoreContext,
    AI_EXPERIENCE_META,
    EXPORT_META
  });
}


// ============================================================================
// BUILD ORGAN IDENTITIES + PATH MAP — v25.1 IMMORTAL WORLD GENOME++
// ============================================================================
// ============================================================================
// BUILD ORGAN IDENTITIES + PATH MAP — v25.3 IMMORTAL WORLD GENOME++
// ============================================================================
function buildOrganIdentities(systems) {
  const identities = {};
  const identitiesByPath = {};

  for (const systemKey of Object.keys(systems)) {
    const system = systems[systemKey];

    const subsystem = system.subsystem;     // FIXED: use system metadata
    const version = system.version;         // FIXED: use system metadata

    for (const organName of system.organs || []) {
      const identity = buildOrganIdentity({
        systemKey,
        system,
        organName,
        portName: null,
        handler: null
      });

      // Primary key: "pulse-pages/home"
      identities[identity.id] = identity;

      // Convenience alias: "home"
      identities[organName] = identity;

      // Absolute path → identity
      const absPath = `${system.path}/${organName}.js`;
      identitiesByPath[absPath] = identity;
    }
  }

  return Object.freeze({
    identities,
    identitiesByPath
  });
}

// ============================================================================
// BUILD ORGANISM MAP — v25.3 IMMORTAL WORLD GENOME++
// ============================================================================
export async function buildPulseOrganismMap(baseDir = "/") {
  // ⭐ Load full organism snapshot (v26 genome)
  const snapshot = await scanPulseSystemsOnce(baseDir);
  const systems = snapshot.systems;

  // Adapters
  const dbAdapter = getDb({ trace: false });
  const fsAdapter = getFsAPI({ trace: false });
  const routesAdapter = getRouteAPI({ trace: false });
  const fetchAdapter = getFetchAPI({ trace: false, routes: routesAdapter });
  const schemaAdapter = getSchemaAPI({ trace: false });
  const cacheOrgan = getCacheStorageOrgan({ trace: false });

  // Build identities
  const { identities, identitiesByPath } = buildOrganIdentities(systems);

  // ============================================================
  // PORT‑BASED ROUTING TABLES
  // ============================================================
  const portSystems = Object.create(null);
  const portAliases = Object.create(null);

  for (const idKey of Object.keys(identities)) {
    const identity = identities[idKey];
    const port = identity?.IDENTITY_META?.PORT_IDENTITY;
    if (!port) continue;

    const portName = port.portName;
    const aliases = port.aliases || [];

    portSystems[portName] = identity;

    for (const alias of aliases) {
      const key = alias.toLowerCase().replace(/[^a-z0-9]/g, "");
      portAliases[key] = portName;
    }
  }

  // ============================================================
  // IDENTITY RESOLVER
  // ============================================================
  function resolveIdentity(metaUrl) {
    try {
      const normalized = metaUrl.replace("file://", "").split("?")[0];
      return identitiesByPath[normalized] || null;
    } catch {
      return null;
    }
  }

  // ============================================================
  // SIGNAL BUS (Touch → OrganismMap)
  // ============================================================
  function signal(evt) {
    if (!evt || typeof evt !== "object") return;

    switch (evt.type) {
      case "touch_prewarm":
        handleTouchPrewarm(evt);
        break;
    }
  }

  // ============================================================
  // TOUCH PREWARM HANDLER
  // ============================================================
  function handleTouchPrewarm(evt) {
    try {
      organismMap.prewarm(evt.page, evt.region, evt.mode);
    } catch {}
  }

  // ============================================================
  // PREWARM LOGIC (backend/offline)
  // ============================================================
  function prewarm(page, region, mode) {
    try {
      // 1 — Warm identity
      const identity = resolveIdentity(`/PULSE/${page}.html`);
      organismMap._lastIdentity = identity;

      // 2 — Warm UI clusters
      const ui =
        systems?.ui?.pages?.[page] ||
        systems?.pulse_ui?.pages?.[page] ||
        null;

      organismMap._lastUI = ui;

      // 3 — Warm port routing
      if (identity?.IDENTITY_META?.PORT_IDENTITY) {
        const port = identity.IDENTITY_META.PORT_IDENTITY.portName;
        organismMap._lastPort = portSystems[port];
      }

      // 4 — Warm graph
      organismMap._lastGraph = ui?.GRAPH || null;

      // 5 — Warm advantage hints
      organismMap._lastAdvantage = { page, region, mode, identity, ui };

      // 6 — Warm chunks
      organismMap._lastChunks = ui?.CHUNKS || null;

    } catch {}
  }

  // ============================================================
  // EXPORT SNAPSHOT TO LOCALSTORAGE
  // ============================================================
  function exportToLocalStorage() {
    try {
      localStorage.setItem(
        "PulseOrganismMap_v25",
        JSON.stringify(snapshot)
      );
    } catch {}
  }

  // ============================================================
  // FINAL IMMORTAL ORGANISMMAP OBJECT
  // ============================================================
  const organismMap = {
    version: "25.3‑IMMORTAL‑WORLD‑GENOME++",
    generatedAt: new Date().toISOString(),

    systems,
    identities,
    identitiesByPath,

    portSystems,
    portAliases,

    resolveIdentity,
    signal,
    prewarm,
    exportToLocalStorage,

    adapters: {
      db: dbAdapter,
      fs: fsAdapter,
      routes: routesAdapter,
      fetch: fetchAdapter,
      schema: schemaAdapter,
      cache: cacheOrgan
    }
  };

  return Object.freeze(organismMap);
}

// ============================================================================
// EXPORT — IMMORTAL WORLD GENOME v25.3++
// ============================================================================
export const PulseOrganismMap = await buildPulseOrganismMap("/");

export const OrganismIdentity = (metaUrl) =>
  PulseOrganismMap.resolveIdentity(metaUrl);

export async function reportMapError(err, context = {}) {
  try {
    console.error("OrganismMap error", { err, context });
  } catch (e) {
    console.error("[OrganismMap Fallback Error]", err, context);
  }
}

try {
  localStorage.setItem(
    "PulseOrganismMap_v25",
    JSON.stringify(PulseOrganismMap)
  );
  console.log("[OrganismMap] stored in localStorage");
} catch (err) {
  console.warn("[OrganismMap] failed to store in localStorage", err);
}
// ============================================================
// OrganismMap Signal Receiver (v25++ IMMORTAL)
// ============================================================
window.PulseOrganismMap = window.PulseOrganismMapV25 || window.PulseOrganismMap || {};

window.PulseOrganismMap.signal = function (evt) {
  try {
    // ⭐ ALWAYS WRITE TO LOCALSTORAGE FIRST
    localStorage.setItem(
      "PulseOrganismMap_v25",
      JSON.stringify(window.PulseOrganismMap)
    );

    // ⭐ ALWAYS HYDRATE FROM LOCALSTORAGE (SELF-HEAL)
    const raw = localStorage.getItem("PulseOrganismMap_v25");
    if (raw) Object.assign(window.PulseOrganismMap, JSON.parse(raw));

    // ⭐ TOUCH BOOTSTRAP
    if (evt.type === "touch_bootstrap") {
      this.prewarm?.();
      this.ready = true;

      // ⭐ SEND TO DETECTOR (NOT TOUCH DIRECTLY)
      window.PulseDetector?.onMapReady?.({
        type: "map_ready",
        page: evt.page,
        prefix: evt.prefix,
        map: window.PulseOrganismMap
      });

      return;
    }

    // ⭐ TOUCH PREWARM
    if (evt.type === "touch_prewarm") {
      this.deepwarm?.(evt);

      window.PulseDetector?.onMapReady?.({
        type: "map_prewarm_ready",
        page: evt.page,
        prefix: evt.prefix,
        map: window.PulseOrganismMap
      });

      return;
    }

  } catch (err) {
    console.error("[OrganismMap] signal handler failed →", err);
  }
};
