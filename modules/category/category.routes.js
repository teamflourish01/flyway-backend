const express=require("express")
const categoryRouter=express.Router()
const categoryController=require("./categoryController")
categoryRouter.get("/",categoryController.getCategory)
categoryRouter.post("/add",categoryController.addCategory)
categoryRouter.get("/:slug",categoryController.getSingleCategory)
categoryRouter.post("/edit/:slug",categoryController.editCategory)
categoryRouter.delete("/delete/:slug",categoryController.deleteCategory)
categoryRouter.get("/search/:search",categoryController.searchCategory)
module.exports=categoryRouter

