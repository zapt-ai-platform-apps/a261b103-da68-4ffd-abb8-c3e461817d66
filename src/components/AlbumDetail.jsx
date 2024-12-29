import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UploadPhoto from './UploadPhoto';
import AlbumHeader from './AlbumHeader';
import PhotoGrid from './PhotoGrid';

export default function AlbumDetail() {
  const { albumId } = useParams();
  const [album, setAlbum] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAlbumDetails = () => {
    fetch(`/api/getPhotos?albumId=${albumId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setAlbum(data.album);
        setPhotos(data.photos);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching album details:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAlbumDetails();
  }, [albumId]);

  const handleShare = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      const response = await fetch('/api/shareAlbum', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({ albumId })
      });
      const data = await response.json();
      if (response.ok) {
        navigator.clipboard.writeText(data.shareLink);
        alert('Share link copied to clipboard!');
      } else {
        console.error('Error sharing album:', data.error);
      }
    } catch (error) {
      console.error('Error sharing album:', error);
    }
  };

  if (loading) {
    return <div className="p-4">Loading album details...</div>;
  }

  if (!album) {
    return <div className="p-4">Album not found.</div>;
  }

  return (
    <div className="p-4">
      <AlbumHeader album={album} onShare={handleShare} />
      <UploadPhoto albumId={albumId} onUpload={fetchAlbumDetails} />
      <PhotoGrid photos={photos} />
    </div>
  );
}