import { useContext } from "react";
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import PostsDisplay from "./PostsDisplay";
import '../App.css';
import { AppStateContext } from "../App";

function ContentPanel() {
  const context = useContext(AppStateContext);

  const handleTextChange = (event) => {
    context.setAppState({
      ...context.appState,
      textAreaValue: event.target.value,
    })
  }

  const onSubmit = (event) => {
    context.setAppState({
      ...context.appState,
      queryString: context.appState.textAreaValue,
      currentPage: 0,
      isLoading: true,
    })
  }

  const handleSortingChange = (event) => {
    context.setAppState({
      ...context.appState,
      sorting: event.target.value,
      currentPage: 0,
      isLoading: true
    })
  }

  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }} />
      <Box
        sx={{
          flexGrow: 1,
          borderLeft: "1px solid #1976D2",
          borderRight: "1px solid #1976D2",
          width: "33vw"
        }} >
        <div style={{ borderBottom: "1px solid #1976D2", padding: "8px" }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <TextField fullWidth label="Search" id="Search" onChange={handleTextChange} />
            <IconButton aria-label="delete" size="Large" onClick={onSubmit}>
              <SearchIcon fontSize="inherit" />
            </IconButton>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <InputLabel> Sort By </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue={"none"}
              size="small"
              onChange={handleSortingChange}
            >
              <MenuItem value={"none"}>None</MenuItem>
              <MenuItem value={"desc"}>Most Interesting</MenuItem>
              <MenuItem value={"asc"}>Least Interesting</MenuItem>
            </Select>
          </Stack>
        </div>
        {context.appState.isLoading ? <div></div> : <PostsDisplay />}
      </Box>
      <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }} />
    </Box>
  );
}

export default ContentPanel;