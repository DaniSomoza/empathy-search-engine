import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";
import SearchEngine from "./SearchEngine";
import Providers from "../../store";
import { spiedEndpoints } from "../../setupTests";

describe("<SearchEngine />", () => {
  it("Should render search field component", () => {
    const { getByTestId } = render(
      <Providers>
        <SearchEngine />
      </Providers>
    );

    const searchEngineNode = getByTestId("search-engine");
    expect(searchEngineNode).toBeInTheDocument();
  });

  it("Should call search endpoint when user types", async (done) => {
    const { getByTestId } = render(
      <Providers>
        <SearchEngine />
      </Providers>
    );

    const searchInputNode = getByTestId("search-query-input");

    const query = "test";

    fireEvent.change(searchInputNode, { target: { value: query } });

    await wait(() => {
      const page = 1;
      const amount = 15;
      expect(spiedEndpoints.searchAll).toHaveBeenCalledWith(
        query,
        page,
        amount
      );
      expect(spiedEndpoints.searchArtists).not.toHaveBeenCalled();
      expect(spiedEndpoints.searchTracks).not.toHaveBeenCalled();
      expect(spiedEndpoints.searchAlbums).not.toHaveBeenCalled();
      done();
    });
  });

  it("Should NOT call search endpoint when user is typing a query", async (done) => {
    const { getByTestId } = render(
      <Providers>
        <SearchEngine />
      </Providers>
    );

    const searchInputNode = getByTestId("search-query-input");

    fireEvent.change(searchInputNode, { target: { value: "t" } });

    fireEvent.change(searchInputNode, { target: { value: "te" } });

    fireEvent.change(searchInputNode, { target: { value: "tes" } });

    const completeQuery = "test";

    fireEvent.change(searchInputNode, { target: { value: completeQuery } });

    await wait(() => {
      const page = 1;
      const amount = 15;
      expect(spiedEndpoints.searchAll).not.toHaveBeenCalledWith("t");
      expect(spiedEndpoints.searchAll).not.toHaveBeenCalledWith("te");
      expect(spiedEndpoints.searchAll).not.toHaveBeenCalledWith("tes");
      expect(spiedEndpoints.searchAll).toHaveBeenCalledWith(
        completeQuery,
        page,
        amount
      );
      done();
    });
  });

  it("Should call search Artist endpoint when user selects artist in the dropdown", async (done) => {
    const { getByTestId } = render(
      <Providers>
        <SearchEngine />
      </Providers>
    );

    const categoryDropdownNode = getByTestId("category-dropdown");

    const category = "artist";

    fireEvent.change(categoryDropdownNode, { target: { value: category } });

    const searchInputNode = getByTestId("search-query-input");

    const query = "test";

    fireEvent.change(searchInputNode, { target: { value: query } });

    await wait(() => {
      const page = 1;
      const amount = 30;
      expect(spiedEndpoints.searchAll).not.toHaveBeenCalled();
      expect(spiedEndpoints.searchArtists).toHaveBeenCalledWith(
        query,
        page,
        amount
      );
      expect(spiedEndpoints.searchTracks).not.toHaveBeenCalled();
      expect(spiedEndpoints.searchAlbums).not.toHaveBeenCalled();
      done();
    });
  });

  it("Should call search Album endpoint when user selects album in the dropdown", async (done) => {
    const { getByTestId } = render(
      <Providers>
        <SearchEngine />
      </Providers>
    );

    const categoryDropdownNode = getByTestId("category-dropdown");

    const category = "album";

    fireEvent.change(categoryDropdownNode, { target: { value: category } });

    const searchInputNode = getByTestId("search-query-input");

    const query = "test";

    fireEvent.change(searchInputNode, { target: { value: query } });

    await wait(() => {
      const page = 1;
      const amount = 30;
      expect(spiedEndpoints.searchAll).not.toHaveBeenCalled();
      expect(spiedEndpoints.searchAlbums).toHaveBeenCalledWith(
        query,
        page,
        amount
      );
      expect(spiedEndpoints.searchArtists).not.toHaveBeenCalled();
      expect(spiedEndpoints.searchTracks).not.toHaveBeenCalled();
      done();
    });
  });

  it("Should call search Track endpoint when user selects tracks in the dropdown", async (done) => {
    const { getByTestId } = render(
      <Providers>
        <SearchEngine />
      </Providers>
    );

    const categoryDropdownNode = getByTestId("category-dropdown");

    const category = "track";

    fireEvent.change(categoryDropdownNode, { target: { value: category } });

    const searchInputNode = getByTestId("search-query-input");

    const query = "test";

    fireEvent.change(searchInputNode, { target: { value: query } });

    await wait(() => {
      const page = 1;
      const amount = 30;
      expect(spiedEndpoints.searchAll).not.toHaveBeenCalled();
      expect(spiedEndpoints.searchTracks).toHaveBeenCalledWith(
        query,
        page,
        amount
      );
      expect(spiedEndpoints.searchAlbums).not.toHaveBeenCalled();
      expect(spiedEndpoints.searchArtists).not.toHaveBeenCalled();
      done();
    });
  });
  it("Should call search all endpoint when user selects an invalid category", async (done) => {
    const { getByTestId } = render(
      <Providers>
        <SearchEngine />
      </Providers>
    );

    const categoryDropdownNode = getByTestId("category-dropdown");

    const category = "no existing category";

    fireEvent.change(categoryDropdownNode, { target: { value: category } });

    const searchInputNode = getByTestId("search-query-input");

    const query = "test";

    fireEvent.change(searchInputNode, { target: { value: query } });

    await wait(() => {
      const page = 1;
      const amount = 15;
      expect(spiedEndpoints.searchAll).toHaveBeenCalledWith(
        query,
        page,
        amount
      );
      expect(spiedEndpoints.searchArtists).not.toHaveBeenCalled();
      expect(spiedEndpoints.searchTracks).not.toHaveBeenCalled();
      expect(spiedEndpoints.searchAlbums).not.toHaveBeenCalled();
      done();
    });
  });

  it("Should NOT call search endpoint when query input is clear by the user", async (done) => {
    const store = {
      search: {
        query: "value ready for clear",
      },
    };

    const { getByTestId } = render(
      <Providers store={store}>
        <SearchEngine />
      </Providers>
    );

    const searchInputNode = getByTestId("search-query-input");

    expect(searchInputNode.value).toEqual("value ready for clear");

    fireEvent.change(searchInputNode, { target: { value: "" } });

    await wait(() => {
      expect(spiedEndpoints.searchAll).not.toHaveBeenCalled();
      done();
    });
  });
});
