import { useParams } from "react-router";
import useFetchSingleLeaderboard from "../../hooks/useFetchSingleLeaderboard";
import Loader from "../../components/Loader/Loader";
import type { LeaderboardType } from "../../types/types";

export default function LeaderboardPage() {
  const { leaderboardId } = useParams();

  if (!leaderboardId) {
    throw new Error("Leaderboard not found");
  }

  const { data, loading, error } = useFetchSingleLeaderboard(leaderboardId);

  if (error) {
    throw new Error(error.message);
  }

  if (loading) {
    return <Loader />;
  }

  const { leaderboard } = data as { leaderboard: LeaderboardType };

  return <main></main>;
}
