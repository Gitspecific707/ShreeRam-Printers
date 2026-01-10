import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, List, ListItem, ListItemText, Typography } from '@mui/material';
import { API_URL, PUBLIC_READ } from '../config';

const STORAGE_KEY = 'sr_queries';
const TEN_DAYS_MS = 10 * 24 * 60 * 60 * 1000;

function loadAndPurgeLocal() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const now = Date.now();
    const purged = parsed.filter((q) => now - (q.createdAt || 0) <= TEN_DAYS_MS);
    if (purged.length !== parsed.length) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(purged));
    }
    return purged;
  } catch (e) {
    console.error('Failed to load queries', e);
    return [];
  }
}

async function fetchFromApi() {
  if (!API_URL) return [];
  try {
    const res = await fetch(API_URL, { method: 'GET' });
    if (!res.ok) throw new Error('Network response not ok');
    const data = await res.json();
    if (!Array.isArray(data)) return [];
    return data;
  } catch (e) {
    console.warn('Failed to fetch queries from API', e);
    return [];
  }
}

export default function RecentQueriesDialog({ open, onClose }) {
  const [list, setList] = useState([]);

  useEffect(() => {
    if (!open) return;
    let mounted = true;

    async function load() {
      if (PUBLIC_READ && API_URL) {
        const serverList = await fetchFromApi();
        if (mounted && serverList.length > 0) {
          setList(serverList.slice().reverse());
          return;
        }
      }
      const local = loadAndPurgeLocal();
      if (mounted) setList(local.slice().reverse());
    }

    load();
    return () => { mounted = false; };
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Recent Queries (last 10 days)</DialogTitle>
      <DialogContent>
        {list.length === 0 ? (
          <Typography>No queries found.</Typography>
        ) : (
          <List>
            {list.map((q) => (
              <ListItem key={q.id || `${q.createdAt}-${Math.random()}`} alignItems="flex-start">
                <ListItemText
                  primary={`${q.name || 'Anonymous'} — ${q.contact || ''}`}
                  secondary={<>
                    {q.address && <Typography component="span" display="block">{q.address}</Typography>}
                    <Typography component="span" display="block">{q.query}</Typography>
                    <Typography component="span" variant="caption" display="block">{q.createdAt ? new Date(q.createdAt).toLocaleString() : ''}</Typography>
                  </>}
                />
              </ListItem>
            ))}
          </List>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
