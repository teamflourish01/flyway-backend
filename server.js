const express = require('express');
const cors = require('cors');
require("dotenv").config("")
let app=express()
app.use(express.json())
app.use(cors({origin:true}))



app.listen(process.env.PORT,()=>{
    console.log(`server listening on ${process.env.PORT}`);
})
