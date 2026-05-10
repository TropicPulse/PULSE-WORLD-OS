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
import {
  OrganismIdentity,
  buildPulseOrganismMap as buildOrganismMap
} from "../PULSE-X/PulseWorldOrganismMap-v24.js";
const Identity = OrganismIdentity(import.meta.url);

// 2 — EXPORT GENOME METADATA
// export const PulseBinaryWaveScannerMeta = Identity.OrganMeta;
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
// export const WBC_CONTEXT = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

"use strict";
const fs   = require("fs");
const path = require("path");
const os   = require("os");


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
 *  5. ORGAN CLASS — v24 IMMORTAL‑INTEL
 *  Substrate-aware, binary-aware, throughput-aware, deterministic
 * ============================================================================= */
/* =============================================================================
 *  5. ORGAN CLASS — v24 IMMORTAL‑INTEL
 *  Substrate-aware, binary-aware, throughput-aware, deterministic
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

    // v24: CPU/MEM are coordinator-level reflections, not simulated load
    this.cpu = 0;
    this.mem = 0;

    // v24: advantage is substrate-driven
    this.advantage = 1.0;
    this.advantageTier = 0;
    this.advantageScore = 0;

    // v24: substrate-driven warm/chunk
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

    // proxy-mode meta
    this.proxyModeHint = this.computeProxyModeHint();
    this.proxyTier = this.computeProxyTier();
    this.proxyContinuanceScore = 0;

    // v24: substrate hints
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

        // v24 new awareness flags
        binarySubstrateAware: !!this.binaryRole,
        cacheAware: this.type === "cache",
        gpuAware: this.type === "gpu",
        throughputAware: false,
        substrateLaneAware: false,
        substratePhaseAware: false
      }
    };
  }

  // --- your existing inferType / inferBootRole / inferRouteRole / inferProxyRole /
  //     inferBinaryRole / inferOrganismRole / inferPalRole / inferUpgradeHints /
  //     computeProxyModeHint / computeProxyTier / computePalTier /
  //     resolveIcon / resolveColor stay as they were ---

  async tick(globalSnapshot, worldBinaryView = null) {
    this.lastRun = new Date();

    // v24: CPU is coordinator-level, not real load
    const baseCpu = globalSnapshot?.cpuApprox || 0;
    const coordinatorCpu = Math.round(baseCpu * 0.15); // 15% of process CPU

    // v24: memory field is half of heap usage
    const baseMemPct =
      globalSnapshot && globalSnapshot.heapTotalMb > 0
        ? (globalSnapshot.heapMb / globalSnapshot.heapTotalMb) * 100
        : 0;
    const memField = clamp(baseMemPct * 0.5, 0, 100);

    // deterministic per-type bias (no randomness)
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

    // v24: substrate/binary hints
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

    // v24: compute final advantage
    const tierBoost = (this.advantageTier || 0) * 0.25;
    const scoreBoost = this.advantageScore || 0;
    this.advantage = 1.0 + tierBoost + scoreBoost;

    // ---- deterministic continuance + proxy/pal scores ----

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
      `${this.color}${this.icon}${COLORS.reset} ${c.bold}${this.id}${c.reset} ${evoIcon}${bootBadge}${routeBadge}${proxyBadge}${palBadge}${upgradeBadge}`,
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
 *  Deterministic, zero‑churn, cache‑aware, substrate‑safe
 * ============================================================================= */
class PulseMediaResolver {
  constructor(rootDir) {
    this.rootDir = rootDir;
    this.cache = [];
    this.lastScanAt = null;

    // v24: substrate-aware meta (observer-only)
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

    // v24: deterministic filtering, no randomness
    this.cache = files
      .filter(f =>
        CONFIG.pictures.palPrefix.test(f) &&
        CONFIG.pictures.extensions.test(f)
      )
      .map(f => path.join(CONFIG.pictures.folder, f));

    this.lastScanAt = new Date().toISOString();
  }

  resolveAll(prefix = "PulsePal") {
    // v24: deterministic, zero‑churn
    return this.cache.filter(f => f.includes(prefix));
  }
}

/* =============================================================================
 *  PAL HISTORY SCANNER HOOK — v24 IMMORTAL‑INTEL
 *  Deterministic, zero‑churn, substrate‑aware (meta-only)
 * ============================================================================= */
