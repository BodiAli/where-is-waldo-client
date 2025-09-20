import { useParams } from "react-router";
import useFetchSingleLeaderboard from "../../hooks/useFetchSingleLeaderboard";
import Loader from "../../components/Loader/Loader";
import type { LeaderboardType } from "../../types/types";
import styles from "./LeaderboardPage.module.css";

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

  return (
    <main className={styles.main}>
      <h2>
        {`${
          leaderboard.Illustration.difficulty.charAt(0).toUpperCase() +
          leaderboard.Illustration.difficulty.slice(1)
        } difficulty leaderboard`}
      </h2>
      <div></div>
    </main>
  );
}
