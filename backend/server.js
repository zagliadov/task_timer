require('dotenv').config();
const express = require('express'),
    cors = require('cors');
const app = express(),
    PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());



app.use('/api/timer', require('./routes/timer.js'));






app.listen(PORT, async (req, res) => {
    console.log(`Server run on ${PORT}`)
})