import type { MouseEvent, Ref } from "react";
import type { IllustrationType } from "../../types/types";
import styles from "./Illustration.module.css";

export default function Illustration({
  message,
  illustration,
  onShowDropdown,
  onClickDropdown,
  dropdownPosition,
  dropdownRef,
}: {
  illustration: IllustrationType;
  message: string | null;
  onShowDropdown: (e: MouseEvent<HTMLImageElement>) => void;
  onClickDropdown: (e: MouseEvent<HTMLDivElement>) => void;
  dropdownPosition: { top: number; left: number };
  dropdownRef: Ref<HTMLDivElement>;
}) {
  return (
    <section className={styles.section}>
      <div
        ref={dropdownRef}
        className={styles.dropdown}
        style={{ left: dropdownPosition.left, top: dropdownPosition.top }}
      >
        <ul>
          {illustration.Characters.map((character) => {
            return (
              <div key={character.id} className={styles.characterCard} onClick={onClickDropdown}>
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
