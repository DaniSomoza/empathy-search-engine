import React from "react";
import { useHistory } from "react-router-dom";
import "./gallery-item.css";
import {
  TRACK_CATEGORY,
  ALBUM_CATEGORY,
  ARTIST_CATEGORY,
} from "../../../store/searchContext";
import artistPlaceholder from "../../../assets/artist-placeholder.jpeg";
import albumPlaceholder from "../../../assets/album-placeholder.jpg";
import trackPlaceholder from "../../../assets/track-placeholder.png";
import ImageCard from "../../image-card/ImageCard";

// TODO: refine this
function GalleryItem({ item, type }) {
  let history = useHistory();

  const redirectPath = getRedirectPath(item);

  const placeholder = getPlaceHolder(item);

  const images = getImages(item);

  return (
    <article
      id={`gallery-item-${item.id}`}
      className={"card-root"}
      onClick={() => {
        history.push(redirectPath);
      }}
    >
      <ImageCard height="240" images={images} placeholder={placeholder} />
    </article>
  );
}

export default GalleryItem;

const paths = {
  [TRACK_CATEGORY.value]: "/tracks",
  [ALBUM_CATEGORY.value]: "/albums",
  [ARTIST_CATEGORY.value]: "/artists",
};

function getRedirectPath(item) {
  const path = paths[item.type];

  return `${path}/${item.id}`;
}

function getImages(item) {
  const isTrackItem = TRACK_CATEGORY.value === item.type;

  if (isTrackItem) {
    return item.album?.images;
  }

  return item.images;
}

function getPlaceHolder(item) {
  const imagePlaceholders = {
    [TRACK_CATEGORY.value]: trackPlaceholder,
    [ALBUM_CATEGORY.value]: albumPlaceholder,
    [ARTIST_CATEGORY.value]: artistPlaceholder,
  };

  return imagePlaceholders[item.type];
}
