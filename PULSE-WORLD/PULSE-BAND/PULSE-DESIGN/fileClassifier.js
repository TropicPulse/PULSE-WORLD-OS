/*
===============================================================================
AI_EXPERIENCE_META = {
  identity: "PulseDesign.Anatomist",
  version: "v14-Immortal",
  layer: "pulse_design",
  role: "structural_classifier_and_identity_mapper",
  lineage: "Anatomist-v7.1 → v10.4 → v12.3 → v14-Immortal",

  evo: {
    structuralClassifier: true,
    identityMapper: true,
    morphologyEngine: true,
    patternRegistry: true,
    signatureBased: true,

    symbolicPrimary: true,
    binaryAware: true,
    dualBand: true,

    deterministic: true,
    driftProof: true,
    pureCompute: true,

    zeroMutationOfInput: true,
    zeroNetwork: true,
    zeroFilesystem: true
  },

  contract: {
    always: [
      "PulseDesign.RepoWalker",
      "PulseDesign.ManifestBuilder",
      "PulseDesign.ManifestWriter"
    ],
    never: [
      "safeRoute",
      "fetchViaCNS",
      "dynamicImport",
      "eval",
      "Function"
    ]
  }
}
===============================================================================
EXPORT_META = {
  organ: "PulseDesign.Anatomist",
  layer: "pulse_design",
  stability: "IMMORTAL",
  deterministic: true,
  pure: true,

  consumes: ["filePath", "content"],
  produces: [
    "path",
    "ext",
    "type",
    "usesPulseBand",
    "usesHealing",
    "dataSources",
    "classification",
    "bands",
    "signals"
  ],

  sideEffects: "none",
  network: "none",
  filesystem: "none"
}
===============================================================================
FILE: tropic-pulse-functions/PULSE-WORLD/PULSE-DESIGN/fileClassifier.js
LAYER: THE ANATOMIST (Structural Classifier + Identity Mapper + Evolutionary Morphology)
===============================================================================

ROLE (v14+):
  THE ANATOMIST — Evolvable structural classifier for Pulse OS files.
  • Inspects file path + content and builds a FileSignature.
  • Uses a pattern registry to determine identity, type, and structural metadata.
  • Provides deterministic classification for ManifestBuilder.
  • Acts as the “morphology lab” of the digital organism.

PURPOSE (v14+):
  • Make file identity AI‑readable + human‑readable.
  • Detect file type (page, component, layout, api, util, config, hook, store, unknown).
  • Detect PulseBand usage, healing hooks, and data sources.
  • Surface evolutionary structural patterns via a registry (not hardcoded guesses).

CONTRACT:
  • PURE FUNCTION — no filesystem access.
  • READ‑ONLY — no writes.
  • NO eval(), NO Function(), NO dynamic imports.
  • NO executing user code.
  • NO network calls.
  • Deterministic output only.

SAFETY:
  • v14+ upgrade is PURE + STRUCTURAL — logic is richer but still side‑effect free.
  • All behavior is deterministic and organism‑safe.
===============================================================================
*/

import path from "path";

// ============================================================================
// INTERNAL TYPES (conceptual, not enforced at runtime)
// ============================================================================
//
// FileSignature {
//   path: string
//   ext: string
//   pathSegments: string[]
//   sizeApprox: number        // content length
//   firstLine: string | null
//   hasPulseBand: boolean
//   hasHealing: boolean
//   dataSources: {
//     firestore: boolean
//     sql: boolean
//     pulseFields: boolean
//   }
//   imports: string[]
//   exports: {
//     hasDefault: boolean
//     hasNamed: boolean
//     named: string[]
//   }
//   contentIncludes: (...tokens: string[]) => boolean
// }
//
// FileClassification {
//   type: string              // page, component, layout, api, util, config, hook, store, unknown
//   organHints: string[]      // e.g. ["ui", "api", "state", "config"]
//   confidence: number        // 0..1
//   patternId: string
// }
// ============================================================================

// ============================================================================
// PATTERN REGISTRY — Evolvable Structural Patterns
// ============================================================================

