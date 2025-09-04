import type { MouseEvent } from "react";
import type { IllustrationType } from "../../types/types";
import styles from "./Illustration.module.css";

export default function Illustration({
  message,
  illustration,
  onClick,
}: {
  illustration: IllustrationType;
  message: string | null;
  onClick: (e: MouseEvent<HTMLImageElement>) => void;
}) {
  return (
    <section className={styles.section}>
      <img src={illustration.imageId} alt={`${illustration.difficulty} illustration`} onClick={onClick} />
    </section>
  );
}
