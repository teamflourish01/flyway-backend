const express=require("express");
const homeRouter=express.Router();
const homeController=require("./homeController")

homeRouter.post("/add",homeController.addHome)
homeRouter.post("/edit/:id",homeController.editHome)






module.exports=homeRouter