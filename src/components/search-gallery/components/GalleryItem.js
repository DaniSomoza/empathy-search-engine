import React from "react";
import "./gallery-item.css";

const colors = {
  album: "green",
  track: "gold",
  artist: "red",
};

function GalleryItem({ item, type }) {
  return (
    <div className={"card-root"} style={{ backgroundColor: colors[type] }}>
      {type}
    </div>
  );
}

export default GalleryItem;
