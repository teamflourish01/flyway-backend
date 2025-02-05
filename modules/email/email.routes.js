const express = require("express");
const emailtwoRouter = express.Router();

const emailcatalogController = require("../email/emailController");

emailtwoRouter.post(
  "/email/send-email",
  emailcatalogController.createContactmail
);
emailtwoRouter.get("/email", emailcatalogController.getEmail);
emailtwoRouter.get("/email/:id", emailcatalogController.getEmailSingle);
emailtwoRouter.delete("/email/delete/:id", emailcatalogController.deleteEmail);
module.exports = emailtwoRouter;
