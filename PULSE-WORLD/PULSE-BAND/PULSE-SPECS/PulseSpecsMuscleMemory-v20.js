/**
 * ============================================================================
 * ORGAN: PulseSpecsMuscleMemory
 * VERSION: v20
 * LAYER: MEMORY (Associative / Vector / Muscle)
 * ROLE: Maintain embeddings + semantic retrieval for fast, learned recall.
 * ============================================================================
 *
 * This organ:
 *   - takes text chunks (usually from SkeletalSpecs)
 *   - embeds them via an injected embedding backend
 *   - stores vector entries in a vector backend
 *   - retrieves nearest neighbors for a query
 *
 * It is a TRANSLATOR between:
 *   - internal text/specs
 *   - your vector backend (Pinecone, Qdrant, pgvector, etc.)
 */

// PUBLIC CONTRACT
// ---------------

/**
 * Index content into muscle memory.
 *
 * @param {Object} params
 * @param {string} params.subjectId
 * @param {Array<{ id: string, text: string }>} params.items
 * @param {Object} params.embedBackend  - { embed(texts: string[]) => Promise<number[][]> }
 * @param {Object} params.vectorBackend - { upsert({ namespace, vectors }) }
 */
export async function indexMuscleMemory({
  subjectId,
  items,
  embedBackend,
  vectorBackend,
}) {
  if (!items || items.length === 0) return;

  const texts = items.map((i) => i.text);
  const embeddings = await embedBackend.embed(texts);

  const vectors = items.map((item, i) => ({
    id: item.id,
    values: embeddings[i],
    metadata: {
      subjectId,
    },
  }));

  await vectorBackend.upsert({
    namespace: muscleNamespace(subjectId),
    vectors,
  });
}

/**
 * Query muscle memory for nearest neighbors.
 *
 * @param {Object} params
 * @param {string} params.subjectId
 * @param {string} params.queryText
 * @param {number} [params.topK=8]
 * @param {Object} params.embedBackend
 * @param {Object} params.vectorBackend - { query({ namespace, vector, topK }) }
 * @returns {Promise<Array<{ id: string, score: number, metadata: Object }>>}
 */
export async function queryMuscleMemory({
  subjectId,
  queryText,
  topK = 8,
  embedBackend,
  vectorBackend,
}) {
  const [embedding] = await embedBackend.embed([queryText]);

  const result = await vectorBackend.query({
    namespace: muscleNamespace(subjectId),
    vector: embedding,
    topK,
  });

  // Normalize result shape
  return (result.matches || []).map((m) => ({
    id: m.id,
    score: m.score,
    metadata: m.metadata || {},
  }));
}

// INTERNAL HELPERS
// ----------------

function muscleNamespace(subjectId) {
  return `muscle:v20:${subjectId}`;
}
