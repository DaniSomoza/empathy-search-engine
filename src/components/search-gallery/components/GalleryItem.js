import React from "react";
import "./gallery-item.css";
import { TRACK_CATEGORY } from "../../../store/searchContext";

// TODO: refine this
function GalleryItem({ item, type }) {
  // album item.images[3] con un height
  // artist item.images[3] con un height
  // tracks NO IMAGES USE ALBUM INSTEAD  item.album.images[3] con un height
  const imageUrl = getImageUrl(item);
  console.log(imageUrl);
  return (
    <div
      className={"card-root"}
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      {type}
    </div>
  );
}

export default GalleryItem;

function getImageUrl(item) {
  const isTrackItem = TRACK_CATEGORY.value === item.type;

  if (isTrackItem) {
    return item.album?.images[0]?.url;
  }

  return item.images[0]?.url;
}
