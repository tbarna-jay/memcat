import { render, screen, fireEvent } from "@testing-library/react";
import NewGameButton from "../components/NewGameButton";
import "@testing-library/jest-dom";
import React from "react";

describe("NewGameButton", () => {
  it("renders without crashing", () => {
    const openModalMock = jest.fn();

    render(<NewGameButton openModal={openModalMock} />);

    // You can add more specific assertions based on your component's content
    expect(screen.getByText("New Game")).toBeInTheDocument();
  });

  it("calls openModal when clicked", () => {
    const openModalMock = jest.fn();

    render(<NewGameButton openModal={openModalMock} />);

    // Click the button
    fireEvent.click(screen.getByText("New Game"));

    // Check that openModalMock was called
    expect(openModalMock).toHaveBeenCalledTimes(1);
  });
});
