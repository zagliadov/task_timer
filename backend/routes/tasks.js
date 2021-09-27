const express = require('express');
const router = express.Router();

const {
    getTasks,
    removeTask,
    getCompletedTasksForDays,
    showMatches,
} = require('../controllers/tasks');




router.route('/get_tasks/:id')
    .get(getTasks);

router.route('/get_completed_tasks')
    .post(getCompletedTasksForDays)

router.route('/remove_task')
    .delete(removeTask);

router.route('/show_matches')
    .post(showMatches);

module.exports = router;