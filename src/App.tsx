import { Button } from "@/components/ui/button";

export default function App() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 px-4 text-center">
      {/* Title */}
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        Vite + React + Tailwind 4 + shadcn
      </h1>

      {/* Subtitle */}
      <p className="max-w-md text-balance text-muted-foreground">
        A clean, lightweight boilerplate to start your next project — fast,
        modern, and scalable. Everything you need, nothing you don’t.
      </p>

      {/* CTA Buttons */}
      <div className="flex items-center gap-3">
        <Button size="lg">Get Started</Button>
        <Button variant="outline" size="lg">
          View Components
        </Button>
      </div>
    </main>
  );
}
