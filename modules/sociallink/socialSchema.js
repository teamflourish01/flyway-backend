const mongoose = require("mongoose");
const options = {
  versionKey: false,
  timestamps: {
    createdAt: true,
    updatedAt: "modifiedAt",
  },
};

const ContectdetialsSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    whatsapplink: { type: String, required: true },
    fblink: { type: String, required: true },
    instalink: { type: String, required: true },
    ytlink: { type: String, required: true },
    behanselink: { type: String, required: true },
    pintrestlink: { type: String, required: true },
    linkedinlink: { type: String, required: true },
    driblelink: { type: String, required: true },
    officenumber: { type: String, required: true },
    officeaddress: { type: String, required: true },
    addresslink: { type: String, required: true },
  },
  options
);

const sociallinkModel = mongoose.model("sociallink", ContectdetialsSchema);

module.exports = sociallinkModel;
