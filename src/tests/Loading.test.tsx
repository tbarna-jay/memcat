import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Loading from "../components/Loading";

describe("Loading", () => {
  it("renders without crashing", () => {
    render(<Loading progressText="Loading..." />);

    // You can add more specific assertions based on your component's content
    expect(screen.getByAltText("Logo")).toBeInTheDocument();
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
