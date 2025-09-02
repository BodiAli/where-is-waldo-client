import { useEffect, useState } from "react";
import { SERVER_URL } from "../types/types";

export default function useFetch(path: string) {
  const [data, setData] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    async function fetchData() {
      try {
        const res = await fetch(`${SERVER_URL}${path}`);

        if (!res.ok) {
          throw new Error("Failed to fetch illustrations, please try again later");
        }

        const data = (await res.json()) as unknown;

        if (!ignore) {
          setData(data);
        }
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

  return { data, loading };
}
