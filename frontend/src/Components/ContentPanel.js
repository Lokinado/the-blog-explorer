import { useContext } from "react";
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import BlogPost from './BlogPost';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import '../App.css';

import { AppStateContext } from "../App";

function RenderPost(title, body , userId){
  return (
    <BlogPost title={title} body={body} userId={userId}/>
  );
}

function RenderPosts( posts ){
  let ret = [];
  for(let post of posts ){
    ret.push( RenderPost(post.title, post.body, post.userId) );
  }
  return ret;
}

function ContentPanel(){
  console.log("RERENDER");
  const context = useContext(AppStateContext);

  const handlePageChange = (event, value) => {
    context.setAppState({
      ...context.appState,
      currentPage: value-1,
      isLoading: true
    })
  };

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
    <Box sx={{ display: "flex"}}>
      {/* TODO: remove when the screen is too small */}
      <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}/> 
      <Box 
      sx={{ 
        flexGrow: 1,
        borderLeft: "1px solid #1976D2",
        borderRight: "1px solid #1976D2",
        width: "33vw"
      }} >
        <div style={{borderBottom: "1px solid #1976D2", padding: "8px"}}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <TextField fullWidth label="Search" id="Search" onChange={handleTextChange}/>
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
        <div style={{padding: "8px"}}>
        { context.appState.isLoading ? <div></div> : <InputLabel> Found {context.appState.numberOfPosts} posts</InputLabel>}
          { context.appState.isLoading ? <div></div> : RenderPosts(context.appState.posts)}
        </div>
        { context.appState.isLoading ? <div></div> : 
        <Pagination 
          className='center-pagination' 
          size="small" 
          variant="outlined" 
          shape="rounded"
          boundaryCount={2} 
          siblingCount={1}
          count={context.appState.numberOfPages}
          page={context.appState.currentPage + 1}
          onChange={handlePageChange} 
        />
        }
      </Box>
      <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}/>
    </Box>
  );
}

export default ContentPanel;