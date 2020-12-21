const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./../Models/User');
const { registerValidation, loginValidation } = require('../validations/userValidations');


const loginUser = async (req,res,next)=>{
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
    const token = jwt.sign({_id: user._id},process.env.TOKEN_SECRET,{ expiresIn: "30m"});

    /* update user token in db */

    let updated = await User.updateOne({email:req.body.email},{$set:{token:token}});
    
    if(updated.ok){
        res.header('auth-token',token);
        res.status(200).send({"auth-token": token});
    }else{
        return res.status(400).send('Something went wrong');
    }
};






const Logout = async (req,res,next)=>{
    const {user} = res;
    /* find user by id  */
    const userData = await User.findOne({_id:user._id});
    if(!userData){
        return res.status(400).send('Invalid user ');
    }
    res.header("auth-token");
    res.status(200).send('Logout successfully');
};






exports.loginUser = loginUser;
exports.Logout = Logout;
