import IllustrationCard from "../../components/IllustrationCard/IllustrationCard";
import Loader from "../../components/Loader/Loader";
import useFetchIllustrations from "../../hooks/useFetchIllustrations";
import type { IllustrationsType } from "../../types/types";
import styles from "./IllustrationsPage.module.css";

export default function IllustrationsPage() {
  const { data, loading, error } = useFetchIllustrations("/illustrations");

  if (error) {
    throw new Error(error.message);
  }

  if (loading) {
    return <Loader />;
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
