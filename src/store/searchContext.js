import React, { useState, useEffect } from "react";
import getUrlParam from "../helpers/getUrlParam";
import {
  searchAll,
  searchTracks,
  searchAlbums,
  searchArtists,
} from "../http/search/search";
import scrollToTop from "../helpers/scrollToTop";

const SearchContext = React.createContext();

export const ALL_CATEGORIES = { label: "All", value: "all-categories" };
export const TRACK_CATEGORY = { label: "Tracks", value: "track" };
export const ALBUM_CATEGORY = { label: "Albums", value: "album" };
export const ARTIST_CATEGORY = { label: "Artists", value: "artist" };

export const SEARCH_CATEGORIES = [
  ALL_CATEGORIES,
  TRACK_CATEGORY,
  ALBUM_CATEGORY,
  ARTIST_CATEGORY,
];

const REQUEST_TIMEOUT = 350; // we perform the search request after 350 milliseconds after the user types

function useSearch() {
  const context = React.useContext(SearchContext);

  if (!context) {
    throw new Error(
      "[STATE ERROR] useSearch must be used within a SearchContext"
    );
  }

  return context;
}

function SearchProvider(props) {
  const [query, setQuery] = useState(getUrlParam("query") || "");
  const [category, setCategory] = useState(
    getUrlParam("category") || ALL_CATEGORIES.value
  );
  const [items, setItems] = useState([]);
  const [searchInfo, setSearchInfo] = useState({
    albums: {
      items: [],
      total: 0,
    },
    artists: {
      items: [],
      total: 0,
    },
    tracks: {
      items: [],
      total: 0,
    },
    totalItems: 0,
  });
  const [page, setPage] = useState(1);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function performSearch() {
      if (query) {
        try {
          setIsLoading(true);
          const searchEndpoints = {
            [ALL_CATEGORIES.value]: searchAll,
            [TRACK_CATEGORY.value]: searchTracks,
            [ALBUM_CATEGORY.value]: searchAlbums,
            [ARTIST_CATEGORY.value]: searchArtists,
          };
          const amounts = {
            [ALL_CATEGORIES.value]: 10,
            [TRACK_CATEGORY.value]: 30,
            [ALBUM_CATEGORY.value]: 30,
            [ARTIST_CATEGORY.value]: 30,
          };
          const amount = amounts[category];
          const searchEndpoint = searchEndpoints[category] || searchAll;
          const firstPage = 1;
          const {
            albums = { items: [], total: 0 },
            artists = { items: [], total: 0 },
            tracks = { items: [], total: 0 },
          } = await searchEndpoint(query, firstPage, amount);
          setItems(combineItems(albums.items, artists.items, tracks.items));
          setSearchInfo({
            artists,
            albums,
            tracks,
            totalItems: artists.total + albums.total + tracks.total,
          });
          setIsLoading(false);
        } catch (error) {
          // TODO: HANDLE UNHAPPY PATH
          setIsLoading(false);
          console.log(error);
        }
      } else {
        setItems([]);
        setPage(1);
        setIsLoading(false);
      }
    }
    const performSearchTimeOut = setTimeout(performSearch, REQUEST_TIMEOUT);

    return () => {
      clearTimeout(performSearchTimeOut);
    };
  }, [category, query]);

  function onChangeQuery(query) {
    scrollToTop();
    // TODO: ADD LOADER
    setQuery(query);
  }

  function onChangeCategory(category) {
    scrollToTop();
    setCategory(category);
  }

  async function loadMoreItems() {
    try {
      const searchEndpoints = {
        [ALL_CATEGORIES.value]: searchAll,
        [TRACK_CATEGORY.value]: searchTracks,
        [ALBUM_CATEGORY.value]: searchAlbums,
        [ARTIST_CATEGORY.value]: searchArtists,
      };
      const amounts = {
        [ALL_CATEGORIES.value]: 10,
        [TRACK_CATEGORY.value]: 30,
        [ALBUM_CATEGORY.value]: 30,
        [ARTIST_CATEGORY.value]: 30,
      };
      const amount = amounts[category];
      const searchEndpoint = searchEndpoints[category] || searchAll;
      const nextPage = page + 1;
      const {
        albums = { items: [], total: 0 },
        artists = { items: [], total: 0 },
        tracks = { items: [], total: 0 },
      } = await searchEndpoint(query, nextPage, amount);
      setPage(nextPage);
      // TODO: HANDLE DUPLICATE ITEMS!!!
      setItems([
        ...items,
        ...combineItems(albums.items, artists.items, tracks.items),
      ]);
      setSearchInfo({
        artists: {
          items: [...searchInfo.artists.items, ...artists.items],
          total: artists.total,
        },
        albums: {
          items: [...searchInfo.albums.items, ...albums.items],
          total: albums.total,
        },
        tracks: {
          items: [...searchInfo.tracks.items, ...tracks.items],
          total: tracks.total,
        },
        totalItems: artists.total + albums.total + tracks.total,
      });
    } catch (error) {
      // TODO: HANDLE UNHAPPY PATH
      console.log(error);
    }
  }

  const hasMoreItems = searchInfo.totalItems !== items.length;

  const state = {
    query,
    category,

    onChangeQuery,
    onChangeCategory,

    items,
    searchInfo,

    loadMoreItems,
    hasMoreItems,

    isLoading,

    ...props.store,
  };

  return <SearchContext.Provider value={state} {...props} />;
}

export { useSearch, SearchProvider };

function combineItems(albums = [], tracks = [], artist = []) {
  const totalItems = albums.length + tracks.length + artist.length;
  const combinedItems = [];
  for (let i = 0; i < totalItems; i++) {
    if (i < albums.length) {
      combinedItems.push(albums[i]);
    }
    if (i < tracks.length) {
      combinedItems.push(tracks[i]);
    }
    if (i < artist.length) {
      combinedItems.push(artist[i]);
    }
  }
  return combinedItems;
}
