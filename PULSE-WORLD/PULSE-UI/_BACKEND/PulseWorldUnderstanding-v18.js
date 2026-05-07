// ============================================================================
//  PulseNetUnderstanding-v16-Immortal.js — v16-IMMORTAL (HYBRID LOADER)
//  Cortical Opener • Symbolic Kernel Loader • Binary Shadow Integrator
//  Deterministic Brainstem • Runtime/Scheduler/Substrate Unifier
// ============================================================================
//
//  v16-IMMORTAL HYBRID CONTRACT:
//  -----------------------------
//   • DO NOT boot the binary organism (Window already did).
//   • DO load symbolic kernel + symbolic organs (via User/OS chain).
//   • DO integrate binary shadow from window.PulseBinary.
//   • DO integrate Flow (window.PulseUI) and Page/Portal intel.
//   • DO unify runtime, scheduler, substrate.
//   • DO expose OS API (symbolic + binary shadow).
//   • DO NOT expose raw organs to the outside.
//   • DO NOT mutate Window or Page.
//   • MAY read membrane intel from window.PulseSurface, PulsePower, and portals.
// ============================================================================
// ============================================================================
//  PULSE OS — PulseUnderstanding-v18-Immortal
//  CORTICAL OPENER • HYBRID KERNEL • COMPILER → CHUNKER → ACTNOW ORCHESTRATOR
// ============================================================================

console.log("Come to Understanding v18-Immortal");

// Global handle
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

// ============================================================================
//  IMPORTS — BRIDGE / LOGGER
// ============================================================================
import { route, PulseProofLogger, log, warn, error } from "./PulseWorldBridge-v18.js";

// ============================================================================
//  IMPORTS — COMPILER / CHUNKER / ACTNOW (v17+)
// ============================================================================
import { PulseWorldCompile } from "./PulseWorldCompiler-v20.js";
import { createPulseChunker } from "./PulseWorldChunker-v18.js";
import { createACTNowV17 } from "./PulseWorldFightFlightResponse-v20.js/index.js";
// ============================================================================
//  IMPORTS — PRESENTATION / POWER (v16)
// ============================================================================
import PulsePowerAPI from "./PulseWorldPower-v20.js";
// ============================================================================
//  IMPORTS — MAPS (Intent, Organism, IQ)
// ============================================================================
import { PulseIntentMap } from "../../PULSE-BAND/PULSE-X/PulseWorldIntentMap-v17.js";
import { PulseOrganismMap } from "../../PULSE-BAND/PULSE-X/PulseWorldOrganismMap-v21.js";
import createPulseWorldCore from "../../PULSE-BAND/PULSE-EXPANSION/PulseUser-v16.js";
import { createDualBandOrganism as PulseBinaryOrganismBoot } from "../../PULSE-BAND/PULSE-AI/aiDualBand-v16.js";

// ============================================================================
//  IMPORTS — SYMBOLIC / BINARY ORGANS
// ============================================================================
import { createProxy as PulseProxySym } from "../../PULSE-BAND/PULSE-PROXY/PulseProxy-v16.js";
import { PulseRouter as PulseRouterSym } from "../../PULSE-BAND/PULSE-ROUTER/PulseRouter-v16.js";
import { createGPUDispatch as PulseGPUSym } from "../../PULSE-BAND/PULSE-GPU/PulseGPU-v16.js";
import { createPulseMesh as PulseMeshSym } from "../../PULSE-BAND/PULSE-MESH/PulseMesh-v16.js";
import { createPulseSend as PulseSendSym } from "../../PULSE-BAND/PULSE-SEND/PulseSend-v16.js";
import { createEarn as PulseEarnSym } from "../../PULSE-BAND/PULSE-EARN/PulseEarn-v16.js";

// ============================================================================
//  IMPORTS — BINARY SHADOW (NO BOOT HERE)
// ============================================================================
import { createBinaryProxy } from "../../PULSE-BAND/PULSE-PROXY/PulseBinaryProxy-v16.js";
import { createBinaryRouter as PulseRouterBin } from "../../PULSE-BAND/PULSE-ROUTER/PulseBinaryRouter-v16.js";
import { PulseBinaryGPU as PulseGPUBin } from "../../PULSE-BAND/PULSE-GPU/PulseBinaryGPU-v16.js";
import { createBinaryMesh as PulseMeshBin } from "../../PULSE-BAND/PULSE-MESH/PulseBinaryMesh-v16.js";
import { createBinarySend as PulseSendBin } from "../../PULSE-BAND/PULSE-SEND/PulseBinarySend-v16.js";



