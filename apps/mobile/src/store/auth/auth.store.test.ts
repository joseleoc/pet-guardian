import { describe, it, expect, beforeEach, vi } from "vitest";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuthStore } from "./auth.store";
import { UserBuilder } from "@/src/tests/builders/user.builder";


vi.mock("@react-native-async-storage/async-storage", () => ({
  default: {
    setItem: vi.fn(),
    getItem: vi.fn(),
    removeItem: vi.fn(),
  },
}));

describe("useAuthStore", () => {
  beforeEach(() => {
    useAuthStore.setState({
      user: null,
      session: null,
      isAuthenticated: false,
      isLoading: true,
    });
  });

  it("sets session and updates state", () => {
    const user = new UserBuilder().withEmail("fintech-1@enterprise.com").build();
    useAuthStore.getState().setSession({ user, session: { token: "abc" } });
    const state = useAuthStore.getState();
    expect(state.user).toEqual(user);
    expect(state.session).toEqual({ token: "abc" });
    expect(state.isAuthenticated).toBe(true);
    expect(state.isLoading).toBe(false);
  });

  it("clears session and resets state", () => {
    const user = new UserBuilder().withEmail("fintech-1@enterprise.com").build();
    useAuthStore.getState().setSession({ user, session: { token: "abc" } });
    useAuthStore.getState().clearSession();
    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.session).toBeNull();
    expect(state.isAuthenticated).toBe(false);
    expect(state.isLoading).toBe(false);
  });

  it("persists state to AsyncStorage", async () => {
    const user = new UserBuilder().withEmail("fintech-2@enterprise.com").build();
    useAuthStore.getState().setSession({ user, session: { token: "xyz" } });
    expect(AsyncStorage.setItem).toHaveBeenCalled();
  });
});
