const express = require("express");
const multer = require("multer");
const {
  getAllTestimonials,
  getTestimonialsById,
  addTestimonials,
  deleteTestimonials,
  updateTestimonial,
} = require("../ourteam/ourteamController");
// const SetImgsize = require("../middleware/ImagesizeMiddleware");

const ourTeamRouter = express.Router();

//multer middalware

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/ourteam");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
});
// const dimensions = {
//   image: { width: 125, height: 143 },
// };

ourTeamRouter
  .get("/", getAllTestimonials)
  .get("/:id", getTestimonialsById)
  .post("/add", upload.single("image"), addTestimonials)
  .delete("/delete/:id", deleteTestimonials)
  .put("/edit/:id", upload.single("image"), updateTestimonial);

module.exports = ourTeamRouter;
