const express = require('express');
const router = express.Router();

const {
    getTimer
} = require('../controllers/timer');




router.route('/')
    .get(getTimer);




module.exports = router;