// src/lib/react-query.ts
import { QueryClient, type DefaultOptions } from "@tanstack/react-query";

const queryConfig: DefaultOptions = {
  queries: {
    // ✅ good sane defaults for a boilerplate
    staleTime: 1000 * 60, // 1 minute
    refetchOnWindowFocus: false,
    retry: 1,
  },
};

export const queryClient = new QueryClient({
  defaultOptions: queryConfig,
});
