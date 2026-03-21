import { config } from '@/src/lib/config';
import { supabase } from "@/lib/supabase";
import { mapSupabaseError } from "./auth.service.functions";
import { AuthServiceResult } from "./auth.service.types";

export const SUPABASE_URL = config.EXPO_PUBLIC_SUPABASE_URL;
export const SUPABASE_ANON_KEY = config.EXPO_PUBLIC_SUPABASE_ANON_KEY;





export const signInWithPassword = async (input: {
  email: string;
  password: string;
}): Promise<AuthServiceResult> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword(input);

    if (error) {
      return {
        data: null,
        error: mapSupabaseError(error),
      };
    }

    return {
      data: {
        accessToken: data.session?.access_token ?? "",
        refreshToken: data.session?.refresh_token ?? "",
        userId: data.user?.id ?? "",
      },
      error: null,
    };
  } catch {
    return {
      data: null,
      error: {
        code: 'network_error',
        message: 'Unable to reach authentication service',
      },
    };
  }
};

export const getSession = async (accessToken: string): Promise<AuthServiceResult> => {
  try {
    const { data, error } = await supabase.auth.getUser(accessToken);

    if (error) {
      return {
        data: null,
        error: {
          code: mapSupabaseError(error).code,
          message: error.message ?? "Unable to retrieve session",
        },
      };
    }

    return {
      data: {
        accessToken,
        refreshToken: "",
        userId: data.user?.id ?? "",
      },
      error: null,
    };
  } catch {
    return {
      data: null,
      error: {
        code: 'network_error',
        message: 'Unable to retrieve session',
      },
    };
  }
};