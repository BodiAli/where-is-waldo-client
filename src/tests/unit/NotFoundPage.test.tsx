import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";

describe("NotFoundPage component", () => {
  it("should render a 404 not found text when a path is not matched", () => {
    const router = createMemoryRouter(
      [
        {
          ErrorBoundary: NotFoundPage,
          children: [
            {
              path: "/",
              Component: () => <p>Valid</p>,
            },
          ],
        },
      ],
      { initialEntries: ["/invalid"] }
    );

    render(<RouterProvider router={router} />);

    expect(screen.getByRole("heading", { name: "404 Not Found", level: 1 })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Here" })).toBeInTheDocument();
    expect(
      screen.getByText((_content, element) => {
        if (!element) return false;
        if (element.tagName !== "P") {
          return false;
        }
        return element.textContent === "Click Here to return to Home page.";
      })
    ).toBeInTheDocument();
  });

  it('should return to home page when "here" link is clicked', async () => {
    const user = userEvent.setup();

    const router = createMemoryRouter(
      [
        {
          ErrorBoundary: NotFoundPage,
          children: [
            {
              path: "/",
              Component: () => <p>Valid</p>,
            },
          ],
        },
      ],
      { initialEntries: ["/invalid"] }
    );

    render(<RouterProvider router={router} />);

    const homeLink = screen.getByRole("link", { name: "Here" });

    await user.click(homeLink);

    expect(router.state.location.pathname).toBe("/");
    expect(screen.getByText("Valid")).toBeInTheDocument();
  });
});
