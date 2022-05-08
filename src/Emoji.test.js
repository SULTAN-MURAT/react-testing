import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import App from "./App";


describe("Emoji Results Testing", () => {
  let rows, input, emoji;

  beforeEach(() => {
    render(<App />);
    rows = screen.getAllByTestId("emoji_row");
    input = screen.getByTestId("input");
    emoji = screen.getByText(/1234/i);
  });

  test("Emoji List must be rendered", () => {
    expect(rows.length).toBeGreaterThan(0);
  });

  test("component must be rendered after filtering", async () => {
    const emojiText = "Grinning";
    userEvent.type(input, emojiText);
    expect(emoji).not.toBeInTheDocument();
  });

  test("Emoji list must be rendered up to input value", async () => {
    const inputValue = "Rage";
    userEvent.type(input, inputValue);
    const emoji = screen.getByText(inputValue);
    expect(emoji).toBeInTheDocument();
  });

  test("should copy to clipboard", () => {
    document.execCommand = jest.fn();
    userEvent.click(emoji);
    expect(document.execCommand).toBeCalledWith("copy");
    const copiedEmoji = window.ClipboardData;
    expect(copiedEmoji).toEqual(emoji.value);
  });
});
