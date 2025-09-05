import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Illustration from "../../components/Illustration/Illustration";
import type { IllustrationType } from "../../types/types";

describe("Illustration component", () => {
  it("should render illustration", () => {
    const mockIllustration: IllustrationType = {
      difficulty: "medium",
      imageId: "imageId",
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
          imageSrc: "wizrdImg",
        },
      ],
    };

    const mockHandleImgClick = vi.fn();

    render(
      <Illustration illustration={mockIllustration} onShowDropdown={mockHandleImgClick} message={null} />
    );

    expect(screen.getByRole("img", { name: "medium illustration" })).toBeInTheDocument();
  });

  it("should call onClickImg prop when image is clicked", async () => {
    const user = userEvent.setup();

    const mockIllustration: IllustrationType = {
      difficulty: "medium",
      imageId: "imageId",
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
          imageSrc: "wizrdImg",
        },
      ],
    };

    const mockHandleImgClick = vi.fn();

    render(
      <Illustration illustration={mockIllustration} onShowDropdown={mockHandleImgClick} message={null} />
    );

    const illustration = screen.getByRole("img", { name: "medium illustration" });

    await user.click(illustration);

    expect(mockHandleImgClick).toHaveBeenCalled();
  });

  it.skip("should call onClickDropdown prop when dropdown character is clicked", () => {});
  it.skip("should render a flash message when a message is passed", () => {});
});
