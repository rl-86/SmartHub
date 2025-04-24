'use client';
import { useState } from 'react';
import { Box, TextField, Button, Card } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function MainSearchBar() {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() !== '') {
      const encoded = encodeURIComponent(query);
      window.open(`https://www.google.com/search?q=${encoded}`, '_blank');
    }
  };

  return (
    <Card
      sx={{
        mb: 2,
      }}
    >
      <Box
        component='form'
        onSubmit={handleSubmit}
        sx={{ display: 'flex', m: 2 }}
      >
        <TextField
          fullWidth
          label='Google'
          variant='outlined'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button type='submit' variant='outlined' sx={{ ml: 1 }}>
          <ArrowForwardIosIcon />
        </Button>
      </Box>
    </Card>
  );
}
