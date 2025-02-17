const mongoose = require("mongoose");

const termsconditionSchema = new mongoose.Schema(
  {
    content: { type: String },
  },
  { timestamps: true, versionKey: false }
);

const termsconditionModel = mongoose.model("termscondition", termsconditionSchema);

module.exports = termsconditionModel;
