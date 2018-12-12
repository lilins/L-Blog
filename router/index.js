const express = require('express');
const router = express.Router();
const request = require('request');

const requestPromise = function(opts){
  return new Promise(function(resolve, reject){
    request(opts, function(error, response, data){
      const result = {
        error, response, data
      }
      // console.log(result)
      resolve(result.data)
    })
  })
}

const api = {
  post: 'http://localhost:3000/api/post',
  query: 'http://localhost:3000/api/querypost'
}

router.get('/', function (req, res) {
  res.render('index', { title: 'test' });
})

router.get('/post', async function (req, res){
  const result = await requestPromise({ url: api.query, method: 'POST', json: true, body: {} });
  res.render('post/post', { posts: result.message, single: false });
})

router.get('/post/:id', async function (req, res){
  const params = req.params;
  const result = await requestPromise({ url: api.query, method: 'POST', json: true, body: params });
  res.render('post/post', { posts: result.message, single: true });
})

router.get('/post/:id/edit', async function (req, res){
  const params = req.params;
  const result = await requestPromise({ url: api.query, method: 'POST', json: true, body: params });
  const post = result.message.length > 0 && result.message.pop();
  res.render('post/postEdit', { post: post });
})

router.get('/newpost', async function(req, res){
  res.render('post/postAdd');
})

module.exports = router;