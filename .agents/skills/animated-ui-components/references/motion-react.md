# Motion for React

Use this reference only after the parent skill determines that CSS or existing primitives are insufficient and Motion is justified.

## Verify before implementation

Motion APIs and packaging change. Open the relevant current official documentation before using an unfamiliar API:

- Installation: `https://motion.dev/docs/react-installation`
- React API overview: `https://motion.dev/docs/react`
- Accessibility: `https://motion.dev/docs/react-accessibility`
- Bundle size: `https://motion.dev/docs/react-reduce-bundle-size`
- Upgrade guide: `https://motion.dev/docs/react-upgrade-guide`

Do not use the downloaded `motion-framer` skill, its starter project, generators, or bundled API reference as a source of truth.

## Package convention

Use the current Motion package and React entry point:

```bash
bun add motion
```

```tsx
import { motion } from "motion/react";
```

Do not add `framer-motion` to new code. If the repository already uses `framer-motion`, treat conversion as a deliberate migration: inspect all imports and behavior, follow the current upgrade guide, and avoid running both packages for the same feature.

Adding Motion is a runtime dependency change. Do it only when the user has requested or approved the Motion-based feature.

## Configure reduced motion

When Motion becomes a shared application dependency, set the default reduced-motion policy at the narrowest common provider boundary:

```tsx
import { MotionConfig } from "motion/react";

type AppMotionProps = {
  children: React.ReactNode;
};

export function AppMotion({ children }: AppMotionProps) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
```

Use `useReducedMotion()` when the reduced experience needs a different composition, such as replacing spatial movement with opacity or disabling autoplay. Do not rely only on zero-duration transforms.

## Choose the smallest API

- Use `animate`, `initial`, and `transition` for a single state-driven element.
- Use typed variants when multiple elements share named states or need orchestration.
- Use `AnimatePresence` for exit animation when React removes keyed children.
- Use `layout` for element reflow and `layoutId` for an intentional shared-element relationship.
- Use `LayoutGroup` when separate layout animations must coordinate.
- Use `useAnimate` for an imperative sequence scoped to a local subtree.
- Use `useInView` or `whileInView` for nonessential viewport reveals, not for business logic or data fetching.
- Use drag and reorder APIs only when the interaction has keyboard-accessible alternatives.
- Consider `LazyMotion` only after bundle analysis shows it is useful.

Prefer direct component props over abstraction. Extract shared variants or helpers only after two or more real consumers need the same motion language.

## Type variants explicitly

```tsx
import { motion, type Variants } from "motion/react";

const panelVariants: Variants = {
  closed: { opacity: 0, y: 8 },
  open: { opacity: 1, y: 0 },
};

type AnimatedPanelProps = {
  isOpen: boolean;
  children: React.ReactNode;
};

export function AnimatedPanel({ isOpen, children }: AnimatedPanelProps) {
  return (
    <motion.div
      variants={panelVariants}
      initial={false}
      animate={isOpen ? "open" : "closed"}
    >
      {children}
    </motion.div>
  );
}
```

Use `initial={false}` when mount animation would cause distracting replay, hydration differences, or a false initial state.

## Exit animation

Give every conditional child a stable semantic key. Keep the presence boundary close to the changing content.

```tsx
import { AnimatePresence, motion } from "motion/react";

<AnimatePresence initial={false} mode="popLayout">
  {items.map((item) => (
    <motion.li key={item.id} layout exit={{ opacity: 0 }}>
      {item.label}
    </motion.li>
  ))}
</AnimatePresence>;
```

Do not use array indexes. Verify the selected `mode`; `wait` supports one child at a time and can make routine navigation feel blocked.

Do not replace Radix or ShadCN dialog mounting, focus trapping, dismissal, or accessibility behavior with custom presence logic. Animate a safe visual layer while preserving the primitive's lifecycle.

## Layout animation

Use `layout="position"` when size interpolation is unnecessary. Keep `layoutId` values stable and unique within the intended relationship, especially in repeated records.

Do not use layout animation across large tables or long virtualized collections without measuring it. Preserve table semantics rather than converting rows into generic animated containers.

## Styling

- Put static presentation in Tailwind classes and repository tokens.
- Use Motion's `style` prop only for dynamic Motion values or animation-specific values that cannot be represented statically.
- Do not copy demo gradients, shadows, radii, fixed dimensions, or inline design systems.
- Avoid animating width, height, top, left, margin, or padding continuously. Prefer transforms, opacity, or the `layout` API.
- Keep focus-ring styling outside animated transforms and clipping when possible.

## Gestures

- Apply `whileHover` only as enhancement; never hide information or actions until hover.
- Provide equivalent focus treatment when hover communicates state.
- Keep `whileTap` subtle and do not move the hit target away from the pointer.
- Do not make a generic `div` clickable or draggable without semantics and keyboard behavior.
- Provide buttons, menus, or another accessible method for any drag-to-reorder or swipe action.
- Avoid error shakes, uncontrolled bouncing, and large-axis movement in routine forms.

## Route and workflow motion

Use TanStack Router state and components; never add React Router for transition examples. Route animation must preserve:

- focus placement after navigation
- browser back/forward behavior
- scroll restoration expectations
- immediate access to the destination content
- pending and error states

Prefer animating a local route content region over remounting or animating the entire application shell.

## Performance

- Keep simultaneously animated elements limited and purposeful.
- Avoid scroll-linked transforms on data-heavy application pages unless explicitly requested.
- Do not subscribe to Motion values through React state on every frame; use Motion values and supported transforms directly.
- Stop or omit continuous work when content is offscreen or the document is hidden.
- Inspect the production bundle when Motion is first introduced or a feature imports advanced APIs.
- Use runtime profiling before claiming frame rate, INP, or bundle improvements.

## Verification

Test:

- first mount and repeated mount
- rapid toggling and interrupted transitions
- reduced-motion changes
- keyboard focus during enter and exit
- pointer, touch, and keyboard alternatives for gestures
- long content, reordered lists, and removed records
- narrow and wide layouts
- route back/forward behavior when route animation is involved

Run `bun run typecheck`, `bun run check`, and `bun run build`. Use browser testing for interactive behavior and report what was not manually verified.
