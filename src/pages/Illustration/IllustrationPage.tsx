import { useRef, useState, type MouseEvent } from "react";
import { flushSync } from "react-dom";
import { useParams } from "react-router";
import useFetchSingleIllustration from "../../hooks/useFetchSingleIllustration";
import Loader from "../../components/Loader/Loader";
import Characters from "../../components/Characters/Characters";
import Illustration from "../../components/Illustration/Illustration";
import styles from "./IllustrationPage.module.css";
import { SERVER_URL, type CharacterType } from "../../types/types";
import getImageCoordinates from "../../utils/getImageCoordinates";

export default function IllustrationPage() {
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [isDropdownShown, setIsDropdownShown] = useState(false);
  const [imgCoordinates, setImgCoordinates] = useState<{ xPosition: number; yPosition: number } | null>(null);
  const [message, setMessage] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { illustrationId } = useParams();

  if (!illustrationId) {
    throw new Error("Illustration not found");
  }

  const { illustration, error, loading, dispatch } = useFetchSingleIllustration(
    `/illustrations/${illustrationId}`
  );

  if (loading || !illustration) return <Loader />;

  if (error) throw new Error(error.message);

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

    type StripReadonly<TObj> = {
      -readonly [K in keyof TObj]: TObj[K];
    };
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
    const { characterid: characterId } = e.currentTarget.dataset;

    if (!illustration) {
      throw new Error("Illustration not found");
    }
    if (!characterId) {
      throw new Error("Character not found");
    }

    const handler = async () => {
      try {
        const res = await fetch(`${SERVER_URL}/illustrations/${illustration.id}/${characterId}`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(imgCoordinates),
        });

        if (!res.ok) {
          const { error } = (await res.json()) as { error: string };

          setMessage(error);
          return;
        }

        const { character, msg } = (await res.json()) as {
          character: CharacterType;
          msg: string;
        };

        dispatch({ type: "update-character", payload: character });
        setMessage(msg);
      } catch (error) {
        throw new Error((error as Error).message);
      }
    };

    void handler();
  }

  return (
    <main className={styles.main}>
      <Characters characters={illustration.Characters} />
      <hr />
      <Illustration
        illustration={illustration}
        onShowDropdown={handleShowDropdown}
        onClickCharacterCard={handleValidateCharacter}
        dropdownPosition={dropdownPosition}
        dropdownRef={dropdownRef}
        isDropdownShown={isDropdownShown}
        message={message}
      />
    </main>
  );
}
