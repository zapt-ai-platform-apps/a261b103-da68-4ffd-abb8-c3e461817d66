import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-purple-600 cursor-pointer">
        Photo Album App
      </Link>
      <Link
        to="/create"
        className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded cursor-pointer transition duration-300"
      >
        Create Album
      </Link>
    </header>
  );
}