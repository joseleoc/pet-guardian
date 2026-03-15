# pet-guardian-mvp

This repository is a monorepo for the Pet Guardian MVP. It groups multiple applications in a single workspace so they can share tooling, dependency management, and development workflows.

## Apps

The `apps/` folder contains the runnable applications in this project:

- `apps/backend`: a NestJS backend service.
- `apps/mobile`: an Expo / React Native mobile application.

## Installing dependencies

This monorepo uses `pnpm` workspaces. Install all packages from the repository root so dependencies are resolved for every app:

```bash
pnpm install
```

## Running the project with Turbo

[Turbo](https://turborepo.com/) is a build system for monorepos. It helps run tasks across multiple apps from the workspace root and coordinates those tasks in a single command.

To start the project in development mode from the repository root, run either:

```bash
npm run dev
```

or:

```bash
npx turbo run dev
```

This will execute the `dev` script in each app that defines it, which currently starts:

- the backend in watch mode
- the mobile app with Expo