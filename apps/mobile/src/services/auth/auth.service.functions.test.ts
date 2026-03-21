import { describe, it, expect } from 'vitest';
import { mapAuthError, invalidInput } from './auth.service.functions';

describe('mapAuthError', () => {
  it('returns INVALID_CREDENTIALS for 400 invalid login', () => {
    const error = { status: 400, message: 'Invalid login credentials' };
    const result = mapAuthError(error as any);
    expect(result.code).toBe('INVALID_CREDENTIALS');
  });

  it('returns EMAIL_ALREADY_REGISTERED for 422 already registered', () => {
    const error = { status: 422, message: 'Email already registered' };
    const result = mapAuthError(error as any);
    expect(result.code).toBe('EMAIL_ALREADY_REGISTERED');
  });

  it('returns UNAUTHORIZED for 401 unauthorized', () => {
    const error = { status: 401, message: 'Unauthorized' };
    const result = mapAuthError(error as any);
    expect(result.code).toBe('UNAUTHORIZED');
  });

  it('returns NETWORK_ERROR for network error', () => {
    const error = { status: 0, message: 'Network request failed' };
    const result = mapAuthError(error as any);
    expect(result.code).toBe('NETWORK_ERROR');
  });

  it('returns UNKNOWN_AUTH_ERROR for unknown error', () => {
    const error = { status: 500, message: 'Something else' };
    const result = mapAuthError(error as any);
    expect(result.code).toBe('UNKNOWN_AUTH_ERROR');
  });
});

describe('invalidInput', () => {
  it('returns INVALID_INPUT error with message', () => {
    const result = invalidInput('Bad fintech input');
    expect(result.error?.code).toBe('INVALID_INPUT');
    expect(result.error?.message).toBe('Bad fintech input');
  });
});
