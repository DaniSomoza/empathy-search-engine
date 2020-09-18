import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  const { getByText } = render(<App />);

  // TODO: ADD A BASIC ID TEST
  // const linkElement = getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});
