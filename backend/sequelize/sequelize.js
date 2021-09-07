require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('timerDB', 'admin', 'admin', {
    dialect: 'postgres',
    host: 'timerDB',
    
});
 

module.exports = sequelize;