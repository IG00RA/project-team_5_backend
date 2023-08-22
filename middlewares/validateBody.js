// const { HttpError } = require("../helpers");

// const validateBody = (schema) => {
//   return (req, res, next) => {
//     const validationResult = schema.validate(req.body);

//     if (validationResult.error) {
//       const errorMessages = validationResult.error.details.map(
//         (detail) => detail.message
//       );
//       const errorMessage = errorMessages.join(", ");
//       return next(new HttpError(400, `${errorMessage}`));
//       // return res.status(400).json({ error: errorMessage });
//     }

//     next();
//   };
// };

// module.exports = { validateBody };

const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(new HttpError(400, "Invalid request body"));
    }
    next();
  };
};

module.exports = { validateBody };
