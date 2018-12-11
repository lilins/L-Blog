
const tableConfig = {
  freezeTableName: true, // 默认false修改表名为复数，true不修改表名，与数据库表名同步
}
module.exports = function(sequelize, Sequelize){
  return sequelize.define('post', {
    postTitle: Sequelize.STRING,
    postAuthor: Sequelize.STRING,
    postDate: Sequelize.DATE,
    postContent: Sequelize.TEXT,
  }, tableConfig);
}
