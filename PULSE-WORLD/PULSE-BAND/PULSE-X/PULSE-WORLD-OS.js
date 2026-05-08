#!/usr/bin/env node
/**
 * =============================================================================
 *  PULSE-WORLD-OS CONTINUANCE DAEMON — v24-IMMORTAL-WORLD-OS-PAL-PROXY-HELPER
 *  File: PULSE-WORLD-OS.js  (server-side / device-side organism runtime)
 *
 *  PURPOSE:
 *    • Fully autonomous, no user input required — but CLI flags are available.
 *    • Auto-detects ALL folders starting with "PULSE" (PULSEGPU, PULSESEND, PULSE-PAL, etc).
 *    • Treats each folder as an organ in the organism.
 *    • Shows CPU, MEM, heat, advantage, prewarm, prechunk, continuance.
 *    • Detects ROUTE / WORLD / OS / BOOT / PROXY / BINARY / PAL patterns for Pulse‑World‑OS routing.
 *    • Builds a live "boot map" of organs and their inferred boot roles.
 *    • Builds a PulsePal map for companion / persona / media prewarm.
 *    • Evolvable: words, patterns, no hardcoded versions in logic.
 *    • Runs forever on your server or device — dedicated or shared.
 *    • Requires NO .json, NO metadata, NO extra files.
 *
 *  v22-HELPER (baseline):
 *    • CLI flags: --root, --interval, --json, --once, --quiet, --no-color.
 *    • Snapshot export helpers (stdout JSON, or simple file dump if desired).
 *    • “Helper hints” section: shows what to do next (logs, monitoring, etc).
 *    • More explicit AI_EXPERIENCE_META + EXPORT_META for world-OS tooling.
 *    • Addon hooks for future HTTP / IPC / dashboard without changing core loop.
 *
 *  v23-PROXY-HELPER ADDITIONS:
 *    • PROXY MODE AWARENESS (symbolic-only, meta-level).
 *    • WORLD-OS UPGRADE HINTS.
 *    • SNAPSHOT ENRICHMENT (proxySummary + upgradeSummary).
 *    • ADDON HOOKS (global.PulseDaemonProxyTap).
 *
 *  v24-PAL-HELPER ADDITIONS:
 *    • PULSE-PAL AWARENESS:
 *        - Detects PAL / PULSEPAL / PULSE-PAL folders.
 *        - Classifies organs as palCore / palMedia / palWorld if names hint it.
 *        - Emits palRole + palTier + palContinuanceScore per organ.
 *    • PAL PREWARM / PRECHUNK HINTS:
 *        - Treats PulsePal as high-priority prewarm/prechunk target.
 *        - Emphasizes continuance for media-heavy companions (images, personas).
 *    • SNAPSHOT ENRICHMENT:
 *        - Adds palSummary to daemon snapshot.
 *        - Adds palHelperSuggestions for dashboards / humans.
 *        - Adds palHistory + palPersona surfaces when available.
 *    • ADDON HOOKS:
 *        - global.PulseDaemonPalTap for higher-level OS to observe pal state.
 *
 *  STILL ONE-FILE, ZERO-DEPENDENCY, AUTO-ORGANISM DAEMON
 *  NOW UPGRADED TO v24-IMMORTAL-WORLD-OS-PAL-PROXY-HELPER.
 * =============================================================================
 */

"use strict";
const fs   = require("fs");
const path = require("path");
const os   = require("os");

/* =============================================================================
 *  0. AI EXPERIENCE META / EXPORT META
 * ============================================================================= */
const AI_EXPERIENCE_META = {
  identity: "PulseWorldOS.PulseBand.ContinuanceDaemon",
  version: "v24-Immortal-World-OS-Pal-Proxy-Helper",
  layer: "pulse_world_os_daemon",
  role: "organism_runtime + continuance_monitor + world_os_boot_mapper + helper + proxy_mode_observer + pal_prewarmer",
  lineage: "PulseBandDaemon-v5 → PulseDaemon-v16-Immortal-Evo → PulseWorldOS-v21 → PulseWorldOS-v22-Helper → PulseWorldOS-v23-Proxy-Helper → PulseWorldOS-v24-Pal-Proxy-Helper",
  evo: {
    // core daemon traits
    driftProof: true,
    deterministicLoop: true,
    zeroConfig: true,
    zeroMetadata: true,
    filesystemIsOrganism: true,
    autoOrganDiscovery: true,
    continuanceAware: true,
    prewarmAware: true,
    prechunkAware: true,
    advantageAware: true,

    // world-os traits
    worldOSLoader: true,
    deviceDaemon: true,
    routeDiscovery: true,
    bootSequenceAware: true,
    pulseWorldAware: true,
    pulseBandAware: true,
    pulseRouteAware: true,
    pulseEarnAware: true,
    pulseGPUAware: true,

    // helper traits
    cliAware: true,
    snapshotExportAware: true,
    humanHelperHints: true,
    addonHooksAware: true,

    // proxy-mode traits (meta-only, no routing)
    proxyModeAware: true,
    proxyOrganismAware: true,
    binaryProxyAware: true,
    proxyContinuanceAware: true,

    // pal traits
    pulsePalAware: true,
    palPresenceAware: true,
    palMediaPrewarmAware: true,
    palContinuanceAware: true,

    // NEW: pal history + persona traits
    palHistoryAware: true,
    palPersonaAware: true,
    palContinuityAware: true,

    // upgrade traits
    immortalUpgradeAware: true,
    evoTierAware: true,
    maxABAAware: true,

    // future evolution
    futureBootLoaderReady: true,
    futureDeviceMeshReady: true,
    futureDashboardReady: true,
    futureProxyDashboardReady: true,
    futurePalDashboardReady: true,
    futurePalHistoryDashboardReady: true,
    futurePalPersonaDashboardReady: true
  }
};

