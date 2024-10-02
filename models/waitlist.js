const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Import the Sequelize instance

class Waitlist extends Model { }
Waitlist.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    },
    status: {
        type: DataTypes.ENUM("pending", "contacted", "converted"),
        defaultValue: "pending",
    },
}, { sequelize, modelName: 'waitlist' });

module.exports = Waitlist;

