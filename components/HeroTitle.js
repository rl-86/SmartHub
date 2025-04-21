import Typography from '@mui/material/Typography';

export default function HeroTitle() {
  return (
    <Typography
      component='h1'
      sx={{
        color: 'primary.main',
        py: 2,
        textAlign: 'center',
        fontWeight: 'light',
        letterSpacing: 4,
        fontSize: {
          sm: '2rem',
          md: '3rem',
        },
      }}
    >
      SmartHub
    </Typography>
  );
}
