import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Box, Typography, IconButton } from '@mui/material';
import Slider from 'react-slick';
import MovieCard from './MovieCard';
import { ApiToken } from '../const/ApiToken';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import MoviePagination from './MoviePagination';
import { useGenre } from '../context/GenreContext';
import { useSearch } from '../context/SearchContext';

const PrevArrow = ({ onClick }) => {
  const intervalRef = useRef(null);

  const handleMouseDown = () => {
    onClick();
    intervalRef.current = setInterval(onClick, 100);
  };

  const handleMouseUp = () => {
    clearInterval(intervalRef.current);
  };

  return (
    <IconButton
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      sx={{
        position: 'absolute',
        left: 5,
        bottom: 5,
        zIndex: 1,
      }}
    >
      <ArrowBackIosIcon sx={{ color: 'deepskyblue', fontSize: 40 }} />
    </IconButton>
  );
};

const NextArrow = ({ onClick }) => {
  const intervalRef = useRef(null);

  const handleMouseDown = () => {
    onClick();
    intervalRef.current = setInterval(onClick, 100);
  };

  const handleMouseUp = () => {
    clearInterval(intervalRef.current);
  };

  return (
    <IconButton
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      sx={{
        position: 'absolute',
        right: 5,
        bottom: 5,
        zIndex: 1,
      }}
    >
      <ArrowForwardIosIcon sx={{ color: 'deepskyblue', fontSize: 40 }} />
    </IconButton>
  );
};

const HomePageMovieBar = ({ url, title }) => {
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { selectedGenre } = useGenre();
  const { searchTerm } = useSearch();

  useEffect(() => {
    const fetchData = async () => {
      const genreParams = selectedGenre ? `&with_genres=${selectedGenre}` : '';
      const searchParams = searchTerm ? `&query=${searchTerm}` : '';
      const movieUrl = searchTerm
        ? `https://api.themoviedb.org/3/search/movie?page=${currentPage}${searchParams}`
        : selectedGenre
        ? `https://api.themoviedb.org/3/discover/movie?page=${currentPage}${genreParams}`
        : `${url}${currentPage}`;

      try {
        const response = await axios.get(movieUrl, {
          headers: {
            Authorization: ApiToken,
            accept: 'application/json',
          },
        });
        setMovies(response.data.results);
        if (response.data.total_pages > 500) {
          setTotalPages(500);
        } else {
          setTotalPages(response.data.total_pages);
        }
        console.log(response);
      } catch (error) {
        console.error('Error fetching the movie:', error);
      }
    };

    fetchData();
  }, [url, currentPage, selectedGenre, searchTerm]);

  // Slider Settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 200,
    slidesToShow: 5,
    slidesToScroll: 5,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box
      sx={{
        padding: 4,
      }}
    >
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

      {/* React Slick Slider */}
      <Slider {...settings}>
        {movies.map((movie) => (
          <Box key={movie.id} sx={{ padding: 1 }}>
            <MovieCard
              title={movie.title}
              poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              rating={movie.vote_average}
              releaseDate={movie.release_date}
              movieId={movie.id}
            />
          </Box>
        ))}
      </Slider>
      <Box sx={{ display: 'flex', justifyContent: 'center', margin: 2 }}>
        <MoviePagination
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </Box>
    </Box>
  );
};

export default HomePageMovieBar;
