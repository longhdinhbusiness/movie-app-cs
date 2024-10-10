import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../context/SearchContext';

const HomePageSearchBox = () => {
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();
  const { setSearchTerm } = useSearch();

  const handleSearchSubmit = () => {
    if (searchInput.trim() === '') {
      alert('Please enter a valid search term');
      return;
    }
    setSearchTerm(searchInput);
    navigate('/search/:searchId');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage:
          'url(https://img.freepik.com/free-vector/movie-film-strip-blue-background_1017-33458.jpg?t=st=1728275186~exp=1728278786~hmac=aad3ac05402a7cadabb8ce78f85c4b0ca58c54883354bb020ec3a7b5e5623897&w=1060)',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        padding: 8,
        width: { sm: '100%', md: '80%' },
        mx: 'auto',
        minHeight: 'fit-content',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          flexDirection: 'column',
          width: '100%',
          color: 'white',
        }}
      >
        <h1>Welcome.</h1>

        <h2>
          Millions of movies, TV shows and people to discover. Explore now.
        </h2>
      </Box>

      <Box sx={{ display: 'flex', width: '100%', marginTop: 3 }}>
        <TextField
          sx={{
            flex: 1,
            width: '100%',
            backgroundColor: 'white',
            marginRight: '-50px',
            borderRadius: 10,
            '& .MuiOutlinedInput-root': {
              borderRadius: 10,
              '& fieldset': {
                border: 'none',
              },
              '&.Mui-focused fieldset': {
                border: '2px solid turquoise',
              },
            },
          }}
          placeholder="Search for your favorite movies..."
          onChange={(e) => setSearchInput(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearchSubmit();
            }
          }}
        />
        <Button
          onClick={() => handleSearchSubmit()}
          sx={{
            backgroundColor: '#87CEEB',
            fontWeight: 'bold',
            color: 'white',
            paddingX: 4,
            marginLeft: '-5px',
            borderRadius: 10,
            position: 'relative',
            zIndex: 1,
            '&:hover': {
              filter: 'brightness(110%)',
            },
          }}
        >
          Search
        </Button>
      </Box>
    </Box>
  );
};

export default HomePageSearchBox;
