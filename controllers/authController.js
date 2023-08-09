const bcryptjs = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const gravatar = require("gravatar");
// const path = require("path");
// const fs = require("fs/promises");
// const Jimp = require("jimp");
const { nanoid } = require("nanoid");

const User = require("../models/User");

const { HttpError, ctrlWrapper } = require("../helpers");

// const { SECRET_KEY, BASE_URL } = process.env;

// const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw new HttpError(409);
  }

  const hashPassword = await bcryptjs.hash(password, 10);
  // const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    // avatarURL,
    verificationToken,
  });

  // const verifyEmail = {
  //   to: email,
  //   subject: "Verify email",
  //   html: `<a target="_blank" href="${BASE_URL}/api/auth/users/verify/${verificationToken}">Click verify email</a>`,
  // };

  // await sendEmail(verifyEmail);

  res.status(201).json({
    user: {
      email: newUser.email,
      // subscription: newUser.subscription,
    },
  });
};

module.exports = {
  register: ctrlWrapper(register),
  // login: ctrlWrapper(login),
  // getCurrent: ctrlWrapper(getCurrent),
  // logout: ctrlWrapper(logout),
  // updateAvatar: ctrlWrapper(updateAvatar),
  // verifyEmail: ctrlWrapper(verifyEmail),
  // resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
};
