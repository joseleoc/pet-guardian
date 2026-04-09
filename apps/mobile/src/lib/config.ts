import * as yup from "yup";

export const envSchema = yup.object({
  EXPO_PUBLIC_ENVIRONMENT: yup
    .string()
    .oneOf(
      ["development", "production", "test"],
      "EXPO_PUBLIC_ENVIRONMENT must be one of 'development', 'production', or 'test'",
    )
    .required("EXPO_PUBLIC_ENVIRONMENT is required"),
  EXPO_PUBLIC_SUPABASE_URL: yup
    .string()
    .required("EXPO_PUBLIC_SUPABASE_URL is required")
    .min(1, "EXPO_PUBLIC_SUPABASE_URL cannot be empty")
    .test(
      "valid-url-or-localhost",
      "EXPO_PUBLIC_SUPABASE_URL must be a valid URL or localhost",
      function (value) {
        if (!value) return false;
        const { EXPO_PUBLIC_ENVIRONMENT } = this.parent;
        try {
          new URL(value);
          return true;
        } catch {
          return (
            EXPO_PUBLIC_ENVIRONMENT === "development" &&
            value.includes("localhost")
          );
        }
      },
    ),
  EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY: yup
    .string()
    .required("EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY is required")
    .min(1, "EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY cannot be empty"),
  EXPO_PUBLIC_API_URL: yup
    .string()
    .min(1, "EXPO_PUBLIC_API_URL cannot be empty")
    .required("EXPO_PUBLIC_API_URL is required")
    .test(
      "valid-url-or-localhost",
      "EXPO_PUBLIC_API_URL must be a valid URL or localhost",
      function (value) {
        if (!value) return false;
        const { EXPO_PUBLIC_ENVIRONMENT } = this.parent;
        try {
          new URL(value);
          return true;
        } catch {
          return (
            EXPO_PUBLIC_ENVIRONMENT === "development" &&
            value.includes("localhost")
          );
        }
      },
    ),
});

let parsedEnv: yup.InferType<typeof envSchema>;

try {
  parsedEnv = envSchema.validateSync(process.env, {
    abortEarly: false,
    stripUnknown: false,
  });
} catch (error) {
  if (error instanceof yup.ValidationError) {
    const allIssues = error.inner.length > 0 ? error.inner : [error];
    const issuesByVariable = new Map<string, string>();

    for (const issue of allIssues) {
      const variableName = issue.path ?? "unknown";
      if (!issuesByVariable.has(variableName)) {
        issuesByVariable.set(variableName, issue.message);
      }
    }

    throw new Error(
      [
        "Invalid environment configuration.",
        ...Array.from(issuesByVariable.entries()).map(
          ([variableName, message]) => `- ${variableName}: ${message}`,
        ),
      ].join("\n"),
    );
  }

  throw error;
}

export const config = parsedEnv;
