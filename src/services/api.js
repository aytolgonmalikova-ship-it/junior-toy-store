import { toysStore } from './toysStore';

/** Simulated network latency (ms) — a random jitter is added on top. */
const BASE_LATENCY = 900;
/** Share of requests that randomly fail, to mimic a flaky network. */
const RANDOM_FAILURE_RATE = 0.08;

export class ApiError extends Error {
  constructor(message, status = 500) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

/** Filters a toys collection the same way the "server" does. */
export function queryToys(toys, { category = 'all', popular = false, limit } = {}) {
  let docs = toys;
  if (category !== 'all') docs = docs.filter((toy) => toy.category === category);
  if (popular) docs = docs.filter((toy) => toy.popular);
  if (limit) docs = docs.slice(0, limit);
  return docs;
}

/**
 * Mock of `GET /api/toys`. Reads the catalog from the local "database"
 * (localStorage, managed in the admin panel) and resolves with a payload shaped
 * like a typical Express + MongoDB response: `{ success, count, data: [...] }`.
 */
export function fetchToys({ category = 'all', popular = false, limit, signal, forceError = false } = {}) {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException('Request aborted', 'AbortError'));
      return;
    }

    const timer = setTimeout(() => {
      if (forceError || Math.random() < RANDOM_FAILURE_RATE) {
        reject(new ApiError('Service Unavailable: failed to fetch /api/toys', 503));
        return;
      }
      // Deep copy, as if the data had been serialized over the network.
      const data = JSON.parse(JSON.stringify(queryToys(toysStore.get(), { category, popular, limit })));
      resolve({ success: true, count: data.length, data });
    }, BASE_LATENCY + Math.random() * 700);

    signal?.addEventListener('abort', () => {
      clearTimeout(timer);
      reject(new DOMException('Request aborted', 'AbortError'));
    });
  });
}
