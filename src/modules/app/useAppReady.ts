import { useInsertionEffect } from "react";

import { useAuthStore } from "../auth/auth.store";

import { useAppStore } from "./app.store";

export function useAppReady() {
  const { isReady, setReady } = useAppStore();

  const { fetchMe, isConnected } = useAuthStore();

  useInsertionEffect(() => {
    if (!isReady && isConnected) {
      fetchMe().then(() => {
        if (!isReady) {
          setReady();
        }
      });
    } else {
      setReady();
    }
  }, []);
}