class PulsePalHistoryScannerHook {
  constructor(rootDir) {
    this.rootDir = rootDir;
    this.scanner = null;

    // v24: substrate-safe dynamic loader
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
    // v24: if a real scanner exists, use it (observer-only)
    if (this.scanner && typeof this.scanner.scan === "function") {
      try {
        const result = await this.scanner.scan();
        return {
          ...result,
          version: "v24-IMMORTAL-INTEL",
          lastScanAt: new Date().toISOString()
        };
      } catch {
        // fall through to fallback
      }
    }

    // v24: deterministic fallback (zero-churn)
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

      // v24: deterministic continuity scoring
      // 2 points per message, capped at 100
      history.continuityScore = Math.min(100, files.length * 2);
    } catch {
      // no logs yet — deterministic zero state
    }

    return history;
  }
}

/* =============================================================================
 *  6. PULSEBAND / PULSE-WORLD-OS DAEMON — ROOT ORGANISM
 * ============================================================================= */
/* =============================================================================
 *  PULSE-WORLD-OS DAEMON (v24 IMMORTAL-INTEL, PART 1/2)
 *  - Now substrate-aware, binary-aware, cache-aware at the summary/meta level.
 *  - The actual world-binary/substrate wiring happens in the main loop (section 6).
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

    // v24: binary substrate / throughput summary (filled in main loop later)
    this.binarySubstrateSummary = {
      frameCount: 0,
      lastTag: null,
      lastBand: null,
      avgAdvantageTier: 0,
      avgAdvantageScore: 0,
      throughputClass: "throughput_low",
      avgThroughputScore: 0
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

    if (!this.palPersona || !this.palPersona.persona) {
      notes.push("No Pal persona snapshot yet. Persona engine has not reported.");
      actions.push(
        "Ensure PulsePalPersonaEngine is wired and running in the main OS."
      );
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

    // v24: optional world-binary / substrate view injected by main OS
    // This is *read-only*, daemon never routes or mutates it.
    const worldBinaryView =
      (global.PulseWorldBinarySnapshot && typeof global.PulseWorldBinarySnapshot === "object")
        ? global.PulseWorldBinarySnapshot
        : null;

    // Per-organ tick is now substrate-aware (if worldBinaryView is present)
    for (const organ of this.organs) {
      await organ.tick(proc, worldBinaryView);
    }

    this.buildBootMap();
    this.buildProxySummary();
    this.buildPalSummary();

    // v24: build binary substrate summary (meta-only, no routing)
    this.binarySubstrateSummary = this.buildBinarySubstrateSummary(worldBinaryView);

    // PAL HISTORY + PERSONA HOOKS
    const palHistory = await this.palHistoryScanner.scan();
    this.palHistory = palHistory;

    let palPersona = this.palPersona;
    try {
      if (
        global.PulsePalPersonaEngine &&
        typeof global.PulsePalPersonaEngine.compute === "function"
      ) {
        palPersona = global.PulsePalPersonaEngine.compute({
          daemonSnapshot: this.lastSnapshot,
          palSummary: this.palSummary,
          palHistory: palHistory,
          // v24: expose binary substrate meta to persona engine if it wants it
          binarySubstrateSummary: this.binarySubstrateSummary
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
        advantageTier: o.advantageTier,
        advantageScore: o.advantageScore,
        prewarmed: o.prewarmed,
        prechunked: o.prechunked,
        continuanceScore: o.continuanceScore,
        proxyContinuanceScore: o.proxyContinuanceScore,
        palContinuanceScore: o.palContinuanceScore,
        substrateLaneId: o.substrateLaneId,
        substratePhaseIndex: o.substratePhaseIndex,
        worldWaveIndex: o.worldWaveIndex,
        throughputClass: o.throughputClass,
        throughputScore: o.throughputScore,
        meta: o.meta
      })),
      bootMap: this.bootMap,
      proxySummary: this.proxySummary,
      palSummary: this.palSummary,
      palHistory: this.palHistory,
      palPersona: this.palPersona,
      palHelperSuggestions: this.palHelperSuggestions,
      // v24: new binary substrate meta surface
      binarySubstrateSummary: this.binarySubstrateSummary
    };

    if (!CONFIG.output.quiet && !CONFIG.output.json) {
      this.renderTui(this.lastSnapshot);
    }

    if (CONFIG.output.json) {
      console.log(JSON.stringify(this.lastSnapshot, null, 2));
    }

    if (CONFIG.output.snapshotFile) {
      try {
        fs.writeFileSync(
          CONFIG.output.snapshotFile,
          JSON.stringify(this.lastSnapshot, null, 2),
          "utf8"
        );
      } catch (e) {
        console.error(
          `${COLORS.red}${ICONS.err} Failed to write snapshot file: ${e.message}${COLORS.reset}`
        );
      }
    }

    if (global.PulseDaemonProxyTap) {
      try {
        global.PulseDaemonProxyTap(this.lastSnapshot);
      } catch {}
    }

    if (global.PulseDaemonPalTap) {
      try {
        global.PulseDaemonPalTap({
          palSummary: this.palSummary,
          palHistory: this.palHistory,
          palPersona: this.palPersona,
          palHelperSuggestions: this.palHelperSuggestions,
          binarySubstrateSummary: this.binarySubstrateSummary
        });
      } catch {}
    }
  }

  // v24: summarize world-binary / substrate view into a compact meta block
  buildBinarySubstrateSummary(worldBinaryView) {
    if (!worldBinaryView || typeof worldBinaryView !== "object") {
      return {
        frameCount: 0,
        lastTag: null,
        lastBand: null,
        avgAdvantageTier: 0,
        avgAdvantageScore: 0,
        throughputClass: "throughput_low",
        avgThroughputScore: 0
      };
    }

    const frames = Array.isArray(worldBinaryView.frames)
      ? worldBinaryView.frames
      : [];

    let frameCount = frames.length;
    let lastTag = null;
    let lastBand = null;

    let sumTier = 0;
    let sumScore = 0;
    let sumThroughput = 0;
    let samples = 0;

    for (const f of frames) {
      if (!f) continue;
      lastTag = f.tag || lastTag;
      lastBand = f.band || lastBand;

      if (Number.isFinite(f.advantageTier)) {
        sumTier += f.advantageTier;
      }
      if (Number.isFinite(f.advantageScore)) {
        sumScore += f.advantageScore;
      }
      if (Number.isFinite(f.throughputScore)) {
        sumThroughput += f.throughputScore;
      }
      samples++;
    }

    const avgAdvantageTier = samples > 0 ? sumTier / samples : 0;
    const avgAdvantageScore = samples > 0 ? sumScore / samples : 0;
    const avgThroughputScore = samples > 0 ? sumThroughput / samples : 0;

    let throughputClass = "throughput_low";
    if (avgThroughputScore > 0.75) throughputClass = "throughput_ultra";
    else if (avgThroughputScore > 0.5) throughputClass = "throughput_high";
    else if (avgThroughputScore > 0.25) throughputClass = "throughput_medium";

    return {
      frameCount,
      lastTag,
      lastBand,
      avgAdvantageTier: Number(avgAdvantageTier.toFixed(2)),
      avgAdvantageScore: Number(avgAdvantageScore.toFixed(3)),
      throughputClass,
      avgThroughputScore: Number(avgThroughputScore.toFixed(3))
    };
  }

  renderTui(snapshot) {
    const c = COLORS;
    console.clear();
    console.log(
      `${c.bold}${ICONS.band} PulseWorld-OS Continuance Daemon — v24 IMMORTAL PAL PROXY HELPER + BINARY SUBSTRATE OBSERVER${c.reset}`
    );
    console.log(
      `Host: ${snapshot.process.host}  PID: ${snapshot.process.pid}  CPU≈ ${snapshot.process.cpuApprox}%  RSS≈ ${snapshot.process.rssMb.toFixed(
        1
      )} MB`
    );
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
    console.log(
      `  Proxy: ${snapshot.proxySummary.proxyCount}, Binary: ${snapshot.proxySummary.binaryCount}, Organism: ${snapshot.proxySummary.organismCount}`
    );
    console.log(
      `  Dual-band: ${snapshot.proxySummary.dualBandCount}, Immortal: ${snapshot.proxySummary.immortalProxyCount}, Avg P-Cont: ${snapshot.proxySummary.avgProxyContinuance}`
    );

    console.log("");
    console.log(`${c.bold}${ICONS.pal} Pulse‑Pal Summary:${c.reset}`);
    console.log(
      `  Pal organs: ${snapshot.palSummary.palCount} (core=${snapshot.palSummary.palCoreCount}, media=${snapshot.palSummary.palMediaCount}, world=${snapshot.palSummary.palWorldCount})`
    );
    console.log(
      `  Immortal pal: ${snapshot.palSummary.immortalPalCount}, Avg Pal-Cont: ${snapshot.palSummary.avgPalContinuance}`
    );
    console.log(`  Media files: ${snapshot.palSummary.palMediaFilesCount}`);

    console.log("");
    console.log(`${c.bold}${ICONS.memory || ICONS.band} Pal History:${c.reset}`);
    console.log(`  Messages scanned: ${snapshot.palHistory.messagesScanned}`);
    console.log(`  Continuity score: ${snapshot.palHistory.continuityScore}`);
    console.log(
      `  Sources: ${snapshot.palHistory.sources.join(", ") || "(none)"}`
    );

    console.log("");
    console.log(`${c.bold}${ICONS.ai_brain || ICONS.band} Pal Persona:${c.reset}`);
    if (snapshot.palPersona && snapshot.palPersona.persona) {
      console.log(`  Persona:`, JSON.stringify(snapshot.palPersona.persona));
      console.log(`  Tone   :`, JSON.stringify(snapshot.palPersona.tone));
      console.log(`  Behavior:`, JSON.stringify(snapshot.palPersona.behavior));
      console.log(
        `  Continuity:`,
        JSON.stringify(snapshot.palPersona.continuity)
      );
      console.log(
        `  Identity:`,
        JSON.stringify(snapshot.palPersona.identity)
      );
    } else {
      console.log("  (no persona snapshot yet)");
    }

    console.log("");
    console.log(`${c.bold}${ICONS.binary} Binary Substrate:${c.reset}`);
    console.log(
      `  Frames: ${snapshot.binarySubstrateSummary.frameCount}, Last tag: ${snapshot.binarySubstrateSummary.lastTag || "(none)"}, Last band: ${snapshot.binarySubstrateSummary.lastBand || "(none)"}`
    );
    console.log(
      `  Avg advantage tier: ${snapshot.binarySubstrateSummary.avgAdvantageTier}, Avg advantage score: ${snapshot.binarySubstrateSummary.avgAdvantageScore}`
    );
    console.log(
      `  Throughput: ${snapshot.binarySubstrateSummary.throughputClass} (avg=${snapshot.binarySubstrateSummary.avgThroughputScore})`
    );

    console.log("");
    console.log(`${c.bold}${ICONS.upgrade} Pal Helper Suggestions:${c.reset}`);
    console.log(`  Priority: ${snapshot.palHelperSuggestions.priority}`);
    for (const note of snapshot.palHelperSuggestions.notes) {
      console.log(`  - ${note}`);
    }
  }
  /* =============================================================================
   *  6. START / STOP (v24 IMMORTAL-INTEL)
   *  - Now substrate-aware (observer-only)
   *  - Pulls worldBinaryView each tick (if provided by main OS)
   *  - Zero-drift, deterministic, safe
   * ============================================================================= */
  async start() {
    // Initial organ discovery
    this.discoverOrgans();

    // First tick builds initial snapshot + substrate summary
    await this.tickOnce();

    if (CONFIG.output.once) {
      return;
    }

    // v24: deterministic interval, no drift, no async loops
    this.timer = setInterval(() => {
      this.tickOnce().catch(err => {
        console.error(
          `${COLORS.red}${ICONS.err} Tick error: ${err.message}${COLORS.reset}`
        );
      });
    }, CONFIG.tickMs);
  }

  stop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  /* =============================================================================
   *  7. GETTERS (v24 IMMORTAL-INTEL)
   * ============================================================================= */
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

  getBinarySubstrateSummary() {
    return this.binarySubstrateSummary;
  }

  getSnapshot() {
    return this.lastSnapshot;
  }

  exportSnapshot(filePath) {
    const target = filePath || CONFIG.output.snapshotFile;
    if (!target) return;
    fs.writeFileSync(
      target,
      JSON.stringify(this.lastSnapshot, null, 2),
      "utf8"
    );
  }
}

/* =============================================================================
 *  8. MAIN ENTRY (v24 IMMORTAL-INTEL)
 * ============================================================================= */
const daemon = new PulseBandDaemon();

if (require.main === module) {
  daemon.start().catch(err => {
    console.error(
      `${COLORS.red}${ICONS.err} Failed to start daemon: ${err.message}${COLORS.reset}`
    );
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
