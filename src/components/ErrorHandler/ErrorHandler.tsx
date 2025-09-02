import { useRouteError } from "react-router";
import styles from "./ErrorHandler.module.css";

export default function ErrorHandler() {
  const error = useRouteError() as Error;

  return (
    <main className={styles.main}>
      <h1>Unexpected error occurred!</h1>
      <p>{error.message}</p>
      <button
        onClick={() => {
          window.location.reload();
        }}
        type="button"
      >
        Reload page
      </button>
    </main>
  );
}
