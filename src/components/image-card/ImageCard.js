import React from "react";
import "./image-card.css";

// TODO: Implement loader fantasy!
function ImageCard({ images, alt, placeholder, height, width }) {
  const imageUrl = images[0]?.url || placeholder;

  return (
    <img
      className={"image-card"}
      height={height}
      width={width || "100%"}
      src={imageUrl}
      alt={`${alt}-card`}
    />
  );
}

export default ImageCard;