// ============================================================================
//  CONTEXT — v18-IMMORTAL
// ============================================================================
const PULSE_UNDERSTANDING_CONTEXT = {
  layer: "PulseUnderstanding",
  role: "CORTICAL_OPENER",
  version: "18.0-Immortal",
  lineage: "cortical-opener-core-v18",
  evo: {
    hybridLoader: true,
    symbolicKernel: true,
    binaryShadow: true,
    runtimeUnifier: true,
    schedulerUnifier: true,
    substrateUnifier: true,

    driftAware: true,
    flowAware: true,
    pageScannerAware: true,
    binaryFirstIdentity: true,
    dualBandAware: true,
    organismWideIdentityAware: true,
    browserOnly: true,
    portalAware: true,
    surfaceEnvironmentAware: true,
    pulsePowerAware: true,

    // v18: compiler / chunker / actnow / bridge alignment
    chunkMembraneAware: true,
    compilerAware: true,
    chunkerAware: true,
    actNowAware: true,
    actNowPacketAware: true,
    laneAware: true,
    profileAware: true,
    bridgePulseAware: true,

    presenceAware: true,
    advantageFieldAware: true,
    speedFieldAware: true,
    experienceFieldAware: true,
    prewarmAware: true,
    chunkCachePrewarmAware: true,
    routerPrewarmAware: true,
    sdnPrewarmAware: true,
    meshPrewarmAware: true
  }
};

// ============================================================================
//  ENVIRONMENT SNAPSHOT (UPGRADED — USE PORTAL / POWER IF PRESENT)
// ============================================================================
function buildEnvironmentSnapshot() {
  if (typeof window === "undefined") {
    return {
      runtime: "node-like",
      userAgent: null,
      language: null,
      online: null,
      platform: null
    };
  }

  const surfaceEnv = window.PulseSurface?.environment;
  const powerSnapshot =
    typeof PulsePowerAPI?.getPulsePowerSnapshot === "function"
      ? PulsePowerAPI.getPulsePowerSnapshot()
      : null;

  const base = {
    runtime: "browser",
    userAgent: window.navigator?.userAgent || null,
    language: window.navigator?.language || null,
    online: window.navigator?.onLine ?? null,
    platform: window.navigator?.platform || null
  };

  if (surfaceEnv) {
    return {
      ...base,
      runtime: surfaceEnv.runtime ?? base.runtime,
      userAgent: surfaceEnv.userAgent ?? base.userAgent,
      language: surfaceEnv.language ?? base.language,
      online: surfaceEnv.online ?? base.online,
      platform: surfaceEnv.platform ?? base.platform,
      screen: surfaceEnv.screen ?? null,
      device: surfaceEnv.device ?? null,
      input: surfaceEnv.input ?? null,
      preferences: surfaceEnv.preferences ?? null,
      location: surfaceEnv.location ?? null,
      network: surfaceEnv.network ?? null,
      referrer: surfaceEnv.referrer ?? null,
      origin: surfaceEnv.origin ?? null,
      pulsePower: powerSnapshot || null
    };
  }

  return {
    ...base,
    pulsePower: powerSnapshot || null
  };
}

const PulseEnvironment = buildEnvironmentSnapshot();

// ============================================================================
//  USER / LOCAL OS CORE (SIDE-EFFECT LOAD)
// ============================================================================
let PulseWorldCore = null;
try {
  PulseWorldCore = createPulseWorldCore({
    regionID: null,
    trace: false,
    serverMode: false
  });
} catch {
  PulseWorldCore = null;
}

// ============================================================================
//  GOVERNOR (symbolic only, via global Pulse if present)
// ============================================================================
function runThroughGovernor(organName, pulseOrImpulse, fn) {
  const governedRun =
    typeof window !== "undefined"
      ? window?.Pulse?.Governed?.run
      : null;

  if (typeof governedRun === "function") {
    return governedRun(organName, pulseOrImpulse, fn);
  }

  return fn(pulseOrImpulse);
}

