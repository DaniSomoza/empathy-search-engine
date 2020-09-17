import React from "react";
import "./gallery-item.css";

function GalleryItem({ color }) {
  return (
    <div
      className={"card-root"}
      style={{
        backgroundColor: color,
      }}
    />
  );
}

export default GalleryItem;
