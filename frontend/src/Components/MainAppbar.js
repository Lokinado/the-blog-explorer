import { useContext } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Brightness6Icon from '@mui/icons-material/Brightness6';

import { AppStateContext } from "../App";

function MainAppbar(){
  const context = useContext(AppStateContext);

  const handleDarkModeChange = () => {
    context.setAppState({
      ...context.appState,
      colorMode: !context.appState.colorMode,
    })
  }

  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }}}
          >
            The Blog Explorer
          </Typography>
          <Box sx={{ display: 'flex' }}>
            <IconButton
              size="large"
              edge="end"
              onClick={handleDarkModeChange}
              color="inherit"
            >
              <Brightness6Icon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default MainAppbar;