
import { Typography, Box, Link } from '@mui/material';

export default function Contact() {
  return (
    <Box sx={{ textAlign: 'center', py: 4 }}>
      <Typography variant="h4">Contact Us</Typography>
      <Typography>📍 Jaipur, Rajasthan</Typography>
      <Typography>
        <Link
          href="tel:+919782967521"
          underline="none"
          color="inherit"
          sx={{ display: 'inline-flex', alignItems: 'center' }}
          aria-label="Call 9782967521"
        >
          📞 9782967521
        </Link>
      </Typography>
    </Box>
  );
}
