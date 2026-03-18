# Frontend TanStack Query Guidance

This document defines the default TanStack Query (`@tanstack/react-query` v5+) architecture for large-scale frontend apps in this monorepo.

Use this guidance whenever a frontend app introduces server-state fetching, mutations, cache invalidation, or optimistic updates.

## Goals

- Keep server state predictable and scalable.
- Avoid ad-hoc query keys and cache invalidation logic.
- Separate transport/fetching logic from React Query hooks.
- Keep Atoms and Molecules presentational.
- Restrict server-state orchestration to hooks, Organisms, Templates, and Pages.

## Standard stack

- Query library: `@tanstack/react-query`
- Optional query key helper: `@lukemorales/query-key-factory`
- HTTP layer: `fetch` or `axios`
- Forms that submit server mutations: `react-hook-form`
- Validation for forms: `yup` with `@hookform/resolvers/yup`

## High-level layering

Follow this separation for every feature:

1. `api/`: transport clients and fetcher functions.
2. `queries/`: React Query hooks only.

## Query Client defaults

Create one shared Query Client and configure app-wide defaults conservatively.

```ts
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      gcTime: 1000 * 60 * 10,
      retry: 2,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});
```

Guidelines:

- Use shared defaults at the Query Client level.
- Override `staleTime` and `gcTime` per hook only when the feature requires it.
- Prefer long-lived cache for reference data and short-lived cache for user-specific volatile data.

## Query Key Factory

Never use inline array literals or magic strings directly inside components.

Centralize query keys in one factory.

### Recommended baseline: constant object factory

```ts
export const queryKeys = {
  users: {
    all: ['users'] as const,
    lists: () => [...queryKeys.users.all, 'list'] as const,
    list: (filters: { search?: string }) =>
      [...queryKeys.users.lists(), filters] as const,
    details: () => [...queryKeys.users.all, 'detail'] as const,
    detail: (userId: string) => [...queryKeys.users.details(), userId] as const,
  },
  userSettings: {
    all: ['user-settings'] as const,
    detail: (userId: string) => [...queryKeys.userSettings.all, userId] as const,
  },
} as const;
```

## Fetchers and transport separation

Fetcher functions must not know about React Query.

Rules:

- Fetchers live in `api/` or `services/`.
- Fetchers only perform HTTP calls, parse payloads, and return typed data.
- Fetchers must not call `useQuery`, `useMutation`, `queryClient`, or React hooks.

Example:

```ts
import { httpClient } from '@/lib/api/http-client';
import type { UserSettingsDto, UpdateUserSettingsInput } from './user-settings.types';

export async function fetchUserSettings(userId: string): Promise<UserSettingsDto> {
  const { data } = await httpClient.get<UserSettingsDto>(`/users/${userId}/settings`);
  return data;
}

export async function updateUserSettings(
  userId: string,
  input: UpdateUserSettingsInput,
): Promise<UserSettingsDto> {
  const { data } = await httpClient.patch<UserSettingsDto>(`/users/${userId}/settings`, input);
  return data;
}
```

## Custom hook layer

Every query and mutation must be wrapped in a custom hook.

Do not call `useQuery` or `useMutation` directly in page, template, organism, molecule, or atom code.

### Query hook example

```ts
import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/lib/react-query/query-keys';
import { fetchUserSettings } from '../api/user-settings.fetchers';

export function useUserSettingsQuery(userId: string) {
  return useQuery({
    queryKey: queryKeys.userSettings.detail(userId),
    queryFn: () => fetchUserSettings(userId),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    select: (data) => ({
      notificationsEnabled: data.notificationsEnabled,
      theme: data.theme,
      language: data.language,
    }),
  });
}
```

Rules:

- Set `queryKey` from the centralized factory.
- Call only fetchers inside `queryFn`.
- Use `select` for UI-focused transformation.
- Return only the shape needed by the consumer when possible.

## Data transformation with `select`

Use `select` to adapt server DTOs to UI-friendly shapes.

Examples:

- Convert nested API payloads into flat fields for forms.
- Sort server lists once at the hook layer.
- Derive booleans or display-ready labels used by Organisms.

Do not push raw API payload structure into Atoms and Molecules.

## Mutation hook with optimistic updates

Optimistic updates belong in custom mutation hooks.

