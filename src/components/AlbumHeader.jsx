import React from 'react';

export default function AlbumHeader({ album, onShare }) {
  return (
    <>
      <h2 className="text-2xl font-semibold mb-4 text-purple-600">{album.title}</h2>
      <p className="mb-4">{album.description}</p>
      <button
        onClick={onShare}
        className="mb-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded cursor-pointer transition duration-300"
      >
        Share Album
      </button>
    </>
  );
}