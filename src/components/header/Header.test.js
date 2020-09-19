import React from "react";
import { render } from "@testing-library/react";
import Header from "./Header";
import Providers from "../../store";

describe("<Header />", () => {
  it("Should render header component", () => {
    const { getByTestId } = render(
      <Providers>
        <Header />
      </Providers>
    );

    const headerNode = getByTestId("app-header");
    expect(headerNode).toBeInTheDocument();
  });
});
