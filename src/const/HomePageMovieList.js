export const homePageMovieList = {
  trending: {
    title: 'Trending Movies',
    url: `https://api.themoviedb.org/3/movie/popular?language=en-US&page=`,
  },
  topRated: {
    title: 'Top Rated',
    url: 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=',
  },
  upcoming: {
    title: 'Upcoming',
    url: 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=',
  },
  nowPlaying: {
    title: 'Now Playing',
    url: 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=',
  },
};
