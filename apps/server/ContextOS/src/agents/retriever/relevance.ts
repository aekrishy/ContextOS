/**
 * Relevance Scoring — Cosine similarity and keyword matching
 *
 * Provides the math primitives used by the Retriever to rank
 * MemoryEntry items against a user query.
 *
 * Two scoring dimensions:
 *   1. Embedding similarity  (cosine of the embeddings vectors)
 *   2. Keyword overlap        (normalised token intersection)
 *
 * The final relevance score is a weighted blend of both.
 */

// ---------------------------------------------------------------------------
// Cosine Similarity
// ---------------------------------------------------------------------------

/**
 * Compute cosine similarity between two numeric vectors.
 * Returns a value in [-1, 1]. If either vector is zero-length
 * or all-zeros, returns 0.
 */
export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length === 0 || b.length === 0) return 0;

  const minLen = Math.min(a.length, b.length);
  let dotProduct = 0;
  let magnitudeA = 0;
  let magnitudeB = 0;

  for (let i = 0; i < minLen; i++) {
    dotProduct += a[i] * b[i];
    magnitudeA += a[i] * a[i];
    magnitudeB += b[i] * b[i];
  }

  const denominator = Math.sqrt(magnitudeA) * Math.sqrt(magnitudeB);
  if (denominator === 0) return 0;

  return dotProduct / denominator;
}

// ---------------------------------------------------------------------------
// Keyword Scoring
// ---------------------------------------------------------------------------

/** Normalise a string into lowercase tokens, stripping punctuation. */
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length > 1); // drop single-char noise
}

/**
 * Compute a normalised keyword overlap score between a query
 * and a target text.  Score ∈ [0, 1].
 *
 * Formula: |intersection(queryTokens, textTokens)| / |queryTokens|
 */
export function computeKeywordScore(query: string, text: string): number {
  const queryTokens = tokenize(query);
  if (queryTokens.length === 0) return 0;

  const textTokenSet = new Set(tokenize(text));
  let matches = 0;

  for (const token of queryTokens) {
    if (textTokenSet.has(token)) {
      matches++;
    }
  }

  return matches / queryTokens.length;
}

// ---------------------------------------------------------------------------
// Combined Relevance
// ---------------------------------------------------------------------------

/** Options for tuning the relevance blend. */
export interface RelevanceOptions {
  /** Weight given to keyword matching (0–1). Default: 0.6 */
  keywordWeight?: number;
  /** Weight given to embedding similarity (0–1). Default: 0.4 */
  embeddingWeight?: number;
}

/**
 * Compute a combined relevance score for a MemoryEntry against a query.
 *
 * @param query            The raw user question.
 * @param questionText     The MemoryEntry.question field.
 * @param answerText       The MemoryEntry.answer field.
 * @param entryEmbeddings  The MemoryEntry.embeddings (may be undefined).
 * @param queryEmbedding   An optional embedding vector for the query itself.
 * @param options          Tuning weights.
 * @returns A score in [0, 1].
 */
export function computeRelevance(
  query: string,
  questionText: string,
  answerText: string,
  entryEmbeddings?: number[],
  queryEmbedding?: number[],
  options: RelevanceOptions = {},
): number {
  const { keywordWeight = 0.6, embeddingWeight = 0.4 } = options;

  // Keyword score — average of question-match and answer-match
  const questionScore = computeKeywordScore(query, questionText);
  const answerScore = computeKeywordScore(query, answerText);
  const keywordScore = questionScore * 0.7 + answerScore * 0.3;

  // Embedding score — only if both vectors are available
  let embeddingScore = 0;
  if (
    queryEmbedding &&
    queryEmbedding.length > 0 &&
    entryEmbeddings &&
    entryEmbeddings.length > 0
  ) {
    // Normalise cosine from [-1,1] to [0,1]
    embeddingScore = (cosineSimilarity(queryEmbedding, entryEmbeddings) + 1) / 2;
  }

  // If no embeddings are available, shift all weight to keywords
  const hasEmbeddings =
    queryEmbedding &&
    queryEmbedding.length > 0 &&
    entryEmbeddings &&
    entryEmbeddings.length > 0;

  if (!hasEmbeddings) {
    return keywordScore;
  }

  return keywordWeight * keywordScore + embeddingWeight * embeddingScore;
}
