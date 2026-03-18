import type { Theme as NavigationTheme } from '@react-navigation/native';
import { MD3DarkTheme, MD3LightTheme, type MD3Theme } from 'react-native-paper';

type PaperColorOverrides = Partial<MD3Theme['colors']>;

export const paperColorOverrides: Record<'light' | 'dark', PaperColorOverrides> = {
  light: {
    primary: '#0a7ea4',
  },
  dark: {
    primary: '#ffffff',
  },
};

export function createPaperTheme(
  isDark: boolean,
  navigationTheme: NavigationTheme,
): MD3Theme {
  const baseTheme = isDark ? MD3DarkTheme : MD3LightTheme;
  const scheme = isDark ? 'dark' : 'light';

  return {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      ...paperColorOverrides[scheme],
      background: navigationTheme.colors.background,
    },
  };
}
