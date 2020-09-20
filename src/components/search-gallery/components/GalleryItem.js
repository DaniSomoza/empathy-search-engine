import React from "react";
import "./gallery-item.css";
import {
  TRACK_CATEGORY,
  ALBUM_CATEGORY,
  ARTIST_CATEGORY,
} from "../../../store/searchContext";
import artistPlaceholder from "../../../assets/artist-placeholder.jpeg";
import albumPlaceholder from "../../../assets/album-placeholder.jpg";
import trackPlaceholder from "../../../assets/track-placeholder.png";

// TODO: refine this
function GalleryItem({ item, type }) {
  // album item.images[3] con un height
  // artist item.images[3] con un height
  // tracks NO IMAGES USE ALBUM INSTEAD  item.album.images[3] con un height
  const imageUrl = getImageUrl(item);
  // console.log(imageUrl);
  return (
    <article
      id={`gallery-item-${item.id}`}
      className={"card-root"}
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    />
  );
}

export default GalleryItem;

const imagePlaceholders = {
  [TRACK_CATEGORY.value]: trackPlaceholder,
  [ALBUM_CATEGORY.value]: albumPlaceholder,
  [ARTIST_CATEGORY.value]: artistPlaceholder,
};

function getImageUrl(item) {
  const isTrackItem = TRACK_CATEGORY.value === item.type;

  const placeholder = imagePlaceholders[item.type];

  if (isTrackItem) {
    return item.album?.images[0]?.url || placeholder;
  }

  return item.images[0]?.url || placeholder;
}
