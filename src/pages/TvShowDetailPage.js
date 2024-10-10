import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Paper, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { ApiToken } from '../const/ApiToken';

const TvShowDetailPage = () => {
  const { tvShowId } = useParams();
  const [tvShow, setTvShow] = useState(null);
  const [posterUrl, setPosterUrl] = useState('');

  useEffect(() => {
    const fetchTvShowDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/tv/${tvShowId}`,
          {
            headers: {
              Authorization: ApiToken,
              accept: 'application/json',
            },
          }
        );
        setTvShow(response.data);
        setPosterUrl(response.data.backdrop_path);
        console.log(response);
      } catch (error) {
        console.error(
          'Error fetching the TV show details:',
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchTvShowDetails();
  }, [tvShowId]);

  if (!tvShow) {
    return (
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography sx={{ fontSize: 20 }}>Error Fetching TV Show...</Typography>
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
          sx={{ mt: 2, fontFamily: 'Impact, sans-serif', letterSpacing: 2 }}
          variant="h4"
        >
          {tvShow.name}
        </Typography>

        <Box
          component="img"
          src={`https://image.tmdb.org/t/p/w500${posterUrl}`}
          sx={{ mt: 1, width: 450 }}
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
            Overview:
          </Typography>
          <Typography
            sx={{ fontStyle: 'italic', fontSize: '14px' }}
            variant="body1"
          >
            Seasons{' '}
            <span style={{ fontWeight: 'bold' }}>
              {tvShow.number_of_seasons}
            </span>{' '}
            - Episodes:{' '}
            <span style={{ fontWeight: 'bold' }}>
              {tvShow.number_of_episodes}
            </span>
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
            {tvShow.overview}
          </Typography>
          <Typography sx={{ mt: '12px' }}>
            {tvShow.genres.slice(0, 5).map((genre) => {
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

export default TvShowDetailPage;
