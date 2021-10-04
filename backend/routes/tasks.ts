import express from 'express';
const router = express.Router();

import {
    getTasks,
    removeTask,
    getCompletedTasksForDays,
    showMatches,
} from '../controllers/tasks';



router.route('/get_tasks/:id')
    .get(getTasks);

router.route('/get_completed_tasks')
    .post(getCompletedTasksForDays)

router.route('/remove_task')
    .delete(removeTask);

router.route('/show_matches')
    .post(showMatches);

module.exports = router;