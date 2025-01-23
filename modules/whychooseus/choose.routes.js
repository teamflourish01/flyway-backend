const express=require("express")
const whychooseRouter=express.Router()
const whychooseController=require("./chooseController")
whychooseRouter.post("/add",whychooseController.addChoose)
whychooseRouter.post("/edit/:id",whychooseController.editChoose)
whychooseRouter.get("/",whychooseController.getChoose)

module.exports=whychooseRouter
