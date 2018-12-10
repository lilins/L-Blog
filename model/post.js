const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const config = require('./config');
const sequelize = new Sequelize({
  host: 'localhost',
  port: 3306,
  database: 'lblog',
  username: 'root',
  password: 'root',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define: {
    underscored: false,
    freezeTableName: true,
    charset: 'utf8',
    dialectOptions: {
      collate: 'utf8_general_ci'
    },
    timestamps: true
  }
});

const Post = sequelize.define('post', {
  postTitle: Sequelize.STRING,
  postAuthor: Sequelize.STRING,
  postDate: Sequelize.DATE,
  postContent: Sequelize.TEXT
});

function clone(obj) {
  if (null == obj || "object" != typeof obj) return obj;
  var copy = obj.constructor();
  for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
  }
  return copy;
}

// sequelize.sync();

const getAllPost = function (opts) {
  let _opts = clone(opts)
  _opts.offset = opts.offset || config.database.offset;
  _opts.limit = opts.limit || config.database.limit;
  if(Object.keys(opts).length === 0){
    return Post.findAll(_opts);
  }else{
    return getPostBySearch(_opts);
  }
}

const getPostById = function(id){
  return Post.findOne({
    where: { id: id }
  });
}

const getPostByAuthor = function(author){
  return Post.findAll({
    where: { postAuthor: author }
  });
}

const getPostBySearch = function(opts){
  let _opts = clone(opts);
  _opts.where = {
    [Op.or]: [{id: opts.id}, { postAuthor: opts.author}]
  };
  return Post.findAll(_opts);
}

const addPost = function(post){
  return Post.create({
    postTitle: post.title || 'NoName',
    postAuthor: post.author || '',
    postDate: post.date || Date.now(),
    postContent: post.content || '',
  });
}

const editPost = function(post){
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

const deletePost = function(post){
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