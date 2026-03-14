# Decisions

## Component Architecture

The UI uses a five-layer atomic design hierarchy — `ui → atoms → molecules → organisms → templates` — with shadcn/ui as the sole component system. This is deliberately more structure than a four-screen app demands; the goal was to demonstrate how I'd organise a production codebase where multiple teams contribute features. The strict dependency chain means upgrading a shadcn primitive only touches one atom wrapper, never business logic. The alternative was a flat `components/` folder — simpler to navigate, but it sacrifices the import discipline that prevents circular dependencies as a codebase scales. With more time, I'd evaluate whether the atoms layer earns its keep or could merge into molecules.

## Data Layer & Cache Strategy

All data fetching goes through typed fetch functions in `src/api/`, with TanStack Query hooks in `src/hooks/useQueries.ts` using a hierarchical key factory (`['statuses', 'list', filters]`, `['statuses', 'detail', id]`). This makes targeted invalidation straightforward — mutations invalidate the relevant query families rather than the entire cache. I chose invalidation over optimistic updates for simplicity; with more time I'd add optimistic mutations for a snappier feel. Feed filters and pagination are driven entirely by URL search params via TanStack Router's `validateSearch`, so the view is shareable and survives refresh. The 60-second stale time plus one retry is enough to recover from the mock server's 5% random 500s without hammering the API.

## Form Handling & Responsive Strategy

Client-side validation lives directly in `StatusForm` rather than pulling in a form library. With four fields, React Hook Form would add a dependency and roughly the same amount of code — so I kept it simple. Each field clears its own error on change for immediate feedback, and server 400 errors pass through the same inline UI via a `serverErrors` prop. For responsiveness, the sidebar collapses to a slide-over drawer below the `md` breakpoint, metric grids reflow from 4 → 2 → 1 columns, and the team table uses horizontal scrolling. With more time I'd consider a bottom tab bar for mobile and skeleton loading states instead of spinners.
