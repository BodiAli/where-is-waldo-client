import IllustrationCard from "../../components/IllustrationCard/IllustrationCard";
import Loader from "../../components/Loader/Loader";
import useFetch from "../../hooks/useFetch";
import type { IllustrationsType } from "../../types/types";
import styles from "./IllustrationsPage.module.css";

export default function IllustrationsPage() {
  const { data, loading, error } = useFetch("/illustrations");

  if (loading) {
    return <Loader />;
  }

  if (error) {
    throw new Error(error.message);
  }

  const { illustrations } = data as { illustrations: IllustrationsType };

  return (
    <main className={styles.main}>
      <h1>Where's Waldo (Photo Tagging Game)</h1>
      <section className={styles.cardsContainer}>
        {illustrations.map((illustration) => {
          return <IllustrationCard key={illustration.id} {...illustration} />;
        })}
      </section>
    </main>
  );
}
