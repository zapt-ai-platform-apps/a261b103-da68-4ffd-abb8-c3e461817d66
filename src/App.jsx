import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AlbumList from './components/AlbumList';
import AlbumDetail from './components/AlbumDetail';
import SharedAlbumView from './components/SharedAlbumView';
import CreateAlbum from './components/CreateAlbum';
import EditAlbum from './components/EditAlbum';
import UploadPhoto from './components/UploadPhoto';
import Header from './components/Header';
import './index.css';

function App() {
  return (
    <div className="h-full bg-gray-100 text-gray-800 box-border">
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<AlbumList />} />
          <Route path="/create" element={<CreateAlbum />} />
          <Route path="/edit/:albumId" element={<EditAlbum />} />
          <Route path="/album/:albumId" element={<AlbumDetail />} />
          <Route path="/view/:shareToken" element={<SharedAlbumView />} />
        </Routes>
      </Router>
      <a
        href="https://www.zapt.ai"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 text-sm text-blue-500 cursor-pointer"
      >
        Made on ZAPT
      </a>
    </div>
  );
}

export default App;