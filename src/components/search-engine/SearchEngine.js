import React, { useEffect, useState } from "react";
import "./search.css";
import {
  searchAll,
  searchTracks,
  searchAlbums,
  searchArtists,
} from "../../http/spotify/spotify";
import getUrlParam from "../../helpers/getUrlParam";

const REQUEST_TIMEOUT = 350; // we perform the search request after 350 milliseconds after the user types

const ALL_CATEGORIES = "all-categories";
const TRACK_CATEGORY = "track";
const ALBUM_CATEGORY = "album";
const ARTIST_CATEGORY = "artist";

function SearchEngine() {
  const [query, setQuery] = useState(getUrlParam("query") || "");
  const [category, setCategory] = useState(
    getUrlParam("category") || ALL_CATEGORIES
  );

  // TODO: Create searchProvider
  useEffect(() => {
    async function performSearch() {
      if (query) {
        const endpoints = {
          [ALL_CATEGORIES]: searchAll,
          [TRACK_CATEGORY]: searchTracks,
          [ALBUM_CATEGORY]: searchAlbums,
          [ARTIST_CATEGORY]: searchArtists,
        };
        const endpoint = endpoints[category];
        const response = await endpoint(query);
        console.log(response);
      }
    }
    const performSearchTimeOut = setTimeout(performSearch, REQUEST_TIMEOUT);

    return () => {
      clearTimeout(performSearchTimeOut);
      // TODO: Cancel axios request
    };
  }, [category, query]);

  function onChangeQuery(event) {
    event.preventDefault();
    // TODO: ADD LOADER
    setQuery(event.target.value);
  }

  return (
    <div className="search-root">
      <form className="search-form">
        <div className="search-category-selector-container">
          <select
            id={"category-dropdown"}
            defaultValue={category}
            onChange={(event) => setCategory(event.target.value)}
            name="category"
            className="category-selector"
            aria-describedby="searchDropdownCategory"
          >
            <option value={ALL_CATEGORIES}>{"All"}</option>
            <option value={TRACK_CATEGORY}>{"Track"}</option>
            <option value={ARTIST_CATEGORY}>{"Artist"}</option>
            <option value={ALBUM_CATEGORY}>{"Album"}</option>
          </select>
        </div>
        <div className="search-input-container">
          <input
            id={"search-query-input"}
            className="search-input"
            onChange={onChangeQuery}
            value={query}
            type="text"
            name="query"
          ></input>
        </div>
        <div className="search-button-container">
          <input className="search-button" type="submit" />
        </div>
      </form>
    </div>
  );
}

export default SearchEngine;
