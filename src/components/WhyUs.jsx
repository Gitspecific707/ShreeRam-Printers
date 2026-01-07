
import { Grid, Typography } from '@mui/material';

export default function WhyUs() {
  const items = [
    "10+ Years Experience",
    "Fast Delivery",
    "Affordable Pricing",
    "Trusted by Customers"
  ];
  return (
    <div style={{ background: '#f5f5f5', padding: 40 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Why Choose Us?
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {items.map((i, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx}>
            <Typography align="center" fontWeight="bold">
              ✔ {i}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
