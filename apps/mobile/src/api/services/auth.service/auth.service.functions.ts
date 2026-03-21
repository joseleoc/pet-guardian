import { AuthErrorCode } from "../auth.service.types";
import { AuthServiceResult } from "./auth.service.types";

export const mapSupabaseErrorCode = (errorCode?: string): AuthErrorCode => {
  if (errorCode === "invalid_grant" || errorCode === "invalid_credentials") {
    return "INVALID_CREDENTIALS";
  }

  return 'UNKNOWN_AUTH_ERROR';
};

export const mapSupabaseError = (error: {
  code?: string;
  message?: string;
}): AuthServiceResult["error"] => {
  const normalizedMessage = (error.message ?? "").toLowerCase();

  if (
    mapSupabaseErrorCode(error.code) === "invalid_credentials" ||
    normalizedMessage.includes("invalid login credentials")
  ) {
    return {
      code: "invalid_credentials",
      message: error.message ?? "Invalid user credentials",
    };
  }

  if (
    normalizedMessage.includes("network") ||
    normalizedMessage.includes("fetch") ||
    normalizedMessage.includes("failed to fetch")
  ) {
    return {
      code: "network_error",
      message: error.message ?? "Unable to reach authentication service",
    };
  }

  return {
    code: "unknown",
    message: error.message ?? "Authentication request failed",
  };
};