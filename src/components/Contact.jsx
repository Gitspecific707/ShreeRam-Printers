
import { Typography, Box, Link } from '@mui/material';

export default function Contact() {
  const phone = '+919782967521'; // international format

  return (
    <Box sx={{ textAlign: 'center', py: 4 }}>
      <Typography variant="h4">Contact Us</Typography>
      <Typography>📍 Jaipur, Rajasthan</Typography>
      <Typography>
        📞{' '}
        <Link href={`tel:${phone}`} color="inherit" underline="none" aria-label={`Call ${phone}`}>
          {phone.replace('+91', '')}
        </Link>
      </Typography>
    </Box>
  );
}
