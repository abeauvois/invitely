import { create, StateCreator, StoreApi } from "zustand";
import { devtools } from "zustand/middleware";

import { User } from "../../types/User";

import { login, logout, me } from "./auth.service";

export interface AuthState {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  fetchMe: () => Promise<void>;
  errors: string[];
}

const store: StateCreator<AuthState> | StoreApi<AuthState> = (set) => ({
  user: null,

  login: async (email: string, password: string) => {
    try {
      const user = await login(email, password);
      set({ user, errors: [] });
    } catch (e: any) {
      console.error(e);
      set({ errors: [e?.message], user: null });
    }
  },
  logout: async () => {
    try {
      await logout();
      set({ user: null, errors: [] });
    } catch (e: any) {
      console.error(e);
      set({ errors: [e?.message], user: null });
    }
  },
  fetchMe: async () => {
    try {
      const user = await me();
      set({ user, errors: [] });
    } catch (e: any) {
      console.error(e);
      set({ errors: [e?.message], user: null });
    }
  },
  errors: [],
});

export const useAuthStore =
  process.env.NODE_ENV === "development"
    ? create(devtools(store))
    : create(store);
