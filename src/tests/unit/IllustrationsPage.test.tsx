import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router";
import IllustrationsPage from "../../pages/Illustrations/IllustrationsPage";
import type { IllustrationsType } from "../../types/types";
import { type Mock } from "vitest";

describe("IllustrationsPage Component", () => {
  it("should render illustrations when component first loads", () => {
    const mockIllustrations: IllustrationsType = [
      {
        difficulty: "easy",
        id: "illustrationId",
        imageId: "imageId",
      },
      {
        difficulty: "medium",
        id: "illustrationId",
        imageId: "imageId",
      },
      {
        difficulty: "hard",
        id: "illustrationId",
        imageId: "imageId",
      },
    ];

    window.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: Promise.resolve(mockIllustrations),
      })
    ) as Mock;

    const router = createMemoryRouter([
      {
        path: "/",
        Component: IllustrationsPage,
      },
    ]);

    render(<RouterProvider router={router} />);

    const headingElements = screen.getAllByRole("heading", { level: 2 });

    expect(headingElements[0]).toHaveTextContent("Easy");
    expect(headingElements[1]).toHaveTextContent("Medium");
    expect(headingElements[2]).toHaveTextContent("Hard");
    expect(screen.getByRole("img", { name: "easy" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "medium" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "hard" })).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: "Start" }).length).toBe(3);
  });

  // it("should navigate to illustration page when an illustration start button is clicked", () => {
  //   // TODO
  // });
});
