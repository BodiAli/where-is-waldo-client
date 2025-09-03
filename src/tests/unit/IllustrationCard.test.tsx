import { render, screen } from "@testing-library/react";
import IllustrationCard from "../../components/IllustrationCard/IllustrationCard";
import { createMemoryRouter, RouterProvider } from "react-router";

describe("IllustrationCard component", () => {
  it("should render illustration details that are passed as props", () => {
    const router = createMemoryRouter([
      {
        path: "/",
        element: <IllustrationCard difficulty={"medium"} id="illustrationId" imageId="imageId" />,
      },
    ]);

    render(<RouterProvider router={router} />);

    expect(screen.getByRole("heading", { level: 2, name: "Medium" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "medium illustration" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Start" })).toBeInTheDocument();
  });
});