// ============================================================================
//  BINARY-FIRST IDENTITY (HYBRID MODE)
// ============================================================================
async function resolveIdentityBinaryFirst(ProxyBin, ProxySym) {
  const shadow = typeof window !== "undefined" ? window?.PulseBinary?.meta : null;
  if (shadow?.identity) {
    return { kind: "binary-shadow", value: shadow.identity };
  }

  if (ProxyBin && typeof ProxyBin.identityBinary === "function") {
    try {
      const binId = await ProxyBin.identityBinary();
      if (binId) return { kind: "binary", value: binId };
    } catch {}
  }

  if (ProxySym && typeof ProxySym.identity === "function") {
    try {
      const hybridId = await ProxySym.identity("hybrid");
      if (hybridId) return { kind: "hybrid", value: hybridId };
    } catch {}
  }

  return { kind: "none", value: null };
}

// ============================================================================
//  HYBRID KERNEL RESOLUTION (NO BINARY BOOT HERE)
// ============================================================================
async function resolveKernelsBinaryFirst() {
  const BinaryKernel =
    typeof window !== "undefined" ? window.PulseBinary ?? null : null;

  let SymbolicKernel = null;

  try {
    if (PulseWorldCore?.getPrimaryOSView) {
      const osView = PulseWorldCore.getPrimaryOSView();
      if (osView?.SymbolicKernel) {
        SymbolicKernel = osView.SymbolicKernel;
      }
    }
  } catch {}

  if (!SymbolicKernel && typeof window !== "undefined") {
    SymbolicKernel =
      window.Pulse?.SymbolicKernel ??
      window.Pulse?.Kernel ??
      null;
  }

  if (SymbolicKernel && typeof SymbolicKernel.then === "function") {
    SymbolicKernel = await SymbolicKernel;
  }

  return {
    BinaryKernel,
    SymbolicKernel: SymbolicKernel || {}
  };
}

