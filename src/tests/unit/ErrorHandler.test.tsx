import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRoutesStub } from "react-router";
import ErrorHandler from "../../components/ErrorHandler/ErrorHandler";

describe("ErrorHandler component", () => {
  it("should render error message when an error is thrown inside a component", () => {
    const Stub = createRoutesStub([
      {
        path: "/",
        ErrorBoundary: ErrorHandler,
        Component: () => {
          throw new Error("Error inside component");
        },
      },
    ]);

    render(<Stub />);

    expect(screen.getByRole("heading", { name: "Unexpected error occurred!" })).toBeInTheDocument();
    expect(screen.getByText("Error inside component")).toBeInTheDocument();
  });

  it("should reload page when reload button is clicked", async () => {
    const user = userEvent.setup();

    Object.defineProperty(window, "location", {
      value: {
        reload: vi.fn(),
      },
    });

    const Stub = createRoutesStub([
      {
        path: "/",
        ErrorBoundary: ErrorHandler,
        Component: () => {
          throw new Error("Error inside component");
        },
      },
    ]);

    render(<Stub />);

    await user.click(screen.getByRole("button"));

    const { reload } = window.location;

    expect(reload).toHaveBeenCalledOnce();
  });
});
