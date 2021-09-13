const express = require('express');
const router = express.Router();

const {
    saveTaskPackage,
    updateTime
} = require('../controllers/timer');




router.route('/add_task')
    .post(saveTaskPackage);

router.route('/update_time')
    .put(updateTime);



module.exports = router;