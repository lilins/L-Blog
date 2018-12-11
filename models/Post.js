const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { Post, Comment } = require('./index');
const { query } = require('./config')

function clone(obj) {
  if (null == obj || "object" != typeof obj) return obj;
  var copy = obj.constructor();
  for (var attr in obj) {
    if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
  }
  return copy;
}

const getAllPost = function (opts) {
  let _opts = clone(opts)
  _opts.offset = opts.offset || query.offset;
  _opts.limit = opts.limit || query.limit;
  _opts.include = [
    { model: Comment }
  ]
  if (Object.keys(opts).length === 0) {
    return Post.findAll(_opts);
  } else {
    return getPostBySearch(_opts);
  }
}

const getPostById = function (id) {
  return Post.findOne({
    where: { id: id }
  });
}

const getPostByAuthor = function (author) {
  return Post.findAll({
    where: { postAuthor: author }
  });
}

const getPostBySearch = function (opts) {
  let _opts = clone(opts);
  _opts.where = {
    [Op.or]: [{ id: opts.id }, { postAuthor: opts.author }]
  };
  return Post.findAll(_opts);
}

const addPost = function (post) {
  return Post.create({
    postTitle: post.title || 'NoName',
    postAuthor: post.author || '',
    postDate: post.date || Date.now(),
    postContent: post.content || '',
  });
}

const editPost = function (post) {
  const id = post.id;
  delete post.id;
  return Post.update({
    postTitle: post.title || 'NoName',
    postAuthor: post.author || '',
    postDate: post.date || Date.now(),
    postContent: post.content || '',
  }, {
      where: { id: id }
    });
}

const deletePost = function (post) {
  const id = post.id;
  delete post.id;
  return Post.destroy({
    where: { id: id }
  });
}

module.exports = {
  getAllPost: getAllPost,
  getPostById: getPostById,
  getPostBySearch: getPostBySearch,
  addPost: addPost,
  editPost: editPost,
  deletePost: deletePost
}