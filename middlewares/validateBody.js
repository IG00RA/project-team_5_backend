const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const errorMessage = error.details[0].message;
      next(new HttpError(400, errorMessage));
    }
    next();
  };
};

module.exports = { validateBody };
