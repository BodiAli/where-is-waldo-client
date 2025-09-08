import { render, screen } from "@testing-library/react";
import type { RefObject } from "react";
import userEvent from "@testing-library/user-event";
import Illustration from "../../components/Illustration/Illustration";
import type { IllustrationType } from "../../types/types";

describe("Illustration component", () => {
  it("should render illustration", () => {
    const mockIllustration: IllustrationType = {
      difficulty: "medium",
      imageSrc: "imageSrc",
      id: "illustrationId",
      Characters: [
        {
          id: "waldoId",
          illustrationId: "illustrationId",
          isFound: false,
          name: "Waldo",
          imageSrc: "waldoImg",
        },
        {
          id: "wendaId",
          illustrationId: "illustrationId",
          isFound: false,
          name: "Wenda",
          imageSrc: "wendaImg",
        },
        {
          id: "wizardId",
          illustrationId: "illustrationId",
          isFound: false,
          name: "Wizard",
          imageSrc: "wizardImg",
        },
      ],
    };

    const dropdownRef: RefObject<HTMLDivElement> = {
      current: document.createElement("div"),
    };

    const illustrationSectionRef: RefObject<HTMLElement> = {
      current: document.createElement("section"),
    };

    const messageRef: RefObject<HTMLParagraphElement> = {
      current: document.createElement("p"),
    };

    const mockHandleImgClick = vi.fn();
    const mockHandleValidateCardClick = vi.fn();

    render(
      <Illustration
        illustration={mockIllustration}
        onShowDropdown={mockHandleImgClick}
        message={{ color: "", content: "" }}
        dropdownPosition={{ left: 0, top: 0 }}
        dropdownRef={dropdownRef}
        isDropdownShown={false}
        onClickCharacterCard={mockHandleValidateCardClick}
        illustrationSectionRef={illustrationSectionRef}
        messagePosition={{ left: 0, top: 0 }}
        messageRef={messageRef}
      />
    );

    expect(screen.getByRole("img", { name: "medium illustration" })).toBeInTheDocument();
  });

  it("should call onClickImg prop when image is clicked", async () => {
    const user = userEvent.setup();

    const mockIllustration: IllustrationType = {
      difficulty: "medium",
      imageSrc: "imageSrc",
      id: "illustrationId",
      Characters: [
        {
          id: "waldoId",
          illustrationId: "illustrationId",
          isFound: false,
          name: "Waldo",
          imageSrc: "waldoImg",
        },
        {
          id: "wendaId",
          illustrationId: "illustrationId",
          isFound: false,
          name: "Wenda",
          imageSrc: "wendaImg",
        },
        {
          id: "wizardId",
          illustrationId: "illustrationId",
          isFound: false,
          name: "Wizard",
          imageSrc: "wizardImg",
        },
      ],
    };

    const dropdownRef: RefObject<HTMLDivElement> = {
      current: document.createElement("div"),
    };
    const illustrationSectionRef: RefObject<HTMLElement> = {
      current: document.createElement("section"),
    };

    const messageRef: RefObject<HTMLParagraphElement> = {
      current: document.createElement("p"),
    };

    const mockHandleImgClick = vi.fn();
    const mockHandleValidateCardClick = vi.fn();

    render(
      <Illustration
        illustration={mockIllustration}
        onShowDropdown={mockHandleImgClick}
        message={{ color: "", content: "" }}
        dropdownPosition={{ left: 0, top: 0 }}
        dropdownRef={dropdownRef}
        isDropdownShown={false}
        onClickCharacterCard={mockHandleValidateCardClick}
        illustrationSectionRef={illustrationSectionRef}
        messagePosition={{ left: 0, top: 0 }}
        messageRef={messageRef}
      />
    );

    const illustration = screen.getByRole("img", { name: "medium illustration" });

    await user.click(illustration);

    expect(mockHandleImgClick).toHaveBeenCalled();
  });

  it("should not render a character dropdown when isDropdownShown is false", () => {
    const mockIllustration: IllustrationType = {
      difficulty: "medium",
      imageSrc: "imageSrc",
      id: "illustrationId",
      Characters: [
        {
          id: "waldoId",
          illustrationId: "illustrationId",
          isFound: false,
          name: "Waldo",
          imageSrc: "waldoImg",
        },
        {
          id: "wendaId",
          illustrationId: "illustrationId",
          isFound: false,
          name: "Wenda",
          imageSrc: "wendaImg",
        },
        {
          id: "wizardId",
          illustrationId: "illustrationId",
          isFound: false,
          name: "Wizard",
          imageSrc: "wizardImg",
        },
      ],
    };

    const dropdownRef: RefObject<HTMLDivElement> = {
      current: document.createElement("div"),
    };
    const illustrationSectionRef: RefObject<HTMLElement> = {
      current: document.createElement("section"),
    };

    const messageRef: RefObject<HTMLParagraphElement> = {
      current: document.createElement("p"),
    };

    const mockHandleImgClick = vi.fn();
    const mockHandleValidateCardClick = vi.fn();

    render(
      <Illustration
        illustration={mockIllustration}
        onShowDropdown={mockHandleImgClick}
        message={{ color: "", content: "" }}
        dropdownPosition={{ left: 0, top: 0 }}
        dropdownRef={dropdownRef}
        isDropdownShown={false}
        onClickCharacterCard={mockHandleValidateCardClick}
        illustrationSectionRef={illustrationSectionRef}
        messagePosition={{ left: 0, top: 0 }}
        messageRef={messageRef}
      />
    );

    const characterCards = screen.getAllByTestId("character-card");

    expect(screen.getByTestId("characters-dropdown")).not.toBeVisible();
    expect(characterCards.length).toBe(3);
    expect(characterCards[0]).not.toBeVisible();
    expect(characterCards[1]).not.toBeVisible();
    expect(characterCards[2]).not.toBeVisible();
  });

  it("should render a character dropdown when isDropdownShown is true", () => {
    const mockIllustration: IllustrationType = {
      difficulty: "medium",
      imageSrc: "imageSrc",
      id: "illustrationId",
      Characters: [
        {
          id: "waldoId",
          illustrationId: "illustrationId",
          isFound: false,
          name: "Waldo",
          imageSrc: "waldoImg",
        },
        {
          id: "wendaId",
          illustrationId: "illustrationId",
          isFound: false,
          name: "Wenda",
          imageSrc: "wendaImg",
        },
        {
          id: "wizardId",
          illustrationId: "illustrationId",
          isFound: false,
          name: "Wizard",
          imageSrc: "wizardImg",
        },
      ],
    };

    const dropdownRef: RefObject<HTMLDivElement> = {
      current: document.createElement("div"),
    };
    const illustrationSectionRef: RefObject<HTMLElement> = {
      current: document.createElement("section"),
    };

    const messageRef: RefObject<HTMLParagraphElement> = {
      current: document.createElement("p"),
    };

    const mockHandleImgClick = vi.fn();
    const mockHandleValidateCardClick = vi.fn();

    render(
      <Illustration
        illustration={mockIllustration}
        onShowDropdown={mockHandleImgClick}
        message={{ color: "", content: "" }}
        dropdownPosition={{ left: 0, top: 0 }}
        dropdownRef={dropdownRef}
        isDropdownShown={true}
        onClickCharacterCard={mockHandleValidateCardClick}
        illustrationSectionRef={illustrationSectionRef}
        messagePosition={{ left: 0, top: 0 }}
        messageRef={messageRef}
      />
    );

    const characterCards = screen.getAllByTestId("character-card");

    expect(screen.getByTestId("characters-dropdown")).toBeVisible();
    expect(characterCards.length).toBe(3);
    expect(characterCards[0]).toBeVisible();
    expect(characterCards[1]).toBeVisible();
    expect(characterCards[2]).toBeVisible();
  });

  it("should position dropdown based on the passed dropdownPosition object", () => {
    const mockIllustration: IllustrationType = {
      difficulty: "medium",
      imageSrc: "imageSrc",
      id: "illustrationId",
      Characters: [
        {
          id: "waldoId",
          illustrationId: "illustrationId",
          isFound: false,
          name: "Waldo",
          imageSrc: "waldoImg",
        },
        {
          id: "wendaId",
          illustrationId: "illustrationId",
          isFound: false,
          name: "Wenda",
          imageSrc: "wendaImg",
        },
        {
          id: "wizardId",
          illustrationId: "illustrationId",
          isFound: false,
          name: "Wizard",
          imageSrc: "wizardImg",
        },
      ],
    };

    const dropdownRef: RefObject<HTMLDivElement> = {
      current: document.createElement("div"),
    };
    const illustrationSectionRef: RefObject<HTMLElement> = {
      current: document.createElement("section"),
    };

    const messageRef: RefObject<HTMLParagraphElement> = {
      current: document.createElement("p"),
    };

    const mockHandleImgClick = vi.fn();
    const mockHandleValidateCardClick = vi.fn();

    render(
      <Illustration
        illustration={mockIllustration}
        onShowDropdown={mockHandleImgClick}
        message={{ color: "", content: "" }}
        dropdownPosition={{ left: 100, top: 20 }}
        dropdownRef={dropdownRef}
        isDropdownShown={true}
        onClickCharacterCard={mockHandleValidateCardClick}
        illustrationSectionRef={illustrationSectionRef}
        messagePosition={{ left: 0, top: 0 }}
        messageRef={messageRef}
      />
    );

    const dropdown = screen.getByTestId("characters-dropdown");

    expect(dropdown).toHaveStyle({
      top: "20px",
      left: "100px",
    });
  });

  it("should call onClickCharacterCard prop when dropdown character is clicked", async () => {
    const user = userEvent.setup();

    const mockIllustration: IllustrationType = {
      difficulty: "medium",
      imageSrc: "imageSrc",
      id: "illustrationId",
      Characters: [
        {
          id: "waldoId",
          illustrationId: "illustrationId",
          isFound: false,
          name: "Waldo",
          imageSrc: "waldoImg",
        },
        {
          id: "wendaId",
          illustrationId: "illustrationId",
          isFound: false,
          name: "Wenda",
          imageSrc: "wendaImg",
        },
        {
          id: "wizardId",
          illustrationId: "illustrationId",
          isFound: false,
          name: "Wizard",
          imageSrc: "wizardImg",
        },
      ],
    };

    const dropdownRef: RefObject<HTMLDivElement> = {
      current: document.createElement("div"),
    };
    const illustrationSectionRef: RefObject<HTMLElement> = {
      current: document.createElement("section"),
    };

    const messageRef: RefObject<HTMLParagraphElement> = {
      current: document.createElement("p"),
    };

    const mockHandleImgClick = vi.fn();
    const mockHandleValidateCardClick = vi.fn();

    render(
      <Illustration
        illustration={mockIllustration}
        onShowDropdown={mockHandleImgClick}
        message={{ color: "", content: "" }}
        dropdownPosition={{ left: 0, top: 0 }}
        dropdownRef={dropdownRef}
        isDropdownShown={true}
        onClickCharacterCard={mockHandleValidateCardClick}
        illustrationSectionRef={illustrationSectionRef}
        messagePosition={{ left: 0, top: 0 }}
        messageRef={messageRef}
      />
    );

    const characterCards = screen.getAllByTestId("character-card");

    await user.click(characterCards[0]);
    await user.click(characterCards[1]);
    await user.click(characterCards[2]);

    expect(mockHandleValidateCardClick).toHaveBeenCalledTimes(3);
  });

  it("should not render a flash message when message content is empty", () => {
    const mockIllustration: IllustrationType = {
      difficulty: "medium",
      imageSrc: "imageSrc",
      id: "illustrationId",
      Characters: [
        {
          id: "waldoId",
          illustrationId: "illustrationId",
          isFound: false,
          name: "Waldo",
          imageSrc: "waldoImg",
        },
        {
          id: "wendaId",
          illustrationId: "illustrationId",
          isFound: false,
          name: "Wenda",
          imageSrc: "wendaImg",
        },
        {
          id: "wizardId",
          illustrationId: "illustrationId",
          isFound: false,
          name: "Wizard",
          imageSrc: "wizardImg",
        },
      ],
    };

    const dropdownRef: RefObject<HTMLDivElement> = {
      current: document.createElement("div"),
    };
    const illustrationSectionRef: RefObject<HTMLElement> = {
      current: document.createElement("section"),
    };

    const messageRef: RefObject<HTMLParagraphElement> = {
      current: document.createElement("p"),
    };

    const mockHandleImgClick = vi.fn();
    const mockHandleValidateCardClick = vi.fn();

    render(
      <Illustration
        illustration={mockIllustration}
        onShowDropdown={mockHandleImgClick}
        message={{ color: "", content: "" }}
        dropdownPosition={{ left: 0, top: 0 }}
        dropdownRef={dropdownRef}
        isDropdownShown={false}
        onClickCharacterCard={mockHandleValidateCardClick}
        illustrationSectionRef={illustrationSectionRef}
        messagePosition={{ left: 0, top: 0 }}
        messageRef={messageRef}
      />
    );

    expect(screen.getByTestId("flash-message")).not.toBeVisible();
  });

  it("should render a flash message with expected styles when message content is not empty", () => {
    const mockIllustration: IllustrationType = {
      difficulty: "medium",
      imageSrc: "imageSrc",
      id: "illustrationId",
      Characters: [
        {
          id: "waldoId",
          illustrationId: "illustrationId",
          isFound: false,
          name: "Waldo",
          imageSrc: "waldoImg",
        },
        {
          id: "wendaId",
          illustrationId: "illustrationId",
          isFound: false,
          name: "Wenda",
          imageSrc: "wendaImg",
        },
        {
          id: "wizardId",
          illustrationId: "illustrationId",
          isFound: false,
          name: "Wizard",
          imageSrc: "wizardImg",
        },
      ],
    };

    const dropdownRef: RefObject<HTMLDivElement> = {
      current: document.createElement("div"),
    };
    const illustrationSectionRef: RefObject<HTMLElement> = {
      current: document.createElement("section"),
    };

    const messageRef: RefObject<HTMLParagraphElement> = {
      current: document.createElement("p"),
    };

    const mockHandleImgClick = vi.fn();
    const mockHandleValidateCardClick = vi.fn();

    render(
      <Illustration
        illustration={mockIllustration}
        onShowDropdown={mockHandleImgClick}
        message={{ color: "green", content: "You found waldo" }}
        dropdownPosition={{ left: 0, top: 0 }}
        dropdownRef={dropdownRef}
        isDropdownShown={false}
        onClickCharacterCard={mockHandleValidateCardClick}
        illustrationSectionRef={illustrationSectionRef}
        messagePosition={{ left: 20, top: 100 }}
        messageRef={messageRef}
      />
    );

    const flashMessage = screen.getByTestId("flash-message");

    expect(flashMessage).toBeVisible();
    expect(flashMessage).toHaveStyle({
      "background-color": "rgb(0,128,0)",
      top: "100px",
      left: "20px",
    });
  });
});
