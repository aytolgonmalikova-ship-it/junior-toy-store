import { readJSON, writeJSON } from './storage';

/**
 * Tiny observable store persisted in localStorage.
 * Works with React's `useSyncExternalStore` and syncs between browser tabs.
 */
export function createPersistentStore({ key, seed, isValid }) {
  const listeners = new Set();
  const load = () => {
    const value = readJSON(localStorage, key);
    return isValid(value) ? value : null;
  };

  let state = load();
  if (!state) {
    state = seed();
    writeJSON(localStorage, key, state);
  }

  const emit = () => listeners.forEach((listener) => listener());

  const set = (updater) => {
    state = typeof updater === 'function' ? updater(state) : updater;
    writeJSON(localStorage, key, state);
    emit();
  };

  // Another tab changed the data — pick it up.
  window.addEventListener('storage', (event) => {
    if (event.key !== key && event.key !== null) return;
    state = load() ?? seed();
    emit();
  });

  return {
    get: () => state,
    set,
    reset: () => set(seed()),
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}
