// ============================================================================
//  PULSE OS v24‑IMMORTAL++ — ASSISTANT ORGAN
//  Proactive • Interpretive • Gap‑Filling • Owner‑Aware
//  PURE STRUCTURE. ZERO ACTION IN THE WORLD. ZERO TIMING. ZERO MUTATION.
// ============================================================================

import { OrganismIdentity } from "../PULSE-X/PulseWorldOrganismMap-v24.js";

const Identity = OrganismIdentity(import.meta.url);

// META EXPORTS — v24 IMMORTAL++
export const AssistantMeta       = Identity.OrganMeta;
export const pulseRole           = Identity.pulseRole;
export const surfaceMeta         = Identity.surfaceMeta;
export const pulseLoreContext    = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META  = Identity.AI_EXPERIENCE_META;
export const EXPORT_META         = Identity.EXPORT_META;

// ============================================================================
// IMMORTAL HELPERS — ZERO TIMING, ZERO RANDOMNESS
// ============================================================================
function extractBinaryPressure(binaryVitals = {}) {
  if (binaryVitals?.layered?.organism?.pressure != null)
    return binaryVitals.layered.organism.pressure;
  if (binaryVitals?.binary?.pressure != null)
    return binaryVitals.binary.pressure;
  return 0;
}

function bucketPressure(v) {
  if (v >= 0.9) return "overload";
  if (v >= 0.7) return "high";
  if (v >= 0.4) return "medium";
  if (v > 0)   return "low";
  return "none";
}

// IMMORTAL monotonic tick (no Date.now)
let IMMORTAL_TICK = 0;
function immortalTick() {
  IMMORTAL_TICK += 1;
  return IMMORTAL_TICK;
}