const EXPORT_META = {
  organ: "PulseDaemon",
  layer: "pulse_world_os_daemon",
  stability: "IMMORTAL-WORLD-OS-PAL-PROXY-HELPER",
  deterministic: true,
  exposes: [
    "start",
    "stop",
    "getOrgans",
    "getSnapshot",
    "getBootMap",
    "getProxySummary",
    "getPalSummary",
    "exportSnapshot",
    "getConfig",

    // NEW:
    "getPalHistory",
    "getPalPersona",
    "getPalHelperSuggestions"
  ],
  sideEffects: "process_interval_only",
  network: "none (local world-os daemon core)",
  cli: {
    flags: [
      "--root <path>       : override root directory (default: script directory)",
      "--interval <ms>     : override tick interval in ms (default: 5000)",
      "--json              : print JSON snapshot each tick (in addition to TUI)",
      "--once              : run discovery + one tick, then exit",
      "--quiet             : suppress TUI, only JSON or nothing",
      "--no-color          : disable ANSI colors",
      "--snapshot-file <f> : write last snapshot to file on each tick"
    ]
  }
};

/* =============================================================================
 *  1. COLORS + ICONS (with --no-color support)
 * ============================================================================= */
let COLORS = {
  reset:  "\x1b[0m",
  bold:   "\x1b[1m",
  dim:    "\x1b[2m",
  red:    "\x1b[31m",
  green:  "\x1b[32m",
  yellow: "\x1b[33m",
  blue:   "\x1b[34m",
  magenta:"\x1b[35m",
  cyan:   "\x1b[36m",
  gray:   "\x1b[90m"
};

const ICONS = {
  band:   "📶",
  gpu:    "🎮",
  send:   "📡",
  grid:   "🧮",
  earn:   "💰",
  cache:  "📦",
  route:  "🛰️",
  vitals: "❤️",
  ok:     "✅",
  warn:   "⚠️",
  err:    "❌",
  heat:   "🔥",
  cold:   "❄️",
  chunk:  "📦",
  bolt:   "⚡",
  evo:    "🧬",
  boot:   "🚀",
  world:  "🌍",
  os:     "🖥️",
  proxy:  "🧩",
  binary: "🔢",
  upgrade:"⬆️",
  pal:    "🧑‍🤝‍🧑"
};

/* =============================================================================
 *  2. CLI PARSING (IMMORTAL-WORLD-OS-HELPER)
 * ============================================================================= */
function parseCliArgs(argv) {
  const args = argv.slice(2);
  const config = {
    rootDir: __dirname,
    tickMs: 5000,
    json: false,
    once: false,
    quiet: false,
    noColor: false,
    snapshotFile: null
  };

  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === "--root" && args[i + 1]) {
      config.rootDir = path.resolve(args[++i]);
    } else if (a === "--interval" && args[i + 1]) {
      const v = parseInt(args[++i], 10);
      if (Number.isFinite(v) && v > 0) config.tickMs = v;
    } else if (a === "--json") {
      config.json = true;
    } else if (a === "--once") {
      config.once = true;
    } else if (a === "--quiet") {
      config.quiet = true;
    } else if (a === "--no-color") {
      config.noColor = true;
    } else if (a === "--snapshot-file" && args[i + 1]) {
      config.snapshotFile = path.resolve(args[++i]);
    } else if (a === "--help" || a === "-h") {
      printHelpAndExit();
    }
  }

  if (config.noColor) {
    COLORS = Object.fromEntries(Object.keys(COLORS).map(k => [k, ""]));
  }

  return config;
}

function printHelpAndExit() {
  console.log("PulseWorld-OS Continuance Daemon — v24-IMMORTAL-WORLD-OS-PAL-PROXY-HELPER");
  console.log("");
  console.log("Usage:");
  console.log("  node PULSE-WORLD-OS.js [options]");
  console.log("");
  console.log("Options:");
  for (const line of EXPORT_META.cli.flags) {
    console.log("  " + line);
  }
  console.log("");
  console.log("Examples:");
  console.log("  node PULSE-WORLD-OS.js");
  console.log("  node PULSE-WORLD-OS.js --root ./PULSE-ORG --interval 2000 --json");
  console.log("  node PULSE-WORLD-OS.js --once --json --snapshot-file ./snapshot.json");
  process.exit(0);
}

/* =============================================================================
 *  3. CONFIGURATION (IMMORTAL-WORLD-OS-PAL-PROXY-HELPER)
 * ============================================================================= */
const CLI_CONFIG = parseCliArgs(process.argv);

const CONFIG = {
  tickMs: CLI_CONFIG.tickMs,
  rootDir: CLI_CONFIG.rootDir,
  thresholds: {
    cpuWarm: 40,
    cpuHot:  75,
    memWarm: 50,
    memHot:  80
  },
  patterns: {
    organPrefix: /^PULSE/i
  },
  bootPatterns: {
    world: /WORLD/i,
    os: /OS/i,
    route: /ROUTE|NET|WORLDROUTE/i,
    boot: /BOOT|LOADER|START/i
  },
  pictures: {
    folder: "_PICTURES",
    palPrefix: /^PulsePal/i,
    extensions: /\.(png|jpg|jpeg|gif|webp|svg)$/i
  },
  proxyPatterns: {
    proxy: /PROXY/i,
    binary: /BINARY/i,
    organism: /ORGANISM/i
  },
  palPatterns: {
    pal: /PAL/i,
    world: /PALWORLD|WORLDPAL/i,
    media: /MEDIA|PIC|IMAGE|PHOTO|AVATAR|SKIN/i
  },
  upgradePatterns: {
    immortal: /IMMORTAL/i,
    evo: /EVO/i,
    max: /MAX/i,
    aba: /ABA/i,
    upgrade: /UPGRADE|UPGRADED|UPGRADING/i
  },
  output: {
    json: CLI_CONFIG.json,
    once: CLI_CONFIG.once,
    quiet: CLI_CONFIG.quiet,
    snapshotFile: CLI_CONFIG.snapshotFile
  }
};

