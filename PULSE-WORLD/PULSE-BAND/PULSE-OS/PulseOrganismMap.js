// ============================================================================
// PulseOrganismMap.js — v16‑IMMORTAL‑EVO
// THE JEWEL OF THE ORGANISM — THE GENOME
// ----------------------------------------------------------------------------
// LAWS OF THE ORGANISM:
//   • Any folder starting with "PULSE-" is a system.
//   • Any .js file inside that folder is an organ.
//   • No hardcoded clusters, organs, or pages.
//   • The filesystem IS the organism.
//   • The organism map IS the genome.
//   • All subsystems read from THIS file.
//   • ALL network fetch MUST go through Route API.
//   • Genome must NEVER fetch directly.
//   • Patterns > versions. Naming discipline IS evolution.
// ============================================================================

let fs = null;
let db = null;
let routes = null;
let schema = null;
// eslint-disable-next-line no-unused-vars
let fetchAPI = null;

// ============================================================================
// PREWARM LAYER — Aligns all adapters before organism boot
// ============================================================================
export function prewarmLayer() {
  try {
    db = getDb({ trace: false });
    db.getCollection("prewarm");
    db.getDocument("prewarm", "id");

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
  const log = (msg, data) => trace && console.log(`[aiDeps:db] ${msg}`, data);

  return Object.freeze({
    async getCollection(collection, options = {}) {
      log("getCollection", { collection, options });
      return [];
    },

    async getDocument(collection, id) {
      log("getDocument", { collection, id });
      return null;
    }
  });
}

// ============================================================================
// FILESYSTEM API — Required by aiEvolution
// ============================================================================
export function getFsAPI({ trace = false } = {}) {
  const log = (msg, data) => trace && console.log(`[aiDeps:fs] ${msg}`, data);

  return Object.freeze({
    async getAllFiles() {
      log("getAllFiles");
      return [];
    },

    async getFile(path) {
      log("getFile", { path });
      return null;
    }
  });
}

// ============================================================================
// ROUTE API — NOW FETCH‑AWARE (IMMORTAL v16)
// ============================================================================
export function getRouteAPI({ trace = false } = {}) {
  const log = (msg, data) => trace && console.log(`[aiDeps:routes] ${msg}`, data);

  return Object.freeze({
    async getRouteMap() {
      log("getRouteMap");
      return [];
    },

    async getRoute(routeId) {
      log("getRoute", { routeId });
      return null;
    },

    // IMMORTAL: deterministic route resolution
    async resolve(url) {
      log("resolve", { url });

      return {
        id: "default",
        target: url,
        method: "GET",
        meta: {
          layer: "PulseRouteAPI",
          role: "ROUTE_RESOLUTION",
          version: "16-IMMORTAL-EVO"
        }
      };
    },

    // Perform fetch THROUGH the route
    async fetchThroughRoute(route, options = {}) {
      log("fetchThroughRoute", { route, options });

      try {
        const res = await fetch(route.target, {
          method: options.method || route.method || "GET",
          headers: options.headers || {},
          body: options.body || null,
          redirect: "follow",
          cache: "no-store"
        });

        const text = await res.text();

        return {
          ok: res.ok,
          status: res.status,
          statusText: res.statusText,
          url: res.url,
          headers: Object.fromEntries(res.headers.entries()),
          body: text
        };
      } catch (err) {
        return {
          ok: false,
          error: err?.message || "route_fetch_failed"
        };
      }
    }
  });
}


// ============================================================================
//  SCHEMA API — Required by aiEvolution
// ============================================================================
export function getSchemaAPI({ trace = false } = {}) {
  const log = (msg, data) => trace && console.log(`[aiDeps:schema] ${msg}`, data);

  return Object.freeze({
    async getAllSchemas() {
      log("getAllSchemas");
      return [];
    },

    async getSchema(name) {
      log("getSchema", { name });
      return null;
    }
  });
}

// ============================================================================
// FETCH API — ROUTE‑AWARE, IMMORTAL v16
// ============================================================================
export function getFetchAPI({ trace = false, routes } = {}) {
  const log = (msg, data) => trace && console.log(`[aiDeps:fetch] ${msg}`, data);

  const meta = {
    layer: "PulseFetchAPI",
    role: "NETWORK_ADAPTER",
    version: "16-IMMORTAL-EVO",
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
      zeroMutation: true,
      zeroExternalMutation: true,
      zeroRoutingInfluence: true,
      safeRouteFree: true
    }
  };

  async function fetchViaRoute(url, options = {}) {
    log("fetchViaRoute", { url, options });

    const route = await routes.resolve(url);
    const result = await routes.fetchThroughRoute(route, options);

    return { ...result, meta };
  }

  return Object.freeze({
    fetch: fetchViaRoute,
    meta
  });
}

