import React, { useState } from 'react';

export default function UploadPhoto({ albumId, onUpload }) {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a photo to upload.');
      return;
    }
    setLoading(true);
    try {
      const authToken = localStorage.getItem('authToken');
      const formData = new FormData();
      formData.append('photo', file);
      formData.append('albumId', albumId);
      formData.append('caption', caption);

      const response = await fetch('/api/uploadPhoto', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`
        },
        body: formData
      });

      const data = await response.json();
      if (response.ok) {
        setFile(null);
        setCaption('');
        onUpload();
      } else {
        console.error('Error uploading photo:', data.error);
      }
    } catch (error) {
      console.error('Error uploading photo:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleUpload} className="mb-4 space-y-2">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
        className="block w-full text-gray-700 cursor-pointer"
        required
      />
      <input
        type="text"
        placeholder="Caption"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded box-border focus:ring-2 focus:ring-purple-400 focus:border-transparent"
      />
      <button
        type="submit"
        className={`w-full py-2 px-4 bg-green-500 text-white rounded cursor-pointer transition duration-300 ${loading ? 'opacity-50' : 'hover:bg-green-600'}`}
        disabled={loading}
      >
        {loading ? 'Uploading...' : 'Upload Photo'}
      </button>
    </form>
  );
}