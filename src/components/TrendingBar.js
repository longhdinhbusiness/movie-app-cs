// TrendingMoviesSection.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Typography } from '@mui/material';
import MovieCard from './MovieCard';
import { ApiToken } from '../const/ApiToken';

const TrendingMoviesSection = () => {
  const [movies, setMovies] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc',
          {
            headers: {
              Authorization: ApiToken,
              accept: 'application/json',
            },
          }
        );
        setMovies(response.data.results);
        console.log(response);
      } catch (error) {
        console.error('Error fetching the movies:', error);
      }
    };

    fetchMovies();
  }, []);

  const handleScrollLeft = () => {
    setScrollPosition((prev) => Math.max(prev - 300, 0));
  };

  const handleScrollRight = () => {
    setScrollPosition((prev) =>
      Math.min(prev + 300, movies.length * 300 - 300)
    );
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography variant="h4">Trending Movies</Typography>
        <Box>
          <Button variant="outlined" sx={{ mr: 1 }}>
            Today
          </Button>
          <Button variant="outlined">This Week</Button>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', overflow: 'hidden', position: 'relative' }}>
        <Button
          variant="contained"
          onClick={handleScrollLeft}
          sx={{
            position: 'absolute',
            left: 0,
            zIndex: 1,
            backgroundColor: 'primary.main',
            color: 'white',
          }}
        >
          &lt; {/* Left Arrow */}
        </Button>

        <Box
          sx={{
            display: 'flex',
            transition: 'transform 0.3s ease',
            transform: `translateX(-${scrollPosition}px)`,
          }}
        >
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              poster={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              rating={movie.vote_average}
            />
          ))}
        </Box>

        <Button
          variant="contained"
          onClick={handleScrollRight}
          sx={{
            position: 'absolute',
            right: 0,
            zIndex: 1,
            backgroundColor: 'primary.main',
            color: 'white',
          }}
        >
          &gt; {/* Right Arrow */}
        </Button>
      </Box>
    </Box>
  );
};

export default TrendingMoviesSection;
