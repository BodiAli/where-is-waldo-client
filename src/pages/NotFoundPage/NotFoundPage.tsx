import { Link } from "react-router";
import styles from "./NotFound.module.css";

export default function NotFoundPage() {
  return (
    <main className={styles.main}>
      <h1>404 Not Found</h1>
      <p>
        Click <Link to="/">Here</Link> to return to Home page.
      </p>
    </main>
  );
}
