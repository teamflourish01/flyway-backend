const express = require('express');
const cors = require('cors');
const connection = require('./db');
const homeRouter = require('./modules/home/home.routes');
const whychooseRouter = require('./modules/whychooseus/choose.routes');
const UserRouter = require('./modules/user/User.routes');
const testimonialRouter = require('./modules/testimonial/testimonial.routes');
const categoryRouter = require('./modules/category/Category.routes');
const ProductRouter = require('./modules/product/product.routes');
const priceRouter = require('./modules/Price/price.routes');
const additionalRouter = require('./modules/addtional/additional.routes');
require("dotenv").config("")
let app=express()
app.use(express.json())

app.use(cors({origin:true}));
app.use(express.static("uploads"));
app.use("/home",homeRouter);
app.use("/",UserRouter);
app.use("/whychoose",whychooseRouter);
app.use("/testimonials",testimonialRouter)
app.use("/category",categoryRouter)
app.use("/product",ProductRouter)
app.use("/price",priceRouter)
app.use("/service",additionalRouter)

app.listen(process.env.PORT,async()=>{
    console.log(`server listening on ${process.env.PORT}`);
    try {
        await connection
        console.log("Database is Ready");
    } catch (error) {
        console.log(error);
        
    }
})
