import React, { useState } from "react";
import useAutoFocus from "../hooks/useAutoFocus";
import ImageItem from "./ImageItem";

export default function ImageSearch({ images = [] }) {
  const [query, setQuery] = useState("");
  const inputRef = useAutoFocus();

  const normalized = query.trim().toLowerCase();
  const filtered = images.filter((img) =>
    img.title.toLowerCase().includes(normalized)
  );

  return (
    <div>
      <h2>Image Search</h2>
      <input
        ref={inputRef}
        type="text"
        placeholder="Kërko sipas titullit..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: 8, width: "100%", boxSizing: "border-box", marginBottom: 12 }}
      />

      {query === "" ? (
        <div>Shkruaj diçka për të kërkuar.</div>
      ) : filtered.length === 0 ? (
        <div>Nuk u gjetën rezultate.</div>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {filtered.map((img) => (
            <ImageItem key={img.id} image={img} />
          ))}
        </ul>
      )}
    </div>
  );
}