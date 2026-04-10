import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { useEffect, useState, type ComponentProps } from "react";
import { PaperProvider } from "react-native-paper";
import { initialWindowMetrics, SafeAreaProvider } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import "react-native-reanimated";

import { createPaperTheme } from "@/src/constants/paper-theme";
import { useAuthInit } from "@/src/hooks/use-auth-init";
import "@/src/lib/i18n";
import { useColorScheme } from "@/src/hooks/use-color-scheme/use-color-scheme";
import { ReactQueryProvider } from "@/src/lib/react-query/ReactQueryProvider";
import { useAuthStore } from "@/src/store";

export const unstable_settings = {
  anchor: "(tabs)",
};

type MaterialDesignIconName = ComponentProps<typeof MaterialDesignIcons>["name"];

export default function RootLayout() {
  const isLoadingAuth = useAuthStore((state) => state.isLoading);
  const user = useAuthStore((state) => state.user);
  const { t } = useTranslation(["common"]);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Replace with real auth state
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  useAuthInit();

  const navigationTheme = isDark ? DarkTheme : DefaultTheme;
  const paperTheme = createPaperTheme(isDark, navigationTheme);

  useEffect(() => {
    if (!isLoadingAuth) {
      setIsLoggedIn(Boolean(user));
    }
  }, [isLoadingAuth, user]);

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <ReactQueryProvider>
        <PaperProvider
          theme={paperTheme}
          settings={{
            icon: (props) => (
              <MaterialDesignIcons {...props} name={props.name as MaterialDesignIconName} />
            ),
          }}>
          <ThemeProvider value={navigationTheme}>
            <Stack>
              <Stack.Protected guard={!isLoggedIn}>
                <Stack.Screen name="(public)" options={{ headerShown: false }} />
              </Stack.Protected>

              <Stack.Protected guard={isLoggedIn}>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen
                  name="modal"
                  options={{ presentation: "modal", title: t(($) => $.navigation.modal.title) }}
                />
              </Stack.Protected>
            </Stack>
            <StatusBar style={isDark ? "light" : "dark"} />
          </ThemeProvider>
        </PaperProvider>
      </ReactQueryProvider>
    </SafeAreaProvider>
  );
}
