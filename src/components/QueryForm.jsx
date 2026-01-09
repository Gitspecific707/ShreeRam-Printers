import React, { useEffect, useState } from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import { API_URL } from '../config';

const STORAGE_KEY = 'sr_queries';
const TEN_DAYS_MS = 10 * 24 * 60 * 60 * 1000;

function loadQueries() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error('loadQueries error', e);
    return [];
  }
}

function saveQueries(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    console.error('saveQueries error', e);
  }
}

function purgeOld(list) {
  const now = Date.now();
  return list.filter((q) => now - (q.createdAt || 0) <= TEN_DAYS_MS);
}

export default function QueryForm({ onSubmitted }) {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    // purge old entries on mount
    const all = loadQueries();
    const purged = purgeOld(all);
    if (purged.length !== all.length) saveQueries(purged);
  }, []);

  async function handleSubmit(e) {
    e && e.preventDefault();
    if (!name.trim() || !contact.trim() || !query.trim()) {
      alert('Please enter name, contact and your query.');
      return;
    }

    const entry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      name: name.trim(),
      contact: contact.trim(),
      address: address.trim(),
      query: query.trim(),
      createdAt: Date.now()
    };

    const all = loadQueries();
    const purged = purgeOld(all);
    purged.push(entry);
    saveQueries(purged);

    // try to POST to API if configured (best-effort)
    if (API_URL) {
      try {
        await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(entry)
        });
      } catch (err) {
        console.warn('Failed to POST query to API', err);
      }
    }

    // clear form
    setName('');
    setContact('');
    setAddress('');
    setQuery('');

    if (typeof onSubmitted === 'function') onSubmitted(entry);
  }

  return (
    <Box sx={{ maxWidth: 680, mx: 'auto' }} component="form" onSubmit={handleSubmit}>
      <Paper sx={{ p: 2 }} elevation={2}>
        <Typography variant="h6" sx={{ mb: 1 }}>Send a Query</Typography>
        <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth sx={{ mb: 1 }} />
        <TextField label="Contact No." value={contact} onChange={(e) => setContact(e.target.value)} fullWidth sx={{ mb: 1 }} />
        <TextField label="Address" value={address} onChange={(e) => setAddress(e.target.value)} fullWidth sx={{ mb: 1 }} />
        <TextField label="Your Query" value={query} onChange={(e) => setQuery(e.target.value)} fullWidth multiline minRows={3} sx={{ mb: 1 }} />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          <Button onClick={handleSubmit} variant="contained" color="success" type="submit">Send Query</Button>
        </Box>
      </Paper>
    </Box>
  );
}
