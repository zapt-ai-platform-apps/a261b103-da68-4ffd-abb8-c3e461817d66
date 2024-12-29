import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateAlbum() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const authToken = localStorage.getItem('authToken');
      const response = await fetch('/api/createAlbum', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({ title, description })
      });
      const data = await response.json();
      if (response.ok) {
        navigate(`/album/${data.id}`);
      } else {
        console.error('Error creating album:', data.error);
      }
    } catch (error) {
      console.error('Error creating album:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-purple-600">Create New Album</h2>
      <form onSubmit={handleCreate} className="space-y-4">
        <input
          type="text"
          placeholder="Album Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded box-border focus:ring-2 focus:ring-purple-400 focus:border-transparent"
          required
        />
        <textarea
          placeholder="Album Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded box-border focus:ring-2 focus:ring-purple-400 focus:border-transparent"
        />
        <button
          type="submit"
          className={`w-full py-2 px-4 bg-purple-500 text-white rounded cursor-pointer transition duration-300 ${loading ? 'opacity-50' : 'hover:bg-purple-600'}`}
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Album'}
        </button>
      </form>
    </div>
  );
}