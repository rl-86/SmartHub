import { Card, CardContent, CardMedia, Typography } from '@mui/material';

export default function NewsWidget() {
  return (
    <Card sx={{ borderRadius: 2, mb: 2 }}>
      <CardMedia
        component='img'
        width='300'
        image='/placeholders/news.png'
        alt='Nyheter'
      />
    </Card>
  );
}
