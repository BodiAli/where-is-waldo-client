import { useEffect, useReducer, useState } from "react";
import { SERVER_URL, type IllustrationType } from "../types/types";
import illustrationReducer from "../utils/illustrationReducer";
import waldoIcon from "../assets/images/waldo-icon.png";
import wendaIcon from "../assets/images/wenda-icon.png";
import wizardIcon from "../assets/images/wizard-icon.png";

export default function useFetchIllustrations(path: string) {
  const [illustration, dispatch] = useReducer(illustrationReducer, null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let ignore = false;
    async function fetchData() {
      try {
        const res = await fetch(`${SERVER_URL}${path}`);

        if (!res.ok) {
          if (res.status === 404) {
            const { error } = (await res.json()) as { error: string };

            throw new Error(error);
          }
          throw new Error("Failed to fetch illustration, please try again later");
        }

        const { illustration } = (await res.json()) as { illustration: IllustrationType };

        const updatedCharacters = illustration.Characters.map((character) => {
          if (character.name === "Waldo") {
            return { ...character, imageSrc: waldoIcon };
          }
          if (character.name === "Wenda") {
            return { ...character, imageSrc: wendaIcon };
          }
          if (character.name === "Wizard") {
            return { ...character, imageSrc: wizardIcon };
          }
          return character;
        });

        if (!ignore) {
          dispatch({
            type: "fetch-illustration",
            payload: { ...illustration, Characters: updatedCharacters },
          });
        }
      } catch (error) {
        setError(error as Error);
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    void fetchData();

    return () => {
      ignore = true;
    };
  }, [path]);

  return { illustration, loading, error, dispatch };
}
