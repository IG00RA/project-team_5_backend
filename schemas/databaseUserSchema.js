const { Schema } = require("mongoose");

const { handleMongooseError } = require("../helpers");

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: [true, "Name is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    token: {
      type: String,
      default: null,
    },
    phone: {
      type: String,
      unique: true,
      default: "",
    },
    skype: {
      type: String,
      unique: true,
      default: "",
    },
    birthday: {
      type: String,
      default: "",
    },
    avatarURL: {
      type: String,
      default: "",
    },
    theme: {
      type: String,
      default: "light",
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

module.exports = userSchema;
