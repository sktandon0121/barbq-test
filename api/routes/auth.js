const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { registerValidation, loginValidation } = require('../validations/userValidations');
/* import user model  */
const User = require('./../Models/User');


/* Register the user  */
router.post('/register',async (req,res,next)=>{
    
    /* validate request body */
    const {error} = registerValidation(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }
    /* Check existing email address */
    const existEmail = await User.findOne({email:req.body.email});
    if(existEmail){
        return res.status(401).send('Email is already exist');
    }
    /* hash the password  */
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password,salt);
    const user = new User({
        name:req.body.name,
        email:req.body.email,
        password: hashedPass
    });
    /* save user  */
    try{
        const savedData = await user.save();
        res.status(201).send(savedData);
    }catch(err){
        res.status(401).send(err)
    }
});


/* user login */
router.post('/login',async (req,res,next)=>{
    const {error} = loginValidation(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }
    /* Check existing email address */
    const user = await User.findOne({email:req.body.email});
    if(!user){
        return res.status(400).send('Email or Password is not valid');
    }
    
    /* Compare password  */
    const validPass = await bcrypt.compare(req.body.password,user.password);
    if(!validPass){
        return res.status(400).send('Email or password is not valid ');
    }
    // res.send('login success ');
    const token = jwt.sign({_id: user._id},process.env.TOKEN_SECRET);
    res.header('auth-token',token);
    res.status(200).send({"auth-token": token});
});


module.exports = router;