import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import type { RefObject } from "react";
import Modal from "../../components/Modal/Modal";

describe("Modal component", () => {
  it("should render a dialog component", () => {
    const dialogRef: RefObject<HTMLDialogElement> = {
      current: document.createElement("dialog"),
    };

    const router = createMemoryRouter([
      {
        path: "/",
        element: <Modal dialogRef={dialogRef} duration={1000} />,
      },
    ]);

    render(<RouterProvider router={router} />);

    expect(screen.getByRole("dialog", { hidden: true })).toBeInTheDocument();
  });

  it("should render how much time it took the user to win the game", () => {
    const dialogRef: RefObject<HTMLDialogElement> = {
      current: document.createElement("dialog"),
    };

    const router = createMemoryRouter([
      {
        path: "/",
        element: <Modal dialogRef={dialogRef} duration={1000} />,
      },
    ]);

    render(<RouterProvider router={router} />);

    expect(screen.getByRole("heading", { level: 2, name: "You won!", hidden: true })).toBeInTheDocument();
    expect(screen.getByTestId("score")).toHaveTextContent("It took you 1.00 seconds to complete.");
  });
});
