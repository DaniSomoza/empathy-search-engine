import React from "react";
import { useSearch, SEARCH_CATEGORIES } from "../store/searchContext";
import "./search.css";

function SearchEngine() {
  const { query, category, onChangeQuery, onChangeCategory } = useSearch();

  return (
    <div className="search-root">
      <form className="search-form">
        <div className="search-category-selector-container">
          <select
            id={"category-dropdown"}
            defaultValue={category}
            onChange={(event) => onChangeCategory(event.target.value)}
            name="category"
            className="category-selector"
            aria-describedby="searchDropdownCategory"
          >
            {SEARCH_CATEGORIES.map((category) => (
              <option key={category.label} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
        <div className="search-input-container">
          <input
            id={"search-query-input"}
            className="search-input"
            onChange={(event) => onChangeQuery(event.target.value)}
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
