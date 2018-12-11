module.exports = {
  database: {
    host: 'localhost',
    port: 3306,
    database: 'lblog',
    username: 'root',
    password: 'root',
  },
  mysql: {
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
  },
  query: {
    limit: 20,
    offset: 0,
    sort: 'dec'
  }
}