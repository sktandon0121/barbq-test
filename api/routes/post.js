const { verify } = require('jsonwebtoken');

const router = require('express').Router();

const verifyToken = require('./../verifyToken');



router.get('/',verifyToken,(req,res,next)=>{
    res.send({message:'all post are here ',user:res.user});
});


module.exports = router;