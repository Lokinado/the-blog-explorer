import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from './Avatar';
import '../App.css';

function BlogPost(props){
  return(
    <Box sx={{
      width:"100%",
      boxShadow: "8px 8px 8px 0px rgba(66, 68, 90, 0.2)",
      backgroundColor: "#eeeeee",
      borderRadius: "4px",
      marginBottom: "24px",
      paddingTop: "8px"
    }}>
      {/* <div style={{marginLeft: "8px", display: "flex"}}> */}
      <div className='blog-post-container'>
        <Avatar src="/images/avatars/1.jpeg" size={40} />
        <div className='blog-post-title-container'>
          <div className='title'> {props.title} </div>
          <div className='body'> {props.body} </div>
        </div>
      </div>
    </Box>
  );
}

export default BlogPost;