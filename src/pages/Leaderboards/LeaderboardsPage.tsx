import { Link } from "react-router";
import Loader from "../../components/Loader/Loader";
import useFetchLeaderboards from "../../hooks/useFetchLeaderboards";
import type { LeaderboardsType } from "../../types/types";
import styles from "./LeaderboardsPage.module.css";

export default function LeaderboardsPage() {
  const { data, loading, error } = useFetchLeaderboards();

  if (error) {
    throw new Error(error.message);
  }

  if (loading) {
    return <Loader />;
  }

  const { leaderboards } = data as { leaderboards: LeaderboardsType };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {leaderboards.map((leaderboard) => {
          return (
            <Link className={styles.card} key={leaderboard.id} to={leaderboard.id}>
              <h2>
                {leaderboard.Illustration.difficulty.charAt(0).toUpperCase() +
                  leaderboard.Illustration.difficulty.slice(1)}{" "}
                Leaderboard
              </h2>
              <img
                src={leaderboard.Illustration.imageSrc}
                alt={`${leaderboard.Illustration.difficulty} illustration`}
              />
            </Link>
          );
        })}
      </div>
    </main>
  );
}
