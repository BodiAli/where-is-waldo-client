import type { ACTION_TYPE, IllustrationType } from "../types/types";

export default function illustrationReducer(state: IllustrationType | null, action: ACTION_TYPE) {
  switch (action.type) {
    case "fetch-illustration":
      return action.payload;
    case "update-character":
      return state;
  }
}
