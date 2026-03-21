import type { TFunction } from 'i18next';

import { resources } from "@/src/lib/i18n/i18n";

type ErrorsTranslations = typeof resources.en.errors;
type ErrorTranslationSelector = (translations: ErrorsTranslations) => string;

const AUTH_ERROR_CODE_MAP: Record<string, ErrorTranslationSelector> = {
  INVALID_INPUT: (translations) => translations.errors.auth.INVALID_INPUT,
  INVALID_CREDENTIALS: (translations) => translations.errors.auth.INVALID_CREDENTIALS,
  EMAIL_ALREADY_REGISTERED: (translations) => translations.errors.auth.EMAIL_ALREADY_REGISTERED,
  UNAUTHORIZED: (translations) => translations.errors.auth.UNAUTHORIZED,
  NETWORK_ERROR: (translations) => translations.errors.auth.NETWORK_ERROR,
  UNKNOWN_AUTH_ERROR: (translations) => translations.errors.auth.UNKNOWN_AUTH_ERROR,
  ERR_AUTH_INVALID_PASSWORD: (translations) =>
    translations.errors.backend.ERR_AUTH_INVALID_PASSWORD,
  ERR_AUTH_INVALID_CREDENTIALS: (translations) =>
    translations.errors.backend.ERR_AUTH_INVALID_CREDENTIALS,
  ERR_AUTH_ACCOUNT_LOCKED: (translations) => translations.errors.backend.ERR_AUTH_ACCOUNT_LOCKED,
};

export function translateAuthError(
  t: TFunction<readonly ["errors"], undefined>,
  code: string,
  fallbackMessage?: string,
): string {
  const translationSelector =
    AUTH_ERROR_CODE_MAP[code] ?? ((translations) => translations.errors.auth.UNKNOWN);

  return t(translationSelector, {
    defaultValue:
      fallbackMessage ??
      t((translations) => translations.errors.common.UNKNOWN, {
        defaultValue: "An unexpected error occurred. Please try again.",
      }),
  });
}
