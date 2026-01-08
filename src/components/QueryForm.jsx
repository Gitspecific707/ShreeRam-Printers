import React, { useEffect, useState } from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';

const STORAGE_KEY = 'sr_queries';
const TEN_DAYS_MS = 10 * 24 * 60 * 60 * 1000;

function loadQueries() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch (e) {
    console.error('Failed to load queries', e);
    return [];
  }
}

function saveQueries(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    console.error('Failed to save queries', e);
  }
}

function purgeOld(list) {
  const now = Date.now();
  return list.filter((q) => now - (q.createdAt || 0) <= TEN_DAYS_MS);
}

export default function QueryForm({ onSubmitted, showLast = true }) {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [query, setQuery] = useState('');
  const [last, setLast] = useState(null);

  useEffect(() => {
    // On mount, purge old entries and load last submission
    const all = loadQueries();
    const purged = purgeOld(all);
    if (purged.length !== all.length) saveQueries(purged);
    if (purged.length > 0) setLast(purged[purged.length - 1]);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
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
    setLast(entry);

    // clear form
    setName('');
    setContact('');
    setAddress('');
    setQuery('');
    // call optional callback (used by modal to close after submit)
    if (typeof onSubmitted === 'function') onSubmitted(entry);
  }

  return (
    <Box sx={{ maxWidth: 720, mx: 'auto', my: 6, px: 2 }}>
      <Paper sx={{ p: 3 }} elevation={3} component="form" onSubmit={handleSubmit}>
        <Typography variant="h5" sx={{ mb: 2 }}>Send us a Query</Typography>
        <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth sx={{ mb: 2 }} />
        <TextField label="Contact No." value={contact} onChange={(e) => setContact(e.target.value)} fullWidth sx={{ mb: 2 }} />
        <TextField label="Address" value={address} onChange={(e) => setAddress(e.target.value)} fullWidth sx={{ mb: 2 }} />
        <TextField label="Your Query" value={query} onChange={(e) => setQuery(e.target.value)} fullWidth multiline minRows={3} sx={{ mb: 2 }} />
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', justifyContent: 'flex-end' }}>
          <Button type="submit" variant="contained" color="primary">Submit</Button>
        </Box>
      </Paper>

      {showLast && last && (
        <Paper sx={{ p: 2, mt: 2 }} elevation={1}>
          <Typography variant="subtitle1">Your last submitted query</Typography>
          <Typography><strong>Name:</strong> {last.name}</Typography>
          <Typography><strong>Contact:</strong> {last.contact}</Typography>
          {last.address && <Typography><strong>Address:</strong> {last.address}</Typography>}
          <Typography sx={{ mt: 1 }}><strong>Query:</strong> {last.query}</Typography>
          <Typography sx={{ mt: 1 }} variant="caption">Submitted: {new Date(last.createdAt).toLocaleString()}</Typography>
        </Paper>
      )}
    </Box>
  );
}
