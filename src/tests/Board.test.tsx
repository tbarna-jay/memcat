import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Board from "../components/Board";
import React from "react";

const mockCards = {
  card1: { url: "/image1.jpg", selected: false, active: false },
  card2: { url: "/image2.jpg", selected: true, active: false },
  card3: { url: "/image3.jpg", selected: false, active: true },
};

describe("Board", () => {
  it("calls onActivateCard when a card is clicked", () => {
    const dispatch = jest.fn();

    render(<Board cards={mockCards} isOpen={false} dispatch={dispatch} />);

    // Click a card
    fireEvent.click(screen.getByTestId("card1"));

    // Check that dispatch was called
    expect(dispatch).toHaveBeenCalledTimes(1);
  });

  it("doens't call onActivateCard when a selected card is clicked", () => {
    const dispatch = jest.fn();

    render(<Board cards={mockCards} isOpen={false} dispatch={dispatch} />);

    // Click a card
    fireEvent.click(screen.getByTestId("card2"));

    // Check that dispatch was called
    expect(dispatch).toHaveBeenCalledTimes(0);
  });

  // Add more test cases as needed
});
