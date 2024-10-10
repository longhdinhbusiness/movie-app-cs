import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function MoviePagination({ totalPages, setCurrentPage }) {
  return (
    <Stack spacing={2} sx={{ display: 'flex', justifyContent: 'center' }}>
      <Pagination
        count={totalPages}
        onChange={(event, page) => setCurrentPage(page)}
        renderItem={(item) => (
          <PaginationItem
            slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
            {...item}
            sx={{ mx: 1, fontSize: '16px' }}
          />
        )}
      />
    </Stack>
  );
}
