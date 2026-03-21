import type { AuthError } from "@supabase/supabase-js";
import { ValidationError } from "yup";

import { supabase } from "@/lib/supabase";
import { signInDtoSchema, signUpDtoSchema } from "./auth.service.schemas";
import type {
  AuthSessionPayload,
  ServiceError,
  ServiceResult,
  SignInWithEmailDto,
  SignUpDto,
} from "./auth.service.types";

function mapAuthError(error: AuthError): ServiceError {
  const normalizedMessage = error.message.toLowerCase();

  if (error.status === 400 && normalizedMessage.includes("invalid login credentials")) {
    return {
      code: "INVALID_CREDENTIALS",
      message: "Enterprise credentials are invalid.",
    };
  }

  if (error.status === 422 && normalizedMessage.includes("already registered")) {
    return {
      code: "EMAIL_ALREADY_REGISTERED",
      message: "Enterprise identity already exists.",
    };
  }

  if (
    error.status === 401 ||
    normalizedMessage.includes("jwt") ||
    normalizedMessage.includes("unauthorized")
  ) {
    return {
      code: "UNAUTHORIZED",
      message: "Enterprise access is not authorized.",
    };
  }

  if (normalizedMessage.includes("network") || normalizedMessage.includes("fetch")) {
    return {
      code: "NETWORK_ERROR",
      message: "Network error while contacting authentication service.",
    };
  }

  return {
    code: "UNKNOWN_AUTH_ERROR",
    message: error.message,
  };
}

function invalidInput(message: string): ServiceResult<never> {
  return {
    data: null,
    error: {
      code: "INVALID_INPUT",
      message,
    },
  };
}

export async function signInWithEmail(
  payload: SignInWithEmailDto,
): Promise<ServiceResult<AuthSessionPayload>> {
  let parsedPayload: SignInWithEmailDto;

  try {
    parsedPayload = await signInDtoSchema.validate(payload, {
      abortEarly: false,
      stripUnknown: true,
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return invalidInput(error.errors.join("; "));
    }

    return invalidInput("Invalid request payload.");
  }

  const { data, error } = await supabase.auth.signInWithPassword(parsedPayload);

  if (error) {
    return {
      data: null,
      error: mapAuthError(error),
    };
  }

  return {
    data: {
      user: data.user,
      session: data.session,
    },
    error: null,
  };
}

export async function signUp(payload: SignUpDto): Promise<ServiceResult<AuthSessionPayload>> {
  let parsedPayload: SignUpDto;

  try {
    parsedPayload = await signUpDtoSchema.validate(payload, {
      abortEarly: false,
      stripUnknown: true,
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return invalidInput(error.errors.join("; "));
    }

    return invalidInput("Invalid request payload.");
  }

  const { data, error } = await supabase.auth.signUp(parsedPayload);

  if (error) {
    return {
      data: null,
      error: mapAuthError(error),
    };
  }

  return {
    data: {
      user: data.user,
      session: data.session,
    },
    error: null,
  };
}

export async function signOut(): Promise<ServiceResult<true>> {
  const { error } = await supabase.auth.signOut();

  if (error) {
    return {
      data: null,
      error: mapAuthError(error),
    };
  }

  return {
    data: true,
    error: null,
  };
}

export async function getSession(): Promise<ServiceResult<AuthSessionPayload>> {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    return {
      data: null,
      error: mapAuthError(error),
    };
  }

  return {
    data: {
      user: data.session?.user ?? null,
      session: data.session,
    },
    error: null,
  };
}
