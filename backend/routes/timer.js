const express = require('express');
const router = express.Router();

const {
    saveTaskPackage
} = require('../controllers/timer');




router.route('/add_task')
    .post(saveTaskPackage);




module.exports = router;