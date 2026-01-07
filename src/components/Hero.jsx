
import { Box, Typography, Button } from '@mui/material';

export default function Hero() {
  return (
    <Box sx={{
      textAlign: 'center',
      py: 8,
      background: 'linear-gradient(135deg, #1e3c72, #2a5298)',
      color: '#fff'
    }}>
      <Typography variant="h3" fontWeight="bold">
        ShreeRam Printers
      </Typography>
      <Typography variant="h6" sx={{ mt: 2 }}>
        Professional Printing Services in Jaipur <br />
        प्रोफेशनल प्रिंटिंग सर्विसेज जयपुर में
      </Typography>
      <Button
        sx={{ mt: 3 }}
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
