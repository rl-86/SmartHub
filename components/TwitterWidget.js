import { Card, CardContent, CardMedia, Typography } from '@mui/material';

export default function TwitterWidget() {
  return (
    <Card sx={{ borderRadius: 2, mb: 2 }}>
      <CardMedia
        component='img'
        width='300'
        image='/placeholders/twitter.png'
        alt='Twitter-trender'
      />
    </Card>
  );
}
