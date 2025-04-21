import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#ff4081',
    },
    background: {
      default: 'transperent',
      paper: '#ffffff1c',
      card: '#1f1f1fef',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b1b1b1',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

export default theme;
