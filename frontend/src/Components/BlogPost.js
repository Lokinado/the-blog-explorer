import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from './Avatar';
import { useTheme } from '@mui/material/styles';
import '../App.css';

function BlogPost(props) {
  let pathToUserAvatar = "/images/avatars/" + props.userId + ".jpeg";
  const theme = useTheme();
  return (
    <Box sx={{
      width: "100%",
      boxShadow: "8px 8px 8px 0px rgba(66, 68, 90, 0.2)",
      borderRadius: "4px",
      marginBottom: "24px",
      paddingTop: "8px",
      backgroundColor: theme.palette.postBackground
    }}>
      <div className='blog-post-container'>
        <Avatar src={pathToUserAvatar} size={40} />
        <div className='blog-post-title-container'>
          <div className='title'> {props.title} </div>
          <div className='body'> {props.body} </div>
        </div>
      </div>
    </Box>
  );
}

export default BlogPost;