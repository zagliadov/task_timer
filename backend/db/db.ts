// require('dotenv').config();
import dotenv from 'dotenv';
dotenv.config();
const { Pool }: any = require('pg')
const pool = new Pool({
    user: process.env.DB_USER,
    database: 'timerDB',
    host: 'timerDB',
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT

})

module.exports = {
    query: (text: any, params: any) => pool.query(text, params),
}