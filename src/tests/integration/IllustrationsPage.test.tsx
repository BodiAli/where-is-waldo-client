import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router";
import { type Mock } from "vitest";
import IllustrationsPage from "../../pages/Illustrations/IllustrationsPage";
import type { IllustrationsType } from "../../types/types";

describe("IllustrationsPage Component", () => {
  it("should render illustrations when component first loads", async () => {
    const mockIllustrations: { illustrations: IllustrationsType } = {
      illustrations: [
        {
          difficulty: "easy",
          id: "illustrationId1",
          imageId: "imageId",
        },
        {
          difficulty: "medium",
          id: "illustrationId2",
          imageId: "imageId",
        },
        {
          difficulty: "hard",
          id: "illustrationId3",
          imageId: "imageId",
        },
      ],
    };

    window.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: vi.fn(() => Promise.resolve(mockIllustrations)),
      })
    ) as Mock;

    const router = createMemoryRouter([
      {
        path: "/",
        Component: IllustrationsPage,
      },
    ]);

    render(<RouterProvider router={router} />);

    const headingElements = await screen.findAllByRole("heading", { level: 2 });

    expect(headingElements[0]).toHaveTextContent("Easy");
    expect(headingElements[1]).toHaveTextContent("Medium");
    expect(headingElements[2]).toHaveTextContent("Hard");
    expect(await screen.findByRole("img", { name: "easy illustration" })).toBeInTheDocument();
    expect(await screen.findByRole("img", { name: "medium illustration" })).toBeInTheDocument();
    expect(await screen.findByRole("img", { name: "hard illustration" })).toBeInTheDocument();
    expect((await screen.findAllByRole("button", { name: "Start" })).length).toBe(3);
  });

  it("should navigate to illustration page when an illustration start button is clicked", async () => {
    const user = userEvent.setup();

    const mockIllustrations: { illustrations: IllustrationsType } = {
      illustrations: [
        {
          difficulty: "easy",
          id: "illustrationId1",
          imageId: "imageId",
        },
        {
          difficulty: "medium",
          id: "illustrationId2",
          imageId: "imageId",
        },
        {
          difficulty: "hard",
          id: "illustrationId3",
          imageId: "imageId",
        },
      ],
    };

    window.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: vi.fn(() => Promise.resolve(mockIllustrations)),
      })
    ) as Mock;

    const router = createMemoryRouter([
      {
        path: "/",
        Component: IllustrationsPage,
      },
      {
        path: "illustrations/:illustrationId",
        Component: () => <p>illustration</p>,
      },
    ]);

    render(<RouterProvider router={router} />);

    const firstLink = (await screen.findAllByRole("button"))[0];

    await user.click(firstLink);

    expect(router.state.location.pathname).toBe("/illustrations/illustrationId1");
  });
});
