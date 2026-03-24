# Frontend Architecture Skill

This skill applies to all frontend apps in this monorepo (current: `apps/mobile`; future: `apps/web`).

## Required pattern: Atomic Design
All frontend UI must follow Atomic Design:
- Atoms: smallest reusable UI primitives.
- Molecules: composed units built from atoms.
- Organisms: larger composed sections built from molecules/atoms.
- Templates: page structure/layout composition.
- Pages: route-level screens that compose templates/organisms.

## App folder structure rule
For frontend apps in this monorepo, keep route-level composition and shared backend integration folders directly under `src/`.

Recommended baseline structure:
```
src/
	app/
	components/
		atoms/
		molecules/
		organisms/
		templates/
	api/
		services/
	hooks/
	schemas/
	lib/
```

Rules:
- Do not use a top-level `features/` folder as the default app structure.
- Keep backend service functions in `src/api/services/`.
- Keep TanStack Query query and mutation hooks in `src/hooks/`.