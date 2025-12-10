// src/providers/QueryProvider.tsx
import * as React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "../lib/react-query";

type QueryProviderProps = React.PropsWithChildren;

export const QueryProvider: React.FC<QueryProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* Devtools are super handy; remove in prod if you want */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
