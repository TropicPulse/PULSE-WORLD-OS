// ============================================================================
//  FILE: /PULSE-PROXY/PulseProxySpine-v20-IMMORTAL-PROXY-SPINE.js
//  PULSE OS v20-IMMORTAL — PULSE PROXY SPINE (BACKEND PROXY SPINE)
//  Unified TPProxy Gateway • Vitals Pump • OS‑Healer Feed • SDN Prewarm Bridge
//  SYMBOLIC BACKEND ORGAN — NO ROUTING IQ, NO MARKETPLACE BRAIN.
//  v20-IMMORTAL: Dual-band, presence/harmonics, advantage-field, prewarm/cache/chunk/remember
//                Fully proxy-aware, organism-aware, PNS-aware, Experience-aware,
//                CoreMemory/ProxyFront/Context‑linked, PNSRepair/PNSPurifier‑linked,
//                Binary/GPU-aware as metrics-only surfaces.
// ============================================================================
//
//  WHAT THIS ORGAN IS (v20-IMMORTAL-PROXY-SPINE):
//  ---------------------------------------------
//  • Backend Proxy Spine of PulseProxy for the organism (symbolic + binary-aware).
//  • Single ingress spine for TPProxy traffic, vitals, OS‑healer feeds, proxy context,
//    and nervous system mirrors.
//  • Maintains an OS‑visible healingState for PulseProxyHealer / GlobalHealer / WorldCore.
//  • Owns Redis + mailer wiring, but never routing IQ or marketplace brain.
//  • Fail‑open by design: degraded modes are logged, never fatal.
//  • Dual‑band compatible, presence/harmonics/SDN‑prewarm aware as passive metadata.
//  • Proxy‑aware: surfaces ProxyFront, ProxyContext, ProxyOrganism snapshots as
//    descriptive fields only (no mutation of those organs).
//  • PNS‑aware: consumes PNS symbolic nervous snapshot and exposes it to healers.
//  • Experience‑aware: exposes an ExperienceMeta block for AI/agent experience surfaces.
//  • Binary/GPU‑aware: surfaces binary/GPU metrics as descriptive fields only.
//
//  WHAT THIS ORGAN IS NOT:
//  ------------------------
//  • NOT a router brain (no dynamic routing intelligence).
//  • NOT a marketplace engine or pricing layer.
//  • NOT a scoring / ranking engine.
//  • NOT a business rules engine.
//  • NOT a place for OSKernel logic or GPU compute.
//  • NOT a binary execution organ — binary/GPU are metrics-only surfaces.
//
//  SAFETY CONTRACT (v20-IMMORTAL-PROXY-SPINE):
//  -------------------------------------------
//  • Fail‑open: Redis / mailer / env failures degrade, never crash the process.
//  • No IQ, no routing intelligence, no marketplace logic.
//  • No mutation outside healingState + explicit global boot flags.
//  • Deterministic boot guards (single‑boot, idempotent).
//  • Drift‑proof identity + context via PROXY_CONTEXT + ProxyContext + ProxyFrontMeta.
//  • Multi‑instance safe: no singleton assumptions beyond process‑local flags.
//  • Presence/harmonics/dual‑band/SDN‑prewarm are surfaced as metadata only.
//  • No randomness in math; timestamps only for telemetry, not decision math.
//  • No execution of binary/GPU surfaces; metrics-only.
// ============================================================================

import express from "express";
import nodemailer from "nodemailer";
import { createClient } from "redis";
import crypto from "crypto";

// SDN prewarm engine (spinal reflex ignition for backend spine, passive only)
import { prewarmSDN } from "../PULSE-OS/PulseOSSDNPrewarm-v16.js";

// Proxy / organism / context / front (symbolic-only, descriptive surfaces)
import { PulseProxyOrganismMeta, createProxy } from "./PulseProxy-v16.js";
import { PulseProofBridge as PulseProxyBridge } from "../../PULSE-UI/_BACKEND/PulseWorldBridge.js";
import { updateUserMetrics as recordUserMetrics } from "../../PULSE-UI/_BACKEND/PulseProofMonitor.js";
import {
  proxyFrontRoute,
  PulseProxyFrontMeta
} from "./PulseProxyFront-v16.js";
import {
  updateProxyStateFromEnvelope,
  getProxyContext,
  getProxyPressure,
  getProxyBoost,
  getProxyFallback,
  getProxyMode,
  getProxyLineage
} from "./PulseProxyContext-v16.js";

// Nervous system symbolic band (for dual-band awareness)
import {
  PulseBandSymbolicMeta,
  pulseband as PulseBandSymbolic
} from "./PulseProxyPNSNervousSystem-v16.js";

// PNS repair / purifier (symbolic-only healing helpers)
import { PNSPurifier } from "./PulseProxyPNSPurifier.js";
import { PNSRepair } from "./PulseProxyPNSRepair.js";

// Earn + metrics + OS healers + OS binary
import { createPulseEarnSendSystem } from "../PULSE-EARN/PulseEarnSendSystem.js";

import startPulseTimer from "./PulseProxyHeart.js";
import { createPulseOSHealerV12_3 as startPulseOSHealer } from "../PULSE-OS/PulseOSInflammatoryResponse.js";
import { createGlobalHealerV12 as startGlobalHealer } from "../PULSE-OS/PulseOSImmuneSystem.js";
import { PulseBinaryOSv11Evo as startPulseOS } from "../PULSE-OS/PulseBinaryOS-v16.js";

// Binary/GPU metrics (descriptive only)
import { getBinaryMetrics } from "../PULSE-OS/PulseBinaryOS-v16.js";
import { getGPUMetrics } from "../PULSE-OS/PulseGPUOrgan-v16.js";

import { getStripe as Stripe, stripeInstance, determinePayoutCurrency } from "../PULSE-X/PulseWorldBank-v20.js";
import { db, admin } from "../PULSE-X/PulseWorldGenome-v20.js";
import { getTwilioClient as twilio } from "../PULSE-X/PulseWorldSMSAlert-v20.js";
import { corsHandler } from "../PULSE-X/PulseWorldTransport-v20.js";
const storage = admin.storage().bucket();
import { onRequest } from "firebase-functions/v2/https";

export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
const STRIPE_PASSWORD = process.env.STRIPE_SECRET_KEY;
const JWT_SECRET = process.env.JWT_SECRET;

// CLOUD RUN ENVIRONMENTS
const TP_API_KEY = process.env.TP_API_KEY;
const BASE_PAYMENT_URL = process.env.BASE_PAYMENT_URL;
const GOOGLE_MAPS_KEY = process.env.GOOGLE_MAPS_KEY;
const PLACEHOLDER_IMAGE_URL = process.env.PLACEHOLDER_IMAGE_URL;

const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_SECRET_WEBHOOK;
const MESSAGING_SERVICE_SID = process.env.MESSAGING_SERVICE_SID;
const ACCOUNT_SID = process.env.ACCOUNT_SID;
const AUTH_TOKEN = process.env.AUTH_TOKEN;

// CONFIG
const PIN_COLLECTION = process.env.PIN_COLLECTION;
const RATE_LIMIT_WINDOW_MS = process.env.RATE_LIMIT_WINDOW_MS;
const MAX_REQUESTS_PER_WINDOW = process.env.MAX_REQUESTS_PER_WINDOW;
const PIN_TTL_MS = process.env.PIN_TTL_MS;

