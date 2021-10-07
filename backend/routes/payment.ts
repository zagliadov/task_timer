import express from 'express';
const router = express.Router();

const {
    payment,
} = require('../controllers/payment');




router.route('/create-payment-intent')
    .post(payment);




module.exports = router;