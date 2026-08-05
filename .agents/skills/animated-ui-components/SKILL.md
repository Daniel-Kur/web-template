---
name: animated-ui-components
description: Select, adapt, and integrate purposeful animated React components from Magic UI, React Bits, or existing project primitives into this repository. Use only when the user explicitly invokes this skill, requests animation or motion, names Magic UI or React Bits, or asks for an animated component or visual effect. Do not use for ordinary UI implementation, backend work, or purely mechanical frontend changes.
---

# Animated UI Components

Add motion that improves feedback, continuity, orientation, or product character without weakening usability, accessibility, performance, or design-system consistency.

## Establish governing context

1. Read the nearest `AGENTS.md` and follow its architecture, dependency, security, and validation requirements.
2. Read `../enterprise-web-design/SKILL.md` completely. Treat it as authoritative for product fit, visual hierarchy, accessibility, responsive behavior, and interaction quality.
3. Inspect existing components, utilities, tokens, dependencies, and comparable interactions before selecting a library component.

This skill governs animation selection and integration only. It does not override repository architecture or justify redesigning unrelated surfaces.

## Decide whether animation is warranted

State the intended user benefit in one sentence. Valid purposes include:

- confirming an action or state change
- preserving spatial continuity during navigation or expansion
- directing attention to newly available information
- explaining progress or a relationship
- adding restrained product character to an explicitly expressive surface

If the effect is only decorative, ensure it is subtle, non-blocking, and easy to disable. Prefer no animation when it delays work, competes with content, obscures state, or repeats without benefit.

Use this selection order:

1. Existing project component or CSS transition
2. Small local animation built with platform APIs or the project's existing motion dependency
3. A source-owned component from Magic UI or React Bits
4. WebGL or another heavy runtime only when explicitly requested and materially justified

## Verify the current source

Magic UI and React Bits registries, package requirements, component APIs, and licenses change. Before installing or copying a component:

1. Open its current official documentation.
2. Verify the exact registry identifier, required packages, framework variant, license, and reduced-motion behavior.
3. Prefer the TypeScript and Tailwind variant compatible with React 19 and Tailwind 4.
4. Do not rely on a remembered registry name, static catalog, blog post, or the discarded downloaded skill.

Official starting points:

- Magic UI: `https://magicui.design/docs/installation`
- React Bits: `https://www.reactbits.dev/`

For component selection or audit work, read `references/component-review-checklist.md`.

## Integrate safely

Before running a generator or registry command:

1. Check the working tree and inspect any existing target component.
2. Confirm the requested component or library authorizes adding its dependencies. If not, explain the dependency cost and request approval.
3. Install one component at a time with the current Bun-compatible command from official documentation.
4. Review every generated file and dependency change. Never accept an overwrite of a customized component without preserving and reconciling its behavior.

Adapt copied source to this repository:

- Put reusable primitives in `src/components/ui/` and feature-specific compositions in the owning feature's `components/` directory.
- Use `@/lib/utils` and existing ShadCN primitives.
- Use `lucide-react`; do not add another icon library for equivalent icons.
- Use TanStack Router for application navigation; never introduce React Router.
- Keep TypeScript strict, use type-only imports where required, and export explicit component APIs.
- Use Tailwind 4 and the existing `src/index.css` token system. Do not introduce a Tailwind 3 configuration file.
- Avoid inline styles, arbitrary pixel values, index keys, direct DOM mutation, and dependency-specific global resets.
- If a motion runtime is required, use one runtime consistently. Do not install both `motion` and `framer-motion` for the same feature.

Copied components are owned source after installation. Simplify them, remove unused variants, align naming, and make their public props fit the product rather than preserving demo-oriented APIs.

## Motion standards

- Animate `transform` and `opacity` when practical; avoid layout-triggering properties in continuous motion.
- Keep routine feedback fast and restrained. Do not delay navigation or task completion to finish an animation.
- Implement a meaningful `prefers-reduced-motion` path that removes nonessential movement rather than only shortening durations.
- Avoid autoplaying, infinite, flashing, parallax, cursor-following, or hover-only interactions by default.
- Provide pause or stop controls when moving content persists and WCAG requires user control.
- Ensure content remains available when animation APIs, JavaScript enhancement, or GPU effects are unavailable.
- Do not animate critical values in a way that temporarily announces or displays incorrect information.
- Keep loading indicators honest; animation must not imply progress that is not occurring.

## Accessibility

- Preserve native semantics, keyboard behavior, focus order, and accessible names when wrapping ShadCN or Radix components.
- Never replace primary navigation with an unfamiliar animated control such as a dock unless the user explicitly requests it and an equivalent accessible navigation model remains.
- Make hover effects available through keyboard focus where they communicate information.
- Keep focus indicators visually stable and unobscured by transforms, clipping, masks, or overlays.
- Hide decorative animation from assistive technology when it carries no meaning.
- Test high zoom, coarse pointers, reduced motion, and keyboard-only operation.

## Performance

- Measure bundle and runtime cost in proportion to the effect's value.
- Lazy-load heavy effects that are not required for initial interaction.
- Limit simultaneously active observers, timers, canvases, particles, blurred layers, and continuous animations.
- Pause offscreen animation and animation in hidden tabs when the component does not already do so.
- Avoid WebGL for routine application chrome, tables, forms, navigation, or status feedback.
- Reserve layout space so animated content does not increase CLS, and verify that interaction work does not degrade INP.

## Validate

1. Exercise default, active, interrupted, loading, error, and reduced-motion behavior.
2. Test keyboard interaction and focus before visual polish.
3. Check narrow mobile, tablet, laptop, and large desktop layouts relevant to the feature.
4. Inspect generated source and dependency diffs for unrelated or duplicate code.
5. Run `bun run typecheck`, `bun run check`, and `bun run build`.
6. Test the interaction in a browser when feasible and report what was manually verified.

Do not claim accessibility or performance compliance from the component library's marketing or static code inspection alone.
