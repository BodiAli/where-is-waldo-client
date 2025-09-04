import type { MouseEvent } from "react";
import { useParams } from "react-router";
import useFetchSingleIllustration from "../../hooks/useFetchSingleIllustration";
import Loader from "../../components/Loader/Loader";
import Characters from "../../components/Characters/Characters";
import Illustration from "../../components/Illustration/Illustration";
import styles from "./IllustrationPage.module.css";

export default function IllustrationPage() {
  const { illustrationId } = useParams();

  if (!illustrationId) {
    throw new Error("Illustration not found");
  }

  const { illustration, error, loading } = useFetchSingleIllustration(`/illustrations/${illustrationId}`);

  if (loading || !illustration) return <Loader />;

  if (error) throw new Error(error.message);

  function handleClick(e: MouseEvent<HTMLImageElement>) {
    const handler = async () => {};
  }

  return (
    <main className={styles.main}>
      <Characters characters={illustration.Characters} />
      <Illustration illustration={illustration} onClick={handleClick} message={null} />
    </main>
  );
}
