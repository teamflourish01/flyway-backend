const mongoose = require("mongoose");
const options = {
  versionKey: false,
  timestamps: {
    createdAt: true,
    updatedAt: "modifiedAt",
  },
};
const AboutusSchema = new mongoose.Schema(
  {
    meta_title: {
      type: String,
    },
    meta_description: {
      type: String,
    },
    heading: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    banner: {
      type: String,
    },
    vision: {
      type: String,
    },
    mission: {
      type: String,
    },
    heading_two: {
      type: String,
      required: true,
    },
    description_two: {
      type: String,
    },
    banner_two: {
      type: String,
    },
    ourjouerney: [
      {
        heading: {
          type: String,
          required: true,
          trim: true,
        },
        data: [
          {
            number: {
              type: String,
              required: true,
            },
            text: {
              type: String,
              required: true,
            },
          },
        ],
      },
    ],
  },
  options
);

const AboutusModel = mongoose.model("Aboutus", AboutusSchema);

module.exports = AboutusModel;
