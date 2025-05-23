import { Card, CardContent, Typography } from '@mui/material';

export default function NotesWidget() {
  return (
    <Card
      sx={{
        mb: 2,
        height: 250,
        width: 250,
      }}
    >
      <Typography component='h4' variant='body1' sx={{ m: 0, p: 2, pb: 1 }}>
        Notes
      </Typography>
      <CardContent
        sx={{
          mx: 1,
          py: 0,
        }}
      >
        <ul
          style={{
            listStyleType: 'none',
            padding: 0,
            margin: 0,
          }}
        >
          <li>Coingecko</li>
          <li>Dexscreener</li>
          <li>Youtube</li>
          <li>Grok.ai</li>
          <li>Github</li>
        </ul>
      </CardContent>
    </Card>
  );
}
