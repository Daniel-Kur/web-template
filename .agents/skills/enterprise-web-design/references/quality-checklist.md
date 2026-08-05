# Enterprise Interface Quality Checklist

Read this checklist for accessibility reviews, visual redesigns, or complex new application surfaces.

## Product fit

- The primary user and task are identifiable.
- The primary action is clear without making secondary work hard to find.
- Density matches task frequency and user expertise.
- Terminology is consistent with the rest of the product.
- The design works without decorative effects.

## Structure and navigation

- Heading order and landmarks describe the page correctly.
- Navigation location, labels, and selected state are predictable.
- Breadcrumbs appear only when hierarchy materially helps orientation.
- Filters, sorting, pagination, and tabs use route search params when shareable.
- Back, cancel, close, and escape behavior preserve user expectations and input.

## Forms and workflows

- Labels remain visible after input.
- Required fields, formats, and length limits are clear before submission.
- Validation messages identify the field, problem, and recovery action.
- Pending submission prevents duplicates without erasing input.
- Multi-step flows show progress and preserve completed work.
- Destructive or irreversible actions communicate scope and consequence.

## Data and feedback

- Loading, refresh, empty, filtered-empty, error, partial, and permission states exist.
- Tables preserve headers, alignment, scanning, and keyboard usability.
- Status is not conveyed by color alone.
- Toasts supplement rather than replace persistent critical information.
- Success feedback is proportional and does not interrupt continued work.

## Responsive behavior

- Content reflows without loss at 400% zoom where applicable.
- Critical controls do not disappear at narrow widths.
- Dense tables use intentional overflow, column priority, or alternate views.
- Touch targets and spacing support coarse pointers.
- Long names, translations, and user-generated content do not break layouts.

## Accessibility

- Native elements are used wherever possible.
- Every control has an accessible name and discernible state.
- Keyboard focus is visible and moves predictably through dialogs and route changes.
- Dialog focus is trapped while open and restored when closed.
- Text, UI components, and focus indicators meet WCAG 2.2 AA contrast.
- Live updates are announced only when useful and do not become noisy.
- Reduced-motion mode preserves meaning and task completion.

## Performance

- Initial routes avoid unnecessary eager dependencies.
- Images and embeds reserve space and use appropriate loading priority.
- Interaction handlers avoid long main-thread work.
- Motion uses transform and opacity where practical.
- LCP, CLS, and INP require runtime measurement before making performance claims.

## Verification report

Record:

- automated commands that passed
- viewport sizes checked
- keyboard workflow checked
- browser or assistive technology used
- states exercised
- remaining manual or production measurement