// ============================================================================
// CACHESTORAGE ORGAN — v16‑IMMORTAL‑EVO
// First‑Frame Freezer, Pattern‑Driven, Self‑Evolving
// ============================================================================
// • Never caches anything with a mind (brains, loggers, monitors, flows, touch, net, overmind, heartbeats).
// • Never caches dashboards, admin, reports, or user‑specific pages.
// • Only caches static shells, static pages, static Pulse frontends, static micro‑chunks.
// • Uses words/patterns, not versions — evolvable by naming discipline.
// ============================================================================
export function getCacheStorageOrgan({ trace = false } = {}) {
  const log = (msg, data) => trace && console.log(`[aiDeps:cache] ${msg}`, data);

  const CACHE_PATTERNS = Object.freeze({
    // Root publish folder: index + static pages + static assets
    rootStatic: /^\/[^\/]+\.(html|css|js|json|png|jpe?g|webp|svg)$/i,

    // Frontend Pulse folders: PULSE* but NOT PULSE-* (Pulse, PulseAdmin, PulseDelivery, etc.)
    pulseFrontend: /^\/PULSE(?!-)[^\/]*\/.*\.(html|css|js|json|png|jpe?g|webp|svg)$/i,

    // Static micro‑chunks (by naming convention)
    microChunks: /micro\-chunk/i
  });

  const EXCLUDE_PATTERNS = Object.freeze({
    // Thinking / reactive / observing organs
    brain: /OSBrain/i,
    logger: /ProofLogger/i,
    monitor: /ProofMonitor/i,
    bridge: /ProofBridge/i,
    flow: /UIFlow/i,
    errors: /UIErrors/i,
    touch: /PULSE\-TOUCH/i,
    net: /PULSE\-NET/i,
    overmind: /Overmind/i,
    heartbeat: /Heartbeat/i,

    // Dynamic / user / backend‑driven
    dashboard: /dashboard/i,
    admin: /admin/i,
    report: /report/i,
    userSpecific: /(profile|wallet|settings|notifications|messages)/i
  });

  function shouldCache(path) {
    const p = path.toLowerCase();

    // Exclusions first — anything with a mind or live data
    for (const key in EXCLUDE_PATTERNS) {
      if (EXCLUDE_PATTERNS[key].test(p)) return false;
    }

    // Inclusions — static, shell, micro‑page, micro‑chunk
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

    const allFiles = await fsAPI.getAllFiles();
    const cache = await caches.open("pulse-immortal-v16");

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
  }

  return Object.freeze({
    shouldCache,
    autoCacheFiles,
    meta: {
      layer: "PulseCacheStorageOrgan",
      role: "FIRST_FRAME_FREEZER",
      version: "16-IMMORTAL-EVO",
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
// SCAN SYSTEMS — Pure FS API
// ============================================================================
async function scanPulseSystems() {
  fs = getFsAPI({ trace: false });

  const allFiles = await fs.getAllFiles();

  const pulseSystems = allFiles
    .filter(f => f.type === "dir" && f.name.startsWith("PULSE-"))
    .map(f => ({
      name: f.name,
      path: f.path
    }));

  const systems = {};

  for (const system of pulseSystems) {
    const systemFiles = allFiles.filter(f =>
      f.path.startsWith(system.path)
    );

    const organs = systemFiles
      .filter(f => f.type === "file" && f.name.endsWith(".js"))
      .map(f => f.name.replace(".js", ""));

    systems[system.name.toLowerCase()] = {
      root: system.name,
      organs
    };
  }

  return systems;
}

// ============================================================================
// BUILD ORGANISM MAP — The Genome
// ============================================================================
export async function buildPulseOrganismMap(baseDir = "/") {
  const systems = await scanPulseSystems(baseDir);

  const dbAdapter = getDb({ trace: false });
  const fsAdapter = getFsAPI({ trace: false });
  const routesAdapter = getRouteAPI({ trace: false });
  const fetchAdapter = getFetchAPI({ trace: false, routes: routesAdapter });
  const schemaAdapter = getSchemaAPI({ trace: false });
  const cacheOrgan = getCacheStorageOrgan({ trace: false });

  return Object.freeze({
    version: "16‑IMMORTAL‑EVO‑GENOME",
    generatedAt: new Date().toISOString(),
    systems,

    adapters: {
      db: dbAdapter,
      fs: fsAdapter,
      routes: routesAdapter,
      fetch: fetchAdapter,
      schema: schemaAdapter,
      cache: cacheOrgan
    }
  });
}

// ============================================================================
// EXPORT — The Genome (async)
// ============================================================================
export const PulseOrganismMap = await buildPulseOrganismMap("/");

// NOTE: from your boot / SW init, you can do:
// await PulseOrganismMap.adapters.cache.autoCacheFiles(PulseOrganismMap.adapters.fs);
