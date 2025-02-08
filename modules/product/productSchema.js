const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    meta_title: {
      type: String,
    },
    meta_description: {
      type: String,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
    },
    image: {
      type: Array,
    },
    description: {
      type: String,
    },
    text1: {
      type: String,
    },
    text2: {
      type: String,
    },
    text3: {
      type: String,
    },
    slug: {
      type: String,
      unique: true,
      required: true,
    },
    image_alt:{
      type:Array
    },
    price:[
      {
          type:mongoose.Types.ObjectId,
          ref:"Price"
      }
  ],
    service:[
      {
          type:mongoose.Types.ObjectId,
          ref:"Addition"
      }
  ]
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Product = new mongoose.model("product", productSchema);

module.exports = Product;
