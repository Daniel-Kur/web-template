# AGENTS.md

## Project Overview

BUN + React + TypeScript + Vite frontend. Enterprise dashboard style.

UI stack:

* Tailwind CSS
* ShadCN UI (Radix-based)

State:

* TanStack Query → server state
* Zustand → UI/client state

Routing:

* TanStack Router v1
* File-based routing via `@tanstack/router-plugin/vite`

---

# Architecture Philosophy

The project emphasizes:

* strict separation of concerns
* predictable data flow
* reusable UI primitives
* maintainable feature boundaries
* enterprise dashboard scalability

The codebase should prioritize:

* readability
* explicitness
* consistency
* low coupling
* composability

Avoid clever abstractions unless they clearly reduce complexity.

---

# Folder Structure

Follow this layout strictly.

Do not invent new top-level folders.

```txt
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

# Dependency Direction Rules

Allowed:

```txt
Pages -> hooks/components
hooks -> api/mapper/store
api -> lib/api
mapper -> dto/types
components -> shared/ui
```

Not allowed:

```txt
components -> api
components -> fetch
components -> direct mutations
mapper -> React
store -> api
store -> fetch
```

Components should never own networking logic.

---

# Coding Style

* TypeScript strict mode enabled
* No `any`
* No `@ts-ignore` without explanation
* Prefer `type` over `interface` unless extending
* Prefer explicit types for exported APIs
* Keep files small and focused
* One responsibility per file

---

# Naming Rules

* Components → PascalCase
* Hooks → `useXxx`
* Stores → `xxx.store.ts`
* API files → `xxx.api.ts`
* DTO files → `xxx.dto.ts`
* Mapper files → `xxx.mapper.ts`
* Types → `xxx.types.ts`

Examples:

```txt
users.api.ts
users.dto.ts
users.mapper.ts
users.types.ts
useUsers.ts
UsersTable.tsx
users.store.ts
```

---

# Pages

Pages are orchestration layers only.

Responsibilities:

* layout composition
* hook wiring
* route integration
* passing props to components

Pages should NOT contain:

* complex JSX logic
* data transformation
* API calls
* mutation logic

---

# Components

Components should be mostly presentational.

Rules:

* Props in → UI out
* Keep business logic minimal
* Extract complexity into hooks

Use:

* ShadCN components first
* Radix primitives second
* raw HTML only for layout containers

Dialogs:

* Must be reusable components
* Never embedded inline inside pages

Tables:

* Sticky headers required for scrollable tables

---

# Hooks

Hooks own business logic.

Responsibilities:

* data fetching
* mutations
* derived state
* memoized callbacks
* query invalidation
* UI orchestration logic

Hooks should NOT render JSX.

Navigation:

* use `router.navigate()` inside hooks
* never navigate directly inside presentational components

---

# API Rules

Always use `src/lib/api.ts`.

Never:

* call `fetch` directly
* call axios directly from components
* perform API calls inside Zustand stores

DTO rules:

* DTO types match backend responses exactly
* Domain/UI types are frontend-facing
* Components should never consume DTOs directly

Mappers:

* Pure functions only
* No React imports
* No side effects

Example:

```ts
// users.api.ts
import { api } from "@/lib/api";
import type { UserDTO } from "./users.dto";

export const fetchUsers = (): Promise<UserDTO[]> =>
  api.get("/users");

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

# TanStack Query Rules

TanStack Query owns ALL server state.

Use it for:

* fetching
* caching
* synchronization
* invalidation
* mutations

Do NOT:

* duplicate server state into Zustand
* manually sync query state into local state unless necessary

---

# Query Key Convention

Always use array query keys.

Examples:

```ts
["users"]
["users", userId]
["access-right", staffId, siteId]
```

Rules:

* keys must be deterministic
* avoid unstable object literals
* prefer primitives in keys

---

# Mutation Rules

Mutations should live inside hooks, not components.

After successful mutations:

* invalidate related query keys
* show success feedback using `sonner`

On mutation failure:

* show error toast
* preserve recoverable UI state

Optimistic updates:

* only implement when explicitly needed

---

# Zustand Rules

Zustand is for UI/client state only.

Allowed:

* sidebar state
* selected row IDs
* dialog open state
* filters
* active tabs
* temporary UI selections

Not allowed:

* server-fetched collections
* duplicated query data
* API fetching logic

Rules:

