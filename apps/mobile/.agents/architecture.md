# Mobile Frontend Architecture Guidance

This document defines architecture guidance for `apps/mobile`.

## Pattern: Atomic Design

Use Atomic Design to build UI from small reusable pieces into complete screens:

- Atoms: foundational UI elements (for example text, icon wrappers, buttons).
- Molecules: small combinations of atoms with one clear responsibility.
- Organisms: richer UI sections composed of molecules/atoms.
- Templates: structural page layouts without final screen data.
- Pages (routes): final route-level screens composed from templates/organisms.

How to use it:

- Build from atoms upward before creating route-specific screens.
- Prefer composition over duplication.
- Keep business/domain logic out of low-level presentational atoms.
- Place route and navigation concerns in page-level code.

## Component folder convention

Each component should live in its own folder named after the component.

Required files:

- `ComponentName/index.ts` (barrel exports for the component folder)
- `ComponentName/ComponentName.tsx` (root component implementation)

Optional files (create only when needed):

- `ComponentName/ComponentName.constants.ts`
- `ComponentName/ComponentName.functions.ts`
- `ComponentName/ComponentName.types.ts`
- `ComponentName/ComponentName.styles.ts`

Guidelines:

- Do not create optional files by default; add them only when the component needs them.
- Keep exports organized through `index.ts` so imports stay stable.

## Frontend unit test location

- Co-locate component unit tests inside the same component folder:
  - `ComponentName/ComponentName.test.ts` (or `.test.tsx`), or
  - `ComponentName/tests/ComponentName.test.ts`.
- Use shared mocks/utilities from package-level `tests/` folders when reused across suites.
