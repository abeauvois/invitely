import { create, StateCreator, StoreApi } from "zustand";
import { devtools } from "zustand/middleware";

import { User } from "../../types/User";

import { login, logout, me } from "./auth.service";

export interface AuthState {
  user: User | null;
  isConnected: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  fetchMe: () => Promise<void>;
  errors: string[];
}

const store: StateCreator<AuthState> | StoreApi<AuthState> = (set) => ({
  user: null,
  isConnected: document.cookie.includes(
    process.env.SUPERVAN_SESSION_COOKIE_NAME as string,
  ),
  login: async (email: string, password: string) => {
    try {
      const user = await login(email, password);
      set({ user, isConnected: true, errors: [] });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      // eslint-disable-next-line no-console
      console.error(e);
      set({ errors: [e?.message], isConnected: false, user: null });
    }
  },
  logout: async () => {
    try {
      await logout();
      set({ user: null, isConnected: false, errors: [] });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      // eslint-disable-next-line no-console
      console.error(e);
      set({ errors: [e?.message], isConnected: false, user: null });
    }
  },
  fetchMe: async () => {
    try {
      const user = await me();
      set({ user, isConnected: true, errors: [] });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      // eslint-disable-next-line no-console
      console.error(e);
      set({ errors: [e?.message], isConnected: false, user: null });
    }
  },
  errors: [],
});

export const useAuthStore =
  process.env.NODE_ENV === "development"
    ? create(devtools(store))
    : create(store);
