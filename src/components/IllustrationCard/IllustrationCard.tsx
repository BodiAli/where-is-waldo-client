import { useNavigate } from "react-router";
import type { IllustrationType } from "../../types/types";
import styles from "./IllustrationCard.module.css";

export default function IllustrationCard({ id, imageSrc, difficulty }: Omit<IllustrationType, "Characters">) {
  const navigate = useNavigate();

  return (
    <div className={styles.card}>
      <h2>{difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</h2>
      <img src={imageSrc} alt={`${difficulty} illustration`} />
      <button
        type="button"
        onClick={() => {
          void navigate(`/illustrations/${id}`);
        }}
      >
        Start
      </button>
    </div>
  );
}
