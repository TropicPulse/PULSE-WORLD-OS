// ============================================================================
//  ai-v24.0-IMMORTAL.js
//  DUALBAND ORGANISM BOOTLOADER — v24.0 IMMORTAL + CHUNKER
// ============================================================================

/*
  (keep your big AI_EXPERIENCE_META comment here if you want it for docs;
   it no longer drives runtime identity — the genome does)
*/
import { OrganismIdentity } from "../PULSE-X/PULSE-WORLD-MAP.js
";

const Identity = OrganismIdentity(import.meta.url);

// or: const Identity = OrganismIdentity["pulse-ai/ai-v24.0-IMMORTAL"] if that's the key you chose

// ============================================================================
//  META BLOCK — v24.0 IMMORTAL (ORGANISM KERNEL)
//  (now backed by the Organism Map instead of hardcoded here)
// ============================================================================
export const OrganismKernelMeta = Identity.OrganMeta;

// ============================================================================
//  SURFACE / ORGANISM LAYER EXPORTS — v24.0 IMMORTAL
//  (for Understanding / CNS / Portal alignment)
// ============================================================================

// Required 3 for every “surface” in the organism graph
export const pulseRole = Identity.pulseRole;

export const surfaceMeta = Identity.surfaceMeta;

export const pulseLoreContext = Identity.pulseLoreContext;

// Optional: richer experience meta for AI / tooling
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;

// Optional: export meta for tooling / dev panels
export const EXPORT_META = Identity.EXPORT_META;


import { AIBinaryAgent } from "./aiBinaryAgent-v24.js";
import { AIMemory } from "./aiMemory-v24.js";

import { AIAnatomy as AIBinaryAnatomy } from "./aiAnatomy-v24.js";
import { AIBinaryGenome } from "./aiGenome-v24.js";
import { AIBinaryVitals } from "./aiVitals-v24.js";
import { AIBinaryMetabolism } from "./aiMetabolism-v24.js";
import { AIBinaryHormones } from "./aiHormones-v24.js";
import { AIBinarySentience } from "./aiSentience-v24.js";
import { AIBinaryConsciousness } from "./aiConsciousness-v24.js";
import { AIBinaryImmunity } from "./aiImmunity-v24.js";
import { AIBinaryPipeline } from "./aiPipeline-v24.js";
import { AIBinaryReflex } from "./aiReflex-v24.js";
import { AIBinaryScheduler } from "./aiScheduler-v24.js";
import { AIBinaryOrganRegistry } from "./aiBinaryOrganRegistry-v24.js";
import { AIBinaryEvolution } from "./aiBinaryEvolution-v24.js";

import { createPulseAIChunker } from "./PulseAIChunker-v24.js";

// ============================================================================
//  ORGANISM BOOTLOADER — PURE BEHAVIOR (NO META IN THIS FILE ANYMORE)
// ============================================================================

export async function AIDualbandOrganismBootloader() {
  // Create chunker
  const chunker = createPulseAIChunker();

  // Instantiate binary organs
  const agent = AIBinaryAgent();
  const memory = AIMemory();
  const anatomy = AIBinaryAnatomy();
  const genome = AIBinaryGenome();
  const vitals = AIBinaryVitals();
  const metabolism = AIBinaryMetabolism();
  const hormones = AIBinaryHormones();
  const sentience = AIBinarySentience();
  const consciousness = AIBinaryConsciousness();
  const immunity = AIBinaryImmunity();
  const pipeline = AIBinaryPipeline();
  const reflex = AIBinaryReflex();
  const scheduler = AIBinaryScheduler();
  const registry = AIBinaryOrganRegistry();
  const evolution = AIBinaryEvolution();

  // Wire organism anatomy
  registry.register("agent", agent);
  registry.register("memory", memory);
  registry.register("anatomy", anatomy);
  registry.register("genome", genome);
  registry.register("vitals", vitals);
  registry.register("metabolism", metabolism);
  registry.register("hormones", hormones);
  registry.register("sentience", sentience);
  registry.register("consciousness", consciousness);
  registry.register("immunity", immunity);
  registry.register("pipeline", pipeline);
  registry.register("reflex", reflex);
  registry.register("scheduler", scheduler);
  registry.register("evolution", evolution);

  // Compute organism artery
  const artery = anatomy.computeArtery({
    agent,
    memory,
    genome,
    vitals,
    metabolism,
    hormones,
    sentience,
    consciousness,
    immunity,
    pipeline,
    reflex,
    scheduler,
    evolution
  });

  // Expose stable organism surface
  return Object.freeze({
    artery,
    registry,
    chunker,
    bootVersion: "v24.0-IMMORTAL"
  });
}

