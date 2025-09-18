import { useRef, useState, type MouseEvent } from "react";
import { flushSync } from "react-dom";
import { useParams } from "react-router";
import useFetchSingleIllustration from "../../hooks/useFetchSingleIllustration";
import Loader from "../../components/Loader/Loader";
import Characters from "../../components/Characters/Characters";
import Illustration from "../../components/Illustration/Illustration";
import Modal from "../../components/Modal/Modal";
import { SERVER_URL, type CharacterType } from "../../types/types";
import getImageCoordinates from "../../utils/getImageCoordinates";
import styles from "./IllustrationPage.module.css";

type StripReadonly<TObj> = {
  -readonly [K in keyof TObj]: TObj[K];
};

export default function IllustrationPage() {
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [isDropdownShown, setIsDropdownShown] = useState(false);
  const [imgCoordinates, setImgCoordinates] = useState<{ xPosition: number; yPosition: number } | null>(null);
  const [message, setMessage] = useState<{
    content: string;
    color: "crimson" | "green" | "";
  }>({
    content: "",
    color: "",
  });
  const [messagePosition, setMessagePosition] = useState({ top: 0, left: 0 });
  const [duration, setDuration] = useState<number | null>(null);
  const [isGameWon, setIsGameWon] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const illustrationSectionRef = useRef<HTMLElement>(null);
  const messageRef = useRef<HTMLParagraphElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const { illustrationId } = useParams();

  if (!illustrationId) {
    throw new Error("Illustration not found");
  }

  const { illustration, error, loading, dispatch } = useFetchSingleIllustration(
    `/illustrations/${illustrationId}`
  );

  if (error) throw new Error(error.message);

  if (loading || !illustration) return <Loader />;

  function handleShowDropdown(e: MouseEvent<HTMLImageElement>) {
    if (!dropdownRef.current) {
      throw new Error("Dropdown is null");
    }

    if (isDropdownShown) {
      setIsDropdownShown(false);
      // Return early because it's unnecessary for the rest of the function to run if dropdown is hidden
      return;
    }

    const { imgX, imgY } = getImageCoordinates(e);

    setImgCoordinates({ xPosition: imgX, yPosition: imgY });
    setIsDropdownShown(true);

    const imgRect = e.currentTarget.getBoundingClientRect();

    const mousePositionXInsideImg = e.clientX - imgRect.left;
    const mousePositionYInsideImg = e.clientY - imgRect.top;

    /* eslint-disable-next-line @eslint-react/dom/no-flush-sync --
     * flushSync is necessary to get the updated dropdown bounding client rect positions after the dropdown position is updated,
     * otherwise it will get the old position. (e.g., left position)
     **/
    flushSync(() => {
      // + or - Number in setting position is to give room for the cursor.
      setDropdownPosition({ left: mousePositionXInsideImg + 5, top: mousePositionYInsideImg + 5 });
    });

    const dropdownRect = dropdownRef.current.getBoundingClientRect();

    const dropdownRectRelativeToImage: Pick<StripReadonly<typeof dropdownRect>, "right" | "bottom"> = {
      bottom: dropdownRect.bottom - imgRect.bottom,
      right: dropdownRect.right - imgRect.right,
    };

    if (dropdownRectRelativeToImage.right >= 0 && dropdownRectRelativeToImage.bottom >= 0) {
      setDropdownPosition({
        left: mousePositionXInsideImg - dropdownRect.width - 5,
        top: mousePositionYInsideImg - dropdownRect.height - 5,
      });
      return;
    }

    if (dropdownRectRelativeToImage.right >= 0) {
      setDropdownPosition({
        left: mousePositionXInsideImg - dropdownRect.width - 5,
        top: mousePositionYInsideImg + 5,
      });
      return;
    }

    if (dropdownRectRelativeToImage.bottom >= 0) {
      setDropdownPosition({
        left: mousePositionXInsideImg + 5,
        top: mousePositionYInsideImg - dropdownRect.height - 5,
      });
      return;
    }
  }

  function handleValidateCharacter(e: MouseEvent<HTMLDivElement>) {
    setIsDropdownShown(false);

    const { characterid: characterId } = e.currentTarget.dataset;

    if (!illustration) {
      throw new Error("Illustration not found");
    }
    if (!characterId) {
      throw new Error("Character not found");
    }
    if (!imgCoordinates) {
      throw new Error("Image coordinates not found");
    }
    if (!illustrationSectionRef.current) {
      throw new Error("Illustration section not found");
    }
    if (!messageRef.current) {
      throw new Error("Message ref not found");
    }

    const illustrationSectionRect = illustrationSectionRef.current.getBoundingClientRect();
    const mousePositionInsideSection = {
      x: e.clientX - illustrationSectionRect.left,
      y: e.clientY - illustrationSectionRect.top,
    };

    /* eslint-disable-next-line @eslint-react/dom/no-flush-sync --
     * flushSync is necessary to get the updated message bounding client rect positions after the character card is clicked,
     * otherwise it will get the old position. (e.g., left position)
     **/
    flushSync(() => {
      setMessagePosition({ left: mousePositionInsideSection.x, top: mousePositionInsideSection.y - 50 });
    });

    const messageRect = messageRef.current.getBoundingClientRect();

    const messageRectRelativeToSection: Pick<StripReadonly<typeof messageRect>, "bottom" | "right"> = {
      bottom: messageRect.bottom - illustrationSectionRect.bottom,
      right: messageRect.right - illustrationSectionRect.right,
    };

    if (messageRectRelativeToSection.right >= 0) {
      setMessagePosition({
        left: mousePositionInsideSection.x - messageRect.width - 40,
        top: mousePositionInsideSection.y - 50,
      });
    }

    setMessage({
      color: "",
      content: "",
    });

    const handler = async () => {
      if (!dialogRef.current) {
        throw new Error("Dialog ref not found");
      }

      try {
        const res = await fetch(`${SERVER_URL}/illustrations/${illustration.id}/${characterId}`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(imgCoordinates),
        });

        if (!res.ok) {
          const { error } = (await res.json()) as { error: string };
          setMessage({
            content: error,
            color: "crimson",
          });
          return;
        }

        const { character, msg, success, duration } = (await res.json()) as {
          character: CharacterType;
          msg: string;
          success: boolean;
          duration?: number;
        };

        // The server sends duration only if game is won.
        if (duration) {
          setDuration(duration);
          dialogRef.current.showModal();
          setIsGameWon(true);
          return;
        }

        if (success) {
          dispatch({ type: "update-character", payload: character });
          setMessage({
            content: msg,
            color: "green",
          });
          return;
        }

        setMessage({
          content: msg,
          color: "crimson",
        });
      } catch (error) {
        throw new Error((error as Error).message);
      }
    };

    void handler();
  }

  return (
    <main className={styles.main}>
      {!isGameWon && (
        <>
          <Characters characters={illustration.Characters} />
          <hr />
          <Illustration
            illustration={illustration}
            onShowDropdown={handleShowDropdown}
            onClickCharacterCard={handleValidateCharacter}
            dropdownPosition={dropdownPosition}
            dropdownRef={dropdownRef}
            isDropdownShown={isDropdownShown}
            illustrationSectionRef={illustrationSectionRef}
            messageRef={messageRef}
            message={message}
            messagePosition={messagePosition}
          />
        </>
      )}
      <Modal dialogRef={dialogRef} duration={duration} />
    </main>
  );
}
