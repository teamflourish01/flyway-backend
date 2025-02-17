const mongoose = require("mongoose");

const refundpolicySchema = new mongoose.Schema(
  {
    content: { type: String },
  },
  { timestamps: true, versionKey: false }
);

const refundModel = mongoose.model("refundpolicey", refundpolicySchema);

module.exports = refundModel;
