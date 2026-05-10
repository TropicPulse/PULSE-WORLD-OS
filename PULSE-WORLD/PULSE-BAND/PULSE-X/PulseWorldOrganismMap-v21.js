// ============================================================================
// PulseWorldOrganismMap-v21.js — v21‑IMMORTAL‑EVO‑WORLD
// THE JEWEL OF THE ORGANISM — THE GENOME
// ----------------------------------------------------------------------------
// LAWS OF THE ORGANISM (v21):
//   • Any folder starting with "PULSE-" is a SYSTEM.
//   • Any .js file inside that folder is an ORGAN.
//   • Any nested PULSE-* folder is a SUBSYSTEM.
//   • No hardcoded clusters, organs, or pages.
//   • The filesystem IS the organism.
//   • The organism map IS the genome.
//   • All subsystems read from THIS file.
//   • ALL network fetch MUST go through Route API.
//   • Genome must NEVER fetch directly.
//   • Patterns > versions. Naming discipline IS evolution.
//   • World-aware: detects PulseWorld, PulseWorldBand, PulseWorldOS, etc.
//   • Evolves automatically as new PULSE-* folders appear.
//
// v21‑IMMORTAL‑EVO‑WORLD UPGRADE:
//   • This file is now the SINGLE SOURCE OF TRUTH for:
//       – systems
//       – organs
//       – adapters
//       – AND full 7‑layer identity for every organ.
//   • Organ pages no longer carry identity/meta blocks.
//   • One import gives each organ its full identity genome.
//
//   Example organ usage:
//
//     import { OrganismIdentity } from "../PULSE-X/PulseWorldOrganismMap-v21.js";
//     export const META = OrganismIdentity["aiImmunity"]; // or "pulse-os/aiImmunity"
//
// ============================================================================
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝

