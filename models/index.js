const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('./config');

const { database, mysql } = config;

if (process.env.NODE_ENV == 'production') config['logging'] = false;

const databaseOpt = _.assign(database, mysql);
const sequelize = new Sequelize(databaseOpt);
let db = {};

fs.readdirSync(__dirname)
  .filter((file) => {
    return ~file.indexOf('.model.') < 0;
  })
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[_.upperFirst(model.name)] = model;
  });

db.Post.belongsToMany(db.Tag, { through: 'PostTag'});
db.Tag.belongsToMany(db.Post, { through: 'PostTag'});
db.Post.hasMany(db.Comment);
db.Comment.belongsTo(db.Post, { foreignKey: 'postId'});

db.sequelize = sequelize;

module.exports = db;