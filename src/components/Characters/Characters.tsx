import type { CharacterType } from "../../types/types";
import styles from "./Characters.module.css";

export default function Characters({ characters }: { characters: CharacterType[] }) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2>Characters to find:</h2>
        <div className={styles.charactersContainer}>
          {characters.map((character) => {
            return (
              <img
                key={character.id}
                src={character.imageSrc}
                alt={`${character.name} character`}
                className={character.isFound ? styles.found : ""}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
