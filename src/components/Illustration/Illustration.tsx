import type { MouseEvent, Ref } from "react";
import type { IllustrationType } from "../../types/types";
import styles from "./Illustration.module.css";

export default function Illustration({
  message,
  illustration,
  onShowDropdown,
  onClickCharacterCard,
  dropdownPosition,
  dropdownRef,
  isDropdownShown,
}: {
  illustration: IllustrationType;
  message: string | null;
  onShowDropdown: (e: MouseEvent<HTMLImageElement>) => void;
  onClickCharacterCard: (e: MouseEvent<HTMLDivElement>) => void;
  dropdownPosition: { top: number; left: number };
  dropdownRef: Ref<HTMLDivElement>;
  isDropdownShown: boolean;
}) {
  return (
    <section className={styles.section}>
      <div
        ref={dropdownRef}
        className={`${styles.dropdown} ${isDropdownShown ? styles.shown : ""}`}
        style={{
          left: dropdownPosition.left,
          top: dropdownPosition.top,
          // Hide element using inline styles because jsdom fails to load stylesheets hence the "toBeVisible" assertion returns false positives
          display: isDropdownShown ? "block" : "none",
        }}
        data-testid="characters-dropdown"
      >
        <ul>
          {illustration.Characters.map((character) => {
            return (
              <div
                key={character.id}
                className={styles.characterCard}
                onClick={onClickCharacterCard}
                data-testid="character-card"
              >
                <img src={character.imageSrc} alt={`${character.name} character`} />
                <p>{character.name}</p>
              </div>
            );
          })}
        </ul>
      </div>
      <img
        src={illustration.imageId}
        alt={`${illustration.difficulty} illustration`}
        onClick={onShowDropdown}
      />
    </section>
  );
}
