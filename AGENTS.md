# AGENTS.md

## Project Overview

Bun + React + TypeScript + Vite frontend. Enterprise dashboard style.

UI stack: Tailwind CSS, ShadCN UI (Radix-based)
State: TanStack Query (server) · Zustand (UI/client)
Routing: TanStack Router v1, file-based via `@tanstack/router-plugin/vite`

---

# Token Efficiency

## Response Discipline

- Output only what was asked. No unrequested boilerplate, summaries, or explanations.
- Do not repeat the task description before acting. Just act.
- No filler: "Certainly!", "Great question!", "Sure!", "Let me know if you need anything else."
- Do not explain code you just wrote unless asked.
- Prefer code over prose when both express the same thing.

## File Output Discipline

- **Only output files that changed.** Never re-emit unchanged files.
- Use targeted edits, not full-file rewrites, when only part of a file changes.
- Do not scaffold unrequested boilerplate files.

## Planning Discipline

- For clear tasks: act first, explain via inline comments if needed.
- For ambiguous tasks: ask ONE clarifying question, not multiple.
- Never ask for information inferable from the codebase.

## Codebase Hygiene

- Search before creating. If a utility, hook, or component exists — use it.
- Only touch files relevant to the current task.
- Do not refactor unrelated code or fix out-of-scope lint issues.
- Never read `routeTree.gen.ts`, or `node_modules` paths — they are off-limits.
- Do not edit lockfiles unless package dependencies changed.
- Avoid reading lockfiles unless dependency/version verification is required.

---

# Architecture Philosophy

Strict separation of concerns · predictable data flow · reusable UI primitives · maintainable feature boundaries.

Prioritize: readability · explicitness · consistency · low coupling · composability.
Avoid clever abstractions unless they clearly reduce complexity.

---

# Folder Structure

Follow strictly. Do not invent new top-level folders.

```
src/
  features/
    <feature>/
      <feature>.api.ts
      <feature>.mapper.ts
      <feature>.types.ts
      <feature>.dto.ts
      use<Feature>.ts
      <Feature>Page.tsx
      components/
        <FeatureTable>.tsx
        <FeatureDialog>.tsx

  components/
    ui/
    shared/

  lib/
    api.ts
    utils.ts

  hooks/

  store/
    <feature>.store.ts

  routes/
```

---

# Dependency Direction

```
Pages        → hooks / components
hooks        → api / mapper / store
api          → lib/api
mapper       → dto / types
components   → shared / ui
```

Components must never own networking logic, call fetch/axios directly, or perform direct mutations.

---

# Naming Rules

| Artifact | Convention |
|---|---|
| Components | PascalCase |
| Hooks | `useXxx` |
| Stores | `xxx.store.ts` |
| API files | `xxx.api.ts` |
| DTO files | `xxx.dto.ts` |
| Mappers | `xxx.mapper.ts` |
| Types | `xxx.types.ts` |

---

# Coding Style

- TypeScript strict mode. No `any`. No `@ts-ignore` without explanation.
- Prefer `type` over `interface` unless extending.
- Explicit types on all exported APIs.
- One responsibility per file. Keep files small and focused.

---

# Pages

Pages are orchestration layers only: layout composition, hook wiring, route integration, prop passing.

Pages must NOT contain: complex JSX logic · data transformation · API calls · mutation logic.

---

# Components

Mostly presentational. Props in → UI out. Minimal business logic — extract into hooks.

- Use ShadCN first, Radix second, raw HTML only for layout containers.
- Dialogs must be reusable components, never inlined in pages.
- Tables require sticky headers for scrollable content.

---

# Hooks

Hooks own all business logic: fetching · mutations · derived state · memoized callbacks · query invalidation · UI orchestration.

- Hooks must not render JSX.
- Navigate via `router.navigate()` inside hooks — never inside presentational components.

---

# API Layer

Always use `src/lib/api.ts`. Never call `fetch` or `axios` directly from components or Zustand stores.

- **DTOs** match backend responses exactly.
- **Domain/UI types** are frontend-facing. Components never consume DTOs directly.
- **Mappers** are pure functions — no React imports, no side effects.

```ts
// users.api.ts
import { api } from "@/lib/api";
import type { UserDTO } from "./users.dto";
export const fetchUsers = (): Promise<UserDTO[]> => api.get("/users");

// users.mapper.ts
import type { UserDTO } from "./users.dto";
import type { UserRow } from "./users.types";
export const toUserRow = (dto: UserDTO): UserRow => ({
  id: dto.id,
  fullName: `${dto.first_name} ${dto.last_name}`,
  email: dto.email,
});
```

---

# TanStack Query

Owns ALL server state: fetching · caching · synchronization · invalidation · mutations.

- Do not duplicate server state into Zustand.
- Do not manually sync query state into local state unless necessary.

