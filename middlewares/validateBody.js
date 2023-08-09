const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  return (req, res, next) => {
    console.log(req.body);
    const { error } = schema.validate(req.body);
    if (error) {
      next(new HttpError(400, "missing required name field"));
    }
    next();
  };
};

module.exports = validateBody;
