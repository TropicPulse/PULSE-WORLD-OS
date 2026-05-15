/**
 * ============================================================================
 * ORGAN: PulseSpecsGenomeTranslator
 * VERSION: v20-IMMORTAL
 * LAYER: MEMORY / EVOLUTION (Backend Intelligence Layer)
 * ROLE: Convert SkeletalSpecs + NetworkSpecs → deterministic GenomeSpec
 * ============================================================================
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝
 * HIGH-LEVEL PURPOSE
 * ------------------
 * This organ is the organism’s *genetic memory*.
 *
 * It ingests:
 *   - SkeletalSpecs (DOM-level semantic skeletons)
 *   - NetworkSpecs (proxy-level flow maps)
 *
 * And emits a long-lived, deterministic:
 *
 *   GenomeSpec v20-IMMORTAL
 *
 * The GenomeSpec describes:
 *   - lineage   → when this subject appeared and how it evolved
 *   - traits    → stable structural characteristics
 *   - skills    → observable capabilities
 *   - habits    → temporal/behavioral patterns
 *   - stability → confidence in the genome’s reliability
 *
 * This powers:
 *   - personalization
 *   - prewarm and routing
 *   - Earn reputation and tiers
 *   - PulseWorld identity and mastery
 *
 * IMMORTAL-TIER GUARANTEES
 * ------------------------
 * 1. Deterministic:
 *    Same history → same GenomeSpec.
 *
 * 2. Zero Hallucination:
 *    Only infers from observable patterns.
 *    No psychological profiling, no identity guessing.
 *
 * 3. Schema Stability:
 *    GenomeSpec v20-IMMORTAL is a hard contract.
 *
 * 4. Safety:
 *    - No PII inference
 *    - No personality diagnosis
 *    - No sensitive attribute inference
 *
 * INPUT CONTRACT
 * --------------
 * buildGenomeSpec({
 *   skeletalHistory: Array<SkeletalSpec>,
 *   networkHistory: Array<NetworkSpec>,
 *   subjectId: string,
 *   timestamp: string (ISO 8601)
 * })
 *
 * OUTPUT CONTRACT
 * ---------------
 * GenomeSpec v20-IMMORTAL:
 *
 * {
 *   specVersion: "v20-genome",
 *   subjectId: string,
 *   capturedAt: string,
 *   lineage: {
 *     firstSeenAt: string,
 *     lastSeenAt: string,
 *     epochs: Array<{
 *       id: string,
 *       start: string,
 *       end: string,
 *       dominantMode: string,
 *       dominantFlows: string[]
 *     }>
 *   },
 *   traits: string[],   // stable structural characteristics
 *   skills: string[],   // observable capabilities
 *   habits: string[],   // temporal/behavioral patterns
 *   stability: number   // 0–1 confidence score
 * }
 *
 * VERSION LINEAGE (v19 → v20-IMMORTAL)
 * ------------------------------------
 * - Introduced explicit GenomeSpec schema.
 * - Added lineage/epochs as first-class structures.
 * - Added traits/skills/habits separation.
 * - Added stability score.
 * - Marked as IMMORTAL-tier: schema is now a hard contract.
 */

// ============================================================================
// PUBLIC ENTRYPOINT
// ============================================================================
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝

/**
 * Build a GenomeSpec from Skeletal + Network history.
 *
 * @param {Object} params
 * @param {Array<Object>} params.skeletalHistory - Array of SkeletalSpecs.
 * @param {Array<Object>} params.networkHistory  - Array of NetworkSpecs.
 * @param {string} params.subjectId              - Stable subject identifier.
 * @param {string} params.timestamp              - ISO 8601 capture time.
 * @returns {Object} GenomeSpec v20-IMMORTAL.
 */
