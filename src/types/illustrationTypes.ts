export interface CharacterType {
  id: string;
  illustrationId: string;
  isFound: boolean;
  name: string;
}

export type IllustrationsType = { id: string; difficulty: "easy" | "medium" | "hard"; imageId: string }[];

export interface IllustrationType {
  id: string;
  difficulty: "easy" | "medium" | "hard";
  imageId: string;
  Characters: CharacterType[];
}
