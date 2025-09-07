export interface CharacterType {
  id: string;
  illustrationId: string;
  isFound: boolean;
  name: string;
  imageSrc: string;
}
export type IllustrationsType = { id: string; difficulty: "easy" | "medium" | "hard"; imageSrc: string }[];
export interface IllustrationType {
  id: string;
  difficulty: "easy" | "medium" | "hard";
  imageSrc: string;
  Characters: CharacterType[];
}
export const SERVER_URL = import.meta.env.VITE_SERVER_URL;
export type ACTION_TYPE =
  | {
      type: "fetch-illustration";
      payload: IllustrationType;
    }
  | {
      type: "update-character";
      payload: CharacterType;
    };
