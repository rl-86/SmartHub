import { Card, CardContent, CardMedia, Typography } from '@mui/material';

export default function TwitterWidget() {
  return (
    <Card sx={{ mb: 2, opacity: '0.95' }}>
      <CardMedia
        component='img'
        width='300'
        image='/placeholders/twitter.png'
        alt='Twitter-trender'
      />
    </Card>
  );
}
