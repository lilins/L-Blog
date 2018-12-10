const express = require('express');
const router = express.Router();
const postModel = require('../model/post');

router.route('/post/:id')
.get(async function(req, res, next){
  const post = await postModel.getAllPost();
  res.body = post;
  next();
})
.post(async function(req, res, next){
  const body = req.body;
  const result = await postModel.addPost(body);
  res.body = result;
  next();
})
.put(async function(req, res, next){
  const body = req.body;
  const result = await postModel.editPost(body);
  res.body = result;
  next();
})
.delete(async function(req, res, next){
  const params = req.params;
  const result = await postModel.deletePost(params);
  res.body = result;
  next();
});

router.route('/tag/:id')
.get(async function(req, res, next){
  const post = await postModel.getAllPost();
  res.body = post;
  next();
})
.post(async function(req, res, next){
  const body = req.body;
  const result = await postModel.addPost(body);
  res.body = result;
  next();
})
.put(async function(req, res, next){
  const body = req.body;
  const result = await postModel.editPost(body);
  res.body = result;
  next();
})
.delete(async function(req, res, next){
  const params = req.params;
  const result = await postModel.deletePost(params);
  res.body = result;
  next();
});

router.route('/querypost')
.post(async function(req, res, next){
  const body = req.body;
  const post = await postModel.getAllPost(body);
  res.body = post;
  next();
})


module.exports = router;