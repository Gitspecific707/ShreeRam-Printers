
import { CssBaseline } from '@mui/material';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import GallerySlider from './components/GallerySlider';
import Services from './components/Services';
import WhyUs from './components/WhyUs';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

export default function App() {
  return (
    <>
      <CssBaseline />
      <Navbar />
      <Hero />
  <GallerySlider />
      <Services />
      <WhyUs />
      <Contact />
      <WhatsAppButton />
      <Footer />
    </>
  );
}