```ts
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '@/lib/react-query/query-keys';
import { updateUserSettings } from '../api/user-settings.fetchers';
import type { UpdateUserSettingsInput, UserSettingsDto } from '../api/user-settings.types';

export function useUpdateUserSettingsMutation(userId: string) {
  const queryClient = useQueryClient();
  const queryKey = queryKeys.userSettings.detail(userId);

  return useMutation({
    mutationFn: (input: UpdateUserSettingsInput) => updateUserSettings(userId, input),
    onMutate: async (input) => {
      await queryClient.cancelQueries({ queryKey });

      const previousSettings = queryClient.getQueryData<UserSettingsDto>(queryKey);

      queryClient.setQueryData<UserSettingsDto>(queryKey, (current) => {
        if (!current) {
          return current;
        }

        return {
          ...current,
          ...input,
        };
      });

      return { previousSettings };
    },
    onError: (_error, _input, context) => {
      if (context?.previousSettings) {
        queryClient.setQueryData(queryKey, context.previousSettings);
      }
    },
    onSuccess: (data) => {
      queryClient.setQueryData(queryKey, data);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
}
```

Rules:

- Cancel in-flight queries before optimistic updates.
- Snapshot previous cache values in `onMutate`.
- Roll back in `onError`.
- Reconcile server truth in `onSuccess` or `onSettled`.

## Organism integration

Organisms may consume query and mutation hooks.

Atoms and Molecules must stay presentational and receive data only through props.

### Example

```tsx
import { SettingsSection } from '../../molecules/SettingsSection/SettingsSection';
import { useUserSettingsQuery } from '../../hooks/use-user-settings-query';
import { useUpdateUserSettingsMutation } from '../../hooks/use-update-user-settings-mutation';

export function UserSettingsForm({ userId }: { userId: string }) {
  const { data, isPending, isError } = useUserSettingsQuery(userId);
  const updateMutation = useUpdateUserSettingsMutation(userId);

  if (isPending) {
    return <SettingsSection title="Settings" description="Loading settings..." />;
  }

  if (isError || !data) {
    return <SettingsSection title="Settings" description="Unable to load settings." />;
  }

  return (
    <SettingsSection
      title="Settings"
      description="Manage preferences"
      notificationsEnabled={data.notificationsEnabled}
      onToggleNotifications={(value) => updateMutation.mutate({ notificationsEnabled: value })}
    />
  );
}
```

Rules:

- Organisms can orchestrate query state.
- Molecules and Atoms should not know where data came from.
- Keep feature logic in hooks and Organisms, not in low-level UI components.

## Loading and error strategy

Use two patterns intentionally.

### Global route-level loading and errors

Use `useSuspenseQuery` for page-level or template-level blocking data when:

- The screen cannot render meaningfully without the data.
- A route-level error boundary is available.
- The app benefits from consistent loading fallbacks.

Recommended:

- Wrap page or template branches with Suspense boundaries.
- Use route or app-level error boundaries for fatal fetch failures.

### Local component-level loading and errors

Use standard `useQuery` state flags when:

- The page can render partially without the data.
- Only one section needs to load independently.
- The UI should show skeletons or placeholders inside a specific Organism.

Recommended:

- `isPending` or `isLoading` for local loading UI.
- `isError` for section-level retry surfaces.
- Escalate only critical failures to route boundaries.

## Invalidation strategy

Invalidate narrowly.

Rules:

- Invalidate exact feature keys where possible.
- Avoid broad invalidation of `all` keys unless a mutation truly impacts every descendant query.
- Prefer `setQueryData` when the mutation response contains the updated entity.
- Use `invalidateQueries` to refetch dependent lists after create/delete flows.

## Atomic Design guidance for server state

- Atoms: never call query hooks.
- Molecules: never call query hooks.
- Organisms: may call feature hooks.
- Templates: may coordinate multiple Organisms and Suspense boundaries.
- Pages: compose templates and route concerns.

## Naming conventions

- Query key factory: `queryKeys`
- Fetcher files: `*.fetchers.ts`
- Query hooks: `use-*.query.ts` or `use-*-query.ts`
- Mutation hooks: `use-*.mutation.ts` or `use-*-mutation.ts`
- Form schemas: `ComponentName.schema.ts`

Choose one naming convention per app and keep it consistent.

## Minimum implementation checklist

For every new server-state feature:

- Add typed fetchers in `api/` or `services/`.
- Add query keys to the centralized factory.
- Add custom query and mutation hooks.
- Use `select` when UI does not need the raw DTO.
- Keep Atoms and Molecules presentational.
- Add optimistic update logic where the interaction benefits from immediate feedback.
- Use `ComponentName.schema.ts` for any submitted form validation.
