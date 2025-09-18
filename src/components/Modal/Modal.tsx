import { type RefObject } from "react";
import styles from "./Modal.module.css";

export default function Modal({
  dialogRef,
  duration,
}: {
  dialogRef: RefObject<HTMLDialogElement | null>;
  duration: number | null;
}) {
  const score = (duration === null ? 0 : duration / 1000).toFixed(2);

  return (
    <dialog ref={dialogRef} className={styles.dialog}>
      <div className={styles.dialogContent}>
        <h2>You won!</h2>
        <p>It took you {score} seconds to complete!</p>
        <form>
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