export function buildGenomeSpec({
  skeletalHistory,
  networkHistory,
  subjectId,
  timestamp,
}) {
  const skeletal = Array.isArray(skeletalHistory) ? skeletalHistory : [];
  const network = Array.isArray(networkHistory) ? networkHistory : [];

  const lineage = buildLineage(skeletal, network, timestamp);
  const traits = inferTraits(skeletal, network);
  const skills = inferSkills(skeletal, network);
  const habits = inferHabits(skeletal, network);
  const stability = computeStabilityScore(skeletal, network);

  return {
    specVersion: "v20-genome",
    subjectId,
    capturedAt: timestamp,
    lineage,
    traits,
    skills,
    habits,
    stability,
  };
}

// ============================================================================
// LINEAGE: FIRST SEEN, LAST SEEN, EPOCHS
// ============================================================================

/**
 * Build lineage block: firstSeen, lastSeen, epochs.
 *
 * @param {Array<Object>} skeletalHistory
 * @param {Array<Object>} networkHistory
 * @param {string} now
 * @returns {Object}
 */
function buildLineage(skeletalHistory, networkHistory, now) {
  const firstSeen = findFirstTimestamp(skeletalHistory, networkHistory) || now;
  const epochs = buildEpochs(skeletalHistory, networkHistory);

  return {
    firstSeenAt: firstSeen,
    lastSeenAt: now,
    epochs,
  };
}

/**
 * Find earliest timestamp across Skeletal + Network history.
 *
 * @param {Array<Object>} skeletalHistory
 * @param {Array<Object>} networkHistory
 * @returns {string|null}
 */
function findFirstTimestamp(skeletalHistory, networkHistory) {
  const times = [];

  for (const s of skeletalHistory) {
    if (s?.meta?.capturedAt) times.push(s.meta.capturedAt);
  }
  for (const n of networkHistory) {
    if (n?.capturedAt) times.push(n.capturedAt);
  }

  if (times.length === 0) return null;

  times.sort();
  return times[0];
}

/**
 * Build epochs: coarse-grained segments of time with dominant modes/flows.
 *
 * This is intentionally simple:
 *   - group by day (or coarse time bucket)
 *   - compute dominant page mode + dominant flow kinds
 *
 * @param {Array<Object>} skeletalHistory
 * @param {Array<Object>} networkHistory
 * @returns {Array<Object>}
 */
function buildEpochs(skeletalHistory, networkHistory) {
  const buckets = new Map();

  // Helper to bucket by date (YYYY-MM-DD)
  const bucketKey = (iso) => (iso ? iso.slice(0, 10) : "unknown");

  for (const s of skeletalHistory) {
    const t = s?.meta?.capturedAt;
    if (!t) continue;
    const key = bucketKey(t);
    if (!buckets.has(key)) {
      buckets.set(key, { skeletal: [], network: [] });
    }
    buckets.get(key).skeletal.push(s);
  }

  for (const n of networkHistory) {
    const t = n?.capturedAt;
    if (!t) continue;
    const key = bucketKey(t);
    if (!buckets.has(key)) {
      buckets.set(key, { skeletal: [], network: [] });
    }
    buckets.get(key).network.push(n);
  }

  const keys = Array.from(buckets.keys()).sort();
  const epochs = [];

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const bucket = buckets.get(key);

    const start = findBucketStart(bucket);
    const end = findBucketEnd(bucket);

    const dominantMode = computeDominantMode(bucket.skeletal);
    const dominantFlows = computeDominantFlowKinds(bucket.network);

    epochs.push({
      id: `epoch-${i + 1}`,
      start,
      end,
      dominantMode,
      dominantFlows,
    });
  }

  return epochs;
}

/**
 * Find earliest timestamp in a bucket.
 *
 * @param {{ skeletal: Array<Object>, network: Array<Object> }} bucket
 * @returns {string}
 */
function findBucketStart(bucket) {
  const times = [];

  for (const s of bucket.skeletal) {
    if (s?.meta?.capturedAt) times.push(s.meta.capturedAt);
  }
  for (const n of bucket.network) {
    if (n?.capturedAt) times.push(n.capturedAt);
  }

  if (times.length === 0) return "";
  times.sort();
  return times[0];
}

