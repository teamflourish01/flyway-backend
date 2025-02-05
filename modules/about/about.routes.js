const express = require("express");
const aboutController = require("./aboutController");
const aboutRouter = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/aboutus");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
});

aboutRouter
  .post(
    "/add",
    upload.fields([
      { name: "banner", maxCount: 1 },
      { name: "banner_two", maxCount: 1 },
    ]),
    aboutController.add
  )
  .put(
    "/edit/:id",
    upload.fields([
      { name: "banner", maxCount: 1 },
      { name: "banner_two", maxCount: 1 },
    ]),
    aboutController.editAboutus
  )
  .get("/", aboutController.getData)
  .get("/:id", aboutController.getSingleData);

module.exports = aboutRouter;
