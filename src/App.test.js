import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  const { getByTestId } = render(<App />);

  const headerNode = getByTestId("app-header");
  expect(headerNode).not.toBeInTheDocument();

  const contentNode = getByTestId("app-content");
  expect(contentNode).toBeInTheDocument();
});
