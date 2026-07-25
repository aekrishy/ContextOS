/**
 * Agents Barrel Export
 *
 * Single import point for all agent modules.
 * Track 3 can import everything from './agents/index.js'.
 *
 * Example:
 *   import {
 *     retrieveMemories,
 *     createTask,
 *     buildContextGraph,
 *     getAllMemories,
 *   } from './agents/index.js';
 */

// ── Data Layer ──────────────────────────────────────────────────────────
export {
  loadData,
  reloadData,
  getMemoryEntries,
  getEnterpriseEntities,
  getMemoryById as getMemoryByIdFromDisk,
  getEntityById,
  getEntitiesByType,
} from './data/data-loader.js';

// ── Memory Manager ──────────────────────────────────────────────────────
export {
  getAllMemories,
  getMemoryById,
  createMemory,
  updateMemory,
  deleteMemory,
  searchMemories,
  resetStore,
} from './memory/memory-manager.js';
export type { MemorySearchOptions } from './memory/memory-manager.js';

// ── Retriever ───────────────────────────────────────────────────────────
export {
  cosineSimilarity,
  computeKeywordScore,
  computeRelevance,
} from './retriever/relevance.js';
export type { RelevanceOptions } from './retriever/relevance.js';

export {
  retrieveMemories,
  retrieveEvidence,
} from './retriever/retriever.js';
export type { ScoredMemory, RetrieveOptions } from './retriever/retriever.js';

// ── Context Builder ─────────────────────────────────────────────────────
export {
  buildContextGraph,
  buildContextGraphFromMemories,
} from './context/context-builder.js';

// ── Planner ─────────────────────────────────────────────────────────────
export {
  createTask,
  executeTask,
  planAndExecute,
  getTaskById,
  getTaskStatus,
  getAllTasks,
} from './planner/planner.js';
