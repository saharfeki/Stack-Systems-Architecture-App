# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

## Current Phase

- Project dialogs & editor home

## Current Goal

- Build the `/editor` home screen and add the mock project create, rename, and delete workflows with the sidebar actions and mobile backdrop behavior specified in the feature brief.

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

## In Progress

- Project dialogs & editor home implementation

## Next Up

- Finish the editor home experience, wire the project dialogs, and verify there are no TypeScript or lint regressions.

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
