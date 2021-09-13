const express = require('express');
const router = express.Router();

const {
    saveTaskPackage,
    updateTime,
    // getMemo
} = require('../controllers/timer');




router.route('/add_task')
    .post(saveTaskPackage);

router.route('/update_time')
    .put(updateTime);

// router.route('/get_memo')
//     .post(getMemo);


module.exports = router;