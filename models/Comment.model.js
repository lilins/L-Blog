
const tableConfig = {
  freezeTableName: true, // 默认false修改表名为复数，true不修改表名，与数据库表名同步
}
module.exports = function (sequelize, Sequelize) {
  return sequelize.define('comment', {
    commentUser: Sequelize.STRING,
    commentEmail: Sequelize.STRING,
    commentTitle: Sequelize.STRING,
    commentContent: Sequelize.TEXT,
    commentToUser: Sequelize.STRING,
    commentDate: Sequelize.DATE,
    postId: Sequelize.INTEGER
  }, tableConfig);
}
