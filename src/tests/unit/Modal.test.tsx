import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import userEvent from "@testing-library/user-event";
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
        element: <Modal dialogRef={dialogRef} duration={1000} illustrationId="IllustrationId" />,
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
        element: <Modal dialogRef={dialogRef} duration={1000} illustrationId="illustrationId" />,
      },
    ]);

    render(<RouterProvider router={router} />);

    expect(screen.getByRole("heading", { level: 2, name: "You won!", hidden: true })).toBeInTheDocument();
    expect(screen.getByTestId("score")).toHaveTextContent("It took you 1.00 seconds to complete.");
  });

  it("should navigate to '/leaderboards/leaderboardId' when form is submitted", async () => {
    const user = userEvent.setup();

    window.fetch = vi.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: vi.fn(() => Promise.resolve({ leaderboardId: "leaderboardId" })),
      })
    );

    const dialogRef: RefObject<HTMLDialogElement> = {
      current: document.createElement("dialog"),
    };

    const router = createMemoryRouter([
      {
        path: "/",
        element: <Modal dialogRef={dialogRef} duration={1000} illustrationId="illustrationId" />,
      },
      {
        path: "/leaderboards/:leaderboardId",
        element: <h1>Leaderboard page</h1>,
      },
    ]);

    render(<RouterProvider router={router} />);

    const nameInput = screen.getByRole("textbox", { name: "Please enter your name:", hidden: true });
    const submitButton = screen.getByRole("button", { name: "Submit", hidden: true });

    await user.type(nameInput, "Bodi");

    await user.click(submitButton);

    expect(router.state.location.pathname).toBe("/leaderboards/leaderboardId");
    expect(screen.getByRole("heading", { name: "Leaderboard page", level: 1 })).toBeInTheDocument();
  });
});
