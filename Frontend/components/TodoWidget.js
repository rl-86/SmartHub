import { Card, CardContent, Typography } from '@mui/material';
import { useLayoutEffect } from 'react';

export default function TodoWidget() {
  return (
    <Card
      sx={{
        mb: 2,
        mx: 2,
        height: 250,
        width: 250,
      }}
    >
      <Typography component='h4' variant='body1' sx={{ m: 0, p: 2, pb: 1 }}>
        To-Do
      </Typography>
      <CardContent
        sx={{
          mx: 2,
          p: 2,
        }}
      >
        <ul
          style={{
            listStyleType: 'initial',
            padding: 0,
            margin: 0,
          }}
        >
          <li>Gör klart uppgift 1</li>
          <li>Gör klart uppgift 2</li>
          <li>Gör klart uppgift 3</li>
          <li>Gör klart uppgift 4</li>
          <li>Gör klart uppgift 5</li>
        </ul>
      </CardContent>
    </Card>
  );
}
