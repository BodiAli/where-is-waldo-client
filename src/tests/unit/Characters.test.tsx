import { render, screen } from "@testing-library/react";
import Characters from "../../components/Characters/Characters";
import type { CharacterType } from "../../types/types";

describe("Characters component", () => {
  it("should render a 'Characters to find' heading", () => {
    const mockCharacters: CharacterType[] = [
      {
        id: "waldoId",
        illustrationId: "illustrationId",
        imageSrc: "waldoImg",
        isFound: false,
        name: "Waldo",
      },
      {
        id: "wendaId",
        illustrationId: "illustrationId",
        imageSrc: "wendaImg",
        isFound: false,
        name: "Wenda",
      },
      {
        id: "wizardId",
        illustrationId: "illustrationId",
        imageSrc: "wizardImg",
        isFound: false,
        name: "Wizard",
      },
    ];

    render(<Characters characters={mockCharacters} />);

    expect(screen.getByRole("heading", { name: "Characters to find:" })).toBeInTheDocument();
  });

  it("should render characters cards", () => {
    const mockCharacters: CharacterType[] = [
      {
        id: "waldoId",
        illustrationId: "illustrationId",
        imageSrc: "waldoImg",
        isFound: false,
        name: "Waldo",
      },
      {
        id: "wendaId",
        illustrationId: "illustrationId",
        imageSrc: "wendaImg",
        isFound: false,
        name: "Wenda",
      },
      {
        id: "wizardId",
        illustrationId: "illustrationId",
        imageSrc: "wizardImg",
        isFound: false,
        name: "Wizard",
      },
    ];

    render(<Characters characters={mockCharacters} />);

    const characterImages = screen.getAllByRole("img", { name: /character/ });

    expect(characterImages.length).toBe(3);
  });

  it("should render a character card with class 'found' when a character is found", () => {
    const mockCharacters: CharacterType[] = [
      {
        id: "waldoId",
        illustrationId: "illustrationId",
        imageSrc: "waldoImg",
        isFound: true,
        name: "Waldo",
      },
      {
        id: "wendaId",
        illustrationId: "illustrationId",
        imageSrc: "wendaImg",
        isFound: false,
        name: "Wenda",
      },
      {
        id: "wizardId",
        illustrationId: "illustrationId",
        imageSrc: "wizardImg",
        isFound: false,
        name: "Wizard",
      },
    ];

    render(<Characters characters={mockCharacters} />);

    expect(screen.getByRole("img", { name: "Waldo character" })).toHaveClass(/found/);
  });
});
