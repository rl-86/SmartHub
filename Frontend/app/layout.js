'use client';

import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from '../theme/theme';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
