const { Sequelize } = require('sequelize');
const config = require('./config');
const dev = config.development;

const sequelize = new Sequelize(dev.database, dev.username, dev.password, {
    host: 'nascom.com.ng',
    port: 3306,
    dialect: 'mysql' // or another supported dialect
});

module.exports = sequelize;