/**
 * Find latest timestamp in a bucket.
 *
 * @param {{ skeletal: Array<Object>, network: Array<Object> }} bucket
 * @returns {string}
 */
function findBucketEnd(bucket) {
  const times = [];

  for (const s of bucket.skeletal) {
    if (s?.meta?.capturedAt) times.push(s.meta.capturedAt);
  }
  for (const n of bucket.network) {
    if (n?.capturedAt) times.push(n.capturedAt);
  }

  if (times.length === 0) return "";
  times.sort();
  return times[times.length - 1];
}

/**
 * Compute dominant page mode for an epoch.
 *
 * @param {Array<Object>} skeletalList
 * @returns {string}
 */
function computeDominantMode(skeletalList) {
  const counts = new Map();

  for (const s of skeletalList) {
    const mode = s?.focus?.mode || "unknown";
    counts.set(mode, (counts.get(mode) || 0) + 1);
  }

  if (counts.size === 0) return "unknown";

  let bestMode = "unknown";
  let bestCount = -1;

  for (const [mode, count] of counts.entries()) {
    if (count > bestCount) {
      bestCount = count;
      bestMode = mode;
    }
  }

  return bestMode;
}

/**
 * Compute dominant flow kinds for an epoch.
 *
 * @param {Array<Object>} networkList
 * @returns {string[]}
 */
function computeDominantFlowKinds(networkList) {
  const counts = new Map();

  for (const n of networkList) {
    const flows = Array.isArray(n.flows) ? n.flows : [];
    for (const f of flows) {
      const kind = f?.kind || "other";
      counts.set(kind, (counts.get(kind) || 0) + 1);
    }
  }

  const entries = Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
  return entries.slice(0, 3).map(([kind]) => kind);
}

// ============================================================================
// TRAITS: STABLE STRUCTURAL CHARACTERISTICS
// ============================================================================

/**
 * Infer structural traits from history.
 *
 * Traits are *structural*, not psychological.
 *
 * @param {Array<Object>} skeletalHistory
 * @param {Array<Object>} networkHistory
 * @returns {string[]}
 */
function inferTraits(skeletalHistory, networkHistory) {
  const traits = new Set();

  // Page mode traits
  if (skeletalHistory.some((s) => s?.focus?.mode === "chat")) {
    traits.add("uses-chat-interfaces");
  }
  if (skeletalHistory.some((s) => s?.focus?.mode === "editor")) {
    traits.add("uses-editors");
  }
  if (skeletalHistory.some((s) => s?.focus?.mode === "article")) {
    traits.add("reads-articles");
  }

  // Network traits
  if (networkHistory.some((n) => (n?.summary?.llmCalls || 0) > 0)) {
    traits.add("llm-network-usage");
  }
  if (networkHistory.some((n) => (n?.summary?.apiCalls || 0) > 0)) {
    traits.add("api-network-usage");
  }

  return Array.from(traits);
}

// ============================================================================
// SKILLS: OBSERVABLE CAPABILITIES
// ============================================================================

/**
 * Infer observable skills from history.
 *
 * Skills are based on *what is actually done*:
 *   - code usage
 *   - multi-language text
 *   - long-form writing
 *
 * @param {Array<Object>} skeletalHistory
 * @param {Array<Object>} networkHistory
 * @returns {string[]}
 */
