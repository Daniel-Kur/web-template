import { Link, Outlet } from "@tanstack/react-router";

type NavLink = {
  to: string;
  label: string;
};

const navLinks: NavLink[] = [
  { to: "/", label: "Overview" },
  { to: "/users", label: "Users" },
];

export function AppShell() {
  return (
    <div className="flex min-h-svh bg-background text-foreground">
      <aside className="hidden w-60 border-r bg-card lg:block">
        <div className="border-b p-4">
          <p className="text-sm font-semibold tracking-wide">Web Template</p>
        </div>
        <nav className="flex flex-col gap-2 p-3">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              activeProps={{ className: "bg-accent text-accent-foreground" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <header className="border-b bg-card px-4 py-3">
          <h1 className="text-base font-semibold">Enterprise Dashboard Template</h1>
        </header>
        <main className="flex-1 min-h-0 overflow-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