**Query key convention** — always arrays, deterministic, prefer primitives:
```ts
["users"]
["users", userId]
["access-right", staffId, siteId]
```

**Mutations** live in hooks, not components. On success: invalidate related keys + `sonner` toast. On failure: error toast + preserve recoverable UI state. Optimistic updates only when explicitly required.

---

# Zustand

UI/client state only: sidebar · selected row IDs · dialog open state · filters · active tabs · temporary UI selections.

- One store file per feature slice. No giant global stores.
- Never store server-fetched collections or duplicate query data.

---

# Routing

Plugin order in `vite.config.ts` is mandatory:
```ts
tanstackRouter(),  // MUST come before react()
react(),
```

Enable `autoCodeSplitting: true`. Routes in `src/routes/`. Generated file: `src/routeTree.gen.ts` — **never edit it**.

```json
// .vscode/settings.json
{
  "files.readonlyInclude": { "**/routeTree.gen.ts": true },
  "search.exclude": { "**/routeTree.gen.ts": true }
}
```

**File naming:**
```
src/routes/
  __root.tsx
  index.tsx
  users.tsx
  users/
    index.tsx
    $userId.tsx
    $userId.lazy.tsx
    -components/
```

- `$param` for dynamic segments · `.lazy.tsx` for non-critical routes
- `__root.tsx` for app shell/providers/layout
- Co-locate non-route files with `-` prefix (`-components`, `-hooks`, `-utils`)
- Use route loaders + `ensureQueryData()` for prefetching. Avoid duplicate fetching inside components.

**Search params** — use for filters, sorting, pagination, tabs, shareable UI state. Define schemas on the route. Never parse ad-hoc in components.

**Navigation** — `<Link />` from `@tanstack/react-router` or `router.navigate()` in hooks. Never hardcode route strings or use raw anchor tags.

---

# UI & Styling

- Enterprise dashboard density. Clean, consistent spacing.
- Typography: prefer `text-sm`, `text-base`.
- Layout: `flex-1 min-h-0 overflow-auto` to avoid overflow bugs.
- Spacing: `gap-2`, `gap-4`, `p-4` — no arbitrary pixel values, no inline styles, no `!important`.

---

# Loading / Error / Empty States

Always handle all four states. No silent empty renders.

| State | Pattern |
|---|---|
| Loading | ShadCN `Skeleton` |
| Error (query) | Inline error |
| Error (mutation) | `sonner` toast |
| Empty | Explicit empty state component |

---

# Performance

- Route-level code splitting via `.lazy.tsx` + `autoCodeSplitting`.
- Prefer TanStack Query caching over manual memo caches.
- Memoize only when measurable. Avoid excessive `useMemo`/`useCallback`.
- Virtualize large tables/lists when necessary. Keep re-renders localized.

---

# Security

## Input Validation

All user inputs require explicit max length limits. Validate required fields before submit. Trim strings unless whitespace is meaningful. Backend validation is always also required.

Limits: names ≤ 100 · emails ≤ 254 · phone ≤ 32 · descriptions ≤ 500–1000

## File Uploads

- Allowlist MIME types and extensions. Enforce max file size. Reject unknown types.
- Show clear validation errors. Clean up preview URLs on removal/unmount:
  ```ts
  URL.revokeObjectURL(previewUrl);
  ```
- Never upload before validation. Never trust extension alone.
- Clear file input state after rejection or successful cleanup.

## Forms

- Disable submit while mutation is pending. Prevent duplicate submissions.
- Validate before mutation. Surface server validation errors clearly.

## Rendering & Secrets

- Never use `dangerouslySetInnerHTML` without sanitization and documented justification.
- Never log tokens, API keys, or cookies. Never store secrets in source code.
- Browser-exposed env vars must use Vite public prefix only when intentional.
- Do not store sensitive server responses or private user data in localStorage/sessionStorage unless explicitly required.

## API & Authorization

- Always use the shared API wrapper. Show safe user-facing messages — never expose raw backend errors.
- UI hiding is not authorization. Backend must enforce permissions.

## External Links

```html
<a href="..." target="_blank" rel="noopener noreferrer">
```

---

# Validation Checklist

Run before finishing any task:

```bash
bun run typecheck
bun run lint
```

Zero TypeScript errors required. Fix all introduced lint errors. Never suppress with `any`, `as unknown as`, or unexplained `@ts-ignore`.

---

# Global Prohibitions

- Fetch inside components
- Business logic in JSX
- Bypass mappers or mix DTOs with UI types
- Duplicate server state into Zustand
- Premature abstraction
- `useEffect` for derived state
- Unrelated refactors in the same PR/task
- TypeScript suppression without explanation
- Hardcode secrets or route strings
- Raw anchor tags for in-app navigation
- Render unsanitized HTML
- Log full API responses with private data
- Accept file uploads by extension only
- Expose stack traces to users
