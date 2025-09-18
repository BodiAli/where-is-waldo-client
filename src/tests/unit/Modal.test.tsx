import { createMemoryRouter, RouterProvider } from "react-router";
import Modal from "../../components/Modal/Modal";
import { render, screen } from "@testing-library/react";

describe("Modal component", () => {
  it("should render a dialog component", () => {
    const router = createMemoryRouter([
      {
        path: "/",
        Component: Modal,
      },
    ]);

    render(<RouterProvider router={router} />);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});
