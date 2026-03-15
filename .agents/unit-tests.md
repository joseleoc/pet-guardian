# Shared Testing Guidance

## General

- Start with the smallest relevant test target for changed code.
- Avoid changing unrelated tests.
- If no tests exist for a touched behavior, add a targeted test when the package already uses tests.

## Frontend unit test placement (`apps/mobile`)

- Unit tests for a component live with that component, using either:
	- `ComponentName.test.ts` (or `.test.tsx`) in the same component folder, or
	- `tests/ComponentName.test.ts` inside the same component folder.
- These tests should cover component-level unit behavior only.
- Keep test files focused and isolated from integration/e2e concerns.

## Reusable test mocks and helpers

- Reusable test data, fixtures, and mocks should be centralized under a `tests/` folder.
- Prefer package-level shared test utilities (for example `apps/mobile/tests/`) for cross-component reuse.
- If a mock or helper is reused by multiple suites, move it from local test files into `tests/` to avoid duplication.
- Keep shared test utilities framework-agnostic where possible and expose clear exports.

## Backend (`apps/backend`)

- Unit tests: `pnpm --filter backend test`
- E2E tests: `pnpm --filter backend test:e2e`
- Coverage (when requested): `pnpm --filter backend test:cov`

## Mobile (`apps/mobile`)

- Lint and run checks are primary in this starter.
- Use `pnpm --filter mobile lint` before broader manual verification.
- Run component unit tests for changed components when test tooling is available.
