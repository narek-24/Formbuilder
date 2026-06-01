import { useEffect, useState } from "react";

type UseMediaQueryOptions = {
  /**
   * Value used during SSR and first render
   * Prevents hydration mismatch
   */
  defaultValue?: boolean;
};

export function useMediaQuery(
  query: string,
  options: UseMediaQueryOptions = {}
) {
  const { defaultValue = false } = options;

  const [matches, setMatches] = useState<boolean>(defaultValue);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQueryList = window.matchMedia(query);

    // Set initial value on client
    // eslint-disable-next-line
    setMatches(mediaQueryList.matches);

    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Modern + legacy support
    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener("change", listener);
    } else {
      mediaQueryList.addListener(listener);
    }

    return () => {
      if (mediaQueryList.removeEventListener) {
        mediaQueryList.removeEventListener("change", listener);
      } else {
        mediaQueryList.removeListener(listener);
      }
    };
  }, [query]);

  return matches;
}
