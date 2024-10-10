import React from 'react';
import HomePageSearchBox from '../components/HomePageSearchBox';
import '../App.css';
import Footer from '../components/Footer';
import { Box } from '@mui/material';
import { homePageMovieList } from '../const/HomePageMovieList';
import HomePageMovieBar from '../components/HomePageMovieBar';

const HomePage = () => {
  return (
    <Box className="app">
      <HomePageSearchBox />
      <HomePageMovieBar
        url={homePageMovieList.trending.url}
        title={homePageMovieList.trending.title}
      />
      <HomePageMovieBar
        url={homePageMovieList.topRated.url}
        title={homePageMovieList.topRated.title}
      />
      <HomePageMovieBar
        url={homePageMovieList.upcoming.url}
        title={homePageMovieList.upcoming.title}
      />
      <HomePageMovieBar
        url={homePageMovieList.nowPlaying.url}
        title={homePageMovieList.nowPlaying.title}
      />

      <Footer />
    </Box>
  );
};

export default HomePage;
