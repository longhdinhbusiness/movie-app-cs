import { ApiKey } from '../const/ApiKey';

export const homePageTvList = {
  trending: {
    title: 'Trending TV',
    url: `https://api.themoviedb.org/3/tv/popular?api_key=${ApiKey}&language=en-US&page=1`,
  },
  rated: {
    title: 'Top Rated TV',
    url: `https://api.themoviedb.org/3/tv/top_rated?api_key=${ApiKey}&language=en-US&page=1`,
  },
};
