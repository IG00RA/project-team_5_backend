const User = require("../models/User");

const { HttpError, ctrlWrapper } = require("../helpers");

const getCurrentUser = async (req, res) => {
  const { email, userName, avatarURL, phone, birthday, skype, theme } =
    req.user;

  res.json({
    email,
    userName,
    avatarURL,
    phone,
    birthday,
    skype,
    theme,
  });
};

const updateUserProfile = async (req, res) => {
  const { userName, email, phone, skype, birthday } = req.body;

  let avatarURL;

  if (req.file) {
    avatarURL = req.file.path;
  }

  const user = await User.findOne({ _id: req.user._id });

  if (user.email !== email) {
    const existingUserWithNewEmail = await User.findOne({ email });
    if (existingUserWithNewEmail) {
      throw new HttpError(409, "Email already in use by another user");
    }
  }

  const updatedUser = await User.findOneAndUpdate(
    { _id: req.user._id },
    {
      userName,
      email,
      phone,
      skype,
      birthday,
      avatarURL,
    },
    { new: true }
  );

  res.status(200).json({
    userName: updatedUser.userName,
    email: updatedUser.email,
    phone: updatedUser.phone,
    skype: updatedUser.skype,
    birthday: updatedUser.birthday,
    avatarURL: updatedUser.avatarURL,
  });
};

const toggleTheme = async (req, res, next) => {
  const { _id } = req.user;

  const user = await User.findById(_id);
  const currentTheme = user.theme;

  const newTheme = currentTheme === "light" ? "dark" : "light";

  await User.findByIdAndUpdate(_id, { theme: newTheme });

  res.json({
    theme: newTheme,
  });
};

module.exports = {
  getCurrentUser: ctrlWrapper(getCurrentUser),
  updateUserProfile: ctrlWrapper(updateUserProfile),
  toggleTheme: ctrlWrapper(toggleTheme),
};
