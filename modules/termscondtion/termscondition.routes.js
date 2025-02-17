const express = require("express");
const trmsconditionRouter = express.Router();
const privacyController = require("../termscondtion/termsconditionController");

trmsconditionRouter
  .get("/", privacyController.getData)
  .post("/add", privacyController.addpolicy)
  .get("/:id", privacyController.getSingleData)
  .put("/edit/:id", privacyController.editPolicy);

module.exports = trmsconditionRouter;