function inferSkills(skeletalHistory, networkHistory) {
  const skills = new Set();

  // Code authoring
  const usesCode = skeletalHistory.some((s) =>
    s?.content?.blocks?.some((b) => b.type === "code")
  );
  if (usesCode) skills.add("code-authoring");

  // Long-form writing
  const longForm = skeletalHistory.some((s) =>
    s?.content?.blocks?.some((b) => (b.text || "").length > 800)
  );
  if (longForm) skills.add("long-form-writing");

  // Multi-language (very rough: presence of non-ASCII)
  const multilingual = skeletalHistory.some((s) =>
    s?.content?.blocks?.some((b) => /[^\x00-\x7F]/.test(b.text || ""))
  );
  if (multilingual) skills.add("multilingual-usage");

  // LLM orchestration (multiple LLM calls in flows)
  const orchestratesLLM = networkHistory.some(
    (n) => (n?.summary?.llmCalls || 0) > 3
  );
  if (orchestratesLLM) skills.add("llm-orchestration");

  return Array.from(skills);
}

// ============================================================================
// HABITS: TEMPORAL / BEHAVIORAL PATTERNS
// ============================================================================

/**
 * Infer habits from timestamps and usage patterns.
 *
 * Habits are coarse, non-sensitive patterns like:
 *   - "active-late-night"
 *   - "short-sessions"
 *   - "long-sessions"
 *
 * @param {Array<Object>} skeletalHistory
 * @param {Array<Object>} networkHistory
 * @returns {string[]}
 */
function inferHabits(skeletalHistory, networkHistory) {
  const habits = new Set();

  const timestamps = collectTimestamps(skeletalHistory, networkHistory);
  if (timestamps.length === 0) return [];

  // Time-of-day habits
  const hours = timestamps.map((t) => new Date(t).getHours());
  const nightUsage = hours.filter((h) => h >= 22 || h < 5).length;
  const dayUsage = hours.length - nightUsage;

  if (nightUsage > dayUsage && nightUsage > 5) {
    habits.add("active-late-night");
  } else if (dayUsage > nightUsage && dayUsage > 5) {
    habits.add("active-daytime");
  }

  // Session length habits (approximate via NetworkSpec durations)
  const durations = networkHistory
    .map((n) => n?.summary?.durationMs || 0)
    .filter((d) => d > 0);

  if (durations.length > 0) {
    const avg = durations.reduce((a, b) => a + b, 0) / durations.length;
    if (avg < 60_000) habits.add("short-sessions");
    else if (avg > 10 * 60_000) habits.add("long-sessions");
  }

  return Array.from(habits);
}

/**
 * Collect all timestamps from Skeletal + Network history.
 *
 * @param {Array<Object>} skeletalHistory
 * @param {Array<Object>} networkHistory
 * @returns {string[]}
 */
function collectTimestamps(skeletalHistory, networkHistory) {
  const times = [];

  for (const s of skeletalHistory) {
    if (s?.meta?.capturedAt) times.push(s.meta.capturedAt);
  }
  for (const n of networkHistory) {
    if (n?.capturedAt) times.push(n.capturedAt);
  }

  return times.sort();
}

// ============================================================================
// STABILITY: CONFIDENCE SCORE
// ============================================================================

/**
 * Compute a stability score (0–1) based on history richness.
 *
 * Factors:
 *   - number of SkeletalSpecs
 *   - number of NetworkSpecs
 *   - temporal span
 *
 * @param {Array<Object>} skeletalHistory
 * @param {Array<Object>} networkHistory
 * @returns {number}
 */
function computeStabilityScore(skeletalHistory, networkHistory) {
  const skeletalCount = skeletalHistory.length;
  const networkCount = networkHistory.length;

  const timestamps = collectTimestamps(skeletalHistory, networkHistory);
  if (timestamps.length === 0) return 0;

  const first = new Date(timestamps[0]).getTime();
  const last = new Date(timestamps[timestamps.length - 1]).getTime();
  const spanMs = Math.max(0, last - first);

  // Normalize components
  const skeletalScore = Math.min(1, skeletalCount / 50);
  const networkScore = Math.min(1, networkCount / 50);
  const spanScore = Math.min(1, spanMs / (30 * 24 * 60 * 60 * 1000)); // 30 days

  // Weighted average
  const stability = (skeletalScore * 0.4) + (networkScore * 0.4) + (spanScore * 0.2);
  return Number(stability.toFixed(3));
}
