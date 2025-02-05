const express=require("express")
const priceRouter=express.Router()
const priceController=require("./priceController")
priceRouter.post("/add",priceController.addPrice)
priceRouter.get("/",priceController.getPrice)
priceRouter.get("/:id",priceController.getPriceDetail)
priceRouter.post("/edit/:id",priceController.editPrice)
priceRouter.delete("/delete/:id",priceController.deletePrice)

module.exports=priceRouter