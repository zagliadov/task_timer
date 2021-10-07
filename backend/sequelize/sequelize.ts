import dotenv from 'dotenv';
dotenv.config();
import {Sequelize} from 'sequelize';

export const sequelize = new Sequelize('timerDB', 'admin', 'admin', {
    dialect: 'postgres',
    host: 'timerDB',
});
