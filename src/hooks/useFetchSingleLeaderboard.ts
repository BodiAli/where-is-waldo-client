import { useState, useEffect } from "react";
import { SERVER_URL } from "../types/types";

export default function useFetchSingleLeaderboard(leaderboardId: string) {
  const [data, setData] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let ignore = false;

    async function fetchLeaderboard() {
      try {
        const res = await fetch(`${SERVER_URL}/leaderboards/${leaderboardId}`);
        if (!res.ok) {
          if (res.status === 404) {
            const { error } = (await res.json()) as { error: string };
            throw new Error(error);
          }
          throw new Error("Failed to fetch leaderboard, please try again later.");
        }

        const data = (await res.json()) as unknown;
        if (!ignore) {
          setData(data);
        }
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    }

    void fetchLeaderboard();

    return () => {
      ignore = true;
    };
  }, [leaderboardId]);

  return { data, loading, error };
}
