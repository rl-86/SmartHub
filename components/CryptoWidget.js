'use client';
import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Avatar,
  Box,
  CircularProgress,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import Link from 'next/link';
import IconButton from '@mui/icons-material/Refresh';

export default function CryptoWidget() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(100);
  const [lastFetch, setLastFetch] = useState(0);

  const fetchData = () => {
    setLoading(true);
    fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=1h,24h,7d'
    )
      .then((res) => res.json())
      .then((data) => {
        setCoins(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = () => {
    const now = Date.now();
    if (now - lastFetch < 60000) return;

    fetchData();
    setLastFetch(now);
    setProgress(0);
  };

  useEffect(() => {
    if (progress >= 100) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 100 / 60;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [progress]);

  return (
    <Card
      sx={{
        backgroundColor: 'background.card',
        borderRadius: 2,
        mb: 2,
        minHeight: 550,
        width: 750,
        maxWidth: '100%',
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 2,
          }}
        >
          <Typography variant='h6'>Cryptocurrencies | Topp 10</Typography>
          <IconButton
            aria-label='Update'
            size='small'
            onClick={handleRefresh}
            disabled={progress < 100}
          >
            <Box sx={{ position: 'relative' }}>
              <RefreshIcon fontSize='small' />
              {progress < 100 && (
                <CircularProgress
                  size={28}
                  variant='determinate'
                  value={progress}
                  sx={{
                    position: 'absolute',
                    left: -4,
                    top: -4,
                    zIndex: 1,
                    color: 'primary.light',
                    opacity: 0.4,
                  }}
                />
              )}
            </Box>
          </IconButton>
        </Box>

        {loading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: 400,
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell># Coin</TableCell>
                <TableCell align='right'>Pris</TableCell>
                <TableCell align='right'>1h</TableCell>
                <TableCell align='right'>24h</TableCell>
                <TableCell align='right'>7d</TableCell>
                <TableCell align='right'>Volym</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {coins.map((coin, index) => (
                <TableRow key={coin.id}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant='caption' sx={{ width: 18 }}>
                        {index + 1}
                      </Typography>
                      <Avatar
                        src={coin.image}
                        alt={coin.name}
                        sx={{ width: 24, height: 24 }}
                      />
                      <Typography variant='body2' fontWeight={500}>
                        {coin.name}{' '}
                        <span style={{ color: '#888' }}>
                          {coin.symbol.toUpperCase()}
                        </span>
                      </Typography>
                    </Box>
                  </TableCell>

                  <TableCell align='right'>
                    ${coin.current_price.toLocaleString()}
                  </TableCell>
                  <TableCell
                    align='right'
                    sx={{
                      color: getColor(
                        coin.price_change_percentage_1h_in_currency
                      ),
                    }}
                  >
                    {formatPercent(coin.price_change_percentage_1h_in_currency)}
                  </TableCell>
                  <TableCell
                    align='right'
                    sx={{ color: getColor(coin.price_change_percentage_24h) }}
                  >
                    {formatPercent(coin.price_change_percentage_24h)}
                  </TableCell>
                  <TableCell
                    align='right'
                    sx={{
                      color: getColor(
                        coin.price_change_percentage_7d_in_currency
                      ),
                    }}
                  >
                    {formatPercent(coin.price_change_percentage_7d_in_currency)}
                  </TableCell>
                  <TableCell align='right'>
                    ${coin.total_volume.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        <Typography
          variant='body2'
          sx={{
            mt: 2,
            color: 'text.secondary',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          Powered by CoinGecko
          <Link
            href='https://www.coingecko.com'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img
              src='https://www.coingecko.com/favicon-32x32.png'
              alt='CoinGecko'
              width={16}
              height={16}
            />
          </Link>
        </Typography>
      </CardContent>
    </Card>
  );
}

function getColor(value) {
  if (value > 0) return 'limegreen';
  if (value < 0) return 'tomato';
  return 'text.secondary';
}

function formatPercent(value) {
  return value !== null ? `${value.toFixed(2)}%` : '–';
}
