const express = require('express');
const dotenv = require('dotenv');
const app = express();
const mongoose = require('mongoose');

/* dotenv config */
dotenv.config();

/* connecting to database  */
mongoose.connect(process.env.DB_CONNECT,
    { useUnifiedTopology: true , useNewUrlParser: true },
    ()=>{
        console.log('database is connected')
    }
);

/* import auth router  */
const authRouter = require('./api/routes/auth');
const postRouter = require('./api/routes/post');

/* body parser middleware  */
app.use(express.json());
/* using the middleware */
app.use('/api/user',authRouter);
app.use('/api/posts',postRouter);




app.listen(4000,()=>{

    console.log('Listening the appp at port 4000');
})