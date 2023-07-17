import { useContext } from "react";
import BlogPost from './BlogPost';
import Pagination from '@mui/material/Pagination';
import InputLabel from '@mui/material/InputLabel';
import { AppStateContext } from "../App";

function RenderPost(postId, title, body, userId) {
  return (
    <BlogPost key={postId} title={title} body={body} userId={userId} />
  );
}

function RenderPosts(posts) {
  let ret = [];
  for (let post of posts) {
    ret.push(RenderPost(post.id, post.title, post.body, post.userId));
  }
  return ret;
}

function PostsDisplay() {
  const context = useContext(AppStateContext);

  const handlePageChange = (event, value) => {
    context.setAppState({
      ...context.appState,
      currentPage: value - 1,
      isLoading: true
    })
  };

  return (
    <div>
      <div style={{ padding: "8px" }}>
        <InputLabel> Found {context.appState.numberOfPosts} posts</InputLabel>
        {RenderPosts(context.appState.posts)}
      </div>
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
    </div>
  )
}

export default PostsDisplay;