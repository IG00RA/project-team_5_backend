const jwt = require("jsonwebtoken");
const HttpError = require("../helpers/HttpError");
require("dotenv").config();
const { SECRET_KEY } = process.env;
const User = require("../models/User");

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    next(new HttpError(401));
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) {
      next(new HttpError(401));
    }
    req.user = user;
    // console.log(req.user);
    next();
  } catch (error) {
    next(new HttpError(401));
  }
};

module.exports = { authenticate };
