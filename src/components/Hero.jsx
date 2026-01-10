
import { Box, Typography, Button, Grid } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

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
        Welcome to
        <br />
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

      {/* Feature row with icons under the CTA */}
      <Grid container spacing={2} sx={{ mt: 3, maxWidth: 840, mx: 'auto' }}>
        <Grid item xs={6} sm={3}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: { xs: 'center', sm: 'flex-start' } }}>
            <CheckCircleIcon sx={{ color: 'white', bgcolor: 'success.main', borderRadius: '50%', p: 0.5, fontSize: { xs: 20, sm: 26 } }} />
            <Typography sx={{ color: '#fff', fontWeight: 600, fontSize: { xs: '0.8rem', sm: '0.95rem' } }}>10+ Years Experience</Typography>
          </Box>
        </Grid>

        <Grid item xs={6} sm={3}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: { xs: 'center', sm: 'flex-start' } }}>
            <LocalShippingIcon sx={{ color: 'white', bgcolor: '#1976d2', borderRadius: '50%', p: 0.5, fontSize: { xs: 20, sm: 26 } }} />
            <Typography sx={{ color: '#fff', fontWeight: 600, fontSize: { xs: '0.8rem', sm: '0.95rem' } }}>Fast Delivery</Typography>
          </Box>
        </Grid>

        <Grid item xs={6} sm={3}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: { xs: 'center', sm: 'flex-start' } }}>
            <AttachMoneyIcon sx={{ color: 'white', bgcolor: '#388e3c', borderRadius: '50%', p: 0.5, fontSize: { xs: 20, sm: 26 } }} />
            <Typography sx={{ color: '#fff', fontWeight: 600, fontSize: { xs: '0.8rem', sm: '0.95rem' } }}>Affordable Pricing</Typography>
          </Box>
        </Grid>

        <Grid item xs={6} sm={3}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: { xs: 'center', sm: 'flex-start' } }}>
            <ThumbUpIcon sx={{ color: 'white', bgcolor: '#ff9800', borderRadius: '50%', p: 0.5, fontSize: { xs: 20, sm: 26 } }} />
            <Typography sx={{ color: '#fff', fontWeight: 600, fontSize: { xs: '0.8rem', sm: '0.95rem' } }}>Trusted by Customers</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
