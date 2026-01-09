
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import billbookImg from '../assets/billbook.jpeg';
import pamphletImg from '../assets/pamphlet.jpeg';
import bannerImg from '../assets/banner.webp';
import visitingImg from '../assets/visiting card.webp';
import spiralImg from '../assets/spiral.svg';
import stickerImg from '../assets/sticker.svg';
import glowImg from '../assets/glow.svg';

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
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          width: '100%',
          py: 1,
          backgroundColor: '#fff9c4',
          borderRadius: 0,
          boxShadow: 0
        }}
      >
        Our Services / हमारी सेवाएँ
      </Typography>
      <Grid container spacing={3}>
        {services.map((s, i) => {
          // Choose an image based on keywords in the service string
          let thumb = null;
          const text = s.toLowerCase();
          if (text.includes('bill')) thumb = billbookImg;
          else if (text.includes('pamphlet')) thumb = pamphletImg;
          else if (text.includes('banner') || text.includes('flex') || text.includes('poster')) thumb = bannerImg;
          else if (text.includes('visiting') || text.includes('visiting card')) thumb = visitingImg;
          else if (text.includes('spiral')) thumb = spiralImg;
          else if (text.includes('sticker')) thumb = stickerImg;
          else if (text.includes('glow') || text.includes('glow sign')) thumb = glowImg;

          return (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <Card sx={{ height: '100%', transition: '0.3s', '&:hover': { transform: 'scale(1.05)' }, position: 'relative', overflow: 'hidden' }}>
                <CardContent>
                  <Typography fontWeight="bold">{s}</Typography>
                  <Typography variant="body2">
                    Best quality printing at affordable price.
                  </Typography>

                  {thumb && (
                    <Box component="img" src={thumb} alt={s} sx={{ position: 'absolute', right: 8, bottom: 8, width: 64, height: 'auto', borderRadius: 1, boxShadow: 1, objectFit: 'cover', opacity: 0.95 }} />
                  )}
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
