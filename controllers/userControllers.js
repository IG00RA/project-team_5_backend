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
  console.log("Позже продолжу");

  const { email } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw new HttpError(409, "Provided email already exists");
  }

  res.json({
    message: "Hi",
  });
};

module.exports = {
  getCurrentUser: ctrlWrapper(getCurrentUser),
  updateUserProfile: ctrlWrapper(updateUserProfile),
  // updateAvatar: ctrlWrapper(updateAvatar),
  // verifyEmail: ctrlWrapper(verifyEmail),
  // resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
};