// ============================================================================
//  KERNEL BOOTSTRAP — UNDERSTANDING LAYER (HYBRID UNDER WINDOW)
// ============================================================================
async function buildPulseKernel() {
  const { BinaryKernel, SymbolicKernel } = await resolveKernelsBinaryFirst();

  const BinaryShadow =
    typeof window !== "undefined" ? window.PulseBinary ?? null : null;
  const UIFlow =
    typeof window !== "undefined" ? window.PulseUI ?? null : null;
  const SkinReflex =
    typeof window !== "undefined" ? window.PulseSkinReflex ?? null : null;

  const BinaryBrain = BinaryKernel?.Brain ?? null;
  const BinaryEvolution = BinaryKernel?.Evolution ?? null;
  const BinarySDN = BinaryKernel?.SDN ?? null;
  const BinaryMemoryCore = BinaryKernel?.MemoryCore ?? null;
  const BinaryOverlay = BinaryKernel?.BinaryOverlay ?? null;

  const Brain = BinaryBrain ?? SymbolicKernel.Brain ?? null;
  const Evolution = BinaryEvolution ?? SymbolicKernel.Evolution ?? null;
  const SpinalCord = BinarySDN ?? SymbolicKernel.SDN ?? null;
  const CoreGovernor = SymbolicKernel.Governor ?? null;

  const MemoryCore =
    BinaryMemoryCore ??
    SymbolicKernel.MemoryCore ??
    null;

  const BinaryOverlayFinal =
    BinaryOverlay ??
    SymbolicKernel.BinaryOverlay ??
    null;

  const EpisodicMemory =
    SymbolicKernel.EpisodicMemory ??
    (MemoryCore && MemoryCore.Episodic ? MemoryCore.Episodic : null);

  const SemanticMemory =
    SymbolicKernel.SemanticMemory ??
    (MemoryCore && MemoryCore.Semantic ? MemoryCore.Semantic : null);

  const Mesh =
    (PulseMeshBin && Object.keys(PulseMeshBin).length ? PulseMeshBin : null) ||
    PulseMeshSym;

  const Send =
    (PulseSendBin && Object.keys(PulseSendBin).length ? PulseSendBin : null) ||
    PulseSendSym;

  const Earn = PulseEarnSym;

  const Router =
    (PulseRouterBin && Object.keys(PulseRouterBin).length ? PulseRouterBin : null) ||
    PulseRouterSym;

  const GPU =
    (PulseGPUBin && Object.keys(PulseGPUBin).length ? PulseGPUBin : null) ||
    PulseGPUSym;

  const ProxySymInstance = PulseProxySym.createProxy
    ? PulseProxySym.createProxy({
        Router,
        Brain,
        Evolution,
        Identity: null,
        Environment: PulseEnvironment,
        Governor: CoreGovernor,
        MemoryCore,
        BinaryOverlay: BinaryOverlayFinal,
        Mesh,
        Send,
        Earn
      })
    : PulseProxySym;

  const encoder = SymbolicKernel.BinaryAgent ?? null;
  let ProxyBin = null;

  if (encoder) {
    ProxyBin = createBinaryProxy({
      encoder,
      fallbackProxyFactory: (job) => {
        if (typeof ProxySymInstance.send === "function") {
          return ProxySymInstance.send(job);
        }
        if (typeof ProxySymInstance.exchange === "function") {
          return ProxySymInstance.exchange(job);
        }
        return job;
      },
      trace: false
    });
  }

  const identityResult = await resolveIdentityBinaryFirst(ProxyBin, ProxySymInstance);
  const identity = identityResult.value;

  if (ProxySymInstance && typeof ProxySymInstance.setIdentity === "function") {
    try {
      ProxySymInstance.setIdentity(identity);
    } catch {}
  }

  const Proxy = ProxyBin || ProxySymInstance;

  try {
    SpinalCord?.registerExtension?.("Understanding", "extension", {
      version: "v18",
      role: "cortical-opener",
      layer: "A3",
      binaryFirst: true,
      hybridLoader: true,
      presenceAware: true,
      advantageAware: true,
      speedAware: true
    });
  } catch {}

  try {
    if (Mesh && typeof Mesh.boot === "function") {
      Mesh.boot({
        Brain,
        Evolution,
        SDN: SpinalCord,
        MemoryCore,
        BinaryOverlay: BinaryOverlayFinal,
        BinaryShadow
      });
    }
  } catch {}

  try {
    if (Send && typeof Send.boot === "function") {
      Send.boot({
        Brain,
        Evolution,
        SDN: SpinalCord,
        MemoryCore,
        BinaryOverlay: BinaryOverlayFinal,
        Mesh,
        BinaryShadow
      });
    }
  } catch {}

  try {
    if (Brain && Mesh && typeof Brain.attachMesh === "function") {
      Brain.attachMesh(Mesh);
    }
    if (Mesh && typeof Mesh.attachBrain === "function") {
      Mesh.attachBrain(Brain);
    }
  } catch (err) {
    console.error("[PulseUnderstanding] Brain ↔ Mesh attach failed:", err);
  }

  try {
    if (Earn && typeof Earn.boot === "function") {
      Earn.boot({
        Brain,
        Evolution,
        SDN: SpinalCord,
        MemoryCore,
        BinaryOverlay: BinaryOverlayFinal,
        Mesh,
        Send,
        BinaryShadow
      });
    }
  } catch {}

  try {
    SpinalCord?.emitImpulse?.("Understanding", {
      modeKind: "dual",
      executionContext: {
        sceneType: "cortical-opener",
        workloadClass: "frontend-boot",
        dispatchSignature: "Understanding.v18-Immortal",
        shapeSignature: "A3-layer",
        extensionId: "Understanding",
        identityKind: identityResult.kind
      },
      pressureSnapshot: {
        runtime: PulseEnvironment.runtime,
        online: PulseEnvironment.online
      }
    });
  } catch {}

  const meta = {
    ...PULSE_UNDERSTANDING_CONTEXT,
    identity,
    identityKind: identityResult.kind,
    environment: PulseEnvironment
  };

  const Pulse = {
    meta,
    Identity: identity,
    IdentityKind: identityResult.kind,
    Environment: PulseEnvironment,

    Brain,
    Evolution,
    Router,
    GPU,
    SDN: SpinalCord,
    Proxy,

    MemoryCore,
    BinaryOverlay: BinaryOverlayFinal,
    EpisodicMemory,
    SemanticMemory,

    Mesh,
    Send,
    Earn,

    BinaryShadow,
    UIFlow,
    SkinReflex,

    Errors: typeof window !== "undefined" ? window.PulseUIErrors : null,

    Governed: {
      run: runThroughGovernor
    }
  };

  return Pulse;
}

const PulseKernelPromise = buildPulseKernel();

// ============================================================================
//  ORGAN BUNDLE — Compiler + Chunker + ACTNOW (v18 Cortical Pipeline)
// ============================================================================
let PulseChunker = null;
let PulseACTNow = null;

