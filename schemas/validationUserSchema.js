const Joi = require("joi");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const phoneRegexp = /^38 \(\d{3}\) \d{3} \d{2} \d{2}$/;
const birthdayRegexp =
  /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;

const registerSchema = Joi.object({
  userName: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

// const emailSchema = Joi.object({
//   email: Joi.string().pattern(emailRegexp).required(),
// });

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const updateSchema = Joi.object({
  userName: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  phone: Joi.string(),
  skype: Joi.string(),
  birthday: Joi.string(),
});

const schemas = {
  registerSchema,
  loginSchema,
  updateSchema,
};

module.exports = schemas;
