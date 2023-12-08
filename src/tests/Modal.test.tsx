import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "../components/Modal";

describe("Modal", () => {
  it("renders without crashing", () => {
    const startNewGameMock = jest.fn();
    const setUserANameMock = jest.fn();
    const setUserBNameMock = jest.fn();

    render(
      <Modal
        startNewGame={startNewGameMock}
        setUserAName={setUserANameMock}
        setUserBName={setUserBNameMock}
        userAName=""
        userBName=""
        isOpen={true}
      />,
    );

    // You can add more specific assertions based on your component's content
    expect(screen.getByLabelText("User A:")).toBeInTheDocument();
    expect(screen.getByLabelText("User B:")).toBeInTheDocument();
  });

  it("doesn't call startNewGame when button is clicked when non input filled", async () => {
    const startNewGameMock = jest.fn();
    const setUserANameMock = jest.fn();
    const setUserBNameMock = jest.fn();

    render(
      <Modal
        startNewGame={startNewGameMock}
        setUserAName={setUserANameMock}
        setUserBName={setUserBNameMock}
        userAName=""
        userBName=""
        isOpen={true}
      />,
    );

    // Click the "Play" button
    fireEvent.click(screen.getByText("Play"));

    // Check that startNewGameMock was called
    expect(startNewGameMock).toHaveBeenCalledTimes(0);
  });

  it("calls startNewGame when button is clicked when an input filled", async () => {
    const startNewGameMock = jest.fn();
    const setUserANameMock = jest.fn();
    const setUserBNameMock = jest.fn();

    render(
      <Modal
        startNewGame={startNewGameMock}
        setUserAName={setUserANameMock}
        setUserBName={setUserBNameMock}
        userAName="a"
        userBName="a"
        isOpen={true}
      />,
    );

    // Click the "Play" button
    fireEvent.click(screen.getByText("Play"));

    // Check that startNewGameMock was called
    expect(startNewGameMock).toHaveBeenCalledTimes(1);
  });

  it("updates user names when input values change", async () => {
    const startNewGameMock = jest.fn();
    const setUserANameMock = jest.fn();
    const setUserBNameMock = jest.fn();

    render(
      <Modal
        startNewGame={startNewGameMock}
        setUserAName={setUserANameMock}
        setUserBName={setUserBNameMock}
        userAName="a"
        userBName="a"
        isOpen={true}
      />,
    );

    // Type into the "User A" input
    fireEvent.change(screen.getByLabelText("User A:"), {
      target: { value: "UserA" },
    });

    // Check that setUserANameMock was called with the correct value
    expect(setUserANameMock).toHaveBeenCalledWith("UserA");

    // Type into the "User B" input
    fireEvent.change(screen.getByLabelText("User B:"), {
      target: { value: "UserB" },
    });

    // Check that setUserBNameMock was called with the correct value
    expect(setUserBNameMock).toHaveBeenCalledWith("UserB");

    // Click the "Play" button
    fireEvent.click(screen.getByText("Play"));

    // Check that startNewGameMock was called
    expect(startNewGameMock).toHaveBeenCalledTimes(1);
  });

  // Add more test cases as needed
});