/* =============================================================================
 *  4. PROCESS SNAPSHOT (CPU + MEMORY)
 * ============================================================================= */
function clamp(v, min, max) {
  return v < min ? min : v > max ? max : v;
}
function rand(min, max) {
  return min + Math.random() * (max - min);
}

function getProcessSnapshot() {
  const mem = process.memoryUsage();
  const rssMb = mem.rss / 1024 / 1024;
  const heapMb = mem.heapUsed / 1024 / 1024;
  const heapTotalMb = mem.heapTotal / 1024 / 1024;

  const load = os.loadavg()[0] || 0;
  const cores = os.cpus()?.length || 1;
  const cpuApprox = clamp((load / cores) * 100, 0, 100);

  return {
    rssMb,
    heapMb,
    heapTotalMb,
    cpuApprox: Math.round(cpuApprox),
    timestamp: new Date().toISOString(),
    host: os.hostname(),
    platform: process.platform,
    pid: process.pid
  };
}

/* =============================================================================
 *  5. ORGAN CLASS — Represents a PULSE* folder as an "organ"
 * ============================================================================= */
class PulseOrgan {
  constructor(folderName, instanceId = 1) {
    this.id = folderName;
    this.instanceId = instanceId;

    this.type = this.inferType(folderName);
    
    this.icon = this.resolveIcon(this.type);
    this.color = this.resolveColor(this.type);

    this.lastRun = null;
    this.status = "idle";
    this.cpu = 0;
    this.mem = 0;
    this.advantage = 1.0;
    this.prewarmed = false;
    this.prechunked = false;
    this.continuanceScore = 0;

    // world-os boot / route inference
    this.bootRole = this.inferBootRole(folderName);
    this.routeRole = this.inferRouteRole(folderName);

    // proxy / binary / organism inference
    this.proxyRole = this.inferProxyRole(folderName);
    this.binaryRole = this.inferBinaryRole(folderName);
    this.organismRole = this.inferOrganismRole(folderName);

    // pal inference
    this.palRole = this.inferPalRole(folderName);
    this.palTier = this.computePalTier();
    this.palContinuanceScore = 0;

    // upgrade / evo hints
    this.upgradeHints = this.inferUpgradeHints(folderName);

    // proxy-mode meta (symbolic-only, no routing)
    this.proxyModeHint = this.computeProxyModeHint();
    this.proxyTier = this.computeProxyTier();
    this.proxyContinuanceScore = 0;

    this.meta = {
      type: this.type,
      bootRole: this.bootRole,
      routeRole: this.routeRole,
      proxyRole: this.proxyRole,
      binaryRole: this.binaryRole,
      organismRole: this.organismRole,
      palRole: this.palRole,
      upgradeHints: this.upgradeHints,
      proxyModeHint: this.proxyModeHint,
      proxyTier: this.proxyTier,
      palTier: this.palTier,
      evo: {
        prewarmAware: false,
        prechunkAware: false,
        advantageAware: false,
        worldOSAware: !!this.bootRole || !!this.routeRole,
        proxyAware: !!this.proxyRole || !!this.binaryRole || !!this.organismRole,
        palAware: !!this.palRole
      }
    };
  }

  inferType(name) {
    const upper = name.toUpperCase();
    if (CONFIG.palPatterns.pal.test(upper)) return "pal";
    if (upper.includes("GPU"))    return "gpu";
    if (upper.includes("SEND"))   return "send";
    if (upper.includes("GRID"))   return "grid";
    if (upper.includes("EARN"))   return "earn";
    if (upper.includes("CACHE"))  return "cache";
    if (upper.includes("ROUTE"))  return "route";
    if (upper.includes("VITAL"))  return "vitals";
    if (CONFIG.proxyPatterns.proxy.test(upper))   return "proxy";
    if (CONFIG.proxyPatterns.binary.test(upper))  return "binary";
    return "generic";
  }

  inferBootRole(name) {
    const upper = name.toUpperCase();
    if (CONFIG.bootPatterns.boot.test(upper))   return "boot";
    if (CONFIG.bootPatterns.os.test(upper))     return "os";
    if (CONFIG.bootPatterns.world.test(upper))  return "world";
    return null;
  }

  inferRouteRole(name) {
    const upper = name.toUpperCase();
    if (CONFIG.bootPatterns.route.test(upper))  return "route";
    return null;
  }

  inferProxyRole(name) {
    const upper = name.toUpperCase();
    if (CONFIG.proxyPatterns.proxy.test(upper)) return "proxy";
    return null;
  }

  inferBinaryRole(name) {
    const upper = name.toUpperCase();
    if (CONFIG.proxyPatterns.binary.test(upper)) return "binary";
    return null;
  }

  inferOrganismRole(name) {
    const upper = name.toUpperCase();
    if (CONFIG.proxyPatterns.organism.test(upper)) return "organism";
    return null;
  }

  inferPalRole(name) {
    const upper = name.toUpperCase();
    if (!CONFIG.palPatterns.pal.test(upper)) return null;
    if (CONFIG.palPatterns.world.test(upper)) return "pal-world";
    if (CONFIG.palPatterns.media.test(upper)) return "pal-media";
    return "pal-core";
  }

  inferUpgradeHints(name) {
    const upper = name.toUpperCase();
    return {
      immortal: CONFIG.upgradePatterns.immortal.test(upper),
      evo:      CONFIG.upgradePatterns.evo.test(upper),
      max:      CONFIG.upgradePatterns.max.test(upper),
      aba:      CONFIG.upgradePatterns.aba.test(upper),
      upgrade:  CONFIG.upgradePatterns.upgrade.test(upper)
    };
  }

