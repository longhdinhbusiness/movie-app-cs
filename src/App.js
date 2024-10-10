import React from 'react';
import HomePage from './pages/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieDetailPage from './pages/MovieDetailPage';
import TopAppBar from './components/TopAppBar';
import GenrePage from './pages/GenrePage';
import { GenreProvider } from './context/GenreContext';
import { SearchProvider } from './context/SearchContext';
import SearchPage from './pages/SearchPage';
import FavoritePage from './pages/FavoritesPage';

const App = () => {
  return (
    <SearchProvider>
      <GenreProvider>
        <Router>
          <TopAppBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movie/:movieId" element={<MovieDetailPage />} />
            <Route path="/genre/:genreId" element={<GenrePage />} />
            <Route path="/search/:searchId" element={<SearchPage />} />
            <Route path="/favorites/" element={<FavoritePage />} />
          </Routes>
        </Router>
      </GenreProvider>
    </SearchProvider>
  );
};

export default App;
