
import { AppBar, Toolbar, Typography, Box, IconButton, Button, Snackbar, Alert } from '@mui/material';
import shreeram from '../assets/shreeram.avif';
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
      <Toolbar>
        <Box
          component="img"
          src={shreeram}
          alt="ShreeRam Printers"
          sx={{ height: 40, mr: 2 }}
        />
        <Typography variant="h6" fontWeight="bold" sx={{ flexGrow: 1 }}>
          ShreeRam Printers
        </Typography>

        <Button
          variant="contained"
          color="warning"
          aria-label="Get Help"
          onClick={() => setOpenQuery(true)}
          sx={{ textTransform: 'none', mr: 1 }}
          size="small"
        >
          Get Help
        </Button>

        <IconButton color="inherit" aria-label="Recent queries" onClick={() => setOpenRecent(true)} sx={{ ml: 0.5 }}>
          <HistoryIcon />
        </IconButton>

        <QueryDialog
          open={openQuery}
          onClose={() => setOpenQuery(false)}
          onSubmitted={(entry) => {
            // close dialog and show success snackbar
            setOpenQuery(false);
            setSuccessMessage('Your query submitted successfully — we will call you shortly.');
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
