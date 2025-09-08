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
  illustrationSectionRef,
  messageRef,
  messagePosition,
}: {
  illustration: IllustrationType;
  message: { content: string; color: string };
  onShowDropdown: (e: MouseEvent<HTMLImageElement>) => void;
  onClickCharacterCard: (e: MouseEvent<HTMLDivElement>) => void;
  dropdownPosition: { top: number; left: number };
  dropdownRef: Ref<HTMLDivElement>;
  isDropdownShown: boolean;
  illustrationSectionRef: Ref<HTMLElement>;
  messageRef: Ref<HTMLParagraphElement>;
  messagePosition: { top: number; left: number };
}) {
  return (
    <section ref={illustrationSectionRef} className={styles.section}>
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
                data-characterid={character.id}
              >
                <img src={character.imageSrc} alt={`${character.name} character`} />
                <p>{character.name}</p>
              </div>
            );
          })}
        </ul>
      </div>
      <img
        src={illustration.imageSrc}
        alt={`${illustration.difficulty} illustration`}
        onClick={onShowDropdown}
      />

      <p
        ref={messageRef}
        className={`${styles.message} ${message.content ? styles.show : ""}`}
        style={{ left: messagePosition.left, top: messagePosition.top, backgroundColor: message.color }}
      >
        {message.content}
      </p>
    </section>
  );
}
