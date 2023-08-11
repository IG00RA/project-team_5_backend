const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const gravatar = require("gravatar");
// const path = require("path");
// const fs = require("fs/promises");
// const Jimp = require("jimp");
// const { nanoid } = require("nanoid");

const User = require("../models/User");

const { HttpError, ctrlWrapper } = require("../helpers");

const { SECRET_KEY, BASE_URL } = process.env;

// const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw new HttpError(409, "Provided email already exists");
  }

  const hashPassword = await bcryptjs.hash(password, 10);
  // const avatarURL = gravatar.url(email);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    // avatarURL,
  });

  // const verifyEmail = {
  //   to: email,
  //   subject: "Verify email",
  //   html: `<a target="_blank" href="${BASE_URL}/api/auth/users/verify/${verificationToken}">Click verify email</a>`,
  // };

  // await sendEmail(verifyEmail);

  res.status(201).json({
    user: {
      userName: newUser.userName,
      email: newUser.email,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new HttpError(401, "Email or password invalid");
  }
  // if (!user.verify) {
  //   throw new HttpError(401, "Email not verified");
  // }
  const passwordCompare = await bcryptjs.compare(password, user.password);
  if (!passwordCompare) {
    throw new HttpError(401, "Email or password invalid");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token: token,
    user: {
      userName: user.userName,
      email: user.email,
      phone: user.phone,
      birthday: user.birthday,
      skype: user.skype,
      avatarURL: user.avatarURL,
    },
  });
};

const updateUserProfile = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw new HttpError(409, "Provided email already exists");
  }

  console.log("fine");
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json();
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  // getCurrent: ctrlWrapper(getCurrent),
  updateUserProfile: ctrlWrapper(updateUserProfile),
  logout: ctrlWrapper(logout),
  // updateAvatar: ctrlWrapper(updateAvatar),
  // verifyEmail: ctrlWrapper(verifyEmail),
  // resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
};
