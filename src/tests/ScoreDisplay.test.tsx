import { render, screen } from "@testing-library/react";
import ScoreDisplay from "../components/ScoreDisplay";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import { activeUserType } from "../hooks/useGameLogic";
import React from "react";

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
        activeUser={activeUserType.A}
      />,
    );

    // You can add more specific assertions based on your component's content
    expect(screen.getByText("UserA:")).toBeInTheDocument();
    expect(screen.getByText("UserB:")).toBeInTheDocument();
  });

  // Add more test cases as needed
});
