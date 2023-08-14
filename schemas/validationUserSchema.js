const Joi = require("joi");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const birthdayRegexp =
  /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

const registerSchema = Joi.object({
  userName: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const updateSchema = Joi.object({
  userName: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  phone: Joi.string().allow(""),
  skype: Joi.string().allow(""),
  birthday: Joi.string().pattern(birthdayRegexp).allow(""),
  avatarURL: Joi.any(),
});

const schemas = {
  registerSchema,
  loginSchema,
  updateSchema,
};

module.exports = schemas;