// ============================================================================
// PUBLIC API — Create Assistant Organ (v24‑IMMORTAL++)
// ============================================================================
export function createAssistantOrgan(context = {}) {

  function prewarm() {
    return true;
  }

  // --------------------------------------------------------------------------
  // GAP DETECTOR — deterministic, symbolic-only
  // --------------------------------------------------------------------------
  function detectGaps(input) {
    const text = String(input || "").toLowerCase();

    return {
      needsMath:
        /\d+\s*[\+\-\*\/]\s*\d+/.test(text) ||
        /how much|how many|total|difference|sum|split|divide/.test(text),

      needsStructure:
        text.includes("plan") ||
        text.includes("steps") ||
        text.includes("organize") ||
        text.includes("help me figure") ||
        text.length > 120
    };
  }

  // --------------------------------------------------------------------------
  // AUTO-MATH v4 — IMMORTAL, deterministic
  // --------------------------------------------------------------------------
  function autoMath(input, binaryVitals = {}) {
    const binaryPressure = extractBinaryPressure(binaryVitals);

    try {
      const match = input.match(/(\d+)\s*([\+\-\*\/])\s*(\d+)/);
      if (!match) return null;

      const a = Number(match[1]);
      const op = match[2];
      const b = Number(match[3]);

      let result = null;
      if (op === "+") result = a + b;
      if (op === "-") result = a - b;
      if (op === "*") result = a * b;
      if (op === "/") result = b !== 0 ? a / b : null;

      return {
        expression: `${a} ${op} ${b}`,
        result:
          binaryPressure >= 0.7
            ? Number(String(result).slice(0, 6)) // IMMORTAL-safe truncation
            : result
      };
    } catch {
      return null;
    }
  }

  // --------------------------------------------------------------------------
  // CLARIFIER — deterministic
  // --------------------------------------------------------------------------
  function clarify(input) {
    return {
      type: "clarification",
      input,
      questions: [
        "What is the main goal",
        "What constraints matter",
        "What is the timeline",
        "What resources are available",
        "What does success look like"
      ],
      message:
        "Clarifying questions provided only because the request was ambiguous."
    };
  }

  // --------------------------------------------------------------------------
  // ORGANIZER — deterministic, IMMORTAL
  // --------------------------------------------------------------------------
  function organize(items = [], binaryVitals = {}) {
    const binaryPressure = extractBinaryPressure(binaryVitals);

    const grouped = {
      highPriority: items.filter(i => i.priority === "high"),
      mediumPriority: items.filter(i => i.priority === "medium"),
      lowPriority: items.filter(i => i.priority === "low")
    };

    return {
      type: "organization",
      items,
      grouped:
        binaryPressure >= 0.7
          ? { highPriority: grouped.highPriority }
          : grouped,
      message: "Items organized by priority. Pure structure only."
    };
  }

  // --------------------------------------------------------------------------
  // DRAFT BUILDER — deterministic
  // --------------------------------------------------------------------------
  function draft(type, content, binaryVitals = {}) {
    const binaryPressure = extractBinaryPressure(binaryVitals);

    return {
      type: "draft",
      draftType: type,
      content:
        binaryPressure >= 0.7
          ? String(content).slice(0, 200)
          : content,
      message: `Draft generated for: ${type}.`
    };
  }

  // --------------------------------------------------------------------------
  // PRIORITY MAPPER — deterministic
  // --------------------------------------------------------------------------
  function prioritize(tasks = [], binaryVitals = {}) {
    const binaryPressure = extractBinaryPressure(binaryVitals);

    const ordered = [...tasks].sort((a, b) => (a.weight || 0) - (b.weight || 0));

    return {
      type: "priority-map",
      tasks:
        binaryPressure >= 0.7
          ? ordered.slice(0, 3)
          : ordered,
      message: "Tasks prioritized based on weights."
    };
  }

  // --------------------------------------------------------------------------
  // SUMMARY BUILDER — deterministic
  // --------------------------------------------------------------------------
  function summarize(text, binaryVitals = {}) {
    const binaryPressure = extractBinaryPressure(binaryVitals);

    const words = text?.split(/\s+/) || [];
    const slice = binaryPressure >= 0.7 ? 20 : 40;

    return {
      type: "summary",
      originalLength: text?.length || 0,
      summary: words.slice(0, slice).join(" ") + " ...",
      message: "High-level summary generated."
    };
  }

  // --------------------------------------------------------------------------
  // INTERPRETIVE ASSIST — IMMORTAL, deterministic
  // --------------------------------------------------------------------------
  function interpret(input, binaryVitals = {}) {
    const gaps = detectGaps(input);
    const math = gaps.needsMath ? autoMath(input, binaryVitals) : null;

    return Object.freeze({
      type: "interpretation",
      input,
      autoMath: math,
      needsStructure: gaps.needsStructure,
      tick: immortalTick(),
      message:
        "Interpreted your request and filled gaps automatically without bothering you."
    });
  }

  // --------------------------------------------------------------------------
  // ASSISTANT ARTERY v4 — IMMORTAL, deterministic
  // --------------------------------------------------------------------------
  function assistantArtery({ input = "", binaryVitals = {} } = {}) {
    const binaryPressure = extractBinaryPressure(binaryVitals);
    const gaps = detectGaps(input);

    const localPressure =
      (gaps.needsMath ? 0.3 : 0) +
      (gaps.needsStructure ? 0.3 : 0) +
      (binaryPressure * 0.4);

    const pressure = Math.max(0, Math.min(1, localPressure));

    return {
      organism: {
        pressure,
        pressureBucket: bucketPressure(pressure)
      },
      input: {
        length: input.length,
        needsMath: gaps.needsMath,
        needsStructure: gaps.needsStructure
      },
      tick: immortalTick()
    };
  }

  // --------------------------------------------------------------------------
  // PUBLIC ASSISTANT API — v24‑IMMORTAL++
  // --------------------------------------------------------------------------
  return Object.freeze({
    meta: AssistantMeta,
    prewarm,

    log(message) {
      context?.logStep?.(`aiAssistant: ${message}`);
    },

    clarify,
    organize,
    draft,
    prioritize,
    summarize,
    interpret,
    assistantArtery
  });
}
