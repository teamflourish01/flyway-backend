const mongoose=require("mongoose");
const additionalSchema=new mongoose.Schema({
    name:{
        type:String,
    },
    price:{
        type:String
    }
},{
    versionKey:false,
    timestamps:true
});

const Addition =new mongoose.model("Addition",additionalSchema)

module.exports=Addition