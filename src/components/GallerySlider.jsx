import React, { useEffect, useRef, useState } from 'react';
import { Box, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import billbook from '../assets/billbook.jpeg';
import pamphlet from '../assets/pamphlet.jpeg';
import banner from '../assets/banner.webp';

const images = [
  { src: billbook, alt: 'Bill Book' },
  { src: pamphlet, alt: 'pamphlet' },
  { src: banner, alt: 'banner' }
];

export default function GallerySlider({ autoPlay = true, interval = 3500 }) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!autoPlay) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, interval);
    return () => clearInterval(timerRef.current);
  }, [autoPlay, interval]);

  function prev() {
    setIndex((i) => (i - 1 + images.length) % images.length);
    resetTimer();
  }

  function next() {
    setIndex((i) => (i + 1) % images.length);
    resetTimer();
  }

  function resetTimer() {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setIndex((i) => (i + 1) % images.length);
      }, interval);
    }
  }

  // pause on hover
  function handleMouseEnter() {
    if (timerRef.current) clearInterval(timerRef.current);
  }

  function handleMouseLeave() {
    if (autoPlay) {
      timerRef.current = setInterval(() => {
        setIndex((i) => (i + 1) % images.length);
      }, interval);
    }
  }

  return (
    <Box
      ref={containerRef}
      sx={{ position: 'relative', maxWidth: 960, mx: 'auto', my: 6 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Box
        component="img"
        src={images[index].src}
        alt={images[index].alt}
        sx={{
          width: '100%',
          height: 'auto',
          borderRadius: 2,
          boxShadow: 3,
          display: 'block'
        }}
      />

      {/* Left arrow */}
      <IconButton
        onClick={prev}
        aria-label="Previous"
        sx={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', bgcolor: 'background.paper', '&:hover': { bgcolor: 'grey.100' } }}
      >
        <ArrowBackIosIcon />
      </IconButton>

      {/* Right arrow */}
      <IconButton
        onClick={next}
        aria-label="Next"
        sx={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', bgcolor: 'background.paper', '&:hover': { bgcolor: 'grey.100' } }}
      >
        <ArrowForwardIosIcon />
      </IconButton>

      {/* Indicators */}
      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', mt: 1 }}>
        {images.map((_, i) => (
          <Box
            key={i}
            onClick={() => setIndex(i)}
            sx={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              bgcolor: i === index ? 'primary.main' : 'grey.300',
              cursor: 'pointer'
            }}
            aria-label={`Go to slide ${i + 1}`}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter') setIndex(i); }}
          />
        ))}
      </Box>
    </Box>
  );
}
