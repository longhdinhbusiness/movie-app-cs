import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import LanguageIcon from '@mui/icons-material/Language';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useState, useEffect } from 'react';
import { ApiToken } from '../const/ApiToken';
import axios from 'axios';
import { useGenre } from '../context/GenreContext';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../context/SearchContext';

const genreButton = ['Genres'];

function TopAppBar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [genresDrawerOpen, setGenresDrawerOpen] = useState(false);
  const [genresList, setGenreList] = useState([]);
  const { setSelectedGenre } = useGenre();
  const { setSearchTerm } = useSearch();
  const navigate = useNavigate();
  const [isSearchInputVisible, setIsSearchInputVisible] = useState(false);
  const [searchTermInput, setSearchTermInput] = useState('');

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(
          'https://api.themoviedb.org/3/genre/movie/list',
          {
            headers: {
              Authorization: ApiToken,
              accept: 'application/json',
            },
          }
        );
        console.log(response.data.genres);
        setGenreList(response.data.genres);
      } catch (error) {
        console.log('Error fetching genres:', error);
      }
    };
    fetchGenres();
  }, []);

  const goHome = () => {
    setSearchTerm('');
    setSelectedGenre('');
    navigate('/');
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const openGenresDrawer = () => {
    setGenresDrawerOpen(true);
  };

  const closeGenresDrawer = () => {
    setGenresDrawerOpen(false);
  };

  const handleMenuItemClick = (item) => {
    if (item === 'Genres') {
      openGenresDrawer();
    } else {
      setSearchTerm('');
      setSelectedGenre(item);
      navigate(`/genre/:genreId`);
      closeGenresDrawer();
    }
  };

  const handleSearchSubmit = () => {
    if (searchTermInput) {
      setSearchTerm(searchTermInput);
      setSearchTermInput('');
      setIsSearchInputVisible(false);
      navigate('/search/:searchId');
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#224C98' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            onClick={() => {
              goHome();
            }}
            variant="h6"
            noWrap
            component="a"
            href="#"
            sx={{
              mr: 3,
              display: 'flex',
              alignItems: 'center',
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              marginRight: '5px',
            }}
          >
            MoviesDB
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'flex', md: 'none' },
            }}
          >
            <IconButton
              size="large"
              aria-label="open drawer"
              onClick={toggleDrawer}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>

          {/* Genre Button Drawer  */}
          <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
            <Box
              sx={{ width: 250 }}
              role="leftSideButtons"
              onClick={toggleDrawer}
              onKeyDown={toggleDrawer}
            >
              <List>
                <Button sx={{ ml: 1 }} onClick={() => goHome()}>
                  HOMEPAGE
                </Button>
                {genreButton.map((button) => (
                  <ListItem
                    sx={{ cursor: 'pointer' }}
                    button
                    key={button}
                    onClick={() => handleMenuItemClick(button)}
                  >
                    <ListItemText
                      sx={{ fontWeight: 'bold' }}
                      primary={button}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Drawer>

          {/* Genres Drawer */}
          <Drawer
            anchor="left"
            open={genresDrawerOpen}
            onClose={closeGenresDrawer}
          >
            <Box
              sx={{ width: 250 }}
              role="genresList"
              onClick={closeGenresDrawer}
              onKeyDown={closeGenresDrawer}
            >
              <List>
                {genresList.map((genre) => (
                  <ListItem
                    sx={{ cursor: 'pointer' }}
                    button
                    key={genre.id}
                    onClick={() => handleMenuItemClick(genre.id)}
                  >
                    <ListItemText primary={genre.name} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Drawer>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              sx={{
                letterSpacing: 1,
                fontWeight: 'bold',
                fontSize: '16px',
                color: 'white',
                margin: 2,
              }}
              onClick={() => goHome()}
            >
              HOMEPAGE
            </Button>
            {genreButton.map((page) => (
              <Button
                key={page}
                onClick={() => handleMenuItemClick(page)}
                sx={{
                  my: 2,
                  color: 'white',
                  display: 'block',
                  fontWeight: 'bold',
                  letterSpacing: 3,
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              onClick={() => alert('Add clicked')}
              sx={{ color: 'white' }}
            >
              <AddIcon />
            </IconButton>
            <Button
              onClick={() => alert('Language clicked')}
              sx={{ color: 'white' }}
            >
              <LanguageIcon /> EN
            </Button>
            <Button
              onClick={() => alert('Login clicked')}
              sx={{ color: 'white' }}
            >
              Login
            </Button>
            <Button
              onClick={() => alert('Join clicked')}
              sx={{ color: 'white' }}
            >
              Join MDB
            </Button>
            {/* Search Icon  */}
            <IconButton
              onClick={() => setIsSearchInputVisible(!isSearchInputVisible)}
              sx={{ color: 'white' }}
            >
              <SearchIcon />
            </IconButton>
            {/* Search input bar */}
            {isSearchInputVisible && (
              <Box sx={{ display: 'flex' }}>
                <input
                  type="text"
                  value={searchTermInput}
                  onChange={(e) => setSearchTermInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSearchSubmit();
                    }
                  }}
                  placeholder="Search..."
                  style={{
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    marginLeft: '8px',
                    maxWidth: '100px',
                  }}
                />
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default TopAppBar;
