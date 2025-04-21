import Typography from '@mui/material/Typography';

export default function HeroTitle() {
  return (
    <Typography
      component='h1'
      sx={{
        textShadow: '0px 0px 2px #ffffff5c',
        color: 'primary.main',
        pb: 1,
        pt: 5,
        textAlign: 'center',
        fontWeight: 'light',
        letterSpacing: 10,
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
