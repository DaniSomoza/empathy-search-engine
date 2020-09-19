import React, { useState, useEffect } from "react";
import getUrlParam from "../helpers/getUrlParam";
import {
  searchAll,
  searchTracks,
  searchAlbums,
  searchArtists,
} from "../http/search/search";

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
  });

  useEffect(() => {
    async function performSearch() {
      if (query) {
        const searchEndpoints = {
          [ALL_CATEGORIES.value]: searchAll,
          [TRACK_CATEGORY.value]: searchTracks,
          [ALBUM_CATEGORY.value]: searchAlbums,
          [ARTIST_CATEGORY.value]: searchArtists,
        };
        const searchEndpoint = searchEndpoints[category] || searchAll;
        const {
          albums = { items: [], total: 0 },
          artists = { items: [], total: 0 },
          tracks = { items: [], total: 0 },
        } = await searchEndpoint(query);
        // console.log("Albums: ", albums);
        // console.log("Artists: ", artists);
        // console.log("Tracks: ", tracks);
        setItems(combineItems(albums.items, artists.items, tracks.items));
        setSearchInfo({ artists, albums, tracks });
      } else {
        setItems([]);
      }
    }
    const performSearchTimeOut = setTimeout(performSearch, REQUEST_TIMEOUT);

    return () => {
      clearTimeout(performSearchTimeOut);
      // TODO: Cancel axios request
    };
  }, [category, query]);

  // TODO: CREATE LOAD MORE ITEMS

  function onChangeQuery(query) {
    // TODO: ADD LOADER
    setQuery(query);
  }

  function onChangeCategory(category) {
    setCategory(category);
  }

  const state = {
    query,
    category,

    onChangeQuery,
    onChangeCategory,

    items,
    searchInfo,

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