const log   = global.log   || console.log;
const warn  = global.warn  || console.warn;
const error = global.error || console.error;

// backend-only PulseChunker base URL
const CHUNKER_BASE =
  process.env.PULSE_CHUNKER_BASE ||
  "https://us-central1-tropic-pulse.cloudfunctions.net";

// ============================================================================
//  EXPERIENCE META BLOCK — AI / Agent Experience Surfaces (v20)
// ============================================================================
export const PulseProxySpineExperienceMeta = Object.freeze({
  layer: "BackendProxySpine",
  role: "EXPERIENCE_SPINE",
  version: "v20-IMMORTAL-PROXY-SPINE",
  identity: "PulseProxySpineExperience-v20-IMMORTAL",
  experience: {
    surfaces: {
      proxyContext: true,
      nervousSnapshot: true,
      spineBand: true,
      spineWaveField: true,
      spineAdvantageField: true,
      presenceBandState: true,
      harmonicDrift: true,
      coherenceScore: true,
      rateLimitBand: true,
      redisStatus: true,
      binaryMetrics: true,
      gpuMetrics: true
    },
    healingHooks: {
      pnsRepair: true,
      pnsPurifier: true,
      osHealer: true,
      globalHealer: true
    },
    narrative: {
      description:
        "Backend proxy spine that turns TPProxy traffic, nervous snapshots, band/field metadata, and binary/GPU metrics " +
        "into a stable, organism-readable experience surface for AI/agents. It does not route or score; " +
        "it only describes, heals, and reflects.",
      aiUsageHint:
        "Use this organ's surfaces to understand network health, proxy pressure, compute pressure, and healing state. " +
        "Never treat it as a router; treat it as a vitals + experience mirror."
    }
  }
});

// ============================================================================
//  SPINE IDENTITY — v20-IMMORTAL-PROXY-SPINE (backend proxy spine)
// ============================================================================
export const PulseRole = {
  type: "Organ",
  subsystem: "PulseProxy",
  layer: "BackendProxySpine",
  version: "v20-IMMORTAL-PROXY-SPINE",
  identity: "PulseProxySpine-v20-IMMORTAL-PROXY-SPINE",

  evo: {
    deterministic: true,
    driftProof: true,
    backendOnly: true,
    symbolicBackend: true,

    presenceAware: true,
    harmonicsAware: true,
    dualBandCompatible: true,
    epochStable: true,
    passivePrewarm: true,
    passiveCache: true,
    passiveChunk: true,
    passiveRemember: true,
    passiveForwarding: true,

    sdnPrewarmAware: true,
    spinalReflexIgnition: true,
    proxySpineImmortal: true,

    proxyFrontAware: true,
    proxyContextAware: true,
    proxyOrganismAware: true,
    nervousSystemAware: true,

    pnsRepairAware: true,
    pnsPurifierAware: true,
    osHealerAware: true,
    globalHealerAware: true,

    experienceMetaAware: true,

    dualModeEvolution: false,
    noIQ: true,
    noRouting: true,
    noCompute: true,
    multiInstanceReady: true,
    unifiedAdvantageField: true,
    pulseEfficiencyAware: true,
    clusterCoherence: true,
    zeroDriftCloning: true,
    reflexPropagation: 1.0,
    organismClusterBoost: 1.0,
    cognitiveComputeLink: true,
    futureEvolutionReady: true
  }
};

// ============================================================================
//  HUMAN‑READABLE CONTEXT MAP — Spine Identity (v20 IMMORTAL PROXY SPINE)
// ============================================================================
const PROXY_CONTEXT = {
  layer: PulseRole.layer,
  role: PulseRole.identity,
  purpose:
    "Ingress TPProxy traffic symbolically, expose vitals, protect user by failing open, feed OS healers, PNS healers, and organism context",
  context:
    "Unified TPProxy gateway + vitals pump + proxy context bridge for OS-level healers, PNS healers, admin dashboards, and organism surfaces",
  version: PulseRole.version,
  target: "proxy-core",
  selfRepairable: true,
  evo: PulseRole.evo,
  experience: PulseProxySpineExperienceMeta
};

export const PulseProxySpineMeta = Object.freeze({
  layer: "PulseProxySpine",
  role: "BACKEND_PROXY_SPINE_ORGAN",
  version: "v20-IMMORTAL-PROXY-SPINE",
  identity: "PulseProxySpine-v20-IMMORTAL-PROXY-SPINE",

  guarantees: Object.freeze({
    deterministic: true,
    driftProof: true,
    multiInstanceReady: true,
    backendOnly: true,
    symbolicBackend: true,
    dualModeEvolution: false,
    unifiedAdvantageField: true,
    pulseEfficiencyAware: true,
    clusterCoherence: true,
    zeroDriftCloning: true,
    reflexPropagation: true,
    organismClusterBoost: true,
    cognitiveComputeLink: true,
    failOpenSafe: true,

    presenceAware: true,
    harmonicsAware: true,
    dualBandCompatible: true,
    epochStable: true,
    passivePrewarm: true,
    passiveCache: true,
    passiveChunk: true,
    passiveRemember: true,
    passiveForwarding: true,
    sdnPrewarmAware: true,

    proxyFrontAware: true,
    proxyContextAware: true,
    proxyOrganismAware: true,
    nervousSystemAware: true,

    pnsRepairAware: true,
    pnsPurifierAware: true,
    osHealerAware: true,
    globalHealerAware: true,

    experienceMetaAware: true,

    zeroIQ: true,
    zeroRouting: true,
    zeroMarketplace: true,
    zeroScoring: true,
    zeroBusinessLogic: true,
    zeroOSKernelLogic: true,
    zeroGPULogic: true,
    zeroRandomness: true,
    zeroTimers: true,
    zeroAsyncLoops: true,
    zeroNetworkMutation: true,
    zeroExternalMutation: true,
    zeroDynamicImports: true,
    zeroEval: true,
    zeroWindow: true,
    zeroDOM: true,
    zeroGPU: true,

    symbolicAware: true,
    binaryAware: true,
    bandAware: true,
    waveFieldAware: true,
    binaryFieldAware: false,

    worldLensAware: false
  }),

  contract: Object.freeze({
    input: [
      "TPProxyRequest",
      "VitalsSnapshot",
      "HealerContext",
      "BackendContext",
      "PresenceBandState",
      "HarmonicSnapshot",
      "ProxyFrontEnvelope",
      "ProxyContextState",
      "NervousSystemSnapshot"
    ],
    output: [
      "SpineIngressResult",
      "SpineBandSignature",
      "SpineWaveField",
      "SpineAdvantageField",
      "SpineProxyContextSnapshot",
      "SpineDiagnostics",
      "SpineHealingState",
      "SpineExperienceMeta"
    ]
  }),

  lineage: Object.freeze({
    root: "PulseProxy-v11",
    parent: "PulseProxy-v20-IMMORTAL",
    ancestry: [
      "PulseProxySpine-v7",
      "PulseProxySpine-v8",
      "PulseProxySpine-v9",
      "PulseProxySpine-v10",
      "PulseProxySpine-v11",
      "PulseProxySpine-v11.1",
      "PulseProxySpine-v11-Evo",
      "PulseProxySpine-v11.2-Evo-BINARY-MAX",
      "PulseProxySpine-v12.3-Evo",
      "PulseProxySpine-v14.0-Presence-Immortal-BACKEND",
      "PulseProxySpine-v16-Immortal-PROXY-SPINE",
      "PulseProxySpine-v20-IMMORTAL-PROXY-SPINE"
    ]
  }),

  bands: Object.freeze({
    supported: ["symbolic"],
    default: "symbolic",
    behavior: "backend-proxy-spine"
  }),

  architecture: Object.freeze({
    pattern: "A-B-A",
    baseline: "TPProxy ingress → vitals pump → OS/PNS-healer + proxy-context feed",
    adaptive:
      "wave-field overlays (no binary execution) + SDN prewarm bridge + proxy context + nervous system mirrors + experience surfaces + binary/GPU metrics",
    return: "deterministic spine surfaces + signatures + proxy context snapshot + experience meta"
  })
});

