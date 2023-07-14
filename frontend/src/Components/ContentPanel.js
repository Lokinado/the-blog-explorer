import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import BlogPost from './BlogPost';
import Pagination from '@mui/material/Pagination';
import '../App.css';

function RenderPost(title, body){
  return (
    <BlogPost title={title} body={body}/>
  );
}

function RenderPosts( numberOfPosts ){
  let ret = [];
  for(let i = 0 ; i < numberOfPosts; i ++ ){
    ret.push( RenderPost("Al Bundy", "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto") );
  }
  return ret;
}

function ContentPanel(){
  return (
    <Box sx={{ display: "flex"}}>
      {/* TODO: remove when the screen is too small */}
      <Box sx={{ flexGrow: 1 }}/> 
      <Box 
      sx={{ 
        flexGrow: 1,
        borderLeft: "1px solid #1976D2",
        borderRight: "1px solid #1976D2",
        width: "33vw"
      }} >
        <div style={{borderBottom: "1px solid #1976D2", padding: "8px"}}>
          <TextField fullWidth label="Search" id="Search" />
        </div>
        <div style={{padding: "8px"}}>
          {RenderPosts(7)}
        </div>
        {/* <div style={{padding: "8px", textAlign: "center"}}>
          <Pagination count={10} size="small" variant="outlined" shape="rounded" />
        </div> */}
        <Pagination className='center-pagination' count={10} size="small" variant="outlined" shape="rounded"/>
        
      </Box>
      <Box sx={{ flexGrow: 1 }}/>
    </Box>
  );
}

export default ContentPanel;