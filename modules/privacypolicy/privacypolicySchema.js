const mongoose = require("mongoose");

const privacypolicySchema = new mongoose.Schema(
  {
    content: { type: String },
  },
  { timestamps: true, versionKey: false }
);

const privacyModel = mongoose.model("privacypolicey", privacypolicySchema);

module.exports = privacyModel;
