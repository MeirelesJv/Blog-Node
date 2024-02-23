const sequelize = require("sequelize");
const connection = new sequelize('BlogNode','teste','123',{
    host: 'localhost',
    dialect: 'mssql',
    timezone: '-03:00'
});

module.exports = connection;