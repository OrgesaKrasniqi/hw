import React, { useState, useEffect } from "react";
import ImageItem from "./ImageItem";

export default function ImageGallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchPhotos() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/photos", { signal });
        if (!res.ok) {
          throw new Error(`Network response was not ok (${res.status})`);
        }
        const data = await res.json();
        // Opsional: kufizoj numrin e imazheve për performancë
        setImages(data.slice(0, 100));
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Ndodhi një gabim gjatë marrjes së të dhënave.");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchPhotos();

    return () => {
      controller.abort();
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Image Gallery</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {images.map((img) => (
          <ImageItem key={img.id} image={img} />
        ))}
      </ul>
    </div>
  );
}