const TYPE_PATTERNS = [
  {
    id: "next_page",
    organType: "page",
    organHints: ["ui", "route"],
    match(sig) {
      return (
        sig.ext === ".js" &&
        sig.pathSegments.includes("pages") &&
        (sig.exports.hasDefault || sig.exports.named.includes("Page"))
      );
    },
  },
  {
    id: "ui_component",
    organType: "component",
    organHints: ["ui"],
    match(sig) {
      return (
        sig.ext === ".js" &&
        sig.pathSegments.includes("components") &&
        (sig.exports.hasDefault || sig.exports.named.length > 0)
      );
    },
  },
  {
    id: "layout_component",
    organType: "layout",
    organHints: ["ui", "layout"],
    match(sig) {
      return (
        sig.ext === ".js" &&
        (sig.pathSegments.includes("layouts") ||
          sig.path.toLowerCase().includes("layout")) &&
        (sig.exports.hasDefault || sig.exports.named.includes("Layout"))
      );
    },
  },
  {
    id: "api_route",
    organType: "api",
    organHints: ["api"],
    match(sig) {
      const lowerPath = sig.path.toLowerCase();
      return (
        sig.ext === ".js" &&
        (sig.pathSegments.includes("api") ||
          lowerPath.includes("/api/") ||
          lowerPath.endsWith(".api.js")) &&
        (sig.exports.named.includes("GET") ||
          sig.exports.named.includes("POST") ||
          sig.exports.named.includes("handler"))
      );
    },
  },
  {
    id: "config_file",
    organType: "config",
    organHints: ["config"],
    match(sig) {
      const lower = sig.path.toLowerCase();
      return (
        sig.ext === ".js" &&
        (lower.endsWith(".config.js") ||
          lower.endsWith("config.js") ||
          sig.pathSegments.includes("config"))
      );
    },
  },
  {
    id: "hook_file",
    organType: "hook",
    organHints: ["hook", "state"],
    match(sig) {
      const base = path.basename(sig.path).toLowerCase();
      return (
        sig.ext === ".js" &&
        (base.startsWith("use") || base.includes(".hook")) &&
        sig.contentIncludes("useState", "useEffect", "useMemo")
      );
    },
  },
  {
    id: "store_file",
    organType: "store",
    organHints: ["state"],
    match(sig) {
      const lower = sig.path.toLowerCase();
      return (
        sig.ext === ".js" &&
        (lower.includes("store") || lower.includes("state")) &&
        sig.contentIncludes("createStore", "configureStore", "createSlice")
      );
    },
  },
  {
    id: "util_file",
    organType: "util",
    organHints: ["util"],
    match(sig) {
      const lower = sig.path.toLowerCase();
      return (
        sig.ext === ".js" &&
        (lower.includes("/utils/") ||
          lower.includes("/lib/") ||
          lower.endsWith(".util.js") ||
          lower.endsWith(".utils.js")) &&
        !sig.exports.hasDefault
      );
    },
  },
];

// ============================================================================
// PUBLIC API — Anatomical Classification
// ============================================================================

export function classifyFile(filePath, content = "") {
  if (!filePath) {
    throw new Error("fileClassifier: missing filePath");
  }

  const signature = buildFileSignature(filePath, content);
  const classification = classifyFromSignature(signature);

  const usesPulseBand = signature.hasPulseBand;
  const usesHealing = signature.hasHealing;
  const dataSources = buildDataSourcesArray(signature);

  return {
    // original fields (backwards‑compatible)
    path: filePath,
    ext: signature.ext,
    type: classification.type,
    usesPulseBand,
    usesHealing,
    dataSources,

    // v14+ enriched fields
    classification,
    bands: {
      pulseBand: signature.hasPulseBand,
      healing: signature.hasHealing,
    },
    signals: {
      firestore: signature.dataSources.firestore,
      sql: signature.dataSources.sql,
      pulseFields: signature.dataSources.pulseFields,
    },
  };
}

// ============================================================================
// SIGNATURE BUILDER — Structural + Content Signature
// ============================================================================

function buildFileSignature(filePath, content) {
  const ext = path.extname(filePath) || "";
  const pathSegments = filePath.split(/[\\/]/).filter(Boolean);
  const sizeApprox = typeof content === "string" ? content.length : 0;
  const firstLine = extractFirstLine(content);

  const hasPulseBand = detectPulseBand(content);
  const hasHealing = detectHealing(content);
  const dataSources = detectDataSourcesFlags(content);
  const imports = detectImports(content);
  const exportsInfo = detectExports(content);

  const sig = {
    path: filePath,
    ext,
    pathSegments,
    sizeApprox,
    firstLine,
    hasPulseBand,
    hasHealing,
    dataSources,
    imports,
    exports: exportsInfo,
    contentIncludes: (...tokens) => contentIncludesAll(content, tokens),
  };

  return sig;
}

// ============================================================================
// CLASSIFICATION — Pattern Registry + Fallback
// ============================================================================

