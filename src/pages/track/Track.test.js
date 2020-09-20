import React from "react";
import { render, wait, screen } from "@testing-library/react";
import Track from "./Track";
import Providers from "../../store";
import { BrowserRouter as Router } from "react-router-dom";

describe("<Track /> Page", () => {
  it("Should render Track Page and show Track details", async (done) => {
    const { getByTestId } = render(
      <Providers>
        <Router>
          <Track />
        </Router>
      </Providers>
    );

    await wait(() => {
      const trackNode = getByTestId("track-section");

      expect(trackNode).toBeInTheDocument();

      const trackNameNode = screen.queryByText("Track 3");

      expect(trackNode).toBeInTheDocument();
      expect(trackNameNode).toBeInTheDocument();

      done();
    });
  });
});
