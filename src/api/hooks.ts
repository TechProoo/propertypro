import { useState, useCallback, useRef, useEffect } from "react";
import type { AxiosError } from "axios";

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: AxiosError | null;
}

/**
 * Custom hook for API requests with loading and error states
 * Provides a clean way to handle async API calls in React components
 *
 * @template T - The type of data returned by the API
 * @example
 * const { data, loading, error, execute } = useApi<WaitlistEntry[]>(
 *   () => api.waitlist.getAll()
 * )
 *
 * useEffect(() => {
 *   execute()
 * }, [execute])
 *
 * if (loading) return <div>Loading...</div>
 * if (error) return <div>Error: {error.message}</div>
 * return <div>{data?.length} items</div>
 */
export const useApi = <T = unknown,>(
  fn: () => Promise<T>,
  initialData: T | null = null
) => {
  const [state, setState] = useState<UseApiState<T>>({
    data: initialData,
    loading: false,
    error: null,
  });

  const fnRef = useRef(fn);

  useEffect(() => {
    fnRef.current = fn;
  }, [fn]);

  const execute = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const data = await fnRef.current();
      setState({ data, loading: false, error: null });
      return data;
    } catch (error) {
      const axiosError = error as AxiosError;
      setState((prev) => ({
        ...prev,
        loading: false,
        error: axiosError,
      }));
      throw error;
    }
  }, []);

  return {
    ...state,
    execute,
    isLoading: state.loading,
    isError: !!state.error,
  };
};

/**
 * Custom hook for mutations (POST, PATCH, DELETE)
 * Useful for create, update, and delete operations
 *
 * @example
 * const { execute: deleteEntry, loading } = useMutation(
 *   (id: string) => api.waitlist.delete(id)
 * )
 *
 * const handleDelete = async (id: string) => {
 *   await deleteEntry(id)
 * }
 */
export const useMutation = <TData = unknown, TParams = unknown,>(
  fn: (params: TParams) => Promise<TData>
) => {
  const [state, setState] = useState<UseApiState<TData>>({
    data: null,
    loading: false,
    error: null,
  });

  const fnRef = useRef(fn);

  useEffect(() => {
    fnRef.current = fn;
  }, [fn]);

  const execute = useCallback(
    async (params: TParams) => {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      try {
        const data = await fnRef.current(params);
        setState({ data, loading: false, error: null });
        return data;
      } catch (error) {
        const axiosError = error as AxiosError;
        setState((prev) => ({
          ...prev,
          loading: false,
          error: axiosError,
        }));
        throw error;
      }
    },
    []
  );

  return {
    ...state,
    execute,
    isLoading: state.loading,
    isError: !!state.error,
  };
};
