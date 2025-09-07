import type { ACTION_TYPE, IllustrationType } from "../types/types";

export default function illustrationReducer(state: IllustrationType | null, action: ACTION_TYPE) {
  switch (action.type) {
    case "fetch-illustration": {
      return action.payload;
    }
    case "update-character": {
      if (!state) {
        throw new Error("Illustration not found");
      }
      const updatedCharacters = state.Characters.map((character) => {
        if (character.id === action.payload.id) {
          return action.payload;
        }
        return character;
      });

      return { ...state, Characters: updatedCharacters };
    }
  }
}
