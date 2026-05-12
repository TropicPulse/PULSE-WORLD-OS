/**
 * ============================================================================
 * ORGAN: PulseSpecsLongTermMemory
 * VERSION: v20
 * LAYER: MEMORY (Persistent / Long-Term)
 * ROLE: Persist and retrieve GenomeSpecs and related long-lived state.
 * ============================================================================
 *
 * This organ does NOT decide *what* the genome is.
 * That’s the job of PulseSpecsGenomeTranslator-v20.
 *
 * This organ:
 *   - stores GenomeSpecs
 *   - retrieves GenomeSpecs
 *   - updates GenomeSpecs
 *   - enforces versioning and integrity
 *
 * It is a TRANSLATOR between:
 *   - internal GenomeSpec objects
 *   - your chosen storage backend (DB, KV, file, etc.)
 */

// PUBLIC CONTRACT
// ---------------
PULSE-WORLD-MAP.js
import {
  OrganismIdentity,
  buildPulseOrganismMap as PulseOrganismMap
} from "./PULSE-WORLD-MAP.js";
const Identity = OrganismIdentity(import.meta.url);

// 2 — EXPORT GENOME METADATA
// export const PulseMeshMeta = Identity.OrganMeta;
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
// export const WBC_CONTEXT = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;
/**
 * Save a GenomeSpec to long-term storage.
 *
 * @param {Object} params
 * @param {Object} params.genomeSpec - GenomeSpec v20.
 * @param {Object} params.backend    - Storage backend adapter (injected).
 * @returns {Promise<void>}
 */
export async function saveGenome({ genomeSpec, backend }) {
  // backend is an injected adapter with a stable contract:
  //   backend.put({ key, value })
  const key = buildGenomeKey(genomeSpec.subjectId);
  await backend.put({ key, value: genomeSpec });
}

/**
 * Load a GenomeSpec from long-term storage.
 *
 * @param {Object} params
 * @param {string} params.subjectId
 * @param {Object} params.backend
 * @returns {Promise<Object|null>} GenomeSpec or null if not found.
 */
export async function loadGenome({ subjectId, backend }) {
  const key = buildGenomeKey(subjectId);
  const value = await backend.get({ key });
  return value || null;
}

/**
 * Merge and persist an updated GenomeSpec.
 *
 * @param {Object} params
 * @param {Object} params.newGenomeSpec
 * @param {Object} params.backend
 * @returns {Promise<Object>} merged GenomeSpec
 */
export async function upsertGenome({ newGenomeSpec, backend }) {
  const existing = await loadGenome({
    subjectId: newGenomeSpec.subjectId,
    backend,
  });

  const merged = mergeGenomes(existing, newGenomeSpec);
  await saveGenome({ genomeSpec: merged, backend });
  return merged;
}

// INTERNAL HELPERS
// ----------------

function buildGenomeKey(subjectId) {
  return `genome:v20:${subjectId}`;
}

/**
 * Merge two GenomeSpecs conservatively.
 *
 * @param {Object|null} oldG
 * @param {Object} newG
 * @returns {Object}
 */
function mergeGenomes(oldG, newG) {
  if (!oldG) return newG;

  // Very simple merge strategy:
  // - keep earliest firstSeenAt
  // - keep latest lastSeenAt
  // - union traits/skills/habits
  // - append epochs
  return {
    ...newG,
    lineage: {
      firstSeenAt: oldG.lineage.firstSeenAt || newG.lineage.firstSeenAt,
      lastSeenAt: newG.lineage.lastSeenAt,
      epochs: [...(oldG.lineage.epochs || []), ...(newG.lineage.epochs || [])],
    },
    traits: Array.from(new Set([...(oldG.traits || []), ...(newG.traits || [])])),
    skills: Array.from(new Set([...(oldG.skills || []), ...(newG.skills || [])])),
    habits: Array.from(new Set([...(oldG.habits || []), ...(newG.habits || [])])),
    stability: newG.stability, // latest wins
  };
}
