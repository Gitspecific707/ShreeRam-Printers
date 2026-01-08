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
  const touchStartX = useRef(null);
  const touchDeltaX = useRef(0);

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

  // Touch handlers for swipe on mobile
  function handleTouchStart(e) {
    if (e.touches && e.touches.length === 1) {
      touchStartX.current = e.touches[0].clientX;
      touchDeltaX.current = 0;
      if (timerRef.current) clearInterval(timerRef.current);
    }
  }

  function handleTouchMove(e) {
    if (!touchStartX.current) return;
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  }

  function handleTouchEnd() {
    const threshold = 50; // px
    if (touchDeltaX.current > threshold) {
      // swipe right -> previous
      prev();
    } else if (touchDeltaX.current < -threshold) {
      // swipe left -> next
      next();
    }
    touchStartX.current = null;
    touchDeltaX.current = 0;
    // restart autoplay
    if (autoPlay) {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setIndex((i) => (i + 1) % images.length);
      }, interval);
    }
  }

  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'relative',
        width: { xs: '95vw', sm: '90vw', md: '85vw', lg: '80vw' },
        mx: 'auto',
        boxSizing: 'border-box',
        my: 6
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <Box
        component="img"
        src={images[index].src}
        alt={images[index].alt}
        sx={{
          width: '100%',
          // Smaller height on mobile (xs). Desktop sizes unchanged.
          height: { xs: '20vh', sm: '30vh', md: '70vh' },
          objectFit: 'cover',
          borderRadius: 2,
          boxShadow: 3,
          display: 'block'
        }}
      />

      {/* Left arrow */}
      <IconButton
        onClick={prev}
        aria-label="Previous"
        sx={{
          position: 'absolute',
          left: 8,
          top: '50%',
          transform: 'translateY(-50%)',
          bgcolor: 'background.paper',
          '&:hover': { bgcolor: 'grey.100' },
          display: { xs: 'none', sm: 'flex' }
        }}
      >
        <ArrowBackIosIcon />
      </IconButton>

      {/* Right arrow */}
      <IconButton
        onClick={next}
        aria-label="Next"
        sx={{
          position: 'absolute',
          right: 8,
          top: '50%',
          transform: 'translateY(-50%)',
          bgcolor: 'background.paper',
          '&:hover': { bgcolor: 'grey.100' },
          display: { xs: 'none', sm: 'flex' }
        }}
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
