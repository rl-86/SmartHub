'use client';
import * as React from 'react';
import HeroTitle from './HeroTitle';

import { AppBar, Toolbar, Typography, Box } from '@mui/material';

export default function Navbar() {
  return (
    <AppBar position='sticky' color='transparent' elevation={0}>
      <Toolbar>
        <HeroTitle />
      </Toolbar>
    </AppBar>
  );
}
