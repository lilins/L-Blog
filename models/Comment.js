const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { Comment } = require('./index');
const { query } = require('./config')

function clone(obj) {
  if (null == obj || "object" != typeof obj) return obj;
  var copy = obj.constructor();
  for (var attr in obj) {
    if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
  }
  return copy;
}

const getAllComment = function (opts) {
  let _opts = clone(opts)
  _opts.offset = opts.offset || query.offset;
  _opts.limit = opts.limit || query.limit;
  return Comment.findAll(_opts);
}

const getCommentById = function (id) {
  return Comment.findOne({
    where: { id: id }
  });
}

const getPostBySearch = function (opts) {
  let _opts = clone(opts);
  _opts.where = {
    [Op.or]: [{ id: opts.id }, { postAuthor: opts.author }]
  };
  return Post.findAll(_opts);
}

const addComment = function (comment) {
  return Comment.create({
    commentUser: comment.user || 'NoName',
    commenEmail: comment.email || '',
    commentTitle: comment.title || '',
    commentContent: comment.content || '',
    commentToUser: comment.toUser || 'Author',
    commentDate: comment.date || Date.now(),
    postId: comment.postId
  });
}

const deleteComment = function (post) {
  const id = post.id;
  delete post.id;
  return Comment.destroy({
    where: { id: id }
  });
}

module.exports = {
  getAllComment: getAllComment,
  getCommentById: getCommentById,
  addComment: addComment,
  deleteComment: deleteComment
}