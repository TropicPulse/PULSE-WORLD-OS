/**
 * ============================================================================
 * ORGAN: PulseSpecsShortTermMemory
 * VERSION: v20
 * LAYER: MEMORY (Short-Term / Working)
 * ROLE: Maintain hot, recent context for fast access.
 * ============================================================================
 *
 * This organ:
 *   - caches recent SkeletalSpecs
 *   - caches recent NetworkSpecs
 *   - optionally caches the latest GenomeSpec snapshot
 *
 * It is a TRANSLATOR between:
 *   - internal spec objects
 *   - your cache backend (in-memory, Redis, etc.)
 */

// PUBLIC CONTRACT
// ---------------
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝

/**
 * Push a new SkeletalSpec into short-term memory.
 *
 * @param {Object} params
 * @param {string} params.subjectId
 * @param {Object} params.skeletalSpec
 * @param {Object} params.backend - cache backend adapter
 * @param {number} [params.limit=50] - max recent items
 */
export async function pushSkeletal({ subjectId, skeletalSpec, backend, limit = 50 }) {
  const key = skeletalKey(subjectId);
  const list = (await backend.get({ key })) || [];
  list.push(skeletalSpec);
  while (list.length > limit) list.shift();
  await backend.put({ key, value: list });
}

/**
 * Get recent SkeletalSpecs.
 *
 * @param {Object} params
 * @param {string} params.subjectId
 * @param {Object} params.backend
 * @returns {Promise<Array<Object>>}
 */
export async function getRecentSkeletal({ subjectId, backend }) {
  const key = skeletalKey(subjectId);
  return (await backend.get({ key })) || [];
}

/**
 * Push a new NetworkSpec into short-term memory.
 */
export async function pushNetwork({ subjectId, networkSpec, backend, limit = 50 }) {
  const key = networkKey(subjectId);
  const list = (await backend.get({ key })) || [];
  list.push(networkSpec);
  while (list.length > limit) list.shift();
  await backend.put({ key, value: list });
}

/**
 * Get recent NetworkSpecs.
 */
export async function getRecentNetwork({ subjectId, backend }) {
  const key = networkKey(subjectId);
  return (await backend.get({ key })) || [];
}

/**
 * Cache the latest GenomeSpec snapshot for fast access.
 */
export async function setHotGenome({ subjectId, genomeSpec, backend }) {
  const key = hotGenomeKey(subjectId);
  await backend.put({ key, value: genomeSpec });
}

/**
 * Get the latest GenomeSpec snapshot from cache.
 */
export async function getHotGenome({ subjectId, backend }) {
  const key = hotGenomeKey(subjectId);
  return (await backend.get({ key })) || null;
}

// INTERNAL HELPERS
// ----------------

function skeletalKey(subjectId) {
  return `short:skeletal:v20:${subjectId}`;
}

function networkKey(subjectId) {
  return `short:network:v20:${subjectId}`;
}

function hotGenomeKey(subjectId) {
  return `short:genome:v20:${subjectId}`;
}
