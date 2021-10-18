import express from 'express';
const router = express.Router();

const {
    payment,
} = require('../controllers/payment');




router.route('/payment')
    .post(payment);




module.exports = router;