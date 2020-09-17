import React from "react";
import "./search-gallery.css";
import GalleryItem from "./components/GalleryItem";

function SearchGallery() {
  return (
    <div className={"search-gallery-root"}>
      {items.map((item) => (
        <GalleryItem key={item.key} color={item.color} />
      ))}
    </div>
  );
}

export default SearchGallery;

const items = [
  {
    color: "purple",
    key: 1,
  },
  {
    color: "gold",
    key: 2,
  },
  {
    color: "green",
    key: 3,
  },
  {
    color: "purple",
    key: 4,
  },
  {
    color: "green",
    key: 5,
  },
  {
    color: "red",
    key: 6,
  },
  {
    color: "purple",
    key: 7,
  },
  {
    color: "green",
    key: 8,
  },
  {
    color: "green",
    key: 9,
  },
  {
    color: "green",
    key: 10,
  },
  {
    color: "red",
    key: 11,
  },
];
