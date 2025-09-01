import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import userEvent from "@testing-library/user-event";
import AppLayout from "../../components/AppLayout/AppLayout";

describe("AppLayout component", () => {
  it("should render child components", () => {
    const router = createMemoryRouter([
      {
        Component: AppLayout,
        children: [
          {
            index: true,
            Component: () => <h1>"/" Component</h1>,
          },
          {
            path: "/leaderboards",
            Component: () => <h1>"/leaderboards" Component</h1>,
          },
        ],
      },
    ]);

    render(<RouterProvider router={router} />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent('"/" Component');
  });

  it("should navigate to expected routes when links are clicked", async () => {
    const user = userEvent.setup();

    const router = createMemoryRouter([
      {
        Component: AppLayout,
        children: [
          {
            index: true,
            Component: () => <h1>"/" Component</h1>,
          },
          {
            path: "/leaderboards",
            Component: () => <h1>"/leaderboards" Component</h1>,
          },
        ],
      },
    ]);

    render(<RouterProvider router={router} />);

    const leaderBoardsLink = screen.getByRole("link", { name: "Leaderboards" });

    await user.click(leaderBoardsLink);

    expect(router.state.location.pathname).toBe("/leaderboards");

    const homeLink = screen.getByRole("link", { name: "Home" });
    await user.click(homeLink);

    expect(router.state.location.pathname).toBe("/");
  });
});
