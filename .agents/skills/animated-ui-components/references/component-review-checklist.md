# Animated Component Review Checklist

Use this before selecting a component and again after integration.

## Source and dependency review

- The component comes from current official documentation or a verified registry.
- Its license permits the intended project use.
- The TypeScript, React, and Tailwind variants match the repository.
- Required dependencies are identified before installation.
- No duplicate router, icon, utility, styling, or animation runtime is introduced.
- Registry output and lockfile changes contain only expected files and packages.

## Product fit

- The animation has a stated user benefit.
- The effect matches the product's hierarchy and tone.
- A simpler existing primitive would not communicate the same behavior equally well.
- The component does not turn routine work into a novelty interaction.
- Animation is not required to understand or operate the feature.

## Source adaptation

- Demo text, colors, sizes, timing, and gradients are replaced with product tokens.
- Component props expose only useful product-level choices.
- Types are explicit and compatible with strict TypeScript.
- Stable data identifiers are used as keys.
- Inline styles and arbitrary values are removed unless technically necessary and documented.
- Navigation uses TanStack Router and icons use `lucide-react`.
- Feature logic remains in hooks rather than the animated component.

## Accessibility

- Native semantics and accessible names are preserved.
- The complete interaction works with a keyboard.
- Focus indicators remain visible and are not animated away.
- Hover information is also available on focus or through persistent content.
- Decorative effects are hidden from assistive technology.
- Reduced-motion mode removes nonessential movement and preserves meaning.
- Persistent movement can be paused when required.
- Flashing, rapid contrast changes, and vestibular triggers are avoided.

## Runtime quality

- Offscreen or hidden effects stop unnecessary work.
- Heavy components are lazy-loaded where appropriate.
- Layout space is reserved before animation begins.
- Slow devices retain a functional, readable fallback.
- Multiple effects do not compete for attention or main-thread time.
- LCP, CLS, and INP claims are based on runtime measurement.

## Verification record

Record the component source, registry command, added dependencies, automated commands, browser and viewport coverage, keyboard path, reduced-motion behavior, and any remaining manual checks.
