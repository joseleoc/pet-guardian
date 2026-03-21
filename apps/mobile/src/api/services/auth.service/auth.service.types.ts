export type AuthErrorCode = 'invalid_credentials' | 'network_error' | 'unknown';

export interface AuthSession {
  accessToken: string;
  refreshToken: string;
  userId: string;
}

export interface AuthServiceResult {
  data: AuthSession | null;
  error: {
    code: AuthErrorCode;
    message: string;
  } | null;
}