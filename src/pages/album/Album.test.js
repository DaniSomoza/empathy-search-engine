import React from "react";
import { render, wait, screen } from "@testing-library/react";
import Album from "./Album";
import Providers from "../../store";
import { BrowserRouter as Router } from "react-router-dom";

describe("<Album /> Page", () => {
  it("Should render Album Page and show album details", async (done) => {
    const { getByTestId } = render(
      <Providers>
        <Router>
          <Album />
        </Router>
      </Providers>
    );

    await wait(() => {
      const albumNode = getByTestId("album-section");

      expect(albumNode).toBeInTheDocument();

      const albumNameNode = screen.queryByText("Album 2");

      expect(albumNode).toBeInTheDocument();
      expect(albumNameNode).toBeInTheDocument();

      done();
    });
  });
});