async function buildCorticalPipelineOrgans(Brain) {
  if (!Brain) return { PulseChunker: null, PulseACTNow: null };

  if (!PulseChunker) {
    PulseChunker = createPulseChunker({ Brain, Logger: { log, warn, error } });
  }

  if (!PulseACTNow) {
    const PulseImmunity = Brain?.Immunity ?? Brain?.PulseImmunity ?? null;
    const PulseSurgeonGeneral =
      Brain?.SurgeonGeneral ?? Brain?.PulseSurgeonGeneral ?? null;

    if (PulseImmunity && PulseSurgeonGeneral) {
      PulseACTNow = createACTNowV17({ PulseImmunity, PulseSurgeonGeneral });
    } else {
      warn("[Understanding v18] ACTNow v17 not fully wired (missing Immunity/SurgeonGeneral)");
    }
  }

  return { PulseChunker, PulseACTNow };
}

// ============================================================================
//  CORTICAL PIPELINE — COMPILE → CHUNK → ACTNOW
// ============================================================================
async function runCompileChunkActNow({
  entry = "index.js",
  userId = "anon",
  laneId = 0,
  envelopeId = "compile-0",
  baseVersion = "v1",
  backendKind = "frontend-compile",
  worldBand = "frontend",
  chunkProfile = "frontend-compile-default",
  reason = "pulseworld_compile",
  source = "PulseWorld"
} = {}) {
  const { BinaryKernel, SymbolicKernel } = await resolveKernelsBinaryFirst();
  const Brain = BinaryKernel?.Brain ?? SymbolicKernel?.Brain ?? null;

  const { PulseChunker, PulseACTNow } = await buildCorticalPipelineOrgans(Brain);

  if (!PulseChunker) {
    warn("[Understanding v18] runCompileChunkActNow: PulseChunker unavailable, aborting.");
    return null;
  }

  // 2) Compile via PulseWorldCompiler (v17 wrapper)
  log("[Understanding v18] Compiler pipeline start", { entry });

  let compileResult = null;
  try {
    // v17 compiler has no params; entry is informational here
    compileResult = await PulseWorldCompile();
  } catch (e) {
    warn("[Understanding v18] Compiler failed", { entry, error: e?.message });
    return null;
  }

  const compiledPayload = {
    entry,
    outfile: "PULSE-USER.js",
    metafile: compileResult?.metafile ?? null,
    warnings: compileResult?.warnings ?? [],
    errors: compileResult?.errors ?? []
  };

  // 3) Chunk the compiled payload (symbolic metadata only)
  const chunkResponse = await PulseChunker.chunkRoute({
    url: null,
    laneId,
    envelopeId,
    userId,
    baseVersion,
    sizeOnly: false,
    payload: compiledPayload,
    routeDescriptor: null,
    backendKind,
    worldBand,
    chunkProfile
  });

  if (!chunkResponse?.ok) {
    warn("[Understanding v18] Chunking failed for compiled payload", {
      entry,
      error: chunkResponse?.error
    });
    return null;
  }

  const actNowPacket = {
    source,
    reason,
    profile: {
      id: chunkProfile,
      backendKind,
      worldBand,
      laneId,
      envelopeId
    },
    chunks: [chunkResponse.data],
    payloadHash: chunkResponse.payloadHash,
    lanes: 1
  };

  // 4) Optional: run through ACTNOW reflex (metadata only)
  let actNowReflex = null;
  if (PulseACTNow && typeof PulseACTNow.fromActNowPacket === "function") {
    actNowReflex = PulseACTNow.fromActNowPacket(actNowPacket, {
      modeKind: "dual",
      triggerKind: "compile_chunk_actnow",
      organismState: null,
      dualBandContext: null
    });
  }

  // 5) Emit to CNS / Portal via bridge route
  try {
    await route("actnow.packet", {
      packet: actNowPacket,
      reflex: actNowReflex,
      context: PULSE_UNDERSTANDING_CONTEXT
    });
  } catch (e) {
    warn("[Understanding v18] Failed to route actnow.packet", {
      error: e?.message
    });
  }

  log("[Understanding v18] Compiler → Chunker → ACTNOW pipeline complete", {
    entry,
    payloadHash: chunkResponse.payloadHash
  });

  return {
    actNowPacket,
    chunkResponse,
    compileResult,
    actNowReflex
  };
}