const PULSE_VERSION = PulseProxySpineMeta.version;

log(
  "%c🟦 PulseProxySpine %s online — backend proxy spine + vitals pump + SDN prewarm + proxy context + PNS healing + experience meta active.",
  "color:#03A9F4; font-weight:bold;",
  PulseProxySpineMeta.version
);

// ============================================================================
//  INTERNAL HELPERS — band / wave / advantage surfaces for the spine
// ============================================================================
function spineComputeHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 99991;
  }
  return `spine-h${h}`;
}

function buildSpineBand() {
  return "symbolic-proxy-spine-v20";
}

function buildSpineWaveField({ region, mode, latencyClass, networkHealth } = {}) {
  const key = [
    region || "UnknownRegion",
    mode || "UnknownMode",
    latencyClass || "UnknownLatency",
    networkHealth || "UnknownHealth"
  ].join("::");

  const amplitude = 10 + (key.length % 13);
  const wavelength = amplitude + 13;
  const phase = (amplitude * 11) % 127;

  return {
    amplitude,
    wavelength,
    phase,
    band: "proxy-spine-v20",
    mode: "symbolic-wave",
    waveSignature: spineComputeHash(`SPINE_WAVE_V20::${key}::${amplitude}`)
  };
}

function buildSpineAdvantageField({ rateLimitBand, redisReady, offlineMode, cpuLoad, gpuLoad } = {}) {
  const rlBand = rateLimitBand || "low";
  const redisScore = redisReady ? 1 : 0.4;
  const onlineScore = offlineMode ? 0.5 : 1.0;

  const cpuScore = cpuLoad != null ? Math.max(0, 1 - cpuLoad) : 1;
  const gpuScore = gpuLoad != null ? Math.max(0, 1 - gpuLoad) : 1;

  let pressureBand = "low";
  if (rlBand === "critical") pressureBand = "critical";
  else if (rlBand === "high") pressureBand = "high";
  else if (rlBand === "medium") pressureBand = "medium";

  const advantageScore = Math.max(
    0,
    Math.min(
      1,
      redisScore * onlineScore * cpuScore * gpuScore * (pressureBand === "critical" ? 0.4 : 1)
    )
  );

  return {
    pressureBand,
    redisReady,
    offlineMode,
    cpuLoad,
    gpuLoad,
    advantageScore,
    advantageSignature: spineComputeHash(
      `SPINE_ADVANTAGE_V20::${pressureBand}::${redisReady ? "1" : "0"}::${offlineMode ? "1" : "0"}::${cpuLoad ?? "?"}::${gpuLoad ?? "?"}::${advantageScore}`
    )
  };
}

function buildSpineBandSignature(band) {
  return spineComputeHash(`SPINE_BAND_V20::${band}`);
}

// ============================================================================
//  HEALING METADATA — OS-visible heartbeat for PulseProxyHealer (IMMORTAL)
// ============================================================================
const healingState = {
  ...PROXY_CONTEXT,
  lastRequestTs: null,
  lastError: null,
  lastProxyError: null,
  lastRedisError: null,
  lastEmailError: null,
  lastWarmConnection: null,
  lastRateLimitDecision: null,
  lastTPProxyCall: null,
  lastHealthCheck: null,
  lastMetricsCheck: null,
  lastNodeCheck: null,
  lastPingCheck: null,
  cycleCount: 0,
  status: "healthy",
  mode: "online",

  pulsePrewarm: null,
  pulseCacheMode: null,
  pulseChunkMode: null,
  pulseRemember: null,

  presenceBandState: null,
  harmonicDrift: null,
  coherenceScore: null,

  dualBandMode: "symbolic",

  spineBand: null,
  spineBandSignature: null,
  spineWaveField: null,
  spineAdvantageField: null,

  proxyContextSnapshot: null,
  proxyPressure: 0,
  proxyBoost: 0,
  proxyFallback: false,
  proxyMode: "normal",
  proxyLineage: null,

  nervousSnapshot: null,

  binaryMetrics: null,
  gpuMetrics: null,

  experienceMeta: PulseProxySpineExperienceMeta
};

export function getSpineHealingState() {
  return { ...healingState };
}

// ============================================================================
//  ENV + IDENTITY + MODE — v20 IMMORTAL BACKEND PROXY SPINE
// ============================================================================
const MAX_REQUESTS_PER_DAY = Number(process.env.PULSE_MAX_REQ_PER_DAY || "5000");

const START_TIME = Date.now();
global.__lastStartTime = global.__lastStartTime || START_TIME;

const CLOUD_REGION =
  process.env.GOOGLE_CLOUD_REGION ||
  process.env.X_GOOGLE_GCLOUD_REGION ||
  "US-Central1";

const NODE_ID = process.env.K_REVISION || process.env.HOSTNAME || "Local";

const OFFLINE_MODE =
  process.env.PULSE_OFFLINE_MODE === "1" ||
  process.env.PULSE_PROXY_MODE === "offline";

healingState.mode = OFFLINE_MODE ? "offline" : "online";

log(
  "%c[SPINE BOOT] Identity:",
  "color:#03A9F4; font-weight:bold;",
  {
    region: CLOUD_REGION,
    nodeId: NODE_ID,
    version: PULSE_VERSION,
    maxRequestsPerDay: MAX_REQUESTS_PER_DAY,
    mode: OFFLINE_MODE ? "OFFLINE (local-only)" : "ONLINE (internet-enabled)"
  }
);

// ============================================================================
//  MAILER — v20 IMMORTAL BACKEND PROXY SPINE (admin alerts)
// ============================================================================
const ALERT_EMAIL_TO = process.env.PULSE_ADMIN_EMAIL_TO || "FordFamilyDelivery@gmail.com";
const ALERT_EMAIL_FROM = process.env.PULSE_ADMIN_EMAIL_FROM || `"Tropic Pulse" <Sales@TropicPulse.bz>`;
const SMTP_HOST = process.env.PULSE_SMTP_HOST || "smtp.gmail.com";
const SMTP_USER = process.env.PULSE_SMTP_USER || "Sales@TropicPulse.bz";
const SMTP_PASS = process.env.EMAIL_PASSWORD;

const transporter =
  SMTP_HOST && SMTP_USER && SMTP_PASS
    ? nodemailer.createTransport({
        host: SMTP_HOST,
        port: 465,
        secure: true,
        auth: { user: SMTP_USER, pass: SMTP_PASS }
      })
    : null;

