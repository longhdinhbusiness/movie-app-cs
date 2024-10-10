import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Typography } from '@mui/material';
import { ApiToken } from '../const/ApiToken';
import TvShowCard from './TvShowCard';

const HomePageTvBar = ({ url, title }) => {
  const [tvShow, setTvShow] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollInterval, setScrollInterval] = useState(null);
  const cardWidth = 250;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: ApiToken,
            accept: 'application/json',
          },
        });
        setTvShow(response.data.results);
        console.log(response);
      } catch (error) {
        console.error('Error fetching the Tv Show:', error);
      }
    };

    fetchData();
  }, [url]);

  const handleScrollLeft = () => {
    setScrollPosition((prev) => Math.max(prev - cardWidth, 0));
  };

  const handleScrollRight = () => {
    const maxScrollPosition = (tvShow.length - 4) * cardWidth;
    setScrollPosition((prev) => Math.min(prev + cardWidth, maxScrollPosition));
  };

  const handleMouseDownLeft = () => {
    handleScrollLeft();
    const intervalId = setInterval(handleScrollLeft, 100);
    setScrollInterval(intervalId);
  };

  const handleMouseDownRight = () => {
    handleScrollRight();
    const intervalId = setInterval(handleScrollRight, 100);
    setScrollInterval(intervalId);
  };

  const handleMouseUp = () => {
    clearInterval(scrollInterval);
    setScrollInterval(null);
  };

  return (
    <Box sx={{ padding: 4 }}>
      {/* Title Box */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography variant="h4" fontWeight={500}>
          {title}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', position: 'relative' }}>
        <Button
          variant="contained"
          onMouseDown={handleMouseDownLeft}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          sx={{
            position: 'absolute',
            left: 5,
            bottom: 5,
            zIndex: 1,
            backgroundColor: 'deepskyblue',
            color: 'white',
            '&:hover': {
              filter: 'brightness(120%)',
            },
          }}
        >
          &lt; {/* Left Arrow */}
        </Button>

        <Box
          sx={{
            display: 'flex',
            transition: 'transform 0.8s ease',
            transform: `translateX(-${scrollPosition}px)`,
          }}
        >
          {tvShow.map((tvShow) => (
            <TvShowCard
              key={tvShow.id}
              title={tvShow.name}
              poster={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
              rating={tvShow.vote_average}
              releaseDate={tvShow.first_air_date}
              tvShowId={tvShow.id}
            />
          ))}
        </Box>

        <Button
          variant="contained"
          onMouseDown={handleMouseDownRight}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          sx={{
            position: 'absolute',
            right: 5,
            bottom: 5,
            zIndex: 1,
            backgroundColor: 'deepskyblue',
            color: 'white',
            '&:hover': {
              filter: 'brightness(120%)',
            },
          }}
        >
          &gt; {/* Right Arrow */}
        </Button>
      </Box>
    </Box>
  );
};

export default HomePageTvBar;
