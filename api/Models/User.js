const mongoose = require('mongoose');



const {Schema} =  mongoose;

const userSchema = new Schema({
    name:{
        type: String,
        min:6,
        max:255,
        required:true
    },
    email:{
        type: String,
        min:6,
        max:255,
        required:true,
    },
    password:{
        type: String,
        min:6,
        max:1024,
        required:true
    },
    token:{
        type:String,
        
    },
    date:{
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('User',userSchema);
