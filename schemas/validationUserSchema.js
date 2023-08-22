const { regex } = require("../constants");

const Joi = require("joi");

const registerSchema = Joi.object({
  userName: Joi.string().required(),
  email: Joi.string().pattern(regex.emailRegexp).required(),
  password: Joi.string()
    .min(6)
    .required()
    .empty(false)
    .messages({ "string.min": "The password must be at least 6 symbols." }),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(regex.emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const updateSchema = Joi.object({
  userName: Joi.string().required(),
  email: Joi.string().pattern(regex.emailRegexp).required(),
  phone: Joi.string().allow(""),
  skype: Joi.string().allow(""),
  birthday: Joi.string().pattern(regex.birthdayRegexp).allow(""),
  avatarURL: Joi.any(),
});

const schemas = {
  registerSchema,
  loginSchema,
  updateSchema,
};

module.exports = schemas;
