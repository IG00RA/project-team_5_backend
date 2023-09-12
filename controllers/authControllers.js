const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const { HttpError, ctrlWrapper } = require("../helpers");

const { SECRET_KEY, FRONTEND_URL } = process.env;

const generateAndSaveToken = async (userId) => {
  const payload = {
    id: userId,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(userId, { token });

  return token;
};

const register = async (req, res) => {
  const { email, password } = req.body;
  const universalEmail = email.toLowerCase();
  const user = await User.findOne({ email: universalEmail });

  if (user) {
    throw new HttpError(409, "Provided email already exists");
  }

  const hashPassword = await bcryptjs.hash(password, 10);

  const newUser = await User.create({
    ...req.body,
    email: universalEmail,
    password: hashPassword,
  });

  const token = await generateAndSaveToken(newUser._id);

  res.status(201).json({
    token: token,
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

  const passwordCompare = await bcryptjs.compare(password, user.password);
  if (!passwordCompare) {
    throw new HttpError(401, "Email or password invalid");
  }

  const token = await generateAndSaveToken(user._id);

  res.json({
    token: token,
    user: {
      userName: user.userName,
      email: user.email,
      phone: user.phone,
      birthday: user.birthday,
      skype: user.skype,
      avatarURL: user.avatarURL,
      theme: user.theme,
    },
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json();
};
const googleAuth = async (req, res) => {
  const { _id: id } = req.user;
  const payload = {
    id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(id, { token });

  res.redirect(`${FRONTEND_URL}?token=${token}`);
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  googleAuth: ctrlWrapper(googleAuth),
};
