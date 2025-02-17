const express = require("express");
const refundpoliceyRouter = express.Router();
const privacyController = require("../refundpolicy/refundpoliyController");

refundpoliceyRouter
  .get("/", privacyController.getData)
  .post("/add", privacyController.addpolicy)
  .get("/:id", privacyController.getSingleData)
  .put("/edit/:id", privacyController.editPolicy);

module.exports = refundpoliceyRouter;
