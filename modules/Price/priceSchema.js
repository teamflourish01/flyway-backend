const mongoose = require("mongoose");
const priceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    flatPrice: {
      type: String,
    },
    discPrice: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
const Price = new mongoose.model("Price", priceSchema);
module.exports = Price;
