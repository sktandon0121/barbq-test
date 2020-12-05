const mongoose = require('mongoose');



const createConnection=(req,res,next)=>{
    mongoose.connect(process.env.DB_CONNECT,
        { useUnifiedTopology: true , useNewUrlParser: true },
        ()=>{
            console.log('database is connected')
            next();
        }
    );
}


module.exports = createConnection;