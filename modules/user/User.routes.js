const express = require("express");
const UserRouter = express.Router();
const userController = require("./userController");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/user");
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
    return cb(new Error("Only PNG images are allowed"), false);
  }
};

const uploadUser = multer({
  storage: storage,
  fileFilter,
});
UserRouter.get("/user", userController.getUser);
UserRouter.post("/user/add", uploadUser.single("user"), userController.addUser);
UserRouter.get("/user/:id", userController.getUserDetail);
UserRouter.delete("/user/delete/:id", userController.deleteUser);
UserRouter.get("/user/search/:search", userController.searchUser);
UserRouter.post("/user/signin", userController.checkUser);
UserRouter.put(
  "/user/edit/:id",
  uploadUser.single("image"),
  userController.editUser
);

module.exports = UserRouter;