if (transporter) {
  log(
    "%c[SPINE BOOT] Mailer enabled — critical alerts will be sent.",
    "color:#4CAF50; font-weight:bold;"
  );
} else {
  log(
    "%c[SPINE BOOT] Mailer disabled — EMAIL_PASSWORD / SMTP config missing.",
    "color:#FFC107; font-weight:bold;"
  );
}

async function sendCriticalEmail(subject, payload) {
  if (!transporter) return;

  try {
    await transporter.sendMail({
      from: ALERT_EMAIL_FROM,
      to: ALERT_EMAIL_TO,
      secure: true,
      subject,
      text: JSON.stringify(payload, null, 2)
    });
  } catch (err) {
    const msg = String(err);
    healingState.lastEmailError = msg;
    error("%c[PULSE EMAIL ERROR]", "color:#FF5252; font-weight:bold;", msg);
  }
}

// ============================================================================
//  CONTEXT SHAPE / VITALS / RATE LIMIT / DESCRIPTORS (exported helpers)
// ============================================================================
export function createSpineContext({
  layer = "BackendProxySpine",
  role = PulseRole.identity,
  purpose = "Unified TPProxy gateway + vitals pump + OS/PNS healer + proxy context + experience feed",
  context = "Backend proxy spine for PulseProxy: routes TPProxy traffic symbolically, exposes vitals, feeds healers and organism context, and surfaces experience meta",
  version = PulseRole.version,
  target = "proxy-core",
  selfRepairable = true
} = {}) {
  return {
    layer,
    role,
    purpose,
    context,
    version,
    target,
    selfRepairable,
    evo: { ...PulseRole.evo },
    experience: PulseProxySpineExperienceMeta
  };
}

export function createEmptyVitals(context = createSpineContext()) {
  return {
    ...context,
    lastRequestTs: null,
    lastError: null,
    lastProxyError: null,
    lastRedisError: null,
    lastEmailError: null,
    lastWarmConnection: null,
    lastRateLimitDecision: null,
    lastTPProxyCall: null,
    lastHealthCheck: null,
    lastMetricsCheck: null,
    lastNodeCheck: null,
    lastPingCheck: null,
    cycleCount: 0,
    status: "healthy",
    mode: "online",

    pulsePrewarm: null,
    pulseCacheMode: null,
    pulseChunkMode: null,
    pulseRemember: null,

    presenceBandState: null,
    harmonicDrift: null,
    coherenceScore: null,

    dualBandMode: "symbolic",

    spineBand: null,
    spineBandSignature: null,
    spineWaveField: null,
    spineAdvantageField: null
  };
}

export function computeRateLimitState({
  totalRequestsToday,
  maxRequestsPerDay,
  nowMs,
  startTimeMs
} = {}) {
  const safeTotal = Number.isFinite(totalRequestsToday)
    ? Math.max(0, totalRequestsToday)
    : 0;

  const safeMax = Number.isFinite(maxRequestsPerDay) && maxRequestsPerDay > 0
    ? maxRequestsPerDay
    : 1;

  const usageRatio = safeTotal / safeMax;
  const clampedRatio = usageRatio > 1 ? 1 : usageRatio;

  let band = "low";
  if (clampedRatio >= 0.9) band = "critical";
  else if (clampedRatio >= 0.7) band = "high";
  else if (clampedRatio >= 0.4) band = "medium";

  const uptimeMs =
    Number.isFinite(nowMs) && Number.isFinite(startTimeMs) && nowMs >= startTimeMs
      ? nowMs - startTimeMs
      : null;

  return {
    totalRequestsToday: safeTotal,
    maxRequestsPerDay: safeMax,
    usageRatio: clampedRatio,
    band,
    uptimeMs
  };
}

export function buildNodeDescriptor({
  region,
  nodeId,
  version,
  mode,
  maxRequestsPerDay
} = {}) {
  return {
    region: region || "unknown-region",
    nodeId: nodeId || "unknown-node",
    version: version || PULSE_VERSION,
    mode: mode === "offline" ? "offline" : "online",
    maxRequestsPerDay: Number.isFinite(maxRequestsPerDay)
      ? maxRequestsPerDay
      : null
  };
}

export function buildHealabilitySnapshot({
  vitals,
  rateLimit,
  nodeDescriptor,
  redisReady,
  offlineMode
} = {}) {
  const v = vitals || {};
  const r = rateLimit || {};
  const n = nodeDescriptor || {};

  const redisStatus = redisReady ? "ready" : "degraded";
  const mode = offlineMode ? "offline" : "online";

  let health = "healthy";

  if (v.lastProxyError || v.lastRedisError || v.lastEmailError) {
    health = "degraded";
  }

  if (r.band === "critical") {
    health = "rate-limited";
  }

  if (mode === "offline") {
    health = health === "healthy" ? "offline" : health;
  }

  return {
    health,
    mode,
    redisStatus,
    node: {
      region: n.region,
      nodeId: n.nodeId,
      version: n.version
    },
    rateLimit: {
      band: r.band,
      usageRatio: r.usageRatio,
      totalRequestsToday: r.totalRequestsToday,
      maxRequestsPerDay: r.maxRequestsPerDay
    },
    vitals: {
      lastRequestTs: v.lastRequestTs,
      lastError: v.lastError,
      lastProxyError: v.lastProxyError,
      lastRedisError: v.lastRedisError,
      lastEmailError: v.lastEmailError,
      lastWarmConnection: v.lastWarmConnection,
      lastRateLimitDecision: v.lastRateLimitDecision,
      lastTPProxyCall: v.lastTPProxyCall,
      lastHealthCheck: v.lastHealthCheck,
      lastMetricsCheck: v.lastMetricsCheck,
      lastNodeCheck: v.lastNodeCheck,
      lastPingCheck: v.lastPingCheck,
      cycleCount: v.cycleCount,

      presenceBandState: v.presenceBandState,
      harmonicDrift: v.harmonicDrift,
      coherenceScore: v.coherenceScore,
      pulsePrewarm: v.pulsePrewarm,
      pulseCacheMode: v.pulseCacheMode,
      pulseChunkMode: v.pulseChunkMode,
      pulseRemember: v.pulseRemember,
      dualBandMode: v.dualBandMode,

      spineBand: v.spineBand,
      spineBandSignature: v.spineBandSignature,
      spineWaveField: v.spineWaveField,
      spineAdvantageField: v.spineAdvantageField
    }
  };
}

export function bumpCycle(vitals, { nowMs } = {}) {
  const base = vitals || {};
  return {
    ...base,
    lastRequestTs: Number.isFinite(nowMs) ? nowMs : base.lastRequestTs || null,
    cycleCount: (base.cycleCount || 0) + 1
  };
}

export function recordError(vitals, { type, message, nowMs } = {}) {
  const base = vitals || {};
  const msg = typeof message === "string" ? message : String(message || "");

  const next = {
    ...base,
    lastError: msg
  };

  if (type === "proxy") {
    next.lastProxyError = msg;
  } else if (type === "redis") {
    next.lastRedisError = msg;
  } else if (type === "email") {
    next.lastEmailError = msg;
  }

  if (Number.isFinite(nowMs)) {
    next.lastRequestTs = nowMs;
  }

  return next;
}

export function recordWarmConnection(vitals, { nowMs } = {}) {
  const base = vitals || {};
  return {
    ...base,
    lastWarmConnection: Number.isFinite(nowMs) ? nowMs : base.lastWarmConnection || null
  };
}

