#!/usr/bin/env node
 //
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝
/**
 * =============================================================================
 *  PULSE-WORLD-OS CONTINUANCE DAEMON — v30-IMMORTAL-WORLD-OS-PAL-PROXY-BINARY
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
 *    • Observes Binary Substrate frames + GPU Lymph/Healer snapshots (v30+).
 *    • Emits a unified organism snapshot for dashboards / higher-level OS.
 * =============================================================================
 */

"use strict";
const fs   = require("fs");
const path = require("path");
const os   = require("os");

/* =============================================================================
 *  META
 * ============================================================================= */
const EXPORT_META = {
  version: "v30-IMMORTAL-WORLD-OS-PAL-PROXY-BINARY",
  cli: {
    flags: [
      "--root <dir>           Root directory to scan for PULSE* organs",
      "--interval <ms>        Tick interval (default 5000)",
      "--json                 Output JSON snapshot instead of TUI",
      "--once                 Run a single tick and exit",
      "--quiet                Suppress TUI output",
      "--no-color             Disable ANSI colors",
      "--snapshot-file <path> Write last snapshot to file"
    ]
  }
};

const AI_EXPERIENCE_META = {
  layer: "PulseWorldOSDaemon",
  version: "v30-IMMORTAL++",
  binaryAware: true,
  gpuLymphAware: true,
  palAware: true,
  proxyAware: true,
  worldOSAware: true
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
  console.log("PulseWorld-OS Continuance Daemon — v30-IMMORTAL-WORLD-OS-PAL-PROXY-BINARY");
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
 *  3. CONFIGURATION
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
 *  5. ORGAN CLASS — v24 IMMORTAL‑INTEL (kept, v30-aware)
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
    this.advantageTier = 0;
    this.advantageScore = 0;

    this.prewarmed = false;
    this.prechunked = false;

    this.continuanceScore = 0;

    this.bootRole = this.inferBootRole(folderName);
    this.routeRole = this.inferRouteRole(folderName);

    this.proxyRole = this.inferProxyRole(folderName);
    this.binaryRole = this.inferBinaryRole(folderName);
    this.organismRole = this.inferOrganismRole(folderName);

    this.palRole = this.inferPalRole(folderName);
    this.palTier = this.computePalTier();
    this.palContinuanceScore = 0;

    this.upgradeHints = this.inferUpgradeHints(folderName);

    this.proxyModeHint = this.computeProxyModeHint();
    this.proxyTier = this.computeProxyTier();
    this.proxyContinuanceScore = 0;

    this.substrateLaneId = null;
    this.substratePhaseIndex = null;
    this.worldWaveIndex = null;
    this.throughputClass = "throughput_low";
    this.throughputScore = 0;

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
        palAware: !!this.palRole,
        binarySubstrateAware: !!this.binaryRole,
        cacheAware: this.type === "cache",
        gpuAware: this.type === "gpu",
        throughputAware: false,
        substrateLaneAware: false,
        substratePhaseAware: false
      }
    };
  }

  inferType(name) {
    const n = name.toUpperCase();
    if (n.includes("GPU")) return "gpu";
    if (n.includes("SEND")) return "send";
    if (n.includes("ROUTE")) return "route";
    if (n.includes("EARN")) return "earn";
    if (n.includes("CACHE")) return "cache";
    if (n.includes("GRID")) return "grid";
    return "generic";
  }

  inferBootRole(name) {
    const n = name.toUpperCase();
    if (CONFIG.bootPatterns.world.test(n)) return "world";
    if (CONFIG.bootPatterns.os.test(n)) return "os";
    if (CONFIG.bootPatterns.boot.test(n)) return "boot";
    return null;
  }

  inferRouteRole(name) {
    const n = name.toUpperCase();
    if (CONFIG.bootPatterns.route.test(n)) return "route";
    return null;
  }

  inferProxyRole(name) {
    const n = name.toUpperCase();
    if (CONFIG.proxyPatterns.proxy.test(n)) return "proxy";
    return null;
  }

  inferBinaryRole(name) {
    const n = name.toUpperCase();
    if (CONFIG.proxyPatterns.binary.test(n)) return "binary";
    return null;
  }

  inferOrganismRole(name) {
    const n = name.toUpperCase();
    if (CONFIG.proxyPatterns.organism.test(n)) return "organism";
    return null;
  }

  inferPalRole(name) {
    const n = name.toUpperCase();
    if (!CONFIG.palPatterns.pal.test(n)) return null;
    if (CONFIG.palPatterns.world.test(n)) return "pal-world";
    if (CONFIG.palPatterns.media.test(n)) return "pal-media";
    return "pal-core";
  }

  inferUpgradeHints(name) {
    const n = name.toUpperCase();
    return {
      immortal: CONFIG.upgradePatterns.immortal.test(n),
      evo: CONFIG.upgradePatterns.evo.test(n),
      max: CONFIG.upgradePatterns.max.test(n),
      aba: CONFIG.upgradePatterns.aba.test(n)
    };
  }

  computeProxyModeHint() {
    if (this.proxyRole && this.binaryRole && this.organismRole) {
      return "dual-band-organism";
    }
    if (this.proxyRole && this.binaryRole) {
      return "binary-proxy-bridge";
    }
    if (this.proxyRole) return "proxy-only";
    return null;
  }

  computeProxyTier() {
    if (this.upgradeHints.aba) return "immortal-max-aba";
    if (this.upgradeHints.max) return "immortal-max";
    if (this.upgradeHints.evo) return "immortal-evo";
    if (this.upgradeHints.immortal) return "immortal";
    return "normal";
  }

  computePalTier() {
    if (this.upgradeHints.aba) return "immortal-max-aba";
    if (this.upgradeHints.max) return "immortal-max";
    if (this.upgradeHints.evo) return "immortal-evo";
    if (this.upgradeHints.immortal) return "immortal";
    return "normal";
  }

  resolveIcon(type) {
    switch (type) {
      case "gpu": return ICONS.gpu;
      case "send": return ICONS.send;
      case "route": return ICONS.route;
      case "earn": return ICONS.earn;
      case "cache": return ICONS.cache;
      case "grid": return ICONS.grid;
      default: return ICONS.band;
    }
  }

  resolveColor(type) {
    switch (type) {
      case "gpu": return COLORS.magenta;
      case "send": return COLORS.cyan;
      case "route": return COLORS.blue;
      case "earn": return COLORS.yellow;
      case "cache": return COLORS.green;
      case "grid": return COLORS.gray;
      default: return COLORS.reset;
    }
  }

  async tick(globalSnapshot, worldBinaryView = null) {
    this.lastRun = new Date();

    const baseCpu = globalSnapshot?.cpuApprox || 0;
    const coordinatorCpu = Math.round(baseCpu * 0.15);

    const baseMemPct =
      globalSnapshot && globalSnapshot.heapTotalMb > 0
        ? (globalSnapshot.heapMb / globalSnapshot.heapTotalMb) * 100
        : 0;
    const memField = clamp(baseMemPct * 0.5, 0, 100);

    switch (this.type) {
      case "gpu":
        this.cpu = clamp(coordinatorCpu + 5, 0, 100);
        this.mem = clamp(memField + 10, 0, 100);
        break;
      case "cache":
        this.cpu = clamp(coordinatorCpu + 2, 0, 100);
        this.mem = clamp(memField + 15, 0, 100);
        break;
      case "earn":
      case "grid":
        this.cpu = clamp(coordinatorCpu + 3, 0, 100);
        this.mem = clamp(memField + 5, 0, 100);
        break;
      case "send":
      case "route":
        this.cpu = clamp(coordinatorCpu + 1, 0, 100);
        this.mem = clamp(memField + 2, 0, 100);
        break;
      default:
        this.cpu = coordinatorCpu;
        this.mem = memField;
        break;
    }

    const hint =
      worldBinaryView?.organs?.[this.id] ||
      worldBinaryView?.byId?.[this.id] ||
      null;

    if (hint) {
      this.advantageTier = hint.advantageTier ?? this.advantageTier;
      this.advantageScore = hint.advantageScore ?? this.advantageScore;

      this.throughputClass = hint.throughputClass || this.throughputClass;
      this.throughputScore = hint.throughputScore ?? this.throughputScore;

      this.substrateLaneId = hint.substrateLaneId ?? this.substrateLaneId;
      this.substratePhaseIndex = hint.substratePhaseIndex ?? this.substratePhaseIndex;
      this.worldWaveIndex = hint.worldWaveIndex ?? this.worldWaveIndex;

      this.prewarmed = hint.prewarmed || this.prewarmed;
      this.prechunked = hint.prechunked || this.prechunked;

      this.meta.evo.prewarmAware = this.meta.evo.prewarmAware || this.prewarmed;
      this.meta.evo.prechunkAware = this.meta.evo.prechunkAware || this.prechunked;
      this.meta.evo.advantageAware = true;
      this.meta.evo.throughputAware = true;
      this.meta.evo.substrateLaneAware = this.meta.evo.substrateLaneAware || !!this.substrateLaneId;
      this.meta.evo.substratePhaseAware = this.meta.evo.substratePhaseAware || !!this.substratePhaseIndex;
    }

    const tierBoost = (this.advantageTier || 0) * 0.25;
    const scoreBoost = this.advantageScore || 0;
    this.advantage = 1.0 + tierBoost + scoreBoost;

    this.status =
      this.cpu >= CONFIG.thresholds.cpuHot ? "hot" :
      this.cpu >= CONFIG.thresholds.cpuWarm ? "warm" : "running";

    let cont = 0;
    if (this.prewarmed) cont += 20;
    if (this.prechunked) cont += 20;
    if (this.advantageTier >= 1) cont += 20;

    cont += (this.advantageScore || 0) * 20;
    cont += (this.throughputScore || 0) * 20;

    if (this.substrateLaneId !== null) cont += 10;
    if (this.substratePhaseIndex !== null) cont += 10;
    if (this.worldWaveIndex !== null) cont += 10;

    this.continuanceScore = clamp(cont, 0, 100);

    let proxyScore = this.continuanceScore * 0.6;
    if (this.proxyRole) proxyScore += 20;
    if (this.binaryRole) proxyScore += 20;
    if (this.organismRole) proxyScore += 20;
    this.proxyContinuanceScore = clamp(proxyScore, 0, 100);

    let palScore = this.continuanceScore * 0.7;
    if (this.palRole) palScore += 30;
    if (this.palRole === "pal-media") palScore += 20;
    if (this.palRole === "pal-world") palScore += 10;
    this.palContinuanceScore = clamp(palScore, 0, 100);
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
      this.meta.evo.prewarmAware ||
      this.meta.evo.prechunkAware ||
      this.meta.evo.advantageAware
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
      this.upgradeHints.immortal ||
      this.upgradeHints.evo ||
      this.upgradeHints.max ||
      this.upgradeHints.aba
        ? ICONS.upgrade
        : "";

    const laneBadge =
      this.substrateLaneId !== null ? `${ICONS.grid}${this.substrateLaneId}` : "";

    const phaseBadge =
      this.substratePhaseIndex !== null ? `${ICONS.send}${this.substratePhaseIndex}` : "";

    const waveBadge =
      this.worldWaveIndex !== null ? `${ICONS.world}${this.worldWaveIndex}` : "";

    const throughputBadge =
      this.throughputClass === "throughput_ultra" ? `${ICONS.bolt}ULTRA` :
      this.throughputClass === "throughput_high"  ? `${ICONS.bolt}HIGH` :
      this.throughputClass === "throughput_medium"? `${ICONS.bolt}MED` :
      "LOW";

    return [
      `${this.color}${this.icon}${COLORS.reset} ${c.bold}${this.id}${c.reset} ${statusIcon}${evoIcon}${bootBadge}${routeBadge}${proxyBadge}${palBadge}${upgradeBadge}`,
      `CPU: ${cpuColor}${this.cpu.toFixed(0)}%${c.reset}`,
      `MEM: ${memColor}${this.mem.toFixed(0)}%${c.reset}`,
      `ADV: ${c.cyan}${this.advantage.toFixed(2)}×${c.reset}`,
      `LANE: ${laneBadge}`,
      `PHASE: ${phaseBadge}`,
      `WAVE: ${waveBadge}`,
      `THR: ${throughputBadge}`,
      `CONT: ${this.continuanceScore.toFixed(0)}`,
      `P-CONT: ${this.proxyContinuanceScore.toFixed(0)}`,
      this.palRole ? `PAL-CONT: ${this.palContinuanceScore.toFixed(0)}` : ""
    ].filter(Boolean).join("  |  ");
  }
}

