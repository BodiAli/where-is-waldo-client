import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { Mock } from "vitest";
import { createMemoryRouter, RouterProvider } from "react-router";
import { SERVER_URL, type CharacterType, type IllustrationType } from "../../types/types";
import IllustrationPage from "../../pages/Illustration/IllustrationPage";
import ErrorHandler from "../../components/ErrorHandler/ErrorHandler";

vi.mock("../../utils/getImageCoordinates.ts", () => {
  return {
    default: () => ({ imgX: 100, imgY: 100 }),
  };
});

describe("Illustration Page component", () => {
  it("should fetch illustration when valid illustration param is present", async () => {
    const mockIllustration: { illustration: IllustrationType } = {
      illustration: {
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
            imageSrc: "wizrdImg",
          },
        ],
      },
    };

    window.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: vi.fn(() => Promise.resolve(mockIllustration)),
      })
    ) as Mock;

    const router = createMemoryRouter(
      [
        {
          path: "/illustrations/:illustrationId",
          Component: IllustrationPage,
        },
      ],
      { initialEntries: [`/illustrations/${mockIllustration.illustration.id}`] }
    );

    render(<RouterProvider router={router} />);

    const characters = await screen.findAllByRole("img", { name: /character/ });
    const illustration = await screen.findByRole("img", { name: "medium illustration" });

    expect(characters.length).toBe(3);
    expect(characters[0]).toBeInTheDocument();
    expect(characters[1]).toBeInTheDocument();
    expect(characters[2]).toBeInTheDocument();

    expect(illustration).toBeInTheDocument();

    expect(window.fetch).toBeCalledWith(`${SERVER_URL}/illustrations/illustrationId`, {
      credentials: "include",
    });
  });

  it("should render ErrorBoundary with a not found message when illustration is not found", async () => {
    window.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 404,
        json: vi.fn(() => Promise.resolve({ error: "Illustration not found" })),
      })
    ) as Mock;

    const router = createMemoryRouter(
      [
        {
          ErrorBoundary: ErrorHandler,
          path: "/illustrations/:illustrationId",
          Component: IllustrationPage,
        },
      ],
      { initialEntries: ["/illustrations/invalidId"] }
    );

    render(<RouterProvider router={router} />);

    const notFoundMessage = await screen.findByRole("paragraph");

    expect(notFoundMessage).toHaveTextContent("Illustration not found");
  });

  it("should show a characters dropdown when the illustration is clicked", async () => {
    const user = userEvent.setup();

    const mockIllustration: { illustration: IllustrationType } = {
      illustration: {
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
            imageSrc: "wizrdImg",
          },
        ],
      },
    };

    window.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: vi.fn(() => Promise.resolve(mockIllustration)),
      })
    ) as Mock;

    const router = createMemoryRouter(
      [
        {
          path: "/illustrations/:illustrationId",
          Component: IllustrationPage,
        },
      ],
      { initialEntries: [`/illustrations/${mockIllustration.illustration.id}`] }
    );

    render(<RouterProvider router={router} />);

    const charactersDropdown = await screen.findByTestId("characters-dropdown");

    expect(charactersDropdown).not.toBeVisible();

    const illustration = await screen.findByRole("img", { name: "medium illustration" });

    await user.click(illustration);

    expect(charactersDropdown).toBeVisible();
  });

  it("should show a try again message when the user clicks an invalid character position", async () => {
    const user = userEvent.setup();

    const mockIllustration: { illustration: IllustrationType } = {
      illustration: {
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
      },
    };

    const mockClickResponse: { character: CharacterType; msg: string; success: boolean } = {
      character: {
        id: "waldoId",
        illustrationId: "illustrationId",
        isFound: false,
        imageSrc: "waldoImage",
        name: "Waldo",
      },
      msg: "Try again",
      success: false,
    };

    window.fetch = vi
      .fn()
      .mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: vi.fn(() => Promise.resolve(mockIllustration)),
        })
      )
      .mockImplementation(() =>
        Promise.resolve({
          ok: true,
          json: vi.fn(() => Promise.resolve(mockClickResponse)),
        })
      );

    const router = createMemoryRouter(
      [
        {
          path: "/illustrations/:illustrationId",
          Component: IllustrationPage,
        },
      ],
      { initialEntries: [`/illustrations/${mockIllustration.illustration.id}`] }
    );

    render(<RouterProvider router={router} />);

    const illustration = await screen.findByRole("img", { name: "medium illustration" });

    await user.click(illustration);

    const characterCards = await screen.findAllByTestId("character-card");

    await user.click(characterCards[0]);

    expect(await screen.findByTestId("flash-message")).toHaveTextContent("Try again");
  });

  it("should show a character is already found message when the user clicks an already found character", async () => {
    const user = userEvent.setup();

    const mockIllustration: { illustration: IllustrationType } = {
      illustration: {
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
      },
    };

    const mockClickResponse: { character: CharacterType; msg: string; success: boolean } = {
      character: {
        id: "waldoId",
        illustrationId: "illustrationId",
        isFound: true,
        imageSrc: "waldoImage",
        name: "Waldo",
      },
      msg: "Waldo is already found",
      success: false,
    };

    window.fetch = vi
      .fn()
      .mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: vi.fn(() => Promise.resolve(mockIllustration)),
        })
      )
      .mockImplementation(() =>
        Promise.resolve({
          ok: true,
          json: vi.fn(() => Promise.resolve(mockClickResponse)),
        })
      );

    const router = createMemoryRouter(
      [
        {
          path: "/illustrations/:illustrationId",
          Component: IllustrationPage,
        },
      ],
      { initialEntries: [`/illustrations/${mockIllustration.illustration.id}`] }
    );

    render(<RouterProvider router={router} />);

    const illustration = await screen.findByRole("img", { name: "medium illustration" });

    await user.click(illustration);

    const characterCards = await screen.findAllByTestId("character-card");

    await user.click(characterCards[0]);

    expect(await screen.findByTestId("flash-message")).toHaveTextContent("Waldo is already found");
  });

  it("should show a success message when the user clicks a valid character position", async () => {
    const user = userEvent.setup();

    const mockIllustration: { illustration: IllustrationType } = {
      illustration: {
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
      },
    };

    const mockClickResponse: { character: CharacterType; msg: string; success: boolean } = {
      character: {
        id: "waldoId",
        illustrationId: "illustrationId",
        isFound: true,
        imageSrc: "waldoImage",
        name: "Waldo",
      },
      msg: "You found Waldo",
      success: true,
    };

    window.fetch = vi
      .fn()
      .mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: vi.fn(() => Promise.resolve(mockIllustration)),
        })
      )
      .mockImplementation(() =>
        Promise.resolve({
          ok: true,
          json: vi.fn(() => Promise.resolve(mockClickResponse)),
        })
      );

    const router = createMemoryRouter(
      [
        {
          path: "/illustrations/:illustrationId",
          Component: IllustrationPage,
        },
      ],
      { initialEntries: [`/illustrations/${mockIllustration.illustration.id}`] }
    );

    render(<RouterProvider router={router} />);

    const illustration = await screen.findByRole("img", { name: "medium illustration" });

    await user.click(illustration);

    const characterCards = await screen.findAllByTestId("character-card");

    await user.click(characterCards[0]);

    expect(await screen.findByTestId("flash-message")).toHaveTextContent("You found Waldo");
  });

  it("should add a 'found' class to character icon when the corresponding character is found", async () => {
    const user = userEvent.setup();

    const mockIllustration: { illustration: IllustrationType } = {
      illustration: {
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
      },
    };

    const mockClickResponse: { character: CharacterType; msg: string; success: boolean } = {
      character: {
        id: "waldoId",
        illustrationId: "illustrationId",
        isFound: true,
        imageSrc: "waldoImage",
        name: "Waldo",
      },
      msg: "You found Waldo",
      success: true,
    };

    window.fetch = vi
      .fn()
      .mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: vi.fn(() => Promise.resolve(mockIllustration)),
        })
      )
      .mockImplementation(() =>
        Promise.resolve({
          ok: true,
          json: vi.fn(() => Promise.resolve(mockClickResponse)),
        })
      );

    const router = createMemoryRouter(
      [
        {
          path: "/illustrations/:illustrationId",
          Component: IllustrationPage,
        },
      ],
      { initialEntries: [`/illustrations/${mockIllustration.illustration.id}`] }
    );

    render(<RouterProvider router={router} />);

    const illustration = await screen.findByRole("img", { name: "medium illustration" });

    await user.click(illustration);

    const characterCards = await screen.findAllByTestId("character-card");

    await user.click(characterCards[0]);

    const waldoIcon = await screen.findByRole("img", { name: "Waldo character" });

    expect(waldoIcon).toHaveClass(/found/);
  });

  it("should call showModal method", async () => {
    const user = userEvent.setup();

    HTMLDialogElement.prototype.showModal = vi.fn();

    const mockIllustration: { illustration: IllustrationType } = {
      illustration: {
        difficulty: "medium",
        imageSrc: "imageSrc",
        id: "illustrationId",
        Characters: [
          {
            id: "waldoId",
            illustrationId: "illustrationId",
            isFound: true,
            name: "Waldo",
            imageSrc: "waldoImg",
          },
          {
            id: "wendaId",
            illustrationId: "illustrationId",
            isFound: true,
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
      },
    };

    const mockClickResponse: { msg: string; duration: number } = {
      msg: "You found Wizard",
      duration: 1000,
    };

    window.fetch = vi
      .fn()
      .mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: vi.fn(() => Promise.resolve(mockIllustration)),
        })
      )
      .mockImplementation(() =>
        Promise.resolve({
          ok: true,
          json: vi.fn(() => Promise.resolve(mockClickResponse)),
        })
      );

    const router = createMemoryRouter(
      [
        {
          path: "/illustrations/:illustrationId",
          Component: IllustrationPage,
        },
      ],
      { initialEntries: [`/illustrations/${mockIllustration.illustration.id}`] }
    );

    render(<RouterProvider router={router} />);

    const illustration = await screen.findByRole("img", { name: "medium illustration" });
    const dialogElement = await screen.findByRole("dialog", { hidden: true });

    expect(dialogElement).not.toBeVisible();

    await user.click(illustration);

    const wizardCard = (await screen.findAllByTestId("character-card"))[2];

    await user.click(wizardCard);

    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalledOnce();
  });
});
