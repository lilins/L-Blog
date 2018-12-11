const express = require('express');
const router = express.Router();
const postModel = require('../models/Post');
const commentModel = require('../models/Comment');

router.route('/querypost')
  .post(async function (req, res, next) {
    const body = req.body;
    const post = await postModel.getAllPost(body);
    res.body = post;
    next();
  });

router.route('/post')
  .get(async function (req, res, next) {
    const post = await postModel.getAllPost();
    res.body = post;
    next();
  })
  .post(async function (req, res, next) {
    const body = req.body;
    const result = await postModel.addPost(body);
    res.body = result;
    next();
  });

router.route('/post/:id')
  .put(async function (req, res, next) {
    const body = req.body;
    const result = await postModel.editPost(body);
    res.body = result;
    next();
  })
  .delete(async function (req, res, next) {
    const params = req.params;
    const result = await postModel.deletePost(params);
    res.body = result;
    next();
  });

router.route('/comment')
  .get(async function (req, res, next) {
    const post = await commentModel.getAllPost();
    res.body = post;
    next();
  })
  .post(async function (req, res, next) {
    const body = req.body;
    const result = await commentModel.addComment(body);
    res.body = result;
    next();
  });

router.route('/comment/:id')
  .delete(async function (req, res, next) {
    const params = req.params;
    const result = await commentModel.deleteComment(params);
    res.body = result;
    next();
  });




module.exports = router;