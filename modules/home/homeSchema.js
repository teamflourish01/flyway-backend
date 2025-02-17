const mongoose = require("mongoose");
const homeSchema = new mongoose.Schema(
  {
    meta_title: {
      type: String,
    },
    meta_description: {
      type: String,
    },
    banner_heading: {
      type: String,
    },
    banner_text: {
      type: String,
    },
    banner_image: { type: Array },
    bannerimg_alt: { type: Array },
    best_seller: [{ type: mongoose.Schema.ObjectId, ref: "product" }],
    new_arrival: [{ type: mongoose.Schema.ObjectId, ref: "product" }],
    marque: {
      type: Array,
    },
    about_video:{
      type:String
    },
    gallery: {
      type: Array,
    },
    gallery_alt: {
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
