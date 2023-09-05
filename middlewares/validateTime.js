const moment = require("moment");
const { HttpError } = require("../helpers");

const validateTime = (schema) => {
  try {
    schema.path("end").validate(function (value) {
      const startMoment = moment(this.start, "HH:mm");
      const endMoment = moment(value, "HH:mm");
      const validate = endMoment.isAfter(startMoment);
      if (!validate) {
        throw new HttpError(409, "Cannot be earlier than start");
      }
      return validate;
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { validateTime };
