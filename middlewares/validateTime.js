const moment = require("moment");

const validateTime = (schema) => {
  try {
    schema.path("end").validate(function (value) {
      const startMoment = moment(this.start, "HH:mm");
      const endMoment = moment(value, "HH:mm");
      return endMoment.isAfter(startMoment);
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { validateTime };
