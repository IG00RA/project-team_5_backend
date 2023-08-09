const messages = require("../constants");

class HttpError extends Error {
  constructor(status = 500, message = messages[status] || messages.default) {
    super(message);
    this.status = status;
  }
}

module.exports = HttpError;
