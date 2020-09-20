import React from "react";
import { render } from "@testing-library/react";
import ImageCard from "./ImageCard";

describe("<Header />", () => {
  it("Should render header component", () => {
    const id = "myId";
    const alt = "test";
    const images = [];

    const { getByTestId } = render(
      <ImageCard id={id} images={images} alt={alt} />
    );

    const imageNode = getByTestId(`${id}-image`);
    expect(imageNode).toBeInTheDocument();
  });
});
