import { useEffect, useRef } from "react";

import { useAuthStore } from "./auth.store";

const FETCH_ME_INTERVAL = 1_000 * 60 * 5; // 5 minutes

export function useKeepAliveCookie() {
  const fetchMeInterval = useRef<NodeJS.Timeout>();
  const { isConnected, fetchMe } = useAuthStore();

  useEffect(() => {
    if (isConnected && !fetchMeInterval.current) {
      fetchMeInterval.current = setInterval(() => {
        fetchMe();
      }, FETCH_ME_INTERVAL);
    }

    if (!isConnected && fetchMeInterval.current) {
      clearInterval(fetchMeInterval.current);
    }

    return () => {
      clearInterval(fetchMeInterval.current);
      fetchMeInterval.current = undefined;
    };
  }, [isConnected, fetchMeInterval]);
}
