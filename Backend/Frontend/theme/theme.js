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
      paper: 'transperent',
      //paper: '#ffffff1c',
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

  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#1f1f1fef',
          borderRadius: 8,
          boxShadow: '0px 0px 2px rgba(215, 215, 215, 0.48)',
          marginBottom: '16px',
          width: '100%',
          maxWidth: '100%',
        },
      },
    },
  },
});

export default theme;
