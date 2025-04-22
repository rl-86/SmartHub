'use client';
import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import HeroTitle from '@/components/HeroTitle';
import WeatherWidget from '@/components/WeatherWidget';
import NewsWidget from '@/components/NewsWidget';
import MarketWidget from '@/components/MarketWidget';
import TwitterWidget from '@/components/TwitterWidget';
import MainSearchBar from '@/components/MainSearchBar';
import AiChatWidget from '@/components/AiChatWidget';
import LinksComponent from '@/components/LinksComponent';
import TodoWidget from '@/components/TodoWidget';
import NotesWidget from '@/components/NotesWidget';
import CryptoPricesWidget from '@/components/CryptoWidget';

export default function Home() {
  return (
    <>
      <HeroTitle />
      <Container
        maxWidth='100vw'
        sx={{
          backgroundColor: 'background.paper',
          display: 'flex',
          p: 2,
          m: 2,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Grid container spacing={4}>
          {/* Left Column */}
          <Grid sx={{ p: 0, backgroundColor: 'background.paper' }}>
            <Box
              sx={{
                borderRadius: 2,
                backgroundColor: 'background.paper',
                p: 2,
              }}
            >
              <WeatherWidget />
              <NewsWidget />
              <TwitterWidget />
            </Box>
          </Grid>

          {/* Center Column */}
          <Grid p={0} sx={{ backgroundColor: 'background.paper' }}>
            <Box
              sx={{
                width: '750px',
                maxWidth: '100%',
                backgroundColor: 'background.paper',
                p: 2,
              }}
            >
              <MainSearchBar />
              <AiChatWidget />
              {/* 2 components */}
              <Box
                flexDirection='row'
                display='flex'
                justifyContent='space-evenly'
                sx={{
                  m: 0,
                }}
              >
                <LinksComponent />
                <TodoWidget />
              </Box>
            </Box>
          </Grid>

          {/* Right Column */}
          <Grid p={0} sx={{ backgroundColor: 'background.paper' }}>
            <Box
              sx={{
                borderRadius: 2,
                backgroundColor: 'background.paper',
                p: 2,
              }}
            >
              <CryptoPricesWidget />
              <MarketWidget />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
