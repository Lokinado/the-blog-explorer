const express = require('express')
const app = express()
const port = 8000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/posts/:pageNumber', async (req, res) => {
  const response = fetch("https://jsonplaceholder.typicode.com/posts/");
  const posts = await (await response).json();
  if( Array.isArray(posts) ){
    console.log(posts.slice(req.params.pageNumber, req.params.pageNumber + 10));



    res.send("OK!");
  } else {
    res.status(500).send("Internal Server Error");
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})