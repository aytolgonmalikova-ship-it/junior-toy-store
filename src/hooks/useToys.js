import { useCallback, useEffect, useState } from 'react';
import { fetchToys, queryToys } from '../services/api';
import { toysStore } from '../services/toysStore';

/**
 * Loads toys from the mock API and exposes `status` ('loading' | 'success' | 'error'),
 * `data`, `error`, plus `retry()` and `simulateError()` helpers.
 * Once loaded, edits made in the admin panel are applied instantly (no refetch, no reload).
 */
export function useToys({ category = 'all', popular = false, limit } = {}) {
  const [state, setState] = useState({ status: 'loading', data: [], error: null });
  // Each new object triggers a fresh request; `forceError` lets us demo the error UI.
  const [request, setRequest] = useState({ forceError: false });

  useEffect(() => {
    const controller = new AbortController();
    setState((prev) => ({ ...prev, status: 'loading', error: null }));

    fetchToys({ category, popular, limit, signal: controller.signal, forceError: request.forceError })
      .then((res) => setState({ status: 'success', data: res.data, error: null }))
      .catch((error) => {
        if (error.name === 'AbortError') return;
        setState({ status: 'error', data: [], error });
      });

    return () => controller.abort();
  }, [category, popular, limit, request]);

  // Live updates from the admin panel (same tab or another tab).
  useEffect(
    () =>
      toysStore.subscribe(() => {
        setState((prev) =>
          prev.status === 'success' ? { ...prev, data: queryToys(toysStore.get(), { category, popular, limit }) } : prev,
        );
      }),
    [category, popular, limit],
  );

  const retry = useCallback(() => setRequest({ forceError: false }), []);
  const simulateError = useCallback(() => setRequest({ forceError: true }), []);

  return { ...state, retry, simulateError };
}
