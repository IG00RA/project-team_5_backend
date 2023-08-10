const httpMessage = require("../constants");

const HttpError = (
  statusCode = 500,
  message = httpMessage[statusCode] || httpMessage.default
) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

module.exports = HttpError;
