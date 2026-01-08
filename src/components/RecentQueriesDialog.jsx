import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, List, ListItem, ListItemText, Typography } from '@mui/material';

const STORAGE_KEY = 'sr_queries';
const TEN_DAYS_MS = 10 * 24 * 60 * 60 * 1000;

function loadAndPurge() {
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

export default function RecentQueriesDialog({ open, onClose }) {
  const [list, setList] = useState([]);

  useEffect(() => {
    if (open) {
      setList(loadAndPurge());
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Recent Queries (last 10 days)</DialogTitle>
      <DialogContent>
        {list.length === 0 ? (
          <Typography>No recent queries found.</Typography>
        ) : (
          <List>
            {list.slice().reverse().map((q) => (
              <ListItem key={q.id} alignItems="flex-start">
                <ListItemText
                  primary={`${q.name} — ${q.contact}`}
                  secondary={<>
                    {q.address && <Typography component="span" display="block">{q.address}</Typography>}
                    <Typography component="span" display="block">{q.query}</Typography>
                    <Typography component="span" variant="caption" display="block">{new Date(q.createdAt).toLocaleString()}</Typography>
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
