const express=require("express")
const ProductRouter=express.Router()
const productController=require("./productController")
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/product");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype ) {
    cb(null, true);
  } else {
    cb(null, false);
    return cb(new Error("Only PNG images are allowed"), false);
  }
};

const uploadProduct = multer({
  storage: storage,
  fileFilter,
});

ProductRouter.get("/",productController.getProduct)
ProductRouter.post("/add",productController.addProduct)
ProductRouter.get("/search/:search",productController.searchProduct)
ProductRouter.delete("/delete/:slug",productController.deleteProduct)
ProductRouter.get("/:slug",productController.getDetailProduct)
ProductRouter.post("/edit/:slug",uploadProduct.array({name:"image"}),productController.editProduct)

module.exports=ProductRouter