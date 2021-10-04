// const express = require('express');
import express from 'express';
const router = express.Router();
import { saveTaskPackage, updateTime } from '../controllers/timer';

router.route('/add_task')
    .post(saveTaskPackage);

router.route('/update_time')
    .put(updateTime);

module.exports = router;