  computeProxyModeHint() {
    const hasProxy = !!this.proxyRole;
    const hasBinary = !!this.binaryRole;
    const hasOrganism = !!this.organismRole;
    const u = this.upgradeHints;

    if (!hasProxy && !hasBinary && !hasOrganism) return "none";

    if (hasBinary && hasProxy && hasOrganism) return "dual-band-organism";
    if (hasBinary && hasProxy) return "binary-proxy-bridge";
    if (hasProxy && hasOrganism) return "symbolic-proxy-organism";
    if (hasBinary) return "binary-core";
    if (hasProxy) return "proxy-core";
    if (hasOrganism) return "organism-core";

    if (u.immortal || u.max || u.aba) return "immortal-proxy-upgrade";

    return "proxy-related";
  }

  computeProxyTier() {
    const u = this.upgradeHints;
    if (u.immortal && u.max && u.aba) return "immortal-max-aba";
    if (u.immortal && u.evo) return "immortal-evo";
    if (u.immortal) return "immortal";
    if (u.evo || u.upgrade) return "evo";
    return "base";
  }

  computePalTier() {
    const u = this.upgradeHints;
    if (!this.palRole) return "none";
    if (u.immortal && u.max && u.aba) return "immortal-max-aba";
    if (u.immortal && u.evo) return "immortal-evo";
    if (u.immortal) return "immortal";
    if (u.evo || u.upgrade) return "evo";
    return "base";
  }

  resolveIcon(type) {
    return {
      gpu:    ICONS.gpu,
      send:   ICONS.send,
      grid:   ICONS.grid,
      earn:   ICONS.earn,
      cache:  ICONS.cache,
      route:  ICONS.route,
      vitals: ICONS.vitals,
      proxy:  ICONS.proxy,
      binary: ICONS.binary,
      pal:    ICONS.pal
    }[type] || ICONS.band;
  }

  resolveColor(type) {
    return {
      gpu:    COLORS.magenta,
      send:   COLORS.blue,
      grid:   COLORS.yellow,
      earn:   COLORS.green,
      cache:  COLORS.cyan,
      route:  COLORS.gray,
      vitals: COLORS.red,
      proxy:  COLORS.blue,
      binary: COLORS.yellow,
      pal:    COLORS.magenta
    }[type] || COLORS.cyan;
  }

  async tick(globalSnapshot) {
  this.lastRun = new Date();

  const baseCpu = globalSnapshot.cpuApprox;
  const baseMemPct =
    globalSnapshot.heapTotalMb > 0
      ? (globalSnapshot.heapMb / globalSnapshot.heapTotalMb) * 100
      : 0;

  // v24: deterministic-ish jitter per organ (seeded by name + time slice)
  const seedBase = (this.name || this.path || "organ") + this.lastRun.toISOString().slice(0, 16);
  const seedHash = [...seedBase].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 0);
  const seededRand = (min, max, offset = 0) => {
    const x = (seedHash + offset) % 9973;
    const r = (x / 9973);
    return min + r * (max - min);
  };

  const cpuJitter = (min, max, off) => clamp(seededRand(min, max, off), -100, 100);
  const memJitter = (min, max, off) => clamp(seededRand(min, max, off + 101), -100, 100);

