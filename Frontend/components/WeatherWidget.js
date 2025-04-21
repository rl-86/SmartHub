'use client';
import { useEffect, useState, useRef } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  TextField,
  IconButton,
  Button,
  ClickAwayListener,
  Fade,
  Paper,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

export default function WeatherWidget() {
  const [city, setCity] = useState('Lycksele');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchWeather(city);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [city]);

  const fetchWeather = async (selectedCity) => {
    setLoading(true);
    const res = await fetch(
      `/api/weather?city=${encodeURIComponent(selectedCity)}`
    );
    const data = await res.json();
    setWeather(data);
    setLoading(false);
  };

  const handleClickAway = () => {
    setSettingsOpen(false);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  return (
    <Card
      sx={{
        height: 150,
        width: '100%',
        mb: 2,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <CardContent sx={{ p: 2, pb: '16px !important' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            mb: 1,
          }}
        >
          <Typography variant='h6' sx={{ fontWeight: 500 }}>
            {weather?.city ?? ''}
          </Typography>
          <IconButton
            aria-label='Inställningar'
            onClick={() => setSettingsOpen((prev) => !prev)}
            size='small'
            sx={{
              ml: 1,
              mt: '-4px',
              color: 'text.secondary',
            }}
          >
            <SettingsIcon fontSize='small' />
          </IconButton>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
            <CircularProgress size={28} />
          </Box>
        ) : weather?.error ? (
          <Typography variant='body2' color='error'>
            {weather.error}
          </Typography>
        ) : (
          <Typography
            variant='h4'
            sx={{
              textAlign: 'left',
              lineHeight: 1,
              mb: 1,
            }}
          >
            {weather.temp}°C
          </Typography>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'left' }}>
          <Button
            variant='outlined'
            size='small'
            href={`https://www.google.com/search?q=weather+${encodeURIComponent(
              weather?.city || city
            )}`}
            target='_blank'
            rel='noopener noreferrer'
            sx={{
              color: 'text.secondary',
              borderColor: 'text.secondary',
              mt: 0.5,
              fontWeight: 500,
              letterSpacing: 0.4,
              minWidth: 120,
            }}
          >
            Väderprognos
          </Button>
        </Box>

        <ClickAwayListener
          onClickAway={(e) => {
            if (e.target.closest('[aria-label="Inställningar"]')) return;

            setSettingsOpen(false);
          }}
        >
          <Fade in={settingsOpen}>
            <Box
              sx={{
                position: 'absolute',
                top: 16,
                left: 16,
                right: 16,
                zIndex: 10,
              }}
            >
              <Paper
                elevation={6}
                sx={{
                  backgroundColor: 'background.card',
                  borderRadius: 2,
                }}
              >
                <TextField
                  label='Stad'
                  value={city}
                  onChange={handleCityChange}
                  size='small'
                  autoFocus
                  fullWidth
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setSettingsOpen(false);
                    }
                  }}
                />
              </Paper>
            </Box>
          </Fade>
        </ClickAwayListener>
      </CardContent>
    </Card>
  );
}
