import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import GalleryItem from "./components/GalleryItem";
import {
  useSearch,
  ALL_CATEGORIES,
  SEARCH_CATEGORIES,
} from "../../store/searchContext";
import Loader from "../../components/loader/Loader";
import "./home.css";

function Home() {
  const {
    items,
    searchInfo,
    category,
    loadMoreItems,
    hasMoreItems,
    isLoading,
    query,
  } = useSearch();

  const totalItemsLabel = getTotalItemsLabel(category, searchInfo);

  const hasItems = items.length > 0;

  return (
    <section id={"search-gallery"}>
      {query && (
        <Loader isLoading={isLoading}>
          {/* TODO: CREATE LABEL FOR SEARCH INFO */}
          <label>{totalItemsLabel}</label>
          <InfiniteScroll
            dataLength={items.length}
            next={loadMoreItems}
            hasMore={hasMoreItems}
            loader={<Loader isLoading />}
            endMessage={
              hasItems && (
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              )
            }
          >
            <div className={"search-gallery-root"}>
              {items.map((item) => (
                <GalleryItem key={item.id} type={item.type} item={item} />
              ))}
            </div>
          </InfiniteScroll>
        </Loader>
      )}
    </section>
  );
}

export default Home;

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
    return `${artistsLabel}, ${albumLabel}, ${tracksLabel} (${totalItems} items in total)`;
  }

  const categoryLabel = SEARCH_CATEGORIES.find(
    ({ value }) => value === category
  )?.label;

  return `${categoryLabel} founded: ${searchInfo[`${category}s`]?.total} items`;
}
