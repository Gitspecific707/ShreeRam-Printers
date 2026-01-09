
import { AppBar, Toolbar, Typography, Box, Button, IconButton, Snackbar, Alert } from '@mui/material';
import logonew from '../assets/logonew.png';
import HistoryIcon from '@mui/icons-material/History';
import { useState } from 'react';
import QueryDialog from './QueryDialog';
import RecentQueriesDialog from './RecentQueriesDialog';

export default function Navbar() {
  const [openQuery, setOpenQuery] = useState(false);
  const [openRecent, setOpenRecent] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  return (
    <AppBar position="sticky">
      <Toolbar sx={{ minHeight: 64 }}>
        <Box sx={{ width: { xs: 36, sm: 44 }, height: { xs: 36, sm: 44 }, mr: 2, borderRadius: '50%', overflow: 'hidden', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'background.paper' }}>
          <Box component="img" src={logonew} alt="ShreeRam Printers logo" sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </Box>
        <Typography variant="h6" fontWeight="bold" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
          ShreeRam Printers
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <Button variant="contained" color="success" aria-label="Send Query" onClick={() => setOpenQuery(true)} sx={{ textTransform: 'none', mr: 1, fontSize: { xs: '0.72rem', sm: '0.875rem' }, py: { xs: '6px', sm: '8px' } }}>
          Send Query
        </Button>

        <IconButton color="inherit" aria-label="Recent queries" onClick={() => setOpenRecent(true)} sx={{ ml: 0.5 }}>
          <HistoryIcon />
        </IconButton>

        <QueryDialog
          open={openQuery}
          onClose={() => setOpenQuery(false)}
          onSubmitted={(entry) => {
            setOpenQuery(false);
            setSuccessMessage('Your query was submitted — it will be visible to users for 10 days.');
            setSuccessOpen(true);
          }}
        />

        <RecentQueriesDialog open={openRecent} onClose={() => setOpenRecent(false)} />

        <Snackbar open={successOpen} autoHideDuration={4000} onClose={() => setSuccessOpen(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert onClose={() => setSuccessOpen(false)} severity="success" sx={{ width: '100%' }}>
            {successMessage}
          </Alert>
        </Snackbar>
      </Toolbar>
    </AppBar>
  );
}
