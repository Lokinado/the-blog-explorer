const express = require('express')
const app = express()
const port = 8000

const postsPerPage = 7;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/posts/:pageNumber', async (req, res) => {
  const content = fetch("https://jsonplaceholder.typicode.com/posts/");
  const posts = await (await content).json();
  // In case when we need to change the api for fetching posts
  // I assume that we always recieve json array of some blog post objects
  if( Array.isArray(posts) ){

    const startIndex = req.params.pageNumber * postsPerPage;

    const responce = {
      pageNumber: req.params.pageNumber,
      numberOfPosts: posts.length,
      numberOfPages: Math.ceil(posts.length / postsPerPage) - 1, // represents the index of last non empty page
      posts: posts.slice( startIndex, startIndex + postsPerPage)
    };

    res.send(JSON.stringify(responce));
  } else {
    // when there is no arry return error code as an responce
    res.status(500).send("Internal Server Error");
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})