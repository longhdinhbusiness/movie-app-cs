import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function CircularProgressIcon({ rating, size = 100, thickness = 4, sx = {} }) {
  const displayRating = Math.round((rating / 10) * 100);

  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress
        variant="determinate"
        value={displayRating}
        size={size}
        thickness={thickness}
        sx={sx}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          sx={{
            color: 'white',
            fontWeight: 'bold',
          }}
        >
          {`${Math.round(displayRating)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

export default CircularProgressIcon;
