import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { AppShell } from "@/components/shared/AppShell";

type RouterContext = {
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
});

function RootLayout() {
  return (
    <>
      <AppShell />
      <Toaster richColors position="top-right" />
    </>
  );
}