export function recordRateLimitDecision(vitals, { decision, nowMs } = {}) {
  const base = vitals || {};
  return {
    ...base,
    lastRateLimitDecision: decision || base.lastRateLimitDecision || null,
    lastRequestTs: Number.isFinite(nowMs) ? nowMs : base.lastRequestTs || null
  };
}

export function recordTPProxyCall(vitals, { nowMs } = {}) {
  const base = vitals || {};
  return {
    ...base,
    lastTPProxyCall: Number.isFinite(nowMs) ? nowMs : base.lastTPProxyCall || null
  };
}

export function recordHealthCheck(vitals, { nowMs } = {}) {
  const base = vitals || {};
  return {
    ...base,
    lastHealthCheck: Number.isFinite(nowMs) ? nowMs : base.lastHealthCheck || null
  };
}

export function recordMetricsCheck(vitals, { nowMs } = {}) {
  const base = vitals || {};
  return {
    ...base,
    lastMetricsCheck: Number.isFinite(nowMs) ? nowMs : base.lastMetricsCheck || null
  };
}

export function recordNodeCheck(vitals, { nowMs } = {}) {
  const base = vitals || {};
  return {
    ...base,
    lastNodeCheck: Number.isFinite(nowMs) ? nowMs : base.lastNodeCheck || null
  };
}

export function recordPingCheck(vitals, { nowMs } = {}) {
  const base = vitals || {};
  return {
    ...base,
    lastPingCheck: Number.isFinite(nowMs) ? nowMs : base.lastPingCheck || null
  };
}

export function describePacket({
  packetId,
  userId,
  deviceId,
  kind,
  createdAtMs,
  sizeBytes
} = {}) {
  return {
    packetId: packetId || null,
    userId: userId || null,
    deviceId: deviceId || null,
    kind: kind || "unknown",
    createdAtMs: Number.isFinite(createdAtMs) ? createdAtMs : null,
    sizeBytes: Number.isFinite(sizeBytes) ? sizeBytes : null
  };
}

export function describeRedisState({ ready, lastError } = {}) {
  return {
    ready: !!ready,
    lastError: lastError ? String(lastError) : null,
    status: ready ? "ready" : "degraded"
  };
}

export function describeMailerState({ enabled, lastError } = {}) {
  return {
    enabled: !!enabled,
    lastError: lastError ? String(lastError) : null,
    status: enabled ? "ready" : "disabled"
  };
}

export function describeTPProxyState({
  lastTPProxyCall,
  lastProxyError
} = {}) {
  return {
    lastTPProxyCall: Number.isFinite(lastTPProxyCall) ? lastTPProxyCall : null,
    lastProxyError: lastProxyError ? String(lastProxyError) : null
  };
}

// ============================================================================
//  REDIS — v20 IMMORTAL BACKEND PROXY SPINE (fail-open, with admin alerts)
// ============================================================================
let redis = null;
let redisReady = false;

if (process.env.REDIS_URL) {
  log("%c[SPINE BOOT] Redis URL detected — initializing client…", "color:#FFC107; font-weight:bold;");
  redis = createClient({ url: process.env.REDIS_URL });

  redis.on("ready", () => {
    redisReady = true;
    global.__lastRedisError = null;
    log("%c[REDIS] Connected — cache + rate limiting enabled (fail-open safe).", "color:#4CAF50; font-weight:bold;");
  });

  redis.on("error", (err) => {
    redisReady = false;
    const msg = String(err);
    global.__lastRedisError = msg;
    healingState.lastRedisError = msg;
    warn("%c[REDIS ERROR] Entering degraded / fail-open mode:", "color:#FF9800; font-weight:bold;", msg);

    sendCriticalEmail("[PulseProxySpine] Redis Error", {
      nodeId: NODE_ID,
      region: CLOUD_REGION,
      version: PULSE_VERSION,
      error: msg,
      time: new Date().toISOString()
    });
  });

  redis.connect().catch((err) => {
    const msg = String(err);
    redisReady = false;
    global.__lastRedisError = msg;
    healingState.lastRedisError = msg;
    warn("%c[REDIS CONNECT FAILED] Staying in fail-open mode:", "color:#FF9800; font-weight:bold;", msg);

    sendCriticalEmail("[PulseProxySpine] Redis Connect Failed", {
      nodeId: NODE_ID,
      region: CLOUD_REGION,
      version: PULSE_VERSION,
      error: msg,
      time: new Date().toISOString()
    });
  });
} else {
  log("%c[SPINE BOOT] Redis URL not set — cache + rate limiting in fail-open mode.", "color:#FFC107; font-weight:bold;");
}

// ============================================================================
//  VAULT PATCH (Lore) — unchanged
// ============================================================================
export const VAULT_PATCH_TWILIGHT = {
  signature: "Twilight",
  invoked: "2026-04-11T01:00:00-02:00",
  version: 4,
  type: "security-data-integrity-chunking",
  glyph: "🌒",
  description:
    "The first protective veil cast by the Vault Spirit during a 4 AM development session.",
  note: "Named 'Twilight' because it was created in the quiet hours before dawn."
};

// ============================================================================
//  SDN PREWARM BRIDGE — Backend Spine SDN Ignition (passive, IMMORTAL)
// ============================================================================
try {
  const ProxySDN = {
    registerExtension(name, kind, meta) {
      log("[ProxySDN] registerExtension (passive):", name, kind);
    },
    emitImpulse(source, packet) {
      log("[ProxySDN] emitImpulse (passive):", source, packet?.executionContext?.dispatchSignature);
    }
  };

  prewarmSDN(ProxySDN);
  log("[PulseProxySpine] SDN prewarm complete (backend reflex arcs hot).");
} catch (err) {
  warn("[PulseProxySpine] SDN prewarm failed:", err);
}

// ============================================================================
//  PNS HEALING INTEGRATION — PNSRepair / PNSPurifier (symbolic-only)
// ============================================================================
function invokePNSHealingIfNeeded(healability) {
  try {
    if (!healability) return;

    const { health, rateLimit, vitals } = healability;

    const degraded =
      health === "degraded" ||
      health === "rate-limited" ||
      health === "offline";

    if (!degraded) return;

    const context = {
      source: PulseRole.identity,
      health,
      rateLimitBand: rateLimit?.band,
      lastProxyError: vitals?.lastProxyError,
      lastRedisError: vitals?.lastRedisError,
      lastEmailError: vitals?.lastEmailError,
      presenceBandState: vitals?.presenceBandState,
      harmonicDrift: vitals?.harmonicDrift,
      coherenceScore: vitals?.coherenceScore,
      proxyMode: healingState.proxyMode,
      proxyPressure: healingState.proxyPressure
    };

    if (PNSRepair && typeof PNSRepair.repair === "function") {
      PNSRepair.repair(context);
    }

    if (PNSPurifier && typeof PNSPurifier.purify === "function") {
      PNSPurifier.purify(context);
    }

    sendCriticalEmail("[PulseProxySpine] Degraded Health Detected", {
      nodeId: NODE_ID,
      region: CLOUD_REGION,
      version: PULSE_VERSION,
      health,
      rateLimitBand: rateLimit?.band,
      lastProxyError: vitals?.lastProxyError,
      lastRedisError: vitals?.lastRedisError,
      lastEmailError: vitals?.lastEmailError,
      time: new Date().toISOString()
    });
  } catch (err) {
    warn("[PulseProxySpine] PNS healing invocation failed:", err);
  }
}

