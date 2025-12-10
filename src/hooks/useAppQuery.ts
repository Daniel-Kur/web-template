// src/hooks/useAppQuery.ts
import {
  useQuery,
  type UseQueryOptions,
  type UseQueryResult,
  type QueryKey,
} from "@tanstack/react-query";

/**
 * Small wrapper around useQuery so you can:
 * - have a single place to extend behavior later
 * - keep imports tidy in components
 */
export function useAppQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
>(
  options: UseQueryOptions<TQueryFnData, TError, TData> & {
    queryKey: QueryKey;
  },
): UseQueryResult<TData, TError> {
  return useQuery<TQueryFnData, TError, TData>(options);
}
