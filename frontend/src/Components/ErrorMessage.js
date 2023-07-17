import { InputLabel } from "@mui/material";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

function ErrorMessage(){
  const handleRefresh = () => {
    window.location.reload(false);
  }

  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }} />
      <Box
        sx={{
          flexGrow: 1,
          width: "33vw"
        }} >
        <div style={{ padding: "8px" }}>
          <Stack direction="column" alignItems="center" spacing={1}>
            <InputLabel>No Connection</InputLabel>
            <InputLabel>Please check if backend is running</InputLabel>
            <Button variant="contained" color="secondary" onClick={handleRefresh}>Refresh</Button>
          </Stack>
        </div>
      </Box>
      <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }} />
    </Box>
  );
}

export default ErrorMessage;