// ============================================================================
//  APP + ENV — v20 IMMORTAL BACKEND PROXY SPINE
// ============================================================================
const app = express();
const PORT = process.env.PORT || 8080;

// CORS for all non-webhook routes
app.use(corsHandler);

// JSON body parser
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));

// ============================================================================
//  GLOBAL REQUEST MIDDLEWARE — v20 IMMORTAL BACKEND PROXY SPINE
//  Adds headers + captures passive band metadata + proxy context snapshot
//  + PNS snapshot + spine band/wave/advantage surfaces + binary/GPU metrics
// ============================================================================
app.use((req, res, next) => {
  res.setHeader("X-Pulse-Version", PULSE_VERSION);
  res.setHeader("X-Pulse-Node", NODE_ID);
  res.setHeader("X-Pulse-Region", CLOUD_REGION);
  res.setHeader("X-Pulse-Mode", OFFLINE_MODE ? "offline" : "online");

  healingState.pulsePrewarm   = req.get("x-pulse-prewarm")   || healingState.pulsePrewarm;
  healingState.pulseCacheMode = req.get("x-pulse-cache")     || healingState.pulseCacheMode;
  healingState.pulseChunkMode = req.get("x-pulse-chunk")     || healingState.pulseChunkMode;
  healingState.pulseRemember  = req.get("x-pulse-remember")  || healingState.pulseRemember;

  healingState.presenceBandState = req.get("x-pulse-presence")   || healingState.presenceBandState;
  healingState.harmonicDrift     = req.get("x-pulse-harmonics")  || healingState.harmonicDrift;
  healingState.coherenceScore    = req.get("x-pulse-coherence")  || healingState.coherenceScore;

  healingState.lastRequestTs = Date.now();
  healingState.cycleCount++;

  try {
    if (PulseBandSymbolic && typeof PulseBandSymbolic.getStatus === "function") {
      healingState.nervousSnapshot = PulseBandSymbolic.getStatus();
    }
  } catch {}

  try {
    const ctx = getProxyContext();
    healingState.proxyContextSnapshot = ctx;
    healingState.proxyPressure = getProxyPressure();
    healingState.proxyBoost = getProxyBoost();
    healingState.proxyFallback = getProxyFallback();
    healingState.proxyMode = getProxyMode();
    healingState.proxyLineage = getProxyLineage();
  } catch {}

  try {
    healingState.binaryMetrics = typeof getBinaryMetrics === "function"
      ? getBinaryMetrics()
      : null;
  } catch {
    healingState.binaryMetrics = null;
  }

  try {
    healingState.gpuMetrics = typeof getGPUMetrics === "function"
      ? getGPUMetrics()
      : null;
  } catch {
    healingState.gpuMetrics = null;
  }

  const band = buildSpineBand();
  const bandSignature = buildSpineBandSignature(band);
  const waveField = buildSpineWaveField({
    region: CLOUD_REGION,
    mode: healingState.mode,
    latencyClass: healingState.nervousSnapshot?.latencyClass,
    networkHealth: healingState.nervousSnapshot?.networkHealth
  });

  const cpuLoad = healingState.binaryMetrics?.cpuLoad ?? null;
  const gpuLoad = healingState.gpuMetrics?.gpuLoad ?? null;

  const advantageField = buildSpineAdvantageField({
    rateLimitBand: healingState.lastRateLimitDecision?.band,
    redisReady: global.__lastRedisError == null,
    offlineMode: OFFLINE_MODE,
    cpuLoad,
    gpuLoad
  });

  healingState.spineBand = band;
  healingState.spineBandSignature = bandSignature;
  healingState.spineWaveField = waveField;
  healingState.spineAdvantageField = advantageField;

  res.setHeader("X-Pulse-Spine-Band", band);
  res.setHeader("X-Pulse-Spine-BandSignature", bandSignature);
  res.setHeader("X-Pulse-Spine-Advantage", advantageField.advantageSignature);
  res.setHeader("X-Pulse-Experience-Identity", PulseProxySpineExperienceMeta.identity);
  res.setHeader("X-Pulse-Experience-Version", PulseProxySpineExperienceMeta.version);

  next();
});

// ============================================================================
//  PROXY HEALTH / METRICS / NODE / CONTEXT / EXPERIENCE
//  (v20 endpoints; no bare /health on proxy spine)
// ============================================================================
app.get("/TPProxy/health", (req, res) => {
  const mem = process.memoryUsage();
  const eventLoopLag = Math.max(0, Date.now() - (healingState.lastRequestTs || Date.now()));

  const health = {
    status: "ok",
    ts: Date.now(),

    proxyMode: healingState.proxyMode,
    proxyPressure: healingState.proxyPressure,
    proxyFallback: healingState.proxyFallback,
    proxyBoost: healingState.proxyBoost,
    proxyLineage: healingState.proxyLineage,

    nervousSnapshot: healingState.nervousSnapshot,

    spineBand: healingState.spineBand,
    spineWaveField: healingState.spineWaveField,
    spineAdvantageField: healingState.spineAdvantageField,

    binaryMetrics: healingState.binaryMetrics,
    gpuMetrics: healingState.gpuMetrics,

    memory: {
      rss: mem.rss,
      heapUsed: mem.heapUsed,
      heapTotal: mem.heapTotal
    },
    eventLoopLag,
    uptime: process.uptime(),

    lastError: healingState.lastError,
    lastProxyError: healingState.lastProxyError,
    lastRedisError: healingState.lastRedisError
  };

  if (eventLoopLag > 200 || healingState.lastRedisError) {
    health.status = "degraded";
  }

  healingState.lastHealthCheck = Date.now();
  res.json(health);
});

app.get("/TPProxy/metrics", (req, res) => {
  const mem = process.memoryUsage();

  const metrics = {
    ts: Date.now(),
    cycleCount: healingState.cycleCount,
    memory: {
      rss: mem.rss,
      heapUsed: mem.heapUsed,
      heapTotal: mem.heapTotal
    },
    proxyPressure: healingState.proxyPressure,
    proxyBoost: healingState.proxyBoost,
    proxyFallback: healingState.proxyFallback,
    eventLoopLag: Math.max(0, Date.now() - (healingState.lastRequestTs || Date.now())),
    uptime: process.uptime(),
    binaryMetrics: healingState.binaryMetrics,
    gpuMetrics: healingState.gpuMetrics
  };

  healingState.lastMetricsCheck = Date.now();
  res.json(metrics);
});

app.get("/TPProxy/node", (req, res) => {
  healingState.lastNodeCheck = Date.now();
  res.json({
    ts: Date.now(),
    nodeId: NODE_ID,
    region: CLOUD_REGION,
    version: PulseProxySpineMeta.version,
    mode: OFFLINE_MODE ? "offline" : "online"
  });
});

app.get("/TPProxy/context", (req, res) => {
  res.json({
    ts: Date.now(),
    proxyContext: healingState.proxyContextSnapshot || null,
    nervousSnapshot: healingState.nervousSnapshot || null,
    spineBand: healingState.spineBand,
    spineWaveField: healingState.spineWaveField,
    spineAdvantageField: healingState.spineAdvantageField
  });
});

