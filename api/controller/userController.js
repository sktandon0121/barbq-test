const bcrypt = require('bcryptjs');
const User = require('./../Models/User');
const { registerValidation, loginValidation } = require('../validations/userValidations');


/* Register new user  */
const RegisterUser=async (req,res,next)=>{
    
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
        password: hashedPass,
    });
    /* save user  */
    try{
        const savedData = await user.save();
        res.status(201).send(savedData);
    }catch(err){
        res.status(401).send(err)
    }
};


/* Update User details  */

const UpdateUser = async (req,res,next)=>{
    
};


exports.RegisterUser = RegisterUser;
exports.UpdateUser  = UpdateUser;