  switch (this.type) {
    case "gpu":
      this.cpu = clamp(baseCpu + cpuJitter(-5, 15, 1), 0, 100);
      this.mem = clamp(baseMemPct + memJitter(-5, 10, 2), 0, 100);
      this.advantage = 1.5 + seededRand(0, 1.5, 3);
      this.prewarmed = true;
      this.prechunked = true;
      this.meta.evo.prewarmAware = true;
      this.meta.evo.prechunkAware = true;
      this.meta.evo.advantageAware = true;
      break;

    case "send":
      this.cpu = clamp(baseCpu + cpuJitter(-10, 5, 4), 0, 100);
      this.mem = clamp(baseMemPct + memJitter(-3, 5, 5), 0, 100);
      this.advantage = 1.1 + seededRand(0, 0.5, 6);
      this.prewarmed = true;
      this.prechunked = false;
      this.meta.evo.prewarmAware = true;
      this.meta.evo.advantageAware = true;
      break;

    case "grid":
      this.cpu = clamp(baseCpu + cpuJitter(-5, 20, 7), 0, 100);
      this.mem = clamp(baseMemPct + memJitter(0, 15, 8), 0, 100);
      this.advantage = 1.2 + seededRand(0, 0.8, 9);
      this.prewarmed = true;
      this.prechunked = true;
      this.meta.evo.prewarmAware = true;
      this.meta.evo.prechunkAware = true;
      this.meta.evo.advantageAware = true;
      break;

    case "earn":
      this.cpu = clamp(baseCpu + cpuJitter(-3, 12, 10), 0, 100);
      this.mem = clamp(baseMemPct + memJitter(-1, 8, 11), 0, 100);
      this.advantage = 1.3 + seededRand(0, 2.0, 12);
      this.prewarmed = true;
      this.prechunked = true;
      this.meta.evo.prewarmAware = true;
      this.meta.evo.prechunkAware = true;
      this.meta.evo.advantageAware = true;
      break;

    case "cache":
      this.cpu = clamp(baseCpu + cpuJitter(-5, 8, 13), 0, 100);
      this.mem = clamp(baseMemPct + memJitter(5, 20, 14), 0, 100);
      this.advantage = 1.2 + seededRand(0, 0.5, 15);
      this.prewarmed = true;
      this.prechunked = true;
      this.meta.evo.prewarmAware = true;
      this.meta.evo.prechunkAware = true;
      this.meta.evo.advantageAware = true;
      break;

    case "route":
      this.cpu = clamp(baseCpu + cpuJitter(-5, 10, 16), 0, 100);
      this.mem = clamp(baseMemPct + memJitter(-2, 5, 17), 0, 100);
      this.advantage = 1.1 + seededRand(0, 0.7, 18);
      this.prewarmed = true;
      this.prechunked = false;
      this.meta.evo.prewarmAware = true;
      this.meta.evo.advantageAware = true;
      break;

    case "vitals":
      this.cpu = clamp(baseCpu + cpuJitter(-5, 5, 19), 0, 100);
      this.mem = clamp(baseMemPct + memJitter(-5, 5, 20), 0, 100);
      this.advantage = 1.0 + seededRand(0, 0.3, 21);
      this.prewarmed = true;
      this.prechunked = false;
      this.meta.evo.prewarmAware = true;
      break;

    case "proxy":
    case "binary":
      this.cpu = clamp(baseCpu + cpuJitter(-5, 10, 22), 0, 100);
      this.mem = clamp(baseMemPct + memJitter(-3, 8, 23), 0, 100);
      this.advantage = 1.4 + seededRand(0, 1.2, 24);
      this.prewarmed = true;
      this.prechunked = true;
      this.meta.evo.prewarmAware = true;
      this.meta.evo.prechunkAware = true;
      this.meta.evo.advantageAware = true;
      break;

    case "pal":
      this.cpu = clamp(baseCpu + cpuJitter(-3, 12, 25), 0, 100);
      this.mem = clamp(baseMemPct + memJitter(10, 25, 26), 0, 100);

      // Pulse‑Pal gets highest advantage because it loads media
      this.advantage = 2.0 + seededRand(0, 2.0, 27);

      // Always prewarm + prechunk for instant media load
      this.prewarmed = true;
      this.prechunked = true;

      this.meta.evo.prewarmAware = true;
      this.meta.evo.prechunkAware = true;
      this.meta.evo.advantageAware = true;
      this.meta.evo.palAware = true;
      break;

    default:
      this.cpu = clamp(baseCpu + cpuJitter(-5, 5, 28), 0, 100);
      this.mem = clamp(baseMemPct + memJitter(-5, 5, 29), 0, 100);
      this.advantage = 1.0;
      this.prewarmed = false;
      this.prechunked = false;
      break;
  }

  this.status =
    this.cpu >= CONFIG.thresholds.cpuHot ? "hot" :
    this.cpu >= CONFIG.thresholds.cpuWarm ? "warm" : "running";

  this.continuanceScore = clamp(
    (this.prewarmed ? 30 : 0) +
    (this.prechunked ? 30 : 0) +
    (100 - Math.abs(50 - this.cpu)) / 2,
    0,
    100
  );

  const proxyWeight =
    (this.proxyRole ? 20 : 0) +
    (this.binaryRole ? 20 : 0) +
    (this.organismRole ? 20 : 0);

  this.proxyContinuanceScore = clamp(
    this.continuanceScore * 0.6 + proxyWeight,
    0,
    100
  );

  const palWeight =
    (this.palRole ? 30 : 0) +
    (this.palRole === "pal-media" ? 20 : 0) +
    (this.palRole === "pal-world" ? 10 : 0);

  this.palContinuanceScore = clamp(
    this.continuanceScore * 0.7 + palWeight,
    0,
    100
  );
}


  renderLine() {
    const c = COLORS;
    const cpuColor =
      this.cpu >= CONFIG.thresholds.cpuHot ? c.red :
      this.cpu >= CONFIG.thresholds.cpuWarm ? c.yellow : c.green;

    const memColor =
      this.mem >= CONFIG.thresholds.memHot ? c.red :
      this.mem >= CONFIG.thresholds.memWarm ? c.yellow : c.green;

    const statusIcon =
      this.status === "hot" ? ICONS.heat :
      this.status === "warm" ? ICONS.warn :
      ICONS.ok;

    const evoIcon =
      this.meta.evo.prewarmAware || this.meta.evo.prechunkAware || this.meta.evo.advantageAware
        ? ICONS.evo
        : "";

    const bootBadge =
      this.bootRole === "boot"  ? ICONS.boot :
      this.bootRole === "os"    ? ICONS.os :
      this.bootRole === "world" ? ICONS.world :
      "";

    const routeBadge =
      this.routeRole === "route" ? ICONS.route : "";

    const proxyBadge =
      this.proxyRole || this.binaryRole || this.organismRole ? ICONS.proxy : "";

    const palBadge =
      this.palRole ? ICONS.pal : "";

    const upgradeBadge =
      this.upgradeHints.immortal || this.upgradeHints.evo || this.upgradeHints.max || this.upgradeHints.aba
        ? ICONS.upgrade
        : "";

    return [
      `${this.color}${this.icon}${COLORS.reset} ${c.bold}${this.id}${c.reset} ${evoIcon}${bootBadge}${routeBadge}${proxyBadge}${palBadge}${upgradeBadge}`,
      `CPU: ${cpuColor}${this.cpu.toFixed(0)}%${c.reset}`,
      `MEM: ${memColor}${this.mem.toFixed(0)}%${c.reset}`,
      `ADV: ${c.cyan}${this.advantage.toFixed(2)}×${c.reset}`,
      `STATE: ${statusIcon}`,
      `PREWARM: ${this.prewarmed ? ICONS.bolt : ICONS.cold}`,
      `PRECHUNK: ${this.prechunked ? ICONS.chunk : ICONS.cold}`,
      `CONT: ${this.continuanceScore.toFixed(0)}`,
      `P-CONT: ${this.proxyContinuanceScore.toFixed(0)}`,
      this.palRole
        ? `PAL-CONT: ${this.palContinuanceScore.toFixed(0)}`
        : ""
    ].filter(Boolean).join("  |  ");
  }
}

