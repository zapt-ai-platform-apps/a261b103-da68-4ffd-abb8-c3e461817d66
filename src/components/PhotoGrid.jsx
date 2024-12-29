import React from 'react';

export default function PhotoGrid({ photos }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {photos.map((photo) => (
        <div key={photo.id} className="bg-white p-2 rounded shadow box-border">
          <img src={photo.url} alt={photo.caption} className="w-full h-48 object-cover rounded" />
          <p className="mt-2 text-gray-700">{photo.caption}</p>
        </div>
      ))}
    </div>
  );
}