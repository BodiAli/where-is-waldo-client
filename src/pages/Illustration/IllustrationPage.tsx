import { useParams } from "react-router";
import useFetchSingleIllustration from "../../hooks/useFetchSingleIllustration";
import Loader from "../../components/Loader/Loader";
import styles from "./IllustrationPage.module.css";

export default function IllustrationPage() {
  const { illustrationId } = useParams();

  if (!illustrationId) {
    throw new Error("Illustration not found");
  }

  const { illustration, error, loading } = useFetchSingleIllustration(`/illustrations/${illustrationId}`);

  if (loading || !illustration) return <Loader />;

  if (error) throw new Error(error.message);

  console.log(illustration);

  return <main className={styles.main}></main>;
}
