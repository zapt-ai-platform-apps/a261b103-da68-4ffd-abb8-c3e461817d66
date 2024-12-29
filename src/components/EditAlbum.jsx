import { createSignal, onMount } from 'solid-js';
import { useParams, useNavigate } from '@solidjs/router';
import AlbumForm from './AlbumForm';

export default function EditAlbum() {
  const params = useParams();
  const albumId = params.albumId;
  const [title, setTitle] = createSignal('');
  const [description, setDescription] = createSignal('');
  const [loading, setLoading] = createSignal(false);
  const navigate = useNavigate();

  onMount(() => {
    fetch(`/api/getPhotos?albumId=${albumId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.album) {
          setTitle(data.album.title);
          setDescription(data.album.description);
        }
      })
      .catch((error) => {
        console.error('Error fetching album details:', error);
      });
  });

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const authToken = localStorage.getItem('authToken');
      const response = await fetch('/api/updateAlbum', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({ albumId, title: title(), description: description() })
      });
      const data = await response.json();
      if (response.ok) {
        navigate(`/album/${albumId}`);
      } else {
        console.error('Error updating album:', data.error);
      }
    } catch (error) {
      console.error('Error updating album:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this album? This action cannot be undone.')) return;
    setLoading(true);
    try {
      const authToken = localStorage.getItem('authToken');
      const response = await fetch('/api/deleteAlbum', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({ albumId })
      });
      const data = await response.json();
      if (response.ok) {
        navigate('/');
      } else {
        console.error('Error deleting album:', data.error);
      }
    } catch (error) {
      console.error('Error deleting album:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="p-4 max-w-md mx-auto">
      <h2 class="text-2xl font-semibold mb-4 text-purple-600">Edit Album</h2>
      <AlbumForm
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        loading={loading}
      />
    </div>
  );
}