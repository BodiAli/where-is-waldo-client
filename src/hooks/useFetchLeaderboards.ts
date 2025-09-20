import { useEffect, useState } from "react";
import { SERVER_URL } from "../types/types";

export default function useFetchLeaderboards() {
  const [data, setData] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchLeaderboards() {
      try {
        const res = await fetch(`${SERVER_URL}/leaderboards`);

        if (!res.ok) {
          throw new Error("Failed to fetch leaderboards, please try again later.");
        }

        const data = (await res.json()) as unknown;

        setData(data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    }

    void fetchLeaderboards();
  }, []);

  return { data, loading, error };
}
