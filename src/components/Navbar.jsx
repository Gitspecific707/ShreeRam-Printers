
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import shreeram from '../assets/shreeram.avif';

export default function Navbar() {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Box
          component="img"
          src={shreeram}
          alt="ShreeRam Printers"
          sx={{ height: 40, mr: 2 }}
        />
        <Typography variant="h6" fontWeight="bold">
          ShreeRam Printers
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