/* =============================================================================
 *  MEDIA RESOLVER — v24 IMMORTAL‑INTEL
 * ============================================================================= */
class PulseMediaResolver {
  constructor(rootDir) {
    this.rootDir = rootDir;
    this.cache = [];
    this.lastScanAt = null;

    this.meta = {
      version: "v24-IMMORTAL-INTEL",
      cacheAware: true,
      prewarmAware: true,
      prechunkAware: true,
      substrateSafe: true
    };
  }

  scan() {
    const folder = path.join(this.rootDir, CONFIG.pictures.folder);
    let files = [];

    try {
      files = fs.readdirSync(folder, { withFileTypes: true })
        .filter(f => f.isFile())
        .map(f => f.name);
    } catch {
      this.cache = [];
      this.lastScanAt = new Date().toISOString();
      return;
    }

    this.cache = files
      .filter(f =>
        CONFIG.pictures.palPrefix.test(f) &&
        CONFIG.pictures.extensions.test(f)
      )
      .map(f => path.join(CONFIG.pictures.folder, f));

    this.lastScanAt = new Date().toISOString();
  }

  resolveAll(prefix = "PulsePal") {
    return this.cache.filter(f => f.includes(prefix));
  }
}

/* =============================================================================
 *  PAL HISTORY SCANNER HOOK — v24 IMMORTAL‑INTEL
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

    this.meta = {
      version: "v24-IMMORTAL-INTEL",
      continuityAware: true,
      substrateSafe: true,
      zeroChurn: true
    };
  }

  async scan() {
    if (this.scanner && typeof this.scanner.scan === "function") {
      try {
        const result = await this.scanner.scan();
        return {
          ...result,
          version: "v24-IMMORTAL-INTEL",
          lastScanAt: new Date().toISOString()
        };
      } catch {
        // fall through
      }
    }

    const history = {
      version: "v24-IMMORTAL-INTEL",
      messagesScanned: 0,
      lastScanAt: new Date().toISOString(),
      sources: [],
      continuityScore: 0
    };

    const palLogDir = path.join(this.rootDir, "PULSE-PAL", "logs");

    try {
      const files = fs.readdirSync(palLogDir, { withFileTypes: true })
        .filter(f => f.isFile())
        .map(f => f.name);

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

    this.binarySubstrateSummary = {
      frameCount: 0,
      lastTag: null,
      lastBand: null,
      avgAdvantageTier: 0,
      avgAdvantageScore: 0,
      throughputClass: "throughput_low",
      avgThroughputScore: 0
    };

    this.gpuLymphSummary = {
      version: "v30-IMMORTAL++",
      lastStatus: null,
      lastActionsCount: 0,
      lastAdvantageSnapshot: null,
      lastEarnProfile: null,
      lastPresence: null
    };

    this.worldBinaryView = null;
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
      console.error(
        `${COLORS.red}${ICONS.err} Failed to read rootDir: ${CONFIG.rootDir}${COLORS.reset}`
      );
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
      if (organ.bootRole === "world") bootMap.world.push(organ.id);
      else if (organ.bootRole === "os") bootMap.os.push(organ.id);
      else if (organ.bootRole === "boot") bootMap.boot.push(organ.id);

      if (organ.routeRole === "route") bootMap.route.push(organ.id);

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

      if (
        organ.proxyModeHint === "dual-band-organism" ||
        organ.proxyModeHint === "binary-proxy-bridge"
      ) {
        dualBandCount++;
      }

      if (
        organ.proxyTier === "immortal" ||
        organ.proxyTier === "immortal-evo" ||
        organ.proxyTier === "immortal-max-aba"
      ) {
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

      if (
        organ.palTier === "immortal" ||
        organ.palTier === "immortal-evo" ||
        organ.palTier === "immortal-max-aba"
      ) {
        immortalPalCount++;
      }

      sumPalContinuance += organ.palContinuanceScore;
      palSamples++;
    }

    const avgPalContinuance =
      palSamples > 0 ? sumPalContinuance / palSamples : 0;

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
      notes.push(
        "No Pulse‑Pal organs detected. Create PULSE-PAL to enable companion features."
      );
      actions.push("Create PULSE-PAL folder and restart daemon.");
      priority = "high";
    }

    if (this.palSummary.palMediaFilesCount === 0) {
      notes.push(
        "No Pulse‑Pal media found in _PICTURES. Gallery surfaces will be empty."
      );
      actions.push(
        "Add PulsePal* images to _PICTURES for richer companion presence."
      );
    }

    if (this.palHistory.messagesScanned < 10) {
      notes.push("Pal history is shallow. Continuity will feel light.");
      actions.push(
        "Keep chatting; history scanner will deepen continuity over time."
      );
    }

    if (this.palSummary.avgPalContinuance < 50) {
      notes.push(
        "Pal continuance is moderate. Consider prewarm/prechunk tuning."
      );
    }

    this.palHelperSuggestions = {
      priority,
      notes,
      actions
    };
  }

  updateBinarySubstrateSummary() {
    const view = this.worldBinaryView;
    if (!view || !view.frames || !Array.isArray(view.frames)) return;

    const frames = view.frames;
    const count = frames.length;
    if (!count) return;

    let sumTier = 0;
    let sumScore = 0;
    let sumThroughput = 0;
    let last = frames[count - 1];

    for (const f of frames) {
      sumTier += f.advantageTier || 0;
      sumScore += f.advantageScore || 0;
      sumThroughput += f.throughputScore || 0;
    }

    this.binarySubstrateSummary = {
      frameCount: count,
      lastTag: last.tag || null,
      lastBand: last.band || null,
      avgAdvantageTier: sumTier / count,
      avgAdvantageScore: sumScore / count,
      throughputClass: last.throughputClass || "throughput_low",
      avgThroughputScore: sumThroughput / count
    };
  }

  updateGpuLymphSummary() {
    let snap = null;
    try {
      if (global.PulseGpuHealerSnapshot) {
        snap = global.PulseGpuHealerSnapshot;
      }
    } catch {
      snap = null;
    }

    if (!snap || typeof snap !== "object") return;

    this.gpuLymphSummary = {
      version: "v30-IMMORTAL++",
      lastStatus: snap.status || null,
      lastActionsCount: Array.isArray(snap.actions) ? snap.actions.length : 0,
      lastAdvantageSnapshot: snap.advantageSnapshot || null,
      lastEarnProfile: snap.earnProfile || null,
      lastPresence: snap.presence || null
    };
  }

  async tickOnce() {
    this.tickCount++;

    const globalSnapshot = getProcessSnapshot();

    try {
      if (global.PulseWorldBinarySnapshot) {
        this.worldBinaryView = global.PulseWorldBinarySnapshot;
      }
    } catch {
      this.worldBinaryView = null;
    }

    for (const organ of this.organs) {
      await organ.tick(globalSnapshot, this.worldBinaryView);
    }

    this.updateBinarySubstrateSummary();
    this.updateGpuLymphSummary();

    this.palHistory = await this.palHistoryScanner.scan();
    this.buildPalHelperSuggestions();

    this.buildBootMap();
    this.buildProxySummary();
    this.buildPalSummary();

    this.lastSnapshot = {
      tick: this.tickCount,
      process: globalSnapshot,
      organs: this.organs.map(o => ({
        id: o.id,
        type: o.type,
        cpu: o.cpu,
        mem: o.mem,
        advantage: o.advantage,
        status: o.status,
        meta: o.meta,
        continuanceScore: o.continuanceScore,
        proxyContinuanceScore: o.proxyContinuanceScore,
        palContinuanceScore: o.palContinuanceScore
      })),
      bootMap: this.bootMap,
      proxySummary: this.proxySummary,
      palSummary: this.palSummary,
      palHistory: this.palHistory,
      palPersona: this.palPersona,
      palHelperSuggestions: this.palHelperSuggestions,
      binarySubstrateSummary: this.binarySubstrateSummary,
      gpuLymphSummary: this.gpuLymphSummary
    };

    try {
      if (global.PulseWorldOsTap) {
        global.PulseWorldOsTap({
          snapshot: this.lastSnapshot,
          binarySubstrateSummary: this.binarySubstrateSummary,
          gpuLymphSummary: this.gpuLymphSummary
        });
      }
    } catch {}

    this.emitSnapshot();
  }

  emitSnapshot() {
    if (!this.lastSnapshot) return;

    if (CONFIG.output.snapshotFile) {
      try {
        fs.writeFileSync(
          CONFIG.output.snapshotFile,
          JSON.stringify(this.lastSnapshot, null, 2),
          "utf8"
        );
      } catch (e) {
        console.error(`${COLORS.red}${ICONS.err} Failed to write snapshot file${COLORS.reset}`, e);
      }
    }

    if (CONFIG.output.json) {
      console.log(JSON.stringify(this.lastSnapshot));
    } else if (!CONFIG.output.quiet) {
      this.renderTui(this.lastSnapshot);
    }
  }

  renderTui(snapshot) {
    const c = COLORS;
    console.clear();
    console.log(`${c.bold}${ICONS.os} PulseWorld-OS Daemon v30${c.reset}`);
    console.log(
      `${ICONS.vitals} CPU: ${snapshot.process.cpuApprox}%  ` +
      `RSS: ${snapshot.process.rssMb.toFixed(1)}MB  ` +
      `HEAP: ${snapshot.process.heapMb.toFixed(1)}/${snapshot.process.heapTotalMb.toFixed(1)}MB`
    );
    console.log("");

    console.log(`${c.bold}${ICONS.world} Boot Map:${c.reset}`);
    console.log(`  World: ${snapshot.bootMap.world.join(", ") || "(none)"}`);
    console.log(`  OS:    ${snapshot.bootMap.os.join(", ") || "(none)"}`);
    console.log(`  Boot:  ${snapshot.bootMap.boot.join(", ") || "(none)"}`);
    console.log(`  Route: ${snapshot.bootMap.route.join(", ") || "(none)"}`);
    console.log("");

    console.log(`${c.bold}${ICONS.proxy} Proxy / Binary / Organism:${c.reset}`);
    console.log(
      `  Proxy: ${snapshot.proxySummary.proxyCount}, ` +
      `Binary: ${snapshot.proxySummary.binaryCount}, ` +
      `Organism: ${snapshot.proxySummary.organismCount}`
    );
    console.log(
      `  Dual-Band: ${snapshot.proxySummary.dualBandCount}, ` +
      `Immortal Proxy: ${snapshot.proxySummary.immortalProxyCount}, ` +
      `Avg P-Cont: ${snapshot.proxySummary.avgProxyContinuance}`
    );
    console.log("");

    console.log(`${c.bold}${ICONS.pal} Pal Summary:${c.reset}`);
    console.log(
      `  Pal: ${snapshot.palSummary.palCount}, ` +
      `World: ${snapshot.palSummary.palWorldCount}, ` +
      `Media: ${snapshot.palSummary.palMediaCount}, ` +
      `Core: ${snapshot.palSummary.palCoreCount}`
    );
    console.log(
      `  Immortal Pal: ${snapshot.palSummary.immortalPalCount}, ` +
      `Avg Pal-Cont: ${snapshot.palSummary.avgPalContinuance}`
    );
    console.log(
      `  Media Files: ${snapshot.palSummary.palMediaFilesCount}`
    );
    console.log("");

    console.log(`${c.bold}${ICONS.binary} Binary Substrate:${c.reset}`);
    console.log(
      `  Frames: ${snapshot.binarySubstrateSummary.frameCount}, ` +
      `LastTag: ${snapshot.binarySubstrateSummary.lastTag || "(none)"}, ` +
      `Throughput: ${snapshot.binarySubstrateSummary.throughputClass}`
    );
    console.log("");

    console.log(`${c.bold}${ICONS.gpu} GPU Lymph / Healer:${c.reset}`);
    console.log(
      `  Status: ${snapshot.gpuLymphSummary.lastStatus || "unknown"}, ` +
      `Actions: ${snapshot.gpuLymphSummary.lastActionsCount}`
    );
    console.log("");

    console.log(`${c.bold}${ICONS.band} Organs:${c.reset}`);
    for (const organ of snapshot.organs) {
      const o = this.organs.find(x => x.id === organ.id);
      if (!o) continue;
      console.log("  " + o.renderLine());
    }

    console.log("");
    console.log(`${c.bold}${ICONS.pal} Pal Helper Suggestions:${c.reset}`);
    console.log(`  Priority: ${snapshot.palHelperSuggestions.priority}`);
    for (const note of snapshot.palHelperSuggestions.notes) {
      console.log(`  - ${note}`);
    }
  }

  start() {
    this.discoverOrgans();
    this.tickOnce();

    if (!CONFIG.output.once) {
      this.timer = setInterval(() => {
        this.tickOnce();
      }, CONFIG.tickMs);
    }
  }
}

/* =============================================================================
 *  MAIN
 * ============================================================================= */
const daemon = null;

function main() {
  daemon = new PulseBandDaemon();
  daemon.start();
}

if (require.main === module) {
  main();
}


module.exports = {
  AI_EXPERIENCE_META,
  EXPORT_META,
  CONFIG,
  PulseBandDaemon,
  daemon
};