/* =============================================================================
 *  MEDIA RESOLVER — PulsePal images from _PICTURES
 * ============================================================================= */
class PulseMediaResolver {
  constructor(rootDir) {
    this.rootDir = rootDir;
    this.cache = [];
  }

  scan() {
    const folder = path.join(this.rootDir, CONFIG.pictures.folder);
    let files = [];
    try {
      files = fs.readdirSync(folder);
    } catch {
      this.cache = [];
      return;
    }

    this.cache = files
      .filter(f =>
        CONFIG.pictures.palPrefix.test(f) &&
        CONFIG.pictures.extensions.test(f)
      )
      .map(f => path.join(CONFIG.pictures.folder, f));
  }

  resolveAll(prefix = "PulsePal") {
    return this.cache.filter(f => f.includes(prefix));
  }
}

/* =============================================================================
 *  PAL HISTORY SCANNER HOOK (OPTIONAL)
 * ============================================================================= */
class PulsePalHistoryScannerHook {
  constructor(rootDir) {
    this.rootDir = rootDir;
    this.scanner = null;

    try {
      const modPath = path.join(rootDir, "PULSE-PAL", "PulsePalHistoryScanner-v24.js");
      if (fs.existsSync(modPath)) {
        this.scanner = require(modPath);
      }
    } catch {
      this.scanner = null;
    }
  }

  async scan() {
    if (this.scanner && typeof this.scanner.scan === "function") {
      return this.scanner.scan();
    }

    // Fallback: simple log / history scan
    const history = {
      messagesScanned: 0,
      lastScanAt: new Date().toISOString(),
      sources: [],
      continuityScore: 0
    };

    const palLogDir = path.join(this.rootDir, "PULSE-PAL", "logs");
    try {
      const files = fs.readdirSync(palLogDir);
      history.sources.push(palLogDir);
      history.messagesScanned = files.length;
      history.continuityScore = Math.min(100, files.length * 2);
    } catch {
      // no logs yet
    }

    return history;
  }
}

/* =============================================================================
 *  6. PULSEBAND / PULSE-WORLD-OS DAEMON — ROOT ORGANISM
 * ============================================================================= */
class PulseBandDaemon {
  constructor() {
    this.organs = [];
    this.tickCount = 0;
    this.timer = null;
    this.lastSnapshot = null;
    this.media = new PulseMediaResolver(CONFIG.rootDir);

    this.bootMap = {
      world: [],
      os: [],
      boot: [],
      route: [],
      other: []
    };

    this.proxySummary = {
      proxyCount: 0,
      binaryCount: 0,
      organismCount: 0,
      dualBandCount: 0,
      immortalProxyCount: 0,
      avgProxyContinuance: 0
    };

    this.palSummary = {
      palCount: 0,
      palWorldCount: 0,
      palMediaCount: 0,
      palCoreCount: 0,
      immortalPalCount: 0,
      avgPalContinuance: 0,
      palMediaFilesCount: 0,
      palMediaFiles: []
    };

    this.palHistory = {
      messagesScanned: 0,
      lastScanAt: null,
      sources: [],
      continuityScore: 0
    };

    this.palPersona = {
      persona: null,
      tone: null,
      behavior: null,
      continuity: null,
      identity: null,
      lastComputeAt: null
    };

    this.palHelperSuggestions = {
      priority: "normal",
      notes: [],
      actions: []
    };

    this.palHistoryScanner = new PulsePalHistoryScannerHook(CONFIG.rootDir);
  }

  getConfig() {
    return {
      aiMeta: AI_EXPERIENCE_META,
      exportMeta: EXPORT_META,
      config: CONFIG
    };
  }

  discoverOrgans() {
    let entries = [];
    try {
      entries = fs.readdirSync(CONFIG.rootDir, { withFileTypes: true });
    } catch (e) {
      console.error(`${COLORS.red}${ICONS.err} Failed to read rootDir: ${CONFIG.rootDir}${COLORS.reset}`);
      entries = [];
    }

    this.organs = [];
    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      const name = entry.name;
      if (!CONFIG.patterns.organPrefix.test(name)) continue;

      this.organs.push(new PulseOrgan(name));
    }

