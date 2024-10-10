import React from 'react';
import { Box, Typography, Link, Button } from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import MovieDBLogo from '../images/MovieDBLogo.png';

const theBasics = [
  'About MovieDB',
  'Contact Us',
  'Support Forums',
  'API',
  'System Status',
];
const getInvolved = ['Contribution Bible', 'Add New Movie', 'Add New TV Show'];
const community = ['Guidelines', 'Discussions', 'Leaderboard'];
const legal = [
  'Terms of Use',
  'API Terms of Use',
  'Privacy Policy',
  'DMCA Policy',
];

const Footer = () => {
  const screenFontSize = {
    xs: '14px',
    sm: '16px',
    md: '18px',
    lg: '20px',
    xl: '22px',
  };
  const gridItemStyle = {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    minWidth: 'fit-content',
    textAlign: 'center',
  };

  const linkStyle = {
    color: 'inherit',
    underline: 'none',
    fontSize: screenFontSize,
    mb: '5px',
  };

  const headingStyle = {
    fontSize: screenFontSize,
    fontWeight: 'bold',
  };

  return (
    <Box
      component="footer"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'primary.main',
        color: 'white',
        mt: 'auto',
        minHeight: '200px',
        padding: 3,
      }}
    >
      <Grid2
        container
        spacing={2}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          flexWrap: 'wrap',
        }}
      >
        {/* Logo */}
        <Grid2 item xs={12} sm={4} sx={gridItemStyle}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              mb: 1,
            }}
          >
            <img
              src={MovieDBLogo}
              alt="MoviesDB Logo"
              style={{
                width: '120px',
              }}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              mb: 1,
            }}
          >
            <Button
              sx={{
                color: 'deepskyblue',
                fontSize: {
                  xs: '9px',
                  sm: '14px',
                  md: '16px',
                  lg: '18px',
                  xl: '20px',
                },
                fontWeight: 'bold',
                backgroundColor: 'white',
                mt: '10px',
                width: 'fit-content',
              }}
            >
              Join The Community
            </Button>
          </Box>
        </Grid2>

        {/* The Basics Section */}
        <Grid2 item xs={12} sm={4} sx={gridItemStyle}>
          <Typography variant="h6" component="div" sx={headingStyle}>
            The Basics
          </Typography>
          {theBasics.map((item) => (
            <Link key={item} sx={linkStyle}>
              {item}
            </Link>
          ))}
        </Grid2>

        {/* Get Involved Section */}
        <Grid2 item xs={12} sm={4} sx={gridItemStyle}>
          <Typography variant="h6" component="div" sx={headingStyle}>
            Get Involved
          </Typography>
          {getInvolved.map((item) => (
            <Link key={item} sx={linkStyle}>
              {item}
            </Link>
          ))}
        </Grid2>

        {/* Community Section */}
        <Grid2 item xs={12} sm={4} sx={gridItemStyle}>
          <Typography variant="h6" component="div" sx={headingStyle}>
            Community
          </Typography>
          {community.map((item) => (
            <Link key={item} sx={linkStyle}>
              {item}
            </Link>
          ))}
        </Grid2>

        {/* Legal Section */}
        <Grid2 item xs={12} sm={4} sx={gridItemStyle}>
          <Typography variant="h6" component="div" sx={headingStyle}>
            Legal
          </Typography>
          {legal.map((item) => (
            <Link key={item} sx={linkStyle}>
              {item}
            </Link>
          ))}
        </Grid2>
      </Grid2>

      {/* Copyright */}
      <Box
        sx={{
          textAlign: 'center',
          mt: 2,
          pt: 2,
          borderTop: '1px solid white',
        }}
      >
        <Typography variant="body2">
          © {new Date().getFullYear()} MoviesDB. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
