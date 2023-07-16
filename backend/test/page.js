//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../main');
let should = chai.should();

function isJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

chai.use(chaiHttp);
//Our parent block
describe('Posts', () => {

  describe('/GET posts 0', () => {
    it('it should GET one page of posts', (done) => {
      chai.request(server)
        .get('/posts/0')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  describe('/GET posts 1', () => {
    it('the result should be JSON parsable', (done) => {
      chai.request(server)
        .get('/posts/1')
        .end((err, res) => {
          res.should.have.status(200);
          if (isJson(res.text)) {
            done();
          } else {
            should.fail(0, 1, 'RESULT NOT JSON PARSABLE');
          }
        });
    });
  });

  describe('/GET posts 2', () => {
    it('Returned JSON should contain info about pages', (done) => {
      chai.request(server)
        .get('/posts/2')
        .end((err, res) => {
          res.should.have.status(200);
          const result = JSON.parse(res.text);
          if (result.pageNumber === undefined || typeof parseInt(result.pageNumber) != 'number') {
            should.fail(0, 1, 'Page Number field not present or malformed');
            return;
          }

          if (result.numberOfPosts === undefined || typeof result.numberOfPosts != 'number') {
            should.fail(0, 1, 'Number of posts field not present or malformed');
            return;
          }

          if (result.numberOfPages === undefined || typeof result.numberOfPages != 'number') {
            should.fail(0, 1, 'Number of pages field not present or malformed');
            return;
          }
          
          if (result.posts === undefined || typeof result.posts != 'object') {
            should.fail(0, 1, 'Posts field not present or malformed');
            return;
          }
          done();
        });
    });
  });

  describe('/GET posts 0', () => {
    it('q argument should query results', (done) => {
      chai.request(server)
      .get('/posts/0?q=uu')
      .end((err, res) => {
        res.should.have.status(200);
        const result = JSON.parse(res.text);
        for(let post of result.posts){
          if( !(post.title.includes("uu") || post.body.includes("uu")) ){
            should.fail(0, 1, 'There is post without query string in it in results');
          }
        }
        done();
      });
    });
  });

  describe('/GET posts 0', () => {
    it('sort argument should sort results by title length', (done) => {
      chai.request(server)
      .get('/posts/0?sort=desc')
      .end((err, res) => {
        res.should.have.status(200);
        const result = JSON.parse(res.text);
        let lastTitleLength = 99999;
        for(let post of result.posts){
          if(post.title.length > lastTitleLength){
            should.fail(0, 1, 'There is post without query string in it in results');
          } else {
            lastTitleLength = post.title.length;
          }
        }
        done();
      });
    });
  });

  describe('/GET posts 0', () => {
    it('sort argument should sort results by title length', (done) => {
      chai.request(server)
      .get('/posts/0?sort=asc')
      .end((err, res) => {
        res.should.have.status(200);
        const result = JSON.parse(res.text);
        let lastTitleLength = -1;
        for(let post of result.posts){
          if(post.title.length < lastTitleLength){
            should.fail(0, 1, 'There is post without query string in it in results');
          } else {
            lastTitleLength = post.title.length;
          }
        }
        done();
      });
    });
  });
});