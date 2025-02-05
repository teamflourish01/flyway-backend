const mongoose = require("mongoose");
const options = {
  versionKey: false,
  timestamps: {
    createdAt: true,
    updatedAt: "modifiedAt",
  },
};

const OurTeamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    designation: {
      type: String,
    },
    text: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  options
);

const OurteamlModel = mongoose.model("Ourteam", OurTeamSchema);

module.exports = OurteamlModel;
