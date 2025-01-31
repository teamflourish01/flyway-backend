const mongoose = require("mongoose");
const TestimonialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    ratting: {
      type: String,
    },
    image: {
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

const Testimonial = new mongoose.model("Testimonial", TestimonialSchema);
module.exports = { Testimonial };
