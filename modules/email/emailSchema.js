const mongoose = require("mongoose");
const options = {
  versionKey: false,
  timestamps: {
    createdAt: true,
    updatedAt: "modifiedAt",
  },
};
const emailSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    contactNumber: {
      type: String,
    },
    subject: {
      type: String,
    },
    Message: {
      type: String,
    },
  },
  options
);

const emailModel = mongoose.model("email", emailSchema);

module.exports = { emailModel };
