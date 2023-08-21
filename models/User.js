const { model } = require("mongoose");

const userSchema = require("../schemas/databaseUserSchema");

const User = model("user", userSchema);

module.exports = User;
