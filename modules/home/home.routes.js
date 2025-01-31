const express = require("express");
let multer = require("multer");
const homeRouter = express.Router();
const homeController = require("./homeController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/home");
  },
  filename: function (req, file, cb) {
    cb(null,`${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
});

homeRouter.post("/add", homeController.addHome);
homeRouter.get("/:id",homeController.getHomeSingle);
homeRouter.put(
  "/edit/:id",
  upload.fields([{ name: "banner_image" }, { name: "gallery" }]),
  homeController.editHome
);  
homeRouter.get("/", homeController.getHome);

module.exports = homeRouter;
