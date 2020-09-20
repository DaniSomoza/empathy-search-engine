import React from "react";
import { render } from "@testing-library/react";
import Providers from "../../store";
import SEARCH_ALL_MOCK from "../../../internals/request/searchAll";
import SEARCH_ALBUMS_MOCK from "../../../internals/request/searchAlbums";
import Home from "./Home";

describe("<Home /> Page", () => {
  it("Should render search field component", () => {
    const { getByTestId } = render(
      <Providers>
        <Home />
      </Providers>
    );

    const SearchGalleryNode = getByTestId("search-gallery");
    expect(SearchGalleryNode).toBeInTheDocument();
  });

  it("Should render all items for all categories", () => {
    const store = {
      search: {
        items: [
          ...SEARCH_ALL_MOCK.artists.items,
          ...SEARCH_ALL_MOCK.albums.items,
          ...SEARCH_ALL_MOCK.tracks.items,
        ],
        category: "all-categories",
        query: "query",
        isLoading: false,
        hasMoreItems: false,
        searchInfo: {
          albums: {
            items: SEARCH_ALL_MOCK.albums.items,
            total: SEARCH_ALL_MOCK.albums.total,
          },
          artists: {
            items: SEARCH_ALL_MOCK.artists.items,
            total: SEARCH_ALL_MOCK.artists.total,
          },
          tracks: {
            items: SEARCH_ALL_MOCK.tracks.items,
            total: SEARCH_ALL_MOCK.tracks.total,
          },
          totalItems: 3,
        },
      },
    };

    const { getByTestId } = render(
      <Providers store={store}>
        <Home />
      </Providers>
    );

    // we check that all items are present
    const artistItemNode = getByTestId("gallery-item-1");
    expect(artistItemNode).toBeInTheDocument();
    const albumItemNode = getByTestId("gallery-item-2");
    expect(albumItemNode).toBeInTheDocument();
    const trackItemNode = getByTestId("gallery-item-3");
    expect(trackItemNode).toBeInTheDocument();
  });

  it("Should render informative label for all categories", () => {
    const store = {
      search: {
        items: [
          ...SEARCH_ALL_MOCK.artists.items,
          ...SEARCH_ALL_MOCK.albums.items,
          ...SEARCH_ALL_MOCK.tracks.items,
        ],
        category: "all-categories",
        query: "query",
        isLoading: false,
        hasMoreItems: false,
        searchInfo: {
          albums: {
            items: SEARCH_ALL_MOCK.albums.items,
            total: SEARCH_ALL_MOCK.albums.total,
          },
          artists: {
            items: SEARCH_ALL_MOCK.artists.items,
            total: SEARCH_ALL_MOCK.artists.total,
          },
          tracks: {
            items: SEARCH_ALL_MOCK.tracks.items,
            total: SEARCH_ALL_MOCK.tracks.total,
          },
          totalItems: 3,
        },
      },
    };

    const { getByText } = render(
      <Providers store={store}>
        <Home />
      </Providers>
    );

    const infoLabel =
      "Artists founded: 1 items, Albums founded: 1 items, Tracks founded: 1 items (3 items in total)";

    // we check that label is present
    const infoLabelNode = getByText(infoLabel);
    expect(infoLabelNode).toBeInTheDocument();
  });

  it("Should render informative label for album category", () => {
    const store = {
      search: {
        items: [...SEARCH_ALBUMS_MOCK.albums.items],
        category: "album",
        query: "query",
        isLoading: false,
        hasMoreItems: false,
        searchInfo: {
          albums: {
            items: SEARCH_ALBUMS_MOCK.albums.items,
            total: SEARCH_ALBUMS_MOCK.albums.total,
          },
          artists: {
            items: [],
            total: 0,
          },
          tracks: {
            items: [],
            total: 0,
          },
          totalItems: 1,
        },
      },
    };

    const { getByText } = render(
      <Providers store={store}>
        <Home />
      </Providers>
    );

    const infoLabel = "Albums founded: 1 items";

    // we check that label is present
    const infoLabelNode = getByText(infoLabel);
    expect(infoLabelNode).toBeInTheDocument();
  });

  // TODO: ADD ALL TEST FOR ARTIST AND TRACK SELECTED CATEGORY
});
