import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import QueryForm from './QueryForm';

export default function QueryDialog({ open, onClose, onSubmitted }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Send Query</DialogTitle>
      <DialogContent>
        <QueryForm onSubmitted={(entry) => { if (typeof onSubmitted === 'function') onSubmitted(entry); }} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