// ============================================================================
//  GLOBAL BROADCAST
// ============================================================================
if (typeof window !== "undefined") {
  PulseKernelPromise
    .then((PulseKernel) => {
      window.Pulse = window.Pulse
        ? {
            ...window.Pulse,
            meta: PulseKernel.meta,
            Brain: PulseKernel.Brain,
            Evolution: PulseKernel.Evolution,
            Router: PulseKernel.Router,
            GPU: PulseKernel.GPU,
            SDN: PulseKernel.SDN,
            Proxy: PulseKernel.Proxy,
            Governed: PulseKernel.Governed,
            Environment: PulseKernel.Environment,
            Identity: PulseKernel.Identity,
            IdentityKind: PulseKernel.IdentityKind,
            MemoryCore: PulseKernel.MemoryCore,
            BinaryOverlay: PulseKernel.BinaryOverlay,
            EpisodicMemory: PulseKernel.EpisodicMemory,
            SemanticMemory: PulseKernel.SemanticMemory,
            Mesh: PulseKernel.Mesh,
            Send: PulseKernel.Send,
            Earn: PulseKernel.Earn,
            BinaryShadow: PulseKernel.BinaryShadow,
            UIFlow: PulseKernel.UIFlow,
            SkinReflex: PulseKernel.SkinReflex,
            Errors: PulseKernel.Errors
          }
        : PulseKernel;
    })
    .catch((err) => {
      console.error(
        "[PulseUnderstanding v18-Immortal] Kernel bootstrap failed:",
        err
      );
    });
}

// ============================================================================
//  UNDERSTANDING PREWARM — v18 IMMORTAL
//  - Talks to PulsePower, SDN, Router, Mesh, and asset prewarm surfaces.
// ============================================================================
export async function prewarmUnderstanding({
  pages = [],
  routes = [],
  assets = []
} = {}) {
  if (typeof window === "undefined") return;

  try {
    const PulseKernel = await PulseKernelPromise.catch(() => null);
    const SDN = PulseKernel?.SDN;
    const Router = PulseKernel?.Router;
    const Mesh = PulseKernel?.Mesh;

    // 1) PulsePower prewarm (presentation + asset memory)
    try {
      if (PulsePowerAPI?.pulsePowerTouch) {
        PulsePowerAPI.pulsePowerTouch({
          pageId: pages[0] || null,
          route: routes[0] || null,
          assets: {
            images: assets.filter((a) => a.kind === "image").map((a) => a.href),
            fonts: assets.filter((a) => a.kind === "font").map((a) => a.href),
            scripts: assets.filter((a) => a.kind === "script").map((a) => a.href),
            styles: assets.filter((a) => a.kind === "style").map((a) => a.href)
          }
        });
      }
    } catch (err) {
      console.error("[PulseUnderstanding] PulsePower prewarm failed:", err);
    }

    // 2) SDN / Router prewarm (routes / pages)
    try {
      if (SDN?.prewarmRoutes && routes.length) {
        SDN.prewarmRoutes(routes);
      } else if (Router?.prewarm && routes.length) {
        Router.prewarm(routes);
      }
    } catch (err) {
      console.error("[PulseUnderstanding] SDN/Router prewarm failed:", err);
    }

    // 3) Mesh prewarm (if supported)
    try {
      if (Mesh?.prewarm && pages.length) {
        Mesh.prewarm({ pages, routes });
      }
    } catch (err) {
      console.error("[PulseUnderstanding] Mesh prewarm failed:", err);
    }

    // 4) Legacy asset prewarm (if still wired)
    try {
      const urls = assets.map((a) => a.href).filter(Boolean);
      if (urls.length && window.prewarmAssets) {
        window.prewarmAssets(urls);
      }
    } catch (err) {
      console.error("[PulseUnderstanding] legacy prewarmAssets failed:", err);
    }
  } catch (err) {
    console.error("[PulseUnderstanding] prewarmUnderstanding failed:", err);
  }
}

// ============================================================================
//  EXPORTED UNDERSTANDING OBJECT
// ============================================================================
export const PulseUnderstanding = {
  ...PULSE_UNDERSTANDING_CONTEXT,
  Environment: PulseEnvironment,
  IntentMap: PulseIntentMap,
  OrganismMap: PulseOrganismMap,
  IQMap: typeof window !== "undefined" ? window.PulseIQMap : null,
  Kernel: PulseKernelPromise,
  Errors: typeof window !== "undefined" ? window.PulseUIErrors : null,
  Identity: () =>
    typeof window !== "undefined" ? window?.Pulse?.Identity ?? null : null,
  IdentityKind: () =>
    typeof window !== "undefined" ? window?.Pulse?.IdentityKind ?? null : null,
  runThroughGovernor,
  prewarmUnderstanding,
  runCompileChunkActNow
};

export const PulseUnderstandingV18 = PulseUnderstanding;

export default PulseUnderstanding;
