import React from "react";

export default function ImageItem({ image }) {
  if (!image) return null;
  return (
    <li style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
      <img
        src={image.thumbnailUrl}
        alt={image.title}
        width={80}
        height={80}
        style={{ marginRight: 12, objectFit: "cover", borderRadius: 4 }}
      />
      <div>{image.title}</div>
    </li>
  );
}