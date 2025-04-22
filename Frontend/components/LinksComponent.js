import { Card, CardContent, Typography } from '@mui/material';
import Link from 'next/link';

export default function LinksWidget() {
  return (
    <Card
      sx={{
        mb: 2,
        height: 300,
        width: 270,
      }}
    >
      <Typography component='h4' variant='body1' sx={{ m: 0, p: 2, pb: 1 }}>
        Links
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
          <li>
            <Link
              href='https://www.coingecko.com/'
              target='_blank'
              rel='noopener noreferrer'
              style={{
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              Coingecko
            </Link>
          </li>
          <li>
            <Link
              href='https://www.dexscreener.com/'
              target='_blank'
              rel='noopener noreferrer'
              style={{
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              Dexscreener
            </Link>
          </li>
          <li>
            <Link
              href='https://www.youtube.com/'
              target='_blank'
              rel='noopener noreferrer'
              style={{
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              Youtube
            </Link>
          </li>
          <li>
            <Link
              href='https://www.openai.com/'
              target='_blank'
              rel='noopener noreferrer'
              style={{
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              OpenAI
            </Link>
          </li>
          <li>
            <Link
              href='https://www.github.com/'
              target='_blank'
              rel='noopener noreferrer'
              style={{
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              GitHub
            </Link>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}
