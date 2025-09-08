import { render, screen } from "@testing-library/react";
import type { Mock } from "vitest";
import { createMemoryRouter, RouterProvider } from "react-router";
import { SERVER_URL, type IllustrationType } from "../../types/types";
import IllustrationPage from "../../pages/Illustration/IllustrationPage";
import ErrorHandler from "../../components/ErrorHandler/ErrorHandler";

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

    expect(window.fetch).toBeCalledWith(`${SERVER_URL}/illustrations/illustrationId`);
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
});
