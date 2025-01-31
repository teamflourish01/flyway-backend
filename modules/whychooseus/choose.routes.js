const express=require("express")
const whychooseRouter=express.Router()
const whychooseController=require("./chooseController");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/choose");
  },
  filename: function (req, file, cb) {
    cb(null,`${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
});

whychooseRouter.post("/add", upload.single("image") ,whychooseController.addChoose)
whychooseRouter.get("/:id",whychooseController.getChooseDetail)
whychooseRouter.put("/edit/:id",upload.single("image"),whychooseController.editChoose)
whychooseRouter.delete("/delete/:id",whychooseController.deleteChoose)
whychooseRouter.get("/",whychooseController.getChoose)

module.exports=whychooseRouter
