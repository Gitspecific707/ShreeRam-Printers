
import { Box, Typography, Button } from '@mui/material';

export default function Hero() {
  return (
    <Box sx={{
      textAlign: 'center',
      // reduce vertical padding on small screens
      py: { xs: 4, sm: 8 },
      background: 'linear-gradient(135deg, #1e3c72, #2a5298)',
      color: '#fff'
    }}>
      <Typography variant="h3" fontWeight="bold" sx={{ fontSize: { xs: '1.6rem', sm: '2.25rem', md: '3rem' }, lineHeight: 1.1 }}>
        ShreeRam Printers
      </Typography>
      <Typography variant="h6" sx={{ mt: 2, fontSize: { xs: '0.95rem', sm: '1.125rem' } }}>
        Professional Printing Services in Jaipur <br />
        प्रोफेशनल प्रिंटिंग सर्विसेज जयपुर में
      </Typography>
      <Button
        sx={{ mt: 3, fontSize: { xs: '0.85rem', sm: '1rem' }, py: { xs: '6px', sm: '8px' } }}
        variant="contained"
        color="success"
        href="https://wa.me/919782967521"
        target="_blank"
      >
        Order on WhatsApp
      </Button>
    </Box>
  );
}
