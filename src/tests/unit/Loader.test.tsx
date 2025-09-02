import { render, screen } from "@testing-library/react";
import Loader from "../../components/Loader/Loader";

describe("Loader component", () => {
  it("Should display loading spinner with class loader", () => {
    render(<Loader />);

    expect(screen.getByTestId("loader")).toBeInTheDocument();
    expect(screen.getByTestId("loader")).toHaveClass(/loader/);
  });
});
