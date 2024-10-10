import React from 'react';
import { Card, CardMedia, Typography, Box } from '@mui/material';
import CircularProgressIcon from './CircularProgressIcon';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite'; // Import Heart Icon
import { IconButton } from '@mui/material';

const MovieCard = ({ title, poster, rating, releaseDate, movieId }) => {
  const formatDate = (releaseDate) => {
    const date = new Date(releaseDate);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    });
  };

  const getColor = (rating) => {
    const newRating = Math.round((rating / 10) * 100);
    if (newRating <= 25) {
      return 'red';
    } else if (newRating <= 50) {
      return 'orange';
    } else if (newRating <= 70) {
      return 'yellow';
    } else if (newRating < 90) {
      return 'green';
    } else {
      return 'chartreuse';
    }
  };

  const ratingColor = getColor(rating);

  return (
    <Box sx={{ width: 250, mx: 1 }}>
      <Card
        sx={{
          position: 'relative',
          overflow: 'visible',
          borderRadius: 10,
        }}
      >
        {/* Heart Icon  */}
        <IconButton
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
            color: 'white',
            '&:hover': {
              backgroundColor: 'red',
            },
            zIndex: 1,
          }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <FavoriteIcon />
        </IconButton>
        <Link
          to={`/movie/${movieId}`}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <CardMedia
            component="img"
            alt={title}
            image={poster}
            sx={{
              objectFit: 'cover',
              borderRadius: 10,
              cursor: 'pointer',
              '&:hover': {
                filter: 'brightness(50%)',
              },
            }}
          />
        </Link>

        {/* Circular Rating Icon */}
        <Box
          sx={{
            position: 'absolute',
            bottom: '-15px',
            left: '10px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '20px',
          }}
        >
          <CircularProgressIcon
            rating={rating}
            size={40}
            thickness={4}
            sx={{
              color: ratingColor,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              borderRadius: '50%',
            }}
          />
        </Box>
      </Card>

      {/* Movie Title and Release Date */}
      <Box sx={{ mt: 1, textAlign: 'center' }}>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="body2" component="div" color="textSecondary">
          {formatDate(releaseDate)}
        </Typography>
      </Box>
    </Box>
  );
};

export default MovieCard;