let fs = null;
let db = null;
let routes = null;
let schema = null;
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
// ROUTE API — FETCH‑AWARE (IMMORTAL v21)
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

    async resolve(url) {
      log("resolve", { url });

      return {
        id: "default",
        target: url,
        method: "GET",
        meta: {
          layer: "PulseRouteAPI",
          role: "ROUTE_RESOLUTION",
          version: "21-IMMORTAL-WORLD"
        }
      };
    },

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
// SCHEMA API — Required by aiEvolution
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
// FETCH API — ROUTE‑AWARE, IMMORTAL v21
// ============================================================================
export function getFetchAPI({ trace = false, routes } = {}) {
  const log = (msg, data) => trace && console.log(`[aiDeps:fetch] ${msg}`, data);

  const meta = {
    layer: "PulseFetchAPI",
    role: "NETWORK_ADAPTER",
    version: "21-IMMORTAL-WORLD",
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
// CACHESTORAGE ORGAN — v21‑IMMORTAL‑WORLD
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

    const allFiles = await fsAPI.getAllFiles();
    const cache = await caches.open("pulse-immortal-v21");

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
      version: "21-IMMORTAL-WORLD",
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
// SYSTEM CLASSIFIER — v21 (WORLD / UI / BAND / OS / ROUTER / PROXY / CORE / GPU / AI / EARN / TECH / etc.)
// ============================================================================
function classifySystem(system) {
  const name = system.name.toLowerCase();

  // AI
  if (name === "pulse-ai")
    return { layer: "ai", kind: "ai" };

  // BAND
  if (name === "pulse-band")
    return { layer: "backend", kind: "band" };

  // CODE (specifications / schema / definitions)
  if (name === "pulse-code")
    return { layer: "specs", kind: "code" };

  // CORE (foundational logic)
  if (name === "pulse-core")
    return { layer: "core", kind: "core" };

  // DESIGN SYSTEM
  if (name === "pulse-design")
    return { layer: "design", kind: "design" };

  // EARN (economic engine)
  if (name === "pulse-earn")
    return { layer: "earn", kind: "earn" };

  // ENGINE (compute engine)
  if (name === "pulse-engine")
    return { layer: "engine", kind: "engine" };

  // EXPANSION (feature expansion layer)
  if (name === "pulse-expansion")
    return { layer: "expansion", kind: "expansion" };

  // FINALITY (transaction finalization)
  if (name === "pulse-finality")
    return { layer: "finality", kind: "finality" };

  // GPU (compute acceleration)
  if (name === "pulse-gpu")
    return { layer: "gpu", kind: "gpu" };

  // GRID (distributed compute grid)
  if (name === "pulse-grid")
    return { layer: "grid", kind: "grid" };

  // MESH (mesh networking)
  if (name === "pulse-mesh")
    return { layer: "mesh", kind: "mesh" };

  // OS (device OS layer)
  if (name === "pulse-os")
    return { layer: "os", kind: "os" };

  // PROXY (boundary layer)
  if (name === "pulse-proxy")
    return { layer: "proxy", kind: "boundary" };

  // REGIONING (geo/region logic)
  if (name === "pulse-regioning")
    return { layer: "regioning", kind: "regioning" };

  // ROUTER (network routing)
  if (name === "pulse-router")
    return { layer: "router", kind: "router" };

  // SEND (send engine)
  if (name === "pulse-send")
    return { layer: "send", kind: "send" };

  // SPECS (schema/specification layer)
  if (name === "pulse-specs")
    return { layer: "specs", kind: "specs" };

  // SHIFTER (data transformation)
  if (name === "pulse-shifter")
    return { layer: "shifter", kind: "shifter" };

  // TECH (device tech layer)
  if (name === "pulse-tech")
    return { layer: "tech", kind: "tech" };

  // TOOLS (developer tools)
  if (name === "pulse-tools")
    return { layer: "tools", kind: "tools" };

  // TRANSLATOR (language engine)
  if (name === "pulse-translator")
    return { layer: "translator", kind: "translator" };

  // TRUST (identity/auth)
  if (name === "pulse-trust")
    return { layer: "trust", kind: "trust" };

  // UI (frontend)
  if (name === "pulse-ui")
    return { layer: "frontend", kind: "ui" };

  // WORLD ROOT (organism root)
  if (name === "pulse-world")
    return { layer: "world_root", kind: "world" };

  // X (core engine)
  if (name === "pulse-x")
    return { layer: "core_engine", kind: "engine" };

  // SECURITY LAYER ENTRANCE UI
  if (name === "pulse")
    return { layer: "security_ui", kind: "pulse" };

  // ADMIN UI
  if (name === "pulseadmin")
    return { layer: "admin_ui", kind: "admin" };

  // DELIVERY UI
  if (name === "pulsedelivery")
    return { layer: "delivery_ui", kind: "delivery" };

  // DIRECTORY UI
  if (name === "pulsedirectory")
    return { layer: "directory_ui", kind: "directory" };

  // REWARDS UI
  if (name === "pulserewards")
    return { layer: "rewards_ui", kind: "rewards" };

  // NETLIFY (deployment/backup)
  if (name === "netlify")
    return { layer: "backup", kind: "backup" };

  // DEFAULT
  return { layer: "generic", kind: "system" };
}

// ============================================================================
// SCAN SYSTEMS — Pure FS API, v21‑IMMORTAL‑WORLD
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

    const classification = classifySystem(system);

    systems[system.name.toLowerCase()] = {
      root: system.name,
      path: system.path,
      layer: classification.layer,
      kind: classification.kind,
      organs
    };
  }

  return systems;
}

