import { Stack } from "expo-router";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return <Stack>
    <Stack.Screen name="index" options={{ headerShown: false }} />
    <Stack.Screen name="signin" options={{ headerShown: false }} />
    <Stack.Screen name="signup" options={{ headerShown: false }} />
    <Stack.Screen name="forgot-password" options={{ headerShown: false }} />
  </Stack>;
}