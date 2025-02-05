const mongoose = require("mongoose");
const options = {
  versionKey: false,
  timestamps: {
    createdAt: true,
    updatedAt: "modifiedAt",
  },
};
const BlogSchema = new mongoose.Schema(
  {
    meta_title: {
      type: String,
    },
    meta_description: {
      type: String,
    },
    name: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    banner_image: {
      type: String,
    },
    bannerimg_alt: { type: String },
    text1: {
      type: String,
    },
    slug: {
      type: String,
      unique: true,
      required: true,
    },
  },
  options
);

BlogSchema.pre("findOneAndUpdate", async function (next, res) {
  try {
    let update = this.getUpdate();
    if (update) {
      // console.log("update",update);
      let exist = await BlogModel.find({ name: update.name });
      
      for (let element of exist) {
        if (element._id.toString() !== update._id.toString()) {
          let error = new Error("Name Should be unique");
          error.status = 400;
          console.log(error);
          next(error);
        } else {
          continue;
        }
      }
      next();
    }
  } catch (error) {
    next(error);
  }
});

const BlogModel = mongoose.model("Blog", BlogSchema);
module.exports = BlogModel;
