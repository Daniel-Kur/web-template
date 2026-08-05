---
name: enterprise-web-design
description: Design and refine production-grade enterprise web application interfaces in this repository. Use for new or redesigned application pages, navigation, forms, settings, onboarding, search, portals, data-heavy views, multi-step workflows, responsive behavior, interaction design, accessibility reviews, and visual consistency work. Do not trigger for backend-only changes or purely mechanical frontend fixes with no design decision.
---

# Enterprise Web Design

Create clear, trustworthy, accessible application experiences for professional users. Treat enterprise design as a quality standard, not a dashboard aesthetic: support focused workflows, content-led pages, forms, portals, administration, and data-heavy tools without forcing every surface into cards or tables.

## Start with repository context

1. Read the nearest `AGENTS.md` and treat it as authoritative for architecture, libraries, naming, security, and validation.
2. Inspect existing components, tokens, layouts, routes, and comparable screens before proposing a new pattern.
3. Identify the primary user, their goal, task frequency, data density, risk of error, and expected device range.
4. Preserve established product language and visual conventions unless the request is explicitly a redesign.

Do not introduce a parallel design system. Reuse ShadCN primitives, shared components, Tailwind tokens, and existing interaction patterns first.

## Choose the experience deliberately

Define the page around the user's job rather than a fashionable layout.

- Use content hierarchy to make the primary action and next decision obvious.
- Prefer progressive disclosure for advanced or infrequent controls.
- Keep frequent workflows compact and efficient; give unfamiliar or high-risk workflows more guidance and confirmation.
- Use cards only for meaningful grouping or comparison, not as a default wrapper for every section.
- Use tables for comparable structured records. Preserve scanability, column meaning, sticky headers, and keyboard access.
- Use forms with persistent labels, clear requirements, sensible defaults, inline validation, and recoverable errors.
- Keep destructive actions visually distinct and require confirmation proportional to impact.
- Keep navigation stable, predictable, and based on user mental models rather than implementation structure.

Support application surfaces including authentication, onboarding, work queues, record detail, search, settings, account management, reporting, administration, and multi-step operational workflows.

## Visual direction

Aim for a calm, cohesive, product-specific interface.

- Establish hierarchy through typography, spacing, alignment, grouping, and contrast before decoration.
- Use the repository spacing and type scales; avoid arbitrary values and excessive density variation.
- Prefer restrained color with semantic status colors that remain distinguishable without color alone.
- Keep borders, elevation, radius, and icon treatment consistent across the product.
- Use whitespace to clarify relationships while preserving efficient information density.
- Design responsive behavior intentionally; do not merely shrink desktop layouts.

Do not add glassmorphism, custom cursors, parallax, scrollytelling, 3D, decorative gradients, or animation libraries by default. They are acceptable only when the product context and user request justify them. Marketing or storytelling surfaces may be more expressive while still sharing the application's tokens and accessibility baseline.

## Interaction and state

Design every meaningful state before considering the surface complete:

- initial loading and background refresh
- success and populated content
- empty and first-use guidance
- no search or filter results
- recoverable and terminal errors
- disabled, pending, and permission-restricted actions
- partial data and offline or interrupted workflows when relevant

Keep feedback close to the initiating action. Prevent duplicate submissions, preserve recoverable input, and explain how users can resolve errors. Use optimistic updates only when failure is easy to understand and reverse.

Use motion only to communicate continuity, hierarchy, or feedback. Prefer CSS transitions for simple effects, animate transform and opacity, and provide an equivalent experience under `prefers-reduced-motion`.

## Accessibility baseline

Target WCAG 2.2 AA as the minimum.

- Use semantic elements and native controls before ARIA.
- Ensure complete keyboard operation, logical focus order, visible focus, and correct focus restoration.
- Give icon-only actions accessible names and associate errors and descriptions with form controls.
- Maintain sufficient text, component, and focus-indicator contrast.
- Never communicate status through color alone.
- Support zoom, reflow, touch input, screen readers, and reduced motion.
- Prefer touch targets around 44 CSS pixels while meeting applicable WCAG minimums.

For an explicit accessibility review or a complex new surface, read `references/quality-checklist.md` before finishing.

## Performance and implementation

- Prefer the existing dependency stack and native platform capabilities.
- Do not add an animation, charting, visualization, or component dependency for a pattern the current stack handles well.
- Preserve route-level splitting and avoid turning shared layout code into a large eager bundle.
- Reserve media dimensions, lazy-load noncritical assets, and avoid layout-shifting personalization.
- Evaluate responsiveness with current Core Web Vitals: LCP, CLS, and INP. Do not use FID as a current Core Web Vital.
- Keep components presentational and place business logic, networking, and server state in the layers defined by `AGENTS.md`.

## Validate

1. Check the surface at narrow mobile, wide mobile, tablet, laptop, and large desktop widths relevant to the product.
2. Navigate the complete workflow using only the keyboard.
3. Inspect focus, reduced motion, zoom/reflow, long text, missing data, and slow/error states.
4. Confirm actions have pending and failure behavior and destructive operations are appropriately guarded.
5. Run the repository's required typecheck, Biome check, and production build commands.

Do not claim accessibility or performance compliance from static inspection alone. State what was verified and what still requires browser, assistive-technology, or real-user measurement.
