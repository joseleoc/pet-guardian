import { Redirect } from "expo-router";

export default function PublicIndex() {
  // Redirect to sign in by default
  return <Redirect href="/(public)/signin" />;
}
