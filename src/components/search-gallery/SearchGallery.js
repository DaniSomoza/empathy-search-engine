import React from "react";
import GalleryItem from "./components/GalleryItem";
import {
  useSearch,
  ALL_CATEGORIES,
  SEARCH_CATEGORIES,
} from "../../store/searchContext";
import "./search-gallery.css";

function SearchGallery() {
  const { items, searchInfo, category } = useSearch();

  const totalItemsLabel = getTotalItemsLabel(category, searchInfo);

  return (
    <section>
      {items.length > 0 && <label>{totalItemsLabel}</label>}
      <div className={"search-gallery-root"}>
        {items.map((item) => (
          <GalleryItem key={item.id} type={item.type} item={item} />
        ))}
      </div>
    </section>
  );
}

export default SearchGallery;

function getTotalItemsLabel(category, searchInfo) {
  const totalItems =
    searchInfo.artists.total +
    searchInfo.tracks.total +
    searchInfo.albums.total;

  const isAllCategoriesSelected = category === ALL_CATEGORIES.value;

  if (isAllCategoriesSelected) {
    const artistsLabel = `Artists founded: ${searchInfo.artists.total} items`;
    const albumLabel = `Albums founded: ${searchInfo.albums.total} items`;
    const tracksLabel = `Tracks founded: ${searchInfo.tracks.total} items`;
    return `${artistsLabel}, ${albumLabel}, ${tracksLabel} (${totalItems} total items)`;
  }

  const categoryLabel = SEARCH_CATEGORIES.find(
    ({ value }) => value === category
  )?.label;

  return `${categoryLabel} founded: ${searchInfo[`${category}s`]?.total} items`;
}
