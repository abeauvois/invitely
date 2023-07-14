import { useState, useEffect } from "react";

export const useMediaQueries = <T>(
  queries: string[],
  values: T[],
  defaultValue: T,
): T => {
  const mediaQueryLists = queries.map((q) =>
    window?.matchMedia?.(q.replace(/^@media( ?)/m, "").trim()),
  );

  const getValue = (): T => {
    const index = mediaQueryLists.findIndex((mql) => mql.matches);
    return values?.[index] ?? defaultValue;
  };

  const [value, setValue] = useState<T>(getValue);

  // Wait for jsdom to support the match media feature.
  const supportMatchMedia =
    typeof window !== "undefined" && typeof window.matchMedia !== "undefined";

  useEffect(
    () => {
      let active = true;

      if (!supportMatchMedia) {
        return undefined;
      }

      const updateValue = (): void => {
        // Workaround Safari wrong implementation of matchMedia
        if (active) {
          setValue(getValue);
        }
      };

      mediaQueryLists.forEach((mql) =>
        mql.addEventListener("change", updateValue),
      );

      return (): void => {
        active = false;
        mediaQueryLists.forEach((mql) =>
          mql.removeEventListener("change", updateValue),
        );
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return value;
};