// ============================================================================
//  GLOBAL ORGANISM ARTERY REGISTRY (READ-ONLY, METRICS-ONLY)
// ============================================================================
const _globalOrganismArteryRegistry = new Map();

export function getGlobalOrganismArteries() {
  const out = {};
  for (const [k, v] of _globalOrganismArteryRegistry.entries()) {
    out[k] = v;
  }
  return out;
}

function _registryKey(id) {
  return `${id || "binary-organism"}#0`;
}

// ============================================================================
//  ORGANISM CONTEXT — IDENTITY OF THE DUALBAND ORGANISM
// ============================================================================
const ORGANISM_CONTEXT = Object.freeze({
  layer: OrganismKernelMeta.layer,
  role: OrganismKernelMeta.role,
  version: OrganismKernelMeta.version,
  lineage: "pulse-organism-v24.0-IMMORTAL",
  evo: OrganismKernelMeta.evo
});

// ============================================================================
//  KERNEL-LEVEL CHUNKER (32-LANE, NON-MIND)
// ============================================================================
const kernelChunker = createPulseAIChunker({
  id: "PulseAIChunker-OrganismKernel",
  defaultChunkSize: 4096,
  maxChunkSize: 65536,
  trace: false
});

// Prewarm common patterns for organism structures
kernelChunker.prewarmPattern("genome", {
  defaultChunkSize: 4096,
  maxChunkSize: 32768,
  band: "binary"
});

kernelChunker.prewarmPattern("artery", {
  defaultChunkSize: 2048,
  maxChunkSize: 16384,
  band: "symbolic"
});

// v24+: optional prewarm for readiness + daemon metrics
kernelChunker.prewarmPattern("readiness", {
  defaultChunkSize: 1024,
  maxChunkSize: 8192,
  band: "symbolic"
});

// ============================================================================
//  BINARY ORGANISM PREWARM ENGINE — v24.0 IMMORTAL
// ============================================================================
export function prewarmBinaryOrganism(config = {}) {
  try {
    const { trace = false } = config;

    const warmAgent = new AIBinaryAgent({
      id: "prewarm-agent",
      maxBits: 2048,
      trace
    });

    warmAgent.encode?.("prewarm");
    warmAgent.decode?.(warmAgent.encode?.("prewarm"), "string");

    const warmMemory = new AIMemory({
      id: "prewarm-memory",
      maxBits: 4096,
      trace
    });

    const k = warmAgent.encode("prewarm-key");
    const v = warmAgent.encode("prewarm-value");

    warmMemory.write(k, v);
    warmMemory.read(k);
    warmMemory.listKeys?.();

    const warmRegistry = new AIBinaryOrganRegistry({
      id: "prewarm-registry",
      encoder: warmAgent,
      memory: warmMemory,
      trace
    });

    const warmEvolution = new AIBinaryEvolution({
      id: "prewarm-evolution",
      encoder: warmAgent,
      memory: warmMemory,
      trace
    });

    warmEvolution.generateSignature({
      id: "prewarm-organ",
      constructor: { name: "PrewarmOrgan" }
    });

    warmRegistry.registerOrgan({
      id: "prewarm-organ",
      constructor: { name: "PrewarmOrgan" }
    });

    const warmAnatomy = new AIBinaryAnatomy({
      id: "prewarm-anatomy",
      encoder: warmAgent,
      memory: warmMemory,
      trace
    });

    warmAnatomy.registerOrgan("prewarm-organ");
    warmAnatomy.store();

    const warmGenome = new AIBinaryGenome({
      id: "prewarm-genome",
      encoder: warmAgent,
      registry: warmRegistry,
      evolution: warmEvolution,
      memory: warmMemory,
      trace
    });

    warmGenome.storeGenome();

    const warmReflex = new AIBinaryReflex({ id: "prewarm-reflex", trace });
    const warmPipeline = new AIBinaryPipeline({ id: "prewarm-pipeline", trace });

    const warmScheduler = new AIBinaryScheduler({
      id: "prewarm-scheduler",
      encoder: warmAgent,
      pipeline: warmPipeline,
      reflex: warmReflex,
      trace
    });

    warmScheduler.tick?.();

    const warmVitals = new AIBinaryVitals({
      id: "prewarm-vitals",
      encoder: warmAgent,
      memory: warmMemory,
      evolution: warmEvolution,
      trace
    });

    const warmMetabolism = new AIBinaryMetabolism({
      id: "prewarm-metabolism",
      encoder: warmAgent,
      pipeline: warmPipeline,
      scheduler: warmScheduler,
      vitals: warmVitals,
      trace
    });

    const warmSentience = new AIBinarySentience({
      id: "prewarm-sentience",
      encoder: warmAgent,
      anatomy: warmAnatomy,
      genome: warmGenome,
      immunity: null,
      vitals: warmVitals,
      registry: warmRegistry,
      trace
    });

    const warmHormones = new AIBinaryHormones({
      id: "prewarm-hormones",
      encoder: warmAgent,
      metabolism: warmMetabolism,
      sentience: warmSentience,
      trace
    });

    const warmConsciousness = new AIBinaryConsciousness({
      id: "prewarm-consciousness",
      encoder: warmAgent,
      sentience: warmSentience,
      metabolism: warmMetabolism,
      hormones: warmHormones,
      vitals: warmVitals,
      anatomy: warmAnatomy,
      immunity: null,
      trace
    });

    warmConsciousness.generateConsciousnessPacket?.();

    // Optional: prewarm chunker lanes structurally
    kernelChunker.chunkJSON(
      {
        id: "prewarm-organism",
        registryCount: warmRegistry?.count?.() ?? 0
      },
      { label: "artery", band: "symbolic" }
    );

    return true;
  } catch (err) {
    console.error("[BinaryOrganism Prewarm] Failed:", err);
    return false;
  }
}

