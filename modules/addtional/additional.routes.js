const express=require("express")
const additionalRouter=express.Router()
const additionalController=require("./additionalController")


additionalRouter.get("/",additionalController.getService)
additionalRouter.get("/:id",additionalController.getServiceDetails)
additionalRouter.post("/add",additionalController.addService)
additionalRouter.post("/edit/:id",additionalController.editService)
additionalRouter.delete("/delete/:id",additionalController.deleteService)


module.exports=additionalRouter

