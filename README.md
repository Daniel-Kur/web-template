# Web Template (Enterprise Dashboard Baseline)

Production-oriented frontend template using Bun + React + TypeScript + Vite.

## Stack

- React 19 + TypeScript (strict)
- Vite 8
- Tailwind CSS v4
- shadcn/ui (Radix-based)
- TanStack Router v1 (file-based routing)
- TanStack Query v5 (server state)
- Zustand (UI/client state only)
- Sonner (mutation feedback toasts)

## Architecture Rules

- Feature-first structure under `src/features/<feature>/`
- DTO -> Mapper -> UI type flow (components never consume DTOs directly)
- API calls only through `src/lib/api.ts`
- TanStack Query owns all server state
- Zustand stores only UI state (dialogs, filters, selected IDs, tabs)
- Pages are orchestration layers; hooks own business logic

## Project Structure

```txt
src/
  features/
    users/
      users.api.ts
      users.dto.ts
      users.mapper.ts
      users.types.ts
      useUsers.ts
      UsersPage.tsx
      components/
        UsersTable.tsx
        UsersDialog.tsx

  components/
    ui/
    shared/

  lib/
    api.ts
    react-query.ts
    utils.ts

  store/
    users.store.ts

  routes/
    __root.tsx
    index.tsx
    users.tsx

  routeTree.gen.ts   # generated, do not edit
```

## Routing

- TanStack file routes live in `src/routes`
- Vite plugin order is:
  1. `tanstackRouter({ autoCodeSplitting: true })`
  2. `react()`
- `src/routeTree.gen.ts` is generated and should never be edited

Generate routes manually if needed:

```bash
bunx @tanstack/router-cli generate
```

## Getting Started

```bash
bun install
bun dev
```

App runs at [http://localhost:5173](http://localhost:5173).

## Scripts

```bash
bun run dev
bun run typecheck
bun run lint
bun run build
bun run preview
```

Validation requirement before merge:

```bash
bun run typecheck
bun run lint
```

## API Configuration

`src/lib/api.ts` uses `VITE_API_BASE_URL`.

Example `.env`:

```bash
VITE_API_BASE_URL=http://localhost:3000
```

The sample `/users` route expects a backend endpoint:

- `GET /users` -> `UserDTO[]`

## Current Baseline Features

- Dashboard shell with sidebar + content layout
- `/` overview route
- `/users` feature slice with:
  - TanStack Query fetch
  - DTO -> mapper -> UI rows
  - Loading/error/empty/success states
  - Sticky table header
  - Reusable details dialog
  - UI-only Zustand dialog state

## Notes

- Keep `routeTree.gen.ts` readonly (see `.vscode/settings.json`)
- Prefer extending existing patterns over introducing new top-level abstractions
- Follow `AGENTS.md` for dependency direction and naming rules
