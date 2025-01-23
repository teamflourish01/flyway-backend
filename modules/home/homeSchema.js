const mongoose = require("mongoose");
const homeSchema = new mongoose.Schema(
  {
    banner_heading: {
      type: String,
    },
    banner_text: {
      type: String,
    },
    banner_image: { type: Array },
    best_seller: {
      type: Array,
    },
    new_arrival: {
      type: Array,
    },
    marque: {
      type: Array,
    },
    gallery: {
      type: Array,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Home = new mongoose.model("Home", homeSchema);
module.exports = Home;
