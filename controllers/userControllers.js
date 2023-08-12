const User = require("../models/User");

const { HttpError, ctrlWrapper } = require("../helpers");

const getCurrentUser = async (req, res) => {
  const { email, userName, avatarURL, phone, birthday, skype } = req.user;

  res.json({
    email,
    userName,
    avatarURL,
    phone,
    birthday,
    skype,
  });
};

const updateUserProfile = async (req, res) => {
  const { userName, email, phone, skype, birthday, avatarURL } = req.body;

  const user = await User.findOne({ _id: req.user._id });

  if (user.email !== email) {
    const existingUserWithNewEmail = await User.findOne({ email });
    if (existingUserWithNewEmail) {
      return res
        .status(409)
        .json({ message: "Email already in use by another user" });
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

module.exports = {
  getCurrentUser: ctrlWrapper(getCurrentUser),
  updateUserProfile: ctrlWrapper(updateUserProfile),
  // updateAvatar: ctrlWrapper(updateAvatar),
  // verifyEmail: ctrlWrapper(verifyEmail),
  // resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
};
