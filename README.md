# Vite + React + TypeScript + Tailwind CSS v4 + shadcn/ui Boilerplate

A clean and modern starter template designed for building fast, scalable, and maintainable web applications.  
This boilerplate includes a minimal but powerful setup using today's best tools in the React ecosystem.

---

## Tech Stack

### **Vite**
A blazing-fast build tool and development server offering instant HMR and zero-config TypeScript support.

### **React + TypeScript**
Modern React with type-safe development and component-driven architecture.

### **Tailwind CSS v4**
Utility-first CSS with faster builds, simplified rules, and an optimized developer experience.

### **shadcn/ui**
Accessible, unstyled React components that work seamlessly with Tailwind and offer complete design freedom.

### **Custom Theme Provider**
A lightweight theme management system supporting:
- Light mode
- Dark mode
- System preference
- Persistent theme storage via `localStorage`

### **TanStack Query**
Powerful data-fetching and caching solution with built-in async state management:
- `useQuery` for fetching
- `useMutation` for POST/PUT/DELETE
- Query Devtools included

---

## Project Structure

```
src/
│
├── components/
│   └── ui/                 # shadcn UI components
│
├── hooks/                  # Custom hooks (if needed)
│
├── lib/
│   └── react-query.ts      # QueryClient configuration
│
├── providers/
│   └── QueryProvider.tsx   # TanStack Query provider wrapper
│
├── theme/
│   ├── ThemeProvider.tsx   # Theme context + provider
│   └── theme-context.ts    # Theme hook + types
│
├── App.tsx                 # Main UI entry
└── main.tsx                # Application bootstrap
```

---

## Installation

```bash
bun install
# or
npm install
# or
pnpm install
```

---

## Development

```bash
bun dev
# or
npm run dev
# or
pnpm dev
```

Visit the app at:

```
http://localhost:5173/
```

---

## Theme Usage

Set your default theme at the root:

```tsx
<ThemeProvider defaultTheme="dark">
  <App />
</ThemeProvider>
```

Options:
- "light"
- "dark"
- "system"

---

## Using shadcn/ui Components

Example:

```tsx
import { Button } from "@/components/ui/button";

<Button variant="outline">Click Me</Button>;
```

---

## Using TanStack Query

### Query Example

```ts
const { data, isLoading } = useQuery({
  queryKey: ["users"],
  queryFn: () => fetch("/api/users").then((r) => r.json()),
});
```

### Mutation Example

```ts
const mutation = useMutation({
  mutationFn: (payload) =>
    fetch("/api/login", { method: "POST", body: JSON.stringify(payload) })
      .then((r) => r.json()),
});
```

---

## Design Philosophy

This boilerplate is intentionally:

- **Thin** → minimal abstraction  
- **Modern** → aligned with today’s best ecosystem practices  
- **Scalable** → clean folder organization  
- **Flexible** → easy to extend with routing, API clients, auth, etc.  

Perfect as a base for personal projects, SaaS dashboards, landing pages, or production-ready applications.

---

## License

MIT — free to use, fork, and customize.
