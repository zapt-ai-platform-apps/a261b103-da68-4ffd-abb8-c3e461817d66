import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function AlbumList() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/getAlbums', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setAlbums(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching albums:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-4">Loading albums...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4 text-purple-600">Your Albums</h2>
      {albums.length === 0 ? (
        <p>No albums found. <Link to="/create" className="text-blue-500">Create one now!</Link></p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {albums.map((album) => (
            <div key={album.id} className="bg-white p-4 rounded shadow cursor-pointer box-border">
              <h3 className="text-xl font-bold text-purple-600">{album.title}</h3>
              <p className="text-gray-700">{album.description}</p>
              <div className="mt-2 flex justify-between">
                <Link to={`/album/${album.id}`} className="text-blue-500 cursor-pointer">
                  View
                </Link>
                <Link to={`/edit/${album.id}`} className="text-green-500 cursor-pointer">
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}