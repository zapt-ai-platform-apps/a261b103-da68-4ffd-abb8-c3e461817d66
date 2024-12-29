import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import SolidMarkdown from 'solid-markdown';

export default function SharedAlbumView() {
  const { shareToken } = useParams();
  const [album, setAlbum] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/getPhotos?shareToken=${shareToken}`)
      .then((res) => res.json())
      .then((data) => {
        setAlbum(data.album);
        setPhotos(data.photos);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching shared album:', error);
        setLoading(false);
      });
  }, [shareToken]);

  if (loading) {
    return <div className="p-4">Loading shared album...</div>;
  }

  if (!album) {
    return <div className="p-4">Shared album not found.</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4 text-purple-600">{album.title}</h2>
      <p className="mb-4">{album.description}</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {photos.map((photo) => (
          <div key={photo.id} className="bg-white p-2 rounded shadow box-border">
            <img src={photo.url} alt={photo.caption} className="w-full h-48 object-cover rounded" />
            <p className="mt-2 text-gray-700">{photo.caption}</p>
          </div>
        ))}
      </div>
      <Link to="/" className="mt-4 inline-block text-blue-500 cursor-pointer">
        Back to Albums
      </Link>
    </div>
  );
}