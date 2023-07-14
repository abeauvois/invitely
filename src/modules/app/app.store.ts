import { create, StateCreator, StoreApi } from "zustand";
import { devtools } from "zustand/middleware";

interface AppState {
  isReady: boolean;
  setReady: () => void;
}

const store: StateCreator<AppState> | StoreApi<AppState> = (set) => ({
  isReady: false,
  setReady: () => set({ isReady: true }),
});

export const useAppStore =
  process.env.NODE_ENV === "development"
    ? create(devtools(store))
    : create(store);
