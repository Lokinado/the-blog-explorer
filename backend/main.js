const express = require('express')
const app = express()
const port = 8000

const postsPerPage = 7;

const possibleSortModes = ["none", "desc", "asc"];

app.get('/posts/:pageNumber', async (req, res) => {
  //Page Number Validation
  if( isNaN(parseInt(req.params.pageNumber)) || (req.params.pageNumber === null)){
    res.status(400).send("Bad Request");
    return;
  }

  //Sorting Validation
  let sortMode = "none"; 
  if( (req.query.sort !== null) && ( possibleSortModes.includes(req.query.sort)) ){
    sortMode = req.query.sort;
  }

  //Post searching query validation
  let regexString = "";
  if( req.query.q !== null && req.query.q !== undefined ){
    regexString = req.query.q;
  }

  const content = fetch("https://jsonplaceholder.typicode.com/posts/");
  const posts = await (await content).json();

  // In case when we need to change the api for fetching posts
  // I assume that we always recieve json array of some blog post objects
  if( Array.isArray(posts) ){

    const startIndex = req.params.pageNumber * postsPerPage;

    let matchingPosts = [];
    if( regexString.length != 0 ){
      const regex = new RegExp(regexString);

      for(let post of posts){
        let matchTitle = regex.test(post.title);
        let matchBody = regex.test(post.body);
  
        if( matchTitle || matchBody ){
          matchingPosts.push(post);
        }
      }  

    } else {
      matchingPosts = posts;
    }

    if( sortMode == "desc" ){
      matchingPosts.sort(function(a, b) {
        let keyA = a.title.length;
        let keyB = b.title.length;
        if (keyA < keyB) return 1;
        if (keyA > keyB) return -1;
        return 0;
      });      
    }

    if( sortMode == "asc" ){
      matchingPosts.sort(function(a, b) {
        let keyA = a.title.length;
        let keyB = b.title.length;
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
      });      
    }

    const responce = {
      pageNumber: req.params.pageNumber,
      numberOfPosts: matchingPosts.length,
      numberOfPages: Math.ceil(matchingPosts.length / postsPerPage), // represents the index of last non empty page
      posts: matchingPosts.slice( startIndex, startIndex + postsPerPage)
    };

    res.send(JSON.stringify(responce));
  } else {
    // when there is no array return error code as an responce
    res.status(500).send("Internal Server Error");
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})