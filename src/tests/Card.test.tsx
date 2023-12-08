import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Card from "../components/Card";

describe("Card", () => {
  it("renders without crashing", () => {
    render(
      <Card
        url="/example.jpg"
        selected={false}
        active={false}
        onClick={jest.fn()}
        id="1"
      />,
    );

    // You can add more specific assertions based on your component's content
    expect(screen.getByAltText("cat image")).toBeInTheDocument();
  });

  it("calls onClick when clicked and not selected or active", () => {
    const onClickMock = jest.fn();

    render(
      <Card
        url="/example.jpg"
        selected={false}
        active={false}
        onClick={onClickMock}
        id="2"
      />,
    );

    // Click the card
    fireEvent.click(screen.getByAltText("cat image"));

    // Check that onClickMock was called
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when clicked and selected", () => {
    const onClickMock = jest.fn();

    render(
      <Card
        url="/example.jpg"
        selected={true}
        active={false}
        onClick={onClickMock}
        id="2"
      />,
    );

    // Click the card
    fireEvent.click(screen.getByAltText("cat image"));

    // Check that onClickMock was not called
    expect(onClickMock).not.toHaveBeenCalled();
  });

  it("does not call onClick when clicked and active", () => {
    const onClickMock = jest.fn();

    render(
      <Card
        url="/example.jpg"
        selected={false}
        active={true}
        onClick={onClickMock}
        id="2"
      />,
    );

    // Click the card
    fireEvent.click(screen.getByAltText("cat image"));

    // Check that onClickMock was not called
    expect(onClickMock).not.toHaveBeenCalled();
  });

  // Add more test cases as needed
});