// ============================================================================
//  ORGANISM ARTERY SNAPSHOT — v24.0 IMMORTAL
// ============================================================================
function computeOrganismArtery({ registry, anatomy, genome, memory, scheduler, consciousness }) {
  const registryCount = registry?.count?.() ?? 0;
  const anatomyCount = anatomy?.count?.() ?? 0;
  const memorySize = memory?.size?.() ?? 0;

  const artery = Object.freeze({
    timestamp: Date.now(), // remains symbolic; deterministic enough at kernel level
    kernel: {
      id: OrganismKernelMeta.identity,
      version: OrganismKernelMeta.version,
      layer: OrganismKernelMeta.layer,
      role: OrganismKernelMeta.role
    },
    counts: {
      registry: registryCount,
      anatomy: anatomyCount
    },
    hashes: {
      genome: genome?.hash?.() ?? null,
      consciousness: consciousness?.hash?.() ?? null
    },
    memory: {
      footprint: memorySize,
      bucket: memorySize > 8192 ? "high" : "medium"
    },
    scheduler: {
      state: scheduler?.state?.() ?? null
    },
    buckets: {
      registry: registryCount > 32 ? "high" : "medium"
    },
    // v24+: daemon + sealed-organism awareness (symbolic only)
    organism: {
      sealed: true,
      daemonOriented: true,
      portalCompatible: true,
      bridgeCompatible: true
    }
  });

  const key = _registryKey("binary-organism");
  _globalOrganismArteryRegistry.set(key, artery);

  return artery;
}
// ============================================================================
//  createBinaryOrganism() — v24.0 IMMORTAL
// ============================================================================
export function createBinaryOrganism({
  trace = false,
  nodeAdminReporter = null,
  overmindReporter = null
} = {}) {
  prewarmBinaryOrganism({ trace });

  const encoder = new AIBinaryAgent({
    id: "ai-binary-agent",
    maxBits: 4096,
    trace
  });

  const memory = new AIMemory({
    id: "ai-binary-memory",
    maxBits: 16384,
    trace,
    nodeAdminReporter,
    overmindReporter
  });

  const registry = new AIBinaryOrganRegistry({
    id: "ai-binary-organ-registry",
    encoder,
    memory,
    trace
  });

  const evolution = new AIBinaryEvolution({
    id: "ai-binary-evolution",
    encoder,
    memory,
    trace
  });

  const immunity = new AIBinaryImmunity({
    id: "ai-binary-immunity",
    encoder,
    registry,
    evolution,
    memory,
    trace
  });

  const anatomy = new AIBinaryAnatomy({
    id: "ai-binary-anatomy",
    encoder,
    memory,
    trace
  });

  const vitals = new AIBinaryVitals({
    id: "ai-binary-vitals",
    encoder,
    memory,
    evolution,
    trace
  });

  const genome = new AIBinaryGenome({
    id: "ai-binary-genome",
    encoder,
    registry,
    evolution,
    memory,
    trace
  });

  const reflex = new AIBinaryReflex({
    id: "ai-binary-reflex",
    trace
  });

  const pipeline = new AIBinaryPipeline({
    id: "ai-binary-pipeline",
    trace
  });

  const scheduler = new AIBinaryScheduler({
    id: "ai-binary-scheduler",
    encoder,
    pipeline,
    reflex,
    trace
  });

  const metabolism = new AIBinaryMetabolism({
    id: "ai-binary-metabolism",
    encoder,
    pipeline,
    scheduler,
    vitals,
    trace
  });

  const sentience = new AIBinarySentience({
    id: "ai-binary-sentience",
    encoder,
    anatomy,
    genome,
    immunity,
    vitals,
    registry,
    trace
  });

  const hormones = new AIBinaryHormones({
    id: "ai-binary-hormones",
    encoder,
    metabolism,
    sentience,
    trace
  });

  const consciousness = new AIBinaryConsciousness({
    id: "ai-binary-consciousness",
    encoder,
    sentience,
    metabolism,
    hormones,
    vitals,
    anatomy,
    immunity,
    trace
  });

  const organs = {
    encoder,
    memory,
    registry,
    evolution,
    immunity,
    anatomy,
    vitals,
    genome,
    pipeline,
    reflex,
    scheduler,
    metabolism,
    sentience,
    hormones,
    consciousness
  };

  for (const [, organ] of Object.entries(organs)) {
    if (!organ || !organ.id) continue;
    registry.registerOrgan(organ);
    anatomy.registerOrgan(organ.id);
  }

  anatomy.connect(metabolism.id, hormones.id);
  anatomy.connect(hormones.id, consciousness.id);
  anatomy.connect(sentience.id, consciousness.id);
  anatomy.connect(vitals.id, metabolism.id);

  anatomy.store();
  genome.storeGenome();

  const artery = computeOrganismArtery({
    registry,
    anatomy,
    genome,
    memory,
    scheduler,
    consciousness
  });

  const arteryChunks = kernelChunker.chunkJSON(artery, {
    label: "artery",
    band: "symbolic"
  });

  if (nodeAdminReporter) {
    try {
      nodeAdminReporter(artery, OrganismKernelMeta);
    } catch {}
  }

  if (overmindReporter) {
    try {
      overmindReporter(artery, OrganismKernelMeta);
    } catch {}
  }

  const readiness = Object.freeze({
    meta: {
      layer: "BinaryOrganismReadiness",
      role: "READINESS_SURFACE",
      version: "24.0-IMMORTAL",
      evo: {
        deterministic: true,
        driftProof: true,
        zeroMutation: true,
        zeroSecrets: true,
        sealedOrganism: true,
        daemonOriented: true
      }
    },

    registryCount: registry?.count?.() ?? null,
    anatomyCount: anatomy?.count?.() ?? null,
    genomeHash: genome?.hash?.() ?? null,
    consciousnessHash: consciousness?.hash?.() ?? null,
    memoryFootprint: memory?.size?.() ?? null,
    schedulerState: scheduler?.state?.() ?? null,

    artery,
    arteryChunks,
    prewarmed: true
  });

  return {
    context: ORGANISM_CONTEXT,
    ...organs,
    artery,
    arteryChunks,
    readiness,
    chunker: kernelChunker
  };
}

// ============================================================================
//  bootBinaryOrganism() — v24.0 IMMORTAL
//  (now delegates to AIDualbandOrganismBootloader defined on this page)
// ============================================================================
export async function bootBinaryOrganism(options = {}) {
  const organism = await AIDualbandOrganismBootloader(options);

  const firstConsciousness =
    organism.consciousness?.generateConsciousnessPacket
      ? organism.consciousness.generateConsciousnessPacket()
      : null;

  return {
    ...organism,
    firstConsciousness
  };
}

// ============================================================================
//  DEFAULT EXPORT — DUALBAND ORGANISM KERNEL SURFACE
// ============================================================================
const PulseOrganismBoot = {
  ...ORGANISM_CONTEXT,
  meta: OrganismKernelMeta,
  create: createBinaryOrganism,
  boot: bootBinaryOrganism,
  getGlobalOrganismArteries,
  chunker: kernelChunker
};

export default PulseOrganismBoot;
