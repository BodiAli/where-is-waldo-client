import { type FormEvent, type RefObject } from "react";
import { useNavigate } from "react-router";
import { SERVER_URL } from "../../types/types";
import styles from "./Modal.module.css";

export default function Modal({
  dialogRef,
  duration,
  illustrationId,
}: {
  dialogRef: RefObject<HTMLDialogElement | null>;
  duration: number | null;
  illustrationId: string;
}) {
  const navigate = useNavigate();

  const score = (duration === null ? 0 : duration / 1000).toFixed(2);

  function handleCreateScore(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name");

    const handler = async () => {
      try {
        const res = await fetch(`${SERVER_URL}/illustrations/${illustrationId}/leaderboard`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ duration, name }),
        });

        if (!res.ok) {
          throw new Error("Failed to create score, please try again.");
        }

        const { leaderboardId } = (await res.json()) as { leaderboardId: string };

        void navigate(`/leaderboards/${leaderboardId}`);
      } catch (error) {
        throw new Error((error as Error).message);
      }
    };

    void handler();
  }

  return (
    <dialog ref={dialogRef} className={styles.dialog}>
      <div className={styles.dialogContent}>
        <h2>You won!</h2>
        <p data-testid="score">It took you {score} seconds to complete.</p>
        <form onSubmit={handleCreateScore} role="form">
          <label>
            Please enter your name:
            <input type="text" name="name" autoComplete="name" />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </dialog>
  );
}