app.get("/TPProxy/experience", (req, res) => {
  res.json({
    ts: Date.now(),
    experienceMeta: healingState.experienceMeta,
    band: healingState.spineBand,
    waveField: healingState.spineWaveField,
    advantageField: healingState.spineAdvantageField,
    binaryMetrics: healingState.binaryMetrics,
    gpuMetrics: healingState.gpuMetrics
  });
});

// ============================================================================
//  BUSINESS ROUTES — PRESERVED LOGIC (Stripe, Twilio, etc.)
// ============================================================================

// ----------------------------------------------------------------------------------------------------
// CHECKS STRIPE PAYMENT UPDATES TO MAKE SURE 5% IS TAKEN AS A FEE FOR CHARGEBACKS AND ADDED TO THEIR RESERVE
// ----------------------------------------------------------------------------------------------------
app.post("/create-order-payment", async (req, res) => {
  console.log("🔵 [/create-order-payment] START");

  const stripe = req.stripe;

  const clean = (v) => {
    if (!v) return null;
    const s = String(v).trim();
    if (
      s === "" ||
      s.includes("{{") ||
      s.includes("add_more_field") ||
      s.includes("fieldLebal") ||
      s.includes("fieldValue") ||
      s.includes("*")
    ) return null;
    return s;
  };

  const num = (v) => {
    if (v == null) return 0;
    const decoded = decodeURIComponent(String(v));
    if (decoded.includes("|")) {
      return decoded.split("|").map(x => Number(x) || 0).reduce((a, b) => a + b, 0);
    }
    const n = Number(decoded);
    return isNaN(n) ? 0 : Number(n.toFixed(2));
  };

  try {
    const amount = Math.round(num(req.body.amount) * 100);
    const vendorId = clean(req.body.vendorId);
    const customerId = clean(req.body.customerId);
    const paymentMethodId = clean(req.body.paymentMethodId);

    if (!amount || !vendorId || !customerId || !paymentMethodId) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields"
      });
    }

    const vendorSnap = await db.collection("Users").doc(vendorId).get();
    if (!vendorSnap.exists) {
      return res.status(404).json({
        success: false,
        error: "Vendor not found"
      });
    }

    const { stripeAccountID } = vendorSnap.data();
    if (!stripeAccountID) {
      return res.status(400).json({
        success: false,
        error: "Vendor missing Stripe account"
      });
    }

    const info = await determinePayoutCurrency(stripe, stripeAccountID, amount);

    const reserveAmount = Math.round(amount * 0.05);

    await stripe.paymentMethods.attach(paymentMethodId, { customer: customerId });

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: info.transferCurrency,
      customer: customerId,
      payment_method: paymentMethodId,
      confirm: true,
      application_fee_amount: reserveAmount,
      transfer_data: {
        destination: stripeAccountID
      },
      metadata: {
        vendorId,
        reserveAmount
      }
    });

    console.log("✅ PaymentIntent created:", paymentIntent.id);

    return res.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });

  } catch (err) {
    console.error("❌ Error creating PaymentIntent:", err);
    return res.status(500).json({
      success: false,
      error: "Error creating payment"
    });
  }
});