* one store file per feature slice
* avoid giant global stores
* prefer atomic slices

---

# Routing

Router:

* TanStack Router v1
* File-based routing via Vite plugin

## Setup

Plugin order in `vite.config.ts`:

```ts
tanstackRouter(),
react(),
```

Rules:

* `@tanstack/router-plugin/vite` must come BEFORE `@vitejs/plugin-react`
* Enable `autoCodeSplitting: true`
* Routes directory: `src/routes`
* Generated file: `src/routeTree.gen.ts`
* Never edit `routeTree.gen.ts`

Add to `.vscode/settings.json`:

```json
{
  "files.readonlyInclude": {
    "**/routeTree.gen.ts": true
  },
  "search.exclude": {
    "**/routeTree.gen.ts": true
  }
}
```

## Route File Naming

```txt
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

## Routing Rules

* Use `$param` for dynamic segments
* Use `.lazy.tsx` for non-critical routes
* Use `__root.tsx` for app shell/providers/layout
* Use route loaders for prefetching
* Co-locate non-route files with `-` prefix

Examples:

* `-components`
* `-hooks`
* `-utils`

Route components should remain thin orchestration layers.

Heavy UI belongs in feature components.

Prefer:

* route loaders
* `ensureQueryData()`
* TanStack Query prefetching

Avoid duplicate fetching inside components.

## Search Params

Use TanStack Router search params for:

* filters
* sorting
* pagination
* tabs
* shareable UI state

Prefer search params over Zustand for URL-relevant state.

Define schemas on the route itself.

Do NOT:

* parse search params ad-hoc in components
* manually stringify query strings

## Navigation

Use:

* `<Link />` from `@tanstack/react-router`
* `router.navigate()` inside hooks

Never:

* hardcode route strings
* use raw anchor tags for app navigation
* use `useNavigate` inside presentational components

---

# UI & Styling Rules

Style target:

* enterprise dashboard density
* clean and consistent spacing
* scalable layouts

Typography:

* prefer `text-sm` and `text-base`

Layout:

* use `flex-1 min-h-0 overflow-auto`
* avoid overflow bugs

Spacing:

* use consistent spacing scale

Preferred:

* `gap-2`
* `gap-4`
* `p-4`

Avoid:

* arbitrary pixel values
* inline styles
* CSS modules unless legacy
* `!important`

---

# Loading, Error & Empty States

Always handle:

* loading
* error
* empty
* success

Loading:

* use ShadCN `Skeleton`

Errors:

* inline errors for queries
* `sonner` toast for mutations

Empty:

* explicit empty states
* never silently render nothing

---

# Performance Defaults

* Use route-level code splitting with `.lazy.tsx`
* Enable `autoCodeSplitting`
* Prefer TanStack Query caching over manual memo caches
* Memoize only when measurable
* Avoid premature optimization
* Keep re-renders localized
* Virtualize large tables/lists when necessary

Avoid:

* excessive `useMemo`
* excessive `useCallback`
* deep prop drilling

---

# Before Adding Any File

1. Search for existing implementations first
2. Check:

   * `src/components/shared`
   * `src/hooks`
   * nearby features
3. Reuse before creating
4. Match existing patterns
5. Do not refactor unrelated files

---

# Preferred Pattern Example

```txt
UsersPage
  -> useUsers()
      -> users.api.ts
      -> users.mapper.ts
  -> UsersTable
  -> UsersDialog
```

---

# Anti-Patterns (Do Not Do)

* Do not fetch inside components
* Do not put business logic in JSX
* Do not bypass mappers
* Do not mix DTOs with UI types
* Do not create giant Zustand stores
* Do not prematurely abstract
* Do not use `useEffect` for derived state
* Do not duplicate server state into Zustand
* Do not create unrelated refactors
* Do not suppress TypeScript with `any`

---

# When Unsure

* Prefer existing project patterns
* Match nearby feature structure
* Keep implementations explicit
* Keep abstractions simple
* Ask before major architectural changes

---

# Validation Checklist

Run before finishing any task:

```bash
bun run typecheck
bun run lint
```

Requirements:

* zero TypeScript errors
* fix all introduced lint errors
* warnings acceptable unless critical

Never:

* silence errors using `any`
* use `as unknown as`
* bypass strict typing without explanation

If a type is genuinely unknown:

* define a proper type
* or document the uncertainty clearly
