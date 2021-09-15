require('dotenv').config();
const express = require('express'),
    cors = require('cors');
const app = express(),
    PORT = process.env.PORT || 8080;
const sequelize = require('./sequelize/sequelize');
app.use(cors());
app.use(express.json());



app.use('/api/timer', require('./routes/timer.js'));
app.use('/api/auth' , require('./routes/auth.js'));
app.use('/api/tasks', require('./routes/tasks.js'));


sequelize.sync().then(() => {
    app.listen(PORT, async (req, res) => {
        console.log(`Server run on ${PORT}`)
    })
})