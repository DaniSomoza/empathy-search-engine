import React from "react";
import { render, wait, screen } from "@testing-library/react";
import Artist from "./Artist";
import Providers from "../../store";
import { BrowserRouter as Router } from "react-router-dom";

describe("<Artist /> Page", () => {
  it("Should render Artist Page and show Artist details", async (done) => {
    const { getByTestId } = render(
      <Providers>
        <Router>
          <Artist />
        </Router>
      </Providers>
    );

    await wait(() => {
      const artistNode = getByTestId("artist-section");

      expect(artistNode).toBeInTheDocument();

      const artistNameNode = screen.queryByText("Artist 1");

      expect(artistNode).toBeInTheDocument();
      expect(artistNameNode).toBeInTheDocument();

      done();
    });
  });
});
