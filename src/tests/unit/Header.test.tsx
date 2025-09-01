import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import Header from "../../components/Header/Header";

describe("Header component", () => {
  it("should render navigation links", () => {
    const router = createMemoryRouter([
      {
        path: "/",
        Component: Header,
      },
    ]);

    render(<RouterProvider router={router} />);

    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem").length).toBe(2);
    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Leaderboards" })).toBeInTheDocument();
  });
});
