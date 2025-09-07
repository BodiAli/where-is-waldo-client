import { useEffect, useReducer, useState } from "react";
import { SERVER_URL, type IllustrationType } from "../types/types";
import illustrationReducer from "../utils/illustrationReducer";

export default function useFetchIllustrations(path: string) {
  const [illustration, dispatch] = useReducer(illustrationReducer, null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let ignore = false;
    async function fetchData() {
      try {
        const res = await fetch(`${SERVER_URL}${path}`);

        if (!res.ok) {
          if (res.status === 404) {
            const { error } = (await res.json()) as { error: string };

            throw new Error(error);
          }
          throw new Error("Failed to fetch illustration, please try again later");
        }

        const { illustration } = (await res.json()) as { illustration: IllustrationType };

        if (!ignore) {
          dispatch({
            type: "fetch-illustration",
            payload: illustration,
          });
        }
      } catch (error) {
        setError(error as Error);
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    void fetchData();

    return () => {
      ignore = true;
    };
  }, [path]);

  return { illustration, loading, error, dispatch };
}
