const router = require('express').Router();

const verifyToken  = require('./../verifyToken');

const {loginUser, Logout,WhoAmI} = require('./../controller/authController');
const {RegisterUser} = require('./../controller/userController');

/* Getting who am I i.e  getting the role of user i.e 'user' or 'owner' */
router.post('/whoami',WhoAmI)
/* Register the user  */
router.post('/register',RegisterUser);

/* user login */
router.post('/login',loginUser);

/* logout user */
router.delete('/logout',verifyToken,Logout);


module.exports = router;