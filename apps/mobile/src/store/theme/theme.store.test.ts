import { describe, it, expect, beforeEach, vi } from 'vitest';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useThemeStore } from './theme.store';

vi.mock('@react-native-async-storage/async-storage', () => ({
  default: {
    setItem: vi.fn(),
    getItem: vi.fn(),
    removeItem: vi.fn(),
  },
}));

describe('useThemeStore', () => {
  beforeEach(() => {
    useThemeStore.setState({ theme: 'system' });
  });

  it('sets theme', () => {
    useThemeStore.getState().setTheme('dark');
    expect(useThemeStore.getState().theme).toBe('dark');
  });

  it('resets theme', () => {
    useThemeStore.getState().setTheme('light');
    useThemeStore.getState().resetTheme();
    expect(useThemeStore.getState().theme).toBe('system');
  });

  it('persists theme to AsyncStorage', async () => {
    useThemeStore.getState().setTheme('dark');
    expect(AsyncStorage.setItem).toHaveBeenCalled();
  });
});
