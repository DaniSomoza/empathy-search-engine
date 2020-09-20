import React from "react";
import { render, screen } from "@testing-library/react";
import Loader from "./Loader";

describe("<Loader />", () => {
  it("Should render loader component if app is loading", () => {
    const { getByTestId } = render(
      <Loader isLoading>
        <div id={"child-content"} />
      </Loader>
    );

    const loaderNode = getByTestId("app-loader");
    const childrenNode = screen.queryByTestId("child-content");

    expect(loaderNode).toBeInTheDocument();
    expect(childrenNode).not.toBeInTheDocument();
  });

  it("Should hide loader component if app is not loading and render children content", () => {
    const { getByTestId } = render(
      <Loader isLoading={false}>
        <div id={"child-content"} />
      </Loader>
    );

    const loaderNode = screen.queryByTestId("app-loader");
    const childrenNode = getByTestId("child-content");

    expect(childrenNode).toBeInTheDocument();
    expect(loaderNode).not.toBeInTheDocument();
  });
});
