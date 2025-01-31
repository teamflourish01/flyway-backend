const mongoose = require("mongoose");
const chooseSchema = new mongoose.Schema(
  {
    image: {
      type: String,
    },
    title: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Choose = new mongoose.model("Choose", chooseSchema);

module.exports = Choose;
