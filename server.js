const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors')

//routers
const productRouter = require('./routes/product');
const categoryRouter = require('./routes/category');
const ownerRouter = require('./routes/owner');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const reviewRouter = require('./routes/review');
const addressRouter = require('./routes/address');
const paymentRouter = require('./routes/payment');
const searchRouter = require('./routes/search');
const app = express();
dotenv.config()
mongoose.connect(process.env.DB_URL,{useNewUrlParser:true,useUnifiedTopology: true,useCreateIndex:true }).then(()=>console.log('DB connected successfully'));

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/amazon',productRouter);
app.use('/amazon',categoryRouter);
app.use('/amazon',ownerRouter);
app.use('/amazon',authRouter);
app.use('/amazon',userRouter);
app.use('/amazon',reviewRouter);
app.use('/amazon',addressRouter);
app.use('/amazon',paymentRouter);
app.use('/amazon',searchRouter);
const port = process.env.PORT || 8080
app.listen(port,(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log(`app is running on port ${port}`);
    }
})