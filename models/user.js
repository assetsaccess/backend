const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Import the Sequelize instance


class User extends Model { }

User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
}, { sequelize, modelName: 'user' });

module.exports = User;
