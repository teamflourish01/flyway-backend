const express = require("express");
const BlogRouter = express.Router();
const blogController = require("../blog/blogController");
const multer = require("multer");
// const SetImgsize = require("../middleware/ImagesizeMiddleware");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/blog");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype) {
    cb(null, true);
  } else {
    cb(null, false);
    return cb(new Error("Only JPG images are allowed"), false);
  }
};

const uploadBlog = multer({
  storage: storage,
  fileFilter,
});

BlogRouter.post(
  "/blog/add",
  uploadBlog.fields([
    {
      name: "banner",
    },
  ]),

  blogController.addBlog
);

BlogRouter.get("/blog", blogController.getBlog);
BlogRouter.post(
  "/blog/edit/:slug",
  uploadBlog.fields([
    {
      name: "banner",
    },
  ]),

  blogController.editBlog
);
BlogRouter.get("/blog/:slug", blogController.getDetailBlog);
BlogRouter.get("/blog/search/:search", blogController.searchBlog);
BlogRouter.delete("/blog/delete/:slug", blogController.deleteBlog);
module.exports = { BlogRouter };