// ============================================================================
// IDENTITY GENERATION ENGINE — v21‑IMMORTAL‑EVO‑WORLD
// ----------------------------------------------------------------------------
// This is the major upgrade:
//   • Auto-generates ALL 7 identity layers for EVERY organ discovered.
//   • Centralizes identity in the genome.
//   • Organs become behavior-only files with a single import.
// ----------------------------------------------------------------------------
// 7 LAYERS PER ORGAN:
//   1. PulseRole          — deep biological identity
//   2. OrganMeta          — organ meta block
//   3. pulseRole          — CNS routing identity
//   4. surfaceMeta        — understanding surface identity
//   5. pulseLoreContext   — lore / purpose / story
//   6. AI_EXPERIENCE_META — public-facing experience meta
//   7. EXPORT_META        — devtools export meta
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
// ORGAN IDENTITY BUILDER — v21 IMMORTAL WORLD
// ============================================================================
function buildOrganIdentity({ systemKey, system, organName }) {
  const organId = `${systemKey}/${organName}`;
  const constName = toConstName(organName);
  const titleName = toTitleName(organName);

  const layer = system.layer || "generic";
  const roleConst = `${constName}_ORGAN`;
  const version = "v21-IMMORTAL-EVO-WORLD";

  // 1) PulseRole — deep biological identity
  const PulseRole = Object.freeze({
    type: "Organ",
    subsystem: systemKey,
    layer,
    version,
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
      prewarmAware: true
    })
  });

  // 2) OrganMeta — organ meta block
  const OrganMeta = Object.freeze({
    layer,
    role: roleConst,
    version,
    identity: organId,
    system: systemKey,
    organ: organName,
    evo: Object.freeze({
      deterministic: true,
      driftProof: true,
      binaryAware: true,
      symbolicAware: true,
      dualBand: true,
      registryAware: true,
      evolutionAware: true,
      multiInstanceReady: true,
      epoch: version
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

  // 3) pulseRole — CNS routing identity
  const pulseRole = `ai.organism.${organName}`;

  // 4) surfaceMeta — understanding surface identity
  const surfaceMeta = Object.freeze({
    id: organId,
    layer,
    role: roleConst.toLowerCase(),
    version,
    identity: organId
  });

  // 5) pulseLoreContext — lore / purpose / story
  const pulseLoreContext = Object.freeze({
    page: organId,
    organ: titleName.replace(/\s+/g, ""),
    layer,
    tier: "Immortal-Evo-World",
    description: `Organ ${titleName} in system ${systemKey}, auto-mapped by PulseWorldOrganismMap.`,
    capabilities: {
      deterministic: true,
      driftProof: true,
      pureCompute: true,
      zeroNetwork: true,
      zeroFilesystem: true,
      zeroMutationOfInput: true
    }
  });

  // 6) AI_EXPERIENCE_META — public-facing experience meta
  const AI_EXPERIENCE_META = Object.freeze({
    identity: organName,
    version,
    layer,
    role: roleConst.toLowerCase(),
    lineage: `${organName}-auto-v21-Immortal-Evo-World`,
    evo: Object.freeze({
      deterministic: true,
      driftProof: true,
      pureCompute: true,
      zeroNetwork: true,
      zeroFilesystem: true,
      zeroMutationOfInput: true,
      binaryAware: true,
      symbolicAware: true,
      dualBand: true
    }),
    contract: Object.freeze({
      always: [],
      never: ["safeRoute", "fetchViaCNS"]
    })
  });

  // 7) EXPORT_META — devtools export meta
  const EXPORT_META = Object.freeze({
    file: `${organName}.js`,
    organ: titleName.replace(/\s+/g, ""),
    identity: organId,
    epoch: version,
    layer,
    role: roleConst,
    version
  });

  return Object.freeze({
    id: organId,
    system: systemKey,
    organ: organName,
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
// BUILD ORGAN IDENTITIES + PATH MAP — v21 IMMORTAL WORLD
// ============================================================================
function buildOrganIdentities(systems) {
  const identities = {};
  const identitiesByPath = {};

  for (const systemKey of Object.keys(systems)) {
    const system = systems[systemKey];

    for (const organName of system.organs || []) {
      const identity = buildOrganIdentity({ systemKey, system, organName });

      // Primary key: "pulse-os/aiImmunity"
      identities[identity.id] = identity;

      // Convenience alias: "aiImmunity"
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
// BUILD ORGANISM MAP — v21 IMMORTAL WORLD GENOME
// ============================================================================
export async function buildPulseOrganismMap(baseDir = "/") {
  const systems = await scanPulseSystems(baseDir);

  const dbAdapter = getDb({ trace: false });
  const fsAdapter = getFsAPI({ trace: false });
  const routesAdapter = getRouteAPI({ trace: false });
  const fetchAdapter = getFetchAPI({ trace: false, routes: routesAdapter });
  const schemaAdapter = getSchemaAPI({ trace: false });
  const cacheOrgan = getCacheStorageOrgan({ trace: false });

  const { identities, identitiesByPath } = buildOrganIdentities(systems);

  // Identity resolver
  function resolveIdentity(metaUrl) {
    const normalized = metaUrl.replace("file://", "").split("?")[0];
    return identitiesByPath[normalized] || null;
  }

  return Object.freeze({
    version: "21‑IMMORTAL‑EVO‑WORLD‑GENOME",
    generatedAt: new Date().toISOString(),
    systems,
    identities,
    identitiesByPath,
    resolveIdentity,
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
// EXPORT — IMMORTAL WORLD GENOME
// ============================================================================
export const PulseOrganismMap = await buildPulseOrganismMap("/");

// NEW: OrganismIdentity is now a FUNCTION
export const OrganismIdentity = (metaUrl) =>
  PulseOrganismMap.resolveIdentity(metaUrl);
