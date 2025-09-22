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
      <div className={styles.container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col">Rank</th>
              <th scope="col">Name</th>
              <th scope="col">Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.Users.map((user, index) => {
              return (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{`${(user.score / 1000).toFixed(2)}s`}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
