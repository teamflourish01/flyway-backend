const express = require("express");
const {
  addContectdetail,
  updateContectdetail,
  getContectDetails,
  getContectdetailsByid,
} = require("./sociallinkController");

const sociallinksRouter = express.Router();

sociallinksRouter
  .get("/", getContectDetails)
  .post("/add", addContectdetail)
  .get("/:id", getContectdetailsByid)
  .put("/edit/:id", updateContectdetail);

module.exports = sociallinksRouter;
