# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

## Current Phase

- Wire editor sidebar to project API complete

## Current Goal

- Continue with the next feature unit after the API-backed editor sidebar.

## Completed

- Installed and configured the shadcn/ui foundation for the app.
- Added the required shadcn components: Button, Card, Dialog, Input, Tabs, Textarea, and ScrollArea.
- Installed Lucide React icons.
- Created the reusable class-merging helper in lib/utils.ts.
- Updated the global theme to the Ghost AI dark palette and tokenized surfaces.
- Created the editor navbar with sidebar toggle behavior.
- Created the floating project sidebar with tabbed placeholders and a New Project action.
- Wired the root app layout to ClerkProvider with the dark theme and CSS-variable-based appearance overrides.
- Added the root redirect flow and protected route configuration via proxy.ts.
- Added the sign-in and sign-up routes and the editor gate.
- Added the Clerk UserButton to the editor navbar.
- Verified the app builds successfully after auth integration.
- Added the Prisma project and collaborator models with the required relations, constraints, and indexes.
- Added the cached Prisma client singleton with Accelerate and direct PostgreSQL adapter branches.
- Generated the Prisma client and applied the initial database migration.
- Verified the Prisma-backed application build and migration status.
- Added authenticated project list and create API routes.
- Added owner-protected project rename and delete API routes.
- Verified the API route build and lint checks.
- Added server-side owned and shared project loading for the editor.
- Replaced mock project mutations with the API-backed `useProjectActions` hook.
- Added project navigation and the dynamic editor workspace route.
- Verified the editor wiring build, lint, and diagnostics checks.

## In Progress

- No active implementation work at this time.

## Next Up

- Begin the next feature unit after the editor sidebar API wiring.

## Open Questions

- None at this time.

## Architecture Decisions

- Dark-only design language is the base theme for all UI surfaces.
- Shared UI primitives remain generated and reusable; project-specific styling stays in app-level components.
- Editor shell components live under components/editor and are intentionally scoped to layout and navigation.
- Clerk handles identity and route protection with public auth routes and default protections on all other routes.

## Session Notes

- The required auth integration is implemented and aligned to the project specification.
- The app now redirects unauthenticated users to sign-in and authenticated users to the editor, while preserving the existing Clerk user menu flows.
- The project dialogs and editor home feature is now in progress and will follow the mock-data spec without API or persistence integration.
- The Prisma schema and data layer feature is now in progress; project data will be persisted with Prisma while Clerk remains the external identity provider.
- The Prisma schema and data layer feature is complete; the initial migration is applied and the generated client is available under app/generated/prisma.
- The project API route feature is now in progress and remains backend-only until the UI integration feature.
- The project API route feature is complete; unauthenticated requests return 401 and non-owner mutations return 403.
- The editor sidebar API wiring feature is now in progress; initial project lists will load on the server and mutations will use the project API.
- The editor sidebar API wiring feature is complete; initial lists load server-side and create, rename, and delete use the project API.
