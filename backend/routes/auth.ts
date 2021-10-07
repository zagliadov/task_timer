import express from 'express';
const router = express.Router();

const {
    registration,
    login,
    verifyToken,
} = require('../controllers/auth');




router.route('/registration')
    .post(registration);

router.route('/login')
    .post(login);

router.route('/verifytoken')
    .post(verifyToken);


module.exports = router;