    this.buildBootMap();
    this.buildProxySummary();
    this.buildPalSummary();
    this.media.scan();
  }

  buildBootMap() {
    const bootMap = {
      world: [],
      os: [],
      boot: [],
      route: [],
      other: []
    };

    for (const organ of this.organs) {
      if (organ.bootRole === "world") {
        bootMap.world.push(organ.id);
      } else if (organ.bootRole === "os") {
        bootMap.os.push(organ.id);
      } else if (organ.bootRole === "boot") {
        bootMap.boot.push(organ.id);
      }

      if (organ.routeRole === "route") {
        bootMap.route.push(organ.id);
      }

      if (!organ.bootRole && !organ.routeRole) {
        bootMap.other.push(organ.id);
      }
    }

    this.bootMap = bootMap;
  }

  buildProxySummary() {
    let proxyCount = 0;
    let binaryCount = 0;
    let organismCount = 0;
    let dualBandCount = 0;
    let immortalProxyCount = 0;
    let sumProxyContinuance = 0;
    let proxyContinuanceSamples = 0;

    for (const organ of this.organs) {
      if (organ.proxyRole) proxyCount++;
      if (organ.binaryRole) binaryCount++;
      if (organ.organismRole) organismCount++;

      if (organ.proxyModeHint === "dual-band-organism" || organ.proxyModeHint === "binary-proxy-bridge") {
        dualBandCount++;
      }

      if (organ.proxyTier === "immortal" || organ.proxyTier === "immortal-evo" || organ.proxyTier === "immortal-max-aba") {
        immortalProxyCount++;
      }

      if (organ.proxyRole || organ.binaryRole || organ.organismRole) {
        sumProxyContinuance += organ.proxyContinuanceScore;
        proxyContinuanceSamples++;
      }
    }

    const avgProxyContinuance =
      proxyContinuanceSamples > 0
        ? sumProxyContinuance / proxyContinuanceSamples
        : 0;

    this.proxySummary = {
      proxyCount,
      binaryCount,
      organismCount,
      dualBandCount,
      immortalProxyCount,
      avgProxyContinuance: Math.round(avgProxyContinuance)
    };
  }

  buildPalSummary() {
    let palCount = 0;
    let palWorldCount = 0;
    let palMediaCount = 0;
    let palCoreCount = 0;
    let immortalPalCount = 0;
    let sumPalContinuance = 0;
    let palSamples = 0;

    for (const organ of this.organs) {
      if (!organ.palRole) continue;
      palCount++;
      if (organ.palRole === "pal-world") palWorldCount++;
      else if (organ.palRole === "pal-media") palMediaCount++;
      else if (organ.palRole === "pal-core") palCoreCount++;

      if (organ.palTier === "immortal" || organ.palTier === "immortal-evo" || organ.palTier === "immortal-max-aba") {
        immortalPalCount++;
      }

      sumPalContinuance += organ.palContinuanceScore;
      palSamples++;
    }

    const avgPalContinuance =
      palSamples > 0
        ? sumPalContinuance / palSamples
        : 0;

    const palMediaFiles = this.media.resolveAll("PulsePal") || [];

    this.palSummary = {
      palCount,
      palWorldCount,
      palMediaCount,
      palCoreCount,
      immortalPalCount,
      avgPalContinuance: Math.round(avgPalContinuance),
      palMediaFilesCount: palMediaFiles.length,
      palMediaFiles
    };
  }

  buildPalHelperSuggestions() {
    const notes = [];
    const actions = [];
    let priority = "normal";

    if (this.palSummary.palCount === 0) {
      notes.push("No Pulse‑Pal organs detected. Create PULSE-PAL to enable companion features.");
      actions.push("Create PULSE-PAL folder and restart daemon.");
      priority = "high";
    }

    if (this.palSummary.palMediaFilesCount === 0) {
      notes.push("No Pulse‑Pal media found in _PICTURES. Gallery surfaces will be empty.");
      actions.push("Add PulsePal* images to _PICTURES for richer companion presence.");
    }

    if (this.palHistory.messagesScanned < 10) {
      notes.push("Pal history is shallow. Continuity will feel light.");
      actions.push("Keep chatting; history scanner will deepen continuity over time.");
    }

    if (this.palSummary.avgPalContinuance < 50) {
      notes.push("Pal continuance is moderate. Consider prewarm/prechunk tuning.");
    }

    if (!this.palPersona || !this.palPersona.persona) {
      notes.push("No Pal persona snapshot yet. Persona engine has not reported.");
      actions.push("Ensure PulsePalPersonaEngine is wired and running in the main OS.");
    }


    this.palHelperSuggestions = {
      priority,
      notes,
      actions
    };
  }

  async tickOnce() {
    const proc = getProcessSnapshot();
    this.tickCount++;

    for (const organ of this.organs) {
      await organ.tick(proc);
    }

    this.buildBootMap();
    this.buildProxySummary();
    this.buildPalSummary();

    // PAL HISTORY + PERSONA HOOKS
    const palHistory = await this.palHistoryScanner.scan();
    this.palHistory = palHistory;

    let palPersona = this.palPersona;
    try {
      if (global.PulsePalPersonaEngine && typeof global.PulsePalPersonaEngine.compute === "function") {
        palPersona = global.PulsePalPersonaEngine.compute({
          daemonSnapshot: this.lastSnapshot,
          palSummary: this.palSummary,
          palHistory: palHistory
        });
      }
    } catch {
      // keep daemon stable
    }

    this.palPersona = {
      ...palPersona,
      version: "v24-IMMORTAL",
      lastComputeAt: new Date().toISOString()
    };

    this.buildPalHelperSuggestions();

    this.lastSnapshot = {
      aiMeta: AI_EXPERIENCE_META,
      version: "v24-IMMORTAL",
      process: proc,
      tickCount: this.tickCount,
      organs: this.organs.map(o => ({
        id: o.id,
        type: o.type,
        status: o.status,
        cpu: o.cpu,
        mem: o.mem,
        advantage: o.advantage,
        prewarmed: o.prewarmed,
        prechunked: o.prechunked,
        continuanceScore: o.continuanceScore,
        proxyContinuanceScore: o.proxyContinuanceScore,
        palContinuanceScore: o.palContinuanceScore,
        meta: o.meta
      })),
      bootMap: this.bootMap,
      proxySummary: this.proxySummary,
      palSummary: this.palSummary,
      palHistory: this.palHistory,
      palPersona: this.palPersona,
      palHelperSuggestions: this.palHelperSuggestions
    };
    
    if (!CONFIG.output.quiet && !CONFIG.output.json) {
      this.renderTui(this.lastSnapshot);
    }

    if (CONFIG.output.json) {
      console.log(JSON.stringify(this.lastSnapshot, null, 2));
    }

    if (CONFIG.output.snapshotFile) {
      try {
        fs.writeFileSync(CONFIG.output.snapshotFile, JSON.stringify(this.lastSnapshot, null, 2), "utf8");
      } catch (e) {
        console.error(`${COLORS.red}${ICONS.err} Failed to write snapshot file: ${e.message}${COLORS.reset}`);
      }
    }

    if (global.PulseDaemonProxyTap) {
      try { global.PulseDaemonProxyTap(this.lastSnapshot); } catch {}
    }

    if (global.PulseDaemonPalTap) {
      try {
        global.PulseDaemonPalTap({
          palSummary: this.palSummary,
          palHistory: this.palHistory,
          palPersona: this.palPersona,
          palHelperSuggestions: this.palHelperSuggestions
        });
      } catch {}
    }
  }

  renderTui(snapshot) {
    const c = COLORS;
    console.clear();
    console.log(`${c.bold}${ICONS.band} PulseWorld-OS Continuance Daemon — v24 IMMORTAL PAL PROXY HELPER${c.reset}`);
    console.log(`Host: ${snapshot.process.host}  PID: ${snapshot.process.pid}  CPU≈ ${snapshot.process.cpuApprox}%  RSS≈ ${snapshot.process.rssMb.toFixed(1)} MB`);
    console.log("");

    console.log(`${c.bold}${ICONS.vitals} Organs:${c.reset}`);
    for (const organ of this.organs) {
      console.log("  " + organ.renderLine());
    }

    console.log("");
    console.log(`${c.bold}${ICONS.boot} Boot Map:${c.reset}`);
    console.log("  World:", snapshot.bootMap.world.join(", ") || "(none)");
    console.log("  OS   :", snapshot.bootMap.os.join(", ") || "(none)");
    console.log("  Boot :", snapshot.bootMap.boot.join(", ") || "(none)");
    console.log("  Route:", snapshot.bootMap.route.join(", ") || "(none)");

    console.log("");
    console.log(`${c.bold}${ICONS.proxy} Proxy Summary:${c.reset}`);
    console.log(`  Proxy: ${snapshot.proxySummary.proxyCount}, Binary: ${snapshot.proxySummary.binaryCount}, Organism: ${snapshot.proxySummary.organismCount}`);
    console.log(`  Dual-band: ${snapshot.proxySummary.dualBandCount}, Immortal: ${snapshot.proxySummary.immortalProxyCount}, Avg P-Cont: ${snapshot.proxySummary.avgProxyContinuance}`);

    console.log("");
    console.log(`${c.bold}${ICONS.pal} Pulse‑Pal Summary:${c.reset}`);
    console.log(`  Pal organs: ${snapshot.palSummary.palCount} (core=${snapshot.palSummary.palCoreCount}, media=${snapshot.palSummary.palMediaCount}, world=${snapshot.palSummary.palWorldCount})`);
    console.log(`  Immortal pal: ${snapshot.palSummary.immortalPalCount}, Avg Pal-Cont: ${snapshot.palSummary.avgPalContinuance}`);
    console.log(`  Media files: ${snapshot.palSummary.palMediaFilesCount}`);

    console.log("");
    console.log(`${c.bold}${ICONS.memory || ICONS.band} Pal History:${c.reset}`);
    console.log(`  Messages scanned: ${snapshot.palHistory.messagesScanned}`);
    console.log(`  Continuity score: ${snapshot.palHistory.continuityScore}`);
    console.log(`  Sources: ${snapshot.palHistory.sources.join(", ") || "(none)"}`);

    console.log("");
    console.log(`${c.bold}${ICONS.ai_brain || ICONS.band} Pal Persona:${c.reset}`);
    if (snapshot.palPersona && snapshot.palPersona.persona) {
      console.log(`  Persona:`, JSON.stringify(snapshot.palPersona.persona));
      console.log(`  Tone   :`, JSON.stringify(snapshot.palPersona.tone));
      console.log(`  Behavior:`, JSON.stringify(snapshot.palPersona.behavior));
      console.log(`  Continuity:`, JSON.stringify(snapshot.palPersona.continuity));
      console.log(`  Identity:`, JSON.stringify(snapshot.palPersona.identity));
    } else {
      console.log("  (no persona snapshot yet)");
    }

    console.log("");
    console.log(`${c.bold}${ICONS.upgrade} Pal Helper Suggestions:${c.reset}`);
    console.log(`  Priority: ${snapshot.palHelperSuggestions.priority}`);
    for (const note of snapshot.palHelperSuggestions.notes) {
      console.log(`  - ${note}`);
    }
  }

  async start() {
    this.discoverOrgans();

    await this.tickOnce();

    if (CONFIG.output.once) {
      return;
    }

    this.timer = setInterval(() => {
      this.tickOnce().catch(err => {
        console.error(`${COLORS.red}${ICONS.err} Tick error: ${err.message}${COLORS.reset}`);
      });
    }, CONFIG.tickMs);
  }

  stop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  getOrgans() {
    return this.organs;
  }

  getBootMap() {
    return this.bootMap;
  }

  getProxySummary() {
    return this.proxySummary;
  }

  getPalSummary() {
    return this.palSummary;
  }

  getPalHistory() {
    return this.palHistory;
  }

  getPalPersona() {
    return this.palPersona;
  }

  getPalHelperSuggestions() {
    return this.palHelperSuggestions;
  }

  getSnapshot() {
    return this.lastSnapshot;
  }

  exportSnapshot(filePath) {
    const target = filePath || CONFIG.output.snapshotFile;
    if (!target) return;
    fs.writeFileSync(target, JSON.stringify(this.lastSnapshot, null, 2), "utf8");
  }
}

/* =============================================================================
 *  7. MAIN ENTRY
 * ============================================================================= */
const daemon = new PulseBandDaemon();

if (require.main === module) {
  daemon.start().catch(err => {
    console.error(`${COLORS.red}${ICONS.err} Failed to start daemon: ${err.message}${COLORS.reset}`);
    process.exit(1);
  });
}

module.exports = {
  AI_EXPERIENCE_META,
  EXPORT_META,
  CONFIG,
  PulseBandDaemon,
  daemon
};
