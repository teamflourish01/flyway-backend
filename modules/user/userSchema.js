const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      set: (value) => value.toLowerCase(),
    },
    email: {
      type: String,
      unique: true,
      required: true,
      set: (value) => value.toLowerCase(),
    },
    password: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
UserSchema.methods.genrateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
      },
      process.env.JWT_KEY,
      {
        expiresIn: "3h",
      }
    );
  } catch (error) {
    console.error("Token Error", error);
  }
};

const User = new mongoose.model("User", UserSchema);
module.exports = User;
