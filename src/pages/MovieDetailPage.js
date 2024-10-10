import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Paper, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { ApiToken } from '../const/ApiToken';

const MovieDetailPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [posterUrl, setPosterUrl] = useState('');

  const formatDate = (releaseDate) => {
    const date = new Date(releaseDate);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    });
  };

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}`,
          {
            headers: {
              Authorization: ApiToken,
              accept: 'application/json',
            },
          }
        );
        setMovie(response.data);
        setPosterUrl(response.data.poster_path);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching the movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (!movie) {
    return (
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography sx={{ fontSize: 20 }}>Error Fetching Movie...</Typography>;
      </Box>
    );
  }

  return (
    <>
      <Paper
        elevation={24}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          margin: 2,
        }}
      >
        <Typography
          sx={{
            mt: 2,
            fontFamily: 'Impact, sans-serif',
            letterSpacing: 2,
            textAlign: 'center',
          }}
          variant="h4"
        >
          {movie.title}
        </Typography>

        <Box
          component="img"
          src={`https://image.tmdb.org/t/p/w500${posterUrl}`}
          sx={{ mt: 1, width: 225 }}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginX: 2,
            mb: 2,
            mt: 1,
          }}
        >
          <Typography
            sx={{ fontWeight: 'bold', fontFamily: 'Times New Roman, serif' }}
            variant="body1"
          >
            {movie.status.toUpperCase()}
          </Typography>
          <Typography
            sx={{ fontStyle: 'italic', fontSize: '14px' }}
            variant="body1"
          >
            {formatDate(movie.release_date)}
          </Typography>
          <Typography
            sx={{
              textAlign: 'center',
              mt: 1,
              fontSize: '14px',
              backgroundColor: 'rgba(0,0,0, 0.2)',
              padding: 1,
              borderRadius: 2,
            }}
            variant="body1"
          >
            {movie.overview}
          </Typography>
          <Typography sx={{ mt: '12px' }}>
            {movie.genres.slice(0, 5).map((genre) => {
              return (
                <Button
                  key={genre.id}
                  variant="outlined"
                  sx={{
                    fontSize: '10px',
                    px: '5px',
                    fontWeight: 'bold',
                    mx: '5px',
                    '&:hover': {
                      backgroundColor: 'rgba(0,0,0, 0.2)',
                    },
                  }}
                >
                  {genre.name.toUpperCase()}
                </Button>
              );
            })}
          </Typography>
        </Box>
      </Paper>
    </>
  );
};

export default MovieDetailPage;
