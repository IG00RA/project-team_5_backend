const httpMessage = require("../constants");

class HttpError extends Error {
  constructor(status = 500, message = "") {
    super(
      message === "" || message === httpMessage[status]
        ? httpMessage[status] || httpMessage.default
        : message
    );
    this.status = status;
  }
}

module.exports = {HttpError};