function classifyFromSignature(sig) {
  for (const pattern of TYPE_PATTERNS) {
    try {
      if (pattern.match(sig)) {
        return {
          type: pattern.organType,
          organHints: pattern.organHints || [],
          confidence: 0.9,
          patternId: pattern.id,
        };
      }
    } catch {
      // pattern failure should never break classification; continue
    }
  }

  // Fallback: legacy folder‑based heuristics (kept as last resort)
  const legacyType = legacyDetectType(sig.path);

  return {
    type: legacyType,
    organHints: [],
    confidence: legacyType === "unknown" ? 0.2 : 0.6,
    patternId: "legacy_fallback",
  };
}

// ============================================================================
// LEGACY TYPE DETECTION — Fallback Only (for backward compatibility)
// ============================================================================

function legacyDetectType(filePath) {
  const lower = filePath.toLowerCase();

  if (lower.includes("/pages/") && lower.endsWith(".js")) return "page";
  if (lower.includes("/components/") && lower.endsWith(".js")) return "component";
  if (lower.includes("/layouts/") && lower.endsWith(".js")) return "layout";
  if (lower.includes("/api/") && lower.endsWith(".js")) return "api";

  return "unknown";
}

// ============================================================================
// FEATURE DETECTION — PulseBand
// ============================================================================

function detectPulseBand(content) {
  if (!content) return false;
  return (
    content.includes("usePulseBand") ||
    content.includes("PulseBand") ||
    content.toLowerCase().includes("pulseband")
  );
}

// ============================================================================
// FEATURE DETECTION — Healing Hooks
// ============================================================================

function detectHealing(content) {
  if (!content) return false;
  const lower = content.toLowerCase();
  return (
    lower.includes("usehealing") ||
    lower.includes("healing") ||
    content.includes("HealHook")
  );
}

// ============================================================================
// DATA SOURCE DETECTION — Flags (Firestore, SQL, PulseFields)
// ============================================================================

function detectDataSourcesFlags(content) {
  const lower = (content || "").toLowerCase();

  const firestore =
    lower.includes("collection(") ||
    lower.includes("getdoc(") ||
    lower.includes("getdocs(");

  const sql =
    (content || "").includes("SELECT ") ||
    (content || "").includes("INSERT ") ||
    (content || "").includes("UPDATE ") ||
    (content || "").includes("DELETE ");

  const pulseFields =
    lower.includes("pulse_field") ||
    (content || "").includes("PulseField") ||
    lower.includes("pulse.fields");

  return {
    firestore,
    sql,
    pulseFields,
  };
}

function buildDataSourcesArray(sig) {
  const sources = [];
  if (sig.dataSources.firestore) sources.push({ type: "firestore" });
  if (sig.dataSources.sql) sources.push({ type: "sql" });
  if (sig.dataSources.pulseFields) sources.push({ type: "pulse-fields" });
  return sources;
}

// ============================================================================
// IMPORT / EXPORT DETECTION — Lightweight Structural Hints
// ============================================================================

function detectImports(content) {
  if (!content) return [];
  const lines = content.split(/\r?\n/);
  const imports = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("import ")) {
      imports.push(trimmed);
    }
  }

  return imports;
}

function detectExports(content) {
  if (!content) {
    return {
      hasDefault: false,
      hasNamed: false,
      named: [],
    };
  }

  const lines = content.split(/\r?\n/);
  let hasDefault = false;
  const named = new Set();

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed.startsWith("export default")) {
      hasDefault = true;
    }

    if (trimmed.startsWith("export const ")) {
      const name = extractNameAfter(trimmed, "export const ");
      if (name) named.add(name);
    }

    if (trimmed.startsWith("export function ")) {
      const name = extractNameAfter(trimmed, "export function ");
      if (name) named.add(name);
    }

    if (trimmed.startsWith("export class ")) {
      const name = extractNameAfter(trimmed, "export class ");
      if (name) named.add(name);
    }

    if (trimmed.startsWith("export {")) {
      const inner = trimmed.replace(/^export\s*\{/, "").replace(/\}.*$/, "");
      inner
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
        .forEach((n) => named.add(n.split(/\s+as\s+/)[0]));
    }
  }

  return {
    hasDefault,
    hasNamed: named.size > 0,
    named: Array.from(named),
  };
}

// ============================================================================
// SMALL HELPERS
// ============================================================================

function extractFirstLine(content) {
  if (!content) return null;
  const idx = content.indexOf("\n");
  if (idx === -1) return content.trim() || null;
  return content.slice(0, idx).trim() || null;
}

function contentIncludesAll(content, tokens) {
  if (!content) return false;
  for (const t of tokens) {
    if (!t) continue;
    if (!content.includes(t)) return false;
  }
  return true;
}

function extractNameAfter(line, prefix) {
  const rest = line.slice(prefix.length).trim();
  if (!rest) return null;
  const match = rest.match(/^([A-Za-z0-9_$]+)/);
  return match ? match[1] : null;
}
