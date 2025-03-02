const express = require("express");
const policeyRouter = express.Router();
const privacyController = require("../privacypolicy/privacypoliyController");

policeyRouter
  .get("/", privacyController.getData)
  .post("/add", privacyController.addpolicy)
  .get("/:id", privacyController.getSingleData)
  .put("/edit/:id", privacyController.editPolicy);

module.exports = policeyRouter;