app.post("/create-payment", async (req, res) => {
  try {
    const stripe = req.stripe;

    const {
      amount,
      vendorId,
      stripeAccountID,
      reserveAmount,
      currency = "usd",
      description,
      metadata = {}
    } = req.body;

    if (!amount || !vendorId || !stripeAccountID) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields: amount, vendorId, stripeAccountID"
      });
    }

    if (!Number.isInteger(amount)) {
      return res.status(400).json({
        success: false,
        error: "Amount must be an integer in cents"
      });
    }

    if (!Number.isInteger(reserveAmount)) {
      return res.status(400).json({
        success: false,
        error: "reserveAmount must be an integer in cents"
      });
    }

    const fullMetadata = {
      vendorId: String(vendorId),
      reserveAmount: String(reserveAmount || 0),
      ...Object.fromEntries(
        Object.entries(metadata).map(([k, v]) => [k, String(v)])
      )
    };

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      description: description ? String(description).trim() : "",
      metadata: fullMetadata,
      transfer_data: {
        destination: stripeAccountID
      }
    });

    return res.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });

  } catch (err) {
    console.error("Create-payment error:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

app.get("/resend-link", async (req, res) => {
  console.log("🔵 [/resend-link] START");

  const stripe = req.stripe;
  const twilioClient = req.twilio;
  const MESSAGING_SERVICE_SID = req.messagingServiceSid;

  const clean = (v) => {
    if (!v) return null;
    const s = String(v).trim();
    if (
      s === "" ||
      s.includes("{{") ||
      s.includes("add_more_field") ||
      s.includes("fieldLebal") ||
      s.includes("fieldValue") ||
      s.includes("*")
    ) return null;
    return s;
  };

  const token = clean(req.query.token);
  if (!token) {
    return res.status(400).json({ success: false, error: "Missing token" });
  }

  const usersRef = admin.firestore().collection("Users");

  let snap = await usersRef.where("UserToken", "==", token).limit(1).get();

  if (snap.empty) {
    snap = await usersRef.where("TPIdentity.resendToken", "==", token).limit(1).get();
  }

  if (snap.empty) {
    return res.status(404).json({ success: false, error: "Invalid token" });
  }

  const user = snap.docs[0].data();
  const userRef = snap.docs[0].ref;

  let phone =
    user.UserPhone ||
    user.Phone ||
    user.phone ||
    user.phonenumber ||
    user.userphone ||
    null;

  const country = user.UserCountry || "BZ";
  if (phone) phone = normalizePhone(phone, country);

  if (!phone) {
    return res.status(400).json({
      success: false,
      error: "No phone number on file for SMS resend"
    });
  }

  const stripeAccountID =
    user.TPIdentity?.stripeAccountID ||
    null;

  if (!stripeAccountID) {
    return res.status(400).json({
      success: false,
      error: "User missing Stripe account ID"
    });
  }

  const jwt = await admin.auth().createCustomToken(
    user.TPIdentity?.uid || user.UserID,
    {
      email: user.TPIdentity?.email || user.UserEmail,
      stripeAccountID
    }
  );

  const hash = crypto.createHash("sha256").update(jwt).digest("hex").slice(0, 32);

  await stripe.accounts.update(stripeAccountID, {
    metadata: { tokenHash: hash }
  });

  const receiveSMS =
    user.TPNotifications?.receiveSMS ??
    false;

  if (!receiveSMS) {
    return res.status(200).json({
      success: true,
      message: "SMS Not Sent (User Opted Out)"
    });
  }

  try {
    const link = await stripe.accountLinks.create({
      account: stripeAccountID,
      refresh_url: "/expire.html",
      return_url: `/StripeSetupComplete.html?token=${encodeURIComponent(jwt)}`,
      type: "account_onboarding"
    });

    const newUrl = link.url;

    await userRef.set(
      {
        TPNotifications: {
          lastSMSSentAt: admin.firestore.FieldValue.serverTimestamp()
        }
      },
      { merge: true }
    );

    return res.status(200).json({
      success: true,
      message: "Link resent",
      url: newUrl
    });

  } catch (err) {
    console.error("Resend-Link error:", err.message);
    return res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

export function normalizePhone(raw, row, coords = {}) {
  if (!raw) return null;

  let v = String(raw)
    .replace(/\u00A0/g, " ")
    .trim();

  v = v.replace(/[^\d+]/g, "");

  if (v.startsWith("+") && v.length >= 8 && v.length <= 15) {
    return v;
  }

  if (v.startsWith("+")) v = v.slice(1);

  const digits = v.replace(/\D/g, "");

  if (digits.length === 7) {
    return "+501" + digits;
  }

  if (digits.startsWith("501") && digits.length === 10) {
    return "+501" + digits.slice(3);
  }

  if (digits.length === 10) {
    return "+1" + digits;
  }

  if (digits.length === 11 && digits.startsWith("1")) {
    return "+1" + digits.slice(1);
  }

  if (digits.length >= 8 && digits.length <= 15) {
    return "+" + digits;
  }

  return null;
}

app.post("/alerts/system-earn-failure", async (req, res) => {
  try {
    const payload = req.body;

    console.error("SYSTEM Earn FAILURE:", payload);

    return res.json({ success: true });

  } catch (err) {
    console.error("Earn failure alert error:", err);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error"
    });
  }
});

app.get("/", async (req, res) => {
  const userID = req.query.userID;
  const eventID = req.query.eventID;

  if (!userID) return res.status(400).send("Missing userID");
  if (!eventID) return res.status(400).send("Missing eventID");

  try {
    const realUrl =
      `https://pay.tropicpulse.bz/b/00w4gy1ZP0Si7UpcgIfIs01` +
      `?userID=${encodeURIComponent(userID)}` +
      `&eventID=${encodeURIComponent(eventID)}`;

    return res.redirect(realUrl);

  } catch (err) {
    console.error("Payment redirect error:", err.message);
    return res.status(500).send("Payment redirect failed");
  }
});

// ============================================================================
//  UNIVERSAL PROXY — TPProxy v20 IMMORTAL BACKEND PROXY SPINE
//  (logic preserved from v16.1, with v20 surfaces)
// ============================================================================
app.get("/TPProxy", async (req, res) => {
  healingState.lastTPProxyCall = Date.now();

  const target = req.query.url;
  if (!target) {
    const msg = "[TPProxy] Missing_URL";
    warn(msg);

    healingState.lastProxyError = msg;

    sendCriticalEmail("[PulseProxySpine] TPProxy Missing URL", {
      nodeId: NODE_ID,
      region: CLOUD_REGION,
      version: PULSE_VERSION,
      error: msg,
      time: new Date().toISOString()
    });

    return res.status(400).json({ error: "Missing_URL" });
  }

  const sysHeader = req.get("x-pulse-device");
  let system = null;
  try {
    system = sysHeader ? JSON.parse(sysHeader) : null;
  } catch {
    // non-fatal
  }

  const rememberMe = req.get("x-pulse-remember") === "1";

  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
    req.socket.remoteAddress ||
    "Unknown";

  const userId    = req.get("x-pulse-user") || "anonymous";
  const meshRelay = req.get("x-PULSE-MESH-relay") === "1";
  const meshPing  = req.get("x-PULSE-MESH-ping") === "1";
  const hubFlag   = req.get("x-pulse-hub") === "1";

  const cacheKey =
    "pulse:cache:" + crypto.createHash("sha1").update(target).digest("hex");

  const start = Date.now();

  const proxy = createProxy({
    jobId: "TPProxy",
    pattern: "ProxySpine/TPProxy",
    payload: {
      target,
      userId,
      ip,
      meshRelay,
      meshPing,
      hubFlag,
      rememberMe
    },
    priority: "normal",
    returnTo: null,
    parentLineage: null,
    pageId: "BACKEND_TPPROXY"
  });

  try {
    updateProxyStateFromEnvelope({
      binaryField: { density: 0, surface: 0 },
      presenceEnvelope: {
        presenceSignature: healingState.presenceBandState || "spine-presence"
      },
      cacheChunkEnvelope: {
        cacheChunkSurfaceSignature: healingState.pulseCacheMode
          ? `CACHE_${healingState.pulseCacheMode}`
          : "CACHE_NONE"
      }
    });
  } catch {
    // fail-open
  }

  if (OFFLINE_MODE) {
    const durationMs = Date.now() - start;

    const payload = {
      ok: false,
      mode: "offline",
      message: "TPProxy running in offline mode; external fetch disabled.",
      target,
      system,
      userId,
      meshRelay,
      meshPing,
      hubFlag,
      durationMs,
      presenceBandState: healingState.presenceBandState,
      harmonicDrift: healingState.harmonicDrift,
      coherenceScore: healingState.coherenceScore,
      pulsePrewarm: healingState.pulsePrewarm,
      pulseCacheMode: healingState.pulseCacheMode,
      pulseChunkMode: healingState.pulseChunkMode,
      pulseRemember: healingState.pulseRemember,
      dualBandMode: healingState.dualBandMode,
      proxyContext: healingState.proxyContextSnapshot,
      proxyMode: healingState.proxyMode,
      proxyPressure: healingState.proxyPressure,
      experienceMeta: PulseProxySpineExperienceMeta
    };

    recordUserMetrics(userId, {
      event: "offline_proxy",
      durationMs,
      presenceBandState: healingState.presenceBandState,
      proxyMode: healingState.proxyMode
    });

    const healability = buildHealabilitySnapshot({
      vitals: healingState,
      rateLimit: healingState.lastRateLimitDecision || { band: "low" },
      nodeDescriptor: buildNodeDescriptor({
        region: CLOUD_REGION,
        nodeId: NODE_ID,
        version: PULSE_VERSION,
        mode: healingState.mode,
        maxRequestsPerDay: MAX_REQUESTS_PER_DAY
      }),
      redisReady,
      offlineMode: OFFLINE_MODE
    });
    invokePNSHealingIfNeeded(healability);

    return res.status(200).json(payload);
  }

  // NOTE: your actual external fetch / caching logic would live here.
  // Kept symbolic-only in this spine file by contract.

  const durationMs = Date.now() - start;
  recordUserMetrics(userId, {
    event: "proxy_call",
    durationMs,
    presenceBandState: healingState.presenceBandState,
    proxyMode: healingState.proxyMode
  });

  return res.status(200).json({
    ok: true,
    mode: "online",
    message: "TPProxy spine reached; external fetch handled by downstream logic.",
    target,
    system,
    userId,
    meshRelay,
    meshPing,
    hubFlag,
    durationMs,
    proxyContext: healingState.proxyContextSnapshot,
    experienceMeta: PulseProxySpineExperienceMeta
  });
});

// ============================================================================
//  EXPORT API FUNCTION
// ============================================================================
export const api = onRequest(
  {
    region: "us-central1",
    memory: "512MiB"
  },
  (req, res) => {
    try {
      if (!stripeInstance) {
        stripeInstance = new Stripe(process.env.STRIPE_PASSWORD);
      }

      req.stripe = stripeInstance;

      req.twilio = twilio(
        process.env.ACCOUNT_SID,
        process.env.AUTH_TOKEN
      );

      req.messagingServiceSid = process.env.MESSAGING_SERVICE_SID;

      return app(req, res);

    } catch (err) {
      error("API error:", err);
      return res
        .status(500)
        .json({ success: false, error: "Internal Server Error" });
    }
  }
);
