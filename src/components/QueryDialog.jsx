import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import QueryForm from './QueryForm';

export default function QueryDialog({ open, onClose, onSubmitted }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Send us a Query</DialogTitle>
      <DialogContent>
        <QueryForm
          showLast={false}
          onSubmitted={(entry) => {
            // notify parent (Navbar) so it can close the dialog and show a message
            if (typeof onSubmitted === 'function') onSubmitted(entry);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">Close</Button>
      </DialogActions>
    </Dialog>
  );
}
