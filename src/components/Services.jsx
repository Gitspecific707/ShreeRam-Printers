
import { Grid, Card, CardContent, Typography } from '@mui/material';

const services = [
  "Banner Printing / बैनर प्रिंटिंग",
  "Flex Printing / फ्लेक्स प्रिंटिंग",
  "Visiting Cards / विजिटिंग कार्ड",
  "Spiral Binding / स्पाइरल बाइंडिंग",
  "Poster Printing / पोस्टर प्रिंटिंग",
  "Pamphlet Printing / पेम्फलेट",
  "Sticker Printing / स्टीकर",
  "Glow Sign Board / ग्लो साइन बोर्ड"
];

export default function Services() {
  return (
    <div style={{ padding: 40 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Our Services / हमारी सेवाएँ
      </Typography>
      <Grid container spacing={3}>
        {services.map((s, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Card sx={{ height: '100%', transition: '0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
              <CardContent>
                <Typography fontWeight="bold">{s}</Typography>
                <Typography variant="body2">
                  Best quality printing at affordable price.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
