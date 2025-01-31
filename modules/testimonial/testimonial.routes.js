const express=require("express")

const testimonialRouter=express.Router()
const testimonialController=require("./testimonialController")
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/testimonial");
  },
  filename: function (req, file, cb) {
    cb(null,`${Date.now()}-${file.originalname}`);
  },
});


const upload = multer({
storage: storage,
});

testimonialRouter.post("/add", upload.single("image") ,testimonialController.addTestimonial)
testimonialRouter.get("/:id",testimonialController.getTestimonialDetails)
testimonialRouter.put("/edit/:id",upload.single("image"),testimonialController.editTestimonial)
testimonialRouter.delete("/delete/:id",testimonialController.deleteTestimonial)
testimonialRouter.get("/",testimonialController.getTestimonial)

module.exports=testimonialRouter
