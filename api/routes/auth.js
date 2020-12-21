const router = require('express').Router();

const verifyToken  = require('./../verifyToken');

const {loginUser, Logout} = require('./../controller/authController');
const {RegisterUser} = require('./../controller/userController');

/* Register the user  */
router.post('/register',RegisterUser);

/* user login */
router.post('/login',loginUser);

/* logout user */
router.delete('/logout',verifyToken,Logout);


module.exports = router;