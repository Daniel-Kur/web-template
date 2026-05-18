import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: DashboardHome,
});

function DashboardHome() {
  return (
    <section className="space-y-2">
      <h2 className="text-base font-semibold">Overview</h2>
      <p className="text-sm text-muted-foreground">
        Starter enterprise dashboard baseline with strict feature boundaries.
      </p>
    </section>
  );
}
