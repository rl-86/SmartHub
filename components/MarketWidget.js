'use client';
import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Divider,
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

export default function MarketWidget() {
  const [markets, setMarkets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    fetch('/api/market')
      .then((res) => res.json())
      .then((result) => {
        setMarkets(result.data);
        setLastUpdated(result.lastUpdated);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const formatTime = (iso) => {
    const date = new Date(iso);
    return date.toLocaleTimeString('sv-SE', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Card
      sx={{
        backgroundColor: 'background.card',
        borderRadius: 2,
        mb: 2,
        width: 330,
      }}
    >
      <CardContent>
        <Typography variant='h6' sx={{ mb: 1 }}>
          Global Markets
        </Typography>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {markets.map((item, index) => (
              <Box key={index} sx={{ mb: 1 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Box>
                    <Typography variant='body2' fontWeight={500}>
                      {item.name}
                    </Typography>
                    <Typography variant='caption' color='text.secondary'>
                      {item.symbol}
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography
                      variant='body2'
                      sx={{
                        color:
                          item.change_percent > 0
                            ? 'limegreen'
                            : item.change_percent < 0
                            ? 'tomato'
                            : 'text.secondary',
                      }}
                    >
                      {item.change_percent > 0 ? '+' : ''}
                      {item.change_percent.toFixed(2)}%
                      {item.change_percent > 0 ? (
                        <TrendingUpIcon fontSize='inherit' />
                      ) : item.change_percent < 0 ? (
                        <TrendingDownIcon fontSize='inherit' />
                      ) : null}
                    </Typography>
                    <Typography variant='caption'>
                      {item.price != null ? item.price.toLocaleString() : '–'}
                    </Typography>
                  </Box>
                </Box>

                {item.trend?.length > 0 && (
                  <Box
                    component='svg'
                    height={30}
                    width='100%'
                    sx={{ mt: 0.5 }}
                  >
                    <polyline
                      fill='none'
                      stroke={item.change_percent >= 0 ? 'limegreen' : 'tomato'}
                      strokeWidth='2'
                      points={item.trend
                        .map((val, i) => {
                          const x = (i / item.trend.length) * 100;
                          const y =
                            30 -
                            (val / Math.max(...item.trend.filter(Boolean))) *
                              30;
                          return `${x},${y}`;
                        })
                        .join(' ')}
                    />
                  </Box>
                )}

                {index < markets.length - 1 && <Divider sx={{ my: 1 }} />}
              </Box>
            ))}
            <Divider sx={{ my: 1 }} />
            <Typography
              variant='caption'
              color='text.secondary'
              sx={{ mt: 1, display: 'block', textAlign: 'left' }}
            >
              Last updated: {lastUpdated ? formatTime(lastUpdated) : '–'}
            </Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
}
