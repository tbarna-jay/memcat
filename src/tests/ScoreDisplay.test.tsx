import { render, screen } from "@testing-library/react";
import ScoreDisplay from "../components/ScoreDisplay";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";

afterEach(cleanup);

describe("ScoreDisplay", () => {
  it("renders without crashing", () => {
    render(
      <ScoreDisplay
        stepsUserA={0}
        stepsUserB={0}
        userAName="UserA"
        userBName="UserB"
        isOpen={false}
        finish={false}
        activeUser="userA"
      />,
    );

    // You can add more specific assertions based on your component's content
    expect(screen.getByText("UserA:")).toBeInTheDocument();
    expect(screen.getByText("UserB:")).toBeInTheDocument();
  });

  // Add more test cases as needed
});
