# Decisions

## Component Architecture

The UI follows a five-layer atomic design architecture with shadcn/ui as the sole component system. This may appear over-engineered for a project of this scope — and it is, intentionally. The goal was to illustrate an architecture that mirrors how I would structure a real production codebase with multiple teams, long-lived features, and the need for consistent design system governance. In a real-world setting, this layering pays for itself as the codebase grows; here it serves to demonstrate the thinking behind it.

1. **`ui/` — shadcn primitives**: Vendored, unmodified Radix + Tailwind + CVA components (Button, Input, Select, Card, Table, etc.). These are never edited directly — they remain "stock" so they can be upgraded.

2. **`atoms/`**: Thin wrappers around a single shadcn primitive that add project-specific enhancements. For example `Input` adds an `error` boolean (red ring + `aria-invalid`) and an `icon` slot; `Label` adds a `required` asterisk. Pure re-exports (e.g. `Button`, `Badge`) exist so every import path is consistent.

3. **`molecules/`**: Compose multiple atoms/primitives into reusable units. `AppSelect` flattens the multi-part Radix Select into a single-prop `{options, value, onValueChange}` API. `FormField` wires Label + children + error message. `DataTable`, `Card`, `Sheet`, `AlertDialog` are re-exports to enforce the "import from molecules, not ui/" rule.

4. **`organisms/`**: Domain-aware but feature-portable components. `StatusChip` maps status categories to coloured badges using tailwind-variants. `MetricCard` composes `Card` + `CardContent` with a metric layout. `Pagination` uses `Button` atoms for page controls. `EmptyState` renders a centred icon + title + CTA pattern.

5. **`templates/`**: Screen-level compositions that import only from organisms and below, matching the atomic design "templates" layer. Each route maps to a template folder (`feed/`, `status/`, `team/`, `updates/`, `settings/`). Route files in `src/routes/` act as the "pages" layer — they inject data and render a template. The `Layout` component owns the sidebar shell and renders route content via TanStack Router's `<Outlet>`.

The strict dependency chain `ui → atoms → molecules → organisms → templates` ensures no circular imports, keeps each layer independently testable, and means swapping a shadcn primitive never requires touching template code — only the atom wrapper. Route files serve as the "pages" layer, completing the full atomic design hierarchy.

## Data Layer & Cache Strategy

All data fetching goes through a thin API client layer (`src/api/statuses.ts`, `src/api/teams.ts`) that wraps `fetch` with typed inputs and outputs, throwing the server error body on failure so TanStack Query can surface it. Query hooks in `src/hooks/useQueries.ts` use a hierarchical key factory — `['statuses', 'list', filters]`, `['statuses', 'detail', id]`, `['teams']`, `['team-summary']` — which makes targeted invalidation straightforward. Mutations invalidate the `statuses` and `team-summary` query families on success so stale counts and lists are refetched automatically. The feed route drives filters and pagination entirely through URL search params via TanStack Router's `validateSearch` and `navigate({ search })`, meaning the current view survives page refresh and is shareable. The global `QueryClient` is configured with a 60-second stale time and a single retry, which is enough to recover from the mock server's 5% random 500 errors without hammering the API.

## Form Validation & Error Handling

Client-side validation lives directly in `StatusForm` rather than pulling in a form library. The form tracks a `FormErrors` object that is populated on submit; each field clears its own error on change so the user gets immediate feedback. Required fields (`project`, `body ≥ 10 chars`, `teamId`, `statusDate`) are validated synchronously. The `FormField` molecule composes `Label` + the input + an error message using `role="alert"`, eliminating boilerplate in every field group. A `serverErrors` prop allows the parent route to pass through API-level 400 validation errors in the same inline style. This approach is lightweight — no additional dependencies — and sufficient for the four-field form surface. Every route also handles `isError` from its query hooks with a visible error message and a Retry `Button` that calls `refetch()`.

## Responsive Strategy

Responsiveness is handled through Tailwind utility classes at the `sm:` (640 px) and `md:` (768 px) breakpoints — no container-query library or global breakpoint provider needed. The sidebar collapses to a slide-over drawer on screens below `md`, triggered by a hamburger button in a fixed mobile header bar, with Escape-key and overlay-click dismissal. Metric grids go from single-column on mobile to 2-column at `sm` and 4-column at `lg`. Feed controls stack vertically on narrow viewports and sit in a row on wider ones. The team members table uses `overflow-x-auto` for horizontal scrolling — rows with multiple data points are more readable scrolled than reflowed into cards. With more time I would consider a bottom tab bar for mobile navigation and a more refined card layout for the members table at very small widths.
